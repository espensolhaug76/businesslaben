import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { GameState, GamePhase, Scenario, SelectedProduct, DistributionChannel, MarketingBudget, MonthlyResult } from './types'

// ─── Initial state ─────────────────────────────────────────────────────────────

const initialState: GameState = {
  phase: 'startup',
  companyName: '',
  scenario: null,
  selectedProducts: [],
  activeChannels: ['physicalStore'],
  marketingBudget: { social: 0, google: 0, print: 0, influencer: 0, event: 0 },
  cash: 0,
  month: 1,
  monthlyResults: [],
  reputation: 50,
}

// ─── Actions ───────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'SET_COMPANY_NAME'; name: string }
  | { type: 'SET_SCENARIO'; scenario: Scenario }
  | { type: 'SET_PRODUCTS'; products: SelectedProduct[] }
  | { type: 'SET_CHANNELS'; channels: DistributionChannel[] }
  | { type: 'SET_MARKETING'; budget: MarketingBudget }
  | { type: 'APPLY_MONTH_RESULT'; result: MonthlyResult }
  | { type: 'RESET' }

// ─── Reducer ───────────────────────────────────────────────────────────────────

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.phase }
    case 'SET_COMPANY_NAME':
      return { ...state, companyName: action.name }
    case 'SET_SCENARIO':
      return { ...state, scenario: action.scenario, cash: action.scenario.startingCash }
    case 'SET_PRODUCTS':
      return { ...state, selectedProducts: action.products }
    case 'SET_CHANNELS':
      return { ...state, activeChannels: action.channels }
    case 'SET_MARKETING':
      return { ...state, marketingBudget: action.budget }
    case 'APPLY_MONTH_RESULT': {
      const result = action.result
      const reputationDelta = result.netProfit > 0 ? 2 : -3
      return {
        ...state,
        cash: result.cashAfter,
        month: state.month + 1,
        monthlyResults: [...state.monthlyResults, result],
        reputation: Math.max(0, Math.min(100, state.reputation + reputationDelta)),
        phase: state.month >= 12 ? 'year_end' : 'month_report',
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

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
