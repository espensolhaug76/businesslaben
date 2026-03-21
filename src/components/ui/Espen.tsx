import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const tips = [
  'Husk å sette riktig pris! For høy pris = færre kunder. For lav pris = lite fortjeneste.',
  'Markedsføring på riktig kanal treffer målgruppen bedre.',
  'Bedre beliggenhet koster mer, men gir flere kunder.',
  'Hold øye med lageret — tomt lager = tapte salg!',
  'En god dekningsgrad ligger mellom 30-60%.',
  'Bærekraftige valg kan styrke omdømmet ditt.',
  'Prøv å ha litt penger i reserve til uventede hendelser.',
  'Ansatte øker kapasiteten din, men husk arbeidsgiveravgift!',
]

type Mood = 'happy' | 'neutral' | 'worried' | 'excited'

function getMood(state: { currentMoney: number; reputation: number; monthlyResults: { profit: number }[] }): Mood {
  const lastResult = state.monthlyResults[state.monthlyResults.length - 1]
  if (lastResult && lastResult.profit > 5000) return 'excited'
  if (lastResult && lastResult.profit < -5000) return 'worried'
  if (state.currentMoney < 10000) return 'worried'
  if (state.reputation > 70) return 'happy'
  return 'neutral'
}

const moodFaces: Record<Mood, string> = {
  happy: '😊',
  neutral: '🧑‍💼',
  worried: '😟',
  excited: '🤩',
}

const moodColors: Record<Mood, string> = {
  happy: 'from-emerald-500 to-teal-500',
  neutral: 'from-teal-500 to-cyan-500',
  worried: 'from-amber-500 to-orange-500',
  excited: 'from-pink-500 to-purple-500',
}

export default function Espen() {
  const [showBubble, setShowBubble] = useState(false)
  const [tip, setTip] = useState('')
  const currentMoney = useGameStore((s) => s.currentMoney)
  const reputation = useGameStore((s) => s.reputation)
  const monthlyResults = useGameStore((s) => s.monthlyResults)

  const mood = getMood({ currentMoney, reputation, monthlyResults })

  useEffect(() => {
    // Show a random tip when mood changes or results arrive
    const timer = setTimeout(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)])
      setShowBubble(true)
      const hideTimer = setTimeout(() => setShowBubble(false), 6000)
      return () => clearTimeout(hideTimer)
    }, 2000)
    return () => clearTimeout(timer)
  }, [monthlyResults.length])

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3">
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && tip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.7, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="max-w-[240px] bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl rounded-bl-none p-3 shadow-xl"
          >
            <p className="text-xs text-slate-300 leading-relaxed">{tip}</p>
            <div className="text-[10px] text-teal-400 mt-1 font-medium">— Espen, rådgiver</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <motion.button
        onClick={() => {
          setTip(tips[Math.floor(Math.random() * tips.length)])
          setShowBubble((prev) => !prev)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        {/* Breathing animation */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${moodColors[mood]} flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20 border-2 border-white/20`}
        >
          {moodFaces[mood]}
        </motion.div>

        {/* Mood indicator dot */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-gray-950 ${
            mood === 'worried' ? 'bg-amber-400' : mood === 'excited' ? 'bg-pink-400' : 'bg-emerald-400'
          }`}
        />
      </motion.button>
    </div>
  )
}
