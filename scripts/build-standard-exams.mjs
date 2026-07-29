#!/usr/bin/env node
/**
 * Bygger src/data/standardExams.ts fra src/data/standardCompetitions.ts.
 *
 * Build-time-skript. Kjør når standardkonkurransene endres:
 *   node scripts/build-standard-exams.mjs
 *
 * Med --check genereres fila til MINNE og sammenlignes med disk. Ingenting
 * skrives; avvik gir kode 1. Henger på `prebuild` i package.json.
 *
 * Ingen nytt innhold skrives her — spørsmålene er de samme som i
 * konkurransene. Én prøve per fag, satt sammen av fagets to varianter
 * (2 × 15 = 30 spørsmål), sortert lett → middels → vanskelig med intern
 * rekkefølge bevart innenfor hver vanskegrad.
 *
 * De to tverrfaglige gruppene (`tverrfaglig_vg1`, `tverrfaglig_vg2`) er
 * BEVISST utelatt: de er ikke reelle fag, bare grupperinger på tvers av
 * SSR-fagene (se kommentaren i src/lib/teacherSubjects.ts). De finnes
 * fortsatt som konkurranser.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const SRC = resolve(REPO_ROOT, 'src/data/standardCompetitions.ts')
const OUT = resolve(REPO_ROOT, 'src/data/standardExams.ts')

/** --check: generer til minne og sammenlign med fila. Skriver aldri. */
const SJEKKEMODUS = process.argv.includes('--check')

// Fag-ID → { tittel, slug }. Rekkefølgen her styrer rekkefølgen i fila.
// Tverrfaglig er ikke med — se filhodet.
const FAG = {
  ssr_fd_vg1: { tittel: 'Forretningsdrift VG1',                slug: 'ssr-fd' },
  ssr_mi_vg1: { tittel: 'Markedsføring og innovasjon VG1',     slug: 'ssr-mi' },
  ssr_ks_vg1: { tittel: 'Kultur og samhandling VG1',           slug: 'ssr-ks' },
  ok_vg2:     { tittel: 'Økonomi og administrasjon VG2',       slug: 'ok-vg2' },
  kom_vg2:    { tittel: 'Kommunikasjon og markedsføring VG2',  slug: 'kom-vg2' },
  hms_vg2:    { tittel: 'HMS VG2',                             slug: 'hms-vg2' },
  ml1:        { tittel: 'Markedsføring og ledelse 1',          slug: 'ml1' },
  ml2:        { tittel: 'Markedsføring og ledelse 2',          slug: 'ml2' },
  ent1:       { tittel: 'Entreprenørskap 1',                   slug: 'ent1' },
  ent2:       { tittel: 'Entreprenørskap 2',                   slug: 'ent2' },
}

const VANSKEGRAD_REKKEFOLGE = ['lett', 'middels', 'vanskelig']

const VARIGHET_MINUTTER = 45
const POENG_RIKTIG = 1
const POENG_GALT = -0.5

// ── Les konkurransene ────────────────────────────────────────────────────────
// standardCompetitions.ts er autogenerert med fast, forutsigbar formatering,
// så den leses som tekst i stedet for å dra inn en TS-loader i byggsteget.
const kilde = readFileSync(SRC, 'utf-8')

const NOW = (kilde.match(/const NOW = '([^']+)'/) ?? [])[1]
if (!NOW) {
  console.error('❌ Fant ikke NOW-tidsstempelet i standardCompetitions.ts')
  process.exit(1)
}

/** Plukk ut hver konkurranse som en tekstblokk. */
const blokker = kilde.split(/\n  \{\n    id: "/).slice(1)

const konkurranser = []
for (const blokk of blokker) {
  const id = blokk.slice(0, blokk.indexOf('"'))
  const subject = (blokk.match(/subject: "([^"]+)"/) ?? [])[1]
  const title = (blokk.match(/title: "((?:[^"\\]|\\.)*)"/) ?? [])[1]

  const sporsmal = []
  const qRe = /\{\s*id: ("(?:[^"\\]|\\.)*"),\s*question: ("(?:[^"\\]|\\.)*"),\s*options: (\[[^\]]*\]),\s*correct: (\d+),\s*timeSeconds: \d+,\s*difficulty: ("(?:[^"\\]|\\.)*"),(?:\s*explanation: ("(?:[^"\\]|\\.)*"),)?/g
  let m
  while ((m = qRe.exec(blokk)) !== null) {
    sporsmal.push({
      id: JSON.parse(m[1]),
      question: JSON.parse(m[2]),
      options: JSON.parse(m[3]),
      correct: Number(m[4]),
      difficulty: JSON.parse(m[5]),
      explanation: m[6] ? JSON.parse(m[6]) : undefined,
    })
  }
  konkurranser.push({ id, subject, title, sporsmal })
}

// ── Grupper på fag og slå variantene sammen ──────────────────────────────────
const advarsler = []
const proever = []

for (const [fagId, meta] of Object.entries(FAG)) {
  const varianter = konkurranser.filter(k => k.subject === fagId)
  if (varianter.length === 0) {
    advarsler.push(`Faget ${fagId} har ingen konkurranser — hoppet over.`)
    continue
  }

  const alle = varianter.flatMap(v => v.sporsmal)

  // Stabil sortering lett → middels → vanskelig. Array.prototype.sort er
  // stabil i Node, så intern rekkefølge innenfor hver gruppe beholdes.
  const sortert = [...alle].sort(
    (a, b) => VANSKEGRAD_REKKEFOLGE.indexOf(a.difficulty) - VANSKEGRAD_REKKEFOLGE.indexOf(b.difficulty),
  )

  const ukjent = sortert.filter(q => !VANSKEGRAD_REKKEFOLGE.includes(q.difficulty))
  if (ukjent.length > 0) {
    advarsler.push(`${fagId}: ${ukjent.length} spørsmål har ukjent difficulty (${[...new Set(ukjent.map(q => q.difficulty))].join(', ')}).`)
  }

  proever.push({
    id: `std-exam-${meta.slug}`,
    code: `std-exam-${meta.slug}`,
    title: meta.tittel,
    subject: fagId,
    varianter: varianter.map(v => v.id),
    questions: sortert,
  })
}

