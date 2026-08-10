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
    // DEL 6 (10.08): varene prises til sin EGEN innkjøpspris ved anskaffelse — de
    // selger dermed fra dag 1, men til null margin (prisjustering er elevens jobb).
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
    expect(kaffe!.retailPrice, 'åpningsvaren priset til innkjøpspris ved anskaffelse (DEL 6)').toBe(kaffe!.costPrice)
    ctx.ok(`åpningsbestilling: ${trauVarer.length} trau-varer stilt ut, ${drikke.length} drikke til tavla/lager; priset = innkjøp (${kaffe!.retailPrice} kr)`)
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

// ─── DEL 7 (VAKT): mentor-onboardingen er IKKE stum på et nytt spill ──────────
// Rotårsak: mentor-nøklene (mentor_intro_v1/mentor_fired_v1) overlevde «Start ny
// bedrift» → et nytt spill arvet «alt sett/fyrt» → mentoren ble stum. Denne vakta
// simulerer et FORRIGE spill (nøklene satt) og krever at et nytt spill likevel
// møter introen + scene-orienteringene (bykart → bydel).
test('Mentor-onboarding er ikke stum på nytt spill (intro + bykart + bydel fyrer)', async ({ page }) => {
  const firedSett = () => page.evaluate(() => { try { return JSON.parse(localStorage.getItem('mentor_fired_v1') || '[]') as string[] } catch { return [] } })

  await page.goto('/game')
  await ryddLocalStorage(page)
  // SIMULER FORRIGE SPILL: intro sett + scene-orienteringer alt fyrt.
  await page.evaluate(() => {
    try {
      localStorage.setItem('mentor_intro_v1', '1')
      localStorage.setItem('mentor_fired_v1', JSON.stringify(['forste_bykart', 'forste_bydel', 'forste_disk_stell']))
    } catch { /* */ }
  })
  await page.addInitScript(() => {
    let a = 0x9e3779b9
    Math.random = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  })
  await page.goto('/game')
  await ventState(page, s => s.phase === 'startup', 'StartupScreen (nytt spill)')

  // Nytt spill via navnemenyen (wizard → START_GAME nullstiller mentor-onboardingen).
  await page.getByPlaceholder(/Nordic Coffee/).fill('NyKafé')
  await page.getByRole('button', { name: 'Neste →' }).click()
  await page.getByRole('button', { name: /Kafé & Bakeri/ }).click()
  await page.getByRole('button', { name: /Start spillet/ }).click()
  await ventState(page, s => s.phase === 'exploring_city', 'spillet startet')

  // (1) INTROEN vises tross at mentor_intro_v1 var satt (nullstilt ved START_GAME).
  await expect(page.getByText(/Jeg er Espen/), 'intro vises på nytt spill (ikke stum)').toBeVisible({ timeout: 8_000 })
  await page.getByRole('button', { name: 'Hopp over' }).click()
  await expect(page.getByText(/Jeg er Espen/)).toBeHidden()

  // (2) BYKART-orienteringen fyrer (forste_bykart re-armet av nullstillingen).
  await expect.poll(firedSett, { timeout: 8_000 }).toEqual(expect.arrayContaining(['forste_bykart']))
  await expect(page.locator('body')).toContainText('Her er byen')

  // (3) BYDEL-orienteringen fyrer ved navigasjon inn i en bydel (klikk sentrum-polygon).
  await page.evaluate(() => {
    const svg = document.querySelector('svg')
    const poly = svg ? [...svg.querySelectorAll('polygon')] : []
    poly[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  await page.waitForURL(/\/game\/d\//, { timeout: 8_000 })
  await expect.poll(firedSett, { timeout: 8_000 }).toEqual(expect.arrayContaining(['forste_bydel']))

  process.stdout.write('\nMentor-onboarding: intro + bykart + bydel fyrer på nytt spill (ikke stum)\n')
})

// ─── DISK-DOM-VAKT: paletten VISER trau-varene (Espens kroker-funn, 10.08) ────
// SKJERPET VAKT: elevløypa sjekket bare STATEN (counterLayout) — den var grønn
// selv om disken sto tom i praksis («voktet feil dør»). Denne rendrer den
// frontale disk-scenen (MonterScene) og krever at paletten faktisk viser minst
// én trau-vare med lager (IKKE «Utsolgt», IKKE «Ingen varer ført ennå»). Fanger
// render-nivå-brudd (f.eks. et utstillingsfilter som blanker mat-varer) som
// state-asserts glipper. Dyplenke ?skip=1 seeder spillet så disk-scenen mountes
// klientside (ingen reload som ville nullstilt til StartupScreen).
test('Disk-DOM: paletten viser trau-varene med lager (ikke «Utsolgt»/tom disk)', async ({ page }) => {
  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  // Demp mentor-introen (z-600) så den ikke dekker disk-scenen.
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  // Dyplenke rett til disk-scenen — ?skip seeder et spill (phase != startup).
  await page.goto('/game/d/sentrum/l/sentrum-l2/disk?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'seedet spill (disk-dyplenke)')

  // Lei + åpningsbestilling via broen (bekreft-overlayet lukkes når ordren plasseres).
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [
    { productId: 'coffee', qty: 10 }, { productId: 'croissant', qty: 10 }, { productId: 'kanelbolle', qty: 10 }, { productId: 'baguette', qty: 10 },
  ] })
  await ventState(page, s => s.openingOrderPlaced && s.counterLayout.length > 0, 'åpningsordre auto-stilt')

  // Disk-paletten er montert og IKKE tom.
  await expect(page.getByText('🧺 TRAU-VARER — dra opp i et trau for å stille ut'), 'disk-paletten montert').toBeVisible({ timeout: 12_000 })
  await expect(page.getByText('Ingen varer ført ennå'), 'paletten er IKKE tom').toHaveCount(0)

  // Minst én trau-vare viser lager («N stk») → IKKE «Utsolgt».
  const s = await lesState(page)
  const enMat = s.products.find(p => p.trauVare !== false && p.stock > 0)!
  await expect(page.getByText(`${enMat.stock} stk`).first(), `trau-vare «${enMat.name}» viser lager, ikke «Utsolgt»`).toBeVisible()
  // Drikke (kaffe) er IKKE en trau-vare og skal ikke stå i paletten/trauet.
  expect(s.counterLayout.some(t => t.productId === 'coffee'), 'kaffe (drikke) ikke i trauet').toBe(false)
  process.stdout.write(`\nDisk-DOM: paletten viser trau-varer med lager (f.eks. «${enMat.name}» ${enMat.stock} stk), disken er ikke tom\n`)
})

// ─── HYDRATE-VAKT: en gammel save med tom disk HELES ved «Fortsett» ────────────
// Regresjonen Espen fant: en HYDRERT save kunne gi tom disk (alle trau tomme,
// ingen mat utstilt) selv med varer på lager. En FERSK oppstart var alltid riktig
// — feilen bodde i gjenopprettingen: (a) saver plassert før auto-utstillingen
// (30.07) hadde counterLayout TOM og hydrate bygde den aldri opp, (b) eldre
// produkter kunne mangle/ha stale `trauVare` → paletten feilklassifiserte. Denne
// vakta SIMULERER en slik save (strip trauVare + tøm counterLayout) og krever at
// HYDRATE_SAVE HELER: re-utleder trauVare fra katalogen OG auto-stiller trau-varene
// med lager (drikke holdes ute).
test('Hydrate heler tom disk: gammel save (uten trauVare + tom counterLayout) → auto-stilt', async ({ page }) => {
  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.goto('/game?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'seedet spill')
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [
    { productId: 'coffee', qty: 10 }, { productId: 'croissant', qty: 10 }, { productId: 'kanelbolle', qty: 10 }, { productId: 'baguette', qty: 10 },
  ] })
  await ventState(page, s => s.openingOrderPlaced, 'ordre plassert')

  // Bygg «gammel save»-blob: strip trauVare + tøm counterLayout. RETURNER strengen
  // (ikke skriv nå — kjørende autosave ville klobbet den).
  const blobStr = await page.evaluate(() => {
    const st = JSON.parse(JSON.stringify(window.__GAME_STATE__)) as Record<string, unknown>
    st.products = (st.products as Array<Record<string, unknown>>).map(p => { const { trauVare, ...rest } = p; void trauVare; return rest })
    st.counterLayout = []
    st.phase = 'exploring_city'
    return JSON.stringify({ version: 1, savedAt: '1970-01-01T00:00:00.000Z', state: st })
  })

  // Drep siden, injiser save-blobben FØR JS kjører, hydrer via «Fortsett».
  await page.goto('about:blank')
  await page.addInitScript((b: string) => { try { localStorage.setItem('adventure_save_v1', b) } catch { /* */ } }, blobStr)
  await page.goto('/game')
  const fortsett = page.getByRole('button', { name: /Fortsett som/ })
  await expect(fortsett, '«Fortsett» tilbys for den gamle saven').toBeVisible({ timeout: 15_000 })
  await fortsett.click()
  await ventState(page, s => s.phase !== 'startup', 'gammel save hydrert')

  const s = await lesState(page)
  // (1) trauVare re-utledet fra katalogen.
  expect(s.products.find(p => p.id === 'coffee')?.trauVare, 'kaffe re-utledet til drikke (false)').toBe(false)
  expect(s.products.find(p => p.id === 'croissant')?.trauVare, 'croissant re-utledet til mat (true)').toBe(true)
  // (2) disken auto-stilt (ikke tom), drikke holdt ute.
  expect(s.counterLayout.length, 'HYDRATE auto-stilte trau-varene (disken ikke tom)').toBeGreaterThan(0)
  expect(s.counterLayout.some(t => t.productId === 'croissant'), 'croissant stilt ut på disken').toBe(true)
  const drikkeIds = new Set(s.products.filter(p => p.trauVare === false).map(p => p.id))
  expect(s.counterLayout.some(t => drikkeIds.has(t.productId)), 'ingen drikke i trauet').toBe(false)
  process.stdout.write(`\nHydrate helet tom disk: ${s.counterLayout.length} trau-varer auto-stilt, trauVare re-utledet, drikke ute\n`)
})

// ─── MENTOR-SONE-VAKT: «Gå til butikken» klar av mentoren (Espens funn, 10.08) ─
// Mentoren EIER nedre høyre hjørne (Mentor.tsx: right:14 bottom:14, figur 150×170,
// z-500). «Gå til butikken»-knappen lå tidligere right:24 → BAK figuren, delvis
// synlig og ikke klikkbar. Denne vakta rendrer en bydel uten elevens butikk og
// krever at knappen (a) er synlig, (b) har høyre kant KLAR av mentor-sonen, og
// (c) faktisk er klikkbar (navigerer) — ikke dekket av figuren.
test('Mentor-sone: «Gå til butikken» ligger klar av mentorens hjørne + er klikkbar', async ({ page }) => {
  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  // Seed spillet PÅ en bydel uten elevens butikk (stasjonsområdet) — der knappen vises.
  await page.goto('/game/d/stasjonsomradet?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'seedet på bydel')
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'coffee', qty: 10 }, { productId: 'croissant', qty: 10 }] })
  await ventState(page, s => s.rentedLocationId === 'sentrum-l2' && s.openingOrderPlaced, 'leid + ordre (overlay lukket)')

  const knapp = page.getByRole('button', { name: /Gå til butikken/ })
  await expect(knapp, '«Gå til butikken» synlig i bydelsvisning').toBeVisible({ timeout: 12_000 })
  const bb = (await knapp.boundingBox())!
  const vw = page.viewportSize()!.width
  // Mentor-sonen: figur 150 bred, right:14 → venstre kant ~ vw-164. Krev margin.
  expect(bb.x + bb.width, 'knappens høyre kant er klar av mentor-sonen (nedre høyre)').toBeLessThan(vw - 170)
  // Klikkbar (ikke dekket av figuren) → navigerer til egen butikk.
  await knapp.click()
  await page.waitForURL(/\/game\/d\/sentrum\/l\/sentrum-l2/, { timeout: 8_000 })
  process.stdout.write('\nMentor-sone: «Gå til butikken» klar av hjørnet + klikkbar\n')
})

