import type { PurchasedProduct, ProductPricing } from './Product'
import type { MonthResult } from './MonthResult'
import type { Campaign } from './Campaign'
import type { Employee } from './Employee'
import type { InboxMessage } from './Event'

// --- Constant unions (erasableSyntaxOnly) ---

export const Industry = {
  Fashion: 'fashion',
  Electronics: 'electronics',
  Food: 'food',
  Furniture: 'furniture',
  Technology: 'technology',
  Travel: 'travel',
  Health: 'health',
} as const
export type Industry = (typeof Industry)[keyof typeof Industry]

export const BusinessModel = {
  Retail: 'retail',
  Production: 'production',
  Detaljist: 'Detaljist',
  Produsent: 'Produsent',
} as const
export type BusinessModel = (typeof BusinessModel)[keyof typeof BusinessModel]

export const Gender = {
  Women: 'women',
  Men: 'men',
  Unisex: 'unisex',
} as const
export type Gender = (typeof Gender)[keyof typeof Gender]

export const AgeGroup = {
  Youth: 'youth',
  YoungAdult: 'young_adult',
  Adult: 'adult',
  Senior: 'senior',
  Kids: 'kids',
} as const
export type AgeGroup = (typeof AgeGroup)[keyof typeof AgeGroup]

export const Psychographic = {
  TrendSetter: 'trendsetter',
  QualityConscious: 'quality_conscious',
  PriceConscious: 'price_conscious',
  EcoFriendly: 'eco_friendly',
} as const
export type Psychographic = (typeof Psychographic)[keyof typeof Psychographic]

export const Geography = {
  Urban: 'urban',
  Suburban: 'suburban',
  Rural: 'rural',
} as const
export type Geography = (typeof Geography)[keyof typeof Geography]

export const PricingMethod = {
  CostPlus: 'cost_plus',
  MarketBased: 'market_based',
  ValueBased: 'value_based',
  Penetration: 'penetration',
  Premium: 'premium',
} as const
export type PricingMethod = (typeof PricingMethod)[keyof typeof PricingMethod]

export const GamePhase = {
  Start: 'start',
  Industry: 'industry',
  TargetAudience: 'target_audience',
  BusinessModel: 'business_model',
  ProductSelection: 'product_selection',
  StartingCapital: 'starting_capital',
  Playing: 'playing',
  YearEnd: 'year_end',
  GameOver: 'game_over',
} as const
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase]

export const StartingCapitalOption = {
  Low: 50_000,
  Medium: 100_000,
  High: 150_000,
  VeryHigh: 200_000,
} as const
export type StartingCapitalOption = (typeof StartingCapitalOption)[keyof typeof StartingCapitalOption]

export const GamePreset = {
  Grunnspill: 'grunnspill',
  Medium: 'medium',
  Avansert: 'avansert',
} as const
export type GamePreset = (typeof GamePreset)[keyof typeof GamePreset]

// --- Target segment ---

export interface TargetSegment {
  geography: string
  genders: string[]
  ageGroups: string[]
  psychographics: string[]
  isPrimary: boolean
  costToAdd: number
}

// --- Main game state ---

export interface GameState {
  // Phase
  currentPhase: GamePhase
  gamePreset: GamePreset

  // Company info
  companyName: string
  companyLogo?: string
  selectedIndustry: string
  selectedProduct: string

  // Economy
  currentMoney: number
  startingMoney: number
  currentMonth: number
  currentYear: number

  // Target audience (startup flow simple selections)
  selectedGender: string
  selectedAgeGroup: string
  selectedPsychographic: string
  selectedGeography: string

  // Target audience (advanced segments for engine)
  targetSegments: TargetSegment[]

  // Business model
  businessModel: string

  // Products & Inventory
  purchasedProducts: PurchasedProduct[]
  unlockedProductIds: string[]
  productPricings: ProductPricing[]
  supplierTier: string
  stockWomen: number
  stockMen: number
  stockKids: number
  totalCapacity: number

  // Pricing
  pricingMethod: string
  productPrice: number

  // Location
  locationTier: number
  locationName: string

  // Distribution
  distributionType: string
  hasPhysicalStore: boolean
  storeLocation: string
  hasWebStore: boolean
  webStoreTier: string
  hasWholesaler: boolean
  hasRetailer: boolean

  // Marketing
  marketingBudgetFacebook: number
  marketingBudgetTV: number
  marketingBudgetInfluencer: number
  marketingBudgetPrint: number
  marketingBudgetInstagram: number
  didMarketResearch: boolean
  appealType: string
  monthlyMarketing: number

  // Personnel
  employees: Employee[]
  staffCount: number
  staffSalaryPerPerson: number
  workingAlone: boolean
  hasMentor: boolean
  monthlyPersonnelCost: number
  monthlyEmployees: number

  // Performance
  monthlyResults: MonthResult[]
  reputation: number

  // Loan
  currentLoan: number
  monthlyLoanPayment: number

  // Monthly costs
  monthlyRent: number

  // Producer model
  productionRawMaterial: string
  productionCountry: string
  productionDirectSales: boolean
  productionIndirectSales: boolean

  // Inventory
  inventoryQuantity: number

  // Messages
  inboxMessages?: InboxMessage[]

  // Active campaigns
  activeMarketingCampaigns?: Campaign[]

  // Email & News (Desktop OS)
  gameEmails?: import('./Desktop').GameEmail[]
  gameNews?: import('./Desktop').NewsArticle[]

  // Sustainability profile
  sustainabilityProfile?: 'sustainable' | 'balanced' | 'cost_focused'
  sustainabilityJustification?: string

  // Budget planning
  budgetStartup?: Record<string, number>
  budgetMonthly?: Record<string, number>
  budgetSalesEstimate?: { unitsPerMonth: number; avgPrice: number }

  // Financing
  financingPlan?: {
    ownCapital: number
    familyLoan: number
    familyInterest: number
    bankLoan: number
    bankInterest: number
    investorAmount: number
    investorEquity: number
    grantAmount: number
  }

  // Lesson system
  activeLessons: string[]
  completedLessons: string[]
  unlockedFeatures: string[]
  currentSubject?: string

  // Store appearance
  storeImageId?: string

  // Price calculation answers (for teacher review)
  priceCalculationAnswers?: Record<string, string>

  // Market research answers (for teacher review)
  marketResearchAnswers?: { question1: string; question2: string }

  // Market research paywall
  marketResearchTier?: 'none' | 'basic' | 'standard' | 'premium'
  marketResearchCost?: number

  // Location selection
  selectedLocation?: {
    id: string
    name: string
    rent: number
    deposit: number
    renovation: number
    trafficLevel: number
    demographics: string
    dailyFootTraffic: number
  }

  // UI preferences
  theme?: 'dark' | 'light' | 'warm' | 'blue' | 'green'
}
