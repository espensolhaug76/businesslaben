// ─── TESTVAKT: HELE OPPSTARTEN UTEN ?skip (elevløypa) ────────────────────────
// Egen permanent vakt for oppstarts-divergensen Espen fant (29.07): en EKTE
// elev som går gjennom navnemenyen (uten ?skip=1) landet i kaféen med tomme
// trau — åpningsbestillingen kom ALDRI som levering til dag 1.
//
// Skip-løypa (?skip=1, brukt av full-maaned) seeder defaults og hopper over
// StartupScreen + mentor-introen, så den fanget IKKE dette. Denne testen SPILLER
// oppstarten som en fersk elev:
//   navnemeny (bransje→modell→finansiering→personlighet→navn) → mentor-intro
//   → leie lokale → åpningsbestilling N stk → åpne dag 1
// og asserterer at varene ligger på lager (N), at mentor-introen vises, og at
// HUD-dagpilla viser «Dag 1». Rotårsak/rapport: docs/rapporter/spor-a.md.
//
// Tid/fase styres via test-broen (OPEN_DAY) på samme premiss som full-maaned
// (docs/SPILLTESTER.md DEL 3) — ALT annet spilles via ekte DOM-klikk.

import { test, expect } from '@playwright/test'
import { Rapport, steg, dispatch, dispatchN, lesState, ventState, ryddLocalStorage } from './harness'

