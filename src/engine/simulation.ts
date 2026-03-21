/**
 * Core simulation engine for AdVenture 2.3
 * Pure functions — no React, no side effects (except the PRNG helper).
 *
 * Ported from Unity SimulationEngine.cs with improvements:
 *   - Per-product demand & sales (not proportional distribution)
 *   - Multi-factor demand model (DemandCalculator)
 *   - Insurance cost (2 000 kr/month)
 *   - Reputation updates (+1 profit, -2 loss)
 *   - PEST event integration via EventsProcessor
 *   - Typed interfaces aligned with shared ../types
 */

import type {
  GameState,
  PurchasedProduct,
  MonthResult,
  ProductSalesResult,
  PESTEvent,
} from '../types';

import {
  calculateFixedMonthlyCosts,
} from './costs';

import {
  calculateDemand as calculateEnhancedDemand,
  calculateBaseAppeal,
  calculateLocationBoost as calcLocBoost,
  calculatePriceElasticity,
  calculateMarketingImpact,
  calculateDistributionMultiplier,
  calculateTargetMatch as calcTargetMatchEnhanced,
} from './DemandCalculator';

import {
  rollForEvent,
  type ActiveEventEffect,
  getCombinedDemandModifier,
  getCombinedCostModifier,
} from './EventsProcessor';

// ───────────────────────────────────────────────────────────────────────────
// Constants
// ───────────────────────────────────────────────────────────────────────────

/** Monthly insurance cost (fixed) */
const INSURANCE_COST_PER_MONTH = 2000;

// ───────────────────────────────────────────────────────────────────────────
// Extended result type
// ───────────────────────────────────────────────────────────────────────────

export interface SimulationResult {
  /** Compatible with shared MonthResult for storage */
  monthResult: MonthResult;
  /** Per-product breakdown */
  productResults: ProductSalesResult[];
  /** Breakdown for display */
  totalRevenue: number;
  totalCOGS: number;
  fixedCosts: number;
  /** PEST event object (if rolled) */
  event: PESTEvent | null;
  /** Reputation change this month */
  reputationDelta: number;
}

// ───────────────────────────────────────────────────────────────────────────
// Backward-compatible sub-calculation exports
// (kept for index.ts barrel exports and any direct consumers)
// ───────────────────────────────────────────────────────────────────────────

export function calculateBaseDemand(quality: number): number {
  return calculateBaseAppeal(quality);
}

export function calculateLocationBoost(locationTier: number): number {
  return calcLocBoost(locationTier);
}

export function calculatePriceAdjustment(
  retailPrice: number,
  typicalRetailPrice: number,
): number {
  return calculatePriceElasticity(retailPrice, typicalRetailPrice);
}

export function calculateMarketingBoost(state: GameState): number {
  return calculateMarketingImpact(state);
}

export function calculateDistributionBoost(state: Pick<
  GameState,
  'businessModel' | 'productionDirectSales' | 'productionIndirectSales' | 'hasPhysicalStore' | 'hasWebStore'
>): number {
  // For "Produsent" business model, use producer distribution logic
  if (state.businessModel === 'Produsent' || state.businessModel === 'production') {
    if (state.productionDirectSales && state.productionIndirectSales) return 2.5;
    if (state.productionIndirectSales) return 2.0;
    return 1.0;
  }
  // For retail, use channel-based distribution
  return calculateDistributionMultiplier(state);
}

export function calculateTargetMatch(segments: GameState['targetSegments']): number {
  return calcTargetMatchEnhanced([], segments);
}

// ───────────────────────────────────────────────────────────────────────────
// Main demand function
// ───────────────────────────────────────────────────────────────────────────

/**
 * Calculate demand for a single product given the full game state.
 * Returns the raw demand (not capped by stock).
 * Uses the enhanced multi-factor model from DemandCalculator.
 */
export function calculateDemand(
  product: PurchasedProduct,
  state: GameState,
  productTargetTags?: string[],
  activeEventEffects?: ActiveEventEffect[],
): number {
  let demand = calculateEnhancedDemand(product, state, productTargetTags);

  // Apply active event demand modifiers
  if (activeEventEffects && activeEventEffects.length > 0) {
    demand *= getCombinedDemandModifier(activeEventEffects);
  }

  return Math.max(0, Math.floor(demand));
}

// ───────────────────────────────────────────────────────────────────────────
// Monthly simulation
// ───────────────────────────────────────────────────────────────────────────

/**
 * Simulate one month. Returns a SimulationResult **without** mutating state.
 * The caller (React state reducer) is responsible for applying changes
 * via applySimulationResult().
 */