const totalt = proever.reduce((n, p) => n + p.questions.length, 0)

// ── Skriv fila ───────────────────────────────────────────────────────────────
const out = `/**
 * Auto-generert fra src/data/standardCompetitions.ts av
 * scripts/build-standard-exams.mjs.
 *
 * IKKE ENDRE MANUELT — kjør byggeskriptet på nytt for å regenerere.
 *
 * ${proever.length} standardprøver, ${totalt} spørsmål totalt. Én prøve per fag, satt sammen av
 * fagets to konkurransevarianter og sortert lett → middels → vanskelig.
 * Tverrfaglig VG1/VG2 er utelatt — de er grupperinger, ikke reelle fag.
 */
import type { StandardExam } from '../types/Exam'

const NOW = '${NOW}'

export const STANDARD_EXAMS: StandardExam[] = [
${proever.map(p => `  {
    id: ${JSON.stringify(p.id)},
    code: ${JSON.stringify(p.code)},
    title: ${JSON.stringify(p.title)},
    subject: ${JSON.stringify(p.subject)},
    timeMinutes: ${VARIGHET_MINUTTER},
    scoringRules: { correctPoints: ${POENG_RIKTIG}, wrongPenalty: ${POENG_GALT}, unansweredPoints: 0 },
    createdAt: NOW,
    questions: [
${p.questions.map((q, i) => `      {
        id: ${JSON.stringify(q.id)},
        type: 'multiple_choice',
        question: ${JSON.stringify(q.question)},
        options: ${JSON.stringify(q.options)},
        correct: ${q.correct},
        difficulty: ${JSON.stringify(q.difficulty)},${q.explanation ? `\n        explanation: ${JSON.stringify(q.explanation)},` : ''}
      }${i < p.questions.length - 1 ? ',' : ''}`).join('\n')}
    ],
  }`).join(',\n')},
]

/** Slå opp en standardprøve på ID. Returnerer null hvis ikke funnet. */
export function findStandardExam(id: string): StandardExam | null {
  return STANDARD_EXAMS.find(e => e.id === id) ?? null
}
`

// ── Verifisering før skriving ───────────────────────────────────────────────
if (advarsler.length > 0) {
  console.log(`\n⚠️  ${advarsler.length} advarsler:`)
  for (const a of advarsler) console.log(`  - ${a}`)
}

const feil = proever.filter(p => p.questions.length !== 30)
if (feil.length > 0) {
  console.error(`\n❌ ${feil.length} prøve(r) har ikke 30 spørsmål:`)
  for (const p of feil) console.error(`  - ${p.id}: ${p.questions.length}`)
  process.exit(1)
}
if (proever.length !== Object.keys(FAG).length) {
  console.error(`\n❌ Forventet ${Object.keys(FAG).length} prøver, fikk ${proever.length}.`)
  process.exit(1)
}

// ── Sjekk eller skriv ───────────────────────────────────────────────────────
if (SJEKKEMODUS) {
  const paaDisk = existsSync(OUT) ? readFileSync(OUT, 'utf-8') : null
  if (paaDisk === out) {
    console.log(`✓ standardExams.ts er i synk med ${proever.length} fag i standardCompetitions.ts.`)
    process.exit(0)
  }
  console.error('')
  console.error('standardExams.ts er ikke i synk med standardCompetitions.ts.')
  console.error('Kjør: node scripts/build-standard-exams.mjs')
  console.error('')
  if (paaDisk === null) {
    console.error(`  (${OUT} finnes ikke.)`)
  } else {
    const genererte = new Set(proever.map(p => p.id))
    const paaDiskIder = new Set([...paaDisk.matchAll(/^    id: "(std-exam-[^"]+)",$/gm)].map(m => m[1]))
    const mangler = [...genererte].filter(id => !paaDiskIder.has(id))
    const overflodige = [...paaDiskIder].filter(id => !genererte.has(id))
    if (mangler.length > 0) console.error(`  Mangler i fila (${mangler.length}): ${mangler.join(', ')}`)
    if (overflodige.length > 0) console.error(`  Ligger i fila uten kilde (${overflodige.length}): ${overflodige.join(', ')}`)
    if (mangler.length === 0 && overflodige.length === 0) {
      console.error('  Samme prøver, men innholdet avviker (spørsmål, poeng, tid eller rekkefølge).')
    }
  }
  console.error('')
  process.exit(1)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, out, 'utf-8')

console.log(`✓ Bygde ${proever.length} standardprøver, ${totalt} spørsmål totalt.`)
for (const p of proever) {
  const fordeling = VANSKEGRAD_REKKEFOLGE
    .map(d => `${d}=${p.questions.filter(q => q.difficulty === d).length}`)
    .join(' ')
  console.log(`  ${p.id.padEnd(20)} ${String(p.questions.length).padStart(3)} spm  (${fordeling})  ← ${p.varianter.join(' + ')}`)
}
console.log(`✓ Skrev ${OUT}`)
