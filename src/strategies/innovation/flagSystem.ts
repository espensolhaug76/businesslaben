// ── Innovation Strategy: Flag System ──────────────────────────────────────────

import type { InnovationFlags } from './types'

// Initial kapitaltabell per bransje
const BRANSJE_KAPITAL: Record<InnovationFlags['bransje'], number> = {
  tech: 80_000,
  baerekraftig: 120_000,
  mat: 150_000,
  tjeneste: 60_000,
  hardware: 200_000,
}

// Finansierings-tillegg
const FINANSIERING_TILLEGG: Record<InnovationFlags['finansieringStart'], number> = {
  familie: 50_000,
  bank: 50_000,
  sparepenger: 30_000,
  crowdfund: 75_000,
  ingen: 0,
}

export function createInitialFlags(
  bransje: InnovationFlags['bransje'],
  finansiering: InnovationFlags['finansieringStart'],
  personlighet: InnovationFlags['personlighet']
): InnovationFlags {
  const baseKapital = BRANSJE_KAPITAL[bransje]
  const finansKapital = FINANSIERING_TILLEGG[finansiering]

  // Tekniker-bonus: bygger MVP selv (-20 000 kr)
  const teknikerBonus = personlighet === 'tekniker' ? -20_000 : 0
  const startKapital = baseKapital + finansKapital + teknikerBonus

  return {
    // Oppstart
    bransje,
    finansieringStart: finansiering,
    personlighet,

    // Låne-flags basert på valg
    tookFamilyLoan: finansiering === 'familie',
    tookBankLoan: finansiering === 'bank',

    // Investor
    hasInvestor: false,
    investorOwnership: 0,

    // Pivot
    pivoted: false,
    pivotCount: 0,

    // Ansatte
    hiredFirst: null,
    totalEmployees: 0,

    // Teknisk gjeld
    techDebt: 0,

    // Vekst-flags
    hasPatent: false,
    hasInternational: false,
    hasMergerTalks: false,

    // Dynamiske event-flags
    differentiation_strategy: false,
    ignored_competition: false,
    local_focus: false,
    overcommitted: finansiering === 'crowdfund', // crowdfunders starter under press
    hasMentor: false,
    family_tension: 'none',
    burnout_risk: 'none',

    // Metrikker
    validationScore: 0,
    monthlyUsers: 0,
    monthlyRevenue: 0,
    burnRate: Math.round(startKapital * 0.08), // 8% av startkapital som månedlig burn
    runwayMonths: 12,
    reputation: 50,
    competitorPressure: 20,

    // Økonomi
    capital: startKapital,
    totalChoiceCount: 0,

    // Historikk
    triggeredEvents: [],
    outcome: null,
    exitValue: 0,
  }
}

export function updateFlags(
  current: InnovationFlags,
  updates: Partial<InnovationFlags>
): InnovationFlags {
  return { ...current, ...updates }
}

/**
 * Sjekker om en trigger-betingelse er oppfylt.
 * Støtter enkle string-baserte betingelser for framtidige bruk.
 */
export function checkTrigger(flags: InnovationFlags, condition: string): boolean {
  switch (condition) {
    case 'always': return true
    case 'has_investor': return flags.hasInvestor
    case 'no_investor': return !flags.hasInvestor
    case 'took_family_loan': return flags.tookFamilyLoan
    case 'took_bank_loan': return flags.tookBankLoan
    case 'high_tech_debt': return flags.techDebt > 70
    case 'medium_tech_debt': return flags.techDebt > 50
    case 'has_employees': return flags.totalEmployees > 0
    case 'many_employees': return flags.totalEmployees >= 3
    case 'very_many_employees': return flags.totalEmployees >= 4
    case 'high_users': return flags.monthlyUsers > 200
    case 'many_users': return flags.monthlyUsers > 1000
    case 'overcommitted': return flags.overcommitted
    case 'family_tension_high': return flags.family_tension === 'high'
    case 'burnout_high': return flags.burnout_risk === 'high'
    case 'good_reputation': return flags.reputation > 60
    case 'high_competitor_pressure': return flags.competitorPressure > 60
    case 'very_high_competitor_pressure': return flags.competitorPressure > 70
    case 'high_revenue': return flags.monthlyRevenue > 30_000
    case 'minimum_revenue': return flags.monthlyRevenue > 5_000
    case 'crowdfund': return flags.finansieringStart === 'crowdfund'
    case 'network_personlighet': return flags.personlighet === 'nettverk'
    case 'baerekraftig_bransje': return flags.bransje === 'baerekraftig'
    case 'has_developer': return flags.hiredFirst === 'developer'
    case 'growth_ready': return flags.monthlyUsers > 200 && flags.monthlyRevenue > 5_000
    case 'acquisition_ready': return flags.monthlyUsers > 1_000 && flags.hasInvestor
    default: return false
  }
}

/**
 * Oppdaterer metrikker månedlig (kompetitørpress øker, runway minker osv.)
 */
export function tickMonthlyMetrics(flags: InnovationFlags): InnovationFlags {
  const newCompetitorPressure = Math.min(100, flags.competitorPressure + 3)
  const newRunway = Math.max(0, flags.runwayMonths - 1)
  const newCapital = flags.capital - flags.burnRate + flags.monthlyRevenue

  // Sjekk konkurs-betingelse
  const isInsolvent = newCapital < 0

  return {
    ...flags,
    competitorPressure: newCompetitorPressure,
    runwayMonths: newRunway,
    capital: newCapital,
    // Øk brukervekst litt automatisk (2-5% per mnd organisk)
    monthlyUsers: Math.round(flags.monthlyUsers * 1.03),
    // Markedskapital-risiko
    burnout_risk: flags.totalChoiceCount > 30 && flags.burnout_risk === 'none'
      ? 'high'
      : flags.burnout_risk,
    outcome: isInsolvent && flags.outcome === null ? 'BANKRUPTCY' : flags.outcome,
  }
}