export function simulateMonth(
  state: GameState,
  month: number,
  activeEventEffects?: ActiveEventEffect[],
  usedEventIds?: Set<string>,
): SimulationResult {
  const productResults: ProductSalesResult[] = [];

  for (const product of state.purchasedProducts) {
    const totalStock = product.stockWomen + product.stockMen + product.stockKids;

    if (totalStock <= 0 || !product.isPriced) {
      productResults.push({
        productId: product.productId,
        productName: product.productName,
        unitsSold: 0,
        revenue: 0,
        cogs: 0,
        demand: 0,
        stockRemaining: totalStock,
      });
      continue;
    }

    const demand = calculateDemand(product, state, undefined, activeEventEffects);
    const unitsSold = Math.min(Math.floor(demand), totalStock);

    // Revenue: proportional split across women/men (adult price) and kids
    const adultStock = product.stockWomen + product.stockMen;
    const adultRatio = totalStock > 0 ? adultStock / totalStock : 1;

    const adultUnitsSold = Math.floor(unitsSold * adultRatio);
    const kidsUnitsSold = unitsSold - adultUnitsSold;

    const revenue =
      adultUnitsSold * product.retailPriceAdult +
      kidsUnitsSold * product.retailPriceKids;

    const cogs =
      adultUnitsSold * product.costPerUnitAdult +
      kidsUnitsSold * product.costPerUnitKids;

    productResults.push({
      productId: product.productId,
      productName: product.productName,
      unitsSold,
      revenue,
      cogs,
      demand,
      stockRemaining: totalStock - unitsSold,
    });
  }

  // Aggregate
  const totalRevenue = productResults.reduce((s, p) => s + p.revenue, 0);
  let totalCOGS = productResults.reduce((s, p) => s + p.cogs, 0);
  const totalUnitsSold = productResults.reduce((s, p) => s + p.unitsSold, 0);

  // Apply event cost modifiers to COGS
  if (activeEventEffects && activeEventEffects.length > 0) {
    totalCOGS = Math.round(totalCOGS * getCombinedCostModifier(activeEventEffects));
  }

  // Fixed costs: rent + salaries*1.141 + marketing + insurance + loan
  const fixedCosts = calculateFixedMonthlyCosts(state) + INSURANCE_COST_PER_MONTH;
  const totalCosts = totalCOGS + fixedCosts;
  const profit = totalRevenue - totalCosts;

  // Reputation update: +1 if profit, -2 if loss
  const reputationDelta = profit > 0 ? 1 : profit < 0 ? -2 : 0;

  // Roll for PEST event (30% chance)
  const event = rollForEvent(
    month,
    state.selectedIndustry,
    usedEventIds ?? new Set(),
  );

  const monthResult: MonthResult = {
    month,
    totalSales: totalRevenue,
    totalCosts,
    profit,
    unitsSold: totalUnitsSold,
    pestEvent: event ? event.title : null,
    productResults,
  };

  return {
    monthResult,
    productResults,
    totalRevenue,
    totalCOGS,
    fixedCosts,
    event,
    reputationDelta,
  };
}

/**
 * Apply a SimulationResult to the game state, returning a **new** state object.
 * This is the only place stock / money / reputation changes.
 */
export function applySimulationResult(
  state: GameState,
  result: SimulationResult,
): GameState {
  const updatedProducts = state.purchasedProducts.map((product) => {
    const pr = result.productResults.find(
      (r) => r.productId === product.productId,
    );
    if (!pr || pr.unitsSold === 0) return { ...product };

    const totalStock = product.stockWomen + product.stockMen + product.stockKids;
    if (totalStock === 0) return { ...product };

    const womenRatio = product.stockWomen / totalStock;
    const menRatio = product.stockMen / totalStock;
    const kidsRatio = product.stockKids / totalStock;

    return {
      ...product,
      stockWomen: Math.max(0, product.stockWomen - Math.floor(pr.unitsSold * womenRatio)),
      stockMen: Math.max(0, product.stockMen - Math.floor(pr.unitsSold * menRatio)),
      stockKids: Math.max(0, product.stockKids - Math.floor(pr.unitsSold * kidsRatio)),
    };
  });

  const stockWomen = updatedProducts.reduce((s, p) => s + p.stockWomen, 0);
  const stockMen = updatedProducts.reduce((s, p) => s + p.stockMen, 0);
  const stockKids = updatedProducts.reduce((s, p) => s + p.stockKids, 0);

  // Clamp reputation to [0, 100] range
  const newReputation = Math.max(
    0,
    Math.min(100, state.reputation + result.reputationDelta),
  );

  return {
    ...state,
    currentMoney: state.currentMoney + Math.round(result.monthResult.profit),
    purchasedProducts: updatedProducts,
    stockWomen,
    stockMen,
    stockKids,
    reputation: newReputation,
    monthlyResults: [...state.monthlyResults, result.monthResult],
  };
}

