/**
 * Demand calculation for AdVenture 2.3
 * Pure functions — no React, no side effects.
 *
 * Multi-factor demand model based on Unity SimulationEngine.cs
 * with enhancements for sustainability, quality, reputation, and geography.
 */

import type {
  GameState,
  PurchasedProduct,
  TargetSegment,
} from '../types';

// ---------------------------------------------------------------------------
// Sub-factor calculations
// ---------------------------------------------------------------------------

/**
 * Base appeal: maps product quality (1-10 scale) to base demand units.
 * Quality 1 -> ~15 units, quality 10 -> ~60 units.
 * Adds randomness within a range to simulate market fluctuation.
 */
export function calculateBaseAppeal(quality: number): number {
  // Map quality 1-10 to a base range of 15-60
  const minDemand = 10 + quality * 2;
  const maxDemand = 30 + quality * 5;
  return Math.floor(Math.random() * (maxDemand - minDemand)) + minDemand;
}

/**
 * Target audience match multiplier.
 *
 * Compares the product's target_audience_match tags against the player's
 * selected psychographic/demographic profile. Better alignment = more sales.
 *
 * Range: 0.3 (poor match) to 1.5 (perfect match)
 */
export function calculateTargetMatch(
  productTargetTags: string[],
  segments: TargetSegment[],
): number {
  if (segments.length === 0) return 0.5;

  const primary = segments.find((s) => s.isPrimary) ?? segments[0];

  // Collect all player target descriptors
  const playerTags = new Set<string>();
  for (const g of primary.genders) playerTags.add(g);
  for (const a of primary.ageGroups) playerTags.add(a);
  for (const p of primary.psychographics) playerTags.add(p);

  // Count how many product tags overlap with player tags
  let matchCount = 0;
  for (const tag of productTargetTags) {
    if (playerTags.has(tag)) matchCount++;
  }

  if (productTargetTags.length === 0) return 1.0;

  const matchRatio = matchCount / productTargetTags.length;

  // Scale from 0.3 (no match) to 1.5 (full match)
  // matchRatio 0 -> 0.3, matchRatio 0.5 -> 0.9, matchRatio 1.0 -> 1.5
  return 0.3 + matchRatio * 1.2;
}

/**
 * Geography reach multiplier.
 *   local        -> 0.5
 *   regional     -> 0.8
 *   national     -> 1.0
 *   international -> 1.3
 */
export function calculateGeographyReach(segments: TargetSegment[]): number {
  if (segments.length === 0) return 0.5;

  const primary = segments.find((s) => s.isPrimary) ?? segments[0];

  const geoMap: Record<string, number> = {
    local: 0.5,
    regional: 0.8,
    national: 1.0,
    international: 1.3,
    // Also handle the architect's Geography enum values
    urban: 0.8,
    suburban: 0.7,
    rural: 0.5,
  };

  return geoMap[primary.geography] ?? 0.8;
}

/**
 * Marketing impact multiplier.
 * No marketing -> 0.8 (organic only).
 * Formula: 1.0 + min(totalBudget/50000 * 0.5, 0.5)
 * Range: 0.8 to 1.5
 */
export function calculateMarketingImpact(state: Pick<
  GameState,
  'marketingBudgetFacebook' | 'marketingBudgetInstagram' | 'marketingBudgetTV' | 'marketingBudgetInfluencer' | 'marketingBudgetPrint'
>): number {
  const totalBudget =
    state.marketingBudgetFacebook +
    state.marketingBudgetInstagram +
    state.marketingBudgetTV +
    state.marketingBudgetInfluencer +
    state.marketingBudgetPrint;

  if (totalBudget === 0) return 0.8;

  return 1.0 + Math.min((totalBudget / 50000) * 0.5, 0.5);
}

/**
 * Distribution multiplier.
 *   physical store only  -> 1.0
 *   webshop only         -> 0.8
 *   both channels        -> 1.4
 *   neither              -> 0.6
 */
export function calculateDistributionMultiplier(state: Pick<
  GameState,
  'hasPhysicalStore' | 'hasWebStore'
>): number {
  const hasPhysical = state.hasPhysicalStore;
  const hasWeb = state.hasWebStore;

  if (hasPhysical && hasWeb) return 1.4;
  if (hasPhysical) return 1.0;
  if (hasWeb) return 0.8;
  return 0.6;
}

/**
 * Quality factor multiplier.
 *   quality 1-3  (budget)  -> 0.7
 *   quality 4-6  (medium)  -> 1.0
 *   quality 7-10 (premium) -> 1.3
 */
export function calculateQualityFactor(quality: number): number {
  if (quality >= 7) return 1.3;
  if (quality >= 4) return 1.0;
  return 0.7;
}

/**
 * Sustainability bonus.
 * If the player targets eco-conscious customers and the product has
 * sustainability >= 7, multiply demand by 1.2.
 */
export function calculateSustainabilityBonus(
  sustainability: number,
  segments: TargetSegment[],
): number {
  const hasEcoTarget = segments.some((s) =>
    s.psychographics.some((p) =>
      p === 'eco' || p === 'eco_friendly' || p === 'EcoFriendly'
    )
  );

  if (hasEcoTarget && sustainability >= 7) return 1.2;
  return 1.0;
}

