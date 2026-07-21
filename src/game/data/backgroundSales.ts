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

/** DEMPET samlet priskomponent på KUNDESTRØMMEN (snitt over PRISEDE varer, mot
 *  markedsPris). DEL 7f-c: per-vare-elastisiteten (simulerBakgrunnsbolk) bærer nå
 *  hovedeffekten av pris — denne er kun et mildt nivå-dytt (halvt utslag,
 *  `prisfaktorDemping`) så prisrespons ikke dobbelt-telles. Klemt som før. */
export function prisfaktor(products: { retailPrice: number; markedsPris: number }[]): number {
  const priced = products.filter(p => p.retailPrice > 0 && p.markedsPris > 0)
  if (priced.length === 0) return 1
  const avgRetail = priced.reduce((a, p) => a + p.retailPrice, 0) / priced.length
  const avgMarked = priced.reduce((a, p) => a + p.markedsPris, 0) / priced.length
  if (avgRetail <= 0) return 1
  const raw = clamp(avgMarked / avgRetail, BALANCE.prisMin, BALANCE.prisMax)
  return 1 + (raw - 1) * BALANCE.prisfaktorDemping
}

/** PRISELASTISITET per vare (DEL 7f-b). ratio = utsalgspris / markedsPris.
 *  - ratio ≤ 1 (på/under marked): billigsalg gir avtagende gevinst, tak
 *    `billigTak` (1,15) — som før.
 *  - ratio > 1 (over marked): følger varens profil-kurve (HØY/MIDDELS/LAV) med
 *    lineær interpolasjon mellom punktene; ≥ siste punkt = siste verdi; gulv 0.
 *  Returnerer en multiplikator på VARENS solgte volum (1,0 = full etterspørsel). */
export function priselastisitetsfaktor(profil: 'hoy' | 'middels' | 'lav', ratio: number): number {
  const E = BALANCE.priselastisitet
  if (ratio <= 1) return clamp(1 + (1 - ratio) * E.billigStigning, 1, E.billigTak)
  const kurve = E[profil]
  // Over siste punkt (typisk ratio 2,0) → hold siste verdi.
  const siste = kurve[kurve.length - 1]!
  if (ratio >= siste[0]) return Math.max(0, siste[1])
  // Finn segmentet ratio faller i, lineær interpolasjon.
  for (let i = 1; i < kurve.length; i++) {
    const [x0, y0] = kurve[i - 1]!, [x1, y1] = kurve[i]!
    if (ratio <= x1) {
      const t = (ratio - x0) / Math.max(1e-9, x1 - x0)
      return Math.max(0, y0 + (y1 - y0) * t)
    }
  }
  return Math.max(0, siste[1])
}

/** Elastisitetsprofil per varekategori (DEL 7f-b). Nye varer/ukjent kategori →
 *  MIDDELS. Mapping dokumentert i docs/rapporter/spor-a.md (pkt. 35 DEL 7f). */
