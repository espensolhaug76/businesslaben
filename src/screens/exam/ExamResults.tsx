import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useThemeEffect } from '../../components/ui/ThemeToggle'
import ThemeToggle from '../../components/ui/ThemeToggle'
import type { Exam, ExamSubmission } from '../../types/Exam'
import { getMaxPoints, calculateGrade, submissionsKey, startTrackingKey } from '../../types/Exam'

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadExam(examId: string): Exam | null {
  try {
    const exams: Exam[] = JSON.parse(localStorage.getItem('adventure-exams') ?? '[]')
    return exams.find(e => e.id === examId) ?? null
  } catch { return null }
}

function loadSubmissions(exam: Exam): ExamSubmission[] {
  try {
    const key = submissionsKey(exam.examCode ?? exam.id)
    return JSON.parse(localStorage.getItem(key) ?? '[]')
  } catch { return [] }
}

function saveSubmissions(exam: Exam, subs: ExamSubmission[]) {
  const key = submissionsKey(exam.examCode ?? exam.id)
  localStorage.setItem(key, JSON.stringify(subs))
}

function formatDuration(startedAt: string, submittedAt: string): string {
  const ms = new Date(submittedAt).getTime() - new Date(startedAt).getTime()
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return `${mins}m ${secs}s`
}

function gradeColor(grade: number): string {
  if (grade >= 5) return '#10b981'
  if (grade >= 4) return '#0d9488'
  if (grade === 3) return '#f59e0b'
  if (grade === 2) return '#f97316'
  return '#ef4444'
}

// ── Compute enriched submission ────────────────────────────────────────────────

function computeSubmission(sub: ExamSubmission, exam: Exam): ExamSubmission & { totalPoints: number; grade: number } {
  const maxPts = getMaxPoints(exam)
  const manualTotal = (sub.manualScores ?? []).reduce((s, m) => s + m.points, 0)
  const totalPoints = (sub.autoScore ?? 0) + manualTotal
  const pct = maxPts > 0 ? (totalPoints / maxPts) * 100 : 0
  const grade = calculateGrade(pct, exam.gradeThresholds)
  return { ...sub, totalPoints, grade }
}

// ── Grade distribution chart ──────────────────────────────────────────────────

function GradeChart({ submissions, exam }: { submissions: ExamSubmission[]; exam: Exam }) {
  const dist = [1, 2, 3, 4, 5, 6].map(g => ({
    grade: g,
    count: submissions.filter(s => computeSubmission(s, exam).grade === g).length,
  }))
  const maxCount = Math.max(...dist.map(d => d.count), 1)

  return (
    <div className="p-5 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Karakterfordeling</h3>
      <div className="flex items-end gap-3 h-28">
        {dist.map(({ grade, count }) => (
          <div key={grade} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{count}</span>
            <div
              className="w-full rounded-t-lg transition-all"
              style={{
                height: `${Math.max(4, (count / maxCount) * 80)}px`,
                background: gradeColor(grade),
                opacity: count === 0 ? 0.25 : 1,
              }}
            />
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{grade}</span>
          </div>
        ))}
      </div>
      <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
        {submissions.length} innlevering{submissions.length !== 1 ? 'er' : ''}
      </p>
    </div>
  )
}

// ── Student row ────────────────────────────────────────────────────────────────

