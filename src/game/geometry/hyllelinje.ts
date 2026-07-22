// ─── Hyllelinje — portabel scene-geometri for «bakt interiør»-stillas ─────────
//
// Trukket ut av eksperiment/autonom-sport (sportsbutikken) for GJENBRUK. Ingen
// import fra bransje-/sport-spesifikk kode — kan cherry-pickes/kopieres rått inn
// i et hvilket som helst bransje-stillas (f.eks. jobb/klesbutikk) uten å dra med
// seg sport-kode. Se docs/AUTONOM_PIPELINE.md.
//
// Koordinatmodell: ALT er i PROSENT av scenebildet (x = %bredde, y = %høyde),
// slik at plasseringen er oppløsnings-uavhengig og skalerer med et responsivt
// scenebilde. Geometrifunksjonene som måler AVSTAND tar imot `aspect`
// (scenehøyde / scenebredde) så avstand blir isotrop i EKTE piksler — ellers
// ville 1 % på x-aksen ≠ 1 % på y-aksen for et ikke-kvadratisk bilde.

/** En linje langs en hyllekant i scenebildet. Skalaen (varebredde som brøk av
 *  scenebredden) interpoleres LINEÆRT langs linjen, så perspektiv-forminskning
 *  (varer lenger bak/til siden er mindre) faller ut automatisk når en vareplass
 *  snapper til linjen. */
export interface Hyllelinje {
  id: string
  x1: number; y1: number   // % — endepunkt 1
  x2: number; y2: number   // % — endepunkt 2
  scale1: number           // varebredde-brøk (0–1) ved endepunkt 1
  scale2: number           // ved endepunkt 2 (interpoleres mellom)
}

/** Ankrings-/transformopsjoner for ét plassert sprite-element. */
export interface PlassTransformOpts {
  /** true = bunn-ankret (varen STÅR på en flate); false = topp-ankret (henger). */
  bottomAnchored: boolean
  /** Rotasjon i grader. */
  rot?: number
  /** Skjærtransform i grader — gir flate sprites (brettede/hengende klær)
   *  perspektiv så de matcher bordets/stativets vinkel. */
  skewX?: number
  skewY?: number
}

const r1 = (n: number) => Math.round(n * 10) / 10
const r3 = (n: number) => Math.round(n * 1000) / 1000

/** CSS `transform` + `transformOrigin` for et ankret element. Bunn-ankret
 *  pivoterer i bunn-senter (står på flaten); topp-ankret henger fra toppunktet.
 *  Rotasjon/skjær legges på etter ankringen. */
export function plassTransform(o: PlassTransformOpts): { transform: string; transformOrigin: string } {
  const anchor = o.bottomAnchored ? 'translate(-50%, -100%)' : 'translate(-50%, -6%)'
  const rot = o.rot ?? 0, sx = o.skewX ?? 0, sy = o.skewY ?? 0
  const t = `${anchor}${rot ? ` rotate(${rot}deg)` : ''}${sx ? ` skewX(${sx}deg)` : ''}${sy ? ` skewY(${sy}deg)` : ''}`
  return { transform: t, transformOrigin: o.bottomAnchored ? '50% 100%' : '50% 50%' }
}

/** Punkt langs linjen ved parameter t∈[0,1] + interpolert skala. Brukes bl.a.
 *  til å rendre preview-varer PÅ linjen i tracer-modus. */
export function pointAlong(L: Hyllelinje, t: number): { x: number; y: number; scale: number } {
  return {
    x: L.x1 + t * (L.x2 - L.x1),
    y: L.y1 + t * (L.y2 - L.y1),
    scale: L.scale1 + t * (L.scale2 - L.scale1),
  }
}

/** Nærmeste punkt på linje-SEGMENTET til (px,py). `aspect` = scenehøyde/bredde.
 *  Returnerer parameter t, snappunkt (x,y i %), avstand (i bredde-%) og
 *  interpolert skala. */
export function projOnLine(px: number, py: number, L: Hyllelinje, aspect: number) {
  const ax = L.x1, ay = L.y1 * aspect, bx = L.x2, by = L.y2 * aspect
  const qx = px, qy = py * aspect
  const dx = bx - ax, dy = by - ay
  const len2 = dx * dx + dy * dy || 1e-6
  let t = ((qx - ax) * dx + (qy - ay) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const sx = ax + t * dx, sy = ay + t * dy
  return { t, x: sx, y: sy / aspect, dist: Math.hypot(qx - sx, qy - sy), scale: L.scale1 + t * (L.scale2 - L.scale1) }
}

/** Snapp (px,py) til nærmeste hyllelinje innen `maxDist` (bredde-%). Returnerer
 *  avrundet snappunkt + interpolert skala, eller null hvis ingen linje er nær nok. */
export function snapToLine(
  px: number, py: number, lines: Hyllelinje[], maxDist: number, aspect: number,
): { x: number; y: number; scale: number; dist: number } | null {
  let best: { x: number; y: number; scale: number; dist: number } | null = null
  for (const L of lines) {
    const p = projOnLine(px, py, L, aspect)
    if (p.dist <= maxDist && (!best || p.dist < best.dist)) best = { x: r1(p.x), y: r1(p.y), scale: r3(p.scale), dist: p.dist }
  }
  return best
}
