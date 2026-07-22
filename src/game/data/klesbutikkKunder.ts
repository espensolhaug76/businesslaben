// ─── Klesbutikk-kunder — sprite-registser for kassevy-scenen ─────────────────
// De 8 fashion-kundene splittet fra customers-ark-03/04 (raw/customers/).
// Rent presentasjonslag: id → navn + sprite + valgfri per-kunde spriteCal
// (finjustering oppå kassevy-base-konstantene, se geometry/kassevyBase.ts).
//
// KOBLING TIL SCENARIER (DEL 3) skjer i sales/klesbutikkScenarios.ts — DENNE
// fila er kun kunde-spritene + kalibrering, slik at kassevy-scenen (DEL 2) kan
// vise/kalibrere kundene UAVHENGIG av om scenariene er skrevet/aktive ennå.

import type { SpriteCal } from '../geometry/kassevyBase'

export interface KasseKunde {
  id: string
  navn: string
  sprite: string
  /** Per-kunde finjustering oppå kassevy-base (dx/dy i %-poeng, scale =
   *  multiplikator). FØRSTEPASNING — Espen finpusser/låser i ?dev=1. */
  spriteCal?: SpriteCal
}

const S = (id: string) => `/assets/raw/customers/${id}.png`

/** De 8 fashion-kundene (ark-03 + ark-04), i split-rekkefølge. `spriteCal` er
 *  ✅ LÅST av Espen 2026-07-17 (kalibrert per kunde i 💰 Kasse, ?dev=1).
 *
 *  Espen ga ABSOLUTTE per-kunde-verdier; de er kodet om til base + delta:
 *    base (districts.ts) = SCALE 1.28 · CENTER_X 50 · WAIST_Y 78 · OCCLUDE 80/79
 *    spriteCal.dx    = kundens CENTER_X − 50   (sidelengs plassering)
 *    spriteCal.scale = kundens SCALE / 1.28    (høyde)
 *  WAIST_Y + OCCLUDE var IDENTISK for alle ⇒ ren base (ingen dy). Kunder som
 *  matcher basen eksakt (ung-mann-sekk: 1.28/50) har INGEN spriteCal. */
export const KLESBUTIKK_KASSE_KUNDER: KasseKunde[] = [
  // ── ark-03 ──   (Espens absolutt-verdier i parentes)
  { id: 'dame-camel-veske',      navn: 'Dame m/camel-jakke',        sprite: S('dame-camel-veske'),      spriteCal: { dx: -17.5, scale: 0.890625 } }, // 1.14 / x32.5
  { id: 'mann-skjegg-pakke',     navn: 'Skjeggete mann m/pakke',    sprite: S('mann-skjegg-pakke'),     spriteCal: { dx: -17.5 } },                  // 1.28 / x32.5
  { id: 'forretningsdame-klokke', navn: 'Forretningsdame (hastverk)', sprite: S('forretningsdame-klokke'), spriteCal: { dx: 21 } },                  // 1.28 / x71
  { id: 'mann-strikk-mobil',     navn: 'Mann i strikkegenser',      sprite: S('mann-strikk-mobil'),     spriteCal: { dx: 21 } },                     // 1.28 / x71
  // ── ark-04 ──
  { id: 'ung-mann-sekk',         navn: 'Ung mann m/sekk',           sprite: S('ung-mann-sekk') },                                                    // 1.28 / x50 = base
  { id: 'dame-forerhund',        navn: 'Dame m/førerhund',          sprite: S('dame-forerhund'),        spriteCal: { scale: 0.96875 } },             // 1.24 / x50
  { id: 'arbeidsmann-korslagt',  navn: 'Barsk arbeidsmann',         sprite: S('arbeidsmann-korslagt'),  spriteCal: { scale: 0.96875 } },             // 1.24 / x50
  { id: 'ung-dame-skjerf',       navn: 'Ung dame m/skjerf',         sprite: S('ung-dame-skjerf'),       spriteCal: { dx: -14.5, scale: 0.765625 } }, // 0.98 / x35.5
]

export const kasseKundeById = (id: string): KasseKunde | undefined =>
  KLESBUTIKK_KASSE_KUNDER.find(k => k.id === id)
