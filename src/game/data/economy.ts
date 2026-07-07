// ─── Økonomi-hjelpere (ØKONOMI-SAMLING) ───────────────────────────────────────
// Én kilde for de faste månedskostnadene, delt av reduceren (START_NEW_DAY sitt
// månedstrekk) og Økonomi-fanen (burn/kostnader/netto), så tallene ALLTID
// stemmer overens med det som faktisk trekkes fra kassa.

import type { GameState } from '../types'

/** Fast «forsikring/div.»-post per måned (samme tall kontantstrømmen har vist). */
export const FORSIKRING_MND = 2000

/** Faste månedskostnader som FAKTISK trekkes ved månedsrull (START_NEW_DAY):
 *  husleie + lønn + forsikring + markedsføring. Lønn er 0 uten ansatte, men
 *  regelen er riktig når noen ansettes.
 *
 *  TODO (dokumentert): LÅNEAVDRAG er BEVISST ikke med her. Et avdrag skal ikke
 *  bare tømme kassa — det må også skrive ned restgjelden (amortisering), og den
 *  logikken ligger i den gamle APPLY_MONTH_RESULT-flyten (SimulationModal/PEST,
 *  urørt). Når lån kobles inn i dagssyklusen må avdrag legges til her SAMMEN med
 *  nedskriving av `loans[].remainingBalance`. */
export function manedligeFasteKostnader(
  state: Pick<GameState, 'monthlyRent' | 'monthlyPayroll' | 'marketingBudget'>,
): { linjer: { navn: string; belop: number }[]; sum: number } {
  const markedsforing = Object.values(state.marketingBudget).reduce((s, v) => s + v, 0)
  const linjer = [
    { navn: 'Husleie', belop: state.monthlyRent },
    { navn: 'Lønn', belop: state.monthlyPayroll },
    { navn: 'Forsikring/div.', belop: FORSIKRING_MND },
    { navn: 'Markedsføring', belop: markedsforing },
  ]
  return { linjer, sum: linjer.reduce((s, k) => s + k.belop, 0) }
}
