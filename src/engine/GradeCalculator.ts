/**
 * Grade calculator for AdVenture 2.3
 * Pure functions — no React, no side effects.
 *
 * Evaluates the player's performance over the simulation period
 * and assigns a grade (A-F) with detailed feedback in Norwegian.
 */

import type { GameState, MonthResult } from '../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface GradeDetails {
  profitabilityScore: number;   // 0-30 points
  growthScore: number;          // 0-20 points
  reputationScore: number;      // 0-15 points
  decisionQualityScore: number; // 0-20 points
  sustainabilityScore: number;  // 0-15 points
  totalScore: number;           // 0-100 points
}

export interface GradeResult {
  grade: Grade;
  totalScore: number;
  feedback: string;
  details: GradeDetails;
  categoryFeedback: {
    profitability: string;
    growth: string;
    reputation: string;
    decisions: string;
    sustainability: string;
  };
}

// ---------------------------------------------------------------------------
// Score thresholds
// ---------------------------------------------------------------------------

function gradeFromScore(score: number): Grade {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  if (score >= 25) return 'E';
  return 'F';
}

// ---------------------------------------------------------------------------
// Sub-score calculations
// ---------------------------------------------------------------------------

/**
 * Profitability score (0-30 points).
 * Based on: total profit, profit consistency, and final cash position.
 */
function scoreProfitability(results: MonthResult[], state: GameState): number {
  if (results.length === 0) return 0;

  let score = 0;

  // Total profit over the period
  const totalProfit = results.reduce((sum, r) => sum + r.profit, 0);
  if (totalProfit > 0) score += 10;
  if (totalProfit > state.startingMoney * 0.5) score += 5;
  if (totalProfit > state.startingMoney) score += 5;

  // Profit consistency: how many months were profitable?
  const profitableMonths = results.filter((r) => r.profit > 0).length;
  const profitRatio = profitableMonths / results.length;
  score += Math.round(profitRatio * 5); // 0-5 points

  // Final cash position relative to starting
  const cashRatio = state.currentMoney / state.startingMoney;
  if (cashRatio >= 2.0) score += 5;
  else if (cashRatio >= 1.5) score += 4;
  else if (cashRatio >= 1.0) score += 3;
  else if (cashRatio >= 0.5) score += 1;
  // Bankrupt = 0 points

  return Math.min(30, score);
}

/**
 * Growth score (0-20 points).
 * Based on: sales trend, revenue growth between early and late months.
 */
function scoreGrowth(results: MonthResult[]): number {
  if (results.length < 2) return 5; // Minimal data, give base score

  let score = 0;

  // Compare first half vs second half revenue
  const mid = Math.floor(results.length / 2);
  const firstHalf = results.slice(0, mid);
  const secondHalf = results.slice(mid);

  const firstAvgRevenue =
    firstHalf.reduce((s, r) => s + r.totalSales, 0) / firstHalf.length;
  const secondAvgRevenue =
    secondHalf.reduce((s, r) => s + r.totalSales, 0) / secondHalf.length;

  if (firstAvgRevenue > 0) {
    const growthRate = (secondAvgRevenue - firstAvgRevenue) / firstAvgRevenue;
    if (growthRate > 0.5) score += 12;
    else if (growthRate > 0.2) score += 9;
    else if (growthRate > 0) score += 6;
    else if (growthRate > -0.2) score += 3;
    // Declining heavily = 0
  } else {
    // No revenue first half but some in second = good sign
    if (secondAvgRevenue > 0) score += 8;
  }

  // Total units sold — did the business actually move product?
  const totalUnits = results.reduce((s, r) => s + r.unitsSold, 0);
  if (totalUnits > 500) score += 8;
  else if (totalUnits > 200) score += 6;
  else if (totalUnits > 50) score += 4;
  else if (totalUnits > 0) score += 2;

  return Math.min(20, score);
}

/**
 * Reputation score (0-15 points).
 * Based on final reputation value.
 */
function scoreReputation(state: GameState): number {
  const rep = state.reputation;
  if (rep >= 20) return 15;
  if (rep >= 15) return 12;
  if (rep >= 10) return 9;
  if (rep >= 5) return 6;
  if (rep >= 0) return 3;
  return 0; // Negative reputation
}

/**
 * Decision quality score (0-20 points).
 * Based on: diversity of marketing channels, having employees,
 * pricing strategy set, distribution channels.
 */
