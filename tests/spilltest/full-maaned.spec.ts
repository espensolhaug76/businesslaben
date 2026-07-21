import { test, expect } from '@playwright/test'
import {
  Rapport, steg, lesState, ventState, dispatch, dispatchN, ryddLocalStorage,
  skrivRapport, nullstillFeilmappe, type SpillState,
} from './harness'
// FASIT-kilder: samme rene funksjoner reduceren bruker (regn fasit i testen,
// ikke les den fra UI-et; ikke hardkod en kopi). Type-only importer i economy.ts
// erases, så dette drar ingen React-/spill-runtime inn i testen.
import { amortiserLaan, manedligeFasteKostnader } from '../../src/game/data/economy'
import { BUDSJETT_LINJER, maanedNokkel, faktiskeLinjer, linjeAvvik, type BudsjettTall } from '../../src/game/data/budsjett'
import { kampanjefaktor, kampanjeKostnad, kampanjeFaktiskProsent, kampanjeMerinntekt, kampanjeRoi } from '../../src/game/data/kampanje'
import { DAY_CONFIG } from '../../src/game/data/dayConfig'
import { INDUSTRY_META } from '../../src/game/data/industries'
import { provisjonKr, byTilbudById } from '../../src/game/data/bykatalog'
import { BALANCE } from '../../src/game/data/balance'
import { beregnPakke, velgProfil, EGEN_KAFE_ID, velgTuristkontorScenario, velgByhotellScenario } from '../../src/game/data/reiseliv'
import { TURIST_SCENARIO_IDS, TURISTKONTOR_SCENARIO_IDS, BYHOTELL_SCENARIO_IDS, CAFE_SCENARIO_IDS } from '../../src/game/sales/scenarios'
import { bestillingBetaling, tilbudsprisPerEnhet, leverandorNettoBesparelse, epostAbsDag, type KundebestillingPayload, type LeverandortilbudPayload } from '../../src/game/data/innboksEpost'
import { finnKandidater, fagForSporsmal } from '../../src/game/data/espenSporsmal'
import { STAMKUNDER_AKTIV, TURISTSESONG_AKTIV } from '../../src/game/data/featureFlags'
import type { InboxMessage, GameState } from '../../src/game/types'

// ─── SPILLTEST: «En full måned» ──────────────────────────────────────────────
// Spiller byspillet (/game) ende til ende og asserter på state + DOM ved hvert
// steg. Se docs/SPILLTESTER.md for dekning, avgrensning og hvordan legge til steg.

test.describe.configure({ mode: 'serial' })

