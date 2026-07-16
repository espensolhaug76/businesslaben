import { test } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'
import { lesState, ventState, dispatch, dispatchN, ryddLocalStorage, type SpillState } from './harness'
import { kampanjeKostnad } from '../../src/game/data/kampanje'

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
const FORSIKRING = 2_000
const SKIFT = { fra: 9 * 60, til: 17 * 60 } // hele åpningstiden (09–17)

// LOKALER (REKALIBRERING pkt. 35 / DEL 5): husleie = districts.leieniva(45 000) ×
// rentFactor. sentrum-l2 (referanse, rentFactor 1.0) og sentrum-l4 (billigst,
// rentFactor 0.8) — verifiserer at målbildet holder på BÅDE dyrt og billig lokale.
const LOKALER: Record<string, { id: string; zone: string; rent: number; capacity: number }> = {
  'sentrum-l2': { id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 },
  'sentrum-l4': { id: 'sentrum-l4', zone: 'gagata', rent: 36_000, capacity: 80 },
}

// MARKEDSFØRING (NY MODELL, Tema 8 DEL D). Café-målgruppe = unge voksne + voksne
// (spillets segment-id-er, mappes til Ipsos-buckets i kampanje.ts). Månedsbudsjettet
// fordeles jevnt på kanaler som treffer målgruppa (Instagram/Snapchat/Facebook —
// ekte kanal-id-er). marketingBudget er Record<kanal-id, kr/mnd>; effekten leses av
// lopendeMarkedsforingsfaktor. IKKE en balansejustering — bare korrekt måling.
const MAALGRUPPE = ['21-30', '31-45']
const MKF_KANALER = ['instagram', 'snapchat', 'facebook']
function markedsBudsjettPerKanal(total: number): Record<string, number> {
  if (total <= 0) return {}
  const per = Math.round(total / MKF_KANALER.length)
  return Object.fromEntries(MKF_KANALER.map(id => [id, per]))
}

interface DagLogg {
  mnd: number; dag: number
  omsetning: number; varekost: number; svinn: number; dagsresultat: number
  kunder: number; tapteKr: number; koKunder: number
}
interface MndLogg {
  mnd: number
  omsetning: number; varekost: number; svinn: number; bruttomargin: number
  husleie: number; lonn: number; forsikring: number; markedsforing: number; faste: number
  kampanjeKost: number       // kampanjekostnad denne mnd (trekkes fra kassa, IKKE fra settlement.resultat)
  manedsresultat: number     // NETTO = settlement.resultat − kampanjeKost (ekte månedsresultat)
  settlementResultat: number // settlement.resultat rått (uten kampanjefratrekk) — for sporing
  kunderSnitt: number        // snitt betjente bakgrunnskunder/dag denne mnd
  kasse: number; besteDag: number
}
interface StrategiResultat { navn: string; lokaleId: string; dager: DagLogg[]; maaneder: MndLogg[] }

interface Strategi {
  navn: string
  opening: { productId: string; qty: number }[]
  restock: Record<string, number>          // vare-id → mål-lagernivå (tomt = ingen påfyll)
  trau: string[]                            // vare-id-er i trau (eksponering)
  vindu: string[]                           // vare-id-er i vindu (eksponering)
  markedsforingMnd: number                  // total mnd-markedsføring (fast kostnad)
  ansett: { level: 'junior' | 'senior' | 'ekspert'; salary: number; vakt?: { fra: number; til: number } }[]
  spillerVakt: boolean
  /** GODT DREVET: én kampanje/mnd via ekte Tema 8-mekanikk (START_KAMPANJE). */
  kampanje?: { kanaler: { kanalId: string; krPerDag: number }[]; varighet: number }
  /** Hvilke lokaler strategien kjøres på (default: kun sentrum-l2). */
  lokaler?: string[]
  /** Prising = markedsPris × denne (DEL 7d/7f-e). Default 1,0 (markedspris);
   *  GRÅDIG = 2,0 (dobbel pris → priselastisiteten skal straffe salget). */
  prisMultiplikator?: number
}

