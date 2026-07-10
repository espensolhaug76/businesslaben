// ─── SPORT (eksperiment/autonom-sport) — vare-/sprite-register for stillaset ──
//
// Rent presentasjonsregister: kobler en sport-vare-id til dens NB-genererte
// sprite (public/assets/raw/sport/<id>.png, split fra 4 produktark) og hvilken
// VAREPLASS-type den hører hjemme på. SportStillas slår opp her når den rendrer
// vareplassene i det bakte interiøret. Katalog/pris bor i industries.ts
// (INDUSTRY_CATALOG.sports) — dette er BILDE-siden, ikke økonomien.

import type { PlassType } from './industryDefinition'

export interface SportVare {
  id: string
  navn: string
  sprite: string
  type: PlassType
}

const S = (n: string) => `/assets/raw/sport/${n}.png`
const V = (id: string, navn: string, type: PlassType): SportVare => ({ id, navn, sprite: S(id), type })

export const SPORT_VARER: SportVare[] = [
  // Sko (ark-01)
  V('lopesko',        'Løpesko',           'sko'),
  V('terrengsko',     'Terrengsko',        'sko'),
  V('tennissko',      'Tennissko',         'sko'),
  V('basketsko',      'Basketsko',         'sko'),
  V('fjellsko',       'Fjellstøvel',       'sko'),
  V('innesko',        'Innesko',           'sko'),
  // Bekledning hengende (ark-02)
  V('treningsjakke',  'Treningsjakke',     'heng'),
  V('hettegenser',    'Hettegenser',       'heng'),
  V('regnjakke',      'Regnjakke',         'heng'),
  V('vinterjakke',    'Vinterjakke',       'heng'),
  V('softshelljakke', 'Softshelljakke',    'heng'),
  V('fleecegenser',   'Fleecegenser',      'heng'),
  V('treningsgenser', 'Treningsgenser',    'heng'),
  V('vindjakke',      'Vindjakke',         'heng'),
  // Bekledning brettet (ark-03)
  V('t-skjorte',      'Trenings-T-skjorte','brett'),
  V('singlet',        'Singlet',           'brett'),
  V('treningsshorts', 'Treningsshorts',    'brett'),
  V('treningsbukse',  'Treningsbukse',     'brett'),
  V('tights',         'Tights',            'brett'),
  V('collegegenser',  'Collegegenser',     'brett'),
  // Utstyr (ark-04)
  V('fotball',        'Fotball',           'utstyr'),
  V('handvekt',       'Håndvekter',        'utstyr'),
  V('yogamatte',      'Yogamatte',         'utstyr'),
  V('vannflaske',     'Vannflaske',        'utstyr'),
  V('ryggsekk',       'Treningsryggsekk',  'utstyr'),
  V('sykkelhjelm',    'Sykkelhjelm',       'utstyr'),
]

const BY_ID: Record<string, SportVare> = Object.fromEntries(SPORT_VARER.map(v => [v.id, v]))

export const sportVareById = (id?: string): SportVare | undefined => (id ? BY_ID[id] : undefined)

/** Første vare av en gitt plass-type — brukes som live-preview i tracer-UI-et
 *  når en ny (tom) plass legges til. */
export const repVareForType = (type: PlassType): SportVare | undefined =>
  SPORT_VARER.find(v => v.type === type)
