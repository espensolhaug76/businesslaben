import { test } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { lesState, ventState, dispatch, dispatchN, ryddLocalStorage, type SpillState } from './harness'

// ─── BALANSESPILLER — økonomisk analyseløp ───────────────────────────────────
// Svarer på Espens spørsmål: «Hvor mye kan kaféen selge for — og kan en elev gå
// i pluss?» Simulerer 3 spillmåneder (12 handledager/mnd) med 4 strategier og
// logger økonomien per dag/måned. IKKE en regresjonstest — et MÅLEVERKTØY.
//
// Drives via test-broen (window.__GAME_DISPATCH__), IKKE ekte DOM-klikk: dette
// er en analyse av ØKONOMIMODELLEN (bakgrunnssalg + faste kostnader), ikke UI-
// wiring. Alt er deterministisk (bakgrunnssalget seedes av dagSeed, uavhengig av
// Math.random — vi seeder Math.random likevel for godt mål). Endrer IKKE
// balance.ts. Resultat → docs/rapporter/BALANSE_ANALYSE.md.
//
// AVGRENSNING: kundemøtene (pedagogikk-laget) SKIPES (SKIP_MEETING) — analysen
// måler bakgrunnssalgs-VOLUMET (det de 4 strategiene faktisk manipulerer:
// eksponering, pris, bemanning, markedsføring). Møtesalg er et lite bonuslag
// oppå og modelleres ikke her. Rykte holdes 50 (ingen møter spilt).

test.describe.configure({ mode: 'serial' })
test.setTimeout(900_000)

const DAGER_PER_MND = 12
const ANTALL_MND = 3
const HUSLEIE = 45_000
const FORSIKRING = 2_000
const LOKALE = { id: 'sentrum-l2', zone: 'gagata', rent: HUSLEIE, capacity: 120 }
const SKIFT = { fra: 9 * 60, til: 17 * 60 } // hele åpningstiden (09–17)

interface DagLogg {
  mnd: number; dag: number
  omsetning: number; varekost: number; svinn: number; dagsresultat: number
  kunder: number; tapteKr: number; koKunder: number
}
interface MndLogg {
  mnd: number
  omsetning: number; varekost: number; svinn: number; bruttomargin: number
  husleie: number; lonn: number; forsikring: number; markedsforing: number; faste: number
  manedsresultat: number; kasse: number; besteDag: number
}
interface StrategiResultat { navn: string; dager: DagLogg[]; maaneder: MndLogg[] }

interface Strategi {
  navn: string
  opening: { productId: string; qty: number }[]
  restock: Record<string, number>          // vare-id → mål-lagernivå (tomt = ingen påfyll)
  trau: string[]                            // vare-id-er i trau (eksponering)
  vindu: string[]                           // vare-id-er i vindu (eksponering)
  markedsforingMnd: number                  // total mnd-markedsføring (fast kostnad)
  ansett: { level: 'junior' | 'senior' | 'ekspert'; salary: number }[]
  spillerVakt: boolean
}

