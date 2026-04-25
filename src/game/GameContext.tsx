import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type {
  GameState, GamePhase, Industry, LocationZone, BusinessModel,
  Product, Employee, DistributionChannel, MonthResult, InboxMessage, PestEvent, Loan, GameProgress,
  GameFlags, BusinessCanvas,
} from './types'
import { EMPTY_CANVAS } from './types'
import { EVENT_POOL } from '../strategies/innovation/eventPool'
import { getEventsForMonth } from '../strategies/innovation/eventEngine'
import { updateFlags } from '../strategies/innovation/flagSystem'

// ─── XP thresholds ──────────────────────────────────────────────────────────

export const XP_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000]

function xpForLevel(level: number): number {
  return XP_THRESHOLDS[level] ?? 10000 + level * 2000
}

// ─── Starting money per industry ────────────────────────────────────────────

const STARTING_MONEY: Record<Industry, number> = {
  cafe:    150_000,
  fashion: 250_000,
  tech:    300_000,
  sports:  200_000,
}

// ─── Industry → bransje mapping ─────────────────────────────────────────────

const INDUSTRY_BRANSJE: Record<Industry, GameFlags['bransje']> = {
  cafe:    'mat',
  fashion: 'tjeneste',
  tech:    'tech',
  sports:  'tjeneste',
}

// ─── Default game flags ──────────────────────────────────────────────────────

function makeDefaultGameFlags(
  industry: Industry,
  finansiering: GameFlags['finansieringStart'] = 'ingen',
  personlighet: GameFlags['personlighet'] = 'analytisk'
): GameFlags {
  return {
    bransje: INDUSTRY_BRANSJE[industry],
    finansieringStart: finansiering,
    personlighet,
    tookFamilyLoan: finansiering === 'familie',
    tookBankLoan: finansiering === 'bank',
    hasInvestor: false,
    investorOwnership: 0,
    pivoted: false,
    pivotCount: 0,
    hiredFirst: null,
    totalEmployees: 0,
    techDebt: 0,
    hasPatent: false,
    hasInternational: false,
    hasMergerTalks: false,
    differentiation_strategy: false,
    ignored_competition: false,
    local_focus: false,
    overcommitted: finansiering === 'crowdfund',
    hasMentor: false,
    family_tension: 'none',
    burnout_risk: 'none',
    validationScore: 0,
    monthlyUsers: 0,
    monthlyRevenue: 0,
    burnRate: 0,
    runwayMonths: 12,
    reputation: 50,
    competitorPressure: 20,
    capital: STARTING_MONEY[industry],
    totalChoiceCount: 0,
    triggeredEvents: [],
    outcome: null,
    exitValue: 0,
  }
}

// ─── Initial state ──────────────────────────────────────────────────────────

const initialState: GameState = {
  level: 1,
  xp: 0,
  xpToNextLevel: XP_THRESHOLDS[1],

  companyName: '',
  industry: 'fashion',
  money: 150_000,
  reputation: 50,

  rentedLocationId: null,
  locationZone: null,
  monthlyRent: 0,
  storageCapacity: 0,

  products: [],
  channels: ['physicalStore'],
  marketingBudget: { socialMedia: 0, google: 0, influencer: 0, print: 0, tv: 0 },
  appealType: null,

  employees: [],
  monthlyPayroll: 0,

  targetAudience: {
    geography: null,
    genders: [],
    ageGroups: [],
    psychographics: [],
  },

  currentScene: 'city',
  currentMonth: 1,
  currentYear: 1,

  phase: 'startup',
  monthlyResults: [],

  p1_complete: false,
  p2_complete: false,
  p3_complete: false,
  p4_complete: false,

  messages: [],
  unreadCount: 0,

  tutorialStep: 1,

  businessModel: 'detaljhandel',
  businessPlan: { description: '', marketResearchDone: false, qualityScore: 0, canvas: EMPTY_CANVAS },
  gameFlags: makeDefaultGameFlags('fashion'),
  loans: [],
  totalDebt: 0,
  monthlyLoanPayment: 0,
  consecutiveNegativeMonths: 0,
  progress: {
    industryChosen: false,
    businessModelChosen: false,
    targetAudienceDefined: false,
    productsSelected: false,
    businessPlanCreated: false,
    financingSecured: true,
    locationChosen: false,
    productsOrdered: false,
    pricesSet: false,
    marketingSet: false,
  },
}