// ── Strategier (REKALIBRERING pkt. 35 — mot VERDENSMODELL-målbildet) ───────────
const BAKERI = ['croissant', 'kanelbolle', 'skolebrod', 'muffin-blabaer']
// Lager rikelig så STOCK ikke er den bindende skranken (vi måler trafikk/kapasitet,
// ikke om eleven bestilte for lite): en fornuftig elev holder disken full.
// Ferskvare-lager nær DAGSETTERSPØRSELEN (~44/SKU ved ~150 kunder) med liten
// buffer → lavt svinn (en fornuftig elev overfyller ikke ferskvaredisken). Kaffe
// er holdbar (carry-over), så rikelig.
const FORNUFTIG_OPENING = [
  { productId: 'coffee', qty: 170 }, { productId: 'croissant', qty: 48 },
  { productId: 'kanelbolle', qty: 48 }, { productId: 'skolebrod', qty: 48 },
  { productId: 'muffin-blabaer', qty: 48 },
]
const FORNUFTIG_RESTOCK = { coffee: 170, croissant: 48, kanelbolle: 48, skolebrod: 48, 'muffin-blabaer': 48 }
const DELTID = { fra: 12 * 60, til: 17 * 60 }  // deltidsvakt 12–17 (ettermiddagsrush)

const STRATEGIER: Strategi[] = [
  {
    navn: '1 · PASSIV (gulvet)',
    // Passiv elev: tar den foreslåtte åpningsbestillingen, åpner hver dag, gjør
    // ELLERS ingenting (ingen påfyll, ingen disk, ingen markedsføring). Tomt lager
    // fra dag 2 → nesten alt tapt salg. Skal ALDRI gå i pluss.
    opening: [
      { productId: 'coffee', qty: 40 }, { productId: 'croissant', qty: 20 },
      { productId: 'kanelbolle', qty: 20 }, { productId: 'skolebrod', qty: 20 },
    ],
    restock: {}, trau: [], vindu: [], markedsforingMnd: 0, ansett: [], spillerVakt: false,
    lokaler: ['sentrum-l2'],
  },
  {
    navn: '2 · FORNUFTIG VG1 (solo)',
    // Realistisk elev: holder lager, fyller 4 trau, priser veiledende, driver selv
    // (solo Junior-kapasitet, lønn 0). Ligger PÅ solo-taket på sentrum-l2.
    opening: FORNUFTIG_OPENING, restock: FORNUFTIG_RESTOCK,
    trau: BAKERI, vindu: [], markedsforingMnd: 0, ansett: [], spillerVakt: true,
    lokaler: ['sentrum-l2', 'sentrum-l4'],
  },
  {
    navn: 'G · GRÅDIG (alle priser 2× marked)',
    // KONTROLL (DEL 7f-e): som FORNUFTIG, men alle priser = DOBBEL markedspris.
    // Priselastisiteten skal straffe salget hardt (HØY-varer selger ~0) → klart
    // dårligere månedsresultat enn FORNUFTIG. Asserteres i testen.
    opening: FORNUFTIG_OPENING, restock: FORNUFTIG_RESTOCK,
    trau: BAKERI, vindu: [], markedsforingMnd: 0, ansett: [], spillerVakt: true,
    prisMultiplikator: 2, lokaler: ['sentrum-l2'],
  },
  {
    navn: '3 · FORNUFTIG + DELTID',
    // Som 2, men med én deltidsansatt (Junior, 12–17) som løfter kapasiteten i
    // ettermiddagsrushet → flere kunder betjent (kaféen «tåler deltid»).
    opening: FORNUFTIG_OPENING, restock: FORNUFTIG_RESTOCK,
    trau: BAKERI, vindu: [], markedsforingMnd: 0,
    ansett: [{ level: 'junior', salary: 9_000, vakt: DELTID }], spillerVakt: true,
    lokaler: ['sentrum-l2'],
  },
  {
    navn: '4 · GODT DREVET (bemannet + mkf + kampanje)',
    // Full eksponering (4 trau + vindu), 1 Ekspert på full vakt + spiller (nok
    // kapasitet til 250–300 kunder), MODERAT løpende markedsføring (9 000 kr/mnd
    // fordelt på 3 kanaler mot målgruppa) OG én synlighetskampanje/mnd (ekte Tema
    // 8-mekanikk, 6 dager). Skal treffe 250–300 kunder / 20–24k oms / +25–40k.
    opening: [
      { productId: 'coffee', qty: 330 }, { productId: 'croissant', qty: 86 },
      { productId: 'kanelbolle', qty: 86 }, { productId: 'skolebrod', qty: 86 },
      { productId: 'muffin-blabaer', qty: 86 },
    ],
    restock: { coffee: 330, croissant: 86, kanelbolle: 86, skolebrod: 86, 'muffin-blabaer': 86 },
    trau: BAKERI, vindu: ['croissant'],
    markedsforingMnd: 10_000,
    ansett: [{ level: 'ekspert', salary: 28_000 }], spillerVakt: true,
    kampanje: { kanaler: MKF_KANALER.map(kanalId => ({ kanalId, krPerDag: 500 })), varighet: 8 },
    lokaler: ['sentrum-l2', 'sentrum-l4'],
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
async function restock(page: import('@playwright/test').Page, targets: Record<string, number>, _dayNumber: number) {
  if (!Object.keys(targets).length) return
  // MÅNEDSSKIFTE FIKSET (balansefiks DEL 1): en ordre lagt siste handledag får nå
  // ankomstDag = 1 (wrappet i ORDER_PRODUCT) og leveres dag 1 i ny måned — så vi
  // bestiller HVER handledag, også dag 12. Tidligere strandet dag-12-ordren, og
  // ny måned startet med tom ferskvaredisk (måned 2–3 svakt negative).
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

async function kjørStrategi(page: import('@playwright/test').Page, strat: Strategi, lokaleId: string): Promise<StrategiResultat> {
  const lokale = LOKALER[lokaleId]
  await boot(page)
  // Oppsett (via test-broen): lokale + åpningsbestilling (ligger på lager dag 1).
  await dispatch(page, { type: 'RENT_LOCATION', ...lokale })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: strat.opening })
  await ventState(page, s => s.rentedLocationId === lokale.id && s.openingOrderPlaced, 'leid + åpningsordre')

  // PRISING (DEL 7d): spillets UI har ikke lenger «veiledende pris» — varene
  // starter UPRISET. Testlaget priser selv via en INTERN referanseprisfunksjon
  // (= markedsPris × strategiens prisMultiplikator; 1,0 = markedspris, GRÅDIG =
  // 2,0). Kjøres i nettleseren så FULLE Product-objekter bevares.
  await page.evaluate((mult) => {
    const st = window.__GAME_STATE__ as unknown as { products: { markedsPris: number }[] }
    const priset = st.products.map(p => ({ ...p, retailPrice: Math.round(p.markedsPris * mult) }))
    window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: priset } as never)
  }, strat.prisMultiplikator ?? 1)
  await ventState(page, st => st.products.length > 0 && st.products.every(p => p.retailPrice > 0), 'varer priset (referansepris)')

  // Eksponering (trau + vindu) — persisterer, telles ved hver OPEN_DAY.
  if (strat.trau.length) await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: strat.trau.map((productId, i) => ({ trauId: `trau-${i + 1}`, productId })) })
  if (strat.vindu.length) await dispatch(page, { type: 'SET_WINDOW_DISPLAY', fixtureId: 'vindu', items: strat.vindu.map(productId => ({ productId, fixtureId: 'vindu' })) })
  // Målgruppe (segmenter) — samme API som spillet. Café: unge voksne + voksne.
  // Segmentene styrer kanal-treffet i markedsføringsmodellen (lopendeMarkedsforings-
  // faktor). Uten markedsføring (PASSIV/FORNUFTIG) er dette uten effekt på trafikken.
  await dispatch(page, { type: 'SET_TARGET_AUDIENCE', audience: { geography: null, genders: [], ageGroups: MAALGRUPPE, psychographics: [] } })
  // NY MODELL (Tema 8 DEL D): månedsbudsjettet fordeles på EKTE kanal-id-er
  // (marketingBudget: Record<kanal-id, kr/mnd>), og trafikkeffekten leses av
  // lopendeMarkedsforingsfaktor(budsjett, segmenter) — samme vei som spillet.
  // Verdiene i BALANCE.kampanje.lopende TUNES IKKE her (kommer i rekalibrering);
  // balansespilleren skal bare MÅLE riktig.
  if (strat.markedsforingMnd > 0) await dispatch(page, { type: 'SET_MARKETING', budget: markedsBudsjettPerKanal(strat.markedsforingMnd) })
  // Bemanning: spillervakt + evt. ansatte (selger, hele åpningstiden).
  if (strat.spillerVakt) await dispatch(page, { type: 'SET_PLAYER_SHIFT', vakt: SKIFT })
  for (let i = 0; i < strat.ansett.length; i++) {
    const a = strat.ansett[i]
    await dispatch(page, { type: 'HIRE_EMPLOYEE', employee: { id: `emp_${i}`, navn: `Ansatt ${i + 1}`, role: 'selger', level: a.level, monthlySalary: a.salary, vakt: a.vakt ?? SKIFT } })
  }

  const dager: DagLogg[] = []
  const maaneder: MndLogg[] = []
  const totalDager = ANTALL_MND * DAGER_PER_MND
  // Kampanjekostnad per måned (mnd → kr) — trekkes fra kassa ved START_KAMPANJE,
  // men IKKE fra settlement.resultat, så vi trekker den selv i nettoresultatet.
  const kampanjeKostPerMnd: Record<number, number> = {}

  for (let d = 0; d < totalDager; d++) {
    const s0 = await lesState(page)
    const mnd = s0.currentMonth
    // GODT DREVET: start én synlighetskampanje (ekte Tema 8-mekanikk) ved
    // månedsstart. Ingen salgsvarer (ingen prisendring → intet førpris-brudd);
    // kampanjefaktoren løfter bakgrunnstrafikken i `varighet` dager, kostnaden
    // trekkes fra kassa ved start.
    if (strat.kampanje && s0.dayNumber === 1) {
      await dispatch(page, { type: 'START_KAMPANJE', kampanje: {
        maalType: 'kunder', maalProsent: 20, segmenter: MAALGRUPPE,
        kanaler: strat.kampanje.kanaler, varighet: strat.kampanje.varighet,
        situasjon: 'balansespiller', salgsvarer: [],
      } })
      await ventState(page, s => s.kampanje.aktiv !== null, 'kampanje startet')
      kampanjeKostPerMnd[mnd] = (kampanjeKostPerMnd[mnd] ?? 0) + kampanjeKostnad(strat.kampanje.kanaler, strat.kampanje.varighet)
    }
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
      const kampKost = kampanjeKostPerMnd[rulletFra] ?? 0
      // faste robust: bruk settlement-summen, ellers summér kostnadslinjene.
      const fasteSum = Number.isFinite(set.fasteKostnader) ? set.fasteKostnader : (set.kostnadslinjer ?? []).reduce((a, l) => a + l.belop, 0)
      maaneder.push({
        mnd: rulletFra,
        omsetning: mndDager.reduce((a, x) => a + x.omsetning, 0),
        varekost: mndDager.reduce((a, x) => a + x.varekost, 0),
        svinn: mndDager.reduce((a, x) => a + x.svinn, 0),
        bruttomargin: mndDager.reduce((a, x) => a + x.dagsresultat, 0),
        husleie: lokale.rent, lonn: lonnLinje, forsikring: FORSIKRING, markedsforing: mkfLinje,
        kampanjeKost: kampKost, faste: fasteSum,
        // fasteSum inkluderer nå eierlønn (economy.ts). NETTO månedsresultat
        // = settlement.resultat − kampanjekostnad (som trekkes fra kassa, ikke settlement).
        manedsresultat: set.resultat - kampKost,
        settlementResultat: set.resultat,
        kunderSnitt: mndDager.length ? Math.round(mndDager.reduce((a, x) => a + x.kunder, 0) / mndDager.length) : 0,
        kasse: etter.money,
        besteDag: Math.max(0, ...mndDager.map(x => x.omsetning)),
      })
      await dispatch(page, { type: 'DISMISS_MONTH_SETTLEMENT' })
    }
  }
  return { navn: strat.navn, lokaleId, dager, maaneder }
}

