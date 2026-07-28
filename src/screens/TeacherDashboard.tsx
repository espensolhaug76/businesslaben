import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'
import { signOut } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { getLessonsBySubject } from '../data/lessons'
import type { Lesson } from '../data/lessons'
import type { TeacherQuestion, StudentAnswer } from '../types/TeacherQuestions'
import ThemeToggle, { useThemeEffect } from '../components/ui/ThemeToggle'
import { ALL_MODULES, MODULE_SECTIONS } from './learninghub/LearningHub'
import type { ModuleCard } from './learninghub/LearningHub'
import { TEACHER_MODULE_PHASES } from './learninghub/shared/teacherModuleRegistry'
import type { DrawerPhase, DrawerExercise } from './learninghub/shared/DrawerModule'
import LiveOktTab from './teacher/LiveOktTab'
import LeaderboardTab from './teacher/LeaderboardTab'
import TemaAktiveringPanel from './teacher/TemaAktiveringPanel'
import KonkurranserTab from './teacher/KonkurranserTab'
import { MINE_FAG_OPTIONS, subjectToSectionKey } from '../lib/teacherSubjects'
import { ALL_PRESENTATIONS, PRESENTATION_SECTIONS } from '../lib/presentationRegistry'
import { STANDARD_EXAMS } from '../data/standardExams'
import { examFromStandard, type Exam, type StandardExam } from '../types/Exam'
import { publishExam, generateExamCode, deleteExam as deleteExamFromRtdb, subscribeToExamSubmissions } from '../lib/firebaseExams'
import {
  TeacherClassProvider, useTeacherClass, generateClassroomCode,
  type TeacherClass,
} from './teacher/TeacherClassContext'
import KlasseLinje from './teacher/KlasseLinje'

// ── Teacher custom exercise type ──────────────────────────────────────────────
interface TeacherCustomExercise {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  createdAt: string
}

function customKey(storageKey: string, classCode: string) {
  return `adventure-teacher-custom-${storageKey}-${classCode}`
}

const subjects = [
  { id: 'mfl1', name: 'Markedsf\u00F8ring og ledelse 1 (Vision 1)', short: 'MFL1' },
  { id: 'ssr_mi', name: 'Markedsf\u00F8ring og innovasjon (SSR)', short: 'SSR-MI' },
  { id: 'ssr_fd', name: 'Forretningsdrift (SSR)', short: 'SSR-FD' },
  { id: 'ssr_ks', name: 'Kultur og samhandling (SSR)', short: 'SSR-KS' },
  { id: 'ent1', name: 'Entrepren\u00F8rskap og bedriftsutvikling 1', short: 'ENT1' },
] as const


const OPTION_COLORS = ['bg-red-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500']
// const OPTION_COLORS_DIM = ['bg-red-500/20', 'bg-blue-500/20', 'bg-amber-500/20', 'bg-purple-500/20']
const OPTION_TEXT = ['text-red-600', 'text-blue-600', 'text-amber-600', 'text-purple-600']

// const SUBJECT_SQUARE_COLORS: Record<string, string> = { forretningsdrift: 'bg-teal-500', mfi: 'bg-orange-500', kultur: 'bg-purple-500', ml1: 'bg-blue-500' }

const SUBJECT_HEX_COLORS: Record<string, string> = {
  forretningsdrift: '#0d9488',
  mfi: '#d97706',
  kultur: '#7c3aed',
  ml1: '#2563eb',
}

function answersKey(code: string) {
  return `adventure-student-answers-${code.toUpperCase()}`
}

// ── Kahoot fullscreen view ────────────────────────────────────────────────────