// ─── Actions ────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'START_GAME'; companyName: string; industry: Industry; businessModel?: BusinessModel; finansiering?: GameFlags['finansieringStart']; personlighet?: GameFlags['personlighet'] }
  | { type: 'RENT_LOCATION'; id: string; zone: LocationZone; rent: number; capacity: number }
  | { type: 'SET_BUSINESS_MODEL'; model: BusinessModel }
  | { type: 'SAVE_BUSINESS_PLAN'; description: string }
  | { type: 'SAVE_CANVAS'; canvas: BusinessCanvas }
  | { type: 'RESOLVE_GAME_EVENT'; eventId: string; choiceId: string; messageId: string }
  | { type: 'BUY_MARKET_RESEARCH' }
  | { type: 'TAKE_LOAN'; loan: Loan }
  | { type: 'SET_PRODUCTS'; products: Product[] }
  | { type: 'ORDER_PRODUCT'; product: Product; quantity: number }
  | { type: 'SET_MARKETING'; budget: GameState['marketingBudget'] }
  | { type: 'SET_APPEAL'; appealType: GameState['appealType'] }
  | { type: 'SET_CHANNELS'; channels: DistributionChannel[] }
  | { type: 'SET_TARGET_AUDIENCE'; audience: GameState['targetAudience'] }
  | { type: 'HIRE_EMPLOYEE'; employee: Employee }
  | { type: 'FIRE_EMPLOYEE'; id: string }
  | { type: 'APPLY_MONTH_RESULT'; result: MonthResult }
  | { type: 'ADD_MESSAGE'; message: InboxMessage }
  | { type: 'READ_MESSAGE'; id: string }
  | { type: 'SET_TUTORIAL_STEP'; step: number }
  | { type: 'SET_P1_COMPLETE' }
  | { type: 'SET_P2_COMPLETE' }
  | { type: 'SET_P3_COMPLETE' }
  | { type: 'SET_P4_COMPLETE' }
  | { type: 'ENTER_INTERIOR' }
  | { type: 'EXIT_INTERIOR' }
  | { type: 'RESET' }

// ─── Plan quality helper ─────────────────────────────────────────────────────

function calcPlanQuality(state: GameState): number {
  let score = 0

  // 1 stjerne: sammendrag fylt ut
  if (state.businessPlan.description.trim().length > 20) score++

  // +1 stjerne: minst 2 av 4 manuelle canvas-ruter fylt ut
  // +1 stjerne: alle 4 manuelle ruter fylt ut
  const canvas = state.businessPlan.canvas ?? EMPTY_CANVAS
  const manualFilled = [canvas.verditilbud, canvas.kundeforhold, canvas.nokkelaktiviteter, canvas.partnere]
    .filter(v => (v ?? '').trim().length > 10).length
  if (manualFilled >= 2) score++
  if (manualFilled >= 4) score++

  // +1 stjerne: minst 3 av 5 auto-ruter har data (fra andre faner)
  // +1 stjerne: alle 5 auto-ruter har data
  const ta = state.targetAudience
  const autoChecks = [
    ta.genders.length > 0 || ta.ageGroups.length > 0,                    // kundesegmenter
    state.channels.length > 0,                                             // kanaler
    state.products.some(p => p.retailPrice > 0),                          // inntektsstrommer
    state.rentedLocationId !== null || state.employees.length > 0,        // nokkelressurser
    state.monthlyRent > 0 || state.monthlyPayroll > 0,                    // kostnadsstruktur
  ]
  const autoFilled = autoChecks.filter(Boolean).length
  if (autoFilled >= 3) score++
  if (autoFilled >= 5) score++

  return Math.min(5, score)
}