/**
 * Price elasticity factor.
 * Compares selling price vs typical retail price.
 *   ratio > 1.3  -> 0.6  (very expensive, demand drops)
 *   ratio > 1.1  -> 0.8
 *   ratio < 0.7  -> 1.4  (very cheap, demand surges)
 *   ratio < 0.9  -> 1.2
 *   else         -> 1.0
 */
export function calculatePriceElasticity(
  sellingPrice: number,
  typicalRetailPrice: number,
): number {
  if (typicalRetailPrice === 0) return 1.0;
  const ratio = sellingPrice / typicalRetailPrice;
  if (ratio > 1.3) return 0.6;
  if (ratio > 1.1) return 0.8;
  if (ratio < 0.7) return 1.4;
  if (ratio < 0.9) return 1.2;
  return 1.0;
}

/**
 * Reputation bonus.
 * Formula: 1.0 + (reputation * 0.01), capped at 1.3.
 * Reputation starts at 0, max meaningful value ~30.
 */
export function calculateReputationBonus(reputation: number): number {
  return Math.min(1.0 + reputation * 0.01, 1.3);
}

/**
 * Location boost — foot traffic multiplier (from Unity).
 *   Tier 1 (Bakgate)   -> 0.7
 *   Tier 2 (Lokal)     -> 1.0
 *   Tier 3 (Sentral)   -> 1.3
 *   Tier 4 (Flagship)  -> 1.6
 */
export function calculateLocationBoost(locationTier: number): number {
  const map: Record<number, number> = { 1: 0.7, 2: 1.0, 3: 1.3, 4: 1.6 };
  return map[locationTier] ?? 1.0;
}

/**
 * Seasonal factor — some months are better for certain industries.
 *
 * Fashion:     Nov-Dec peak (holiday shopping), Jul-Aug dip (summer)
 * Electronics: Nov-Dec peak (Black Friday/Xmas), Jan dip (post-holiday)
 * Food:        Dec peak (holiday meals), relatively stable otherwise
 * Furniture:   Aug-Sep peak (back-to-school, new apartments), Feb dip
 * Default:     flat 1.0 for unknown industries
 *
 * Range: 0.8 (slow month) to 1.3 (peak month)
 */
export function calculateSeasonalFactor(month: number, industry: string): number {
  // month: 1-12 (January to December)
  const seasonalMap: Record<string, Record<number, number>> = {
    fashion: {
      1: 0.85, 2: 0.9, 3: 1.0, 4: 1.0, 5: 1.05, 6: 1.0,
      7: 0.85, 8: 0.9, 9: 1.05, 10: 1.1, 11: 1.2, 12: 1.3,
    },
    electronics: {
      1: 0.8, 2: 0.9, 3: 0.95, 4: 1.0, 5: 1.0, 6: 0.95,
      7: 0.9, 8: 1.0, 9: 1.05, 10: 1.05, 11: 1.3, 12: 1.25,
    },
    food: {
      1: 0.9, 2: 0.95, 3: 1.0, 4: 1.0, 5: 1.0, 6: 1.05,
      7: 1.05, 8: 1.0, 9: 1.0, 10: 1.0, 11: 1.1, 12: 1.25,
    },
    furniture: {
      1: 0.9, 2: 0.85, 3: 0.95, 4: 1.0, 5: 1.05, 6: 1.0,
      7: 1.05, 8: 1.2, 9: 1.15, 10: 1.0, 11: 1.0, 12: 0.95,
    },
  };

  const industrySeasons = seasonalMap[industry];
  if (!industrySeasons) return 1.0;

  return industrySeasons[month] ?? 1.0;
}

// ---------------------------------------------------------------------------
// Main demand function
// ---------------------------------------------------------------------------

/**
 * Calculate total demand for a single product given the full game state.
 * Returns the raw demand (not capped by stock).
 *
 * Demand = baseAppeal
 *        * targetMatch
 *        * geographyReach
 *        * marketingImpact
 *        * distributionMultiplier
 *        * qualityFactor
 *        * sustainabilityBonus
 *        * priceElasticity
 *        * reputationBonus
 *        * locationBoost
 *        * seasonalFactor
 */
export function calculateDemand(
  product: PurchasedProduct,
  state: GameState,
  productTargetTags?: string[],
): number {
  const baseAppeal = calculateBaseAppeal(product.quality);
  const targetMatch = calculateTargetMatch(
    productTargetTags ?? [],
    state.targetSegments,
  );
  const geoReach = calculateGeographyReach(state.targetSegments);
  const mktImpact = calculateMarketingImpact(state);
  const distMult = calculateDistributionMultiplier(state);
  const qualFactor = calculateQualityFactor(product.quality);
  const sustBonus = calculateSustainabilityBonus(
    product.sustainability,
    state.targetSegments,
  );
  const priceElast = calculatePriceElasticity(
    product.retailPriceAdult,
    product.typicalRetailPrice,
  );
  const repBonus = calculateReputationBonus(state.reputation);
  const locBoost = calculateLocationBoost(state.locationTier);
  const seasonal = calculateSeasonalFactor(
    state.currentMonth,
    state.selectedIndustry,
  );

  const demand =
    baseAppeal *
    targetMatch *
    geoReach *
    mktImpact *
    distMult *
    qualFactor *
    sustBonus *
    priceElast *
    repBonus *
    locBoost *
    seasonal;

  return Math.max(0, Math.floor(demand));
}
