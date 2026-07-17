// ─── AdVenture 3.0 — Core Types ───────────────────────────────────────────

import type { RisikoRad, BrannalarmKvalitet, BrannovelseForsok } from './data/beredskap'
import type { BudsjettState, NokkeltallSvar } from './data/budsjett'
import type { KampanjeState } from './data/kampanje'

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
  /** Elevens utsalgspris. Starter 0 (UPRISET) — eleven setter den selv fra blankt
   *  felt (REKALIBRERING DEL 7: prising er elevens jobb). 0 ⇒ ikke i salg. */
  retailPrice: number
  /** MARKEDSPRIS (tidl. `recommendedPrice`) — markedets prisnivå for varen, brukt
   *  som ANKER for priselastisiteten (backgroundSales) og konkurrentpris-
   *  intervallet. Vises ALDRI som «veiledende pris» i elevens prisings-UI
   *  (DEL 7f-a) — det er markedsinfo, ikke en anbefaling. */
  markedsPris: number
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
  /** DAGSSYKLUS (DEL 3, Svinn) — true = ferskvare (bakevarer, salat, wrap,
   *  sandwich): usolgt lager ved dagens slutt blir SVINN (nullstilles, se
   *  CLOSE_DAY). Drikke o.l. er ikke ferskvare — lager beholdes over natten.
   *  Utelatt = false (ikke ferskvare). */
  ferskvare?: boolean
}

// ── Innkjøp og leveringstid (docs/INNKJOP_LEVERING.md) ────────────────────────

/** Én bestilling underveis. Penger trekkes ved bestilling (ORDER_PRODUCT);
 *  varene legges på lager først når `ankomstDag` er nådd (OPEN_DAY). leadTime
 *  er felles i dag (DAY_CONFIG.leadTimeDays) — leverandør-differensiering
 *  kommer med leverandørkatalogen, ikke nå. */
export interface Bestilling {
  productId: string
  qty: number
  /** Handledag bestillingen ble lagt inn (state.dayNumber der og da). */
  bestiltDag: number
  /** Handledag-i-måneden (1..daysPerMonth) varene ankommer. Normalt bestiltDag
   *  + DAY_CONFIG.leadTimeDays, men WRAPPET over månedsskiftet: en ordre lagt
   *  siste handledag ankommer dag 1 i ny måned (ikke en ikke-eksisterende «dag
   *  13»). Ordrer med ankomstDag <= den nye dagen legges på lager ved
   *  START_NEW_DAY (dagstart), før åpning. */
  ankomstDag: number
  /** Total innkjøpskostnad (costPrice × qty) — trukket ved bestilling. */
  costKr: number
}

/** Morgenmelding om ankomne varer (OPEN_DAY) — vises som en avvisbar pille i
 *  interiørscenen. Null når ingenting ankom denne morgenen. */
