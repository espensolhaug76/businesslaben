#!/usr/bin/env node
/**
 * Parser .manus/quiz-konkurranser.md → src/data/standardCompetitions.ts
 *
 * Build-time-skript. Kjør én gang når kildemarkdown endres:
 *   node scripts/parse-standard-competitions.mjs
 *
 * Med --check genereres fila til MINNE og sammenlignes med disk. Ingenting
 * skrives; avvik gir kode 1. Henger på `prebuild` i package.json.
 *
 * Skriver et typet array av Competition-objekter med isStandard=true og
 * shareToLeaderboard=true. Hvert spørsmål har {question, options, correct,
 * difficulty, explanation?}. IDer er stabile (slug fra fagkode + variant).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const SRC = resolve(REPO_ROOT, '.manus/quiz-konkurranser.md')
const OUT = resolve(REPO_ROOT, 'src/data/standardCompetitions.ts')

/**
 * Tidsstempelet gjenbrukes fra fila som allerede finnes, slik at to kjøringer
 * på rad gir byte-identisk resultat. Bare førstegangsgenerering setter et nytt.
 * (Tidligere ble `new Date()` stemplet hver gang, som gjorde output
 * ikke-deterministisk og umulig å legge en synk-vakt på.)
 */
function lesEllerLagTidsstempel() {
  if (existsSync(OUT)) {
    const m = readFileSync(OUT, 'utf-8').match(/const NOW = '([^']+)'/)
    if (m) return m[1]
  }
  return new Date().toISOString()
}
const NOW = lesEllerLagTidsstempel()

/** --check: generer til minne og sammenlign med fila. Skriver aldri. */
const SJEKKEMODUS = process.argv.includes('--check')

// Map fagkode (markdown) → fag-ID (teacherSubjects)
const FAGKODE_MAP = {
  'SSR-FD':                'ssr_fd_vg1',
  'SSR-MI':                'ssr_mi_vg1',
  'SSR-KS':                'ssr_ks_vg1',
  'SSR-OA':                'ok_vg2',
  'SSR-KM':                'kom_vg2',
  'SSR-HMS':               'hms_vg2',
  'ML1':                   'ml1',
  'ML2':                   'ml2',
  'ENT1':                  'ent1',
  'ENT2':                  'ent2',
  'TVERRFAGLIG-VG1-SSR':   'tverrfaglig_vg1',
  'TVERRFAGLIG-VG2-SSR':   'tverrfaglig_vg2',
}

// Slug-prefix per fagkode (for stabile IDer)
const FAGKODE_SLUG = {
  'SSR-FD':                'ssr-fd',
  'SSR-MI':                'ssr-mi',
  'SSR-KS':                'ssr-ks',
  'SSR-OA':                'ssr-oa',
  'SSR-KM':                'ssr-km',
  'SSR-HMS':               'ssr-hms',
  'ML1':                   'ml1',
  'ML2':                   'ml2',
  'ENT1':                  'ent1',
  'ENT2':                  'ent2',
  'TVERRFAGLIG-VG1-SSR':   'tverr-vg1',
  'TVERRFAGLIG-VG2-SSR':   'tverr-vg2',
}

const md = readFileSync(SRC, 'utf-8')

