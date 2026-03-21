/**
 * Pricing utilities for AdVenture 2.3
 * Pure functions — no React, no side effects.
 *
 * Based on Unity PricingManager.cs and ProductCatalogManager.cs
 */

// ---------------------------------------------------------------------------
// Child / adult price helpers
// ---------------------------------------------------------------------------

/** Child price is 70 % of adult price (Unity: kids_price_ratio = 0.7) */
export function calculateChildPrice(adultPrice: number): number {
  return Math.round(adultPrice * 0.7);
}

// ---------------------------------------------------------------------------
// Margin helpers
// ---------------------------------------------------------------------------

/**
 * Margin percent = (retail - cost) / retail * 100
 * Returns a number (e.g. 42.5 for 42.5 %).
 * Returns -Infinity when retailPrice is 0.
 */
export function calculateMarginPercent(
  retailPrice: number,
  costPrice: number,
): number {
  if (retailPrice === 0) return -Infinity;
  return ((retailPrice - costPrice) / retailPrice) * 100;
}

/**
 * Margin colour thresholds (from Unity PricingManager.cs):
 *   green  >= 50 %
 *   yellow >= 30 %
 *   orange >= 0 %
 *   red    <  0 %
 */
export type MarginColor = 'green' | 'yellow' | 'orange' | 'red';

export function getMarginColor(marginPercent: number): MarginColor {
  if (marginPercent >= 50) return 'green';
  if (marginPercent >= 30) return 'yellow';
  if (marginPercent >= 0) return 'orange';
  return 'red';
}

// ---------------------------------------------------------------------------
// Product cost calculation (order cost)
// ---------------------------------------------------------------------------

/**
 * Total purchase cost for an order, considering adult vs child unit costs.
 *
 * Unity logic (ProductCatalogManager.cs):
 *   adultCost = tier.cost_per_unit
 *   kidsCost  = round(tier.cost_per_unit * kids_price_ratio)   [0.7]
 *   totalCost = (women + men) * adultCost + kids * kidsCost
 */
export function calculateOrderCost(
  costPerUnitAdult: number,
  quantityWomen: number,
  quantityMen: number,
  quantityKids: number,
  kidsPriceRatio: number = 0.7,
): number {
  const kidsCostPerUnit = Math.round(costPerUnitAdult * kidsPriceRatio);
  return (
    (quantityWomen + quantityMen) * costPerUnitAdult +
    quantityKids * kidsCostPerUnit
  );
}