// ───────────────────────────────────────────────────────────────────────────
// Product ordering
// ───────────────────────────────────────────────────────────────────────────

export interface OrderRequest {
  productId: string;
  productName: string;
  tierName: string;
  brandName: string;
  costPerUnitAdult: number;
  kidsPriceRatio: number;
  typicalRetailPrice: number;
  quality: number;
  sustainability: number;
  leadTimeDays: number;
  quantityWomen: number;
  quantityMen: number;
  quantityKids: number;
}

export interface OrderValidation {
  valid: boolean;
  totalCost: number;
  errors: string[];
}

function capacityPerSegment(totalCapacity: number): number {
  return Math.floor(totalCapacity / 3);
}

/**
 * Validate a product order without modifying state.
 */
export function validateOrder(
  order: OrderRequest,
  state: GameState,
): OrderValidation {
  const errors: string[] = [];

  const totalQty = order.quantityWomen + order.quantityMen + order.quantityKids;
  if (totalQty === 0) {
    errors.push('Du ma bestille minst 1 enhet');
  }

  const kidsCostPerUnit = Math.round(order.costPerUnitAdult * order.kidsPriceRatio);
  const totalCost =
    (order.quantityWomen + order.quantityMen) * order.costPerUnitAdult +
    order.quantityKids * kidsCostPerUnit;

  if (totalCost > state.currentMoney) {
    errors.push(
      `Ikke nok penger! Trenger ${totalCost} kr, har ${state.currentMoney} kr`,
    );
  }

  const cap = capacityPerSegment(state.totalCapacity);
  const currentStock = aggregateStock(state.purchasedProducts);

  if (currentStock.women + order.quantityWomen > cap) {
    errors.push(
      `Ikke nok lagerplass for Dame (${currentStock.women}+${order.quantityWomen} > ${cap})`,
    );
  }
  if (currentStock.men + order.quantityMen > cap) {
    errors.push(
      `Ikke nok lagerplass for Herre (${currentStock.men}+${order.quantityMen} > ${cap})`,
    );
  }
  if (currentStock.kids + order.quantityKids > cap) {
    errors.push(
      `Ikke nok lagerplass for Barn (${currentStock.kids}+${order.quantityKids} > ${cap})`,
    );
  }

  return { valid: errors.length === 0, totalCost, errors };
}

/**
 * Execute a validated order, returning a **new** GameState.
 * Caller must call validateOrder first.
 */
export function executeOrder(
  order: OrderRequest,
  state: GameState,
): GameState {
  const kidsCostPerUnit = Math.round(order.costPerUnitAdult * order.kidsPriceRatio);
  const totalCost =
    (order.quantityWomen + order.quantityMen) * order.costPerUnitAdult +
    order.quantityKids * kidsCostPerUnit;

  const newProduct: PurchasedProduct = {
    productId: order.productId,
    productName: order.productName,
    tierName: order.tierName,
    brandName: order.brandName,
    costPerUnitAdult: order.costPerUnitAdult,
    costPerUnitKids: kidsCostPerUnit,
    typicalRetailPrice: order.typicalRetailPrice,
    retailPriceAdult: 0,
    retailPriceKids: 0,
    discountPercent: 0,
    campaignPriceAdult: 0,
    campaignPriceKids: 0,
    stockWomen: order.quantityWomen,
    stockMen: order.quantityMen,
    stockKids: order.quantityKids,
    isPriced: false,
    quality: order.quality,
    sustainability: order.sustainability,
    leadTimeDays: order.leadTimeDays,
  };

  return {
    ...state,
    currentMoney: state.currentMoney - totalCost,
    purchasedProducts: [...state.purchasedProducts, newProduct],
    stockWomen: state.stockWomen + order.quantityWomen,
    stockMen: state.stockMen + order.quantityMen,
    stockKids: state.stockKids + order.quantityKids,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// Stock helpers
// ───────────────────────────────────────────────────────────────────────────

function aggregateStock(products: PurchasedProduct[]): {
  women: number;
  men: number;
  kids: number;
} {
  return products.reduce(
    (acc, p) => ({
      women: acc.women + p.stockWomen,
      men: acc.men + p.stockMen,
      kids: acc.kids + p.stockKids,
    }),
    { women: 0, men: 0, kids: 0 },
  );
}
