import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { MENTOR_TRIGGERS, mentorMelding, faneTriggere, MENTOR_INTRO } from '../data/mentorTriggers'
import Fagord from './Fagord'
import OrdbokPanel from './OrdbokPanel'
import { kanalById, kanalTreffISegmenter } from '../data/kampanje'
import type { GameState } from '../types'

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
 *  bykart) kommer via 'mentor:signal'; fane-triggere via 'mentor:fane'. */
function oppfylt(id: string, s: GameState): boolean {
  switch (id) {
    case 'forste_apning': return s.dayPhase === 'åpen'
    case 'forste_bestilling_levert': return s.lastDelivery != null
    case 'forste_laan': return s.loans.length > 0
    case 'forste_manedsoppgjor': return s.lastMonthSettlement != null
    case 'forste_eierlonn': return s.lastMonthSettlement != null
    case 'forste_svinn': return (s.lastDayResult?.svinnStk ?? 0) > 0
    case 'forste_tomt_trau': return (s.lastDayResult?.tomtProdukter.length ?? 0) > 0
    case 'forste_ko': return (s.lastDayResult?.koKunder ?? 0) > 0
    case 'forste_p_fullfort': return s.p1_complete || s.p2_complete || s.p3_complete || s.p4_complete
    case 'alle_p_fullfort': return s.p1_complete && s.p2_complete && s.p3_complete && s.p4_complete
    // TEMA 1: Beredskap (tema_beredskap_aktivert fyres via aktiveTemaer-effekten).
    case 'beredskap_plan_bekreftet': return s.beredskap.planBekreftet
    case 'beredskap_risiko_levert': return s.beredskap.risikoLagret
    case 'beredskap_brannalarm_handtert': return (s.beredskap.brannalarmUtfall?.rekkefolge.length ?? 0) > 0
    // DEL 4 (fiksrunde 2): første brannØVELSE etter en FEILET skarp alarm.
    case 'beredskap_ovelse_etter_feil':
      return (s.beredskap.brannalarmUtfall?.rekkefolge.length ?? 0) > 0
        && s.beredskap.brannalarmUtfall?.kvalitet === 'bad'
        && s.beredskap.brannovelser.length > 0
    // TEMA 2/3: leser den transiente oppgjørs-payloaden (satt ved månedsrull).
    case 'budsjett_avvik_storst': return !!s.budsjettOppgjorHint?.storstAvvik
    case 'nokkeltall_dekningsgrad_avvik': {
      const d = s.budsjettOppgjorHint?.dekningsgradAvvik
      return !!d && Math.abs(d.ditt - d.bok) > 5
    }
    // TEMA 8: leser siste fullførte kampanje (effektrapport + førpris-brudd).
    case 'kampanje_effekt': return s.kampanje.historikk.length > 0
    case 'kampanje_forpris_brudd': return s.kampanje.historikk[s.kampanje.historikk.length - 1]?.forprisBrudd === true
    default: return false
  }
}

const RISIKO_RANG: Record<string, number> = { lav: 1, middels: 2, høy: 3 }

/** Dynamiske mentor-meldinger som leser elevens egne verdier (beredskap).
 *  Faller tilbake på den statiske teksten for andre id-er. */
