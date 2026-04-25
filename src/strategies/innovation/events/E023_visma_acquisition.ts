import type { InnovationEvent } from '../types'

const E023: InnovationEvent = {
  id: 'E023',
  title: 'Visma vil kjøpe deg',
  text: 'Visma sender et bud: 8 millioner kroner for 100% av selskapet.',
  phase: [5],
  triggerMonths: [10, 11],
  probability: 1.0,
  isForced: true,
  triggerCondition: (flags, month) =>
    (month === 10 || month === 11) &&
    flags.monthlyUsers > 1_000 &&
    flags.hasInvestor === true,
  kompetansemaal: 'ENT2 — exit-strategi, M&A, verdsettelse',
  choices: [
    {
      id: 'A',
      label: '💰 Aksepter 8 millioner',
      description: 'Du selger. Beregner hva du sitter igjen med etter investor.',
      flagUpdates: { outcome: 'EXIT_BIG', exitValue: 8_000_000 },
      capitalDelta: 8_000_000,
    },
    {
      id: 'B',
      label: '📈 Forhandle høyere — vil ha 10 mill',
      description: '30% sjanse de trekker tilbudet. 70% sjanse for 10 mill.',
      flagUpdates: { outcome: 'EXIT_BIG', exitValue: 10_000_000 },
      capitalDelta: 10_000_000,
    },
    {
      id: 'C',
      label: '🚀 Avslå — fortsett selvstendig',
      description: 'Du avslår og fortsetter. Trigger nye muligheter i mnd 12.',
      flagUpdates: {},
      followUpEvent: 'E028',
      reputationDelta: 10,
    },
  ],
}

export default E023
