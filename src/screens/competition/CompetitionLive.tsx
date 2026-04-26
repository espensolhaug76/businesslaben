import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  competitionsKey,
} from '../../types/Competition'
import type {
  Competition,
  CompetitionRun,
  PlayerEntry,
} from '../../types/Competition'
import {
  getCompetitionDefinition,
  saveCompetition,
  startNewRun as fbStartNewRun,
  updateCurrentRun,
  subscribeToCurrentRun,
  subscribeToEntries,
  markRunFinished,
} from '../../lib/firebaseCompetitions'

// ── Colors for the 4 answer options ───────────────────────────────────────────
const OPTION_STYLES = [
  { bg: '#0d9488', label: 'A' },
  { bg: '#ea580c', label: 'B' },
  { bg: '#7c3aed', label: 'C' },
  { bg: '#2563eb', label: 'D' },
]

function genRunId(): string {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * Hent definisjonen — først fra Firebase, fall tilbake til localStorage for
 * konkurranser opprettet før Firebase-flyttingen. Hvis funnet i localStorage
 * (men ikke Firebase), migrer den ved første opening.
 */
async function loadDefinitionWithMigration(code: string): Promise<Competition | null> {
  const fromFb = await getCompetitionDefinition(code)
  if (fromFb) return fromFb
  try {
    const raw = localStorage.getItem(competitionsKey())
    if (!raw) return null
    const list = JSON.parse(raw) as Competition[]
    const found = list.find(c => c.code === code) ?? null
    if (found) {
      // Auto-migrer
      await saveCompetition(found).catch(() => { /* ignore */ })
    }
    return found
  } catch { return null }
}

// ── Countdown circle ───────────────────────────────────────────────────────────
function CountdownCircle({ timeLeft, total }: { timeLeft: number; total: number }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const progress = timeLeft / total
  const dashOffset = circumference * (1 - progress)
  const color = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#0d9488'

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="absolute inset-0" width="112" height="112" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle
          cx="56" cy="56" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 56 56)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <span className="text-4xl font-extrabold text-white">{timeLeft}</span>
    </div>
  )
}

