// ─── Kassevy-base — delt okklusjon + kunde-plassering for «bak-disken»-scener ──
//
// En stor kunde-sprite forankres på LIVLINJA bak disken; underkroppen okkluderes
// av et forgrunns-disk-lag (samme scenebilde klippet til båndet UNDER disk-kanten).
// Trukket ut som en DELT BASE (ingen import fra bransjekode) så både kafeens
// bak-disken-vy (InteriorView-mønsteret) og klesbutikkens kassevy kan bruke SAMME
// geometri med EGNE bransje-konstanter. Se docs/AUTONOM_PIPELINE.md.
//
// Koordinatmodell: ALT er i PROSENT av scenebildet (x = %bredde, y = %høyde), så
// plasseringen er oppløsnings-uavhengig og følger et responsivt scenebilde.

import type { CSSProperties } from 'react'

/** De fem bransje-konstantene som plasserer kunde + disk-okklusjon. Samme sett
 *  som kafeen (InteriorView) — bransjen leverer sine EGNE verdier. */
export interface KassevyKonstanter {
  /** Kundehøyde som andel av scenehøyden (stor = nær disken). */
  SCALE: number
  /** Kundens senter-x i % av scenebredden. */
  CENTER_X: number
  /** Kundens livlinje i % av scenehøyden (der livet møter disk-kanten). */
  WAIST_Y: number
  /** Disk-kantens y ved VENSTRE scenekant (% høyde). */
  OCCLUDE_Y_LEFT: number
  /** Disk-kantens y ved HØYRE scenekant (% høyde). En rett disk over hele
   *  bredden ⇒ venstre/høyre tilnærmet like; perspektiv-disk ⇒ ulike. */
  OCCLUDE_Y_RIGHT: number
}

/** Hvor på spriten livet sitter (andel fra toppen). Spriten forankres på
 *  livlinja, så skala vokser RUNDT livet og underkroppen alltid havner under
 *  disken — uansett skala. */
export const WAIST_FRAC = 0.46

/** Valgfri per-kunde finjustering oppå bransje-konstantene (DEL 3-spriteCal):
 *  ulike kunder har ulik høyde/positur, så livlinja/skala kan trenge et lite
 *  delta per sprite. Alt i samme enhet som konstantene (dx/dy i %-poeng, scale
 *  = multiplikator). Utelatt ⇒ ren base. */
export interface SpriteCal {
  dx?: number
  dy?: number
  scale?: number
}

/** Forgrunns-disk-lagets clip-path: KUN båndet under den (evt. skrå) linja
 *  mellom venstre/høyre disk-kant. Okkluderer kundens underkropp. */
export function occlusionClipPath(occludeYLeft: number, occludeYRight: number): string {
  return `polygon(0% ${occludeYLeft}%, 100% ${occludeYRight}%, 100% 100%, 0% 100%)`
}

/** Absolutt-plassering for kunde-spriten: forankret på livlinja (senter-x,
 *  waistY), høyde = SCALE, med valgfri per-kunde spriteCal lagt oppå. */
export function customerAnchorStyle(k: KassevyKonstanter, cal?: SpriteCal, waistFrac: number = WAIST_FRAC): CSSProperties {
  const cx = k.CENTER_X + (cal?.dx ?? 0)
  const wy = k.WAIST_Y + (cal?.dy ?? 0)
  const sc = k.SCALE * (cal?.scale ?? 1)
  return {
    position: 'absolute',
    left: `${cx}%`, top: `${wy}%`,
    height: `${sc * 100}%`, width: 'auto',
    transform: `translate(-50%, -${waistFrac * 100}%)`,
  }
}
