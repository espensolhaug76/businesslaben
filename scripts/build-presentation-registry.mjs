#!/usr/bin/env node
/**
 * Bygger src/lib/presentationRegistry.ts fra rutene i src/App.tsx og
 * presentasjonsfilene de peker på.
 *
 * Kjør når en presentasjonsrute legges til, fjernes eller døpes om:
 *   node scripts/build-presentation-registry.mjs
 *
 * Erstatter det tapte /tmp/gen_pres_registry.py. To ting er endret bevisst:
 *
 *  1. Rute → fil slås opp via IMPORT-setningen i App.tsx, ikke ved å utlede
 *     filnavnet fra komponentnavnet. Forgjengeren mistet
 *     «KlagehåndteringPresentation» — den eneste komponenten med et ikke-ASCII
 *     tegn i navnet — og produserte 108 oppføringer av 109 ruter.
 *  2. Skriptet FEILER hvis en rute ikke lar seg løse opp eller mangler
 *     klassifisering. Forgjengeren hoppet stille over, og hullet ble først
 *     oppdaget måneder senere.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const APP = resolve(REPO_ROOT, 'src/App.tsx')
const PRES_DIR = resolve(REPO_ROOT, 'src/screens/learninghub/presentations')
const OUT = resolve(REPO_ROOT, 'src/lib/presentationRegistry.ts')

const RUTE_PREFIKS = '/learning/presentations/'

/**
 * Klassifisering av SSR-rutene. Kan ikke utledes av rutestien — VG1-blokka og
 * VG2-blokka i App.tsx blander fag — så den ligger eksplisitt her.
 * ML- og ENT-rutene klassifiseres av regelen under.
 */
const SSR_KLASSIFISERING = {
  'administrative-funksjoner':        ['vg1', 'mfi'],
  'baerekraft-verdikjede':            ['vg2', 'okonomi'],
  'beredskap':                        ['vg2', 'hms'],
  'beredskapsplaner':                 ['vg1', 'forretningsdrift'],
  'brannvern':                        ['vg2', 'hms'],
  'digital-sikkerhet-personvern':     ['vg2', 'hms'],
  'digitale-system-kundeoppfolging':  ['vg2', 'okonomi'],
  'distribusjon':                     ['vg1', 'mfi'],
  'etikk-baerekraft':                 ['vg1', 'kultur'],
  'forbrukeratferd':                  ['vg1', 'mfi'],
  'forretningsidee':                  ['vg1', 'mfi'],
  'forretningsplan-vg2':              ['vg2', 'okonomi'],
  'forstehjelp':                      ['vg2', 'hms'],
  'hms':                              ['vg1', 'forretningsdrift'],
  'hms-arbeid-roller':                ['vg2', 'hms'],
  'innovasjon-produktutvikling':      ['vg2', 'kommunikasjon'],
  'internasjonale-markeder-vg2':      ['vg2', 'kommunikasjon'],
  'kampanje':                         ['vg1', 'mfi'],
  'klaghandtering':                   ['vg1', 'kultur'],
  'kommunikasjon':                    ['vg1', 'kultur'],
  'konflikt-nod':                     ['vg1', 'kultur'],
  'konkurransemidlene':               ['vg1', 'mfi'],
  'lonn-personalkostnader':           ['vg2', 'okonomi'],
  'markedsforingskampanjer':          ['vg2', 'kommunikasjon'],
  'markedsforingstrekanten':          ['vg2', 'kommunikasjon'],
  'markedsplan':                      ['vg1', 'mfi'],
  'markedsundersokelse-vg2':          ['vg2', 'kommunikasjon'],
  'merkevare-vg2':                    ['vg2', 'kommunikasjon'],
  'nokkeltall-lonnsomhet':            ['vg2', 'okonomi'],
  'organisasjon':                     ['vg1', 'forretningsdrift'],
  'partene-arbeidslivet':             ['vg1', 'kultur'],
  'posisjonering-vg2':                ['vg2', 'kommunikasjon'],
  'pris-og-kalkulasjon':              ['vg2', 'okonomi'],
  'prissetting':                      ['vg1', 'forretningsdrift'],
  'produkt':                          ['vg1', 'mfi'],
  'profesjonell-kommunikasjon-vg2':   ['vg2', 'kommunikasjon'],
  'regelverk-markedsforing':          ['vg1', 'mfi'],
  'regelverk-servicebedrifter':       ['vg2', 'okonomi'],
  'regler-lovverk':                   ['vg1', 'forretningsdrift'],
  'regnskap':                         ['vg1', 'forretningsdrift'],
  'reiselivsprodukt-vg2':             ['vg2', 'kommunikasjon'],
  'rekrutteringsprosesser':           ['vg2', 'okonomi'],
  'relasjonsbygging':                 ['vg1', 'kultur'],
  'risikoanalyse-vg2':                ['vg2', 'hms'],
  'risikovurdering':                  ['vg1', 'forretningsdrift'],
  'salg':                             ['vg1', 'mfi'],
  'salgsprosessen-vg2':               ['vg2', 'kommunikasjon'],
  'svinnforebygging':                 ['vg2', 'okonomi'],
  'teknologi-ki':                     ['vg1', 'mfi'],
  'trender-forretningsmodeller':      ['vg2', 'okonomi'],
  'verdikjeden':                      ['vg1', 'forretningsdrift'],
  'vertskapsrollen':                  ['vg1', 'kultur'],
}