// ── Rapport ────────────────────────────────────────────────────────────────────
const kr = (n: number) => Math.round(n).toLocaleString('nb-NO')

const snitt = (r: StrategiResultat) => r.maaneder.reduce((a, m) => a + m.manedsresultat, 0) / Math.max(1, r.maaneder.length)
const snittKunder = (r: StrategiResultat) => r.dager.reduce((a, d) => a + d.kunder, 0) / Math.max(1, r.dager.length)
const navnMedLokale = (r: StrategiResultat) => `${r.navn} @ ${r.lokaleId}`

function byggRapport(res: StrategiResultat[], det2: StrategiResultat): string {
  const L: string[] = []
  L.push('# Balanseanalyse — «Hvor mye kan kaféen selge for, og kan en elev gå i pluss?»')
  L.push('')
  L.push('> Auto-generert av `balansespiller.spec.ts` (`npx playwright test tests/spilltest/balansespiller.spec.ts`).')
  L.push('> Simulerer 3 spillmåneder (12 handledager/mnd) på flere lokaler (billig + sentrum-l2), etter')
  L.push('> REKALIBRERINGEN (pkt. 35). Deterministisk (bakgrunnssalget seedes av `dagSeed`).')
  L.push('')
  L.push('**Avgrensning:** måler BAKGRUNNSSALGET (volumet strategiene manipulerer). Kundemøtene')
  L.push('(pedagogikk) skipes, rykte holdes 50. **Månedsresultat er NETTO etter eierlønn (40 000) og')
  L.push('etter kampanjekostnad** (som trekkes fra kassa, ikke fra settlement.resultat).')
  L.push('')
  L.push('## a) Månedsresultat per strategi × lokale')
  L.push('')
  L.push('| Strategi @ lokale | Mnd | Kunder/dag | Omsetning | Varekost | Svinn | Faste (husleie/lønn/mkf/fors.) | Kampanje | **Nettoresultat** | Kasse |')
  L.push('|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|')
  for (const r of res) {
    for (const m of r.maaneder) {
      L.push(`| ${navnMedLokale(r)} | ${m.mnd} | ${m.kunderSnitt} | ${kr(m.omsetning)} | ${kr(m.varekost)} | ${kr(m.svinn)} | ${kr(m.faste)} (${kr(m.husleie)}/${kr(m.lonn)}/${kr(m.markedsforing)}/${kr(m.forsikring)}) | ${kr(m.kampanjeKost)} | **${kr(m.manedsresultat)}** | ${kr(m.kasse)} |`)
    }
  }
  L.push('')
  L.push('**Snitt per strategi × lokale (mnd 1–3):**')
  L.push('')
  L.push('| Strategi @ lokale | Snitt kunder/dag | Beste dagsomsetning | **Snitt nettoresultat/mnd** |')
  L.push('|---|--:|--:|--:|')
  for (const r of res) {
    const beste = Math.max(0, ...r.dager.map(d => d.omsetning))
    L.push(`| ${navnMedLokale(r)} | ${snittKunder(r).toFixed(0)} | ${kr(beste)} | **${kr(snitt(r))}** |`)
  }
  L.push('')
  // Determinisme
  const a = JSON.stringify(res.find(r => r.navn === det2.navn && r.lokaleId === det2.lokaleId)?.maaneder), b = JSON.stringify(det2.maaneder)
  L.push(`## Determinisme`)
  L.push('')
  L.push(`FORNUFTIG @ sentrum-l2 kjørt to ganger: månedstallene er ${a === b ? '**IDENTISKE** ✅' : '**ULIKE** ❌'} (bevist ved re-kjøring i samme løp).`)
  L.push('')
  return L.join('\n')
}

