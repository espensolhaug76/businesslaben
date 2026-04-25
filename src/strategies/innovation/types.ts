// ── Innovation Strategy: Core Types ───────────────────────────────────────────
// Parallell strategi for ENT1/ENT2-elever (Innovasjon & Disrupsjon)

export interface InnovationFlags {
  // Oppstart-valg
  bransje: 'tech' | 'baerekraftig' | 'mat' | 'tjeneste' | 'hardware'
  finansieringStart: 'familie' | 'bank' | 'sparepenger' | 'crowdfund' | 'ingen'
  personlighet: 'tekniker' | 'selger' | 'kreativ' | 'analytisk' | 'nettverk'

  // Beslutninger underveis
  tookFamilyLoan: boolean
  tookBankLoan: boolean
  hasInvestor: boolean
  investorOwnership: number          // 0-100%
  pivoted: boolean
  pivotCount: number
  hiredFirst: 'developer' | 'sales' | 'marketing' | null
  totalEmployees: number
  techDebt: number                   // 0-100, høyt = krasj-risiko
  hasPatent: boolean
  hasInternational: boolean
  hasMergerTalks: boolean

  // Dynamiske flags fra events
  differentiation_strategy: boolean
  ignored_competition: boolean
  local_focus: boolean
  overcommitted: boolean
  hasMentor: boolean
  family_tension: 'none' | 'high' | 'resolved'
  burnout_risk: 'none' | 'high' | 'resolved'

  // Metrikker
  validationScore: number            // 0-100
  monthlyUsers: number
  monthlyRevenue: number
  burnRate: number
  runwayMonths: number
  reputation: number                 // 0-100
  competitorPressure: number         // 0-100, øker med tiden

  // Startkapital og økonomi
  capital: number                    // Nåværende kapital i kr
  totalChoiceCount: number           // Antall valg tatt (for burnout-trigger)

  // Triggere brukt (så samme event ikke kommer to ganger)
  triggeredEvents: string[]

  // Sluttilstand
  outcome: OutcomeId | null
  exitValue: number                  // Verdi ved salg (0 hvis ikke solgt)
}

export type OutcomeId =
  | 'EXIT_BIG'
  | 'EXIT_SMALL'
  | 'LIFESTYLE'
  | 'INTERNATIONAL'
  | 'MERGER'
  | 'COOPERATIVE'
  | 'SCALING'
  | 'PIVOT_SUCCESS'
  | 'BANKRUPTCY'
  | 'BURNOUT_QUIT'

// ── Event types ───────────────────────────────────────────────────────────────

export type InnovationPhase = 1 | 2 | 3 | 4 | 5

export interface FlagUpdate {
  [key: string]: unknown
}

export interface InnovationChoice {
  id: string                         // 'A', 'B', 'C', 'D'
  label: string                      // Norsk tekst vist på knapp
  description?: string               // Kort forklaring
  flagUpdates: Partial<InnovationFlags>
  capitalDelta?: number              // Endring i kapital (kr), negativt = kostnad
  userDelta?: number                 // Endring i månedlige brukere
  revenueDelta?: number              // Endring i månedlig inntekt
  reputationDelta?: number           // Endring i omdømme
  techDebtDelta?: number             // Endring i tech debt
  runwayDelta?: number               // Endring i runway (måneder)
  followUpEvent?: string             // Tvinger dette event-ID neste måned
}

export interface InnovationEvent {
  id: string                         // 'E001', 'E005' osv.
  title: string                      // Norsk tittel
  text: string                       // Innleggstekst (kursiv i design-doc)
  phase: InnovationPhase[]           // Hvilke faser den kan trigge
  triggerMonths?: number[]           // Spesifikke måneder (valgfritt)
  probability: number                // 0-1 sjanse når betingelser er oppfylt
  triggerCondition: (flags: InnovationFlags, month: number) => boolean
  choices: InnovationChoice[]
  kompetansemaal: string             // Læringsmål
  isForced?: boolean                 // Skal alltid trigge (ignorer probability)
}

// ── Startup choices ────────────────────────────────────────────────────────────

export interface BransjeOption {
  id: InnovationFlags['bransje']
  navn: string
  startkapital: number
  fordel: string
  ulempe: string
  icon: string
}

export interface FinansieringOption {
  id: InnovationFlags['finansieringStart']
  navn: string
  beloep: number
  bonus: string
  skjultKostnad: string
  icon: string
}

export interface PersonlighetOption {
  id: InnovationFlags['personlighet']
  navn: string
  bonus: string
  ulempe: string
  icon: string
  flagBonus: Partial<InnovationFlags>
}

// Alias for backwards compat in startupChoices.ts
export type { FinansieringOption as FinansjeringOption }

export interface StartupChoice {
  bransje: BransjeOption
  finansiering: FinansieringOption
  personlighet: PersonlighetOption
}

// Re-export for convenience
export type { StartupChoice as InnovationStartup }
