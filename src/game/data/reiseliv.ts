// ─── TEMA 15 REISELIV — pakkebyggeren (DEL 7, reiselivsprodukt) ───────────────
// Data + ren match-logikk for «Sett sammen en pakke». Eleven velger en
// BESØKSPROFIL (roterer deterministisk) og drar 3 OPPLEVELSER inn i en pakke;
// treffet mot profilens SKJULTE behov regnes her (aldri vist som fasit) og gir
// et resultatkort med tall + tilbakemeldinger. Alle steder/opplevelser er
// FIKTIVE (Lillehammer-klasse by, ingen ekte navn). Vekter bor i balance.ts.

import { BALANCE } from './balance'
import { TURIST_OPPLEVELSE_ID, TURISTKONTOR_SCENARIO_IDS, BYHOTELL_SCENARIO_IDS } from '../sales/scenarios'

/** En besøksprofil — behovene beskrives i TEKST (aldri som fasitliste). De
 *  skjulte preferansene (liker/maksTimer/prisPref) styrer treffet, men vises ikke. */
export interface Besoksprofil {
  id: string
  navn: string
  /** Fritekst som beskriver gjestene og situasjonen (det eleven ser). */
  tekst: string
  /** SKJULT: egenskaper profilen liker, timebudsjett, prisnivå-preferanse (1–3). */
  liker: string[]
  maksTimer: number
  prisPref: 1 | 2 | 3
}

/** En lokal opplevelse (kort i opplevelsesbanken). FIKTIV. */
export interface Opplevelse {
  id: string
  navn: string
  beskrivelse: string
  /** Varighet i timer. */
  varighet: number
  /** Prisklasse 1 (billig) – 3 (dyr). */
  prisklasse: 1 | 2 | 3
  /** Egenskaper som matches mot profilens `liker`. */
  egenskaper: string[]
}

/** Elevens EGEN kafé er alltid et kort i banken. */
export const EGEN_KAFE_ID = 'egen-kafe'

export const BESOKSPROFILER: Besoksprofil[] = [
  {
    id: 'barnefamilie',
    navn: 'Barnefamilie på gjennomreise',
    tekst: 'Barna er 4 og 7 år, og foreldrene vil ha ÉN rolig aktivitet og et sted å spise før de kjører videre. De har ikke hele dagen, og lommeboka er ikke stor.',
    liker: ['familie', 'rolig', 'mat'], maksTimer: 4, prisPref: 1,
  },
  {
    id: 'aktivt-par',
    navn: 'Aktivt par',
    tekst: 'Et sprekt par i 30-åra vil ha noe fysisk å finne på ute, og litt mat underveis. De har hele dagen og bruker gjerne litt penger på en god opplevelse.',
    liker: ['aktiv', 'natur'], maksTimer: 8, prisPref: 2,
  },
  {
    id: 'seniorbuss',
    navn: 'Busslast med seniorer',
    tekst: 'En busslast pensjonister vil ha kultur og noe fint å se på, i rolig tempo, gjerne med en kaffepause innimellom. Ingenting for anstrengende.',
    liker: ['kultur', 'rolig', 'mat'], maksTimer: 5, prisPref: 2,
  },
  {
    id: 'konferansegjest',
    navn: 'Konferansegjest med én fridag',
    tekst: 'En konferansegjest har ÉN ledig ettermiddag — rundt fem timer — og vil oppleve noe ekte lokalt før hun reiser hjem. Hun er alene og har god råd.',
    liker: ['kultur', 'natur'], maksTimer: 5, prisPref: 3,
  },
]