export interface DeliveryNote {
  dayNumber: number
  lines: { name: string; qty: number }[]
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

/** Rolle-id (BEMANNING/ORGANISASJONSDESIGN). Rollene er nå DATADREVNE per
 *  bransje (IndustryDefinition.roller), så typen er en åpen streng — kjerne-
 *  rollene beholder id-ene 'selger'/'markedsforer'/'okonom', bransjeroller
 *  legges til (kafé: 'innkjop'/'hms'). Funksjonen i org-kartet ER rollen (1:1),
 *  så en «gren» identifiseres av samme rolle-id. */
export type EmployeeRole = string
export type EmployeeLevel = 'junior' | 'senior' | 'ekspert'

/** Én rolle i bransjens rollepalett (ORGANISASJONSDESIGN). Eleven drar
 *  rollekort inn i org-kartet for å OPPRETTE funksjonen; først da kan rollen
 *  ansettes. `vaktrolle` = går på gulvvakt og gir kapasitet i bakgrunnssalget
 *  (kun salgsrollen). `maanedseffekt` = beholder sin månedlige motoreffekt
 *  (markedsføring/økonomi). Roller uten begge deler er ren org-forståelse. */
export interface RolleDef {
  id: EmployeeRole
  /** Funksjonens navn i org-kartet (gren): «Salg», «Innkjøp» … */
  funksjon: string
  /** Jobbtittel på kortet (bransje-spesifikk): «Barista/butikkmedarbeider» … */
  tittel: string
  emoji: string
  farge: string
  vaktrolle: boolean
  maanedseffekt: 'markedsforing' | 'okonomi' | null
  kjerne: boolean
}

/** Vaktvindu på dagsmalen — absolutte klokke-minutter (540 = 09:00, 1020 =
 *  17:00). Én dagsmal gjelder alle dager (ingen ukedager i spillet). */
export interface Shift { fra: number; til: number }

export interface Employee {
  id: string
  /** Generert norsk navn (BEMANNING) — kortene i org-kart/vaktliste. */
  navn: string
  role: EmployeeRole
  level: EmployeeLevel
  monthlySalary: number
  /** Org-kart-plassering (BEMANNING): satt (= rolle-id) = disponert i sin
   *  funksjon, undefined = står på PERSONALBENKEN (udisponert, men koster
   *  fortsatt full lønn). */
  grenId?: EmployeeRole
  /** Gulvvakt på dagsmalen (kun salgsrollen kan settes på vakt). Undefined =
   *  ikke satt på vakt ⇒ koster lønn, bidrar 0 kapasitet. */
  vakt?: Shift
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
  type: 'customer_complaint' | 'pest_event' | 'teacher_task' | 'supplier' | 'mentor' | 'game_event' | 'beredskap' | 'kampanje' | 'hotellavtale'
  title: string
  body: string
  date: string
  read: boolean
  competenceGoal?: string
  choices?: { text: string; effect: string; eventId?: string; choiceId?: string }[]
  /** Valgfri 📚-hublenke (åpnes i ny fane) — f.eks. tilsynsbrevets lenke til
   *  Markedsføringsloven-modulen. */
  hubRute?: string
  hubNavn?: string
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

// ── Dagsoppgjør (DEL 4) ───────────────────────────────────────────────────────

/** Oppgjørstall for ÉN fullført handledag — bygget av CLOSE_DAY fra
 *  dayStats + svinn-beregningen, vist av DayResultOverlay, og lagret i
 *  dayHistory for senere svinn-statistikk. */
export interface DayResult {
  dayNumber: number
  month: number
  year: number
  /** Antall fullførte kundemøter (salgssamtaler) i dag. */
  meetings: number
  /** Kundemøte-salg (fra salgssamtalene). */
  soldStk: number
  soldKr: number
  /** BAKGRUNNSSALG (passiv kundestrøm uten samtale) — antall kunder + solgt. */
  bakgrunnKunder: number
  bakgrunnStk: number
  bakgrunnKr: number
  /** Varekost for ALT salg i dag (møter + bakgrunn). */
  varekostKr: number
  /** Antall enheter ferskvare kastet (stock > 0 ved stenging). */
  svinnStk: number
  /** Kr tapt på svinn (stk × costPrice). */
  svinnKr: number
  /** Tapte salg: bakgrunnskunder som ikke fikk kjøpt (tomt lager) + estimert kr. */
  tapteSalgStk: number
  tapteSalgKr: number
  /** DEL 7b — tapt salg fordi varen MANGLER PRIS (upriset) + antall uprisede
   *  varer i sortimentet, og navnene (for mentor/oppgjør). */
  manglerPrisStk: number
  manglerPrisKr: number
  uprisedeVarer: string[]
  /** DEL 7f — tapt salg fordi prisen var FOR HØY (priselastisitet). Per-vare-liste
   *  (mest tapt først) for oppgjør + mentor: navn, tapte stk, elevens pris, markedspris. */
  overprisStk: number
  overprisKr: number
  overprisProdukter: { navn: string; tapte: number; pris: number; marked: number }[]
  /** BEMANNING: bakgrunnskunder tapt til KØ (for lite kapasitet på vakt). */
  koKunder: number
  /** salg (møter + bakgrunn) − varekost − svinn. */
  resultat: number
  reputationDelta: number
  xpEarned: number
  /** Minst én utsolgt-hendelse i dag (møte-delsalg ELLER tapt bakgrunnssalg). */
  stockoutHappened: boolean
  /** Stengt tidlig (før 17:00) ⇒ resterende bakgrunnskunder bortfalt. */
  stengtTidlig: boolean
  /** Antall bakgrunnskunder som bortfalt fordi eleven stengte tidlig. */
  bortfallStk: number
  /** DEL 4 — produkter som gikk tomt (flest tapte salg først). */
  tomtProdukter: { navn: string; tapte: number }[]
  /** DEL 4 — produkter med mest svinn (flest stk først). */
  svinnProdukter: { navn: string; stk: number }[]
  /** ORGANISASJONSDESIGN: ÉN diskret refleksjonslinje (spørsmål, aldri fasit)
   *  når en org-regel slår ut ved stenging. Null = ingen regel slo ut. */
  refleksjon: string | null
}

/** Dagens bakgrunnssalg-plan (BAKGRUNNSSALG) — beregnet ved OPEN_DAY, tappet
 *  LØPENDE per klokke-tick (SPILLKLOKKE). Seed persisteres mellom tick så
 *  strømmen er deterministisk per dag. */
export interface DayBackground {
  /** Totalt antall bakgrunnskunder for dagen (beregnet ved OPEN_DAY). */
  total: number
  /** Antall prosessert så langt (drypp gjennom åpningstimene). */
  prosessert: number
  /** PRNG-seed (avanseres per forbrukt trekk). */
  seed: number
  /** BEMANNING (kapasitet): opparbeidet, ennå ubrukt betjeningskapasitet
   *  (flyttall — glatter ut at kapasitet/tick < 1 kunde). Kunder som kommer
   *  når `Math.floor(pool)` er tom → tapt salg med årsak «kø». */
  kapasitetRest: number
  /** TEMA 15: andel av dagens bakgrunnskunder som er TURISTER (0 utenom sesong).
   *  Snapshot ved OPEN_DAY så dagen er deterministisk. */
  turistandel: number
  /** TEMA 15: per-kategori pick-vekt i bakgrunnssalget (turister vrir etterspørsel
   *  mot kaffe/kaker). Tom utenom sesong. */
  vareVekt: Record<string, number>
}

/** TEMA 15 REISELIV — turistsesong (tidsavgrenset vindu). Starter når læreren
 *  aktiverer reiseliv-temaet; varer `varighet` handledager. I sesong er en andel
 *  av kundestrømmen turister, trafikken løftes, og etterspørselen vris mot
 *  kaffe/kaker. Tunbart i `balance.ts.turistsesong`. */
export interface Turistsesong {
  /** Absolutt handledag (absDag) sesongen startet. */
  startAbsDag: number
  /** Varighet i handledager (kopiert fra balance ved start). */
  varighet: number
  /** Akkumulert gjennom sesongen (mentor-refleksjon ved sesongslutt). */
  turistKunder: number
  bakgrunnKunder: number
  /** Sesongslutt-refleksjonen er allerede vist (mentor fyres én gang). */
  sluttVist: boolean
}

/** Et planlagt kundemøte på et klokkeslett (SPILLKLOKKE). Kunden spawner når
 *  klokka passerer `minutt`; scenariet er trukket uten gjentakelse ved
 *  OPEN_DAY. */
export interface ScheduledMeeting {
  /** Minutter siden åpning (09:00 = 0). */
  minutt: number
  scenarioId: string
  spawned: boolean
  done: boolean
}

/** Én linje i dagspulsens live-ticker (siste bakgrunnssalg). */
export interface TickerLinje { navn: string; qty: number; kr: number }

/** Månedsoppgjør (ØKONOMI-SAMLING DEL 2) — bygges ved månedsrull
 *  (START_NEW_DAY) fra månedens dagsresultater, og trekker faste kostnader fra
 *  kassa. Driver MonthResultOverlay. IKKE den gamle PEST-måneds-simuleringen
 *  (APPLY_MONTH_RESULT/MonthResult) — det er en egen, urørt flyt. */
export interface MonthSettlement {
  month: number
  year: number
  /** Sum av dagsresultat (salg − varekost − svinn) for månedens stengte dager. */
  inntekt: number
  /** Nedbrytning av de faste månedskostnadene som trekkes ved rull. */
  kostnadslinjer: { navn: string; belop: number }[]
  /** Sum av kostnadslinjer (faste kostnader FRA economy.ts — IKKE lån). */
  fasteKostnader: number
  /** LÅNEAVDRAG denne måneden — renter (0 uten lån). Skilt fra faste kostnader. */
  laanRenter: number
  /** LÅNEAVDRAG denne måneden — avdrag/hovedstol (0 uten lån). */
  laanAvdrag: number
  /** Månedsresultat = inntekt − fasteKostnader − renter − avdrag. */
  resultat: number
  /** Antall stengte handledager måneden faktisk fikk. */
  antallDager: number
  /** TEMA 2/3: brutto salgsinntekt (møter + bakgrunn, FØR varekost/svinn) for
   *  måneden — «Salgsinntekter»-linja i budsjettsammenligningen + nøkkeltall. */
  salgInntektBrutto: number
  /** TEMA 2/3: månedens varekjøp (COGS, sum varekostKr) — «Varekjøp»-linja. */
  varekjop: number
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

