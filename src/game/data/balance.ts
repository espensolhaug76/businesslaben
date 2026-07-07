// ─── BALANSE — bakgrunnssalg (BAKGRUNNSSALG-oppgaven) ─────────────────────────
// ÉN fil å justere. Alle tall som styrer den passive kundestrømmen bor her, så
// Espen kan finpusse balansen ETTER spilltest uten å røre motoren
// (backgroundSales.ts / GameContext). MÅL: en rimelig drevet kafé (godt lager,
// fornuftige priser, rykte ~55, sentrum-l2) skal lande ~3 000–5 000 kr i
// dagsmargin → månedsresultat rundt null mot ~47 000 faste.

export const BALANCE = {
  /** Global skala for HELE bakgrunnstrafikken — skru volumet opp/ned samlet. */
  baseMultiplier: 1.0,

  /** Bakgrunnstrafikk (kunder/dag) per lokale FØR faktorer. Sentral/dyr
   *  beliggenhet = høyere; sentrum-l2 (midt i gågata) høyest. Ukjent lokale
   *  faller til basetrafikkDefault. Nøklet på lokale-id (se districts.ts). */
  basetrafikk: {
    'sentrum-l2': 110, // Gågata 12 — mest gjennomgangstrafikk
    'sentrum-l5': 100, // Torggata 1 (premium hjørne)
    'sentrum-l1': 95,  // Hjørnelokalet ved torget
    'sentrum-l6': 78,  // Torggata 3
    'sentrum-l3': 72,  // Gågata 14
    'sentrum-l7': 58,  // Torggata 5
    'sentrum-l4': 52,  // Gågata 16
    'stasjon-l1': 72, 'stasjon-l5': 70, 'stasjon-l2': 60, 'stasjon-l6': 56,
    'stasjon-l3': 52, 'stasjon-l7': 48, 'stasjon-l4': 44, 'stasjon-l8': 42,
  } as Record<string, number>,
  basetrafikkDefault: 50,

  /** Prisfaktor = klem(snitt recommended / snitt retail, min, max). Priser LIK
   *  anbefalt ⇒ 1,0; dyrere ⇒ færre kunder; billigere ⇒ flere. */
  prisMin: 0.7,
  prisMax: 1.15,

  /** Eksponeringsfaktor fra andel fylte display-plasser (trau + vindu med
   *  lager). eksponeringReferanse = antall fylte plasser som gir FULL
   *  eksponering (klemt mot max). */
  eksponeringMin: 0.7,
  eksponeringMax: 1.15,
  eksponeringReferanse: 4,

  /** Markedsføringsfaktor = klem(1 + mnd-budsjett / skala, min, max). */
  markedsforingMin: 1.0,
  markedsforingMax: 1.3,
  markedsforingSkala: 100_000, // budsjett 30 000 ⇒ +0,30 ⇒ maks

  /** Hver bakgrunnskunde kjøper 1–2 varer: P(2 varer), ellers 1. */
  sannsynlighetToVarer: 0.5,
}
