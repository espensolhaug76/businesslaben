import { defineConfig, devices } from '@playwright/test'

// ─── SPILLTEST — automatisert regresjonsløp (nivå 1: funksjonelt) ─────────────
// Kjører byspillet (/game) som en elev og verifiserer at kjerneløkka fungerer
// ende til ende. IKKE visuell validering (se docs/SPILLTESTER.md). Determinisme
// er et krav: single worker, ingen retries — to like løp skal gi likt resultat.
//
// PORT 5176 — BEVISST IKKE 5173: 5173 er reservert for Espens egen manuelle
// validering i Chrome, og spilltesten skal ALDRI kollidere med den. Testen
// starter sin EGEN dev-server på 5176 (strictPort).
export default defineConfig({
  testDir: './tests/spilltest',
  // Determinisme: ett løp om gangen, ingen retry-maskering av flaky feil.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: false,
  // Rikelig timeout: ett monolittisk løp spiller en hel måned (12 dager) med
  // reloads via tidsbroen. Hele løpet må få plass innenfor denne.
  timeout: 300_000,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5176',
    headless: true,
    viewport: { width: 1440, height: 900 },
    // Egne skjermbilder tas ved FAIL i harness-en (docs/rapporter/spilltest-feil/).
    screenshot: 'off',
    trace: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Starter sin EGEN dev-server på 5176 (strictPort) — ALDRI 5173 (Espens
  // valideringsport). reuseExistingServer: gjenbruk en 5176-server hvis en test
  // alt lot en stå (raskere iterasjon); ellers startes en fersk.
  webServer: {
    command: 'npm run dev -- --port 5176 --strictPort',
    url: 'http://localhost:5176',
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
