// ─── AdVenture 3.0 — Simulation Engine ────────────────────────────────────
import type { GameState, MonthResult, PestEvent } from './types'
import { calcPersonaMatchScore, targetMatchMultiplier } from './data/personas'

// ── PEST Event pool ───────────────────────────────────────────────────────────

const PEST_EVENTS: PestEvent[] = [
  // Political
  { id: 'p1', category: 'political', type: 'positive', emoji: '📜', title: 'Ny handelsavtale',
    description: 'Regjeringen inngår ny handelsavtale — lavere importkostnader neste kvartal.',
    demandModifier: 1.05, costModifier: 0.92,
    choices: [{ text: 'Utnytt lavere kostnader', effect: 'Reduserer varekostnad 10%' }] },
  { id: 'p2', category: 'political', type: 'negative', emoji: '📋', title: 'Ny avgiftsøkning',
    description: 'Staten innfører økt merverdiavgift på forbruksvarer.',
    demandModifier: 0.92, costModifier: 1.08,
    choices: [{ text: 'Hold prisene', effect: 'Tap i margin' }, { text: 'Hev prisene litt', effect: 'Litt lavere salg' }] },
  { id: 'p3', category: 'political', type: 'neutral', emoji: '🏛️', title: 'Nytt regelverk',
    description: 'Myndighetene innfører ny merkingsplikt for produkter.',
    demandModifier: 1.0, costModifier: 1.03,
    choices: [{ text: 'Tilpass deg regelverket', effect: 'Ingen videre konsekvenser' }] },
  { id: 'p4', category: 'political', type: 'positive', emoji: '💼', title: 'Støtteordning for SMB',
    description: 'Innovasjon Norge åpner ny støtteordning for småbedrifter.',
    demandModifier: 1.0, costModifier: 0.95,
    choices: [{ text: 'Søk støtte', effect: '+10 000 kr i kontanter' }] },

  // Economic
  { id: 'e1', category: 'economic', type: 'positive', emoji: '📈', title: 'Sterkt forbrukermarked',
    description: 'Optimisme i markedet — forbrukerne bruker mer penger enn normalt.',
    demandModifier: 1.20, costModifier: 1.0,
    choices: [{ text: 'Utnytt momentumet', effect: '+20% etterspørsel denne måneden' }] },
  { id: 'e2', category: 'economic', type: 'negative', emoji: '📉', title: 'Resesjonsfrykt',
    description: 'Analytikere advarer om nedkjøling i norsk økonomi. Forbrukerne stramme inn.',
    demandModifier: 0.80, costModifier: 1.0,
    choices: [{ text: 'Sett ned prisene', effect: 'Litt mer salg, lavere margin' }, { text: 'Hold kursen', effect: '-20% salg' }] },
  { id: 'e3', category: 'economic', type: 'negative', emoji: '⛽', title: 'Energipriser stiger',
    description: 'Strøm- og energikostnadene øker markant.',
    demandModifier: 0.95, costModifier: 1.12,
    choices: [{ text: 'Invester i strømsparende tiltak', effect: '-5% kostnad fremover' }] },
  { id: 'e4', category: 'economic', type: 'positive', emoji: '💰', title: 'Rentekutt fra Norges Bank',
    description: 'Sentralbanken senker renten — folk har mer penger å bruke.',
    demandModifier: 1.12, costModifier: 1.0,
    choices: [{ text: 'Øk markedsføringen', effect: 'Ekstra effekt av kampanjer' }] },

  // Social
  { id: 's1', category: 'social', type: 'positive', emoji: '🌟', title: 'Viral moment på TikTok',
    description: 'Et produkt fra sortimentet ditt går viralt på sosiale medier!',
    demandModifier: 1.35, costModifier: 1.0,
    choices: [{ text: 'Øk lagerbeholdning raskt', effect: '+35% etterspørsel denne måneden' }] },
  { id: 's2', category: 'social', type: 'negative', emoji: '😤', title: 'Negativ omtale online',
    description: 'En utilfreds kunde har lagt ut en negativ video om butikken din.',
    demandModifier: 0.88, costModifier: 1.0,
    choices: [{ text: 'Gi refusjon og be om unnskyldning', effect: '+5 rykte' }, { text: 'Ignorer det', effect: '-10 rykte' }] },
  { id: 's3', category: 'social', type: 'positive', emoji: '🎉', title: 'Lokal festival',
    description: 'En stor festival i nærområdet trekker tusenvis av besøkende.',
    demandModifier: 1.25, costModifier: 1.0,
    choices: [{ text: 'Sett opp ekstra bemanning', effect: '+25% salg denne måneden' }] },
  { id: 's4', category: 'social', type: 'neutral', emoji: '🏙️', title: 'Ny demografi i bydelen',
    description: 'Nye studentboliger åpnes i nærheten. Yngre kundegruppe.',
    demandModifier: 1.08, costModifier: 1.0,
    choices: [{ text: 'Tilpass sortimentet', effect: 'Bedre match med unge kunder' }] },

  // Technological
  { id: 't1', category: 'technological', type: 'positive', emoji: '🤖', title: 'AI-verktøy for markedsføring',
    description: 'Nye AI-verktøy lar deg automatisere og forbedre markedsføringen.',
    demandModifier: 1.10, costModifier: 0.95,
    choices: [{ text: 'Ta i bruk ny teknologi', effect: '+10% effekt av markedsbudsjettet' }] },
  { id: 't2', category: 'technological', type: 'negative', emoji: '🔒', title: 'Datainnbrudd i bransjen',
    description: 'En stor datasikkerhetshendelse rammer bransjen og skaper usikkerhet.',
    demandModifier: 0.92, costModifier: 1.05,
    choices: [{ text: 'Styrk sikkerhetstiltak', effect: 'Beskytt kundedata, litt kostnad' }] },
  { id: 't3', category: 'technological', type: 'positive', emoji: '📱', title: 'Ny betalingsløsning populær',
    description: 'Kundene elsker den nye digitale betalingsløsningen — kortere køer.',
    demandModifier: 1.08, costModifier: 1.0,
    choices: [{ text: 'Innfør ny betaling', effect: '+8% kundetilfredshet' }] },
  { id: 't4', category: 'technological', type: 'neutral', emoji: '🔧', title: 'Kassasystem-oppdatering',
    description: 'Ditt kassasystem krever obligatorisk oppdatering.',
    demandModifier: 1.0, costModifier: 1.02,
    choices: [{ text: 'Gjennomfør oppdateringen', effect: 'Ingen merkbar effekt' }] },
]

