// ─── REKRUTTERING — stillingsannonse, søkere, intervju (docs/REKRUTTERING.md) ─
// Erstatter det gamle ett-klikks "Ansett"-mønsteret. Eleven setter lønn selv
// (referert mot REFERANSELONN = tidligere faste LEVEL_INFO-beløp, nå omdøpt
// til tariff-referanse) og drar inn ønskede egenskaper i annonsen. Lønn og
// egenskaps-match styrer HVEM som søker — aldri et synlig tall for eleven.

import type { EmployeeLevel, Kandidat } from '../types'

export interface Egenskap { id: string; label: string }

export const EGENSKAPER: Egenskap[] = [
  { id: 'serviceinnstilt',    label: 'Serviceinnstilt' },
  { id: 'stresstalig',        label: 'Stresstålig' },
  { id: 'noyaktig',           label: 'Nøyaktig' },
  { id: 'fleksibel',          label: 'Fleksibel (kveld/helg)' },
  { id: 'initiativrik',       label: 'Initiativrik' },
  { id: 'punktlig',           label: 'Punktlig' },
  { id: 'samarbeider_godt',   label: 'Samarbeider godt' },
  { id: 'praktisk_erfaring',  label: 'Praktisk erfaring' },
  { id: 'godt_humor',         label: 'Godt humør' },
]
export function egenskapLabel(id: string): string {
  return EGENSKAPER.find(e => e.id === id)?.label ?? id
}

/** Tariff-referanse per nivå — SAMME beløp som tidligere LEVEL_INFO.salary i
 *  DashboardOverlay (15k/25k/40k), nå gitt pedagogisk mening som referanselønn
 *  eleven kan velge å legge seg over eller under. IKKE endre beløpene — de er
 *  balansert mot resten av økonomien. */
export const REFERANSELONN: Record<EmployeeLevel, number> = {
  junior: 15_000,
  senior: 25_000,
  ekspert: 40_000,
}

const NAVN_FORNAVN = ['Ingrid', 'Jonas', 'Sara', 'Mathias', 'Emma', 'Oliver', 'Nora', 'Aksel', 'Maja', 'Henrik', 'Sofie', 'Filip', 'Thea', 'Elias', 'Frida', 'Kasper', 'Amalie', 'Noah']
const NAVN_ETTERNAVN = ['Berg', 'Haugen', 'Dahl', 'Lund', 'Moen', 'Solberg', 'Nilsen', 'Aas', 'Ruud', 'Vik', 'Strand', 'Fossum', 'Kristiansen', 'Bakke']
function tilfeldigKandidatNavn(): string {
  const f = NAVN_FORNAVN[Math.floor(Math.random() * NAVN_FORNAVN.length)]
  const e = NAVN_ETTERNAVN[Math.floor(Math.random() * NAVN_ETTERNAVN.length)]
  return `${f} ${e}`
}

const ERFARING_SVAK = ['Ingen tidligere erfaring', 'Sommerjobb ett år']
const ERFARING_STERK = ['1 år i bransjen', 'Flere års erfaring fra liknende jobb']
const ERFARING_ALLE = [...ERFARING_SVAK, ...ERFARING_STERK]
function tilfeldigFra<T>(liste: T[]): T { return liste[Math.floor(Math.random() * liste.length)] }

function trekkEgenskaper(antallMatch: number, antallTotalt: number, onskede: string[]): string[] {
  const resultat = new Set<string>()
  const onskedeShuffled = [...onskede].sort(() => Math.random() - 0.5)
  for (const id of onskedeShuffled) {
    if (resultat.size >= antallMatch) break
    resultat.add(id)
  }
  const restEgenskaper = EGENSKAPER.map(e => e.id).filter(id => !resultat.has(id)).sort(() => Math.random() - 0.5)
  for (const id of restEgenskaper) {
    if (resultat.size >= antallTotalt) break
    resultat.add(id)
  }
  return [...resultat]
}

/** Genererer 3 kandidater. tilbudtLonn vs REFERANSELONN[level] avgjør tier:
 *  under 85% = svak pool (0-1 match, vil ha mer enn tilbudt), 85-115% =
 *  normal pool (1-2 match, ca. treffer tilbudt), over 115% = sterk pool
 *  (2-3 match, tar gjerne tilbudet eller under). */
