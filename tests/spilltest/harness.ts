// ─── SPILLTEST-harness — hjelpere, tidsbro og rapport ────────────────────────
// Delt infrastruktur for det automatiserte regresjonsløpet. Se docs/SPILLTESTER.md.
//
// Prinsipp: testen SPILLER spillet som en elev (klikker DOM) og LESER
// spilltilstanden via test-broen window.__GAME_STATE__ (kun DEV, satt i
// GameContext). Tid (klokketikk, dagstart, månedsrull) FREMSKYNDES via
// window.__GAME_DISPATCH__ i stedet for å vente på sanntidsklokka — ellers ville
// én åpen dag tatt ~6 minutter. Ingen `sleep`: alle ventinger er eksplisitte
// pollinger på state/DOM (flaky-vern).

import { type Page, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import type { KampanjeResultat } from '../../src/game/data/kampanje'

// ── Minimal speil av GameState (kun feltene testen bruker) ───────────────────
export interface Loan {
  id: string
  amount: number
  interestRate: number
  termMonths: number
  monthlyPayment: number
  monthsRemaining: number
  remainingBalance: number
  totalInterestPaid: number
}
export interface MonthSettlement {
  month: number; year: number; inntekt: number
  fasteKostnader: number; laanRenter: number; laanAvdrag: number
  resultat: number; antallDager: number
  // TEMA 2/3 (budsjettsammenligning + nøkkeltall)
  kostnadslinjer: { navn: string; belop: number }[]
  salgInntektBrutto: number; varekjop: number
}
export interface SpillProduct {
  id: string; name: string; stock: number; retailPrice: number; costPrice: number; markedsPris: number
}
export interface IncomingOrder { productId: string; qty: number; ankomstDag: number }
export interface SpillState {
  fagAktiv?: { fd: boolean; m: boolean; ks: boolean }
  money: number
  reputation: number
  currentMonth: number
  currentYear: number
  dayNumber: number
  dayPhase: 'stengt' | 'åpen' | 'oppgjør'
  dayMinute: number
  activeMeetingScenarioId: string | null
  rentedLocationId: string | null
  openingOrderPlaced: boolean
  products: SpillProduct[]
  incomingOrders: IncomingOrder[]
  counterLayout: { productId: string; trauId: string }[]
  loans: Loan[]
  totalDebt: number
  monthlyLoanPayment: number
  monthlyRent: number
  monthlyPayroll: number
  marketingBudget: Record<string, number>
  businessPlan: { description: string; qualityScore: number; canvas: Record<string, string> }
  dayStats: { soldKr: number; bakgrunnKr: number; bakgrunnKunder: number; bakgrunnStk: number; tapteSalgStk: number; tapteSalgKr: number; manglerPrisStk: number; overprisStk: number; koKunder: number; sisteSalgLogg: { navn: string; qty: number; kr: number; id?: string }[] }
  dayMeetings: { scenarioId: string; minutt: number; spawned: boolean }[]
  lastDayResult: unknown | null
  lastMonthSettlement: MonthSettlement | null
  hotellProvisjon: number
  beredskap: { planBekreftet: boolean }
  // TEMA 2/3 — budsjett + nøkkeltall
  budsjett: { maaneder: Record<string, { budsjett: Record<string, number>; laastVedOppgjor: boolean; avvikNotater: Record<string, string> }> }
  nokkeltall: Record<string, { bruttofortjeneste: number; dekningsgrad: number; resultatgrad: number }>
  // TEMA 8 — kampanje
  kampanje: { aktiv: { faktor: number; dagerKjort: number; varighet: number } | null; historikk: KampanjeResultat[]; visRapportFor: string | null }
  messages: { id: string; type: string; read: boolean }[]
  // TEMA 15 — reiseliv/turistsesong
  turistsesong: { startAbsDag: number; varighet: number; turistKunder: number; bakgrunnKunder: number } | null
  hotellavtale: 'ingen' | 'akseptert' | 'avslatt'
  dayBackground: { total: number; prosessert: number; kapasitetRest: number; kø: { ankomstMinutt: number; antall: number }[]; turistandel: number; vareVekt: Record<string, number> } | null
  mentorDagligHint: { dag: string; signal: string; melding: string } | null
  reiselivPakke: { profilId: string; kortIds: string[]; pris: number; treff: number; turister: number; egenKafe: boolean } | null
  // KROK 7c — Sentrumsposten (avis-arkiv + ulest-badge + aktiv trend-effekt)
  avisArkiv: { uke: number; ukeIMaaned: number; maaned: number; aar: number; notiser: { id: string; kilde: string; tittel: string; tekst: string; fremover: boolean }[] }[]
  avisUlest: number
  avisEffekt: { notisId: string; label: string; fraAbsDag: number; tilAbsDag: number; trafikkFaktor: number; vareVekt: Record<string, number> } | null
  employees: { id: string }[]
  phase: string
}

declare global {
  interface Window {
    __GAME_STATE__?: SpillState
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __GAME_DISPATCH__?: (action: any) => void
  }
}

// ── Rapport ──────────────────────────────────────────────────────────────────
export type StegStatus = 'PASS' | 'FAIL' | 'KJENT FEIL'
export interface StegResultat {
  nr: number
  navn: string
  status: StegStatus
  detaljer: string[]
  feil?: string
  skjermbilde?: string
  ms: number
}

const REPO = process.cwd()
const RAPPORT_FIL = path.join(REPO, 'docs/rapporter/spilltest-siste.md')
const FEIL_DIR = path.join(REPO, 'docs/rapporter/spilltest-feil')

export class Rapport {
  steg: StegResultat[] = []
  startet = new Date().toISOString()
  constructor(public løp: string) {}

  har(nr: number) { return this.steg.find(s => s.nr === nr) }
}

/** Rydd feil-mappa ved løpets start (kun gamle skjermbilder fra dette løpet). */
export function nullstillFeilmappe() {
  fs.mkdirSync(FEIL_DIR, { recursive: true })
  for (const f of fs.readdirSync(FEIL_DIR)) {
    if (f.endsWith('.png')) fs.rmSync(path.join(FEIL_DIR, f))
  }
}

/** Kjør ett teststeg. Feiler steget kastes IKKE videre (så alle steg havner i
 *  rapporten) — status settes FAIL (eller KJENT FEIL) og et skjermbilde tas.
 *  Returnerer true ved PASS/KJENT-FEIL-som-forventet, false ved reell FAIL. */
export async function steg(
  page: Page,
  rapport: Rapport,
  nr: number,
  navn: string,
  fn: (ctx: StegCtx) => Promise<void>,
  opts: { kjentFeil?: boolean } = {},
): Promise<boolean> {
  const t0 = Date.now()
  const detaljer: string[] = []
  const ctx: StegCtx = { ok: (m: string) => { detaljer.push(m); process.stdout.write(`      ✓ ${m}\n`) } }
  process.stdout.write(`  ▶ Steg ${nr}: ${navn}\n`)
  try {
    await fn(ctx)
    rapport.steg.push({ nr, navn, status: 'PASS', detaljer, ms: Date.now() - t0 })
    process.stdout.write(`  ✅ Steg ${nr}: PASS\n`)
    return true
  } catch (e) {
    const feil = e instanceof Error ? e.message : String(e)
    const status: StegStatus = opts.kjentFeil ? 'KJENT FEIL' : 'FAIL'
    let skjermbilde: string | undefined
    // Skjermbilde KUN ved reell FAIL (ikke ved forventet KJENT FEIL) — så et
    // grønt løp etterlater en tom feil-mappe.
    if (status === 'FAIL') {
      try {
        const rel = `steg-${nr}.png`
        await page.screenshot({ path: path.join(FEIL_DIR, rel), fullPage: false })
        skjermbilde = `spilltest-feil/${rel}`
      } catch { /* siden kan være borte */ }
    }
    rapport.steg.push({ nr, navn, status, detaljer, feil, skjermbilde, ms: Date.now() - t0 })
    process.stdout.write(`  ${opts.kjentFeil ? '🟡 Steg ' + nr + ': KJENT FEIL' : '❌ Steg ' + nr + ': FAIL'} — ${feil.split('\n')[0]}\n`)
    return !!opts.kjentFeil
  }
}
export interface StegCtx { ok(msg: string): void }

// ── State-lesing og eksplisitte ventinger (ingen sleep) ──────────────────────
export async function lesState(page: Page): Promise<SpillState> {
  const s = await page.evaluate(() => window.__GAME_STATE__)
  if (!s) throw new Error('window.__GAME_STATE__ er ikke satt — er dev-bygget (import.meta.env.DEV) aktivt?')
  return s
}

/** Vent til et predikat over spilltilstanden er sant (poll, ikke sleep). */
export async function ventState(
  page: Page, pred: (s: SpillState) => boolean, beskrivelse: string, timeout = 15_000,
): Promise<void> {
  await expect(async () => {
    const s = await page.evaluate(() => window.__GAME_STATE__)
    if (!s || !pred(s)) throw new Error(`venter på: ${beskrivelse}`)
  }).toPass({ timeout, intervals: [100, 150, 250, 400] })
}

/** Fremskynd tid via test-broen: dispatch en action direkte i reduceren. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function dispatch(page: Page, action: any): Promise<void> {
  await page.evaluate((a) => window.__GAME_DISPATCH__?.(a), action)
}

/** Dispatch samme action N ganger i ETT round-trip (raskere klokke-drift). Trygt
 *  for TICK: så snart et kundemøte spawner blir resten no-ops (reduceren gater). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function dispatchN(page: Page, action: any, n: number): Promise<void> {
  await page.evaluate(({ a, count }) => { for (let i = 0; i < count; i++) window.__GAME_DISPATCH__?.(a) }, { a: action, count: n })
}

/** Rydd all localStorage (deterministisk løp — CLAUDE/mandat). */
export async function ryddLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => { try { localStorage.clear() } catch { /* ignore */ } })
}

