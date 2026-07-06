// ─── AdVenture 3.0 — Core Types ───────────────────────────────────────────

export type Industry = 'cafe' | 'fashion' | 'tech' | 'sports'
export type LocationZone = 'utkant' | 'hovedgata' | 'gagata'
export type BusinessModel = 'detaljhandel' | 'netthandel' | 'produsent' | 'kombinasjon'

export interface Loan {
  id: string
  amount: number
  interestRate: number     // annual decimal, e.g. 0.09
  termMonths: number
  monthlyPayment: number
  remainingBalance: number
  monthsRemaining: number
  totalInterestPaid: number
}

export interface GameProgress {
  industryChosen: boolean
  businessModelChosen: boolean
  targetAudienceDefined: boolean
  productsSelected: boolean
  businessPlanCreated: boolean
  financingSecured: boolean
  locationChosen: boolean
  productsOrdered: boolean
  pricesSet: boolean
  marketingSet: boolean
}
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

/** Varegruppe i katalogen — brukes til gruppering i UI og til å skille
 *  trau-varer (mat) fra ikke-trau (drikke). */
export type ProductCategory = 'frokost' | 'lunsj' | 'brod' | 'kaker' | 'drikke'

export interface Product {
  id: string
  name: string
  icon: string
  /** PARKET (Prisflyt-opprydding 2026-07-06) — alltid 'standard' nå.
   *  Tier-per-vare (Premium/Standard/Budget) kolliderte med resten av
   *  spillet (én vare = ett costPrice/recommendedPrice/retailPrice, se
   *  IndustryCatalogItem.tiers i industries.ts). Feltet beholdes for
   *  personas.ts sin målgruppe-matching (calcPersonaMatchScore), som
   *  fortsatt leser det — men premium/budget-andelen er dermed alltid 0
   *  inntil en ny mekanikk (leverandør-/merkekatalog) erstatter tier. */
  tier: 'premium' | 'standard' | 'budget'
  costPrice: number
  retailPrice: number
  recommendedPrice: number
  stock: number
  quality: number
  sustainability: number
  maxDemandPerMonth: number
  /** Egnet for vindusutstilling (VINDUSLOGIKK). Utelatt/true = vises i
   *  vinduet; false (f.eks. kaffe i pappkopp) = kun i «+N i butikken». */
  windowDisplay?: boolean
  /** Varegruppe (frokost/lunsj/brod/kaker/drikke). */
  category?: ProductCategory
  /** Filsti til vare-utklipp (fra split-product-sheet). Undefined ⇒
   *  placeholder håndteres grasiøst. */
  sprite?: string
  /** true = trau-vare (mat som flislegges i disk-monterens trau). Drikke o.l.
   *  er ikke trau-varer. */
  trauVare?: boolean
  /** Trau-flis-størrelse for DENNE varen (multiplikator, default 1.0) —
   *  flis-størrelse i monteren = trauets egen skala × displayScale. */
  displayScale?: number
  /** Trau-flis-rotasjon for DENNE varen i grader (default 0°) — lagt til
   *  flisens egen jitter-rotasjon. */
  displayRotation?: number
}

// ── Vareeksponering (fri plassering) ──────────────────────────────────────────

/** Hvilken fysiske flate elementet ligger på. To flater deler samme state-liste
 *  og skilles med denne id-en: 'vindu' (fasadens vindusutstilling) og 'monter'
 *  (disk-monteren i interiøret). */
export type FixtureId = 'vindu' | 'monter'

/** Ett element i en manuelt bygget vareeksponering (vindu ELLER disk-monter).
 *
 *  Koordinatsystemet er BRØK (0–1) relativt til FLATENS sone — vindu:
 *  `STOREFRONT_HOTSPOTS.vindu`, monter: `INTERIOR_DISK_DISPLAY` — ikke piksler,
 *  slik at plasseringen overlever re-kalibrering og rendres korrekt i en annen
 *  skala. `x`/`y` er senterpunktet til elementet.
 *
 *  `z` = lagrekkefølge. Beregnes automatisk fra `y` ved hver endring (lavere på
 *  flaten = høyere y = nærmere betrakteren = foran = høyere z), men persisteres
 *  for stabil opptegning.
 *
 *  Skjemaet er bevisst flatt og lett å utvide: en senere simulering kan legge
 *  til f.eks. `attraction`/`relevance`-score som valgfrie felt UTEN å bryte
 *  eksisterende lagrede eksponeringer. */
export interface WindowDisplayItem {
  /** Hvilken flate elementet ligger på. */
  fixtureId: FixtureId
  productId: string
  /** Senter-x som brøk 0–1 av flatens bredde. */
  x: number
  /** Senter-y som brøk 0–1 av flatens høyde. */
  y: number
  /** Lagrekkefølge (avledet av y, persistert). Lavere = bakerst. */
  z: number
}

/** Presentasjonstetthet — spillerens valg av hvor mange fliser som vises for
 *  gitt lagermengde (kapasitet-multiplikator; mellomrommet mellom fliser
 *  følger automatisk siden flere/færre fliser deler samme trau-flate). */
export type TrauDensity = 'tett' | 'standard' | 'luftig'

/** Ett fylt trau i den frontale disk-monteren: hvilken vare som er stilt ut i
 *  trauet (mengden flislegges fra produktets `stock`).
 *
 *  `density`/`sizeAdjust`/`skewAdjust` er spillerens PRESENTASJONSVALG for
 *  DENNE plasseringen (klikk på et fylt trau åpner justeringspanelet i
 *  MonterScene) — kun visuelt uttrykk i v1, ingen scoring ennå, men lagret
 *  slik at en fremtidig eksponerings-score kan lese dem. Fjernes varen
 *  (trauet tømmes), forsvinner justeringen med resten av TrauItem-en.
 *
 *  Bevisst minimal og UTVIDBAR: ferskhet/svinn kan legges til senere som
 *  valgfrie felt (f.eks. `placedMonth`, `freshness`) UTEN å bryte eksisterende
 *  lagrede monter-oppsett. */
