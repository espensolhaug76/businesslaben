import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { simulateMonth, applySimulationResult } from '../engine/simulation'
import type { SimulationResult } from '../engine/simulation'
import type { EventChoice } from '../types'
import EventModal from '../components/ui/EventModal'
import { PageTransition, StaggerContainer, StaggerItem, AnimatedNumber, GameButton, GameCard } from '../components/ui/animations'
import SimulationLoader from '../components/ui/SimulationLoader'
import { useToast } from '../components/ui/Toast'
import Confetti, { CoinRain } from '../components/ui/Confetti'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const monthNames = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

export default function DashboardScreen() {
  const navigate = useNavigate()
  const store = useGameStore()
  const { toast } = useToast()
  const [pendingResult, setPendingResult] = useState<SimulationResult | null>(null)
  const [simulating, setSimulating] = useState(false)
  const [pendingSimResult, setPendingSimResult] = useState<SimulationResult | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCoinRain, setShowCoinRain] = useState(false)

  const {
    companyName,
    selectedIndustry,
    businessModel,
    targetSegments,
    purchasedProducts,
    currentMoney,
    monthlyResults,
    monthlyRent,
    monthlyPersonnelCost,
    marketingBudgetFacebook,
    marketingBudgetTV,
    marketingBudgetInfluencer,
    marketingBudgetPrint,
    marketingBudgetInstagram,
    stockWomen,
    stockMen,
    stockKids,
    totalCapacity,
  } = store

  const currentMonth = monthlyResults.length + 1
  const primarySegment = targetSegments.find((s) => s.isPrimary)

  const totalMarketingBudget =
    marketingBudgetFacebook + marketingBudgetTV + marketingBudgetInfluencer + marketingBudgetPrint + marketingBudgetInstagram
  const estimatedMonthlyCosts = monthlyRent + monthlyPersonnelCost + totalMarketingBudget

  const pricedProducts = purchasedProducts.filter((p) => p.retailPriceAdult > 0)
  const avgMargin =
    pricedProducts.length > 0
      ? pricedProducts.reduce(
          (sum, p) => sum + ((p.retailPriceAdult - p.costPerUnitAdult) / p.retailPriceAdult) * 100,
          0
        ) / pricedProducts.length
      : 0

  const industryLabels: Record<string, string> = {
    fashion: 'Mote', food: 'Mat og drikke', electronics: 'Elektronikk',
    furniture: 'Møbler', technology: 'Teknologi', travel: 'Reise', health: 'Helse',
  }

  const capacityPerSegment = Math.floor(totalCapacity / 3)

  function handleSimulate() {
    const state = useGameStore.getState()
    const simResult = simulateMonth(state, currentMonth)

    if (simResult.event) {
      // Show event modal before applying results
      setPendingResult(simResult)
    } else {
      // Start simulation loader
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

    // Check if the result was profitable for celebration effects
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

    // Trigger celebrations if profitable
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
    // Apply the event consequence to reputation
    useGameStore.setState((s) => ({
      reputation: Math.max(0, Math.min(100, s.reputation + choice.consequence.reputationModifier)),
    }))
    // Start simulation loader after event choice
    setPendingSimResult(pendingResult)
    setSimulating(true)
    setPendingResult(null)
  }

  return (
    <PageTransition>
      <Confetti active={showConfetti} />
      <CoinRain active={showCoinRain} />

      <AnimatePresence>
        {simulating && <SimulationLoader onComplete={finishSimulation} />}
      </AnimatePresence>

      {/* Month header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{companyName || 'Dashboard'}</h1>
          <p className="text-slate-400 text-sm">
            {industryLabels[selectedIndustry] || selectedIndustry} | {businessModel}
          </p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-slate-800 rounded-xl px-5 py-3 border border-slate-700"
        >
          <div className="text-xs text-slate-400">Måned</div>
          <div className="text-2xl font-bold text-teal-400">{currentMonth} / 12</div>
        </motion.div>
      </div>

      {/* Capital & quick stats */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StaggerItem>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Tilgjengelig kapital</div>
            <div className={`text-xl font-bold ${currentMoney >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
              <AnimatedNumber value={currentMoney} />
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Produkter</div>
            <div className="text-xl font-bold text-white">{purchasedProducts.length}</div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Snittmargin</div>
            <div className={`text-xl font-bold ${avgMargin >= 50 ? 'text-emerald-400' : avgMargin >= 30 ? 'text-amber-400' : 'text-red-400'}`}>
              {avgMargin.toFixed(0)}%
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Mnd. kostnader</div>
            <div className="text-xl font-bold text-white">
              <AnimatedNumber value={estimatedMonthlyCosts} />
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Quick access buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Priser', icon: '💰', path: '/pricing' },
          { label: 'Distribusjon', icon: '🚚', path: '/distribution' },
          { label: 'Markedsføring', icon: '📢', path: '/marketing' },
          { label: 'Personale', icon: '👥', path: '/personnel' },
        ].map((btn) => (
          <GameCard
            key={btn.path}
            onClick={() => navigate(btn.path)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500/50 rounded-xl p-4 text-center transition-colors"
          >
            <div className="text-2xl mb-1">{btn.icon}</div>
            <div className="text-sm font-medium text-white">{btn.label}</div>
          </GameCard>
        ))}
      </div>

      {/* Inventory health */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6">
        <h3 className="font-bold text-white mb-3">Lagerstatus</h3>
        <div className="space-y-3">
          {[
            { label: 'Dame', current: stockWomen, color: 'bg-pink-500' },
            { label: 'Herre', current: stockMen, color: 'bg-blue-500' },
            { label: 'Barn', current: stockKids, color: 'bg-amber-500' },
          ].map(({ label, current, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-white">{current} / {capacityPerSegment}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <motion.div
                  className={`${color} rounded-full h-2.5`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (current / Math.max(1, capacityPerSegment)) * 100)}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target audience */}
      {primarySegment && (
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6">
          <h3 className="font-bold text-white mb-3">Målgruppe</h3>
          <div className="text-sm text-slate-300">
            {primarySegment.genders.join(', ')} | {primarySegment.ageGroups.join(', ')} år
            {primarySegment.psychographics.length > 0 && ` | ${primarySegment.psychographics.join(', ')}`}
            {primarySegment.geography && ` | ${primarySegment.geography}`}
          </div>
        </div>
      )}

      {/* Previous results */}
      {monthlyResults.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6">
          <h3 className="font-bold text-white mb-3">Tidligere resultater</h3>
          <div className="space-y-2">
            {monthlyResults.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0 text-sm">
                <span className="text-slate-400">Mnd {r.month} ({monthNames[r.month - 1]})</span>
                <div className="flex gap-4">
                  <span className="text-slate-300">Salg: {formatKr(Math.round(r.totalSales))}</span>
                  <span className={r.profit >= 0 ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
                    {r.profit >= 0 ? '+' : ''}{formatKr(Math.round(r.profit))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Simulate button */}
      <GameButton
        pulse
        onClick={handleSimulate}
        disabled={currentMonth > 12}
        className={`w-full py-5 font-bold text-lg rounded-2xl shadow-lg transition-all ${
          currentMonth <= 12
            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 hover:shadow-teal-500/30'
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
        }`}
      >
        {currentMonth <= 12
          ? `🚀 Simuler ${monthNames[currentMonth - 1]} (måned ${currentMonth})`
          : 'Året er ferdig!'}
      </GameButton>

      {/* PEST Event Modal */}
      {pendingResult?.event && (
        <EventModal
          event={pendingResult.event}
          onChoose={handleEventChoice}
        />
      )}
    </PageTransition>
  )
}
