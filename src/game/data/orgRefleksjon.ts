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
