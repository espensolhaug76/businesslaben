/**
 * Pricing engine for AdVenture 2.3
 * Pure functions — no React, no side effects.
 *
 * Extends the basic pricing.ts with strategy-aware price suggestions
 * and elasticity calculations.
 */

import type { PurchasedProduct } from '../types';

// Re-export basics from pricing.ts for convenience
export {
  calculateChildPrice,
  calculateMarginPercent,
  getMarginColor,
  calculateOrderCost,
} from './pricing';
export type { MarginColor } from './pricing';

// ---------------------------------------------------------------------------
// Price elasticity
// ---------------------------------------------------------------------------

/**
 * Price elasticity factor — identical to DemandCalculator version,
 * exported here for UI components that need it independently.
 *
 * Unity CalculatePriceAdjustment:
 *   ratio > 1.3 -> 0.6  (very expensive)
 *   ratio > 1.1 -> 0.8
 *   ratio < 0.7 -> 1.4  (very cheap)
 *   ratio < 0.9 -> 1.2
 *   else        -> 1.0
 */
export function priceElasticityFactor(
  sellingPrice: number,
  typicalPrice: number,
): number {
  if (typicalPrice === 0) return 1.0;
  const ratio = sellingPrice / typicalPrice;
  if (ratio > 1.3) return 0.6;
  if (ratio > 1.1) return 0.8;
  if (ratio < 0.7) return 1.4;
  if (ratio < 0.9) return 1.2;
  return 1.0;
}

// ---------------------------------------------------------------------------
// Margin helpers
// ---------------------------------------------------------------------------

/**
 * Calculate margin as a number (percentage).
 */
export function calculateMargin(
  retailPrice: number,
  costPrice: number,
): number {
  if (retailPrice === 0) return -Infinity;
  return ((retailPrice - costPrice) / retailPrice) * 100;
}

/**
 * Child price = 70% of adult price (Unity convention).
 */
export function calculateChildPriceFromAdult(adultPrice: number): number {
  return Math.round(adultPrice * 0.7);
}

// ---------------------------------------------------------------------------
// Price suggestion engine
// ---------------------------------------------------------------------------

/**
 * Pricing strategies available in the game:
 *   - cost_based:        Cost + fixed markup (2x cost)
 *   - competition_based: Match typical retail price
 *   - value_based:       Premium pricing (1.3x typical)
 *   - skimming:          High initial price (1.4x typical)
 *   - penetration:       Low price for market share (0.75x typical)
 */
export function suggestPrice(
  product: PurchasedProduct,
  strategy: string,
): number {
  const cost = product.costPerUnitAdult;
  const typical = product.typicalRetailPrice;

  switch (strategy) {
    case 'cost_based':
    case 'cost_plus':
      // Cost-plus: 100% markup on cost price
      return Math.round(cost * 2);

    case 'competition_based':
    case 'market_based':
      // Match the market: use typical retail price
      return typical;

    case 'value_based':
      // Premium positioning: 30% above typical
      return Math.round(typical * 1.3);

    case 'skimming':
    case 'premium':
      // Skim pricing: high initial price
      return Math.round(typical * 1.4);

    case 'penetration':
      // Penetration: low price to gain market share
      return Math.round(typical * 0.75);

    default:
      // Fallback: midway between cost*2 and typical
      return Math.round((cost * 2 + typical) / 2);
  }
}

/**
 * Get a human-readable description of the pricing strategy (Norwegian).
 */
export function getStrategyDescription(strategy: string): string {
  switch (strategy) {
    case 'cost_based':
    case 'cost_plus':
      return 'Kostnadsbasert: Pris = kostpris + fast påslag (2x kostpris)';
    case 'competition_based':
    case 'market_based':
      return 'Konkurransebasert: Pris satt lik typisk markedspris';
    case 'value_based':
      return 'Verdibasert: Premiumpris basert på opplevd verdi (+30% over marked)';
    case 'skimming':
    case 'premium':
      return 'Skumming: Høy startpris for å maksimere tidlig fortjeneste';
    case 'penetration':
      return 'Penetrasjon: Lav pris for rask markedsandel';
    default:
      return 'Ukjent prisstrategi';
  }
}