test('Oppstart uten ?skip — åpningsbestilling ankommer FRISK til dag 1', async ({ page }) => {
  const rapport = new Rapport('Oppstart-elevløype')
  const N = 50   // distinkt åpningsordre-antall for kaffe (skiller seg fra forslaget)
  let levert: Record<string, number> = {}   // per-vare levert-mengde (fasit for regnskaps-invarianten)

  // Boot UTEN ?skip → StartupScreen skal vises. Determinisme som full-maaned,
  // men vi setter BEVISST IKKE mentor_intro_v1 — introen SKAL dukke opp (assertes).
  await page.goto('/game')
  await ryddLocalStorage(page)
  await page.addInitScript(() => {
    let a = 0x9e3779b9
    Math.random = () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0
      let t = Math.imul(a ^ (a >>> 15), 1 | a)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  })
  await page.goto('/game')

  // ── STEG 1 — Navnemenyen (forenklet: navn → bransje, ingen v1-mellomsteg) ────
  await steg(page, rapport, 1, 'Navnemeny uten ?skip: navn → bransje → START_GAME (ingen modell/finansiering/personlighet)', async ctx => {
    await expect(page.getByText('Gi bedriften din et navn')).toBeVisible({ timeout: 15_000 })
    await ventState(page, s => s.phase === 'startup', 'StartupScreen aktiv (ingen ?skip-seeding)')

    // De tre v1-stegene skal være BORTE.
    await expect(page.getByText('Velg forretningsmodell'), 'ingen forretningsmodell-steg').toHaveCount(0)
    await expect(page.getByText('Hvem er du som gründer?'), 'ingen personlighet-steg').toHaveCount(0)

    await page.getByPlaceholder(/Nordic Coffee/).fill('Testkafeen')
    await page.getByRole('button', { name: 'Neste →' }).click()
    await expect(page.getByText('Velg din bransje')).toBeVisible()
    await page.getByRole('button', { name: /Kafé & Bakeri/ }).click()
    await page.getByRole('button', { name: /Start spillet/ }).click()

    await ventState(page, s => s.phase === 'exploring_city', 'spillet startet (exploring_city)')
    const s = await lesState(page)
    expect(s.money, 'startkapital for kafé (fast standard 200 000)').toBe(200_000)
    expect(s.dayNumber, 'starter på dag 1').toBe(1)
    expect(s.rentedLocationId, 'intet lokale ennå').toBeNull()
    ctx.ok(`navnemeny gjennomført (navn → bransje) → phase=exploring_city, kapital=${s.money} kr, dag ${s.dayNumber}`)
  })

  // ── STEG 2 — Mentor-onboarding (introen skip-løypa undertrykte) ─────────────
  await steg(page, rapport, 2, 'Mentor-introen (Espen) vises for en fersk elev og kan lukkes', async ctx => {
    await expect(page.getByText(/Jeg er Espen/)).toBeVisible({ timeout: 8_000 })
    ctx.ok('mentor-introen (z-600 fullskjerm) vises rett etter START_GAME')
    await page.getByRole('button', { name: 'Hopp over' }).click()
    await expect(page.getByText(/Jeg er Espen/)).toBeHidden()
    ctx.ok('introen lukkes (Hopp over) → eleven slipper til byen')
  })

  // ── STEG 3 — Leie lokale + åpningsbestilling N stk (ekte overlay) ────────────
  // Leie via test-broen (samme dokumenterte fase-oppsett som full-maaned) —
  // ÅPNINGSBESTILLINGEN spilles derimot via ekte DOM (det er der buggen bodde).
  await steg(page, rapport, 3, `Leie lokale → åpningsbestilling: sett kaffe = ${N} stk og bekreft (OpeningOrderOverlay)`, async ctx => {
    await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
    await ventState(page, s => s.rentedLocationId === 'sentrum-l2' && !s.openingOrderPlaced, 'lokale leid → åpningsbestilling åpnes')

    const kaffeInput = page.locator('input[type="number"]').first()
    await expect(kaffeInput).toBeVisible({ timeout: 8_000 })
    await kaffeInput.fill(String(N))
    // Bekreft-knappen (bransjens åpningsordre-tekst; ved tomt valg står det «Åpne
    // uten varer» — vi har varer, så begge dekkes defensivt av regexen).
    await page.getByRole('button', { name: /Bak til åpningsdagen|Åpne uten varer/ }).click()
    await ventState(page, s => s.openingOrderPlaced, 'åpningsbestilling plassert (PLACE_OPENING_ORDER)')

    const s = await lesState(page)
    const kaffe = s.products.find(p => p.id === 'coffee')
    expect(kaffe, 'kaffe finnes i sortimentet etter åpningsbestilling').toBeTruthy()
    expect(kaffe!.stock, `kaffe bestilt ${N} stk → ligger på lager`).toBe(N)

    // FIKS DAG 1 (30.07) + DEL 1 (10.08): KUN trau-varer (mat) stilles ut på disken.
    // Drikke (kaffe, trauVare===false) hører hjemme på tavla/lager — IKKE i trauet.
    // PRISING er fortsatt elevens jobb (varene starter upriset, retailPrice 0).
    const trauVarer = s.products.filter(p => p.trauVare !== false)
    const drikke = s.products.filter(p => p.trauVare === false)
    expect(trauVarer.length, 'åpningsordren har trau-varer (mat)').toBeGreaterThan(0)
    expect(drikke.some(p => p.id === 'coffee'), 'åpningsordren har kaffe (drikke)').toBe(true)
    expect(s.counterLayout.length, 'trau-varene er stilt ut på disken (counterLayout)').toBeGreaterThan(0)
    for (const p of trauVarer) {
      expect(s.counterLayout.some(t => t.productId === p.id), `${p.id} (trau-vare) er stilt ut på et trau`).toBe(true)
    }
    for (const p of drikke) {
      expect(s.counterLayout.some(t => t.productId === p.id), `${p.id} (drikke) er IKKE i trauet`).toBe(false)
    }
    expect(kaffe!.retailPrice, 'åpningsvaren starter upriset (prising er elevens jobb)').toBe(0)
    ctx.ok(`åpningsbestilling: ${trauVarer.length} trau-varer stilt ut, ${drikke.length} drikke til tavla/lager (ikke i trau); upriset`)
  })

  // ── STEG 4 — Åpne dag 1: varene FRISK på lager + HUD viser «Dag 1» ───────────
  await steg(page, rapport, 4, 'Åpne dag 1: åpningsbestillingen ligger på lager (N), ingen strandede ordrer, HUD-dagpille «Dag 1»', async ctx => {
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, s => s.dayPhase === 'åpen' && s.dayNumber === 1, 'dag 1 åpnet')

    const s = await lesState(page)
    const kaffe = s.products.find(p => p.id === 'coffee')
    expect(kaffe!.stock, `kaffe fortsatt ${N} på lager ved dag 1-åpning (åpningsbestilling levert, ikke «Utsolgt»)`).toBe(N)
    expect(s.incomingOrders.length, 'ingen bestillinger strandet i leveringskøen').toBe(0)
    expect(s.dayNumber, 'står på dag 1').toBe(1)

    // FASIT for regnskaps-invarianten (steg 5): per-vare levert = lager ved dag 1-åpning
    // (ingen salg ennå). Ingen ordrer underveis, så dette ER det som ble levert.
    levert = {}
    for (const p of s.products) levert[p.id] = p.stock

    // HUD-dagpilla (rentedLocationId satt) skal vise «Dag 1».
    await expect(page.locator('body')).toContainText('Dag 1')
    ctx.ok(`dag 1 åpnet med ${kaffe!.stock} kaffe på disken; HUD-dagpille viser «Dag 1»`)
  })

  // ── STEG 5 — DAG 1-REGNSKAPET: varene SELGER (ikke 100% svinn) + invariant ───
  // Rotårsak (bevisført): åpningsvarene havnet i lager UTEN pris/utstilling →
  // bakgrunnssalget (kun utstilte, prisede varer) solgte 0 → ALT ble svinn, disken
  // «Utsolgt». Etter fiksen er de priset + stilt ut → de selger. Vi asserterer at
  // regnskapet går opp PER VARE: levert == solgt + svinn + restlager.
  await steg(page, rapport, 5, 'Dag 1-regnskap: åpningsvarene selger (ikke 100% svinn) + levert == solgt + svinn + rest per vare', async ctx => {
    // Eleven priser varene (Priser-fanen sin jobb) — her via test-broen til anbefalt
    // markedspris. Nå er de BÅDE utstilt (fiksen) og priset → de skal selge.
    await page.evaluate(() => {
      const st = window.__GAME_STATE__
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: (st!.products as any[]).map(p => ({ ...p, retailPrice: p.markedsPris })) })
    })
    await ventState(page, s => s.products.every(p => p.retailPrice > 0), 'varene priset (markedspris)')
    // Spill dagen ferdig (bakgrunnssalg dryppes per tick; ingen kundemøte-avhengighet).
    for (let i = 0; i < 60; i++) {
      const s = await lesState(page)
      if (s.dayPhase !== 'åpen') break
      await dispatchN(page, { type: 'TICK' }, 15)
    }
    let s = await lesState(page)
    if (s.dayPhase === 'åpen') { await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, st => st.dayPhase === 'oppgjør', 'dag 1 stengt') }
    s = await lesState(page)
    const dr = s.lastDayResult as { svinnStk: number; soldStk: number; bakgrunnStk: number; produktRegnskap: { navn: string; solgtStk: number; svinnStk: number }[] }
    expect(dr, 'dagsoppgjør finnes').toBeTruthy()
    // FIKSEN: åpningsvarene solgte faktisk (ikke den gamle 100%-svinn-katastrofen).
    expect(dr.bakgrunnStk, 'bakgrunnssalget solgte av åpningsvarene (fiksen: utstilt + priset)').toBeGreaterThan(0)

    // REGNSKAPS-INVARIANT per vare: levert == solgt + svinn + restlager.
    for (const [id, lev] of Object.entries(levert)) {
      const navn = s.products.find(p => p.id === id)?.name
      const r = dr.produktRegnskap.find(x => x.navn === navn)
      const solgt = r?.solgtStk ?? 0
      const svinn = r?.svinnStk ?? 0
      const rest = s.products.find(p => p.id === id)?.stock ?? 0
      expect(solgt + svinn + rest, `${id}: levert(${lev}) == solgt(${solgt}) + svinn(${svinn}) + rest(${rest})`).toBe(lev)
    }
    ctx.ok(`dag 1 solgte ${dr.bakgrunnStk} stk (ikke 100% svinn); regnskapet går opp per vare (levert == solgt+svinn+rest)`)
  })

  // ── STEG 6 — RELOAD overlever (persistering) ───────────────────────────────
  // Skolestart-kravet: lukk/relast nettleseren → finn butikken NØYAKTIG der den var.
  await steg(page, rapport, 6, 'Reload overlever: disk-oppsett + dag 2 + lager + penger står etter «Fortsett»', async ctx => {
    // Dag 1 er alt stengt (oppgjør) fra steg 5. Rull til dag 2 (stengt) → stabil
    // tilstand (ingen klokke som tikker ved reload).
    await dispatch(page, { type: 'START_NEW_DAY' })
    await ventState(page, s => s.dayNumber === 2 && s.dayPhase === 'stengt', 'dag 2 (stengt)')

    // Snapshot FØR reload (fasit).
    const før = await lesState(page)
    expect(før.money, 'kassa er endret fra startkapitalen (åpningskjøp + dag 1-salg)').not.toBe(200_000)
    const fasit = {
      phase: før.phase, companyName: før.companyName, money: før.money,
      dayNumber: før.dayNumber, dayPhase: før.dayPhase,
      coffee: før.products.find(p => p.id === 'coffee')?.stock ?? -1,
      counterLayout: JSON.stringify(før.counterLayout),
      reputation: før.reputation, xp: før.xp, avisUlest: før.avisUlest,
    }

    // RELOAD → oppstartsmenyen skal tilby «Fortsett» (save finnes).
    await page.reload()
    const fortsett = page.getByRole('button', { name: /Fortsett som/ })
    await expect(fortsett, '«Fortsett»-knappen vises etter reload').toBeVisible({ timeout: 15_000 })
    await expect(page.locator('body')).toContainText(`Dag ${fasit.dayNumber}`)
    await fortsett.click()
    await ventState(page, s => s.phase !== 'startup', 'spillet hydrert etter «Fortsett»')

    const s = await lesState(page)
    expect(s.phase, 'phase bevart').toBe(fasit.phase)
    expect(s.companyName, 'bedriftsnavn bevart').toBe(fasit.companyName)
    expect(s.money, 'penger bevart').toBe(fasit.money)
    expect(s.dayNumber, 'dagnummer bevart (dag 2)').toBe(fasit.dayNumber)
    expect(s.dayPhase, 'dagfase bevart').toBe(fasit.dayPhase)
    expect(s.products.find(p => p.id === 'coffee')?.stock, 'kaffe-lager bevart').toBe(fasit.coffee)
    expect(JSON.stringify(s.counterLayout), 'disk-oppsett bevart').toBe(fasit.counterLayout)
    expect(s.reputation, 'rykte bevart').toBe(fasit.reputation)
    expect(s.xp, 'XP bevart').toBe(fasit.xp)
    expect(s.avisUlest, 'ulest-avis-teller bevart').toBe(fasit.avisUlest)
    ctx.ok(`etter reload+Fortsett: «${s.companyName}» dag ${s.dayNumber}, ${fasit.coffee} kaffe, ${s.counterLayout.length} trau, ${s.money} kr — ALT bevart`)
  })

  // ── Gate: en reell FAIL her betyr at oppstartsdivergensen er tilbake ─────────
  const fail = rapport.steg.filter(s => s.status === 'FAIL').length
  const pass = rapport.steg.filter(s => s.status === 'PASS').length
  process.stdout.write(`\nOppstart-elevløype: ${pass} PASS · ${fail} FAIL\n`)
  expect(fail, `Reelle FAIL i oppstart-elevløypa: ${fail} (åpningsbestillingen/persisteringen røk?)`).toBe(0)
})

