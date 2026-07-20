// ─── KROK 7 — DEN LEVENDE INNBOKSEN (docs/ENGASJEMENT.md) ────────────────────
// E-post-motoren som gjør innboksen til en quest-bærer: seedede, tidsavgrensede
// e-poster der hver enten er noe å GJØRE (kundebestilling) eller noe å VURDERE
// (leverandør-/markedsføringstilbud). Prinsipper (rammene i ENGASJEMENT.md):
//   • Deterministisk seedet mot dagSeed — samme dag gir samme post.
//   • Tunbart tak (1–3/dag, VG1 skal ikke drukne) — balance.innboks.
//   • Frist er ekte: utløpt frist = konsekvens (tapt mulighet / skuffet kunde),
//     ALDRI stille forsvinning.
//   • ALDRI fasit underveis (brannalarm-modellen): beslutning først, refleksjon
//     etterpå. Fortegn + tekst, aldri kun farge (Espen er fargeblind).
// Motoren (generering/utløp/levering/effekt) bor i reduceren (GameContext); her
// bor DATA + rene kalkyler + de seedede malene. Kanaldata for 7d GJENBRUKER
// kampanjens skjulte kanal×målgruppe-treff (treffISegmenter) — samme fasit.

import type { InboxMessage, Product } from '../types'
import type { IpsosBucket } from './kampanje'
import { treffISegmenter } from './kampanje'
import { BALANCE } from './balance'
import { DAY_CONFIG } from './dayConfig'

// ── E-post-typene (quest-bærende InboxMessage-undertyper) ────────────────────
export type EpostKind = 'kundebestilling' | 'leverandortilbud' | 'mkftilbud'
/** Quest-livsløpet (adskilt fra InboxMessage.read = lest/ulest). */
export type EpostStatus =
  | 'ubesvart'   // ligger til beslutning (frist løper)
  | 'akseptert'  // takket ja — forpliktelse/effekt aktivert
  | 'avslatt'    // takket nei
  | 'levert'     // kundebestilling oppfylt på leveringsdagen
  | 'sviktet'    // kundebestilling: for lite på lager på leveringsdagen
  | 'utlopt'     // frist gikk ut uten svar

/** 7a — Kundebestilling: «sett av X til dato». Aksept = forpliktelse fram i tid;
 *  levering skjer automatisk på leveringsdagen (nok lager → betaling, ellers
 *  skuffet kunde). Åpner distribusjonstrappas trinn 2 (salg utenom disk). */
export interface KundebestillingPayload {
  kind: 'kundebestilling'
  varer: { productId: string; navn: string; qty: number }[]
  anledning: string
  /** Absolutt spilldag varene skal leveres (og betaling faller). */
  leveringAbsDag: number
  leveringTekst: string
  /** Valgt ved aksept: mengderabatt eleven gir (0..1) + VG2 skriftlig pristilbud. */
  mengderabatt?: number
  pristilbud?: string
}

/** 7b — Leverandørtilbud: rabatt mot minstekjøp, kort frist. Noen ER dårlige
 *  (regnestykket avslører); ett og annet er villedende (erLureri) → forbereder
 *  personvern-temaets phishing. Aksept → rabattert innkjøp på vei til lager. */
export interface LeverandortilbudPayload {
  kind: 'leverandortilbud'
  productId: string
  navn: string
  antall: number
  /** «Listepris» tilbudet regner rabatten FRA (kan være oppblåst = lureri). */
  listeprisPerEnhet: number
  rabattProsent: number
  erLureri: boolean
  /** Elevens normale innkjøpspris (costPrice) på tilbudstidspunktet — snapshot
   *  så «lønner det seg?»-regnestykket er stabilt uansett senere prisendring. */
  normalKostPerEnhet: number
  /** Satt ved aksept: absolutt ankomstdag for det rabatterte innkjøpet. */
  ankomstAbsDag?: number
}

