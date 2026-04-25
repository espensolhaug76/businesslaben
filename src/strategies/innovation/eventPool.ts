// ── Innovation Strategy: Event Pool ───────────────────────────────────────────
// Samler alle events. Importer nye events her etter hvert som de bygges.

import type { InnovationEvent } from './types'
import E001 from './events/E001_idea_exists'
import E005 from './events/E005_competitor_launches'
import E010 from './events/E010_customer_escalation'
import E016 from './events/E016_investor_offer'
import E023 from './events/E023_visma_acquisition'

export const EVENT_POOL: InnovationEvent[] = [
  E001,
  E005,
  E010,
  E016,
  E023,
  // Legg til E002–E032 her etter hvert (Fase 2 av implementasjonen)
]

export default EVENT_POOL
