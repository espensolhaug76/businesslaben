import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, StaggerContainer, StaggerItem } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const locationTiers = [
  {
    tier: 1,
    name: 'Bakgatebutikk',
    icon: '🏚️',
    rent: 8_000,
    capacity: 200,
    upgradeCost: 0,
    salesBoost: '0%',
    description: 'Billig leie, men lite trafikk. Krever sterk markedsføring for å trekke kunder.',
  },
  {
    tier: 2,
    name: 'Lokal butikk',
    icon: '🏠',
    rent: 18_000,
    capacity: 500,
    upgradeCost: 25_000,
    salesBoost: '+20%',
    description: 'Greit beliggende i et nabolag. Jevn kundestrøm fra lokalmiljøet.',
  },
  {
    tier: 3,
    name: 'Sentrumsbutikk',
    icon: '🏬',
    rent: 35_000,
    capacity: 1_000,
    upgradeCost: 60_000,
    salesBoost: '+50%',
    description: 'Mye fottrafikk i bykjernen. Høy synlighet og god tilgjengelighet.',
  },
  {
    tier: 4,
    name: 'Flaggskipbutikk',
    icon: '🏛️',
    rent: 60_000,
    capacity: 2_000,
    upgradeCost: 120_000,
    salesBoost: '+100%',
    description: 'Premium beliggenhet. Maksimal eksponering og prestisje. Dyrt, men kraftig salgseffekt.',
  },
] as const

