// ─── KROK 7c — SENTRUMSPOSTEN (lokalavisen, docs/ENGASJEMENT.md) ─────────────
// Ukentlig avis i innboksen som gjør byen levende: nyheter om ELEVENS butikk,
// byens TRENDER med spillbare effekter, og byens AKTØRER. Prinsipper:
//   • Deterministisk seedet mot dagSeed — samme uke gir samme utgave.
//   • DATAVAKT (mentorDaglig-mønsteret): en notis fyrer ALDRI uten grunnlag
//     (`vilkaar`). Milepæl-notiser leser elevens FAKTISKE tall.
//   • FAG-GATING (samme port som innbokstypene): en notis hvis innhold hører til
//     et fag genereres kun når faget er aktivt.
//   • Hver utgave peker FREMOVER: alltid minst én notis om NESTE uke når mulig —
//     avisen er et planleggingsverktøy, ikke pynt.
//   • Trend-effektene HINTER om konsekvensen uten å oppgi tallene (brannalarm-
//     modellen: den som leser og handler, vinner — fasit i dagstallene).
// Motoren (levering/effekt-anvendelse) bor i reduceren (GameContext); her bor
// DATA + rene kalkyler + de seedede malene. Terskler/tall: BALANCE.avis.

import type { GameState, RenderedNotis, AvisUtgave, AvisEffektAktiv, DayResult } from '../types'
import type { FagKode } from './fag'
import { BALANCE } from './balance'
import { DAY_CONFIG } from './dayConfig'

// ── Uke-/dag-hjelpere ────────────────────────────────────────────────────────
/** Monoton absolutt spilldag (samme formel som GameContext.absDag / epostAbsDag). */
export function avisAbsDag(year: number, month: number, dayNumber: number): number {
  return ((year - 1) * 12 + (month - 1)) * DAY_CONFIG.daysPerMonth + dayNumber
}
/** Absolutt uke-nummer (0-basert, monoton). Uke = BALANCE.avis.dagerPerUke dager. */
export function avisUke(absDag: number): number {
  return Math.floor((absDag - 1) / BALANCE.avis.dagerPerUke)
}
/** Ukenr i måneden (1..3 for 12-dagersmåned med 4-dagers uker). */
export function avisUkeIMaaned(dayNumber: number): number {
  return Math.floor((dayNumber - 1) / BALANCE.avis.dagerPerUke) + 1
}
/** «Mandag» — utgavedag: første dag i en uke (dag 1, 5, 9 … monotont). */
export function erAvisdag(absDag: number): boolean {
  return (absDag - 1) % BALANCE.avis.dagerPerUke === 0
}

