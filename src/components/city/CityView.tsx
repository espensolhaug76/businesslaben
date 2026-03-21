import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { simulateMonth, applySimulationResult } from '../../engine/simulation'
import type { SimulationResult } from '../../engine/simulation'
import type { EventChoice } from '../../types'
import EventModal from '../ui/EventModal'
import SimulationLoader from '../ui/SimulationLoader'
import { useToast } from '../ui/Toast'
import Confetti, { CoinRain } from '../ui/Confetti'
import { AnimatedNumber, GameButton } from '../ui/animations'
import Weather from './Weather'
import PedestrianLayer from './Pedestrian'
import Building from './Building'
import type { BuildingConfig } from './Building'
import LockTooltip from './LockTooltip'
import Customer from './Customer'
import type { CustomerData } from './Customer'
import DeliveryTruck from './DeliveryTruck'
import FloatingMoney, { useFloatingMoney } from './FloatingMoney'

const monthNames = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

const customerEmojis = ['👤', '👩', '🧑', '👨', '👧', '🧒']

let customerId = 0

export default function CityView() {
  const navigate = useNavigate()
  const store = useGameStore()
  const { toast } = useToast()
  const { popups, showMoney } = useFloatingMoney()

  const {
    companyName,
    currentMoney,
    monthlyResults,
    purchasedProducts,
    hasPhysicalStore,
    locationName,
    employees,
    marketingBudgetFacebook,
    marketingBudgetTV,
    marketingBudgetInfluencer,
    marketingBudgetPrint,
    marketingBudgetInstagram,
    stockWomen,
    stockMen,
    stockKids,
    reputation,
  } = store

  const currentMonth = monthlyResults.length + 1
  const totalMarketing = marketingBudgetFacebook + marketingBudgetTV + marketingBudgetInfluencer + marketingBudgetPrint + marketingBudgetInstagram
  const totalStock = stockWomen + stockMen + stockKids
  const hasActiveMarketing = totalMarketing > 0

  // Simulation state
  const [pendingResult, setPendingResult] = useState<SimulationResult | null>(null)
  const [simulating, setSimulating] = useState(false)
  const [pendingSimResult, setPendingSimResult] = useState<SimulationResult | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCoinRain, setShowCoinRain] = useState(false)

  // Deliver emails/news for current month
  const deliverEmailsForMonth = useGameStore((s) => s.deliverEmailsForMonth)
  const deliverNewsForMonth = useGameStore((s) => s.deliverNewsForMonth)
  const gameEmails = useGameStore((s) => s.gameEmails ?? [])
  const gameNews = useGameStore((s) => s.gameNews ?? [])

  useEffect(() => {
    deliverEmailsForMonth(currentMonth)
    deliverNewsForMonth(currentMonth)
  }, [currentMonth])

  const unreadEmails = gameEmails.filter((e) => !e.read).length
  const unreadNews = gameNews.filter((n) => !n.read).length

  // Feature locks
  const isFeatureUnlocked = useGameStore((s) => s.isFeatureUnlocked)
  const [lockedBuilding, setLockedBuilding] = useState<{ featureId: string; name: string } | null>(null)

  // Ambient customers
  const [customers, setCustomers] = useState<CustomerData[]>([])
  const [showDelivery, setShowDelivery] = useState(false)

  // Spawn ambient customers
  useEffect(() => {
    const rate = hasActiveMarketing ? 3000 : 6000
    const interval = setInterval(() => {
      if (hasPhysicalStore && totalStock > 0 && Math.random() > 0.4) {
        spawnCustomer()
      }
    }, rate)
    return () => clearInterval(interval)
  }, [hasPhysicalStore, totalStock, hasActiveMarketing])

  function spawnCustomer() {
    const fromLeft = Math.random() > 0.5
    const bought = Math.random() > 0.4 && totalStock > 0
    const happiness = reputation > 65 ? 'happy' : reputation > 35 ? 'neutral' : 'sad' as const

    const c: CustomerData = {
      id: customerId++,
      emoji: customerEmojis[Math.floor(Math.random() * customerEmojis.length)],
      startX: fromLeft ? -40 : window.innerWidth + 40,
      targetX: window.innerWidth * 0.3 + Math.random() * 60,
      y: 52 + Math.random() * 8,
      hasBought: bought,
      happiness,
    }
    setCustomers((prev) => [...prev.slice(-5), c])

    // Show floating money if bought
    if (bought) {
      const avgPrice = purchasedProducts.length > 0
        ? purchasedProducts.reduce((s, p) => s + p.retailPriceAdult, 0) / purchasedProducts.length
        : 500
      setTimeout(() => {
        showMoney(Math.round(avgPrice), c.targetX, window.innerHeight * (c.y / 100) - 30)
      }, 5000)
    }
  }

  function removeCustomer(id: number) {
    setCustomers((prev) => prev.filter((c) => c.id !== id))
  }

  // Simulation handlers (same logic as DashboardScreen)
  function handleSimulate() {
    const state = useGameStore.getState()
    const simResult = simulateMonth(state, currentMonth)

    if (simResult.event) {
      setPendingResult(simResult)
    } else {
      setPendingSimResult(simResult)
      setSimulating(true)
    }
  }

  const finishSimulation = useCallback(() => {
    setSimulating(false)
    if (pendingSimResult) {
      applyAndNavigate(pendingSimResult)
      setPendingSimResult(null)
    }
  }, [pendingSimResult])

  function applyAndNavigate(simResult: SimulationResult) {
    const state = useGameStore.getState()
    const newState = applySimulationResult(state, simResult)
    const wasProfitable = simResult.monthResult.profit >= 0

    useGameStore.setState({
      currentMoney: newState.currentMoney,
      purchasedProducts: newState.purchasedProducts,
      stockWomen: newState.stockWomen,
      stockMen: newState.stockMen,
      stockKids: newState.stockKids,
      monthlyResults: newState.monthlyResults,
      reputation: newState.reputation,
    })

    if (wasProfitable) {
      setShowConfetti(true)
      setShowCoinRain(true)
      setTimeout(() => setShowConfetti(false), 100)
      setTimeout(() => setShowCoinRain(false), 100)
    }

    toast('Måned simulert!', 'success', '📊')
    navigate('/monthly-report')
  }

  function handleEventChoice(choice: EventChoice) {
    if (!pendingResult) return
    useGameStore.setState((s) => ({
      reputation: Math.max(0, Math.min(100, s.reputation + choice.consequence.reputationModifier)),
    }))
    setPendingSimResult(pendingResult)
    setSimulating(true)
    setPendingResult(null)
  }

  // Building configs (with lock state)
  const warehouseLocked = !isFeatureUnlocked('warehouse')
  const marketingLocked = !isFeatureUnlocked('marketing')
  const personnelLocked = !isFeatureUnlocked('personnel')

  const buildings: BuildingConfig[] = [
    {
      id: 'store',
      label: hasPhysicalStore ? (locationName || 'Butikken') : 'Butikk',
      icon: hasPhysicalStore ? '🏪' : '🏚️',
      sublabel: hasPhysicalStore ? 'Åpen' : 'Ikke åpnet',
      badge: totalStock > 0 ? `${totalStock} stk` : undefined,
      glow: hasPhysicalStore && totalStock > 0,
    },
    {
      id: 'warehouse',
      label: 'Lager',
      icon: '📦',
      sublabel: warehouseLocked ? 'Låst' : `${purchasedProducts.length} produkter`,
      badge: !warehouseLocked && purchasedProducts.length > 0 ? purchasedProducts.length : undefined,
      locked: warehouseLocked,
    },
    {
      id: 'office',
      label: 'Kontoret',
      icon: '💻',
      sublabel: unreadEmails + unreadNews > 0 ? `${unreadEmails + unreadNews} uleste` : 'Åpne PC',
      badge: unreadEmails + unreadNews > 0 ? unreadEmails + unreadNews : undefined,
      badgeColor: 'bg-red-500',
      glow: true,
    },
    {
      id: 'marketing',
      label: 'Markedsføring',
      icon: '📢',
      sublabel: marketingLocked ? 'Låst' : hasActiveMarketing ? `${(totalMarketing / 1000).toFixed(0)}k/mnd` : 'Ingen kampanjer',
      badge: !marketingLocked && hasActiveMarketing ? '📡' : undefined,
      badgeColor: 'bg-purple-500',
      locked: marketingLocked,
    },
    {
      id: 'personnel',
      label: 'Ansatte',
      icon: '👥',
      sublabel: personnelLocked ? 'Låst' : employees.length > 0 ? `${employees.length} ansatt` : 'Jobber alene',
      badge: !personnelLocked && employees.length > 0 ? employees.length : undefined,
      badgeColor: 'bg-blue-500',
      locked: personnelLocked,
    },
  ]

  const buildingUnlockMap: Record<string, string> = {
    warehouse: 'warehouse',
    marketing: 'marketing',
    personnel: 'personnel',
  }

  function handleBuildingClick(id: string) {
    const unlockId = buildingUnlockMap[id]
    if (unlockId && !isFeatureUnlocked(unlockId)) {
      const building = buildings.find((b) => b.id === id)
      setLockedBuilding({ featureId: unlockId, name: building?.label ?? id })
      return
    }
    switch (id) {
      case 'store':
        navigate('/dashboard')
        break
      case 'warehouse':
        navigate('/pricing')
        break
      case 'office':
        navigate('/desktop')
        break
      case 'marketing':
        navigate('/marketing')
        break
      case 'personnel':
        navigate('/personnel')
        break
    }
  }

  // Last month's result for display
  const lastResult = monthlyResults[monthlyResults.length - 1]

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      <Confetti active={showConfetti} />
      <CoinRain active={showCoinRain} />

      <AnimatePresence>
        {simulating && <SimulationLoader onComplete={finishSimulation} />}
      </AnimatePresence>

      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-600 via-sky-400 to-emerald-200 z-0" />

      {/* Weather */}
      <Weather />

      {/* Top HUD bar */}
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring' as const, stiffness: 200, damping: 25 }}
        className="relative z-40 flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm font-bold text-teal-400">
            {companyName ? companyName[0].toUpperCase() : 'A'}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{companyName || 'Min Bedrift'}</div>
            <div className="text-[10px] text-slate-400">AdVenture 2.3</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Kapital</div>
            <div className={`text-sm font-bold ${currentMoney >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <AnimatedNumber value={currentMoney} />
            </div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Måned</div>
            <div className="text-sm font-bold text-teal-400">
              {monthNames[currentMonth - 1]} ({currentMonth}/12)
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- CITY SCENE --- */}
      <div className="relative z-10 flex-1" style={{ minHeight: 'calc(100vh - 140px)' }}>

        {/* Pedestrians on street */}
        <PedestrianLayer />

        {/* Animated customers */}
        {customers.map((c) => (
          <Customer key={c.id} customer={c} onComplete={removeCustomer} />
        ))}

        {/* Delivery truck */}
        <AnimatePresence>
          {showDelivery && (
            <DeliveryTruck
              onComplete={() => setShowDelivery(false)}
              label="Levering!"
            />
          )}
        </AnimatePresence>

        {/* Floating money popups */}
        <FloatingMoney popups={popups} />

        {/* Ground / road */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-emerald-800 to-emerald-600 z-0" />
        <div className="absolute bottom-[20%] left-0 right-0 h-[8%] bg-slate-500/60 z-[1]">
          {/* Road markings */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex gap-8 px-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-10 h-1 bg-yellow-400/50 rounded flex-shrink-0" />
            ))}
          </div>
        </div>
        <div className="absolute bottom-[28%] left-0 right-0 h-[2%] bg-slate-600/40 z-[1]" /> {/* Sidewalk */}

        {/* Trees */}
        <div className="absolute bottom-[28%] z-[2] flex gap-16 px-8 w-full pointer-events-none">
          {['🌳', '🌲', '🌳', '🌲', '🌳', '🌲', '🌳'].map((tree, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ scaleY: [1, 1.03, 1], scaleX: [1, 0.98, 1] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              {tree}
            </motion.span>
          ))}
        </div>

        {/* ===== BUILDINGS AREA ===== */}
        <div className="absolute bottom-[30%] left-0 right-0 z-[5] px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main row of buildings */}
            <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-8">

              {/* Store building - tallest */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' as const, stiffness: 150, damping: 20 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  {/* Store sign */}
                  {hasPhysicalStore && (
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ÅPEN
                    </motion.div>
                  )}
                  <Building
                    config={buildings[0]}
                    onClick={() => handleBuildingClick('store')}
                    className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/40 w-20 sm:w-24"
                  />
                </div>
              </motion.div>

              {/* Warehouse */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring' as const, stiffness: 150, damping: 20 }}
              >
                <Building
                  config={buildings[1]}
                  onClick={() => handleBuildingClick('warehouse')}
                  className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/40 w-20 sm:w-24"
                />
              </motion.div>

              {/* Office - with PC glow */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' as const, stiffness: 150, damping: 20 }}
              >
                <Building
                  config={buildings[2]}
                  onClick={() => handleBuildingClick('office')}
                  className="bg-slate-800/60 backdrop-blur-sm border border-teal-500/30 w-20 sm:w-24"
                />
              </motion.div>

              {/* Marketing */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, type: 'spring' as const, stiffness: 150, damping: 20 }}
              >
                <Building
                  config={buildings[3]}
                  onClick={() => handleBuildingClick('marketing')}
                  className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/40 w-20 sm:w-24"
                />
              </motion.div>

              {/* Personnel */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring' as const, stiffness: 150, damping: 20 }}
              >
                <Building
                  config={buildings[4]}
                  onClick={() => handleBuildingClick('personnel')}
                  className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/40 w-20 sm:w-24"
                />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Floating info panel (right side) */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-20 right-3 z-20 bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/50 w-44 hidden sm:block"
        >
          <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-semibold">Status</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Kunder</span>
              <span className="text-white font-medium">
                {reputation > 50 ? '👥👥👤' : reputation > 25 ? '👥👤' : '👤'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Lager</span>
              <span className="text-white font-medium">{totalStock} stk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rykte</span>
              <span className={`font-medium ${reputation > 60 ? 'text-emerald-400' : reputation > 30 ? 'text-amber-400' : 'text-red-400'}`}>
                {reputation}/100
              </span>
            </div>
            {lastResult && (
              <>
                <div className="border-t border-slate-700/50 pt-1.5 mt-1.5">
                  <div className="text-[10px] text-slate-500 mb-1">Forrige mnd</div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Salg</span>
                    <span className="text-white font-medium">{Math.round(lastResult.totalSales).toLocaleString('nb-NO')} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resultat</span>
                    <span className={`font-medium ${lastResult.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {lastResult.profit >= 0 ? '+' : ''}{Math.round(lastResult.profit).toLocaleString('nb-NO')} kr
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom action bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring' as const, stiffness: 200, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-t border-slate-700/50 px-4 py-3"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Quick stats (mobile) */}
          <div className="flex items-center gap-3 sm:hidden">
            <div className="text-xs">
              <span className="text-slate-400">Lager: </span>
              <span className="text-white font-medium">{totalStock}</span>
            </div>
            <div className="text-xs">
              <span className="text-slate-400">Rykte: </span>
              <span className="text-white font-medium">{reputation}</span>
            </div>
          </div>

          {/* Distribution quick link */}
          <GameButton
            onClick={() => navigate('/distribution')}
            className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all hidden sm:block"
          >
            🚚 Distribusjon
          </GameButton>

          {/* Simulate month button */}
          <GameButton
            pulse={currentMonth <= 12}
            onClick={handleSimulate}
            disabled={currentMonth > 12}
            className={`px-6 py-3 rounded-xl font-bold text-base transition-all flex-shrink-0 ${
              currentMonth <= 12
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {currentMonth <= 12
              ? `⏭️ Simuler ${monthNames[currentMonth - 1]}`
              : 'Året er ferdig!'}
          </GameButton>
        </div>
      </motion.div>

      {/* PEST Event Modal */}
      {pendingResult?.event && (
        <EventModal
          event={pendingResult.event}
          onChoose={handleEventChoice}
        />
      )}

      {/* Lock tooltip modal */}
      <AnimatePresence>
        {lockedBuilding && (
          <LockTooltip
            featureId={lockedBuilding.featureId}
            buildingName={lockedBuilding.name}
            onClose={() => setLockedBuilding(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
