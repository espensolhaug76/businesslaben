import { defineConfig, devices } from '@playwright/test'

// ─── SPILLTEST — automatisert regresjonsløp (nivå 1: funksjonelt) ─────────────
// Kjører byspillet (/game) som en elev og verifiserer at kjerneløkka fungerer
// ende til ende. IKKE visuell validering (se docs/SPILLTESTER.md). Determinisme
// er et krav: single worker, ingen retries — to like løp skal gi likt resultat.
//
// PORT 5176 — BEVISST IKKE 5173: 5173 er reservert for Espens egen manuelle
// validering i Chrome, og spilltesten skal ALDRI kollidere med den. Testen
// starter sin EGEN dev-server på 5176 (strictPort). SPILLTEST_PORT overstyrer —
// nyttig når flere worktrees kjører spilltest samtidig (unngå port-kollisjon).
const SPILLTEST_PORT = process.env.SPILLTEST_PORT || '5176'
export default defineConfig({
  testDir: './tests/spilltest',
  // MERK: balansespiller.spec.ts er et MÅLEVERKTØY (økonomisk analyseløp, ~6–9 min),
  // IKKE en regresjonstest. Det holdes utenfor det raske `npm run spilltest`-løpet
  // via en filterparameter i npm-scriptet (playwright test full-maaned) — filen er
  // fortsatt kjørbar eksplisitt:
  //   npx playwright test tests/spilltest/balansespiller.spec.ts
  // Determinisme: ett løp om gangen, ingen retry-maskering av flaky feil.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: false,
  // Rikelig timeout: ett monolittisk løp spiller en hel måned (12 dager) + 49
  // steg med reloads via tidsbroen. Hele løpet må få plass innenfor denne. Hevet
  // 600k→900k etter at fiksrundene vokste sekvensen (43→49 steg, tyngre oppsett).
  timeout: 900_000,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${SPILLTEST_PORT}`,
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
    command: `npm run dev -- --port ${SPILLTEST_PORT} --strictPort`,
    url: `http://localhost:${SPILLTEST_PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
