// ── Innovation Strategy: Event Engine ─────────────────────────────────────────

import type { InnovationEvent, InnovationFlags, InnovationPhase } from './types'
import { EVENT_POOL } from './eventPool'

/**
 * Mapper måned til fase:
 * Fase 1: mnd 0-1 | Fase 2: mnd 2-3 | Fase 3: mnd 4-6
 * Fase 4: mnd 7-9 | Fase 5: mnd 10-12
 */
function getPhase(month: number): InnovationPhase {
  if (month <= 1) return 1
  if (month <= 3) return 2
  if (month <= 6) return 3
  if (month <= 9) return 4
  return 5
}

/**
 * Seeded pseudo-random basert på userId + month.
 * Gir deterministisk men uforutsigbar opplevelse.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10_000
  return x - Math.floor(x)
}

function makeSeed(userId: string, month: number, index: number): number {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) * 31 + month * 997 + index * 7
}

/**
 * Henter 1-2 events som skal trigge denne måneden.
 */
export function getEventsForMonth(
  flags: InnovationFlags,
  month: number,
  userId: string = 'default'
): InnovationEvent[] {
  const currentPhase = getPhase(month)
  const alreadyTriggered = new Set(flags.triggeredEvents)

  // Filtrer kandidater
  const candidates = EVENT_POOL.filter((event) => {
    // Allerede vist
    if (alreadyTriggered.has(event.id)) return false

    // Fase-match
    if (!event.phase.includes(currentPhase)) return false

    // Måned-match (valgfritt felt)
    if (event.triggerMonths && !event.triggerMonths.includes(month)) return false

    // Logisk betingelse
    if (!event.triggerCondition(flags, month)) return false

    return true
  })

  if (candidates.length === 0) return []

  // Skil ut tvungne events (isForced = true)
  const forced = candidates.filter((e) => e.isForced)
  const optional = candidates.filter((e) => !e.isForced)

  const selected: InnovationEvent[] = [...forced]

  // Trekk maks 1 frivillig event (vektet etter sannsynlighet)
  if (optional.length > 0 && selected.length < 2) {
    const rand = seededRandom(makeSeed(userId, month, 0))

    // Weighted selection
    const totalWeight = optional.reduce((sum, e) => sum + e.probability, 0)
    let cumulative = 0
    const target = rand * totalWeight

    for (const event of optional) {
      cumulative += event.probability
      if (target <= cumulative) {
        selected.push(event)
        break
      }
    }
  }

  // Returner maks 2 events
  return selected.slice(0, 2)
}

/**
 * Registrerer et event som brukt, slik at det ikke trigges igjen.
 */
export function markEventTriggered(
  flags: InnovationFlags,
  eventId: string
): Partial<InnovationFlags> {
  return {
    triggeredEvents: [...flags.triggeredEvents, eventId],
    totalChoiceCount: flags.totalChoiceCount + 1,
  }
}