/** 7d — Markedsføringstilbud: innkommende tilbud fra annonseselgere/influensere/
 *  medier med SKJULT kanal×målgruppe-treff (gjenbruk av kampanjens kanaldata).
 *  Eleven vurderer om kanalen når EGEN målgruppe. Aksept → tidsavgrenset
 *  trafikkboost via samme treff-modell. Noen er overpriset. */
export interface MkftilbudPayload {
  kind: 'mkftilbud'
  tilbyder: string
  kanalNavn: string
  /** true = ekte plattformtype (undervisningsdata), false = fiktivt medium. */
  ekte: boolean
  kostnad: number
  varighetDager: number
  /** Skjult daglig treff (%) per Ipsos-aldersgruppe — vises ALDRI i spill-UI. */
  treff: Record<IpsosBucket, number>
  erOverpriset: boolean
  /** VG2: betalt omtale skal merkes (influenser-tilbud). */
  merkekrav: boolean
}

export type EpostPayload = KundebestillingPayload | LeverandortilbudPayload | MkftilbudPayload

// ── Rene kalkyler (delt av reducer + UI + spilltest) ─────────────────────────
/** Tilbudt enhetspris = listepris × (1 − rabatt). */
export function tilbudsprisPerEnhet(p: LeverandortilbudPayload): number {
  return Math.round(p.listeprisPerEnhet * (1 - p.rabattProsent / 100))
}
/** Netto besparelse mot normal innkjøpspris (× antall). Negativ = dårlig tilbud
 *  (den «rabatterte» prisen er faktisk dyrere enn det eleven vanligvis betaler). */
export function leverandorNettoBesparelse(p: LeverandortilbudPayload): number {
  return (p.normalKostPerEnhet - tilbudsprisPerEnhet(p)) * p.antall
}
/** Markedsføringstilbudets treff (%) i elevens valgte målgruppe (skjult fasit). */
export function mkfTreffProsent(p: MkftilbudPayload, segmenter: string[]): number {
  return Math.round(treffISegmenter(p.treff, segmenter))
}
/** Trafikkfaktoren et akseptert mkf-tilbud gir (1 = ingen effekt). Treffet i
 *  EGEN målgruppe avgjør; dårlig kanalvalg gir svakt (ikke 0) løft. Tunbar. */
