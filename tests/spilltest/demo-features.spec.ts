// ─── DEMO-FUNKSJONER (10.08) — DEL 1/2/3/5 ───────────────────────────────────
// Egen, rask vakt for demo-runden: drikke ut av trauene (DEL 1), mangler-pris-vakt
// (DEL 2), varslingssenter (DEL 3) og innkjøpspris-fella (DEL 5). Kjører via
// test-broen (?skip) — samme premiss som full-maaned (docs/SPILLTESTER.md).

import { test, expect } from '@playwright/test'
import { Rapport, steg, dispatch, dispatchN, lesState, ventState, ryddLocalStorage } from './harness'

test('Demo-funksjoner DEL 1/2/3/5', async ({ page }) => {
  const rapport = new Rapport('Demo-funksjoner')

  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  await page.addInitScript(() => {
    let a = 0x9e3779b9
    Math.random = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  })
  await page.goto('/game?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'boot')
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await ventState(page, s => s.rentedLocationId === 'sentrum-l2', 'lokale leid')

  // ── STEG 1 — DEL 1 + DEL 6: drikke ut av trauene + default-pris = innkjøpspris ─
  await steg(page, rapport, 1, 'DEL 1: drikke IKKE i counterLayout · DEL 6: varene prises til innkjøpspris ANSKAFFES med det samme', async ctx => {
    await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 40 }, { productId: 'croissant', qty: 60 }] })
    await ventState(page, s => s.openingOrderPlaced, 'åpningsbestilling plassert')
    const s = await lesState(page)
    // DEL 1
    expect(s.counterLayout.some(t => t.productId === 'coffee'), 'kaffe (drikke) IKKE i trauet').toBe(false)
    expect(s.counterLayout.some(t => t.productId === 'croissant'), 'croissant (trau-vare) i trauet').toBe(true)
    // DEL 6: varene er priset til sin EGEN innkjøpspris allerede ved anskaffelse.
    for (const p of s.products) {
      expect(p.retailPrice, `${p.id} priset til innkjøpspris (${p.costPrice}) ved anskaffelse`).toBe(p.costPrice)
    }
    ctx.ok(`drikke ikke i trau; alle varer priset = innkjøpspris (kaffe ${s.products.find(p => p.id === 'coffee')?.retailPrice} kr)`)
  })

  // ── STEG 2 — DEL 2: mentor-vakt ved åpning med AKTIVT nullet, utstilt vare ───
  await steg(page, rapport, 2, 'DEL 2: eleven nuller ut en utstilt vare → åpne → mentor-vakt «mangler_pris_apning» fyrer (blokkerer ikke)', async ctx => {
    // DEL 6: «mangler pris» oppstår nå KUN når eleven aktivt nuller ut prisen.
    await page.evaluate(() => { const st = window.__GAME_STATE__; window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: st!.products.map(p => p.id === 'croissant' ? { ...p, retailPrice: 0 } : p) }) })
    await ventState(page, s => s.products.find(p => p.id === 'croissant')!.retailPrice === 0, 'croissant nullet ut')
    await dispatch(page, { type: 'OPEN_DAY' })
    await ventState(page, st => st.dayPhase === 'åpen', 'dag åpnet (ikke blokkert)')
    await expect.poll(async () => page.evaluate(() => { try { return JSON.parse(localStorage.getItem('mentor_fired_v1') || '[]') as string[] } catch { return [] } }), { timeout: 8000 })
      .toEqual(expect.arrayContaining([expect.stringContaining('mangler_pris_apning')]))
    // Sett croissant tilbake til innkjøp så dagen kan selge nullmargin (steg 3).
    await page.evaluate(() => { const st = window.__GAME_STATE__; window.__GAME_DISPATCH__?.({ type: 'SET_PRODUCTS', products: st!.products.map(p => p.id === 'croissant' ? { ...p, retailPrice: p.costPrice } : p) }) })
    ctx.ok('mentor-vakt fyrte da en nullet, utstilt vare møtte åpning (dagen åpnet like fullt)')
  })

  // ── STEG 3 — DEL 6/5: nullmargin-dag → tap + mentor-refleksjon ──────────────
  await steg(page, rapport, 3, 'DEL 6/5: dag med default-pris (= innkjøp) → salg skjer OG resultat ≤ 0 + mentor-refleksjon «nullmargin»', async ctx => {
    // Dagen er alt åpen fra steg 2; varene står på innkjøpspris (default/tilbakestilt).
    for (let i = 0; i < 50; i++) {
      const s = await lesState(page)
      if (s.dayPhase !== 'åpen') break
      if (s.activeMeetingScenarioId) await dispatch(page, { type: 'SKIP_MEETING' })
      else await dispatchN(page, { type: 'TICK' }, 15)
    }
    let s = await lesState(page)
    if (s.dayPhase === 'åpen') { await dispatch(page, { type: 'CLOSE_DAY' }); await ventState(page, st => st.dayPhase === 'oppgjør', 'oppgjør') }
    s = await lesState(page)
    const r = s.lastDayResult as { resultat: number; bakgrunnStk: number } | null
    expect(r, 'dagsoppgjør finnes').toBeTruthy()
    expect(r!.bakgrunnStk, 'varene solgte (volum)').toBeGreaterThan(0)
    expect(r!.resultat, 'nullmargin-salg → resultat ≤ 0').toBeLessThanOrEqual(0)
    expect(s.mentorDagligHint?.signal, 'mentor-refleksjon = nullmargin').toBe('nullmargin')
    expect(s.mentorDagligHint?.melding ?? '', 'refleksjonen navngir en vare + dekningsbidrag').toMatch(/dekningsbidrag/)
    ctx.ok(`resultat ${r!.resultat} kr (≤ 0), signal «${s.mentorDagligHint?.signal}»: ${(s.mentorDagligHint?.melding ?? '').slice(0, 80)}…`)
  })

  // ── STEG 4 — DEL 3: varslingssenter (levering + mentor) + 🔔 ────────────────
  await steg(page, rapport, 4, 'DEL 3: varsler logget (mentor m.fl.), 🔔 klikkbar med badge, lukking nullstiller uleste', async ctx => {
    const s = await lesState(page)
    expect(s.varsler.length, 'varsler er logget').toBeGreaterThan(0)
    expect(s.varsler.some(v => v.maal === 'mentor'), 'minst ett mentor-varsel').toBe(true)
    // 🔔 synlig + klikkbar (rentedLocationId satt).
    await dispatch(page, { type: 'START_NEW_DAY' }); await ventState(page, st => st.dayPhase === 'stengt', 'ny dag')
    const knapp = page.getByTestId('varsler-knapp')
    await expect(knapp, '🔔-knappen synlig').toBeVisible({ timeout: 8000 })
    await knapp.click()
    await expect(page.getByTestId('varsler-senter'), 'varslingssenter åpnet').toBeVisible()
    // Lukk → alle merkes lest.
    await page.getByTestId('varsler-lukk').click()
    await ventState(page, st => st.varsler.every(v => v.lest), 'alle varsler markert lest ved lukking')
    ctx.ok(`${s.varsler.length} varsler logget; 🔔 åpner senteret; lukking nullstiller uleste`)
  })

  // ── Gate ────────────────────────────────────────────────────────────────────
  const fail = rapport.steg.filter(s => s.status === 'FAIL').length
  const pass = rapport.steg.filter(s => s.status === 'PASS').length
  process.stdout.write(`\nDemo-funksjoner: ${pass} PASS · ${fail} FAIL\n`)
  expect(fail, `Reelle FAIL i demo-funksjonene: ${fail}`).toBe(0)
})
