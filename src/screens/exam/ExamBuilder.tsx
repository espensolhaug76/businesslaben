import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TEACHER_MODULE_PHASES } from '../learninghub/shared/teacherModuleRegistry'
import type { DrawerExercise, DrawerChoice } from '../learninghub/shared/DrawerModule'
import type { Exam, ExamQuestion, CaseSubQuestion } from '../../types/Exam'
import type { TeacherQuestion } from '../../types/TeacherQuestions'
import { useThemeEffect } from '../../components/ui/ThemeToggle'
import ThemeToggle from '../../components/ui/ThemeToggle'

// ── Helpers ───────────────────────────────────────────────────────────────────

function genId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function genExamCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'EXAM-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function moduleLabel(route: string): string {
  return route.replace('/learning/', '').replace(/\//g, ' › ').replace(/-/g, ' ')
}

// ── Bank item type ────────────────────────────────────────────────────────────

interface BankItem {
  moduleKey: string
  exercise: DrawerExercise
}

// ── Grade threshold row ────────────────────────────────────────────────────────

function ThresholdRow({
  label, value, onChange,
}: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</span>
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-20 px-2 py-1 rounded-lg border text-sm text-center"
        style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
      />
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>%</span>
    </div>
  )
}

// ── Question list item ────────────────────────────────────────────────────────