function StudentRow({
  sub, exam, onUpdateManualScore,
}: {
  sub: ExamSubmission
  exam: Exam
  onUpdateManualScore: (studentName: string, questionId: string, points: number) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const enriched = computeSubmission(sub, exam)
  const maxPts = getMaxPoints(exam)

  const openCaseQuestions = exam.questions.filter(q => q.type === 'open' || q.type === 'case')

  function getManualScore(qId: string): number | undefined {
    return sub.manualScores?.find(m => m.questionId === qId)?.points
  }

  function getAnswer(qId: string): string {
    const ans = sub.answers.find(a => a.questionId === qId)
    return ans ? String(ans.answer) : ''
  }

  function getSubAnswer(questionId: string, subId: string): string {
    const key = `${questionId}__${subId}`
    const ans = sub.answers.find(a => a.questionId === key)
    return ans ? String(ans.answer) : ''
  }

  return (
    <>
      <tr
        className="border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
        style={{ borderColor: 'var(--border)' }}
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {expanded ? '▼' : '▶'} {sub.studentName}
        </td>
        <td className="px-4 py-3 text-sm text-center" style={{ color: 'var(--text-primary)' }}>
          {enriched.totalPoints.toFixed(1)} / {maxPts}
        </td>
        <td className="px-4 py-3 text-center">
          <span className="inline-block px-3 py-0.5 rounded-full text-sm font-bold text-white"
            style={{ background: gradeColor(enriched.grade) }}>
            {enriched.grade}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          {formatDuration(sub.startedAt, sub.submittedAt)}
        </td>
        <td className="px-4 py-3 text-center">
          {(sub.suspiciousActivity ?? []).length > 0 ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
              ⚠️ {(sub.suspiciousActivity ?? []).length}
            </span>
          ) : (
            <span className="text-xs text-gray-400">–</span>
          )}
        </td>
      </tr>

      {expanded && (
        <tr style={{ borderColor: 'var(--border)' }}>
          <td colSpan={5} className="px-4 pb-4">
            <div className="space-y-4 pt-2">
              {/* MC answers */}
              {exam.questions.filter(q => q.type === 'multiple_choice').length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                    Flervalg
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {exam.questions.filter(q => q.type === 'multiple_choice').map((q, i) => {
                      const ans = sub.answers.find(a => a.questionId === q.id)
                      const answered = ans !== undefined && ans.answer !== ''
                      const correct = answered && ans?.answer === q.correct
                      return (
                        <div key={q.id} className="flex items-start gap-2 p-2 rounded-lg border text-xs"
                          style={{
                            borderColor: !answered ? 'var(--border)' : correct ? '#10b981' : '#ef4444',
                            background: !answered ? 'var(--input-bg)' : correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                          }}>
                          <span className="shrink-0 mt-0.5">{!answered ? '○' : correct ? '✓' : '✗'}</span>
                          <div>
                            <p style={{ color: 'var(--text-primary)' }} className="font-medium">Sp. {i + 1}</p>
                            {answered ? (
                              <p style={{ color: 'var(--text-muted)' }}>
                                Valgte: {(q.options ?? [])[Number(ans?.answer)] ?? '—'}
                                {!correct && (
                                  <span className="ml-1 text-emerald-600">
                                    (riktig: {(q.options ?? [])[q.correct ?? 0]})
                                  </span>
                                )}
                              </p>
                            ) : (
                              <p style={{ color: 'var(--text-muted)' }}>Ubesvart</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Open/case answers with manual scoring */}
              {openCaseQuestions.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                    Åpne svar (sett poeng manuelt)
                  </h4>
                  <div className="space-y-3">
                    {openCaseQuestions.map((q, i) => (
                      <div key={q.id} className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--input-bg)' }}>
                        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                          {q.type === 'case' ? `Case ${i + 1}` : `Åpent spørsmål ${i + 1}`}: {q.question.slice(0, 80)}{q.question.length > 80 ? '…' : ''}
                        </p>

                        {q.type === 'open' && (
                          <>
                            <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border mb-2 text-xs"
                              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', minHeight: 48 }}>
                              {getAnswer(q.id) || <span style={{ color: 'var(--text-muted)' }}>Ikke besvart</span>}
                            </div>
                            {q.suggestedAnswer && (
                              <div className="p-2 rounded-lg border mb-2 text-xs"
                                style={{ borderColor: '#0d9488', background: 'rgba(13,148,136,0.06)', color: '#0d9488' }}>
                                <span className="font-semibold">Foreslått svar: </span>{q.suggestedAnswer}
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Poeng (maks {q.maxPoints ?? 5}):
                              </label>
                              <input
                                type="number"
                                min={0}
                                max={q.maxPoints ?? 5}
                                step={0.5}
                                value={getManualScore(q.id) ?? ''}
                                onChange={e => onUpdateManualScore(sub.studentName, q.id, Number(e.target.value))}
                                onClick={e => e.stopPropagation()}
                                className="w-20 px-2 py-1 rounded-lg border text-sm"
                                style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                              />
                            </div>
                          </>
                        )}

                        {q.type === 'case' && (
                          <div className="space-y-2">
                            {(q.subQuestions ?? []).map((sq, j) => (
                              <div key={sq.id} className="pl-3 border-l-2" style={{ borderColor: '#7c3aed' }}>
                                <p className="text-xs font-medium mb-1" style={{ color: '#7c3aed' }}>
                                  {j + 1}a. {sq.question}
                                </p>
                                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border mb-1 text-xs"
                                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', minHeight: 36 }}>
                                  {getSubAnswer(q.id, sq.id) || <span style={{ color: 'var(--text-muted)' }}>Ikke besvart</span>}
                                </div>
                                {sq.suggestedAnswer && (
                                  <div className="p-2 rounded-lg border mb-1 text-xs"
                                    style={{ borderColor: '#7c3aed', background: 'rgba(124,58,237,0.06)', color: '#7c3aed' }}>
                                    <span className="font-semibold">Fasit: </span>{sq.suggestedAnswer}
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    Poeng (maks {sq.maxPoints ?? 5}):
                                  </label>
                                  <input
                                    type="number"
                                    min={0}
                                    max={sq.maxPoints ?? 5}
                                    step={0.5}
                                    value={getManualScore(`${q.id}__${sq.id}`) ?? ''}
                                    onChange={e => onUpdateManualScore(sub.studentName, `${q.id}__${sq.id}`, Number(e.target.value))}
                                    onClick={e => e.stopPropagation()}
                                    className="w-20 px-2 py-1 rounded-lg border text-sm"
                                    style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suspicious activity */}
              {(sub.suspiciousActivity ?? []).length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-2 text-amber-600">
                    ⚠️ Mistenkelig aktivitet
                  </h4>
                  <div className="space-y-1">
                    {(sub.suspiciousActivity ?? []).map((ev, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                        <span className="text-amber-600">{ev.type}</span>
                        <span className="ml-auto text-amber-500">{new Date(ev.timestamp).toLocaleTimeString('no-NO')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ExamResults() {
  useThemeEffect()
  const navigate = useNavigate()
  const { examId } = useParams<{ examId: string }>()

  const exam = useMemo(() => examId ? loadExam(examId) : null, [examId])
  const [submissions, setSubmissions] = useState<ExamSubmission[]>(() =>
    exam ? loadSubmissions(exam) : []
  )
  const [startedStudents, setStartedStudents] = useState<Array<{ studentName: string; startedAt: string }>>(() => {
    try { return JSON.parse(localStorage.getItem(startTrackingKey(exam?.examCode ?? exam?.id ?? '')) ?? '[]') } catch { return [] }
  })

  function updateManualScore(studentName: string, questionId: string, points: number) {
    setSubmissions(prev => {
      const updated = prev.map(sub => {
        if (sub.studentName !== studentName) return sub
        const existing = sub.manualScores ?? []
        const idx = existing.findIndex(m => m.questionId === questionId)
        const newScores = idx >= 0
          ? existing.map((m, i) => i === idx ? { ...m, points } : m)
          : [...existing, { questionId, points }]
        return { ...sub, manualScores: newScores }
      })
      if (exam) saveSubmissions(exam, updated)
      return updated
    })
  }

  function refreshLists() {
    if (!exam) return
    setSubmissions(loadSubmissions(exam))
    try {
      setStartedStudents(JSON.parse(localStorage.getItem(startTrackingKey(exam.examCode ?? exam.id)) ?? '[]'))
    } catch {
      setStartedStudents([])
    }
  }

  function closeExam() {
    if (!exam) return
    const exams: Exam[] = (() => { try { return JSON.parse(localStorage.getItem('adventure-exams') ?? '[]') } catch { return [] } })()
    const updated = exams.map(e => e.id === exam.id ? { ...e, status: 'closed' as const } : e)
    localStorage.setItem('adventure-exams', JSON.stringify(updated))
    navigate('/teacher')
  }

  function exportResults() {
    if (!exam) return
    const maxPts = getMaxPoints(exam)
    const lines = [
      `Prøve: ${exam.title}`,
      `Dato: ${new Date(exam.createdAt).toLocaleDateString('no-NO')}`,
      `Maks poeng: ${maxPts}`,
      '',
      'Elev\tPoeng\tKarakter\tTid\tMistenkelig',
      ...submissions.map(sub => {
        const e = computeSubmission(sub, exam)
        return `${sub.studentName}\t${e.totalPoints.toFixed(1)}/${maxPts}\t${e.grade}\t${formatDuration(sub.startedAt, sub.submittedAt)}\t${(sub.suspiciousActivity ?? []).length > 0 ? '⚠️' : ''}`
      }),
    ]
    navigator.clipboard.writeText(lines.join('\n'))
      .then(() => alert('Resultater kopiert til utklippstavlen!'))
      .catch(() => alert('Kunne ikke kopiere. Prøv igjen.'))
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p style={{ color: 'var(--text-muted)' }}>Prøven ble ikke funnet.</p>
          <button onClick={() => navigate('/teacher')} className="mt-4 px-4 py-2 rounded-xl border text-sm font-medium"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            Tilbake
          </button>
        </div>
      </div>
    )
  }

  const maxPts = getMaxPoints(exam)
  const enrichedSubs = submissions.map(s => computeSubmission(s, exam))
  const avgGrade = enrichedSubs.length > 0
    ? (enrichedSubs.reduce((s, e) => s + e.grade, 0) / enrichedSubs.length).toFixed(1)
    : '—'

  const statusLabel = exam.status === 'active' ? 'Aktiv' : exam.status === 'closed' ? 'Avsluttet' : 'Utkast'
  const statusColor = exam.status === 'active' ? '#10b981' : exam.status === 'closed' ? '#6b7280' : '#f59e0b'

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between"
        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/teacher')} className="text-sm font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            ← Tilbake
          </button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{exam.title}</h1>
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>Kode: <span className="font-mono font-bold">{exam.examCode ?? '—'}</span></span>
              <span>•</span>
              <span style={{ color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
              <span>•</span>
              <span>{submissions.length} innlevering{submissions.length !== 1 ? 'er' : ''}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {exam.status === 'active' && (
            <button onClick={closeExam}
              className="px-4 py-2 rounded-xl text-sm border font-medium"
              style={{ borderColor: '#ef4444', color: '#ef4444' }}>
              Avslutt prøven
            </button>
          )}
          <button onClick={exportResults}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: '#0d9488' }}>
            Eksporter resultater
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Innleveringer', value: submissions.length },
            { label: 'Snitkarakter', value: avgGrade },
            { label: 'Maks poeng', value: maxPts },
            { label: 'Spørsmål', value: exam.questions.length },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-2xl border text-center"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Started but not submitted */}
        {(() => {
          const notSubmitted = startedStudents.filter(
            s => !submissions.some(sub => sub.studentName === s.studentName)
          )
          if (notSubmitted.length === 0) return null
          return (
            <div className="mb-6 p-4 rounded-2xl border border-amber-300 dark:border-amber-500/40"
              style={{ background: 'rgba(251,191,36,0.08)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  ⚠️ Påbegynt, ikke levert ({notSubmitted.length} elev{notSubmitted.length !== 1 ? 'er' : ''})
                </h3>
                <button
                  onClick={refreshLists}
                  className="text-xs px-3 py-1 rounded-lg border font-medium"
                  style={{ borderColor: '#d97706', color: '#d97706' }}
                >
                  ↻ Oppdater
                </button>
              </div>
              <div className="space-y-1.5">
                {notSubmitted.map(s => (
                  <div key={s.studentName} className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
                    <span className="font-medium">{s.studentName}</span>
                    <span className="text-amber-600 dark:text-amber-400 text-xs">
                      — startet {new Date(s.startedAt).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        <div className="grid grid-cols-[1fr_280px] gap-6">
          {/* Results table */}
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-3 border-b" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Resultater per elev</h2>
            </div>
            {submissions.length === 0 ? (
              <div className="px-4 py-12 text-center" style={{ background: 'var(--card-bg)' }}>
                <p className="text-4xl mb-3">⏳</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Ingen innleveringer ennå.
                  {exam.status === 'active' && (
                    <span> Del koden <span className="font-mono font-bold">{exam.examCode}</span> med elevene.</span>
                  )}
                </p>
              </div>
            ) : (
              <div style={{ background: 'var(--card-bg)' }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                      {['Elev', 'Poeng', 'Karakter', 'Tid brukt', 'Aktivitet'].map(h => (
                        <th key={h} className="px-4 py-2.5 text-xs font-semibold text-left uppercase tracking-wide"
                          style={{ color: 'var(--text-muted)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map(sub => (
                      <StudentRow
                        key={sub.studentName + sub.startedAt}
                        sub={sub}
                        exam={exam}
                        onUpdateManualScore={updateManualScore}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Grade chart */}
          <GradeChart submissions={submissions} exam={exam} />
        </div>
      </main>
    </div>
  )
}
