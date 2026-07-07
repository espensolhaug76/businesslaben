// ─── BAKGRUNNSSALG — motor (rene funksjoner) ─────────────────────────────────
// Kundemøtene er dagens UTVALG (pedagogikk); bakgrunnssalget er VOLUMET: en
// jevn, passiv kundestrøm uten samtale. Alt her er DETERMINISTISK (seedet per
// dag) og uten bivirkninger — reduceren (GameContext) kaller funksjonene og
// skriver resultatet til state. Balansetallene bor i balance.ts.

import { BALANCE } from './balance'

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

export function markedsforingsfaktor(mndBudsjett: number): number {
  return clamp(1 + mndBudsjett / Math.max(1, BALANCE.markedsforingSkala), BALANCE.markedsforingMin, BALANCE.markedsforingMax)
}

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
  markedsforingBudsjett: number
}): number {
  const base = (input.lokaleId ? BALANCE.basetrafikk[input.lokaleId] : undefined) ?? BALANCE.basetrafikkDefault
  const fylte = tellFylteDisplayPlasser(input.products, input.counterLayout, input.windowDisplayLayout)
  const faktor =
    ryktefaktor(input.rykte) *
    prisfaktor(input.products) *
    eksponeringsfaktor(fylte) *
    markedsforingsfaktor(input.markedsforingBudsjett) *
    BALANCE.baseMultiplier
  return Math.max(0, Math.round(base * faktor))
}

// ── Salgs-simulering per bolk ─────────────────────────────────────────────────

export interface BolkResultat<P> {
  products: P[]
  bakgrunnKunder: number
  bakgrunnStk: number
  bakgrunnKr: number
  varekostKr: number
  tapteSalgStk: number
  tapteSalgKr: number
  /** Ny seed etter forbrukte trekk (persisteres til neste bolk). */
  seed: number
}

/** Prosesser ÉN bolk bakgrunnskunder mot NÅVÆRENDE lager. Hver kunde kjøper
 *  1–2 varer fra det som har lager OG pris, til retailPrice, og trekker stock.
 *  Ingen priset vare på lager ⇒ tapt salg (stk + estimert kr = snitt retail).
 *  Generisk så Product-typen bevares ut. */
export function simulerBakgrunnsbolk<P extends { id: string; stock: number; retailPrice: number; costPrice: number }>(
  products: P[], antallKunder: number, seed: number,
): BolkResultat<P> {
  let s = seed >>> 0
  const stock = new Map(products.map(p => [p.id, p.stock]))
  const priced = products.filter(p => p.retailPrice > 0)
  const avgRetail = priced.length ? Math.round(priced.reduce((a, p) => a + p.retailPrice, 0) / priced.length) : 0

  let bakgrunnKunder = 0, bakgrunnStk = 0, bakgrunnKr = 0, varekostKr = 0, tapteSalgStk = 0, tapteSalgKr = 0

  for (let c = 0; c < antallKunder; c++) {
    bakgrunnKunder++
    s = nextSeed(s)
    const antallVarer = rand01(s) < BALANCE.sannsynlighetToVarer ? 2 : 1
    for (let i = 0; i < antallVarer; i++) {
      const inStock = products.filter(p => (stock.get(p.id) ?? 0) > 0 && p.retailPrice > 0)
      if (inStock.length === 0) { tapteSalgStk++; tapteSalgKr += avgRetail; continue }
      s = nextSeed(s)
      const pick = inStock[Math.floor(rand01(s) * inStock.length)]!
      stock.set(pick.id, (stock.get(pick.id) ?? 0) - 1)
      bakgrunnStk++; bakgrunnKr += pick.retailPrice; varekostKr += pick.costPrice
    }
  }

  const newProducts = products.map(p => {
    const st = stock.get(p.id)
    return st !== undefined && st !== p.stock ? { ...p, stock: st } : p
  })
  return { products: newProducts, bakgrunnKunder, bakgrunnStk, bakgrunnKr, varekostKr, tapteSalgStk, tapteSalgKr, seed: s }
}