// ── Rapport → markdown ───────────────────────────────────────────────────────
export function skrivRapport(rapport: Rapport, ekstra: string[] = []): { pass: number; fail: number; kjent: number } {
  const pass = rapport.steg.filter(s => s.status === 'PASS').length
  const fail = rapport.steg.filter(s => s.status === 'FAIL').length
  const kjent = rapport.steg.filter(s => s.status === 'KJENT FEIL').length
  const ikon = (s: StegStatus) => s === 'PASS' ? '✅' : s === 'KJENT FEIL' ? '🟡' : '❌'

  const L: string[] = []
  L.push('# Spilltest — siste kjøring')
  L.push('')
  L.push(`> Auto-generert av \`npm run spilltest\` (${rapport.løp}). Overskrives hver kjøring.`)
  L.push(`> Startet: ${rapport.startet}`)
  L.push('')
  L.push(`**Resultat: ${fail === 0 ? '✅ GRØNT' : '❌ RØDT'}** — ${pass} PASS · ${fail} FAIL · ${kjent} KJENT FEIL (${rapport.steg.length} steg)`)
  L.push('')
  L.push('| # | Steg | Status | ms |')
  L.push('|---|------|--------|----|')
  for (const s of rapport.steg) {
    L.push(`| ${s.nr} | ${s.navn} | ${ikon(s.status)} ${s.status} | ${s.ms} |`)
  }
  L.push('')
  L.push('## Detaljer per steg')
  L.push('')
  for (const s of rapport.steg) {
    L.push(`### ${ikon(s.status)} Steg ${s.nr} — ${s.navn}`)
    if (s.detaljer.length) {
      L.push('')
      L.push('Verifiserte tall/tilstander:')
      for (const d of s.detaljer) L.push(`- ${d}`)
    }
    if (s.feil) {
      L.push('')
      L.push('```')
      L.push(s.feil)
      L.push('```')
    }
    if (s.skjermbilde) { L.push(''); L.push(`Skjermbilde ved feil: \`docs/rapporter/${s.skjermbilde}\``) }
    L.push('')
  }
  if (ekstra.length) { L.push('## Notater'); L.push(''); for (const e of ekstra) L.push(`- ${e}`); L.push('') }

  fs.mkdirSync(path.dirname(RAPPORT_FIL), { recursive: true })
  fs.writeFileSync(RAPPORT_FIL, L.join('\n'), 'utf8')
  process.stdout.write(`\n📄 Rapport skrevet: docs/rapporter/spilltest-siste.md (${pass} PASS / ${fail} FAIL / ${kjent} KJENT FEIL)\n`)
  return { pass, fail, kjent }
}
