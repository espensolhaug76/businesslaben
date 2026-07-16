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
    expect(s.money, 'startkapital (cafe = 150 000)').toBe(150_000)
    expect(s.currentMonth).toBe(1)
    expect(s.currentYear).toBe(1)
    await expect(page.locator('body')).toContainText('150 000 kr')
    await expect(page.locator('body')).toContainText('Januar')
    ctx.ok(`state.money = ${s.money} kr, currentMonth=${s.currentMonth}, currentYear=${s.currentYear}`)
    ctx.ok('HUD viser «150 000 kr» og «Januar · År 1»')
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
    const budsjett: BudsjettTall = { salgsinntekter: 50000, varekjop: 15000, lonn: 0, husleie: 40000, markedsforing: 0, laan: 0 }
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
    for (const l of BUDSJETT_LINJER) {
      expect(linjeAvvik(budsjett[l.key], faktisk[l.key]), `avvik ${l.key} == faktisk − budsjett`).toBe(faktisk[l.key] - budsjett[l.key])
    }
    ctx.ok(`husleie-avvik = ${husleieAvvik} kr (fasit), 6 linjer verifisert mot delt hjelpefunksjon`)

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

  // ── Skriv rapport + gate på reelle FAIL ─────────────────────────────────────
  const { pass, fail, kjent } = skrivRapport(rapport, notater)
  expect(fail, `Reelle FAIL-steg (KJENT FEIL teller ikke): ${fail}. Se docs/rapporter/spilltest-siste.md`).toBe(0)
  process.stdout.write(`\nOppsummering: ${pass} PASS · ${fail} FAIL · ${kjent} KJENT FEIL\n`)
})
