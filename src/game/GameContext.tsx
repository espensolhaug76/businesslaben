import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type {
  GameState, GamePhase, Industry, LocationZone, BusinessModel,
  Product, Employee, DistributionChannel, MonthResult, InboxMessage, PestEvent, Loan, GameProgress,
  GameFlags, BusinessCanvas, WindowDisplayItem, TrauItem, KlesbutikkFixtureItem, DayResult, Bestilling, DeliveryNote,
} from './types'
import { EMPTY_CANVAS } from './types'
import type { SaleLine } from './sales/types'
import { EVENT_POOL } from '../strategies/innovation/eventPool'
import { getEventsForMonth } from '../strategies/innovation/eventEngine'
import { updateFlags } from '../strategies/innovation/flagSystem'
import { DAY_CONFIG } from './data/dayConfig'
import { getActiveIndustryDefinition } from './data/industryDefinition'
import { catalogToProduct } from './data/industries'

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

  shopOpen: false,

  dayNumber: 1,
  meetingsToday: 0,
  dayPhase: 'stengt',
  dayStats: { soldStk: 0, soldKr: 0, varekostKr: 0, reputationDelta: 0, xpEarned: 0, stockoutHappened: false },
  lastDayResult: null,
  dayHistory: [],

  incomingOrders: [],
  lastDelivery: null,
  openingOrderPlaced: false,

  products: [],
  mainProductId: null,
  priceResearch: { purchasedProductIds: [] },
  channels: ['physicalStore'],
  windowDisplayLayout: [],
  counterLayout: [],
  klesbutikkFixtureLayout: [],
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
  | { type: 'BUY_PRICE_RESEARCH' }
  | { type: 'TAKE_LOAN'; loan: Loan }
  | { type: 'SET_PRODUCTS'; products: Product[] }
  | { type: 'SET_MAIN_PRODUCT'; id: string }
  | { type: 'SET_WINDOW_DISPLAY'; fixtureId: WindowDisplayItem['fixtureId']; items: WindowDisplayItem[] }
  | { type: 'SET_COUNTER_LAYOUT'; items: TrauItem[] }
  | { type: 'SET_KLESBUTIKK_FIXTURES'; items: KlesbutikkFixtureItem[] }
  | { type: 'RESOLVE_SALES_SCENARIO'; sales: SaleLine[]; reputationDelta: number; xpEarned: number; cost?: number; stockout?: boolean }
  | { type: 'ORDER_PRODUCT'; product: Product; quantity: number }
  // Åpningsbestilling (docs/INNKJOP_LEVERING.md): elevens ene selvvalgte
  // startlager, ferdig på lager dag 1 (ingen ventetid). Tom liste tillates.
  | { type: 'PLACE_OPENING_ORDER'; items: { productId: string; qty: number }[] }
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
  // Dagssyklus (DEL 2) — erstatter den gamle SET_SHOP_OPEN (kun ett sted
  // brukte den, en enkel bryter uten dagtelling/svinn).
  | { type: 'OPEN_DAY' }
  | { type: 'CLOSE_DAY' }
  | { type: 'START_NEW_DAY' }
  // Innkjøp/levering (docs/INNKJOP_LEVERING.md): lukk «Varer ankommet»-pilla.
  | { type: 'CLEAR_DELIVERY' }
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
      // Innkjøp/levering (docs/INNKJOP_LEVERING.md): startlageret seedes IKKE
      // automatisk lenger — eleven gjør en ÅPNINGSBESTILLING selv (se
      // OpeningOrderOverlay + PLACE_OPENING_ORDER), som vises straks etter
      // leie (rentedLocationId satt + openingOrderPlaced=false).
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

    case 'SET_MAIN_PRODUCT':
      // VINDUSLOGIKK TILLEGG: hovedprodukt for vindu/kampanjer. Klikk paa
      // samme produkt igjen fjerner valget. Ingen demand-effekter.
      return {
        ...state,
        mainProductId: state.mainProductId === action.id ? null : action.id,
      }

    case 'SET_WINDOW_DISPLAY':
      // Manuell vareeksponering (fri plassering). To flater deler lista og
      // skilles med fixtureId — kun den aktive flatens elementer erstattes,
      // den andre flaten beholdes. Ingen egen lagre-knapp nødvendig.
      return {
        ...state,
        windowDisplayLayout: [
          ...state.windowDisplayLayout.filter(i => i.fixtureId !== action.fixtureId),
          ...action.items,
        ],
      }

    case 'RESOLVE_SALES_SCENARIO': {
      // Salgssituasjon-motor: skriver resultatet til EKSISTERENDE felt —
      // money (salg minus kostnad), products[].stock (varelager), reputation
      // (rykte) og xp/level (med samme level-up-løype som APPLY_MONTH_RESULT).
      // Salg klemmes mot faktisk lager; `cost` (DEL 3 — omlevering/refusjon)
      // trekkes fra kassa. DAGSSYKLUS (DEL 2): akkumulerer i tillegg inn i
      // dayStats + teller kundemøtet, MEN kun når butikken faktisk er i
      // åpningstid (dayPhase 'åpen') — dev-knappene i dashbordet kan trigge
      // scenarier utenfor en handledag (isolert testing) uten å forstyrre
      // dagtellingen.
      const reqByProduct = new Map<string, number>()
      for (const l of action.sales) reqByProduct.set(l.productId, (reqByProduct.get(l.productId) ?? 0) + l.qty)

      let revenue = 0
      let varekost = 0
      let soldStk = 0
      const products = state.products.map(p => {
        const req = reqByProduct.get(p.id) ?? 0
        if (req <= 0) return p
        const sold = Math.min(req, p.stock)
        revenue += sold * p.retailPrice
        varekost += sold * p.costPrice
        soldStk += sold
        return sold > 0 ? { ...p, stock: p.stock - sold } : p
      })

      const reputation = Math.max(0, Math.min(100, state.reputation + action.reputationDelta))

      const newXp = state.xp + action.xpEarned
      let newLevel = state.level
      let xpToNext = state.xpToNextLevel
      while (newXp >= xpForLevel(newLevel) && newLevel < 12) {
        newLevel++
        xpToNext = xpForLevel(newLevel)
      }

      // DEL 4-fix: utsolgt/tapt-salg-signal. Overlayet flagger nå eksplisitt
      // når et salgsforsøk ikke kunne dekkes fullt av lageret — inkludert
      // DELSALG (f.eks. 6 av 8 ønsket) og mersalg/storbestilling — ikke bare
      // helt tomme (qty===0) linjer. Beholder qty===0-sjekken som en robust
      // reserve (klemt salg i reduceren).
      const stockoutNow = (action.stockout ?? false) || action.sales.some(l => l.qty === 0)
      const inDay = state.dayPhase === 'åpen'

      return {
        ...state,
        products,
        money: state.money + revenue - Math.max(0, action.cost ?? 0),
        reputation,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: xpToNext,
        meetingsToday: inDay ? state.meetingsToday + 1 : state.meetingsToday,
        dayStats: inDay ? {
          soldStk: state.dayStats.soldStk + soldStk,
          soldKr: state.dayStats.soldKr + revenue,
          varekostKr: state.dayStats.varekostKr + varekost,
          reputationDelta: state.dayStats.reputationDelta + action.reputationDelta,
          xpEarned: state.dayStats.xpEarned + action.xpEarned,
          stockoutHappened: state.dayStats.stockoutHappened || stockoutNow,
        } : state.dayStats,
      }
    }

    case 'SET_COUNTER_LAYOUT':
      // Disk-monterens trau-oppsett (frontal scene). Hele lista erstattes ved
      // hver endring — ingen egen lagre-knapp.
      return { ...state, counterLayout: action.items }

    case 'SET_KLESBUTIKK_FIXTURES':
      // Klesbutikkens frie møbelplassering (butikkveggen, KlesbutikkStillas).
      // Hele lista erstattes ved hver endring — samme mønster som layoutene over.
      return { ...state, klesbutikkFixtureLayout: action.items }

    case 'ORDER_PRODUCT': {
      // Innkjøp med LEVERINGSTID (docs/INNKJOP_LEVERING.md): pengene trekkes
      // NÅ, men varene legges IKKE på lager med en gang — de blir en
      // Bestilling underveis som ankommer morgenen dag N + leadTimeDays
      // (OPEN_DAY). Første bestilling av en katalogvare FØRER den (legges i
      // sortimentet med stock 0) — så den kan prises umiddelbart, før
      // leveringen kommer. Dette ERSTATTER den gamle gratis-startbatchen i
      // CARRY_PRODUCT-flyten.
      const totalCost = action.product.costPrice * action.quantity
      if (state.money < totalCost || action.quantity <= 0) return state

      const alreadyCarried = state.products.some(p => p.id === action.product.id)
      const products = alreadyCarried
        ? state.products
        : [...state.products, { ...action.product, stock: 0 }]

      const order: Bestilling = {
        productId: action.product.id,
        qty: action.quantity,
        bestiltDag: state.dayNumber,
        ankomstDag: state.dayNumber + DAY_CONFIG.leadTimeDays,
        costKr: totalCost,
      }

      return {
        ...state,
        money: state.money - totalCost,
        products,
        incomingOrders: [...state.incomingOrders, order],
        p1_complete: true,
      }
    }

    case 'PLACE_OPENING_ORDER': {
      // Åpningsbestilling (docs/INNKJOP_LEVERING.md): elevens ene selvvalgte
      // startlager. I motsetning til ORDER_PRODUCT (leveringstid) ligger disse
      // FERDIG på lager dag 1 morgen — for kafé «bakes ferske til
      // åpningsdagen», ingen ventetid. Kjøres én gang (openingOrderPlaced
      // gater OpeningOrderOverlay). Tom bestilling er lov (eleven ble advart):
      // ingen varer, ingen kostnad, men flagget settes så overlayet lukkes.
      const def = getActiveIndustryDefinition()
      const products: Product[] = []
      let cost = 0
      for (const { productId, qty } of action.items) {
        if (qty <= 0) continue
        const item = def.katalog.find(c => c.id === productId)
        if (!item) continue
        products.push({ ...catalogToProduct(item), stock: qty })
        cost += item.costPrice * qty
      }
      return {
        ...state,
        // UI hindrer overforbruk (Bekreft er sperret når sum > kapital), så
        // kostnaden trekkes rett av — defensivt kan money bli negativ, samme
        // som resten av økonomien tåler (konkurs-sporet).
        money: state.money - cost,
        products,
        openingOrderPlaced: true,
        p1_complete: products.length > 0 ? true : state.p1_complete,
      }
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

    // Priser-fanen (DEL 3, Prisflyt-oppgaven) — kjøpbar konkurrentpris-innsikt
    // PER VARE, atskilt fra BUY_MARKET_RESEARCH over (den generelle
    // markedsanalysen i Forretningsplan). Snapshot av dagens sortiment:
    // varer ført ETTER kjøpet er ikke dekket før neste kjøp.
    case 'BUY_PRICE_RESEARCH': {
      if (state.money < 2_500) return state
      const ids = new Set([...state.priceResearch.purchasedProductIds, ...state.products.map(p => p.id)])
      return {
        ...state,
        money: state.money - 2_500,
        priceResearch: { purchasedProductIds: [...ids] },
      }
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

    // ── Dagssyklus (DEL 2) ───────────────────────────────────────────────────

    case 'OPEN_DAY': {
      // Kun gyldig fra stengt (defensiv no-op ellers — knappen skal uansett
      // ikke tilby dette utenom 'stengt', se InteriorView).
      if (state.dayPhase !== 'stengt') return state

      // Innkjøp/levering (docs/INNKJOP_LEVERING.md): ankomne bestillinger
      // (ankomstDag <= dagens nummer) legges på lager FØR dagen åpner; resten
      // blir stående underveis. deliveryLines driver morgenmeldingen.
      const arrived = state.incomingOrders.filter(o => o.ankomstDag <= state.dayNumber)
      const stillPending = state.incomingOrders.filter(o => o.ankomstDag > state.dayNumber)

      let products = state.products
      const deliveryLines: DeliveryNote['lines'] = []
      if (arrived.length > 0) {
        const addByProduct = new Map<string, number>()
        for (const o of arrived) addByProduct.set(o.productId, (addByProduct.get(o.productId) ?? 0) + o.qty)
        products = state.products.map(p => {
          const add = addByProduct.get(p.id) ?? 0
          return add > 0 ? { ...p, stock: p.stock + add } : p
        })
        for (const [productId, qty] of addByProduct) {
          const name = state.products.find(p => p.id === productId)?.name ?? productId
          deliveryLines.push({ name, qty })
        }
      }

      return {
        ...state,
        products,
        incomingOrders: stillPending,
        lastDelivery: deliveryLines.length > 0 ? { dayNumber: state.dayNumber, lines: deliveryLines } : null,
        shopOpen: true,
        dayPhase: 'åpen',
        meetingsToday: 0,
        dayStats: { soldStk: 0, soldKr: 0, varekostKr: 0, reputationDelta: 0, xpEarned: 0, stockoutHappened: false },
      }
    }

    case 'CLOSE_DAY': {
      // Kun gyldig fra åpen.
      if (state.dayPhase !== 'åpen') return state

      // BRANSJE-DEFINISJON — svinn HÅNDTERES ulikt per bransje (svinnRegel).
      // 'ferskvare-daglig' (kafeens regel, den ENESTE implementert i dag):
      // alle FERSKVARER med usolgt lager kastes ved stenging, ikke-ferskvarer
      // (drikke) beholder lageret over natten uendret — samme utregning som
      // før denne omleggingen. En fremtidig 'sesong'-regel er
      // reservert (se industryDefinition.ts) men ikke implementert ennå —
      // faller trygt til «ingen svinn» i stedet for å krasje.
      const svinnRegel = getActiveIndustryDefinition().svinnRegel
      let svinnStk = 0
      let svinnKr = 0
      const products = svinnRegel === 'ferskvare-daglig'
        ? state.products.map(p => {
            if (!p.ferskvare || p.stock <= 0) return p
            svinnStk += p.stock
            svinnKr += p.stock * p.costPrice
            return { ...p, stock: 0 }
          })
        : state.products

      const result: DayResult = {
        dayNumber: state.dayNumber,
        month: state.currentMonth,
        year: state.currentYear,
        soldStk: state.dayStats.soldStk,
        soldKr: state.dayStats.soldKr,
        varekostKr: state.dayStats.varekostKr,
        svinnStk,
        svinnKr,
        resultat: state.dayStats.soldKr - state.dayStats.varekostKr - svinnKr,
        reputationDelta: state.dayStats.reputationDelta,
        xpEarned: state.dayStats.xpEarned,
        stockoutHappened: state.dayStats.stockoutHappened,
      }

      return {
        ...state,
        products,
        shopOpen: false,
        dayPhase: 'oppgjør',
        lastDayResult: result,
        dayHistory: [...state.dayHistory, result],
      }
    }

    case 'START_NEW_DAY': {
      // Kun gyldig fra oppgjør (dispatches av DayResultOverlay sin knapp).
      if (state.dayPhase !== 'oppgjør') return state

      const nextDayNumber = state.dayNumber + 1
      const rollsMonth = nextDayNumber > DAY_CONFIG.daysPerMonth
      // Samme envelope-formel som APPLY_MONTH_RESULT (nextMonth/isYearEnd) —
      // gjenbrukt ARITMETIKK, ikke selve handlingen: runde 1 kobler kun
      // dag-telleren på månedstallet, uten å trigge PEST-hendelser eller
      // måneds-rapport-fasen (egen, større simulering, bevisst utenfor
      // scope her — se rapport-kommentaren i oppgaven).
      const nextMonth = state.currentMonth + 1
      const isYearEnd = nextMonth > 12

      return {
        ...state,
        dayNumber: rollsMonth ? 1 : nextDayNumber,
        currentMonth: rollsMonth ? (isYearEnd ? 1 : nextMonth) : state.currentMonth,
        currentYear: rollsMonth && isYearEnd ? state.currentYear + 1 : state.currentYear,
        dayPhase: 'stengt',
        meetingsToday: 0,
        lastDayResult: null,
        // Rydd bort en evt. gammel «Varer ankommet»-pille før neste morgen.
        lastDelivery: null,
      }
    }

    case 'CLEAR_DELIVERY':
      // Lukk morgenleveranse-pilla (interiørscenen).
      return state.lastDelivery ? { ...state, lastDelivery: null } : state

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
export type { GameState, GamePhase, Product, MonthResult, InboxMessage, PestEvent, Loan, GameProgress, BusinessModel, GameFlags, BusinessCanvas, WindowDisplayItem, TrauItem }