export function generateKandidater(
  level: EmployeeLevel,
  tilbudtLonn: number,
  onskedeEgenskaper: string[],
): Kandidat[] {
  const referanse = REFERANSELONN[level]
  const forhold = referanse > 0 ? tilbudtLonn / referanse : 1
  const tier: 'lavt' | 'normalt' | 'hoyt' = forhold < 0.85 ? 'lavt' : forhold > 1.15 ? 'hoyt' : 'normalt'

  return [0, 1, 2].map(() => {
    let antallMatch: number, antallTotalt: number, lonnsforventning: number, erfaring: string
    if (tier === 'lavt') {
      antallMatch = Math.random() < 0.6 ? 0 : 1
      antallTotalt = 2
      lonnsforventning = Math.round((referanse * (1.05 + Math.random() * 0.15)) / 500) * 500
      erfaring = tilfeldigFra(ERFARING_SVAK)
    } else if (tier === 'hoyt') {
      antallMatch = Math.min(onskedeEgenskaper.length, Math.random() < 0.5 ? 3 : 2)
      antallTotalt = 3
      lonnsforventning = Math.round((tilbudtLonn * (0.85 + Math.random() * 0.15)) / 500) * 500
      erfaring = tilfeldigFra(ERFARING_STERK)
    } else {
      antallMatch = Math.random() < 0.5 ? 1 : 2
      antallTotalt = 3
      lonnsforventning = Math.round((tilbudtLonn * (0.95 + Math.random() * 0.1)) / 500) * 500
      erfaring = tilfeldigFra(ERFARING_ALLE)
    }
    return {
      id: `kand_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      navn: tilfeldigKandidatNavn(),
      egenskaper: trekkEgenskaper(antallMatch, antallTotalt, onskedeEgenskaper),
      lonnsforventning,
      erfaring,
    }
  })
}

// ─── Intervju — 2 faste spørsmål, narrativ tilbakemelding (ALDRI poeng) ───────
export interface IntervjuValg { id: string; tekst: string; tilbakemelding: string }
export interface IntervjuSporsmal { id: string; sporsmal: string; valg: IntervjuValg[] }

export const INTERVJUSPORSMAL: IntervjuSporsmal[] = [
  {
    id: 'q_kunde',
    sporsmal: 'Fortell om en gang du måtte håndtere en misfornøyd kunde.',
    valg: [
      { id: 'q_kunde_a', tekst: 'Jeg lyttet først, beklaget situasjonen, og fant en løsning sammen med kunden.', tilbakemelding: 'Konkret og løsningsorientert svar — virker som noen som tar ansvar i vanskelige møter.' },
      { id: 'q_kunde_b', tekst: 'Jeg prøvde å roe dem ned og henviste videre til en kollega.', tilbakemelding: 'Grei håndtering, men litt uklart om vedkommende selv tar tak i problemet.' },
      { id: 'q_kunde_c', tekst: 'Sånt skjer sjelden, jeg har egentlig ikke opplevd det.', tilbakemelding: 'Unnvikende svar — gir deg lite å vurdere rundt hvordan de takler presset.' },
    ],
  },
  {
    id: 'q_travelt',
    sporsmal: 'Hva gjør du hvis det plutselig blir veldig travelt og du er alene på jobb?',
    valg: [
      { id: 'q_travelt_a', tekst: 'Jeg prioriterer det viktigste først og sier ifra tidlig hvis jeg trenger hjelp.', tilbakemelding: 'Strukturert og ærlig om egne grenser — bra i en presset situasjon.' },
      { id: 'q_travelt_b', tekst: 'Jeg biter tenna sammen og prøver å få unna alt selv.', tilbakemelding: 'Vilje til å stå i det, men kan gå ut over kvaliteten hvis det varer for lenge.' },
      { id: 'q_travelt_c', tekst: 'Da må sjefen bare komme og ta over.', tilbakemelding: 'Lite selvstendig svar til en stilling som krever at man takler travle perioder alene.' },
    ],
  },
]