// ─── Reducer ────────────────────────────────────────────────────────────────

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    case 'SET_PHASE':
      return { ...state, phase: action.phase }

    case 'START_GAME':
      return {
        ...initialState,
        companyName: action.companyName,
        industry: action.industry,
        money: STARTING_MONEY[action.industry],
        businessModel: action.businessModel ?? 'detaljhandel',
        phase: 'exploring_city',
        tutorialStep: 1,
        gameFlags: makeDefaultGameFlags(action.industry, action.finansiering, action.personlighet),
        progress: {
          ...initialState.progress,
          industryChosen: true,
          businessModelChosen: action.businessModel != null,
        },
      }

    case 'RENT_LOCATION': {
      const newMessages: InboxMessage[] = [
        ...state.messages,
        {
          id: `msg_welcome_${Date.now()}`,
          type: 'mentor',
          title: '⭐ Gratulerer med lokalet!',
          body: `Flott valg! Nå er det på tide å sette opp butikken. Åpne dashboardet (klikk på PC-en inne i butikken) og gå gjennom de 4 stegene: Produkter → Priser → Distribusjon → Markedsføring.`,
          date: `År 1, Måned 1`,
          read: false,
        },
      ]
      return {
        ...state,
        rentedLocationId: action.id,
        locationZone: action.zone,
        monthlyRent: action.rent,
        storageCapacity: action.capacity,
        phase: 'setting_up',
        messages: newMessages,
        unreadCount: state.unreadCount + 1,
        tutorialStep: state.tutorialStep === 2 ? 3 : state.tutorialStep,
        progress: { ...state.progress, locationChosen: true },
      }
    }

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
        p1_complete: action.products.length > 0,
      }

    case 'ORDER_PRODUCT': {
      const totalCost = action.product.costPrice * action.quantity
      if (state.money < totalCost || action.quantity <= 0) return state
      const existingIdx = state.products.findIndex(p => p.id === action.product.id)
      let newProducts: Product[]
      if (existingIdx >= 0) {
        newProducts = state.products.map(p =>
          p.id === action.product.id ? { ...p, stock: p.stock + action.quantity } : p
        )
      } else {
        newProducts = [...state.products, { ...action.product, stock: action.quantity }]
      }
      return { ...state, money: state.money - totalCost, products: newProducts, p1_complete: true }
    }

    case 'SET_MARKETING':
      return {
        ...state,
        marketingBudget: action.budget,
        p4_complete: Object.values(action.budget).some(v => v > 0),
      }

    case 'SET_APPEAL':
      return { ...state, appealType: action.appealType }

    case 'SET_CHANNELS':
      return {
        ...state,
        channels: action.channels,
        p3_complete: action.channels.length > 0,
      }

    case 'SET_TARGET_AUDIENCE': {
      const newState = { ...state, targetAudience: action.audience }
      const q = calcPlanQuality(newState)
      const defined = action.audience.genders.length > 0 || action.audience.ageGroups.length > 0
      return {
        ...newState,
        businessPlan: { ...newState.businessPlan, qualityScore: q },
        progress: { ...newState.progress, targetAudienceDefined: defined },
      }
    }

    case 'SET_BUSINESS_MODEL':
      return {
        ...state,
        businessModel: action.model,
        progress: { ...state.progress, businessModelChosen: true },
      }

    case 'SAVE_BUSINESS_PLAN': {
      const desc = action.description
      const q = calcPlanQuality({ ...state, businessPlan: { ...state.businessPlan, description: desc } })
      return {
        ...state,
        businessPlan: { ...state.businessPlan, description: desc, qualityScore: q },
        progress: { ...state.progress, businessPlanCreated: desc.trim().length > 20 },
      }
    }

    case 'SAVE_CANVAS': {
      const updatedBp = { ...state.businessPlan, canvas: action.canvas }
      const q = calcPlanQuality({ ...state, businessPlan: updatedBp })
      return { ...state, businessPlan: { ...updatedBp, qualityScore: q } }
    }

    case 'RESOLVE_GAME_EVENT': {
      const event = EVENT_POOL.find(e => e.id === action.eventId)
      if (!event) return state
      const choice = event.choices.find(c => c.id === action.choiceId)
      if (!choice) return state

      let gf = updateFlags(state.gameFlags as Parameters<typeof updateFlags>[0], choice.flagUpdates as Partial<Parameters<typeof updateFlags>[0]>)
      let newMoney = state.money
      if (choice.capitalDelta) newMoney += choice.capitalDelta
      let newRep = state.reputation
      if (choice.reputationDelta) newRep = Math.max(0, Math.min(100, state.reputation + choice.reputationDelta))
      if (choice.userDelta) gf = { ...gf, monthlyUsers: Math.max(0, gf.monthlyUsers + choice.userDelta) }
      if (choice.techDebtDelta) gf = { ...gf, techDebt: Math.max(0, Math.min(100, gf.techDebt + choice.techDebtDelta)) }
      gf = { ...gf, capital: newMoney, totalChoiceCount: gf.totalChoiceCount + 1 }

      const messages = state.messages.map(m => m.id === action.messageId ? { ...m, read: true } : m)
      return {
        ...state,
        money: newMoney,
        reputation: newRep,
        gameFlags: gf,
        messages,
        unreadCount: messages.filter(m => !m.read).length,
      }
    }

    case 'BUY_MARKET_RESEARCH': {
      if (state.money < 10_000) return state
      const bp = { ...state.businessPlan, marketResearchDone: true }
      const q = calcPlanQuality({ ...state, businessPlan: bp })
      return { ...state, money: state.money - 10_000, businessPlan: { ...bp, qualityScore: q } }
    }

    case 'TAKE_LOAN': {
      const loans = [...state.loans, action.loan]
      const totalDebt = loans.reduce((s, l) => s + l.remainingBalance, 0)
      const monthlyLoanPayment = loans.reduce((s, l) => s + l.monthlyPayment, 0)
      return {
        ...state,
        money: state.money + action.loan.amount,
        loans,
        totalDebt,
        monthlyLoanPayment,
        progress: { ...state.progress, financingSecured: true },
      }
    }

    case 'HIRE_EMPLOYEE': {
      const employees = [...state.employees, action.employee]
      const monthlyPayroll = employees.reduce((s, e) => s + e.monthlySalary, 0)
      return { ...state, employees, monthlyPayroll }
    }

    case 'FIRE_EMPLOYEE': {
      const employees = state.employees.filter(e => e.id !== action.id)
      const monthlyPayroll = employees.reduce((s, e) => s + e.monthlySalary, 0)
      return { ...state, employees, monthlyPayroll }
    }

    case 'APPLY_MONTH_RESULT': {
      const r = action.result
      const newXp = state.xp + r.xpEarned
      let newLevel = state.level
      let xpToNext = state.xpToNextLevel
      // Level up if enough XP
      while (newXp >= xpForLevel(newLevel) && newLevel < 12) {
        newLevel++
        xpToNext = xpForLevel(newLevel)
      }

      const newReputation = Math.max(0, Math.min(100, state.reputation + r.reputationDelta))
      const nextMonth = state.currentMonth + 1
      const isYearEnd = nextMonth > 12

      const pestMessages: InboxMessage[] = r.pestEvent
        ? [{
            id: `pest_${state.currentMonth}_${Date.now()}`,
            type: 'pest_event',
            title: `${r.pestEvent.emoji} ${r.pestEvent.title}`,
            body: r.pestEvent.description,
            date: `År ${state.currentYear}, Måned ${state.currentMonth}`,
            read: false,
            choices: r.pestEvent.choices,
          }]
        : []

      // Process loans
      const updatedLoans = state.loans.map(loan => {
        if (loan.monthsRemaining <= 0) return loan
        const interestThisMonth = loan.remainingBalance * loan.interestRate / 12
        const principalThisMonth = loan.monthlyPayment - interestThisMonth
        return {
          ...loan,
          remainingBalance: Math.max(0, loan.remainingBalance - principalThisMonth),
          monthsRemaining: loan.monthsRemaining - 1,
          totalInterestPaid: loan.totalInterestPaid + interestThisMonth,
        }
      }).filter(l => l.monthsRemaining > 0 || l.remainingBalance > 0)

      const totalDebt = updatedLoans.reduce((s, l) => s + l.remainingBalance, 0)
      const updatedMonthlyLoanPayment = updatedLoans.reduce((s, l) => s + l.monthlyPayment, 0)
      const consNeg = r.profit < 0 ? state.consecutiveNegativeMonths + 1 : 0

      const newProgress: GameProgress = {
        ...state.progress,
        productsSelected: state.products.length > 0,
        productsOrdered: state.products.some(p => p.stock > 0),
        pricesSet: state.products.some(p => p.retailPrice > 0),
        marketingSet: Object.values(state.marketingBudget).some(v => v > 0),
        locationChosen: !!state.rentedLocationId || state.businessModel === 'netthandel',
      }

      const newMoney = state.money + r.profit
      const monthlyCostsCalc = state.monthlyRent + state.monthlyPayroll + updatedMonthlyLoanPayment
        + Object.values(state.marketingBudget).reduce((s, v) => s + v, 0) + 2000
      const netFlow = r.revenue - monthlyCostsCalc
      const newRunway = netFlow < 0 ? Math.max(0, Math.floor(newMoney / Math.abs(netFlow))) : 12

      // Update game flags with real simulation data
      const updatedGameFlags: GameFlags = {
        ...state.gameFlags,
        monthlyRevenue: r.revenue,
        burnRate: monthlyCostsCalc,
        reputation: newReputation,
        capital: newMoney,
        totalEmployees: state.employees.length,
        competitorPressure: Math.min(100, state.gameFlags.competitorPressure + 3),
        runwayMonths: newRunway,
        burnout_risk: state.gameFlags.totalChoiceCount > 30 && state.gameFlags.burnout_risk === 'none'
          ? 'high' : state.gameFlags.burnout_risk,
        outcome: newMoney < 0 && state.gameFlags.outcome === null ? 'BANKRUPTCY' : state.gameFlags.outcome,
      }

      // Get innovation events for this month
      const innovEvents = getEventsForMonth(updatedGameFlags as Parameters<typeof getEventsForMonth>[0], state.currentMonth, 'game')
      const innovMessages: InboxMessage[] = innovEvents.map(e => ({
        id: `innov_${e.id}_${Date.now()}`,
        type: 'game_event' as const,
        title: `🚀 ${e.title}`,
        body: e.text,
        date: `År ${state.currentYear}, Måned ${state.currentMonth}`,
        read: false,
        competenceGoal: e.kompetansemaal,
        choices: e.choices.map(c => ({
          text: c.label,
          effect: c.description ?? '',
          eventId: e.id,
          choiceId: c.id,
        })),
      }))

      // Mark innovation events as triggered
      const finalGameFlags: GameFlags = {
        ...updatedGameFlags,
        triggeredEvents: [...updatedGameFlags.triggeredEvents, ...innovEvents.map(e => e.id)],
      }

      return {
        ...state,
        money: newMoney,
        reputation: newReputation,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: xpToNext,
        currentMonth: isYearEnd ? 1 : nextMonth,
        currentYear: isYearEnd ? state.currentYear + 1 : state.currentYear,
        monthlyResults: [...state.monthlyResults, r],
        phase: isYearEnd ? 'year_end' : 'month_report',
        messages: [...state.messages, ...pestMessages, ...innovMessages],
        unreadCount: state.unreadCount + pestMessages.length + innovMessages.length,
        // Reset p-flags for new month
        p1_complete: state.products.length > 0,
        p2_complete: state.products.some(p => p.retailPrice > 0),
        p3_complete: state.channels.length > 0,
        p4_complete: Object.values(state.marketingBudget).some(v => v > 0),
        // Loan processing
        loans: updatedLoans,
        totalDebt,
        monthlyLoanPayment: updatedMonthlyLoanPayment,
        consecutiveNegativeMonths: consNeg,
        progress: newProgress,
        gameFlags: finalGameFlags,
      }
    }

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
        unreadCount: state.unreadCount + 1,
      }

    case 'READ_MESSAGE': {
      const messages = state.messages.map(m => m.id === action.id ? { ...m, read: true } : m)
      const unreadCount = messages.filter(m => !m.read).length
      return { ...state, messages, unreadCount }
    }

    case 'SET_TUTORIAL_STEP':
      return { ...state, tutorialStep: action.step }

    case 'SET_P1_COMPLETE':
      return { ...state, p1_complete: true }

    case 'SET_P2_COMPLETE': {
      const p2 = state.products.some(p => p.retailPrice > 0)
      return { ...state, p2_complete: p2 }
    }

    case 'SET_P3_COMPLETE':
      return { ...state, p3_complete: true }

    case 'SET_P4_COMPLETE':
      return { ...state, p4_complete: true }

    case 'ENTER_INTERIOR':
      return { ...state, currentScene: 'interior' }

    case 'EXIT_INTERIOR':
      return { ...state, currentScene: 'city' }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

// ─── Context ────────────────────────────────────────────────────────────────

interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<Action>
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}

// Re-export types for consumers
export type { GameState, GamePhase, Product, MonthResult, InboxMessage, PestEvent, Loan, GameProgress, BusinessModel, GameFlags, BusinessCanvas }