// ─── RENDER-VAKT (DEL B): ukalibrert sizeAdjust gir ALDRI råstørrelse ──────────
// Espens funn: en trau-vare rendret plutselig i råstørrelse (~kvart skjerm) midt i
// økta. Rotårsak innringet (en counterLayout-`sizeAdjust`/`displayScale` utenfor
// bånd — trolig legacy/korrupt save), men ikke bevisført fra ren spilling. Fiks:
// disk-/speil-rendringen KLEMMER den per-vare skala-faktoren til kalibrert bånd.
// Denne vakta INJISERER en ukalibrert sizeAdjust (5×) på et trau og krever at (a)
// den rendrede spriten holder seg innenfor båndet (ikke råstørrelse), og (b)
// loggfella (console.warn) fyrer med vare-id — så en ekte forekomst blir synlig.
test('Render-vakt: ukalibrert sizeAdjust klemmes — trau-vare rendres aldri i råstørrelse', async ({ page }) => {
  const warnings: string[] = []
  page.on('console', m => { if (m.type() === 'warning' && m.text().includes('[vareSkala]')) warnings.push(m.text()) })

  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  await page.goto('/game/d/sentrum/l/sentrum-l2/disk?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'seedet på disk')
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'croissant', qty: 20 }, { productId: 'kanelbolle', qty: 20 }] })
  await ventState(page, s => s.openingOrderPlaced && s.counterLayout.length > 0, 'ordre auto-stilt')

  // INJISER en ukalibrert sizeAdjust (5×) på croissant-trauet (som en korrupt save
  // ville hatt) via SET_COUNTER_LAYOUT.
  await page.evaluate(() => {
    const st = window.__GAME_STATE__!
    const items = st.counterLayout.map(t => t.productId === 'croissant' ? { ...t, sizeAdjust: 5 } : t)
    window.__GAME_DISPATCH__!({ type: 'SET_COUNTER_LAYOUT', items })
  })
  await ventState(page, s => s.counterLayout.some(t => t.productId === 'croissant' && (t as { sizeAdjust?: number }).sizeAdjust === 5), 'ukalibrert sizeAdjust satt')
  await page.waitForTimeout(600)  // la disk-scenen re-rendre + sprites dekode

  // Mål STØRSTE trau-vare-sprite mot viewport. Uten klemmen ville croissant nå
  // ~kvart skjerm (agenten målte 27 % @ sizeAdjust 5). Med klemmen: godt under.
  const maxFrac = await page.evaluate(() => {
    const vw = window.innerWidth
    const imgs = [...document.querySelectorAll('img[src*="/products/"]')] as HTMLImageElement[]
    let max = 0
    for (const im of imgs) { const w = im.getBoundingClientRect().width; if (w > max) max = w }
    return max / vw
  })
  console.log('største trau-vare-sprite som andel av viewport:', maxFrac.toFixed(3))
  // Kalibrert bånd: selv med sizeAdjust 5 skal spriten holde seg godt under kvart
  // skjerm. Klemmen (faktor ≤ 1.6) gir ~8–9 %; sett en romslig, men avslørende grense.
  expect(maxFrac, 'trau-vare-sprite holdes innenfor kalibrert bånd (ikke råstørrelse)').toBeLessThan(0.15)
  // Loggfella fyrte med vare-id.
  expect(warnings.some(w => w.includes('croissant')), 'loggfella (console.warn) fyrte for den klemte varen').toBe(true)
  process.stdout.write(`\nRender-vakt: sizeAdjust 5 klemt → største sprite ${(maxFrac * 100).toFixed(1)} % av viewport; loggfella fyrte\n`)
})

