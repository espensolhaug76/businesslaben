import { createContext, useContext, useReducer, useState, useEffect, type ReactNode } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../lib/firebase'
import type { TemaAktivering, TemaNivaa } from './data/temaer'
import type {
  GameState, GamePhase, Industry, LocationZone, BusinessModel,
  Product, Employee, DistributionChannel, MonthResult, InboxMessage, PestEvent, Loan, GameProgress,
  GameFlags, BusinessCanvas, WindowDisplayItem, TrauItem, DayResult, Bestilling, DeliveryNote, MonthSettlement, DayBackground,
  EmployeeRole, Shift,
} from './types'
import { EMPTY_CANVAS } from './types'
import type { SaleLine } from './sales/types'
import type { RisikoRad } from './data/beredskap'
import { RISIKO_RADER_DEFAULT, BRANNALARM, vurderBrannalarm } from './data/beredskap'
import { EVENT_POOL } from '../strategies/innovation/eventPool'
import { getEventsForMonth } from '../strategies/innovation/eventEngine'
import { updateFlags } from '../strategies/innovation/flagSystem'
import { DAY_CONFIG } from './data/dayConfig'
import { getActiveIndustryDefinition } from './data/industryDefinition'
import { catalogToProduct } from './data/industries'
import { manedligeFasteKostnader, amortiserLaan } from './data/economy'
import { maanedNokkel, TOM_BUDSJETT, BUDSJETT_LINJER, faktiskeLinjer, bokfortNokkeltall, type BudsjettLinjeKey, type BudsjettTall, type NokkeltallSvar } from './data/budsjett'
import { kampanjefaktor, kampanjeKostnad, kampanjeFaktiskProsent, kampanjeMerinntekt, kampanjeRoi, MARKEDSFORINGSLOVEN_RUTE, type KampanjeAktiv, type KampanjeResultat, type KampanjeSalgsvare, type KampanjeKanalValg } from './data/kampanje'
import { beregnBakgrunnskunder, simulerBakgrunnsbolk, dagSeed, moterForDag, planleggMoter, kapasitetPaaVakt } from './data/backgroundSales'
import { aktiveFunksjoner, toppRefleksjon } from './data/orgRefleksjon'
import { BALANCE } from './data/balance'
import { scenariosForIndustry, scenariosForMix, TURIST_SCENARIO_IDS } from './sales/scenarios'
import { beregnPakke, velgProfil, BESOKSPROFILER, velgPakkeForesporsler } from './data/reiseliv'
import {
  genererDagensEposter, aktiveUbesvarte, byggTestEposter,
  bestillingBetaling, bestillingKanOppfylles, leverandorNettoBesparelse, tilbudsprisPerEnhet,
  mkfFaktor, mkfTreffProsent,
  type KundebestillingPayload, type LeverandortilbudPayload, type MkftilbudPayload,
} from './data/innboksEpost'

// Tom dagsstatistikk (BAKGRUNNSSALG-feltene inkludert) — brukt av initialState,
// OPEN_DAY (nullstilling).
const EMPTY_DAY_STATS = {
  soldStk: 0, soldKr: 0, varekostKr: 0,
  bakgrunnKunder: 0, bakgrunnStk: 0, bakgrunnKr: 0, tapteSalgStk: 0, tapteSalgKr: 0,
  manglerPrisStk: 0, manglerPrisKr: 0, overprisStk: 0, overprisKr: 0,
  koKunder: 0,
  reputationDelta: 0, xpEarned: 0, stockoutHappened: false,
}

type ProductStats = Record<string, { navn: string; soldStk: number; svinnStk: number; tapteSalgStk: number; manglerPrisStk: number; overprisStk: number }>

/** Slå per-produkt salgs-/tapt-deltaer inn i dagens per-produkt-statistikk. */
function mergeProductStats(base: ProductStats, delta: Record<string, { navn: string; soldStk: number; tapteSalgStk: number; manglerPrisStk?: number; overprisStk?: number }>): ProductStats {
  const out: ProductStats = { ...base }
  for (const [id, d] of Object.entries(delta)) {
    const cur = out[id] ?? { navn: d.navn, soldStk: 0, svinnStk: 0, tapteSalgStk: 0, manglerPrisStk: 0, overprisStk: 0 }
    out[id] = {
      navn: d.navn, soldStk: cur.soldStk + d.soldStk, svinnStk: cur.svinnStk,
      tapteSalgStk: cur.tapteSalgStk + d.tapteSalgStk,
      manglerPrisStk: cur.manglerPrisStk + (d.manglerPrisStk ?? 0),
      overprisStk: cur.overprisStk + (d.overprisStk ?? 0),
    }
  }
  return out
}

/** Hvor mange spillminutter den åpne dagen varer (09:00–17:00). */
const DAG_VARIGHET = BALANCE.klokke.stengMinutt - BALANCE.klokke.apneMinutt
/** Maks antall linjer i dagspulsens ticker. */
const TICKER_MAX = 8

// ─── XP thresholds ──────────────────────────────────────────────────────────

export const XP_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000]

function xpForLevel(level: number): number {
  return XP_THRESHOLDS[level] ?? 10000 + level * 2000
}

// ─── Starting money per industry ────────────────────────────────────────────

const STARTING_MONEY: Record<Industry, number> = {
  // REKALIBRERING (pkt. 35): kafé 150 000 → 200 000. Ny skala har ~87 000 kr
  // faste kostnader/mnd (inkl. eierlønn) mot ~47 000 før, så 150 000 var kun ~1,7
  // mnd runway. 200 000 ≈ 2,3 mnd — nok til å etablere seg og hente seg inn etter
  // tidlige feil, men PASSIV går fortsatt konkurs (~mnd 3). Realistisk
  // arbeidskapital for en liten kafé. Se docs/VERDENSMODELL.md §4.
  cafe:    200_000,
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
  dayStats: { ...EMPTY_DAY_STATS },
  dayBackground: null,
  dayMinute: 0,
  dayMeetings: [],
  activeMeetingScenarioId: null,
  dayTicker: [],
  dayProductStats: {},
  lastDayResult: null,
  dayHistory: [],
  lastMonthSettlement: null,

  incomingOrders: [],
  lastDelivery: null,
  openingOrderPlaced: false,

  products: [],
  mainProductId: null,
  priceResearch: { purchasedProductIds: [] },
  channels: ['physicalStore'],
  windowDisplayLayout: [],
  counterLayout: [],
  marketingBudget: { tiktok: 0, instagram: 0, snapchat: 0, facebook: 0, byposten: 0, 'radio-innlandet': 0 },
  appealType: null,

  employees: [],
  monthlyPayroll: 0,
  playerShift: null,
  orgRoller: [],
  oppgaveFordeling: {},
  regnskapOutsourcet: false,

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
  beredskap: {
    planBekreftet: false,
    planTillegg: {},
    planRefleksjon: { storsteRisiko: '', leggeTil: '' },
    risikoRader: RISIKO_RADER_DEFAULT.map(r => ({ ...r })),
    risikoLagret: false,
    brannalarmMnd: null,
    brannalarmUtfall: null,
    brannovelseEval: null,
    brannovelser: [],
  },
  budsjett: { maaneder: {} },
  nokkeltall: {},
  budsjettOppgjorHint: null,
  kampanje: { aktiv: null, historikk: [], visRapportFor: null },
  prisendretDag: {},
  mkfBoost: null,
  turistsesong: null,
  hotellavtale: 'ingen',
  opplevByenPameldt: false,
  reiselivPakke: null,
  hotellProvisjon: 0,
  hotellProvisjonIntroVist: false,
}

// ─── Actions ────────────────────────────────────────────────────────────────

type Action =
  // ── TEMA 1: Beredskap ──
  | { type: 'CONFIRM_BEREDSKAP_PLAN' }
  | { type: 'SET_PLAN_TILLEGG'; seksjon: string; verdi: string }
  | { type: 'SET_BEREDSKAP_REFLEKSJON'; felt: 'storsteRisiko' | 'leggeTil'; verdi: string }
  | { type: 'SET_RISIKO_RADER'; rader: RisikoRad[] }
  | { type: 'LAGRE_RISIKO' }
  | { type: 'TRIGGER_BRANNALARM' }
  | { type: 'RESOLVE_BRANNALARM'; rekkefolge: string[]; messageId: string }
  | { type: 'RESOLVE_BRANNOVELSE'; rekkefolge: string[] }
  | { type: 'SET_BRANNOVELSE_EVAL'; q0: string; q1: string }
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
  | { type: 'RESOLVE_SALES_SCENARIO'; scenarioId?: string; sales: SaleLine[]; reputationDelta: number; xpEarned: number; cost?: number; stockout?: boolean }
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
  | { type: 'ASSIGN_EMPLOYEE_BRANCH'; id: string; grenId: EmployeeRole | null }
  | { type: 'SET_EMPLOYEE_SHIFT'; id: string; vakt: Shift | null }
  | { type: 'SET_PLAYER_SHIFT'; vakt: Shift | null }
  | { type: 'CREATE_ORG_ROLE'; roleId: EmployeeRole }
  | { type: 'REMOVE_ORG_ROLE'; roleId: EmployeeRole }
  // DEL 5 — «Hvem gjør hva?» (steg 1): oppgavefordeling + outsourcing + seed.
  | { type: 'SET_OPPGAVE'; personId: string; roleId: EmployeeRole; on: boolean }
  | { type: 'SET_REGNSKAP_OUTSOURCET'; on: boolean }
  | { type: 'SEED_ORG_FROM_TASKS' }
  | { type: 'APPLY_MONTH_RESULT'; result: MonthResult }
  | { type: 'ADD_MESSAGE'; message: InboxMessage }
  // Spor C: registrer formidlingsprovisjon fra en booking i hotell-lobbyen.
  | { type: 'REGISTRER_PROVISJON'; kr: number; tilbudNavn: string }
  | { type: 'READ_MESSAGE'; id: string }
  // ── KROK 7 — DEN LEVENDE INNBOKSEN (docs/ENGASJEMENT.md) ──
  /** 7a: takk ja til en kundebestilling (forplikt fram i tid). mengderabatt 0..1
   *  eleven gir; pristilbud = VG2 skriftlig fritekst (vurderingsspor). */
  | { type: 'ACCEPT_KUNDEBESTILLING'; messageId: string; mengderabatt: number; pristilbud?: string }
  /** 7b: takk ja til et leverandørtilbud (rabattert innkjøp på vei til lager). */
  | { type: 'ACCEPT_LEVERANDORTILBUD'; messageId: string }
  /** 7d: takk ja til et markedsføringstilbud (tidsavgrenset trafikkboost). */
  | { type: 'ACCEPT_MKFTILBUD'; messageId: string }
  /** Takk nei til et quest-tilbud (bevisst avslag — ingen konsekvens). */
  | { type: 'DECLINE_EPOST'; messageId: string }
  /** Dev (?dev=1): injiser én test-e-post av hver type nå. */
  | { type: 'DEV_SEND_TEST_EPOSTER' }
  /** Dev (?dev=1): spol alle aktive quest-frister til «i går» (tving utløp/levering). */
  | { type: 'DEV_SPOL_TIL_FRIST' }
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
  // SPILLKLOKKE: ett klokke-tikk (drypp bakgrunnssalg + spawn kundemøte).
  | { type: 'TICK' }
  // Kundemøte lukket uten å fullføre (kunden gikk) — klokka går videre.
  | { type: 'SKIP_MEETING' }
  // Innkjøp/levering (docs/INNKJOP_LEVERING.md): lukk «Varer ankommet»-pilla.
  | { type: 'CLEAR_DELIVERY' }
  // ── TEMA 2 Budsjett + TEMA 3 Nøkkeltall ──
  | { type: 'SET_BUDSJETT'; maaned: string; budsjett: BudsjettTall }
  | { type: 'SET_BUDSJETT_LINJE'; maaned: string; linje: BudsjettLinjeKey; belop: number }
  | { type: 'SET_AVVIK_NOTAT'; maaned: string; linje: string; tekst: string }
  | { type: 'SET_NOKKELTALL_SVAR'; maaned: string; svar: NokkeltallSvar }
  | { type: 'DEV_SIMULER_OPPGJOR' }   // ?dev=1: fabrikker et oppgjør med tydelige avvik
  // ── TEMA 8 Kampanje ──
  | { type: 'START_KAMPANJE'; kampanje: {
      maalType: 'kunder' | 'salg'; maalProsent: number; segmenter: string[];
      kanaler: KampanjeKanalValg[]; varighet: number; situasjon: string;
      salgsvarer: { productId: string; nyPris: number }[]
    } }
  | { type: 'DISMISS_KAMPANJE_RAPPORT' }
  | { type: 'SET_KAMPANJE_ROI_SVAR'; id: string; svar: number }
  | { type: 'DEV_SPOL_KAMPANJE' }   // ?dev=1: spol aktiv kampanje til slutt
  // TEMA 15 Reiseliv — turistsesong + reiselivsavtaler.
  | { type: 'START_TURISTSESONG' }        // auto (tema aktivert) + ?dev=1
  | { type: 'DEV_SPOL_TURISTSESONG_SLUTT' } // ?dev=1: spol til sesongslutt
  | { type: 'MARKER_SESONGSLUTT_VIST' }   // mentor-refleksjonen er vist
  | { type: 'SET_HOTELLAVTALE'; svar: 'akseptert' | 'avslatt' }  // DEL 5
  | { type: 'SET_OPPLEV_BYEN'; pameldt: boolean }                // DEL 5
  | { type: 'SET_REISELIV_PAKKE'; profilId: string; kortIds: string[]; pris: number }  // DEL 7
  // Økonomi-samling (DEL 2): lukk månedsoppgjør-overlayet.
  | { type: 'DISMISS_MONTH_SETTLEMENT' }
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

