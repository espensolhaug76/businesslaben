// ─── FEATURE-FLAGG ───────────────────────────────────────────────────────────
// Sentrale, kompilerings-tid-konstanter for å parkere/skru på hele mekanikker.
// Ikke lærerstyrt (det er fagAktivering/espenSpor/temaAktivering via RTDB) — dette
// er PRODUKT-flagg satt av oss, dokumentert her.
//
// Hvorfor egen fil (ikke balance.ts): balance.ts er tunbare TALL for spillfølelse/
// økonomi; feature-flagg er av/på-arkitektur. Å blande dem gjør begge uklare.

/** KROK 2 STAMKUNDER — PARKERT (Espen-beslutning, fikserunde 3).
 *  Mekanikken gjenbrukes senere som et «stamkort»-markedsføringstiltak, så KODEN
 *  BEHOLDES i sin helhet (state.stamkunder, dialoger, StamkundeMoteOverlay,
 *  RESOLVE_STAMKUNDEMOTE) — den er kun gated bak dette flagget:
 *   • false ⇒ ingen stamkundemøter spawnes (OPEN_DAY planlegger dem ikke),
 *     Målgruppe-fanens «Stamkunder — kjente fjes» skjules, mentor-triggeren
 *     stamkunde_forste fyrer ikke, og ⚙-panelets stamkunde-knapper er deaktivert
 *     med teksten «Parkert — kommer som stamkort-tiltak».
 *  MERK: antallMoter/utviklingstrinn skrives fortsatt ved kundemøter (det er
 *  historikken bak ✓-markeringen i scenariovelgeren og «uspilt foretrekkes»-
 *  trekkingen) — kun RETUREN som stamkunde er slått av. */
export const STAMKUNDER_AKTIV = false

/** TEMA 15 TURISTSESONG — PARKERT (Espen-beslutning, fikserunde 3+): venter på
 *  ferdig Tema 15-innhold. KODEN BEHOLDES (turistsesong-state, scenarier,
 *  turistkontor/byhotell-scener, pakkebygger). Kun gated bak dette flagget:
 *   • false ⇒ sesongen kan ikke starte (START_TURISTSESONG er no-op, og auto-
 *     starten ved reiseliv-tema-aktivering er av), ⚙-panelets «Start turistsesong
 *     nå»/«Spol til sesongslutt» er deaktivert med «Parkert — venter på Tema
 *     15-innhold», og de sesong-relaterte mentor-triggerne armeres ikke. */
export const TURISTSESONG_AKTIV = false

/** BRANSJE 2 KLESBUTIKK — PARKERT bak flagg (skall-synk 2026-07-22): all
 *  klesbutikk-DATA (katalog, scenarier, brandPull, vareplasser, kassevy) er
 *  bygget og reconciled på main, men bransjen er IKKE reelt aktiv før dette
 *  flagget er true OG Espen har validert i Chrome. Gater:
 *   • false ⇒ KLESBUTIKK registreres IKKE i INDUSTRY_DEFINITIONS
 *     (getActiveIndustryDefinition('fashion') faller trygt til CAFE), bransje-
 *     velgeren i oppstarten viser Klesbutikk med «Kommer»-merke (ikke valgbar),
 *     og klesbutikk-scenariene er utenfor enhver aktiv scenariePool.
 *   • true ⇒ 'fashion' får sin egen geometri/katalog/scenarier; kaféen er
 *     uendret (byte-identisk — spilltesten er vakta).
 *  MERK: motorene leser nå ALLTID geometri fra aktiv IndustryDefinition (ikke
 *  fra kafé-konstanter direkte), så selve omleggingen er byte-identisk for
 *  kaféen uavhengig av dette flagget — flagget styrer kun OM 'fashion' finnes. */
// PRODUKTPORTEN — forblir false til Espen har validert i Chrome og slår den på.
// For VALIDERING i ?dev=1 finnes en lokal DEV-overstyring (⚙ DEV-panel → Bransje
// → «Klesbutikk aktiv (DEV)», persistert i localStorage, aldri delt/RTDB). ALLE
// lesere skal bruke den EFFEKTIVE verdien `klesbutikkAktiv()` (dev/devPanel.ts),
// som gir presedens DEV > dette flagget > default — ikke lese flagget direkte.
export const KLESBUTIKK_AKTIV = false
