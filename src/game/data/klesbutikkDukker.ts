// ─── Klesbutikk-PÅKLEDDE DUKKER (BRANSJE 2, jobb/klesbutikk) — presentasjonslag ─
//
// Registrerer de 20 splittede PÅKLEDDE dukke-spritene (public/assets/raw/klar-dukke/).
// NY RETNING: en påkledd dukke-sprite ERSTATTER den nakne dukka (ghost-antrekk
// rendret over naken dukke avslørte illusjonen — grå kropp skinte gjennom). Rent
// presentasjonslag; ingen katalog/lager/pris (kommer med BRANSJE2_LEVERANDORER.md).
//
// Navn = beskrivende bokmål kebab-case etter FAKTISK innhold (verifisert visuelt).
// dukketype avgjør hvilken naken dukke-fixture den kan erstatte:
//   'dame'  → fixture 'dukke'        'herre' → fixture 'dukke-mann'
//   'barn'  → fixture 'dukke-barn'   (se FIXTURE_FOR_DUKKETYPE)
//
// FLAGG: 'blazer-jeans-dame' (ark 02 blob 4) var visuelt kjønns-tvetydig
// (blazer skjuler torso) — antatt DAME (arket er ellers dame). Espen validerer.

import type { KlesbutikkFixtureId } from '../types'

export type Dukketype = 'dame' | 'herre' | 'barn'

export interface PåkleddDukke {
  id: string
  navn: string
  dukketype: Dukketype
  sprite: string
}

/** Hvilken naken dukke-fixture en påkledd dukke av gitt type erstatter. */
export const FIXTURE_FOR_DUKKETYPE: Record<Dukketype, KlesbutikkFixtureId> = {
  dame: 'dukke', herre: 'dukke-mann', barn: 'dukke-barn',
}

const P = (n: string) => `/assets/raw/klar-dukke/${n}.png`
const navnAv = (id: string) => id.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())

// id-er per dukketype (7 herre, 9 dame, 4 barn = 20).
const HERRE = ['blazer-herre', 'denim-herre', 'joggedress-herre', 'dress-herre', 'ullfrakk-herre', 'hoodie-herre', 'dunparkas-herre']
const DAME = ['sommerkjole-dame', 'bluse-skjort-dame', 'trenchcoat-dame', 'strikkekjole-dame', 'blazer-jeans-dame', 'vinterkappe-dame', 'linskjortekjole-dame', 'treningsjakke-dame', 'velurkjole-dame']
const BARN = ['regnfrakk-barn', 'hoodie-jeans-barn', 'blomsterkjole-barn', 'vinterdress-barn']

export const KLESBUTIKK_DUKKER: PåkleddDukke[] = [
  ...HERRE.map(id => ({ id, navn: navnAv(id), dukketype: 'herre' as Dukketype, sprite: P(id) })),
  ...DAME.map(id => ({ id, navn: navnAv(id), dukketype: 'dame' as Dukketype, sprite: P(id) })),
  ...BARN.map(id => ({ id, navn: navnAv(id), dukketype: 'barn' as Dukketype, sprite: P(id) })),
]

const BY_ID: Record<string, PåkleddDukke> = Object.fromEntries(KLESBUTIKK_DUKKER.map(d => [d.id, d]))
export const dukkeById = (id: string): PåkleddDukke | undefined => BY_ID[id]
