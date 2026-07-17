// ─── Balanse-konfig (tunbare tall) ───────────────────────────────────────────
// Samler «magiske tall» for spillbalanse ett sted, «lærer-klar» som dayConfig.ts
// (runde 2 kan koble et lærerdashbord hit uten å røre logikken som leser dem).

/** Klesbutikk — OPPSØKENDE SALG: hvor lenge en kunde står på et gulv-ståpunkt og
 *  venter på å bli kontaktet før hun går (og logges som tapt salg «ikke
 *  kontaktet»). Millisekunder. Tunbart. */
export const KLESBUTIKK_KONTAKT_VINDU = 12000

/** Hvor lenge kunden står før det diskrete «💬»-hintet dukker opp (ms) — gir
 *  eleven et øyeblikk til å oppdage kunden selv før spillet dytter. */
export const KLESBUTIKK_KONTAKT_HINT = 3000