// ── Seedet RNG (deterministisk, uavhengig av Math.random) ────────────────────
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const intBetween = (r: () => number, lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1))
function shuffle<T>(arr: T[], r: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// ── Data-hjelpere (elevens egne tall) ────────────────────────────────────────
const kr = (n: number) => `${Math.round(n).toLocaleString('nb-NO')} kr`
function butikknavn(s: GameState): string {
  const n = (s.companyName || '').trim()
  return n.length ? n : 'kaféen din'
}
/** DayResult-ene fra FORRIGE uke (uken som nettopp ble avsluttet ved utgivelse). */
function forrigeUke(s: GameState): DayResult[] {
  const naa = avisAbsDag(s.currentYear, s.currentMonth, s.dayNumber)
  const fra = naa - BALANCE.avis.dagerPerUke, til = naa - 1
  return s.dayHistory.filter(d => {
    const ad = avisAbsDag(d.year, d.month, d.dayNumber)
    return ad >= fra && ad <= til
  })
}
const sum = (ds: DayResult[], f: (d: DayResult) => number) => ds.reduce((a, d) => a + f(d), 0)

// ── Effekt-typen (data på en trend-notis) ────────────────────────────────────
interface AvisEffekt {
  /** Hvilken uke effekten gjelder, talt fra utgivelsesuka (default 1 = neste uke). */
  offsetUker?: number
  /** Hvor mange uker effekten varer (default 1). */
  varighetUker?: number
  /** Trafikk-multiplikator (på dagens forventede kundestrøm). */
  trafikkFaktor?: number
  /** Vare-vekt-multiplikator per varekategori (drikke/brod/frokost/kaker/lunsj). */
  vareVekt?: Record<string, number>
  /** Kort merkelapp (dev-panel + mentor). */
  label: string
}

// ── Notis-typen ──────────────────────────────────────────────────────────────
export interface AvisNotis {
  id: string
  kilde: 'butikk' | 'trend' | 'aktor'
  /** FAG-GATING: notisen genereres kun når dette faget er aktivt (utelatt = alltid). */
  fag?: FagKode
  /** DATAVAKT: notisen genereres KUN når dette er sant (aldri på tomt grunnlag). */
  vilkaar: (s: GameState) => boolean
  /** Bygg tittel + tekst (elevens egne tall der det passer). Seedet rng for variasjon. */
  bygg: (s: GameState, r: () => number) => { tittel: string; tekst: string }
  /** Tidsavgrenset spillbar effekt (kun trend-notiser). */
  effekt?: AvisEffekt
  /** true = notisen omtaler NESTE uke (fremover-krav). */
  fremover: boolean
}

const E = BALANCE.avis.effekt

// ── DEL 3 — NOTISENE (journalistisk, kort, med glimt i øyet) ──────────────────
export const NOTISER: AvisNotis[] = [
  // ═══ BUTIKK (elevens egen bedrift) ═══════════════════════════════════════
  {
    id: 'butikk_apningsuke', kilde: 'butikk', fremover: false,
    // DATAVAKT: bedriften er ny (≤ én uke med historikk) OG faktisk åpnet.
    vilkaar: s => s.dayHistory.length > 0 && s.dayHistory.length <= BALANCE.avis.dagerPerUke,
    bygg: s => ({
      tittel: `Nytt liv i Sentrum: ${butikknavn(s)} har åpnet dørene`,
      tekst: `Det lukter nybrygg fra det nyåpnede lokalet i gågata. «Vi gleder oss til å bli en del av nabolaget», er meldingen fra ${butikknavn(s)}, som tok imot sine første kunder denne uka.`,
    }),
  },
  {
    id: 'butikk_salgsmilepael', kilde: 'butikk', fremover: false,
    // DATAVAKT: reell omsetning over disk forrige uke.
    vilkaar: s => sum(forrigeUke(s), d => d.bakgrunnStk) >= 40,
    bygg: s => {
      const stk = sum(forrigeUke(s), d => d.bakgrunnStk)
      return {
        tittel: `God trafikk hos ${butikknavn(s)}`,
        tekst: `Kassa gikk varmt: ${butikknavn(s)} ekspederte rundt ${stk} varer over disk forrige uke. «Byen har tatt oss godt imot», heter det fra disken.`,
      }
    },
  },
  {
    id: 'butikk_rykte', kilde: 'butikk', fremover: false,
    // DATAVAKT: godt rykte (over en hyggelig terskel).
    vilkaar: s => s.reputation >= 65,
    bygg: s => ({
      tittel: `Ordet går om ${butikknavn(s)}`,
      tekst: `Fornøyde gjester anbefaler stedet videre — ${butikknavn(s)} har fått et godt navn i nabolaget. Godt rykte er billigst reklame, sier de som kan bransjen.`,
    }),
  },
  {
    id: 'butikk_nyansettelse', kilde: 'butikk', fremover: false,
    // DATAVAKT: minst én ansatt på laget.
    vilkaar: s => s.employees.length >= 1,
    bygg: s => ({
      tittel: `${butikknavn(s)} utvider staben`,
      tekst: `Flere hender bak disken: ${butikknavn(s)} har fått folk på laget. «Med flere på jobb rekker vi å ta godt imot alle, også i rushet», sier driveren.`,
    }),
  },
  {
    id: 'butikk_lonnsom_maaned', kilde: 'butikk', fremover: false,
    // DATAVAKT: et månedsoppgjør finnes OG det gikk i pluss.
    vilkaar: s => !!s.lastMonthSettlement && s.lastMonthSettlement.resultat > 0,
    bygg: s => ({
      tittel: `Svarte tall for ${butikknavn(s)}`,
      tekst: `Regnskapet smiler: ${butikknavn(s)} landet måneden med overskudd på ${kr(s.lastMonthSettlement!.resultat)} etter faste kostnader. En solid start på et lite bysentrum-eventyr.`,
    }),
  },
  {
    id: 'butikk_kampanje', kilde: 'butikk', fag: 'm', fremover: false,
    // DATAVAKT (fag M): en fullført kampanje i historikken.
    vilkaar: s => s.kampanje.historikk.length > 0,
    bygg: s => ({
      tittel: `${butikknavn(s)} frister med kampanje`,
      tekst: `Plakater og tilbud preget gata denne uka. ${butikknavn(s)} kjørte kampanje — om den lønte seg, vet driveren best selv. Markedsføring virker bare der målgruppa faktisk er.`,
    }),
  },

  // ═══ TREND (byens trender — med SPILLBAR effekt neste uke) ════════════════
  {
    id: 'trend_surdeig', kilde: 'trend', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Surdeigsbølgen skyller inn over byen',
      tekst: 'Alle skal visst bake med surdeig for tiden, og køene utenfor byens bakerier snor seg rundt hjørnet. Ryktes det, holder trenden seg neste uke også — brød og bakst går unna.',
    }),
    effekt: { trafikkFaktor: E.trafikkOpp, vareVekt: { brod: E.vektOpp, frokost: E.vektOpp }, label: 'Surdeigsbølge (+brød/bakst)' },
  },
  {
    id: 'trend_influensa', kilde: 'trend', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Influensaen herjer — færre folk i gata',
      tekst: 'Legekontoret melder om fulle venterom, og mange holder seg hjemme. Neste uke ventes roligere dager i sentrum — men de som kommer, jakter noe varmt og trøstende å drikke.',
    }),
    effekt: { trafikkFaktor: E.trafikkNed, vareVekt: { drikke: E.vektOpp }, label: 'Influensasesong (−trafikk, +varm drikke)' },
  },
  {
    id: 'trend_russetid', kilde: 'trend', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Russetiden nærmer seg — ungdommen inntar sentrum',
      tekst: 'Røde og blå dresser preger snart bybildet. Erfaringsvis fyller det gatene med yngre folk neste uke, og impulskjøpene sitter løsere enn ellers.',
    }),
    effekt: { trafikkFaktor: E.trafikkStorOpp, vareVekt: { drikke: E.vektOpp, kaker: E.vektOpp }, label: 'Russetid (+trafikk, +drikke/søtt)' },
  },
  {
    id: 'trend_regnvaer', kilde: 'trend', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Meteorologen lover en våt uke',
      tekst: 'Lavtrykk på lavtrykk er meldt. Regntunge dager holder mange innendørs neste uke — men en kafé er nettopp der man søker ly, med noe varmt i hånda.',
    }),
    effekt: { trafikkFaktor: E.trafikkNed, vareVekt: { drikke: E.vektStorOpp }, label: 'Regnværsuke (−trafikk, ++varm drikke)' },
  },
  {
    id: 'trend_vaffeldilla', kilde: 'trend', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Vaffeldilla i sosiale medier',
      tekst: 'En lokal matprofil har fått hele byen til å hige etter noe søtt og nybakt. Bølgen ventes å toppe seg neste uke — kaker og søtsaker blir hett.',
    }),
    effekt: { trafikkFaktor: E.trafikkOpp, vareVekt: { kaker: E.vektStorOpp, frokost: E.vektOpp }, label: 'Vaffeldilla (+søtt/bakst)' },
  },
  {
    id: 'trend_gagate', kilde: 'trend', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Gågata pusses opp — full aktivitet om to uker',
      tekst: 'Kommunen setter i gang med ny brostein og benker. Selve arbeidsuka blir rotete, men UKA ETTER neste står gata nypusset og folksom — planlegg deretter.',
    }),
    // Effekt UKEN ETTER neste (offsetUker 2): +forbipasserende.
    effekt: { offsetUker: 2, trafikkFaktor: E.trafikkStorOpp, label: 'Gågate-oppussing (+forbipasserende uken etter neste)' },
  },

  // ═══ AKTØR (byens aktører) ════════════════════════════════════════════════
  {
    id: 'aktor_leverandorpris', kilde: 'aktor', fag: 'fd', fremover: true,
    // DATAVAKT (fag FD): eleven har ført minst én vare (noe å bli dyrere).
    vilkaar: s => s.products.some(p => p.retailPrice > 0),
    bygg: () => ({
      tittel: 'Grossistene varsler prishopp på råvarer',
      tekst: 'Innlandet Engros og flere leverandører melder at innkjøpsprisene kryper oppover fra neste uke. Den som fyller lageret nå, slipper unna den første oppgangen.',
    }),
    // Ingen spill-effekt på trafikk/vekt her; prishopp-mekanikken kobles i en
    // senere runde. Notisen er et FREMOVER-varsel (planlegging).
  },
  {
    id: 'aktor_byhotell', kilde: 'aktor', fremover: true,
    // PARKERT bak turistsesongen: kobles når TURISTSESONG_AKTIV gjenåpnes.
    vilkaar: () => false,
    bygg: () => ({
      tittel: 'Byhotellet melder om fullt belegg til helgen',
      tekst: 'Resepsjonen på byhotellet bekrefter at alle rom er booket. Flere tilreisende i gatene betyr flere potensielle gjester innom — hold disken godt fylt.',
    }),
  },
  {
    id: 'aktor_ny_kafe', kilde: 'aktor', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Ny kafé vurderer å etablere seg i Sentrum',
      tekst: 'Det ryktes at en aktør ser på ledige lokaler noen kvartaler unna. Ingenting er bestemt — men konkurranse holder alle skjerpet, og lojale gjester blir gull verdt.',
    }),
  },
  {
    id: 'aktor_bondens_marked', kilde: 'aktor', fremover: true,
    vilkaar: () => true,
    bygg: () => ({
      tittel: 'Bondens marked flytter til torget neste uke',
      tekst: 'Boder med lokal mat og blomster fyller torget kommende lørdag. Slikt trekker folk til sentrum — en god dag å være åpen og synlig.',
    }),
    effekt: { trafikkFaktor: E.trafikkOpp, label: 'Bondens marked (+forbipasserende)' },
  },
]

