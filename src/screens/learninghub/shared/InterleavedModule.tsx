import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GlossaryTermBadge from '../../../components/ui/GlossaryTermBadge'
import GlossaryPopup from '../../../components/ui/GlossaryPopup'
import { useThemeEffect } from '../../../components/ui/ThemeToggle'
import type { QuizExercise } from './QuizModule'

// ── Types ──────────────────────────────────────────────────────────────────

export interface TheoryPhaseData {
  icon: string
  title: string
  quote: string
  practical: string
  glossaryTerm?: string
  content?: string
  subpoints?: Array<{ label: string; text: string }>
}

export type InterleavedStep =
  | { type: 'theory'; phase: TheoryPhaseData; phaseNumber: number }
  | { type: 'exercises'; label: string; phaseNumber: number; exercises: QuizExercise[] }

export interface InterleavedModuleProps {
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

// ── TheoryPhaseCard ────────────────────────────────────────────────────────

function TheoryPhaseCard({ phase, phaseNumber }: { phase: TheoryPhaseData; phaseNumber: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="theory-bg rounded-2xl border border-slate-700/50 p-5 space-y-3"
    >
      {/* Phase header */}
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm shrink-0">
          {phaseNumber}
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
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function InterleavedModule({
  moduleCode,
  moduleTitle,
  moduleIcon,
  storageKey,
  completeRoute,
  steps,
  intro,
  vissteduAt,
  espenSier,
}: InterleavedModuleProps) {
  useThemeEffect()
  const navigate = useNavigate()

  // -1 = intro screen
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  // Within an exercise group
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  // Track correct answers by exercise id
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({})
  const [showEspen, setShowEspen] = useState(false)

  // ── Derived values ────────────────────────────────────────────────────────

  const totalSteps = steps.length
  const progressPct = currentStepIndex < 0 ? 0 : (currentStepIndex / totalSteps) * 100

  const currentStep = currentStepIndex >= 0 && currentStepIndex < totalSteps
    ? steps[currentStepIndex]
    : null

  const currentExercise = currentStep?.type === 'exercises'
    ? currentStep.exercises[currentExerciseIndex]
    : null

  const chosenChoice = currentExercise
    ? currentExercise.choices.find(c => c.id === selected)
    : null

  const isCorrect = chosenChoice?.isCorrect ?? false

  // Count totals for completion
  const allExercises = steps
    .filter((s): s is Extract<InterleavedStep, { type: 'exercises' }> => s.type === 'exercises')
    .flatMap(s => s.exercises)
  const totalExercises = allExercises.length
  const correctCount = Object.values(exerciseResults).filter(Boolean).length

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleSelect(id: string) {
    if (showResult || !currentExercise) return
    const choice = currentExercise.choices.find(c => c.id === id)!
    setSelected(id)
    setShowResult(true)
    setExerciseResults(prev => ({
      ...prev,
      [currentExercise.id]: choice.isCorrect,
    }))
    setShowEspen(true)
    setTimeout(() => setShowEspen(false), 6000)
  }

  function handleNext() {
    if (currentStep?.type === 'exercises') {
      const groupSize = currentStep.exercises.length
      if (currentExerciseIndex < groupSize - 1) {
        // Advance within exercise group
        setCurrentExerciseIndex(i => i + 1)
        setSelected(null)
        setShowResult(false)
        setShowEspen(false)
        return
      }
    }
    // Advance to next step
    advanceStep()
  }

  function advanceStep() {
    const nextIndex = currentStepIndex + 1
    if (nextIndex >= totalSteps) {
      // All done — save and navigate
      localStorage.setItem(storageKey, JSON.stringify({
        completed: true,
        score: correctCount,
        total: totalExercises,
        date: new Date().toISOString(),
      }))
      navigate(completeRoute, {
        state: { passed: true, score: correctCount, total: totalExercises },
      })
      return
    }
    setCurrentStepIndex(nextIndex)
    setCurrentExerciseIndex(0)
    setSelected(null)
    setShowResult(false)
    setShowEspen(false)
  }

  function handleBack() {
    if (currentStep?.type === 'exercises' && currentExerciseIndex > 0) {
      setCurrentExerciseIndex(i => i - 1)
      setSelected(null)
      setShowResult(false)
      setShowEspen(false)
      return
    }
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1
      const prevStep = steps[prevIndex]
      setCurrentStepIndex(prevIndex)
      if (prevStep.type === 'exercises') {
        setCurrentExerciseIndex(prevStep.exercises.length - 1)
      } else {
        setCurrentExerciseIndex(0)
      }
      setSelected(null)
      setShowResult(false)
      setShowEspen(false)
    } else {
      // Back to intro
      setCurrentStepIndex(-1)
      setCurrentExerciseIndex(0)
      setSelected(null)
      setShowResult(false)
      setShowEspen(false)
    }
  }

  // ── Sub-header label ──────────────────────────────────────────────────────

  function subHeaderLabel() {
    if (currentStepIndex < 0) return 'Introduksjon'
    if (!currentStep) return ''
    if (currentStep.type === 'theory') return `Fase ${currentStep.phaseNumber}: Teori`
    return `Fase ${currentStep.phaseNumber}: Øvelse ${currentExerciseIndex + 1} av ${currentStep.exercises.length}`
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-28">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-xl sm:text-2xl shrink-0">{moduleIcon}</span>
              <div className="min-w-0">
                <h1 className="font-bold text-white text-sm sm:text-lg truncate">
                  {moduleCode}: {moduleTitle}
                </h1>
                <p className="theory-muted text-xs">{subHeaderLabel()}</p>
              </div>
            </div>
            {currentStepIndex >= 0 && (
              <div className="text-teal-400 font-bold text-xs sm:text-sm shrink-0 whitespace-nowrap">
                {correctCount}/{totalExercises} riktige
              </div>
            )}
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-teal-500 h-2 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* ── INTRO SCREEN ────────────────────────────────────────── */}
        {currentStepIndex < 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="theory-bg rounded-2xl border border-slate-700/50 p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl shrink-0">{moduleIcon}</span>
                <div>
                  <h2 className="text-lg font-bold theory-text mb-2">{moduleTitle}</h2>
                  <p className="theory-subtext text-sm leading-relaxed">{intro}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStepIndex(0)}
                className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
              >
                Start →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── COMPLETION SCREEN ───────────────────────────────────── */}
        {currentStepIndex >= totalSteps && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
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
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  localStorage.setItem(storageKey, JSON.stringify({
                    completed: true,
                    score: correctCount,
                    total: totalExercises,
                    date: new Date().toISOString(),
                  }))
                  navigate(completeRoute, {
                    state: { passed: true, score: correctCount, total: totalExercises },
                  })
                }}
                className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
              >
                Se resultater →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── THEORY STEP ─────────────────────────────────────────── */}
        {currentStep?.type === 'theory' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`theory-${currentStepIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <TheoryPhaseCard phase={currentStep.phase} phaseNumber={currentStep.phaseNumber} />

              {/* Navigation */}
              <div className="flex justify-between gap-3 pt-2">
                <button
                  onClick={handleBack}
                  className="px-4 py-3 rounded-xl font-semibold bg-slate-800 border border-slate-600/50 theory-text hover:bg-slate-700 transition-colors text-sm"
                >
                  ← Forrige
                </button>
                <button
                  onClick={advanceStep}
                  className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
                >
                  {currentStepIndex === totalSteps - 1 ? 'Fullfør →' : 'Neste →'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── EXERCISE STEP ───────────────────────────────────────── */}
        {currentStep?.type === 'exercises' && currentExercise && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`ex-${currentStepIndex}-${currentExerciseIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                  📝 Øvelse til fase {currentStep.phaseNumber}
                </span>
              </div>

              {/* Exercise card */}
              <motion.div
                key={currentExercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="theory-bg rounded-2xl border border-slate-700/50 p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl shrink-0">{currentExercise.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold theory-text">{currentExercise.title}</h2>
                    {currentExercise.context && (
                      <p className="theory-subtext text-sm mt-1 leading-relaxed">{currentExercise.context}</p>
                    )}
                  </div>
                </div>
                <p className="theory-text font-medium text-sm">{currentExercise.question}</p>
              </motion.div>

              {/* Choices */}
              <div className="space-y-3">
                {currentExercise.choices.map((choice, i) => {
                  const isSelected = selected === choice.id
                  return (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => handleSelect(choice.id)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-colors text-sm leading-relaxed ${
                        showResult
                          ? choice.isCorrect
                            ? 'bg-emerald-500/15 border-emerald-500/50'
                            : isSelected
                              ? 'bg-red-500/15 border-red-500/50'
                              : 'bg-slate-800/40 border-slate-700/30 theory-muted'
                          : 'bg-slate-800 border-slate-600/50 text-white hover:border-teal-500/50 hover:bg-slate-700 active:scale-[0.99]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {showResult && (
                          <span className="mt-0.5 flex-shrink-0">
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

              {/* Result summary */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border p-4 text-sm ${
                      isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {isCorrect ? '✅ Riktig!' : '💡 Ikke helt — se forklaring over'}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation — only shown after answering (or back button always) */}
              <div className="flex justify-between gap-3 pt-2">
                <button
                  onClick={handleBack}
                  className="px-4 py-3 rounded-xl font-semibold bg-slate-800 border border-slate-600/50 theory-text hover:bg-slate-700 transition-colors text-sm"
                >
                  ← Forrige
                </button>
                {showResult && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
                  >
                    {currentStepIndex === totalSteps - 1 &&
                    currentExerciseIndex === currentStep.exercises.length - 1
                      ? 'Fullfør →'
                      : currentExerciseIndex < currentStep.exercises.length - 1
                        ? 'Neste øvelse →'
                        : 'Neste fase →'}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

      </div>

      {/* ── Glossary popup ───────────────────────────────────────────────── */}
      <GlossaryPopup />

      {/* ── Espen avatar ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-24 right-6 z-40 flex items-end gap-3">
        <AnimatePresence>
          {showEspen && currentExercise && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="max-w-[240px] theory-bg backdrop-blur-sm border border-slate-600 rounded-xl rounded-br-none p-3 shadow-xl"
            >
              <p className="text-xs theory-subtext leading-relaxed">{currentExercise.espenTip}</p>
              <div className="text-[10px] text-teal-400 mt-1 font-medium">— Espen, rådgiver</div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowEspen(p => !p)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg border-2 border-white/20 hover:scale-105 transition-transform"
        >
          🧑‍💼
        </button>
      </div>
    </div>
  )
}