// ── Seasonal modifiers ────────────────────────────────────────────────────────

const SEASONAL: Record<string, number[]> = {
  default: [0.85, 0.80, 0.90, 0.95, 1.00, 1.05, 1.10, 1.00, 0.95, 1.05, 1.15, 1.35],
  cafe:    [0.80, 0.78, 0.88, 0.95, 1.02, 1.10, 1.15, 1.10, 1.00, 0.95, 1.05, 1.20],
  sports:  [0.70, 0.75, 0.95, 1.10, 1.20, 1.25, 1.15, 1.10, 1.05, 0.90, 0.80, 1.00],
}

// ── Helper functions ──────────────────────────────────────────────────────────

function priceModifier(retailPrice: number, recommendedPrice: number): number {
  const ratio = retailPrice / recommendedPrice
  if (ratio <= 0.7)  return 1.4
  if (ratio <= 0.85) return 1.2
  if (ratio <= 1.0)  return 1.0
  if (ratio <= 1.2)  return 0.82
  if (ratio <= 1.5)  return 0.60
  return 0.35
}

function marketingModifier(totalBudget: number): number {
  if (totalBudget <= 0)      return 0.70
  if (totalBudget < 5_000)   return 0.88
  if (totalBudget < 15_000)  return 1.00
  if (totalBudget < 30_000)  return 1.18
  if (totalBudget < 60_000)  return 1.35
  return 1.50
}

function locationModifier(zone: string | null): number {
  switch (zone) {
    case 'gagata':    return 1.50
    case 'hovedgata': return 1.00
    case 'utkant':    return 0.60
    default:          return 0.40
  }
}

function reputationModifier(rep: number): number {
  return 0.60 + (rep / 100) * 0.70  // 0.60–1.30
}

