import { defineConfig, devices } from '@playwright/test'

// ─── SPILLTEST — automatisert regresjonsløp (nivå 1: funksjonelt) ─────────────
// Kjører byspillet (/game) som en elev og verifiserer at kjerneløkka fungerer
// ende til ende. IKKE visuell validering (se docs/SPILLTESTER.md). Determinisme
// er et krav: single worker, ingen retries — to like løp skal gi likt resultat.
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
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1440, height: 900 },
    // Egne skjermbilder tas ved FAIL i harness-en (docs/rapporter/spilltest-feil/).
    screenshot: 'off',
    trace: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Starter dev-serveren selv hvis den ikke alt kjører (strictPort 5173).
  // reuseExistingServer: bruk en allerede kjørende server (raskere iterasjon).
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
