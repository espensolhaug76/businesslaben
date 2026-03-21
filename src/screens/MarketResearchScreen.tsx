import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

/* ─── Report tiers ─── */

const tiers = [
  {
    id: 'basic' as const,
    title: 'Grunnleggende',
    icon: '📊',
    cost: 5_000,
    color: 'from-blue-500 to-cyan-500',
    description: 'Grunnleggende markedsstatistikk for bransjen din.',
    includes: [
      'Bransjens størrelse og vekst i Norge',
      'Gjennomsnittlig forbruk per kunde',
      'Mest aktive aldersgrupper',
      'Netthandelsandel i bransjen',
    ],
    excludes: [
      'Sosiale medier-trender',
      'Merkevarelojalitet',
      'Bærekraftspreferanser',
      'Prisfølsomhetsanalyse',
      'Konkurrentkartlegging',
    ],
  },
  {
    id: 'standard' as const,
    title: 'Standard',
    icon: '📈',
    cost: 15_000,
    color: 'from-teal-500 to-emerald-500',
    description: 'Utvidet analyse med sosiale medier og merkevaredata.',
    includes: [
      'Alt i Grunnleggende',
      'Sosiale medier-bruk per aldersgruppe',
      'Merkevarelojalitet i bransjen',
      'Kjøpskanaler (nett vs. butikk)',
      'Mediavanene til målgruppen din',
    ],
    excludes: [
      'Bærekraftspreferanser',
      'Prisfølsomhetsanalyse',
      'Konkurrentkartlegging',
    ],
  },
  {
    id: 'premium' as const,
    title: 'Premium',
    icon: '🏆',
    cost: 25_000,
    color: 'from-amber-500 to-orange-500',
    description: 'Komplett markedsinnsikt med konkurrent- og bærekraftsanalyse.',
    includes: [
      'Alt i Standard',
      'Bærekraftspreferanser per aldersgruppe',
      'Prisfølsomhetsanalyse',
      'Detaljert konkurrentkartlegging',
      'Sesongvariasjoner i salg',
      'Trendprognoser for neste 12 måneder',
    ],
    excludes: [],
  },
]

/* ─── Data that gets unlocked ─── */

const basicData = [
  { label: 'Klesbransjen i Norge (2024)', value: '48 mrd kr', pct: 100, color: 'bg-teal-500' },
  { label: 'Netthandel (andel)', value: '22%', pct: 22, color: 'bg-cyan-500' },
  { label: 'Snittforbruk per person/år', value: '12 000 kr', pct: 60, color: 'bg-blue-500' },
  { label: 'Mest aktiv aldersgruppe', value: '25–34 år', pct: 75, color: 'bg-purple-500' },
]

const standardData = [
  { label: 'Bruker Instagram daglig (18-30)', value: '78%', pct: 78, color: 'bg-pink-500' },
  { label: 'Merkevarelojalitet (under 30)', value: 'Lav – bytter ofte', pct: 30, color: 'bg-amber-500' },
  { label: 'Handler i butikk (over 40)', value: '62%', pct: 62, color: 'bg-indigo-500' },
  { label: 'Påvirkes av influencere', value: '47%', pct: 47, color: 'bg-rose-500' },
]

const premiumData = [
  { label: 'Bærekraft påvirker kjøpsvalg', value: '67%', pct: 67, color: 'bg-emerald-500' },
  { label: 'Villige til å betale mer for bærekraft', value: '72%', pct: 72, color: 'bg-green-500' },
  { label: 'Høysesong (okt–des)', value: '+45% salg', pct: 45, color: 'bg-red-500' },
  { label: 'Lavere prisfølsomhet hos 25-34', value: 'Moderat', pct: 55, color: 'bg-orange-500' },
]

/* ─── Component ─── */

