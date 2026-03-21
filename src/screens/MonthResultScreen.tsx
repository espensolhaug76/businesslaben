import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, StaggerContainer, StaggerItem, AnimatedNumber, GameButton } from '../components/ui/animations'
import Confetti, { CoinRain } from '../components/ui/Confetti'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const monthNames = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

const MotionTr = motion.create('tr')

export default function MonthResultScreen() {
  const navigate = useNavigate()
  const { monthlyResults, purchasedProducts, currentMoney, monthlyRent, monthlyPersonnelCost,
    marketingBudgetFacebook, marketingBudgetTV, marketingBudgetInfluencer, marketingBudgetPrint, marketingBudgetInstagram,
    monthlyLoanPayment, selectedLocation, didMarketResearch, productPrice } = useGameStore()

  const result = monthlyResults[monthlyResults.length - 1]

  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (result && result.profit > 0) {
      const timer = setTimeout(() => setShowCelebration(true), 600)
      return () => clearTimeout(timer)
    }
  }, [result])

  if (!result) {
    navigate('/city')
    return null
  }

  const currentMonth = result.month
  const nextMonth = currentMonth + 1
  const isYearEnd = currentMonth >= 12

  const totalMarketingBudget =
    marketingBudgetFacebook + marketingBudgetTV + marketingBudgetInfluencer + marketingBudgetPrint + marketingBudgetInstagram

  const productBreakdown = result.productResults
    ? result.productResults.map((pr) => {
        const purchased = purchasedProducts.find((p) => p.productId === pr.productId)
        const dekningsbidrag = pr.revenue - pr.cogs
        const productStock = purchased
          ? purchased.stockWomen + purchased.stockMen + purchased.stockKids
          : 0
        return {
          name: pr.productName,
          tierName: purchased?.tierName ?? '',
          unitsSold: pr.unitsSold,
          revenue: pr.revenue,
          cogs: pr.cogs,
          dekningsbidrag,
          stockRemaining: productStock - pr.unitsSold,
        }
      })
    : purchasedProducts.map((p) => {
        const totalStock = purchasedProducts.reduce(
          (sum, pp) => sum + pp.stockWomen + pp.stockMen + pp.stockKids, 0
        )
        const productStock = p.stockWomen + p.stockMen + p.stockKids
        const ratio = totalStock > 0 ? productStock / totalStock : 0
        const unitsSold = Math.floor(result.unitsSold * ratio)
        const revenue = unitsSold * p.retailPriceAdult
        const cogs = unitsSold * p.costPerUnitAdult
        const dekningsbidrag = revenue - cogs
        return {
          name: p.productName,
          tierName: p.tierName,
          unitsSold,
          revenue,
          cogs,
          dekningsbidrag,
          stockRemaining: productStock - unitsSold,
        }
      })

  const totalCOGS = productBreakdown.reduce((sum, pb) => sum + pb.cogs, 0)

  function handleNextMonth() {
    if (isYearEnd) {
      navigate('/year-end')
    } else {
      navigate('/city')
    }
  }

  return (
    <PageTransition>
      {/* Celebration effects */}
      <Confetti active={showCelebration} />
      <CoinRain active={showCelebration} />

      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-teal-400 uppercase tracking-wider mb-1"
        >
          Resultatrapport
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-bold text-white"
        >
          {monthNames[currentMonth - 1]} (måned {currentMonth})
        </motion.h1>
      </div>

      {/* PEST event */}
      <AnimatePresence>
        {result.pestEvent && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 text-sm text-amber-300"
          >
            <strong>Hendelse:</strong> {result.pestEvent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Omsetning card */}
        <StaggerItem>
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 text-center">
            <div className="text-xs text-slate-400 mb-1">Omsetning</div>
            <div className="text-2xl font-bold text-white">
              <AnimatedNumber value={Math.round(result.totalSales)} duration={800} />
            </div>
            <div className="text-xs text-slate-500 mt-1">{result.unitsSold} enheter solgt</div>
          </div>
        </StaggerItem>

        {/* Kostnader card */}
        <StaggerItem>
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 text-center">
            <div className="text-xs text-slate-400 mb-1">Kostnader</div>
            <div className="text-2xl font-bold text-white">
              <AnimatedNumber value={Math.round(result.totalCosts)} duration={800} />
            </div>
          </div>
        </StaggerItem>

        {/* Resultat card with special entrance */}
        <StaggerItem>
          <motion.div
            className={`rounded-xl border p-5 text-center relative overflow-hidden ${
              result.profit >= 0
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
            animate={
              result.profit >= 0
                ? {
                    boxShadow: [
                      '0 0 0px rgba(16, 185, 129, 0)',
                      '0 0 25px rgba(16, 185, 129, 0.4)',
                      '0 0 10px rgba(16, 185, 129, 0.15)',
                    ],
                  }
                : {
                    boxShadow: [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 20px rgba(239, 68, 68, 0.4)',
                      '0 0 8px rgba(239, 68, 68, 0.2)',
                      '0 0 20px rgba(239, 68, 68, 0.4)',
                      '0 0 0px rgba(239, 68, 68, 0)',
                    ],
                  }
            }
            transition={
              result.profit >= 0
                ? { duration: 1.5, delay: 0.5, ease: 'easeOut' }
                : { duration: 1.8, delay: 0.5, repeat: 2, ease: 'easeInOut' }
            }
          >
            <div className="text-xs text-slate-400 mb-1">Resultat</div>
            <div className={`text-2xl font-bold ${result.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {result.profit >= 0 ? '+' : ''}
              <AnimatedNumber value={Math.round(result.profit)} duration={1000} />
            </div>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>

      {/* Cost breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.6 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-6"
      >
        <h3 className="font-bold text-white mb-3">Kostnadsfordeling</h3>
        <StaggerContainer className="space-y-2 text-sm">
          <StaggerItem>
            <div className="flex justify-between">
              <span className="text-slate-400">Varekostnad (COGS)</span>
              <span className="text-white">{formatKr(Math.round(totalCOGS))}</span>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex justify-between">
              <span className="text-slate-400">Husleie</span>
              <span className="text-white">{formatKr(monthlyRent)}</span>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex justify-between">
              <span className="text-slate-400">Lønn</span>
              <span className="text-white">{formatKr(monthlyPersonnelCost)}</span>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex justify-between">
              <span className="text-slate-400">Markedsføring</span>
              <span className="text-white">{formatKr(totalMarketingBudget)}</span>
            </div>
          </StaggerItem>
          {monthlyLoanPayment > 0 && (
            <StaggerItem>
              <div className="flex justify-between">
                <span className="text-slate-400">Låneavdrag</span>
                <span className="text-white">{formatKr(monthlyLoanPayment)}</span>
              </div>
            </StaggerItem>
          )}
          <StaggerItem>
            <div className="flex justify-between pt-2 border-t border-slate-700 font-medium">
              <span className="text-slate-300">Totalt</span>
              <span className="text-white">{formatKr(Math.round(result.totalCosts))}</span>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </motion.div>

      {/* Per-product breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.8 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-6"
      >
        <h3 className="font-bold text-white mb-3">Produktoversikt</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">Produkt</th>
                <th className="pb-2 font-medium text-right">Solgt</th>
                <th className="pb-2 font-medium text-right">Omsetning</th>
                <th className="pb-2 font-medium text-right">Varekost</th>
                <th className="pb-2 font-medium text-right">DB</th>
                <th className="pb-2 font-medium text-right">Lager</th>
              </tr>
            </thead>
            <tbody>
              {productBreakdown.map((pb, i) => (
                <MotionTr
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 1.0 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-slate-700/50 last:border-0"
                >
                  <td className="py-2">
                    <div className="font-medium text-white">{pb.name}</div>
                    <div className="text-xs text-slate-500">{pb.tierName}</div>
                  </td>
                  <td className="py-2 text-right text-slate-300">{pb.unitsSold} stk</td>
                  <td className="py-2 text-right text-slate-300">{formatKr(pb.revenue)}</td>
                  <td className="py-2 text-right text-slate-300">{formatKr(pb.cogs)}</td>
                  <td className={`py-2 text-right font-medium ${pb.dekningsbidrag >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatKr(pb.dekningsbidrag)}
                  </td>
                  <td className="py-2 text-right text-slate-300">{Math.max(0, pb.stockRemaining)} stk</td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Cash balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: currentMoney >= 0
            ? [
                '0 0 0px rgba(20, 184, 166, 0)',
                '0 0 20px rgba(20, 184, 166, 0.35)',
                '0 0 6px rgba(20, 184, 166, 0.1)',
              ]
            : [
                '0 0 0px rgba(239, 68, 68, 0)',
                '0 0 20px rgba(239, 68, 68, 0.35)',
                '0 0 6px rgba(239, 68, 68, 0.1)',
              ],
        }}
        transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
        className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-5 mb-6 flex items-center justify-between"
      >
        <span className="font-semibold text-white">Saldo etter måned {currentMonth}</span>
        <span className={`text-2xl font-bold ${currentMoney >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
          <AnimatedNumber value={currentMoney} duration={800} />
        </span>
      </motion.div>

      {/* Diagnostic analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.3 }}
        className="bg-slate-800 rounded-xl border border-slate-700 p-5 mb-6"
      >
        <h3 className="font-bold text-white mb-3">Diagnostikk og anbefalinger</h3>
        <div className="space-y-3 text-sm">
          {/* Traffic analysis */}
          {selectedLocation && (() => {
            const expectedVisitors = selectedLocation.dailyFootTraffic * 30
            const conversionRate = expectedVisitors > 0 ? (result.unitsSold / expectedVisitors) * 100 : 0
            const avgProductPrice = purchasedProducts.length > 0
              ? purchasedProducts.reduce((sum, p) => sum + p.retailPriceAdult, 0) / purchasedProducts.length
              : productPrice
            const avgTypicalPrice = purchasedProducts.length > 0
              ? purchasedProducts.reduce((sum, p) => sum + (p.typicalRetailPrice || 0), 0) / purchasedProducts.length
              : 0
            const priceRatio = avgTypicalPrice > 0 ? avgProductPrice / avgTypicalPrice : 1

            const diagnostics: { label: string; value: string; color: string; icon: string }[] = []

            // Traffic
            if (selectedLocation.trafficLevel <= 3) {
              diagnostics.push({
                label: 'Lav fottrafikk',
                value: `${selectedLocation.dailyFootTraffic}/dag → ca. ${expectedVisitors} besøkende/mnd`,
                color: 'text-red-400',
                icon: '🚶',
              })
            } else if (selectedLocation.trafficLevel <= 6) {
              diagnostics.push({
                label: 'Moderat fottrafikk',
                value: `${selectedLocation.dailyFootTraffic}/dag → ca. ${expectedVisitors} besøkende/mnd`,
                color: 'text-amber-400',
                icon: '🚶',
              })
            } else {
              diagnostics.push({
                label: 'Høy fottrafikk',
                value: `${selectedLocation.dailyFootTraffic}/dag → ca. ${expectedVisitors} besøkende/mnd`,
                color: 'text-emerald-400',
                icon: '🚶',
              })
            }

            // Conversion
            diagnostics.push({
              label: 'Konverteringsrate',
              value: `${conversionRate.toFixed(1)}% (${result.unitsSold} solgt av ${expectedVisitors} besøkende)`,
              color: conversionRate >= 3 ? 'text-emerald-400' : conversionRate >= 1 ? 'text-amber-400' : 'text-red-400',
              icon: '🎯',
            })

            // Price positioning
            if (avgTypicalPrice > 0) {
              diagnostics.push({
                label: 'Prisposisjonering',
                value: priceRatio > 1.2
                  ? `${Math.round((priceRatio - 1) * 100)}% over markedspris — kan redusere salg`
                  : priceRatio < 0.8
                    ? `${Math.round((1 - priceRatio) * 100)}% under markedspris — god verdi, men lavere margin`
                    : 'I tråd med markedspris',
                color: priceRatio > 1.2 ? 'text-red-400' : priceRatio < 0.8 ? 'text-amber-400' : 'text-emerald-400',
                icon: '💰',
              })
            }

            // Recommendations
            const recommendations: string[] = []
            if (conversionRate < 1 && selectedLocation.trafficLevel <= 4) {
              recommendations.push('Vurder å flytte til en lokasjon med høyere fottrafikk, eller øk markedsføring for å trekke kunder.')
            }
            if (priceRatio > 1.3) {
              recommendations.push('Prisen din er betydelig over markedspris. Vurder å senke prisen for å øke salg.')
            }
            if (!didMarketResearch) {
              recommendations.push('Du har ikke gjort markedsundersøkelse. Vurder å kjøpe en rapport for bedre innsikt.')
            }
            if (totalMarketingBudget === 0) {
              recommendations.push('Du bruker ingenting på markedsføring. Selv et lite budsjett kan øke kundetrafikken.')
            }
            if (result.profit < 0) {
              recommendations.push('Du går i minus. Vurder å kutte kostnader, øke priser, eller selge flere enheter.')
            }

            return (
              <>
                {diagnostics.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{d.icon}</span>
                    <div className="flex-1">
                      <span className="text-slate-400">{d.label}</span>
                      <div className={`font-medium ${d.color}`}>{d.value}</div>
                    </div>
                  </div>
                ))}
                {recommendations.length > 0 && (
                  <div className="mt-2 pt-3 border-t border-slate-700">
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Anbefalinger</div>
                    <ul className="space-y-1">
                      {recommendations.map((r, i) => (
                        <li key={i} className="text-slate-300 text-xs flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">→</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )
          })()}
          {!selectedLocation && (
            <p className="text-slate-500 text-xs">Ingen lokasjonsdata tilgjengelig for diagnostikk.</p>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        className="flex justify-between"
      >
        <GameButton
          onClick={() => navigate('/city')}
          className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
        >
          Tilbake til dashboard
        </GameButton>
        <GameButton
          onClick={handleNextMonth}
          pulse
          className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30 transition-all"
        >
          {isYearEnd
            ? 'Se årsoppgjør'
            : `Fortsett til måned ${nextMonth}`
          }
        </GameButton>
      </motion.div>
    </PageTransition>
  )
}
