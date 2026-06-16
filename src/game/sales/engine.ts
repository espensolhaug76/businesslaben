// ─── SALGSSITUASJON-MOTOR — ren scoringslogikk ───────────────────────────────
//
// Mild, konstruktiv scoring: ALDRI «game over», alltid noe positivt og et
// lærepunkt. All state-skriving skjer i reduceren (RESOLVE_SALES_SCENARIO);
// dette er rene funksjoner uten bivirkninger.

import type { ScoredPick, SaleLine, SalesResult } from './types'

/** Fisher–Yates-stokk. Ligger i denne rene modulen (ikke i React-render) slik
 *  at Math.random er trygt å bruke. Returnerer en ny array — input mutéres ikke. */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

/** Treffer varen behovet? Matcher nøkkelord mot produktets navn + id, så både
 *  katalog-id (f.eks. 'coffee_standard') og bokmålsnavn ('Kaffe') fanges. */
export function productMatchesNeed(p: { name: string; id: string }, tags: string[]): boolean {
  const hay = `${p.name} ${p.id}`.toLowerCase()
  return tags.some(t => hay.includes(t.toLowerCase()))
}

export function buildSalesResult(
  picks: ScoredPick[],
  sales: SaleLine[],
  personaMatch: boolean,
): SalesResult {
  const good = picks.filter(p => p.quality === 'good').length
  const warn = picks.filter(p => p.quality === 'warn').length
  const bad = picks.filter(p => p.quality === 'bad').length
  const behovstreff = picks.some(p => p.behovstreff)

  // Tilfredshet 0–100. Base + bidrag per valgkvalitet, pluss små bonuser.
  let satisfaction = 55 + good * 12 + warn * 3 - bad * 10
  if (behovstreff) satisfaction += 10
  if (personaMatch) satisfaction += 8
  satisfaction = Math.max(10, Math.min(100, satisfaction))

  const revenue = sales.reduce((s, l) => s + l.price * l.qty, 0)

  // Rykte-delta er mildt: et middels møte er nøytralt, et godt løfter litt.
  const reputationDelta =
    satisfaction >= 85 ? 3 :
    satisfaction >= 65 ? 2 :
    satisfaction >= 45 ? 1 :
    satisfaction >= 30 ? 0 : -1

  // XP er alltid ikke-negativ — eleven skal sitte igjen med mestringsfølelse.
  const xpEarned =
    20 + good * 8 + warn * 3 +
    (sales.some(l => l.qty > 0) ? 15 : 0) +
    (behovstreff ? 10 : 0) +
    (personaMatch ? 10 : 0)

  return {
    sales, revenue, satisfaction, reputationDelta, xpEarned,
    personaMatch, behovstreff, summary: buildSummary({ satisfaction, behovstreff, revenue, bad, personaMatch }),
    good, warn, bad,
  }
}

function buildSummary(r: {
  satisfaction: number; behovstreff: boolean; revenue: number; bad: number; personaMatch: boolean
}): string {
  const parts: string[] = []

  if (r.satisfaction >= 85) parts.push('Strålende salgssamtale! Kunden følte seg sett og godt ivaretatt.')
  else if (r.satisfaction >= 65) parts.push('God samtale. Kunden gikk fornøyd ut.')
  else if (r.satisfaction >= 45) parts.push('Helt grei samtale, men det er rom for å bli varmere og mer lyttende.')
  else parts.push('Tøff samtale denne gangen — men hver kunde er en ny sjanse til å øve.')

  if (r.behovstreff) parts.push('Du fant fram til det kunden faktisk trengte — det er kjernen i godt salg.')
  else parts.push('Husk å lytte etter det skjulte behovet før du anbefaler en vare.')

  if (r.revenue > 0) parts.push(`Du fikk solgt for ${r.revenue.toLocaleString('nb-NO')} kr.`)
  else parts.push('Ingen salg denne gangen — men en ærlig og hjelpsom tone bygger tillit på sikt.')

  if (r.personaMatch) parts.push('Kunden traff midt i målgruppa di — slike kunder er gull verdt.')
  if (r.bad >= 2) parts.push('Prøv å unngå de avvisende svarene; tonen din betyr mye for opplevelsen.')

  return parts.join(' ')
}