export const OPPLEVELSER: Opplevelse[] = [
  { id: 'bymuseum',        navn: 'Bymuseet',            beskrivelse: 'Byens historie under ett tak — smått og trivelig.',        varighet: 2, prisklasse: 1, egenskaper: ['kultur', 'rolig'] },
  { id: 'fjellsti',        navn: 'Fjellstien',          beskrivelse: 'Merket tur opp til utsiktspunktet over byen.',             varighet: 4, prisklasse: 1, egenskaper: ['natur', 'aktiv'] },
  { id: 'kanefart',        navn: 'Kanefart',            beskrivelse: 'Rolig hesteskyss langs elva — kort og koselig.',           varighet: 1, prisklasse: 2, egenskaper: ['natur', 'rolig', 'familie'] },
  { id: 'klatrepark',      navn: 'Klatreparken',        beskrivelse: 'Klatreløyper i trærne for store og små.',                  varighet: 3, prisklasse: 2, egenskaper: ['aktiv', 'familie'] },
  { id: 'gagate-vandring', navn: 'Gågate-vandring',     beskrivelse: 'Guidet rusletur gjennom den gamle bykjernen.',            varighet: 1, prisklasse: 1, egenskaper: ['kultur', 'rolig'] },
  { id: 'badeland',        navn: 'Badelandet',          beskrivelse: 'Sklier og bassenger — en fulltreffer for barna.',          varighet: 3, prisklasse: 2, egenskaper: ['familie', 'aktiv'] },
  { id: 'gardsbesok',      navn: 'Gårdsbesøket',        beskrivelse: 'Dyr å klappe og gårdsmat å smake, i rolig tempo.',         varighet: 2, prisklasse: 1, egenskaper: ['familie', 'rolig', 'mat'] },
  { id: 'kunstgalleri',    navn: 'Kunstgalleriet',      beskrivelse: 'Skiftende utstillinger av lokale kunstnere.',              varighet: 2, prisklasse: 2, egenskaper: ['kultur'] },
  { id: 'sykkelutleie',    navn: 'Sykkelutleie',        beskrivelse: 'Lei sykkel og utforsk stiene rundt vannet.',               varighet: 3, prisklasse: 1, egenskaper: ['aktiv', 'natur'] },
  { id: EGEN_KAFE_ID,      navn: 'Kaffe & kake hos deg', beskrivelse: 'Din egen kafé — et hyggelig stopp i pakken.',             varighet: 1, prisklasse: 1, egenskaper: ['mat', 'rolig'] },
]

export const opplevelseById = (id: string): Opplevelse | undefined => OPPLEVELSER.find(o => o.id === id)

// ─── TURIST-SPRITER (bølge 3) ────────────────────────────────────────────────
// Ett turist-ark (customers-ark-05) splittet til 6 besøkende + den godkjente
// kart-turisten. Registeret gjør spritene tilgjengelige for (a) scenario-binding
// og (b) ambient-gjester i interiøret. spriteCal-FØRSTEPASS: singel-figurene har
// samme aspect (~0,36–0,40) som kari/tom → den DELTE base-kalibreringen
// (INTERIOR_CUSTOMER_STAND) er et gyldig førstepass i scenariene; par-/familie-
// arkene er bredere (to kropper i én sprite) men object-fit:contain håndterer
// bredden i ambient-slotene. Espen finpusser ev. per-sprite via ?dev=1.
export interface TuristSprite {
  id: string
  fil: string
  navn: string
  /** Scenario-id sprite er bundet til (om noen). Resten venter fremtidige scenarier. */
  scenario?: string
  /** Flere kropper i ÉN sprite (par/familie) — opptrer alltid samlet. */
  gruppe?: boolean
}

const CUST = '/assets/raw/customers'
export const TURIST_SPRITER: TuristSprite[] = [
  { id: 'turist-kart',        fil: `${CUST}/turist-kart.png`,        navn: 'Kart-turisten',          scenario: 'sprakbarrieren' },
  { id: 'turist-kamera',      fil: `${CUST}/turist-kamera.png`,      navn: 'Turist med kamera',      scenario: 'anbefal-opplevelse' },
  { id: 'turist-familie',     fil: `${CUST}/turist-familie.png`,     navn: 'Turistfamilie',          gruppe: true },
  { id: 'turist-par',         fil: `${CUST}/turist-par.png`,         navn: 'Turistpar med kart',     gruppe: true },
  { id: 'turist-eldre-stokk', fil: `${CUST}/turist-eldre-stokk.png`, navn: 'Eldre turist med stokk' },
  { id: 'turist-backpacker',  fil: `${CUST}/turist-backpacker.png`,  navn: 'Backpacker' },
  { id: 'turist-eldrepar',    fil: `${CUST}/turist-eldrepar.png`,    navn: 'Eldre turistpar',        gruppe: true },
]

