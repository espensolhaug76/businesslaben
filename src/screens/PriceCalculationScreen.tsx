import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton } from '../components/ui/animations'

/* ─── Types ─── */

interface StepResult {
  answer: string
  checked: boolean
  correct: boolean
}

interface CalculationSteps {
  innkjopspris: StepResult
  paslag: StepResult
  utsalgsprisEksMva: StepResult
  utsalgsprisInklMva: StepResult
  dekningsbidrag: StepResult
  dekningsgrad: StepResult
}

/* ─── Step definitions ─── */

const stepDefinitions = [
  {
    key: 'innkjopspris' as const,
    title: 'Steg 1: Innkjøpspris',
    label: 'Hva betaler du per enhet fra leverandøren?',
    formula: null,
    unit: 'kr',
    inputLabel: 'Innkjøpspris',
    isInput: true,
  },
  {
    key: 'paslag' as const,
    title: 'Steg 2: Påslag (avanse)',
    label: 'Hvor mange prosent påslag vil du legge på?',
    formula: null,
    unit: '%',
    inputLabel: 'Påslag',
    isInput: true,
  },
  {
    key: 'utsalgsprisEksMva' as const,
    title: 'Steg 3: Utsalgspris eks. MVA',
    label: 'Regn ut utsalgsprisen før MVA.',
    formula: 'Innkjøpspris × (1 + påslag / 100)',
    unit: 'kr',
    inputLabel: 'Utsalgspris eks. MVA',
    isInput: false,
  },
  {
    key: 'utsalgsprisInklMva' as const,
    title: 'Steg 4: Utsalgspris inkl. MVA (25%)',
    label: 'Legg til 25% MVA på utsalgsprisen.',
    formula: 'Utsalgspris eks. MVA × 1,25',
    unit: 'kr',
    inputLabel: 'Utsalgspris inkl. MVA',
    isInput: false,
  },
  {
    key: 'dekningsbidrag' as const,
    title: 'Steg 5: Dekningsbidrag',
    label: 'Hva sitter du igjen med per enhet (før faste kostnader)?',
    formula: 'Utsalgspris eks. MVA − Innkjøpspris',
    unit: 'kr',
    inputLabel: 'Dekningsbidrag',
    isInput: false,
  },
  {
    key: 'dekningsgrad' as const,
    title: 'Steg 6: Dekningsgrad',
    label: 'Hvor stor andel av utsalgsprisen er dekningsbidrag?',
    formula: '(Dekningsbidrag / Utsalgspris eks. MVA) × 100',
    unit: '%',
    inputLabel: 'Dekningsgrad',
    isInput: false,
  },
]

/* ─── Helper ─── */

function parseNum(val: string): number {
  const cleaned = val.replace(/,/g, '.').replace(/[^\d.]/g, '')
  return parseFloat(cleaned) || 0
}

/* ─── Component ─── */

