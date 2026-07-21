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
