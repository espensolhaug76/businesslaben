// ─── Klesbutikk-PLAGG (BRANSJE 2, jobb/klesbutikk) — presentasjonslag ─────────
//
// Registrerer de splittede plagg-spritene (public/assets/raw/klar/). Rent
// PRESENTASJONSLAG: ingen katalog/lager/pris-kobling ennå (kommer med
// docs/BRANSJE2_LEVERANDORER.md). Et plagg kan ha flere sprite-varianter etter
// hvordan det eksponeres:
//   spriteHengFront  — hengende, forfra  (heng-plass, front)
//   spriteHengProfil — hengende, i profil (heng-plass på stativ; se NB under)
//   spriteBrett      — brettet/liggende   (brett-plass på hylle/bord)
//   spriteAntrekk    — kledd på dukke      (antrekk-plass, rendret over dukka)
//
// PROFIL-VARIANT (NB-pilot underveis): «heng profil»-sprites leveres arkvis. De
// FØRSTE 4 finnes nå (klar-profil-ark-04, HERRE) og er egne oppføringer med KUN
// `spriteHengProfil` (se PROFIL_HERRE_IDS) — de snapper til profil-heng-plasser
// (Vareplass variant='profil'). De ØVRIGE HENG_IDS har fortsatt tom
// spriteHengProfil; `spriteFor(..,'profil')` faller tilbake til front-spriten som
// dev-placeholder til flere profil-ark kommer. Nye profil-ark: splitt med
// scripts/split-profil-ark.py og legg id-ene til under.

/** Passform for et antrekk på en dukke — SKULDER-ANKRET (antrekket henger fra
 *  skuldrene, ikke sentrert). `offsetX/offsetY` er brøk av dukke-boksen fra
 *  grunnlinja, `scale` er multiplikator på antrekkets grunnbredde. */
export interface Fit { offsetX: number; offsetY: number; scale: number }
export const NULL_FIT: Fit = { offsetX: 0, offsetY: 0, scale: 1 }

/** Dukketypene (ulike kropper ⇒ kan trenge ulik fit). */
export type DukkeType = 'dukke' | 'dukke-mann' | 'dukke-barn'

/** Kalibrert passform for ETT antrekk. `perDukke` overstyrer `default` for
 *  dukketyper med annen kropp (dame/herre/barn). */
export interface AntrekkFit {
  default: Fit
  perDukke?: Partial<Record<DukkeType, Fit>>
}

export interface Plagg {
  id: string
  navn: string
  spriteHengFront?: string
  spriteHengProfil?: string
  spriteBrett?: string
  spriteAntrekk?: string
  /** Kun antrekk: kalibrert passform (dev-kalibratoren, ?dev=1). */
  antrekkFit?: AntrekkFit
}

const P = (n: string) => `/assets/raw/klar/${n}.png`
const PP = (n: string) => `/assets/raw/klar-profil/${n}.png`   // heng PROFIL
const navnAv = (id: string) => id.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())

// Hengende plagg (forfra) — dame, herre, barn, vinter, sommer. Front-variant;
// snapper til front-heng-plasser. (Profil-variant: se PROFIL_HERRE_IDS under.)
const HENG_IDS = [
  'bluse', 'cardigan-dame', 'blazer-dame', 'maxikjole', 'denimskjort', 'trenchcoat', 'strikkekjole', 'dunvest-dame',
  'denimjakke', 'hvit-skjorte', 'graa-genser', 'brun-genser', 'sommerkjole', 'hoodie', 'blaa-genser', 'ullfrakk',
  'regnjakke-barn', 'hoodie-barn', 'denimjakke-barn', 'genser-barn', 'sommerkjole-barn', 'parkas-barn', 'tskjorte-barn', 'kjeledress-barn',
  'dunparkas', 'ullkaape', 'skijakke', 'fleecejakke', 'tykk-genser', 'dunjakke', 'softshell', 'vattert-vest',
  'linskjorte', 'sommerkjole-2', 'badeshorts', 'tskjorte', 'bomberjakke', 'singlet', 'linbukse', 'kimono',
]

// HENG PROFIL (klar-profil-ark-04) — 4 HERRE-plagg hengende i profil på bøyle.
// Egne oppføringer med KUN `spriteHengProfil` → snapper bare til profil-heng-
// plasser (variant='profil'). (Front-variant finnes ikke for disse.)
const PROFIL_HERRE_IDS = [
  'frakk-morkgraa', 'strikkegenser-marine', 'flanellskjorte-brun', 'bomberjakke-svart',
]

// Brettede stabler — brett-plasser (hylle / bord / podiumbord).
const BRETT_IDS = [
  't-skjorter-stabel', 'jeans-stabel', 'gensere-stabel', 'cardigan-stabel',
  'skjorter-stabel', 'chinos-stabel', 'hoodies-stabel', 'flanell-stabel', 'shorts-stabel', 'cardigans-stabel', 'skjerf-stabel', 'luer-stabel',
]

