// ─── TEMA 2 BUDSJETT + TEMA 3 NØKKELTALL — delt datalag ──────────────────────
// ÉN kilde for budsjettlinjene, avviks-regningen (DEL 3d: ETT sted, testbart)
// og de bokførte nøkkeltallene. Prinsipp (brannalarm-modellen): spillet retter
// ALDRI elevens tall; konsekvens + refleksjon ETTERPÅ. Nivåregler (LK20):
//  • VG1 ser ALDRI nøkkeltall/prosent — bare «tjente du penger, traff du planen?»
//  • Avvik vises alltid med FORTEGN + TEKST (Espen er fargesvak), aldri farge alene.

import type { MonthSettlement } from '../types'

// ── De SYV faste budsjettlinjene (ingen frie linjer på VG1). Rekkefølge = visning.
// «Eierlønn» (REKALIBRERING pkt. 35) er lagt til som fast linje etter «Lønn» —
// eierens egen lønn er aldri gratis. Forhåndsutfylt + redigerbar i UI-et.
export const BUDSJETT_LINJER = [
  { key: 'salgsinntekter', navn: 'Salgsinntekter', slag: 'inntekt' as const },
  { key: 'varekjop',       navn: 'Varekjøp',       slag: 'kostnad' as const },
  { key: 'lonn',           navn: 'Lønn',           slag: 'kostnad' as const },
  { key: 'eierlonn',       navn: 'Eierlønn',       slag: 'kostnad' as const },
  { key: 'husleie',        navn: 'Husleie',        slag: 'kostnad' as const },
  { key: 'markedsforing',  navn: 'Markedsføring',  slag: 'kostnad' as const },
  { key: 'laan',           navn: 'Lån',            slag: 'kostnad' as const },
] as const

export type BudsjettLinjeKey = typeof BUDSJETT_LINJER[number]['key']
export type BudsjettTall = Record<BudsjettLinjeKey, number>

export const TOM_BUDSJETT: BudsjettTall = { salgsinntekter: 0, varekjop: 0, lonn: 0, eierlonn: 0, husleie: 0, markedsforing: 0, laan: 0 }

/** Ett måneds-budsjett i state.budsjett.maaneder (nøkkel: maanedNokkel). */
export interface BudsjettMaaned {
  budsjett: BudsjettTall
  /** Låst ved månedsoppgjøret (kan ikke endres etterpå). */
  laastVedOppgjor: boolean
  /** VG2: fritekst «Hva tror du skjedde?» per stor-avvikslinje (linjeKey → svar). */
  avvikNotater: Record<string, string>
}
export interface BudsjettState {
  maaneder: Record<string, BudsjettMaaned>
}

/** TEMA 3 (VG2): elevens EGNE utregnede nøkkeltall for én måned. */
export interface NokkeltallSvar {
  bruttofortjeneste: number
  dekningsgrad: number
  resultatgrad: number
}

/** Nøkkel for en måned i state.budsjett/state.nokkeltall: «aar1-mnd2». */
export function maanedNokkel(aar: number, maaned: number): string { return `aar${aar}-mnd${maaned}` }

/** De FAKTISKE tallene for de seks linjene, hentet fra månedsoppgjøret (ETT sted). */
export function faktiskeLinjer(s: MonthSettlement): BudsjettTall {
  const kl = (navn: string) => s.kostnadslinjer.find(k => k.navn === navn)?.belop ?? 0
  return {
    salgsinntekter: s.salgInntektBrutto,
    varekjop:       s.varekjop,
    lonn:           kl('Lønn'),
    eierlonn:       kl('Eierlønn (din lønn)'),
    husleie:        kl('Husleie'),
    markedsforing:  kl('Markedsføring'),
    laan:           s.laanRenter + s.laanAvdrag,
  }
}

/** Avvik for én linje = faktisk − budsjett (positivt = over budsjett). DEL 3d: ETT sted. */
export function linjeAvvik(budsjett: number, faktisk: number): number { return faktisk - budsjett }

/** Fortegn + tekst — ALDRI farge alene (Espen er fargesvak). */
export function avvikTekst(avvik: number): string {
  if (Math.round(avvik) === 0) return 'på budsjett'
  const abs = Math.abs(Math.round(avvik)).toLocaleString('nb-NO')
  return avvik > 0 ? `+${abs} kr over budsjett` : `−${abs} kr under budsjett`
}

/** Planlagt resultat fra elevens budsjett (inntekt − alle kostnadslinjer). */
export function planlagtResultat(b: BudsjettTall): number {
  return b.salgsinntekter - (b.varekjop + b.lonn + b.eierlonn + b.husleie + b.markedsforing + b.laan)
}

/** Er linjas avvik «stort» (VG2 avviks-notat + mentor)? Terskel tunbar i balance.ts. */
export function erStortAvvik(budsjett: number, faktisk: number, terskel: { prosent: number; minKr: number }): boolean {
  const a = Math.abs(linjeAvvik(budsjett, faktisk))
  if (a < terskel.minKr) return false
  const basis = Math.abs(budsjett) > 0 ? Math.abs(budsjett) : Math.abs(faktisk)
  return basis > 0 && (a / basis) * 100 >= terskel.prosent
}

// ── TEMA 3 NØKKELTALL (VG2) — bokførte fasit-verdier fra oppgjøret ────────────
export interface BokfortNokkeltall {
  omsetning: number
  bruttofortjeneste: number   // omsetning − varekjøp
  dekningsgrad: number        // bruttofortjeneste / omsetning × 100
  resultatgrad: number        // månedsresultat / omsetning × 100
}
export function bokfortNokkeltall(s: MonthSettlement): BokfortNokkeltall {
  const oms = s.salgInntektBrutto
  const bf = oms - s.varekjop
  return {
    omsetning: oms,
    bruttofortjeneste: bf,
    dekningsgrad: oms > 0 ? (bf / oms) * 100 : 0,
    resultatgrad: oms > 0 ? (s.resultat / oms) * 100 : 0,
  }
}

// ── Hub-lenker (📚 Lær mer) — åpnes ALLTID i ny fane (navigasjonsvakten) ──────
export const BUDSJETT_HUB: Record<'vg1' | 'vg2', { rute: string; navn: string }[]> = {
  vg1: [{ rute: '/learning/forretningsdrift/budgeting', navn: 'Budsjettering' }],
  vg2: [
    { rute: '/learning/forretningsdrift/budgeting', navn: 'Budsjettering' },
    { rute: '/learning/vg2/okonomi/regnskapsanalyse', navn: 'Regnskapsanalyse' },
  ],
}
export const NOKKELTALL_HUB: { rute: string; navn: string }[] = [
  { rute: '/learning/vg2/okonomi/nokkeltall-lonnsomhet', navn: 'Nøkkeltall og lønnsomhet' },
  { rute: '/learning/vg2/okonomi/pris-og-kalkulasjon', navn: 'Pris og kalkulasjon' },
]