// ── Strategier ────────────────────────────────────────────────────────────────
const BAKERI = ['croissant', 'kanelbolle', 'skolebrod', 'muffin-blabaer']
const STRATEGIER: Strategi[] = [
  {
    navn: '1 · PASSIV (gulvet)',
    // Passiv elev: tar den foreslåtte åpningsbestillingen, åpner hver dag,
    // gjør ELLERS ingenting (ingen påfyll, ingen disk, ingen markedsføring).
    opening: [
      { productId: 'coffee', qty: 40 }, { productId: 'croissant', qty: 20 },
      { productId: 'kanelbolle', qty: 20 }, { productId: 'skolebrod', qty: 20 },
    ],
    restock: {}, trau: [], vindu: [], markedsforingMnd: 0, ansett: [], spillerVakt: false,
  },
  {
    navn: '2 · FORNUFTIG VG1',
    // Realistisk elev: bestiller jevnlig (holder lager), fyller 3 trau, priser
    // rundt veiledende (default), driver selv (solo Junior-kapasitet, lønn 0).
    opening: [
      { productId: 'coffee', qty: 150 }, { productId: 'croissant', qty: 45 },
      { productId: 'kanelbolle', qty: 45 }, { productId: 'skolebrod', qty: 45 },
      { productId: 'muffin-blabaer', qty: 45 },
    ],
    restock: { coffee: 150, croissant: 45, kanelbolle: 45, skolebrod: 45, 'muffin-blabaer': 45 },
    trau: BAKERI, vindu: [],
    markedsforingMnd: 0, ansett: [], spillerVakt: false,
  },
  {
    navn: '3 · MAKS INNSATS',
    // Full vareeksponering (4 trau + vindu ⇒ eksponeringsfaktor på taket),
    // markedsføring på faktortaket (30 000 ⇒ faktor 1,3), bemanning mot kø
    // (spiller + 1 Junior ⇒ 240 kunder/dag kapasitet). Priser = veiledende.
    opening: [
      { productId: 'coffee', qty: 250 }, { productId: 'croissant', qty: 60 },
      { productId: 'kanelbolle', qty: 60 }, { productId: 'skolebrod', qty: 60 },
      { productId: 'muffin-blabaer', qty: 60 },
    ],
    restock: { coffee: 250, croissant: 60, kanelbolle: 60, skolebrod: 60, 'muffin-blabaer': 60 },
    trau: BAKERI, vindu: ['croissant'],
    markedsforingMnd: 30_000, ansett: [{ level: 'junior', salary: 15_000 }], spillerVakt: true,
  },
  {
    navn: '4 · FORNUFTIG + KAMPANJE',
    // Som 2, pluss én målrettet kampanje/mnd (10 000 kr markedsføring, faktor
    // 1,1). Kanaler/segment settes «riktig», men NB: bakgrunnssalget skalerer
    // kun med KRONENE (se rapporten) — kanalvalg påvirker ikke volumet.
    opening: [
      { productId: 'coffee', qty: 150 }, { productId: 'croissant', qty: 45 },
      { productId: 'kanelbolle', qty: 45 }, { productId: 'skolebrod', qty: 45 },
      { productId: 'muffin-blabaer', qty: 45 },
    ],
    restock: { coffee: 150, croissant: 45, kanelbolle: 45, skolebrod: 45, 'muffin-blabaer': 45 },
    trau: BAKERI, vindu: [],
    markedsforingMnd: 10_000, ansett: [], spillerVakt: false,
  },
]

