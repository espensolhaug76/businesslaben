import { create } from 'zustand'
import type { GameState, TargetSegment, GamePreset } from '../types/PlayerData'
import type { PurchasedProduct, ProductPricing } from '../types/Product'
import type { Campaign } from '../types/Campaign'
import type { Employee } from '../types/Employee'
import type { MonthResult } from '../types/MonthResult'
import type { InboxMessage } from '../types/Event'
import type { EmailChoice } from '../types/Desktop'
import { GamePhase } from '../types/PlayerData'
import { lessons, checkPrerequisites } from '../data/lessons'
import type { Lesson } from '../data/lessons'
import { emailTemplates } from '../data/emails'
import { newsTemplates } from '../data/news'
import { saveGame, loadGame, clearSave } from '../utils/saveGame'

// ─── Actions interface ───────────────────────────────────

interface GameActions {
  // Phase
  setPhase: (phase: GamePhase) => void

  // Company setup
  setCompanyName: (name: string) => void
  setCompanyLogo: (logo: string) => void
  setIndustry: (industry: string) => void
  setBusinessModel: (model: string) => void
  setSelectedProduct: (productId: string) => void

  // Starting capital
  setStartingCapital: (amount: number) => void

  // Economy
  spendMoney: (amount: number) => boolean
  earnMoney: (amount: number) => void

  // Target audience (startup flow)
  setSelectedGender: (gender: string) => void
  setSelectedAgeGroup: (age: string) => void
  setSelectedPsychographic: (psych: string) => void
  setSelectedGeography: (geo: string) => void

  // Target audience (advanced segments)
  addTargetSegment: (segment: TargetSegment) => void
  removeTargetSegment: (index: number) => void

  // Products
  unlockProduct: (productId: string) => void
  addPurchasedProduct: (product: PurchasedProduct) => void
  removePurchasedProduct: (productId: string) => void
  updateProductStock: (productId: string, stockWomen: number, stockMen: number, stockKids: number) => void
  setSupplierTier: (tier: string) => void

  // Pricing
  setPricingMethod: (method: string) => void
  setProductPrice: (price: number) => void
  setProductPricings: (pricings: ProductPricing[]) => void
  addProductPricing: (pricing: ProductPricing) => void
  removeProductPricing: (index: number) => void

  // Distribution
  setDistributionType: (type: string) => void
  setHasPhysicalStore: (has: boolean) => void
  setHasWebStore: (has: boolean) => void
  setStoreLocation: (location: string) => void
  setLocationTier: (tier: number) => void
  upgradeLocation: (tier: number, name: string, cost: number, rent: number, capacity: number) => boolean

  // Marketing
  addCampaign: (campaign: Campaign) => void
  removeCampaign: (campaignId: string) => void
  setMarketingBudget: (channel: string, amount: number) => void
  setAppealType: (appeal: string) => void

  // Personnel
  hireEmployee: (employee: Employee) => void
  fireEmployee: (employeeId: string) => void
  setStaffCount: (count: number) => void

  // Loan
  takeLoan: (amount: number, months: number) => void

  // Month progression
  advanceMonth: () => void
  addMonthResult: (result: MonthResult) => void

  // Messages
  addInboxMessage: (message: InboxMessage) => void
  markMessageRead: (messageId: string) => void

  // Reputation
  adjustReputation: (delta: number) => void

  // Rent
  setMonthlyRent: (rent: number) => void

  // Producer model
  setProductionRawMaterial: (material: string) => void
  setProductionCountry: (country: string) => void

  // Email & News
  deliverEmailsForMonth: (month: number) => void
  markEmailRead: (emailId: string) => void
  respondToEmail: (emailId: string, choice: EmailChoice) => void
  deliverNewsForMonth: (month: number) => void
  markNewsRead: (newsId: string) => void

  // Game preset
  setGamePreset: (preset: GamePreset) => void
  applyGrunnspillDefaults: (industry: string, products: PurchasedProduct[]) => void

  // Lesson management
  activateLesson: (lessonId: string) => void
  deactivateLesson: (lessonId: string) => void
  completeLesson: (lessonId: string) => void
  activateAllLessons: (subjectLessons: Lesson[]) => void
  deactivateAllLessons: () => void
  setCurrentSubject: (subject: string) => void
  isFeatureUnlocked: (featureId: string) => boolean

  // Theme
  setTheme: (theme: 'dark' | 'light' | 'warm' | 'blue' | 'green') => void

  // Utility
  resetGame: () => void
  getTotalMonthlyCosts: () => number
}

// ─── Initial state ───────────────────────────────────────