// ── Generering ────────────────────────────────────────────────────────────────
/** Bygg ukens utgave deterministisk. Velger 2–4 notiser (fag-gated + datavaktet),
 *  maks ÉN effekt-notis, og garanterer minst én fremover-notis når mulig. Returnerer
 *  utgaven + en ev. planlagt trend-effekt (allerede tidfestet). null hvis ingen
 *  notiser er kvalifisert (skal i praksis ikke skje — flere har vilkaar=true). */
export function genererAvisutgave(
  s: GameState,
  utgaveAbsDag: number,
  fagAktiv: { fd: boolean; m: boolean; ks: boolean },
): { utgave: AvisUtgave; effekt: AvisEffektAktiv | null } | null {
  const r = mulberry32((Math.imul(avisUke(utgaveAbsDag) + 1, 2654435761) ^ 0xa71) >>> 0)
  const kvalifisert = NOTISER.filter(n => (!n.fag || fagAktiv[n.fag]) && n.vilkaar(s))
  if (kvalifisert.length === 0) return null

  const stokket = shuffle(kvalifisert, r)
  const antall = Math.min(intBetween(r, BALANCE.avis.notiserMin, BALANCE.avis.notiserMaks), stokket.length)

  const valgt: AvisNotis[] = []
  const brukt = new Set<string>()
  // Garanter minst én FREMOVER-notis (om noen finnes).
  const fremover = stokket.find(n => n.fremover)
  if (fremover) { valgt.push(fremover); brukt.add(fremover.id) }
  for (const n of stokket) {
    if (valgt.length >= antall) break
    if (brukt.has(n.id)) continue
    if (n.effekt && valgt.some(v => v.effekt)) continue   // maks én effekt-notis
    valgt.push(n); brukt.add(n.id)
  }

  const notiser: RenderedNotis[] = valgt.map(n => {
    const { tittel, tekst } = n.bygg(s, r)
    return { id: n.id, kilde: n.kilde, tittel, tekst, fremover: n.fremover }
  })

  const utgave: AvisUtgave = {
    uke: avisUke(utgaveAbsDag),
    ukeIMaaned: avisUkeIMaaned(s.dayNumber),
    maaned: s.currentMonth,
    aar: s.currentYear,
    notiser,
  }

  // Planlegg trend-effekten (om en effekt-notis ble valgt).
  let effekt: AvisEffektAktiv | null = null
  const eff = valgt.find(n => n.effekt)
  if (eff && eff.effekt) {
    const d = BALANCE.avis.dagerPerUke
    const off = eff.effekt.offsetUker ?? 1
    const varighet = eff.effekt.varighetUker ?? 1
    const fra = utgaveAbsDag + off * d
    effekt = {
      notisId: eff.id,
      label: eff.effekt.label,
      fraAbsDag: fra,
      tilAbsDag: fra + varighet * d - 1,
      trafikkFaktor: eff.effekt.trafikkFaktor ?? 1,
      vareVekt: eff.effekt.vareVekt ?? {},
    }
  }
  return { utgave, effekt }
}