  /** Butikkens drifts-tilstand: STENGT = ingen kunder spawner i
   *  interiørscenen, eleven kan stelle disk/vindu i fred. ÅPEN = kunde-
   *  poolen fungerer som normalt (se dayPhase for hele dagssyklusen —
   *  shopOpen er avledet AV/satt SAMMEN MED dayPhase, ikke uavhengig av den:
   *  OPEN_DAY/CLOSE_DAY setter begge samtidig). */
  shopOpen: boolean

  // ── Dagssyklus (DEL 2, runde 1) ──────────────────────────────────────────
  // Handlingsdrevet (ingen sanntidsklokke): stell (stengt) → åpne →
  // DAY_CONFIG.meetingsPerDay kundemøter → steng (svinn + oppgjør) → ny dag.
  /** Handledag-nummer, 1-indeksert. Ruller til 1 igjen når den passerer
   *  DAY_CONFIG.daysPerMonth (se START_NEW_DAY) — currentMonth/currentYear
   *  bumpes samtidig, samme envelope-formel som APPLY_MONTH_RESULT bruker
   *  (uten å trigge PEST-hendelser/measneds-rapport-fasen — det er en egen,
   *  større simulering, bevisst IKKE koblet inn her i runde 1). */
  dayNumber: number
  /** Fullførte kundemøter i DAGENS åpningstid, 0..DAY_CONFIG.meetingsPerDay. */
  meetingsToday: number
  dayPhase: 'stengt' | 'åpen' | 'oppgjør'
  /** Akkumulerer gjennom dagens åpningstid (RESOLVE_SALES_SCENARIO) —
   *  nullstilles av OPEN_DAY, leses av CLOSE_DAY inn i lastDayResult. */
  dayStats: {
    soldStk: number
    soldKr: number
    /** Varekost (costPrice × qty) for ALT salg i dag (møter + bakgrunn) —
     *  trengs for oppgjørets «Resultat: salg − varekost − svinn». */
    varekostKr: number
    /** BAKGRUNNSSALG akkumulert gjennom dagen (per bolk). */
    bakgrunnKunder: number
    bakgrunnStk: number
    bakgrunnKr: number
    /** Tapte bakgrunnssalg pga tomt lager (stk + estimert kr). */
    tapteSalgStk: number
    tapteSalgKr: number
    /** DEL 7b/7f — tapt salg pga manglende pris / for høy pris (adskilt fra
     *  tomt-lager i oppgjøret). */
    manglerPrisStk: number
    manglerPrisKr: number
    overprisStk: number
    overprisKr: number
    /** BEMANNING: bakgrunnskunder som gikk fordi køen var full (kapasitet
     *  på vakt < kundestrøm). Adskilt fra tomt-lager-tap i dagsoppgjøret. */
    koKunder: number
    reputationDelta: number
    xpEarned: number
    /** Minst ett salgsforsøk i dag traff en utsolgt vare (møte eller bakgrunn). */
    stockoutHappened: boolean
  }
  /** Dagens bakgrunnssalg-plan (BAKGRUNNSSALG) — beregnet ved OPEN_DAY, tappet
   *  løpende per klokke-tick. Null utenom en handledag. */
  dayBackground: DayBackground | null
  /** SPILLKLOKKE: minutter siden åpning (0 = 09:00). Tikker kun i 'åpen'. */
  dayMinute: number
  /** Dagens planlagte kundemøter (klokkeslett + scenario), satt ved OPEN_DAY. */
  dayMeetings: ScheduledMeeting[]
  /** Kundemøtet som er spawnet NÅ (venter på/i samtale) — klokka pauser mens
   *  denne er satt. Null ellers. */
  activeMeetingScenarioId: string | null
  /** Dagspulsens live-ticker: siste bakgrunnssalg (nyeste først, kappet). */
  dayTicker: TickerLinje[]
  /** Per-produkt dagstall (DEL 4): solgt (møter + bakgrunn), svinn, tapte salg. */
  dayProductStats: Record<string, { navn: string; soldStk: number; svinnStk: number; tapteSalgStk: number; manglerPrisStk: number; overprisStk: number }>
  /** Siste fullførte dags oppgjørstall — DayResultOverlay vises når denne er
   *  satt (dayPhase === 'oppgjør'). Nullstilles av START_NEW_DAY. */
  lastDayResult: DayResult | null
  /** Historikk over alle fullførte dager — Økonomi-fanen (opptjent denne
   *  måneden + dagsliste) og månedsoppgjøret leser denne. */
  dayHistory: DayResult[]
  /** Siste månedsoppgjør (ØKONOMI-SAMLING DEL 2) — satt ved månedsrull i
   *  START_NEW_DAY, driver MonthResultOverlay. Nullstilles av
   *  DISMISS_MONTH_SETTLEMENT. */
  lastMonthSettlement: MonthSettlement | null