// ─── E-POSTFORESPØRSLER OM PAKKE (turistkontor-scene DEL d) ───────────────────
// Seedede pakke-forespørsler som havner i innboksen ved sesongstart. Hver mapper
// til en BESØKSPROFIL (samme skjulte behov styrer treffet); «Svar med en pakke»
// åpner pakkebyggeren mot profilen. E-postteksten er førsteperson (gjesten selv).
export interface PakkeForesporsel {
  id: string
  profilId: string
  tittel: string
  epost: string
}
export const PAKKE_FORESPORSLER: PakkeForesporsel[] = [
  { id: 'famferie', profilId: 'barnefamilie', tittel: '📧 Familie ønsker pakkeforslag',
    epost: 'Hei! Vi er en familie på 4 (barn på 4 og 7) som skal en dag i byen i vinterferien. Budsjett rundt 1 500 kr. Kan dere foreslå noe rolig vi kan finne på, og et sted å spise? Mvh Familien Berg' },
  { id: 'aktivpar', profilId: 'aktivt-par', tittel: '📧 Aktivt par spør om tips',
    epost: 'Hallo! Kjæresten og jeg (begge glad i å være ute) har en hel dag i byen og vil finne på noe fysisk, med litt mat underveis. Vi bruker gjerne litt penger på en god opplevelse. Har dere forslag?' },
  { id: 'seniorbuss', profilId: 'seniorbuss', tittel: '📧 Bussgruppe ber om opplegg',
    epost: 'God dag. Vi kommer med en busslast pensjonister og ønsker et rolig kulturopplegg med en kaffepause innimellom. Ingenting for anstrengende. Kan dere sette sammen noe?' },
  { id: 'konferanse', profilId: 'konferansegjest', tittel: '📧 Konferansegjest med én fridag',
    epost: 'Hei, jeg er på konferanse og har én ledig ettermiddag (ca. 5 timer). Jeg vil oppleve noe ekte lokalt før jeg reiser hjem, og har god råd. Hva anbefaler dere?' },
]

/** Seedet, distinkt utvalg av N pakke-forespørsler. Ren fn (ingen Math.random). */
export function velgPakkeForesporsler(seed: number, n: number): PakkeForesporsel[] {
  const pool = [...PAKKE_FORESPORSLER]
  const valgt: PakkeForesporsel[] = []
  const antall = Math.max(0, Math.min(n, pool.length))
  let s = seed >>> 0
  for (let i = 0; i < antall; i++) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    valgt.push(pool.splice(s % pool.length, 1)[0]!)
  }
  return valgt
}

// ─── REISELIVS-SCENARIO-INNGANGER (bølge 3 v3) ───────────────────────────────
// Turistene er UT av kaféen. Turistkontoret og byhotellet har hver sin «møt
// en …»-inngang som starter ett scenario (seedet rotasjon) med dialogkort-UI.

/** Seedet valg av ett turistkontor-scenario (Språkbarrieren / Opplevelsen).
 *  «Opplev byen»-gjestepakke-påmelding vekter mot opplevelses-anbefalingen
 *  (gjestepakke-effekten flyttet hit fra kaféens scenariofrekvens). Ren fn. */
export function velgTuristkontorScenario(seed: number, opplevByen: boolean): string {
  const pool = opplevByen
    ? [TURIST_OPPLEVELSE_ID, ...TURISTKONTOR_SCENARIO_IDS]  // ekstra vekt på opplevelse
    : [...TURISTKONTOR_SCENARIO_IDS]
  return pool[(seed >>> 0) % pool.length]!
}

/** Seedet valg av ett byhotell-scenario (Kulturmøtet / Tax-free). Ren fn. */
export function velgByhotellScenario(seed: number): string {
  return BYHOTELL_SCENARIO_IDS[(seed >>> 0) % BYHOTELL_SCENARIO_IDS.length]!
}

