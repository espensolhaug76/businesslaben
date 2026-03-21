import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { GameButton, AnimatedNumber } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const capitalOptions = [
  {
    amount: 50_000,
    label: '50 000 kr',
    icon: '🌱',
    desc: 'Stram start',
    detail: 'Krever nøye planlegging. Begrenset sortiment og markedsføring.',
    difficulty: 'Vanskelig',
    diffColor: 'text-red-400',
  },
  {
    amount: 100_000,
    label: '100 000 kr',
    icon: '📈',
    desc: 'Solid grunnlag',
    detail: 'Plass til et godt sortiment og noe markedsføring.',
    difficulty: 'Middels',
    diffColor: 'text-amber-400',
  },
  {
    amount: 150_000,
    label: '150 000 kr',
    icon: '💼',
    desc: 'Komfortabel start',
    detail: 'Godt rom for å eksperimentere med ulike strategier.',
    difficulty: 'Lett',
    diffColor: 'text-emerald-400',
  },
  {
    amount: 200_000,
    label: '200 000 kr',
    icon: '🏆',
    desc: 'Full frihet',
    detail: 'Maksimal fleksibilitet. Kan satse stort fra dag én.',
    difficulty: 'Veldig lett',
    diffColor: 'text-teal-400',
  },
]

export default function StartingCapitalScreen() {
  const navigate = useNavigate()
  const { startingMoney, setStartingCapital, purchasedProducts } = useGameStore()
  const [selected, setSelected] = useState(startingMoney || 0)

  const canProceed = selected > 0

  // Calculate how much was spent on products
  const productSpend = purchasedProducts.reduce((sum, p) => {
    return sum + (p.stockWomen + p.stockMen) * p.costPerUnitAdult + p.stockKids * p.costPerUnitKids
  }, 0)

  function handleStart() {
    if (!canProceed) return
    setStartingCapital(selected)
    useGameStore.setState({ currentMoney: selected - productSpend })
    navigate('/city')
  }

  function handleBack() {
    navigate('/products')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="py-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-extrabold text-white mb-2">Velg startkapital</h1>
        <p className="text-slate-400">Hvor mye penger starter du med?</p>
      </motion.div>

      {/* Capital options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {capitalOptions.map((opt, i) => {
          const remaining = opt.amount - productSpend
          const tooLow = remaining < 0

          return (
            <motion.button
              key={opt.amount}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 250, damping: 20 }}
              whileHover={tooLow ? {} : { y: -4, scale: 1.02 }}
              whileTap={tooLow ? {} : { scale: 0.97 }}
              onClick={() => !tooLow && setSelected(opt.amount)}
              disabled={tooLow}
              className={`relative p-6 rounded-2xl text-left transition-colors duration-200 border-2 overflow-hidden ${
                tooLow
                  ? 'border-slate-800 bg-slate-900/40 opacity-50 cursor-not-allowed'
                  : selected === opt.amount
                    ? 'border-teal-400 bg-slate-800 shadow-lg shadow-teal-500/10'
                    : 'border-slate-700/50 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <motion.div
                animate={selected === opt.amount ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="text-4xl mb-3"
              >
                {opt.icon}
              </motion.div>
              <div className="font-bold text-2xl text-white mb-1">{opt.label}</div>
              <div className="text-sm text-teal-400 font-medium mb-2">{opt.desc}</div>
              <div className="text-sm text-slate-400 mb-3">{opt.detail}</div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wide ${opt.diffColor}`}>
                  {opt.difficulty}
                </span>
                {!tooLow && (
                  <span className="text-xs text-slate-500">
                    Etter kjøp: {formatKr(remaining)}
                  </span>
                )}
                {tooLow && (
                  <span className="text-xs text-red-400">
                    Ikke nok (mangler {formatKr(Math.abs(remaining))})
                  </span>
                )}
              </div>

              {selected === opt.amount && !tooLow && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Summary */}
      {selected > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Startkapital</span>
            <span className="font-bold text-white">{formatKr(selected)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Produktkjøp</span>
            <span className="font-bold text-red-400">-{formatKr(productSpend)}</span>
          </div>
          <div className="border-t border-teal-500/20 pt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-teal-400">Tilgjengelig ved spillstart</span>
            <AnimatedNumber
              value={selected - productSpend}
              className="font-bold text-xl text-teal-300"
            />
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between"
      >
        <GameButton
          onClick={handleBack}
          className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
        >
          ← Tilbake
        </GameButton>
        <GameButton
          onClick={handleStart}
          disabled={!canProceed}
          pulse={canProceed}
          className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-xl hover:shadow-teal-500/40'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          🚀 Start spillet!
        </GameButton>
      </motion.div>
    </motion.div>
  )
}
