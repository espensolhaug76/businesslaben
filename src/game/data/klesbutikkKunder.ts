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
 *  FØRSTEPASNING (CC-kalibrert mot kassevy-scenen) — tomt = ren base.
 *
 *  spriteCal-FØRSTEPASNING (skjermbilde-løkke, alle 8 rendret i kassevy-scenen):
 *  den delte base-kalibreringen (districts.ts KLESBUTIKK_KASSE_*) traff ALLE 8
 *  kundene rent — ingen svever/synker, alle okkluderes ved disk-kanten. Derfor er
 *  `spriteCal` UTELATT (= ren base) på alle i første pass. Feltet står klart:
 *  Espen legger inn per-kunde dx/dy/scale i 🎚️-panelet (💰 Kasse, ?dev=1) der en
 *  spesifikk kunde trenger finjustering. */
export const KLESBUTIKK_KASSE_KUNDER: KasseKunde[] = [
  // ── ark-03 ──
  { id: 'dame-camel-veske',      navn: 'Dame m/camel-jakke',        sprite: S('dame-camel-veske') },
  { id: 'mann-skjegg-pakke',     navn: 'Skjeggete mann m/pakke',    sprite: S('mann-skjegg-pakke') },
  { id: 'forretningsdame-klokke', navn: 'Forretningsdame (hastverk)', sprite: S('forretningsdame-klokke') },
  { id: 'mann-strikk-mobil',     navn: 'Mann i strikkegenser',      sprite: S('mann-strikk-mobil') },
  // ── ark-04 ──
  { id: 'ung-mann-sekk',         navn: 'Ung mann m/sekk',           sprite: S('ung-mann-sekk') },
  { id: 'dame-forerhund',        navn: 'Dame m/førerhund',          sprite: S('dame-forerhund') },
  { id: 'arbeidsmann-korslagt',  navn: 'Barsk arbeidsmann',         sprite: S('arbeidsmann-korslagt') },
  { id: 'ung-dame-skjerf',       navn: 'Ung dame m/skjerf',         sprite: S('ung-dame-skjerf') },
]

export const kasseKundeById = (id: string): KasseKunde | undefined =>
  KLESBUTIKK_KASSE_KUNDER.find(k => k.id === id)