// ── Hjelpere ──────────────────────────────────────────────────────────────────
async function boot(page: import('@playwright/test').Page) {
  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.addInitScript(() => {
    let a = 0x9e3779b9
    Math.random = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  })
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  await page.goto('/game?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'boot')
}

// Kun kaffe er HOLDBAR (holder over natta); bakverk er FERSKVARE (svinner ved
// stenging). Derfor: kaffe topper opp mot mål; ferskvare bestilles FULLT hver dag
// (den er tom neste morgen uansett). Bestillingen ankommer NESTE dag (leadTime 1),
// så vi regner ferskvarens nåværende lager som 0 (det svinner før det hjelper).
const HOLDBAR = new Set(['coffee'])
async function restock(page: import('@playwright/test').Page, targets: Record<string, number>, dayNumber: number) {
  if (!Object.keys(targets).length) return
  // Bestill IKKE siste dag i måneden: ankomstDag = dag+1 = 13 gjenoppstår aldri
  // (dayNumber resettes til 1 ved månedsrull) ⇒ ordren strander (reelt spillfunn).
  if (dayNumber >= DAGER_PER_MND) return
  const s = await lesState(page)
  for (const [id, target] of Object.entries(targets)) {
    const p = s.products.find(x => x.id === id); if (!p) continue
    const incoming = s.incomingOrders.filter(o => o.productId === id).reduce((a, o) => a + o.qty, 0)
    const base = HOLDBAR.has(id) ? p.stock : 0
    const need = target - base - incoming
    if (need > 0) await dispatch(page, { type: 'ORDER_PRODUCT', product: p, quantity: need })
  }
}

/** Spill ÉN dag til bunns (drypp hele åpningstiden, skip kundemøter). Returner DayResult. */
async function spillDag(page: import('@playwright/test').Page): Promise<any> {
  await dispatch(page, { type: 'OPEN_DAY' })
  await ventState(page, s => s.dayPhase === 'åpen', 'dag åpen')
  for (let i = 0; i < 60; i++) {
    const s = await lesState(page)
    if (s.dayPhase !== 'åpen') break            // auto-klokka kan ha stengt
    if (s.activeMeetingScenarioId) { await dispatch(page, { type: 'SKIP_MEETING' }); continue }
    if (s.dayMinute >= 480) break
    await dispatchN(page, { type: 'TICK' }, 120) // 2 timer/round-trip (no-op ved møte)
  }
  const s = await lesState(page)
  if (s.dayPhase === 'åpen') await dispatch(page, { type: 'CLOSE_DAY' })
  await ventState(page, st => st.dayPhase === 'oppgjør' && !!st.lastDayResult, 'dagsoppgjør')
  return (await lesState(page)).lastDayResult
}

async function kjørStrategi(page: import('@playwright/test').Page, strat: Strategi): Promise<StrategiResultat> {
  await boot(page)
  // Oppsett (via test-broen): lokale + åpningsbestilling (ligger på lager dag 1).
  await dispatch(page, { type: 'RENT_LOCATION', ...LOKALE })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: strat.opening })
  await ventState(page, s => s.rentedLocationId === LOKALE.id && s.openingOrderPlaced, 'leid + åpningsordre')

  // Eksponering (trau + vindu) — persisterer, telles ved hver OPEN_DAY.
  if (strat.trau.length) await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: strat.trau.map((productId, i) => ({ trauId: `trau-${i + 1}`, productId })) })
  if (strat.vindu.length) await dispatch(page, { type: 'SET_WINDOW_DISPLAY', fixtureId: 'vindu', items: strat.vindu.map(productId => ({ productId, fixtureId: 'vindu' })) })
  // Markedsføring (fast mnd-kostnad, skalerer bakgrunnstrafikken).
  if (strat.markedsforingMnd > 0) await dispatch(page, { type: 'SET_MARKETING', budget: { socialMedia: strat.markedsforingMnd, google: 0, influencer: 0, print: 0, tv: 0 } })
  // Bemanning: spillervakt + evt. ansatte (selger, hele åpningstiden).
  if (strat.spillerVakt) await dispatch(page, { type: 'SET_PLAYER_SHIFT', vakt: SKIFT })
  for (let i = 0; i < strat.ansett.length; i++) {
    const a = strat.ansett[i]
    await dispatch(page, { type: 'HIRE_EMPLOYEE', employee: { id: `emp_${i}`, navn: `Ansatt ${i + 1}`, role: 'selger', level: a.level, monthlySalary: a.salary, vakt: SKIFT } })
  }

  const dager: DagLogg[] = []
  const maaneder: MndLogg[] = []
  const totalDager = ANTALL_MND * DAGER_PER_MND

  for (let d = 0; d < totalDager; d++) {
    const s0 = await lesState(page)
    const mnd = s0.currentMonth
    await restock(page, strat.restock, s0.dayNumber)  // bestill (ankommer neste dag)
    const dr: any = await spillDag(page)
    dager.push({
      mnd, dag: s0.dayNumber,
      omsetning: dr.soldKr + dr.bakgrunnKr, varekost: dr.varekostKr, svinn: dr.svinnKr,
      dagsresultat: dr.resultat, kunder: dr.bakgrunnKunder ?? 0,
      tapteKr: dr.tapteSalgKr ?? 0, koKunder: dr.koKunder ?? 0,
    })
    const førRull = await lesState(page)
    const rulletFra = førRull.currentMonth
    await dispatch(page, { type: 'START_NEW_DAY' })
    await ventState(page, s => s.dayPhase === 'stengt', 'ny dag')
    const etter = await lesState(page)
    // Månedsrull skjedde? Da bygde reduceren et månedsoppgjør — logg det.
    if (etter.currentMonth !== rulletFra && etter.lastMonthSettlement) {
      const set = etter.lastMonthSettlement
      const mndDager = dager.filter(x => x.mnd === rulletFra)
      const lonnLinje = set.kostnadslinjer?.find(l => l.navn === 'Lønn')?.belop ?? 0
      const mkfLinje = set.kostnadslinjer?.find(l => l.navn === 'Markedsføring')?.belop ?? 0
      maaneder.push({
        mnd: rulletFra,
        omsetning: mndDager.reduce((a, x) => a + x.omsetning, 0),
        varekost: mndDager.reduce((a, x) => a + x.varekost, 0),
        svinn: mndDager.reduce((a, x) => a + x.svinn, 0),
        bruttomargin: mndDager.reduce((a, x) => a + x.dagsresultat, 0),
        husleie: HUSLEIE, lonn: lonnLinje, forsikring: FORSIKRING, markedsforing: mkfLinje,
        faste: set.fasteKostnader, manedsresultat: set.resultat, kasse: etter.money,
        besteDag: Math.max(0, ...mndDager.map(x => x.omsetning)),
      })
      await dispatch(page, { type: 'DISMISS_MONTH_SETTLEMENT' })
    }
  }
  return { navn: strat.navn, dager, maaneder }
}

// ── Rapport ────────────────────────────────────────────────────────────────────
const kr = (n: number) => Math.round(n).toLocaleString('nb-NO')

