import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { GameButton } from '../components/ui/animations'

const industries = [
  {
    id: 'fashion',
    label: 'Mote',
    icon: '👗',
    desc: 'Klær, sko og tilbehør',
    examples: 'Hettegensere, jeans, sneakers, jakker, vesker',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'electronics',
    label: 'Elektronikk',
    icon: '📱',
    desc: 'Gadgets og teknologi',
    examples: 'Smarttelefoner, hodetelefoner, smartklokker, droner',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'food',
    label: 'Mat og drikke',
    icon: '🍕',
    desc: 'Kaffe, sjokolade, brus og mer',
    examples: 'Spesialkaffe, sjokolade, eplemost, energidrikk',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'furniture',
    label: 'Møbler',
    icon: '🪑',
    desc: 'Interiør og møbeldesign',
    examples: 'Sofaer, stoler, bord, belysning',
    color: 'from-emerald-500 to-green-500',
  },
]

export default function IndustryScreen() {
  const navigate = useNavigate()
  const { selectedIndustry, setIndustry, gamePreset } = useGameStore()
  const [selected, setSelected] = useState(selectedIndustry || '')

  const canProceed = selected.length > 0

  function handleNext() {
    if (!canProceed) return
    setIndustry(selected)
    navigate(gamePreset === 'grunnspill' ? '/products' : '/sustainability')
  }

  function handleBack() {
    navigate('/')
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
        <h1 className="text-3xl font-extrabold text-white mb-2">Velg bransje</h1>
        <p className="text-slate-400">Hvilken bransje vil du starte bedrift i?</p>
      </motion.div>

      {/* Industry cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {industries.map((ind, i) => (
          <motion.button
            key={ind.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 250, damping: 20 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(ind.id)}
            className={`relative p-6 rounded-2xl text-left transition-colors border-2 overflow-hidden ${
              selected === ind.id
                ? 'border-teal-400 bg-slate-800 shadow-lg shadow-teal-500/10'
                : 'border-slate-700/50 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            {/* Gradient accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-5`} />

            <div className="relative">
              <motion.div
                animate={selected === ind.id ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="text-4xl mb-3"
              >
                {ind.icon}
              </motion.div>
              <div className="font-bold text-xl text-white mb-1">{ind.label}</div>
              <div className="text-sm text-teal-400 font-medium mb-2">{ind.desc}</div>
              <div className="text-xs text-slate-500">{ind.examples}</div>
            </div>

            {selected === ind.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="absolute top-3 right-3 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

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
          onClick={handleNext}
          disabled={!canProceed}
          pulse={canProceed}
          className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          Neste →
        </GameButton>
      </motion.div>
    </motion.div>
  )
}