// ─── TEMA 8 KAMPANJE — reducer-hjelpere ──────────────────────────────────────
/** Monoton absolutt spilldag (dayNumber nullstilles hver måned). */
function absDag(year: number, month: number, dayNumber: number): number {
  return ((year - 1) * 12 + (month - 1)) * DAY_CONFIG.daysPerMonth + dayNumber
}

// ─── KROK 7 — DEN LEVENDE INNBOKSEN — reducer-hjelper ────────────────────────
/** Resolver forfalte quest-e-poster ved en gitt absolutt dag: utløpte frister
 *  (tapt mulighet — aldri stille forsvinning) og forfalte kundeleveranser (nok
 *  lager → betaling + fornøyd kunde, ellers skuffet kunde). Ren funksjon; brukes
 *  av START_NEW_DAY (dagstart) og dev-spol. Refleksjon settes FØRST her (etter
 *  utfallet) — aldri fasit før beslutningen. */
function sveipEposter(
  messages: InboxMessage[], produkter: Product[], absNaa: number,
): { messages: InboxMessage[]; produkter: Product[]; moneyDelta: number; reputationDelta: number } {
  let moneyDelta = 0
  let reputationDelta = 0
  let prod = produkter
  const K = BALANCE.innboks
  const out = messages.map(m => {
    if (!m.epost) return m
    // Utløpt svarfrist (fremdeles ubesvart) → tapt mulighet.
    if (m.epostStatus === 'ubesvart' && m.fristAbsDag != null && m.fristAbsDag < absNaa) {
      const refleksjon = m.epost.kind === 'kundebestilling'
        ? 'Fristen gikk ut uten svar — kunden fant en annen. Tapt mulighet (salg utenom disk).'
        : 'Fristen gikk ut uten svar — tilbudet er ikke lenger gyldig.'
      return { ...m, epostStatus: 'utlopt' as const, read: true, epostRefleksjon: refleksjon }
    }
    // Forfalt kundeleveranse (akseptert bestilling) → betaling eller skuffet kunde.
    if (m.epostStatus === 'akseptert' && m.epost.kind === 'kundebestilling') {
      const p = m.epost
      if (p.leveringAbsDag <= absNaa) {
        if (bestillingKanOppfylles(p, prod)) {
          const betaling = bestillingBetaling(p, prod)
          const trekk = new Map<string, number>()
          for (const v of p.varer) trekk.set(v.productId, (trekk.get(v.productId) ?? 0) + v.qty)
          prod = prod.map(x => trekk.has(x.id) ? { ...x, stock: x.stock - (trekk.get(x.id) ?? 0) } : x)
          moneyDelta += betaling
          reputationDelta += K.ryktVellykketLevering
          const varelinje = p.varer.map(v => `${v.qty} ${v.navn.toLowerCase()}`).join(' + ')
          const rabattTekst = p.mengderabatt ? ` (etter ${Math.round(p.mengderabatt * 100)} % mengderabatt)` : ''
          return { ...m, epostStatus: 'levert' as const, read: true,
            epostRefleksjon: `Levert ${varelinje} — betalt ${betaling} kr${rabattTekst}. Fornøyd kunde (+${K.ryktVellykketLevering} rykte).` }
        }
        reputationDelta += K.ryktSviktetLevering
        return { ...m, epostStatus: 'sviktet' as const, read: true,
          epostRefleksjon: `For lite på lager på leveringsdagen — kunden ble skuffet og dro tomhendt (${K.ryktSviktetLevering} rykte). Neste gang: sikre nok varer i forkant.` }
      }
    }
    return m
  })
  return { messages: out, produkter: prod, moneyDelta, reputationDelta }
}

/** TEMA 15 — er turistsesongen aktiv PÅ en gitt absolutt dag? (startet, og
 *  innenfor varigheten). */
function turistsesongAktivPaa(ts: GameState['turistsesong'], absDagNaa: number): boolean {
  return !!ts && absDagNaa >= ts.startAbsDag && absDagNaa < ts.startAbsDag + ts.varighet
}
/** Er turistsesongen aktiv NÅ (basert på statens dato)? */
function turistsesongAktiv(state: GameState): boolean {
  return turistsesongAktivPaa(state.turistsesong, absDag(state.currentYear, state.currentMonth, state.dayNumber))
}

/** Fullfør en kampanje som har kjørt ferdig: bygg effektrapport, restaurer
 *  ordinære priser på salgsvarene, og lag tilsynsbrev + bot ved førpris-brudd.
 *  Ren funksjon. */
function fullforKampanje(k: KampanjeAktiv, produkter: Product[], ctx: { aar: number; maaned: number; dag: number }): {
  resultat: KampanjeResultat; produkter: Product[]; tilsyn: InboxMessage | null; bot: number
} {
  const kostnad = kampanjeKostnad(k.kanaler, k.varighet)
  const merinntekt = kampanjeMerinntekt(k.akkBakgrunnKr, k.faktor)
  const forprisBrudd = k.salgsvarer.some(v => v.forprisBrudd)
  const resultat: KampanjeResultat = {
    id: k.id, maalType: k.maalType, maalProsent: k.maalProsent,
    faktiskProsent: kampanjeFaktiskProsent(k.faktor), faktor: k.faktor,
    kostnad, merinntekt, roi: kampanjeRoi(merinntekt, kostnad),
    kanaler: k.kanaler, segmenter: k.segmenter, varighet: k.varighet, situasjon: k.situasjon,
    akkBakgrunnKr: k.akkBakgrunnKr, forprisBrudd, aar: ctx.aar, maaned: ctx.maaned, dag: ctx.dag,
  }
  // Restaurer ordinære priser på salgsvarene.
  const restaurer = new Map(k.salgsvarer.map(v => [v.productId, v.ordinaerPris]))
  const nyeProdukter = produkter.map(p => restaurer.has(p.id) ? { ...p, retailPrice: restaurer.get(p.id)! } : p)
  // Førpris-brudd → tilsynsbrev + moderat bot.
  let tilsyn: InboxMessage | null = null
  let bot = 0
  if (forprisBrudd) {
    bot = BALANCE.kampanje.forprisBot
    const varer = k.salgsvarer.filter(v => v.forprisBrudd).map(v => v.navn).join(', ')
    tilsyn = {
      id: `tilsyn_${k.id}`, type: 'kampanje', title: '⚖️ Brev fra Forbrukertilsynet',
      body: `Salgskampanjen din satte ned prisen på ${varer} uten at varen(e) hadde hatt ordinær pris lenge nok på forhånd. Førpris-regelen i markedsføringsloven krever en ekte, tidligere pris før du kan reklamere med et tilbud. Gebyr: ${bot.toLocaleString('nb-NO')} kr. Ingen game over — men les reglene før neste salg.`,
      date: `Dag ${ctx.dag} · Måned ${ctx.maaned}`, read: false,
      competenceGoal: 'Regelverk for markedsføring (førpris) — VG1',
      hubRute: MARKEDSFORINGSLOVEN_RUTE, hubNavn: 'Markedsføringsloven',
    }
  }
  return { resultat, produkter: nyeProdukter, tilsyn, bot }
}