  // ── Innkjøp underveis (docs/INNKJOP_LEVERING.md) ─────────────────────────
  /** Bestillinger som ennå ikke er ankommet. ORDER_PRODUCT legger til;
   *  OPEN_DAY plukker ut de som har ankommet (ankomstDag <= dayNumber),
   *  legger dem på lager og fjerner dem herfra. */
  incomingOrders: Bestilling[]
  /** Siste morgenleveranse (OPEN_DAY) — driver «📦 Varer ankommet»-pilla i
   *  interiørscenen. Null når ingenting ankom / etter at pilla er lukket. */
  lastDelivery: DeliveryNote | null
  /** Åpningsbestilling (docs/INNKJOP_LEVERING.md): false rett etter leie ⇒
   *  OpeningOrderOverlay vises til eleven har lagt inn (eller bevisst hoppet
   *  over) sitt selvvalgte startlager. Settes av PLACE_OPENING_ORDER. */
  openingOrderPlaced: boolean

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
  /** TEMA 8 (DEL D): LØPENDE synlighet — månedlig budsjett per kanal, harmonisert
   *  til de samme 6 navngitte kanalene som kampanjen (kanal-id → kr/mnd). */
  marketingBudget: Record<string, number>
  appealType: 'rational' | 'emotional' | 'combined' | null

