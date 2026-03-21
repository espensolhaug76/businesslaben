import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import type { Exam, ExamSubmission, SuspiciousEvent } from '../../types/Exam'
import { submissionsKey, startTrackingKey } from '../../types/Exam'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function loadExamByCode(examCode: string): Exam | null {
  try {
    const exams: Exam[] = JSON.parse(localStorage.getItem('adventure-exams') ?? '[]')
    return exams.find(e => e.examCode === examCode) ?? null
  } catch {
    return null
  }
}

// ── Name entry screen ─────────────────────────────────────────────────────────

function NameEntry({ exam, onStart }: { exam: Exam; onStart: (name: string) => void }) {
  const [name, setName] = useState('')
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{exam.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>⏱ {exam.timeMinutes} minutter</span>
            <span>📋 {exam.questions.length} spørsmål</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Regler</h3>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li>• Flervalg: riktig svar gir +{exam.scoringRules.correctPoints} poeng, feil svar gir {exam.scoringRules.wrongPenalty} poeng</li>
            <li>• Ubesvart gir {exam.scoringRules.unansweredPoints} poeng</li>
            <li>• Ikke forlat siden under prøven</li>
            <li>• Kopier/lim inn er deaktivert</li>
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Ditt fulle navn</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onStart(name.trim()) }}
            placeholder="Fornavn Etternavn"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-lg"
          />
        </div>

        <button
          onClick={() => name.trim() && onStart(name.trim())}
          disabled={!name.trim()}
          className="w-full py-4 rounded-xl font-bold text-white text-lg disabled:opacity-40 transition-colors"
          style={{ background: name.trim() ? '#0d9488' : '#94a3b8' }}
        >
          Start prøven →
        </button>
      </div>
    </div>
  )
}

// ── Main exam session ─────────────────────────────────────────────────────────

