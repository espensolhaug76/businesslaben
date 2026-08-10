// ─── DEFENSIV RENDER-VAKT for vare-størrelse (kroker DEL B, 10.08) ────────────
// Espens funn: midt i en økt (ansettelse, mye dashbord av/på, aktiv autosave) ble
// først skolebrød, så surdeigsbrød rendret i RÅSTØRRELSE (~kvart skjerm) i disk-/
// interiørscenen. Undersøkelse (headless, målte bbox-er) BEVISTE mekanismen:
// vare-størrelsen = base × displayScale × sizeAdjust [× mirrorScale i speilet] og
// var UKLEMT — injisert sizeAdjust≈5 gir nøyaktig «kvart skjerm». Tap av
// `displayScale` alene gjør IKKE varen gigantisk (fallback 1.0 → ~10 %); NaN/streng
// kolapser heller ikke `<img>` til råstørrelse. Rotårsaken (én counterLayout-
// `sizeAdjust`/`displayScale` utenfor kalibrert bånd — trolig fra en legacy/hånd-
// redigert save) er INNRINGET, men IKKE bevisført fra ren spilling.
//
// Denne vakta er den midlertidige fiksen: trau-/speil-rendringen KLEMMER hver
// skala-komponent til sitt EGET kalibrerte bånd (aldri råstørrelse uansett state),
// og LOGGER én gang per vare når klemmen slår inn — så neste forekomst blir SYNLIG
// i konsollen med vare-id + kontekst (felle for endelig diagnose). Ved å klemme
// komponentene HVER FOR SEG (ikke bare produktet) kan ingen vare overstige sin egen
// kalibrerte maks: en lav-displayScale vare (croissant 0.55) blir aldri blåst opp
// til en høy-displayScale varestørrelse.
//
// Bånd: `displayScale` ∈ katalog [0.55, 1.0] → klemmes til [0.3, 1.1] (litt utenfor
// så ingen kalibrert vare kuttes). `sizeAdjust` ∈ spillerens slider [0.5, 1.5] →
// klemmes til nettopp [0.5, 1.5]. Strukturelle ledd (base/cols/mirrorScale) er
// UTENFOR — mirrorScale (2.25–2.8) forstørrer speilet med hensikt.

export const DISPLAY_SCALE_MIN = 0.3
export const DISPLAY_SCALE_MAKS = 1.1
export const SIZE_ADJUST_MIN = 0.5
export const SIZE_ADJUST_MAKS = 1.5

/** Klem `displayScale` og `sizeAdjust` til hvert sitt kalibrerte bånd og returner
 *  den samlede per-vare faktoren. `undefined` ⇒ nøytral 1.0 (legitim fallback, ingen
 *  klemme-alarm). Ikke-endelig/≤0 (NaN, negativ) ⇒ klemmes + flagges. `klemt` er kun
 *  true når en FAKTISK verdi lå utenfor båndet — så loggfella ikke fyrer på normale
 *  renders. */
export function klemVareSkala(displayScale: number | undefined, sizeAdjust: number | undefined): { faktor: number; klemt: boolean } {
  const dsGitt = displayScale != null
  const saGitt = sizeAdjust != null
  const dsRå = dsGitt ? (displayScale as number) : 1
  const saRå = saGitt ? (sizeAdjust as number) : 1
  const dsTrygg = Number.isFinite(dsRå) && dsRå > 0 ? dsRå : 1
  const saTrygg = Number.isFinite(saRå) && saRå > 0 ? saRå : 1
  const ds = Math.min(DISPLAY_SCALE_MAKS, Math.max(DISPLAY_SCALE_MIN, dsTrygg))
  const sa = Math.min(SIZE_ADJUST_MAKS, Math.max(SIZE_ADJUST_MIN, saTrygg))
  // `ds !== dsRå` fanger både utenfor-bånd og NaN (NaN !== x er alltid sann). En
  // utelatt (undefined) verdi = legitim 1.0-fallback → aldri klemme-alarm.
  const klemt = (dsGitt && ds !== dsRå) || (saGitt && sa !== saRå)
  return { faktor: ds * sa, klemt }
}

const advart = new Set<string>()

/** Logg ÉN gang per (scene, vare) at en ukalibrert størrelse ble klemt — felle for
 *  rotårsaken. Dedup så en 60 fps re-render ikke spammer konsollen. */
export function advarVareSkalaKlemt(scene: string, id: string, ctx: Record<string, unknown>): void {
  const nøkkel = `${scene}:${id}`
  if (advart.has(nøkkel)) return
  advart.add(nøkkel)
  // eslint-disable-next-line no-console
  console.warn(
    `[vareSkala] «${id}» rendret med UKALIBRERT skala i ${scene} — klemt til båndet `
    + `(displayScale [${DISPLAY_SCALE_MIN}, ${DISPLAY_SCALE_MAKS}], sizeAdjust `
    + `[${SIZE_ADJUST_MIN}, ${SIZE_ADJUST_MAKS}]). Sannsynlig rotårsak: en counterLayout-`
    + `sizeAdjust/displayScale utenfor bånd (legacy/korrupt save). Kontekst:`, ctx,
  )
}
