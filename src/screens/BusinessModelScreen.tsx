import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, StaggerContainer, StaggerItem, GameButton } from '../components/ui/animations'

const models = [
  {
    id: 'Detaljist',
    title: 'Detaljist',
    subtitle: 'Kjøp varer fra leverandører og selg videre',
    icon: '🏪',
    color: 'from-blue-500 to-cyan-500',
    description: 'Du kjøper ferdige varer fra leverandører og selger dem videre til kundene dine. Du bestemmer selv hvilke produkter du vil ha i sortimentet, og setter egne priser.',
    pros: [
      'Lavere risiko — du kjøper ferdige varer',
      'Stort utvalg fra ulike leverandører',
      'Raskere oppstart, enklere logistikk',
    ],
    cons: [
      'Lavere marginer (leverandøren tar sin del)',
      'Mindre kontroll over produktkvalitet',
      'Avhengig av leverandørenes sortiment',
    ],
  },
  {
    id: 'Produsent',
    title: 'Produsent',
    subtitle: 'Design og produser egne varer',
    icon: '🏭',
    color: 'from-purple-500 to-pink-500',
    description: 'Du produserer dine egne varer og selger dem direkte til kunder eller via forhandlere. Du har full kontroll over kvalitet og merkebygging.',
    pros: [
      'Høyere marginer — ingen mellomledd',
      'Full kontroll over kvalitet og design',
      'Sterkere merkevarebygging',
    ],
    cons: [
      'Høyere oppstartskostnader',
      'Lengre leveringstid',
      'Mer kompleks logistikk',
    ],
  },
]

export default function BusinessModelScreen() {
  const navigate = useNavigate()
  const { businessModel, setBusinessModel } = useGameStore()
  const [selected, setSelected] = useState(businessModel || '')

  const canProceed = selected.length > 0

  function handleNext() {
    if (!canProceed) return
    setBusinessModel(selected)
    navigate('/market-research')
  }

  function handleBack() {
    navigate('/target-audience')
  }

  return (
    <PageTransition>
      <div className="py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Velg forretningsmodell</h1>
          <p className="text-slate-400">Hvordan vil du drive bedriften din?</p>
        </motion.div>

        {/* Model cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {models.map((model) => (
            <StaggerItem key={model.id}>
              <motion.button
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(model.id)}
                className={`relative w-full p-6 rounded-2xl text-left transition-colors border-2 overflow-hidden ${
                  selected === model.id
                    ? 'border-teal-400 bg-slate-800 shadow-xl shadow-teal-500/10'
                    : 'border-slate-700/50 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {selected === model.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${model.color}`}
                  />
                )}
                <div className="relative">
                  <motion.div
                    animate={selected === model.id ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="text-5xl mb-4"
                  >
                    {model.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-1">{model.title}</h3>
                  <p className="text-sm text-teal-400 font-medium mb-3">{model.subtitle}</p>
                  <p className="text-sm text-slate-400 mb-5">{model.description}</p>

                  <div className="mb-3">
                    <div className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">Fordeler</div>
                    <ul className="space-y-1.5">
                      {model.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">Ulemper</div>
                    <ul className="space-y-1.5">
                      {model.cons.map((con, i) => (
                        <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5 shrink-0">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selected === model.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>

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
      </div>
    </PageTransition>
  )
}