export default function MarketResearchScreen() {
  const navigate = useNavigate()
  const existingTier = useGameStore((s) => s.marketResearchTier)
  const existingAnswers = useGameStore((s) => s.marketResearchAnswers)

  const [selected, setSelected] = useState<'none' | 'basic' | 'standard' | 'premium'>(existingTier || 'none')
  const [answer1, setAnswer1] = useState(existingAnswers?.question1 || '')
  const [answer2, setAnswer2] = useState(existingAnswers?.question2 || '')
  const [showData, setShowData] = useState(existingTier ? existingTier !== 'none' : false)

  const selectedTier = tiers.find((t) => t.id === selected)
  const cost = selectedTier?.cost || 0

  const wordCount1 = answer1.trim().split(/\s+/).filter(Boolean).length
  const wordCount2 = answer2.trim().split(/\s+/).filter(Boolean).length

  const needsReflection = selected !== 'none'
  const reflectionDone = !needsReflection || (wordCount1 >= 20 && wordCount2 >= 20)
  const canProceed = reflectionDone

  function handlePurchase() {
    if (selected === 'none') return
    setShowData(true)
  }

  function handleNext() {
    if (!canProceed) return
    useGameStore.setState({
      marketResearchTier: selected,
      marketResearchCost: cost,
      marketResearchAnswers: needsReflection
        ? { question1: answer1, question2: answer2 }
        : undefined,
      didMarketResearch: selected !== 'none',
    })
    navigate('/location')
  }

  // Which data sets to show based on tier
  const showBasic = selected !== 'none'
  const showStandard = selected === 'standard' || selected === 'premium'
  const showPremium = selected === 'premium'

  return (
    <PageTransition>
      <div className="py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Markedsundersøkelse</h1>
          <p className="text-slate-400">Kjøp markedsdata for å ta informerte beslutninger</p>
        </motion.div>

        {/* Tier selection */}
        {!showData && (
          <div className="space-y-3 mb-4">
            {tiers.map((tier, i) => {
              const isSelected = selected === tier.id
              return (
                <motion.button
                  key={tier.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(tier.id)}
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
                      className={`absolute inset-0 bg-gradient-to-br ${tier.color}`}
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{tier.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{tier.title}</h3>
                          <span className="text-sm font-bold text-teal-400">{formatKr(tier.cost)}</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{tier.description}</p>

                        <div className="space-y-1">
                          {tier.includes.map((item, j) => (
                            <div key={j} className="text-xs text-emerald-400 flex items-start gap-1.5">
                              <span className="shrink-0">✓</span>
                              {item}
                            </div>
                          ))}
                          {tier.excludes.map((item, j) => (
                            <div key={j} className="text-xs text-slate-600 flex items-start gap-1.5">
                              <span className="shrink-0">✗</span>
                              {item}
                            </div>
                          ))}
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

            {/* Skip option */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelected('none')}
              className={`relative w-full p-5 rounded-2xl text-left transition-colors border-2 ${
                selected === 'none'
                  ? 'border-amber-400 bg-slate-800 shadow-xl shadow-amber-500/10'
                  : 'border-slate-700/50 bg-slate-800/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">⏭️</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Hopp over</h3>
                  <p className="text-sm text-slate-400 mb-2">Spar penger, men øk risikoen.</p>
                  <div className="text-xs text-amber-400 space-y-1">
                    <div>⚠️ Ingen statistikk tilgjengelig i senere steg</div>
                    <div>⚠️ Må gjette på markedsføring og prising</div>
                    <div>⚠️ Lavere salg de første 6 månedene</div>
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Purchase / confirm button */}
            {selected !== 'none' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center pt-2"
              >
                <GameButton
                  onClick={handlePurchase}
                  pulse
                  className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg"
                >
                  Kjøp rapport ({formatKr(cost)})
                </GameButton>
              </motion.div>
            )}
          </div>
        )}

        {/* Unlocked data */}
        <AnimatePresence>
          {showData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 mb-4"
            >
              {/* Tier badge */}
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 text-teal-400 font-medium text-sm">
                  {selectedTier?.icon} {selectedTier?.title} rapport kjøpt ({formatKr(cost)})
                </span>
              </div>

              {/* Basic data */}
              {showBasic && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50"
                >
                  <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">
                    📊 Markedsdata
                  </h2>
                  <div className="space-y-3">
                    {basicData.map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{stat.label}</span>
                          <span className="text-white font-bold">{stat.value}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.pct}%` }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' as const }}
                            className={`h-full rounded-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Standard data */}
              {showStandard && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50"
                >
                  <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">
                    📈 Mediavaner og merkevare
                  </h2>
                  <div className="space-y-3">
                    {standardData.map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{stat.label}</span>
                          <span className="text-white font-bold">{stat.value}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.pct}%` }}
                            transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: 'easeOut' as const }}
                            className={`h-full rounded-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Premium data */}
              {showPremium && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50"
                >
                  <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">
                    🏆 Bærekraft, prisfølsomhet og sesong
                  </h2>
                  <div className="space-y-3">
                    {premiumData.map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{stat.label}</span>
                          <span className="text-white font-bold">{stat.value}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.pct}%` }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: 'easeOut' as const }}
                            className={`h-full rounded-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reflection questions (only if purchased a report) */}
        <AnimatePresence>
          {needsReflection && showData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 mb-6"
            >
              <h2 className="text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wide">
                Refleksjonsspørsmål
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Læreren din kan se svarene dine. Skriv minst 20 ord per spørsmål.
              </p>

              <div className="mb-4">
                <label className="text-sm text-white font-medium block mb-2">
                  1. Hva forteller markedsdataene deg om mulighetene for din bedrift?
                </label>
                <textarea
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
                  rows={3}
                  placeholder="Analyser dataene og forklar hva de betyr for din forretningsidé..."
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-white text-sm placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                />
                <span className={`text-xs ${wordCount1 >= 20 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {wordCount1}/20 ord {wordCount1 >= 20 ? '✓' : ''}
                </span>
              </div>

              <div>
                <label className="text-sm text-white font-medium block mb-2">
                  2. Hvordan vil du bruke denne innsikten i dine beslutninger?
                </label>
                <textarea
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
                  rows={3}
                  placeholder="Beskriv hvordan markedsdataene påvirker dine valg..."
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-white text-sm placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                />
                <span className={`text-xs ${wordCount2 >= 20 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {wordCount2}/20 ord {wordCount2 >= 20 ? '✓' : ''}
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
            onClick={() => navigate('/business-model')}
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