export function elastisitetsprofil(category: string | undefined): 'hoy' | 'middels' | 'lav' {
  switch (category) {
    case 'drikke': return 'hoy'   // kaffe/te o.l. — dagligvare m/alternativer
    case 'brod':   return 'hoy'   // rundstykke/brød — dagligvare
    case 'kaker':  return 'lav'   // kaker/signatur — mindre prisfølsom
    default:       return 'middels' // frokost/lunsj/annet — kos/impuls
  }
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
  products: { id: string; stock: number; retailPrice: number; markedsPris: number }[]
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
 *  jevnt mellom moteForste og moteSiste med lett seed-jitter. Deterministisk.
 *
 *  To møtetyper i samme strøm:
 *   • SCENARIER (kind 'scenario'): trekkes uten gjentakelse fra `scenarioIds`
 *     (kalleren gir den foretrukne poolen: uspilte scenarioer først, og hele
 *     poolen på nytt når alt er spilt — fikserunde 3). Fylles på nytt hvis den
 *     tømmes midt i en dag, så dagen alltid får `antall` møter.
 *   • STAMKUNDEMØTER (kind 'stamkunde'): returnerende kunder (`stamkunde.ids`),
 *     trukket VEKTET uten gjentakelse (stamkunder opp, «misfornøyd sist» ned),
 *     maks én gang per dag. Reserveres inntil `moteReserveAndel` av dagens møter
 *     når det finnes returnerende kunder — resten fylles med scenarier.
 *     (Stamkunder er PARKERT bak STAMKUNDER_AKTIV; kalleren gir da ingen
 *     stamkunde-pool, så alt blir scenarier.) */
export function planleggMoter(
  antall: number,
  scenarioIds: string[],
  seed: number,
  stamkunde?: { ids: string[]; vekter: Record<string, number> },
): ScheduledMeeting[] {
  const apne = BALANCE.klokke.apneMinutt
  const forste = BALANCE.moteForste - apne // minutter siden åpning
  const siste = BALANCE.moteSiste - apne
  const spenn = Math.max(1, siste - forste)
  let s = seed >>> 0

  // Hvor mange av hver type? Reserver plass til stamkundemøter når noen kan
  // returnere; resten (og alt ellers) er scenarier som fyller dagen.
  const stamAvail = stamkunde?.ids.length ?? 0
  const stamN = stamAvail > 0 ? Math.min(stamAvail, Math.max(1, Math.floor(antall * BALANCE.stamkunder.moteReserveAndel))) : 0
  const scenarioN = scenarioIds.length > 0 ? Math.max(0, antall - stamN) : 0

  // Scenarier — trekk uten gjentakelse, men FYLL PÅ poolen om den tømmes (så
  // dagen får nok møter selv om den foretrukne poolen er liten).
  const scenValgt: string[] = []
  let scenPool: string[] = []
  for (let i = 0; i < scenarioN; i++) {
    if (!scenPool.length) scenPool = [...scenarioIds]
    s = nextSeed(s)
    scenValgt.push(scenPool.splice(Math.floor(rand01(s) * scenPool.length), 1)[0]!)
  }

  // Stamkundemøter — VEKTET uten gjentakelse (Efraimidis–Spirakis): nøkkel =
  // rand^(1/vekt), sortert synkende → høyere vekt trekkes tidligere.
  const stamValgt: string[] = []
  if (stamkunde && stamN > 0) {
    const nokler = stamkunde.ids.map(id => {
      s = nextSeed(s)
      const w = Math.max(0.01, stamkunde.vekter[id] ?? 1)
      return { id, key: Math.pow(rand01(s), 1 / w) }
    })
    nokler.sort((a, b) => b.key - a.key)
    for (let i = 0; i < stamN; i++) stamValgt.push(nokler[i]!.id)
  }

  // Kombiner og stokk rekkefølgen så nye kunder og stamkunder blandes utover
  // dagen (Fisher–Yates, seedet).
  const innhold: { id: string; kind: 'scenario' | 'stamkunde' }[] = [
    ...scenValgt.map(id => ({ id, kind: 'scenario' as const })),
    ...stamValgt.map(id => ({ id, kind: 'stamkunde' as const })),
  ]
  for (let i = innhold.length - 1; i > 0; i--) {
    s = nextSeed(s)
    const j = Math.floor(rand01(s) * (i + 1))
    const tmp = innhold[i]!; innhold[i] = innhold[j]!; innhold[j] = tmp
  }

  // Fordel på klokkeslett (jevnt spredt + jitter).
  const L = innhold.length
  const steg = L > 0 ? spenn / L : spenn
  const moter: ScheduledMeeting[] = []
  for (let i = 0; i < L; i++) {
    s = nextSeed(s)
    const jitter = Math.round((rand01(s) - 0.5) * 2 * BALANCE.moteJitterMinutt)
    const minutt = clamp(Math.round(forste + steg * (i + 0.5) + jitter), forste, siste)
    moter.push({ minutt, scenarioId: innhold[i]!.id, kind: innhold[i]!.kind, spawned: false, done: false })
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

export interface PerProduktBolk {
  navn: string
  soldStk: number
  /** Tapt pga TOMT LAGER (priset, elastisitet OK, men utsolgt). */
  tapteSalgStk: number
  /** Tapt pga MANGLER PRIS (DEL 7b) — varen er i sortimentet uten utsalgspris. */
  manglerPrisStk: number
  /** Tapt pga FOR HØY PRIS (DEL 7f) — priselastisiteten avviste kjøpet. */
  overprisStk: number
}
export interface BolkResultat<P> {
  products: P[]
  bakgrunnKunder: number
  bakgrunnStk: number
  bakgrunnKr: number
  varekostKr: number
  /** Tapt salg pga TOMT LAGER (priset vare, utsolgt). */
  tapteSalgStk: number
  tapteSalgKr: number
  /** DEL 7b — tapt salg pga MANGLER PRIS. */
  manglerPrisStk: number
  manglerPrisKr: number
  /** DEL 7f — tapt salg pga FOR HØY PRIS (priselastisitet). */
  overprisStk: number
  overprisKr: number
  /** Per-produkt deltaer — reduceren akkumulerer i dayProductStats. */
  perProdukt: Record<string, PerProduktBolk>
  /** Aggregerte salg (ticker) — solgt per produkt i denne bolken. */
  ticker: TickerLinje[]
  /** Ny seed etter forbrukte trekk (persisteres til neste tick). */
  seed: number
}

/** Prosesser ÉN bolk (tick) bakgrunnskunder mot NÅVÆRENDE lager. Hver kunde
 *  ønsker 1–2 varer, valgt uniformt fra HELE sortimentet (også uprisede varer —
 *  de attraherer etterspørsel de ikke kan innfri). Per vare (DEL 7):
 *   1. UPRISET (retailPrice ≤ 0) ⇒ tapt salg «mangler pris».
 *   2. PRISET: priselastisitet (retail / markedsPris × varens profil) avgjør om
 *      kunden faktisk kjøper. Avvist ⇒ tapt salg «for høy pris».
 *   3. Kjøp bekreftet: har lager ⇒ salg; tomt ⇒ tapt salg «tomt lager».
 *  Generisk så Product-typen bevares ut. */
export function simulerBakgrunnsbolk<P extends { id: string; name: string; stock: number; retailPrice: number; costPrice: number; markedsPris: number; category?: string }>(
  products: P[], antallKunder: number, seed: number,
  /** TEMA 15: per-kategori pick-vekt (turister vrir etterspørsel mot kaffe/kaker).
   *  Tom/utelatt = uniform valg (uendret). Kategorier uten oppføring = vekt 1. */
  vareVekt: Record<string, number> = {},
): BolkResultat<P> {
  let s = seed >>> 0
  const stock = new Map(products.map(p => [p.id, p.stock]))
  const pool = products   // HELE sortimentet — uprisede varer teller (mangler-pris-tap)
  // Vektet trekning når vareVekt er satt: kumulativ vekt over poolen.
  const vektet = Object.keys(vareVekt).length > 0
  const vekter = vektet ? pool.map(p => Math.max(0, vareVekt[p.category ?? ''] ?? 1)) : null
  const vektSum = vekter ? vekter.reduce((a, v) => a + v, 0) : 0
  const velg = (r: number): P => {
    if (!vekter || vektSum <= 0) return pool[Math.floor(r * pool.length)]!
    let x = r * vektSum
    for (let j = 0; j < pool.length; j++) { x -= vekter[j]!; if (x < 0) return pool[j]! }
    return pool[pool.length - 1]!
  }

  let bakgrunnKunder = 0, bakgrunnStk = 0, bakgrunnKr = 0, varekostKr = 0
  let tapteSalgStk = 0, tapteSalgKr = 0, manglerPrisStk = 0, manglerPrisKr = 0, overprisStk = 0, overprisKr = 0
  const perProdukt: Record<string, PerProduktBolk> = {}
  const solgtNaa = new Map<string, number>() // for ticker
  const ensure = (p: P) => (perProdukt[p.id] ??= { navn: p.name, soldStk: 0, tapteSalgStk: 0, manglerPrisStk: 0, overprisStk: 0 })

  for (let c = 0; c < antallKunder; c++) {
    bakgrunnKunder++
    if (pool.length === 0) { s = nextSeed(s); continue }
    s = nextSeed(s)
    const antallVarer = rand01(s) < BALANCE.sannsynlighetToVarer ? 2 : 1
    for (let i = 0; i < antallVarer; i++) {
      s = nextSeed(s)
      const pref = velg(rand01(s))
      // 1. UPRISET → mangler pris.
      if (pref.retailPrice <= 0) {
        manglerPrisStk++; manglerPrisKr += pref.markedsPris
        ensure(pref).manglerPrisStk++
        continue
      }
      // 2. Priselastisitet: kjøper kunden til denne prisen?
      const ratio = pref.markedsPris > 0 ? pref.retailPrice / pref.markedsPris : 1
      const elast = priselastisitetsfaktor(elastisitetsprofil(pref.category), ratio)
      s = nextSeed(s)
      if (rand01(s) >= Math.min(1, elast)) {
        overprisStk++; overprisKr += pref.retailPrice
        ensure(pref).overprisStk++
        continue
      }
      // 3. Kjøp bekreftet — har vi lager?
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
  return { products: newProducts, bakgrunnKunder, bakgrunnStk, bakgrunnKr, varekostKr, tapteSalgStk, tapteSalgKr, manglerPrisStk, manglerPrisKr, overprisStk, overprisKr, perProdukt, ticker, seed: s }
}
