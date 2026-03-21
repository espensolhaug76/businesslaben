import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton, AnimatedNumber } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const locations = [
  {
    id: 'finanskvartalet',
    name: 'Finanskvartalet',
    icon: '🏦',
    rent: 45_000,
    deposit: 135_000,
    renovation: 80_000,
    trafficLevel: 9,
    dailyFootTraffic: 1200,
    demographics: 'Forretningsfolk, 30–55 år',
    color: 'from-blue-500 to-indigo-500',
    description: 'Prestisjefylt beliggenhet blant banker og konsulentselskaper. Høy kjøpekraft, men smalt publikum.',
    stars: 5,
    matchTags: ['status', 'male', '31-45', '46+'],
  },
  {
    id: 'kjopesenter',
    name: 'Kjøpesenter',
    icon: '🏬',
    rent: 35_000,
    deposit: 105_000,
    renovation: 50_000,
    trafficLevel: 10,
    dailyFootTraffic: 2500,
    demographics: 'Familier, ungdom, alle aldere',
    color: 'from-pink-500 to-rose-500',
    description: 'Norges største trafikkpunkt for handel. Bredt publikum, men høy konkurranse fra andre butikker.',
    stars: 5,
    matchTags: ['female', 'male', 'kids', '0-12', '13-20', '21-30', '31-45'],
  },
  {
    id: 'forstad',
    name: 'Forstadsområde',
    icon: '🏡',
    rent: 18_000,
    deposit: 54_000,
    renovation: 30_000,
    trafficLevel: 5,
    dailyFootTraffic: 400,
    demographics: 'Barnefamilier, lokale beboere',
    color: 'from-green-500 to-emerald-500',
    description: 'Rolig område med lojale lokalkunder. Lav leie, men begrenset fottrafikk.',
    stars: 2,
    matchTags: ['female', 'kids', '0-12', '31-45', 'price'],
  },
  {
    id: 'grunerlokka',
    name: 'Grünerløkka',
    icon: '🎨',
    rent: 28_000,
    deposit: 84_000,
    renovation: 45_000,
    trafficLevel: 7,
    dailyFootTraffic: 800,
    demographics: '20–35 år, miljøbevisste, kreative',
    color: 'from-teal-500 to-cyan-500',
    description: 'Hipt nabolag med unge, trendbevisste kunder. Perfekt for miljø- og livsstilsmerker.',
    stars: 3,
    matchTags: ['female', 'male', '21-30', 'eco'],
  },
  {
    id: 'industriomrade',
    name: 'Industriområde',
    icon: '🏭',
    rent: 12_000,
    deposit: 36_000,
    renovation: 20_000,
    trafficLevel: 2,
    dailyFootTraffic: 150,
    demographics: 'Arbeidere, næringslivskunder',
    color: 'from-amber-500 to-orange-500',
    description: 'Billigst mulig lokale. Lite fottrafikk, men veldig lave kostnader. Ideelt for netthandel.',
    stars: 1,
    matchTags: ['male', '31-45', 'price'],
  },
]

function computeMatchScore(
  loc: typeof locations[number],
  targetSegments: { genders: string[]; ageGroups: string[]; psychographics: string[] }[]
): number {
  const primary = targetSegments.find((s) => s)
  if (!primary) return 50

  let matches = 0
  let total = 0

  for (const g of primary.genders) {
    total++
    if (loc.matchTags.includes(g)) matches++
  }
  for (const a of primary.ageGroups) {
    total++
    if (loc.matchTags.includes(a)) matches++
  }
  for (const p of primary.psychographics) {
    total++
    if (loc.matchTags.includes(p)) matches++
  }

  if (total === 0) return 50
  return Math.round((matches / total) * 100)
}

export default function LocationScreen() {
  const navigate = useNavigate()
  const targetSegments = useGameStore((s) => s.targetSegments)
  const existingLocation = useGameStore((s) => s.selectedLocation)

  const [selected, setSelected] = useState(existingLocation?.id || '')

  const canProceed = selected !== ''

  function handleNext() {
    if (!canProceed) return
    const loc = locations.find((l) => l.id === selected)!
    useGameStore.setState({
      selectedLocation: {
        id: loc.id,
        name: loc.name,
        rent: loc.rent,
        deposit: loc.deposit,
        renovation: loc.renovation,
        trafficLevel: loc.trafficLevel,
        demographics: loc.demographics,
        dailyFootTraffic: loc.dailyFootTraffic,
      },
      monthlyRent: loc.rent,
      locationTier: loc.trafficLevel <= 3 ? 1 : loc.trafficLevel <= 6 ? 2 : loc.trafficLevel <= 8 ? 3 : 4,
      locationName: loc.name,
    })
    navigate('/products')
  }

  const selectedLoc = locations.find((l) => l.id === selected)
  const totalUpfront = selectedLoc ? selectedLoc.deposit + selectedLoc.renovation : 0

  return (
    <PageTransition>
      <div className="py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Velg lokasjon</h1>
          <p className="text-slate-400">Hvor skal butikken din ligge?</p>
        </motion.div>

        {/* Location cards */}
        <div className="space-y-3 mb-6">
          {locations.map((loc, i) => {
            const isSelected = selected === loc.id
            const matchScore = computeMatchScore(loc, targetSegments)

            return (
              <motion.button
                key={loc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(loc.id)}
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
                    className={`absolute inset-0 bg-gradient-to-br ${loc.color}`}
                  />
                )}

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className="text-4xl flex-shrink-0"
                    >
                      {loc.icon}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white">{loc.name}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          matchScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' :
                          matchScore >= 40 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {matchScore}% match
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{loc.description}</p>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Leie</span>
                          <span className="text-white font-medium">{formatKr(loc.rent)}/mnd</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Depositum</span>
                          <span className="text-white font-medium">{formatKr(loc.deposit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Oppussing</span>
                          <span className="text-white font-medium">{formatKr(loc.renovation)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Fottrafikk</span>
                          <span className="text-white font-medium">{loc.dailyFootTraffic}/dag</span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span className="text-slate-500">Demografi</span>
                          <span className="text-slate-300">{loc.demographics}</span>
                        </div>
                      </div>

                      {/* Traffic stars */}
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] text-slate-500 mr-1">Trafikk:</span>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className={j < loc.stars ? 'text-amber-400' : 'text-slate-700'}>
                            ★
                          </span>
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
        </div>

        {/* Cost summary */}
        <AnimatePresence>
          {selectedLoc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-5 mb-6"
            >
              <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">Kostnadsoversikt</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Depositum (3 mnd leie)</span>
                  <span className="text-white font-medium">{formatKr(selectedLoc.deposit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Oppussing og innredning</span>
                  <span className="text-white font-medium">{formatKr(selectedLoc.renovation)}</span>
                </div>
                <div className="flex justify-between border-t border-teal-500/20 pt-2">
                  <span className="text-slate-400 font-semibold">Totalt oppstart (lokasjon)</span>
                  <span className="font-bold text-lg text-teal-400">
                    <AnimatedNumber value={totalUpfront} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Månedlig leie</span>
                  <span className="text-amber-400 font-medium">{formatKr(selectedLoc.rent)}/mnd</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={() => navigate('/market-research')}
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
