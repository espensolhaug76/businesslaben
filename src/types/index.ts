// ─── Barrel exports for all types ────────────────────────
// Canonical type definitions live in their own files.
// This barrel re-exports everything for convenient imports.

// PlayerData — game state, constants, phases
export {
  Industry,
  BusinessModel,
  Gender,
  AgeGroup,
  Psychographic,
  Geography,
  PricingMethod,
  GamePhase,
  StartingCapitalOption,
  GamePreset,
} from './PlayerData'
export type { GameState, TargetSegment } from './PlayerData'

// Product — catalog, purchased, pricing
export type {
  SupplierTier,
  ProductionCountryOption,
  ProductionOptions,
  Product,
  ProductsData,
  PurchasedProduct,
  ProductPricing,
} from './Product'

// Event — PEST events, inbox messages
export { PESTCategory } from './Event'
export type {
  EventConsequence,
  EventChoice,
  PESTEvent,
  InboxMessage,
} from './Event'

// MonthResult — monthly simulation results
export type {
  ProductSalesResult,
  MonthResult,
} from './MonthResult'

// Campaign — marketing campaigns
export { MarketingChannel } from './Campaign'
export type { Campaign } from './Campaign'

// Employee — personnel
export { EmployeeRole, EmployeeLevel } from './Employee'
export type { Employee } from './Employee'

// Case — case studies
export type { CaseOption, Case } from './Case'

// Quiz — quiz system
export type { QuizOption, Quiz } from './Quiz'

// Glossary — educational glossary
export type { GlossaryEntry, GlossaryData } from './GlossaryEntry'