// ─── KORRUPT LAGRING: trygg fallback + backup, ingen krasj ────────────────────
test('Korrupt lagring → fersk oppstart uten krasj + backup-nøkkel finnes', async ({ page }) => {
  // Plant en ugyldig save FØR appen laster (addInitScript kjører før side-JS).
  await page.goto('/game')
  await ryddLocalStorage(page)
  await page.addInitScript(() => {
    try { localStorage.setItem('adventure_save_v1', '{ dette er ikke gyldig json …') } catch { /* */ }
  })
  await page.goto('/game')

  // Appen skal IKKE krasje: den ferske navnemenyen vises (ikke «Fortsett»).
  await expect(page.getByText('Gi bedriften din et navn'), 'fersk oppstart tross korrupt save').toBeVisible({ timeout: 15_000 })
  await expect(page.getByRole('button', { name: /Fortsett som/ }), 'ingen «Fortsett» på korrupt save').toHaveCount(0)

  // Den korrupte blobben skal være flyttet til backup (aldri slettet stille).
  const backup = await page.evaluate(() => localStorage.getItem('adventure_save_backup'))
  expect(backup, 'korrupt save bevart under adventure_save_backup').toContain('ikke gyldig json')
  process.stdout.write('\nKorrupt lagring: fersk oppstart OK, backup bevart\n')
})
