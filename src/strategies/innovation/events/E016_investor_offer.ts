import type { InnovationEvent } from '../types'

const E016: InnovationEvent = {
  id: 'E016',
  title: 'Investor-tilbud',
  text: 'Innlandet Investeringsfond har sett deg. De vil snakke.',
  phase: [4],
  triggerMonths: [7],
  probability: 1.0,
  isForced: true,
  triggerCondition: (flags, month) =>
    month === 7 && flags.monthlyUsers > 200 && flags.monthlyRevenue > 5_000,
  kompetansemaal: 'ENT2 — finansiering, verdsettelse, forhandling',
  choices: [
    {
      id: 'A',
      label: '✅ Aksepter 500k for 25%',
      description: 'Du får 500 000 kr og sikrer 12 måneders ekstra runway. Investor eier 25%.',
      flagUpdates: { hasInvestor: true, investorOwnership: 25 },
      capitalDelta: 500_000,
      runwayDelta: 12,
    },
    {
      id: 'B',
      label: '🤝 Forhandle høyere verdsettelse',
      description: '50% sjanse de trekker tilbudet. 50% sjanse for bedre deal.',
      flagUpdates: { hasInvestor: true, investorOwnership: 20 },
      capitalDelta: 600_000,
      runwayDelta: 12,
    },
    {
      id: 'C',
      label: '❌ Avslå — behold 100% eierskap',
      description: 'Du beholder full kontroll, men veksten begrenses.',
      flagUpdates: {},
      reputationDelta: 5,
    },
  ],
}

export default E016
