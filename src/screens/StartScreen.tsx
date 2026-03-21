import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { GameButton } from '../components/ui/animations'

export default function StartScreen() {
  const navigate = useNavigate()
  const { companyName, setCompanyName } = useGameStore()
  const [localName, setLocalName] = useState(companyName || '')
  const [showCaseBank, setShowCaseBank] = useState(false)

  const canProceed = localName.trim().length > 0

  function handleNext() {
    if (!canProceed) return
    setCompanyName(localName.trim())
    navigate('/industry')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && canProceed) handleNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center py-12"
    >
      {/* Game title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-6xl mb-4"
        >
          🚀
        </motion.div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent mb-3">
          AdVenture 2.3
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-slate-400"
        >
          Start din egen bedrift og lær markedsføringens 4P-er
        </motion.p>
      </motion.div>

      {/* Company name input card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-slate-700/50 mb-6"
      >
        <label className="block text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">
          Bedriftsnavn
        </label>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Skriv inn navnet på bedriften din..."
          className="w-full px-5 py-4 bg-slate-900/60 border border-slate-600 rounded-xl text-white text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          autoFocus
        />
      </motion.div>

      {/* Logo preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="w-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30 mb-8 flex items-center gap-4"
      >
        <motion.div
          animate={localName.trim() ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.3 }}
          key={localName.trim() ? localName.trim()[0] : '?'}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-lg shadow-teal-500/20"
        >
          {localName.trim() ? localName.trim()[0].toUpperCase() : '?'}
        </motion.div>
        <div>
          <div className="text-sm font-medium text-slate-300">Bedriftslogo (valgfritt)</div>
          <div className="text-xs text-slate-500 mt-0.5">En avatar genereres automatisk fra bedriftsnavnet</div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="w-full flex flex-col sm:flex-row gap-3"
      >
        <GameButton
          onClick={() => setShowCaseBank(true)}
          className="flex-1 py-4 px-6 rounded-xl font-semibold text-base border-2 border-slate-600 text-slate-300 hover:border-teal-500 hover:text-teal-400 transition-all bg-slate-800/40"
        >
          📚 Case Bank
        </GameButton>
        <GameButton
          onClick={handleNext}
          disabled={!canProceed}
          pulse={canProceed}
          className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
            canProceed
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 hover:shadow-teal-500/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          Neste →
        </GameButton>
      </motion.div>

      {/* Case bank modal */}
      <AnimatePresence>
        {showCaseBank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCaseBank(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-teal-400 mb-4">📚 Case Bank</h2>
              <p className="text-slate-400 mb-6">Ferdige scenarier kommer snart! Her vil du kunne velge mellom forhåndsdefinerte bedrifts-caser.</p>
              <GameButton
                onClick={() => setShowCaseBank(false)}
                className="w-full py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors font-medium"
              >
                Lukk
              </GameButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
