#!/usr/bin/env node
/**
 * Vokter live-synk-mønsteret i presentasjonene.
 *
 *   node scripts/check-presentation-sync.mjs
 *
 * Henger på `prebuild` i package.json, etter de tre generator-sjekkene.
 *
 * Bakgrunn: live-synken lå duplisert i 56 frittstående presentasjonsfiler.
 * Da mønsteret ble fikset i _lib/PresentationShell.tsx, ble de 56 stående med
 * den gamle, ødelagte kopien — læreren blad videre mens eleven hang igjen.
 * Denne vakta hindrer at en fil sklir tilbake, eller at en ny presentasjon
 * blir skrevet etter det gamle mønsteret.
 *
 * Den ser etter to konkrete feil i filer som bruker useLiveSync:
 *
 *   1. En `useEffect` med `[current, teacherLiveCode]` som skriver til Firebase.
 *      Skrivingen skal skje UBETINGET i selve navigasjonshandlingen, ikke i en
 *      effekt som kan gates av innkommende data.
 *   2. En modulvariabel `_lastWritten`. Den overlever remount og kan droppe
 *      første skriving i en ny presentasjon; den skal være en `useRef`.
 *
 * I tillegg kreves de tre byggesteinene i det riktige mønsteret, slik at en fil
 * ikke kan bestå ved bare å fjerne det gamle.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const PRES_DIR = resolve(REPO_ROOT, 'src/screens/learninghub/presentations')
const SHELL = resolve(PRES_DIR, '_lib/PresentationShell.tsx')

/**
 * Fjerner kommentarer før granskingen. Reglene skal treffe KODE — en kommentar
 * som forklarer hva som ble fjernet, skal ikke slå ut som en overtredelse.
 */
function utenKommentarer(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
}

/** Filer som skal granskes: alt som faktisk snakker med live-synken. */
function samleFiler() {
  const ut = []
  for (const navn of readdirSync(PRES_DIR)) {
    if (!navn.endsWith('.tsx')) continue
    const sti = resolve(PRES_DIR, navn)
    const src = readFileSync(sti, 'utf-8')
    if (!src.includes('useLiveSync')) continue
    ut.push({ navn, src: utenKommentarer(src) })
  }
  const shell = readFileSync(SHELL, 'utf-8')
  if (shell.includes('useLiveSync')) ut.push({ navn: '_lib/PresentationShell.tsx', src: utenKommentarer(shell) })
  return ut
}

const FORBUDT = [
  {
    id: 'skrive-effekt',
    // useEffect(...) { … fbUpdate/update(… sessions …) … }, [current, teacherLiveCode])
    treff: src => /useEffect\(\s*\(\)\s*=>\s*\{[\s\S]{0,600}?sessions[\s\S]{0,300}?\}\s*,\s*\[\s*current\s*,\s*teacherLiveCode\s*\]\s*\)/.test(src),
    forklaring: 'skriver til Firebase i en useEffect på [current, teacherLiveCode] — flytt skrivingen inn i navigasjonshandlingen (gaaTil)',
  },
  {
    id: 'modulvariabel',
    treff: src => /^let _lastWritten\b/m.test(src),
    forklaring: 'har modulvariabelen _lastWritten — den skal være en useRef, ellers overlever den remount',
  },
  {
    id: 'ekko-flagg',
    treff: src => /fromFirebaseRef/.test(src),
    forklaring: 'bruker det boolske fromFirebaseRef — ekko skal håndteres ved å sammenligne verdier, ikke med et flagg',
  },
]

const PAAKREVD = [
  {
    id: 'utledet-elevslide',
    treff: src => /const current = isStudentLive \? \(liveSlide \?\? 0\) : lokalSlide/.test(src),
    forklaring: 'mangler `const current = isStudentLive ? (liveSlide ?? 0) : lokalSlide` — eleven skal ikke ha egen slide-tilstand',
  },
  {
    id: 'skriv-ved-navigasjon',
    treff: src => /const gaaTil = useCallback/.test(src) && /skrivSlide\(n\)/.test(src),
    forklaring: 'mangler gaaTil() som setter lokal tilstand og kaller skrivSlide(n) i samme handling',
  },
  {
    id: 'adopter-en-gang',
    treff: src => /harAdoptert/.test(src) && /harNavigert/.test(src),
    forklaring: 'mangler engangs-adopsjon av remote (harAdoptert/harNavigert) for lærerens storskjerm',
  },
]

const filer = samleFiler()
const funn = []

for (const { navn, src } of filer) {
  const feil = []
  for (const regel of FORBUDT) if (regel.treff(src)) feil.push(regel.forklaring)
  for (const regel of PAAKREVD) if (!regel.treff(src)) feil.push(regel.forklaring)
  if (feil.length > 0) funn.push({ navn, feil })
}

if (funn.length > 0) {
  console.error('')
  console.error(`${funn.length} presentasjonsfil(er) følger ikke live-synk-mønsteret:`)
  console.error('')
  for (const { navn, feil } of funn) {
    console.error(`  ${navn}`)
    for (const f of feil) console.error(`      - ${f}`)
  }
  console.error('')
  console.error('Fasit: src/screens/learninghub/presentations/_lib/PresentationShell.tsx')
  console.error('')
  process.exit(1)
}

console.log(`✓ ${filer.length} presentasjonsfiler følger live-synk-mønsteret.`)
