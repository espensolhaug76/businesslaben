import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type {
  GameState, GamePhase, Industry, LocationZone,
  Product, Employee, DistributionChannel, MonthResult, InboxMessage, PestEvent,
} from './types'

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
}

// ─── Actions ────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'START_GAME'; companyName: string; industry: Industry }
  | { type: 'RENT_LOCATION'; id: string; zone: LocationZone; rent: number; capacity: number }
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
        phase: 'exploring_city',
        tutorialStep: 1,
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

    case 'SET_TARGET_AUDIENCE':
      return { ...state, targetAudience: action.audience }

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

      return {
        ...state,
        money: state.money + r.profit,
        reputation: newReputation,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: xpToNext,
        currentMonth: isYearEnd ? 1 : nextMonth,
        currentYear: isYearEnd ? state.currentYear + 1 : state.currentYear,
        monthlyResults: [...state.monthlyResults, r],
        phase: isYearEnd ? 'year_end' : 'month_report',
        messages: [...state.messages, ...pestMessages],
        unreadCount: state.unreadCount + pestMessages.length,
        // Reset p-flags for new month
        p1_complete: state.products.length > 0,
        p2_complete: state.products.some(p => p.retailPrice > 0),
        p3_complete: state.channels.length > 0,
        p4_complete: Object.values(state.marketingBudget).some(v => v > 0),
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
export type { GameState, GamePhase, Product, MonthResult, InboxMessage, PestEvent }