// ─── Reducer ────────────────────────────────────────────────────────────────

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    case 'SET_PHASE':
      return { ...state, phase: action.phase }

    case 'START_GAME':
      return {
        ...initialState,
        // Beredskap persisteres i localStorage og lastes ved init — bevar det
        // gjennom START_GAME (samme «overlever alt»-oppførsel som mentor-
        // triggernes fired-set), slik at temaarbeid ikke nullstilles ved reload.
        beredskap: state.beredskap,
        // TEMA 2/3: budsjett + nøkkeltall persisteres på samme vis — bevar dem.
        budsjett: state.budsjett,
        nokkeltall: state.nokkeltall,
        kampanje: state.kampanje,
        prisendretDag: state.prisendretDag,
        // TEMA 15: turistsesong + reiselivs-avtaler overlever START_GAME.
        turistsesong: state.turistsesong,
        hotellavtale: state.hotellavtale,
        opplevByenPameldt: state.opplevByenPameldt,
        reiselivPakke: state.reiselivPakke,
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

    case 'SET_PRODUCTS': {
      // TEMA 8 (førpris): logg absolutt spilldag når eleven AKTIVT endrer en
      // retailPrice — brukes til førpris-sjekken ved salgskampanje.
      const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      const prisendretDag = { ...state.prisendretDag }
      for (const np of action.products) {
        const gammel = state.products.find(o => o.id === np.id)
        if (gammel && gammel.retailPrice !== np.retailPrice && np.retailPrice > 0) prisendretDag[np.id] = naa
      }
      return {
        ...state,
        products: action.products,
        p1_complete: action.products.length > 0,
        prisendretDag,
      }
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
      const soldByProduct = new Map<string, { navn: string; sold: number }>()
      const products = state.products.map(p => {
        const req = reqByProduct.get(p.id) ?? 0
        if (req <= 0) return p
        const sold = Math.min(req, p.stock)
        revenue += sold * p.retailPrice
        varekost += sold * p.costPrice
        soldStk += sold
        if (sold > 0) soldByProduct.set(p.id, { navn: p.name, sold })
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

      const stockoutNow = (action.stockout ?? false) || action.sales.some(l => l.qty === 0)
      const inDay = state.dayPhase === 'åpen'

      // ISOLASJON: bare det EKTE møtet (scenarioId === activeMeeting) konsumerer
      // møte-state. Et dev-/øvingsscenario startet oppå (annen id, eller ingen
      // aktiv kunde) lar activeMeetingScenarioId/dayMeetings/meetingsToday stå
      // urørt, så et ventende ekte møte gjenopptas rent — ingen spøkelser.
      const isMeeting = inDay && state.activeMeetingScenarioId === action.scenarioId

      // SPILLKLOKKE: er DETTE det ekte møtet? Marker det spawnede møtet som done
      // og fjern aktiv-flagget (bakgrunnssalget dryppes per tick, IKKE her).
      // Per-produkt møte-salg logges i dayProductStats.
      const meetingIdx = isMeeting ? state.dayMeetings.findIndex(m => m.spawned && !m.done) : -1
      const dayMeetings = meetingIdx >= 0
        ? state.dayMeetings.map((m, i) => i === meetingIdx ? { ...m, done: true } : m)
        : state.dayMeetings
      const dayProductStats = inDay
        ? mergeProductStats(state.dayProductStats, Object.fromEntries(
            [...soldByProduct.entries()].map(([id, v]) => [id, { navn: v.navn, soldStk: v.sold, tapteSalgStk: 0 }]),
          ))
        : state.dayProductStats

      return {
        ...state,
        products,
        money: state.money + revenue - Math.max(0, action.cost ?? 0),
        reputation,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: xpToNext,
        // Nuller aktiv-flagget KUN når det ekte møtet fullføres. Et isolert dev-
        // scenario lar det stå (evt. ekte kunde gjenopptas). Kunden vises uansett
        // bare i åpen butikk (InteriorView gater på dayPhase).
        activeMeetingScenarioId: isMeeting ? null : state.activeMeetingScenarioId,
        dayMeetings,
        dayProductStats,
        meetingsToday: isMeeting ? state.meetingsToday + 1 : state.meetingsToday,
        dayStats: inDay ? {
          ...state.dayStats,
          soldStk: state.dayStats.soldStk + soldStk,
          soldKr: state.dayStats.soldKr + revenue,
          varekostKr: state.dayStats.varekostKr + varekost,
          reputationDelta: state.dayStats.reputationDelta + action.reputationDelta,
          xpEarned: state.dayStats.xpEarned + action.xpEarned,
          stockoutHappened: state.dayStats.stockoutHappened || stockoutNow,
          // KROK 4: et FORNØYD kundemøte (positiv rykte-delta) → 💚 i dagspulsen.
          sisteMoteFornoyd: (isMeeting && action.reputationDelta > 0)
            ? { minutt: state.dayMinute } : state.dayStats.sisteMoteFornoyd,
        } : state.dayStats,
      }
    }

    case 'SET_COUNTER_LAYOUT':
      // Disk-monterens trau-oppsett (frontal scene). Hele lista erstattes ved
      // hver endring — ingen egen lagre-knapp.
      return { ...state, counterLayout: action.items }

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

      // MÅNEDSSKIFTE: ankomstDag er en handledag-i-måneden (1..daysPerMonth), og
      // leveringen skjer ved START_NEW_DAY når `ankomstDag <= den nye dagen`. En
      // bestilling lagt siste handledag (dag N + leadTime > daysPerMonth) ville
      // med rå addisjon fått ankomstDag = 13 — en dag som ALDRI inntreffer siden
      // dayNumber resettes til 1 ved månedsrull ⇒ ordren strandet (betalt, aldri
      // levert) og ny måned startet med tom disk. Vi WRAPPER derfor over
      // månedsskiftet: ankomst i ny måned regnes fra dag 1 (leadTime < daysPerMonth,
      // så maks én måned over). Dagstart-leverings-prinsippet består — varene ligger
      // på lager før åpning dag 1 i ny måned.
      const raaAnkomst = state.dayNumber + DAY_CONFIG.leadTimeDays
      const ankomstDag = ((raaAnkomst - 1) % DAY_CONFIG.daysPerMonth) + 1
      const order: Bestilling = {
        productId: action.product.id,
        qty: action.quantity,
        bestiltDag: state.dayNumber,
        ankomstDag,
        costKr: totalCost,
      }

      // Slå sammen duplikatlinjer: samme vare med samme leveringsdag blir ÉN
      // linje med summert antall/kostnad (visning + data), i stedet for flere
      // like rader underveis.
      const mergeIdx = state.incomingOrders.findIndex(o => o.productId === order.productId && o.ankomstDag === order.ankomstDag)
      const incomingOrders = mergeIdx >= 0
        ? state.incomingOrders.map((o, i) => i === mergeIdx ? { ...o, qty: o.qty + order.qty, costKr: o.costKr + order.costKr } : o)
        : [...state.incomingOrders, order]

      return {
        ...state,
        money: state.money - totalCost,
        products,
        incomingOrders,
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
      // TEMA 15 DEL 5 — byhotellets gjestepakke (ikke i EVENT_POOL). Aksept gir
      // ekstra turisttrafikk mot at hotellet tar en andel av pakkesalget (begge
      // deler i balance.ts, virker i OPEN_DAY). Deterministisk.
      if (action.eventId === 'hotellavtale') {
        const svar = action.choiceId === 'aksepter' ? 'akseptert' : 'avslatt'
        const messages = state.messages.filter(m => m.id !== action.messageId)
        return { ...state, hotellavtale: svar, messages, unreadCount: messages.filter(m => !m.read).length }
      }
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

    // ── TEMA 1: BEREDSKAP ─────────────────────────────────────────────────────
    case 'CONFIRM_BEREDSKAP_PLAN':
      return { ...state, beredskap: { ...state.beredskap, planBekreftet: true } }

    case 'SET_PLAN_TILLEGG':
      return { ...state, beredskap: { ...state.beredskap, planTillegg: { ...state.beredskap.planTillegg, [action.seksjon]: action.verdi } } }

    case 'SET_BEREDSKAP_REFLEKSJON':
      return { ...state, beredskap: { ...state.beredskap, planRefleksjon: { ...state.beredskap.planRefleksjon, [action.felt]: action.verdi } } }

    case 'SET_RISIKO_RADER':
      // Endring nullstiller lagret-kvitteringen (eleven må lagre på nytt).
      return { ...state, beredskap: { ...state.beredskap, risikoRader: action.rader, risikoLagret: false } }

    case 'LAGRE_RISIKO':
      return { ...state, beredskap: { ...state.beredskap, risikoLagret: true } }

    case 'TRIGGER_BRANNALARM': {
      // Spawnes i innboksen KUN i åpen dag, når planen er bekreftet og alarmen
      // ikke alt har gått denne måneden. (Tema-aktivt-sjekken gjøres av kalleren
      // — HMS-fanen/effekten finnes bare når temaet er på.) Ekte/falsk
      // randomiseres til utfallsteksten (poenget er handlingen, ikke flaks).
      if (state.dayPhase !== 'åpen' || !state.beredskap.planBekreftet) return state
      if (state.beredskap.brannalarmMnd === state.currentMonth) return state
      const ekte = ((dagSeed(state.dayNumber, state.currentMonth, state.currentYear) >>> 0) % 2) === 0
      const msg: InboxMessage = {
        id: `brannalarm_${state.currentMonth}_${state.dayNumber}`,
        type: 'beredskap',
        title: BRANNALARM.tittel,
        body: BRANNALARM.intro,
        date: `Dag ${state.dayNumber} · Måned ${state.currentMonth}`,
        read: false,
        competenceGoal: 'Beredskap og risiko (VG1/VG2 HMS)',
        // Rekkefølge-øvelsen rendres i innboksen (ingen faste choices her).
      }
      const messages = [...state.messages, msg]
      return {
        ...state,
        messages,
        unreadCount: messages.filter(m => !m.read).length,
        beredskap: { ...state.beredskap, brannalarmMnd: state.currentMonth, brannalarmUtfall: { rekkefolge: [], kvalitet: 'bad', ekte } },
      }
    }

    case 'RESOLVE_BRANNALARM': {
      // Vurder rekkefølgen (uten fasit-avsløring); distraktor/varsling-sist = kaos.
      const { kvalitet } = vurderBrannalarm(action.rekkefolge)
      const k = BRANNALARM.konsekvens[kvalitet]
      const ekte = state.beredskap.brannalarmUtfall?.ekte ?? true
      const reputation = Math.max(0, Math.min(100, state.reputation + k.rep))
      const money = state.money + k.money
      const messages = state.messages.map(m => m.id === action.messageId ? { ...m, read: true } : m)
      return {
        ...state,
        money,
        reputation,
        messages,
        unreadCount: messages.filter(m => !m.read).length,
        beredskap: { ...state.beredskap, brannalarmUtfall: { rekkefolge: action.rekkefolge, kvalitet, ekte } },
      }
    }

    case 'RESOLVE_BRANNOVELSE': {
      // ØVELSESMODUS (DEL 4): samme vurdering som skarp alarm, men INGEN penge-
      // eller rykteeffekt og ingen innboks-melding — kun historikk + refleksjon.
      const { kvalitet } = vurderBrannalarm(action.rekkefolge)
      const forsok = {
        rekkefolge: action.rekkefolge, kvalitet,
        dag: state.dayNumber, maaned: state.currentMonth, aar: state.currentYear,
      }
      return { ...state, beredskap: { ...state.beredskap, brannovelser: [...state.beredskap.brannovelser, forsok] } }
    }

    case 'SET_BRANNOVELSE_EVAL':
      return { ...state, beredskap: { ...state.beredskap, brannovelseEval: { q0: action.q0, q1: action.q1 } } }

    // ── TEMA 2 BUDSJETT ──────────────────────────────────────────────────────
    case 'SET_BUDSJETT': {
      const m = state.budsjett.maaneder[action.maaned]
      if (m?.laastVedOppgjor) return state   // låst etter oppgjør
      return { ...state, budsjett: { maaneder: { ...state.budsjett.maaneder,
        [action.maaned]: { budsjett: action.budsjett, laastVedOppgjor: false, avvikNotater: m?.avvikNotater ?? {} } } } }
    }
    case 'SET_BUDSJETT_LINJE': {
      const m = state.budsjett.maaneder[action.maaned]
      if (m?.laastVedOppgjor) return state   // låst etter oppgjør — ikke redigerbar
      const cur = m ?? { budsjett: { ...TOM_BUDSJETT }, laastVedOppgjor: false, avvikNotater: {} }
      return { ...state, budsjett: { maaneder: { ...state.budsjett.maaneder,
        [action.maaned]: { ...cur, budsjett: { ...cur.budsjett, [action.linje]: action.belop } } } } }
    }
    case 'SET_AVVIK_NOTAT': {
      const m = state.budsjett.maaneder[action.maaned]
      if (!m) return state
      return { ...state, budsjett: { maaneder: { ...state.budsjett.maaneder,
        [action.maaned]: { ...m, avvikNotater: { ...m.avvikNotater, [action.linje]: action.tekst } } } } }
    }
    // ── TEMA 3 NØKKELTALL (VG2) ──
    case 'SET_NOKKELTALL_SVAR':
      return { ...state, nokkeltall: { ...state.nokkeltall, [action.maaned]: action.svar } }

    // ── DEV (?dev=1): fabrikker et månedsoppgjør der MINST to linjer bryter
    // avvikterskelen — for å teste budsjett-/nøkkeltall-oppgjøret uten å spille
    // en hel måned. Bruker elevens budsjett hvis satt, ellers fornuftige tall. ──
    case 'DEV_SIMULER_OPPGJOR': {
      const key = maanedNokkel(state.currentYear, state.currentMonth)
      const b: BudsjettTall = state.budsjett.maaneder[key]?.budsjett ?? {
        salgsinntekter: 60_000, varekjop: 22_000, lonn: state.monthlyPayroll || 15_000,
        husleie: state.monthlyRent || 45_000,
        markedsforing: Object.values(state.marketingBudget).reduce((s, v) => s + v, 0) || 5_000,
        laan: Math.round(amortiserLaan(state.loans).betaling),
      }
      const salg = Math.round(b.salgsinntekter * 0.68)   // ~32 % under budsjett
      const vare = Math.round(b.varekjop * 1.45)          // ~45 % over budsjett
      const kostnadslinjer = [
        { navn: 'Husleie', belop: b.husleie }, { navn: 'Lønn', belop: b.lonn },
        { navn: 'Forsikring/div.', belop: 2000 }, { navn: 'Markedsføring', belop: b.markedsforing },
      ]
      const fasteKostnader = kostnadslinjer.reduce((s, k) => s + k.belop, 0)
      const laanAvdrag = b.laan, laanRenter = 0
      const inntekt = salg - vare
      const settlement: MonthSettlement = {
        month: state.currentMonth, year: state.currentYear, inntekt, kostnadslinjer, fasteKostnader,
        laanRenter, laanAvdrag, resultat: inntekt - fasteKostnader - (laanRenter + laanAvdrag),
        antallDager: DAY_CONFIG.daysPerMonth, salgInntektBrutto: salg, varekjop: vare,
      }
      const budsjett = { maaneder: { ...state.budsjett.maaneder,
        [key]: { budsjett: b, laastVedOppgjor: true, avvikNotater: state.budsjett.maaneder[key]?.avvikNotater ?? {} } } }
      const fakt = faktiskeLinjer(settlement)
      let storstAvvik: { navn: string; budsjett: number; faktisk: number } | null = null
      let bestAbs = -1
      for (const l of BUDSJETT_LINJER) {
        const a = Math.abs(fakt[l.key] - b[l.key])
        if (a > bestAbs) { bestAbs = a; storstAvvik = { navn: l.navn, budsjett: b[l.key], faktisk: Math.round(fakt[l.key]) } }
      }
      const nk = state.nokkeltall[key]
      const dekningsgradAvvik = nk ? { ditt: nk.dekningsgrad, bok: bokfortNokkeltall(settlement).dekningsgrad } : null
      return { ...state, budsjett, lastMonthSettlement: settlement, budsjettOppgjorHint: { storstAvvik, dekningsgradAvvik } }
    }

    // ── TEMA 8 KAMPANJE ───────────────────────────────────────────────────────
    case 'START_KAMPANJE': {
      if (state.kampanje.aktiv) return state                       // én aktiv om gangen
      const p = action.kampanje
      const kostnad = kampanjeKostnad(p.kanaler, p.varighet)
      if (state.money < kostnad) return state                      // ikke råd → no-op (UI gater også)
      const faktor = kampanjefaktor(p.kanaler, p.segmenter)
      const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      // Salgsvarer: ordinær pris + FØRPRIS-sjekk (prisen endret siste 14 dager?).
      const salgsvarer: KampanjeSalgsvare[] = p.salgsvarer.map(sv => {
        const prod = state.products.find(x => x.id === sv.productId)
        const endret = state.prisendretDag[sv.productId]
        const forprisBrudd = endret !== undefined && (naa - endret) < BALANCE.kampanje.forprisDager
        return { productId: sv.productId, navn: prod?.name ?? sv.productId, ordinaerPris: prod?.retailPrice ?? 0, nyPris: sv.nyPris, forprisBrudd }
      })
      // Anvend rabatt (midlertidig — restaureres ved slutt; logges IKKE som prisendring).
      const rabatt = new Map(salgsvarer.map(v => [v.productId, v.nyPris]))
      const products = state.products.map(pr => rabatt.has(pr.id) ? { ...pr, retailPrice: rabatt.get(pr.id)! } : pr)
      const aktiv: KampanjeAktiv = {
        id: `kamp_${state.currentYear}-${state.currentMonth}-${state.dayNumber}-${state.kampanje.historikk.length}`,
        maalType: p.maalType, maalProsent: p.maalProsent, segmenter: p.segmenter, kanaler: p.kanaler,
        varighet: p.varighet, situasjon: p.situasjon, faktor, salgsvarer,
        startAar: state.currentYear, startMaaned: state.currentMonth, startDag: state.dayNumber,
        dagerKjort: 0, akkBakgrunnKr: 0, akkBakgrunnKunder: 0,
      }
      return { ...state, money: state.money - kostnad, products, kampanje: { ...state.kampanje, aktiv } }
    }

    case 'DISMISS_KAMPANJE_RAPPORT':
      return { ...state, kampanje: { ...state.kampanje, visRapportFor: null } }

    case 'SET_KAMPANJE_ROI_SVAR':
      return { ...state, kampanje: { ...state.kampanje, historikk: state.kampanje.historikk.map(r => r.id === action.id ? { ...r, roiElevSvar: action.svar } : r) } }

    // DEV (?dev=1): spol aktiv kampanje til slutt (samme finalisering som CLOSE_DAY).
    case 'DEV_SPOL_KAMPANJE': {
      if (!state.kampanje.aktiv) return state
      const k: KampanjeAktiv = { ...state.kampanje.aktiv, dagerKjort: state.kampanje.aktiv.varighet }
      const f = fullforKampanje(k, state.products, { aar: state.currentYear, maaned: state.currentMonth, dag: state.dayNumber })
      const messages = f.tilsyn ? [...state.messages, f.tilsyn] : state.messages
      return {
        ...state, products: f.produkter, money: state.money - f.bot,
        messages, unreadCount: messages.filter(m => !m.read).length,
        kampanje: { aktiv: null, historikk: [...state.kampanje.historikk, f.resultat], visRapportFor: f.resultat.id },
      }
    }

    // ── TEMA 15 REISELIV — turistsesong + reiselivsavtaler ──────────────────────
    case 'START_TURISTSESONG': {
      // Start (eller restart) en turistsesong fra i dag. Ingen dobbeltstart hvis
      // en sesong alt er aktiv.
      if (turistsesongAktiv(state)) return state
      const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      // DEL 5 — byhotellets gjestepakke-tilbud i innboksen (kun hvis uavklart og
      // ikke alt liggende der). B2B-smakebit; VG2-refleksjon i etterkant.
      const harHotellMsg = state.messages.some(m => m.type === 'hotellavtale')
      const medHotell = (state.hotellavtale === 'ingen' && !harHotellMsg)
        ? [...state.messages, {
            id: `hotellavtale_${naa}`,
            type: 'hotellavtale' as const,
            title: '🏨 Byhotellet vil samarbeide',
            body: 'Hei! Byhotellet setter sammen en gjestepakke for tilreisende og vil gjerne ha kaféen din med som frokost-/kaffestopp. Vi sender gjester til deg gjennom sesongen — mot at hotellet beholder ' + Math.round(BALANCE.turistsesong.hotellKutt * 100) + ' % av det pakkegjestene handler for hos deg. Svar innen 3 dager. Hva sier du?',
            date: `Dag ${state.dayNumber} · Måned ${state.currentMonth}`,
            read: false,
            competenceGoal: 'Reiselivsprodukt og B2B-samarbeid (VG2)',
            choices: [
              { text: 'Ja, vi er med (gjestestrøm mot ' + Math.round(BALANCE.turistsesong.hotellKutt * 100) + ' % kutt)', effect: 'Mer turisttrafikk, lavere margin på pakkesalg', eventId: 'hotellavtale', choiceId: 'aksepter' },
              { text: 'Nei takk, vi står på egne bein', effect: 'Beholder full margin, ingen ekstra gjestestrøm', eventId: 'hotellavtale', choiceId: 'avslaa' },
            ],
          }]
        : state.messages
      // DEL d — 2–3 seedede e-postforespørsler om pakke i innboksen (kun hvis
      // ingen alt ligger der fra denne sesongen). «Svar med en pakke» åpner
      // pakkebyggeren mot forespørselens besøksprofil.
      const seed = dagSeed(state.dayNumber, state.currentMonth, state.currentYear)
      const harForesp = state.messages.some(m => m.type === 'pakkeforesporsel')
      const pakkeMsgs = harForesp ? [] : velgPakkeForesporsler(seed, 2 + (seed % 2)).map(f => ({
        id: `pakkeforesporsel_${f.id}_${naa}`,
        type: 'pakkeforesporsel' as const,
        title: f.tittel,
        body: f.epost,
        date: `Dag ${state.dayNumber} · Måned ${state.currentMonth}`,
        read: false,
        competenceGoal: 'Reiselivsprodukt — les gjestens behov (VG2)',
        pakkeProfilId: f.profilId,
      }))
      const messages = [...medHotell, ...pakkeMsgs]
      return {
        ...state,
        turistsesong: { startAbsDag: naa, varighet: BALANCE.turistsesong.varighet, turistKunder: 0, bakgrunnKunder: 0, sluttVist: false },
        messages,
        unreadCount: messages.filter(m => !m.read).length,
      }
    }
    case 'DEV_SPOL_TURISTSESONG_SLUTT': {
      // ?dev=1: flytt sesongstarten bakover så den akkurat er over NÅ (uten å
      // hoppe i kalenderen) — for å teste sesongslutt-refleksjonen.
      if (!state.turistsesong) return state
      const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      return { ...state, turistsesong: { ...state.turistsesong, startAbsDag: naa - state.turistsesong.varighet } }
    }
    case 'MARKER_SESONGSLUTT_VIST': {
      if (!state.turistsesong) return state
      return { ...state, turistsesong: { ...state.turistsesong, sluttVist: true } }
    }
    case 'SET_HOTELLAVTALE': {
      // Fjern eventuell åpen hotell-innboksmelding når eleven har svart.
      const messages = state.messages.filter(m => m.type !== 'hotellavtale')
      return { ...state, hotellavtale: action.svar, messages, unreadCount: messages.filter(m => !m.read).length }
    }
    case 'SET_OPPLEV_BYEN':
      return { ...state, opplevByenPameldt: action.pameldt }
    case 'SET_REISELIV_PAKKE': {
      // DEL 7: regn treffet mot besøksprofilen (delt fasit, beregnPakke) og lagre
      // resultatet. Profil hentes ETTER id (samme som panelet viste), fallback til
      // sesong-rotasjonen. «X turister kjøpte» skaleres av lokalets turiststrøm.
      // Tom kortliste = «bygg ny pakke» (nullstill resultatet).
      if (action.kortIds.length === 0) return { ...state, reiselivPakke: null }
      const seed = state.turistsesong?.startAbsDag ?? absDag(state.currentYear, state.currentMonth, state.dayNumber)
      const profil = BESOKSPROFILER.find(p => p.id === action.profilId) ?? velgProfil(seed)
      const base = (state.rentedLocationId ? BALANCE.basetrafikk[state.rentedLocationId] : undefined) ?? BALANCE.basetrafikkDefault
      const sesongTuristerPerDag = Math.round(base * BALANCE.turistsesong.turistandel * (1 + BALANCE.turistsesong.trafikkLoft))
      const r = beregnPakke(action.kortIds, profil, sesongTuristerPerDag)
      return { ...state, reiselivPakke: { profilId: profil.id, kortIds: action.kortIds, pris: action.pris, treff: r.treff, turister: r.turister, tilbakemeldinger: r.tilbakemeldinger, egenKafe: r.egenKafe } }
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

    // BEMANNING — org-kart: disponer et kort i en gren (grenId satt) eller
    // send det tilbake til personalbenken (grenId null). Ren plassering, ingen
    // lønns-/kapasitetseffekt her (lønn er uendret; kapasitet styres av vakt).
    case 'ASSIGN_EMPLOYEE_BRANCH': {
      const employees = state.employees.map(e =>
        e.id === action.id ? { ...e, grenId: action.grenId ?? undefined } : e)
      return { ...state, employees }
    }

    // BEMANNING — vaktliste: sett/fjern en ansatts gulvvakt (kun selgere settes
    // på vakt fra UI). Kapasitet leses per klokketick i TICK.
    case 'SET_EMPLOYEE_SHIFT': {
      const employees = state.employees.map(e =>
        e.id === action.id ? { ...e, vakt: action.vakt ?? undefined } : e)
      return { ...state, employees }
    }

    // BEMANNING — spillerens egen gulvvakt (gratis, Junior-kapasitet).
    case 'SET_PLAYER_SHIFT':
      return { ...state, playerShift: action.vakt }

    // ORGANISASJONSDESIGN — opprett en funksjon i org-kartet (dra rollekort inn).
    case 'CREATE_ORG_ROLE':
      return state.orgRoller.includes(action.roleId)
        ? state
        : { ...state, orgRoller: [...state.orgRoller, action.roleId] }

    // ORGANISASJONSDESIGN — fjern en funksjon (dra ut). Kun hvis INGEN ansatt
    // er disponert i den (benk-ansatte av samme rolle blokkerer ikke).
    case 'REMOVE_ORG_ROLE':
      if (state.employees.some(e => e.grenId === action.roleId)) return state
      return { ...state, orgRoller: state.orgRoller.filter(r => r !== action.roleId) }

    // ── DEL 5 — «Hvem gjør hva?» (steg 1) ─────────────────────────────────────
    // Rein planlegging: tildel/fjern en rolleoppgave på en person. Én person kan
    // ha flere; samme oppgave kan deles av flere. Ingen mekanisk effekt.
    case 'SET_OPPGAVE': {
      const fordeling = state.oppgaveFordeling ?? {}
      const cur = fordeling[action.personId] ?? []
      const next = action.on
        ? (cur.includes(action.roleId) ? cur : [...cur, action.roleId])
        : cur.filter(r => r !== action.roleId)
      return { ...state, oppgaveFordeling: { ...fordeling, [action.personId]: next } }
    }

    // Kun Økonomi/regnskap kan settes ut; fast månedskostnad i oppgjøret.
    case 'SET_REGNSKAP_OUTSOURCET':
      return { ...state, regnskapOutsourcet: action.on }

    // Steg 1 → steg 2: opprett funksjoner fra oppgavefordelingen. UNION — fjerner
    // ingenting eleven alt har i kartet (utgangspunkt, ikke lås). Outsourcet
    // økonomi opprettes IKKE som intern funksjon.
    case 'SEED_ORG_FROM_TASKS': {
      const tildelte = new Set<string>()
      for (const roller of Object.values(state.oppgaveFordeling ?? {})) for (const r of roller) tildelte.add(r)
      if (state.regnskapOutsourcet) tildelte.delete('okonom')
      const merged = [...new Set<string>([...state.orgRoller, ...tildelte])]
      return { ...state, orgRoller: merged }
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

      // Process loans (LÅNEAVDRAG) — samme delte amortiseringskilde som
      // dagssyklusens månedsrull (economy.amortiserLaan), så beregningen ikke
      // dupliseres. Her trekkes selve betalingen fortsatt via r.profit
      // (engine.ts har monthlyLoanPayment i kostnadene) — amortiseringen
      // oppdaterer KUN restgjelda, den rører ikke `money` (ingen dobbelttrekk).
      const { loans: updatedLoans } = amortiserLaan(state.loans)
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

    case 'REGISTRER_PROVISJON': {
      // Spor C: legg formidlingsprovisjonen til hotell-driften. FØRSTE gang
      // fyrer en mentor-note (innboks) om hva provisjon er, og hvorfor tillit er
      // hotellets egentlige valuta. Ingen fasit — bare begrepet + spørsmålet.
      const forste = !state.hotellProvisjonIntroVist
      const messages = forste
        ? [...state.messages, {
            id: `provisjon_intro_${state.dayNumber}`,
            type: 'mentor' as const,
            title: '🧑‍🏫 Provisjon — og hotellets egentlige valuta',
            body: `Du fikk nettopp ${action.kr} kr i PROVISJON for å formidle «${action.tilbudNavn}» — en andel av prisen, betalt av tilbyderen. Fristende, ikke sant? Men husk: en gjest som ble anbefalt noe som IKKE passet, kommer sjelden tilbake. Tilliten er det hotellet egentlig lever av. Anbefal det som er RIKTIG for gjesten — provisjonen kommer av seg selv når folk stoler på deg.`,
            date: `Dag ${state.dayNumber} · Måned ${state.currentMonth}`,
            read: false,
          }]
        : state.messages
      return {
        ...state,
        hotellProvisjon: state.hotellProvisjon + Math.max(0, Math.round(action.kr)),
        hotellProvisjonIntroVist: true,
        messages,
        unreadCount: forste ? state.unreadCount + 1 : state.unreadCount,
      }
    }

    case 'READ_MESSAGE': {
      const messages = state.messages.map(m => m.id === action.id ? { ...m, read: true } : m)
      const unreadCount = messages.filter(m => !m.read).length
      return { ...state, messages, unreadCount }
    }

    // ── KROK 7 — DEN LEVENDE INNBOKSEN (docs/ENGASJEMENT.md) ──────────────────
    case 'ACCEPT_KUNDEBESTILLING': {
      // 7a: forpliktelse fram i tid. Ingen betaling nå — levering (og betaling
      // eller skuffet kunde) skjer på leveringsdagen (START_NEW_DAY-sveipet).
      const msg = state.messages.find(m => m.id === action.messageId)
      if (!msg || msg.epost?.kind !== 'kundebestilling' || msg.epostStatus !== 'ubesvart') return state
      const rabatt = Math.max(0, Math.min(0.5, action.mengderabatt))
      const payload: KundebestillingPayload = { ...msg.epost, mengderabatt: rabatt, pristilbud: action.pristilbud }
      const antallStk = payload.varer.reduce((s, v) => s + v.qty, 0)
      const messages = state.messages.map(m => m.id === action.messageId
        ? { ...m, read: true, epostStatus: 'akseptert' as const, epost: payload,
            epostRefleksjon: `Du forpliktet deg til å levere ${antallStk} stk ${payload.leveringTekst}. Sørg for nok på lager til da — mangler du varer, blir kunden skuffet.` }
        : m)
      return { ...state, messages, unreadCount: messages.filter(m => !m.read).length }
    }

    case 'ACCEPT_LEVERANDORTILBUD': {
      // 7b: rabattert innkjøp på vei til lager (samme leveringspipeline som ORDER_PRODUCT).
      const msg = state.messages.find(m => m.id === action.messageId)
      if (!msg || msg.epost?.kind !== 'leverandortilbud' || msg.epostStatus !== 'ubesvart') return state
      const p: LeverandortilbudPayload = msg.epost
      const enhetspris = tilbudsprisPerEnhet(p)
      const totalCost = enhetspris * p.antall
      if (state.money < totalCost) return state
      const raaAnkomst = state.dayNumber + DAY_CONFIG.leadTimeDays
      const ankomstDag = ((raaAnkomst - 1) % DAY_CONFIG.daysPerMonth) + 1
      const ankomstAbsDag = absDag(state.currentYear, state.currentMonth, state.dayNumber + DAY_CONFIG.leadTimeDays)
      // Tilbudet gjelder alltid en vare eleven allerede fører (generert fra
      // sortimentet) — ingen føring nødvendig; leveringen legges på eksisterende lager.
      const mergeIdx = state.incomingOrders.findIndex(o => o.productId === p.productId && o.ankomstDag === ankomstDag)
      const order: Bestilling = { productId: p.productId, qty: p.antall, bestiltDag: state.dayNumber, ankomstDag, costKr: totalCost }
      const incomingOrders = mergeIdx >= 0
        ? state.incomingOrders.map((o, i) => i === mergeIdx ? { ...o, qty: o.qty + order.qty, costKr: o.costKr + order.costKr } : o)
        : [...state.incomingOrders, order]
      // Post-hoc refleksjon (etter beslutning): regnestykket avsløres nå.
      const netto = leverandorNettoBesparelse(p)
      const refleksjon = netto >= 0
        ? `Regnestykket: ${enhetspris} kr/stk mot din normale ${p.normalKostPerEnhet} kr/stk → du sparte ${netto} kr på ${p.antall} enheter.`
        : `Regnestykket: ${enhetspris} kr/stk er faktisk DYRERE enn din normale ${p.normalKostPerEnhet} kr/stk — «rabatten» var regnet fra en oppblåst listepris. Du betalte ${-netto} kr for mye. Sjekk alltid om rabatten er reell.`
      const messages = state.messages.map(m => m.id === action.messageId
        ? { ...m, read: true, epostStatus: 'akseptert' as const, epost: { ...p, ankomstAbsDag }, epostRefleksjon: refleksjon }
        : m)
      return { ...state, money: state.money - totalCost, incomingOrders, messages, unreadCount: messages.filter(m => !m.read).length }
    }

    case 'ACCEPT_MKFTILBUD': {
      // 7d: tidsavgrenset trafikkboost via kampanjens skjulte kanal×målgruppe-treff.
      const msg = state.messages.find(m => m.id === action.messageId)
      if (!msg || msg.epost?.kind !== 'mkftilbud' || msg.epostStatus !== 'ubesvart') return state
      const p: MkftilbudPayload = msg.epost
      if (state.money < p.kostnad) return state
      const segmenter = state.targetAudience.ageGroups
      const faktor = mkfFaktor(p, segmenter)
      const treff = mkfTreffProsent(p, segmenter)
      const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      // Post-hoc refleksjon: treff i EGEN målgruppe avsløres først nå.
      const treffVurdering = treff >= 40 ? 'traff målgruppa godt' : treff >= 20 ? 'traff målgruppa delvis' : 'traff målgruppa dårlig'
      const merke = p.merkekrav ? ' Husk: betalt omtale SKAL merkes som reklame (markedsføringsloven).' : ''
      const refleksjon = `Kanalen ${treffVurdering} (${treff} % daglig treff i din valgte målgruppe). Løft ≈ +${Math.round((faktor - 1) * 100)} % trafikk i ${p.varighetDager} dager for ${p.kostnad} kr.${merke}`
      const messages = state.messages.map(m => m.id === action.messageId
        ? { ...m, read: true, epostStatus: 'akseptert' as const, epostRefleksjon: refleksjon }
        : m)
      return {
        ...state,
        money: state.money - p.kostnad,
        mkfBoost: { faktor, sluttAbsDag: naa + p.varighetDager, kanalNavn: p.kanalNavn },
        messages, unreadCount: messages.filter(m => !m.read).length,
      }
    }

    case 'DECLINE_EPOST': {
      const msg = state.messages.find(m => m.id === action.messageId)
      if (!msg || !msg.epost || msg.epostStatus !== 'ubesvart') return state
      const messages = state.messages.map(m => m.id === action.messageId
        ? { ...m, read: true, epostStatus: 'avslatt' as const, epostRefleksjon: 'Du takket nei. Ingen forpliktelse — noen ganger er det riktige svaret nei.' }
        : m)
      return { ...state, messages, unreadCount: messages.filter(m => !m.read).length }
    }

    case 'DEV_SEND_TEST_EPOSTER': {
      const nye = byggTestEposter(state.products, state.dayNumber, state.currentMonth, state.currentYear)
      const messages = [...state.messages, ...nye]
      return { ...state, messages, unreadCount: messages.filter(m => !m.read).length }
    }

    case 'DEV_SPOL_TIL_FRIST': {
      // Tving alle aktive quest-frister/leveranser til å forfalle NÅ, og resolver
      // dem umiddelbart (samme sveip som dagstart) — så dev kan se konsekvensen.
      const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      const forfalt = state.messages.map(m => {
        if (!m.epost) return m
        if (m.epostStatus === 'ubesvart') return { ...m, fristAbsDag: naa - 1 }
        if (m.epostStatus === 'akseptert' && m.epost.kind === 'kundebestilling')
          return { ...m, epost: { ...m.epost, leveringAbsDag: naa } }
        return m
      })
      const sveip = sveipEposter(forfalt, state.products, naa)
      return {
        ...state,
        messages: sveip.messages,
        products: sveip.produkter,
        money: state.money + sveip.moneyDelta,
        reputation: Math.max(0, Math.min(100, state.reputation + sveip.reputationDelta)),
        unreadCount: sveip.messages.filter(m => !m.read).length,
      }
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

      // Innkjøp/levering (docs/INNKJOP_LEVERING.md): varene ankommer nå ved
      // DAGSTART (START_NEW_DAY) — lageret er allerede fylt FØR åpning, så
      // eleven kan stelle disk/vindu med de nye varene og SÅ åpne. Her åpner vi
      // bare butikken; lager/incomingOrders/lastDelivery røres ikke.
      const products = state.products

      // BAKGRUNNSSALG (snapshot ved OPEN_DAY): dagens passive kundestrøm
      // beregnes NÅ og DRYPPES løpende per klokke-tick (se TICK).
      const seed = dagSeed(state.dayNumber, state.currentMonth, state.currentYear)
      const baseKunder = beregnBakgrunnskunder({
        lokaleId: state.rentedLocationId,
        rykte: state.reputation,
        products,
        counterLayout: state.counterLayout,
        windowDisplayLayout: state.windowDisplayLayout,
        marketingBudget: state.marketingBudget,
        segmenter: state.targetAudience.ageGroups,
      })
      // TEMA 8: aktiv kampanje løfter trafikken med sin (låste) faktor.
      const kampAktiv = state.kampanje.aktiv && state.kampanje.aktiv.dagerKjort < state.kampanje.aktiv.varighet
      let kunder = kampAktiv ? Math.round(baseKunder * state.kampanje.aktiv!.faktor) : baseKunder
      // KROK 7d: akseptert markedsføringstilbud gir et tidsavgrenset trafikkløft
      // (samme skjulte kanal×målgruppe-treff som kampanjen). Gjelder t.o.m. sluttAbsDag.
      const idagAbs = absDag(state.currentYear, state.currentMonth, state.dayNumber)
      if (state.mkfBoost && state.mkfBoost.sluttAbsDag >= idagAbs) {
        kunder = Math.round(kunder * state.mkfBoost.faktor)
      }
      // TEMA 15: turistsesong løfter trafikken (+ hotellavtale-bonus ved aksept)
      // og setter turistandel/vare-vekt for bakgrunnssalget (deterministisk snapshot).
      const sesong = turistsesongAktiv(state)
      let turistandel = 0
      let vareVekt: Record<string, number> = {}
      if (sesong) {
        const T = BALANCE.turistsesong
        const hotellBonus = state.hotellavtale === 'akseptert' ? T.hotellTrafikkBonus : 0
        // DEL 7: egen kafé i reiselivspakken → ekstra gjestestrøm i sesongen.
        const pakkeBonus = state.reiselivPakke?.egenKafe ? T.pakke.kafeTrafikkBonus : 0
        kunder = Math.round(kunder * (1 + T.trafikkLoft + hotellBonus + pakkeBonus))
        turistandel = T.turistandel
        vareVekt = T.vareVekt
      }
      const dayBackground: DayBackground = { total: kunder, prosessert: 0, seed, kapasitetRest: 0, turistandel, vareVekt }

      // SPILLKLOKKE: planlegg dagens kundemøter på klokkeslett (avtagende antall
      // fra dag 3). Scenariene trekkes uten gjentakelse til poolen er tømt.
      // TEMA 15 bølge 3 v3: turist-scenariene er FLYTTET UT av kaféens
      // kundemøte-strøm (til turistkontoret + byhotellet) — de filtreres derfor
      // ALLTID bort fra kafépoolen. Sesongeffekten i kaféen er kun økonomisk
      // (trafikkløft + varevekt, satt over): byen har flere folk.
      const basePool = scenariosForMix(
        scenariosForIndustry(getActiveIndustryDefinition().scenariePool),
        DAY_CONFIG.scenarioMix,
      ).map(s => s.id)
      const poolIds = basePool.filter(id => !TURIST_SCENARIO_IDS.includes(id))
      const dayMeetings = planleggMoter(moterForDag(state.dayNumber), poolIds, (Math.imul(seed, 2654435761)) >>> 0)

      return {
        ...state,
        products,
        shopOpen: true,
        dayPhase: 'åpen',
        meetingsToday: 0,
        dayStats: { ...EMPTY_DAY_STATS },
        dayBackground,
        dayMinute: 0,
        dayMeetings,
        activeMeetingScenarioId: null,
        dayTicker: [],
        dayProductStats: {},
      }
    }

    case 'TICK': {
      // SPILLKLOKKE: ett klokke-tikk. Kun i åpningstid og når INGEN kundemøte
      // er aktivt (klokka pauser under samtale). Avanserer klokka, drypper
      // bakgrunnssalg proporsjonalt med forløpt åpningstid, og spawner et
      // kundemøte når klokka passerer et planlagt tidspunkt.
      if (state.dayPhase !== 'åpen' || state.activeMeetingScenarioId) return state
      const nyMinutt = Math.min(DAG_VARIGHET, state.dayMinute + BALANCE.klokke.minutterPerTick)

      let products = state.products
      let money = state.money
      let dayStats = state.dayStats
      let dayProductStats = state.dayProductStats
      let dayTicker = state.dayTicker
      let dayBackground = state.dayBackground
      let turistsesong = state.turistsesong   // TEMA 15: akkumuler sesongens tall

      if (state.dayBackground) {
        // BEMANNING (kapasitet): betjeningskapasitet opparbeides HVERT tikk
        // (også når ingen kunde kom akkurat da — idle-kapasitet «venter» litt),
        // = kapasitet/time på vakt × spillminutter per tikk / 60. Kunder utover
        // ledig kapasitet når de kommer → tapt salg med årsak «kø».
        const klokkeMinutt = BALANCE.klokke.apneMinutt + nyMinutt
        const kapPerTick = kapasitetPaaVakt(state.employees, state.playerShift, klokkeMinutt) * BALANCE.klokke.minutterPerTick / 60
        let pool = state.dayBackground.kapasitetRest + kapPerTick

        // Så mange kunder BØR ha kommet innom ved dette klokkeslettet.
        const mål = Math.round(state.dayBackground.total * (nyMinutt / Math.max(1, DAG_VARIGHET)))
        const ankomne = Math.max(0, mål - state.dayBackground.prosessert)
        const betjent = Math.min(ankomne, Math.floor(pool))
        const koKunder = ankomne - betjent
        pool -= betjent
        // Ubrukt kapasitet bankes ikke opp i det uendelige (staff-tid tapes) —
        // hold igjen inntil ~ett tikk med slakk for å glatte avrunding.
        pool = Math.min(pool, kapPerTick + 1)

        let seed = state.dayBackground.seed
        if (betjent > 0) {
          // Kun de BETJENTE kundene når disken (kan så tape til tomt lager).
          const r = simulerBakgrunnsbolk(state.products, betjent, state.dayBackground.seed, state.dayBackground.vareVekt)
          products = r.products
          // DEL 5: har eleven takket JA til hotellpakken, tar hotellet sin andel
          // av pakkegjestenes forbruk i sesong → lavere REALISERT omsetning (og
          // dermed margin) for kaféen. Andelen = hotellKutt × pakkegjest-share.
          const T = BALANCE.turistsesong
          const pakkeShare = T.hotellTrafikkBonus / (1 + T.trafikkLoft + T.hotellTrafikkBonus)
          const hotellMargin = (state.dayBackground.turistandel > 0 && state.hotellavtale === 'akseptert')
            ? (1 - T.hotellKutt * pakkeShare) : 1
          const nettoBakgrunnKr = Math.round(r.bakgrunnKr * hotellMargin)
          money = state.money + nettoBakgrunnKr
          seed = r.seed
          dayStats = {
            ...dayStats,
            varekostKr: dayStats.varekostKr + r.varekostKr,
            bakgrunnKunder: dayStats.bakgrunnKunder + r.bakgrunnKunder,
            bakgrunnStk: dayStats.bakgrunnStk + r.bakgrunnStk,
            bakgrunnKr: dayStats.bakgrunnKr + nettoBakgrunnKr,
            tapteSalgStk: dayStats.tapteSalgStk + r.tapteSalgStk,
            tapteSalgKr: dayStats.tapteSalgKr + r.tapteSalgKr,
            manglerPrisStk: dayStats.manglerPrisStk + r.manglerPrisStk,
            manglerPrisKr: dayStats.manglerPrisKr + r.manglerPrisKr,
            overprisStk: dayStats.overprisStk + r.overprisStk,
            overprisKr: dayStats.overprisKr + r.overprisKr,
            stockoutHappened: dayStats.stockoutHappened || r.tapteSalgStk > 0,
          }
          dayProductStats = mergeProductStats(dayProductStats, r.perProdukt)
          dayTicker = [...r.ticker, ...dayTicker].slice(0, TICKER_MAX)
          // TEMA 15: akkumuler sesongens turist-/bakgrunnstall (mentor-refleksjon).
          if (turistsesong && state.dayBackground.turistandel > 0) {
            turistsesong = {
              ...turistsesong,
              turistKunder: turistsesong.turistKunder + Math.round(r.bakgrunnKunder * state.dayBackground.turistandel),
              bakgrunnKunder: turistsesong.bakgrunnKunder + r.bakgrunnKunder,
            }
          }
        }
        if (koKunder > 0) dayStats = { ...dayStats, koKunder: dayStats.koKunder + koKunder }
        // `prosessert` teller ALLE ankomne (betjent + kø) så drypp-kurven ikke
        // etterbetjener kø-tapte kunder senere. kapasitetRest persisteres.
        dayBackground = { ...state.dayBackground, prosessert: state.dayBackground.prosessert + ankomne, seed, kapasitetRest: pool }
      }

      // Spawn ETT forfalt kundemøte (klokka pauser til det er ferdig).
      let dayMeetings = state.dayMeetings
      let activeMeetingScenarioId = state.activeMeetingScenarioId
      const dueIdx = state.dayMeetings.findIndex(m => !m.spawned && !m.done && m.minutt <= nyMinutt)
      if (dueIdx >= 0) {
        dayMeetings = state.dayMeetings.map((m, i) => i === dueIdx ? { ...m, spawned: true } : m)
        activeMeetingScenarioId = state.dayMeetings[dueIdx]!.scenarioId
      }

      return { ...state, dayMinute: nyMinutt, products, money, dayStats, dayProductStats, dayTicker, dayBackground, dayMeetings, activeMeetingScenarioId, turistsesong }
    }

    case 'CLOSE_DAY': {
      // Kun gyldig fra åpen.
      if (state.dayPhase !== 'åpen') return state

      // SPILLKLOKKE: bakgrunnssalget er allerede dryppet per tick. Stenges det
      // TIDLIG (før 17:00) bortfaller de resterende bakgrunnskundene — de
      // telles som TAPTE SALG (egen «stengt tidlig»-linje), ikke som salg.
      const stengtTidlig = state.dayMinute < DAG_VARIGHET
      const bortfallStk = stengtTidlig && state.dayBackground
        ? Math.max(0, state.dayBackground.total - state.dayBackground.prosessert)
        : 0
      const priced = state.products.filter(p => p.retailPrice > 0)
      const avgRetail = priced.length ? Math.round(priced.reduce((a, p) => a + p.retailPrice, 0) / priced.length) : 0

      // BRANSJE-DEFINISJON — svinn per svinnRegel. 'ferskvare-daglig': usolgt
      // ferskvare kastes ved stenging (per-produkt logget for dagsoppgjøret).
      const svinnRegel = getActiveIndustryDefinition().svinnRegel
      let svinnStk = 0
      let svinnKr = 0
      const dps: ProductStats = { ...state.dayProductStats }
      const products = svinnRegel === 'ferskvare-daglig'
        ? state.products.map(p => {
            if (!p.ferskvare || p.stock <= 0) return p
            svinnStk += p.stock
            svinnKr += p.stock * p.costPrice
            const cur = dps[p.id] ?? { navn: p.name, soldStk: 0, svinnStk: 0, tapteSalgStk: 0, manglerPrisStk: 0, overprisStk: 0 }
            dps[p.id] = { ...cur, navn: p.name, svinnStk: cur.svinnStk + p.stock }
            return { ...p, stock: 0 }
          })
        : state.products

      const soldKr = state.dayStats.soldKr
      const varekostKr = state.dayStats.varekostKr
      const bakgrunnKr = state.dayStats.bakgrunnKr
      const tapteSalgStk = state.dayStats.tapteSalgStk + bortfallStk
      const tapteSalgKr = state.dayStats.tapteSalgKr + bortfallStk * avgRetail

      // DEL 4 — topp-3 produkter som gikk tomt / hadde mest svinn.
      const tomtProdukter = Object.values(dps)
        .filter(p => p.tapteSalgStk > 0).sort((a, b) => b.tapteSalgStk - a.tapteSalgStk)
        .slice(0, 3).map(p => ({ navn: p.navn, tapte: p.tapteSalgStk }))
      const svinnProdukter = Object.values(dps)
        .filter(p => p.svinnStk > 0).sort((a, b) => b.svinnStk - a.svinnStk)
        .slice(0, 3).map(p => ({ navn: p.navn, stk: p.svinnStk }))

      // DEL 7b/7f — uprisede varer (mangler pris) + varer som tapte salg på for høy
      // pris (per vare, med elevens pris vs. markedspris for mentor/oppgjør).
      const uprisedeVarer = state.products.filter(p => p.retailPrice <= 0).map(p => p.name)
      const overprisProdukter = Object.entries(dps)
        .filter(([, p]) => p.overprisStk > 0).sort(([, a], [, b]) => b.overprisStk - a.overprisStk)
        .slice(0, 3).map(([id, p]) => {
          const vare = state.products.find(v => v.id === id)
          return { navn: p.navn, tapte: p.overprisStk, pris: vare?.retailPrice ?? 0, marked: vare?.markedsPris ?? 0 }
        })

      // ORGANISASJONSDESIGN — ÉN diskret refleksjonslinje hvis en org-regel slår
      // ut (spørsmål, aldri fasit). Omsetning denne måneden = dagshistorikk +
      // dagens salg.
      const omsetningMnd = state.dayHistory
        .filter(d => d.month === state.currentMonth && d.year === state.currentYear)
        .reduce((s, d) => s + d.soldKr + d.bakgrunnKr, 0) + soldKr + bakgrunnKr
      const funksjoner = aktiveFunksjoner(state.orgRoller, state.employees)
      const refleksjon = toppRefleksjon({
        harFunksjon: id => funksjoner.includes(id),
        ansatte: state.employees.length,
        disponerte: state.employees.filter(e => e.grenId).length,
        omsetningMnd,
      })

      const result: DayResult = {
        dayNumber: state.dayNumber,
        month: state.currentMonth,
        year: state.currentYear,
        meetings: state.meetingsToday,
        soldStk: state.dayStats.soldStk,
        soldKr,
        bakgrunnKunder: state.dayStats.bakgrunnKunder,
        bakgrunnStk: state.dayStats.bakgrunnStk,
        bakgrunnKr,
        varekostKr,
        svinnStk,
        svinnKr,
        tapteSalgStk,
        tapteSalgKr,
        manglerPrisStk: state.dayStats.manglerPrisStk,
        manglerPrisKr: state.dayStats.manglerPrisKr,
        uprisedeVarer,
        overprisStk: state.dayStats.overprisStk,
        overprisKr: state.dayStats.overprisKr,
        overprisProdukter,
        koKunder: state.dayStats.koKunder,
        resultat: soldKr + bakgrunnKr - varekostKr - svinnKr,
        reputationDelta: state.dayStats.reputationDelta,
        xpEarned: state.dayStats.xpEarned,
        stockoutHappened: state.dayStats.stockoutHappened || tapteSalgStk > 0,
        stengtTidlig,
        bortfallStk,
        tomtProdukter,
        svinnProdukter,
        refleksjon,
      }

      // TEMA 8: akkumuler kampanjedagen; fullfør ved siste dag (effektrapport +
      // restaurer priser + ev. tilsynsbrev/bot).
      let kampanje = state.kampanje
      let kampProdukter = products
      let kampMoney = state.money
      let kampMessages = state.messages
      if (state.kampanje.aktiv && state.kampanje.aktiv.dagerKjort < state.kampanje.aktiv.varighet) {
        const k = state.kampanje.aktiv
        const oppdatert: KampanjeAktiv = {
          ...k, dagerKjort: k.dagerKjort + 1,
          akkBakgrunnKr: k.akkBakgrunnKr + bakgrunnKr,
          akkBakgrunnKunder: k.akkBakgrunnKunder + state.dayStats.bakgrunnKunder,
        }
        if (oppdatert.dagerKjort >= oppdatert.varighet) {
          const f = fullforKampanje(oppdatert, products, { aar: state.currentYear, maaned: state.currentMonth, dag: state.dayNumber })
          kampProdukter = f.produkter
          kampMoney = state.money - f.bot
          if (f.tilsyn) kampMessages = [...state.messages, f.tilsyn]
          kampanje = { aktiv: null, historikk: [...state.kampanje.historikk, f.resultat], visRapportFor: f.resultat.id }
        } else {
          kampanje = { ...state.kampanje, aktiv: oppdatert }
        }
      }

      return {
        ...state,
        products: kampProdukter,
        money: kampMoney,
        messages: kampMessages,
        unreadCount: kampMessages.filter(m => !m.read).length,
        dayProductStats: dps,
        shopOpen: false,
        dayPhase: 'oppgjør',
        lastDayResult: result,
        dayHistory: [...state.dayHistory, result],
        dayBackground: null,
        activeMeetingScenarioId: null,
        kampanje,
      }
    }

    case 'START_NEW_DAY': {
      // Kun gyldig fra oppgjør (dispatches av DayResultOverlay sin knapp).
      if (state.dayPhase !== 'oppgjør') return state

      const nextDayNumber = state.dayNumber + 1
      const rollsMonth = nextDayNumber > DAY_CONFIG.daysPerMonth
      const newDayNumber = rollsMonth ? 1 : nextDayNumber

      // LEVERING VED DAGSTART (docs/INNKJOP_LEVERING.md): bestillinger med
      // ankomstDag <= den nye dagen legges på lager NÅ — FØR åpning — så eleven
      // kan stelle disken med de nye varene og så åpne. deliveryLines driver
      // «Ferske varer klare»-banneret (lastDelivery) i interiørscenen.
      // MÅNEDSSKIFTE: en ordre lagt siste handledag har ankomstDag = 1 (wrappet i
      // ORDER_PRODUCT), så den leveres nettopp ved rullen til ny måned (newDayNumber
      // = 1) — ikke strandet på en «dag 13» som aldri kom. Med leadTime 1 er dag 12
      // eneste grensedag, og neste START_NEW_DAY er alltid selve månedsrullen.
      const arrived = state.incomingOrders.filter(o => o.ankomstDag <= newDayNumber)
      const stillPending = state.incomingOrders.filter(o => o.ankomstDag > newDayNumber)
      let deliveredProducts = state.products
      const deliveryLines: DeliveryNote['lines'] = []
      if (arrived.length > 0) {
        const addByProduct = new Map<string, number>()
        for (const o of arrived) addByProduct.set(o.productId, (addByProduct.get(o.productId) ?? 0) + o.qty)
        deliveredProducts = state.products.map(p => {
          const add = addByProduct.get(p.id) ?? 0
          return add > 0 ? { ...p, stock: p.stock + add } : p
        })
        for (const [productId, qty] of addByProduct) {
          const name = state.products.find(p => p.id === productId)?.name ?? productId
          deliveryLines.push({ name, qty })
        }
      }
      // Samme envelope-formel som APPLY_MONTH_RESULT (nextMonth/isYearEnd) —
      // gjenbrukt ARITMETIKK, ikke selve handlingen. PEST-hendelsene/måneds-
      // rapport-fasen (APPLY_MONTH_RESULT) er en egen, urørt flyt.
      const nextMonth = state.currentMonth + 1
      const isYearEnd = nextMonth > 12
      const newMonth = rollsMonth ? (isYearEnd ? 1 : nextMonth) : state.currentMonth
      const newYear = rollsMonth && isYearEnd ? state.currentYear + 1 : state.currentYear
      const newAbsDag = absDag(newYear, newMonth, newDayNumber)

      // KROK 7 — DEN LEVENDE INNBOKSEN: (1) resolver forfalte quest-e-poster på
      // den nye dagen — utløpte frister + kundeleveranser (mot det NYLIG leverte
      // lageret, så en morgenbestilling rekker leveringen); (2) seedet generering
      // av dagens nye e-poster mot taket; (3) utløp av mkf-boost. Deterministisk.
      const sveip = sveipEposter(state.messages, deliveredProducts, newAbsDag)
      deliveredProducts = sveip.produkter
      const nyeEposter = state.rentedLocationId
        ? genererDagensEposter(deliveredProducts, newDayNumber, newMonth, newYear, aktiveUbesvarte(sveip.messages))
        : []
      const epostMessages = [...sveip.messages, ...nyeEposter]
      const nyRep = Math.max(0, Math.min(100, state.reputation + sveip.reputationDelta))
      const mkfBoost = state.mkfBoost && state.mkfBoost.sluttAbsDag >= newAbsDag ? state.mkfBoost : null

      // ØKONOMI-SAMLING (DEL 2) + LÅNEAVDRAG: ved MÅNEDSRULL bygges et
      // månedsoppgjør fra månedens dagsresultater, og de faste kostnadene +
      // låneavdraget trekkes fra kassa. Faste = husleie + lønn + forsikring +
      // markedsføring (manedligeFasteKostnader — ENESTE kilde til FASTE
      // kostnader). LÅNEAVDRAG håndteres separat via economy.amortiserLaan (samme
      // delte kilde som APPLY_MONTH_RESULT) — den amortiserer restgjelda og gir
      // rente/avdrag-splitten. Nedbetalt lån (restgjeld 0) fjernes og slutter å
      // trekke. Dagsresultatet dekker allerede varekost/svinn, så månedsresultat
      // = sum(dagsresultat) − faste − (rente + avdrag).
      let money = state.money + sveip.moneyDelta   // KROK 7: kundeleveranse-betaling
      let settlement: MonthSettlement | null = state.lastMonthSettlement
      let loans = state.loans
      let monthlyLoanPayment = state.monthlyLoanPayment
      let totalDebt = state.totalDebt
      let budsjett = state.budsjett
      let budsjettOppgjorHint = state.budsjettOppgjorHint
      if (rollsMonth) {
        const mdays = state.dayHistory.filter(d => d.month === state.currentMonth && d.year === state.currentYear)
        const inntekt = mdays.reduce((s, d) => s + d.resultat, 0)
        // TEMA 2/3: brutto salg + varekjøp for måneden (til budsjettsammenligning
        // + nøkkeltall) — samme dagsdata som `inntekt`, men usammenslått.
        const salgInntektBrutto = mdays.reduce((s, d) => s + d.soldKr + d.bakgrunnKr, 0)
        const varekjop = mdays.reduce((s, d) => s + d.varekostKr, 0)
        const { linjer: kostnadslinjer, sum: fasteKostnader } = manedligeFasteKostnader(state)
        const amort = amortiserLaan(state.loans)
        loans = amort.loans
        monthlyLoanPayment = amort.loans.reduce((s, l) => s + l.monthlyPayment, 0)
        totalDebt = amort.loans.reduce((s, l) => s + l.remainingBalance, 0)
        money = money - fasteKostnader - amort.betaling   // behold KROK 7-betalingen
        settlement = {
          month: state.currentMonth, year: state.currentYear,
          inntekt, kostnadslinjer, fasteKostnader,
          laanRenter: amort.renteSum, laanAvdrag: amort.avdragSum,
          resultat: inntekt - fasteKostnader - amort.betaling, antallDager: mdays.length,
          salgInntektBrutto, varekjop,
        }
        // TEMA 2: lås budsjettet for måneden som nettopp ble gjort opp (kan ikke
        // endres etter oppgjøret). Finnes ikke budsjett → hint i oppgjøret (DEL 2e).
        const bkey = maanedNokkel(state.currentYear, state.currentMonth)
        if (state.budsjett.maaneder[bkey] && !state.budsjett.maaneder[bkey].laastVedOppgjor) {
          budsjett = { maaneder: { ...state.budsjett.maaneder, [bkey]: { ...state.budsjett.maaneder[bkey], laastVedOppgjor: true } } }
        }
        // TEMA 2/3 mentor-payload (leses av dynamiske triggere etter oppgjøret):
        // linja med STØRST absolutt avvik + ev. dekningsgrad-sprik.
        const bm = state.budsjett.maaneder[bkey]
        let storstAvvik: { navn: string; budsjett: number; faktisk: number } | null = null
        if (bm) {
          const fakt = faktiskeLinjer(settlement)
          let bestAbs = -1
          for (const l of BUDSJETT_LINJER) {
            const a = Math.abs(fakt[l.key] - bm.budsjett[l.key])
            if (a > bestAbs) { bestAbs = a; storstAvvik = { navn: l.navn, budsjett: bm.budsjett[l.key], faktisk: Math.round(fakt[l.key]) } }
          }
        }
        const nk = state.nokkeltall[bkey]
        const dekningsgradAvvik = nk ? { ditt: nk.dekningsgrad, bok: bokfortNokkeltall(settlement).dekningsgrad } : null
        budsjettOppgjorHint = (storstAvvik || dekningsgradAvvik) ? { storstAvvik, dekningsgradAvvik } : null
      }

      return {
        ...state,
        money,
        loans,
        monthlyLoanPayment,
        totalDebt,
        // LEVERING VED DAGSTART: lager fylt + «Ferske varer klare»-pille (eller
        // null hvis ingenting ankom denne morgenen).
        products: deliveredProducts,
        incomingOrders: stillPending,
        lastDelivery: deliveryLines.length > 0 ? { dayNumber: newDayNumber, lines: deliveryLines } : null,
        dayNumber: newDayNumber,
        currentMonth: newMonth,
        currentYear: newYear,
        // KROK 7 — DEN LEVENDE INNBOKSEN: resolverte + nygenererte quest-e-poster,
        // rykte etter kundeleveranser, og ev. utløpt mkf-boost.
        messages: epostMessages,
        unreadCount: epostMessages.filter(m => !m.read).length,
        reputation: nyRep,
        mkfBoost,
        dayPhase: 'stengt',
        meetingsToday: 0,
        lastDayResult: null,
        lastMonthSettlement: settlement,
        budsjett,   // TEMA 2: låst budsjett for måneden som ble gjort opp
        budsjettOppgjorHint,   // TEMA 2/3: mentor-payload for dynamiske triggere
        // Nullstill klokke/møter/ticker/produkt-stats for neste dag.
        dayMinute: 0,
        dayMeetings: [],
        activeMeetingScenarioId: null,
        dayTicker: [],
        dayProductStats: {},
      }
    }

    case 'SKIP_MEETING': {
      // Kundemøtet lukket uten å fullføre (kunden gikk). Marker det som done og
      // fjern aktiv-flagget så klokka kan gå videre. No-op om ingen er aktiv
      // (kalles ubetinget når salgsoverlayet lukkes, også for dev-scenarier).
      if (!state.activeMeetingScenarioId) return state
      const idx = state.dayMeetings.findIndex(m => m.spawned && !m.done)
      return {
        ...state,
        activeMeetingScenarioId: null,
        dayMeetings: idx >= 0 ? state.dayMeetings.map((m, i) => i === idx ? { ...m, done: true } : m) : state.dayMeetings,
        meetingsToday: state.meetingsToday + 1,
      }
    }

    case 'CLEAR_DELIVERY':
      // Lukk morgenleveranse-pilla (interiørscenen).
      return state.lastDelivery ? { ...state, lastDelivery: null } : state

    case 'DISMISS_MONTH_SETTLEMENT':
      // Lukk månedsoppgjør-overlayet (ØKONOMI-SAMLING DEL 2).
      return state.lastMonthSettlement ? { ...state, lastMonthSettlement: null } : state

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
  /** Temaer læreren har aktivert for denne klassen (temaId → { aktiv, nivaa }).
   *  Fylles fra Firebase RTDB når klassekode finnes, ellers fra lokal fallback. */
  aktiveTemaer: Record<string, TemaAktivering>
}

const GameContext = createContext<GameContextValue | null>(null)

// ─── Tema-aktivering: klassekode + fallback ──────────────────────────────────
// Gjenbruker live-økt-flytens klassekode-kobling (?live-code / student-classroom-
// code). Uten klassekode brukes en lokal dev-fallback (localStorage-JSON), så
// tema-gating kan testes lokalt uten en levende klasse.
function hentKlassekode(): string | null {
  try {
    const url = new URLSearchParams(window.location.search).get('live-code')
    return url ?? localStorage.getItem('student-classroom-code')
  } catch { return null }
}
function lesTemaFallback(): Record<string, TemaAktivering> {
  try {
    const raw = localStorage.getItem('tema-aktivering-dev')
    if (raw) { const v = JSON.parse(raw); if (v && typeof v === 'object') return v as Record<string, TemaAktivering> }
  } catch { /* korrupt/utilgjengelig — tom */ }
  return {}
}

const BEREDSKAP_KEY = 'beredskap_state_v1'
const BUDSJETT_KEY = 'budsjett_state_v1'   // TEMA 2/3: budsjett + nøkkeltall

export function GameProvider({ children }: { children: ReactNode }) {
  // Persister state.beredskap OG state.budsjett/nokkeltall (TEMA 2/3) i
  // localStorage — overlever reload (samme mønster som mentor-triggernes sett).
  const [state, dispatch] = useReducer(reducer, initialState, init => {
    let s = init
    try {
      const raw = localStorage.getItem(BEREDSKAP_KEY)
      if (raw) s = { ...s, beredskap: { ...s.beredskap, ...JSON.parse(raw) } }
    } catch { /* korrupt/utilgjengelig */ }
    try {
      const raw = localStorage.getItem(BUDSJETT_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        s = { ...s, budsjett: v.budsjett ?? s.budsjett, nokkeltall: v.nokkeltall ?? s.nokkeltall,
          kampanje: v.kampanje ?? s.kampanje, prisendretDag: v.prisendretDag ?? s.prisendretDag,
          mkfBoost: v.mkfBoost ?? s.mkfBoost,
          turistsesong: v.turistsesong ?? s.turistsesong, hotellavtale: v.hotellavtale ?? s.hotellavtale,
          opplevByenPameldt: v.opplevByenPameldt ?? s.opplevByenPameldt, reiselivPakke: v.reiselivPakke ?? s.reiselivPakke }
      }
    } catch { /* korrupt/utilgjengelig */ }
    return s
  })
  useEffect(() => {
    try { localStorage.setItem(BEREDSKAP_KEY, JSON.stringify(state.beredskap)) } catch { /* ignore */ }
  }, [state.beredskap])
  useEffect(() => {
    try { localStorage.setItem(BUDSJETT_KEY, JSON.stringify({ budsjett: state.budsjett, nokkeltall: state.nokkeltall, kampanje: state.kampanje, prisendretDag: state.prisendretDag, mkfBoost: state.mkfBoost, turistsesong: state.turistsesong, hotellavtale: state.hotellavtale, opplevByenPameldt: state.opplevByenPameldt, reiselivPakke: state.reiselivPakke })) } catch { /* ignore */ }
  }, [state.budsjett, state.nokkeltall, state.kampanje, state.prisendretDag, state.mkfBoost, state.turistsesong, state.hotellavtale, state.opplevByenPameldt, state.reiselivPakke])

  // TEST-BRO (KUN DEV): speil hele spilltilstanden + dispatch på window, så det
  // automatiserte spilltest-løpet (Playwright — se docs/SPILLTESTER.md) kan LESE
  // tall for assertering og FREMSKYNDE tid (TICK/CLOSE_DAY/START_NEW_DAY) uten å
  // vente på sanntidsklokka. Rent lese-/testtillegg — ingen produksjonskode leser
  // disse, og blokka finnes ikke i produksjonsbygg (import.meta.env.DEV=false →
  // trestrukket bort). Endrer ingen spilladferd. Kjører hver render så speilet
  // alltid er ferskt.
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const w = window as unknown as { __GAME_STATE__?: unknown; __GAME_DISPATCH__?: unknown }
    w.__GAME_STATE__ = state
    w.__GAME_DISPATCH__ = dispatch
  })

  const [aktiveTemaer, setAktiveTemaer] = useState<Record<string, TemaAktivering>>(() => lesTemaFallback())

  // Abonnér på tema-aktiveringsnoden ved øktstart når klassekode finnes.
  useEffect(() => {
    const kode = hentKlassekode()
    if (!kode) { setAktiveTemaer(lesTemaFallback()); return }
    return onValue(ref(db, `klasser/${kode}/temaAktivering`), snap => {
      setAktiveTemaer((snap.val() as Record<string, TemaAktivering> | null) ?? {})
    })
  }, [])

  // TEMA 15: når læreren aktiverer reiseliv-temaet OG ingen sesong har startet
  // ennå, start turistsesongen. Kun ÉN auto-start (turistsesong != null etterpå);
  // dev-knappen kan restarte manuelt.
  useEffect(() => {
    if (aktiveTemaer['reiseliv']?.aktiv && state.turistsesong === null) {
      dispatch({ type: 'START_TURISTSESONG' })
    }
  }, [aktiveTemaer, state.turistsesong])

  return <GameContext.Provider value={{ state, dispatch, aktiveTemaer }}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}

// ─── TEMA 15 — turistsesong-selektor (UI/mentor gater på denne) ───────────────
/** Sesonginfo for UI/mentor: aktiv nå?, hvilken dag av sesongen, total varighet.
 *  Null når ingen sesong har startet. */
export function turistsesongInfo(state: GameState): { aktiv: boolean; dag: number; varighet: number; turistandel: number } | null {
  const ts = state.turistsesong
  if (!ts) return null
  const naa = absDag(state.currentYear, state.currentMonth, state.dayNumber)
  return { aktiv: turistsesongAktivPaa(ts, naa), dag: naa - ts.startAbsDag + 1, varighet: ts.varighet, turistandel: BALANCE.turistsesong.turistandel }
}

/** DEL 7 — dagens besøksprofil for pakkebyggeren (deterministisk rotasjon fra
 *  sesongstarten). Null utenom sesong. */
export function aktivBesoksprofil(state: GameState) {
  return state.turistsesong ? velgProfil(state.turistsesong.startAbsDag) : null
}

// ─── Tema-selektorer (fremtidige temajobber gater på disse) ───────────────────
export function useAktiveTemaer(): Record<string, TemaAktivering> {
  return useGame().aktiveTemaer
}
/** Enkel selector-hook: er temaet aktivert for denne klassen? */
export function useErTemaAktivt(temaId: string): boolean {
  return !!useGame().aktiveTemaer[temaId]?.aktiv
}
/** Hvilket nivå (vg1/vg2) temaet er aktivert på, om aktivt. */
export function useTemaNivaa(temaId: string): TemaNivaa | undefined {
  const t = useGame().aktiveTemaer[temaId]
  return t?.aktiv ? t.nivaa : undefined
}

// Re-export types for consumers
export type { GameState, GamePhase, Product, MonthResult, InboxMessage, PestEvent, Loan, GameProgress, BusinessModel, GameFlags, BusinessCanvas, WindowDisplayItem, TrauItem }
