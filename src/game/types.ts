// ─── AdVenture 3.0 — Core Types ───────────────────────────────────────────

export type GamePhase =
  | 'startup'
  | 'city'
  | 'dashboard'
  | 'year_end'

// ── Rental Location ──────────────────────────────────────────────────────────

export interface RentalLocation {
  id: string
  name: string           // e.g. "Gågata 7"
  zone: 'gagate' | 'hovedgate' | 'utkant'
  monthlyRent: number
  footTraffic: 'lav' | 'middels' | 'høy'
  sqm: number
}

// ── Scenario ────────────────────────────────────────────────────────────────

export interface Scenario {
  id: string
  name: string
  emoji: string
  description: string
  category: string
  startingCash: number
  monthlyRent: number
  products: Product[]
}

// ── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  emoji: string
  baseCost: number        // cost per unit (kr)
  suggestedPrice: number  // typical selling price
  maxMonthlyDemand: number // theoretical max units/month
  quality: number          // 1-10
  description: string
}

export interface SelectedProduct extends Product {
  price: number
  stock: number  // units purchased this month
}

// ── Distribution ─────────────────────────────────────────────────────────────

export type DistributionChannel = 'physicalStore' | 'webShop' | 'socialMedia' | 'delivery' | 'wholesale'

export interface Distribution {
  channel: DistributionChannel
  name: string
  emoji: string
  description: string
  monthlyCost: number
  reachMultiplier: number
  marginImpact: number  // 0-1, e.g. 0.85 means 15% taken by channel
}

// ── Marketing ──────────────────────────────────────────────────────────────

export interface MarketingBudget {
  social: number
  google: number
  print: number
  influencer: number
  event: number
}

// ── Monthly result ──────────────────────────────────────────────────────────

export interface ProductResult {
  productId: string
  productName: string
  unitsSold: number
  revenue: number
  cogs: number
  profit: number
}

export interface MonthlyResult {
  month: number
  revenue: number
  cogs: number
  grossProfit: number
  fixedCosts: number
  marketingCosts: number
  netProfit: number
  cashAfter: number
  productResults: ProductResult[]
  event: GameEvent | null
}

// ── Random events ───────────────────────────────────────────────────────────

export interface GameEvent {
  id: string
  title: string
  description: string
  emoji: string
  type: 'positive' | 'negative' | 'neutral'
  demandModifier: number  // multiplier, e.g. 1.3 = +30%
  costModifier: number
}

// ── Game state ──────────────────────────────────────────────────────────────

export interface GameState {
  phase: GamePhase
  companyName: string
  scenario: Scenario | null
  selectedProducts: SelectedProduct[]
  activeChannels: DistributionChannel[]
  marketingBudget: MarketingBudget
  cash: number
  month: number          // 1-12
  monthlyResults: MonthlyResult[]
  reputation: number     // 0-100
  rentedLocation: RentalLocation | null
}