function KahootResultsView({
  questions,
  answers,
  onClose,
}: {
  questions: TeacherQuestion[]
  answers: StudentAnswer[]
  onClose: () => void
}) {
  const [idx, setIdx] = useState(0)
  const allQ = questions // show all question types

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setIdx(i => Math.min(allQ.length - 1, i + 1))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setIdx(i => Math.max(0, i - 1))
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [allQ.length, onClose])

  if (allQ.length === 0) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white">
        <p className="text-2xl text-slate-400">Ingen spørsmål å vise</p>
        <button onClick={onClose} className="mt-6 px-6 py-2 rounded-xl bg-slate-700 text-white font-bold">Lukk</button>
      </div>
    )
  }

  const q = allQ[idx]
  const qAnswers = answers.filter(a => a.questionId === q.id)
  const uniqueStudents = new Set(qAnswers.map(a => a.studentName)).size

  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col p-8 select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm font-semibold">
            Spørsmål {idx + 1} / {allQ.length}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
            q.type === 'open_ended'
              ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
          }`}>
            {q.type === 'open_ended' ? 'Åpent' : 'Flervalg'}
          </span>
          <span className="text-slate-500 text-sm">{uniqueStudents} svar</span>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-colors"
        >
          ✕ Lukk
        </button>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white leading-tight">{q.questionText}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {q.type === 'multiple_choice' && q.options ? (
          <MCChart q={q} qAnswers={qAnswers} />
        ) : (
          <OpenAnswerList qAnswers={qAnswers} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
        <button
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-30"
        >
          ← Forrige
        </button>
        <div className="flex gap-1.5">
          {allQ.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? 'bg-teal-400 w-6' : 'bg-slate-700 hover:bg-slate-600'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx(i => Math.min(allQ.length - 1, i + 1))}
          disabled={idx === allQ.length - 1}
          className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-30"
        >
          Neste →
        </button>
      </div>
    </div>
  )
}

function MCChart({ q, qAnswers }: { q: TeacherQuestion; answers?: StudentAnswer[]; qAnswers: StudentAnswer[] }) {
  const options = q.options ?? []
  const counts = options.map((_, i) => qAnswers.filter(a => a.selectedOptionIndex === i).length)
  const maxCount = Math.max(...counts, 1)
  const totalAnswers = qAnswers.length
  const correctCount = q.correctOptionIndex !== undefined
    ? qAnswers.filter(a => a.selectedOptionIndex === q.correctOptionIndex).length
    : 0

  return (
    <div className="space-y-4">
      {options.map((opt, i) => {
        const count = counts[i]
        const isCorrect = i === q.correctOptionIndex
        const barPct = Math.round((count / maxCount) * 100)

        return (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-3">
              <span className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-white ${
                isCorrect ? 'bg-emerald-500' : OPTION_COLORS[i % 4]
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className={`flex-1 text-lg font-semibold ${isCorrect ? 'text-emerald-300' : 'text-white'}`}>
                {opt}
                {isCorrect && <span className="ml-2 text-emerald-400 text-sm">✓ Riktig</span>}
              </span>
              <span className="text-2xl font-extrabold text-white w-12 text-right">{count}</span>
            </div>
            <div className="ml-12 h-8 bg-slate-800 rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${barPct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`h-full rounded-lg ${isCorrect ? 'bg-emerald-500' : OPTION_COLORS[i % 4]}`}
              />
            </div>
          </div>
        )
      })}

      {/* Summary */}
      {q.correctOptionIndex !== undefined && totalAnswers > 0 && (
        <div className="mt-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-emerald-400">{correctCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">riktige svar</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-red-400">{totalAnswers - correctCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">feil svar</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-teal-400">
              {totalAnswers > 0 ? Math.round((correctCount / totalAnswers) * 100) : 0}%
            </p>
            <p className="text-xs text-slate-400 mt-0.5">svarte riktig</p>
          </div>
        </div>
      )}
    </div>
  )
}

function OpenAnswerList({ qAnswers }: { qAnswers: StudentAnswer[] }) {
  if (qAnswers.length === 0) {
    return <p className="text-slate-500 text-lg">Ingen elever har svart ennå.</p>
  }
  return (
    <div className="space-y-3">
      {qAnswers.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-4"
        >
          <p className="text-teal-400 text-sm font-bold mb-1">{a.studentName}</p>
          <p className="text-white text-base leading-relaxed">{a.answerText}</p>
        </motion.div>
      ))}
    </div>
  )
}

// ── KlasserTab ────────────────────────────────────────────────────────────────

interface StudentProgress {
  studentName: string
  lastActive: string
  modules: Record<string, { title: string; score: number; total: number; date: string }>
}

function KlasserTab({ onStartLiveOkt }: { onStartLiveOkt?: () => void } = {}) {
  // Klasselista og aktiv klasse eies av TeacherClassContext, slik at
  // klassechipsene her og nedtrekket i klasselinja er samme tilstand.
  const { classes, replaceClasses, activeCode, activeClass, setActiveCode } = useTeacherClass()
  const [students, setStudents] = useState<StudentProgress[]>([])
  const [copiedCode, setCopiedCode] = useState('')
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editSubject, setEditSubject] = useState('')
  const [editSchool, setEditSchool] = useState('')
  const [editTeacher, setEditTeacher] = useState('')
  // Uten klasser går fanen rett i «ny klasse»-skjemaet — det er hele poenget
  // med å komme hit fra velkomst-tomtilstanden.
  const [addingClass, setAddingClass] = useState(() => classes.length === 0)
  const [newName, setNewName] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [newSchool, setNewSchool] = useState('')
  const [newTeacher, setNewTeacher] = useState('')
  const unsubRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (unsubRef.current) { unsubRef.current(); unsubRef.current = null }
    if (!activeClass) return
    const studentsRef = ref(db, `students/${activeClass.code}`)
    unsubRef.current = onValue(studentsRef, snapshot => {
      const val = snapshot.val() as Record<string, StudentProgress> | null
      if (!val) { setStudents([]); return }
      const found = Object.values(val).filter(Boolean) as StudentProgress[]
      found.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
      setStudents(found)
    })
    return () => { if (unsubRef.current) { unsubRef.current(); unsubRef.current = null } }
  }, [activeClass?.code])

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(''), 2000)
    })
  }

  function startEdit() {
    if (!activeClass) return
    setEditName(activeClass.name)
    setEditSubject(activeClass.subject ?? '')
    setEditSchool(activeClass.schoolName ?? '')
    setEditTeacher(activeClass.teacherName ?? '')
    setEditing(true)
  }

  function saveEdit() {
    if (!activeClass) return
    replaceClasses(classes.map(c => c.code === activeClass.code
      ? {
          ...c,
          name: editName.trim() || c.name,
          subject: editSubject,
          schoolName: editSchool.trim(),
          teacherName: editTeacher.trim(),
        }
      : c))
    setEditing(false)
  }

  function confirmAddClass() {
    if (classes.length >= 4) return
    const newClass: TeacherClass = {
      code: generateClassroomCode(),
      name: newName.trim() || `Klasse ${classes.length + 1}`,
      subject: newSubject,
      schoolName: newSchool.trim(),
      teacherName: newTeacher.trim(),
    }
    replaceClasses([...classes, newClass])
    setActiveCode(newClass.code)
    setAddingClass(false)
    setNewName('')
    setNewSubject('')
    setNewSchool('')
    setNewTeacher('')
  }

  function deleteClass(code: string) {
    if (classes.length <= 1) return
    const cls = classes.find(c => c.code === code)
    if (!cls) return
    if (!window.confirm(`Slett ${cls.name}? Kan ikke angres.`)) return
    const updated = classes.filter(c => c.code !== code)
    replaceClasses(updated)
    if (activeCode === code && updated[0]) setActiveCode(updated[0].code)
  }

  function startLiveOkt() {
    if (!activeClass) return
    setActiveCode(activeClass.code)
    onStartLiveOkt?.()
  }

  const inpStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-primary)',
    color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none',
  }

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Class tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {classes.map(cls => {
          const subj = MINE_FAG_OPTIONS.find(o => o.id === cls.subject)
          const erAktiv = cls.code === activeClass?.code
          return (
            <button
              key={cls.code}
              onClick={() => { setActiveCode(cls.code); setEditing(false) }}
              style={{
                padding: '8px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                border: erAktiv ? '2px solid #0d9488' : '1px solid var(--border)',
                background: erAktiv ? 'rgba(13,148,136,0.1)' : 'var(--card-bg)',
                color: erAktiv ? '#0d9488' : 'var(--text-muted)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
              }}
            >
              <span>{cls.name}</span>
              {subj && <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}>{subj.short}</span>}
            </button>
          )
        })}
        {classes.length > 0 && classes.length < 4 && !addingClass && (
          <button
            onClick={() => setAddingClass(true)}
            style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, cursor: 'pointer', border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-muted)' }}
          >
            + Legg til klasse
          </button>
        )}
      </div>

      {/* Add class form */}
      {addingClass && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Ny klasse</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Skolenavn (vises på nasjonalt leaderboard)</label>
              <input value={newSchool} onChange={e => setNewSchool(e.target.value)} placeholder="f.eks. Sentrum VGS, Hamar katedralskole" style={inpStyle} autoFocus />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Lærerens fornavn (frivillig)</label>
              <input value={newTeacher} onChange={e => setNewTeacher(e.target.value)} placeholder="f.eks. Marte" style={inpStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Klassenavn (f.eks. 2STB)</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Klassenavn" style={inpStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Fag</label>
              <select value={newSubject} onChange={e => setNewSubject(e.target.value)} style={inpStyle}>
                <option value="">Velg fag...</option>
                {MINE_FAG_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={confirmAddClass}
                disabled={!newSchool.trim()}
                style={{
                  background: newSchool.trim() ? '#0d9488' : '#d1d5db',
                  color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px',
                  fontSize: 14, fontWeight: 600, cursor: newSchool.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Opprett klasse
              </button>
              {classes.length > 0 && (
                <button onClick={() => setAddingClass(false)} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 16px', fontSize: 14, color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Avbryt
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active class card */}
      {activeClass && !editing && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', margin: 0 }}>Klassekode</p>
                {activeClass.subject && (
                  <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(13,148,136,0.1)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)', borderRadius: 6, padding: '2px 8px' }}>
                    {MINE_FAG_OPTIONS.find(o => o.id === activeClass.subject)?.short ?? activeClass.subject}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 36, fontWeight: 800, letterSpacing: '0.25em', color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'monospace', margin: '0 0 4px' }}>{activeClass.name}</p>
              <p style={{ fontSize: 48, fontWeight: 800, letterSpacing: '0.25em', color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'monospace' }}>{activeClass.code}</p>
              {(activeClass.schoolName || activeClass.teacherName) && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>
                  {activeClass.schoolName ? <><strong style={{ color: 'var(--text-primary)' }}>{activeClass.schoolName}</strong>{activeClass.teacherName && ' · '}</> : null}
                  {activeClass.teacherName && <span>Lærer: {activeClass.teacherName}</span>}
                </p>
              )}
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Elevene går til <strong>businesslaben.no</strong> og skriver inn denne koden</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={startLiveOkt} style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                ▶ Start live økt
              </button>
              <button onClick={() => copyCode(activeClass.code)} style={{ background: copiedCode === activeClass.code ? '#dcfce7' : 'var(--accent)', color: copiedCode === activeClass.code ? '#166534' : '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {copiedCode === activeClass.code ? '✓ Kopiert!' : 'Kopier kode'}
              </button>
              <button onClick={startEdit} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: 'var(--text-muted)', cursor: 'pointer' }}>
                ✏ Rediger klasse
              </button>
              {classes.length > 1 && (
                <button onClick={() => deleteClass(activeClass.code)} style={{ background: 'transparent', border: '1px solid #fca5a5', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#ef4444', cursor: 'pointer' }}>
                  Slett klasse
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit class form */}
      {activeClass && editing && (
        <div style={{ background: 'var(--card-bg)', border: '2px solid #0d9488', borderRadius: 16, padding: '20px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Rediger klasse</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Skolenavn (vises på nasjonalt leaderboard)</label>
              <input value={editSchool} onChange={e => setEditSchool(e.target.value)} placeholder="f.eks. Sentrum VGS, Hamar katedralskole" style={inpStyle} autoFocus />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Lærerens fornavn (frivillig)</label>
              <input value={editTeacher} onChange={e => setEditTeacher(e.target.value)} placeholder="f.eks. Marte" style={inpStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Klassenavn</label>
              <input value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveEdit()} style={inpStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Fag</label>
              <select value={editSubject} onChange={e => setEditSubject(e.target.value)} style={inpStyle}>
                <option value="">Velg fag...</option>
                {MINE_FAG_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={saveEdit} style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Lagre
              </button>
              <button onClick={() => setEditing(false)} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 16px', fontSize: 14, color: 'var(--text-muted)', cursor: 'pointer' }}>
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elevliste — først når det finnes en klasse å vise elever for */}
      {activeClass && (
      <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
          Elever ({students.length})
        </h3>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>● live</span>
      </div>

      {students.length === 0 ? (
        <div style={{ background: 'var(--card-bg)', border: '1px dashed var(--border)', borderRadius: 12, padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>👥</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Ingen elever har fullført en modul ennå.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Del klassekoden <strong>{activeClass?.code}</strong> med elevene dine.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {students.map(student => {
            const modules = student.modules ?? {}
            const completedCount = Object.keys(modules).length
            const totalScore = Object.values(modules).reduce((s, m) => s + m.score, 0)
            const totalMax = Object.values(modules).reduce((s, m) => s + m.total, 0)
            const pct = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0
            const lastActive = student.lastActive ? new Date(student.lastActive).toLocaleDateString('nb', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'

            return (
              <div key={student.studentName} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(13,148,136,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#0d9488', fontWeight: 700 }}>
                      {student.studentName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{student.studentName}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sist aktiv: {lastActive}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 20, fontWeight: 800, color: '#0d9488' }}>{pct}%</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{completedCount} moduler fullført</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 10 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#0d9488', borderRadius: 3, transition: 'width 0.4s' }} />
                </div>
                {/* Module list */}
                {Object.entries(modules).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {Object.entries(modules).map(([key, mod]) => (
                      <span key={key} style={{ fontSize: 11, background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)', borderRadius: 6, padding: '3px 8px' }}>
                        {mod.title} {mod.score}/{mod.total}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      </>
      )}
    </div>
  )
}

// ── Navigasjon: fire hovedområder med underfaner (spor D, steg 1) ─────────────

type SubTabId =
  | 'live' | 'konkurranser'
  | 'laeringsinnhold' | 'spillet'
  | 'prover' | 'sporsmal'
  | 'elever' | 'leaderboard'

interface HovedOmrade {
  id: string
  label: string
  subs: SubTabId[]
}

const OMRADER: HovedOmrade[] = [
  { id: 'i-timen',   label: 'I timen',   subs: ['live', 'konkurranser'] },
  { id: 'innhold',   label: 'Innhold',   subs: ['laeringsinnhold', 'spillet'] },
  { id: 'vurdering', label: 'Vurdering', subs: ['prover', 'sporsmal'] },
  { id: 'klassen',   label: 'Klassen',   subs: ['elever', 'leaderboard'] },
]

const SUB_LABELS: Record<SubTabId, string> = {
  live: 'Live økt',
  konkurranser: 'Konkurranser',
  laeringsinnhold: 'Læringsinnhold',
  spillet: 'Spillstyring',
  prover: 'Prøver',
  sporsmal: 'Spørsmål',
  elever: 'Klasser',
  leaderboard: 'Nasjonalt leaderboard',
}

/** Grå beskrivelseslinje under nivå 2-pillene (erstatter hover-tooltipene). */
const SUB_BESKRIVELSER: Record<SubTabId, string> = {
  live: 'Start en presentasjon, minileksjon eller spilløkt som elevene følger i sanntid.',
  konkurranser: 'Kahoot-stil konkurranse med ledertavle for klassen.',
  laeringsinnhold: 'Bla i minileksjoner og presentasjoner.',
  spillet: 'Styr hvilke fag og temaer klassen møter i spillet.',
  prover: 'Digitale prøver med tid, kode og resultater.',
  sporsmal: 'Elevene svarer skriftlig i spillet, du gir tilbakemelding. Skal du ha prøve med tid og karakter, bruk Prøver.',
  elever: 'Opprett klasser, del klassekode og følg elevenes fremgang.',
  leaderboard: 'Sammenlign klassen med andre skoler.',
}

/**
 * Dyplenke-mapping: `/teacher?fane=<id>` lander på riktig underfane. Ingen
 * lenker i kodebasen brukte faneparametre før omleggingen, men gamle fanenavn
 * (inkludert «spillet», som nå heter Spillstyring) godtas her slik at bokmerker
 * og delte lenker fortsatt virker.
 */
const LEGACY_FANE_MAP: Record<string, SubTabId> = {
  live: 'live',
  'live-okt': 'live',
  konkurranser: 'konkurranser',
  laeringsinnhold: 'laeringsinnhold',
  spillet: 'spillet',
  spillstyring: 'spillet',
  prover: 'prover',
  sporsmal: 'sporsmal',
  elever: 'elever',
  klasser: 'elever',
  leaderboard: 'leaderboard',
}

function omradeForSub(sub: SubTabId): HovedOmrade {
  return OMRADER.find(o => o.subs.includes(sub)) ?? OMRADER[0]
}

/**
 * Nivåfilter i Læringsinnhold — REN VISNINGSFILTER for læreren. Rører verken
 * klassens nivå eller noe som skrives til Firebase. Vises kun når «Mine fag»
 * står på «Alle fag»; er et konkret fag valgt, ligger nivået allerede i
 * fagkoden og to filtre ville motsagt hverandre.
 */
type NivaaFilter = 'alle' | 'vg1' | 'vg2' | 'vg3'

const NIVAA_FILTRE: { id: NivaaFilter; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'vg1', label: 'VG1' },
  { id: 'vg2', label: 'VG2' },
  { id: 'vg3', label: 'VG3' },
]

// ── Teacher Dashboard ─────────────────────────────────────────────────────────

export default function TeacherDashboard() {
  return (
    <TeacherClassProvider>
      <TeacherDashboardInner />
    </TeacherClassProvider>
  )
}

function TeacherDashboardInner() {
  useThemeEffect()
  const navigate = useNavigate()

  // Auth guard — redirect to landing if not logged in
  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/')
    }
  }, [navigate])

  // Logout handler
  async function handleLogout() {
    await signOut(auth)
    localStorage.removeItem('adventure-teacher-email')
    localStorage.removeItem('adventure-teacher-school')
    navigate('/')
  }

  // Aktiv underfane. Standard ved innlasting: I timen / Live økt.
  const [activeTab, setActiveTab] = useState<SubTabId>(() => {
    const fane = new URLSearchParams(window.location.search).get('fane')
    return (fane && LEGACY_FANE_MAP[fane.toLowerCase()]) || 'live'
  })
  const aktivtOmrade = omradeForSub(activeTab)

  // Global klassetilstand (klasselinja) — deles av alle faner.
  const { activeCode: classroomCode, mySubjects, resetMySubjects, liveActive, ingenKlasser } = useTeacherClass()

  // Velkomst-tomtilstand: vises til læreren har opprettet sin første klasse.
  const noClassesExist = ingenKlasser
  // Fanene under trenger en klassekode for å ha noe å vise eller skrive til.
  const KREVER_KLASSE: SubTabId[] = ['live', 'sporsmal', 'spillet', 'leaderboard']
  const manglerKlasse = ingenKlasser && KREVER_KLASSE.includes(activeTab)
  const gaaTilOpprettKlasse = () => setActiveTab('elever')
  const [learningSubTab, setLearningSubTab] = useState<'minileksjoner' | 'presentasjoner'>('minileksjoner')
  const [nivaaFilter, setNivaaFilter] = useState<NivaaFilter>('alle')
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('mfl1')
  const store = useGameStore()

  // Per-module visibility for students in this classroom
  const [moduleVisibility, setModuleVisibility] = useState<Record<string, boolean>>({})

  // Last synlighet på nytt når aktiv klasse endres (klasselinja bytter kode).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`adventure-modules-${classroomCode}`)
      setModuleVisibility(saved ? JSON.parse(saved) : {})
    } catch { setModuleVisibility({}) }
  }, [classroomCode])

  // Persist classroom subject so students can inherit it
  useEffect(() => {
    localStorage.setItem(`adventure-classroom-subject-${classroomCode}`, selectedSubject)
  }, [selectedSubject, classroomCode])

  // Questions
  const [questions, setQuestions] = useState<TeacherQuestion[]>(() => {
    const saved = localStorage.getItem('teacher-questions')
    return saved ? JSON.parse(saved) : []
  })

  // Student answers (from classroom-specific key)
  const [studentAnswers, setStudentAnswers] = useState<StudentAnswer[]>(() => {
    const saved = localStorage.getItem(answersKey(classroomCode))
    return saved ? JSON.parse(saved) : []
  })

  const [teacherComments, setTeacherComments] = useState<Record<string, string>>({})
  const [showKahoot, setShowKahoot] = useState(false)

  // Derived filters from Mine fag selection («Mine fag» bor nå i klasselinja)
  const selectedFagOptions = mySubjects.length > 0
    ? MINE_FAG_OPTIONS.filter(o => mySubjects.includes(o.id))
    : MINE_FAG_OPTIONS // all if none selected

  const filteredLessonSubjects = mySubjects.length > 0
    ? subjects.filter(s => selectedFagOptions.some(o => o.lessonSubject === s.id))
    : subjects

  // Seksjonsnøkler på formen `${level}|${subject}|${ssrSubject}` — samme format
  // som MODULE_SECTIONS og PRESENTATION_SECTIONS. (Tidligere ble `moduleKey`
  // sammenlignet med `${subject}-${level}`, som nesten aldri matchet; se steg 4
  // i rapporten.)
  const activeSectionKeys = mySubjects.length > 0
    ? new Set(selectedFagOptions.map(o => subjectToSectionKey(o.id)).filter((k): k is string => k !== null))
    : null // null means show all

  const mineFagEtikett = selectedFagOptions.map(o => o.short).join(', ')

  // Nivåfilteret gjelder kun når «Mine fag» står på «Alle fag».
  const nivaaFilterAktivt = mySubjects.length === 0
  const aktivtNivaa: NivaaFilter = nivaaFilterAktivt ? nivaaFilter : 'alle'

  /** Tom-tilstand for Læringsinnhold: forklarer HVILKET filter som tømte lista. */
  function tomTilstand(hva: 'minileksjoner' | 'presentasjoner') {
    if (mySubjects.length > 0) {
      return { melding: `Ingen ${hva} i ${mineFagEtikett}.`, knapp: 'Vis alle fag', onKlikk: resetMySubjects }
    }
    if (aktivtNivaa !== 'alle') {
      return { melding: `Ingen ${hva} på ${aktivtNivaa.toUpperCase()}.`, knapp: 'Vis alle nivåer', onKlikk: () => setNivaaFilter('alle') }
    }
    return { melding: `Ingen ${hva} å vise.`, knapp: null, onKlikk: () => {} }
  }

  const activeSporsmalFags = mySubjects.length > 0
    ? [...new Set(selectedFagOptions.map(o => o.sporsmalFag).filter((f): f is string => f !== null))]
    : null // null means show all

  // If selectedSubject is filtered out by Mine fag, reset to first available
  useEffect(() => {
    if (filteredLessonSubjects.length > 0 && !filteredLessonSubjects.some(s => s.id === selectedSubject)) {
      setSelectedSubject(filteredLessonSubjects[0].id)
    }
  }, [filteredLessonSubjects, selectedSubject])

  // Question builder
  const [qType, setQType] = useState<'multiple_choice' | 'open_ended'>('open_ended')
  const [qText, setQText] = useState('')
  const [qModelAnswer, setQModelAnswer] = useState('')
  const [qOptions, setQOptions] = useState(['', '', '', ''])
  const [qCorrectIndex, setQCorrectIndex] = useState(0)
  const [qFag, setQFag] = useState<string>('')
  const [qModuleRoute, setQModuleRoute] = useState<string>('')

  useEffect(() => {
    localStorage.setItem('teacher-questions', JSON.stringify(questions))
  }, [questions])

  const refreshAnswers = useCallback(() => {
    const saved = localStorage.getItem(answersKey(classroomCode))
    if (saved) setStudentAnswers(JSON.parse(saved))
    else setStudentAnswers([])
  }, [classroomCode])

  // Listen for cross-tab storage updates
  useEffect(() => {
    const key = answersKey(classroomCode)
    function onStorage(e: StorageEvent) {
      if (e.key === key) refreshAnswers()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [classroomCode, refreshAnswers])

  // Refresh when switching to sporsmal tab
  useEffect(() => {
    if (activeTab === 'sporsmal') refreshAnswers()
  }, [activeTab, refreshAnswers])

  function handleAddQuestion() {
    if (!qText.trim()) return

    let options: string[] | undefined
    let correctOptionIndex: number | undefined

    if (qType === 'multiple_choice') {
      const filled = qOptions.map((t, i) => ({ text: t.trim(), origIdx: i })).filter(o => o.text)
      if (filled.length < 2) return
      options = filled.map(o => o.text)
      const mappedCorrect = filled.findIndex(o => o.origIdx === qCorrectIndex)
      correctOptionIndex = mappedCorrect >= 0 ? mappedCorrect : 0
    }

    const newQ: TeacherQuestion = {
      id: Date.now().toString(),
      type: qType,
      questionText: qText.trim(),
      modelAnswer: qType === 'open_ended' ? qModelAnswer.trim() || undefined : undefined,
      options,
      correctOptionIndex,
      createdAt: new Date().toISOString(),
      subject: selectedSubject,
      moduleRoute: qModuleRoute || undefined,
    }
    setQuestions(prev => [...prev, newQ])
    setQText('')
    setQModelAnswer('')
    setQOptions(['', '', '', ''])
    setQCorrectIndex(0)
    setQFag('')
    setQModuleRoute('')
  }

  function handleDeleteQuestion(id: string) {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  function handleOpenSporsmalWithModule(moduleRoute: string, fag: string) {
    setActiveTab('sporsmal')
    setQFag(fag)
    setQModuleRoute(moduleRoute)
    setShowAddQuestion(true)
  }

  function handleSaveComment(answerId: string) {
    const comment = teacherComments[answerId]
    if (!comment?.trim()) return
    const updated = studentAnswers.map(a =>
      `${a.questionId}-${a.studentName}-${a.submittedAt}` === answerId
        ? { ...a, teacherComment: comment.trim() }
        : a
    )
    setStudentAnswers(updated)
    localStorage.setItem(answersKey(classroomCode), JSON.stringify(updated))
  }

  const subjectLessons = getLessonsBySubject(selectedSubject as Lesson['subject'])
  const activeCount = subjectLessons.filter((l) => store.activeLessons.includes(l.id)).length
  const completedCount = subjectLessons.filter((l) => store.completedLessons.includes(l.id)).length

  const isAddDisabled =
    !qText.trim() ||
    (qType === 'multiple_choice' && qOptions.filter(o => o.trim()).length < 2)

  return (
    <div className="min-h-screen text-gray-900" style={{ background: 'var(--bg-primary)' }}>
      {showKahoot && (
        <KahootResultsView
          questions={questions}
          answers={studentAnswers}
          onClose={() => setShowKahoot(false)}
        />
      )}

      {/* Global nav header */}
      <div className="px-4" style={{ background: "var(--card-bg)", borderBottom: '0.5px solid rgba(0,0,0,0.08)', height: '52px', display: 'flex', alignItems: 'center' }}>
        <div className="mx-auto flex items-center justify-between gap-3 w-full" style={{ maxWidth: 1000 }}>
          <span className="text-base font-medium shrink-0" style={{ color: '#0d9488' }}>Businesslaben</span>
          <nav className="hidden sm:flex items-center gap-6">
            <button onClick={() => navigate('/learning')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Læringsmoduler</button>
            <span className="text-sm font-medium" style={{ color: '#0d9488', borderBottom: '2px solid #0d9488', paddingBottom: '2px' }}>Lærer</span>
            <button onClick={() => navigate('/forum')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Forum</button>
            <button onClick={() => navigate('/desktop')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Spillet</button>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="text-sm font-medium px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Logg ut"
            >
              Logg ut
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-6" style={{ maxWidth: 1000 }}>
        {/* Page heading row — live-pillen ligger nå her, ikke i viewport-kanten */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '18px' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>Lærer-dashboard</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Aktiver innhold og følg elevenes fremgang</p>
          </div>
          {liveActive && (
            <button
              onClick={() => setActiveTab('live')}
              title="Gå til Live økt"
              style={{
                flexShrink: 0, marginTop: 4, background: 'rgba(13,148,136,0.12)', color: '#0f766e',
                border: '1px solid rgba(13,148,136,0.35)', borderRadius: 999, padding: '6px 14px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              Live økt
            </button>
          )}
        </div>

        {/* Global klasselinje (steg 2) */}
        <KlasseLinje onOpprettKlasse={gaaTilOpprettKlasse} />

        {/* Velkommen-state for nye lærere uten klasser */}
        {noClassesExist && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(13,148,136,0.08), rgba(99,102,241,0.06))',
            border: '1px solid rgba(13,148,136,0.25)',
            borderRadius: 16,
            padding: '28px 24px',
            marginBottom: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👋</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
              Velkommen til Businesslaben!
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
              La oss komme i gang. Opprett din første klasse for å koble den til et fag.
            </p>
            <button
              onClick={gaaTilOpprettKlasse}
              style={{
                background: '#0d9488', color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0f766e' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0d9488' }}
            >
              Opprett første klasse →
            </button>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '14px 0 0' }}>
              Eller utforsk plattformen først via <button onClick={() => setActiveTab('laeringsinnhold')} style={{ background: 'none', border: 'none', color: '#0d9488', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Læringsinnhold-fanen</button>.
            </p>
          </div>
        )}

        {/* Nivå 1 — hovedområder (understrek på aktivt område) */}
        <div
          role="tablist"
          aria-label="Hovedområder"
          style={{ display: 'flex', gap: '28px', borderBottom: '1px solid var(--border)', marginBottom: '16px', flexWrap: 'wrap' }}
        >
          {OMRADER.map(omr => {
            const erAktiv = omr.id === aktivtOmrade.id
            return (
              <button
                key={omr.id}
                role="tab"
                aria-selected={erAktiv}
                onClick={() => setActiveTab(omr.subs[0])}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  padding: '0 0 10px', fontSize: '15px',
                  fontWeight: erAktiv ? 600 : 500,
                  color: erAktiv ? 'var(--text-primary)' : 'var(--text-muted)',
                  borderBottom: erAktiv ? '2px solid #0d9488' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {omr.label}
              </button>
            )
          })}
        </div>

        {/* Nivå 2 — underfaner som piller */}
        <div role="tablist" aria-label={aktivtOmrade.label} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {aktivtOmrade.subs.map(sub => {
            const erAktiv = sub === activeTab
            return (
              <button
                key={sub}
                role="tab"
                aria-selected={erAktiv}
                onClick={() => setActiveTab(sub)}
                style={{
                  padding: '6px 16px', borderRadius: '999px', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: '14px', fontWeight: erAktiv ? 600 : 500,
                  border: erAktiv ? '1px solid #0d9488' : '1px solid var(--border)',
                  background: erAktiv ? 'rgba(13,148,136,0.10)' : 'var(--card-bg)',
                  color: erAktiv ? '#0d9488' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', gap: '7px',
                }}
              >
                {SUB_LABELS[sub]}
                {sub === 'live' && liveActive && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Beskrivelse av aktiv underfane (erstatter hover-tooltipene) */}
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px', maxWidth: '70ch' }}>
          {SUB_BESKRIVELSER[activeTab]}
        </p>

        {manglerKlasse && <KreverKlasse onOpprett={gaaTilOpprettKlasse} />}

        {!manglerKlasse && activeTab === 'spillet' && (
          <>
            {/* Tema-aktivering per klasse (KODEKART steg 1) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-6"
            >
              <TemaAktiveringPanel />
            </motion.div>

            {/* ── SEKSJON 3: Innholdspakke ─────────────────────────────── */}
            <section className="bg-white rounded-2xl p-5 border border-gray-200 mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Innholdspakke</h3>
              <p className="text-xs text-gray-500 mb-4 leading-snug">
                Velg hvilken bok/fagpakke leksjonslista under gjelder for, og styr
                hvilke leksjoner som er åpne for elevene.
              </p>

            {/* Subject selector */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Velg fag / bok
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filteredLessonSubjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                      selectedSubject === sub.id
                        ? 'border-teal-400 bg-teal-50 text-teal-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{sub.short}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{sub.name}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stats bar + Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-gray-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
            >
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Totalt: </span>
                  <span className="font-medium text-gray-900">{subjectLessons.length} leksjoner</span>
                </div>
                <div>
                  <span className="text-gray-400">Aktive: </span>
                  <span className="font-medium text-teal-600">{activeCount}</span>
                </div>
                <div>
                  <span className="text-gray-400">Fullført: </span>
                  <span className="font-medium text-emerald-600">{completedCount}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => store.activateAllLessons(subjectLessons)}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors border border-teal-200"
                >
                  Åpne alle
                </button>
                <button
                  onClick={() => store.deactivateAllLessons()}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                >
                  Lukk alle
                </button>
              </div>
            </motion.div>

            {/* Lesson list */}
            <div className="space-y-3">
              {subjectLessons.map((lesson, i) => (
                <LessonCard key={lesson.id} lesson={lesson} index={i} />
              ))}
            </div>
            {subjectLessons.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                Ingen leksjoner registrert for dette faget enn&aring;.
              </div>
            )}
            </section>
          </>
        )}

        {activeTab === 'laeringsinnhold' && (
          <>
            {/* Sub-tab selector + nivåfilter */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setLearningSubTab('minileksjoner')}
                style={{
                  padding: '5px 14px', borderRadius: '20px', border: 'none',
                  background: learningSubTab === 'minileksjoner' ? '#0d9488' : 'transparent',
                  color: learningSubTab === 'minileksjoner' ? '#fff' : 'var(--text-muted)',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Minileksjoner
              </button>
              <button
                onClick={() => setLearningSubTab('presentasjoner')}
                style={{
                  padding: '5px 14px', borderRadius: '20px', border: 'none',
                  background: learningSubTab === 'presentasjoner' ? '#0d9488' : 'transparent',
                  color: learningSubTab === 'presentasjoner' ? '#fff' : 'var(--text-muted)',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Presentasjoner
              </button>

              {/* Nivåfilter — kun når «Mine fag» står på «Alle fag». Ren
                  visningsfilter; rører ikke klassens nivå eller Firebase. */}
              {nivaaFilterAktivt && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12, paddingLeft: 14, borderLeft: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Nivå
                  </span>
                  <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    {NIVAA_FILTRE.map(n => (
                      <button
                        key={n.id}
                        onClick={() => setNivaaFilter(n.id)}
                        style={{
                          padding: '4px 11px', fontSize: 12, fontWeight: 600, border: 'none',
                          cursor: 'pointer', fontFamily: 'inherit',
                          background: nivaaFilter === n.id ? '#0d9488' : 'transparent',
                          color: nivaaFilter === n.id ? '#fff' : 'var(--text-muted)',
                        }}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {learningSubTab === 'minileksjoner' && (
              <MinileksjonsTab
                classroomCode={classroomCode}
                moduleVisibility={moduleVisibility}
                questions={questions}
                onOpenSporsmalWithModule={handleOpenSporsmalWithModule}
                mineFagSectionKeys={activeSectionKeys}
                nivaaFilter={aktivtNivaa}
                tom={tomTilstand('minileksjoner')}
                onToggle={(route) => {
                  setModuleVisibility(prev => {
                    if (route === '__reset_all__') {
                      localStorage.removeItem(`adventure-modules-${classroomCode}`)
                      return {}
                    }
                    const visible = prev[route] !== false
                    const next = { ...prev, [route]: !visible }
                    localStorage.setItem(`adventure-modules-${classroomCode}`, JSON.stringify(next))
                    return next
                  })
                }}
              />
            )}

            {learningSubTab === 'presentasjoner' && (
              <PresentasjonerVisning
                mineFagSectionKeys={activeSectionKeys}
                nivaaFilter={aktivtNivaa}
                tom={tomTilstand('presentasjoner')}
              />
            )}
          </>
        )}

        {!manglerKlasse && activeTab === 'sporsmal' && (
          <div className="space-y-6">
            {/* Klassekoden står i klasselinja øverst — her trengs bare oppdatering */}
            <div className="flex justify-end">
              <button
                onClick={refreshAnswers}
                className="px-4 py-2 rounded-xl bg-white text-gray-600 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Oppdater svar
              </button>
            </div>

            {/* Vis klasseresultater button */}
            {questions.length > 0 && (
              <button
                onClick={() => setShowKahoot(true)}
                className="w-full py-3 rounded-2xl font-medium text-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
              >
                Vis klasseresultater
              </button>
            )}

            {/* All questions grouped by module */}
            {questions.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Ingen spørsmål opprettet ennå.
              </div>
            ) : (
              <div className="space-y-6">
                {(() => {
                  const withModule = questions.filter(q => q.moduleRoute)
                  const withoutModule = questions.filter(q => !q.moduleRoute)
                  const moduleRoutes = [...new Set(withModule.map(q => q.moduleRoute!))]
                  const groups: { title: string; moduleRoute: string | null; qs: typeof questions }[] = [
                    ...moduleRoutes.map(route => ({
                      title: ALL_MODULES.find(m => m.route === route)?.title ?? route,
                      moduleRoute: route,
                      qs: questions.filter(q => q.moduleRoute === route),
                    })),
                    ...(withoutModule.length > 0
                      ? [{ title: 'Generelle spørsmål', moduleRoute: null, qs: withoutModule }]
                      : []),
                  ]
                  return groups.map(group => (
                    <div key={group.moduleRoute ?? '__general__'}>
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        {group.moduleRoute && (
                          <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200 font-medium normal-case tracking-normal">
                            {group.title}
                          </span>
                        )}
                        {!group.moduleRoute && group.title}
                      </h3>
                      <div className="space-y-2">
                        {group.qs.map(q => {
                          const qAnswers = studentAnswers.filter(a => a.questionId === q.id)
                          return (
                            <div key={q.id} className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                                      q.type === 'open_ended'
                                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                                        : 'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}>
                                      {q.type === 'open_ended' ? 'Åpent' : 'Flervalg'}
                                    </span>
                                    {q.moduleRoute && (
                                      <span className="text-xs px-2 py-0.5 rounded-full font-medium border bg-violet-50 text-violet-700 border-violet-200">
                                        {ALL_MODULES.find(m => m.route === q.moduleRoute)?.title ?? q.moduleRoute}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-900 text-sm font-medium">{q.questionText}</p>
                                  {q.type === 'multiple_choice' && q.options && (
                                    <div className="mt-2 space-y-1">
                                      {q.options.map((opt, idx) => (
                                        <p key={idx} className={`text-xs flex items-center gap-1.5 ${
                                          idx === q.correctOptionIndex ? 'text-emerald-700' : 'text-gray-400'
                                        }`}>
                                          <span className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-medium text-white ${
                                            idx === q.correctOptionIndex ? 'bg-emerald-500' : OPTION_COLORS[idx % 4]
                                          }`}>
                                            {String.fromCharCode(65 + idx)}
                                          </span>
                                          {opt}
                                          {idx === q.correctOptionIndex && ' ✓'}
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                  {q.modelAnswer && (
                                    <p className="text-gray-400 text-xs mt-1 italic">Modellsvar: {q.modelAnswer}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleDeleteQuestion(q.id)}
                                  className="text-red-500 hover:text-red-700 text-xs font-medium shrink-0"
                                >
                                  Slett
                                </button>
                              </div>

                              {/* Student answers */}
                              {qAnswers.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-gray-100">
                                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    Svar fra elever ({qAnswers.length})
                                  </p>
                                  {q.type === 'multiple_choice' && q.options ? (
                                    <div className="space-y-1">
                                      {q.options.map((_opt, idx) => {
                                        const count = qAnswers.filter(a => a.selectedOptionIndex === idx).length
                                        const pct = qAnswers.length > 0 ? Math.round((count / qAnswers.length) * 100) : 0
                                        const isCorrect = idx === q.correctOptionIndex
                                        return (
                                          <div key={idx} className="flex items-center gap-2 text-xs">
                                            <span className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-medium text-white shrink-0 ${
                                              isCorrect ? 'bg-emerald-500' : OPTION_COLORS[idx % 4]
                                            }`}>
                                              {String.fromCharCode(65 + idx)}
                                            </span>
                                            <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                                              <div
                                                className={`h-full rounded transition-all ${isCorrect ? 'bg-emerald-500' : OPTION_COLORS[idx % 4]}`}
                                                style={{ width: `${pct}%` }}
                                              />
                                            </div>
                                            <span className="text-gray-400 w-12 text-right">{count} ({pct}%)</span>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  ) : (
                                    qAnswers.map(a => {
                                      const answerId = `${a.questionId}-${a.studentName}-${a.submittedAt}`
                                      return (
                                        <div key={answerId} className="bg-gray-50 rounded-xl p-3 space-y-2">
                                          <div className="flex items-center justify-between">
                                            <span className="text-teal-700 text-xs font-medium">{a.studentName}</span>
                                            <span className="text-gray-400 text-xs">{new Date(a.submittedAt).toLocaleDateString('nb-NO')}</span>
                                          </div>
                                          <p className="text-gray-700 text-xs leading-relaxed">{a.answerText}</p>
                                          {a.teacherComment ? (
                                            <p className="text-amber-700 text-xs italic">Din kommentar: {a.teacherComment}</p>
                                          ) : (
                                            <div className="flex gap-2">
                                              <input
                                                type="text"
                                                value={teacherComments[answerId] ?? ''}
                                                onChange={e => setTeacherComments(prev => ({ ...prev, [answerId]: e.target.value }))}
                                                placeholder="Skriv tilbakemelding..."
                                                className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                                              />
                                              <button
                                                onClick={() => handleSaveComment(answerId)}
                                                disabled={!teacherComments[answerId]?.trim()}
                                                className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200 disabled:opacity-40 hover:bg-teal-100 transition-colors"
                                              >
                                                Send
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })
                                  )}
                                </div>
                              )}
                              {qAnswers.length === 0 && (
                                <p className="text-xs text-gray-400 italic">Ingen elever har svart ennå.</p>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))
                })()}
              </div>
            )}

            {/* Collapsible add question form */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setShowAddQuestion(v => !v)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-medium text-gray-900 text-sm">+ Legg til nytt spørsmål</span>
                <span className={`text-gray-400 text-xl transition-transform shrink-0 ${showAddQuestion ? 'rotate-90' : ''}`}>›</span>
              </button>

              <AnimatePresence>
                {showAddQuestion && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 space-y-4 border-t border-gray-200">
                      {/* Question type */}
                      <div className="flex gap-3">
                        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                          qType === 'multiple_choice'
                            ? 'border-teal-400 bg-teal-50 text-teal-700'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="qtype"
                            value="multiple_choice"
                            checked={qType === 'multiple_choice'}
                            onChange={() => { setQType('multiple_choice'); setQOptions(['', '', '', '']); setQCorrectIndex(0) }}
                            className="sr-only"
                          />
                          Flervalg
                        </label>
                        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                          qType === 'open_ended'
                            ? 'border-teal-400 bg-teal-50 text-teal-700'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="qtype"
                            value="open_ended"
                            checked={qType === 'open_ended'}
                            onChange={() => setQType('open_ended')}
                            className="sr-only"
                          />
                          Åpent spørsmål
                        </label>
                      </div>

                      {/* Module selector */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Knytt til minileksjon <span className="text-gray-400 font-normal">(valgfritt)</span></label>
                        <div className="flex gap-2 flex-wrap">
                          <select
                            value={qFag}
                            onChange={e => { setQFag(e.target.value); setQModuleRoute('') }}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                          >
                            <option value="">Generelt spørsmål (ikke knyttet til minileksjon)</option>
                            {(activeSporsmalFags ?? ['forretningsdrift', 'mfi', 'kultur', 'ml1']).includes('forretningsdrift') && (
                              <option value="forretningsdrift">Forretningsdrift</option>
                            )}
                            {(activeSporsmalFags ?? ['forretningsdrift', 'mfi', 'kultur', 'ml1']).includes('mfi') && (
                              <option value="mfi">Markedsføring og innovasjon</option>
                            )}
                            {(activeSporsmalFags ?? ['forretningsdrift', 'mfi', 'kultur', 'ml1']).includes('kultur') && (
                              <option value="kultur">Kultur</option>
                            )}
                            {(activeSporsmalFags ?? ['forretningsdrift', 'mfi', 'kultur', 'ml1']).includes('ml1') && (
                              <option value="ml1">ML1</option>
                            )}
                          </select>
                          {qFag && (
                            <select
                              value={qModuleRoute}
                              onChange={e => setQModuleRoute(e.target.value)}
                              className="flex-1 min-w-0 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            >
                              <option value="">Alle minileksjoner i faget</option>
                              {ALL_MODULES.filter(m => m.subject === qFag).map(m => (
                                <option key={m.route} value={m.route}>{m.title}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>

                      {/* Question text */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Spørsmålstekst</label>
                        <textarea
                          value={qText}
                          onChange={e => setQText(e.target.value)}
                          placeholder="Skriv spørsmålet ditt her..."
                          rows={3}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>

                      {/* MC options */}
                      {qType === 'multiple_choice' && (
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Svaralternativer <span className="text-gray-400">(minst 2 — velg riktig svar med radio)</span>
                          </label>
                          <div className="space-y-2">
                            {qOptions.map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                                  <input
                                    type="radio"
                                    name="correct"
                                    checked={qCorrectIndex === i}
                                    onChange={() => setQCorrectIndex(i)}
                                    disabled={!opt.trim()}
                                    className="accent-emerald-500"
                                  />
                                  <span className={`text-xs font-medium w-5 h-5 flex items-center justify-center rounded ${
                                    qCorrectIndex === i && opt.trim() ? 'text-emerald-600' : OPTION_TEXT[i % 4]
                                  }`}>
                                    {String.fromCharCode(65 + i)}
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={e => setQOptions(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                                  placeholder={`Alternativ ${String.fromCharCode(65 + i)}`}
                                  className={`flex-1 px-3 py-1.5 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                                    qCorrectIndex === i && opt.trim()
                                      ? 'border-emerald-400'
                                      : 'border-gray-300'
                                  }`}
                                />
                                {qCorrectIndex === i && opt.trim() && (
                                  <span className="text-emerald-600 text-xs font-medium shrink-0">✓</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Model answer for open_ended */}
                      {qType === 'open_ended' && (
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Modellsvar (kun synlig for deg)</label>
                          <textarea
                            value={qModelAnswer}
                            onChange={e => setQModelAnswer(e.target.value)}
                            placeholder="Hva er et godt svar? (valgfritt)"
                            rows={2}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </div>
                      )}

                      <button
                        onClick={handleAddQuestion}
                        disabled={isAddDisabled}
                        className="px-5 py-2.5 rounded-xl font-medium bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        + Legg til spørsmål
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'elever' && <KlasserTab onStartLiveOkt={() => setActiveTab('live')} />}

        {activeTab === 'prover' && (
          <ProverTab navigate={navigate} mineFagSectionKeys={activeSectionKeys} classCode={classroomCode} />
        )}

        {activeTab === 'konkurranser' && (
          <KonkurranserTab navigate={navigate} />
        )}

        {!manglerKlasse && activeTab === 'live' && (
          <LiveOktTab />
        )}

        {!manglerKlasse && activeTab === 'leaderboard' && (
          <LeaderboardTab />
        )}
      </div>
    </div>
  )
}

// ── Prøver tab ────────────────────────────────────────────────────────────────

function lesProver(): Exam[] {
  try { return JSON.parse(localStorage.getItem('adventure-exams') ?? '[]') } catch { return [] }
}

function skrivProver(liste: Exam[]) {
  localStorage.setItem('adventure-exams', JSON.stringify(liste))
}

function genExamId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function ProverTab({
  navigate,
  mineFagSectionKeys,
  classCode,
}: {
  navigate: (path: string) => void
  mineFagSectionKeys: Set<string> | null
  classCode: string
}) {
  const [exams, setExams] = useState<Exam[]>(() => lesProver())
  const [slettKandidat, setSlettKandidat] = useState<Exam | null>(null)
  const [antallSvar, setAntallSvar] = useState<Record<string, number>>({})

  // Hvor mange innleveringer har hver publisert prøve? Brukes i sletteadvarselen.
  useEffect(() => {
    const av = exams
      .filter(e => e.examCode)
      .map(e => subscribeToExamSubmissions(e.examCode!, liste =>
        setAntallSvar(prev => ({ ...prev, [e.id]: liste.length }))))
    return () => av.forEach(f => f())
  }, [exams])

  function publiser(prove: Exam) {
    const kode = prove.examCode ?? generateExamCode()
    const publisert: Exam = { ...prove, status: 'active', examCode: kode }
    const oppdatert = lesProver().map(e => e.id === prove.id ? publisert : e)
    skrivProver(oppdatert)
    setExams(oppdatert)
    void publishExam(publisert)
      .then(fraRtdb => {
        const liste = lesProver().map(e => e.id === fraRtdb.id ? fraRtdb : e)
        skrivProver(liste)
        setExams(liste)
      })
      .catch(() => { /* prøven ligger lokalt; læreren kan forsøke igjen */ })
  }

  function bekreftSlett() {
    if (!slettKandidat) return
    const oppdatert = lesProver().filter(e => e.id !== slettKandidat.id)
    skrivProver(oppdatert)
    setExams(oppdatert)
    if (slettKandidat.examCode) {
      void deleteExamFromRtdb(slettKandidat.examCode).catch(() => { /* allerede borte lokalt */ })
    }
    setSlettKandidat(null)
  }
  const [nyProveId, setNyProveId] = useState<string | null>(null)
  const nyProveRef = useRef<HTMLDivElement | null>(null)

  // Hopp til den nye prøva i «Mine prøver» etter kopiering.
  useEffect(() => {
    if (!nyProveId || !nyProveRef.current) return
    nyProveRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [nyProveId])

  const statusLabel = (s: string) => s === 'active' ? 'Aktiv' : s === 'closed' ? 'Avsluttet' : 'Utkast'
  const statusColor = (s: string) => s === 'active' ? '#10b981' : s === 'closed' ? '#6b7280' : '#f59e0b'

  // «Mine fag» filtrerer standardprøvene, samme seksjonsnøkler som ellers.
  const standarder = STANDARD_EXAMS.filter(e => {
    if (!mineFagSectionKeys) return true
    const n = subjectToSectionKey(e.subject)
    return n !== null && mineFagSectionKeys.has(n)
  })

  /** Lager lærerens egen kopi. Standardprøva selv endres aldri. */
  function brukStandard(mal: StandardExam) {
    const kopi = examFromStandard(mal, {
      id: genExamId(),
      classCode,
      createdAt: new Date().toISOString(),
    })
    const oppdatert = [...lesProver(), kopi]
    skrivProver(oppdatert)
    setExams(oppdatert)
    setNyProveId(kopi.id)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Prøver</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Opprett og administrer digitale prøver for klassen din.</p>
        </div>
        <button
          onClick={() => navigate('/exam/build')}
          style={{
            padding: '10px 20px', borderRadius: 10, background: '#0d9488',
            color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
          }}
        >
          + Lag ny prøve
        </button>
      </div>

      {/* ── Standardprøver ─────────────────────────────────────────────── */}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Standardprøver</h3>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
        Ferdiglagde prøver med 30 spørsmål hver, bygget av de samme spørsmålene som
        standardkonkurransene. «Bruk denne» lager din egen kopi som du kan redigere.
      </p>

      {standarder.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', background: 'var(--card-bg)', borderRadius: 12, border: '1px dashed var(--border)', marginBottom: 28 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Ingen standardprøver i fagene du har valgt.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {standarder.map(mal => {
            const fag = MINE_FAG_OPTIONS.find(o => o.id === mal.subject)
            return (
              <div
                key={mal.id}
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{mal.title}</span>
                {fag && (
                  <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(13,148,136,0.1)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)', borderRadius: 6, padding: '2px 8px' }}>
                    {fag.short}
                  </span>
                )}
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>📋 {mal.questions.length} spørsmål</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>⏱ {mal.timeMinutes} min</span>
                <button
                  onClick={() => brukStandard(mal)}
                  style={{ marginLeft: 'auto', padding: '7px 16px', borderRadius: 8, border: '1px solid #0d9488', background: 'transparent', color: '#0d9488', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Bruk denne
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Mine prøver ────────────────────────────────────────────────── */}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Mine prøver</h3>

      {exams.length === 0 ? (
        <div style={{ padding: '48px 24px', textAlign: 'center', background: 'var(--card-bg)', borderRadius: 16, border: '1px dashed var(--border)' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📝</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Ingen prøver opprettet ennå.</p>
          <button
            onClick={() => navigate('/exam/build')}
            style={{ marginTop: 16, padding: '10px 20px', borderRadius: 10, background: '#0d9488', color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}
          >
            Lag din første prøve →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {exams.map(exam => {
            const erNy = exam.id === nyProveId
            return (
              <div
                key={exam.id}
                ref={erNy ? nyProveRef : undefined}
                style={{
                  background: 'var(--card-bg)', borderRadius: 16, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  border: erNy ? '2px solid #0d9488' : '1px solid var(--border)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{exam.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: `${statusColor(exam.status)}20`, color: statusColor(exam.status) }}>
                      {statusLabel(exam.status)}
                    </span>
                    {erNy && (
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: 'rgba(13,148,136,0.12)', color: '#0d9488' }}>
                        Kopiert fra standardprøve
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    {exam.examCode && <span>Kode: <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{exam.examCode}</span></span>}
                    <span>⏱ {exam.timeMinutes} min</span>
                    <span>📋 {exam.questions.length} spørsmål</span>
                    <span>{new Date(exam.createdAt).toLocaleDateString('no-NO')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => navigate(`/exam/build/${exam.id}`)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Rediger
                  </button>
                  {exam.status === 'draft' && (
                    <button
                      onClick={() => publiser(exam)}
                      style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#0d9488', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Publiser
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/exam/results/${exam.id}`)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Se resultater →
                  </button>
                  <button
                    onClick={() => setSlettKandidat(exam)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #fca5a5', background: 'transparent', color: '#ef4444', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Slett
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Bekreft sletting */}
      {slettKandidat && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 16 }}>
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, padding: 24, maxWidth: 440, width: '100%', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Slette «{slettKandidat.title}»?
            </h3>
            {(antallSvar[slettKandidat.id] ?? 0) > 0 ? (
              <p style={{ fontSize: 14, color: '#b91c1c', marginBottom: 16, lineHeight: 1.5 }}>
                <strong>Advarsel:</strong> prøven er publisert og har {antallSvar[slettKandidat.id]} innlevering
                {antallSvar[slettKandidat.id] === 1 ? '' : 'er'}. Alle elevresultatene forsvinner, og det kan ikke angres.
              </p>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
                {slettKandidat.examCode
                  ? 'Prøven er publisert. Elever som har koden mister tilgangen. Handlingen kan ikke angres.'
                  : 'Utkastet slettes for godt. Handlingen kan ikke angres.'}
              </p>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSlettKandidat(null)}
                style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Avbryt
              </button>
              <button
                onClick={bekreftSlett}
                style={{ padding: '9px 16px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Slett prøven
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Module preview panel ──────────────────────────────────────────────────────

function ExercisePreview({ ex }: { ex: DrawerExercise }) {
  const isLegacy = ex.correctId === undefined
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <p className="text-gray-900 font-medium text-sm leading-relaxed">{ex.question}</p>
      <div className="space-y-1.5">
        {ex.choices.map((c) => {
          const text = c.text ?? c.label ?? ''
          const isCorrect = isLegacy ? !!c.isCorrect : c.id === ex.correctId
          return (
            <div
              key={c.id}
              className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                isCorrect
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-gray-50 border border-gray-200 text-gray-600'
              }`}
            >
              <span className="shrink-0 mt-0.5">{isCorrect ? '✓' : '○'}</span>
              <span>{text}</span>
              {isLegacy && isCorrect && c.feedback && (
                <span className="ml-2 text-gray-400 text-xs italic">— {c.feedback}</span>
              )}
            </div>
          )
        })}
      </div>
      {ex.explanation && (
        <p className="text-gray-500 text-xs leading-relaxed border-l-2 border-teal-300 pl-3">
          <span className="font-medium text-gray-700">Forklaring: </span>{ex.explanation}
        </p>
      )}
    </div>
  )
}

function PhasePreview({ phase, idx }: { phase: DrawerPhase; idx: number }) {
  const [open, setOpen] = useState(idx === 0)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium text-sm shrink-0">
          {phase.phaseNumber}
        </span>
        <span className="font-medium text-gray-900 text-base flex-1 leading-snug">{phase.title}</span>
        <span className={`text-gray-400 text-xl transition-transform shrink-0 ${open ? 'rotate-90' : ''}`}>›</span>
      </button>

      {open && (
        <div className="px-5 py-5 space-y-4 bg-white border-t border-gray-100">
          {/* Quote */}
          <p className="text-gray-600 text-sm leading-relaxed italic border-l-2 border-teal-400 pl-3">
            "{phase.quote}"
          </p>

          {/* Theory */}
          {phase.content && (
            <p className="text-gray-700 text-sm leading-relaxed">{phase.content}</p>
          )}
          {phase.subpoints && phase.subpoints.length > 0 && (
            <ul className="space-y-1.5 pl-3 border-l-2 border-gray-200">
              {phase.subpoints.map((sp, j) => (
                <li key={j} className="text-gray-600 text-sm leading-relaxed">
                  {typeof sp === 'string' ? sp : (sp as { label?: string; text?: string }).label
                    ? `${(sp as { label: string }).label}: ${(sp as { text: string }).text}`
                    : JSON.stringify(sp)}
                </li>
              ))}
            </ul>
          )}
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-teal-600 font-medium text-sm">Praktisk eksempel: </span>
            <span className="text-gray-700 text-sm">{phase.practical}</span>
          </div>

          {/* Exercises */}
          {phase.exercises.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Øvelser for dette temaet ({phase.exercises.length} stk)
              </p>
              {phase.exercises.map((ex) => (
                <ExercisePreview key={ex.id} ex={ex} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Teacher custom exercises ──────────────────────────────────────────────────

function TeacherCustomExercisesSection({
  storageKey,
  classCode,
}: {
  storageKey: string
  classCode: string
}) {
  const key = customKey(storageKey, classCode)

  const [exercises, setExercises] = useState<TeacherCustomExercise[]>(() => {
    try { return JSON.parse(localStorage.getItem(key) ?? '[]') } catch { return [] }
  })
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIndex, setCorrectIndex] = useState(0)
  const [explanation, setExplanation] = useState('')

  function persist(next: TeacherCustomExercise[]) {
    setExercises(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  function handleAdd() {
    const filled = options.map(o => o.trim()).filter(Boolean)
    if (!question.trim() || filled.length < 2) return
    const ex: TeacherCustomExercise = {
      id: Date.now().toString(),
      question: question.trim(),
      options,
      correctIndex,
      explanation: explanation.trim() || undefined,
      createdAt: new Date().toISOString(),
    }
    persist([...exercises, ex])
    setQuestion('')
    setOptions(['', '', '', ''])
    setCorrectIndex(0)
    setExplanation('')
  }

  function handleDelete(id: string) {
    persist(exercises.filter(e => e.id !== id))
  }

  const canAdd = !!question.trim() && options.filter(o => o.trim()).length >= 2

  return (
    <div className="border-t-2 border-dashed border-gray-200 pt-8 mt-8 space-y-6">
      <div>
        <h3 className="text-xl font-medium text-gray-900 mb-1">Mine tilleggsoppgaver</h3>
        <p className="text-gray-500 text-sm">
          Legg til egne flervalgsoppgaver for denne minileksjonen. Elevene i klasse{' '}
          <span className="font-medium text-teal-600 tracking-wide">{classCode}</span> vil se dem etter
          de vanlige oppgavene.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h4 className="font-medium text-gray-900 text-sm">Ny tilleggsoppgave</h4>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Spørsmål</label>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Skriv spørsmålet her..."
            rows={2}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Svaralternativer <span className="text-gray-400">(velg riktig med radio)</span>
          </label>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                  <input
                    type="radio"
                    name={`correct-${storageKey}`}
                    checked={correctIndex === i}
                    onChange={() => setCorrectIndex(i)}
                    disabled={!opt.trim()}
                    className="accent-emerald-500"
                  />
                  <span className={`text-xs font-medium w-5 ${
                    correctIndex === i && opt.trim() ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                </label>
                <input
                  type="text"
                  value={opt}
                  onChange={e => setOptions(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                  placeholder={`Alternativ ${String.fromCharCode(65 + i)}`}
                  className={`flex-1 px-3 py-1.5 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    correctIndex === i && opt.trim() ? 'border-emerald-400' : 'border-gray-300'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Forklaring til eleven <span className="text-gray-400">(valgfritt)</span>
          </label>
          <input
            type="text"
            value={explanation}
            onChange={e => setExplanation(e.target.value)}
            placeholder="Vises til eleven etter at de har svart..."
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={!canAdd}
          className="px-5 py-2.5 rounded-xl font-medium bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        >
          + Legg til oppgave
        </button>
      </div>

      {/* Existing custom exercises */}
      {exercises.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-teal-600 uppercase tracking-widest">
            Dine oppgaver ({exercises.length} stk)
          </p>
          {exercises.map((ex, i) => (
            <div key={ex.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-gray-900 font-medium text-sm leading-relaxed flex-1">
                  {i + 1}. {ex.question}
                </p>
                <button
                  onClick={() => handleDelete(ex.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium shrink-0"
                >
                  Slett
                </button>
              </div>
              <div className="space-y-1.5">
                {ex.options.map((opt, idx) => {
                  if (!opt.trim()) return null
                  const isCorrect = idx === ex.correctIndex
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                        isCorrect
                          ? 'bg-green-50 border border-green-200 text-green-800'
                          : 'text-gray-500'
                      }`}
                    >
                      <span>{isCorrect ? '✓' : `${String.fromCharCode(65 + idx)}.`}</span>
                      <span>{opt}</span>
                    </div>
                  )
                })}
              </div>
              {ex.explanation && (
                <p className="text-teal-600 text-xs italic border-l-2 border-teal-300 pl-3">
                  Forklaring: {ex.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {exercises.length === 0 && (
        <p className="text-gray-400 text-sm italic text-center py-4">
          Ingen tilleggsoppgaver lagt til ennå.
        </p>
      )}
    </div>
  )
}

// ── Linked presentations map ───────────────────────────────────────────────────

const MODULE_LINKED_PRESENTATIONS: Record<string, { title: string; route: string }[]> = {
  '/learning/mfi/prisstrategier':        [{ title: 'Konkurransemidlene', route: '/learning/presentations/konkurransemidlene' }],
  '/learning/mfi/distribusjon':          [{ title: 'Konkurransemidlene', route: '/learning/presentations/konkurransemidlene' }],
  '/learning/mfi/kommunikasjon-kanaler': [{ title: 'Konkurransemidlene', route: '/learning/presentations/konkurransemidlene' }],
}

// ── Module content preview ─────────────────────────────────────────────────────

export function ModuleContentPreview({
  mod,
  classCode,
  linkedQuestions,
  onAddQuestion,
}: {
  mod: ModuleCard
  classCode: string
  linkedQuestions: TeacherQuestion[]
  onAddQuestion: () => void
}) {
  const phases = TEACHER_MODULE_PHASES[mod.route]

  return (
    <div className="space-y-6">
      {/* Module header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <h2 className="text-xl font-medium text-gray-900 leading-tight">{mod.title}</h2>
            <p className="text-gray-500 text-sm mt-0.5">{mod.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs font-medium uppercase tracking-wide px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
            {mod.level.toUpperCase()}
          </span>
          <span className="text-xs text-gray-400">
            {phases ? `${phases.length} temaer` : 'Forhåndsvisning ikke tilgjengelig for denne minileksjonen'}
          </span>
        </div>
      </div>

      {!phases ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <p className="text-amber-700 font-medium">Forhåndsvisning ikke tilgjengelig</p>
          <p className="text-amber-600/70 text-sm mt-1">
            Denne minileksjonen bruker et annet format og kan ikke vises her. Klikk "Åpne minileksjon" for å se innholdet.
          </p>
          <a
            href={mod.route}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200 hover:bg-amber-200 transition-colors"
          >
            Åpne minileksjon →
          </a>
        </div>
      ) : (
        <>
          {/* Phase list */}
          <div className="space-y-3">
            {phases.map((phase, idx) => (
              <PhasePreview key={phase.phaseNumber} phase={phase} idx={idx} />
            ))}
          </div>

          {/* Teacher custom exercises */}
          {mod.storageKey && (
            <TeacherCustomExercisesSection
              storageKey={mod.storageKey}
              classCode={classCode}
            />
          )}
          {!mod.storageKey && (
            <div className="border-t border-slate-700/40 pt-6 mt-6">
              <p className="text-slate-500 text-sm italic text-center">
                Denne minileksjonen har ikke en lagringsnøkkel — tilleggsoppgaver er ikke tilgjengelig.
              </p>
            </div>
          )}

          {/* Linked teacher questions */}
          <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-medium text-gray-900">Spørsmål knyttet til denne minileksjonen</h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {linkedQuestions.length === 0
                    ? 'Ingen spørsmål knyttet til denne minileksjonen ennå.'
                    : `${linkedQuestions.length} spørsmål`}
                </p>
              </div>
              <button
                onClick={onAddQuestion}
                className="shrink-0 px-3 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                + Legg til spørsmål
              </button>
            </div>
            {linkedQuestions.length > 0 && (
              <div className="space-y-2">
                {linkedQuestions.map(q => (
                  <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                        q.type === 'open_ended'
                          ? 'bg-teal-50 text-teal-700 border-teal-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {q.type === 'open_ended' ? 'Åpent' : 'Flervalg'}
                      </span>
                    </div>
                    <p className="text-gray-900 text-sm font-medium leading-snug">{q.questionText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Linked presentations */}
          {MODULE_LINKED_PRESENTATIONS[mod.route] && (
            <div className="border-t border-gray-100 pt-5 mt-2 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Tilknyttede presentasjoner</h3>
              <div className="space-y-2">
                {MODULE_LINKED_PRESENTATIONS[mod.route].map(p => (
                  <div key={p.route} className="flex items-center justify-between gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎬</span>
                      <span className="text-sm font-medium text-violet-700">{p.title}</span>
                    </div>
                    <a
                      href={p.route}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-xs font-medium text-violet-700 hover:text-violet-900 border border-violet-200 px-3 py-1.5 rounded-lg bg-violet-100 hover:bg-violet-200 transition-colors"
                    >
                      Forhåndsvis →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── Module summary panel (clean right-side view) ──────────────────────────────

const SUBJECT_SHORT: Record<string, string> = {
  forretningsdrift: 'SSR-FD', mfi: 'SSR-MI', kultur: 'SSR-KS', ml1: 'ML1',
}

function ModuleSummaryPanel({
  mod,
  classCode,
  linkedQuestions,
  onAddQuestion,
  onClose,
  isVisible,
  onToggleVisibility,
}: {
  mod: ModuleCard
  classCode: string
  linkedQuestions: TeacherQuestion[]
  onAddQuestion: () => void
  onClose: () => void
  isVisible: boolean
  onToggleVisibility: () => void
}) {
  const phases = TEACHER_MODULE_PHASES[mod.route]
  const subjectShort = SUBJECT_SHORT[mod.subject] ?? mod.subject
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header: title + badge + actions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>{mod.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '0 2px', flexShrink: 0 }}>×</button>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{mod.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#0d9488', background: '#f0fdf9', border: '1px solid #99f6e4', borderRadius: '20px', padding: '2px 10px' }}>
            {mod.level.toUpperCase()} · {subjectShort}
          </span>
          <button
            onClick={onToggleVisibility}
            style={{ fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '7px', border: '1px solid #e5e7eb', background: 'var(--card-bg)', color: isVisible ? 'var(--text-secondary)' : '#ef4444', cursor: 'pointer' }}
          >
            {isVisible ? 'Skjul for elever' : 'Vis for elever'}
          </button>
          <button
            onClick={onAddQuestion}
            style={{ fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '7px', border: '1.5px solid #0d9488', background: 'var(--card-bg)', color: '#0d9488', cursor: 'pointer' }}
          >
            + Legg til oppgave
          </button>
        </div>
      </div>

      {/* Presentation */}
      {mod.presentationRoute && (
        <div>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, marginBottom: '8px' }}>Tilknyttet presentasjon</p>
          <div style={{ border: '0.5px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
            {/* Dark banner */}
            <div style={{ background: '#030712', padding: '16px 20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '2px', background: '#38bdf8' }} />
              <div>
                <div style={{ fontSize: '9px', color: '#38bdf8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>Presentasjon</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#f1f5f9', lineHeight: 1.3 }}>{mod.title}</div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', opacity: i === 0 ? 0.9 : 0.2 }} />
                  ))}
                </div>
              </div>
            </div>
            {/* Info + button row */}
            <div style={{ padding: '12px 16px', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fullskjerm · Piltaster for å navigere</p>
              <a
                href={mod.presentationRoute}
                target="_blank"
                rel="noreferrer"
                style={{ border: '1.5px solid #0d9488', color: '#0d9488', borderRadius: '7px', fontSize: '13px', fontWeight: 500, padding: '6px 14px', textDecoration: 'none', background: 'var(--card-bg)', whiteSpace: 'nowrap' }}
              >
                Forhåndsvis →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Phase accordion */}
      <div>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, marginBottom: '8px' }}>Temaer og øvelser</p>
        {phases ? (
          <div style={{ border: '0.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            {phases.map((phase, idx) => {
              const isOpen = expandedPhase === idx
              return (
                <div key={phase.phaseNumber} style={{ borderBottom: idx < phases.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  {/* Row header */}
                  <button
                    onClick={() => setExpandedPhase(isOpen ? null : idx)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', background: isOpen ? 'rgba(13,148,136,0.08)' : 'var(--card-bg)', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: isOpen ? '#0d9488' : 'rgba(13,148,136,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: isOpen ? '#fff' : '#0d9488', flexShrink: 0 }}>
                      {phase.phaseNumber}
                    </span>
                    <span style={{ fontSize: '13px', color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isOpen ? 500 : 400, flex: 1 }}>{phase.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginRight: '6px' }}>{phase.exercises.length} øvelser</span>
                    <span style={{ fontSize: '14px', color: isOpen ? '#0d9488' : 'var(--text-muted)', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', lineHeight: 1 }}>›</span>
                  </button>
                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden', borderTop: '0.5px solid var(--border)' }}
                      >
                        <div style={{ padding: '12px 14px 16px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {phase.quote && (
                            <p style={{ fontSize: '13px', color: 'var(--accent)', fontStyle: 'italic', borderLeft: '2px solid var(--accent)', paddingLeft: '10px', lineHeight: 1.5 }}>"{phase.quote}"</p>
                          )}
                          {phase.content && (
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{phase.content}</p>
                          )}
                          {phase.subpoints && phase.subpoints.length > 0 && (
                            <ul style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {phase.subpoints.map((sp, j) => (
                                <li key={j} style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                  {typeof sp === 'string' ? sp : `${(sp as { label: string; text: string }).label}: ${(sp as { label: string; text: string }).text}`}
                                </li>
                              ))}
                            </ul>
                          )}
                          {phase.practical && (
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(13,148,136,0.08)', borderRadius: '6px', padding: '8px 10px' }}>
                              <span style={{ fontWeight: 500, color: 'var(--accent)' }}>Praktisk: </span>{phase.practical}
                            </p>
                          )}
                          {phase.exercises.length > 0 && (
                            <div>
                              <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, marginBottom: '6px' }}>Øvelser ({phase.exercises.length})</p>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {phase.exercises.map((ex, ei) => (
                                  <div key={ex.id} style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '8px 10px', background: 'var(--card-bg)', borderRadius: '6px', border: '0.5px solid var(--border)' }}>
                                    <p style={{ fontWeight: 500, marginBottom: '4px' }}>{ei + 1}. {ex.question}</p>
                                    {ex.choices.map(c => {
                                      const isCorrect = ex.correctId ? c.id === ex.correctId : !!c.isCorrect
                                      return (
                                        <p key={c.id} style={{ fontSize: '11px', color: isCorrect ? '#0d9488' : 'var(--text-muted)', paddingLeft: '8px' }}>
                                          {isCorrect ? '✓' : '○'} {c.text ?? c.label}
                                        </p>
                                      )
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Forhåndsvisning ikke tilgjengelig</p>
        )}
      </div>

      {/* Custom exercises */}
      <div>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, marginBottom: '8px' }}>Mine tilleggsoppgaver</p>
        {mod.storageKey ? (
          <TeacherCustomExercisesSection storageKey={mod.storageKey} classCode={classCode} />
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--border)', fontStyle: 'italic' }}>Ikke tilgjengelig for denne modulen.</p>
        )}
      </div>

      {/* Linked questions */}
      {linkedQuestions.length > 0 && (
        <div>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, marginBottom: '8px' }}>
            Spørsmål ({linkedQuestions.length})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {linkedQuestions.map(q => (
              <div key={q.id} style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px', border: '0.5px solid #e5e7eb' }}>
                {q.questionText}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


/** Vises i faner som trenger en klassekode, når læreren ikke har noen klasse. */
function KreverKlasse({ onOpprett }: { onOpprett: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-5">
      <p className="text-sm text-gray-500">Opprett en klasse for å bruke denne fanen.</p>
      <button
        onClick={onOpprett}
        className="mt-3 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Opprett klasse
      </button>
    </div>
  )
}

// ── Presentasjoner ────────────────────────────────────────────────────────────

/** Tom-tilstand for begge visningene i Læringsinnhold. */
interface TomTilstand {
  melding: string
  knapp: string | null
  onKlikk: () => void
}

function TomBoks({ tom }: { tom: TomTilstand }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-5">
      <p className="text-sm text-gray-500">{tom.melding}</p>
      {tom.knapp && (
        <button onClick={tom.onKlikk} className="mt-3 text-xs font-medium text-teal-600 hover:text-teal-800">
          {tom.knapp}
        </button>
      )}
    </div>
  )
}

/**
 * Presentasjonsbiblioteket i Læringsinnhold. Leser ALL_PRESENTATIONS og
 * PRESENTATION_SECTIONS fra presentationRegistry — samme kilde som LiveOktTab.
 * (Fanen hadde tidligere en egen hardkodet liste med bare VG1-fagene, uten
 * level-felt; se rapporten.)
 */
function PresentasjonerVisning({
  mineFagSectionKeys,
  nivaaFilter,
  tom,
}: {
  mineFagSectionKeys: Set<string> | null
  nivaaFilter: NivaaFilter
  tom: TomTilstand
}) {
  const seksjonsNokkel = (s: { level: string; subject: string; ssrSubject?: string }) =>
    `${s.level}|${s.subject}|${s.ssrSubject ?? ''}`

  const grupper = PRESENTATION_SECTIONS
    .filter(s => !mineFagSectionKeys || mineFagSectionKeys.has(seksjonsNokkel(s)))
    .filter(s => nivaaFilter === 'alle' || s.level === nivaaFilter)
    .map(s => ({
      seksjon: s,
      items: ALL_PRESENTATIONS.filter(p => seksjonsNokkel(p) === seksjonsNokkel(s)),
    }))
    .filter(g => g.items.length > 0)

  const synlige = grupper.reduce((n, g) => n + g.items.length, 0)

  if (grupper.length === 0) return <TomBoks tom={tom} />

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <p className="text-gray-500 text-sm">Presentasjoner som er klare til bruk i klassen. Åpnes i fullskjerm.</p>
        <p className="text-xs text-gray-500 shrink-0">
          <span className="font-medium text-teal-600">{synlige}</span>
          <span className="text-gray-400">/{ALL_PRESENTATIONS.length}</span>
          <span className="ml-1">synlige</span>
        </p>
      </div>
      {grupper.map(gruppe => (
        <div key={gruppe.seksjon.title} className="space-y-2">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">{gruppe.seksjon.title}</h3>
          {gruppe.items.map(p => (
            <a
              key={p.route}
              href={p.route}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-teal-200 hover:bg-teal-50/50 transition-colors group"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <span className="text-xl shrink-0 text-gray-400">🎬</span>
              <p className="font-medium text-gray-900 group-hover:text-teal-700 transition-colors text-sm min-w-0 flex-1">{p.title}</p>
              <span className="text-gray-400 group-hover:text-teal-600 transition-colors text-sm shrink-0">Åpne →</span>
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Minileksjoner tab ─────────────────────────────────────────────────────────

function MinileksjonsTab({
  classroomCode,
  moduleVisibility,
  onToggle,
  questions,
  onOpenSporsmalWithModule,
  mineFagSectionKeys,
  nivaaFilter,
  tom,
}: {
  classroomCode: string
  moduleVisibility: Record<string, boolean>
  onToggle: (route: string) => void
  questions: TeacherQuestion[]
  onOpenSporsmalWithModule: (moduleRoute: string, fag: string) => void
  mineFagSectionKeys: Set<string> | null
  nivaaFilter: NivaaFilter
  tom: TomTilstand
}) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const selectedMod = selectedRoute ? ALL_MODULES.find(m => m.route === selectedRoute) ?? null : null

  const isVisible = (route: string) => moduleVisibility[route] !== false
  const hiddenCount = ALL_MODULES.filter(m => moduleVisibility[m.route] === false).length

  // Filtrer seksjoner på «Mine fag» og på nivåfilteret (kun visning).
  const visibleSections = MODULE_SECTIONS
    .filter(s => !mineFagSectionKeys || mineFagSectionKeys.has(`${s.level}|${s.subject}|${s.ssrSubject ?? ''}`))
    .filter(s => nivaaFilter === 'alle' || s.level === nivaaFilter)

  // Count modules actually shown after Mine fag filter
  const displayedModules = ALL_MODULES.filter(m =>
    visibleSections.some(s => s.subject === m.subject && s.level === m.level && (s.ssrSubject ?? '') === (m.ssrSubject ?? ''))
  )
  const displayedVisibleCount = displayedModules.filter(m => isVisible(m.route)).length
  const ingenTreff = displayedModules.length === 0

  return (
    <div className="flex gap-0 -mx-4 overflow-hidden">
      {/* ── Left: module list ─────────────────────────────────────────────── */}
      <div className="shrink-0 w-[260px] px-4 overflow-y-auto max-h-[calc(100vh-200px)]">

        {ingenTreff ? (
          <TomBoks tom={tom} />
        ) : (
        <>
        {/* Summary bar */}
        <div className="bg-gray-50 rounded-xl p-2 border border-gray-200 flex items-center justify-between gap-2 mb-3">
          <div className="text-xs text-gray-500 truncate">
            <span className="font-medium text-teal-600">{displayedVisibleCount}</span>
            <span className="text-gray-400">/{displayedModules.length}</span>
            <span className="ml-1">synlige</span>
          </div>
          {hiddenCount > 0 && (
            <button
              onClick={() => onToggle('__reset_all__')}
              className="text-xs font-medium text-teal-600 hover:text-teal-800 shrink-0"
            >
              Vis alle
            </button>
          )}
        </div>

        {/* Section list */}
        {visibleSections.map(section => {
          const mods = ALL_MODULES.filter(m =>
            m.level === section.level && m.subject === section.subject && (m.ssrSubject ?? '') === (section.ssrSubject ?? ''))
          if (mods.length === 0) return null
          return (
            <div key={section.title} className="mb-3">
              <div style={{ paddingTop: '16px', paddingLeft: '16px', paddingBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500 }}>
                  {section.title.split(' —')[0]}
                </span>
              </div>
              <div className="space-y-0.5">
                {mods.map(mod => {
                  const visible = isVisible(mod.route)
                  const isSelected = mod.route === selectedRoute
                  const subjectColor = SUBJECT_HEX_COLORS[mod.subject] ?? 'var(--text-muted)'
                  return (
                    <div
                      key={mod.route}
                      className="group relative"
                      style={isSelected
                        ? { borderLeft: "3px solid #0d9488", background: "#f0fdf9", padding: "7px 16px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }
                        : { borderLeft: "3px solid transparent", padding: "7px 16px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", opacity: visible ? 1 : 0.4 }}
                    >
                      {/* Click name to preview */}
                      <button
                        onClick={() => setSelectedRoute(isSelected ? null : mod.route)}
                        className="flex items-center gap-2 flex-1 min-w-0 text-left"
                      >
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: subjectColor, flexShrink: 0 }} />
                        <span className={`text-xs font-medium truncate ${
                          isSelected ? 'text-teal-700' : visible ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {mod.title}
                        </span>
                      </button>
                      {/* Visibility toggle — show only on hover */}
                      <button
                        onClick={e => { e.stopPropagation(); onToggle(mod.route) }}
                        title={visible ? 'Skjul for elever' : 'Vis for elever'}
                        className={`opacity-0 group-hover:opacity-100 shrink-0 w-5 h-5 rounded text-[10px] flex items-center justify-center border transition-all ${
                          visible
                            ? 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                            : 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200'
                        }`}
                      >
                        {visible ? '○' : '●'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        </>
        )}
      </div>

      {/* ── Right: content summary ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 pl-4 border-l border-gray-200 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
        {ingenTreff ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-gray-500 text-sm">{tom.melding}</p>
          </div>
        ) : selectedMod ? (
          <ModuleSummaryPanel
            mod={selectedMod}
            classCode={classroomCode}
            linkedQuestions={questions.filter(q => q.moduleRoute === selectedMod.route)}
            onAddQuestion={() => onOpenSporsmalWithModule(selectedMod.route, selectedMod.subject)}
            onClose={() => setSelectedRoute(null)}
            isVisible={isVisible(selectedMod.route)}
            onToggleVisibility={() => onToggle(selectedMod.route)}
          />
        ) : (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-gray-400 text-sm">← Velg en minileksjon fra listen</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Lesson card (unchanged) ───────────────────────────────────────────────────

function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const store = useGameStore()

  const isActive = store.activeLessons.includes(lesson.id)
  const isCompleted = store.completedLessons.includes(lesson.id)

  function handleActivate(e: React.MouseEvent) {
    e.stopPropagation()
    store.activateLesson(lesson.id)
  }

  function handleComplete(e: React.MouseEvent) {
    e.stopPropagation()
    store.completeLesson(lesson.id)
  }

  function handleDeactivate(e: React.MouseEvent) {
    e.stopPropagation()
    store.deactivateLesson(lesson.id)
  }

  const statusIcon = isCompleted ? '✓' : isActive ? '●' : '○'
  const statusColor = isCompleted ? 'text-emerald-600' : isActive ? 'text-teal-600' : 'text-gray-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className={`rounded-2xl border-2 overflow-hidden transition-colors ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/50'
          : isActive
            ? 'border-teal-200 bg-teal-50/50'
            : 'border-gray-200 bg-white'
      }`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span className={`text-xl font-medium ${statusColor} w-6 text-center flex-shrink-0`}>
          {statusIcon}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-tight">
            Kap. {lesson.chapterNumber}
            {lesson.sectionNumber != null && `.${lesson.sectionNumber}`}
            : {lesson.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{lesson.bookTitle}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!isActive && !isCompleted && (
            <button
              onClick={handleActivate}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              Aktiver
            </button>
          )}
          {isActive && (
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 border border-teal-200">
              Aktiv
            </span>
          )}
          {isCompleted && (
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
              Fullført
            </span>
          )}

          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gray-100"
          >
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600">{lesson.description}</p>

              <div>
                <h4 className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-2">
                  Læringsmål
                </h4>
                <ul className="space-y-1">
                  {lesson.learningGoals.map((goal, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5 flex-shrink-0">✓</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-2">
                  Åpner i spillet
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lesson.unlocks.map((unlock) => (
                    <span
                      key={unlock.id}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {unlock.type === 'building' && '🏢 '}
                      {unlock.type === 'screen' && '📱 '}
                      {unlock.type === 'feature' && '⚙️ '}
                      {unlock.type === 'module' && '📦 '}
                      {unlock.displayName}
                    </span>
                  ))}
                </div>
              </div>

              {lesson.ndlaUrl && (
                <a
                  href={lesson.ndlaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                >
                  Les mer på NDLA →
                </a>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  Estimert tid: {lesson.estimatedMinutes} min
                  {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                    <span className="ml-3">Forutsetter: {lesson.prerequisites.join(', ')}</span>
                  )}
                </span>

                <div className="flex gap-2">
                  {isActive && (
                    <>
                      <button
                        onClick={handleComplete}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                      >
                        Merk fullført
                      </button>
                      <button
                        onClick={handleDeactivate}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                      >
                        Deaktiver
                      </button>
                    </>
                  )}
                  {isCompleted && (
                    <button
                      onClick={handleDeactivate}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      Tilbakestill
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
