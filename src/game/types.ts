// ─── AdVenture 3.0 — Core Types ───────────────────────────────────────────

export type Industry = 'cafe' | 'fashion' | 'tech' | 'sports'
export type LocationZone = 'utkant' | 'hovedgata' | 'gagata'
export type GamePhase =
  | 'startup'
  | 'exploring_city'
  | 'setting_up'
  | 'ready_to_simulate'
  | 'simulating'
  | 'month_report'
  | 'year_end'

export type DistributionChannel =
  | 'physicalStore'
  | 'webShop'
  | 'instagramShop'
  | 'delivery'
  | 'wholesale'

// ── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  icon: string
  tier: 'premium' | 'standard' | 'budget'
  costPrice: number
  retailPrice: number
  recommendedPrice: number
  stock: number
  quality: number
  sustainability: number
  maxDemandPerMonth: number
}

// ── Staff ────────────────────────────────────────────────────────────────────

export interface Employee {
  id: string
  role: 'selger' | 'markedsforer' | 'okonom'
  level: 'junior' | 'senior' | 'ekspert'
  monthlySalary: number
}

// ── Monthly result ───────────────────────────────────────────────────────────

export interface MonthResult {
  month: number
  revenue: number
  costs: number
  profit: number
  unitsSold: number
  reputationDelta: number
  xpEarned: number
  pestEvent: PestEvent | null
}

// ── PEST Events ──────────────────────────────────────────────────────────────

export interface PestEvent {
  id: string
  category: 'political' | 'economic' | 'social' | 'technological'
  title: string
  description: string
  emoji: string
  type: 'positive' | 'negative' | 'neutral'
  demandModifier: number
  costModifier: number
  choices: { text: string; effect: string }[]
}

// ── Inbox ────────────────────────────────────────────────────────────────────

export interface InboxMessage {
  id: string
  type: 'customer_complaint' | 'pest_event' | 'teacher_task' | 'supplier' | 'mentor'
  title: string
  body: string
  date: string
  read: boolean
  competenceGoal?: string
  choices?: { text: string; effect: string }[]
}

// ── Game state ───────────────────────────────────────────────────────────────

export interface GameState {
  // Level / progression
  level: number
  xp: number
  xpToNextLevel: number

  // Company
  companyName: string
  industry: Industry
  money: number
  reputation: number  // 0-100

  // Location
  rentedLocationId: string | null
  locationZone: LocationZone | null
  monthlyRent: number
  storageCapacity: number

  // Products & selling
  products: Product[]
  channels: DistributionChannel[]
  marketingBudget: {
    socialMedia: number
    google: number
    influencer: number
    print: number
    tv: number
  }
  appealType: 'rational' | 'emotional' | 'combined' | null

  // Staff
  employees: Employee[]
  monthlyPayroll: number

  // Target audience
  targetAudience: {
    geography: string | null
    genders: string[]
    ageGroups: string[]
    psychographics: string[]
  }

  // Scene
  currentScene: 'city' | 'interior'

  // Time
  currentMonth: number
  currentYear: number

  // Flow
  phase: GamePhase
  monthlyResults: MonthResult[]

  // 4P completion flags
  p1_complete: boolean
  p2_complete: boolean
  p3_complete: boolean
  p4_complete: boolean

  // Inbox
  messages: InboxMessage[]
  unreadCount: number

  // Tutorial step (0 = done, 1-10 = active)
  tutorialStep: number
}
