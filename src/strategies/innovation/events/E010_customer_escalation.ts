import type { InnovationEvent } from '../types'

const E010: InnovationEvent = {
  id: 'E010',
  title: 'Første ekte krise — kunde-eskalering',
  text: 'En sint kunde skriver om dere på Facebook. Innlegget har 2000 delinger.',
  phase: [3],
  triggerMonths: [4],
  probability: 1.0, // Alltid i mnd 4 hvis ingen andre alvorlige events
  isForced: true,
  triggerCondition: (_flags, month) => month === 4,
  kompetansemaal: 'Kultur — klagebehandling, sosiale medier',
  choices: [
    {
      id: 'A',
      label: '💬 Svar offentlig med empati',
      description: 'Du responderer åpent og ærlig. Omdømmet overlever krisen.',
      flagUpdates: {},
      reputationDelta: 5,
    },
    {
      id: 'B',
      label: '🗑️ Slett innlegget hvis mulig',
      description: '50% sjanse for at det blir enda mer viralt og ødelegger omdømmet.',
      flagUpdates: {},
      reputationDelta: -15,
    },
    {
      id: 'C',
      label: '📞 Kontakt kunden privat',
      description: 'Du betaler 5 000 kr i kompensasjon. Saken forsvinner stille.',
      flagUpdates: {},
      capitalDelta: -5_000,
      reputationDelta: 10,
    },
  ],
}

export default E010
