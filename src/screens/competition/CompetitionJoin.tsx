import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  competitionRunKey,
  competitionEntriesKey,
  calcPoints,
} from '../../types/Competition'
import type {
  Competition,
  CompetitionRun,
  PlayerEntry,
  PlayerAnswer,
} from '../../types/Competition'
import { competitionsKey } from '../../types/Competition'

// ── Option colors (match teacher view) ────────────────────────────────────────
const OPTION_STYLES = [
  { bg: '#0d9488', label: 'A' },
  { bg: '#ea580c', label: 'B' },
  { bg: '#7c3aed', label: 'C' },
  { bg: '#2563eb', label: 'D' },
]

// ── Storage helpers ────────────────────────────────────────────────────────────
function loadCompetition(code: string): Competition | null {
  try {
    const raw = localStorage.getItem(competitionsKey())
    if (!raw) return null
    const list = JSON.parse(raw) as Competition[]
    return list.find(c => c.code === code) ?? null
  } catch { return null }
}

function loadRun(code: string): CompetitionRun | null {
  try {
    const raw = localStorage.getItem(competitionRunKey(code))
    return raw ? (JSON.parse(raw) as CompetitionRun) : null
  } catch { return null }
}

function loadEntries(runId: string): PlayerEntry[] {
  try {
    const raw = localStorage.getItem(competitionEntriesKey(runId))
    return raw ? (JSON.parse(raw) as PlayerEntry[]) : []
  } catch { return [] }
}

function saveEntries(runId: string, entries: PlayerEntry[]) {
  localStorage.setItem(competitionEntriesKey(runId), JSON.stringify(entries))
}

// ── Types ──────────────────────────────────────────────────────────────────────
type StudentPhase =
  | 'join'
  | 'waiting'
  | 'question'
  | 'answered'
  | 'results'
  | 'finished'

interface QuestionResult {
  correct: boolean
  pointsEarned: number
  correctOption: number
  myAnswer: number
}

