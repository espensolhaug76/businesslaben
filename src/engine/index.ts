// ─── Pricing utilities ────────────────────────────────────
export {
  calculateChildPrice,
  calculateMarginPercent,
  getMarginColor,
  calculateOrderCost,
} from './pricing';
export type { MarginColor } from './pricing';

// ─── Cost utilities ──────────────────────────────────────
export {
  calculateMonthlyRent,
  calculateStaffCosts,
  calculateMarketingCosts,
  calculateFixedMonthlyCosts,
  calculateCOGS,
} from './costs';
export type { SoldProductEntry } from './costs';

// ─── Demand calculator (multi-factor model) ──────────────
export {
  calculateBaseAppeal,
  calculateTargetMatch as calculateTargetMatchEnhanced,
  calculateGeographyReach,
  calculateMarketingImpact,
  calculateDistributionMultiplier,
  calculateQualityFactor,
  calculateSustainabilityBonus,
  calculatePriceElasticity,
  calculateReputationBonus,
  calculateLocationBoost as calculateLocationBoostDemand,
  calculateSeasonalFactor,
  calculateDemand as calculateDemandEnhanced,
} from './DemandCalculator';

// ─── Simulation engine ──────────────────────────────────
export {
  calculateDemand,
  calculateBaseDemand,
  calculateLocationBoost,
  calculatePriceAdjustment,
  calculateMarketingBoost,
  calculateDistributionBoost,
  calculateTargetMatch,
  simulateMonth,
  applySimulationResult,
  validateOrder,
  executeOrder,
} from './simulation';
export type {
  SimulationResult,
  OrderRequest,
  OrderValidation,
} from './simulation';

// ─── Pricing engine (strategy-aware) ────────────────────
export {
  priceElasticityFactor,
  calculateMargin,
  calculateChildPriceFromAdult,
  suggestPrice,
  getStrategyDescription,
} from './PricingEngine';

// ─── Events processor ───────────────────────────────────
export {
  rollForEvent,
  getAvailableEvents,
  applyEventConsequence,
  getCombinedDemandModifier,
  getCombinedCostModifier,
  tickEventEffects,
  getBuiltinEvents,
} from './EventsProcessor';
export type { ActiveEventEffect } from './EventsProcessor';

// ─── Grade calculator ───────────────────────────────────
export {
  calculateGrade,
} from './GradeCalculator';
export type {
  Grade,
  GradeDetails,
  GradeResult,
} from './GradeCalculator';