const initialState: GameState = {
  currentPhase: GamePhase.Start,
  gamePreset: 'grunnspill',

  // Company info
  companyName: '',
  companyLogo: '',
  selectedIndustry: '',
  selectedProduct: '',

  // Economy
  currentMoney: 0,
  startingMoney: 0,
  currentMonth: 1,
  currentYear: 1,

  // Target audience (startup flow)
  selectedGender: '',
  selectedAgeGroup: '',
  selectedPsychographic: '',
  selectedGeography: '',

  // Target audience (advanced segments)
  targetSegments: [],

  // Business model
  businessModel: '',

  // Products & Inventory
  purchasedProducts: [],
  unlockedProductIds: [],
  productPricings: [],
  supplierTier: '',
  stockWomen: 0,
  stockMen: 0,
  stockKids: 0,
  totalCapacity: 200,

  // Pricing
  pricingMethod: '',
  productPrice: 0,

  // Location
  locationTier: 1,
  locationName: '',

  // Distribution
  distributionType: '',
  hasPhysicalStore: false,
  storeLocation: '',
  hasWebStore: false,
  webStoreTier: '',
  hasWholesaler: false,
  hasRetailer: false,

  // Marketing
  marketingBudgetFacebook: 0,
  marketingBudgetTV: 0,
  marketingBudgetInfluencer: 0,
  marketingBudgetPrint: 0,
  marketingBudgetInstagram: 0,
  didMarketResearch: false,
  appealType: '',
  monthlyMarketing: 0,

  // Personnel
  employees: [],
  staffCount: 0,
  staffSalaryPerPerson: 0,
  workingAlone: true,
  hasMentor: false,
  monthlyPersonnelCost: 0,
  monthlyEmployees: 0,

  // Performance
  monthlyResults: [],
  reputation: 50,

  // Loan
  currentLoan: 0,
  monthlyLoanPayment: 0,

  // Monthly costs
  monthlyRent: 0,

  // Producer model
  productionRawMaterial: '',
  productionCountry: '',
  productionDirectSales: false,
  productionIndirectSales: false,

  // Inventory
  inventoryQuantity: 0,

  // Messages
  inboxMessages: [],

  // Active campaigns
  activeMarketingCampaigns: [],

  // Email & News
  gameEmails: [],
  gameNews: [],

  // Lesson system
  activeLessons: [],
  completedLessons: [],
  unlockedFeatures: [],
  currentSubject: undefined,

  // Extended fields
  sustainabilityProfile: undefined,
  sustainabilityJustification: undefined,
  budgetStartup: undefined,
  budgetMonthly: undefined,
  budgetSalesEstimate: undefined,
  financingPlan: undefined,
  storeImageId: undefined,
  priceCalculationAnswers: undefined,
  marketResearchAnswers: undefined,
  marketResearchTier: undefined,
  marketResearchCost: undefined,
  selectedLocation: undefined,
  theme: 'light' as const,
}

// ─── Load saved state ─────────────────────────────────────

function getInitialState(): GameState {
  const saved = loadGame()
  if (saved) {
    // Merge saved data into initial state (handles new fields gracefully)
    const merged = { ...initialState } as Record<string, unknown>
    for (const key of Object.keys(initialState)) {
      if (key in saved && saved[key] !== undefined) {
        merged[key] = saved[key]
      }
    }
    return merged as unknown as GameState
  }
  return initialState
}

// ─── Store ───────────────────────────────────────────────

