import type { InnovationEvent } from '../types'

const E001: InnovationEvent = {
  id: 'E001',
  title: 'Idéen din finnes allerede',
  text: 'Du googler idéen din og finner ut at en bedrift i Trondheim allerede gjør noe lignende. De har 50 kunder.',
  phase: [1],
  triggerMonths: [1],
  probability: 0.3,
  triggerCondition: (_flags, month) => month === 1,
  kompetansemaal: 'ENT1 — konkurrentanalyse, idévalidering',
  choices: [
    {
      id: 'A',
      label: '🔄 Pivot — endre canvas',
      description: 'Du endrer forretningsidéen din og starter validering på nytt.',
      flagUpdates: { pivoted: true, pivotCount: 1 },
      runwayDelta: -1,
      reputationDelta: 0,
    },
    {
      id: 'B',
      label: '🎯 Differensier — finn nisje',
      description: 'Du finner et nisjesegment konkurrenten ikke dekker og posisjonerer deg der.',
      flagUpdates: { differentiation_strategy: true },
      reputationDelta: 5,
      userDelta: 10,
    },
    {
      id: 'C',
      label: '🚀 Ignorer — kjør på',
      description: 'Du ignorerer konkurrenten og fortsetter som planlagt.',
      flagUpdates: { ignored_competition: true },
      reputationDelta: 0,
    },
  ],
}

export default E001