function channelReach(channels: string[]): number {
  let reach = 1.0
  if (channels.includes('webShop'))      reach += 0.30
  if (channels.includes('instagramShop')) reach += 0.20
  if (channels.includes('delivery'))     reach += 0.25
  if (channels.includes('wholesale'))    reach += 0.35
  return reach
}

function channelMarginFactor(channels: string[]): number {
  const margins: Record<string, number> = {
    physicalStore: 1.00, webShop: 0.92, instagramShop: 0.88,
    delivery: 0.70, wholesale: 0.60,
  }
  if (channels.length === 0) return 1.0
  return channels.reduce((s, c) => s + (margins[c] ?? 1.0), 0) / channels.length
}

function channelMonthlyCost(channels: string[]): number {
  const costs: Record<string, number> = {
    physicalStore: 0, webShop: 2500, instagramShop: 1200,
    delivery: 800, wholesale: 500,
  }
  return channels.reduce((s, c) => s + (costs[c] ?? 0), 0)
}

function employeeBonus(employees: GameState['employees']): number {
  const salesCount = employees.filter(e => e.role === 'selger').length
  return 1.0 + salesCount * 0.10
}

function rollPestEvent(month: number): PestEvent | null {
  if (Math.random() > 0.30) return null  // 30% chance
  const pool = month >= 9
    ? PEST_EVENTS.filter(e => e.type !== 'neutral')
    : PEST_EVENTS
  return pool[Math.floor(Math.random() * pool.length)]
}

// ── Main simulation ────────────────────────────────────────────────────────────

export function simulateMonth(state: GameState): MonthResult {
  const { currentMonth: month, products, channels, marketingBudget, reputation,
          locationZone, monthlyRent, employees, monthlyPayroll, industry, monthlyLoanPayment } = state

  const totalMarketing = Object.values(marketingBudget).reduce((s, v) => s + v, 0)
  const pest = rollPestEvent(month)

  const mktMod    = marketingModifier(totalMarketing)
  const locMod    = locationModifier(locationZone)
  const repMod    = reputationModifier(reputation)
  const reachMod  = channelReach(channels)
  const marginFac = channelMarginFactor(channels)
  const empBonus  = employeeBonus(employees)
  const seasonal  = (SEASONAL[industry] ?? SEASONAL.default)[month - 1] ?? 1.0
  const pestDemand = pest?.demandModifier ?? 1.0
  const pestCost   = pest?.costModifier   ?? 1.0
  const matchScore = calcPersonaMatchScore(products, state.targetAudience.psychographics)
  const targetMod  = targetMatchMultiplier(matchScore)

  let totalRevenue = 0
  let totalCogs    = 0
  let totalUnits   = 0

  for (const p of products) {
    if (p.stock <= 0) continue
    const priceMod = priceModifier(p.retailPrice, p.recommendedPrice)
    const demand = p.maxDemandPerMonth * priceMod * mktMod * locMod * repMod * reachMod * empBonus * seasonal * pestDemand * targetMod
    const rawUnits = Math.round(demand * (0.80 + Math.random() * 0.40))
    const unitsSold = Math.max(0, Math.min(rawUnits, p.stock))
    totalUnits   += unitsSold
    totalRevenue += unitsSold * p.retailPrice * marginFac
    totalCogs    += unitsSold * p.costPrice * pestCost
  }

  const channelCosts = channelMonthlyCost(channels)
  const baseCosts = monthlyRent + monthlyPayroll + channelCosts + (monthlyLoanPayment ?? 0) + 2_000  // +2k insurance
  const totalCosts = Math.round(totalCogs + baseCosts + totalMarketing)
  const revenue    = Math.round(totalRevenue)
  const profit     = revenue - totalCosts

  const reputationDelta = profit > 0
    ? Math.round(Math.random() * 4 + 1)    // +1..+5
    : -Math.round(Math.random() * 2 + 1)   // -1..-3

  const xpEarned = totalUnits * 2 + (profit > 0 ? 50 : 10)

  return {
    month,
    revenue,
    costs: totalCosts,
    profit,
    unitsSold: totalUnits,
    reputationDelta,
    xpEarned,
    pestEvent: pest,
  }
}