/** ML/ENT: første ledd i rutestien avgjør nivå og fag. */
const ML_ENT_KLASSIFISERING = {
  ml1:  ['vg2', 'ml'],
  ml2:  ['vg3', 'ml'],
  ent1: ['vg2', 'ent'],
  ent2: ['vg3', 'ent'],
}

/** Seksjonene, i den rekkefølgen de skal vises. Styrer også sorteringen. */
const SEKSJONER = [
  { title: 'Forretningsdrift — VG1',                 level: 'vg1', subject: 'ssr', ssrSubject: 'forretningsdrift' },
  { title: 'Markedsføring og innovasjon — VG1',      level: 'vg1', subject: 'ssr', ssrSubject: 'mfi' },
  { title: 'Kultur og samhandling — VG1',            level: 'vg1', subject: 'ssr', ssrSubject: 'kultur' },
  { title: 'Økonomi og administrasjon — VG2',        level: 'vg2', subject: 'ssr', ssrSubject: 'okonomi' },
  { title: 'Kommunikasjon og markedsføring — VG2',   level: 'vg2', subject: 'ssr', ssrSubject: 'kommunikasjon' },
  { title: 'Helse, miljø og sikkerhet — VG2',        level: 'vg2', subject: 'ssr', ssrSubject: 'hms' },
  { title: 'Markedsføring og ledelse 1 — VG2',       level: 'vg2', subject: 'ml' },
  { title: 'Entreprenørskap 1 — VG2',                level: 'vg2', subject: 'ent' },
  { title: 'Markedsføring og ledelse 2 — VG3',       level: 'vg3', subject: 'ml' },
  { title: 'Entreprenørskap 2 — VG3',                level: 'vg3', subject: 'ent' },
]

const app = readFileSync(APP, 'utf-8')
const feil = []

// ── Rute → komponentnavn ────────────────────────────────────────────────────
// [^\s/>]+ er Unicode-trygt: det stopper på mellomrom, «/» og «>», ikke på å.
const ruter = []
for (const m of app.matchAll(/path="\/learning\/presentations\/([^"]+)" element=\{<([^\s/>]+)/g)) {
  ruter.push({ slug: m[1], komponent: m[2] })
}

// ── Komponentnavn → filnavn, fra import-setningene ──────────────────────────
const importer = new Map()
for (const m of app.matchAll(/import\s+(\S+)\s+from\s+'\.\/screens\/learninghub\/presentations\/([^']+)'/g)) {
  importer.set(m[1], m[2])
}

// ── Tittel fra presentasjonsfila ────────────────────────────────────────────
// presentationName settes enten som objektfelt (frittstående presentasjoner)
// eller som prop til PresentationShell.
const TITTEL_MONSTRE = [
  /presentationName: '((?:[^'\\]|\\.)*)'/,
  /presentationName="([^"]*)"/,
  /presentationName=\{'((?:[^'\\]|\\.)*)'\}/,
]

function lesTittel(slug, komponent) {
  const filnavn = importer.get(komponent)
  if (!filnavn) {
    feil.push(`${slug}: fant ingen import for komponenten <${komponent}>`)
    return null
  }
  const sti = resolve(PRES_DIR, `${filnavn}.tsx`)
  if (!existsSync(sti)) {
    feil.push(`${slug}: importen peker på ${filnavn}.tsx, som ikke finnes`)
    return null
  }
  const src = readFileSync(sti, 'utf-8')
  for (const p of TITTEL_MONSTRE) {
    const m = src.match(p)
    if (m) return m[1]
  }
  feil.push(`${slug}: fant ingen presentationName i ${filnavn}.tsx`)
  return null
}