export interface TrauItem {
  trauId: string
  productId: string
  /** Default 'standard' når utelatt. */
  density?: TrauDensity
  /** Størrelse-MULTIPLIKATOR oppå varens `displayScale` (industries.ts).
   *  Default 1.0 (= katalogens egen størrelse, uendret) når utelatt. */
  sizeAdjust?: number
  /** Skjevstiller SPORET flisene plasseres langs (bakerste rad ↔ fremste rad
   *  forskjøvet sidelengs, % av trau-bredden) — samme mekanikk som det
   *  tidligere dev-kun `MonterTrau.skew`, nå spillerens verktøy per
   *  plassering. Default 0 (rett spor) når utelatt. */
  skewAdjust?: number
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
  type: 'customer_complaint' | 'pest_event' | 'teacher_task' | 'supplier' | 'mentor' | 'game_event'
  title: string
  body: string
  date: string
  read: boolean
  competenceGoal?: string
  choices?: { text: string; effect: string; eventId?: string; choiceId?: string }[]
}

// ── Business Model Canvas ─────────────────────────────────────────────────────

// Kun de 4 manuelle feltene lagres — de 5 øvrige genereres fra state
export interface BusinessCanvas {
  verditilbud: string
  kundeforhold: string
  nokkelaktiviteter: string
  partnere: string
}

export const EMPTY_CANVAS: BusinessCanvas = {
  verditilbud: '', kundeforhold: '', nokkelaktiviteter: '', partnere: '',
}

// ── Game Flags (innovation/event tracking) ────────────────────────────────────

export interface GameFlags {
  // Oppstart
  bransje: 'tech' | 'baerekraftig' | 'mat' | 'tjeneste' | 'hardware'
  finansieringStart: 'familie' | 'bank' | 'sparepenger' | 'crowdfund' | 'ingen'
  personlighet: 'tekniker' | 'selger' | 'kreativ' | 'analytisk' | 'nettverk'
  // Beslutninger
  tookFamilyLoan: boolean
  tookBankLoan: boolean
  hasInvestor: boolean
  investorOwnership: number
  pivoted: boolean
  pivotCount: number
  hiredFirst: 'developer' | 'sales' | 'marketing' | null
  totalEmployees: number
  techDebt: number
  hasPatent: boolean
  hasInternational: boolean
  hasMergerTalks: boolean
  differentiation_strategy: boolean
  ignored_competition: boolean
  local_focus: boolean
  overcommitted: boolean
  hasMentor: boolean
  family_tension: 'none' | 'high' | 'resolved'
  burnout_risk: 'none' | 'high' | 'resolved'
  // Metrikker
  validationScore: number
  monthlyUsers: number
  monthlyRevenue: number
  burnRate: number
  runwayMonths: number
  reputation: number
  competitorPressure: number
  capital: number
  totalChoiceCount: number
  // Historikk
  triggeredEvents: string[]
  outcome: string | null
  exitValue: number
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

  /** Butikkens drifts-tilstand: STENGT (default, ny butikk starter stengt) =
   *  ingen kunder spawner i interiørscenen, eleven kan stelle disk/vindu i
   *  fred. ÅPEN = kunde-poolen fungerer som normalt. Bevisst et enkelt
   *  boolsk felt nå — en senere dagssyklus (åpne → selg → steng → svinn) kan
   *  bygges oppå dette uten å endre skjemaet. */
  shopOpen: boolean

  // Products & selling
  products: Product[]
  /** Hovedprodukt (VINDUSLOGIKK TILLEGG): vises størst/fremst i vinduet;
   *  brukes av kampanje-/scenariosystemet senere. Ingen demand-effekt. */
  mainProductId: string | null
  /** Kjøpbar prisinnsikt (Priser-fanen, DEL 3) — IKKE samme som
   *  `businessPlan.marketResearchDone` (den generelle markedsanalysen i
   *  Forretningsplan-fanen). Denne er per-vare: `purchasedProductIds`
   *  er et øyeblikksbilde av hvilke varer som var i sortimentet SIST
   *  eleven kjøpte innsikt — konkurrentpris-intervallet vises kun for de
   *  id-ene. Nye varer ført etterpå er ikke dekket ⇒ «ikke undersøkt»,
   *  til eleven kjøper på nytt (utvider snapshotet, koster på nytt). */
  priceResearch: { purchasedProductIds: string[] }
  channels: DistributionChannel[]
  /** Manuelt bygget vareeksponering (fri plassering) — vindu + parkert monter,
   *  skilt på fixtureId. Tom liste = ingenting. Se WindowDisplayItem. */
  windowDisplayLayout: WindowDisplayItem[]
  /** Disk-monterens trau-oppsett (frontal scene): hvilken vare i hvilket trau.
   *  Tom liste = tomme trau. Se TrauItem. */
  counterLayout: TrauItem[]
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

  // Business model & plan
  businessModel: BusinessModel
  businessPlan: {
    description: string
    marketResearchDone: boolean
    qualityScore: number   // 0-5
    canvas: BusinessCanvas
  }

  // Game flags (event / outcome tracking)
  gameFlags: GameFlags

  // Loans / financing
  loans: Loan[]
  totalDebt: number
  monthlyLoanPayment: number
  consecutiveNegativeMonths: number

  // Progress checklist
  progress: GameProgress
}
