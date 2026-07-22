import { defineConfig, devices } from '@playwright/test'

// ─── FLAGG-PÅ-TESTOPPSETT — klesbutikken aktiv (KLESBUTIKK_AKTIV=1) ───────────
// Eget oppsett fordi klesbutikken bare er registrert når dev-serveren startes med
// VITE_KLESBUTIKK_AKTIV=1 (featureFlags.ts). Kjøres via `npm run spilltest:klesbutikk`.
// EGEN PORT 5177 (ikke 5173 = Espens Chrome, 5176 = kafé-spilltesten) så oppsettene
// aldri kolliderer. Verifiserer bransjebytte-geometri/kassevy/katalog + at
// avsluttesVedKasse-scenarier flytter oppgjøret til kassen — kafé-regresjonen bor
// fortsatt i playwright.config.ts (full-maaned) og kjøres med flagget AV.
export default defineConfig({
  testDir: './tests/spilltest',
  testMatch: 'klesbutikk-aktiv.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 120_000,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5177',
    headless: true,
    viewport: { width: 1440, height: 900 },
    screenshot: 'off',
    trace: 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'VITE_KLESBUTIKK_AKTIV=1 npm run dev -- --port 5177 --strictPort',
    url: 'http://localhost:5177',
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