export default function PriceCalculationScreen() {
  const navigate = useNavigate()
  const existing = useGameStore((s) => s.priceCalculationAnswers) as Record<string, string> | undefined
  const purchasedProducts = useGameStore((s) => s.purchasedProducts)
  const marketResearchTier = useGameStore((s) => s.marketResearchTier)

  const hasProducts = purchasedProducts.length > 0
  const [selectedProductIdx, setSelectedProductIdx] = useState(0)
  const selectedProduct = hasProducts ? purchasedProducts[selectedProductIdx] : null

  // Auto-fill innkjøpspris from selected product
  const autoInnkjopspris = selectedProduct ? String(selectedProduct.costPerUnitAdult) : ''

  const [steps, setSteps] = useState<CalculationSteps>({
    innkjopspris: { answer: existing?.innkjopspris || autoInnkjopspris, checked: false, correct: false },
    paslag: { answer: existing?.paslag || '', checked: false, correct: false },
    utsalgsprisEksMva: { answer: existing?.utsalgsprisEksMva || '', checked: false, correct: false },
    utsalgsprisInklMva: { answer: existing?.utsalgsprisInklMva || '', checked: false, correct: false },
    dekningsbidrag: { answer: existing?.dekningsbidrag || '', checked: false, correct: false },
    dekningsgrad: { answer: existing?.dekningsgrad || '', checked: false, correct: false },
  })

  const [justification, setJustification] = useState(existing?.justification || '')

  // When switching products, update innkjøpspris and reset calculations
  function handleProductSwitch(idx: number) {
    setSelectedProductIdx(idx)
    const prod = purchasedProducts[idx]
    setSteps({
      innkjopspris: { answer: String(prod.costPerUnitAdult), checked: false, correct: false },
      paslag: { answer: '', checked: false, correct: false },
      utsalgsprisEksMva: { answer: '', checked: false, correct: false },
      utsalgsprisInklMva: { answer: '', checked: false, correct: false },
      dekningsbidrag: { answer: '', checked: false, correct: false },
      dekningsgrad: { answer: '', checked: false, correct: false },
    })
    setJustification('')
  }

  // Parse base values
  const innkjopspris = parseNum(steps.innkjopspris.answer)
  const paslag = parseNum(steps.paslag.answer)

  // Correct answers
  const correctUtsalgsprisEksMva = innkjopspris * (1 + paslag / 100)
  const correctUtsalgsprisInklMva = correctUtsalgsprisEksMva * 1.25
  const correctDekningsbidrag = correctUtsalgsprisEksMva - innkjopspris
  const correctDekningsgrad = correctUtsalgsprisEksMva > 0
    ? (correctDekningsbidrag / correctUtsalgsprisEksMva) * 100
    : 0

  function getCorrectValue(key: keyof CalculationSteps): number {
    switch (key) {
      case 'utsalgsprisEksMva': return correctUtsalgsprisEksMva
      case 'utsalgsprisInklMva': return correctUtsalgsprisInklMva
      case 'dekningsbidrag': return correctDekningsbidrag
      case 'dekningsgrad': return correctDekningsgrad
      default: return 0
    }
  }

  function getTolerance(key: keyof CalculationSteps): number {
    if (key === 'dekningsgrad') return 1
    return 1
  }

  function getHint(key: keyof CalculationSteps): string {
    const correct = getCorrectValue(key)
    switch (key) {
      case 'utsalgsprisEksMva':
        return `Husk: ${innkjopspris} kr x (1 + ${paslag}/100) = ${correct.toFixed(0)} kr`
      case 'utsalgsprisInklMva':
        return `Husk: ${correctUtsalgsprisEksMva.toFixed(0)} kr x 1,25 = ${correct.toFixed(0)} kr`
      case 'dekningsbidrag':
        return `Husk: ${correctUtsalgsprisEksMva.toFixed(0)} kr - ${innkjopspris} kr = ${correct.toFixed(0)} kr`
      case 'dekningsgrad':
        return `Husk: (${correctDekningsbidrag.toFixed(0)} / ${correctUtsalgsprisEksMva.toFixed(0)}) x 100 = ${correct.toFixed(1)}%`
      default:
        return ''
    }
  }

  function updateStep(key: keyof CalculationSteps, answer: string) {
    setSteps((prev) => ({
      ...prev,
      [key]: { answer, checked: false, correct: false },
    }))
  }

  function checkStep(key: keyof CalculationSteps) {
    const studentAnswer = parseNum(steps[key].answer)
    const correctAnswer = getCorrectValue(key)
    const tolerance = getTolerance(key)
    const isCorrect = Math.abs(studentAnswer - correctAnswer) <= tolerance

    setSteps((prev) => ({
      ...prev,
      [key]: { ...prev[key], checked: true, correct: isCorrect },
    }))
  }

  // Input steps are always "correct" once they have a value > 0
  const inputStepsReady = innkjopspris > 0 && paslag > 0

  // Count how many calculation checks have passed
  const calculationKeys: (keyof CalculationSteps)[] = [
    'utsalgsprisEksMva',
    'utsalgsprisInklMva',
    'dekningsbidrag',
    'dekningsgrad',
  ]
  const allCalculationsCorrect = calculationKeys.every((key) => steps[key].correct)

  const wordCount = justification.trim().split(/\s+/).filter(Boolean).length
  const canProceed = allCalculationsCorrect && wordCount >= 20

  function handleNext() {
    if (!canProceed) return
    const answers: Record<string, string> = {
      innkjopspris: steps.innkjopspris.answer,
      paslag: steps.paslag.answer,
      utsalgsprisEksMva: steps.utsalgsprisEksMva.answer,
      utsalgsprisInklMva: steps.utsalgsprisInklMva.answer,
      dekningsbidrag: steps.dekningsbidrag.answer,
      dekningsgrad: steps.dekningsgrad.answer,
      justification,
    }

    // Update product retail price if products exist
    if (selectedProduct) {
      const retailPrice = correctUtsalgsprisInklMva
      const updatedProducts = purchasedProducts.map((p, i) =>
        i === selectedProductIdx
          ? { ...p, retailPriceAdult: Math.round(retailPrice), isPriced: true }
          : p
      )
      useGameStore.setState({
        priceCalculationAnswers: answers,
        purchasedProducts: updatedProducts,
        productPrice: Math.round(retailPrice),
      })
    } else {
      useGameStore.setState({ priceCalculationAnswers: answers })
    }
    navigate('/budget-planning')
  }

  return (
    <PageTransition>
      <div className="py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Priskalkulasjon</h1>
          <p className="text-slate-400">
            Regn ut prisen på produktet ditt steg for steg
          </p>
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-teal-300">
            I dette steget skal du lære hvordan man regner ut en utsalgspris fra
            innkjøpspris. Du må fylle inn hvert steg og sjekke svaret ditt før du kan
            gå videre.
          </p>
        </motion.div>

        {/* Product selector tabs (if products exist) */}
        {hasProducts && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17, duration: 0.4 }}
            className="mb-6"
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Velg produkt å prissette</h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {purchasedProducts.map((p, i) => (
                <button
                  key={p.productId}
                  onClick={() => handleProductSwitch(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    i === selectedProductIdx
                      ? 'bg-teal-500 text-white'
                      : p.isPriced
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {p.productName} {p.isPriced ? '✓' : ''}
                </button>
              ))}
            </div>
            {selectedProduct && (
              <div className="mt-2 text-xs text-slate-500">
                Innkjøpspris fra leverandør: <span className="text-white font-medium">{selectedProduct.costPerUnitAdult.toLocaleString('nb-NO')} kr</span>
                {selectedProduct.typicalRetailPrice > 0 && (
                  <span className="ml-3">Typisk markedspris: <span className="text-amber-400 font-medium">{selectedProduct.typicalRetailPrice.toLocaleString('nb-NO')} kr</span></span>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Market price comparison (if standard+ research purchased) */}
        {selectedProduct && (marketResearchTier === 'standard' || marketResearchTier === 'premium') && selectedProduct.typicalRetailPrice > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
            className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6"
          >
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">Markedsprisdata (fra Ipsos-rapport)</h3>
            <p className="text-sm text-amber-300">
              Typisk utsalgspris for lignende produkter: <span className="font-bold">{selectedProduct.typicalRetailPrice.toLocaleString('nb-NO')} kr</span>.
              Bruk dette som referanse når du velger påslag.
            </p>
          </motion.div>
        )}

        {/* Steps */}
        <div className="space-y-4">
          {stepDefinitions.map((stepDef, i) => {
            const step = steps[stepDef.key]
            const isCalculation = !stepDef.isInput
            const isDisabled = isCalculation && !inputStepsReady

            return (
              <motion.div
                key={stepDef.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                className={`bg-slate-800/80 rounded-2xl p-5 border transition-colors ${
                  step.checked && step.correct
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                    : step.checked && !step.correct
                      ? 'border-red-500/50'
                      : 'border-slate-700/50'
                } ${isDisabled ? 'opacity-40 pointer-events-none' : ''}`}
              >
                {/* Step header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wide">
                      {stepDef.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">{stepDef.label}</p>
                  </div>
                  <AnimatePresence>
                    {step.checked && step.correct && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                        className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                    {step.checked && !step.correct && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Formula display */}
                {stepDef.formula && (
                  <div className="bg-slate-900/60 rounded-xl px-4 py-2.5 mb-3 border border-slate-700/30">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Formel: </span>
                    <span className="text-sm text-amber-300 font-mono">{stepDef.formula}</span>
                  </div>
                )}

                {/* Input + check */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    {hasProducts && stepDef.key === 'innkjopspris' && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-teal-400">Auto</span>
                    )}
                    <input
                      type="text"
                      inputMode="decimal"
                      readOnly={hasProducts && stepDef.key === 'innkjopspris'}
                      value={step.answer}
                      onChange={(e) => updateStep(stepDef.key, e.target.value)}
                      placeholder={`Skriv inn ${stepDef.inputLabel.toLowerCase()}`}
                      className={`w-full rounded-lg px-4 py-3 text-sm text-right pr-12 outline-none ${
                        hasProducts && stepDef.key === 'innkjopspris'
                          ? 'bg-teal-500/5 border border-teal-500/30 text-teal-300 cursor-not-allowed pl-12'
                          : 'bg-slate-900/60 border border-slate-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
                      {stepDef.unit}
                    </span>
                  </div>
                  {isCalculation && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => checkStep(stepDef.key)}
                      disabled={!step.answer}
                      className={`px-4 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                        step.answer
                          ? 'bg-teal-600 hover:bg-teal-500 text-white'
                          : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Sjekk svar
                    </motion.button>
                  )}
                </div>

                {/* Hint on wrong answer */}
                <AnimatePresence>
                  {step.checked && !step.correct && isCalculation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' as const }}
                      className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <p className="text-sm text-red-300">{getHint(stepDef.key)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success message */}
                <AnimatePresence>
                  {step.checked && step.correct && isCalculation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' as const }}
                      className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                    >
                      <p className="text-sm text-emerald-300">Riktig! Bra jobba!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Summary card */}
        <AnimatePresence>
          {allCalculationsCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' as const }}
              className="mt-6 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-5"
            >
              <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">
                Oppsummering av priskalkulasjonen
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Innkjøpspris</span>
                  <span className="text-white font-medium">{innkjopspris.toLocaleString('nb-NO')} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Påslag</span>
                  <span className="text-white font-medium">{paslag}%</span>
                </div>
                <div className="flex justify-between border-t border-teal-500/20 pt-2">
                  <span className="text-slate-400">Utsalgspris eks. MVA</span>
                  <span className="text-white font-medium">{correctUtsalgsprisEksMva.toLocaleString('nb-NO')} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Utsalgspris inkl. MVA</span>
                  <span className="font-bold text-lg text-teal-400">
                    {correctUtsalgsprisInklMva.toLocaleString('nb-NO')} kr
                  </span>
                </div>
                <div className="flex justify-between border-t border-teal-500/20 pt-2">
                  <span className="text-slate-400">Dekningsbidrag</span>
                  <span className="text-emerald-400 font-medium">{correctDekningsbidrag.toLocaleString('nb-NO')} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dekningsgrad</span>
                  <span className="text-emerald-400 font-medium">{correctDekningsgrad.toFixed(1)}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Justification */}
        <AnimatePresence>
          {allCalculationsCorrect && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50"
            >
              <h2 className="text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wide">
                Begrunn din prissetting (min 20 ord)
              </h2>
              <p className="text-xs text-slate-400 mb-3">
                Forklar hvorfor du valgte denne prissettingen. Hva tenker du om dekningsgraden?
              </p>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={4}
                placeholder="Skriv din begrunnelse her..."
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-white text-sm placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
              />
              <div className="flex justify-between mt-2">
                <span className={`text-xs ${wordCount >= 20 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {wordCount}/20 ord {wordCount >= 20 ? ' riktig' : ''}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 mb-4"
        >
          <div className="flex items-center gap-2 justify-center">
            {calculationKeys.map((key) => (
              <div
                key={key}
                className={`w-3 h-3 rounded-full transition-colors ${
                  steps[key].correct
                    ? 'bg-emerald-500'
                    : steps[key].checked
                      ? 'bg-red-500'
                      : 'bg-slate-700'
                }`}
              />
            ))}
            <div
              className={`w-3 h-3 rounded-full transition-colors ${
                wordCount >= 20 ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-2">
            {calculationKeys.filter((k) => steps[k].correct).length}/4 beregninger fullført
            {wordCount >= 20 ? ' + begrunnelse' : ''}
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={() => navigate('/products')}
            className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
          >
            Tilbake
          </GameButton>
          <GameButton
            onClick={handleNext}
            disabled={!canProceed}
            pulse={canProceed}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              canProceed
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            Neste
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