  // Staff
  employees: Employee[]
  monthlyPayroll: number
  /** BEMANNING: spillerens (daglig leder) egen gulvvakt på dagsmalen. Gratis
   *  arbeidskraft (lønn 0) med Junior-kapasitet. Null = ikke satt på vakt. */
  playerShift: Shift | null
  /** ORGANISASJONSDESIGN: funksjonene (rolle-id-er) eleven har OPPRETTET i
   *  org-kartet ved å dra rollekort inn. Tomt = kartet har kun Daglig leder.
   *  Ansettelse er kun mulig for roller som finnes her. */
  orgRoller: EmployeeRole[]
  /** DEL 5 (fiksrunde 2) — STEG 1 «Hvem gjør hva?»: personId ('meg' = daglig
   *  leder, ellers employee.id) → tildelte rolleoppgaver. Rein rolle-planlegging;
   *  INGEN mekanisk effekt denne runden (kun refleksjon + utgangspunkt for
   *  org-kartet i steg 2). */
  oppgaveFordeling: Record<string, EmployeeRole[]>
  /** Regnskap/Økonomi satt ut til regnskapsfører («Outsourcet»-boksen) — fast
   *  månedskostnad (balance.regnskapOutsourcingMnd), egen linje i oppgjøret. */
  regnskapOutsourcet: boolean

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