function byggRapport(res: StrategiResultat[], det2: StrategiResultat): string {
  const L: string[] = []
  L.push('# Balanseanalyse — «Hvor mye kan kaféen selge for, og kan en elev gå i pluss?»')
  L.push('')
  L.push('> Auto-generert av `balansespiller.spec.ts` (`npx playwright test tests/spilltest/balansespiller.spec.ts`).')
  L.push('> Simulerer 3 spillmåneder (12 handledager/mnd) på **sentrum-l2** (husleie 45 000 kr/mnd)')
  L.push('> med 4 strategier. Deterministisk (bakgrunnssalget seedes av `dagSeed`). `balance.ts` er IKKE endret.')
  L.push('')
  L.push('**Avgrensning:** måler BAKGRUNNSSALGET (volumet strategiene manipulerer). Kundemøtene')
  L.push('(pedagogikk) skipes, rykte holdes 50. Møtesalg er et lite bonuslag oppå, ikke modellert.')
  L.push('')
  L.push('## a) Månedsresultat per strategi + beste dagsomsetning')
  L.push('')
  L.push('| Strategi | Mnd | Omsetning | Varekost | Svinn | Bruttomargin | Faste (husleie/lønn/mkf/fors.) | **Månedsresultat** | Kasse | Beste dag |')
  L.push('|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|')
  for (const r of res) {
    for (const m of r.maaneder) {
      L.push(`| ${r.navn} | ${m.mnd} | ${kr(m.omsetning)} | ${kr(m.varekost)} | ${kr(m.svinn)} | ${kr(m.bruttomargin)} | ${kr(m.faste)} (${kr(m.husleie)}/${kr(m.lonn)}/${kr(m.markedsforing)}/${kr(m.forsikring)}) | **${kr(m.manedsresultat)}** | ${kr(m.kasse)} | ${kr(m.besteDag)} |`)
    }
  }
  L.push('')
  L.push('**Snitt månedsresultat (mnd 1–3) + beste observerte dagsomsetning per strategi:**')
  L.push('')
  L.push('| Strategi | Snitt månedsresultat | Beste dagsomsetning | Snitt kunder/dag |')
  L.push('|---|--:|--:|--:|')
  for (const r of res) {
    const snitt = r.maaneder.reduce((a, m) => a + m.manedsresultat, 0) / Math.max(1, r.maaneder.length)
    const beste = Math.max(0, ...r.dager.map(d => d.omsetning))
    const snittKunder = r.dager.reduce((a, d) => a + d.kunder, 0) / Math.max(1, r.dager.length)
    L.push(`| ${r.navn} | ${kr(snitt)} | ${kr(beste)} | ${snittKunder.toFixed(0)} |`)
  }
  L.push('')
  // Determinisme
  const a = JSON.stringify(res[1].maaneder), b = JSON.stringify(det2.maaneder)
  L.push(`## Determinisme`)
  L.push('')
  L.push(`Strategi 2 kjørt to ganger: månedstallene er ${a === b ? '**IDENTISKE** ✅' : '**ULIKE** ❌'} (bevist ved re-kjøring i samme løp).`)
  L.push('')
  return L.join('\n')
}

test('Balansespiller — 4 strategier × 3 måneder', async ({ page }) => {
  const res: StrategiResultat[] = []
  for (const strat of STRATEGIER) {
    process.stdout.write(`\n▶ Strategi: ${strat.navn}\n`)
    const r = await kjørStrategi(page, strat)
    for (const m of r.maaneder) process.stdout.write(`    mnd ${m.mnd}: oms=${kr(m.omsetning)} margin=${kr(m.bruttomargin)} faste=${kr(m.faste)} → resultat=${kr(m.manedsresultat)} kr (kasse ${kr(m.kasse)})\n`)
    res.push(r)
  }
  // Determinisme: kjør strategi 2 en gang til.
  process.stdout.write(`\n▶ Determinisme-kontroll: strategi 2 på nytt\n`)
  const det2 = await kjørStrategi(page, STRATEGIER[1])

  const rapport = byggRapport(res, det2)
  const utFil = path.join(process.cwd(), 'docs/rapporter/BALANSE_DATA.md')
  fs.writeFileSync(utFil, rapport, 'utf8')
  process.stdout.write(`\n📄 Data skrevet: docs/rapporter/BALANSE_DATA.md\n`)

  // Skriv også rå per-dag/mnd JSON for etterbruk.
  fs.writeFileSync(path.join(process.cwd(), 'docs/rapporter/BALANSE_DATA.json'), JSON.stringify({ strategier: res, det2: det2.maaneder }, null, 2), 'utf8')

  // Determinisme-assert (strategi 2 identisk).
  const { expect } = await import('@playwright/test')
  expect(JSON.stringify(res[1].maaneder), 'strategi 2 deterministisk (to like løp)').toBe(JSON.stringify(det2.maaneder))
})
