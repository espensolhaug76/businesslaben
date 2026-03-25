import type { GameState, MonthlyResult, ProductResult, GameEvent } from './types'
import { GAME_EVENTS } from './productData'

// ─── Demand model ──────────────────────────────────────────────────────────────

function priceElasticity(price: number, suggestedPrice: number): number {
  const ratio = price / suggestedPrice
  if (ratio <= 0.7) return 1.4
  if (ratio <= 0.85) return 1.2
  if (ratio <= 1.0) return 1.0
  if (ratio <= 1.2) return 0.82
  if (ratio <= 1.5) return 0.60
  return 0.35
}

function marketingMultiplier(totalMarketing: number): number {
  if (totalMarketing <= 0) return 0.7
  if (totalMarketing < 5_000) return 0.85
  if (totalMarketing < 15_000) return 1.0
  if (totalMarketing < 30_000) return 1.18
  if (totalMarketing < 60_000) return 1.35
  return 1.5
}

function distributionMultiplier(channels: string[]): number {
  const base = 1.0
  let extra = 0
  if (channels.includes('webShop')) extra += 0.25
  if (channels.includes('socialMedia')) extra += 0.18
  if (channels.includes('delivery')) extra += 0.20
  if (channels.includes('wholesale')) extra += 0.30
  return base + extra
}

function reputationMultiplier(reputation: number): number {
  return 0.7 + (reputation / 100) * 0.6  // 0.7 – 1.3
}

function seasonalMultiplier(month: number): number {
  // Norwegian retail patterns
  const seasonality = [0.85, 0.80, 0.90, 0.95, 1.0, 1.05, 1.10, 1.0, 0.95, 1.05, 1.15, 1.35]
  return seasonality[month - 1] ?? 1.0
}

// ─── Roll random event ─────────────────────────────────────────────────────────

function rollEvent(month: number): GameEvent {
  const neutral = GAME_EVENTS.filter(e => e.type === 'neutral')
  const positive = GAME_EVENTS.filter(e => e.type === 'positive')
  const negative = GAME_EVENTS.filter(e => e.type === 'negative')

  const roll = Math.random()
  let pool: GameEvent[]
  if (roll < 0.25) pool = positive
  else if (roll < 0.45) pool = negative
  else pool = neutral

  // Avoid too many neutrals in later months — increase event probability
  if (month >= 6 && roll < 0.35) pool = positive
  if (month >= 9 && roll < 0.30) pool = negative

  return pool[Math.floor(Math.random() * pool.length)]
}

// ─── Distribution channel margin impact ───────────────────────────────────────

function avgMarginImpact(channels: string[]): number {
  if (channels.length === 0) return 1.0
  const impacts: Record<string, number> = {
    physicalStore: 1.0,
    webShop: 0.92,
    socialMedia: 0.88,
    delivery: 0.70,
    wholesale: 0.60,
  }
  const total = channels.reduce((sum, ch) => sum + (impacts[ch] ?? 1.0), 0)
  return total / channels.length
}

function channelMonthlyCost(channels: string[]): number {
  const costs: Record<string, number> = {
    physicalStore: 0,
    webShop: 2500,
    socialMedia: 1200,
    delivery: 800,
    wholesale: 500,
  }
  return channels.reduce((sum, ch) => sum + (costs[ch] ?? 0), 0)
}

// ─── Location foot-traffic multiplier ─────────────────────────────────────────

function locationMultiplier(state: GameState): number {
  if (!state.rentedLocation) return 1.0
  switch (state.rentedLocation.footTraffic) {
    case 'høy': return 1.3
    case 'middels': return 1.0
    case 'lav': return 0.75
    default: return 1.0
  }
}

// ─── Main simulation ──────────────────────────────────────────────────────────

export function simulateMonth(state: GameState): MonthlyResult {
  const { month, selectedProducts, activeChannels, marketingBudget, cash, reputation, scenario, rentedLocation } = state

  const totalMarketing = Object.values(marketingBudget).reduce((s, v) => s + v, 0)
  const event = rollEvent(month)

  const demandMod = event.demandModifier
  const costMod = event.costModifier
  const mktMult = marketingMultiplier(totalMarketing)
  const distMult = distributionMultiplier(activeChannels)
  const repMult = reputationMultiplier(reputation)
  const seasonal = seasonalMultiplier(month)
  const marginImpact = avgMarginImpact(activeChannels)
  const locMult = locationMultiplier(state)

  const productResults: ProductResult[] = selectedProducts.map(p => {
    const priceElast = priceElasticity(p.price, p.suggestedPrice)
    const demandFraction = priceElast * mktMult * distMult * repMult * seasonal * demandMod * locMult
    const rawUnits = Math.round(p.maxMonthlyDemand * demandFraction * (0.85 + Math.random() * 0.30))
    const unitsSold = Math.max(0, Math.min(rawUnits, p.stock > 0 ? p.stock : rawUnits))

    const revenue = unitsSold * p.price * marginImpact
    const cogs = unitsSold * p.baseCost * costMod
    const profit = revenue - cogs

    return { productId: p.id, productName: p.name, unitsSold, revenue, cogs, profit }
  })

  const revenue = productResults.reduce((s, r) => s + r.revenue, 0)
  const cogs = productResults.reduce((s, r) => s + r.cogs, 0)
  const grossProfit = revenue - cogs

  // Use rentedLocation.monthlyRent if available, fall back to scenario.monthlyRent
  const baseRent = rentedLocation?.monthlyRent ?? scenario?.monthlyRent ?? 15_000
  const fixedCosts = baseRent + 2_000 + channelMonthlyCost(activeChannels) // rent + insurance + channels
  const marketingCosts = totalMarketing
  const netProfit = grossProfit - fixedCosts - marketingCosts
  const cashAfter = cash + netProfit

  return {
    month,
    revenue: Math.round(revenue),
    cogs: Math.round(cogs),
    grossProfit: Math.round(grossProfit),
    fixedCosts: Math.round(fixedCosts),
    marketingCosts: Math.round(marketingCosts),
    netProfit: Math.round(netProfit),
    cashAfter: Math.round(cashAfter),
    productResults: productResults.map(r => ({
      ...r,
      revenue: Math.round(r.revenue),
      cogs: Math.round(r.cogs),
      profit: Math.round(r.profit),
    })),
    event,
  }
}