  // ── TEMA 1: Beredskap og risiko (kun i bruk når temaet er aktivt) ──────────
  beredskap: BeredskapState

  // ── TEMA 2 Budsjett + TEMA 3 Nøkkeltall (kun i bruk når temaet er aktivt) ──
  /** Elevens budsjett per måned (nøkkel: maanedNokkel). Persistert. */
  budsjett: BudsjettState
  /** VG2: elevens egne nøkkeltall-svar per måned (nøkkel: maanedNokkel). Persistert. */
  nokkeltall: Record<string, NokkeltallSvar>
  /** TEMA 2/3: transient mentor-payload satt ved månedsrull (leses av de
   *  dynamiske mentor-triggerne ETTER oppgjøret — settlement-tallene er da borte).
   *  Ikke persistert; best-effort samme økt. Null når intet budsjett/nøkkeltall. */
  budsjettOppgjorHint: {
    storstAvvik: { navn: string; budsjett: number; faktisk: number } | null
    dekningsgradAvvik: { ditt: number; bok: number } | null
  } | null

  // ── TEMA 8 Kampanje og markedsplan (kun i bruk når temaet er aktivt) ──
  /** Aktiv kampanje + effektrapport-historikk. Persistert. */
  kampanje: KampanjeState
  /** Absolutt spilldag da produktets retailPrice sist ble AKTIVT endret av eleven
   *  (førpris-regelen). Mangler = etablert pris (aldri endret). Persistert. */
  prisendretDag: Record<string, number>

  // ── TEMA 15 Reiseliv og vertskap (kun i bruk når temaet er aktivt) ──
  /** Aktiv/siste turistsesong (null = aldri startet). Persistert. */
  turistsesong: Turistsesong | null
  /** Byhotellets gjestepakke-avtale (DEL 5): 'ingen' (uavklart), 'akseptert'
   *  (gjestestrøm mot 15 % av pakkesalg), 'avslatt'. Persistert. */
  hotellavtale: 'ingen' | 'akseptert' | 'avslatt'
  /** «Opplev byen»-gjestepakken via turistkontoret (DEL 5) — eleven har meldt
   *  kaféen inn (flere anbefal-scenarier). Persistert. */
  opplevByenPameldt: boolean
}

/** All spilltilstand for tema Beredskap (HMS-fanen + brannalarm-hendelsen).
 *  Nullstilt/tom når temaet er av. */
export interface BeredskapState {
  /** Eleven har lest og bekreftet beredskapsplanen. */
  planBekreftet: boolean
  /** Elevens eget tillegg per plan-avsnitt (brann/ulykke/trussel). Valgfritt på
   *  VG1; VG2 krever minst ett før bekreftelse. */
  planTillegg: Record<string, string>
  /** VG2-refleksjon knyttet til planen (fritekst). */
  planRefleksjon: { storsteRisiko: string; leggeTil: string }
  /** Risikoskjemaet (4 startrader; VG2 kan legge til egne). */
  risikoRader: RisikoRad[]
  /** Eleven har trykt «Lagre vurdering» (kvittering + driver mentor-flyten). */
  risikoLagret: boolean
  /** currentMonth da brannalarmen sist gikk (maks én gang per måned). */
  brannalarmMnd: number | null
  /** Elevens rekkefølge + utfall for siste brannalarm (null før håndtert). */
  brannalarmUtfall: { rekkefolge: string[]; kvalitet: BrannalarmKvalitet; ekte: boolean } | null
  /** VG2 brannøvelse-evaluering (fritekst, etter siste forsøk — skarp eller øvelse). */
  brannovelseEval: { q0: string; q1: string } | null
  /** ØVELSESMODUS-historikk (DEL 4): «Kjør ny brannøvelse»-forsøk uten
   *  konsekvens. Nyeste sist. Skarp alarm lagres separat i brannalarmUtfall. */
  brannovelser: BrannovelseForsok[]
}
