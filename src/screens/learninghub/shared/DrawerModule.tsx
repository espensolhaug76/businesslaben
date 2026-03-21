/**
 * DrawerModule — reusable theory+exercise module with slide-in drawer UX.
 *
 * Main page: vertical list of compact phase cards.
 * Clicking a card opens a centered TheoryDrawer (max-w-700px, slides from right).
 * Drawer: full theory content + 5 exercises (one at a time).
 * Progress: "X av Y temaer fullført" with teal progress bar.
 */

import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ref, set } from 'firebase/database'
import { db } from '../../../lib/firebase'
import TheoryDrawer from '../../../components/ui/TheoryDrawer'
import GlossaryTermBadge from '../../../components/ui/GlossaryTermBadge'
import GlossaryPopup from '../../../components/ui/GlossaryPopup'
import { useThemeEffect } from '../../../components/ui/ThemeToggle'

// ── Teacher custom exercise types (mirrored from TeacherDashboard) ─────────────
interface TeacherCustomExercise {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  createdAt: string
}

// ── Public types ───────────────────────────────────────────────────────────

export interface DrawerChoice {
  id: string
  text?: string      // new format
  label?: string     // legacy format
  isCorrect?: boolean // legacy format
  feedback?: string  // legacy format
}

export interface DrawerExercise {
  id: string
  question: string
  choices: DrawerChoice[]
  // new format
  correctId?: string
  explanation?: string
  // legacy format
  icon?: string
  title?: string
  context?: string
  espenTip?: string
}

export interface DrawerPhase {
  phaseNumber: number
  icon: string
  title: string
  quote: string
  content?: string
  subpoints?: string[]
  practical: string
  glossaryTerm?: string
  exercises: DrawerExercise[]
}

export interface DrawerModuleProps {
  moduleCode: string
  moduleTitle: string
  moduleIcon: string
  storageKey: string
  completeRoute: string
  phases: DrawerPhase[]
  intro: string
  vissteduAt: string
  espenSier: string
  presentationLink?: { route: string; title?: string; description?: string }
}

// ── Per-phase exercise state ───────────────────────────────────────────────

interface PhaseExState {
  exerciseIndex: number
  selected: string | null
  showResult: boolean
  done: boolean
  results: Record<string, boolean>
}

// ── DrawerContent ──────────────────────────────────────────────────────────

