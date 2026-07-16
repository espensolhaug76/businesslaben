// ─── BAKGRUNNSSALG — motor (rene funksjoner) ─────────────────────────────────
// Kundemøtene er dagens UTVALG (pedagogikk); bakgrunnssalget er VOLUMET: en
// jevn, passiv kundestrøm uten samtale. Alt her er DETERMINISTISK (seedet per
// dag) og uten bivirkninger — reduceren (GameContext) kaller funksjonene og
// skriver resultatet til state. Balansetallene bor i balance.ts.
//
// SPILLKLOKKE: bakgrunnssalget dryppes LØPENDE per klokke-tick (ikke i bolker),
// og kundemøtene planlegges på klokkeslett ved OPEN_DAY.

import { BALANCE } from './balance'
import { lopendeMarkedsforingsfaktor } from './kampanje'
import type { ScheduledMeeting, TickerLinje, Employee, Shift } from '../types'

function clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, v)) }

// Deterministisk PRNG (LCG) — seed er et tall i state, avanseres per trekk.
function nextSeed(s: number): number { return (Math.imul(s >>> 0, 1664525) + 1013904223) >>> 0 }
function rand01(s: number): number { return (s >>> 0) / 4294967296 }

/** Deterministisk dags-seed fra dato — samme dag gir samme kundestrøm. */
export function dagSeed(dayNumber: number, month: number, year: number): number {
  return (Math.imul(dayNumber, 73856093) ^ Math.imul(month, 19349663) ^ Math.imul(year, 83492791)) >>> 0
}

// ── Faktorer (klemt) ──────────────────────────────────────────────────────────

export function ryktefaktor(rykte: number): number { return 0.5 + rykte / 100 }

/** Priser LIK anbefalt ⇒ 1,0; dyrere ⇒ < 1 (færre kunder); billigere ⇒ > 1. */
export function prisfaktor(products: { retailPrice: number; recommendedPrice: number }[]): number {
  const priced = products.filter(p => p.retailPrice > 0 && p.recommendedPrice > 0)
  if (priced.length === 0) return 1
  const avgRetail = priced.reduce((a, p) => a + p.retailPrice, 0) / priced.length
  const avgRec = priced.reduce((a, p) => a + p.recommendedPrice, 0) / priced.length
  if (avgRetail <= 0) return 1
  return clamp(avgRec / avgRetail, BALANCE.prisMin, BALANCE.prisMax)
}

export function eksponeringsfaktor(fylteDisplayPlasser: number): number {
  const andel = Math.min(1, fylteDisplayPlasser / Math.max(1, BALANCE.eksponeringReferanse))
  return clamp(BALANCE.eksponeringMin + andel * (BALANCE.eksponeringMax - BALANCE.eksponeringMin), BALANCE.eksponeringMin, BALANCE.eksponeringMax)
}

// MERK: den gamle `markedsforingsfaktor(mndBudsjett)` (som leste
// BALANCE.markedsforingSkala/Min/Max) er FJERNET. Tema 8 DEL D erstattet den
// samlede markedsføringsfaktoren med `lopendeMarkedsforingsfaktor` (per kanal ×
// målgruppe-treff, se kampanje.ts) — brukt i beregnBakgrunnskunder under. Den
// gamle funksjonen hadde da null kallere (verifisert), og skala-verdiene i
// balance.ts ble død kode; alt er ryddet ut.

/** Antall fylte display-plasser (trau + vindu) MED lager — driver eksponering. */
export function tellFylteDisplayPlasser(
  products: { id: string; stock: number }[],
  counterLayout: { productId: string }[],
  windowDisplayLayout: { productId: string; fixtureId: string }[],
): number {
  const harLager = (id: string) => (products.find(p => p.id === id)?.stock ?? 0) > 0
  const trau = counterLayout.filter(t => harLager(t.productId)).length
  const vindu = windowDisplayLayout.filter(w => w.fixtureId === 'vindu' && harLager(w.productId)).length
  return trau + vindu
}

/** Dagens antall bakgrunnskunder (deterministisk, snapshot ved OPEN_DAY):
 *  basetrafikk(lokale) × rykte × pris × eksponering × markedsføring × global. */