// ── Answer bar chart ───────────────────────────────────────────────────────────
function AnswerBars({
  options,
  correct,
  entries,
  questionIdx,
}: {
  options: string[]
  correct: number
  entries: PlayerEntry[]
  questionIdx: number
}) {
  const counts = options.map((_, i) =>
    entries.filter(e => e.answers[questionIdx]?.answer === i).length,
  )
  const total = entries.filter(e => e.answers[questionIdx] !== undefined).length
  const maxCount = Math.max(...counts, 1)

  return (
    <div className="space-y-3 w-full max-w-lg mx-auto">
      {options.map((opt, i) => {
        const isCorrect = i === correct
        const count = counts[i]
        const barPct = Math.round((count / maxCount) * 100)
        const style = OPTION_STYLES[i]
        return (
          <div key={i}>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-white text-sm shrink-0"
                style={{ background: isCorrect ? '#10b981' : style.bg }}>
                {style.label}
              </span>
              <span className={`flex-1 text-sm font-medium ${isCorrect ? 'text-emerald-300' : 'text-white'}`}>
                {opt} {isCorrect && '✓'}
              </span>
              <span className="text-white font-bold w-8 text-right">{count}</span>
            </div>
            <div className="ml-11 h-6 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${barPct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-lg"
                style={{ background: isCorrect ? '#10b981' : style.bg }}
              />
            </div>
          </div>
        )
      })}
      <p className="text-center text-sm text-slate-400 pt-2">{total} svar totalt</p>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function CompetitionLive() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()

  const [competition, setCompetition] = useState<Competition | null>(null)
  const [run, setRun] = useState<CompetitionRun | null>(null)
  const [entries, setEntries] = useState<PlayerEntry[]>([])
  const [timeLeft, setTimeLeft] = useState(0)

  // Load competition definition (Firebase first, localStorage fallback)
  useEffect(() => {
    if (!code) return
    let cancelled = false
    loadDefinitionWithMigration(code).then(c => {
      if (!cancelled) setCompetition(c)
    })
    return () => { cancelled = true }
  }, [code])

  // Subscribe to currentRun
  useEffect(() => {
    if (!code) return
    return subscribeToCurrentRun(code, setRun)
  }, [code])

  // Subscribe to entries når et runId finnes
  useEffect(() => {
    if (!code || !run?.runId) { setEntries([]); return }
    return subscribeToEntries(code, run.runId, setEntries)
  }, [code, run?.runId])

  // Countdown timer
  useEffect(() => {
    if (!run || run.status !== 'question_active' || !run.questionStartedAt) return
    const update = () => {
      const elapsed = Math.floor((Date.now() - new Date(run.questionStartedAt!).getTime()) / 1000)
      const remaining = Math.max(0, run.timeSeconds - elapsed)
      setTimeLeft(remaining)
    }
    update()
    const interval = setInterval(update, 500)
    return () => clearInterval(interval)
  }, [run])

  const startNewRound = useCallback(async () => {
    if (!competition || !code) return
    const runId = genRunId()
    const ts = competition.questions[0]?.timeSeconds ?? 20
    await fbStartNewRun(code, competition.id, runId, ts)
    setEntries([])
  }, [competition, code])

  // Auto-start a new run hvis ingen pågår når komponenten åpnes
  useEffect(() => {
    if (!competition || !code || !run) {
      // run kan være null fordi vi ikke har subscription-data ennå —
      // vi venter en kort stund før vi auto-starter for å unngå race
      return
    }
    if (run.status === 'finished' && competition.canRepeat === false) return
    // Hvis det ikke finnes et run, eller det forrige er ferdig og kan gjentas,
    // ikke auto-start — la læreren manuelt starte ny runde
  }, [competition, code, run])

  // Auto-start hvis ingen run finnes etter at vi har lest fra Firebase
  useEffect(() => {
    if (!competition || !code) return
    let cancelled = false
    // gi subscriptionen en frame til å levere innhold
    const t = setTimeout(() => {
      if (cancelled) return
      if (!run) {
        startNewRound()
      }
    }, 800)
    return () => { cancelled = true; clearTimeout(t) }
  }, [competition, code, run, startNewRound])

  async function startQuestion() {
    if (!run || !competition || !code) return
    const q = competition.questions[run.currentQuestionIndex]
    await updateCurrentRun(code, {
      status: 'question_active',
      questionStartedAt: new Date().toISOString(),
      timeSeconds: q.timeSeconds,
    })
    setTimeLeft(q.timeSeconds)
  }

  async function showResults() {
    if (!run || !code) return
    await updateCurrentRun(code, { status: 'showing_results' })
  }

  async function nextQuestion() {
    if (!run || !competition || !code) return
    const nextIdx = run.currentQuestionIndex + 1
    if (nextIdx >= competition.questions.length) {
      await updateCurrentRun(code, { status: 'finished', currentQuestionIndex: nextIdx })
      await markRunFinished(code, run.runId)
    } else {
      const nextQ = competition.questions[nextIdx]
      await updateCurrentRun(code, {
        status: 'question_active',
        currentQuestionIndex: nextIdx,
        questionStartedAt: new Date().toISOString(),
        timeSeconds: nextQ.timeSeconds,
      })
      setTimeLeft(nextQ.timeSeconds)
    }
  }

  // Count how many answered the current question
  const answeredCount = run
    ? entries.filter(e => e.answers[run.currentQuestionIndex] !== undefined).length
    : 0

  if (!competition) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-slate-400">Konkurranse ikke funnet for kode: {code}</p>
      </div>
    )
  }

  if (!run) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-slate-400">Laster...</p>
      </div>
    )
  }

  const currentQ = competition.questions[run.currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div>
          <h1 className="font-bold text-lg">{competition.title}</h1>
          <p className="text-xs text-slate-400">Kode: <span className="font-mono font-bold text-teal-400 text-base tracking-wider">{code}</span></p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{entries.length} elever</span>
          <button
            onClick={() => navigate(`/competition/leaderboard/${code}`)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Ledertavle
          </button>
          <button
            onClick={() => navigate('/teacher')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Avslutt
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">

          {/* WAITING */}
          {run.status === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="text-7xl">🎯</div>
              <h2 className="text-3xl font-bold">Venter på elever...</h2>
              <div className="rounded-2xl p-6 bg-slate-900 border border-slate-700 min-w-[280px]">
                <p className="text-slate-400 text-sm mb-2">Kode</p>
                <p className="text-6xl font-extrabold tracking-widest text-teal-400">{code}</p>
              </div>
              <p className="text-slate-400 text-lg">{entries.length} elever har koblet til</p>
              <button
                onClick={startQuestion}
                disabled={entries.length === 0}
                className="px-8 py-4 rounded-2xl text-xl font-bold text-white disabled:opacity-40 transition-opacity"
                style={{ background: '#0d9488' }}
              >
                Start konkurransen →
              </button>
            </motion.div>
          )}

          {/* QUESTION ACTIVE */}
          {run.status === 'question_active' && currentQ && (
            <motion.div
              key={`q-${run.currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-400">
                  Spørsmål {run.currentQuestionIndex + 1} / {competition.questions.length}
                </span>
                <span className="text-sm text-slate-400">
                  {answeredCount} av {entries.length} har svart
                </span>
              </div>

              {/* Question + timer */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold leading-tight">{currentQ.question}</h2>
                </div>
                <CountdownCircle timeLeft={timeLeft} total={currentQ.timeSeconds} />
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {currentQ.options.map((opt, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 flex items-center gap-3"
                    style={{ background: OPTION_STYLES[i].bg }}
                  >
                    <span className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center font-extrabold text-lg shrink-0">
                      {OPTION_STYLES[i].label}
                    </span>
                    <span className="font-semibold text-sm leading-snug">{opt}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={showResults}
                  className="px-6 py-3 rounded-xl text-sm font-medium bg-slate-700 text-white hover:bg-slate-600 transition-colors border border-slate-600"
                >
                  Vis svar
                </button>
              </div>
            </motion.div>
          )}

          {/* SHOWING RESULTS */}
          {run.status === 'showing_results' && currentQ && (
            <motion.div
              key={`r-${run.currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-400">
                  Spørsmål {run.currentQuestionIndex + 1} / {competition.questions.length}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">{currentQ.question}</h2>

              <AnswerBars
                options={currentQ.options}
                correct={currentQ.correct}
                entries={entries}
                questionIdx={run.currentQuestionIndex}
              />

              <div className="mt-8 text-center">
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3.5 rounded-2xl text-lg font-bold text-white"
                  style={{ background: '#0d9488' }}
                >
                  {run.currentQuestionIndex + 1 < competition.questions.length
                    ? `Neste spørsmål →`
                    : 'Vis sluttresultat →'}
                </button>
              </div>
            </motion.div>
          )}

          {/* FINISHED */}
          {run.status === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 w-full max-w-lg"
            >
              <div className="text-6xl">🏆</div>
              <h2 className="text-3xl font-bold">Konkurransen er ferdig!</h2>

              {/* Top 3 */}
              {[...entries]
                .sort((a, b) => b.totalPoints - a.totalPoints)
                .slice(0, 3)
                .map((entry, i) => (
                  <div key={`${entry.studentName}-${entry.className}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800 border border-slate-700">
                    <span className="text-3xl">{['🥇', '🥈', '🥉'][i]}</span>
                    <div className="flex-1 text-left">
                      <p className="font-bold">{entry.studentName}</p>
                      <p className="text-xs text-slate-400">{entry.className}</p>
                    </div>
                    <span className="text-xl font-extrabold text-teal-400">{entry.totalPoints}</span>
                  </div>
                ))}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate(`/competition/leaderboard/${code}`)}
                  className="px-6 py-3 rounded-xl font-medium text-white"
                  style={{ background: '#0d9488' }}
                >
                  Full ledertavle
                </button>
                <button
                  onClick={() => { startNewRound() }}
                  className="px-6 py-3 rounded-xl font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Start ny runde
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