function QuestionRow({
  q, index, total, onRemove, onMove,
}: {
  q: ExamQuestion
  index: number
  total: number
  onRemove: () => void
  onMove: (dir: -1 | 1) => void
}) {
  const typeBadge = q.type === 'multiple_choice'
    ? 'Flervalg'
    : q.type === 'open' ? 'Åpent' : 'Case'
  const typeColor = q.type === 'multiple_choice'
    ? '#2563eb'
    : q.type === 'open' ? '#0d9488' : '#7c3aed'

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
      <span className="shrink-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug truncate" style={{ color: 'var(--text-primary)' }}>
          {q.question}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${typeColor}20`, color: typeColor }}>
            {typeBadge}
          </span>
          {q.type === 'multiple_choice' && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              +{q.points ?? 1} / {q.penaltyPoints ?? -0.5}
            </span>
          )}
          {(q.type === 'open') && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>maks {q.maxPoints ?? 5} p</span>
          )}
          {q.type === 'case' && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {(q.subQuestions ?? []).length} delspørsmål
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onMove(-1)} disabled={index === 0}
          className="p-1 rounded text-xs disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700"
          style={{ color: 'var(--text-muted)' }}>↑</button>
        <button onClick={() => onMove(1)} disabled={index === total - 1}
          className="p-1 rounded text-xs disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-700"
          style={{ color: 'var(--text-muted)' }}>↓</button>
        <button onClick={onRemove}
          className="p-1 rounded text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">✕</button>
      </div>
    </div>
  )
}

// ── Subject options ───────────────────────────────────────────────────────────

const SUBJECT_OPTIONS = [
  { id: 'forretningsdrift', label: 'Forretningsdrift VG1 (SSR-FD)', routePrefix: '/learning/forretningsdrift/' },
  { id: 'mfi', label: 'Markedsføring og innovasjon VG1 (SSR-MI)', routePrefix: '/learning/mfi/' },
  { id: 'kultur', label: 'Kultur og samhandling VG1 (SSR-KS)', routePrefix: '/learning/kultur/' },
  { id: 'ml1', label: 'Markedsføring og ledelse 1 (ML1)', routePrefix: '/learning/ml1/' },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function ExamBuilder() {
  useThemeEffect()
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [activatedExam, setActivatedExam] = useState<Exam | null>(null)

  // ── Step 1: Setup ──────────────────────────────────────────────────────────

  const [title, setTitle] = useState('')
  const [classCode] = useState(() => localStorage.getItem('teacher-classroom-code') ?? '')
  const [timeMinutes, setTimeMinutes] = useState(45)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [correctPoints, setCorrectPoints] = useState(1)
  const [wrongPenalty, setWrongPenalty] = useState(-0.5)
  const [gradeThresholds, setGradeThresholds] = useState({
    grade6: 90, grade5: 75, grade4: 60, grade3: 45, grade2: 30,
  })

  // ── Step 2: Questions ──────────────────────────────────────────────────────

  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [questionTab, setQuestionTab] = useState<'flervalg' | 'aapent' | 'case'>('flervalg')
  const [bankSearch, setBankSearch] = useState('')
  const [bankModule, setBankModule] = useState<string>('all')

  // Custom flervalg form
  const [cFQ, setCFQ] = useState('')
  const [cFOpts, setCFOpts] = useState(['', '', '', ''])
  const [cFCorrect, setCFCorrect] = useState(0)
  const [cFPoints, setCFPoints] = useState(1)

  // Custom open form
  const [cOQ, setCOQ] = useState('')
  const [cOAnswer, setCOAnswer] = useState('')
  const [cOMax, setCOMax] = useState(5)

  // Custom case form
  const [cCText, setCCText] = useState('')
  const [cCSubs, setCCSubs] = useState<Array<{ id: string; question: string; answer: string; maxPoints: number }>>([
    { id: genId(), question: '', answer: '', maxPoints: 5 },
  ])

  // ── Question bank ──────────────────────────────────────────────────────────

  const allBankItems = useMemo<BankItem[]>(() => {
    const result: BankItem[] = []
    for (const [moduleKey, phases] of Object.entries(TEACHER_MODULE_PHASES)) {
      // Filter by selected subjects if any are chosen
      if (selectedSubjects.length > 0) {
        const match = SUBJECT_OPTIONS.some(s => selectedSubjects.includes(s.id) && moduleKey.startsWith(s.routePrefix))
        if (!match) continue
      }
      for (const phase of phases) {
        for (const ex of phase.exercises) {
          result.push({ moduleKey, exercise: ex })
        }
      }
    }
    return result
  }, [selectedSubjects])

  const moduleKeys = useMemo(() => ['all', ...Array.from(new Set(allBankItems.map(i => i.moduleKey)))], [allBankItems])

  const filteredBank = useMemo(() => {
    let items = bankModule === 'all' ? allBankItems : allBankItems.filter(i => i.moduleKey === bankModule)
    if (bankSearch.trim()) {
      const q = bankSearch.toLowerCase()
      items = items.filter(i => i.exercise.question.toLowerCase().includes(q))
    }
    return items.slice(0, 50)
  }, [allBankItems, bankModule, bankSearch])

  // ── Teacher questions for suggestions ─────────────────────────────────────

  const teacherQuestions = useMemo<TeacherQuestion[]>(() => {
    try { return JSON.parse(localStorage.getItem('teacher-questions') ?? '[]') } catch { return [] }
  }, [])

  // ── Handlers ──────────────────────────────────────────────────────────────

  function addBankItem(item: BankItem) {
    const ex = item.exercise
    const choices: DrawerChoice[] = ex.choices
    const options = choices.map(c => c.text ?? c.label ?? '')
    const correctIdx = ex.correctId
      ? choices.findIndex(c => c.id === ex.correctId)
      : choices.findIndex(c => c.isCorrect)
    setQuestions(prev => [...prev, {
      id: genId(),
      type: 'multiple_choice',
      question: ex.question,
      options,
      correct: correctIdx >= 0 ? correctIdx : 0,
      points: 1,
      penaltyPoints: -0.5,
    }])
  }

  function addCustomFlervalg() {
    if (!cFQ.trim() || cFOpts.some(o => !o.trim())) return
    setQuestions(prev => [...prev, {
      id: genId(), type: 'multiple_choice',
      question: cFQ, options: [...cFOpts], correct: cFCorrect,
      points: cFPoints, penaltyPoints: -0.5,
    }])
    setCFQ(''); setCFOpts(['', '', '', '']); setCFCorrect(0); setCFPoints(1)
  }

  function addCustomOpen() {
    if (!cOQ.trim()) return
    setQuestions(prev => [...prev, {
      id: genId(), type: 'open',
      question: cOQ, suggestedAnswer: cOAnswer, maxPoints: cOMax,
    }])
    setCOQ(''); setCOAnswer(''); setCOMax(5)
  }

  function addCustomCase() {
    if (!cCText.trim()) return
    const subs: CaseSubQuestion[] = cCSubs
      .filter(s => s.question.trim())
      .map(s => ({ id: s.id, question: s.question, suggestedAnswer: s.answer, maxPoints: s.maxPoints }))
    setQuestions(prev => [...prev, {
      id: genId(), type: 'case',
      question: cCText, subQuestions: subs,
    }])
    setCCText(''); setCCSubs([{ id: genId(), question: '', answer: '', maxPoints: 5 }])
  }

  function removeQuestion(id: string) {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  function moveQuestion(idx: number, dir: -1 | 1) {
    setQuestions(prev => {
      const arr = [...prev]
      const target = idx + dir
      if (target < 0 || target >= arr.length) return arr
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return arr
    })
  }

  function saveExam(status: 'draft' | 'active'): Exam {
    const exam: Exam = {
      id: genId(),
      title,
      classCode,
      subjects: selectedSubjects,
      timeMinutes,
      questions,
      scoringRules: { correctPoints, wrongPenalty, unansweredPoints: 0 },
      gradeThresholds,
      status,
      examCode: status === 'active' ? genExamCode() : undefined,
      createdAt: new Date().toISOString(),
    }
    const existing: Exam[] = (() => { try { return JSON.parse(localStorage.getItem('adventure-exams') ?? '[]') } catch { return [] } })()
    localStorage.setItem('adventure-exams', JSON.stringify([...existing, exam]))
    return exam
  }

  // ── Render: Step 1 ────────────────────────────────────────────────────────

  function renderStep1() {
    const canProceed = title.trim().length > 0
    return (
      <div className="space-y-6 max-w-2xl">
        {/* Title */}
        <div className="p-5 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
            Prøvetittel *
          </label>
          <input
            type="text"
            placeholder="f.eks. Kapittelprøve: Markedsføring"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Class & Time */}
        <div className="p-5 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Klasse</label>
              <div className="px-3 py-2 rounded-lg border text-sm font-mono"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                {classCode || '—'}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Tid (minutter)</label>
              <select
                value={timeMinutes}
                onChange={e => setTimeMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                {[15, 30, 45, 60, 90].map(t => (
                  <option key={t} value={t}>{t} min</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subject selection */}
        <div className="p-5 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
            Fag (velg ett eller flere)
          </label>
          <div className="flex flex-wrap gap-2">
            {SUBJECT_OPTIONS.map(subject => {
              const isSelected = selectedSubjects.includes(subject.id)
              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => setSelectedSubjects(prev =>
                    isSelected ? prev.filter(id => id !== subject.id) : [...prev, subject.id]
                  )}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors"
                  style={{
                    background: isSelected ? '#0d9488' : 'transparent',
                    borderColor: isSelected ? '#0d9488' : 'var(--border)',
                    color: isSelected ? 'white' : 'var(--text-muted)',
                  }}
                >
                  {subject.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Scoring rules */}
        <div className="p-5 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Poengregler (flervalg)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Riktig svar</label>
              <input type="number" step="0.5" value={correctPoints} onChange={e => setCorrectPoints(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Galt svar (trekk)</label>
              <input type="number" step="0.5" value={wrongPenalty} onChange={e => setWrongPenalty(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
          </div>
        </div>

        {/* Grade thresholds */}
        <div className="p-5 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Karaktergrenser (% poeng)</h3>
          <div className="space-y-2">
            <ThresholdRow label="Karakter 6" value={gradeThresholds.grade6} onChange={v => setGradeThresholds(t => ({ ...t, grade6: v }))} />
            <ThresholdRow label="Karakter 5" value={gradeThresholds.grade5} onChange={v => setGradeThresholds(t => ({ ...t, grade5: v }))} />
            <ThresholdRow label="Karakter 4" value={gradeThresholds.grade4} onChange={v => setGradeThresholds(t => ({ ...t, grade4: v }))} />
            <ThresholdRow label="Karakter 3" value={gradeThresholds.grade3} onChange={v => setGradeThresholds(t => ({ ...t, grade3: v }))} />
            <ThresholdRow label="Karakter 2" value={gradeThresholds.grade2} onChange={v => setGradeThresholds(t => ({ ...t, grade2: v }))} />
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Under {gradeThresholds.grade2}% → karakter 1</p>
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          disabled={!canProceed}
          className="px-8 py-3 rounded-xl font-bold text-white transition-colors disabled:opacity-40"
          style={{ background: '#0d9488' }}
        >
          Neste: Legg til spørsmål →
        </button>
      </div>
    )
  }

  // ── Render: Step 2 ────────────────────────────────────────────────────────

  function renderStep2() {
    return (
      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* Left: add questions */}
        <div>
          {/* Tab selector */}
          <div className="flex gap-2 mb-4">
            {(['flervalg', 'aapent', 'case'] as const).map(tab => {
              const labels = { flervalg: 'Flervalg', aapent: 'Åpent spørsmål', case: 'Case' }
              const isActive = questionTab === tab
              return (
                <button key={tab} onClick={() => setQuestionTab(tab)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                  style={{
                    background: isActive ? '#0d9488' : 'var(--card-bg)',
                    borderColor: isActive ? '#0d9488' : 'var(--border)',
                    color: isActive ? 'white' : 'var(--text-muted)',
                  }}
                >
                  {labels[tab]}
                </button>
              )
            })}
          </div>

          {/* Flervalg tab */}
          {questionTab === 'flervalg' && (
            <div className="space-y-4">
              {/* Question bank */}
              <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  Spørsmålsbank ({allBankItems.length} spørsmål)
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Søk i spørsmål..."
                    value={bankSearch}
                    onChange={e => setBankSearch(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border text-sm"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                  <select
                    value={bankModule}
                    onChange={e => setBankModule(e.target.value)}
                    className="px-2 py-1.5 rounded-lg border text-xs max-w-[160px]"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  >
                    <option value="all">Alle moduler</option>
                    {moduleKeys.filter(k => k !== 'all').map(k => (
                      <option key={k} value={k}>{moduleLabel(k)}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredBank.map((item, i) => (
                    <div key={`${item.moduleKey}-${item.exercise.id}-${i}`}
                      className="flex items-start gap-2 p-2.5 rounded-lg border"
                      style={{ borderColor: 'var(--border)' }}>
                      <p className="flex-1 text-xs leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {item.exercise.question}
                      </p>
                      <button
                        onClick={() => addBankItem(item)}
                        className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold text-white transition-colors"
                        style={{ background: '#0d9488' }}
                      >
                        Legg til
                      </button>
                    </div>
                  ))}
                  {filteredBank.length === 0 && (
                    <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>Ingen treff</p>
                  )}
                  {!bankSearch && bankModule === 'all' && allBankItems.length > 50 && (
                    <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>Viser 50 av {allBankItems.length} — bruk søk for å finne flere</p>
                  )}
                </div>
              </div>

              {/* Custom flervalg */}
              <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Eget flervalg-spørsmål</h3>
                <textarea
                  placeholder="Spørsmålstekst..."
                  value={cFQ}
                  onChange={e => setCFQ(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border text-sm mb-3 resize-none"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
                <div className="space-y-2 mb-3">
                  {cFOpts.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" name="cFCorrect" checked={cFCorrect === i} onChange={() => setCFCorrect(i)}
                        className="accent-teal-500" />
                      <span className="text-xs font-bold w-5" style={{ color: 'var(--text-muted)' }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <input
                        type="text"
                        placeholder={`Alternativ ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={e => setCFOpts(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                        className="flex-1 px-2 py-1.5 rounded-lg border text-sm"
                        style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <label className="text-xs" style={{ color: 'var(--text-muted)' }}>Poeng:</label>
                  <input type="number" step="0.5" min="0.5" value={cFPoints} onChange={e => setCFPoints(Number(e.target.value))}
                    className="w-20 px-2 py-1 rounded-lg border text-sm"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </div>
                <button onClick={addCustomFlervalg}
                  disabled={!cFQ.trim() || cFOpts.some(o => !o.trim())}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                  style={{ background: '#0d9488' }}>
                  + Legg til spørsmål
                </button>
              </div>
            </div>
          )}

          {/* Åpent spørsmål tab */}
          {questionTab === 'aapent' && (
            <div className="space-y-4">
              {/* Teacher question suggestions */}
              {teacherQuestions.filter(q => q.type === 'open_ended').length > 0 && (
                <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Forslag fra dine spørsmål</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {teacherQuestions.filter(q => q.type === 'open_ended').map(tq => (
                      <div key={tq.id} className="flex items-start gap-2 p-2.5 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
                        <p className="flex-1 text-xs" style={{ color: 'var(--text-primary)' }}>{tq.questionText}</p>
                        <button
                          onClick={() => {
                            setQuestions(prev => [...prev, {
                              id: genId(), type: 'open',
                              question: tq.questionText,
                              suggestedAnswer: tq.modelAnswer,
                              maxPoints: 5,
                            }])
                          }}
                          className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                          style={{ background: '#0d9488' }}>
                          Legg til
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom open */}
              <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Eget åpent spørsmål</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Spørsmål</label>
                    <textarea rows={2} value={cOQ} onChange={e => setCOQ(e.target.value)}
                      placeholder="Spørsmålstekst..."
                      className="w-full px-3 py-2 rounded-lg border text-sm resize-none"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                      Foreslått svar (kun synlig for lærer)
                    </label>
                    <textarea rows={3} value={cOAnswer} onChange={e => setCOAnswer(e.target.value)}
                      placeholder="Fasit / modellsvar..."
                      className="w-full px-3 py-2 rounded-lg border text-sm resize-none"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs" style={{ color: 'var(--text-muted)' }}>Maks poeng:</label>
                    <input type="number" min={1} value={cOMax} onChange={e => setCOMax(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded-lg border text-sm"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <button onClick={addCustomOpen} disabled={!cOQ.trim()}
                  className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                  style={{ background: '#0d9488' }}>
                  + Legg til spørsmål
                </button>
              </div>
            </div>
          )}

          {/* Case tab */}
          {questionTab === 'case' && (
            <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Case-oppgave</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Casebeskrivelse</label>
                  <textarea rows={5} value={cCText} onChange={e => setCCText(e.target.value)}
                    placeholder="Beskriv casen... (scenario, bakgrunn, relevant informasjon)"
                    className="w-full px-3 py-2 rounded-lg border text-sm resize-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      Delspørsmål ({cCSubs.length}/3)
                    </label>
                    {cCSubs.length < 3 && (
                      <button onClick={() => setCCSubs(prev => [...prev, { id: genId(), question: '', answer: '', maxPoints: 5 }])}
                        className="text-xs px-2 py-1 rounded border"
                        style={{ borderColor: '#0d9488', color: '#0d9488' }}>
                        + Legg til delspørsmål
                      </button>
                    )}
                  </div>
                  {cCSubs.map((sub, i) => (
                    <div key={sub.id} className="p-3 rounded-xl border mb-2 space-y-2"
                      style={{ borderColor: 'var(--border)', background: 'var(--input-bg)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: '#7c3aed' }}>Delspørsmål {i + 1}</span>
                        {cCSubs.length > 1 && (
                          <button onClick={() => setCCSubs(prev => prev.filter((_, j) => j !== i))}
                            className="text-xs text-red-500">✕ Fjern</button>
                        )}
                      </div>
                      <input type="text" placeholder="Spørsmål..." value={sub.question}
                        onChange={e => setCCSubs(prev => prev.map((s, j) => j === i ? { ...s, question: e.target.value } : s))}
                        className="w-full px-2 py-1.5 rounded-lg border text-sm"
                        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                      <textarea rows={2} placeholder="Foreslått svar (kun for lærer)..." value={sub.answer}
                        onChange={e => setCCSubs(prev => prev.map((s, j) => j === i ? { ...s, answer: e.target.value } : s))}
                        className="w-full px-2 py-1.5 rounded-lg border text-sm resize-none"
                        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Maks poeng:</span>
                        <input type="number" min={1} value={sub.maxPoints}
                          onChange={e => setCCSubs(prev => prev.map((s, j) => j === i ? { ...s, maxPoints: Number(e.target.value) } : s))}
                          className="w-16 px-2 py-1 rounded border text-sm"
                          style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={addCustomCase} disabled={!cCText.trim()}
                className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                style={{ background: '#7c3aed' }}>
                + Legg til case
              </button>
            </div>
          )}
        </div>

        {/* Right: questions list */}
        <div>
          <div className="sticky top-4">
            <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Prøven ({questions.length} spørsmål)
              </h3>
              {questions.length === 0 ? (
                <p className="text-xs text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  Ingen spørsmål lagt til ennå.<br />Bruk fanene til venstre.
                </p>
              ) : (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {questions.map((q, i) => (
                    <QuestionRow key={q.id} q={q} index={i} total={questions.length}
                      onRemove={() => removeQuestion(q.id)}
                      onMove={dir => moveQuestion(i, dir)} />
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 rounded-xl text-sm border font-medium"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                ← Tilbake
              </button>
              <button onClick={() => setStep(3)} disabled={questions.length === 0}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40"
                style={{ background: '#0d9488' }}>
                Forhåndsvis →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Render: Step 3 ────────────────────────────────────────────────────────

  function renderStep3() {
    if (activatedExam) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center py-12"
        >
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Prøven er aktivert!</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            Del denne koden med elevene dine
          </p>
          <div className="p-6 rounded-2xl border-2 border-dashed mb-8"
            style={{ borderColor: '#0d9488', background: 'rgba(13,148,136,0.08)' }}>
            <p className="text-4xl font-black tracking-widest" style={{ color: '#0d9488' }}>
              {activatedExam.examCode}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Elever går til prøven via /exam/{activatedExam.examCode}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/teacher')}
              className="px-6 py-3 rounded-xl font-bold text-white"
              style={{ background: '#0d9488' }}>
              Tilbake til lærervisning
            </button>
            <button onClick={() => navigate(`/exam/results/${activatedExam.id}`)}
              className="px-6 py-3 rounded-xl font-bold border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              Se resultater
            </button>
          </div>
        </motion.div>
      )
    }

    const maxPts = questions.reduce((sum, q) => {
      if (q.type === 'multiple_choice') return sum + (q.points ?? 1)
      if (q.type === 'open') return sum + (q.maxPoints ?? 5)
      if (q.type === 'case') return sum + (q.subQuestions ?? []).reduce((s, sq) => s + (sq.maxPoints ?? 5), 0)
      return sum
    }, 0)

    return (
      <div className="max-w-3xl">
        {/* Preview header */}
        <div className="p-5 rounded-2xl border mb-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span>⏱ {timeMinutes} minutter</span>
            <span>📝 {questions.length} spørsmål</span>
            <span>🎯 {maxPts} poeng totalt</span>
          </div>
        </div>

        {/* Questions preview */}
        <div className="space-y-4 mb-8">
          {questions.map((q, i) => (
            <div key={q.id} className="p-4 rounded-xl border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <div className="flex items-start gap-3 mb-3">
                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: '#0d9488' }}>
                  {i + 1}
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
              </div>
              {q.type === 'multiple_choice' && q.options && (
                <div className="ml-10 grid grid-cols-2 gap-2">
                  {q.options.map((opt, j) => (
                    <div key={j} className={`px-3 py-2 rounded-lg border text-sm ${j === q.correct ? 'font-semibold' : ''}`}
                      style={{
                        background: j === q.correct ? 'rgba(16,185,129,0.1)' : 'var(--input-bg)',
                        borderColor: j === q.correct ? '#10b981' : 'var(--border)',
                        color: j === q.correct ? '#10b981' : 'var(--text-muted)',
                      }}>
                      {String.fromCharCode(65 + j)}. {opt}
                    </div>
                  ))}
                </div>
              )}
              {q.type === 'open' && (
                <div className="ml-10">
                  <div className="px-3 py-2 rounded-lg border text-sm italic"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--input-bg)' }}>
                    [Fritekstfelt for elev]
                  </div>
                </div>
              )}
              {q.type === 'case' && (
                <div className="ml-10 space-y-2">
                  {(q.subQuestions ?? []).map((sq, j) => (
                    <div key={sq.id} className="p-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--input-bg)' }}>
                      <p className="text-xs font-medium mb-1" style={{ color: '#7c3aed' }}>
                        {j + 1}a. {sq.question} ({sq.maxPoints ?? 5} p)
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep(2)}
            className="px-6 py-3 rounded-xl font-bold border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            ← Rediger spørsmål
          </button>
          <button onClick={() => { const exam = saveExam('draft'); navigate(`/exam/results/${exam.id}`) }}
            className="px-6 py-3 rounded-xl font-bold border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            Lagre som utkast
          </button>
          <button
            onClick={() => {
              const exam = saveExam('active')
              setActivatedExam(exam)
            }}
            className="px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: '#0d9488' }}>
            ✅ Aktiver prøve
          </button>
        </div>
      </div>
    )
  }

  // ── Main render ───────────────────────────────────────────────────────────

  const stepLabels = ['Oppsett', 'Spørsmål', 'Forhåndsvis']

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between"
        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/teacher')}
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            ← Tilbake
          </button>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Lag ny prøve</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Step indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {stepLabels.map((label, i) => {
              const stepNum = (i + 1) as 1 | 2 | 3
              const isActive = step === stepNum
              const isDone = step > stepNum
              return (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <div className="w-6 h-px" style={{ background: isDone ? '#0d9488' : 'var(--border)' }} />}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold`}
                      style={{
                        background: isDone ? '#0d9488' : isActive ? '#0d9488' : 'var(--border)',
                        color: isActive || isDone ? 'white' : 'var(--text-muted)',
                      }}>
                      {isDone ? '✓' : stepNum}
                    </div>
                    <span className="text-xs font-medium" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-6xl mx-auto">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </main>
    </div>
  )
}