function scoreDecisionQuality(state: GameState): number {
  let score = 0;

  // Has a pricing method
  if (state.pricingMethod) score += 3;

  // Has products
  if (state.purchasedProducts.length > 0) score += 3;

  // Has target segments
  if (state.targetSegments.length > 0) score += 2;

  // Marketing diversity
  const channels = [
    state.marketingBudgetFacebook,
    state.marketingBudgetInstagram,
    state.marketingBudgetTV,
    state.marketingBudgetInfluencer,
    state.marketingBudgetPrint,
  ];
  const activeChannels = channels.filter((b) => b > 0).length;
  if (activeChannels >= 3) score += 4;
  else if (activeChannels >= 2) score += 3;
  else if (activeChannels >= 1) score += 2;

  // Distribution diversity
  if (state.hasPhysicalStore && state.hasWebStore) score += 4;
  else if (state.hasPhysicalStore || state.hasWebStore) score += 2;

  // Has employees (shows business scaling)
  if (state.employees.length > 0) score += 2;

  // Did market research
  if (state.didMarketResearch) score += 2;

  return Math.min(20, score);
}

/**
 * Sustainability score (0-15 points).
 * Based on: product sustainability scores and eco-targeting.
 */
function scoreSustainability(state: GameState): number {
  if (state.purchasedProducts.length === 0) return 0;

  let score = 0;

  // Average sustainability of purchased products
  const avgSustainability =
    state.purchasedProducts.reduce((s, p) => s + p.sustainability, 0) /
    state.purchasedProducts.length;

  if (avgSustainability >= 8) score += 8;
  else if (avgSustainability >= 6) score += 6;
  else if (avgSustainability >= 4) score += 4;
  else if (avgSustainability >= 2) score += 2;

  // Eco-conscious targeting
  const hasEcoTarget = state.targetSegments.some((s) =>
    s.psychographics.some((p) =>
      p === 'eco' || p === 'eco_friendly' || p === 'EcoFriendly'
    )
  );
  if (hasEcoTarget) score += 4;

  // High quality products (quality > 6 = responsible business)
  const avgQuality =
    state.purchasedProducts.reduce((s, p) => s + p.quality, 0) /
    state.purchasedProducts.length;
  if (avgQuality >= 7) score += 3;

  return Math.min(15, score);
}

// ---------------------------------------------------------------------------
// Feedback generation (Norwegian)
// ---------------------------------------------------------------------------

function getProfitabilityFeedback(score: number): string {
  if (score >= 25)
    return 'Utmerket lonnsomhet! Bedriften din har vist sterk og konsistent inntjening gjennom hele perioden.';
  if (score >= 18)
    return 'God lonnsomhet. Bedriften har gatt med overskudd i de fleste manedene.';
  if (score >= 12)
    return 'Moderat lonnsomhet. Noen gode maneder, men ogsa noen med tap. Vurder a optimalisere prisene eller kutte kostnader.';
  if (score >= 6)
    return 'Svak lonnsomhet. Bedriften sliter med a ga i pluss. Se pa kostnadene dine og vurder om prisstrategien er riktig.';
  return 'Kritisk darlig lonnsomhet. Bedriften taper penger. Du ma gjore betydelige endringer for a overleve.';
}

function getGrowthFeedback(score: number): string {
  if (score >= 16)
    return 'Imponerende vekst! Salget har okt betydelig gjennom perioden.';
  if (score >= 10)
    return 'God vekst. Salget har vist en positiv trend.';
  if (score >= 5)
    return 'Moderat vekst. Det er rom for forbedring i salgsvolum.';
  return 'Liten eller ingen vekst. Vurder a utvide malgruppen eller oke markedsforingsinnsatsen.';
}

function getReputationFeedback(score: number): string {
  if (score >= 12)
    return 'Utmerket omdomme! Kundene stoler pa merkevaren din.';
  if (score >= 8)
    return 'Godt omdomme. Merkevaren har en positiv posisjon i markedet.';
  if (score >= 4)
    return 'Gjennomsnittlig omdomme. Jobb med kundetilfredshet og kvalitet.';
  return 'Svakt omdomme. Kundene er usikre pa merkevaren din.';
}

function getDecisionFeedback(score: number): string {
  if (score >= 16)
    return 'Gode strategiske valg! Du har tatt gjennomtenkte beslutninger pa tvers av alle omrader.';
  if (score >= 10)
    return 'Solide beslutninger. De fleste valgene dine har vaert fornuftige.';
  if (score >= 5)
    return 'Noen gode, noen mindre gode beslutninger. Vurder a diversifisere strategien din.';
  return 'Mange viktige beslutninger mangler. Sorg for a sette opp alle deler av forretningen.';
}