function ExamSessionActive({
  exam,
  studentName,
}: {
  exam: Exam
  studentName: string
}) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(exam.timeMinutes * 60)
  const [submitted, setSubmitted] = useState(false)
  const [suspiciousLog, setSuspiciousLog] = useState<SuspiciousEvent[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const submittedRef = useRef(false)
  const startedAt = useRef(new Date().toISOString())

  const logSuspicious = useCallback((type: string) => {
    setSuspiciousLog(prev => [...prev, { type, timestamp: new Date().toISOString() }])
  }, [])

  // ── Anti-cheat ───────────────────────────────────────────────────────────

  useEffect(() => {
    const preventCtxMenu = (e: MouseEvent) => e.preventDefault()
    const preventClipboard = (e: ClipboardEvent) => e.preventDefault()
    const preventKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && ['c', 'v', 'x', 'a', 'u', 's'].includes(e.key)) e.preventDefault()
      if (e.key === 'F12') e.preventDefault()
    }
    const onVisibility = () => {
      if (document.hidden) logSuspicious('Tab switch detected')
    }

    document.addEventListener('contextmenu', preventCtxMenu)
    document.addEventListener('copy', preventClipboard)
    document.addEventListener('paste', preventClipboard)
    document.addEventListener('cut', preventClipboard)
    document.addEventListener('keydown', preventKeyDown)
    document.addEventListener('visibilitychange', onVisibility)
    window.onbeforeunload = () => 'Prøven pågår. Er du sikker på at du vil forlate siden?'

    return () => {
      document.removeEventListener('contextmenu', preventCtxMenu)
      document.removeEventListener('copy', preventClipboard)
      document.removeEventListener('paste', preventClipboard)
      document.removeEventListener('cut', preventClipboard)
      document.removeEventListener('keydown', preventKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      window.onbeforeunload = null
    }
  }, [logSuspicious])

  // ── Timer ────────────────────────────────────────────────────────────────

  const doSubmit = useCallback((finalAnswers: Record<string, string | number>, finalLog: SuspiciousEvent[]) => {
    if (submittedRef.current) return
    submittedRef.current = true

    // Calculate auto-score from multiple choice
    let autoScore = 0
    for (const q of exam.questions) {
      if (q.type !== 'multiple_choice') continue
      const ans = finalAnswers[q.id]
      if (ans === undefined || ans === '') {
        autoScore += exam.scoringRules.unansweredPoints
      } else if (ans === q.correct) {
        autoScore += (q.points ?? exam.scoringRules.correctPoints)
      } else {
        autoScore += (q.penaltyPoints ?? exam.scoringRules.wrongPenalty)
      }
    }

    const submission: ExamSubmission = {
      examId: exam.id,
      studentName,
      answers: Object.entries(finalAnswers).map(([questionId, answer]) => ({ questionId, answer })),
      startedAt: startedAt.current,
      submittedAt: new Date().toISOString(),
      autoScore,
      suspiciousActivity: finalLog,
    }

    const key = submissionsKey(exam.examCode ?? exam.id)
    const existing: ExamSubmission[] = (() => {
      try { return JSON.parse(localStorage.getItem(key) ?? '[]') } catch { return [] }
    })()
    localStorage.setItem(key, JSON.stringify([...existing, submission]))
    setSubmitted(true)
    window.onbeforeunload = null
  }, [exam, studentName])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval)
          setAnswers(currentAnswers => {
            setSuspiciousLog(currentLog => {
              doSubmit(currentAnswers, currentLog)
              return currentLog
            })
            return currentAnswers
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [doSubmit])

  function setAnswer(questionId: string, value: string | number) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const answeredCount = exam.questions.filter(q => {
    if (q.type === 'case') {
      return (q.subQuestions ?? []).some(sq => {
        const ans = answers[`${q.id}__${sq.id}`]
        return typeof ans === 'string' && ans.trim().length > 0
      })
    }
    const ans = answers[q.id]
    return ans !== undefined && ans !== ''
  }).length

  const currentQuestion = exam.questions[currentIdx]
  const isWarning = timeLeft < 300

  // ── Submitted screen ─────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Prøven er levert!</h1>
          <p className="text-gray-600 mb-2">Takk, {studentName}.</p>
          <p className="text-sm text-gray-500">Læreren vil se over svarene dine.</p>
        </div>
      </div>
    )
  }

  // ── Main layout ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white flex flex-col select-none">
      {/* Top bar */}
      <header className="border-b border-gray-200 px-4 py-3 flex items-center gap-4 bg-white sticky top-0 z-10">
        <h1 className="flex-1 text-sm font-bold text-gray-900 truncate">{exam.title}</h1>
        <div className={`text-sm font-mono font-bold px-3 py-1 rounded-lg ${isWarning ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
        <div className="text-sm text-gray-500">
          {answeredCount} av {exam.questions.length} besvart
        </div>
      </header>

      {/* Warning banner */}
      {isWarning && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-center text-sm font-semibold text-red-600">
          ⚠️ Mindre enn 5 minutter igjen! Husk å lever prøven.
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left: question list */}
        <aside className="w-48 shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50">
          <div className="p-3 space-y-1">
            {exam.questions.map((q, i) => {
              const isAnswered = q.type === 'case'
                ? (q.subQuestions ?? []).some(sq => {
                    const ans = answers[`${q.id}__${sq.id}`]
                    return typeof ans === 'string' && ans.trim().length > 0
                  })
                : (answers[q.id] !== undefined && answers[q.id] !== '')
              const isActive = currentIdx === i
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    isActive ? 'bg-teal-50 border border-teal-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isAnswered ? 'bg-emerald-500 text-white' : isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isAnswered ? '✓' : i + 1}
                  </span>
                  <span className={`text-xs truncate ${isActive ? 'text-teal-700 font-medium' : 'text-gray-600'}`}>
                    Spørsmål {i + 1}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Right: current question */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: '#0d9488' }}>
                  {currentIdx + 1}
                </span>
                <div className="flex items-center gap-2">
                  {currentQuestion.type === 'multiple_choice' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Flervalg</span>
                  )}
                  {currentQuestion.type === 'open' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">Åpent spørsmål</span>
                  )}
                  {currentQuestion.type === 'case' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">Case</span>
                  )}
                </div>
              </div>

              {/* Multiple choice */}
              {currentQuestion.type === 'multiple_choice' && (
                <>
                  <p className="text-gray-900 font-semibold text-base mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    +{currentQuestion.points ?? exam.scoringRules.correctPoints} poeng ved riktig |{' '}
                    {currentQuestion.penaltyPoints ?? exam.scoringRules.wrongPenalty} poeng ved feil
                  </p>
                  <div className="space-y-3">
                    {(currentQuestion.options ?? []).map((opt, i) => {
                      const isSelected = answers[currentQuestion.id] === i
                      return (
                        <button
                          key={i}
                          onClick={() => setAnswer(currentQuestion.id, i)}
                          className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            isSelected ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className={`text-sm font-medium ${isSelected ? 'text-teal-900' : 'text-gray-800'}`}>
                            {opt}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Open question */}
              {currentQuestion.type === 'open' && (
                <>
                  <p className="text-gray-900 font-semibold text-base mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">Maks {currentQuestion.maxPoints ?? 5} poeng</p>
                  <div className="relative">
                    <textarea
                      value={(answers[currentQuestion.id] as string) ?? ''}
                      onChange={e => setAnswer(currentQuestion.id, e.target.value)}
                      onCopy={e => e.preventDefault()}
                      onPaste={e => e.preventDefault()}
                      onCut={e => e.preventDefault()}
                      rows={10}
                      placeholder="Skriv svaret ditt her..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-sm resize-none"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {((answers[currentQuestion.id] as string) ?? '').length} tegn
                    </div>
                  </div>
                </>
              )}

              {/* Case question */}
              {currentQuestion.type === 'case' && (
                <>
                  <div className="p-5 rounded-xl border-2 border-purple-200 bg-purple-50 mb-6">
                    <p className="text-xs font-semibold text-purple-600 mb-2 uppercase tracking-wide">Casebeskrivelse</p>
                    <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                      {currentQuestion.question}
                    </p>
                  </div>
                  <div className="space-y-6">
                    {(currentQuestion.subQuestions ?? []).map((sq, j) => (
                      <div key={sq.id}>
                        <p className="text-gray-900 font-semibold text-sm mb-2 leading-relaxed">
                          {j + 1}a. {sq.question}
                        </p>
                        <p className="text-xs text-gray-400 mb-2">Maks {sq.maxPoints ?? 5} poeng</p>
                        <div className="relative">
                          <textarea
                            value={(answers[`${currentQuestion.id}__${sq.id}`] as string) ?? ''}
                            onChange={e => setAnswer(`${currentQuestion.id}__${sq.id}`, e.target.value)}
                            onCopy={e => e.preventDefault()}
                            onPaste={e => e.preventDefault()}
                            onCut={e => e.preventDefault()}
                            rows={6}
                            placeholder="Skriv svaret ditt her..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-gray-900 text-sm resize-none"
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                            {((answers[`${currentQuestion.id}__${sq.id}`] as string) ?? '').length} tegn
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-8">
              <button
                onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 disabled:opacity-40 hover:bg-gray-50"
              >
                ← Forrige
              </button>
              {currentIdx < exam.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(i => i + 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white"
                  style={{ background: '#0d9488' }}
                >
                  Neste →
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="px-6 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#0d9488' }}
                >
                  Lever prøven →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit button always visible */}
      <div className="border-t border-gray-200 px-4 py-3 flex justify-end bg-white">
        <button
          onClick={() => setShowConfirm(true)}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#0d9488' }}
        >
          Lever prøven ({answeredCount}/{exam.questions.length})
        </button>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Lever prøven?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Du har besvart {answeredCount} av {exam.questions.length} spørsmål.
              {answeredCount < exam.questions.length && (
                <span className="text-amber-600 font-medium">
                  {' '}{exam.questions.length - answeredCount} spørsmål er ubesvart.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700"
              >
                Avbryt
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false)
                  doSubmit(answers, suspiciousLog)
                }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: '#0d9488' }}
              >
                Lever nå
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Route component ───────────────────────────────────────────────────────────

export default function ExamSession() {
  const { examCode } = useParams<{ examCode: string }>()
  const [studentName, setStudentName] = useState<string | null>(null)

  const exam = examCode ? loadExamByCode(examCode) : null

  if (!exam) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Prøven ble ikke funnet</h1>
          <p className="text-sm text-gray-500">Sjekk at koden er riktig: <code className="font-mono">{examCode}</code></p>
        </div>
      </div>
    )
  }

  if (exam.status !== 'active') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">{exam.status === 'closed' ? '🔒' : '📋'}</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {exam.status === 'closed' ? 'Prøven er avsluttet' : 'Prøven er ikke aktiv ennå'}
          </h1>
          <p className="text-sm text-gray-500">Ta kontakt med læreren din.</p>
        </div>
      </div>
    )
  }

  if (!studentName) {
    return (
      <NameEntry
        exam={exam}
        onStart={name => {
          const trackKey = startTrackingKey(exam.examCode ?? exam.id)
          const existing: Array<{ studentName: string; startedAt: string }> = (() => {
            try { return JSON.parse(localStorage.getItem(trackKey) ?? '[]') } catch { return [] }
          })()
          if (!existing.some(e => e.studentName === name)) {
            localStorage.setItem(trackKey, JSON.stringify([...existing, { studentName: name, startedAt: new Date().toISOString() }]))
          }
          setStudentName(name)
        }}
      />
    )
  }

  return <ExamSessionActive exam={exam} studentName={studentName} />
}
