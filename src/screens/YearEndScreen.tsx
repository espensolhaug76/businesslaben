import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { calculateGrade } from '../engine/GradeCalculator'
import { GamePhase } from '../types'
import { PageTransition, StaggerContainer, StaggerItem, AnimatedNumber, GameButton } from '../components/ui/animations'
import Confetti from '../components/ui/Confetti'
import { useState, useEffect } from 'react'

function formatKr(amount: number): string {
  return Math.round(amount).toLocaleString('nb-NO') + ' kr'
}

const gradeColors: Record<string, string> = {
  A: 'text-emerald-400 border-emerald-400',
  B: 'text-teal-400 border-teal-400',
  C: 'text-amber-400 border-amber-400',
  D: 'text-orange-400 border-orange-400',
  E: 'text-red-400 border-red-400',
  F: 'text-red-500 border-red-500',
}

const gradeBgColors: Record<string, string> = {
  A: 'from-emerald-500/20 to-emerald-500/5',
  B: 'from-teal-500/20 to-teal-500/5',
  C: 'from-amber-500/20 to-amber-500/5',
  D: 'from-orange-500/20 to-orange-500/5',
  E: 'from-red-500/20 to-red-500/5',
  F: 'from-red-600/20 to-red-600/5',
}

export default function YearEndScreen() {
  const navigate = useNavigate()
  const store = useGameStore()
  const [showConfetti, setShowConfetti] = useState(false)

  const {
    companyName,
    monthlyResults,
    currentMoney,
    startingMoney,
    reputation,
    currentYear,
    setPhase,
  } = store

  // Calculate grade using the engine
  const state = useGameStore.getState()
  const gradeResult = calculateGrade(monthlyResults, state)

  // Trigger confetti for good grades
  useEffect(() => {
    if (['A', 'B'].includes(gradeResult.grade)) {
      const timer = setTimeout(() => setShowConfetti(true), 800)
      return () => clearTimeout(timer)
    }
  }, [gradeResult.grade])

  // Aggregate stats
  const totalRevenue = monthlyResults.reduce((sum, r) => sum + r.totalSales, 0)
  const totalCosts = monthlyResults.reduce((sum, r) => sum + r.totalCosts, 0)
  const totalProfit = monthlyResults.reduce((sum, r) => sum + r.profit, 0)
  const totalUnitsSold = monthlyResults.reduce((sum, r) => sum + r.unitsSold, 0)
  const profitableMonths = monthlyResults.filter((r) => r.profit > 0).length

  // Best and worst month
  const bestMonth = monthlyResults.length > 0
    ? monthlyResults.reduce((best, r) => (r.profit > best.profit ? r : best), monthlyResults[0])
    : null
  const worstMonth = monthlyResults.length > 0
    ? monthlyResults.reduce((worst, r) => (r.profit < worst.profit ? r : worst), monthlyResults[0])
    : null

  // Best and worst products (by revenue across all months)
  const productRevenue = new Map<string, { name: string; revenue: number; units: number }>()
  for (const result of monthlyResults) {
    for (const pr of result.productResults) {
      const existing = productRevenue.get(pr.productId)
      if (existing) {
        existing.revenue += pr.revenue
        existing.units += pr.unitsSold
      } else {
        productRevenue.set(pr.productId, {
          name: pr.productName,
          revenue: pr.revenue,
          units: pr.unitsSold,
        })
      }
    }
  }
  const productList = Array.from(productRevenue.values()).sort((a, b) => b.revenue - a.revenue)
  const bestProduct = productList[0] ?? null
  const worstProduct = productList.length > 1 ? productList[productList.length - 1] : null

  const monthNames = [
    'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
  ]

  function handleStartYear2() {
    useGameStore.setState({
      currentMonth: 1,
      currentYear: currentYear + 1,
    })
    setPhase(GamePhase.Playing)
    navigate('/city')
  }

  function handleEndGame() {
    setPhase(GamePhase.GameOver)
    navigate('/')
  }

  return (
    <PageTransition>
      <Confetti active={showConfetti} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Årsoppgjør — År {currentYear}</h1>
          <p className="text-slate-400 mt-1">{companyName}</p>
        </motion.div>

        {/* Grade display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring' as const, stiffness: 200, damping: 20 }}
          className={`bg-gradient-to-b ${gradeBgColors[gradeResult.grade] ?? gradeBgColors.C} rounded-2xl p-8 border border-slate-700 mb-6 text-center`}
        >
          <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">Din karakter</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' as const, stiffness: 300, damping: 15 }}
            className={`text-8xl font-black mb-4 ${gradeColors[gradeResult.grade] ?? 'text-white'}`}
          >
            {gradeResult.grade}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            {gradeResult.feedback}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-4 text-sm text-slate-500"
          >
            Total poengsum: {gradeResult.totalScore} / 100
          </motion.div>
        </motion.div>

        {/* Score breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6"
        >
          <h2 className="font-bold text-white mb-4">Detaljert vurdering</h2>
          <div className="space-y-4">
            {[
              { label: 'Lønnsomhet', score: gradeResult.details.profitabilityScore, max: 30, feedback: gradeResult.categoryFeedback.profitability },
              { label: 'Vekst', score: gradeResult.details.growthScore, max: 20, feedback: gradeResult.categoryFeedback.growth },
              { label: 'Omdømme', score: gradeResult.details.reputationScore, max: 15, feedback: gradeResult.categoryFeedback.reputation },
              { label: 'Beslutningskvalitet', score: gradeResult.details.decisionQualityScore, max: 20, feedback: gradeResult.categoryFeedback.decisions },
              { label: 'Bærekraft', score: gradeResult.details.sustainabilityScore, max: 15, feedback: gradeResult.categoryFeedback.sustainability },
            ].map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-300">{cat.label}</span>
                  <span className="text-sm text-teal-400 font-mono">{cat.score}/{cat.max}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 1.0 + i * 0.1, ease: 'easeOut' as const }}
                    className="bg-teal-500 rounded-full h-2"
                  />
                </div>
                <p className="text-xs text-slate-500">{cat.feedback}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Financial summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6"
        >
          <h2 className="font-bold text-white mb-4">Økonomisk sammendrag</h2>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <div>
                <div className="text-xs text-slate-400 mb-1">Total omsetning</div>
                <div className="text-xl font-bold text-white">
                  <AnimatedNumber value={totalRevenue} duration={800} />
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div>
                <div className="text-xs text-slate-400 mb-1">Totale kostnader</div>
                <div className="text-xl font-bold text-white">
                  <AnimatedNumber value={totalCosts} duration={800} />
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div>
                <div className="text-xs text-slate-400 mb-1">Total fortjeneste</div>
                <div className={`text-xl font-bold ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {totalProfit >= 0 ? '+' : ''}<AnimatedNumber value={totalProfit} duration={1000} />
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div>
                <div className="text-xs text-slate-400 mb-1">Kontantbeholdning</div>
                <div className={`text-xl font-bold ${currentMoney >= startingMoney ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <AnimatedNumber value={currentMoney} duration={800} />
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Additional stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
            {[
              { value: totalUnitsSold, label: 'Enheter solgt' },
              { value: `${profitableMonths}/${monthlyResults.length}`, label: 'Lønnsomme måneder' },
              { value: reputation, label: 'Omdømme' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Best & worst */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {bestMonth && (
            <StaggerItem>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-sm text-emerald-400 font-semibold mb-2">Beste måned</h3>
                <div className="text-white font-bold text-lg">
                  {monthNames[bestMonth.month - 1] ?? `Mnd ${bestMonth.month}`}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Fortjeneste: <span className="text-emerald-400">{formatKr(bestMonth.profit)}</span>
                </div>
                <div className="text-sm text-slate-400">
                  Omsetning: {formatKr(bestMonth.totalSales)} | Solgt: {bestMonth.unitsSold} stk
                </div>
              </div>
            </StaggerItem>
          )}
          {worstMonth && (
            <StaggerItem>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-sm text-red-400 font-semibold mb-2">Svakeste måned</h3>
                <div className="text-white font-bold text-lg">
                  {monthNames[worstMonth.month - 1] ?? `Mnd ${worstMonth.month}`}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Fortjeneste: <span className={worstMonth.profit >= 0 ? 'text-amber-400' : 'text-red-400'}>{formatKr(worstMonth.profit)}</span>
                </div>
                <div className="text-sm text-slate-400">
                  Omsetning: {formatKr(worstMonth.totalSales)} | Solgt: {worstMonth.unitsSold} stk
                </div>
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>

        {/* Best & worst products */}
        {productList.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {bestProduct && (
              <StaggerItem>
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <h3 className="text-sm text-emerald-400 font-semibold mb-2">Beste produkt</h3>
                  <div className="text-white font-bold">{bestProduct.name}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Omsetning: <span className="text-emerald-400">{formatKr(bestProduct.revenue)}</span> | {bestProduct.units} stk solgt
                  </div>
                </div>
              </StaggerItem>
            )}
            {worstProduct && (
              <StaggerItem>
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <h3 className="text-sm text-red-400 font-semibold mb-2">Svakeste produkt</h3>
                  <div className="text-white font-bold">{worstProduct.name}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Omsetning: <span className="text-amber-400">{formatKr(worstProduct.revenue)}</span> | {worstProduct.units} stk solgt
                  </div>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>
        )}

        {/* Monthly profit chart */}
        {monthlyResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6"
          >
            <h2 className="font-bold text-white mb-4">Månedlig fortjeneste</h2>
            <div className="space-y-2">
              {monthlyResults.map((r, i) => {
                const maxAbsProfit = Math.max(
                  ...monthlyResults.map((m) => Math.abs(m.profit)),
                  1,
                )
                const barWidth = Math.abs(r.profit) / maxAbsProfit * 100
                const isPositive = r.profit >= 0

                return (
                  <motion.div
                    key={r.month}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 text-xs text-slate-400 text-right flex-shrink-0">
                      {monthNames[r.month - 1]?.slice(0, 3) ?? `M${r.month}`}
                    </div>
                    <div className="flex-1 h-5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(2, barWidth)}%` }}
                        transition={{ duration: 0.6, delay: 1.4 + i * 0.05, ease: 'easeOut' as const }}
                        className={`h-full rounded-full ${isPositive ? 'bg-teal-500' : 'bg-red-500'}`}
                      />
                    </div>
                    <div className={`w-24 text-xs text-right font-mono ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{formatKr(r.profit)}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <GameButton
            onClick={handleStartYear2}
            pulse
            className="flex-1 py-4 font-bold text-lg rounded-2xl shadow-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 hover:shadow-teal-500/30 transition-all"
          >
            Start År {currentYear + 1}
          </GameButton>
          <GameButton
            onClick={handleEndGame}
            className="flex-1 py-4 font-bold text-lg rounded-2xl border border-slate-600 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:border-slate-500 transition-all"
          >
            Avslutt spill
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
