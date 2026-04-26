#!/usr/bin/env node
/**
 * Parser .manus/quiz-konkurranser.md → src/data/standardCompetitions.ts
 *
 * Build-time-skript. Kjør én gang når kildemarkdown endres:
 *   node scripts/parse-standard-competitions.mjs
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

const NOW = '${new Date().toISOString()}'

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

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, out, 'utf-8')

console.log(`✓ Parset ${competitions.length} konkurranser, ${totalQ} spørsmål totalt.`)
console.log(`✓ Skrev ${OUT}`)
if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} advarsler:`)
  for (const w of warnings) console.log(`  - ${w}`)
  process.exit(warnings.length > 0 && competitions.some(c => c.questions.length !== 15) ? 1 : 0)
}

// Ekstra verifisering: rapporter quizer med ≠15 spørsmål
const broken = competitions.filter(c => c.questions.length !== 15)
if (broken.length > 0) {
  console.log(`\n❌ ${broken.length} quiz(er) har ikke 15 spørsmål:`)
  for (const c of broken) console.log(`  - ${c.id}: ${c.questions.length} spørsmål`)
  process.exit(1)
}
