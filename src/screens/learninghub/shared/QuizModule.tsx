import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GlossaryTermBadge from '../../../components/ui/GlossaryTermBadge'
import GlossaryPopup from '../../../components/ui/GlossaryPopup'

export interface QuizChoice {
  id: string
  label: string
  isCorrect: boolean
  feedback: string
}

export interface QuizExercise {
  id: string
  icon: string
  title: string
  context?: string
  question: string
  choices: QuizChoice[]
  espenTip: string
  multiCorrect?: boolean // allow multiple correct answers
}

export interface TheoryConcept {
  term: string
  definition: string
  example: string
}

export interface TheoryPhase {
  icon: string
  title: string
  quote: string
  practical: string
  glossaryTerm?: string
  content?: string
  subpoints?: Array<{ label: string; text: string }>
}

export interface TheoryData {
  intro: string
  concepts: TheoryConcept[]
  phases?: TheoryPhase[]
  vissteduAt: string
  espenSier: string
  regneeksempel?: string[]
  interactiveMatrix?: boolean
}

interface Props {
  moduleCode: string   // e.g. "MFI2"
  moduleTitle: string  // e.g. "Markedsføringsloven"
  moduleIcon: string
  storageKey: string
  completeRoute: string
  exercises: QuizExercise[]
  theory?: TheoryData
}

const PASS_THRESHOLD = 3

function RisikomatriseInteractive() {
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null)

  function getColor(score: number) {
    if (score <= 6) return 'bg-emerald-500/70 text-white'
    if (score <= 15) return 'bg-amber-400/80 text-slate-900'
    return 'bg-red-500/70 text-white'
  }

  function getRiskLabel(score: number) {
    if (score <= 6) return 'Lav risiko'
    if (score <= 15) return 'Middels risiko'
    return 'Høy risiko'
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-start">
        <div className="flex flex-col items-center justify-center self-stretch">
          <span className="text-[10px] theory-muted" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Konsekvens →
          </span>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map(row => (
            <div key={row} className="flex gap-1 items-center">
              <span className="w-4 text-[10px] theory-muted text-right shrink-0">{row}</span>
              {[1, 2, 3, 4, 5].map(col => {
                const score = row * col
                const isHovered = hovered?.r === row && hovered?.c === col
                return (
                  <button
                    key={col}
                    onMouseEnter={() => setHovered({ r: row, c: col })}
                    onMouseLeave={() => setHovered(null)}
                    className={`flex-1 h-9 rounded text-xs font-bold transition-all ${getColor(score)} ${isHovered ? 'scale-110 shadow-lg z-10 relative' : ''}`}
                  >
                    {score}
                  </button>
                )
              })}
            </div>
          ))}
          <div className="flex gap-1 mt-1">
            <div className="w-4 shrink-0" />
            {[1, 2, 3, 4, 5].map(c => (
              <div key={c} className="flex-1 text-[10px] theory-muted text-center">{c}</div>
            ))}
          </div>
          <div className="text-center text-[10px] theory-muted">Sannsynlighet →</div>
        </div>
      </div>

      {hovered ? (
        <p className="text-center text-xs text-slate-300">
          Sannsynlighet {hovered.c} × Konsekvens {hovered.r} ={' '}
          <span className="font-bold text-white">{hovered.r * hovered.c}</span>
          {' '}— {getRiskLabel(hovered.r * hovered.c)}
        </p>
      ) : (
        <p className="text-center text-[11px] theory-muted">Hold musepekeren over en celle</p>
      )}

      <div className="flex gap-4 justify-center text-[10px] theory-muted">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />Lav (1–6)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-amber-400 inline-block" />Middels (7–15)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-500 inline-block" />Høy (16–25)
        </span>
      </div>
    </div>
  )
}