/** LØPENDE notiser (mellom hovedutgaver): butikk-/aktør-notiser hvis vilkår har
 *  blitt sanne, som IKKE alt ligger i gjeldende utgave. Trend-notiser er
 *  UTGAVE-BUNDET (bare i hovedutgaven — ukesrytmen er planleggingsmekanikken) og
 *  ekskluderes her. Seedet rekkefølge, maks `maks` per kall (per dag). */
export function løpendeNotiser(
  s: GameState,
  gjeldende: AvisUtgave | undefined,
  fagAktiv: { fd: boolean; m: boolean; ks: boolean },
  utgaveAbsDag: number,
  maks: number,
): RenderedNotis[] {
  if (!gjeldende || maks <= 0) return []
  const iUtgaven = new Set(gjeldende.notiser.map(n => n.id))
  const r = mulberry32((Math.imul(utgaveAbsDag + 1, 40503) ^ 0x10fe) >>> 0)
  const kand = NOTISER.filter(n =>
    n.kilde !== 'trend' && (!n.fag || fagAktiv[n.fag]) && n.vilkaar(s) && !iUtgaven.has(n.id))
  return shuffle(kand, r).slice(0, maks).map(n => {
    const { tittel, tekst } = n.bygg(s, r)
    return { id: n.id, kilde: n.kilde, tittel, tekst, fremover: n.fremover }
  })
}