export function beregnBakgrunnskunder(input: {
  lokaleId: string | null
  rykte: number
  products: { id: string; stock: number; retailPrice: number; recommendedPrice: number }[]
  counterLayout: { productId: string }[]
  windowDisplayLayout: { productId: string; fixtureId: string }[]
  /** LØPENDE synlighet (DEL D): månedlig markedsbudsjett per kanal + målgruppe. */
  marketingBudget: Record<string, number>
  segmenter: string[]
}): number {
  const base = (input.lokaleId ? BALANCE.basetrafikk[input.lokaleId] : undefined) ?? BALANCE.basetrafikkDefault
  const fylte = tellFylteDisplayPlasser(input.products, input.counterLayout, input.windowDisplayLayout)
  const faktor =
    ryktefaktor(input.rykte) *
    prisfaktor(input.products) *
    eksponeringsfaktor(fylte) *
    lopendeMarkedsforingsfaktor(input.marketingBudget, input.segmenter) *
    BALANCE.baseMultiplier
  return Math.max(0, Math.round(base * faktor))
}

// ── Kundemøter (SPILLKLOKKE) ──────────────────────────────────────────────────

/** Antall kundemøter for dagen — avtagende (opplæring → færre). */
export function moterForDag(dayNumber: number): number {
  return dayNumber <= BALANCE.opplaeringsDager ? BALANCE.moterOpplaering : BALANCE.moterSenere
}

/** Planlegg dagens kundemøter på klokkeslett (minutter siden 09:00), spredt
 *  jevnt mellom moteForste og moteSiste med lett seed-jitter. Scenariene
 *  trekkes UTEN gjentakelse til poolen er tømt. Deterministisk per dag. */
export function planleggMoter(antall: number, scenarioIds: string[], seed: number): ScheduledMeeting[] {
  const apne = BALANCE.klokke.apneMinutt
  const forste = BALANCE.moteForste - apne // minutter siden åpning
  const siste = BALANCE.moteSiste - apne
  const spenn = Math.max(1, siste - forste)
  const steg = antall > 0 ? spenn / antall : spenn

  // Scenario-pool stokket (uten gjentakelse); fylles på nytt hvis den tømmes.
  let s = seed >>> 0
  const pool: string[] = []
  const refill = () => {
    const rest = [...scenarioIds]
    while (rest.length) { s = nextSeed(s); pool.push(rest.splice(Math.floor(rand01(s) * rest.length), 1)[0]!) }
  }
  if (scenarioIds.length) refill()

  const moter: ScheduledMeeting[] = []
  for (let i = 0; i < antall; i++) {
    s = nextSeed(s)
    const jitter = Math.round((rand01(s) - 0.5) * 2 * BALANCE.moteJitterMinutt)
    const minutt = clamp(Math.round(forste + steg * (i + 0.5) + jitter), forste, siste)
    if (!pool.length && scenarioIds.length) refill()
    const scenarioId = pool.shift() ?? scenarioIds[0] ?? 'morgenkunden'
    moter.push({ minutt, scenarioId, spawned: false, done: false })
  }
  return moter.sort((a, b) => a.minutt - b.minutt)
}

// ── Bemanning: kapasitet på vakt (BEMANNING) ──────────────────────────────────

function dekker(vakt: Shift | undefined | null, klokkeMinutt: number): boolean {
  return !!vakt && klokkeMinutt >= vakt.fra && klokkeMinutt < vakt.til
}

/** Samlet betjeningskapasitet (bakgrunnskunder per TIME) på gulvet ved et gitt
 *  klokkeslett. Kun selgere på vakt teller, pluss spilleren (Junior-kapasitet)
 *  hvis spillervakta dekker tidspunktet.
 *
 *  DEL 4-regel «ingen vakt satt = kun spilleren» (ingen regresjon dag 1): er
 *  det IKKE lagt noen vaktplan i det hele tatt (ingen ansatt-vakt og ingen
 *  spillervakt), driver spilleren alene hele dagen på Junior-kapasitet. */