test('En full måned — kjernesløyfa ende til ende', async ({ page }) => {
  nullstillFeilmappe()
  const rapport = new Rapport('En full måned')
  const notater: string[] = [
    'Oppsett som ikke er et telt steg (leie av lokale + tom åpningsbestilling, samt fase-/tidsstyring OPEN_DAY/CLOSE_DAY/START_NEW_DAY/TICK) kjøres via test-broen window.__GAME_DISPATCH__ — se DEL 3 i docs/SPILLTESTER.md for hvorfor (klokka ville ellers brukt ~6 min per dag).',
  ]

  // ── Boot + deterministisk oppsett ──────────────────────────────────────────
  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  // DETERMINISME: seed Math.random (mulberry32) så det som ikke alt går via
  // spillets dagSeed — bl.a. salgsscenarioets `shuffle` av valg-rekkefølgen —
  // blir reproduserbart. Kjøres ved HVER navigasjon (addInitScript), og re-
  // seedes likt hver gang, så to løp gir identiske tall. Ren test-determinisme.
  await page.addInitScript(() => {
    let a = 0x9e3779b9
    Math.random = () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0
      let t = Math.imul(a ^ (a >>> 15), 1 | a)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  })
  // Presets: hopp over mentor-introen (blokkerer ellers klikk).
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  await page.goto('/game?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'StartupScreen hoppet over (?skip=1)')

  // Hjelpere for dashbord-navigasjon (ekte student-klikk) ──────────────────────
  const dashbord = page.getByTestId('dashbord')
  async function åpneDashbord() {
    if (!(await dashbord.isVisible().catch(() => false))) {
      await page.getByRole('button', { name: /💻 Dashbord/ }).first().click()
      await expect(dashbord).toBeVisible()
    }
  }
  async function lukkDashbord() {
    if (await dashbord.isVisible().catch(() => false)) {
      await page.getByTestId('dashbord-lukk').click()
      await expect(dashbord).toBeHidden()
    }
  }
  // Naviger til en fane via data-testid (fane-<id>) — IKKE accessible-name-
  // matching, som er skjør mot UI-tekst (f.eks. fargesvak-bokstavmerket på fanene).
  async function gåTilFane(faneId: string) {
    await åpneDashbord()
    await page.getByTestId(`fane-${faneId}`).click()
  }

  // ── STEG 1 — Oppstart ───────────────────────────────────────────────────────
  await steg(page, rapport, 1, 'Oppstart: /game?skip=1 laster, HUD viser startkapital + Januar År 1', async ctx => {
    const s = await lesState(page)
    // LES startkapitalen fra kilden (INDUSTRY_META) — ikke hardkod (rekalibrering
    // pkt. 35 hevet kafé til 200 000; testen skal følge kilden automatisk).
    const startkapital = INDUSTRY_META.cafe.startingMoney
    expect(s.money, `startkapital (cafe = ${startkapital})`).toBe(startkapital)
    expect(s.currentMonth).toBe(1)
    expect(s.currentYear).toBe(1)
    await expect(page.locator('body')).toContainText(`${startkapital.toLocaleString('nb-NO')} kr`)
    await expect(page.locator('body')).toContainText('Januar')
    ctx.ok(`state.money = ${s.money} kr, currentMonth=${s.currentMonth}, currentYear=${s.currentYear}`)
    ctx.ok(`HUD viser «${startkapital.toLocaleString('nb-NO')} kr» og «Januar · År 1»`)
  })

  // Oppsett (ikke et telt steg): lei et lokale + tom åpningsbestilling.
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [] })
  await ventState(page, s => s.rentedLocationId === 'sentrum-l2' && s.openingOrderPlaced, 'lokale leid + åpningsordre plassert')

  // ── STEG 2 — Bestilling (ORDER_PRODUCT + merge-fiks + pengetrekk) ────────────
  await steg(page, rapport, 2, 'Bestilling: Produkter-fanen, bestill 3 varer (ingen dup-linjer, beløp trukket)', async ctx => {
    const før = await lesState(page)
    const bestillinger: [string, number][] = [['coffee', 12], ['croissant', 10], ['kanelbolle', 8]]
    let forventetKost = 0
    const katalogKost: Record<string, number> = {}

    await gåTilFane('produkter')
    for (const [id, qty] of bestillinger) {
      const qtyInput = page.getByTestId(`qty-${id}`)
      await qtyInput.fill(String(qty))
      await page.getByTestId(`bestill-${id}`).click()
      await ventState(page, s => s.incomingOrders.some(o => o.productId === id && o.qty >= qty), `bestilling ${id} registrert`)
      const s = await lesState(page)
      katalogKost[id] = s.products.find(p => p.id === id)?.costPrice ?? 0
      forventetKost += katalogKost[id] * qty
    }
    // Merge-fiks (regresjonssjekk): bestill coffee ÉN gang til → SAMME linje
    // (samme productId + ankomstDag), ikke en ny duplikatlinje.
    const antallLinjerFør = (await lesState(page)).incomingOrders.length
    await page.getByTestId('qty-coffee').fill('5')
    await page.getByTestId('bestill-coffee').click()
    await ventState(page, s => (s.incomingOrders.find(o => o.productId === 'coffee')?.qty ?? 0) >= 17, 'coffee-linje merget (12+5)')
    forventetKost += katalogKost['coffee'] * 5

    const etter = await lesState(page)
    const coffeeLinjer = etter.incomingOrders.filter(o => o.productId === 'coffee')
    expect(coffeeLinjer.length, 'coffee skal være ÉN merget linje, ikke duplikater').toBe(1)
    expect(coffeeLinjer[0].qty, 'coffee-linjens antall = 12 + 5').toBe(17)
    expect(etter.incomingOrders.length, 'antall ordrelinjer uendret av merge (3 distinkte varer)').toBe(antallLinjerFør)
    expect(etter.incomingOrders.length).toBe(3)
    expect(etter.money, 'pengene trukket = sum av innkjøp').toBe(før.money - forventetKost)
    ctx.ok(`3 ordrelinjer (coffee ×17 merget, croissant ×10, kanelbolle ×8) — ingen duplikater`)
    ctx.ok(`money ${før.money} → ${etter.money} (−${forventetKost} kr, korrekt trekk)`)
    await lukkDashbord()
  })

  // ── STEG 3 — Levering ved dagstart ──────────────────────────────────────────
  await steg(page, rapport, 3, 'Levering ved dagstart: varene på lager FØR åpning (dag 2)', async ctx => {
    const bestilt = await lesState(page)
    const forventet: Record<string, number> = {}
    for (const o of bestilt.incomingOrders) forventet[o.productId] = (forventet[o.productId] ?? 0) + o.qty

    // Dag 1: åpne og steng (0 lager ⇒ ingen salg), rull så til dag 2 → levering.
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen', 'dag 1 åpen')
    await dispatch(page, { type: 'CLOSE_DAY' })
    await ventState(page, s => s.dayPhase === 'oppgjør', 'dag 1 stengt (oppgjør)')
    await dispatch(page, { type: 'START_NEW_DAY' })
    await ventState(page, s => s.dayNumber === 2 && s.dayPhase === 'stengt', 'ny dag (dag 2) startet')

    const s = await lesState(page)
    for (const [id, qty] of Object.entries(forventet)) {
      const p = s.products.find(pp => pp.id === id)
      expect(p, `vare ${id} finnes i sortimentet`).toBeTruthy()
      expect(p!.stock, `vare ${id} levert på lager (${qty} stk) FØR åpning`).toBeGreaterThanOrEqual(qty)
      ctx.ok(`${id}: lager ${p!.stock} stk (bestilt ${qty}) — levert ved dagstart`)
    }
    expect(s.incomingOrders.length, 'alle bestillinger ankommet (ingen underveis)').toBe(0)
    expect(s.dayPhase).toBe('stengt')
    ctx.ok('dayPhase = «stengt» (varene lå på lager FØR åpning)')
  })

  // ── STEG 4 — Stell disken (counterLayout ≥ 2 trau) ──────────────────────────
  await steg(page, rapport, 4, 'Stell disken: legg varer i minst 2 trau, plassering i state', async ctx => {
    const s0 = await lesState(page)
    const varer = s0.products.filter(p => p.stock > 0).slice(0, 2)
    expect(varer.length, 'minst 2 varer med lager å stille ut').toBeGreaterThanOrEqual(2)
    const layout = [
      { trauId: 'trau-1', productId: varer[0].id },
      { trauId: 'trau-2', productId: varer[1].id },
    ]
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: layout })
    await ventState(page, s => s.counterLayout.length >= 2, 'disk-oppsett lagret')
    const s = await lesState(page)
    expect(s.counterLayout.length, 'minst 2 trau fylt').toBeGreaterThanOrEqual(2)
    for (const it of s.counterLayout) {
      expect(s.products.some(p => p.id === it.productId), `trau ${it.trauId} peker på en reell vare`).toBeTruthy()
    }
    ctx.ok(`counterLayout: ${s.counterLayout.map(i => `${i.trauId}=${i.productId}`).join(', ')}`)
  })

  // OPPSETT (DEL 7): varene starter UPRISET (prising er elevens jobb) — sett
  // markedspris på alle så bakgrunnssalget (steg 5) kan skje. Egen upriset/
  // overpris-test i steg 14. Kjøres i nettleseren så fulle Product-objekter bevares.
  await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const st = window.__GAME_STATE__ as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: st.products.map((p: any) => ({ ...p, retailPrice: p.markedsPris })) })
  })
  await ventState(page, s => s.products.length > 0 && s.products.every(p => p.retailPrice > 0), 'varer priset til markedspris')

  // ── STEG 5 — Åpen dag: bakgrunnssalg, kundemøte, dagsoppgjør ─────────────────
  await steg(page, rapport, 5, 'Åpen dag: bakgrunnssalg tikker, kundemøte spilles, dagsoppgjør summerer', async ctx => {
    // Deterministiske salgstall: hold dashbordet ÅPENT (auto-klokka pauser), og
    // driv klokka manuelt via test-broen.
    await åpneDashbord()
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen', 'dag 2 åpen')

    // Tikk til enten et kundemøte spawner ELLER vi passerer minutt 420 (16:00).
    // Bakgrunnssalget dryppes hvert tikk — omsetning skal øke før møtet.
    let s: SpillState = await lesState(page)
    let tikk = 0
    while (!s.activeMeetingScenarioId && s.dayMinute < 420 && tikk < 500) {
      await dispatchN(page, { type: 'TICK' }, 15)  // 15 tikk/round-trip (no-op når møte spawner)
      s = await lesState(page)
      tikk += 15
    }
    expect(s.dayStats.bakgrunnKr, 'bakgrunnssalget har tikket inn omsetning').toBeGreaterThan(0)
    ctx.ok(`bakgrunnssalg etter ${tikk} tikk (dayMinute ${s.dayMinute}): ${s.dayStats.bakgrunnKr} kr, ${s.dayStats.bakgrunnKunder} kunder`)
    expect(s.activeMeetingScenarioId, 'et kundemøte startet').toBeTruthy()
    const møteId = s.activeMeetingScenarioId!
    ctx.ok(`kundemøte startet: «${møteId}»`)

    // Spill møtet til slutt via GYLDIGE valg (ekte overlay + ekte RESOLVE).
    // Overlayet åpnes via den eksisterende dev-hendelsen GamePage lytter på.
    await page.evaluate((id) => window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: id } })), møteId)
    const ov = page.getByTestId('salgsoverlay')
    await expect(ov).toBeVisible({ timeout: 8000 })
    // Generisk gjennomspilling (scopet TIL overlayet): velg → «Neste →» → «Fullfør ✓».
    for (let i = 0; i < 14; i++) {
      const fullfør = ov.getByRole('button', { name: /Fullfør/ })
      if (await fullfør.isVisible().catch(() => false)) { await fullfør.click(); break }
      const neste = ov.getByRole('button', { name: /Neste/ })
      if (await neste.isVisible().catch(() => false)) { await neste.click(); continue }
      await ov.getByTestId('salgsvalg').first().click()
    }
    await expect(ov).toBeHidden({ timeout: 8000 })
    await ventState(page, st => st.activeMeetingScenarioId === null, 'kundemøtet fullført (RESOLVE)')
    const etterMøte = await lesState(page)
    expect(etterMøte.meetingsToday, 'møtet telt som gjennomført').toBeGreaterThanOrEqual(1)
    ctx.ok(`kundemøtet spilt til slutt (meetingsToday=${etterMøte.meetingsToday})`)

    // Auto-klokke-wiring: lukk dashbordet, dayMinute skal avansere av seg selv.
    await lukkDashbord()
    const før = (await lesState(page)).dayMinute
    await ventState(page, st => st.dayPhase === 'åpen' && st.dayMinute > før, 'auto-klokka avanserte dayMinute', 8000)
    ctx.ok(`auto-klokka tikket (dayMinute ${før} → økte av seg selv)`)

    // Steng dagen → dagsoppgjør. Verifiser at DayResult summerer konsistent.
    await dispatch(page, { type: 'CLOSE_DAY' })
    await ventState(page, st => st.dayPhase === 'oppgjør' && !!st.lastDayResult, 'dagsoppgjør klart')
    const dr = (await lesState(page)).lastDayResult as {
      soldKr: number; bakgrunnKr: number; varekostKr: number; svinnKr: number
      resultat: number; svinnStk: number; tapteSalgStk: number
    }
    const forventetResultat = dr.soldKr + dr.bakgrunnKr - dr.varekostKr - dr.svinnKr
    expect(dr.resultat, 'dagsresultat = salg + bakgrunn − varekost − svinn').toBe(forventetResultat)
    ctx.ok(`dagsoppgjør: omsetning=${dr.soldKr + dr.bakgrunnKr} kr, varekost=${dr.varekostKr}, svinn=${dr.svinnKr} kr (${dr.svinnStk} stk), tapt=${dr.tapteSalgStk} stk`)
    ctx.ok(`resultat=${dr.resultat} kr summerer konsistent (salg+bakgrunn−varekost−svinn)`)
  })

  // Rydd dagsoppgjøret (DayResultOverlay dekker skjermen i 'oppgjør' → blokkerer
  // dashbordet). START_NEW_DAY lukker det og gir en ren 'stengt' dag.
  await dispatch(page, { type: 'START_NEW_DAY' })
  await ventState(page, s => s.dayPhase === 'stengt' && !s.lastDayResult, 'dagsoppgjør lukket, ny dag')

  // ── STEG 6 — Forretningsplan → lån ──────────────────────────────────────────
  await steg(page, rapport, 6, 'Forretningsplan → lån: plankvalitet > 0, lån opptatt, rente mot stjernenivå', async ctx => {
    // Fyll sammendrag (≥ 20 tegn ⇒ minst 1 stjerne) + et par BMC-ruter.
    await gåTilFane('forretningsplan')
    const sammendrag = page.getByPlaceholder(/Beskriv forretningsidéen/)
    await sammendrag.fill('Vi driver en koselig sentrumskafé med ferske bakervarer og god kaffe til folk i gågata, med vekt på kvalitet og lokal tilhørighet.')
    await page.getByRole('button', { name: 'Lagre', exact: true }).click()
    await ventState(page, s => s.businessPlan.qualityScore >= 1, 'plankvalitet ≥ 1 stjerne')
    const planState = await lesState(page)
    const q = planState.businessPlan.qualityScore
    expect(q, 'plankvalitet > 0').toBeGreaterThan(0)
    ctx.ok(`plankvalitet = ${q}/5 stjerner`)

    // Ta opp lån (Økonomi → Søk om lån → Godta lån). Default 250 000 / 24 mnd.
    await gåTilFane('okonomi')
    await page.getByRole('button', { name: /Søk om lån/ }).click()
    await page.getByRole('button', { name: /Godta lån/ }).click()
    await ventState(page, s => s.loans.length >= 1, 'lån registrert i state')
    const s = await lesState(page)
    expect(s.loans.length, 'lånet ligger i state').toBe(1)
    const lån = s.loans[0]
    // Rente mot stjernenivå — samme tabell som UI-et (regn forventning her).
    const RATES = [0.15, 0.12, 0.09, 0.07, 0.05, 0.05]
    const forventetRente = RATES[Math.max(0, Math.min(5, q))]
    expect(lån.interestRate, `rente = tabell[${q}] = ${forventetRente}`).toBeCloseTo(forventetRente, 5)
    expect(lån.amount, 'lånebeløp 250 000 (default)').toBe(250_000)
    expect(lån.remainingBalance).toBe(250_000)
    expect(s.totalDebt).toBe(250_000)
    ctx.ok(`lån 250 000 kr @ ${(lån.interestRate * 100).toFixed(0)} % p.a. (plankvalitet ${q} → riktig rentetrinn)`)
    ctx.ok(`totalDebt=${s.totalDebt}, monthlyPayment=${lån.monthlyPayment} kr`)
    await lukkDashbord()
  })

  // ── STEG 7 — Månedsrull: månedsoppgjør m/LÅNEAVDRAG + lønn ────────────────────
  await steg(page, rapport, 7, 'Månedsrull: månedsoppgjør med LÅNEAVDRAG (== amortiserLaan-fasit) + faste kostnader', async ctx => {
    const førRull = await lesState(page)
    // Fasit for låneavdraget FØR rullen (samme rene funksjon som reduceren).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const amortFasit = amortiserLaan(førRull.loans as any)
    const fasteFasit = manedligeFasteKostnader(førRull)
    const pengerFør = førRull.money

    // Rull dager til måneden ruller (currentMonth 1 → 2). Fra vilkårlig fase:
    // stengt→OPEN_DAY, åpen→CLOSE_DAY, oppgjør→START_NEW_DAY.
    let s = await lesState(page)
    let vakt = 0
    while (s.currentMonth === 1 && vakt < 80) {
      if (s.dayPhase === 'stengt') await dispatch(page, { type: 'OPEN_DAY' })
      else if (s.dayPhase === 'åpen') await dispatch(page, { type: 'CLOSE_DAY' })
      else await dispatch(page, { type: 'START_NEW_DAY' })
      s = await lesState(page)
      vakt++
    }
    expect(s.currentMonth, 'måneden rullet til 2').toBe(2)
    const settlement = s.lastMonthSettlement!
    expect(settlement, 'månedsoppgjør finnes').toBeTruthy()

    // LÅNEAVDRAG-seksjonen: beregnet fasit == det oppgjøret bokførte.
    expect(settlement.laanAvdrag, 'LÅNEAVDRAG == amortiserLaan-fasit').toBe(amortFasit.avdragSum)
    expect(settlement.laanRenter, 'renter == amortiserLaan-fasit').toBe(amortFasit.renteSum)
    ctx.ok(`LÅNEAVDRAG: avdrag=${settlement.laanAvdrag} kr, renter=${settlement.laanRenter} kr (== amortiserLaan-fasit)`)

    // Faste kostnader inkl. LØNN trekkes. Lønn er 0 uten ansatte, men linja skal
    // finnes og fasteKostnader == manedligeFasteKostnader-fasit.
    expect(settlement.fasteKostnader, 'faste kostnader == manedligeFasteKostnader-fasit').toBe(fasteFasit.sum)
    const lønnLinje = fasteFasit.linjer.find(l => l.navn === 'Lønn')
    expect(lønnLinje, 'Lønn-linje i faste kostnader').toBeTruthy()
    ctx.ok(`faste kostnader=${settlement.fasteKostnader} kr (husleie ${førRull.monthlyRent} + lønn ${lønnLinje!.belop} + forsikring + mkf) trukket`)

    // Kassa trukket nøyaktig ved rull: KUN faste + (rente + avdrag). Dagenes
    // salgs-cash er allerede bokført løpende (TICK/RESOLVE); svinn/inntekt er
    // RAPPORT i oppgjøret og flytter ikke kassa på rulledagen. I dette raske
    // rulle-løpet tikkes ingen salg på dag 3–12, så kassa-deltaet == trekket.
    const lånebetaling = amortFasit.renteSum + amortFasit.avdragSum
    const forventetPenger = pengerFør - settlement.fasteKostnader - lånebetaling
    expect(s.money, 'kassa = før − faste − lånebetaling (rull-trekket)').toBe(forventetPenger)
    ctx.ok(`kassa ${pengerFør} → ${s.money} kr (− faste ${settlement.fasteKostnader} − lån ${lånebetaling}); rapportert inntekt ${settlement.inntekt} kr`)

    // Lånet skrevet ned (amortisert).
    const nyRest = s.loans[0]?.remainingBalance ?? 0
    expect(nyRest, 'restgjeld skrevet ned med avdraget').toBe(250_000 - amortFasit.avdragSum)
    ctx.ok(`restgjeld 250 000 → ${nyRest} kr (amortisert)`)
  })

  // Lukk månedsoppgjør-overlayet (MonthResultOverlay dekker skjermen ved rull →
  // blokkerer ellers dashbordet i steg 8).
  await dispatch(page, { type: 'DISMISS_MONTH_SETTLEMENT' })
  await ventState(page, s => !s.lastMonthSettlement, 'månedsoppgjør-overlay lukket')

  // ── STEG 8 — Tema på/av (HMS-fanen dukker opp / forsvinner) ──────────────────
  await steg(page, rapport, 8, 'Tema på/av: beredskap aktiverer HMS-fanen; deaktivering fjerner den', async ctx => {
    async function hmsFinnes(): Promise<boolean> {
      await åpneDashbord()
      return await page.getByTestId('fane-hms').isVisible().catch(() => false)
    }
    // Utgangspunkt: HMS skal IKKE finnes (ingen tema aktivert ennå).
    await lukkDashbord()
    expect(await hmsFinnes(), 'HMS-fanen skjult før tema aktiveres').toBe(false)
    ctx.ok('HMS-fanen skjult i utgangspunktet (ingen tema aktivert)')

    // Aktiver beredskap via localStorage-fallbacken + reload (leses ved mount).
    await lukkDashbord()
    await page.evaluate(() => localStorage.setItem('tema-aktivering-dev', JSON.stringify({ beredskap: { aktiv: true, nivaa: 'vg1' } })))
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'reload etter aktivering')
    expect(await hmsFinnes(), 'HMS-fanen synlig når beredskap er aktivt').toBe(true)
    ctx.ok('HMS-fanen dukker opp når beredskap aktiveres (localStorage-fallback)')

    // Deaktiver → HMS forsvinner (null spor).
    await lukkDashbord()
    await page.evaluate(() => localStorage.setItem('tema-aktivering-dev', JSON.stringify({})))
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'reload etter deaktivering')
    expect(await hmsFinnes(), 'HMS-fanen borte når beredskap deaktiveres').toBe(false)
    ctx.ok('HMS-fanen forsvinner igjen ved deaktivering (null spor)')
    await lukkDashbord()
  })

  // ── STEG 9 — Persistens (beredskap overlever reload) ────────────────────────
  await steg(page, rapport, 9, 'Persistens: state.beredskap overlever reload', async ctx => {
    // Aktiver beredskap-temaet igjen + bekreft beredskapsplanen (persisteres).
    await page.evaluate(() => localStorage.setItem('tema-aktivering-dev', JSON.stringify({ beredskap: { aktiv: true, nivaa: 'vg1' } })))
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot før bekreftelse')
    await dispatch(page, { type: 'CONFIRM_BEREDSKAP_PLAN' })
    await ventState(page, s => s.beredskap.planBekreftet === true, 'beredskapsplan bekreftet')

    // Reload — beredskap skal overleve (BEREDSKAP_KEY i localStorage).
    await page.reload()
    await ventState(page, s => s.phase !== 'startup', 'reload i drift')
    const s = await lesState(page)
    expect(s.beredskap.planBekreftet, 'beredskap.planBekreftet overlevde reload').toBe(true)
    ctx.ok('state.beredskap.planBekreftet = true etter reload (persistert via BEREDSKAP_KEY)')
    // Ærlig funn: full spilltilstand persisteres IKKE på main — kun beredskap.
    // ?skip re-seeder et friskt spill (money 150 000, måned 1). Dette er en
    // dokumentert arkitektur-begrensning (se docs/SPILLTESTER.md), ikke en
    // regresjon dette løpet skal gate på.
    notater.push(`Persistens: KUN state.beredskap persisteres på main (BEREDSKAP_KEY). Full spilltilstand (kasse/lån/dag/lager) overlever IKKE reload — ?skip re-seeder et friskt spill (verifisert: money=${s.money}, måned=${s.currentMonth}). Dokumentert begrensning, ikke en regresjon.`)
    ctx.ok(`NB: full spilltilstand persisteres ikke (money re-seedet til ${s.money}) — kun beredskap. Dokumentert begrensning.`)
  })

  // ── STEG 10 — Navigasjonsvakt (fikset i fiksrunde 2 — nå reell PASS-vakt) ─────
  await steg(page, rapport, 10, 'Navigasjonsvakt: hub-lenker i spill-UI skal ALDRI navigere spillfanen bort', async ctx => {
    // Hub-lenkene («📚 Lær mer») bor i HMS-fanen. Aktiver beredskap så de vises.
    await page.evaluate(() => localStorage.setItem('tema-aktivering-dev', JSON.stringify({ beredskap: { aktiv: true, nivaa: 'vg1' } })))
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot for nav-test')
    await åpneDashbord()
    await page.getByTestId('fane-hms').click()
    // Fiksrunde 2 (DEL 1) gjorde hub-lenkene til <a target="_blank"> — altså rolle
    // «link», ikke «button». Klikket åpner ny fane; SPILLfanen blir på /game.
    const hubLenke = page.getByRole('link', { name: /📚 / }).first()
    await expect(hubLenke).toBeVisible()
    const navnLenke = (await hubLenke.innerText()).trim()

    await hubLenke.click()
    await page.waitForTimeout(400)
    const urlEtter = page.url()
    expect(urlEtter, `spillfanen skal bli på /game etter klikk på «${navnLenke}» (fiksrunde 2: target=_blank)`).toContain('/game')
    ctx.ok(`hub-lenke «${navnLenke}» navigerte IKKE spillfanen bort (url: ${urlEtter})`)
  })

  // ── STEG 11 — TEMA 2 Budsjett: avvik == delt fasit + oppsummeringslinje ──────
  await steg(page, rapport, 11, 'Budsjett: sett budsjett, rull måneden, avvik == fasit + oppsummeringslinje', async ctx => {
    // Aktiver Tema 2 (localStorage-fallback) + reload → fersk måned 1.
    await page.evaluate(() => localStorage.setItem('tema-aktivering-dev', JSON.stringify({ budsjett: { aktiv: true, nivaa: 'vg1' } })))
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot med budsjett-tema')
    // Lei lokale (husleie = 45 000) + tom åpningsbestilling, via test-broen.
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [] })
    await ventState(page, s => s.rentedLocationId === 'sentrum-l2', 'lokale leid')

    // Sett budsjett programmatisk for inneværende måned (husleie AVVIKER bevisst
    // fra faktisk 45 000 → et konkret avvik å verifisere mot fasit).
    const s0 = await lesState(page)
    const key = maanedNokkel(s0.currentYear, s0.currentMonth)
    // Eierlønn LESES fra balance-verdien (BALANCE.eierlonnMnd) → avvik 0 mot
    // faktisk, men linja verifiseres i BUDSJETT_LINJER-løkka. Husleie AVVIKER
    // bevisst (40 000 vs faktisk 45 000) for et konkret avvik.
    const budsjett: BudsjettTall = { salgsinntekter: 50000, varekjop: 15000, lonn: 0, eierlonn: BALANCE.eierlonnMnd, husleie: 40000, markedsforing: 0, laan: 0 }
    await dispatch(page, { type: 'SET_BUDSJETT', maaned: key, budsjett })
    await ventState(page, s => !!s.budsjett.maaneder[key], 'budsjett satt')

    // Rull en HEL måned (OPEN/CLOSE/START_NEW_DAY) til månedsoppgjøret bygges.
    for (let d = 0; d < 20 && !(await lesState(page)).lastMonthSettlement; d++) {
      await dispatch(page, { type: 'OPEN_DAY' })
      await ventState(page, s => s.dayPhase === 'åpen', 'dag åpen')
      await dispatch(page, { type: 'CLOSE_DAY' })
      await ventState(page, s => s.dayPhase === 'oppgjør', 'dag stengt')
      await dispatch(page, { type: 'START_NEW_DAY' })
      await ventState(page, s => s.dayPhase === 'stengt', 'ny dag')
    }

    const s1 = await lesState(page)
    const oppgjor = s1.lastMonthSettlement
    expect(oppgjor, 'månedsoppgjør bygget').toBeTruthy()
    expect(s1.budsjett.maaneder[key]?.laastVedOppgjor, 'budsjett låst ved oppgjør').toBe(true)

    // Avvik == delt hjelpefunksjon (faktiskeLinjer/linjeAvvik) — regn fasit i testen.
    const faktisk = faktiskeLinjer(oppgjor!)
    expect(faktisk.husleie, 'faktisk husleie fra oppgjøret').toBe(45000)
    const husleieAvvik = linjeAvvik(budsjett.husleie, faktisk.husleie)
    expect(husleieAvvik, 'husleie-avvik = faktisk − budsjett = 45000 − 40000').toBe(5000)
    // Salgsinntekter: faktisk == oppgjørets brutto salg; avvik == fasit.
    expect(faktisk.salgsinntekter, 'faktisk salg == settlement.salgInntektBrutto').toBe(oppgjor!.salgInntektBrutto)
    // Eierlønn-linja: faktisk == balance-verdien (REKALIBRERING pkt. 35).
    expect(faktisk.eierlonn, 'faktisk eierlønn == BALANCE.eierlonnMnd').toBe(BALANCE.eierlonnMnd)
    for (const l of BUDSJETT_LINJER) {
      expect(linjeAvvik(budsjett[l.key], faktisk[l.key]), `avvik ${l.key} == faktisk − budsjett`).toBe(faktisk[l.key] - budsjett[l.key])
    }
    ctx.ok(`husleie-avvik = ${husleieAvvik} kr (fasit), eierlønn = ${faktisk.eierlonn} kr, ${BUDSJETT_LINJER.length} linjer verifisert mot delt hjelpefunksjon`)

    // Oppsummeringslinja i månedsoppgjøret («Du planla … det ble …»).
    await expect(page.locator('body')).toContainText('Du planla')
    ctx.ok('oppgjøret viser budsjett-kolonner + oppsummeringslinja «Du planla …»')
  })

  // ── STEG 12 — TEMA 8 Kampanje: multiplikator + effektrapport == fasit + førpris ──
  await steg(page, rapport, 12, 'Kampanje: multiplikator + effektrapport == delt fasit + førpris-brudd → tilsynsbrev', async ctx => {
    // Aktiver Tema 8 (VG2 for ROI) + reload → fersk måned 1.
    await page.evaluate(() => localStorage.setItem('tema-aktivering-dev', JSON.stringify({ kampanje: { aktiv: true, nivaa: 'vg2' } })))
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot med kampanje-tema')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [] })
    // Produkt m/pris, så ENDRE prisen (logges) → utløser førpris-brudd ved salgskampanje.
    await dispatch(page, { type: 'SET_PRODUCTS', products: [{ id: 'coffee', name: 'Kaffe', retailPrice: 50, costPrice: 20, stock: 500 }] })
    await dispatch(page, { type: 'SET_PRODUCTS', products: [{ id: 'coffee', name: 'Kaffe', retailPrice: 45, costPrice: 20, stock: 500 }] })

    const kanaler = [{ kanalId: 'instagram', krPerDag: 500 }]
    const segmenter = ['21-30']
    const varighet = 3
    await dispatch(page, { type: 'START_KAMPANJE', kampanje: { maalType: 'kunder', maalProsent: 20, segmenter, kanaler, varighet, situasjon: 'test', salgsvarer: [{ productId: 'coffee', nyPris: 40 }] } })
    await ventState(page, s => s.kampanje.aktiv !== null, 'kampanje startet')

    // Multiplikatoren == delt hjelpefunksjon (kampanjefaktor).
    const s0 = await lesState(page)
    const forventetFaktor = kampanjefaktor(kanaler, segmenter)
    expect(s0.kampanje.aktiv!.faktor, 'multiplikator == kampanjefaktor-fasit').toBeCloseTo(forventetFaktor, 6)
    expect(forventetFaktor, 'godt kanalvalg → merkbart løft (>1)').toBeGreaterThan(1)
    ctx.ok(`multiplikator ${forventetFaktor.toFixed(3)} == kampanjefaktor(kanal×segment) [Instagram × 21-30]`)

    // Spol til slutt → effektrapport.
    await dispatch(page, { type: 'DEV_SPOL_KAMPANJE' })
    await ventState(page, s => s.kampanje.historikk.length > 0, 'kampanje fullført')
    const s1 = await lesState(page)
    const r = s1.kampanje.historikk[s1.kampanje.historikk.length - 1]!
    expect(r.kostnad, 'kostnad == kampanjeKostnad').toBe(kampanjeKostnad(kanaler, varighet))
    expect(r.faktiskProsent, 'faktisk % == kampanjeFaktiskProsent(faktor)').toBe(kampanjeFaktiskProsent(r.faktor))
    expect(r.merinntekt, 'merinntekt == kampanjeMerinntekt(akk, faktor)').toBe(kampanjeMerinntekt(r.akkBakgrunnKr, r.faktor))
    expect(r.roi, 'ROI == kampanjeRoi(merinntekt, kostnad)').toBeCloseTo(kampanjeRoi(r.merinntekt, r.kostnad), 6)
    ctx.ok(`effektrapport: kostnad ${r.kostnad} kr, faktisk +${r.faktiskProsent} %, ROI ${Math.round(r.roi)} % == delte hjelpefunksjoner`)

    // Førpris-brudd (nylig prisendret vare) → tilsynsbrev i innboksen.
    expect(r.forprisBrudd, 'salgskampanje på nylig prisendret vare → førpris-brudd').toBe(true)
    expect(s1.messages.some(m => m.type === 'kampanje'), 'tilsynsbrev (type=kampanje) i innboksen').toBe(true)
    ctx.ok('førpris-brudd genererte tilsynsbrev fra Forbrukertilsynet')
  })

  // ── STEG 13 — Månedsskifte-levering (bestilling siste handledag) ─────────────
  // REGRESJON for balansefiks DEL 1: en ordre lagt siste handledag skal ankomme
  // dag 1 i ny måned (ikke strande på en «dag 13» som aldri kommer), og beløpet
  // skal trekkes ÉN gang (ved bestilling — leveringen re-debiterer ikke).
  await steg(page, rapport, 13, 'Månedsskifte-levering: ordre siste handledag → ankommer dag 1 neste måned, trukket én gang', async ctx => {
    // Hermetisk steg: frisk boot + eget oppsett (uavhengig av forrige stegs
    // tilstand — steg 9 reloadet og re-seedet et friskt spill uten varer/lokale).
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot for steg 12')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 100 }, { productId: 'croissant', qty: 40 }] })
    await ventState(page, s => s.rentedLocationId === 'sentrum-l2' && s.openingOrderPlaced && s.products.length > 0, 'lokale leid + åpningslager på plass')

    // Kjør fram til siste handledag i inneværende måned, stopp i oppgjør (så
    // neste START_NEW_DAY ruller måneden). Ingen ticks ⇒ ingen salg (rask rull).
    let s = await lesState(page)
    for (let i = 0; i < 200; i++) {
      s = await lesState(page)
      if (s.dayNumber === DAY_CONFIG.daysPerMonth && s.dayPhase === 'oppgjør') break
      if (s.dayPhase === 'stengt') await dispatch(page, { type: 'OPEN_DAY' })
      else if (s.dayPhase === 'åpen') await dispatch(page, { type: 'CLOSE_DAY' })
      else await dispatch(page, { type: 'START_NEW_DAY' })
    }
    expect(s.dayNumber, 'på siste handledag').toBe(DAY_CONFIG.daysPerMonth)
    expect(s.dayPhase, 'i dagsoppgjør (kan bestille «til i morgen»)').toBe('oppgjør')

    // Bestill en allerede-ført vare på siste handledag. Pengene trekkes NÅ.
    const vare = s.products.find(p => p.costPrice > 0) ?? s.products[0]
    const qMove = 10
    const kost = vare.costPrice * qMove
    const pengerFør = s.money
    const monthFør = s.currentMonth

    await dispatch(page, { type: 'ORDER_PRODUCT', product: vare, quantity: qMove })
    await ventState(page, st => st.incomingOrders.some(o => o.productId === vare.id && o.ankomstDag === 1), 'bestilling registrert (ankomstDag 1)')
    const s2 = await lesState(page)

    // (a) Beløpet trukket ÉN gang, ved bestilling.
    expect(s2.money, 'kassa − innkjøpskost ved bestilling (trukket én gang)').toBe(pengerFør - kost)
    // (b) Ordren har ankomstDag = 1 (WRAPPET over månedsskiftet — kjernen i fiksen).
    const nyOrdre = s2.incomingOrders.find(o => o.productId === vare.id && o.ankomstDag === 1)
    expect(nyOrdre, 'bestillingen fikk ankomstDag = 1 (dag 1 i ny måned)').toBeTruthy()
    expect(nyOrdre!.qty, 'riktig antall underveis').toBe(qMove)
    ctx.ok(`bestilte ${qMove} × ${vare.name} siste handledag → ankomstDag = 1; kassa ${pengerFør} → ${s2.money} (−${kost})`)

    // Fasit for kassa-trekket ved rullen (faste + lånebetaling) — samme rene
    // funksjoner som reduceren. Skal IKKE inneholde en ny innkjøpsdebet.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const amort = amortiserLaan(s2.loans as any)
    const faste = manedligeFasteKostnader(s2)
    const m1 = s2.money
    const lagerFør = s2.products.find(p => p.id === vare.id)!.stock
    const ankommerQty = s2.incomingOrders.filter(o => o.productId === vare.id && o.ankomstDag <= 1).reduce((a, o) => a + o.qty, 0)

    // Rull måneden.
    await dispatch(page, { type: 'START_NEW_DAY' })
    await ventState(page, st => st.dayPhase === 'stengt', 'ny måned startet')
    const s3 = await lesState(page)

    // (c) Månedsrull skjedde, ny dag er dag 1.
    expect(s3.dayNumber, 'ny måned starter på dag 1').toBe(1)
    expect(s3.currentMonth !== monthFør, 'måneden rullet').toBe(true)
    // (d) Varene ligger på lager dag 1 (levert ved dagstart, FØR åpning).
    expect(s3.products.find(p => p.id === vare.id)!.stock, 'levert dag 1: lager + underveis-antall').toBe(lagerFør + ankommerQty)
    expect(ankommerQty, 'bestillingen fra siste handledag ankom').toBeGreaterThanOrEqual(qMove)
    // (e) Ordren er levert (ute av incomingOrders), IKKE strandet.
    expect(s3.incomingOrders.some(o => o.productId === vare.id && o.ankomstDag === 1), 'ordren strandet ikke').toBe(false)
    // (f) Beløpet ble IKKE trukket på nytt ved levering: kassa-deltaet ved rullen
    // == kun faste + lånebetaling (ingen andre innkjøpsdebet).
    const lån = amort.renteSum + amort.avdragSum
    expect(s3.money, 'kassa ved rull = m1 − faste − lån (leveringen re-debiterer ikke)').toBe(m1 - faste.sum - lån)
    ctx.ok(`ny måned dag 1: ${lagerFør} → ${s3.products.find(p => p.id === vare.id)!.stock} på lager (levert), kassa kun trukket faste ${faste.sum} + lån ${lån} (ingen dobbel innkjøpsdebet)`)
  })

  // ── STEG 14 — DEL 7: upriset vare selges ikke + overpriset HØY-vare selger ~0 ─
  await steg(page, rapport, 14, 'Prising: upriset vare → «mangler pris»-tap; overpriset HØY-vare (2×) selger ~0 → «for høy pris»-tap', async ctx => {
    // Hermetisk: frisk boot + lokale + kaffe (HØY) + croissant i trau.
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot for steg 14')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 120 }, { productId: 'croissant', qty: 80 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.length >= 2, 'åpningslager på plass')
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-1', productId: 'coffee' }, { trauId: 'trau-2', productId: 'croissant' }] })

    // Priser: KAFFE (HØY-profil) til 2× markedspris (overpris); CROISSANT UPRISET (0).
    const marked = (await lesState(page)).products.find(p => p.id === 'coffee')!.markedsPris
    await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const st = window.__GAME_STATE__ as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const priset = st.products.map((p: any) =>
        p.id === 'coffee' ? { ...p, retailPrice: p.markedsPris * 2 } : { ...p, retailPrice: 0 })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: priset })
    })
    await ventState(page, s => (s.products.find(p => p.id === 'coffee')?.retailPrice ?? 0) === marked * 2, 'kaffe = 2× marked, croissant upriset')
    const kaffeFør = (await lesState(page)).products.find(p => p.id === 'coffee')!.stock

    // Spill en hel åpen dag (skip kundemøter) så bakgrunnssalget kjører.
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen', 'dag åpen')
    for (let i = 0; i < 60; i++) {
      const s = await lesState(page)
      if (s.dayPhase !== 'åpen') break
      if (s.activeMeetingScenarioId) { await dispatch(page, { type: 'SKIP_MEETING' }); continue }
      if (s.dayMinute >= 480) break
      await dispatchN(page, { type: 'TICK' }, 120)
    }
    if ((await lesState(page)).dayPhase === 'åpen') await dispatch(page, { type: 'CLOSE_DAY' })
    await ventState(page, s => s.dayPhase === 'oppgjør' && !!s.lastDayResult, 'dagsoppgjør')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = (await lesState(page)).lastDayResult as any
    const s2 = await lesState(page)

    // (a) UPRISET croissant → «mangler pris»-tap + navnet i uprisedeVarer.
    expect(r.manglerPrisStk, 'tapt salg pga mangler pris > 0').toBeGreaterThan(0)
    expect((r.uprisedeVarer as string[]).some(n => /Croissant/i.test(n)), 'croissant listet som upriset').toBe(true)
    // (b) OVERPRISET HØY-vare (kaffe 2×) → «for høy pris»-tap + kaffe i lista.
    expect(r.overprisStk, 'tapt salg pga for høy pris > 0').toBeGreaterThan(0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kaffeOverpris = (r.overprisProdukter as any[]).find(o => /Kaffe/i.test(o.navn))
    expect(kaffeOverpris, 'kaffe (HØY, 2×) tapte salg på for høy pris').toBeTruthy()
    expect(kaffeOverpris.pris, 'elevens kaffepris = 2× markedspris').toBe(marked * 2)
    // (c) Kaffe (HØY @ 2×) selger ~0: lageret nesten urørt (HØY-elastisitet → 0).
    const kaffeSolgt = kaffeFør - s2.products.find(p => p.id === 'coffee')!.stock
    expect(kaffeSolgt, 'overpriset HØY-vare (2×) selger ~0').toBeLessThanOrEqual(2)
    ctx.ok(`upriset croissant: ${r.manglerPrisStk} tapt (mangler pris); kaffe 2× (${marked * 2} kr): ${kaffeSolgt} solgt, ${kaffeOverpris.tapte} tapt (for høy pris)`)
  })

  // ── STEG 15 — TEMA 15 Reiseliv: turistsesong (andel + trafikkløft) + hotellavtale ─
  await steg(page, rapport, 15, 'Reiseliv: turistsesong i kaféen er kun økonomisk (trafikkløft + varevekt, INGEN turist-scenarier i pool) + byhotell-avtale gir riktig effekt ved aksept', async ctx => {
    // TURISTSESONG PARKERT (TURISTSESONG_AKTIV=false): sesongen kan ikke starte, så
    // sesong-økonomien kan ikke testes. Steget bevares for når Tema 15 gjenåpnes.
    // Rydder localStorage (som det fulle steget gjorde) så neste steg booter rent.
    if (!TURISTSESONG_AKTIV) { await ryddLocalStorage(page); ctx.ok('Turistsesong PARKERT — sesong-økonomitesten hoppes over til Tema 15 gjenåpnes'); return }
    const T = BALANCE.turistsesong
    // Hermetisk: frisk boot + sentrum-l2 + priset lager + ett trau.
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot for steg 15')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 200 }, { productId: 'croissant', qty: 80 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.length >= 2, 'åpningslager')
    // Trau med KAFFE (holdbar → stock består over natta, så eksponeringen — og
    // dermed basetrafikken — er IDENTISK på baseline- og sesongdag; croissant er
    // ferskvare og ville svunnet mellom dagene og endret eksponeringen).
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-1', productId: 'coffee' }] })
    await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const st = window.__GAME_STATE__ as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: st.products.map((p: any) => ({ ...p, retailPrice: p.markedsPris })) })
    })
    await ventState(page, s => s.products.every(p => p.retailPrice > 0), 'priset til markedspris')

    // BASELINE (uten sesong): åpne en dag, les basetrafikken (deterministisk,
    // dag-uavhengig). Ingen turister utenom sesong.
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen' && !!s.dayBackground, 'baseline-dag åpen')
    const bg0 = (await lesState(page)).dayBackground!
    const base = bg0.total
    expect(bg0.turistandel, 'ingen turister utenom sesong').toBe(0)
    await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør')
    await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'ny dag')

    // START turistsesong (genererer også byhotellets innboksmelding + DEL d
    // e-postforespørsler om pakke).
    await dispatch(page, { type: 'START_TURISTSESONG' })
    await ventState(page, s => s.turistsesong !== null, 'sesong startet')
    const s1 = await lesState(page)
    const hotellMsg = s1.messages.find(m => m.type === 'hotellavtale')
    expect(hotellMsg, 'byhotellets gjestepakke ligger i innboksen').toBeTruthy()
    // DEL d: 2–3 seedede pakke-forespørsler i innboksen.
    const foresp = s1.messages.filter(m => m.type === 'pakkeforesporsel')
    expect(foresp.length, 'DEL d: 2–3 e-postforespørsler om pakke seedet i innboksen').toBeGreaterThanOrEqual(2)
    expect(foresp.length, 'DEL d: maks 3 e-postforespørsler').toBeLessThanOrEqual(3)

    // SESONGDAG (uten avtale): vare-vekt + trafikkløft == fasit. Bølge 3 v3:
    // sesongeffekten i KAFÉEN er kun økonomisk — turist-scenariene er flyttet ut
    // (til turistkontor/hotell), så kaféens møte-pool skal IKKE inneholde dem.
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen' && !!s.dayBackground, 'sesongdag åpen')
    const sS = await lesState(page)
    const bgS = sS.dayBackground!
    expect(bgS.vareVekt.drikke, 'vare-vekt drikke == fasit').toBe(T.vareVekt.drikke)
    expect(bgS.total, 'trafikkløft == round(base × (1+loft))').toBe(Math.round(base * (1 + T.trafikkLoft)))
    const turistIMote = sS.dayMeetings.filter(m => TURIST_SCENARIO_IDS.includes(m.scenarioId))
    expect(turistIMote.length, 'kaféens møte-pool inneholder INGEN turist-scenarier (flyttet ut)').toBe(0)
    ctx.ok(`sesong (kafé): trafikk ${base} → ${bgS.total} (+${Math.round(T.trafikkLoft * 100)} %), vare-vekt drikke ${bgS.vareVekt.drikke}, turist-scenarier i kafépool: 0`)
    await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør 2')
    await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'ny dag 2')

    // AKSEPTER byhotell-avtalen → hotellavtale akseptert + melding fjernet.
    await dispatch(page, { type: 'RESOLVE_GAME_EVENT', eventId: 'hotellavtale', choiceId: 'aksepter', messageId: hotellMsg!.id })
    await ventState(page, s => s.hotellavtale === 'akseptert', 'avtale akseptert')
    expect((await lesState(page)).messages.some(m => m.type === 'hotellavtale'), 'avtalemeldingen fjernet ved svar').toBe(false)

    // SESONGDAG MED avtale: trafikk løftes ekstra med hotellbonus == fasit.
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen' && !!s.dayBackground, 'sesongdag m/avtale åpen')
    const medAvtale = (await lesState(page)).dayBackground!.total
    expect(medAvtale, 'aksept-effekt == round(base × (1+loft+hotellbonus))').toBe(Math.round(base * (1 + T.trafikkLoft + T.hotellTrafikkBonus)))
    ctx.ok(`hotellavtale akseptert → trafikk ${bgS.total} → ${medAvtale} (+${Math.round(T.hotellTrafikkBonus * 100)} % hotellbonus)`)
  })

  // ── STEG 16 — TEMA 15 DEL 7 Pakkebyggeren (reiselivsprodukt) ────────────────
  await steg(page, rapport, 16, 'Pakkebyggeren (treff == beregnPakke-fasit + kafé-trafikk) + reiselivs-inngangene (turistkontor/byhotell velger scenario + åpner dialogkort)', async ctx => {
    // TURISTSESONG PARKERT: pakkebyggeren/sesong-inngangene krever en aktiv sesong.
    // Rydder localStorage (som det fulle steget gjorde) så neste steg booter rent.
    if (!TURISTSESONG_AKTIV) { await ryddLocalStorage(page); ctx.ok('Turistsesong PARKERT — pakkebygger/sesong-inngang hoppes over til Tema 15 gjenåpnes'); return }
    const T = BALANCE.turistsesong
    // Hermetisk boot + sentrum-l2 (basetrafikk 150) + priset lager + kaffe i trau
    // (holdbar → eksponering identisk baseline↔sesong, som i steg 15). VIKTIG:
    // reiseliv-tilstand (hotellavtale/turistsesong/reiselivPakke) persisteres i
    // BUDSJETT_KEY og OVERLEVER ?skip — steg 15 aksepterte hotellavtalen, så vi
    // MÅ rydde localStorage før boot, ellers arver steg 16 hotellbonusen.
    await ryddLocalStorage(page)
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup' && s.hotellavtale === 'ingen' && s.turistsesong === null, 'frisk, ryddet boot for steg 16')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 200 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.length >= 1, 'åpningslager')
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-1', productId: 'coffee' }] })
    await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const st = window.__GAME_STATE__ as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: st.products.map((p: any) => ({ ...p, retailPrice: p.markedsPris })) })
    })
    await ventState(page, s => s.products.every(p => p.retailPrice > 0), 'priset til markedspris')

    // BASELINE (uten sesong) — les basetrafikken (deterministisk, dag-uavhengig).
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen' && !!s.dayBackground, 'baseline-dag åpen')
    const base = (await lesState(page)).dayBackground!.total
    await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør')
    await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'ny dag')

    // START sesong → les startAbsDag og utled dagens besøksprofil (samme
    // deterministiske rotasjon som panelet + reduceren bruker).
    await dispatch(page, { type: 'START_TURISTSESONG' })
    await ventState(page, s => s.turistsesong !== null, 'sesong startet')
    const startAbsDag = (await lesState(page)).turistsesong!.startAbsDag
    const profil = velgProfil(startAbsDag)

    // DELT FASIT: sesongturister/dag == round(basetrafikk × turistandel × (1+løft)),
    // nøyaktig som reduceren regner den (fra BALANCE.basetrafikk, ikke dagsbakgrunn).
    const sesongTuristerPerDag = Math.round(BALANCE.basetrafikk['sentrum-l2']! * T.turistandel * (1 + T.trafikkLoft))
    // Pakke MED elevens egen kafé (→ ekstra sesongtrafikk) + to andre kort.
    const kortIds = [EGEN_KAFE_ID, 'bymuseum', 'fjellsti']
    const fasit = beregnPakke(kortIds, profil, sesongTuristerPerDag)

    await dispatch(page, { type: 'SET_REISELIV_PAKKE', profilId: profil.id, kortIds, pris: 349 })
    await ventState(page, s => s.reiselivPakke !== null, 'pakke lagret')
    const pk = (await lesState(page)).reiselivPakke!
    expect(pk.profilId, 'lagret profil == dagens rotasjon').toBe(profil.id)
    expect(pk.treff, 'treff == delt fasit (beregnPakke)').toBeCloseTo(fasit.treff, 5)
    expect(pk.turister, '«X turister kjøpte» == delt fasit').toBe(fasit.turister)
    expect(pk.egenKafe, 'egen-kafé-kort registrert').toBe(true)
    ctx.ok(`profil «${profil.navn}» → treff ${(pk.treff * 100).toFixed(0)} %, ${pk.turister} turister kjøpte pakken (fasit ${fasit.turister})`)

    // KAFÉ-TRAFIKK: sesongdag med egen-kafé i pakken → trafikk løftes ekstra med
    // kafeTrafikkBonus (ingen hotellavtale her). == round(base × (1+løft+kafébonus)).
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen' && !!s.dayBackground, 'sesongdag m/kafépakke åpen')
    const medKafe = (await lesState(page)).dayBackground!.total
    expect(medKafe, 'kafé-kort i pakke → +kafeTrafikkBonus == round(base × (1+løft+kafébonus))')
      .toBe(Math.round(base * (1 + T.trafikkLoft + T.pakke.kafeTrafikkBonus)))
    ctx.ok(`egen kafé i pakken → sesongtrafikk ${Math.round(base * (1 + T.trafikkLoft))} → ${medKafe} (+${Math.round(T.pakke.kafeTrafikkBonus * 100)} % kafébonus)`)
    await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør steg16')
    await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'ny dag steg16')

    // REISELIVS-INNGANGENE (bølge 3 v3): turistkontoret + byhotellet velger sine
    // scenarier (seedet) fra RIKTIG pool, og «møt en …»-eventet åpner dialogkort-
    // overlayet (samme UI som kaféens kundemøter). Verifiser begge deler.
    for (let seed = 0; seed < 8; seed++) {
      expect(TURISTKONTOR_SCENARIO_IDS, `turistkontor seed ${seed} ∈ turistkontor-pool`).toContain(velgTuristkontorScenario(seed, false))
      expect(TURISTKONTOR_SCENARIO_IDS, `turistkontor (opplev byen) seed ${seed} ∈ pool`).toContain(velgTuristkontorScenario(seed, true))
      expect(BYHOTELL_SCENARIO_IDS, `byhotell seed ${seed} ∈ byhotell-pool`).toContain(velgByhotellScenario(seed))
    }
    // «Opplev byen»-vekting: opplevelses-anbefalingen skal dominere over 8 seeds.
    const medOpplev = Array.from({ length: 8 }, (_, s) => velgTuristkontorScenario(s, true)).filter(id => id === 'anbefal-opplevelse').length
    const utenOpplev = Array.from({ length: 8 }, (_, s) => velgTuristkontorScenario(s, false)).filter(id => id === 'anbefal-opplevelse').length
    expect(medOpplev, 'påmelding vekter mot opplevelses-anbefaling').toBeGreaterThan(utenOpplev)

    // Inngang → dialogkort-overlay: send det EKTE game-eventet og bekreft at
    // salgsoverlayet åpner med et turist-scenario (samme pipeline som knappene).
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('game:openScenario', { detail: { scenarioId: 'sprakbarrieren' } })))
    await page.getByTestId('salgsoverlay').waitFor({ state: 'visible', timeout: 4000 })
    ctx.ok(`reiselivs-innganger: turistkontor/byhotell velger fra riktig pool; «møt en …»-event åpner dialogkort-overlayet (turister UT av kaféen)`)
  })

  // ── STEG 17 — DEV-DYPLENKE: /game/d/stasjonsomradet?dev=1 må vise stasjons-
  //    bydelen med hotspot-labels + tracer, ALDRI bransjevelgeren ─────────────
  await steg(page, rapport, 17, 'Stasjons-hotspots (?dev=1): labels + tracer, ingen TIL LEIE/bransjevelger, tracer AV → turistkontor til rom-scenen, byhotell til hotell-lobbyen', async ctx => {
    // Fersk navigasjon UTEN ?skip — spilltilstand overlever ikke reload, så uten
    // dyplenke-seedingen står phase='startup' → bransjevelger.
    await page.goto('/game/d/stasjonsomradet?dev=1')
    await ventState(page, s => s.phase !== 'startup', 'dev-dyplenke seedet engangsspill (ikke startup)')
    await page.waitForTimeout(400)
    const body = await page.textContent('body') ?? ''
    expect(body.includes('Velg din bransje'), 'ALDRI bransjevelgeren på dev-dyplenke').toBe(false)
    expect(body.includes('Turistkontoret'), '«🧳 Turistkontoret»-label rendres på recten').toBe(true)
    expect(body.includes('Byhotellet'), '«🏨 Byhotellet»-label rendres på recten').toBe(true)
    expect(body.includes('Sone-tracer'), 'sone-traceren (ZoneTracer) er montert').toBe(true)
    expect((body.match(/TIL LEIE/g) ?? []).length, 'ingen TIL LEIE-skilt på stasjonen (visLedigeLokaler:false)').toBe(0)
    expect(body.includes('Tracer AV'), 'tracer default AV (klikk virker)').toBe(true)
    // Byhotell-hotspoten navigerer INN i Spor C-lobbyen (samme mønster som turistkontor).
    await page.locator('[title="Byhotellet"]').click({ force: true })
    await page.waitForURL(/\/hotell-lobby$/, { timeout: 4000 })
    expect(page.url().endsWith('/hotell-lobby'), 'byhotell-klikk navigerer inn i hotell-lobbyen').toBe(true)
    // Turistkontor-hotspoten navigerer INN i rom-scenen.
    await page.goto('/game/d/stasjonsomradet?dev=1')
    await ventState(page, s => s.phase !== 'startup', 'stasjonen igjen')
    await page.waitForTimeout(400)
    await page.locator('[title="Turistkontoret"]').click({ force: true })
    await page.waitForURL(/\/turistkontor$/, { timeout: 4000 })
    expect(page.url().endsWith('/turistkontor'), 'turistkontor-klikk navigerer inn i rom-scenen').toBe(true)
    ctx.ok('?dev=1 → stasjonsbydelen (labels + tracer, INGEN TIL LEIE, tracer AV); byhotell → /hotell-lobby, turistkontor → /turistkontor, ingen bransjevelger')
  })
  // ── STEG 18 — Hotell-lobby: booking → provisjon (match == fasit, feilmatch == 0)
  await steg(page, rapport, 18, 'Hotell-lobby: booking med match → provisjon == fasit; feilmatch → ingen', async ctx => {
    // Lobbyen (?dev=1 for scenario-picker som omgår sesong-gating på main).
    await page.goto('/game/d/stasjonsomradet/hotell-lobby?skip=1&dev=1')
    await ventState(page, s => s.phase !== 'startup', 'lobby lastet')
    const før = (await lesState(page)).hotellProvisjon
    const fasit = provisjonKr(byTilbudById('gardsbesok')!)   // 150 × 8 % = 12

    // Hjelper: spill Innsjekket, anbefal `tilbud`, book, fullfør.
    async function spillInnsjekket(tilbud: string) {
      await page.getByTestId('gjest-innsjekket').click()
      await page.locator('button', { hasText: 'Fortell' }).click()          // god probing
      await page.getByRole('button', { name: /Videre/ }).click()
      await page.locator('button', { hasText: tilbud }).first().click()      // anbefal
      await page.getByRole('button', { name: /Ja — book/ }).click()          // book
      await page.getByRole('button', { name: /resultatet|Videre/ }).first().click()
      await page.getByRole('button', { name: /Fullfør/ }).click()
    }

    // (1) MATCH: Gårdsbesøket (full behovstreff) → gjesten booker → provisjon == fasit.
    await spillInnsjekket('Gårdsbesøket')
    await ventState(page, s => s.hotellProvisjon === før + fasit, 'provisjon registrert (match)')
    const etterMatch = (await lesState(page)).hotellProvisjon
    expect(etterMatch, `match → provisjon == provisjonKr-fasit (${fasit} kr)`).toBe(før + fasit)
    ctx.ok(`match (Gårdsbesøket): hotellProvisjon ${før} → ${etterMatch} kr (+${fasit}, == fasit)`)

    // (2) FEILMATCH: Bryggeriomvisningen (bom for familien) → gjesten takker NEI → ingen provisjon.
    await spillInnsjekket('Bryggeriomvisningen')
    await expect(page.getByText('Oppsummering')).toBeHidden()   // overlayet lukket etter Fullfør
    const etterFeil = (await lesState(page)).hotellProvisjon
    expect(etterFeil, 'feilmatch → INGEN ny provisjon (gjesten takket nei)').toBe(etterMatch)
    ctx.ok(`feilmatch (Bryggeriomvisningen): provisjon uendret (${etterFeil} kr) — ingen booking`)
  })

  // ── STEG 19 — TURISTKONTOR-ROM-SCENEN: kalibrerings-gjest ved disken + velger ──
  await steg(page, rapport, 19, 'Turistkontor-scene (?dev=1): kalibrerings-gjest DEKODER + rendrer ved disken, gjest-velger blar gjennom sprites', async ctx => {
    // Dyplenke rett til scenen (?dev=1 seeder engangsspill). I dev vises ALLTID
    // en kalibrerings-gjest (uansett sesong) med gjest-velger.
    await page.goto('/game/d/stasjonsomradet/turistkontor?dev=1')
    await ventState(page, s => s.phase !== 'startup', 'turistkontor-scenen lastet (ikke startup)')
    await page.waitForTimeout(600)
    const body = await page.textContent('body') ?? ''
    expect(body.includes('Velg din bransje'), 'ALDRI bransjevelgeren').toBe(false)
    expect(body.includes('Gjest-kalibrering'), 'gjest-kalibreringspanelet (m/ gjest-velger) er oppe').toBe(true)
    // Gjesten skal ikke bare finnes i DOM, men faktisk DEKODE (naturalWidth>0) —
    // en 404/brukket sprite har src men naturalWidth==0 (det lurte oss før).
    const g1 = await page.evaluate(() => {
      const img = [...document.querySelectorAll('img')].find(i => /customers\/turist-/.test(i.src))
      return img ? { src: img.src.split('/').pop(), decoded: img.naturalWidth > 0 && img.complete } : null
    })
    expect(g1, 'en turist-sprite står ved disken').not.toBeNull()
    expect(g1!.decoded, `gjest-sprite (${g1!.src}) DEKODER (naturalWidth>0)`).toBe(true)
    // Gjest-velgeren blar til neste sprite (annen src, fortsatt dekodet).
    await page.getByRole('button', { name: '›' }).click()
    await page.waitForTimeout(400)
    const g2 = await page.evaluate(() => {
      const img = [...document.querySelectorAll('img')].find(i => /customers\/turist-/.test(i.src))
      return img ? { src: img.src.split('/').pop(), decoded: img.naturalWidth > 0 && img.complete } : null
    })
    expect(g2!.src, 'velgeren byttet sprite').not.toBe(g1!.src)
    expect(g2!.decoded, `neste gjest-sprite (${g2!.src}) DEKODER også`).toBe(true)
    ctx.ok(`turistkontor-scene: gjest «${g1!.src}» dekoder ved disken; velger → «${g2!.src}» (også dekodet)`)
  })

  // ── STEG 20 — PRISSETTING VIA UI: elevsatt pris persisteres + varen selges ──
  // Steg 14 tester prismodellen via test-broen (SET_PRODUCTS). Dette steget
  // driver den EKTE Priser-fanen (input → blur/Lagre) så en UI-regresjon (prisen
  // når ikke state, varen viser «mangler pris» og selger 0) fanges.
  await steg(page, rapport, 20, 'Priser-fanen (UI): elevsatt pris persisteres (input→blur + Lagre) og den prisede varen selges', async ctx => {
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot for steg 20')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 200 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.some(p => p.id === 'coffee'), 'åpningslager (coffee, upriset)')
    expect((await lesState(page)).products.find(p => p.id === 'coffee')!.retailPrice, 'coffee starter upriset').toBe(0)

    // Sett pris i den EKTE Priser-fanen: skriv i input-feltet + forlat feltet (blur).
    await page.getByRole('button', { name: /Dashbord/ }).first().click()
    await page.getByTestId('fane-priser').click()
    const inp = page.locator('input[placeholder="sett pris"]').first()
    await inp.fill('50')
    await inp.blur()   // auto-lagre ved blur
    await ventState(page, s => s.products.find(p => p.id === 'coffee')!.retailPrice === 50, 'pris persistert ved blur')
    // «Lagre priser ✓» skal også fungere (idempotent).
    await page.getByRole('button', { name: /Lagre priser/ }).click()
    await page.waitForTimeout(200)
    expect((await lesState(page)).products.find(p => p.id === 'coffee')!.retailPrice, 'elevsatt pris (50) persistert i state').toBe(50)

    // Still ut coffee, åpne dag, tikk til bakgrunnssalget faktisk drypper inn
    // (arrivals er probabilistiske per minutt; minutterPerTick=1 → tikk i loop
    // som steg 5, stopp når omsetning > 0 eller et møte spawner). Dashbordet
    // holdes åpent så auto-klokka står stille og vi driver TICK manuelt.
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-1', productId: 'coffee' }] })
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen', 'dag åpen')
    let s = await lesState(page)
    let tikk = 0
    while (s.dayStats.bakgrunnKr === 0 && !s.activeMeetingScenarioId && s.dayMinute < 420 && tikk < 600) {
      await dispatchN(page, { type: 'TICK' }, 15)
      s = await lesState(page)
      tikk += 15
    }
    expect(s.dayStats.bakgrunnKr, 'den prisede varen selger (bakgrunn-kr > 0)').toBeGreaterThan(0)
    expect(s.dayStats.manglerPrisStk, 'INGEN «mangler pris»-tap for den prisede varen').toBe(0)
    ctx.ok(`Priser-fanen UI: coffee 0 → 50 kr (input→blur + Lagre), solgte ${s.dayStats.bakgrunnStk} stk (${Math.round(s.dayStats.bakgrunnKr)} kr) etter ${tikk} tikk, mangler-pris-tap: 0`)
  })

  // ── STEG 21 — KROK 7: DEN LEVENDE INNBOKSEN (quest-e-poster) ────────────────
  // Verifiserer de tre kjernemekanikkene mot delt fasit (innboksEpost.ts):
  //   A) seedet bestilling → aksept → levert → betaling == fasit
  //   B) akseptert bestilling uten nok lager → skuffet kunde (sviktet + rykte ned)
  //   C) dårlig (villedende) leverandørtilbud → aksept gir NEGATIVT nettoregnskap
  // Tid fremskyndes via DEV_SPOL_TIL_FRIST (tvinger frist/levering til forfall NÅ
  // og resolverer — samme sveip som dagstart), så steget er raskt + deterministisk.
  const lesMsgs = async (): Promise<InboxMessage[]> =>
    page.evaluate(() => (window.__GAME_STATE__ as unknown as { messages: InboxMessage[] }).messages)
  // Status på en quest-e-post (SpillState-typen speiler ikke epost-feltene).
  const epostStatus = (s: SpillState, id: string): string | undefined =>
    (s.messages.find(m => m.id === id) as unknown as { epostStatus?: string } | undefined)?.epostStatus

  await steg(page, rapport, 21, 'Innboksen: bestilling levert (betaling==fasit), sviktet levering (skuffet kunde), dårlig leverandørtilbud (negativt netto)', async ctx => {
    // ── A) Bestilling levert → betaling == fasit ──
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot for steg 21A')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 300 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.some(p => p.id === 'coffee'), 'åpningslager coffee (A)')
    // Pris coffee (kundebestilling velger prisede varer + betaling regnes av pris).
    let prods = (await lesState(page)).products.map(p => p.id === 'coffee' ? { ...p, retailPrice: 50 } : p)
    await dispatch(page, { type: 'SET_PRODUCTS', products: prods })
    await ventState(page, s => s.products.find(p => p.id === 'coffee')!.retailPrice === 50, 'coffee priset 50 (A)')

    await dispatch(page, { type: 'DEV_SEND_TEST_EPOSTER' })
    await ventState(page, s => s.messages.some(m => m.type === 'kundebestilling'), 'test-e-poster injisert (A)')
    const kb = (await lesMsgs()).find(m => m.type === 'kundebestilling')!
    const kbPayload = kb.epost as KundebestillingPayload
    const sBefore = await lesState(page)
    const coffeeStockFor = sBefore.products.find(p => p.id === 'coffee')!.stock
    const bestiltStk = kbPayload.varer.reduce((n, v) => n + v.qty, 0)
    const fasitBetaling = bestillingBetaling(kbPayload, sBefore.products as never)
    const moneyFor = sBefore.money

    await dispatch(page, { type: 'ACCEPT_KUNDEBESTILLING', messageId: kb.id, mengderabatt: 0 })
    await ventState(page, s => epostStatus(s, kb.id) === 'akseptert', 'bestilling akseptert (A)')
    await dispatch(page, { type: 'DEV_SPOL_TIL_FRIST' })
    // Poll til leveringen er resolvert i speilet (unngå å lese før React committer).
    await ventState(page, s => epostStatus(s, kb.id) === 'levert', 'bestilling levert (A)')
    const sA = await lesState(page)
    expect(sA.money - moneyFor, `betaling == fasit (${fasitBetaling} kr)`).toBe(fasitBetaling)
    expect(coffeeStockFor - sA.products.find(p => p.id === 'coffee')!.stock, `lager trukket ${bestiltStk} stk`).toBe(bestiltStk)
    ctx.ok(`A: bestilling levert — betalt ${fasitBetaling} kr (== fasit), lager −${bestiltStk} stk`)

    // ── B) Sviktet levering → skuffet kunde (rykte ned) ──
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot for steg 21B')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 4 }] })  // for lite til bestillingen (8–16)
    await ventState(page, s => s.openingOrderPlaced && s.products.some(p => p.id === 'coffee'), 'åpningslager coffee (B, lavt)')
    prods = (await lesState(page)).products.map(p => p.id === 'coffee' ? { ...p, retailPrice: 50 } : p)
    await dispatch(page, { type: 'SET_PRODUCTS', products: prods })
    await ventState(page, s => s.products.find(p => p.id === 'coffee')!.retailPrice === 50, 'coffee priset 50 (B)')

    await dispatch(page, { type: 'DEV_SEND_TEST_EPOSTER' })
    await ventState(page, s => s.messages.some(m => m.type === 'kundebestilling'), 'test-e-poster injisert (B)')
    const kbB = (await lesMsgs()).find(m => m.type === 'kundebestilling')!
    const sB0 = await lesState(page)
    const repFor = sB0.reputation
    const moneyForB = sB0.money
    await dispatch(page, { type: 'ACCEPT_KUNDEBESTILLING', messageId: kbB.id, mengderabatt: 0 })
    await ventState(page, s => epostStatus(s, kbB.id) === 'akseptert', 'bestilling akseptert (B)')
    await dispatch(page, { type: 'DEV_SPOL_TIL_FRIST' })
    await ventState(page, s => epostStatus(s, kbB.id) === 'sviktet', 'bestilling sviktet (B)')
    const sB = await lesState(page)
    expect(sB.reputation, `skuffet kunde → rykte ned (${BALANCE.innboks.ryktSviktetLevering})`).toBe(Math.max(0, repFor + BALANCE.innboks.ryktSviktetLevering))
    expect(sB.money, 'ingen betaling ved sviktet levering').toBe(moneyForB)
    ctx.ok(`B: sviktet levering — rykte ${repFor} → ${sB.reputation}, ingen betaling`)

    // ── C) Dårlig (villedende) leverandørtilbud → negativt nettoregnskap ──
    const coffeeC = sB.products.find(p => p.id === 'coffee')!
    const normal = coffeeC.costPrice
    const rabatt = 15
    const listepris = Math.ceil((normal / (1 - rabatt / 100)) * 1.3)   // oppblåst → tilbudspris > normal
    const naaAbs = epostAbsDag(sB.currentYear, sB.currentMonth, sB.dayNumber)
    const lureMsg: InboxMessage = {
      id: 'test_lure_leverandor', type: 'leverandortilbud',
      title: '🏷️ Testtilbud (villedende)', body: 'test', date: 'test', read: false,
      avsender: 'Best Deal Grossist', fristAbsDag: naaAbs + 2, epostStatus: 'ubesvart',
      epost: { kind: 'leverandortilbud', productId: 'coffee', navn: coffeeC.name, antall: 40, listeprisPerEnhet: listepris, rabattProsent: rabatt, erLureri: true, normalKostPerEnhet: normal },
    }
    const lurePayload = lureMsg.epost as LeverandortilbudPayload
    const netto = leverandorNettoBesparelse(lurePayload)
    const total = tilbudsprisPerEnhet(lurePayload) * 40
    expect(netto, 'villedende tilbud har NEGATIVT nettoregnskap (fasit)').toBeLessThan(0)
    await dispatch(page, { type: 'ADD_MESSAGE', message: lureMsg })
    await ventState(page, s => s.messages.some(m => m.id === lureMsg.id), 'villedende tilbud lagt i innboks (C)')
    const moneyForC = (await lesState(page)).money
    await dispatch(page, { type: 'ACCEPT_LEVERANDORTILBUD', messageId: lureMsg.id })
    await ventState(page, s => epostStatus(s, lureMsg.id) === 'akseptert', 'leverandørtilbud akseptert (C)')
    const sC = await lesState(page)
    expect(moneyForC - sC.money, `betalte det rabatterte innkjøpet (${total} kr)`).toBe(total)
    expect(sC.incomingOrders.some(o => o.productId === 'coffee' && o.qty === 40), 'rabattert innkjøp på vei til lager').toBe(true)
    ctx.ok(`C: villedende tilbud akseptert — netto ${netto} kr (negativt), betalte ${total} kr`)
  })

  // ── STEG 22–25 — KROKER (Espen spør + Stamkunder + Nivåbryter) ──────────────
  // Fullstendig state (inkl. felt harness-typen ikke speiler) leses via evaluate.
  const lesFull = async (): Promise<GameState> => page.evaluate(() => window.__GAME_STATE__ as unknown as GameState)
  const B = BALANCE
  // Fersk kafé med én priset vare + åpen dag — felles oppsett for A/B/C.
  const oppsettÅpenDag = async () => {
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'frisk boot')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 200 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.some(p => p.id === 'coffee'), 'åpningslager')
    const prods = (await lesState(page)).products.map(p => p.id === 'coffee' ? { ...p, retailPrice: 50 } : p)
    await dispatch(page, { type: 'SET_PRODUCTS', products: prods })
    await ventState(page, s => s.products.find(p => p.id === 'coffee')!.retailPrice === 50, 'coffee priset')
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen', 'dag åpen')
  }

  await steg(page, rapport, 22, 'Espen spør: riktig svar → kunnskapsbonus == fasit, egen P&L-linje, dagstak håndhevet', async ctx => {
    await oppsettÅpenDag()
    const svarRiktig = async () => {
      await dispatch(page, { type: 'STILL_ESPEN_SPOR', nivaa: 'vg1', aktiveTemaIds: [], dev: true })
      await ventState(page, s => !!(s as unknown as GameState).espenSpor.aktivt, 'spørsmål stilt')
      const idx = (await lesFull()).espenSpor.aktivt!.riktigIndex
      await dispatch(page, { type: 'SVAR_ESPEN_SPOR', index: idx })
      await ventState(page, s => !!(s as unknown as GameState).espenSpor.sisteSvar, 'svart')
      await dispatch(page, { type: 'LUKK_ESPEN_SPOR' })
      await ventState(page, s => !(s as unknown as GameState).espenSpor.aktivt, 'lukket')
    }
    // Q1 + Q2 gir full belønning; sammen når de dagstaket.
    const m0 = (await lesState(page)).money
    await svarRiktig()
    await ventState(page, s => s.money === m0 + B.espenSpor.belonningKr, `Q1 belønning +${B.espenSpor.belonningKr}`)
    const s1 = await lesFull()
    expect(s1.dayStats.kunnskapsbonusKr, 'Q1 i dagsstats (P&L)').toBe(B.espenSpor.belonningKr)
    await svarRiktig()
    await ventState(page, s => s.money === m0 + B.espenSpor.maksBelonningPerDag, 'Q2 → dagstak nådd')
    // Q3 samme dag: riktig, men 0 ekstra (dagstak).
    const m2 = (await lesState(page)).money
    await svarRiktig()
    const s3 = await lesFull()
    expect((await lesState(page)).money, '3. riktige samme dag gir 0 ekstra (tak)').toBe(m2)
    expect(s3.dayStats.kunnskapsbonusKr, 'kunnskapsbonus står på taket').toBe(B.espenSpor.maksBelonningPerDag)
    // Egen linje i dagsoppgjøret (del av P&L).
    await dispatch(page, { type: 'CLOSE_DAY' })
    await ventState(page, s => s.dayPhase === 'oppgjør' && !!s.lastDayResult, 'dagsoppgjør')
    const dr = (await lesFull()).lastDayResult!
    expect(dr.kunnskapsbonusKr, 'kunnskapsbonus egen linje i dagsoppgjøret').toBe(B.espenSpor.maksBelonningPerDag)
    ctx.ok(`Espen spør: 3 riktige → +${B.espenSpor.maksBelonningPerDag} kr (tak), 3. gav 0. Dagsoppgjør-linje = ${dr.kunnskapsbonusKr} kr`)
  })

  await steg(page, rapport, 23, 'Espen spør: feil svar → penger uendret, forklaring, spørsmål i cooldown', async ctx => {
    await oppsettÅpenDag()
    await dispatch(page, { type: 'STILL_ESPEN_SPOR', nivaa: 'vg1', aktiveTemaIds: [], dev: true })
    await ventState(page, s => !!(s as unknown as GameState).espenSpor.aktivt, 'spørsmål stilt')
    const full = await lesFull()
    const a = full.espenSpor.aktivt!
    const feilIndex = (a.riktigIndex + 1) % a.alternativer.length
    const m0 = (await lesState(page)).money
    await dispatch(page, { type: 'SVAR_ESPEN_SPOR', index: feilIndex })
    await ventState(page, s => (s as unknown as GameState).espenSpor.sisteSvar?.riktig === false, 'feil svar registrert')
    const etter = await lesFull()
    expect((await lesState(page)).money, 'feil svar koster ingenting').toBe(m0)
    expect(etter.espenSpor.sisteSvar!.riktig, 'markert feil').toBe(false)
    expect(a.forklaring.length, 'forklaring finnes (vises etter svar)').toBeGreaterThan(0)
    const absNaa = epostAbsDag(etter.currentYear, etter.currentMonth, etter.dayNumber)
    expect(etter.espenSpor.feilCooldown[a.id], `spørsmålet i cooldown (${B.espenSpor.cooldownDagerVedFeil} dager)`).toBe(absNaa + B.espenSpor.cooldownDagerVedFeil)
    expect(etter.espenSpor.besvarteIds.includes(a.id), 'feil-svart havner IKKE i «riktig besvart»').toBe(false)
    ctx.ok(`Feil svar: penger uendret (${m0}), forklaring vist, cooldown til dag ${etter.espenSpor.feilCooldown[a.id]}`)
  })

  await steg(page, rapport, 24, 'Stamkunder PARKERT (STAMKUNDER_AKTIV=false) + trekkeregel: uspilt foretrekkes, nullstill ved tom pool', async ctx => {
    await oppsettÅpenDag()
    const nonTurist = CAFE_SCENARIO_IDS.filter(id => !TURIST_SCENARIO_IDS.includes(id))
    // Spill et scenario til ende (dev): markerer det som spilt (antallMoter ≥ 1).
    const spill = async (id: string) => {
      await dispatch(page, { type: 'DEV_SPAWN_MOTE', scenarioId: id })
      await ventState(page, s => s.activeMeetingScenarioId === id, `spawn ${id}`)
      await dispatch(page, { type: 'RESOLVE_SALES_SCENARIO', scenarioId: id, sales: [{ productId: 'coffee', qty: 1 }], reputationDelta: 5, xpEarned: 0 })
      await ventState(page, s => s.activeMeetingScenarioId === null, `løst ${id}`)
    }
    const nyDag = async () => {
      await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør')
      await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'stengt')
      await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen')
    }

    // (A) FLAGGET AV + «uspilt foretrekkes»: spill én kunde, ny dag → ingen
    //     stamkundemøte spawnes, og den spilte kunden trekkes IKKE som scenario
    //     så lenge det finnes uspilte.
    expect(STAMKUNDER_AKTIV, 'stamkunder er parkert bak av-flagg').toBe(false)
    const forst = nonTurist[0]!
    await spill(forst)
    await nyDag()
    let dm = (await lesFull()).dayMeetings
    expect(dm.length, 'dagen har møter').toBeGreaterThan(0)
    expect(dm.every(m => (m.kind ?? 'scenario') === 'scenario'), 'ingen stamkundemøter (parkert)').toBe(true)
    expect(dm.some(m => m.scenarioId === forst), 'uspilt foretrekkes — spilt kunde trekkes ikke ennå').toBe(false)

    // (B) NULLSTILL VED TOM POOL: spill ALLE gjenværende → uspilt tom → neste dag
    //     kan trekke spilte scenarioer igjen (trekkgrunnlaget nullstilt).
    for (const id of nonTurist.slice(1)) await spill(id)
    await nyDag()
    const full = await lesFull()
    dm = full.dayMeetings
    expect(dm.length, 'dagen har møter etter uttømt pool').toBeGreaterThan(0)
    expect(dm.every(m => (m.kind ?? 'scenario') === 'scenario'), 'fortsatt ingen stamkundemøter').toBe(true)
    expect(dm.every(m => (full.stamkunder[m.scenarioId]?.antallMoter ?? 0) >= 1), 'alt spilt → poolen nullstilt, spilte trekkes igjen').toBe(true)
    ctx.ok(`Parkert: 0 stamkundemøter; uspilt foretrekkes (${forst} holdt tilbake), pool nullstilt da alle ${nonTurist.length} var spilt`)
  })

  await steg(page, rapport, 25, 'Nivåbryter: VG1 skjuler VG2-spørsmål + pristilbud-felt; VG2 viser dem', async ctx => {
    // (D1) VG2-spørsmål gates i spørsmålspoolen (ren finnKandidater-fasit).
    await oppsettÅpenDag()
    const st = await lesFull()
    const ctxBase = { aktiveTemaIds: [] as string[], besvarteIds: [] as string[], feilCooldown: {}, absDag: 1 }
    const kandVg1 = finnKandidater(st, { nivaa: 'vg1', ...ctxBase })
    const kandVg2 = finnKandidater(st, { nivaa: 'vg2', ...ctxBase })
    expect(kandVg1.length, 'VG1 har spørsmål').toBeGreaterThan(0)
    expect(kandVg1.every(q => q.nivaa === 'vg1'), 'VG1: ingen VG2-spørsmål i poolen').toBe(true)
    expect(kandVg2.some(q => q.nivaa === 'vg2'), 'VG2: VG2-spørsmål er med i poolen').toBe(true)

    // (D2) pristilbud-feltet (kundebestilling) gates i UI-et på globalt nivå.
    const åpneBestilling = async (nivaa: 'vg1' | 'vg2') => {
      await page.evaluate(n => localStorage.setItem('klasse-nivaa-dev-override', n), nivaa)
      await page.reload()
      await ventState(page, s => s.phase !== 'startup', `boot (${nivaa})`)
      await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
      await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 100 }] })
      await ventState(page, s => s.products.some(p => p.id === 'coffee'), `lager (${nivaa})`)
      const prods = (await lesState(page)).products.map(p => p.id === 'coffee' ? { ...p, retailPrice: 50 } : p)
      await dispatch(page, { type: 'SET_PRODUCTS', products: prods })
      await dispatch(page, { type: 'DEV_SEND_TEST_EPOSTER' })
      await ventState(page, s => s.messages.some(m => m.type === 'kundebestilling'), `bestilling i innboks (${nivaa})`)
      await page.getByRole('button', { name: /Dashbord/ }).first().click()
      await page.getByTestId('fane-innboks').click()
      await page.getByRole('button', { name: /📋 Bestilling/ }).first().click()   // ekspandér
    }
    await åpneBestilling('vg1')
    await expect(page.getByPlaceholder(/pristilbud|samlet 540/i), 'VG1: pristilbud-feltet skjult').toHaveCount(0)
    await åpneBestilling('vg2')
    await expect(page.getByPlaceholder(/samlet 540/i), 'VG2: pristilbud-feltet synlig').toHaveCount(1)
    await page.evaluate(() => localStorage.removeItem('klasse-nivaa-dev-override'))
    ctx.ok(`Nivå: VG1-pool ${kandVg1.length} spm (0 VG2), VG2-pool har VG2-spm; pristilbud-felt skjult i VG1, synlig i VG2`)
  })

  // ── FAGFILTER (fikserunde 3) — steg 26–28 ──────────────────────────────────
  // DEV-hookene __SET_FAG_DEV__/__NULLSTILL_DEV__ overstyrer fag lokalt PÅ SAMME
  // VEI som ⚙-panelet/læreren (context → fane-filter + state-speil). Tilgjengelig
  // under import.meta.env.DEV (uten ?dev=1).
  await steg(page, rapport, 26, 'Fagfilter: M av → M-faner + mkf-tilbud (7d) borte, FD-faner igjen; ↺ Nullstill → tilbake', async ctx => {
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 26')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 200 }] })
    await ventState(page, s => s.products.some(p => p.id === 'coffee'), 'lager')

    // Slå Markedsføring av lokalt (samme vei som ⚙/læreren).
    await page.evaluate(() => (window as unknown as { __SET_FAG_DEV__: (f: string, v: boolean) => void }).__SET_FAG_DEV__('m', false))
    await ventState(page, s => s.fagAktiv?.m === false, 'M av speilet til state')

    // (A) Faner: rene M-faner HELT borte; FD-faner + FD-delte + kjerne igjen.
    // Personale (ren FD), Forretningsplan + Lokasjon (FD+M) STÅR fordi FD er på.
    await page.getByRole('button', { name: /💻 Dashbord/ }).first().click()
    for (const id of ['malgruppe', 'markedsforing', 'utstilling', 'distribusjon']) {
      await expect(page.getByTestId(`fane-${id}`), `M-fane ${id} skjult`).toHaveCount(0)
    }
    for (const id of ['oversikt', 'produkter', 'priser', 'okonomi', 'personale', 'forretningsplan', 'lokasjon', 'rapporter', 'innboks']) {
      await expect(page.getByTestId(`fane-${id}`), `${id} synlig`).toBeVisible()
    }
    await page.getByTestId('dashbord-lukk').click()

    // (A) Innboks: ingen mkf-tilbud (7d) genereres over flere dager når M er av.
    await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen')
    for (let d = 0; d < 6; d++) {
      await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør')
      await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'stengt')
      await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen')
    }
    expect((await lesState(page)).messages.filter(m => m.type === 'mkftilbud').length, 'ingen mkf-tilbud når M er av').toBe(0)

    // (E) ↺ Nullstill → M tilbake, M-faner synlige igjen.
    await page.evaluate(() => (window as unknown as { __NULLSTILL_DEV__: () => void }).__NULLSTILL_DEV__())
    await ventState(page, s => s.fagAktiv?.m === true, 'M tilbake')
    await page.getByRole('button', { name: /💻 Dashbord/ }).first().click()
    await expect(page.getByTestId('fane-malgruppe'), 'Målgruppe synlig igjen').toBeVisible()
    await page.getByTestId('dashbord-lukk').click()
    ctx.ok('M av → 5 M-faner + mkf-tilbud (7d) borte, Produkter/Priser/kjerne igjen; ↺ Nullstill → M-faner tilbake')
  })

  await steg(page, rapport, 27, 'Fagbytte i ÅPEN skjult fane → rolig retur til Oversikt (ingen feil)', async ctx => {
    const feil: string[] = []
    const onErr = (e: Error) => feil.push(String(e))
    page.on('pageerror', onErr)
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 27')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    // Legg åpningsbestilling så OpeningOrderOverlay lukkes (ellers fanger den klikk).
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 100 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.some(p => p.id === 'coffee'), 'åpningslager')
    await page.getByRole('button', { name: /💻 Dashbord/ }).first().click()
    await page.getByTestId('fane-malgruppe').click()   // stå på en M-fane
    // Læreren (her: DEV) slår M av MENS eleven står på Målgruppe.
    await page.evaluate(() => (window as unknown as { __SET_FAG_DEV__: (f: string, v: boolean) => void }).__SET_FAG_DEV__('m', false))
    await expect(page.getByText(/Læreren har endret fagoppsettet/), 'rolig melding vises').toBeVisible()
    await expect(page.getByTestId('fane-malgruppe'), 'Målgruppe-fanen borte').toHaveCount(0)
    await expect(page.getByTestId('fane-oversikt'), 'Oversikt fortsatt der (ingen krasj)').toBeVisible()
    expect(feil, 'ingen runtime-feil ved fagbytte').toEqual([])
    page.off('pageerror', onErr)
    await page.evaluate(() => (window as unknown as { __NULLSTILL_DEV__: () => void }).__NULLSTILL_DEV__())
    ctx.ok('Fagbytte på åpen Målgruppe-fane → «Læreren har endret fagoppsettet» + tilbake på Oversikt, 0 feil')
  })

  await steg(page, rapport, 28, 'Espen spør lærerstyrt: av default → ingen auto; fagfilter fd/m (finnKandidater-fasit)', async ctx => {
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 28')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 200 }] })
    await ventState(page, s => s.products.some(p => p.id === 'coffee'), 'lager')
    const prods = (await lesState(page)).products.map(p => p.id === 'coffee' ? { ...p, retailPrice: 50 } : p)
    await dispatch(page, { type: 'SET_PRODUCTS', products: prods })

    // (C1) AV som standard → mentor fyrer INGEN auto-spørsmål over flere dager.
    await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen')
    for (let d = 0; d < 4; d++) {
      await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør')
      await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'stengt')
      await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen')
    }
    expect((await lesFull()).espenSpor.aktivt, 'av default → ingen auto-spørsmål').toBeNull()

    // (C2) Fagfilter (ren finnKandidater-fasit = samme UI/reducer bruker).
    const st = await lesFull()
    const base = { aktiveTemaIds: [] as string[], besvarteIds: [] as string[], feilCooldown: {}, absDag: 1 }
    const kandFd = finnKandidater(st, { nivaa: 'vg2', ...base, aktiveFag: ['fd'] })
    const kandM = finnKandidater(st, { nivaa: 'vg2', ...base, aktiveFag: ['m'] })
    expect(kandFd.length, 'FD-pool har spørsmål').toBeGreaterThan(0)
    expect(kandFd.every(q => fagForSporsmal(q) === 'fd'), 'aktiveFag=[fd] ⇒ kun fd-taggede').toBe(true)
    expect(kandM.length, 'M-pool har spørsmål').toBeGreaterThan(0)
    expect(kandM.every(q => fagForSporsmal(q) === 'm'), 'aktiveFag=[m] ⇒ kun m-taggede').toBe(true)
    ctx.ok(`Av default: 0 auto-spørsmål over 4 dager. Fagfilter: ${kandFd.length} fd-spm (alle fd), M-pool alle m-tagget`)
  })

  // ── TURISTSESONG PARKERT + DATAVAKT (TILLEGG) — steg 29–30 ──────────────────
  await steg(page, rapport, 29, 'Turistsesong PARKERT: sesong kan ikke starte, ⚙-knapper grå, sesong-trigger armes ikke', async ctx => {
    await page.goto('/game?skip=1&dev=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 29')
    await page.waitForFunction(() => !!(window as unknown as { __OPPFYLT__?: unknown }).__OPPFYLT__, null, { timeout: 8000 })
    expect(TURISTSESONG_AKTIV, 'sesongen er parkert bak av-flagg').toBe(false)
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    // Legg åpningsbestilling så OpeningOrderOverlay lukkes (ellers fanger den ⚙-klikk).
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 100 }] })
    await ventState(page, s => s.openingOrderPlaced && s.products.some(p => p.id === 'coffee'), 'åpningslager')
    // START_TURISTSESONG er no-op → ingen sesong.
    await dispatch(page, { type: 'START_TURISTSESONG' })
    expect((await lesFull()).turistsesong, 'sesongen kan ikke starte (parkert)').toBeNull()
    // Sesong-trigger armes aldri (via den eksponerte trigger-vakta).
    const sesongFyrer = await page.evaluate(() => (window as unknown as { __OPPFYLT__: (id: string, s: unknown) => boolean }).__OPPFYLT__('turistsesong_slutt', (window as unknown as { __GAME_STATE__: unknown }).__GAME_STATE__))
    expect(sesongFyrer, 'sesong-trigger armes ikke når parkert').toBe(false)
    // ⚙-knappen «Start turistsesong nå» er grå med «Parkert»-forklaring.
    await page.getByRole('button', { name: /⚙ DEV/ }).click()
    await expect(page.getByRole('button', { name: /Start turistsesong nå/ }), 'sesongknapp deaktivert').toBeDisabled()
    await expect(page.getByText(/Parkert — venter på Tema 15-innhold/).first(), '«Parkert»-forklaring vises').toBeVisible()
    ctx.ok('Parkert: START_TURISTSESONG no-op (turistsesong=null), sesong-trigger armes ikke, ⚙-knapp grå «Parkert»')
  })

  await steg(page, rapport, 30, 'Datavakt: dynamisk trigger fyrer IKKE på tomt grunnlag (beredskap_risiko_levert)', async ctx => {
    await page.goto('/game?skip=1&dev=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 30')
    await page.waitForFunction(() => !!(window as unknown as { __OPPFYLT__?: unknown }).__OPPFYLT__, null, { timeout: 8000 })
    // Kjør den rene trigger-vakta i nettleseren mot håndlagde grunnlag.
    const res = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const st: any = (window as any).__GAME_STATE__
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const opp = (window as any).__OPPFYLT__ as (id: string, s: any) => boolean
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const medTiltak = (t: (i: number) => string) => ({ ...st, beredskap: { ...st.beredskap, risikoLagret: true, risikoRader: st.beredskap.risikoRader.map((r: any, i: number) => ({ ...r, tiltak: t(i) })) } })
      return {
        tomt: opp('beredskap_risiko_levert', medTiltak(() => '')),
        ulagret: opp('beredskap_risiko_levert', { ...st, beredskap: { ...st.beredskap, risikoLagret: false } }),
        fylt: opp('beredskap_risiko_levert', medTiltak(i => (i === 0 ? 'Sikre kassen' : ''))),
      }
    })
    expect(res.tomt, 'lagret skjema UTEN tiltak → fyrer ikke (tomt grunnlag)').toBe(false)
    expect(res.ulagret, 'ikke lagret → fyrer ikke').toBe(false)
    expect(res.fylt, 'lagret + minst ett tiltak → fyrer').toBe(true)
    ctx.ok('Datavakt (beredskap_risiko_levert): tomt/ulagret grunnlag → fyrer ikke; ≥1 tiltak → fyrer')
  })

  await steg(page, rapport, 31, 'Fagmapping-korreksjon: Personale=REN FD, Forretningsplan=FD+M, KS styrer ingen fane', async ctx => {
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 31')
    await page.waitForFunction(() => !!(window as unknown as { __SET_FAG_DEV__?: unknown }).__SET_FAG_DEV__, null, { timeout: 8000 })
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 100 }] })
    await ventState(page, s => s.products.some(p => p.id === 'coffee'), 'lager')
    const setFag = (f: string, v: boolean) => page.evaluate(([ff, vv]) => (window as unknown as { __SET_FAG_DEV__: (f: string, v: boolean) => void }).__SET_FAG_DEV__(ff as string, vv as boolean), [f, v] as const)
    const nullstill = () => page.evaluate(() => (window as unknown as { __NULLSTILL_DEV__: () => void }).__NULLSTILL_DEV__())
    const dash = () => page.getByRole('button', { name: /💻 Dashbord/ }).first().click()

    // (A) FD av (M/KS på): Personale (ren FD) + Økonomi (FD) SKJULT; Forretningsplan
    //     (FD+M) og Målgruppe (M) STÅR fordi M er på.
    await setFag('fd', false)
    await ventState(page, s => s.fagAktiv?.fd === false, 'FD av')
    await dash()
    await expect(page.getByTestId('fane-personale'), 'Personale skjult (ren FD)').toHaveCount(0)
    await expect(page.getByTestId('fane-okonomi'), 'Økonomi skjult (FD)').toHaveCount(0)
    await expect(page.getByTestId('fane-forretningsplan'), 'Forretningsplan står (FD+M, M på)').toBeVisible()
    await expect(page.getByTestId('fane-malgruppe'), 'Målgruppe står (M)').toBeVisible()
    await page.getByTestId('dashbord-lukk').click()
    await nullstill(); await ventState(page, s => s.fagAktiv?.fd === true, 'FD tilbake')

    // (B) M av (FD/KS på): Personale (FD) + Forretningsplan/Lokasjon (FD-delen) STÅR.
    await setFag('m', false)
    await ventState(page, s => s.fagAktiv?.m === false, 'M av')
    await dash()
    await expect(page.getByTestId('fane-personale'), 'Personale står (FD på)').toBeVisible()
    await expect(page.getByTestId('fane-forretningsplan'), 'Forretningsplan står (FD på)').toBeVisible()
    await expect(page.getByTestId('fane-lokasjon'), 'Lokasjon står (FD+M, FD på)').toBeVisible()
    // Slå FD av OGSÅ (begge av): de FD+M-delte fanene forsvinner nå (dashbordet
    // åpent, JS-toggle → ingen redirect siden Oversikt (kjerne) er aktiv).
    await setFag('fd', false)
    await ventState(page, s => s.fagAktiv?.fd === false, 'FD av også')
    for (const id of ['lokasjon', 'forretningsplan', 'produkter', 'priser']) {
      await expect(page.getByTestId(`fane-${id}`), `${id} borte når BÅDE FD og M er av`).toHaveCount(0)
    }
    await nullstill(); await ventState(page, s => s.fagAktiv?.fd === true && s.fagAktiv?.m === true, 'fag tilbake')

    // (C) KS av (FD/M på), dashbordet fortsatt åpent: INGEN faner endres (KS styrer
    //     ingen fane). Toggle via JS-hooken så dashbordet ikke må lukkes.
    await nullstill(); await ventState(page, s => s.fagAktiv?.m === true, 'M tilbake')
    const foer = await page.locator('[data-testid^="fane-"]').count()
    await setFag('ks', false)
    await ventState(page, s => s.fagAktiv?.ks === false, 'KS av')
    const etter = await page.locator('[data-testid^="fane-"]').count()
    expect(etter, 'KS av endrer INGEN faner').toBe(foer)
    await page.getByTestId('dashbord-lukk').click()

    // ks-spørsmål stilles ikke når KS er av (ren finnKandidater-fasit).
    const st = await lesFull()
    const base = { aktiveTemaIds: [] as string[], besvarteIds: [] as string[], feilCooldown: {}, absDag: 1 }
    const utenKs = finnKandidater(st, { nivaa: 'vg2', ...base, aktiveFag: ['fd', 'm'] })
    const medKs = finnKandidater(st, { nivaa: 'vg2', ...base, aktiveFag: ['fd', 'm', 'ks'] })
    expect(utenKs.some(q => fagForSporsmal(q) === 'ks'), 'KS av → ingen ks-spørsmål').toBe(false)
    expect(medKs.some(q => fagForSporsmal(q) === 'ks'), 'KS på → ks-spørsmål finnes').toBe(true)
    await nullstill()
    ctx.ok('Personale=FD (skjult ved FD av, står ved M av); Forretningsplan=FD+M (står så lenge FD el. M er på); KS av → 0 faner endres, men ks-spørsmål stilles ikke')
  })

  await steg(page, rapport, 32, 'Vareeksponering: bakgrunnssalg selger KUN utstilte varer; tom disk → 0 salg/tap; tapte-kort = sum av tre', async ctx => {
    await page.goto('/game?skip=1')
    await ventState(page, s => s.phase !== 'startup', 'boot steg 32')
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45_000, capacity: 120 })
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 400 }, { productId: 'croissant', qty: 400 }] })
    await ventState(page, s => s.products.some(p => p.id === 'coffee') && s.products.some(p => p.id === 'croissant'), 'lager')
    await åpneDashbord()   // hold dashbordet åpent så auto-klokka pauser (deterministisk)

    // Driv klokka manuelt, hopp over evt. kundemøte så bakgrunnssalget flyter.
    const tikkTil = async (pred: (s: SpillState) => boolean, maxTikk = 600) => {
      let s = await lesState(page), n = 0
      while (!pred(s) && s.dayMinute < 460 && n < maxTikk) {
        if (s.activeMeetingScenarioId) await dispatch(page, { type: 'SKIP_MEETING' })
        else await dispatchN(page, { type: 'TICK' }, 10)
        s = await lesState(page); n += 10
      }
      return s
    }
    const nyDag = async () => {
      await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, s => s.dayPhase === 'oppgjør', 'oppgjør')
      await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, s => s.dayPhase === 'stengt', 'stengt')
      await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen')
    }
    const settPris = async (mut: (p: { id: string; markedsPris: number; retailPrice: number }) => number) => {
      const prods = (await lesState(page)).products.map(p => ({ ...p, retailPrice: mut(p) }))
      await dispatch(page, { type: 'SET_PRODUCTS', products: prods })
    }
    // Pris begge til markedspris (så de KAN selge når utstilt).
    await settPris(p => (p.id === 'coffee' || p.id === 'croissant') ? p.markedsPris : p.retailPrice)
    await ventState(page, s => s.products.find(p => p.id === 'coffee')!.retailPrice > 0, 'priset')

    // (A) TOM DISK: ingenting utstilt → 0 salg og 0 tap, men kundene teller.
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [] })
    await dispatch(page, { type: 'OPEN_DAY' }); await ventState(page, s => s.dayPhase === 'åpen', 'åpen (tom disk)')
    let s = await tikkTil(x => x.dayStats.bakgrunnKunder >= 8)
    expect(s.dayStats.bakgrunnKunder, 'kundene teller som besøkende').toBeGreaterThan(0)
    expect(s.dayStats.bakgrunnKr, 'tom disk → 0 omsetning').toBe(0)
    expect(s.dayStats.bakgrunnStk, 'tom disk → 0 solgt').toBe(0)
    expect(s.dayStats.tapteSalgStk + s.dayStats.manglerPrisStk + s.dayStats.overprisStk, 'tom disk → 0 tap').toBe(0)

    // (B) UTSTILL KUN COFFEE: coffee (priset+lager) selger; croissant (priset+lager)
    //     men IKKE utstilt → verken salg eller tap.
    await nyDag()
    await settPris(p => (p.id === 'coffee' || p.id === 'croissant') ? p.markedsPris : p.retailPrice)
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-1', productId: 'coffee' }] })
    s = await tikkTil(x => x.dayStats.bakgrunnStk >= 5)
    expect(s.dayStats.bakgrunnStk, 'utstilt coffee selger').toBeGreaterThan(0)
    const full = await lesFull()
    expect(full.dayProductStats['coffee']?.soldStk ?? 0, 'coffee (utstilt) solgt').toBeGreaterThan(0)
    const cro = full.dayProductStats['croissant']
    expect((cro?.soldStk ?? 0) + (cro?.tapteSalgStk ?? 0) + (cro?.manglerPrisStk ?? 0) + (cro?.overprisStk ?? 0),
      'ikke-utstilt croissant (priset+lager): verken salg eller tap').toBe(0)

    // (C) TAPTE-KORTET = tomtLager + manglerPris + overpris. Lag manglerPris (croissant
    //     upriset) + overpris (coffee 2× markedspris, HØY drikke-profil), begge utstilt.
    await nyDag()
    await settPris(p => p.id === 'coffee' ? p.markedsPris * 2 : p.id === 'croissant' ? 0 : p.retailPrice)
    await dispatch(page, { type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-1', productId: 'coffee' }, { trauId: 'trau-2', productId: 'croissant' }] })
    s = await tikkTil(x => x.dayStats.manglerPrisStk >= 3 && x.dayStats.overprisStk >= 3)
    const sum = s.dayStats.tapteSalgStk + s.dayStats.manglerPrisStk + s.dayStats.overprisStk
    expect(s.dayStats.manglerPrisStk, 'mangler-pris-tap (upriset croissant)').toBeGreaterThan(0)
    expect(s.dayStats.overprisStk, 'for-dyr-tap (coffee 2×)').toBeGreaterThan(0)
    expect(sum, 'tapte-kortets sum > 0').toBeGreaterThan(0)
    // Dagspuls-kortet: lukk dashbord (+ hopp møte) → daypuls vises; «Tapte salg»-kortet
    // viser fordelingen «uten pris» + «for dyr» (dvs. summerer alle tre, ikke bare tomt lager).
    await lukkDashbord()
    if ((await lesState(page)).activeMeetingScenarioId) await dispatch(page, { type: 'SKIP_MEETING' })
    const kort = page.getByTestId('puls-tapt')
    await expect(kort, 'daypuls «Tapte salg»-kort synlig').toBeVisible({ timeout: 6000 })
    await expect(kort).toContainText('uten pris')
    await expect(kort).toContainText('for dyr')
    ctx.ok(`Utstilte-only: tom disk 0 salg/0 tap (kunder teller); ikke-utstilt croissant aldri solgt/tapt; tapte-kort summerer (${s.dayStats.tapteSalgStk} tomt · ${s.dayStats.manglerPrisStk} pris · ${s.dayStats.overprisStk} dyr = ${sum})`)
  })

  // ── Skriv rapport + gate på reelle FAIL ─────────────────────────────────────
  const { pass, fail, kjent } = skrivRapport(rapport, notater)
  expect(fail, `Reelle FAIL-steg (KJENT FEIL teller ikke): ${fail}. Se docs/rapporter/spilltest-siste.md`).toBe(0)
  process.stdout.write(`\nOppsummering: ${pass} PASS · ${fail} FAIL · ${kjent} KJENT FEIL\n`)
})