function klassifiser(slug) {
  const forsteLedd = slug.split('/')[0]
  if (ML_ENT_KLASSIFISERING[forsteLedd]) {
    const [level, subject] = ML_ENT_KLASSIFISERING[forsteLedd]
    return { level, subject }
  }
  const ssr = SSR_KLASSIFISERING[slug]
  if (ssr) {
    const [level, ssrSubject] = ssr
    return { level, subject: 'ssr', ssrSubject }
  }
  feil.push(`${slug}: mangler klassifisering — legg den inn i SSR_KLASSIFISERING`)
  return null
}

const oppforinger = []
for (const { slug, komponent } of ruter) {
  const title = lesTittel(slug, komponent)
  const klasse = klassifiser(slug)
  if (title === null || klasse === null) continue
  oppforinger.push({ id: slug, title, route: RUTE_PREFIKS + slug, ...klasse })
}

if (feil.length > 0) {
  console.error(`\n❌ ${feil.length} rute(r) kunne ikke behandles:`)
  for (const f of feil) console.error(`  - ${f}`)
  console.error('\nRegisteret er IKKE skrevet. Ingen ruter droppes stille.')
  process.exit(1)
}

if (oppforinger.length !== ruter.length) {
  console.error(`❌ ${ruter.length} ruter inn, ${oppforinger.length} oppføringer ut.`)
  process.exit(1)
}

// ── Sortering: seksjonsrekkefølge, deretter tittel ──────────────────────────
function seksjonsIndeks(e) {
  return SEKSJONER.findIndex(s =>
    s.level === e.level && s.subject === e.subject && (s.ssrSubject ?? '') === (e.ssrSubject ?? ''))
}
const uklassifisert = oppforinger.filter(e => seksjonsIndeks(e) === -1)
if (uklassifisert.length > 0) {
  console.error('❌ Oppføringer uten matchende seksjon:', uklassifisert.map(e => e.id).join(', '))
  process.exit(1)
}
oppforinger.sort((a, b) =>
  seksjonsIndeks(a) - seksjonsIndeks(b) || a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'nb'))

// ── Skriv fila ──────────────────────────────────────────────────────────────
const j = v => JSON.stringify(v).replace(/"/g, "'")

const ut = `/**
 * Auto-generert fra rutene i src/App.tsx og presentasjonsfilene de peker på, av
 * scripts/build-presentation-registry.mjs.
 *
 * IKKE ENDRE MANUELT — kjør byggeskriptet på nytt hvis rutene endres.
 *
 * ${oppforinger.length} presentasjoner.
 */

export type PresentationLevel = 'vg1' | 'vg2' | 'vg3'
export type PresentationSubject = 'ssr' | 'ml' | 'ent'
export type PresentationSsrSubject =
  | 'forretningsdrift' | 'mfi' | 'kultur'   // VG1
  | 'okonomi' | 'kommunikasjon' | 'hms'     // VG2

export interface PresentationEntry {
  id: string
  title: string
  route: string
  level: PresentationLevel
  subject: PresentationSubject
  ssrSubject?: PresentationSsrSubject
}

export const ALL_PRESENTATIONS: PresentationEntry[] = [
${oppforinger.map(e =>
  `  { id: ${j(e.id)}, title: ${j(e.title)}, route: ${j(e.route)}, level: ${j(e.level)}, subject: ${j(e.subject)}` +
  (e.ssrSubject ? `, ssrSubject: ${j(e.ssrSubject)} }` : ' }')).join(',\n')},
]

export interface PresentationSection {
  title: string
  level: PresentationLevel
  subject: PresentationSubject
  ssrSubject?: PresentationSsrSubject
}

export const PRESENTATION_SECTIONS: PresentationSection[] = [
${SEKSJONER.map(s =>
  `  { title: ${j(s.title)},${' '.repeat(Math.max(1, 42 - s.title.length))}level: ${j(s.level)}, subject: ${j(s.subject)}` +
  (s.ssrSubject ? `, ssrSubject: ${j(s.ssrSubject)} }` : ' }')).join(',\n')},
]

/** Look up a presentation by id (slug). Returns null if unknown. */
export function findPresentation(id: string): PresentationEntry | null {
  return ALL_PRESENTATIONS.find(p => p.id === id) ?? null
}
`

writeFileSync(OUT, ut, 'utf-8')
console.log(`✓ ${ruter.length} ruter i App.tsx → ${oppforinger.length} oppføringer.`)
for (const s of SEKSJONER) {
  const n = oppforinger.filter(e =>
    e.level === s.level && e.subject === s.subject && (e.ssrSubject ?? '') === (s.ssrSubject ?? '')).length
  console.log(`  ${s.title.padEnd(38)} ${String(n).padStart(3)}`)
}
console.log(`✓ Skrev ${OUT}`)
