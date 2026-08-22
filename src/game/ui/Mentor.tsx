import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, turistsesongInfo } from '../GameContext'
import { MENTOR_TRIGGERS, mentorMelding, faneTriggere, sceneAvTrigger, MENTOR_INTRO } from '../data/mentorTriggers'
import { nesteMilepael } from '../data/sti'
import { STAMKUNDER_AKTIV, TURISTSESONG_AKTIV } from '../data/featureFlags'
import { type FagKode } from '../data/fag'
import Fagord from './Fagord'
import OrdbokPanel from './OrdbokPanel'
import { kanalById, kanalTreffISegmenter } from '../data/kampanje'
import { getScenario } from '../sales/scenarios'
import { avisAbsDag } from '../data/avis'
import { BALANCE } from '../data/balance'
import type { GameState, RenderedNotis } from '../types'

// ─── LÆRINGSLAGET — mentoren (Espen) ──────────────────────────────────────────
// Hjørnefigur nede til høyre, ALLTID synlig (også over dashbord/oppgjør), med en
// liten 📖-bok ved figuren. Klikk boka/figuren (uten aktiv melding) → ordboken
// «slår seg opp» ved figuren og Espen leser (espen-leser). Poser (prioritet):
//   leser (ordbok åpen) > nøytral (aktiv melding) > peker (melding i kø/ventende)
//   > vanlig (hvile). (v1/smil er pensjonert fra bruk; fila beholdes.)
// Meldinger (data i mentorTriggers.ts) fyres MAKS ÉN GANG (localStorage-sett,
// overlever reload). DASHBORD blokkerer IKKE — fane-triggere vises inne i
// dashbordet. Scenario/dagsoppgjør blokkerer: da KØES meldingen og figuren PEKER
// («jeg har noe til deg»); klikk peker-figuren for å vise den, og den vises av
// seg selv når flaten lukkes.

const POSE = {
  vanlig: '/assets/raw/mentor/espen-vanlig.png',  // v5 — hvile + intro
  noytral: '/assets/raw/mentor/espen-noytral.png', // v2 — aktiv melding
  smil: '/assets/raw/mentor/espen-smil.png',       // v1 — pensjonert fra bruk
  leser: '/assets/raw/mentor/espen-leser.png',     // v3 — ordbok åpen
  peker: '/assets/raw/mentor/espen-peker.png',     // v4 — kø-signal (peker med fingeren)
}

// DEL 2 (fiksrunde 2) — RENDRET FIGURSTØRRELSE (tunbar). Økt ~45 % fra den
// gamle effektive høyden (~118 px for tett-beskårne poser) etter Espens 100 %-
// zoom-validering. Juster kun disse to konstantene for å skalere figuren.
const MENTOR_FIGUR_HOYDE = 170   // synlig figurhøyde i px (lik for ALLE poser)
const MENTOR_FIGUR_BREDDE = 150  // klikkflatens bredde (rommer bredeste pose)

// POSE-NORMALISERING. Posene er ULIKT beskåret: v5 «vanlig» har mye luft rundt
// figuren (foten 80,7 % ned i canvaset), mens v2/v3/v4 er tett beskåret (foten
// ~99 % ned). Uten kompensasjon «hopper» figuren i størrelse og fotlinje ved
// pose-bytte (Espens funn). Målt med scratchpad/pngbbox.js mot de faktiske
// PNG-ene (12.07): chf = synlig figurhøyde / canvashøyde, foot = fotlinjens
// y-andel. Vi rendrer hver pose så synlig figur = MENTOR_FIGUR_HOYDE og henger
// den transparente bunnpaddingen under baselinen → lik høyde OG lik fotlinje.
const POSE_JUSTERING: Record<keyof typeof POSE, { chf: number; foot: number }> = {
  vanlig:  { chf: 0.684, foot: 0.807 },
  noytral: { chf: 0.983, foot: 0.992 },
  smil:    { chf: 0.983, foot: 0.992 },
  leser:   { chf: 0.983, foot: 0.992 },
  peker:   { chf: 0.983, foot: 0.991 },
}
const KEY = 'mentor_fired_v1'

// DEL 2 — SCENE-ORIENTERINGER er KONTEKSTBUNDNE. Kartlegger scene-trigger → scene-id.
// Rute-scenene er gjensidig utelukkende (kun én vises av gangen), så én scene-mount
// = ett scene-bytte. Når aktiv scene endres, forkastes en ulest scene-melding for en
// ANNEN scene stille fra køen OG re-armes (engangs-forsøket brennes ikke). Dashbordet
// er et OVERLAY (ikke rute) og håndteres separat via mentor:fane (se handleFane).
// Avledet av trigger-dataene (t.scene) — ÉN kilde til kontekst-bindingen, ikke en
// hardkodet parallell-tabell. Fyll `scene` på triggeren i mentorTriggers.ts.
const SCENE_AV_TRIGGER: Record<string, string> = sceneAvTrigger()

// DEL 3 — TEMA-GATING: en tema-trigger skal ARMES bare når temaets fag er aktivt OG
// temaet er aktivert. `aktiveTemaer` (GameContext) er ALT fag-gated, så én sjekk mot
// den dekker begge. Kartlegger tema-trigger → tema-id. (Uten dette lekket f.eks.
// beredskap-triggerne — de leser bare state.beredskap.* — selv med FD/HMS av.)
const TEMA_AV_TRIGGER: Record<string, string> = {
  tema_beredskap_aktivert: 'beredskap',
  beredskap_plan_bekreftet: 'beredskap',
  beredskap_risiko_levert: 'beredskap',
  beredskap_brannalarm_handtert: 'beredskap',
  beredskap_ovelse_etter_feil: 'beredskap',
  tema_budsjett_aktivert: 'budsjett',
  budsjett_avvik_storst: 'budsjett',
  tema_nokkeltall_aktivert: 'nokkeltall',
  nokkeltall_dekningsgrad_avvik: 'nokkeltall',
  tema_kampanje_aktivert: 'kampanje',
  kampanje_effekt: 'kampanje',
  kampanje_forpris_brudd: 'kampanje',
  tema_reiseliv_aktivert: 'reiseliv',
  turistsesong_slutt: 'reiseliv',
  hotellavtale_svart: 'reiseliv',
  pakke_bygget: 'reiseliv',
}

function loadFired(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { return new Set() }
}
function saveFired(s: Set<string>) {
  try { localStorage.setItem(KEY, JSON.stringify([...s])) } catch { /* ignore */ }
}

// INTRO: vises én gang per lagring (localStorage-flagg).
const INTRO_KEY = 'mentor_intro_v1'
function introDone(): boolean {
  try { return localStorage.getItem(INTRO_KEY) === '1' } catch { return false }
}
function saveIntroDone() {
  try { localStorage.setItem(INTRO_KEY, '1') } catch { /* ignore */ }
}

/** Tilstands-avledede HENDELSES-triggere. Scene-signaler (disk_stell/vindu/
 *  bykart) kommer via 'mentor:signal'; fane-triggere via 'mentor:fane'.
 *
 *  DATAVAKT (global regel, fikserunde 3+): en DYNAMISK trigger som leser elevens
 *  egne tall skal ALDRI fyre på tomt grunnlag (0 kunder, tom liste, manglende
 *  node). Hver slik case har derfor et minstedata-vilkår, dokumentert i en
 *  kommentar rett over. Rene tilstands-/hendelses-triggere (bool/present) trenger
 *  ikke vakt. `dynamiskMentorMelding` returnerer i tillegg undefined om grunnlaget
 *  mangler (belte + bukseseler), men vakta her hindrer at triggeren merkes «fyrt». */