/** Deterministisk utvalg av N distinkte ambient-turister fra registeret, seedet
 *  av dagen. Ren funksjon (ingen Math.random) — samme dag gir samme gjester, så
 *  interiøret er stabilt gjennom dagen men varierer fra dag til dag. */
export function velgAmbientTurister(seed: number, n: number): TuristSprite[] {
  const pool = [...TURIST_SPRITER]
  const valgt: TuristSprite[] = []
  const antall = Math.max(0, Math.min(n, pool.length))
  let s = seed >>> 0
  for (let i = 0; i < antall; i++) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    valgt.push(pool.splice(s % pool.length, 1)[0]!)
  }
  return valgt
}

/** Deterministisk profilrotasjon — velg profil ut fra et heltall (f.eks. et
 *  seed avledet av dato). Ingen Math.random. */
export function velgProfil(n: number): Besoksprofil {
  const i = ((n % BESOKSPROFILER.length) + BESOKSPROFILER.length) % BESOKSPROFILER.length
  return BESOKSPROFILER[i]!
}

export interface PakkeResultat {
  /** Treff 0–1 mot profilens skjulte behov. */
  treff: number
  /** Antall turister som «kjøpte pakken» (avledet av treff × sesongturister). */
  turister: number
  /** 2–3 korte tilbakemeldinger generert fra beste/verste kort (match/mismatch). */
  tilbakemeldinger: string[]
  /** Egen kafé med i pakken → ekstra kafé-trafikk i sesongen. */
  egenKafe: boolean
}

/** REN treff-beregning (delt fasit — brukt av reducer OG spilltest). Treffet er
 *  summen av kortenes egenskaps-overlapp med profilens `liker`, minus straff for
 *  for lang total varighet og for dyr prisklasse; klemt og normalisert 0–1.
 *  Deterministisk. `sesongTuristerPerDag` skalerer «X kjøpte pakken». */
export function beregnPakke(kortIds: string[], profil: Besoksprofil, sesongTuristerPerDag: number): PakkeResultat {
  const P = BALANCE.turistsesong.pakke
  const kort = kortIds.map(opplevelseById).filter((o): o is Opplevelse => !!o)
  let poeng = 0
  for (const o of kort) {
    for (const e of o.egenskaper) if (profil.liker.includes(e)) poeng += P.egenskapVekt
    if (o.prisklasse > profil.prisPref) poeng -= P.prisStraff * (o.prisklasse - profil.prisPref)
  }
  const totalTimer = kort.reduce((s, o) => s + o.varighet, 0)
  if (totalTimer > profil.maksTimer) poeng -= P.timerStraff * (totalTimer - profil.maksTimer)
  const treff = Math.max(0, Math.min(1, poeng / P.maksTreff))
  const turister = Math.round(sesongTuristerPerDag * treff * P.turisterMultiplikator)

  // Tilbakemeldinger: beste kort (flest matchende egenskaper) → positiv; kort som
  // sprenger tidsbudsjettet eller ikke passer → negativ. Deterministisk utvalg.
  const scoreKort = (o: Opplevelse) => o.egenskaper.filter(e => profil.liker.includes(e)).length
  const sortert = [...kort].sort((a, b) => scoreKort(b) - scoreKort(a))
  const tilbakemeldinger: string[] = []
  const best = sortert[0]
  if (best && scoreKort(best) > 0) tilbakemeldinger.push(`«${best.navn}» var midt i blinken for oss.`)
  const verst = sortert[sortert.length - 1]
  if (verst && verst !== best) {
    if (scoreKort(verst) === 0) tilbakemeldinger.push(`«${verst.navn}» passet ikke helt for oss.`)
    else if (totalTimer > profil.maksTimer) tilbakemeldinger.push(`Vi rakk dessverre ikke alt — det ble litt for mye på én dag.`)
  }
  if (kortIds.includes(EGEN_KAFE_ID)) tilbakemeldinger.push(`Kaffestoppen hos deg var et hyggelig avbrekk.`)

  return { treff, turister, tilbakemeldinger: tilbakemeldinger.slice(0, 3), egenKafe: kortIds.includes(EGEN_KAFE_ID) }
}
