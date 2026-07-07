// ─── Klesbutikk-inventar (BRANSJE 2, jobb/klesbutikk) ────────────────────────
//
// Definisjonene for de 8 splittede møbel-spritene: sprite, standardstørrelse og
// VAREPLASS-MODELLEN (hvor plagg kan henge/ligge/kles på). Datalaget er bevisst
// skilt fra komponenten (KlesbutikkStillas) — kapasitet og plass-geometri er
// TUNBAR DATA her, ikke hardkodet i render-koden.
//
// Vareplassene er normaliserte punkter (0–1) INNENFOR møbelets egen sprite-boks.
// Fordi KlesbutikkStillas rendrer hvert møbel som en boks med satt bredde og
// auto høyde (bildeforhold), og plassmarkørene er absolutte barn i den boksen,
// FØLGER plassene møbelets plasserte geometri og SKALERER med størrelsen helt av
// seg selv — ingen sone-matematikk i komponenten.
//
// NB: y/xFrom/xTo er GROVE øyemål av hvor stanga/hyllene/torsoen sitter i hver
// sprite. De er tunbare og skal syns-valideres av Espen via ?dev=1-markørene på
// /dev/klesbutikk — juster tallene her til markørene sitter riktig.
//
// NESTE JOBB: plagg-sprites auto-snapper til plassene etter `type`
// ('heng' = hengende, 'brett' = brettet/liggende, 'antrekk' = kledd på dukke).

import type { KlesbutikkFixtureId } from '../types'

export type VareplassType = 'heng' | 'brett' | 'antrekk'

/** Én ferdig utregnet vareplass — normalisert punkt (0–1) i møbelets sprite-boks. */
export interface Vareplass {
  x: number
  y: number
  type: VareplassType
}

/** En rad med jevnt fordelte plasser. `count` = TUNBAR kapasitet for raden. */
interface SlotRow {
  type: VareplassType
  /** Vertikal posisjon (0 = topp, 1 = bunn) i møbelets sprite-boks. */
  y: number
  /** Horisontalt spenn plassene fordeles jevnt over. */
  xFrom: number
  xTo: number
  /** Antall plasser i raden (kapasitet). `1` sentreres på (xFrom+xTo)/2. */
  count: number
}

export interface KlesbutikkFixtureDef {
  id: KlesbutikkFixtureId
  navn: string
  sprite: string
  /** Standardbredde som brøk av butikkvegg-sonens bredde (før `scale`). */
  baseWFrac: number
  /** Vareplass-rader (tunbar geometri + kapasitet). */
  slotRows: SlotRow[]
}

const S = (n: string) => `/assets/raw/fixtures/${n}.png`

export const KLESBUTIKK_FIXTURES: KlesbutikkFixtureDef[] = [
  {
    id: 'stativ', navn: 'Klesstativ', sprite: S('stativ'), baseWFrac: 0.52,
    // Hengeplasser jevnt langs stanga nær toppen.
    slotRows: [{ type: 'heng', y: 0.16, xFrom: 0.12, xTo: 0.88, count: 6 }],
  },
  {
    id: 'stativ-liten', navn: 'Lite stativ', sprite: S('stativ-liten'), baseWFrac: 0.34,
    slotRows: [{ type: 'heng', y: 0.18, xFrom: 0.14, xTo: 0.86, count: 4 }],
  },
  {
    id: 'hylle', navn: 'Hylle', sprite: S('hylle'), baseWFrac: 0.5,
    // Tre hylleplan, brettede plagg på hvert.
    slotRows: [
      { type: 'brett', y: 0.33, xFrom: 0.14, xTo: 0.86, count: 4 },
      { type: 'brett', y: 0.60, xFrom: 0.14, xTo: 0.86, count: 4 },
      { type: 'brett', y: 0.86, xFrom: 0.14, xTo: 0.86, count: 4 },
    ],
  },
  {
    id: 'bord', navn: 'Bord', sprite: S('bord'), baseWFrac: 0.46,
    // Få eksponeringsplasser på bordplata.
    slotRows: [{ type: 'brett', y: 0.30, xFrom: 0.18, xTo: 0.82, count: 3 }],
  },
  {
    id: 'bord-podium', navn: 'Podiumbord', sprite: S('bord-podium'), baseWFrac: 0.46,
    // Podium på toppen (1 blikkfang) + få plasser på bordplata.
    slotRows: [
      { type: 'brett', y: 0.12, xFrom: 0.5, xTo: 0.5, count: 1 },
      { type: 'brett', y: 0.44, xFrom: 0.2, xTo: 0.8, count: 3 },
    ],
  },
  {
    id: 'dukke', navn: 'Dukke (dame)', sprite: S('dukke'), baseWFrac: 0.16,
    slotRows: [{ type: 'antrekk', y: 0.42, xFrom: 0.5, xTo: 0.5, count: 1 }],
  },
  {
    id: 'dukke-mann', navn: 'Dukke (herre)', sprite: S('dukke-mann'), baseWFrac: 0.18,
    slotRows: [{ type: 'antrekk', y: 0.40, xFrom: 0.5, xTo: 0.5, count: 1 }],
  },
  {
    id: 'dukke-barn', navn: 'Dukke (barn)', sprite: S('dukke-barn'), baseWFrac: 0.12,
    slotRows: [{ type: 'antrekk', y: 0.46, xFrom: 0.5, xTo: 0.5, count: 1 }],
  },
]

const BY_ID: Record<string, KlesbutikkFixtureDef> =
  Object.fromEntries(KLESBUTIKK_FIXTURES.map(f => [f.id, f]))

export function fixtureDef(id: KlesbutikkFixtureId): KlesbutikkFixtureDef | undefined {
  return BY_ID[id]
}

/** Utleder de faktiske vareplassene fra slot-radene (jevn fordeling langs hver
 *  rad). Rekkefølge = rad for rad, venstre → høyre. */
export function vareplasser(def: KlesbutikkFixtureDef): Vareplass[] {
  const out: Vareplass[] = []
  for (const row of def.slotRows) {
    for (let i = 0; i < row.count; i++) {
      const x = row.count === 1
        ? (row.xFrom + row.xTo) / 2
        : row.xFrom + (i * (row.xTo - row.xFrom)) / (row.count - 1)
      out.push({ x, y: row.y, type: row.type })
    }
  }
  return out
}

/** Samlet vareplass-kapasitet for et møbel. */
export function kapasitet(def: KlesbutikkFixtureDef): number {
  return def.slotRows.reduce((n, r) => n + r.count, 0)
}