// Brettede stabler HERRE (klesark-10) — nye brett-plagg (merket herre).
const BRETT_HERRE_IDS = [
  'jeans-mork', 'tskjorter-marine-graa', 'gensere-jordtoner', 'flanell-rutet',
]

// ANTREKK-PLAGG (ghost-antrekk) er FJERNET fra paletten/plaggdata: rendret over
// naken dukke avslørte illusjonen (grå kropp skinte gjennom). Erstattet av
// PÅKLEDDE DUKKER (src/game/data/klesbutikkDukker.ts) som bytter ut den nakne
// dukke-spriten. Sprite-FILENE (casual-antrekk.png osv.) blir liggende i klar/
// for senere omdisponering (f.eks. vindusutstilling). `Fit`/`AntrekkFit`/
// `baseFit` + `spriteAntrekk`-feltet beholdes i koden (brukes ikke i dukke-
// bytte-pathen, men ikke slettet — jf. oppdrag).

export const KLESBUTIKK_PLAGG: Plagg[] = [
  ...HENG_IDS.map(id => ({ id, navn: navnAv(id), spriteHengFront: P(id) })),
  ...PROFIL_HERRE_IDS.map(id => ({ id, navn: navnAv(id), spriteHengProfil: PP(id) })),
  ...BRETT_IDS.map(id => ({ id, navn: navnAv(id), spriteBrett: P(id) })),
  ...BRETT_HERRE_IDS.map(id => ({ id, navn: navnAv(id), spriteBrett: P(id) })),
]

/** Grunnlinje-passform for et antrekk på en gitt dukketype. */
export function baseFit(p: Plagg | undefined, dukke: DukkeType): Fit {
  const af = p?.antrekkFit
  if (!af) return NULL_FIT
  return af.perDukke?.[dukke] ?? af.default
}

const BY_ID: Record<string, Plagg> = Object.fromEntries(KLESBUTIKK_PLAGG.map(p => [p.id, p]))
export const plaggById = (id: string): Plagg | undefined => BY_ID[id]

import type { VareplassType } from './klesbutikkFixtures'

/** Spriten et plagg viser på en gitt vareplass-type. `variant` gjelder kun for
 *  heng ('profil' på stativ, 'front' ellers) og faller tilbake til front når
 *  profil-spriten mangler. Returnerer undefined hvis plagget ikke passer typen. */
export function spriteFor(p: Plagg, type: VareplassType, variant?: 'front' | 'profil'): string | undefined {
  if (type === 'heng') return variant === 'profil' ? (p.spriteHengProfil ?? p.spriteHengFront) : p.spriteHengFront
  if (type === 'brett') return p.spriteBrett
  return p.spriteAntrekk
}

/** Passer plagget på en vareplass av denne typen? (har det en sprite for den). */
export function passerType(p: Plagg, type: VareplassType): boolean {
  if (type === 'heng') return !!(p.spriteHengFront || p.spriteHengProfil)
  if (type === 'brett') return !!p.spriteBrett
  return !!p.spriteAntrekk
}

// ── HENG-VARIANT: front vs profil ────────────────────────────────────────────
// NB-PILOT: profil-heng-SPRITENE (`spriteHengProfil`) finnes IKKE ennå — feltet
// er klargjort, men tomt for alle plagg. `spriteFor(..,'profil')` faller tilbake
// til front-spriten som MIDLERTIDIG DEV-PLACEHOLDER (så profil-plasser rendrer/
// forhåndsvises uten manglende bilde). Snap-KAPASITETEN under bruker derimot den
// EKTE profil-spriten (ikke placeholder), så profil-plasser avviser front-plagg
// til ekte profil-sprites lander.
//
// DEV-PLACEHOLDER-BRYTER: sett til true for å la profil-plasser midlertidig ta
// imot vanlige heng-plagg (rendret med front-spriten) — nyttig for å pilotere
// profil-flyten visuelt FØR ekte sprites finnes. Default false = ekte oppførsel
// (profil-plass tom til profil-sprite finnes; front-plagg avvises).
export const PROFIL_PLACEHOLDER = false

/** Støtter plagget en gitt heng-variant? 'front' = har front-sprite; 'profil' =
 *  har ekte profil-sprite (eller placeholder-bryteren er på). Brukes av snap-
 *  filteret så profil-plasser kun tar profil-plagg og front-plasser kun front. */
export function plaggStøtterHengVariant(p: Plagg, variant: 'front' | 'profil'): boolean {
  if (variant === 'front') return !!p.spriteHengFront
  return !!p.spriteHengProfil || (PROFIL_PLACEHOLDER && !!p.spriteHengFront)
}
