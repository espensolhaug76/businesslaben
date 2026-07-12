// ─── ORGANISASJONSDESIGN — refleksjonsmotor (docs/BEMANNING.md) ───────────────
// Regelbaserte REFLEKSJONSSPØRSMÅL om elevens org-kart. ALDRI fasit — bare
// spørsmål som får eleven til å tenke over egen organisering. Reglene er TUNBAR
// DATA (terskler i ORG_REGEL_PARAM), ikke hardkodet logikk i UI/reducer. Brukes
// av Personale-fanens «Se over organisasjonen» (viser alle som slår ut) OG av
// CLOSE_DAY (velger ÉN diskret linje til dagsoppgjøret).

import type { Employee, EmployeeRole } from '../types'

export interface OrgKontekst {
  /** Finnes funksjonen (rolle-id) i elevens org-kart? */
  harFunksjon: (roleId: EmployeeRole) => boolean
  /** Antall ansatte totalt (benk + disponert). */
  ansatte: number
  /** Antall disponert i en funksjon (grenId satt). */
  disponerte: number
  /** Omsetning så langt denne måneden (salg + bakgrunn). */
  omsetningMnd: number
}

export interface RefleksjonRegel {
  id: string
  spørsmål: string
  /** Høyere = viktigere — velges først til dagsoppgjørets ene linje. */
  prioritet: number
  test: (k: OrgKontekst) => boolean
}

/** Tunbare terskler — juster her, ikke i reglenes test-funksjoner. */
export const ORG_REGEL_PARAM = {
  /** Over denne månedsomsetningen begynner «mangler Økonomi»-spørsmålet. */
  okonomiOmsetningsterskel: 100_000,
}

export const REFLEKSJONSREGLER: RefleksjonRegel[] = [
  {
    id: 'mangler-salg',
    prioritet: 30,
    spørsmål: 'Ingen Salg-funksjon i kartet — hvem betjener kundene når du ikke er der?',
    test: k => !k.harFunksjon('selger'),
  },
  {
    id: 'mangler-okonomi',
    prioritet: 20,
    spørsmål: 'Omsetningen vokser uten en Økonomi-funksjon — hvem følger med på tallene?',
    test: k => !k.harFunksjon('okonom') && k.omsetningMnd > ORG_REGEL_PARAM.okonomiOmsetningsterskel,
  },
  {
    id: 'alle-paa-benk',
    prioritet: 10,
    spørsmål: 'Alle ansatte står på benken — du betaler lønn, men hvem gjør hva?',
    test: k => k.ansatte > 0 && k.disponerte === 0,
  },
]

/** Funksjonene som REELT finnes i kartet. Migrering: en disponert ansatt
 *  (grenId satt) impliserer at funksjonen finnes, selv om `orgRoller` (nyere
 *  felt) ikke skulle inneholde den ennå — så gamle states aldri brekker. */
export function aktiveFunksjoner(
  orgRoller: EmployeeRole[],
  employees: Pick<Employee, 'role' | 'grenId'>[],
): EmployeeRole[] {
  const s = new Set<EmployeeRole>(orgRoller)
  for (const e of employees) if (e.grenId) s.add(e.grenId)
  return [...s]
}

/** Alle regler som slår ut, viktigst først. */
export function evaluerRefleksjon(k: OrgKontekst): RefleksjonRegel[] {
  return REFLEKSJONSREGLER.filter(r => r.test(k)).sort((a, b) => b.prioritet - a.prioritet)
}

/** Den ene viktigste refleksjonslinja (til dagsoppgjøret), eller null. */
export function toppRefleksjon(k: OrgKontekst): string | null {
  return evaluerRefleksjon(k)[0]?.spørsmål ?? null
}

// ─── DEL 5 (fiksrunde 2) — «Hvem gjør hva?» (steg 1) refleksjon ────────────────
// Reager på OPPGAVEFORDELINGEN med SPØRSMÅL, aldri fasit. Ingen mekanisk effekt
// denne runden — mange oppgaver på én person gir kun refleksjon (mekanisk effekt
// tas i en senere balansejobb). Tunbare terskler i OPPGAVE_REGEL_PARAM.
export const OPPGAVE_REGEL_PARAM = {
  /** Antall oppgaver på ÉN person før «for mye på én»-spørsmålet slår ut. */
  mangeOppgaverTerskel: 4,
}

export interface OppgaveKontekst {
  /** personId ('meg' = daglig leder, ellers employee.id) → tildelte oppgaveroller. */
  fordeling: Record<string, EmployeeRole[]>
  regnskapOutsourcet: boolean
  /** Kjerneoppgaver å sjekke dekning for (id + visningsnavn). */
  kjerneOppgaver: { id: EmployeeRole; navn: string }[]
}

/** Refleksjonsspørsmål om oppgavefordelingen (viktigst først, maks 4). */
export function oppgaveRefleksjoner(k: OppgaveKontekst): string[] {
  const q: string[] = []
  const lederOppg = k.fordeling['meg'] ?? []
  if (lederOppg.length >= OPPGAVE_REGEL_PARAM.mangeOppgaverTerskel)
    q.push(`Du har lagt ${lederOppg.length} oppgaver på deg selv — hva skjer i rushet når alt henger på én person?`)
  if (k.regnskapOutsourcet)
    q.push('Du satte regnskapet ut til en regnskapsfører — hva vinner du tid til, og hva mister du oversikt over?')
  // Udekte kjerneoppgaver (ingen person har dem, og ikke satt ut).
  const dekket = new Set<EmployeeRole>()
  for (const roller of Object.values(k.fordeling)) for (const r of roller) dekket.add(r)
  for (const opp of k.kjerneOppgaver) {
    if (opp.id === 'okonom' && k.regnskapOutsourcet) continue
    if (!dekket.has(opp.id)) q.push(`Ingen har fått «${opp.navn}» — hvem tar den når det trengs?`)
  }
  return q.slice(0, 4)
}
