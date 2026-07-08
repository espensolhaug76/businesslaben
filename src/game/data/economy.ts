// ─── Økonomi-hjelpere (ØKONOMI-SAMLING) ───────────────────────────────────────
// Én kilde for de faste månedskostnadene, delt av reduceren (START_NEW_DAY sitt
// månedstrekk) og Økonomi-fanen (burn/kostnader/netto), så tallene ALLTID
// stemmer overens med det som faktisk trekkes fra kassa.

import type { GameState, Loan } from '../types'

/** Fast «forsikring/div.»-post per måned (samme tall kontantstrømmen har vist). */
export const FORSIKRING_MND = 2000

/** Resultatet av ÉN måneds nedbetaling på alle lån (LÅNEAVDRAG). Rente og avdrag
 *  (hovedstol) er skilt, siden lånemodellen alt skiller dem. `betaling` er de
 *  faktiske kronene ut av kassa denne måneden (= rente + avdrag). */
export interface AmortiseringsResultat {
  /** Oppdaterte lån (nedbetalte lån — restgjeld 0 — er fjernet). */
  loans: Loan[]
  /** Sum renter betalt denne måneden. */
  renteSum: number
  /** Sum avdrag (nedbetaling av hovedstol) denne måneden. */
  avdragSum: number
  /** Faktisk beløp ut av kassa (rente + avdrag). Siste måned kan være mindre
   *  enn `monthlyPayment` når restgjelda ikke fyller et helt avdrag. */
  betaling: number
}

/** Nedbetal alle aktive lån ÉN måned (LÅNEAVDRAG — flagget TODO, nå implementert).
 *  ENESTE amortiseringskilde: både dagssyklusens månedsrull (START_NEW_DAY) og
 *  den gamle månedssimuleringen (APPLY_MONTH_RESULT) kaller denne, så beregningen
 *  aldri dupliseres eller kjøres dobbelt. Ren funksjon (ingen bivirkninger).
 *
 *  Modell (uendret — bygger IKKE ny rentemodell): rente = restgjeld ×
 *  årsrente / 12; avdrag = månedlig betaling − rente, men aldri mer enn
 *  restgjelda (siste betaling). Et lån med restgjeld 0 slutter å trekke (fjernes). */
export function amortiserLaan(loans: Loan[]): AmortiseringsResultat {
  let renteSum = 0
  let avdragSum = 0
  const updated = loans.map(loan => {
    if (loan.remainingBalance <= 0) return loan
    const rente = loan.remainingBalance * loan.interestRate / 12
    const avdrag = Math.min(loan.monthlyPayment - rente, loan.remainingBalance)
    renteSum += rente
    avdragSum += avdrag
    return {
      ...loan,
      remainingBalance: Math.max(0, loan.remainingBalance - avdrag),
      monthsRemaining: Math.max(0, loan.monthsRemaining - 1),
      totalInterestPaid: loan.totalInterestPaid + rente,
    }
  }).filter(l => l.remainingBalance > 0)
  return {
    loans: updated,
    renteSum: Math.round(renteSum),
    avdragSum: Math.round(avdragSum),
    betaling: Math.round(renteSum + avdragSum),
  }
}

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
