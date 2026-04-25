import type { InnovationEvent } from '../types'

const E005: InnovationEvent = {
  id: 'E005',
  title: 'Konkurrent lanserer',
  text: 'Mittanbud lanserer akkurat samme funksjon som deg. De har 100x budsjettet ditt.',
  phase: [2],
  triggerMonths: [2, 3],
  probability: 0.4,
  triggerCondition: (_flags, month) => month >= 2 && month <= 3,
  kompetansemaal: 'ENT2 — konkurransestrategi, posisjonering',
  choices: [
    {
      id: 'A',
      label: '📍 Gå smalere — fokuser på Kongsvinger',
      description: 'Du fokuserer på lokalmarkedet og bygger sterk lokal posisjon.',
      flagUpdates: { local_focus: true },
      reputationDelta: 5,
      userDelta: -10,
    },
    {
      id: 'B',
      label: '⚡ Speed — lanser MVP en måned tidligere',
      description: 'Du presser på for raskere lansering, men akkumulerer teknisk gjeld.',
      flagUpdates: {},
      techDebtDelta: 30,
      userDelta: 20,
    },
    {
      id: 'C',
      label: '🔨 Gjør produktet bedre — bruk mer tid',
      description: 'Du tar deg tid til å lage et overlegent produkt, men mister noen kunder til konkurrenten.',
      flagUpdates: {},
      runwayDelta: -1,
      reputationDelta: 10,
      userDelta: 5,
    },
  ],
}

export default E005