/** Test-/introspeksjon: id-ene til notisene som er KVALIFISERT (datavakt + fag-
 *  gating) for gjeldende state. (Selve utgaven velger 2–4 av disse seedet.) */
export function kvalifiserteNotiser(s: GameState, fagAktiv: { fd: boolean; m: boolean; ks: boolean }): string[] {
  return NOTISER.filter(n => (!n.fag || fagAktiv[n.fag]) && n.vilkaar(s)).map(n => n.id)
}

/** ⚙ DEV — aktiver en seedet trend-effekt STRAKS (fra `fraAbsDag`), så Espen kan
 *  se effekten i dagstallene uten å vente en uke. Velger en trend-notis med effekt
 *  (deterministisk variasjon per dag). */
export function devUtlosTrend(fraAbsDag: number): AvisEffektAktiv {
  const kandidater = NOTISER.filter(n => n.kilde === 'trend' && n.effekt)
  const n = kandidater[Math.abs(fraAbsDag) % kandidater.length]
  const e = n.effekt!
  const d = BALANCE.avis.dagerPerUke
  return {
    notisId: n.id, label: e.label, fraAbsDag,
    tilAbsDag: fraAbsDag + (e.varighetUker ?? 1) * d - 1,
    trafikkFaktor: e.trafikkFaktor ?? 1, vareVekt: e.vareVekt ?? {},
  }
}

/** Aktiv trend-effekt på en gitt spilldag (leses av OPEN_DAY). null = ingen. */
export function avisEffektAktiv(s: GameState, absDag: number): { trafikkFaktor: number; vareVekt: Record<string, number> } | null {
  const e = s.avisEffekt
  if (!e || absDag < e.fraAbsDag || absDag > e.tilAbsDag) return null
  return { trafikkFaktor: e.trafikkFaktor, vareVekt: e.vareVekt }
}