export const useGameStore = create<GameState & GameActions>()((set, get) => ({
  ...getInitialState(),

  // Phase
  setPhase: (phase) => set({ currentPhase: phase }),

  // Company setup
  setCompanyName: (name) => set({ companyName: name }),
  setCompanyLogo: (logo) => set({ companyLogo: logo }),
  setIndustry: (industry) => set({ selectedIndustry: industry }),
  setBusinessModel: (model) => set({ businessModel: model }),
  setSelectedProduct: (productId) => set({ selectedProduct: productId }),

  // Starting capital
  setStartingCapital: (amount) => set({
    startingMoney: amount,
    currentMoney: amount,
  }),

  // Economy
  spendMoney: (amount) => {
    const state = get()
    if (state.currentMoney >= amount) {
      set({ currentMoney: state.currentMoney - amount })
      return true
    }
    return false
  },
  earnMoney: (amount) => set((s) => ({ currentMoney: s.currentMoney + amount })),

  // Target audience (startup flow)
  setSelectedGender: (gender) => set({ selectedGender: gender }),
  setSelectedAgeGroup: (age) => set({ selectedAgeGroup: age }),
  setSelectedPsychographic: (psych) => set({ selectedPsychographic: psych }),
  setSelectedGeography: (geo) => set({ selectedGeography: geo }),

  // Target audience (advanced segments)
  addTargetSegment: (segment) =>
    set((s) => ({ targetSegments: [...s.targetSegments, segment] })),
  removeTargetSegment: (index) =>
    set((s) => ({ targetSegments: s.targetSegments.filter((_, i) => i !== index) })),

  // Products
  unlockProduct: (productId) =>
    set((s) =>
      s.unlockedProductIds.includes(productId)
        ? s
        : { unlockedProductIds: [...s.unlockedProductIds, productId] }
    ),
  addPurchasedProduct: (product) =>
    set((s) => ({ purchasedProducts: [...s.purchasedProducts, product] })),
  removePurchasedProduct: (productId) =>
    set((s) => ({ purchasedProducts: s.purchasedProducts.filter((p) => p.productId !== productId) })),
  updateProductStock: (productId, stockWomen, stockMen, stockKids) =>
    set((s) => ({
      purchasedProducts: s.purchasedProducts.map((p) =>
        p.productId === productId ? { ...p, stockWomen, stockMen, stockKids } : p
      ),
    })),
  setSupplierTier: (tier) => set({ supplierTier: tier }),

  // Pricing
  setPricingMethod: (method) => set({ pricingMethod: method }),
  setProductPrice: (price) => set({ productPrice: price }),
  setProductPricings: (pricings) => set({ productPricings: pricings }),
  addProductPricing: (pricing) =>
    set((s) => ({ productPricings: [...s.productPricings, pricing] })),
  removeProductPricing: (index) =>
    set((s) => ({ productPricings: s.productPricings.filter((_, i) => i !== index) })),

  // Distribution
  setDistributionType: (type) => set({ distributionType: type }),
  setHasPhysicalStore: (has) => set({ hasPhysicalStore: has }),
  setHasWebStore: (has) => set({ hasWebStore: has }),
  setStoreLocation: (location) => set({ storeLocation: location }),
  setLocationTier: (tier) => set({ locationTier: tier }),
  upgradeLocation: (tier, name, cost, rent, capacity) => {
    const state = get()
    if (state.currentMoney >= cost) {
      set({
        currentMoney: state.currentMoney - cost,
        locationTier: tier,
        locationName: name,
        monthlyRent: rent,
        totalCapacity: capacity,
      })
      return true
    }
    return false
  },

  // Marketing
  addCampaign: (campaign) =>
    set((s) => ({
      activeMarketingCampaigns: [...(s.activeMarketingCampaigns ?? []), campaign],
    })),
  removeCampaign: (campaignId) =>
    set((s) => ({
      activeMarketingCampaigns: (s.activeMarketingCampaigns ?? []).filter((c) => c.id !== campaignId),
    })),
  setMarketingBudget: (channel, amount) => {
    const key = `marketingBudget${channel.charAt(0).toUpperCase() + channel.slice(1)}` as keyof GameState
    set({ [key]: amount } as Partial<GameState>)
  },
  setAppealType: (appeal) => set({ appealType: appeal }),

  // Personnel
  hireEmployee: (employee) =>
    set((s) => {
      const employees = [...s.employees, employee]
      const monthlyPersonnelCost = employees.reduce((sum, e) => sum + e.salary, 0)
      return { employees, monthlyPersonnelCost }
    }),
  fireEmployee: (employeeId) =>
    set((s) => {
      const employees = s.employees.filter((e) => e.id !== employeeId)
      const monthlyPersonnelCost = employees.reduce((sum, e) => sum + e.salary, 0)
      return { employees, monthlyPersonnelCost }
    }),
  setStaffCount: (count) => set({ staffCount: count }),

  // Loan
  takeLoan: (amount, months) =>
    set((s) => ({
      currentLoan: s.currentLoan + amount,
      currentMoney: s.currentMoney + amount,
      monthlyLoanPayment: Math.ceil((s.currentLoan + amount) / months),
    })),

  // Month progression
  advanceMonth: () =>
    set((s) => {
      if (s.currentMonth >= 12) {
        return { currentMonth: 1, currentYear: s.currentYear + 1 }
      }
      return { currentMonth: s.currentMonth + 1 }
    }),
  addMonthResult: (result) =>
    set((s) => ({ monthlyResults: [...s.monthlyResults, result] })),

  // Messages
  addInboxMessage: (message) =>
    set((s) => ({ inboxMessages: [...(s.inboxMessages ?? []), message] })),
  markMessageRead: (messageId) =>
    set((s) => ({
      inboxMessages: (s.inboxMessages ?? []).map((m) =>
        m.id === messageId ? { ...m, read: true } : m
      ),
    })),

  // Reputation
  adjustReputation: (delta) =>
    set((s) => ({ reputation: Math.max(0, Math.min(100, s.reputation + delta)) })),

  // Rent
  setMonthlyRent: (rent) => set({ monthlyRent: rent }),

  // Producer model
  setProductionRawMaterial: (material) => set({ productionRawMaterial: material }),
  setProductionCountry: (country) => set({ productionCountry: country }),

  // Email & News
  deliverEmailsForMonth: (month) => {
    const existing = get().gameEmails ?? []
    const existingIds = new Set(existing.map((e) => e.id))
    const newEmails = emailTemplates
      .filter((t) => t.month <= month && !existingIds.has(t.id))
      .map((t) => ({ ...t, read: false, responded: false }))
    if (newEmails.length > 0) {
      set({ gameEmails: [...existing, ...newEmails] })
    }
  },

  markEmailRead: (emailId) =>
    set((s) => ({
      gameEmails: (s.gameEmails ?? []).map((e) =>
        e.id === emailId ? { ...e, read: true } : e
      ),
    })),

  respondToEmail: (emailId, choice) =>
    set((s) => {
      const emails = (s.gameEmails ?? []).map((e) =>
        e.id === emailId ? { ...e, responded: true, read: true } : e
      )
      const moneyDelta = -(choice.cost ?? 0) + (choice.effect.money ?? 0)
      const repDelta = choice.effect.reputation ?? 0
      return {
        gameEmails: emails,
        currentMoney: s.currentMoney + moneyDelta,
        reputation: Math.max(0, Math.min(100, s.reputation + repDelta)),
      }
    }),

  deliverNewsForMonth: (month) => {
    const existing = get().gameNews ?? []
    const existingIds = new Set(existing.map((n) => n.id))
    const newNews = newsTemplates
      .filter((t) => t.month <= month && !existingIds.has(t.id))
      .map((t) => ({ ...t, read: false }))
    if (newNews.length > 0) {
      set({ gameNews: [...existing, ...newNews] })
    }
  },

  markNewsRead: (newsId) =>
    set((s) => ({
      gameNews: (s.gameNews ?? []).map((n) =>
        n.id === newsId ? { ...n, read: true } : n
      ),
    })),

  // Game preset
  setGamePreset: (preset) => set({ gamePreset: preset }),

  applyGrunnspillDefaults: (industry, products) => {
    const locationMap: Record<string, { name: string; rent: number; deposit: number; renovation: number; dailyFootTraffic: number; tier: number }> = {
      fashion:      { name: 'Kjøpesenter',    rent: 35000, deposit: 105000, renovation: 50000, dailyFootTraffic: 2500, tier: 4 },
      electronics:  { name: 'Kjøpesenter',    rent: 35000, deposit: 105000, renovation: 50000, dailyFootTraffic: 2500, tier: 4 },
      food:         { name: 'Grünerløkka',    rent: 28000, deposit: 84000,  renovation: 45000, dailyFootTraffic: 800,  tier: 3 },
      furniture:    { name: 'Forstadsområde', rent: 18000, deposit: 54000,  renovation: 30000, dailyFootTraffic: 400,  tier: 2 },
    }
    const loc = locationMap[industry] ?? locationMap.fashion

    const productCosts = products.reduce(
      (sum, p) => sum + p.costPerUnitAdult * 150,
      0
    )
    const locationCosts = loc.deposit + loc.renovation
    const buffer = loc.rent * 3 + 50000
    const startingCapital = productCosts + locationCosts + buffer

    set({
      gamePreset: 'grunnspill',
      businessModel: 'retail',
      sustainabilityProfile: 'balanced',
      hasPhysicalStore: true,
      currentPhase: 'playing' as GamePhase,
      locationTier: loc.tier,
      locationName: loc.name,
      monthlyRent: loc.rent,
      selectedLocation: {
        id: loc.name.toLowerCase().replace(/\s+/g, '-'),
        name: loc.name,
        rent: loc.rent,
        deposit: loc.deposit,
        renovation: loc.renovation,
        trafficLevel: loc.tier,
        demographics: 'Blandet',
        dailyFootTraffic: loc.dailyFootTraffic,
      },
      targetSegments: [{
        geography: 'urban',
        genders: ['women', 'men'],
        ageGroups: ['young_adult', 'adult'],
        psychographics: ['quality_conscious'],
        isPrimary: true,
        costToAdd: 0,
      }],
      selectedGender: 'unisex',
      selectedAgeGroup: 'young_adult',
      selectedPsychographic: 'quality_conscious',
      selectedGeography: 'urban',
      startingMoney: startingCapital,
      currentMoney: startingCapital,
    })
  },

  // Lesson management
  activateLesson: (lessonId) => {
    const lesson = lessons.find((l) => l.id === lessonId)
    if (!lesson) return
    const state = get()
    if (state.activeLessons.includes(lessonId) || state.completedLessons.includes(lessonId)) return
    if (!checkPrerequisites(lesson, state.completedLessons)) return
    const newFeatures = lesson.unlocks.map((u) => u.id)
    set({
      activeLessons: [...state.activeLessons, lessonId],
      unlockedFeatures: [...new Set([...state.unlockedFeatures, ...newFeatures])],
      // Bypass startup when teacher activates lessons
      currentPhase: 'playing' as GamePhase,
      companyName: state.companyName || 'Test Bedrift',
      selectedIndustry: state.selectedIndustry || 'fashion',
      hasPhysicalStore: true,
    })
  },

  deactivateLesson: (lessonId) => {
    const lesson = lessons.find((l) => l.id === lessonId)
    if (!lesson) return
    const featureIdsToRemove = lesson.unlocks.map((u) => u.id)
    // Only remove features not unlocked by other active/completed lessons
    const state = get()
    const remainingLessonIds = [...state.activeLessons, ...state.completedLessons].filter((id) => id !== lessonId)
    const remainingFeatures = new Set(
      lessons
        .filter((l) => remainingLessonIds.includes(l.id))
        .flatMap((l) => l.unlocks.map((u) => u.id)),
    )
    set({
      activeLessons: state.activeLessons.filter((id) => id !== lessonId),
      completedLessons: state.completedLessons.filter((id) => id !== lessonId),
      unlockedFeatures: state.unlockedFeatures.filter(
        (f) => !featureIdsToRemove.includes(f) || remainingFeatures.has(f),
      ),
    })
  },

  completeLesson: (lessonId) => {
    set((s) => ({
      completedLessons: s.completedLessons.includes(lessonId)
        ? s.completedLessons
        : [...s.completedLessons, lessonId],
      activeLessons: s.activeLessons.filter((id) => id !== lessonId),
    }))
  },

  activateAllLessons: (subjectLessons) => {
    const state = get()
    const newActive = [...state.activeLessons]
    const newFeatures = [...state.unlockedFeatures]
    for (const lesson of subjectLessons) {
      if (!newActive.includes(lesson.id) && !state.completedLessons.includes(lesson.id)) {
        newActive.push(lesson.id)
        for (const u of lesson.unlocks) {
          if (!newFeatures.includes(u.id)) newFeatures.push(u.id)
        }
      }
    }
    set({
      activeLessons: newActive,
      unlockedFeatures: newFeatures,
      // Bypass startup when teacher activates lessons
      currentPhase: 'playing' as GamePhase,
      companyName: state.companyName || 'Test Bedrift',
      selectedIndustry: state.selectedIndustry || 'fashion',
      hasPhysicalStore: true,
    })
  },

  deactivateAllLessons: () => {
    set({ activeLessons: [], completedLessons: [], unlockedFeatures: [] })
  },

  setCurrentSubject: (subject) => set({ currentSubject: subject }),

  isFeatureUnlocked: (featureId) => {
    const state = get()
    // Grunnspill mode: everything unlocked
    if (state.gamePreset === 'grunnspill') return true
    // Base features always accessible
    const alwaysUnlocked = ['start_screen', 'city_view', 'industry_screen', 'office', 'basic_simulation']
    if (alwaysUnlocked.includes(featureId)) return true
    return state.unlockedFeatures.includes(featureId)
  },

  // Theme
  setTheme: (theme) => set({ theme }),

  // Utility
  getTotalMonthlyCosts: () => {
    const s = get()
    return (
      s.monthlyRent +
      s.monthlyPersonnelCost +
      s.monthlyMarketing +
      s.monthlyLoanPayment
    )
  },

  resetGame: () => {
    clearSave()
    set(initialState)
  },
}))

// ─── Auto-save on every state change ──────────────────────

useGameStore.subscribe((state) => {
  // Only save if player has started (has a company name)
  if (state.companyName) {
    // Strip action functions - only save data
    const data: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(state)) {
      if (typeof value !== 'function') {
        data[key] = value
      }
    }
    saveGame(data)
  }
})