// ── Countdown bar ──────────────────────────────────────────────────────────────
function CountdownBar({ timeLeft, total }: { timeLeft: number; total: number }) {
  const pct = (timeLeft / total) * 100
  const color = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#0d9488'
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: color, transition: 'width 1s linear' }}
      />
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function CompetitionJoin() {
  const { code } = useParams<{ code: string }>()

  const [competition, setCompetition] = useState<Competition | null>(null)
  const [run, setRun] = useState<CompetitionRun | null>(null)
  const [phase, setPhase] = useState<StudentPhase>('join')

  // Student identity
  const [studentName, setStudentName] = useState('')
  const [className, setClassName] = useState('')
  const [myEntry, setMyEntry] = useState<PlayerEntry | null>(null)

  // Question state
  const [timeLeft, setTimeLeft] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [questionResult, setQuestionResult] = useState<QuestionResult | null>(null)
  const lastQuestionIdx = useRef<number>(-1)
  const hasAnswered = useRef(false)

  // Load competition
  useEffect(() => {
    if (!code) return
    const c = loadCompetition(code)
    setCompetition(c)
  }, [code])

  // Restore session if returning
  useEffect(() => {
    if (!code) return
    const saved = sessionStorage.getItem(`adventure-student-session-${code}`)
    if (saved) {
      const { name, cls, runId } = JSON.parse(saved) as { name: string; cls: string; runId: string }
      setStudentName(name)
      setClassName(cls)
      const entries = loadEntries(runId)
      const entry = entries.find(e => e.studentName === name && e.runId === runId)
      if (entry) {
        setMyEntry(entry)
        setPhase('waiting')
      }
    }
  }, [code])

  // Poll run state
  useEffect(() => {
    if (!code || phase === 'join') return
    const interval = setInterval(() => {
      const updatedRun = loadRun(code)
      if (!updatedRun) return
      setRun(updatedRun)
    }, 800)
    return () => clearInterval(interval)
  }, [code, phase])

  // React to run state changes
  useEffect(() => {
    if (!run || !myEntry) return

    if (run.status === 'waiting') {
      setPhase('waiting')
    } else if (run.status === 'question_active') {
      // New question
      if (run.currentQuestionIndex !== lastQuestionIdx.current) {
        lastQuestionIdx.current = run.currentQuestionIndex
        hasAnswered.current = false
        setSelectedAnswer(null)
        setQuestionResult(null)
        setPhase('question')
      }
    } else if (run.status === 'showing_results') {
      if (phase === 'answered' || phase === 'question') {
        // Show result
        const competition2 = loadCompetition(run.code)
        if (competition2) {
          const q = competition2.questions[run.currentQuestionIndex]
          const entries = loadEntries(run.runId)
          const entry = entries.find(e => e.studentName === myEntry.studentName && e.runId === run.runId)
          const answer = entry?.answers.find(a => a.questionId === q.id)
          setQuestionResult({
            correct: answer?.answer === q.correct,
            pointsEarned: answer?.points ?? 0,
            correctOption: q.correct,
            myAnswer: answer?.answer ?? -1,
          })
          if (entry) setMyEntry(entry)
        }
        setPhase('results')
      }
    } else if (run.status === 'finished') {
      // Final score
      const entries = loadEntries(run.runId)
      const entry = entries.find(e => e.studentName === myEntry.studentName && e.runId === run.runId)
      if (entry) setMyEntry(entry)
      setPhase('finished')
    }
  }, [run, myEntry, phase])

  // Countdown timer for question phase
  useEffect(() => {
    if (!run || run.status !== 'question_active' || !run.questionStartedAt) return
    const update = () => {
      const elapsed = Math.floor((Date.now() - new Date(run.questionStartedAt!).getTime()) / 1000)
      const remaining = Math.max(0, run.timeSeconds - elapsed)
      setTimeLeft(remaining)
      if (remaining === 0 && !hasAnswered.current) {
        // Auto-submit no answer
        handleAnswer(-1)
      }
    }
    update()
    const interval = setInterval(update, 500)
    return () => clearInterval(interval)
  }, [run]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleJoin() {
    if (!studentName.trim() || !className.trim() || !code) return
    const currentRun = loadRun(code)
    if (!currentRun) {
      alert('Finner ikke konkurransen. Be læreren om å starte den på nytt.')
      return
    }
    const entries = loadEntries(currentRun.runId)
    const entry: PlayerEntry = {
      competitionId: currentRun.competitionId,
      runId: currentRun.runId,
      studentName: studentName.trim(),
      className: className.trim(),
      totalPoints: 0,
      answers: [],
    }
    const exists = entries.findIndex(e => e.studentName === entry.studentName && e.runId === entry.runId)
    if (exists >= 0) {
      entries[exists] = entry
    } else {
      entries.push(entry)
    }
    saveEntries(currentRun.runId, entries)
    setMyEntry(entry)
    setRun(currentRun)
    sessionStorage.setItem(`adventure-student-session-${code}`, JSON.stringify({
      name: entry.studentName,
      cls: entry.className,
      runId: currentRun.runId,
    }))
    lastQuestionIdx.current = -1
    hasAnswered.current = false
    setPhase('waiting')
  }

  function handleAnswer(answerIndex: number) {
    if (hasAnswered.current || !run || !competition || !myEntry) return
    hasAnswered.current = true
    setSelectedAnswer(answerIndex)

    const q = competition.questions[run.currentQuestionIndex]
    const timeUsed = run.questionStartedAt
      ? Math.min(q.timeSeconds, Math.floor((Date.now() - new Date(run.questionStartedAt).getTime()) / 1000))
      : q.timeSeconds
    const isCorrect = answerIndex === q.correct
    const points = calcPoints(isCorrect, timeUsed)

    const answer: PlayerAnswer = {
      questionId: q.id,
      answer: answerIndex,
      timeUsed,
      points,
    }

    // Update entry in localStorage
    const entries = loadEntries(run.runId)
    const idx = entries.findIndex(e => e.studentName === myEntry.studentName && e.runId === run.runId)
    if (idx >= 0) {
      entries[idx].answers.push(answer)
      entries[idx].totalPoints += points
      saveEntries(run.runId, entries)
      setMyEntry({ ...entries[idx] })
    }

    setPhase('answered')
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  if (!competition && code) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400 mb-2">Konkurranse ikke funnet</p>
          <p className="text-slate-500 text-sm">Kode: {code}</p>
          <p className="text-slate-500 text-xs mt-2">Be læreren om å opprette konkurransen før du kobler til.</p>
        </div>
      </div>
    )
  }

  const currentQ = run && competition ? competition.questions[run.currentQuestionIndex] : null

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Score bar at top (after joining) */}
      {myEntry && phase !== 'join' && (
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div>
            <p className="text-xs text-slate-400">Spillende som</p>
            <p className="font-bold text-sm">{myEntry.studentName} · {myEntry.className}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Poeng</p>
            <p className="text-xl font-extrabold text-teal-400">{myEntry.totalPoints}</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">

          {/* JOIN FORM */}
          {phase === 'join' && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-sm space-y-5"
            >
              <div className="text-center mb-2">
                <p className="text-4xl mb-3">🎯</p>
                <h1 className="text-2xl font-bold">{competition?.title ?? 'Konkurranse'}</h1>
                <p className="text-slate-400 text-sm mt-1">Kode: {code}</p>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Ditt navn</label>
                <input
                  autoFocus
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleJoin() }}
                  placeholder="Fornavn Etternavn"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Klasse</label>
                <input
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleJoin() }}
                  placeholder="F.eks. 1MKA"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                onClick={handleJoin}
                disabled={!studentName.trim() || !className.trim()}
                className="w-full py-3.5 rounded-xl font-bold text-white disabled:opacity-40 transition-opacity"
                style={{ background: '#0d9488' }}
              >
                Bli med!
              </button>
            </motion.div>
          )}

          {/* WAITING */}
          {phase === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full border-4 border-teal-400 border-t-transparent animate-spin mx-auto" />
              <h2 className="text-xl font-bold">Venter på at læreren starter...</h2>
              <p className="text-slate-400 text-sm">Hold deg klar – spørsmålene kommer snart!</p>
            </motion.div>
          )}

          {/* QUESTION */}
          {phase === 'question' && currentQ && (
            <motion.div
              key={`q-${run?.currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-lg space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">
                  {run && `${run.currentQuestionIndex + 1} / ${competition?.questions.length}`}
                </span>
                <span className="text-lg font-bold text-white">{timeLeft}</span>
              </div>
              <CountdownBar timeLeft={timeLeft} total={currentQ.timeSeconds} />
              <h2 className="text-xl font-bold text-center py-4 leading-snug">{currentQ.question}</h2>
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="rounded-2xl p-4 text-left flex items-center gap-3 transition-opacity active:scale-95"
                    style={{ background: OPTION_STYLES[i].bg }}
                  >
                    <span className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center font-extrabold text-lg shrink-0">
                      {OPTION_STYLES[i].label}
                    </span>
                    <span className="font-semibold text-sm leading-snug">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ANSWERED – waiting for results */}
          {phase === 'answered' && currentQ && (
            <motion.div
              key="answered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <div className="text-5xl">⏳</div>
              <h2 className="text-xl font-bold">Svaret er registrert!</h2>
              {selectedAnswer !== null && selectedAnswer >= 0 && (
                <div
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: OPTION_STYLES[selectedAnswer].bg }}
                >
                  <span className="font-extrabold text-xl">{OPTION_STYLES[selectedAnswer].label}</span>
                  <span className="font-semibold">{currentQ.options[selectedAnswer]}</span>
                </div>
              )}
              <p className="text-slate-400 text-sm">Venter på resultater...</p>
            </motion.div>
          )}

          {/* RESULTS */}
          {phase === 'results' && questionResult && currentQ && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-5 w-full max-w-sm"
            >
              <div className="text-6xl">{questionResult.correct ? '🎉' : '😬'}</div>
              <h2 className="text-2xl font-bold">
                {questionResult.correct ? 'Riktig!' : 'Feil svar'}
              </h2>

              {!questionResult.correct && (
                <div className="rounded-xl p-3 text-sm" style={{ background: OPTION_STYLES[questionResult.correctOption].bg }}>
                  Riktig svar: <strong>{currentQ.options[questionResult.correctOption]}</strong>
                </div>
              )}

              {questionResult.correct && (
                <div className="rounded-2xl p-5 space-y-1" style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)' }}>
                  <p className="text-3xl font-extrabold text-teal-400">+{questionResult.pointsEarned}</p>
                  <p className="text-xs text-slate-400">poeng</p>
                </div>
              )}

              <div className="rounded-xl p-3 bg-slate-800 border border-slate-700">
                <p className="text-xs text-slate-400">Totalt</p>
                <p className="text-2xl font-extrabold text-white">{myEntry?.totalPoints ?? 0} poeng</p>
              </div>

              <p className="text-slate-400 text-sm">Venter på neste spørsmål...</p>
            </motion.div>
          )}

          {/* FINISHED */}
          {phase === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-5 w-full max-w-sm"
            >
              <div className="text-6xl">🏁</div>
              <h2 className="text-2xl font-bold">Ferdig!</h2>
              <p className="text-slate-400">Konkurransen er over.</p>

              <div className="rounded-2xl p-6 space-y-1" style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)' }}>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Din totalscore</p>
                <p className="text-5xl font-extrabold text-teal-400">{myEntry?.totalPoints ?? 0}</p>
                <p className="text-xs text-slate-400">poeng av {competition ? competition.questions.length * 1000 : 0} mulige</p>
              </div>

              <p className="text-sm text-slate-400">Se ledertavlen på skjermen foran.</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
