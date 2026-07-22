import { test, expect } from '@playwright/test'
import { ventState, lesState } from './harness'

// ─── FLAGG-PÅ-SPILLTEST — klesbutikken aktiv (KLESBUTIKK_AKTIV=1) ─────────────
// Kjøres via `npm run spilltest:klesbutikk` (playwright.klesbutikk.config.ts starter
// dev-serveren med VITE_KLESBUTIKK_AKTIV=1 på port 5177). Verifiserer at
// bransjebytte gir klesbutikk-geometri/kassevy/katalog, og at et avsluttesVedKasse-
// scenario (Angrekjøpet) flytter oppgjøret til kassevyen (/inne). Kafé-regresjonen
// (flagg AV) bor i full-maaned.spec.ts og røres ikke.
//
// Seeding: spilltilstanden er IN-MEMORY, så en full page.goto NULLSTILLER den. Vi
// bruker derfor dev-DYPLENKER (?dev=1&industry=fashion) som RE-SEEDER en klesbutikk
// ved hver navigasjon (GamePage devDeepLink-seed). Lokale sentrum-l2 ligger i
// distriktet 'sentrum' ⇒ interiørruta er /game/d/sentrum/l/sentrum-l2/inne.

const DL = 'dev=1&industry=fashion'
const INNE = `/game/d/sentrum/l/sentrum-l2/inne?${DL}`
const BUTIKK = `/game/d/sentrum/l/sentrum-l2?${DL}`

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      // Hopp over mentor-intro-overlayet (fanger ellers klikk), som kafé-harnessen.
      localStorage.setItem('mentor_intro_v1', '1')
      // Slå PÅ klesbutikken via DEV-overstyringen (⚙ Bransje → «Klesbutikk aktiv
      // (DEV)») — forenkler testoppsettet: ingen egen VITE-env/build nødvendig,
      // og bekrefter samtidig at den effektive verdien (klesbutikkAktiv) leses.
      localStorage.setItem('dev_panel_v1', JSON.stringify({ klesbutikkAktivDev: true }))
    } catch { /* */ }
  })
})

test('Klesbutikk aktiv — geometri/kassevy/katalog + avsluttesVedKasse', async ({ page }) => {
  await test.step('Bransjebytte: fashion er registrert og aktiv (flagg på)', async () => {
    await page.goto('/game?skip=1&industry=fashion')
    await ventState(page, s => s.phase !== 'startup', 'boot (fashion)')
    const s = await lesState(page)
    expect(s.industry, 'START_GAME seedet klesbutikk (fashion) — krever KLESBUTIKK_AKTIV=1').toBe('fashion')
  })

  await test.step('Kassevy: /inne leser klesbutikk-kassevy.png fra aktiv IndustryDefinition', async () => {
    await page.goto(INNE)
    await ventState(page, s => s.industry === 'fashion', 'fashion re-seedet på /inne')
    await page.waitForTimeout(600)
    const imgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img')).map(i => i.getAttribute('src') || ''))
    expect(imgs.some(s => s.includes('klesbutikk-kassevy.png')),
      '/inne viser klesbutikk-kassevy.png (bakgrunn + forgrunns-disk)').toBe(true)
    expect(imgs.some(s => s.includes('interior-kasse.png')),
      'kafeens interior-kasse.png skal IKKE være i klesbutikkens kassevy').toBe(false)
  })

  await test.step('Produkter-fanen viser Innkjøpskatalogen (leverandørmerker)', async () => {
    // Fra master-ruta (ingen lokale-panel som fanger klikk).
    await page.goto('/game?skip=1&industry=fashion')
    await ventState(page, s => s.industry === 'fashion', 'fashion')
    await page.getByRole('button', { name: /💻 Dashbord/ }).first().click()
    await page.getByTestId('fane-produkter').click()
    // Innkjøpskatalogen viser de fiktive leverandørmerkene — kafeens ProdukterTab ikke.
    await expect(page.getByText(/Nordheim|Basiq|Fjellrev|Strøm & Berg/).first()).toBeVisible({ timeout: 8000 })
  })

  await test.step('avsluttesVedKasse: Angrekjøpet flytter oppgjøret til kassen (/inne)', async () => {
    // Start UTENFOR interiøret (lokale-ruta), åpne Angrekjøpet og spill gjennom.
    await page.goto(BUTIKK)
    await ventState(page, s => s.industry === 'fashion', 'fashion')
    expect(page.url(), 'starter utenfor /inne').not.toContain('/inne')
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: 'angrekjopet' } })))
    const ov = page.getByTestId('salgsoverlay')
    await expect(ov).toBeVisible({ timeout: 8000 })
    // Spill via første gyldige valg → «Neste →» → «Fullfør ✓». Underveis når
    // dialogen 'kasse'-steget, og onStep (GamePage) navigerer til /inne.
    for (let i = 0; i < 16; i++) {
      const fullfør = ov.getByRole('button', { name: /Fullfør/ })
      if (await fullfør.isVisible().catch(() => false)) { await fullfør.click(); break }
      const neste = ov.getByRole('button', { name: /Neste/ })
      if (await neste.isVisible().catch(() => false)) { await neste.click(); continue }
      await ov.getByTestId('salgsvalg').first().click()
    }
    await expect.poll(() => page.url(), { timeout: 8000, message: 'avsluttesVedKasse navigerte til kassevyen (/inne)' })
      .toContain('/inne')
  })
})