// ─── RENDER-VAKT (DEL B runde 3): interiør-speilet gir ALDRI råstørrelse ───────
// FUNN B runde 3 (Espens bevis): en full-displayScale vare (grovbrød 1.0) i et
// speilet trau rendret i interiørscenen (/inne) i RÅSTØRRELSE (målt 24 % av
// viewport) og fløt ut av montren over UI-knappene — UTEN [vareSkala]-warn, fordi
// blow-up-en kom fra sonens `mirrorScale` (2.75) som lå UTENFOR per-vare-klemmen.
// Denne vakta legger grovbrød i et speilet trau (trau-8 ↔ speil-5), rendrer /inne,
// og krever at (a) sprite-en holdes innen båndet (ikke råstørrelse) og (b)
// loggfella fyrer for den klemte varen.
test('Render-vakt: interiør-speilet klemmer mirrorScale × vare — aldri råstørrelse', async ({ page }) => {
  const warnings: string[] = []
  page.on('console', m => { if (m.text().includes('[vareSkala]')) warnings.push(m.text()) })

  await page.goto('/game?skip=1')
  await ryddLocalStorage(page)
  await page.addInitScript(() => { try { localStorage.setItem('mentor_intro_v1', '1') } catch { /* */ } })
  await page.goto('/game/d/sentrum/l/sentrum-l2/inne?skip=1')
  await ventState(page, s => s.phase !== 'startup', 'seedet /inne')
  await dispatch(page, { type: 'RENT_LOCATION', id: 'sentrum-l2', zone: 'gagata', rent: 45000, capacity: 120 })
  await dispatch(page, { type: 'PLACE_OPENING_ORDER', items: [{ productId: 'grovbrod', qty: 20 }] })
  await ventState(page, s => s.openingOrderPlaced, 'ordre')
  // Legg grovbrød (displayScale 1.0) i trau-8 — speilet av speil-5 (mirrorScale 2.75).
  await page.evaluate(() => {
    window.__GAME_DISPATCH__!({ type: 'SET_COUNTER_LAYOUT', items: [{ trauId: 'trau-8', productId: 'grovbrod' }] })
  })
  await ventState(page, s => s.counterLayout.some(t => t.trauId === 'trau-8' && t.productId === 'grovbrod'), 'grovbrød i speilet trau')
  await page.waitForTimeout(900)  // speil-scenen re-rendrer + sprites dekode

  const maxFrac = await page.evaluate(() => {
    const vw = window.innerWidth
    const imgs = [...document.querySelectorAll('img[src*="/products/grovbrod"]')] as HTMLImageElement[]
    let max = 0
    for (const im of imgs) { const w = im.getBoundingClientRect().width; if (w > max) max = w }
    return max / vw
  })
  console.log('interiør-speil: største grovbrød-sprite som andel av viewport:', maxFrac.toFixed(3))
  // Uten klemmen: 24 % (råstørrelse). Med klemmen (itemScale ≤ 1.6): ~14 %. Grense
  // godt under kvart skjerm, men over den klemte verdien.
  expect(maxFrac, 'speil-sprite holdes under råstørrelse (mirrorScale klemt)').toBeLessThan(0.18)
  expect(warnings.some(w => w.includes('grovbrod') && w.includes('speil')), 'loggfella fyrte for den klemte speil-varen').toBe(true)
  process.stdout.write(`\nRender-vakt (speil): grovbrød ${(maxFrac * 100).toFixed(1)} % av viewport (mot 24 % uklemt); loggfella fyrte\n`)
})