export function mkfFaktor(p: MkftilbudPayload, segmenter: string[]): number {
  const treffAndel = treffISegmenter(p.treff, segmenter) / 100
  return 1 + BALANCE.innboks.mkf.maksLoft * treffAndel
}
/** Grunnbetaling for en kundebestilling ved dagens priser (før mengderabatt). */
export function bestillingGrunnbetaling(p: KundebestillingPayload, produkter: Product[]): number {
  return p.varer.reduce((s, v) => {
    const pr = produkter.find(x => x.id === v.productId)
    return s + (pr ? pr.retailPrice * v.qty : 0)
  }, 0)
}
/** Faktisk betaling = grunnbetaling × (1 − mengderabatt eleven ga). */
export function bestillingBetaling(p: KundebestillingPayload, produkter: Product[]): number {
  return Math.round(bestillingGrunnbetaling(p, produkter) * (1 - (p.mengderabatt ?? 0)))
}
/** Har eleven nok på lager til å oppfylle bestillingen? */
export function bestillingKanOppfylles(p: KundebestillingPayload, produkter: Product[]): boolean {
  return p.varer.every(v => (produkter.find(x => x.id === v.productId)?.stock ?? 0) >= v.qty)
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
const pick = <T,>(r: () => number, arr: T[]): T => arr[Math.floor(r() * arr.length) % arr.length]
const intBetween = (r: () => number, lo: number, hi: number): number => lo + Math.floor(r() * (hi - lo + 1))

/** Monoton absolutt spilldag (samme formel som GameContext.absDag). dayNumber
 *  KAN overstige daysPerMonth her — formelen er lineær, så en frist «N dager
 *  fram» wrapper korrekt over månedsskiftet. */
export function epostAbsDag(year: number, month: number, dayNumber: number): number {
  return ((year - 1) * 12 + (month - 1)) * DAY_CONFIG.daysPerMonth + dayNumber
}

const dato = (dayNumber: number, month: number) => `Dag ${dayNumber} · Måned ${month}`
const dagerTekst = (n: number) => n === 1 ? 'i morgen' : `om ${n} dager`

// ── Maler (bokmål; kunder/leverandører/medier er FIKTIVE spillaktører) ────────
const BESTILLING_ANLEDNINGER = [
  { avsender: 'Kari fra Bekkelund regnskap', anledning: 'personalmøtet på fredag' },
  { avsender: 'Idrettslaget Fram', anledning: 'dugnaden på lørdag' },
  { avsender: 'Åsheim barnehage', anledning: 'sommeravslutningen' },
  { avsender: 'Borettslaget Solsiden', anledning: 'årsmøtet på torsdag' },
]
const LEVERANDORER_EKTE = [
  'Nordvik Storkjøkken', 'Bakergrossisten AS', 'Innlandet Engros',
]
const LEVERANDORER_LURE = [
  'Premium Trade Nordic', 'Best Deal Grossist', 'Kvalitetsvarer Direkte',
]

/** Velg opp til `maks` prisede produkter fra sortimentet (seedet). */
function velgProdukter(r: () => number, produkter: Product[], maks: number): Product[] {
  const kandidater = produkter.filter(p => p.retailPrice > 0)
  if (!kandidater.length) return []
  const antall = Math.min(maks, kandidater.length)
  const kopi = [...kandidater]
  const valgt: Product[] = []
  for (let i = 0; i < antall; i++) {
    const idx = Math.floor(r() * kopi.length) % kopi.length
    valgt.push(kopi.splice(idx, 1)[0])
  }
  return valgt
}

let epostTeller = 0
function nyId(kind: EpostKind, seed: number): string {
  epostTeller = (epostTeller + 1) >>> 0
  return `epost_${kind}_${seed >>> 0}_${epostTeller}`
}

interface GenCtx {
  produkter: Product[]
  dayNumber: number
  month: number
  year: number
}

// 7a — kundebestilling
function byggKundebestilling(r: () => number, ctx: GenCtx): InboxMessage | null {
  const valgt = velgProdukter(r, ctx.produkter, 2)
  if (!valgt.length) return null
  const { avsender, anledning } = pick(r, BESTILLING_ANLEDNINGER)
  const varer = valgt.map(p => ({ productId: p.id, navn: p.name, qty: intBetween(r, 8, 16) }))
  const leveringOffset = intBetween(r, 2, 4)
  const svarOffset = 1
  const leveringAbsDag = epostAbsDag(ctx.year, ctx.month, ctx.dayNumber + leveringOffset)
  const varelinje = varer.map(v => `${v.qty} ${v.navn.toLowerCase()}`).join(' + ')
  const payload: KundebestillingPayload = {
    kind: 'kundebestilling', varer, anledning,
    leveringAbsDag, leveringTekst: dagerTekst(leveringOffset),
  }
  return {
    id: nyId('kundebestilling', leveringAbsDag),
    type: 'kundebestilling',
    title: `📋 Bestilling: ${avsender}`,
    body: `Hei! Kan dere sette av ${varelinje} til ${anledning}? Vi henter ${dagerTekst(leveringOffset)}. Gir dere oss et tilbud? Svar helst innen dagen er omme.`,
    date: dato(ctx.dayNumber, ctx.month),
    read: false,
    competenceGoal: 'Salg utenom disk — distribusjonskanal (trinn 2)',
    avsender,
    fristAbsDag: epostAbsDag(ctx.year, ctx.month, ctx.dayNumber + svarOffset),
    epostStatus: 'ubesvart',
    epost: payload,
  }
}

// 7b — leverandørtilbud
function byggLeverandortilbud(r: () => number, ctx: GenCtx): InboxMessage | null {
  const valgt = velgProdukter(r, ctx.produkter, 1)
  if (!valgt.length) return null
  const p = valgt[0]
  const antall = intBetween(r, 40, 80)
  const rabattProsent = pick(r, [10, 15, 20, 25])
  // ~35 % av tilbudene er villedende: «rabatten» regnes fra en oppblåst listepris
  // så tilbudsprisen ender OVER elevens normale innkjøpspris (subtile signaler i
  // avsender/emne — aldri åpenbart).
  const erLureri = r() < BALANCE.innboks.leverandorLureriAndel
  const listeprisPerEnhet = erLureri
    // oppblåst: normal / (1 − rabatt) × liten ekstra påslag → tilbudspris > normal
    ? Math.round((p.costPrice / (1 - rabattProsent / 100)) * (1 + 0.10 + r() * 0.10))
    // ekte: listepris litt over normal, så rabatten gir reell besparelse
    : Math.round(p.costPrice * (1.05 + r() * 0.10))
  const avsender = erLureri ? pick(r, LEVERANDORER_LURE) : pick(r, LEVERANDORER_EKTE)
  const fristOffset = intBetween(r, 2, 3)
  const payload: LeverandortilbudPayload = {
    kind: 'leverandortilbud', productId: p.id, navn: p.name, antall,
    listeprisPerEnhet, rabattProsent, erLureri, normalKostPerEnhet: p.costPrice,
  }
  const hast = erLureri ? ' Kun i dag — svar raskt, dette går unna!' : ''
  return {
    id: nyId('leverandortilbud', listeprisPerEnhet + antall),
    type: 'leverandortilbud',
    title: `🏷️ Tilbud: ${p.name} −${rabattProsent} %`,
    body: `${avsender} tilbyr ${rabattProsent} % på ${p.name.toLowerCase()} ved kjøp av minst ${antall} enheter denne uka. Listepris ${listeprisPerEnhet} kr/stk.${hast} Lønner det seg for dere?`,
    date: dato(ctx.dayNumber, ctx.month),
    read: false,
    competenceGoal: 'Mengderabatt — regn på om tilbudet faktisk lønner seg',
    avsender,
    fristAbsDag: epostAbsDag(ctx.year, ctx.month, ctx.dayNumber + fristOffset),
    epostStatus: 'ubesvart',
    epost: payload,
  }
}

// 7d — markedsføringstilbud (annonse / influenser / sponsor)
type MkfMal = {
  tilbyder: string; kanalNavn: string; ekte: boolean; merkekrav: boolean
  kostnad: number; overprisKostnad: number; varighetDager: number
  treff: Record<IpsosBucket, number>
}
const MKF_MALER: MkfMal[] = [
  // Annonseselger — lokalavis (når eldre lesere), fiktivt medium.
  { tilbyder: 'Byposten annonseavdeling', kanalNavn: 'Helsides annonse i Byposten', ekte: false, merkekrav: false,
    kostnad: 1200, overprisKostnad: 2400, varighetDager: 6,
    treff: { '18-29': 7, '30-39': 14, '40-49': 26, '50-59': 39, '60+': 54 } },
  // Influenser — matblogger (yngre følgere), ekte plattformtype.
  { tilbyder: 'Lokal matblogger (8 000 følgere)', kanalNavn: 'Omtale hos matblogger', ekte: true, merkekrav: true,
    kostnad: 900, overprisKostnad: 1800, varighetDager: 5,
    treff: { '18-29': 48, '30-39': 34, '40-49': 18, '50-59': 8, '60+': 3 } },
  // Sponsor — skolerevyen (bredt/ungt lokalt), fiktivt.
  { tilbyder: 'Skolerevyen', kanalNavn: 'Sponsing av skolerevyen', ekte: false, merkekrav: false,
    kostnad: 2000, overprisKostnad: 3200, varighetDager: 7,
    treff: { '18-29': 30, '30-39': 22, '40-49': 20, '50-59': 12, '60+': 6 } },
]
function byggMkftilbud(r: () => number, ctx: GenCtx): InboxMessage {
  const mal = pick(r, MKF_MALER)
  const erOverpriset = r() < BALANCE.innboks.mkfOverprisAndel
  const kostnad = erOverpriset ? mal.overprisKostnad : mal.kostnad
  const fristOffset = intBetween(r, 2, 3)
  const payload: MkftilbudPayload = {
    kind: 'mkftilbud', tilbyder: mal.tilbyder, kanalNavn: mal.kanalNavn, ekte: mal.ekte,
    kostnad, varighetDager: mal.varighetDager, treff: mal.treff,
    erOverpriset, merkekrav: mal.merkekrav,
  }
  return {
    id: nyId('mkftilbud', kostnad + mal.varighetDager),
    type: 'mkftilbud',
    title: `📣 ${mal.kanalNavn}`,
    body: `${mal.tilbyder} tilbyr «${mal.kanalNavn}» i ${mal.varighetDager} dager for ${kostnad} kr. Passer kanalen DERES målgruppe? Svar innen ${dagerTekst(fristOffset)}.`,
    date: dato(ctx.dayNumber, ctx.month),
    read: false,
    competenceGoal: 'Distribusjonskanal — treffer kanalen egen målgruppe?',
    avsender: mal.tilbyder,
    fristAbsDag: epostAbsDag(ctx.year, ctx.month, ctx.dayNumber + fristOffset),
    epostStatus: 'ubesvart',
    epost: payload,
  }
}

// ── Offentlig: seedet dagsgenerering (kalt fra START_NEW_DAY) ─────────────────
/** Antall aktive (ubesvarte) quest-e-poster i innboksen — brukes til taket. */
export function aktiveUbesvarte(messages: InboxMessage[]): number {
  return messages.filter(m => m.epost && m.epostStatus === 'ubesvart').length
}

/** Generer dagens quest-e-poster deterministisk mot taket. Returnerer 0–N nye
 *  meldinger (aldri over `maksAktiveUbesvart`). Ren funksjon — ingen bivirkning. */
export function genererDagensEposter(
  produkter: Product[], dayNumber: number, month: number, year: number, aktiveNaa: number,
): InboxMessage[] {
  const K = BALANCE.innboks
  const rom = Math.max(0, K.maksAktiveUbesvart - aktiveNaa)
  if (rom <= 0) return []
  const r = mulberry32((dagSeedLokal(dayNumber, month, year) ^ 0x7e5) >>> 0)
  // Seedet antall for dagen: vektet lavt (VG1 skal ikke drukne).
  const rull = r()
  let antall = rull < K.sjanseIngen ? 0 : rull < K.sjanseIngen + K.sjanseEn ? 1 : 2
  antall = Math.min(antall, rom)
  if (antall <= 0) return []
  const ctx: GenCtx = { produkter, dayNumber, month, year }
  const byggere = [byggKundebestilling, byggLeverandortilbud, byggMkftilbud] as const
  const ut: InboxMessage[] = []
  // Roter startpunkt seedet så typene varierer dag til dag.
  const start = Math.floor(r() * byggere.length)
  for (let i = 0; i < antall; i++) {
    const b = byggere[(start + i) % byggere.length]
    const m = b(r, ctx)
    if (m) ut.push(m)
  }
  return ut
}

/** Én av HVER type (dev-knapp «⏩ Send test-e-post av hver type»). */
export function byggTestEposter(produkter: Product[], dayNumber: number, month: number, year: number): InboxMessage[] {
  const r = mulberry32((dagSeedLokal(dayNumber, month, year) ^ 0x7e57) >>> 0)
  const ctx: GenCtx = { produkter, dayNumber, month, year }
  return [byggKundebestilling(r, ctx), byggLeverandortilbud(r, ctx), byggMkftilbud(r, ctx)]
    .filter((m): m is InboxMessage => m !== null)
}

// Lokal kopi av dagSeed (unngå sirkulær import mot backgroundSales).
function dagSeedLokal(dayNumber: number, month: number, year: number): number {
  return (Math.imul(dayNumber, 73856093) ^ Math.imul(month, 19349663) ^ Math.imul(year, 83492791)) >>> 0
}