test('Balansespiller — strategier × lokaler × 3 måneder', async ({ page }) => {
  const res: StrategiResultat[] = []
  for (const strat of STRATEGIER) {
    for (const lokaleId of (strat.lokaler ?? ['sentrum-l2'])) {
      process.stdout.write(`\n▶ ${strat.navn} @ ${lokaleId}\n`)
      const r = await kjørStrategi(page, strat, lokaleId)
      for (const m of r.maaneder) process.stdout.write(`    mnd ${m.mnd}: ${m.kunderSnitt} kunder/dag · oms=${kr(m.omsetning)} · faste=${kr(m.faste)} · kamp=${kr(m.kampanjeKost)} → netto=${kr(m.manedsresultat)} kr (kasse ${kr(m.kasse)})\n`)
      res.push(r)
    }
  }
  // Determinisme: kjør FORNUFTIG @ sentrum-l2 en gang til.
  process.stdout.write(`\n▶ Determinisme-kontroll: FORNUFTIG @ sentrum-l2 på nytt\n`)
  const det2 = await kjørStrategi(page, STRATEGIER[1], 'sentrum-l2')

  const rapport = byggRapport(res, det2)
  fs.writeFileSync(path.join(process.cwd(), 'docs/rapporter/BALANSE_DATA.md'), rapport, 'utf8')
  process.stdout.write(`\n📄 Data skrevet: docs/rapporter/BALANSE_DATA.md\n`)
  fs.writeFileSync(path.join(process.cwd(), 'docs/rapporter/BALANSE_DATA.json'), JSON.stringify({ strategier: res, det2: det2.maaneder }, null, 2), 'utf8')

  // Determinisme-assert (FORNUFTIG @ sentrum-l2 identisk).
  const { expect } = await import('@playwright/test')
  const forn = res.find(r => r.navn === det2.navn && r.lokaleId === 'sentrum-l2')!
  expect(JSON.stringify(forn.maaneder), 'FORNUFTIG @ sentrum-l2 deterministisk (to like løp)').toBe(JSON.stringify(det2.maaneder))

  // DEL 7f-e: GRÅDIG (alle priser 2× marked) skal gi KLART dårligere
  // månedsresultat enn FORNUFTIG — priselastisiteten straffer overpris.
  const gradig = res.find(r => r.navn.startsWith('G ·') && r.lokaleId === 'sentrum-l2')!
  process.stdout.write(`\n▶ Priskontroll: FORNUFTIG ${kr(snitt(forn))}/mnd vs GRÅDIG ${kr(snitt(gradig))}/mnd\n`)
  expect(snitt(gradig), 'GRÅDIG (2× pris) klart dårligere enn FORNUFTIG').toBeLessThan(snitt(forn) - 10_000)
})