function oppfylt(id: string, s: GameState): boolean {
  switch (id) {
    case 'forste_apning': return s.dayPhase === 'åpen'                 // hendelse
    case 'forste_bestilling_levert': return s.lastDelivery != null     // hendelse (present)
    // KROK 7 — DEN LEVENDE INNBOKSEN. DATAVAKT: minst én ULEST quest-e-post med
    // svarfrist i innboksen (tom innboks ⇒ ingen frist å minne om).
    case 'forste_epost_frist': return s.messages.some(m => m.epost != null && m.fristAbsDag != null && m.epostStatus === 'ubesvart' && !m.read)
    // KROK 2 — STAMKUNDER (parkert). DATAVAKT: minst én kunde er blitt stamkunde.
    case 'stamkunde_forste': return STAMKUNDER_AKTIV && Object.values(s.stamkunder).some(k => k.erStamkunde)
    case 'forste_laan': return s.loans.length > 0                      // hendelse (≥1 lån)
    case 'forste_manedsoppgjor': return s.lastMonthSettlement != null  // hendelse (present)
    case 'forste_eierlonn': return s.lastMonthSettlement != null       // hendelse (present)
    // Dagsoppgjørs-triggere. DATAVAKT: det aktuelle tallet må være > 0 (ingen
    // svinn/tomt trau/kø ⇒ ingenting å kommentere).
    case 'forste_svinn': return (s.lastDayResult?.svinnStk ?? 0) > 0
    case 'forste_tomt_trau': return (s.lastDayResult?.tomtProdukter.length ?? 0) > 0
    case 'forste_ko': return (s.lastDayResult?.koKunder ?? 0) > 0
    // KROK 7c — første Sentrumsposten-utgave publisert (leses via 📰-ikonet).
    case 'forste_avis': return s.avisArkiv.length > 0
    case 'forste_p_fullfort': return s.p1_complete || s.p2_complete || s.p3_complete || s.p4_complete
    case 'alle_p_fullfort': return s.p1_complete && s.p2_complete && s.p3_complete && s.p4_complete
    // TEMA 1: Beredskap (tema_beredskap_aktivert fyres via aktiveTemaer-effekten).
    case 'beredskap_plan_bekreftet': return s.beredskap.planBekreftet  // hendelse (bekreftet)
    // DATAVAKT: skjemaet er lagret OG eleven har fylt inn minst ETT tiltak.
    // (Fare-kolonnen er forhåndsutfylt, så den duger ikke som «har jobbet med
    // skjemaet»-signal — det er tiltakene eleven selv skriver.)
    case 'beredskap_risiko_levert':
      return s.beredskap.risikoLagret && s.beredskap.risikoRader.some(r => r.tiltak.trim().length > 0)
    // DATAVAKT: alarmen faktisk håndtert (rekkefølge-lista ikke tom).
    case 'beredskap_brannalarm_handtert': return (s.beredskap.brannalarmUtfall?.rekkefolge.length ?? 0) > 0
    // DEL 4 (fiksrunde 2): første brannØVELSE etter en FEILET skarp alarm.
    // DATAVAKT: en skarp alarm er håndtert (≠ tom) OG gikk dårlig, OG minst én øvelse kjørt.
    case 'beredskap_ovelse_etter_feil':
      return (s.beredskap.brannalarmUtfall?.rekkefolge.length ?? 0) > 0
        && s.beredskap.brannalarmUtfall?.kvalitet === 'bad'
        && s.beredskap.brannovelser.length > 0
    // TEMA 2/3: leser den transiente oppgjørs-payloaden (satt ved månedsrull).
    // DATAVAKT: payloaden/noden må finnes (eleven hadde satt budsjett).
    case 'budsjett_avvik_storst': return !!s.budsjettOppgjorHint?.storstAvvik
    // DATAVAKT: dekningsgrad-noden finnes OG spriket er > 5 prosentpoeng.
    case 'nokkeltall_dekningsgrad_avvik': {
      const d = s.budsjettOppgjorHint?.dekningsgradAvvik
      return !!d && Math.abs(d.ditt - d.bok) > 5
    }
    // TEMA 8. DATAVAKT: minst én fullført kampanje i historikken.
    case 'kampanje_effekt': return s.kampanje.historikk.length > 0
    // TEMA 15 sesongslutt: sesong startet, nå UTE av varigheten. PARKERT
    // (TURISTSESONG_AKTIV) ⇒ armes aldri. DATAVAKT: krever minst 1 TILREISENDE
    // kunde (turistKunder ≥ 1) — uten turister i strømmen er refleksjonen tom.
    case 'turistsesong_slutt': {
      if (!TURISTSESONG_AKTIV) return false
      const info = turistsesongInfo(s)
      return !!info && !info.aktiv && (s.turistsesong?.turistKunder ?? 0) >= 1
    }
    // TEMA 15 (PARKERT): sesong-relaterte triggere armes ikke når sesongen er av.
    case 'hotellavtale_svart': return TURISTSESONG_AKTIV && s.hotellavtale !== 'ingen'
    // TEMA 15 DEL 7: eleven har tilbudt en reiselivspakke (resultat lagret).
    case 'pakke_bygget': return TURISTSESONG_AKTIV && s.reiselivPakke != null
    // DATAVAKT: en fullført kampanje finnes OG den brøt førpris-regelen.
    case 'kampanje_forpris_brudd': return s.kampanje.historikk[s.kampanje.historikk.length - 1]?.forprisBrudd === true
    default: return false
  }
}

const RISIKO_RANG: Record<string, number> = { lav: 1, middels: 2, høy: 3 }

/** Dynamiske mentor-meldinger som leser elevens egne verdier (beredskap).
 *  Faller tilbake på den statiske teksten for andre id-er. */
/** KROK 7c-revisjon (DEL 3) — SWOT-frø: en EKSTERN notis — byens trend (spillbar
 *  effekt) eller en aktør i næringslivet (ny konkurrent, leverandørprishopp,
 *  bondens marked …). Eksterne forhold = SWOTs muligheter/trusler; butikk-notiser
 *  er interne styrker/svakheter og teller ikke. Datavakt for avis_swot-refleksjonen
 *  (fyrer aldri uten et slikt grunnlag). Frø til Tema 11 (SWOT-analyse). */
function erSwotNotis(n: RenderedNotis): boolean {
  return n.kilde !== 'butikk'
}

