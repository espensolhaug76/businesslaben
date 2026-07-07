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
// NB — PROFIL-ARKET MANGLER: «heng profil»-arket (logisk 03) ble aldri levert
// (fysisk ark 05 var en duplikat av 04). Derfor er `spriteHengProfil` TOM for
// alle plagg foreløpig, og KlesbutikkStillas faller tilbake til `spriteHengFront`
// på stativ-plassene. Når profil-arket kommer: splitt det (navn = <id>-p) og
// sett spriteHengProfil: P(id + '-p') for heng-plaggene under.

export interface Plagg {
  id: string
  navn: string
  spriteHengFront?: string
  spriteHengProfil?: string
  spriteBrett?: string
  spriteAntrekk?: string
}

const P = (n: string) => `/assets/raw/klar/${n}.png`
const navnAv = (id: string) => id.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())

// Hengende plagg (forfra) — dame, herre, barn, vinter, sommer. Kan snappes til
// heng-plasser (stativ / lite stativ). Profil-variant mangler (se filkommentar).
const HENG_IDS = [
  'bluse', 'cardigan-dame', 'blazer-dame', 'maxikjole', 'denimskjort', 'trenchcoat', 'strikkekjole', 'dunvest-dame',
  'denimjakke', 'hvit-skjorte', 'graa-genser', 'brun-genser', 'sommerkjole', 'hoodie', 'blaa-genser', 'ullfrakk',
  'regnjakke-barn', 'hoodie-barn', 'denimjakke-barn', 'genser-barn', 'sommerkjole-barn', 'parkas-barn', 'tskjorte-barn', 'kjeledress-barn',
  'dunparkas', 'ullkaape', 'skijakke', 'fleecejakke', 'tykk-genser', 'dunjakke', 'softshell', 'vattert-vest',
  'linskjorte', 'sommerkjole-2', 'badeshorts', 'tskjorte', 'bomberjakke', 'singlet', 'linbukse', 'kimono',
]

// Brettede stabler — brett-plasser (hylle / bord / podiumbord).
const BRETT_IDS = [
  't-skjorter-stabel', 'jeans-stabel', 'gensere-stabel', 'cardigan-stabel',
  'skjorter-stabel', 'chinos-stabel', 'hoodies-stabel', 'flanell-stabel', 'shorts-stabel', 'cardigans-stabel', 'skjerf-stabel', 'luer-stabel',
]

// Antrekk — antrekk-plasser (dukke / dukke-mann / dukke-barn); rendres over dukka.
const ANTREKK_IDS = [
  'casual-antrekk', 'dress-antrekk', 'sport-antrekk-1', 'sport-antrekk-2',
  'casual-dame', 'business-dame', 'sommer-dame', 'vinter-dame', 'casual-barn', 'sport-barn', 'sommer-barn-antrekk', 'vinter-barn-antrekk',
]

export const KLESBUTIKK_PLAGG: Plagg[] = [
  ...HENG_IDS.map(id => ({ id, navn: navnAv(id), spriteHengFront: P(id) })),
  ...BRETT_IDS.map(id => ({ id, navn: navnAv(id), spriteBrett: P(id) })),
  ...ANTREKK_IDS.map(id => ({ id, navn: navnAv(id), spriteAntrekk: P(id) })),
]

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
