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
import { TURIST_SCENARIO_IDS, TURISTKONTOR_SCENARIO_IDS, BYHOTELL_SCENARIO_IDS } from '../../src/game/sales/scenarios'

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

    // START turistsesong (genererer også byhotellets innboksmelding).
    await dispatch(page, { type: 'START_TURISTSESONG' })
    await ventState(page, s => s.turistsesong !== null, 'sesong startet')
    const s1 = await lesState(page)
    const hotellMsg = s1.messages.find(m => m.type === 'hotellavtale')
    expect(hotellMsg, 'byhotellets gjestepakke ligger i innboksen').toBeTruthy()

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
  await steg(page, rapport, 17, 'Dev-dyplenke: /game/d/stasjonsomradet?dev=1 viser stasjonsbydelen (hotspot-labels + sone-tracer), aldri bransjevelgeren', async ctx => {
    // Fersk navigasjon UTEN ?skip — spilltilstand overlever ikke reload, så uten
    // fiksen står phase='startup' → bransjevelger. Dyplenke-seedingen skal starte
    // et engangsspill så scenen rendres.
    await page.goto('/game/d/stasjonsomradet?dev=1')
    await ventState(page, s => s.phase !== 'startup', 'dev-dyplenke seedet engangsspill (ikke startup)')
    await page.waitForTimeout(400)
    const body = await page.textContent('body') ?? ''
    expect(body.includes('Velg din bransje'), 'ALDRI bransjevelgeren på dev-dyplenke').toBe(false)
    // «Turistkontoret»/«Byhotellet» (stor forbokstav + -et) = spillets hotspot-
    // labels (tracerens knapper er «turistkontor»/«byhotell», små bokstaver).
    expect(body.includes('Turistkontoret'), '«🧳 Turistkontoret»-label rendres på recten').toBe(true)
    expect(body.includes('Byhotellet'), '«🏨 Byhotellet»-label rendres på recten').toBe(true)
    expect(body.includes('Sone-tracer'), 'sone-traceren (ZoneTracer) er montert').toBe(true)
    // FIX B: etablering ikke åpnet på stasjonen → ingen TIL LEIE-skilt.
    expect((body.match(/TIL LEIE/g) ?? []).length, 'ingen TIL LEIE-skilt på stasjonen (visLedigeLokaler:false)').toBe(0)
    // FIX A: sone-traceren er default AV (klikk går gjennom) → hotspot-klikk
    // åpner panelet i ?dev=1 (traceren blokkerer ikke lenger).
    expect(body.includes('Tracer AV'), 'tracer default AV (klikk virker)').toBe(true)
    await page.locator('[title="Turistkontoret"]').click({ force: true })
    await page.waitForTimeout(600)
    expect((await page.textContent('body') ?? '').includes('SESONGSTATUS'), 'turistkontor-klikk åpner panelet i dev').toBe(true)
    ctx.ok('?dev=1 (uten ?skip) → stasjonsbydelen, labels + tracer synlige, INGEN TIL LEIE på stasjonen, tracer default AV → hotspot-klikk åpner panelet, ingen bransjevelger')
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

  // ── Skriv rapport + gate på reelle FAIL ─────────────────────────────────────
  const { pass, fail, kjent } = skrivRapport(rapport, notater)
  expect(fail, `Reelle FAIL-steg (KJENT FEIL teller ikke): ${fail}. Se docs/rapporter/spilltest-siste.md`).toBe(0)
  process.stdout.write(`\nOppsummering: ${pass} PASS · ${fail} FAIL · ${kjent} KJENT FEIL\n`)
})