// Splitt på quiz-headers
const sections = md.split(/^## \*\*Quiz /gm).slice(1)

const competitions = []
const warnings = []

for (const raw of sections) {
  // Header: "1: Forretningsdrift VG1 — Variant A**" eller "7: ... (NY Læreplan 2026\)**"
  // — også tillat valgfri suffiks i parantes som (SSR-KM) eller (NY Læreplan 2026\)
  const headerMatch = raw.match(/^(\d+):\s+(.+?)\s+—\s+Variant\s+(A|B)(?:\s*\([^)]*\))?\*\*/)
  if (!headerMatch) {
    warnings.push(`Kunne ikke parse quiz-header: ${raw.slice(0, 80)}…`)
    continue
  }
  const quizNum = parseInt(headerMatch[1], 10)
  const title = headerMatch[2].trim()
  const variant = headerMatch[3]

  // Fagkode-linje
  const fagMatch = raw.match(/\*\*Fagkode:\*\*\s+([A-Z0-9-]+)/)
  if (!fagMatch) {
    warnings.push(`Quiz ${quizNum}: mangler Fagkode-linje`)
    continue
  }
  const fagkode = fagMatch[1]
  const subjectId = FAGKODE_MAP[fagkode]
  const slugPrefix = FAGKODE_SLUG[fagkode]
  if (!subjectId || !slugPrefix) {
    warnings.push(`Quiz ${quizNum}: ukjent fagkode «${fagkode}»`)
    continue
  }

  // Splitt på spørsmål-headers
  const qParts = raw.split(/^### \*\*Spørsmål /gm).slice(1)
  const questions = []
  for (const qp of qParts) {
    const qHead = qp.match(/^(\d+)\s+\((Lett|Middels|Vanskelig)\)\*\*/)
    if (!qHead) {
      warnings.push(`Quiz ${quizNum} ${variant}: kunne ikke parse spørsmålshode`)
      continue
    }
    const qNum = parseInt(qHead[1], 10)
    const difficulty = qHead[2].toLowerCase()

    // Spørsmålstekst — fanger fram til neste blanke linje eller alternativ
    const qTextMatch = qp.match(/\*\*Spørsmål:\*\*\s+(.+?)(?=\n\s*\n)/s)
    if (!qTextMatch) {
      warnings.push(`Quiz ${quizNum} ${variant} sp${qNum}: mangler spørsmålstekst`)
      continue
    }
    const questionText = qTextMatch[1].replace(/\s+/g, ' ').trim()

    // Alternativer — `* A: ...`, `* B: ...`, osv.
    const optMatches = [...qp.matchAll(/^\* ([A-D]):\s*(.+?)$/gm)]
    if (optMatches.length !== 4) {
      warnings.push(`Quiz ${quizNum} ${variant} sp${qNum}: ${optMatches.length} alternativer (trenger 4)`)
      continue
    }

    let correct = -1
    let explanation
    const options = optMatches.map((m, i) => {
      let txt = m[2].trim()
      // Fjern trailing trippel-mellomrom (markdown-line-break)
      txt = txt.replace(/\s{2,}$/, '').trim()
      // Sjekk for ✅
      if (txt.includes('✅')) {
        correct = i
        txt = txt.replace(/\s*✅\s*/g, ' ').trim()
      }
      // Sjekk for inline **Forklaring:** (typisk på siste alternativ)
      const explIdx = txt.indexOf('**Forklaring:**')
      if (explIdx >= 0) {
        explanation = txt.slice(explIdx + '**Forklaring:**'.length).trim()
        txt = txt.slice(0, explIdx).trim()
      }
      return txt
    })

    if (correct < 0) {
      warnings.push(`Quiz ${quizNum} ${variant} sp${qNum}: fant ikke ✅-merket alternativ`)
      continue
    }

    // Standalone **Forklaring:**-linje (hvis ikke allerede inline)
    if (!explanation) {
      const standalone = qp.match(/^\*\*Forklaring:\*\*\s+(.+?)$/m)
      if (standalone) explanation = standalone[1].trim()
    }

    questions.push({
      qNum,
      question: questionText,
      options,
      correct,
      difficulty,
      explanation,
    })
  }

  if (questions.length !== 15) {
    warnings.push(`Quiz ${quizNum} ${variant}: ${questions.length} spørsmål (trenger 15)`)
  }

  const id = `std-${slugPrefix}-${variant.toLowerCase()}`
  competitions.push({
    id,
    code: id,
    title: `${title} — Variant ${variant}`,
    subject: subjectId,
    fagkode,
    variant,
    questions,
  })
}

// Generer TypeScript-utfil
const totalQ = competitions.reduce((s, c) => s + c.questions.length, 0)

const out = `/**
 * Auto-generert fra .manus/quiz-konkurranser.md av
 * scripts/parse-standard-competitions.mjs.
 *
 * IKKE ENDRE MANUELT — kjør parser-skriptet på nytt for å regenerere.
 *
 * ${competitions.length} standardkonkurranser, ${totalQ} spørsmål totalt.
 */
import type { Competition } from '../types/Competition'

const NOW = '${NOW}'

export const STANDARD_COMPETITIONS: Competition[] = [
${competitions.map(c => `  {
    id: ${JSON.stringify(c.id)},
    code: ${JSON.stringify(c.code)},
    title: ${JSON.stringify(c.title)},
    subject: ${JSON.stringify(c.subject)},
    questions: [
${c.questions.map((q, i) => `      {
        id: ${JSON.stringify(`${c.id}-q${q.qNum}`)},
        question: ${JSON.stringify(q.question)},
        options: ${JSON.stringify(q.options)},
        correct: ${q.correct},
        timeSeconds: 20,
        difficulty: ${JSON.stringify(q.difficulty)},${q.explanation ? `\n        explanation: ${JSON.stringify(q.explanation)},` : ''}
      }${i < c.questions.length - 1 ? ',' : ''}`).join('\n')}
    ],
    status: 'waiting',
    currentQuestionIndex: 0,
    createdAt: NOW,
    canRepeat: true,
    shareToLeaderboard: true,
    isStandard: true,
  }${/* trailing comma is fine */ ''}`).join(',\n')},
]

/** Slå opp en standardkonkurranse på ID. Returnerer null hvis ikke funnet. */
export function findStandardCompetition(id: string): Competition | null {
  return STANDARD_COMPETITIONS.find(c => c.id === id) ?? null
}
`

// ── Verifisering før skriving ───────────────────────────────────────────────
if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} advarsler:`)
  for (const w of warnings) console.log(`  - ${w}`)
}

const broken = competitions.filter(c => c.questions.length !== 15)
if (broken.length > 0) {
  console.error(`\n❌ ${broken.length} quiz(er) har ikke 15 spørsmål:`)
  for (const c of broken) console.error(`  - ${c.id}: ${c.questions.length} spørsmål`)
  process.exit(1)
}

// ── Sjekk eller skriv ───────────────────────────────────────────────────────
if (SJEKKEMODUS) {
  const paaDisk = existsSync(OUT) ? readFileSync(OUT, 'utf-8') : null
  if (paaDisk === out) {
    console.log(`✓ standardCompetitions.ts er i synk med ${competitions.length} quizer i quiz-konkurranser.md.`)
    process.exit(0)
  }
  console.error('')
  console.error('standardCompetitions.ts er ikke i synk med .manus/quiz-konkurranser.md.')
  console.error('Kjør: node scripts/parse-standard-competitions.mjs')
  console.error('')
  if (paaDisk === null) {
    console.error(`  (${OUT} finnes ikke.)`)
  } else {
    const genererte = new Set(competitions.map(c => c.id))
    const paaDiskIder = new Set([...paaDisk.matchAll(/^    id: "([^"]+)",$/gm)].map(m => m[1]))
    const mangler = [...genererte].filter(id => !paaDiskIder.has(id))
    const overflodige = [...paaDiskIder].filter(id => !genererte.has(id))
    if (mangler.length > 0) console.error(`  Mangler i fila (${mangler.length}): ${mangler.join(', ')}`)
    if (overflodige.length > 0) console.error(`  Ligger i fila uten kilde (${overflodige.length}): ${overflodige.join(', ')}`)
    if (mangler.length === 0 && overflodige.length === 0) {
      console.error('  Samme quizer, men innholdet avviker (spørsmål, alternativer eller rekkefølge).')
    }
  }
  console.error('')
  process.exit(1)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, out, 'utf-8')

console.log(`✓ Parset ${competitions.length} konkurranser, ${totalQ} spørsmål totalt.`)
console.log(`✓ Skrev ${OUT}`)