function dynamiskMentorMelding(id: string, s: GameState): string | undefined {
  const kr = (n: number) => `${Math.round(n).toLocaleString('nb-NO')} kr`
  // MENTOR DAGLIG REFLEKSJON (dagsoppgjøret): teksten er bygget reducer-side
  // (mentorDaglig.ts) og lagret i state.mentorDagligHint, så den overlever at
  // lastDayResult nullstilles ved dagsbytte. Datavakt: undefined om dagen/id ikke matcher.
  if (id.startsWith('daglig|')) {
    const h = s.mentorDagligHint
    return h && id === `daglig|${h.dag}` ? h.melding : undefined
  }
  // DEL 1d — prisstrategi-gjentak: dag-scopet id → statisk kortversjon.
  if (id.startsWith('prisstrategi_gjentak|')) return mentorMelding('prisstrategi_gjentak')
  // KROK 7c DEL 4 — avis-trend-refleksjon: navngi trenden avisen varslet (label).
  if (id.startsWith('avis_trend|')) {
    const e = s.avisEffekt
    if (!e) return undefined
    const navn = e.label.split(' (')[0].toLowerCase()
    return `Husker du at Sentrumsposten varslet ${navn} denne uka? Etterspørselen svingte akkurat som meldt — se på dagens tall. Neste gang lønner det seg å bestille og prise DERETTER, i forkant.`
  }
  // KROK 7c-revisjon DEL 3 — SWOT-FØR-refleksjon (mulighet eller trussel): når
  // eleven LUKKER avisen etter en hovedutgave med en effekt-/konkurranse-notis.
  // Navngir notisen og SPØR (aldri dømmer). Frø til Tema 11 (SWOT-analyse).
  if (id.startsWith('avis_swot|')) {
    const uke = Number(id.slice('avis_swot|'.length))
    const utg = s.avisArkiv.find(u => u.uke === uke)
    const notis = utg?.notiser.find(erSwotNotis)
    if (!notis) return undefined
    const emne = notis.tittel.replace(/[.:]\s*$/, '')
    return `Sentrumsposten skriver om «${emne}». Er det en [[MKT_029|mulighet eller en trussel]] for akkurat DIN butikk? Hva ville du gjort forskjellig i bestillingen neste uke?`
  }
  // KROK 2 — STAMKUNDER: navngi den første kunden som ble stamkunde.
  if (id === 'stamkunde_forste') {
    const entry = Object.entries(s.stamkunder).find(([, k]) => k.erStamkunde)
    const navn = entry ? (getScenario(entry[0])?.customerName ?? 'En kunde') : 'En kunde'
    return `Se på det — ${navn} er blitt en fast gjest! Når en kunde kommer igjen og igjen, har du en [[MKT_027|stamkunde]]. Gode møter bygger lojalitet — da handler folk litt mer og anbefaler deg videre. Hva tror du fikk ${navn} til å komme tilbake?`
  }
  // DEL 7 — prisingsmentorer (dag-/vare-scopede id-er).
  if (id.startsWith('mangler_pris_apning|')) {
    return 'Du har varer i disken uten pris — dem får du ikke solgt før du prissetter dem i Priser-fanen. Bruk [[MKT_048|kalkylen]]: innkjøpspris + [[ECO_011|påslag]].'
  }
  if (id.startsWith('mangler_pris_oppgjor|')) {
    const r = s.lastDayResult
    if (!r || r.manglerPrisStk <= 0) return undefined
    const varer = r.uprisedeVarer.slice(0, 2).join(', ')
    return `Du tapte ${r.manglerPrisStk} salg i dag på varer uten pris${varer ? ` (${varer})` : ''}. En vare uten [[ECO_031|utsalgspris]] får du ikke solgt — sett en pris i Priser-fanen.`
  }
  if (id.startsWith('overpris|')) {
    const navn = id.slice('overpris|'.length)
    const o = s.lastDayResult?.overprisProdukter.find(x => x.navn === navn)
    if (!o) return undefined
    return `${o.navn} koster ${kr(o.pris)} hos deg — nedi gata koster den rundt ${kr(o.marked)}. Hva tror du kundene gjør da? Sjekk [[ECO_011|påslaget]] ditt mot markedet.`
  }
  if (id === 'beredskap_plan_bekreftet') {
    // Referer elevens eget tillegg når det finnes; pek videre til risikoskjemaet.
    const tillegg = Object.values(s.beredskap.planTillegg).map(t => t.trim()).filter(Boolean)[0]
    if (tillegg) return `Bra — og fint at du la til noe eget: «${tillegg}». Nå kjenner du planen. Neste steg: fyll ut [[RST_002|risikovurderingen]] i HMS-fanen og trykk «Lagre vurdering».`
    return 'Bra — nå kjenner du planen. Neste steg: fyll ut [[RST_002|risikovurderingen]] i HMS-fanen og trykk «Lagre vurdering». Hva kan gå galt i akkurat DIN butikk?'
  }
  if (id === 'beredskap_risiko_levert') {
    const verst = [...s.beredskap.risikoRader]
      .sort((a, b) => (RISIKO_RANG[b.sannsynlighet]! + RISIKO_RANG[b.konsekvens]!) - (RISIKO_RANG[a.sannsynlighet]! + RISIKO_RANG[a.konsekvens]!))[0]
    const del = verst?.fare
      ? `Du vurderte «${verst.fare}» som en av de største risikoene (${verst.sannsynlighet} × ${verst.konsekvens}). Hva er det viktigste tiltaket ditt akkurat der?`
      : 'Du har lagret risikovurderingen.'
    return `${del} Neste øvelse: en brannalarm kan gå i løpet av en åpen dag — er du klar?`
  }
  if (id === 'beredskap_brannalarm_handtert') {
    const k = s.beredskap.brannalarmUtfall?.kvalitet
    if (k === 'good') return 'Godt jobbet under brannalarmen — du prioriterte varsling og evakuering, og fikk folk trygt ut. Det er nettopp derfor vi øver.'
    if (k === 'bad') return 'Det ble kaos under alarmen. Tenk gjennom rekkefølgen: hva MÅ komme først når det brenner, og hva kan vente?'
  }
  if (id === 'beredskap_ovelse_etter_feil') {
    // Oppmuntrende + refleksjon, aldri fasit. Leser om den ferske øvelsen gikk bra.
    const siste = s.beredskap.brannovelser[s.beredskap.brannovelser.length - 1]
    if (siste?.kvalitet === 'good') return 'Der satt det! Den skarpe alarmen gikk ikke helt som du ville — men nå kjørte du øvelsen med varsling og evakuering først. Akkurat sånn skal det sitte. Hva var det som klaffet denne gangen?'
    return 'Fint at du øver videre — den første alarmen gikk ikke helt på skinner, og det er helt greit. Tenk på hva som MÅ skje aller først når det brenner, og prøv en gang til. Ingenting står på spill her.'
  }
  // TEMA 2: leser linja med størst avvik fra oppgjørs-payloaden. Aldri fasit.
  if (id === 'budsjett_avvik_storst') {
    const a = s.budsjettOppgjorHint?.storstAvvik
    if (!a) return undefined
    const kr = (n: number) => `${Math.round(n).toLocaleString('nb-NO')} kr`
    const retning = a.faktisk >= a.budsjett ? 'mer' : 'mindre'
    return `Du budsjetterte ${kr(a.budsjett)} i ${a.navn.toLowerCase()}, men det ble ${kr(a.faktisk)} — ${retning} enn planlagt. Hva skjedde med [[ECO_008|budsjettet]] ditt her?`
  }
  // TEMA 3 (VG2): dekningsgrad-sprik → spør om HVILKE tall, ikke riktig svar.
  if (id === 'nokkeltall_dekningsgrad_avvik') {
    const d = s.budsjettOppgjorHint?.dekningsgradAvvik
    if (!d) return undefined
    return `Du regnet ut en [[ECO_002|dekningsgrad]] på ${d.ditt.toFixed(1)} %, men bokført ble ${d.bok.toFixed(1)} %. Hvilke tall brukte du i regnestykket — hele månedens omsetning, eller bare noen dager?`
  }
  // TEMA 8: effektrapport — leser mål, faktisk og kanal×målgruppe-treff. Aldri fasit.
  if (id === 'kampanje_effekt') {
    const r = s.kampanje.historikk[s.kampanje.historikk.length - 1]
    if (!r) return undefined
    const kanal = kanalById(r.kanaler[0]?.kanalId ?? '')
    const treff = kanal ? Math.round(kanalTreffISegmenter(kanal, r.segmenter)) : 0
    const maalOrd = r.maalType === 'kunder' ? 'flere kunder' : 'mer salg'
    const kanalHint = kanal ? ` ${kanal.navn} når rundt ${treff} av 100 i [[MKT_021|målgruppa]] di daglig.` : ''
    return `Du satte mål om +${r.maalProsent} % ${maalOrd} — du fikk +${r.faktiskProsent} %.${kanalHint} Ser du sammenhengen mellom kanalvalg og målgruppe?`
  }
  // TEMA 15: sesongslutt — les elevens sesongtall (turister vs. normaluke). Aldri fasit.
  if (id === 'turistsesong_slutt') {
    const ts = s.turistsesong
    if (!ts || ts.bakgrunnKunder <= 0) return undefined
    const andel = Math.round((ts.turistKunder / Math.max(1, ts.bakgrunnKunder)) * 100)
    return `Turistsesongen er over. Rundt ${ts.turistKunder} av kundene dine var tilreisende (~${andel} % av strømmen) — i en vanlig uke er det nesten ingen. La du merke til at de vred etterspørselen mot kaffe og kaker? Hva ville du bestilt annerledes om du visste sesongen kom igjen?`
  }
  // TEMA 15: hotellavtale — VG2-refleksjon om avveiingen gjester vs. margin.
  if (id === 'hotellavtale_svart') {
    if (s.hotellavtale === 'akseptert') return 'Du sa ja til byhotellets gjestepakke — flere gjester, men hotellet tar en andel av det de handler for. Var det verdt det? Tenk på volum × margin: mange gjester til litt lavere margin kan slå få gjester til full margin — eller ikke.'
    if (s.hotellavtale === 'avslatt') return 'Du takket nei til byhotellets gjestepakke og beholder full margin på hvert salg. Trygt — men gikk du glipp av en gjestestrøm du kunne tjent på? Det finnes ikke ett riktig svar; det avhenger av kapasitet og hva pakkegjestene ville lagt igjen.'
    return undefined
  }
  // TEMA 15 DEL 7: pakkebyggeren — les treffet mot besøksprofilen (godt/middels/
  // svakt) uten å avsløre fasiten. Refleksjon om vertskap = å lese gjestens behov.
  if (id === 'pakke_bygget') {
    const p = s.reiselivPakke
    if (!p) return undefined
    if (p.treff >= 0.66) return `Pakka traff gjestene godt — ${p.turister} kjøpte den. Du leste hva nettopp disse var ute etter, og det er kjernen i et godt [[REIS_001|reiselivsprodukt]]. Hva var det som gjorde at akkurat disse opplevelsene passet dem?`
    if (p.treff >= 0.33) return `Pakka traff sånn passe — ${p.turister} kjøpte den. Noe stemte, noe bommet. Se på gjestene igjen: hadde de mye tid eller lite? Stor lommebok eller liten? Hvilket kort ville du byttet ut?`
    return `Få gjester kjøpte pakka denne gangen (${p.turister}). Det betyr ikke at opplevelsene var dårlige — de passet bare ikke disse gjestene. Les beskrivelsen av dem på nytt: hva var de egentlig ute etter?`
  }
  // TEMA 8: førpris-brudd — refleksjon om HVORFOR regelen finnes, ikke moralisering.
  if (id === 'kampanje_forpris_brudd') {
    return 'Salgskampanjen din brøt [[MKT_054|førpris]]-regelen — en vare ble satt ned uten å ha hatt ordinær pris lenge nok. Hvorfor tror du loven krever en ekte førpris før et tilbud? Hva lover egentlig ordet «tilbud» kunden?'
  }
  return mentorMelding(id)
}