export default function QuizModule({
  moduleCode,
  moduleTitle,
  moduleIcon,
  storageKey,
  completeRoute,
  exercises,
  theory,
}: Props) {
  const navigate = useNavigate()
  const [showTheory, setShowTheory] = useState(!!theory)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [passedCount, setPassedCount] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showEspen, setShowEspen] = useState(false)

  const exercise = exercises[currentIndex]
  const chosenChoice = exercise.choices.find(c => c.id === selected)
  const isCorrect = chosenChoice?.isCorrect ?? false

  const progress = showTheory ? 0 : (currentIndex / exercises.length) * 100

  function handleSelect(id: string) {
    if (showResult) return
    const choice = exercise.choices.find(c => c.id === id)!
    setSelected(id)
    setShowResult(true)
    if (choice.isCorrect) setPassedCount(p => p + 1)
    setShowEspen(true)
    setTimeout(() => setShowEspen(false), 6000)
  }

  function handleNext() {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setShowResult(false)
      setShowEspen(false)
    } else {
      const passed = passedCount >= PASS_THRESHOLD
      localStorage.setItem(storageKey, JSON.stringify({
        completed: passed,
        score: passedCount,
        total: exercises.length,
        date: new Date().toISOString(),
      }))
      navigate(completeRoute, { state: { passed, score: passedCount, total: exercises.length } })
    }
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
                <h1 className="font-bold text-white text-sm sm:text-lg truncate">{moduleCode}: {moduleTitle}</h1>
                <p className="theory-muted text-xs">
                  {showTheory
                    ? 'Teori — les før du starter'
                    : `Øvelse ${currentIndex + 1} av ${exercises.length}`}
                </p>
              </div>
            </div>
            {!showTheory && (
              <div className="text-teal-400 font-bold text-xs sm:text-sm shrink-0">{passedCount}/{PASS_THRESHOLD} riktige</div>
            )}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-teal-500 h-2 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* ── THEORY SECTION ─────────────────────────────────────── */}
        {showTheory && theory && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Intro */}
            <div className="theory-bg rounded-2xl border border-slate-700/50 p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{moduleIcon}</span>
                <div>
                  <h2 className="text-lg font-bold theory-text mb-1">Teoridel</h2>
                  <p className="theory-subtext text-sm leading-relaxed">{theory.intro}</p>
                </div>
              </div>
            </div>

            {/* Key concepts */}
            {theory.concepts.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide px-1">Nøkkelbegreper</h3>
                {theory.concepts.map((concept, i) => (
                  <motion.div
                    key={concept.term}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="theory-bg rounded-xl border border-slate-700/50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-xs shrink-0">
                        {i + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold theory-text text-sm">{concept.term}</p>
                        <p className="theory-subtext text-xs leading-relaxed">{concept.definition}</p>
                        <p className="theory-muted text-xs italic leading-relaxed">💡 {concept.example}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Phase steps (e.g. Salgsprosessen, Produkt og behov) */}
            {theory.phases && theory.phases.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide px-1">Steg for steg</h3>
                {theory.phases.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="theory-bg rounded-xl border border-slate-700/50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-xs shrink-0">
                        {i + 1}
                      </span>
                      <div className="space-y-1.5 min-w-0 w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{phase.icon}</span>
                          <p className="font-semibold theory-text text-sm">{phase.title}</p>
                        </div>
                        <p className="theory-subtext text-xs leading-relaxed italic">"{phase.quote}"</p>
                        {/* Rich content paragraph */}
                        {phase.content && (
                          <p className="theory-subtext text-xs leading-relaxed mt-1">{phase.content}</p>
                        )}
                        {/* Subpoints (e.g. NIVÅ 1–5) */}
                        {phase.subpoints && phase.subpoints.map((sp, j) => (
                          <div key={j} className="mt-2 pl-3 border-l-2 border-teal-500/30">
                            <p className="text-xs font-semibold theory-text">{sp.label}</p>
                            <p className="theory-subtext text-xs leading-relaxed mt-0.5">{sp.text}</p>
                          </div>
                        ))}
                        <p className="theory-muted text-xs leading-relaxed">
                          <span className="theory-muted font-medium">Praktisk: </span>{phase.practical}
                        </p>
                        {phase.glossaryTerm && (
                          <div className="pt-0.5">
                            <GlossaryTermBadge term={phase.glossaryTerm} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Regneeksempel (Lønn module) */}
            {theory.regneeksempel && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-blue-300 font-semibold text-sm mb-2">🧮 Regneeksempel</h4>
                <div className="space-y-1">
                  {theory.regneeksempel.map((line, i) => (
                    <p key={i} className={`text-xs leading-relaxed ${line.startsWith('─') || line === '' ? 'text-slate-600' : line.startsWith('TOTAL') ? 'theory-text font-bold' : 'theory-subtext'}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive risk matrix (Risikoanalyse module) */}
            {theory.interactiveMatrix && (
              <div className="theory-bg rounded-xl border border-slate-700/50 p-4">
                <h4 className="theory-text font-semibold text-sm mb-3">🟩 Risikomatrise — interaktiv</h4>
                <RisikomatriseInteractive />
              </div>
            )}

            {/* Visste du at */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <div>
                <p className="text-amber-300 font-semibold text-xs mb-1">Visste du at...?</p>
                <p className="text-amber-100/80 text-xs leading-relaxed">{theory.vissteduAt}</p>
              </div>
            </div>

            {/* Espen says */}
            <div className="theory-bg rounded-xl border border-teal-500/30 p-4 flex gap-3">
              <span className="text-2xl shrink-0">🧑‍💼</span>
              <div>
                <p className="text-teal-400 font-semibold text-xs mb-1">Espen sier:</p>
                <p className="theory-subtext text-xs leading-relaxed italic">"{theory.espenSier}"</p>
              </div>
            </div>

            {/* Start exercises button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowTheory(false)}
                className="px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
              >
                Start øvelser →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── QUIZ SECTION ───────────────────────────────────────── */}
        {!showTheory && (
          <>
            {/* Exercise card */}
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="theory-bg rounded-2xl border border-slate-700/50 p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{exercise.icon}</span>
                <div>
                  <h2 className="text-lg font-bold theory-text">{exercise.title}</h2>
                  {exercise.context && (
                    <p className="theory-subtext text-sm mt-1 leading-relaxed">{exercise.context}</p>
                  )}
                </div>
              </div>
              <p className="theory-text font-medium text-sm">{exercise.question}</p>
            </motion.div>

            {/* Choices */}
            <div className="space-y-3">
              {exercise.choices.map((choice, i) => {
                const isSelected = selected === choice.id
                const showFeedback = showResult

                return (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleSelect(choice.id)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors text-sm leading-relaxed ${
                      showFeedback
                        ? choice.isCorrect
                          ? 'bg-emerald-500/15 border-emerald-500/50'
                          : isSelected
                            ? 'bg-red-500/15 border-red-500/50'
                            : 'bg-slate-800/40 border-slate-700/30 theory-muted'
                        : 'bg-slate-800 border-slate-600/50 text-white hover:border-teal-500/50 hover:bg-slate-700 active:scale-[0.99]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {showFeedback && (
                        <span className="mt-0.5 flex-shrink-0">
                          {choice.isCorrect ? '✅' : isSelected ? '❌' : '○'}
                        </span>
                      )}
                      <span className={showFeedback ? 'theory-text' : ''}>{choice.label}</span>
                    </div>
                    {showFeedback && (isSelected || choice.isCorrect) && (
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
                  className={`rounded-2xl border p-4 text-sm theory-text ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  {isCorrect ? '✅ Riktig!' : '💡 Ikke helt — se forklaring over'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {showResult && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors"
                >
                  {currentIndex < exercises.length - 1 ? 'Neste øvelse →' : 'Se resultater →'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Glossary popup — available on all learning module pages */}
      <GlossaryPopup />

      {/* Espen avatar */}
      <div className="fixed bottom-24 right-6 z-40 flex items-end gap-3">
        <AnimatePresence>
          {showEspen && !showTheory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="max-w-[240px] theory-bg backdrop-blur-sm border border-slate-600 rounded-xl rounded-br-none p-3 shadow-xl"
            >
              <p className="text-xs theory-subtext leading-relaxed">{exercise.espenTip}</p>
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
