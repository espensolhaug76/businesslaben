import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GlossaryTermBadge from '../../../components/ui/GlossaryTermBadge'
import GlossaryPopup from '../../../components/ui/GlossaryPopup'
import { useThemeEffect } from '../../../components/ui/ThemeToggle'
import type { InterleavedStep, TheoryPhaseData } from './InterleavedModule'
import type { QuizExercise } from './QuizModule'

// ── Types ──────────────────────────────────────────────────────────────────

interface Phase {
  phaseNumber: number
  theory: TheoryPhaseData
  exercises: QuizExercise[]
}

interface PhaseState {
  expanded: boolean
  exerciseIndex: number
  selected: string | null
  showResult: boolean
  done: boolean
  results: Record<string, boolean>
}

export interface InlinePhaseModuleProps {
  moduleCode: string
  moduleTitle: string
  moduleIcon: string
  storageKey: string
  completeRoute: string
  steps: InterleavedStep[]
  intro: string
  vissteduAt: string
  espenSier: string
}

// ── Theory card ────────────────────────────────────────────────────────────

function TheoryPhaseCard({
  phase,
  phaseNumber,
  isDone,
  onExpand,
}: {
  phase: TheoryPhaseData
  phaseNumber: number
  isDone: boolean
  onExpand: () => void
}) {
  return (
    <div className="theory-bg rounded-2xl border border-slate-700/50 p-5 space-y-3">
      {/* Phase header */}
      <div className="flex items-center gap-3">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
          isDone
            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
            : 'bg-teal-500/20 border border-teal-500/30 text-teal-400'
        }`}>
          {isDone ? '✓' : phaseNumber}
        </span>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{phase.icon}</span>
          <h2 className="font-bold theory-text text-base leading-snug">{phase.title}</h2>
        </div>
      </div>

      {/* Quote */}
      <p className="theory-subtext text-sm leading-relaxed italic border-l-2 border-teal-500/40 pl-3">
        "{phase.quote}"
      </p>

      {/* Main content */}
      {phase.content && (
        <p className="theory-subtext text-sm leading-relaxed">{phase.content}</p>
      )}

      {/* Subpoints */}
      {phase.subpoints && phase.subpoints.length > 0 && (
        <div className="space-y-2">
          {phase.subpoints.map((sp, j) => (
            <div key={j} className="pl-3 border-l-2 border-teal-500/30">
              <p className="text-xs font-semibold theory-text">{sp.label}</p>
              <p className="theory-subtext text-xs leading-relaxed mt-0.5">{sp.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Practical */}
      <p className="theory-muted text-xs leading-relaxed">
        <span className="theory-muted font-medium">Praktisk: </span>{phase.practical}
      </p>

      {/* Glossary badge */}
      {phase.glossaryTerm && (
        <div className="pt-0.5">
          <GlossaryTermBadge term={phase.glossaryTerm} />
        </div>
      )}

      {/* Øv deg button */}
      {!isDone && (
        <div className="pt-1">
          <button
            onClick={onExpand}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-500/15 border border-teal-500/40 text-teal-400 hover:bg-teal-500/25 transition-colors"
          >
            Øv deg →
          </button>
        </div>
      )}
    </div>
  )
}

// ── Inline exercise section ────────────────────────────────────────────────

function InlineExercise({
  exercise,
  selected,
  showResult,
  onSelect,
}: {
  exercise: QuizExercise
  selected: string | null
  showResult: boolean
  onSelect: (id: string) => void
}) {
  const isCorrect = exercise.choices.find(c => c.id === selected)?.isCorrect ?? false

  return (
    <div className="space-y-3">
      {/* Question card */}
      <div className="theory-bg rounded-xl border border-teal-500/20 p-4">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl shrink-0">{exercise.icon}</span>
          <div>
            <h3 className="font-bold theory-text text-sm">{exercise.title}</h3>
            {exercise.context && (
              <p className="theory-subtext text-xs mt-1 leading-relaxed">{exercise.context}</p>
            )}
          </div>
        </div>
        <p className="theory-text font-medium text-sm">{exercise.question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {exercise.choices.map((choice, i) => {
          const isSelected = selected === choice.id
          return (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(choice.id)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-xl border-2 transition-colors text-sm leading-relaxed ${
                showResult
                  ? choice.isCorrect
                    ? 'bg-emerald-500/15 border-emerald-500/50'
                    : isSelected
                      ? 'bg-red-500/15 border-red-500/50'
                      : 'bg-slate-800/40 border-slate-700/30 theory-muted'
                  : 'bg-slate-800 border-slate-600/50 text-white hover:border-teal-500/50 hover:bg-slate-700 active:scale-[0.99]'
              }`}
            >
              <div className="flex items-start gap-2">
                {showResult && (
                  <span className="mt-0.5 flex-shrink-0 text-xs">
                    {choice.isCorrect ? '✅' : isSelected ? '❌' : '○'}
                  </span>
                )}
                <span className={showResult ? 'theory-text' : ''}>{choice.label}</span>
              </div>
              {showResult && (isSelected || choice.isCorrect) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-slate-400/30 text-xs theory-subtext"
                >
                  {choice.feedback}
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Result badge */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border px-3 py-2 text-xs font-medium ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
          >
            {isCorrect ? '✅ Riktig!' : '💡 Ikke helt — se forklaringen over'}
            {exercise.espenTip && (
              <span className="ml-2 text-teal-400 font-normal">{exercise.espenTip}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function InlinePhaseModule({
  moduleCode,
  moduleTitle,
  moduleIcon,
  storageKey,
  completeRoute,
  steps,
  intro,
  vissteduAt,
  espenSier,
}: InlinePhaseModuleProps) {
  useThemeEffect()
  const navigate = useNavigate()

  // Build phases from alternating theory/exercises steps
  const phases: Phase[] = []
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i]
    if (s.type === 'theory') {
      const next = steps[i + 1]
      if (next?.type === 'exercises') {
        phases.push({ phaseNumber: s.phaseNumber, theory: s.phase, exercises: next.exercises })
        i++ // skip next
      }
    }
  }

  const [phaseStates, setPhaseStates] = useState<PhaseState[]>(
    phases.map(() => ({
      expanded: false,
      exerciseIndex: 0,
      selected: null,
      showResult: false,
      done: false,
      results: {},
    }))
  )

  const doneCount = phaseStates.filter(s => s.done).length
  const allDone = doneCount === phases.length
  const progressPct = (doneCount / phases.length) * 100

  function updatePhase(phaseIdx: number, patch: Partial<PhaseState>) {
    setPhaseStates(prev => prev.map((s, i) => i === phaseIdx ? { ...s, ...patch } : s))
  }

  function handleExpand(phaseIdx: number) {
    updatePhase(phaseIdx, { expanded: true })
  }

  function handleSelect(phaseIdx: number, choiceId: string) {
    const ps = phaseStates[phaseIdx]
    const phase = phases[phaseIdx]
    const exercise = phase.exercises[ps.exerciseIndex]
    if (ps.showResult) return
    const choice = exercise.choices.find(c => c.id === choiceId)!
    updatePhase(phaseIdx, {
      selected: choiceId,
      showResult: true,
      results: { ...ps.results, [exercise.id]: choice.isCorrect },
    })
  }

  function handleNextExercise(phaseIdx: number) {
    const ps = phaseStates[phaseIdx]
    const phase = phases[phaseIdx]
    const nextIdx = ps.exerciseIndex + 1
    if (nextIdx < phase.exercises.length) {
      updatePhase(phaseIdx, {
        exerciseIndex: nextIdx,
        selected: null,
        showResult: false,
      })
    } else {
      // Phase complete
      updatePhase(phaseIdx, {
        done: true,
        expanded: false,
      })
    }
  }

  function handleComplete() {
    const totalExercises = phases.flatMap(p => p.exercises).length
    const correctCount = phaseStates.reduce((sum, ps) => {
      return sum + Object.values(ps.results).filter(Boolean).length
    }, 0)
    localStorage.setItem(storageKey, JSON.stringify({
      completed: true,
      score: correctCount,
      total: totalExercises,
      date: new Date().toISOString(),
    }))
    navigate(completeRoute, { state: { passed: true, score: correctCount, total: totalExercises } })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-28">

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-xl sm:text-2xl shrink-0">{moduleIcon}</span>
              <div className="min-w-0">
                <h1 className="font-bold theory-text text-sm sm:text-lg truncate">
                  {moduleCode}: {moduleTitle}
                </h1>
                <p className="theory-muted text-xs">
                  {allDone ? 'Alle temaer øvd! 🎉' : `${doneCount} av ${phases.length} temaer øvd`}
                </p>
              </div>
            </div>
            <div className="text-teal-400 font-bold text-xs sm:text-sm shrink-0 whitespace-nowrap">
              {doneCount}/{phases.length} ferdig
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-teal-500 h-2 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Intro */}
        <div className="theory-bg rounded-2xl border border-slate-700/50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl shrink-0">{moduleIcon}</span>
            <p className="theory-subtext text-sm leading-relaxed">{intro}</p>
          </div>
        </div>

        {/* Phase cards */}
        {phases.map((phase, phaseIdx) => {
          const ps = phaseStates[phaseIdx]
          const currentExercise = phase.exercises[ps.exerciseIndex]
          const isLast = ps.exerciseIndex === phase.exercises.length - 1

          return (
            <motion.div
              key={phase.phaseNumber}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIdx * 0.06 }}
            >
              <TheoryPhaseCard
                phase={phase.theory}
                phaseNumber={phase.phaseNumber}
                isDone={ps.done}
                onExpand={() => handleExpand(phaseIdx)}
              />

              {/* Inline exercises */}
              <AnimatePresence>
                {ps.expanded && !ps.done && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pl-4 border-l-2 border-teal-500/30 space-y-4">
                      {/* Exercise badge */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                          📝 Øvelse {ps.exerciseIndex + 1} av {phase.exercises.length}
                        </span>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${phaseIdx}-${ps.exerciseIndex}`}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                        >
                          <InlineExercise
                            exercise={currentExercise}
                            selected={ps.selected}
                            showResult={ps.showResult}
                            onSelect={(id) => handleSelect(phaseIdx, id)}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {ps.showResult && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleNextExercise(phaseIdx)}
                            className="px-5 py-2.5 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
                          >
                            {isLast ? 'Ferdig med tema ✓' : 'Neste øvelse →'}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Done badge under card */}
              <AnimatePresence>
                {ps.done && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2"
                  >
                    <span>✅</span>
                    <span>Tema øvd — bra jobbet!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Complete section */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-2"
            >
              {/* Visste du at */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3">
                <span className="text-xl shrink-0">💡</span>
                <div>
                  <p className="text-amber-300 font-semibold text-xs mb-1">Visste du at...?</p>
                  <p className="text-amber-100/80 text-xs leading-relaxed">{vissteduAt}</p>
                </div>
              </div>
              {/* Espen sier */}
              <div className="theory-bg rounded-xl border border-teal-500/30 p-4 flex gap-3">
                <span className="text-2xl shrink-0">🧑‍💼</span>
                <div>
                  <p className="text-teal-400 font-semibold text-xs mb-1">Espen sier:</p>
                  <p className="theory-subtext text-xs leading-relaxed italic">"{espenSier}"</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
                >
                  Se resultater →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <GlossaryPopup />
    </div>
  )
}