/** Render en melding med [[GLOSSARY_ID|tekst]]-tokens som klikkbare <Fagord>. */
function renderMelding(melding: string): ReactNode {
  const re = /\[\[([A-Z0-9_]+)\|([^\]]+)\]\]/g
  const parts: ReactNode[] = []
  let last = 0, key = 0, m: RegExpExecArray | null
  while ((m = re.exec(melding)) !== null) {
    if (m.index > last) parts.push(melding.slice(last, m.index))
    parts.push(<Fagord key={key++} id={m[1]!}>{m[2]}</Fagord>)
    last = m.index + m[0].length
  }
  if (last < melding.length) parts.push(melding.slice(last))
  return parts
}

export default function Mentor({ blocked }: { blocked: boolean }) {
  const { state, aktiveTemaer, dispatch, klasseNivaa, espenSporStyring, fagAktiv, stiAktiv } = useGame()
  // TEST-BRO (KUN DEV): eksponer den rene trigger-vakta så spilltesten kan
  // asserte at en dynamisk trigger IKKE fyrer på tomt grunnlag (datavakt).
  useEffect(() => {
    if (!import.meta.env.DEV) return
    ;(window as unknown as { __OPPFYLT__?: unknown }).__OPPFYLT__ = oppfylt
  }, [])
  const [fired, setFired] = useState<Set<string>>(loadFired)
  const [queue, setQueue] = useState<string[]>([])          // HENDELSES-kø (peker/kø)
  const queueRef = useRef(queue); queueRef.current = queue   // fersk kø for event-lyttere (DEL 2)
  // KROK 6 — «Espen spør»: er det aktive spørsmålet avslørt (eleven klikket)?
  // Hvert nytt spørsmål starter skjult bak peker-figuren (aldri avbrytende popup).
  const [quizRevealed, setQuizRevealed] = useState(false)
  const [faneMsg, setFaneMsg] = useState<string | null>(null)  // KONTEKSTBUNDET fane-melding
  const [activeFane, setActiveFane] = useState<string | null>(null)
  const [failedImg, setFailedImg] = useState(false)
  const [ordbokOpen, setOrdbokOpen] = useState(false)
  const [fagordOpen, setFagordOpen] = useState(false)   // et Fagord-kort er åpent → lese-pose (DEL 1e)
  const [forceShow, setForceShow] = useState(false)   // bruker klikket peker-figuren
  const [paused, setPaused] = useState(false)         // melding lukket, neste venter bak peker
  // INTRO ved spillstart (null = ferdig/skjult, 0..2 = steg). Vises én gang.
  const [introStep, setIntroStep] = useState<number | null>(() => introDone() ? null : 0)
  function finishIntro() { saveIntroDone(); setIntroStep(null) }
  // STI-DYTT (lærerstyrt milepæl-sti): en LAV-prioritets, IKKE-engangs boble som
  // nevner neste udekkede milepæl. Skjules ved lukking, men kommer TILBAKE når
  // milepælen endrer seg (steg fullført) eller ved scenebytte — aldri en sperre.
  const nesteMil = nesteMilepael(stiAktiv, state)
  const [stiSkjult, setStiSkjult] = useState(false)   // eleven lukket dyttet for gjeldende milepæl
  const [stiBra, setStiBra] = useState(false)          // et steg ble nettopp fullført ⇒ «Bra! Neste …»
  const sistMilId = useRef<string | null>(nesteMil?.id ?? null)
  const firedRef = useRef(fired); firedRef.current = fired
  const stateRef = useRef(state); stateRef.current = state   // fersk state for event-lyttere
  const activeSceneRef = useRef<string | null>(null)          // DEL 2 — gjeldende rute-scene
  // Refs så event-lyttere (mentor:fane) leser FERSKE verdier uten å re-bindes.
  const ordbokOpenRef = useRef(ordbokOpen); ordbokOpenRef.current = ordbokOpen
  const blockedRef = useRef(blocked); blockedRef.current = blocked
  const activeFaneRef = useRef(activeFane)
  const faneMsgRef = useRef(faneMsg); faneMsgRef.current = faneMsg   // fersk faneMsg for re-arm ved fanebytte
  // TEMA-aktivering (budsjett/nokkeltall): var temaet aktivt alt ved mount, og
  // har eleven åpnet dashbordet? Styrer om «læreren åpnet temaet» fyrer straks
  // (aktivert under spilling) eller ved første dashbord-åpning (aktivt fra start).
  const temaVedStart = useRef<Record<string, boolean> | null>(null)
  const [dashApnet, setDashApnet] = useState(false)

  /** Marker en trigger som fyrt (persistert sett), UTEN å kø. Returnerer false
   *  hvis den alt var fyrt. */
  const persistFired = useCallback((id: string) => {
    if (firedRef.current.has(id)) return false
    const n = new Set(firedRef.current).add(id)
    firedRef.current = n
    setFired(n); saveFired(n)
    return true
  }, [])

  // HENDELSES-trigger: fyres én gang og legges i køen (vises når ikke blokkert,
  // ellers peker figuren til den kan vises).
  const fire = useCallback((id: string) => {
    if (!id || !persistFired(id)) return
    setQueue(q => (q.includes(id) ? q : [...q, id]))
  }, [persistFired])

  /** RE-ARM: fjern en trigger fra det persisterte fyrt-settet så den kan fyre igjen. */
  const unpersistFired = useCallback((id: string) => {
    if (!firedRef.current.has(id)) return
    const n = new Set(firedRef.current); n.delete(id)
    firedRef.current = n; setFired(n); saveFired(n)
  }, [])

  // DEL 2 — SCENE-BYTTE: forkast køede scene-meldinger for ANDRE scener enn den nye
  // (stille) OG re-arm dem (engangs-forsøket brennes ikke). En åpen scene-boble for
  // en annen scene lukkes automatisk fordi den fjernes fra køen (boblen leser queue[0]).
  const byttScene = useCallback((nyScene: string) => {
    if (nyScene === activeSceneRef.current) return
    activeSceneRef.current = nyScene
    // Ulest scene-melding for en ANNEN scene → forkast fra kø + re-arm.
    const stale = queueRef.current.filter(id => { const sc = SCENE_AV_TRIGGER[id]; return !!sc && sc !== nyScene })
    if (stale.length === 0) return
    setForceShow(false); setPaused(false)
    stale.forEach(unpersistFired)
    setQueue(q => q.filter(id => !stale.includes(id)))
  }, [unpersistFired])

  useEffect(() => {
    for (const t of MENTOR_TRIGGERS) {
      // DEL 3 — TEMA-GATING: en tema-trigger armes bare når temaets fag er aktivt OG
      // temaet er aktivert (aktiveTemaer er alt fag-gated i GameContext). Reprodusert
      // HMS-buggen: beredskap aktiv + FD av ⇒ ingen beredskap-/HMS-meldinger.
      const tema = TEMA_AV_TRIGGER[t.id]
      if (tema && !aktiveTemaer[tema]?.aktiv) continue
      if (oppfylt(t.id, state)) fire(t.id)
    }
  }, [state, fire, aktiveTemaer])

  // TEMA: fyr «tema_beredskap_aktivert» når temaet slås på for klassen.
  useEffect(() => {
    if (aktiveTemaer['beredskap']?.aktiv) fire('tema_beredskap_aktivert')
  }, [aktiveTemaer, fire])

  // TEMA 2/3: «Læreren har åpnet [tema] — du finner det i Økonomi-fanen.»
  // Aktivert UNDER spilling (flippet av→på denne økta) → fyr straks. Aktivt
  // allerede ved spillstart → fyr først når eleven åpner dashbordet. Fyres én
  // gang (persistert fired-sett, som alle mentor-triggere).
  useEffect(() => {
    if (temaVedStart.current === null) {
      temaVedStart.current = { budsjett: !!aktiveTemaer['budsjett']?.aktiv, nokkeltall: !!aktiveTemaer['nokkeltall']?.aktiv, kampanje: !!aktiveTemaer['kampanje']?.aktiv, reiseliv: !!aktiveTemaer['reiseliv']?.aktiv }
    }
    for (const tema of ['budsjett', 'nokkeltall', 'kampanje', 'reiseliv'] as const) {
      if (!aktiveTemaer[tema]?.aktiv) continue
      // TEMA 15 PARKERT (TURISTSESONG_AKTIV): reiseliv-temaets mentor-melding
      // (som lover turister i strømmen) armes ikke før sesongen finnes.
      if (tema === 'reiseliv' && !TURISTSESONG_AKTIV) continue
      const varAktivVedStart = temaVedStart.current[tema]
      if (!varAktivVedStart || dashApnet) fire(`tema_${tema}_aktivert`)
    }
  }, [aktiveTemaer, dashApnet, fire])

  // Scene-signaler (bykart/bydel/disk/vindu + rute-scener uten trigger) → scene-bytte
  // (forkast/re-arm) + ev. fyr scenens engangs-trigger. `scene` = gjeldende rute-scene,
  // `id` = ev. engangs-trigger for scenen.
  useEffect(() => {
    const h = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.scene) byttScene(detail.scene)
      if (detail?.id) fire(detail.id)
    }
    window.addEventListener('mentor:signal', h)
    return () => window.removeEventListener('mentor:signal', h)
  }, [fire, byttScene])

  // STI-DYTT re-arm: (1) når neste milepæl endrer seg (steg fullført) → vis igjen,
  // og flagg «Bra!» hvis vi hadde en forrige milepæl; (2) ved scenebytte (naturlig
  // pause mellom handlinger) → la et lukket dytt komme tilbake. Aldri masete: mellom
  // disse kan eleven lukke dyttet og få være i fred.
  const nesteMilId = nesteMil?.id ?? null
  useEffect(() => {
    if (nesteMilId !== sistMilId.current) {
      if (sistMilId.current && nesteMilId) setStiBra(true)
      sistMilId.current = nesteMilId
      setStiSkjult(false)
    }
  }, [nesteMilId])
  useEffect(() => {
    const h = () => setStiSkjult(false)
    window.addEventListener('mentor:signal', h)
    return () => window.removeEventListener('mentor:signal', h)
  }, [])

  // DEL 1a — DAGLIG REFLEKSJON: reduceren la dagens signal i state.mentorDagligHint
  // (ett per dag, valgt + datavaktet reducer-side). Fyr den dag-scopede triggeren
  // (re-armes per dag via id-en). Vises som en vanlig hendelses-boble når oppgjøret
  // lukkes (blokkert under oppgjøret → køes + peker, dukker opp når flaten lukkes).
  useEffect(() => {
    if (state.mentorDagligHint) fire(`daglig|${state.mentorDagligHint.dag}`)
  }, [state.mentorDagligHint, fire])

  // DEL 4 — AVIS-TREND-REFLEKSJON (dag-scopet, DATAVAKT): en trend-effekt Sentrums-
  // posten VARSLET var aktiv, og eleven endret IKKE bestilling/priser i forkant
  // (avisSisteHandlingDag < annonseuka) → kort refleksjon ETTERPÅ, på effektens
  // siste dag (før en ev. ny utgave overskriver avisEffekt). Aldri fasit før.
  useEffect(() => {
    const e = state.avisEffekt
    if (!e) return
    const idag = avisAbsDag(state.currentYear, state.currentMonth, state.dayNumber)
    if (idag !== e.tilAbsDag) return                    // fyr kun på effektens SISTE dag
    const annonseMandag = e.fraAbsDag - BALANCE.avis.dagerPerUke
    if (state.avisSisteHandlingDag >= annonseMandag) return  // eleven HANDLET i forkant → ingen påpekning
    fire(`avis_trend|${e.notisId}`)
  }, [state.avisEffekt, state.currentYear, state.currentMonth, state.dayNumber, state.avisSisteHandlingDag, fire])

  // KROK 7c-revisjon DEL 3 — SWOT-FØR-REFLEKSJON: FØR-refleksjonen (dette er FØR
  // uka effekten treffer), til forskjell fra avis_trend som er ETTER-refleksjonen
  // (på effektens siste dag). Fyrer første gang eleven LUKKER avisen etter en
  // hovedutgave med minst én effekt-/konkurranse-notis (DATAVAKT via erSwotNotis).
  // Maks én per utgave (id på utgaveUke → fire() dedup).
  useEffect(() => {
    const h = () => {
      const gj = stateRef.current.avisArkiv[0]
      if (gj && gj.notiser.some(erSwotNotis)) fire(`avis_swot|${gj.uke}`)
    }
    window.addEventListener('mentor:avisLukket', h)
    return () => window.removeEventListener('mentor:avisLukket', h)
  }, [fire])

  // DEL 4 — PRELOAD alle mentor-poser ved mount, så et pose-bytte aldri venter på
  // bildelast (ingen «tomt→lastet»-hopp i figuren).
  useEffect(() => {
    for (const src of Object.values(POSE)) { const im = new Image(); im.src = src }
  }, [])

  // DEL 1e — et Fagord-kort er åpent (Fagord.tsx melder via 'mentor:fagord') → samme
  // lese-pose som når ordboka er åpen. Rent visuelt: «mentoren forklarer».
  useEffect(() => {
    const h = (e: Event) => setFagordOpen(!!(e as CustomEvent).detail?.open)
    window.addEventListener('mentor:fagord', h)
    return () => window.removeEventListener('mentor:fagord', h)
  }, [])

  // DEL 1f (KUN DEV) — nullstill ALLE mentor-triggere (engangs/daglige/scene) +
  // introen, så Espen kan testes som en fersk elev. Kun lokalt (localStorage).
  useEffect(() => {
    const h = () => {
      const tom = new Set<string>()
      firedRef.current = tom; setFired(tom); saveFired(tom)
      try { localStorage.removeItem(KEY); localStorage.removeItem(INTRO_KEY) } catch { /* ignore */ }
      setQueue([]); setFaneMsg(null); setForceShow(false); setPaused(false)
      setIntroStep(0)
    }
    window.addEventListener('mentor:reset', h)
    return () => window.removeEventListener('mentor:reset', h)
  }, [])

  // DEL 7 — PRISINGS-MENTORER. Dag-scopede id-er (|år-mnd-dag) re-armes per dag;
  // overpris er per VARE-episode (id per varenavn). Meldingene resolves dynamisk.
  useEffect(() => {
    const dag = `${state.currentYear}-${state.currentMonth}-${state.dayNumber}`
    // (1) Åpner butikken med UPRISEDE varer i eksponering — re-armes per dag.
    // DATAVAKT: minst én upriset vare FAKTISK i disk/vindu (ellers ingenting å si).
    if (state.dayPhase === 'åpen') {
      const iExpo = new Set<string>([
        ...state.counterLayout.map(t => t.productId),
        ...state.windowDisplayLayout.filter(w => w.fixtureId === 'vindu').map(w => w.productId),
      ])
      if (state.products.some(p => iExpo.has(p.id) && p.retailPrice <= 0)) fire(`mangler_pris_apning|${dag}`)
    }
    // (2/7f-d) Dagsoppgjør: tapt salg pga mangler pris (antall) + overpris per vare.
    // DATAVAKT: mangler-pris kun når > 0 stk tapt; overpris kun per FAKTISK vare i
    // lista (tom liste ⇒ ingen overpris-trigger).
    const r = state.lastDayResult
    if (state.dayPhase === 'oppgjør' && r) {
      if (r.manglerPrisStk > 0) fire(`mangler_pris_oppgjor|${dag}`)
      for (const o of r.overprisProdukter) fire(`overpris|${o.navn}`)
    }
  }, [state, fire])

  // KROK 6 — «ESPEN SPØR» kadens. Reduceren gater (maks ett ubesvart, maksPerDag),
  // så disse dispatchene er trygge å fyre ofte — de blir no-op når det ikke passer.
  const aktiveTemaIds = Object.entries(aktiveTemaer).filter(([, v]) => v?.aktiv).map(([k]) => k)
  // LÆRERSTYRT (fikserunde 3): auto-spørsmål fyrer KUN når læreren har skrudd
  // «Espen spør» på; fagpoolen = fag valgt av lærer ∩ globalt aktivt fag.
  const espenAktiv = espenSporStyring.aktiv
  const espenAktiveFag = (['fd', 'm', 'ks'] as FagKode[]).filter(f => espenSporStyring.fag[f] && fagAktiv[f])
  const still = useCallback((kategoriHint: 'kalkyle' | 'drift' | 'malgruppe') => {
    if (!espenAktiv) return   // av som standard — læreren styrer
    dispatch({ type: 'STILL_ESPEN_SPOR', nivaa: klasseNivaa, aktiveTemaIds, aktiveFag: espenAktiveFag, kategoriHint })
  }, [dispatch, klasseNivaa, aktiveTemaIds, espenAktiv, espenAktiveFag])
  // (1) Etter dagsoppgjøret (refleksjonsøyeblikk) → drift/kalkyle. Én gang per dag.
  const spurtDagRef = useRef<string | null>(null)
  useEffect(() => {
    if (state.dayPhase !== 'oppgjør') return
    const dagKey = `${state.currentYear}-${state.currentMonth}-${state.dayNumber}`
    if (spurtDagRef.current === dagKey) return
    spurtDagRef.current = dagKey
    still('drift')
  }, [state.dayPhase, state.dayNumber, state.currentMonth, state.currentYear, still])
  // (2) Etter (ny) prising i løpet av dagen → kalkyle.
  const prisetRef = useRef(state.products.filter(p => p.retailPrice > 0).length)
  useEffect(() => {
    const priset = state.products.filter(p => p.retailPrice > 0).length
    if (priset > prisetRef.current && priset > 0 && state.rentedLocationId) still('kalkyle')
    prisetRef.current = priset
  }, [state.products, state.rentedLocationId, still])
  // (3) Etter målgruppevalg (flere segmenter valgt) → målgruppe.
  const segRef = useRef(state.targetAudience.ageGroups.length)
  useEffect(() => {
    const n = state.targetAudience.ageGroups.length
    if (n > segRef.current) still('malgruppe')
    segRef.current = n
  }, [state.targetAudience.ageGroups, still])
  // Nytt spørsmål → skjul til eleven klikker figuren.
  useEffect(() => { setQuizRevealed(false) }, [state.espenSpor.aktivt?.id])

  // KONTEKSTBUNDNE fane-triggere: dashbordet melder aktiv fane (eller null når
  // det lukkes). Fane-meldingen vises KUN mens den fanen er aktiv. Rekker den
  // ikke frem (ordbok/blokkert/aktiv hendelsesmelding ved fanebytte) blir den
  // IKKE markert fyrt ⇒ re-armes til neste besøk. Aldri drypp i feil fane / ute
  // i spillet.
  const eventShowingRef = useRef(false)
  const handleFane = useCallback((fane: string | null) => {
    if (fane === activeFaneRef.current) return          // ingen reell endring
    activeFaneRef.current = fane
    if (fane) setDashApnet(true)                         // dashbordet er åpnet (TEMA 2/3-trigger)
    setActiveFane(fane)
    // DEL 2 (fikserunde) — RE-ARM en ULEST fane-tips når fanen forlates: faneMsg
    // fortsatt satt = eleven avviste den ikke ⇒ forkast STILLE og re-arm så den
    // kommer igjen ved retur til fanen (engangs-forsøket brennes ikke). Lest/avvist
    // (dismiss → faneMsg=null) forblir fyrt. Dag-scopede id-er (prisstrategi_gjentak)
    // re-armes uansett per dag → hopp over.
    const ulest = faneMsgRef.current
    if (ulest && !ulest.startsWith('prisstrategi_gjentak|')) unpersistFired(ulest)
    setFaneMsg(null)                                     // forlot forrige fane ⇒ dropp meldingen
    if (!fane) {
      // DEL 2 — forlot dashbord-scenen (overlay): en ULEST forste_dashbord-melding
      // (fortsatt i køen) forkastes OG re-armes (kommer igjen neste dashbord-åpning
      // med ro). Er den alt LEST (ikke i køen), forblir den fyrt.
      if (queueRef.current.includes('forste_dashbord')) {
        setQueue(q => q.filter(id => id !== 'forste_dashbord'))
        unpersistFired('forste_dashbord')
      }
      return                                             // dashbordet lukket
    }
    if (ordbokOpenRef.current || blockedRef.current || eventShowingRef.current) return  // kan ikke vises → re-arm
    const t = faneTriggere(fane).find(t => !firedRef.current.has(t.id))
    if (t && persistFired(t.id)) { setFaneMsg(t.id); return }
    // DEL 1d — PRISSTRATEGI-GJENTAK: prisstrategi-introen er alt sett, og sist
    // oppgjorte dag ga «priset over marked»-tap → kort påminnelse ved neste besøk i
    // Priser-fanen. Dag-scopet id ⇒ re-armes per dag (maks én påminnelse/dag).
    // (Over-marked-tap krever en oppgjort salgsdag, så introen er per definisjon
    // eldre enn dagen tapet oppsto — «>1 dag gammel».)
    if (fane === 'priser') {
      const s = stateRef.current
      const introSett = firedRef.current.has('priser_fane') || firedRef.current.has('forste_prising')
      if (introSett && (s.lastDayResult?.overprisStk ?? 0) > 0) {
        const gid = `prisstrategi_gjentak|${s.currentYear}-${s.currentMonth}-${s.dayNumber}`
        if (persistFired(gid)) setFaneMsg(gid)
      }
    }
  }, [persistFired, unpersistFired])

  useEffect(() => {
    const h = (e: Event) => handleFane((e as CustomEvent).detail?.fane ?? null)
    window.addEventListener('mentor:fane', h)
    return () => window.removeEventListener('mentor:fane', h)
  }, [handleFane])

  // KROK 6 — «Espen spør»: aktivt spørsmål har FORRANG over tekstbobler, men vises
  // aldri av seg selv — det venter bak peker-figuren til eleven klikker.
  const quizAktivt = state.espenSpor.aktivt
  const quizSvar = state.espenSpor.sisteSvar
  const quizPending = !!quizAktivt && !quizRevealed
  const quizVises = !!quizAktivt && quizRevealed

  const hasQueued = queue.length > 0
  // KUN ÉN boble om gangen. En event-melding vises når køen ikke er tom, INGEN er
  // pauset (eleven lukket forrige), og den ikke er blokkert (eller er force-vist).
  // Quiz-bobla har forrang, så tekstbobler holdes tilbake mens den vises.
  const eventVises = hasQueued && !paused && (!blocked || forceShow) && !quizVises
  const eventId = eventVises ? queue[0]! : null
  const eventMelding = eventId ? dynamiskMentorMelding(eventId, state) : null
  eventShowingRef.current = !!eventMelding
  // Fane-melding: kun når INGEN event ligger i kø (så aldri to bobler), og ikke
  // under ordbok/blokkering/quiz.
  // Dag-scopede fane-id-er (prisstrategi-gjentak) løses til sin statiske kortversjon.
  const faneMeldingTekst = (id: string) => id.startsWith('prisstrategi_gjentak|') ? mentorMelding('prisstrategi_gjentak') : mentorMelding(id)
  const faneMelding = (faneMsg && !ordbokOpen && !blocked && !hasQueued && !quizVises) ? faneMeldingTekst(faneMsg) : null
  // STI-DYTT: LAVEST prioritet — vises kun når ingen annen boble/quiz/intro er oppe,
  // og eleven ikke har lukket den for gjeldende milepæl. Tom sti ⇒ nesteMil = null ⇒
  // ingen boble (dagens frispill, uendret). Aldri en sperre.
  const stiNudge = (nesteMil && !stiSkjult && !ordbokOpen && !blocked && !hasQueued && !quizVises && introStep === null)
    ? `${stiBra ? 'Bra jobba! ' : ''}🎯 Neste steg på stien: «${nesteMil.label}».`
    : null
  const melding = eventMelding ?? faneMelding ?? stiNudge   // én boble; hendelse har forrang, sti-dytt lavest

  // VENTER: meldinger/quiz står i kø men ingen boble vises ⇒ figuren PEKER +
  // «N»-badge; neste vises når eleven klikker figuren.
  const queueVenter = hasQueued && !eventMelding && !quizVises
  const venter = queueVenter || quizPending
  const badge = (queueVenter ? queue.length : 0) + (quizPending ? 1 : 0)

  // Pose-prioritet: leser (ordbok ELLER Fagord-kort åpent) > nøytral (aktiv melding/
  // quiz) > peker (venter) > vanlig.
  const poseKey: keyof typeof POSE = (ordbokOpen || fagordOpen) ? 'leser' : (melding || quizVises) ? 'noytral' : venter ? 'peker' : 'vanlig'
  const pose = POSE[poseKey]
  // Normaliser høyde + fotlinje (se POSE_JUSTERING): rendret canvashøyde så
  // synlig figur = MENTOR_FIGUR_HOYDE, og heng transparent bunnpadding under
  // foten så baselinen er lik uansett pose.
  const j = POSE_JUSTERING[poseKey]
  const renderH = Math.round(MENTOR_FIGUR_HOYDE / j.chf)
  const hang = Math.round((1 - j.foot) * renderH)

  function dismiss() {
    if (eventMelding) {
      // Lukk den synlige; hvis flere venter → pause så neste ikke stables oppå,
      // men dukker opp bak peker-figuren (badge). Ingen kø igjen → ingen pause.
      setForceShow(false)
      setPaused(queue.length > 1)
      setQueue(q => q.slice(1))
    } else if (faneMsg) setFaneMsg(null)
    else if (stiNudge) { setStiSkjult(true); setStiBra(false) }   // lukk sti-dyttet (kommer tilbake ved steg/scenebytte)
  }

  function figureClick() {
    if (ordbokOpen) { setOrdbokOpen(false); return }
    if (quizPending) { setQuizRevealed(true); return }             // Espen spør → vis spørsmålet
    if (venter) { setPaused(false); setForceShow(true); return }   // peker → vis neste kø-melding
    if (melding || quizVises) return                               // aktiv boble vises alt
    setOrdbokOpen(true)                                            // i ro → åpne ordboka
  }

  return (
    <>
      {/* INTRO ved spillstart — stor Espen midt på skjermen, 3 steg, kan hoppes
          over; på siste steg «Kom i gang!» krymper han mot hjørnet. */}
      <AnimatePresence>
        {introStep !== null && (
          <motion.div
            key="mentor-intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 600, pointerEvents: 'auto',
              background: 'rgba(5,8,15,0.85)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
            }}
          >
            <motion.img
              src={POSE.vanlig} alt="Espen" draggable={false}
              initial={{ scale: 0.6, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.22, x: '42vw', y: '42vh', opacity: 0 }}   // krymper mot hjørnet
              transition={{ type: 'spring', stiffness: 190, damping: 22 }}
              style={{ height: 'min(46vh, 380px)', width: 'auto', filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.6))', userSelect: 'none' }}
            />
            <div style={{
              maxWidth: 460, marginTop: 18, textAlign: 'center',
              background: 'rgba(12,17,29,0.98)', border: '1px solid rgba(0,212,170,0.4)',
              borderRadius: 16, padding: '1.1rem 1.4rem', color: '#e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.09em', marginBottom: 8 }}>ESPEN</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.55, minHeight: 72 }}>{renderMelding(MENTOR_INTRO[introStep] ?? '')}</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '14px 0 2px' }}>
                {MENTOR_INTRO.map((_, i) => (
                  <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i === introStep ? '#00d4aa' : 'rgba(255,255,255,0.22)' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <button onClick={finishIntro} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Hopp over
                </button>
                <button
                  onClick={() => introStep < MENTOR_INTRO.length - 1 ? setIntroStep(introStep + 1) : finishIntro()}
                  style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.55rem 1.5rem', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {introStep < MENTOR_INTRO.length - 1 ? 'Neste →' : 'Kom i gang!'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    <div style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 500, display: 'flex', alignItems: 'flex-end', gap: 8, fontFamily: "'Outfit', sans-serif", pointerEvents: 'none' }}>
      {/* Snakkeboble */}
      <AnimatePresence>
        {melding && (
          <motion.div
            key={eventId ?? faneMsg ?? (stiNudge ? `sti:${nesteMil?.id}` : 'boble')}
            initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            style={{
              pointerEvents: 'auto', maxWidth: 300, marginBottom: 20,
              background: 'rgba(12,17,29,0.98)', border: '1px solid rgba(0,212,170,0.4)',
              borderRadius: '14px 14px 4px 14px', padding: '0.75rem 0.9rem',
              color: '#e2e8f0', boxShadow: '0 10px 34px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.05em' }}>ESPEN</span>
              <button onClick={dismiss} title="Lukk" style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 14, cursor: 'pointer', lineHeight: 1, padding: 0 }}>✕</button>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{renderMelding(melding)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KROK 6 — «ESPEN SPØR»: interaktivt spørsmål i mentor-bobla. Beslutning
          først (svarknapper), fasit + forklaring ETTER svar. Fortegn + tekst
          («Riktig»/«Ikke helt»), aldri kun farge. */}
      <AnimatePresence>
        {quizVises && quizAktivt && (
          <motion.div
            key={`espen-spor-${quizAktivt.id}`}
            initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            style={{
              pointerEvents: 'auto', width: 320, maxWidth: 'calc(100vw - 120px)', marginBottom: 20,
              background: 'rgba(12,17,29,0.98)', border: '1px solid rgba(168,85,247,0.5)',
              borderRadius: '14px 14px 4px 14px', padding: '0.8rem 0.95rem',
              color: '#e2e8f0', boxShadow: '0 10px 34px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#c084fc', letterSpacing: '0.05em' }}>🎓 ESPEN SPØR</span>
              <button onClick={() => dispatch({ type: 'LUKK_ESPEN_SPOR' })} title="Lukk" style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 14, cursor: 'pointer', lineHeight: 1, padding: 0 }}>✕</button>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 8, fontWeight: 600 }}>{renderMelding(quizAktivt.tekst)}</div>

            {/* Svaralternativer — klikkbare før svar, annotert etter. */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {quizAktivt.alternativer.map((alt, i) => {
                const erRiktig = i === quizAktivt.riktigIndex
                const erValgt = quizSvar?.valgtIndex === i
                const svart = !!quizSvar
                // Fargeblind-trygt: alltid en TEKSTETIKETT når svart, ikke bare farge.
                const etikett = svart && erRiktig ? '  ✓ Riktig svar' : (svart && erValgt ? '  ✗ Ditt svar' : '')
                const bg = !svart ? 'rgba(255,255,255,0.05)' : erRiktig ? 'rgba(34,197,94,0.14)' : erValgt ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.03)'
                const bd = !svart ? 'rgba(255,255,255,0.14)' : erRiktig ? 'rgba(34,197,94,0.5)' : erValgt ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.08)'
                return (
                  <button
                    key={i}
                    disabled={svart}
                    onClick={() => { if (!svart) dispatch({ type: 'SVAR_ESPEN_SPOR', index: i }) }}
                    style={{
                      textAlign: 'left', background: bg, border: `1px solid ${bd}`, borderRadius: 8,
                      padding: '0.45rem 0.6rem', color: '#f1f5f9', fontSize: 12.5, fontFamily: 'inherit',
                      cursor: svart ? 'default' : 'pointer',
                    }}
                  >
                    {alt}<span style={{ color: erRiktig ? '#4ade80' : '#fca5a5', fontWeight: 700 }}>{etikett}</span>
                  </button>
                )
              })}
            </div>

            {/* Fasit + forklaring — ALLTID etter svar (aldri før). */}
            {quizSvar && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, marginBottom: 4, color: quizSvar.riktig ? '#4ade80' : '#fca5a5' }}>
                  {quizSvar.riktig
                    ? (quizSvar.belonning > 0 ? `✅ Riktig! Kunnskapsbonus +${quizSvar.belonning} kr` : '✅ Riktig! (dagens kunnskapsbonus er brukt opp)')
                    : '❌ Ikke helt —'}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: '#cbd5e1' }}>{renderMelding(quizAktivt.forklaring)}</div>
                <button
                  onClick={() => dispatch({ type: 'LUKK_ESPEN_SPOR' })}
                  style={{ marginTop: 8, background: 'linear-gradient(135deg,#a855f7,#7c3aed)', border: 'none', borderRadius: 99, padding: '0.4rem 1.1rem', color: '#fff', fontWeight: 800, fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Lukk
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ordbok — «slår seg opp» ved figuren (bok-ramme, lett åpne-animasjon) */}
      <AnimatePresence>
        {ordbokOpen && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.72, scaleY: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1, rotate: 0 }}
            exit={{ opacity: 0, scaleX: 0.72, scaleY: 0.9, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              pointerEvents: 'auto', transformOrigin: 'bottom right',
              position: 'fixed', right: 118, bottom: 24, width: 360, maxWidth: 'calc(100vw - 150px)',
              maxHeight: 'min(72vh, 560px)', display: 'flex', flexDirection: 'column',
              background: 'linear-gradient(180deg, rgba(18,24,38,0.99), rgba(12,17,29,0.99))',
              border: '1px solid rgba(180,140,90,0.5)', borderLeft: '5px solid rgba(180,140,90,0.85)',
              borderRadius: '10px 14px 14px 10px', boxShadow: '0 18px 50px rgba(0,0,0,0.6)', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0.9rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#e2c290' }}>📖 Espens ordbok</span>
              <button onClick={() => setOrdbokOpen(false)} title="Lukk ordboka" style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 16, cursor: 'pointer', lineHeight: 1, padding: 2 }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', padding: '0.8rem 0.9rem 1rem' }}>
              <OrdbokPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Figur + bok-knapp */}
      <div style={{ position: 'relative', pointerEvents: 'auto' }}>
        {/* DEL 4 — FIGUR-CONTAINER MED FAST STØRRELSE: knappen har en låst bounding-
            box (MENTOR_FIGUR_BREDDE × MENTOR_FIGUR_HOYDE) uansett pose. Posen ligger
            ABSOLUTT inni og bunn-forankret (samme anker for alle poser), så pose-
            bytte aldri endrer containerens dimensjoner. Alle poser preloades ved
            mount (se effekt), så et bytte aldri venter på bildelast (ingen «hopp»). */}
        <button
          data-testid="mentor-figur"
          onClick={figureClick}
          title={ordbokOpen ? 'Lukk ordboka' : melding ? 'Espen' : venter ? 'Espen har noe til deg — klikk' : 'Åpne ordboka'}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 0, width: MENTOR_FIGUR_BREDDE, height: MENTOR_FIGUR_HOYDE,
            position: 'relative', overflow: 'visible', display: 'block',
          }}
        >
          {!failedImg ? (
            <img src={pose} alt="Mentor Espen" draggable={false} onError={() => setFailedImg(true)}
              style={{
                position: 'absolute', left: '50%', bottom: -hang, transform: 'translateX(-50%)',
                height: renderH, width: 'auto', display: 'block',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))', userSelect: 'none',
              }} />
          ) : (
            <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 64, height: 64, borderRadius: '50%', background: '#00d4aa22', border: '2px solid #00d4aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🧑‍🏫</div>
          )}
        </button>

        {/* «N»-badge: antall meldinger som venter bak peker-figuren. */}
        {badge > 0 && (
          <span style={{
            position: 'absolute', top: 4, right: 2, minWidth: 20, height: 20, borderRadius: 99,
            background: '#ef4444', color: '#fff', fontSize: 12, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px',
            border: '2px solid rgba(12,17,29,0.9)', boxShadow: '0 2px 6px rgba(0,0,0,0.4)', pointerEvents: 'none',
          }}>{badge}</span>
        )}

        {/* Diskret 📖-bok ved figuren — alltid synlig, egen inngang til ordboka. */}
        <button
          onClick={e => { e.stopPropagation(); setOrdbokOpen(o => !o) }}
          title="Espens ordbok"
          style={{
            position: 'absolute', left: -6, bottom: 6,
            width: 30, height: 30, borderRadius: 8, cursor: 'pointer', fontSize: 15, lineHeight: 1,
            background: ordbokOpen ? 'rgba(226,194,144,0.25)' : 'rgba(12,17,29,0.92)',
            border: `1px solid ${ordbokOpen ? '#e2c290' : 'rgba(226,194,144,0.55)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
          }}
        >📖</button>
      </div>
    </div>
    </>
  )
}