function getSustainabilityFeedback(score: number): string {
  if (score >= 12)
    return 'Fremragende barekraftsprofil! Bedriften din er et forbilde for ansvarlig naeringsvirksomhet.';
  if (score >= 8)
    return 'God barekraftsinnsats. Du viser bevissthet rundt miljo og ansvar.';
  if (score >= 4)
    return 'Noe barekraftsfokus. Vurder a velge mer barekraftige produkter og leverandorer.';
  return 'Lite fokus pa barekraft. I dagens marked kan dette vaere en ulempe.';
}

function getOverallFeedback(grade: Grade, totalScore: number): string {
  switch (grade) {
    case 'A':
      return `Fremragende jobb! (${totalScore}/100) Du har bygget en vellyket, lonnsomm og barekraftig bedrift. Du har vist forstaelse for alle de fire P-ene og tatt gjennomtenkte beslutninger. Dette er bedriftsledelse pa hoyeste niva!`;
    case 'B':
      return `Meget bra! (${totalScore}/100) Du har drevet en god bedrift med overskudd og vekst. Noen omrader kan fortsatt forbedres, men totalinntrykket er sterkt.`;
    case 'C':
      return `Godkjent! (${totalScore}/100) Bedriften har overlevd og vist noe vekst. Det er rom for forbedring i lonnsomhet og strategiske valg, men grunnlaget er pa plass.`;
    case 'D':
      return `Under middels. (${totalScore}/100) Bedriften har slitt med lonnsomhet og vekst. Gjennomga strategien pa nytt — spesielt prissetting, malgruppe og kostnadsstruktur.`;
    case 'E':
      return `Svakt resultat. (${totalScore}/100) Bedriften har hatt store utfordringer. De fleste manedene har gatt med tap. Du trenger betydelige endringer i forretningsmodellen.`;
    case 'F':
      return `Stryk. (${totalScore}/100) Bedriften har gatt konkurs eller hatt massive tap. Gar gjennom laeringsmaterialet pa nytt og prov igjen med en ny strategi.`;
  }
}

// ---------------------------------------------------------------------------
// Main grade calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the final grade for a completed game.
 *
 * @param monthlyResults  Array of all MonthResult objects from the simulation
 * @param gameState       The final GameState after all months
 * @returns               GradeResult with grade, score, feedback, and breakdown
 */
export function calculateGrade(
  monthlyResults: MonthResult[],
  gameState: GameState,
): GradeResult {
  // Check for bankruptcy (immediate F)
  if (gameState.currentMoney < 0) {
    return {
      grade: 'F',
      totalScore: 0,
      feedback: getOverallFeedback('F', 0),
      details: {
        profitabilityScore: 0,
        growthScore: 0,
        reputationScore: 0,
        decisionQualityScore: 0,
        sustainabilityScore: 0,
        totalScore: 0,
      },
      categoryFeedback: {
        profitability: 'Bedriften gikk konkurs — ingen kontanter igjen.',
        growth: 'Ingen vekst mulig etter konkurs.',
        reputation: 'Omdommet er odslagt etter konkurs.',
        decisions: 'Forretningsbeslutningene forte til konkurs.',
        sustainability: 'Barekraft er irrelevant nar bedriften ikke eksisterer.',
      },
    };
  }

  const profitabilityScore = scoreProfitability(monthlyResults, gameState);
  const growthScore = scoreGrowth(monthlyResults);
  const reputationScore = scoreReputation(gameState);
  const decisionQualityScore = scoreDecisionQuality(gameState);
  const sustainabilityScore = scoreSustainability(gameState);

  const totalScore =
    profitabilityScore +
    growthScore +
    reputationScore +
    decisionQualityScore +
    sustainabilityScore;

  const grade = gradeFromScore(totalScore);

  return {
    grade,
    totalScore,
    feedback: getOverallFeedback(grade, totalScore),
    details: {
      profitabilityScore,
      growthScore,
      reputationScore,
      decisionQualityScore,
      sustainabilityScore,
      totalScore,
    },
    categoryFeedback: {
      profitability: getProfitabilityFeedback(profitabilityScore),
      growth: getGrowthFeedback(growthScore),
      reputation: getReputationFeedback(reputationScore),
      decisions: getDecisionFeedback(decisionQualityScore),
      sustainability: getSustainabilityFeedback(sustainabilityScore),
    },
  };
}
