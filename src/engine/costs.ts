/**
 * Cost calculation utilities for AdVenture 2.3
 * Pure functions — no React, no side effects.
 *
 * Based on Unity SimulationEngine.cs, PersonnelManager.cs,
 * LocationUpgradeManager.cs, and PlayerData.cs
 */

import type { Employee, GameState } from '../types';

// ---------------------------------------------------------------------------
// Constants (from Unity source)
// ---------------------------------------------------------------------------

/** Norwegian employer tax rate */
const ARBEIDSGIVERAVGIFT = 0.141;

/**
 * Monthly rent per location tier (Unity LocationUpgradeManager.cs)
 *   Tier 1  Bakgate Boutique  →     0 kr
 *   Tier 2  Lokal Butikk      → 15 000 kr
 *   Tier 3  Sentral Butikk    → 45 000 kr
 *   Tier 4  Flagship Store    → 80 000 kr
 */
const RENT_BY_TIER: Record<number, number> = {
  1: 0,
  2: 15_000,
  3: 45_000,
  4: 80_000,
};

// ---------------------------------------------------------------------------
// Rent
// ---------------------------------------------------------------------------

export function calculateMonthlyRent(locationTier: number): number {
  return RENT_BY_TIER[locationTier] ?? 0;
}

// ---------------------------------------------------------------------------
// Staff costs
// ---------------------------------------------------------------------------

/**
 * Total monthly staff cost including 14.1 % arbeidsgiveravgift.
 * Uses the `salary` field on each active Employee from the shared types.
 * Unity: `(int)(totalCost * 1.141f)`
 */
export function calculateStaffCosts(employees: Employee[]): number {
  const activeEmployees = employees.filter((e) => e.active);
  const totalBase = activeEmployees.reduce((sum, e) => sum + e.salary, 0);
  return Math.round(totalBase * (1 + ARBEIDSGIVERAVGIFT));
}

// ---------------------------------------------------------------------------
// Marketing costs
// ---------------------------------------------------------------------------

/**
 * Sum all marketing channel budgets from flat GameState fields.
 */
export function calculateMarketingCosts(state: Pick<
  GameState,
  'marketingBudgetFacebook' | 'marketingBudgetInstagram' | 'marketingBudgetTV' | 'marketingBudgetInfluencer' | 'marketingBudgetPrint'
>): number {
  return (
    state.marketingBudgetFacebook +
    state.marketingBudgetInstagram +
    state.marketingBudgetTV +
    state.marketingBudgetInfluencer +
    state.marketingBudgetPrint
  );
}

// ---------------------------------------------------------------------------
// Fixed monthly costs (aggregate)
// ---------------------------------------------------------------------------

/**
 * Unity PlayerData.GetTotalMonthlyCosts():
 *   rent + employees + loan + all marketing channels
 */
export function calculateFixedMonthlyCosts(state: GameState): number {
  return (
    calculateMonthlyRent(state.locationTier) +
    calculateStaffCosts(state.employees) +
    calculateMarketingCosts(state) +
    state.monthlyLoanPayment
  );
}

// ---------------------------------------------------------------------------
// COGS — Cost of Goods Sold
// ---------------------------------------------------------------------------

export interface SoldProductEntry {
  unitsSold: number;
  costPerUnit: number;
}

/**
 * COGS for the month: sum of (unitsSold * costPerUnit) per product.
 */
export function calculateCOGS(soldProducts: SoldProductEntry[]): number {
  return soldProducts.reduce(
    (sum, p) => sum + p.unitsSold * p.costPerUnit,
    0,
  );
}