export default function DistributionScreen() {
  const hasPhysicalStore = useGameStore((s) => s.hasPhysicalStore)
  const hasWebStore = useGameStore((s) => s.hasWebStore)
  const locationTier = useGameStore((s) => s.locationTier)
  const locationName = useGameStore((s) => s.locationName)
  const monthlyRent = useGameStore((s) => s.monthlyRent)
  const currentMoney = useGameStore((s) => s.currentMoney)
  const setHasPhysicalStore = useGameStore((s) => s.setHasPhysicalStore)
  const setHasWebStore = useGameStore((s) => s.setHasWebStore)
  const upgradeLocation = useGameStore((s) => s.upgradeLocation)
  const setMonthlyRent = useGameStore((s) => s.setMonthlyRent)

  function handleTogglePhysical() {
    const newValue = !hasPhysicalStore
    setHasPhysicalStore(newValue)
    if (newValue && locationTier === 0) {
      const tier1 = locationTiers[0]
      upgradeLocation(tier1.tier, tier1.name, 0, tier1.rent, tier1.capacity)
    }
    if (!newValue) {
      setMonthlyRent(0)
      useGameStore.setState({ locationTier: 0, locationName: '', totalCapacity: 0 })
    }
  }

  function handleToggleWebshop() {
    setHasWebStore(!hasWebStore)
  }

  function handleSelectTier(tier: typeof locationTiers[number]) {
    const cost = tier.tier > locationTier ? tier.upgradeCost : 0
    if (cost > currentMoney && cost > 0) return
    upgradeLocation(tier.tier, tier.name, cost, tier.rent, tier.capacity)
  }

  const hasAnyChannel = hasPhysicalStore || hasWebStore

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Distribusjon</h1>
        <p className="text-sm text-gray-400 mb-6">Velg hvordan kundene skal kunne kjøpe produktene dine.</p>
      </motion.div>

      {/* Channel toggles */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Physical store */}
        <StaggerItem>
          <motion.button
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTogglePhysical}
            className={`w-full rounded-xl border-2 p-5 text-left transition-colors ${
              hasPhysicalStore
                ? 'border-teal-500 bg-teal-500/10'
                : 'border-gray-700 bg-gray-900 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.span
                animate={hasPhysicalStore ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-3xl"
              >
                🏪
              </motion.span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  hasPhysicalStore ? 'border-teal-500 bg-teal-500' : 'border-gray-600'
                }`}
              >
                {hasPhysicalStore && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="font-bold text-white text-lg mb-1">Fysisk butikk</div>
            <div className="text-sm text-gray-400">
              Kunder kan besøke deg. Krever leie av lokale. Beliggenhet påvirker kundevolum.
            </div>
          </motion.button>
        </StaggerItem>

        {/* Webshop */}
        <StaggerItem>
          <motion.button
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggleWebshop}
            className={`w-full rounded-xl border-2 p-5 text-left transition-colors ${
              hasWebStore
                ? 'border-teal-500 bg-teal-500/10'
                : 'border-gray-700 bg-gray-900 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.span
                animate={hasWebStore ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-3xl"
              >
                🌐
              </motion.span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  hasWebStore ? 'border-teal-500 bg-teal-500' : 'border-gray-600'
                }`}
              >
                {hasWebStore && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="font-bold text-white text-lg mb-1">Nettbutikk</div>
            <div className="text-sm text-gray-400">
              Selg til kunder over hele landet. Lavere faste kostnader, men krever digital markedsføring.
            </div>
          </motion.button>
        </StaggerItem>
      </StaggerContainer>

      {/* No channel warning */}
      <AnimatePresence>
        {!hasAnyChannel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 mb-6 text-center"
          >
            <div className="text-amber-400 font-medium">Du må velge minst én salgskanal for å selge produkter.</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location tiers */}
      <AnimatePresence>
        {hasPhysicalStore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-lg font-bold text-white mb-1">Velg beliggenhet</h2>
            <p className="text-sm text-gray-400 mb-4">Bedre beliggenhet gir mer fottrafikk, men koster mer.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locationTiers.map((tier, i) => {
                const isSelected = locationTier === tier.tier
                const isUpgrade = tier.tier > locationTier
                const canAfford = tier.upgradeCost <= currentMoney
                const isDowngrade = tier.tier < locationTier

                return (
                  <motion.button
                    key={tier.tier}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    whileHover={isUpgrade && !canAfford ? {} : { y: -3, scale: 1.01 }}
                    whileTap={isUpgrade && !canAfford ? {} : { scale: 0.98 }}
                    onClick={() => handleSelectTier(tier)}
                    disabled={isUpgrade && !canAfford}
                    className={`relative rounded-xl border-2 p-5 text-left transition-colors ${
                      isSelected
                        ? 'border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/5'
                        : isUpgrade && !canAfford
                          ? 'border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed'
                          : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                      >
                        Nåværende
                      </motion.div>
                    )}

                    <motion.div
                      animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className="text-3xl mb-2"
                    >
                      {tier.icon}
                    </motion.div>
                    <div className="font-bold text-white text-lg mb-1">{tier.name}</div>
                    <div className="text-sm text-gray-400 mb-3">{tier.description}</div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Leie</span>
                        <span className="text-gray-200">{formatKr(tier.rent)}/mnd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kapasitet</span>
                        <span className="text-gray-200">{tier.capacity.toLocaleString('nb-NO')} enheter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Salgseffekt</span>
                        <span className="text-emerald-400 font-medium">{tier.salesBoost}</span>
                      </div>
                      {isUpgrade && tier.upgradeCost > 0 && (
                        <div className="flex justify-between border-t border-gray-800 pt-1">
                          <span className="text-gray-400">Oppgraderingskostnad</span>
                          <span className={canAfford ? 'text-amber-400' : 'text-rose-400'}>
                            {formatKr(tier.upgradeCost)}
                          </span>
                        </div>
                      )}
                      {isDowngrade && (
                        <div className="flex justify-between border-t border-gray-800 pt-1">
                          <span className="text-gray-400">Nedgradering</span>
                          <span className="text-gray-500">Gratis</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-5"
      >
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">Distribusjonsoversikt</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Fysisk butikk</span>
            <span className={hasPhysicalStore ? 'text-emerald-400 font-medium' : 'text-gray-500'}>
              {hasPhysicalStore ? `${locationName || 'Aktiv'}` : 'Ikke aktiv'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Nettbutikk</span>
            <span className={hasWebStore ? 'text-emerald-400 font-medium' : 'text-gray-500'}>
              {hasWebStore ? 'Aktiv' : 'Ikke aktiv'}
            </span>
          </div>
          {hasPhysicalStore && (
            <div className="flex justify-between border-t border-teal-500/20 pt-2">
              <span className="font-semibold text-teal-400">Månedlig leie</span>
              <span className="font-bold text-lg text-teal-300">{formatKr(monthlyRent)}/mnd</span>
            </div>
          )}
        </div>
      </motion.div>
    </PageTransition>
  )
}
