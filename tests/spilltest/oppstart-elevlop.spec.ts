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
import { Rapport, steg, dispatch, lesState, ventState, ryddLocalStorage } from './harness'

test('Oppstart uten ?skip — åpningsbestilling ankommer FRISK til dag 1', async ({ page }) => {
  const rapport = new Rapport('Oppstart-elevløype')
  const N = 50   // distinkt åpningsordre-antall for kaffe (skiller seg fra forslaget)

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

  // ── STEG 1 — Navnemenyen (den delen skip-løypa hoppet over) ─────────────────
  await steg(page, rapport, 1, 'Navnemeny uten ?skip: bransje → modell → finansiering → personlighet → navn → START_GAME', async ctx => {
    await expect(page.getByText('Velg din bransje')).toBeVisible({ timeout: 15_000 })
    await ventState(page, s => s.phase === 'startup', 'StartupScreen aktiv (ingen ?skip-seeding)')

    await page.getByRole('button', { name: /Kafé & Bakeri/ }).click()
    await page.getByRole('button', { name: 'Neste →' }).click()
    await page.getByRole('button', { name: /Detaljhandel/ }).click()
    await page.getByRole('button', { name: 'Neste →' }).click()
    await page.getByRole('button', { name: /Bank/ }).click()
    await page.getByRole('button', { name: 'Neste →' }).click()
    // «Analytisk\b» skiller kortet fra «Kreativ»-kortets ulempe «Analytiske valg …».
    await page.getByRole('button', { name: /Analytisk\b/ }).click()
    await page.getByRole('button', { name: 'Neste →' }).click()
    await page.getByPlaceholder(/Nordic Coffee/).fill('Testkafeen')
    await page.getByRole('button', { name: /Start spillet/ }).click()

    await ventState(page, s => s.phase === 'exploring_city', 'spillet startet (exploring_city)')
    const s = await lesState(page)
    expect(s.money, 'startkapital for kafé (200 000)').toBe(200_000)
    expect(s.dayNumber, 'starter på dag 1').toBe(1)
    expect(s.rentedLocationId, 'intet lokale ennå').toBeNull()
    ctx.ok(`navnemeny gjennomført → phase=exploring_city, kapital=${s.money} kr, dag ${s.dayNumber}`)
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
    ctx.ok(`åpningsbestilling: kaffe ${kaffe!.stock} stk på lager (bestilt ${N})`)
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

    // HUD-dagpilla (rentedLocationId satt) skal vise «Dag 1».
    await expect(page.locator('body')).toContainText('Dag 1')
    ctx.ok(`dag 1 åpnet med ${kaffe!.stock} kaffe på disken; HUD-dagpille viser «Dag 1»`)
  })

  // ── Gate: en reell FAIL her betyr at oppstartsdivergensen er tilbake ─────────
  const fail = rapport.steg.filter(s => s.status === 'FAIL').length
  const pass = rapport.steg.filter(s => s.status === 'PASS').length
  process.stdout.write(`\nOppstart-elevløype: ${pass} PASS · ${fail} FAIL\n`)
  expect(fail, `Reelle FAIL i oppstart-elevløypa: ${fail} (åpningsbestillingen når ikke dag 1?)`).toBe(0)
})