function DrawerContent({
  phase,
  moduleTitle,
  exState,
  onSelect,
  onNext,
  onClose,
}: {
  phase: DrawerPhase
  moduleTitle: string
  exState: PhaseExState
  onSelect: (id: string) => void
  onNext: () => void
  onClose: () => void
}) {
  const { exercises } = phase
  const exercise = exercises[exState.exerciseIndex]
  const isLegacy = exercise.correctId === undefined
  const isCorrect = isLegacy
    ? exercise.choices.find(c => c.id === exState.selected)?.isCorrect ?? false
    : exState.selected === exercise.correctId
  const isLastExercise = exState.exerciseIndex === exercises.length - 1

  return (
    <div className="p-6 pb-8 space-y-6 bg-white h-full overflow-y-auto">
      {/* Header: phase title + close */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-medium text-gray-900 text-[19px] leading-snug">{phase.title}</h2>
          {/* Quote in italic teal */}
          <p className="text-sm leading-relaxed mt-2" style={{ color: '#0d9488', fontStyle: 'italic' }}>
            "{phase.quote}"
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0 text-lg"
          aria-label="Lukk"
        >
          ×
        </button>
      </div>

      {/* Theory text */}
      {(phase.content || (phase.subpoints && phase.subpoints.length > 0) || phase.practical) && (
        <div className="space-y-3">
          {phase.content && (
            <p className="text-gray-700 leading-[1.7]" style={{ fontSize: '16px' }}>{phase.content}</p>
          )}
          {phase.subpoints && phase.subpoints.length > 0 && (
            <ul className="space-y-1.5 pl-4 border-l-2 border-gray-200">
              {phase.subpoints.map((sp, j) => (
                <li key={j} className="text-gray-600 leading-relaxed" style={{ fontSize: '16px' }}>{sp}</li>
              ))}
            </ul>
          )}
          {phase.practical && (
            <p className="text-gray-500 text-sm leading-relaxed">
              <span className="font-medium text-gray-600">Praktisk: </span>{phase.practical}
            </p>
          )}
          {phase.glossaryTerm && (
            <div className="pt-0.5">
              <GlossaryTermBadge term={phase.glossaryTerm} />
            </div>
          )}
        </div>
      )}

      {/* Divider with exercise label */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: '#0d9488' }}>
          {exState.done
            ? 'Øvelser fullført'
            : `Øvelse ${exState.exerciseIndex + 1} av ${exercises.length}`}
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Done state */}
      {exState.done ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-green-50 border border-green-200 p-4 text-center"
        >
          <p className="text-green-700 font-medium text-sm">Bra jobbet!</p>
          <p className="text-gray-500 text-xs mt-1">Du har fullført alle øvelsene for dette temaet.</p>
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors"
          >
            Tilbake til oversikten
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${phase.phaseNumber}-${exState.exerciseIndex}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-3"
          >
            {/* Exercise question card */}
            <div className="rounded-xl bg-white p-4 space-y-2" style={{ border: '0.5px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              {(exercise.icon || exercise.title) && (
                <div className="flex items-start gap-3">
                  {exercise.icon && <span className="text-2xl shrink-0">{exercise.icon}</span>}
                  <div>
                    {exercise.title && <h3 className="font-medium text-gray-900 text-sm">{exercise.title}</h3>}
                    {exercise.context && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{exercise.context}</p>}
                  </div>
                </div>
              )}
              <p className="text-gray-900 font-medium leading-snug" style={{ fontSize: '16px' }}>{exercise.question}</p>
            </div>

            {/* Answer choices */}
            <div className="space-y-2">
              {exercise.choices.map((choice, i) => {
                const isSelected = exState.selected === choice.id
                const isChoiceCorrect = isLegacy ? !!choice.isCorrect : choice.id === exercise.correctId
                const choiceText = choice.text ?? choice.label ?? ''

                let choiceStyle: React.CSSProperties = { border: '0.5px solid rgba(0,0,0,0.12)' }
                let choiceClass = 'bg-white text-gray-800 hover:border-teal-400 hover:bg-teal-50/50 active:scale-[0.99]'

                if (exState.showResult) {
                  if (isChoiceCorrect) {
                    choiceStyle = { border: '1px solid #86efac', backgroundColor: '#f0fdf4' }
                    choiceClass = 'text-[#166534]'
                  } else if (isSelected) {
                    choiceStyle = { border: '1px solid #fca5a5', backgroundColor: '#fef2f2' }
                    choiceClass = 'text-[#991b1b]'
                  } else {
                    choiceStyle = { border: '0.5px solid rgba(0,0,0,0.08)', backgroundColor: '#f9fafb' }
                    choiceClass = 'text-gray-400'
                  }
                }

                return (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onSelect(choice.id)}
                    disabled={exState.showResult}
                    className={`w-full text-left px-3 rounded-lg transition-colors text-sm leading-relaxed ${choiceClass}`}
                    style={{ ...choiceStyle, minHeight: '40px', display: 'flex', alignItems: 'center' }}
                  >
                    <div className="flex items-start gap-2 py-2.5">
                      {exState.showResult && (
                        <span className="shrink-0 text-xs">
                          {isChoiceCorrect ? '✓' : isSelected ? '✗' : '○'}
                        </span>
                      )}
                      <span>{choiceText}</span>
                    </div>
                    {exState.showResult && isLegacy && (isSelected || isChoiceCorrect) && choice.feedback && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-1 pt-2 border-t border-gray-200 text-[13px] italic text-gray-600 w-full"
                      >
                        {choice.feedback}
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Result feedback */}
            <AnimatePresence>
              {exState.showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border px-3 py-2 text-xs space-y-1 ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                    {isCorrect ? 'Riktig!' : 'Ikke helt riktig'}
                  </span>
                  {exercise.explanation && (
                    <p className="text-gray-600 leading-relaxed italic text-[13px]">{exercise.explanation}</p>
                  )}
                  {exercise.espenTip && (
                    <p className="text-[13px] italic leading-relaxed" style={{ color: '#0d9488' }}>{exercise.espenTip}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {exState.showResult && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={onNext}
                  className="px-5 py-2.5 rounded-xl font-medium text-white hover:opacity-90 transition-colors text-sm"
                  style={{ backgroundColor: '#0d9488' }}
                >
                  {isLastExercise ? 'Fullfør tema ✓' : 'Neste øvelse →'}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

// ── Teacher custom exercises block ─────────────────────────────────────────

function TeacherCustomExercisesBlock({ storageKey }: { storageKey: string }) {
  const classCode = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('student-classroom-code') ?? '')
    : ''

  const [exercises, setExercises] = useState<TeacherCustomExercise[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    if (!classCode || !storageKey) return
    const key = `adventure-teacher-custom-${storageKey}-${classCode}`
    try {
      const raw = localStorage.getItem(key)
      if (raw) setExercises(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [storageKey, classCode])

  if (exercises.length === 0) return null

  const ex = exercises[currentIdx]
  const isLastEx = currentIdx === exercises.length - 1
  const isCorrect = selected === ex.correctIndex

  function handleSelect(idx: number) {
    if (showResult) return
    setSelected(idx)
    setShowResult(true)
  }

  function handleNext() {
    if (isLastEx) return
    setCurrentIdx(i => i + 1)
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-base">📝</span>
        <span className="text-sm font-bold text-teal-600">Ekstra oppgaver fra læreren</span>
        <span className="text-xs text-gray-400">({currentIdx + 1}/{exercises.length})</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          className="space-y-3"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-gray-900 font-medium text-sm">{ex.question}</p>
          </div>

          <div className="space-y-2">
            {ex.options.map((opt, i) => {
              if (!opt.trim()) return null
              const isSelected = selected === i
              const isChoiceCorrect = i === ex.correctIndex
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={`w-full text-left p-3 rounded-lg border transition-colors text-sm leading-relaxed ${
                    showResult
                      ? isChoiceCorrect
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : isSelected
                          ? 'bg-red-50 border-red-300 text-red-800'
                          : 'bg-gray-50 border-gray-200 text-gray-400'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-teal-400 hover:bg-teal-50/50 active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {showResult && (
                      <span className="mt-0.5 shrink-0 text-xs">
                        {isChoiceCorrect ? '✅' : isSelected ? '❌' : '○'}
                      </span>
                    )}
                    <span>{opt}</span>
                  </div>
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl border px-3 py-2 text-xs space-y-1 ${
                  isCorrect
                    ? 'bg-green-50 border-green-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {isCorrect ? 'Riktig!' : 'Ikke helt riktig'}
                </span>
                {ex.explanation && (
                  <p className="text-gray-600 leading-relaxed italic">{ex.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {showResult && !isLastEx && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
              >
                Neste oppgave →
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function DrawerModule({
  moduleCode,
  moduleTitle,
  moduleIcon,
  storageKey,
  completeRoute,
  phases,
  intro,
  vissteduAt,
  espenSier,
  presentationLink,
}: DrawerModuleProps) {
  useThemeEffect()
  const navigate = useNavigate()

  const totalPhases = phases.length
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const accordionRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [exStates, setExStates] = useState<PhaseExState[]>(
    phases.map(() => ({
      exerciseIndex: 0,
      selected: null,
      showResult: false,
      done: false,
      results: {},
    }))
  )

  const doneCount = exStates.filter(s => s.done).length
  const allDone = doneCount === totalPhases
  const progressPct = (doneCount / totalPhases) * 100

  const totalExercises = phases.reduce((sum, p) => sum + p.exercises.length, 0)
  const completedExercises = exStates.reduce((sum, ps, i) => {
    if (ps.done) return sum + phases[i].exercises.length
    return sum + ps.exerciseIndex
  }, 0)

  // First incomplete phase index for "Fortsett der du slapp"
  const firstIncompleteIdx = exStates.findIndex(s => !s.done)

  const closeDrawer = useCallback(() => setActiveIdx(null), [])

  function updateEx(idx: number, patch: Partial<PhaseExState>) {
    setExStates(prev => prev.map((s, i) => i === idx ? { ...s, ...patch } : s))
  }

  function handleSelect(phaseIdx: number, choiceId: string) {
    const ps = exStates[phaseIdx]
    if (ps.showResult) return
    const exercise = phases[phaseIdx].exercises[ps.exerciseIndex]
    const isLegacy = exercise.correctId === undefined
    const correct = isLegacy
      ? !!exercise.choices.find(c => c.id === choiceId)?.isCorrect
      : choiceId === exercise.correctId
    updateEx(phaseIdx, {
      selected: choiceId,
      showResult: true,
      results: { ...ps.results, [exercise.id]: correct },
    })
  }

  function handleNext(phaseIdx: number) {
    const ps = exStates[phaseIdx]
    const phase = phases[phaseIdx]
    const nextIdx = ps.exerciseIndex + 1
    if (nextIdx < phase.exercises.length) {
      updateEx(phaseIdx, { exerciseIndex: nextIdx, selected: null, showResult: false })
    } else {
      updateEx(phaseIdx, { done: true })
    }
    // Scroll accordion header into view so the next exercise is visible
    setTimeout(() => {
      accordionRefs.current[phaseIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function handleComplete() {
    const totalEx = phases.flatMap(p => p.exercises).length
    const correctCount = exStates.reduce(
      (sum, ps) => sum + Object.values(ps.results).filter(Boolean).length,
      0
    )
    localStorage.setItem(storageKey, JSON.stringify({
      completed: true,
      score: correctCount,
      total: totalEx,
      date: new Date().toISOString(),
    }))
    // Report progress to Firebase so teacher sees it in real time
    const classCode = localStorage.getItem('student-classroom-code')
    const studentName = localStorage.getItem('student-name')
    if (classCode && studentName) {
      const now = new Date().toISOString()
      const safeName = studentName.replace(/[.#$[\]]/g, '_')
      set(ref(db, `students/${classCode}/${safeName}/lastActive`), now)
      set(ref(db, `students/${classCode}/${safeName}/studentName`), studentName)
      set(ref(db, `students/${classCode}/${safeName}/modules/${storageKey}`), {
        title: moduleTitle, score: correctCount, total: totalEx, date: now,
      })
    }
    navigate(completeRoute, {
      state: { passed: true, score: correctCount, total: totalEx },
    })
  }

  // Determine module subject for badge color
  const subjectColors: Record<string, string> = {
    fd: 'bg-teal-50 text-teal-700 border-teal-200',
    mfi: 'bg-amber-50 text-amber-700 border-amber-200',
    kultur: 'bg-purple-50 text-purple-700 border-purple-200',
    ml1: 'bg-blue-50 text-blue-700 border-blue-200',
  }
  const subjectKey = moduleCode?.toLowerCase().includes('mfi') ? 'mfi'
    : moduleCode?.toLowerCase().includes('kultur') ? 'kultur'
    : moduleCode?.toLowerCase().includes('ml') ? 'ml1'
    : 'fd'
  const subjectBadgeClass = subjectColors[subjectKey] ?? 'bg-gray-50 text-gray-600 border-gray-200'

  // suppress unused warning for moduleIcon (received but not rendered per design spec)
  void moduleIcon

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ paddingBottom: '72px' }}>

      {/* 3px teal progress bar at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-100">
        <motion.div
          className="h-[3px]"
          style={{ backgroundColor: '#0d9488' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <div
        className="bg-white px-4 flex items-center"
        style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)', height: '52px', marginTop: '3px' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors text-lg"
              aria-label="Tilbake"
            >
              ←
            </button>
            <div className="min-w-0">
              <h1 className="font-medium text-gray-900 text-[15px] sm:text-[17px] truncate">
                {moduleTitle}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full border ${subjectBadgeClass}`}>
              {moduleCode}
            </span>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {doneCount}/{totalPhases}
            </span>
          </div>
        </div>
      </div>

      {/* Single-column accordion layout */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">

        {/* Presentation banner */}
        {presentationLink && (
          <div style={{ background: '#f0fdf9', border: '1px solid #99f6e4', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#0d9488', marginBottom: '2px' }}>Se presentasjon først</p>
              <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.4 }}>{presentationLink.title ?? moduleTitle} — visuell gjennomgang</p>
            </div>
            <button
              onClick={() => navigate(presentationLink.route)}
              style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: '7px', padding: '7px 14px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}
            >
              Åpne →
            </button>
          </div>
        )}

        {/* Intro */}
        <div className="rounded-xl bg-white p-4" style={{ border: '0.5px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <p className="text-gray-600 text-sm leading-relaxed">{intro}</p>
        </div>

        {/* Accordion phase list */}
        <div className="space-y-2">
          {phases.map((phase, idx) => {
            const isDone = exStates[idx].done
            const isOpen = activeIdx === idx
            const exCount = phase.exercises.length
            const exDone = isDone ? exCount : exStates[idx].exerciseIndex

            return (
              <div
                key={phase.phaseNumber}
                ref={el => { accordionRefs.current[idx] = el }}
                className="rounded-xl bg-white overflow-hidden"
                style={{
                  border: isOpen ? '1.5px solid #0d9488' : isDone ? '0.5px solid #bbf7d0' : '0.5px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  scrollMarginTop: '64px',
                }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full text-left px-4 py-[10px] flex items-center gap-3"
                  style={{ background: isDone && !isOpen ? '#f0fdf4' : '#fff' }}
                >
                  <span
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center font-medium text-sm shrink-0"
                    style={isDone
                      ? { backgroundColor: '#dcfce7', color: '#16a34a' }
                      : isOpen
                        ? { backgroundColor: '#0d9488', color: '#fff' }
                        : { backgroundColor: '#f3f4f6', color: '#9ca3af' }
                    }
                  >
                    {isDone ? '✓' : phase.phaseNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium text-sm truncate ${isDone ? 'text-green-700' : isOpen ? 'text-gray-900' : 'text-gray-800'}`}>
                      {phase.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">{exDone}/{exCount} øvelser</p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-base shrink-0"
                    style={{ color: isOpen ? '#0d9488' : '#d1d5db' }}
                  >
                    ›
                  </motion.span>
                </button>

                {/* Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}
                    >
                      <DrawerContent
                        phase={phase}
                        moduleTitle={moduleTitle}
                        exState={exStates[idx]}
                        onSelect={(id) => handleSelect(idx, id)}
                        onNext={() => handleNext(idx)}
                        onClose={() => setActiveIdx(null)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Teacher custom exercises */}
        <TeacherCustomExercisesBlock storageKey={storageKey} />

        {/* Complete section */}
        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-2">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <span className="text-xl shrink-0">💡</span>
                <div>
                  <p className="text-amber-700 font-medium text-xs mb-1">Visste du at...?</p>
                  <p className="text-amber-800 text-xs leading-relaxed">{vissteduAt}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-teal-200 p-4 flex gap-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <span className="text-2xl shrink-0">🧑‍💼</span>
                <div>
                  <p className="text-xs mb-1 font-medium" style={{ color: '#0d9488' }}>Espen sier:</p>
                  <p className="text-gray-600 text-xs leading-relaxed italic">"{espenSier}"</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleComplete} className="px-6 py-3 rounded-xl font-medium text-white text-sm" style={{ backgroundColor: '#0d9488' }}>
                  Se resultater →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 flex items-center justify-between gap-4 z-30"
        style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)' }}
      >
        <span className="text-sm text-gray-500">
          {doneCount} av {totalPhases} temaer fullført · {completedExercises} av {totalExercises} øvelser
        </span>
        {!allDone && firstIncompleteIdx >= 0 && (
          <button
            onClick={() => setActiveIdx(firstIncompleteIdx)}
            className="shrink-0 px-4 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#0d9488' }}
          >
            Fortsett der du slapp →
          </button>
        )}
      </div>

      <GlossaryPopup />
    </div>
  )
}
