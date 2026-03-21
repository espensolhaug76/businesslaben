import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton } from '../components/ui/animations'

const profiles = [
  {
    id: 'sustainable' as const,
    title: 'Bærekraftig profil',
    icon: '♻️',
    color: 'from-emerald-500 to-green-500',
    description: 'Miljøvennlige materialer, etisk produksjon og klimabevisst drift. Du tar ansvar for miljøet i hele verdikjeden.',
    pros: [
      'Appellerer sterkt til miljøbevisste kunder (+50%)',
      'Høyere priser aksepteres av kundene',
      'Positivt omdømme og mediadekning',
      'Fremtidssikret mot nye miljøkrav',
    ],
    cons: [
      'Høyere produksjonskostnader (+30%)',
      'Færre leverandørvalg',
      'Lengre leveringstider',
    ],
    costImpact: '+30% kostnader',
    demandImpact: '+50% hos miljøbevisste',
  },
  {
    id: 'balanced' as const,
    title: 'Balansert tilnærming',
    icon: '🌍',
    color: 'from-blue-500 to-cyan-500',
    description: 'Du tar noen miljøtiltak der det er mulig, men balanserer mot kostnader. En pragmatisk mellomvei.',
    pros: [
      'Bredere kundegruppe',
      'Moderate kostnader',
      'Fleksibel leverandørbase',
      'Gradvis forbedring mulig',
    ],
    cons: [
      'Ingen sterk miljøprofil å markedsføre',
      'Kan oppfattes som "greenwashing"',
    ],
    costImpact: 'Normal kostnad',
    demandImpact: 'Normal etterspørsel',
  },
  {
    id: 'cost_focused' as const,
    title: 'Kostnadsfokus',
    icon: '💰',
    color: 'from-amber-500 to-orange-500',
    description: 'Du prioriterer lavest mulig kostnad og høyest mulig margin. Standard materialer og produksjonsmetoder.',
    pros: [
      'Laveste produksjonskostnader (-20%)',
      'Høyere marginer',
      'Mange leverandører å velge mellom',
      'Raskere leveranser',
    ],
    cons: [
      'Risiko for negativ pressedekning',
      'Kan miste miljøbevisste kunder',
      'Sårbar for ny miljølovgivning',
      'Mulig boikott fra forbrukere',
    ],
    costImpact: '-20% kostnader',
    demandImpact: '-30% hos miljøbevisste',
  },
]

export default function SustainabilityScreen() {
  const navigate = useNavigate()
  const existing = useGameStore((s) => s.sustainabilityProfile)
  const existingText = useGameStore((s) => s.sustainabilityJustification)

  const [selected, setSelected] = useState<typeof profiles[number]['id'] | ''>(existing || '')
  const [justification, setJustification] = useState(existingText || '')

  const wordCount = justification.trim().split(/\s+/).filter(Boolean).length
  const canProceed = selected !== '' && wordCount >= 30

  function handleNext() {
    if (!canProceed) return
    useGameStore.setState({
      sustainabilityProfile: selected as 'sustainable' | 'balanced' | 'cost_focused',
      sustainabilityJustification: justification,
    })
    navigate('/target-audience')
  }

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Bærekraft og miljø</h1>
          <p className="text-slate-400">Hvilket ansvar tar bedriften din for miljøet?</p>
        </motion.div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {profiles.map((profile, i) => {
            const isSelected = selected === profile.id
            return (
              <motion.button
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(profile.id)}
                className={`relative w-full p-5 rounded-2xl text-left transition-colors border-2 overflow-hidden ${
                  isSelected
                    ? 'border-teal-400 bg-slate-800 shadow-xl shadow-teal-500/10'
                    : 'border-slate-700/50 bg-slate-800/60 hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${profile.color}`}
                  />
                )}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className="text-4xl flex-shrink-0"
                    >
                      {profile.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white">{profile.title}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                          {profile.costImpact}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{profile.description}</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-bold text-emerald-400 mb-1">Fordeler</div>
                          <ul className="space-y-0.5">
                            {profile.pros.map((pro, j) => (
                              <li key={j} className="text-xs text-slate-300 flex items-start gap-1">
                                <span className="text-emerald-400 shrink-0">+</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-red-400 mb-1">Ulemper</div>
                          <ul className="space-y-0.5">
                            {profile.cons.map((con, j) => (
                              <li key={j} className="text-xs text-slate-400 flex items-start gap-1">
                                <span className="text-red-400 shrink-0">-</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isSelected && (
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
            )
          })}
        </div>

        {/* Justification text */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 mb-6"
            >
              <h2 className="text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wide">
                Begrunn ditt valg (min 30 ord)
              </h2>
              <p className="text-xs text-slate-400 mb-3">
                Forklar hvorfor du valgte denne bærekraftsprofilen for bedriften din. Læreren din kan se dette svaret.
              </p>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={4}
                placeholder="Skriv din begrunnelse her..."
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-white text-sm placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
              />
              <div className="flex justify-between mt-2">
                <span className={`text-xs ${wordCount >= 30 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {wordCount}/30 ord {wordCount >= 30 ? '✓' : ''}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={() => navigate('/industry')}
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