function dynamiskMentorMelding(id: string, s: GameState): string | undefined {
  const kr = (n: number) => `${Math.round(n).toLocaleString('nb-NO')} kr`
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
  const { state, aktiveTemaer } = useGame()
  const [fired, setFired] = useState<Set<string>>(loadFired)
  const [queue, setQueue] = useState<string[]>([])          // HENDELSES-kø (peker/kø)
  const [faneMsg, setFaneMsg] = useState<string | null>(null)  // KONTEKSTBUNDET fane-melding
  const [activeFane, setActiveFane] = useState<string | null>(null)
  const [failedImg, setFailedImg] = useState(false)
  const [ordbokOpen, setOrdbokOpen] = useState(false)
  const [forceShow, setForceShow] = useState(false)   // bruker klikket peker-figuren
  const [paused, setPaused] = useState(false)         // melding lukket, neste venter bak peker
  // INTRO ved spillstart (null = ferdig/skjult, 0..2 = steg). Vises én gang.
  const [introStep, setIntroStep] = useState<number | null>(() => introDone() ? null : 0)
  function finishIntro() { saveIntroDone(); setIntroStep(null) }
  const firedRef = useRef(fired); firedRef.current = fired
  // Refs så event-lyttere (mentor:fane) leser FERSKE verdier uten å re-bindes.
  const ordbokOpenRef = useRef(ordbokOpen); ordbokOpenRef.current = ordbokOpen
  const blockedRef = useRef(blocked); blockedRef.current = blocked
  const activeFaneRef = useRef(activeFane)
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

  useEffect(() => {
    for (const t of MENTOR_TRIGGERS) if (oppfylt(t.id, state)) fire(t.id)
  }, [state, fire])

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
      const varAktivVedStart = temaVedStart.current[tema]
      if (!varAktivVedStart || dashApnet) fire(`tema_${tema}_aktivert`)
    }
  }, [aktiveTemaer, dashApnet, fire])

  // Scene-signaler (disk_stell/vindu/bykart) → hendelses-kø.
  useEffect(() => {
    const h = (e: Event) => fire((e as CustomEvent).detail?.id)
    window.addEventListener('mentor:signal', h)
    return () => window.removeEventListener('mentor:signal', h)
  }, [fire])

  // DEL 7 — PRISINGS-MENTORER. Dag-scopede id-er (|år-mnd-dag) re-armes per dag;
  // overpris er per VARE-episode (id per varenavn). Meldingene resolves dynamisk.
  useEffect(() => {
    const dag = `${state.currentYear}-${state.currentMonth}-${state.dayNumber}`
    // (1) Åpner butikken med UPRISEDE varer i eksponering — re-armes per dag.
    if (state.dayPhase === 'åpen') {
      const iExpo = new Set<string>([
        ...state.counterLayout.map(t => t.productId),
        ...state.windowDisplayLayout.filter(w => w.fixtureId === 'vindu').map(w => w.productId),
      ])
      if (state.products.some(p => iExpo.has(p.id) && p.retailPrice <= 0)) fire(`mangler_pris_apning|${dag}`)
    }
    // (2/7f-d) Dagsoppgjør: tapt salg pga mangler pris (antall) + overpris per vare.
    const r = state.lastDayResult
    if (state.dayPhase === 'oppgjør' && r) {
      if (r.manglerPrisStk > 0) fire(`mangler_pris_oppgjor|${dag}`)
      for (const o of r.overprisProdukter) fire(`overpris|${o.navn}`)
    }
  }, [state, fire])

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
    setFaneMsg(null)                                     // forlot forrige fane ⇒ dropp meldingen
    if (!fane) return                                    // dashbordet lukket
    if (ordbokOpenRef.current || blockedRef.current || eventShowingRef.current) return  // kan ikke vises → re-arm
    const t = faneTriggere(fane).find(t => !firedRef.current.has(t.id))
    if (t && persistFired(t.id)) setFaneMsg(t.id)
  }, [persistFired])

  useEffect(() => {
    const h = (e: Event) => handleFane((e as CustomEvent).detail?.fane ?? null)
    window.addEventListener('mentor:fane', h)
    return () => window.removeEventListener('mentor:fane', h)
  }, [handleFane])

  const hasQueued = queue.length > 0
  // KUN ÉN boble om gangen. En event-melding vises når køen ikke er tom, INGEN er
  // pauset (eleven lukket forrige), og den ikke er blokkert (eller er force-vist).
  const eventVises = hasQueued && !paused && (!blocked || forceShow)
  const eventId = eventVises ? queue[0]! : null
  const eventMelding = eventId ? dynamiskMentorMelding(eventId, state) : null
  eventShowingRef.current = !!eventMelding
  // Fane-melding: kun når INGEN event ligger i kø (så aldri to bobler), og ikke
  // under ordbok/blokkering.
  const faneMelding = (faneMsg && !ordbokOpen && !blocked && !hasQueued) ? mentorMelding(faneMsg) : null
  const melding = eventMelding ?? faneMelding     // én boble; hendelse har forrang

  // VENTER: meldinger står i kø men ingen boble vises (pauset eller blokkert) ⇒
  // figuren PEKER + «N»-badge; neste vises når eleven klikker figuren.
  const venter = hasQueued && !eventMelding
  const badge = venter ? queue.length : 0

  // Pose-prioritet: leser > nøytral (aktiv melding) > peker (venter i kø) > vanlig (hvile).
  const poseKey: keyof typeof POSE = ordbokOpen ? 'leser' : melding ? 'noytral' : venter ? 'peker' : 'vanlig'
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
  }

  function figureClick() {
    if (ordbokOpen) { setOrdbokOpen(false); return }
    if (venter) { setPaused(false); setForceShow(true); return }   // peker → vis neste kø-melding
    if (melding) return                                            // aktiv melding vises alt
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
            key={eventId ?? faneMsg}
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
        <button
          onClick={figureClick}
          title={ordbokOpen ? 'Lukk ordboka' : melding ? 'Espen' : venter ? 'Espen har noe til deg — klikk' : 'Åpne ordboka'}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 0, width: MENTOR_FIGUR_BREDDE, height: MENTOR_FIGUR_HOYDE,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'visible',
          }}
        >
          {!failedImg ? (
            <img src={pose} alt="Mentor Espen" draggable={false} onError={() => setFailedImg(true)}
              style={{ height: renderH, width: 'auto', marginBottom: -hang, display: 'block', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))', userSelect: 'none' }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#00d4aa22', border: '2px solid #00d4aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🧑‍🏫</div>
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
