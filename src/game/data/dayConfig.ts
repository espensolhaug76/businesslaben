// ─── AdVenture 3.0 — Dagssyklus-konfigurasjon (DEL 1) ────────────────────────
//
// ALT dag-logikken leser skal komme herfra — ingen magiske tall i
// InteriorView/GameContext/DayResultOverlay. Hardkodede defaults NÅ (runde 1),
// men skjemaet er «lærer-klar» fra dag én: runde 2 kobler et
// lærerdashbord/Firebase til akkurat dette objektet (samme felt, ingen
// omskriving av logikken som leser det).

/** Hvilke scenariotyper dagens kunde-pool trekker fra:
 *  - 'alle'          — hele SCENARIOS-poolen (reservert for FREMTIDIGE
 *                       scenariotyper utover salg/service — i dag identisk
 *                       med 'salgOgService' siden bare de to finnes ennå)
 *  - 'kunSalg'        — kun scenarier med outcomeKind 'sale' (eller utelatt)
 *  - 'salgOgService'  — dagens fulle sett (salg + service/klage)
 */
export type ScenarioMix = 'alle' | 'kunSalg' | 'salgOgService'

export interface DayConfig {
  /** Antall kundemøter per handledag. */
  meetingsPerDay: number
  /** Filter på dagens kunde-pool — se ScenarioMix. */
  scenarioMix: ScenarioMix
  /** Antall handledager før måneden ruller (dayNumber > dette ⇒ ny måned). */
  daysPerMonth: number
  /** Leveringstid i handledager (docs/INNKJOP_LEVERING.md): bestill dag N →
   *  varene ankommer morgenen dag N + leadTimeDays. Felles for alle varer i
   *  dag (leverandør-differensiering kommer med leverandørkatalogen). */
  leadTimeDays: number
}

export const DAY_CONFIG: DayConfig = {
  meetingsPerDay: 4,
  scenarioMix: 'alle',
  daysPerMonth: 12,
  leadTimeDays: 1,
}