export function kapasitetPaaVakt(employees: Employee[], playerShift: Shift | null, klokkeMinutt: number): number {
  const junior = BALANCE.kapasitetPerTime.junior ?? 0
  const harVaktplan = playerShift != null || employees.some(e => e.vakt)
  if (!harVaktplan) return junior // soloatferd (dag 1)

  let sum = 0
  for (const e of employees) {
    if (e.role === 'selger' && dekker(e.vakt, klokkeMinutt)) sum += BALANCE.kapasitetPerTime[e.level] ?? junior
  }
  if (dekker(playerShift, klokkeMinutt)) sum += junior
  return sum
}

// ── Salgs-simulering per bolk/tick ────────────────────────────────────────────

export interface BolkResultat<P> {
  products: P[]
  bakgrunnKunder: number
  bakgrunnStk: number
  bakgrunnKr: number
  varekostKr: number
  tapteSalgStk: number
  tapteSalgKr: number
  /** Per-produkt deltaer (DEL 4) — reduceren akkumulerer i dayProductStats. */
  perProdukt: Record<string, { navn: string; soldStk: number; tapteSalgStk: number }>
  /** Aggregerte salg (ticker) — solgt per produkt i denne bolken. */
  ticker: TickerLinje[]
  /** Ny seed etter forbrukte trekk (persisteres til neste tick). */
  seed: number
}

/** Prosesser ÉN bolk (tick) bakgrunnskunder mot NÅVÆRENDE lager. Hver kunde
 *  kjøper 1–2 varer: den FORETREKKER en tilfeldig priset vare (uniformt); har
 *  den lager ⇒ salg (trekker stock), er den tom ⇒ TAPT SALG for AKKURAT den
 *  varen (så «gikk tomt»-rapporten er per produkt). Generisk så Product-typen
 *  bevares ut. */
export function simulerBakgrunnsbolk<P extends { id: string; name: string; stock: number; retailPrice: number; costPrice: number }>(
  products: P[], antallKunder: number, seed: number,
): BolkResultat<P> {
  let s = seed >>> 0
  const stock = new Map(products.map(p => [p.id, p.stock]))
  const priced = products.filter(p => p.retailPrice > 0)

  let bakgrunnKunder = 0, bakgrunnStk = 0, bakgrunnKr = 0, varekostKr = 0, tapteSalgStk = 0, tapteSalgKr = 0
  const perProdukt: Record<string, { navn: string; soldStk: number; tapteSalgStk: number }> = {}
  const solgtNaa = new Map<string, number>() // for ticker
  const ensure = (p: P) => (perProdukt[p.id] ??= { navn: p.name, soldStk: 0, tapteSalgStk: 0 })

  for (let c = 0; c < antallKunder; c++) {
    bakgrunnKunder++
    if (priced.length === 0) { s = nextSeed(s); tapteSalgStk++; continue }
    s = nextSeed(s)
    const antallVarer = rand01(s) < BALANCE.sannsynlighetToVarer ? 2 : 1
    for (let i = 0; i < antallVarer; i++) {
      s = nextSeed(s)
      const pref = priced[Math.floor(rand01(s) * priced.length)]!
      if ((stock.get(pref.id) ?? 0) > 0) {
        stock.set(pref.id, (stock.get(pref.id) ?? 0) - 1)
        bakgrunnStk++; bakgrunnKr += pref.retailPrice; varekostKr += pref.costPrice
        ensure(pref).soldStk++
        solgtNaa.set(pref.id, (solgtNaa.get(pref.id) ?? 0) + 1)
      } else {
        tapteSalgStk++; tapteSalgKr += pref.retailPrice
        ensure(pref).tapteSalgStk++
      }
    }
  }

  const newProducts = products.map(p => {
    const st = stock.get(p.id)
    return st !== undefined && st !== p.stock ? { ...p, stock: st } : p
  })
  const ticker: TickerLinje[] = [...solgtNaa.entries()].map(([id, qty]) => {
    const p = products.find(x => x.id === id)!
    return { navn: p.name, qty, kr: qty * p.retailPrice }
  })
  return { products: newProducts, bakgrunnKunder, bakgrunnStk, bakgrunnKr, varekostKr, tapteSalgStk, tapteSalgKr, perProdukt, ticker, seed: s }
}
