import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, GameButton, AnimatedNumber } from '../components/ui/animations'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const startupFields = [
  { key: 'goods', label: 'Innkjøp av varer', hint: 'Første varelager til butikken', example: '30 000 – 80 000' },
  { key: 'furniture', label: 'Butikkinventar og utstyr', hint: 'Hyller, kasse, belysning, skilting', example: '15 000 – 50 000' },
  { key: 'marketing_launch', label: 'Markedsføring (lansering)', hint: 'Åpningskampanje, flyers, sosiale medier', example: '5 000 – 25 000' },
  { key: 'legal', label: 'Juridisk og registrering', hint: 'Brønnøysundregistrene, evt. rådgivning', example: '3 000 – 10 000' },
  { key: 'branding', label: 'Logo og designprofil', hint: 'Logo, visuell profil, nettside', example: '5 000 – 20 000' },
  { key: 'it', label: 'IT-systemer og kassesystem', hint: 'Kassesystem, nettside, regnskapsprogram', example: '5 000 – 15 000' },
  { key: 'deposit', label: 'Depositum (leie)', hint: 'Vanligvis 3 måneders leie', example: '24 000 – 180 000' },
  { key: 'renovation', label: 'Oppussing og innredning', hint: 'Lokaltilpasning, maling, gulv', example: '20 000 – 80 000' },
  { key: 'market_research', label: 'Markedsundersøkelse', hint: 'Ipsos-rapport eller lignende', example: '0 – 25 000' },
  { key: 'other_startup', label: 'Annet', hint: 'Andre oppstartskostnader', example: '0 – 10 000' },
]

const monthlyFields = [
  { key: 'rent', label: 'Husleie', hint: 'Månedlig leie for butikklokale', example: '8 000 – 60 000' },
  { key: 'salary', label: 'Lønn (ansatte)', hint: 'Inkl. arbeidsgiveravgift', example: '0 – 45 000' },
  { key: 'utilities', label: 'Strøm og kommunale avgifter', hint: 'Strøm, vann, renovasjon', example: '2 000 – 5 000' },
  { key: 'insurance', label: 'Forsikring', hint: 'Ansvar- og innboforsikring', example: '1 000 – 3 000' },
  { key: 'marketing_monthly', label: 'Markedsføring (løpende)', hint: 'Sosiale medier, annonser, influencere', example: '2 000 – 15 000' },
  { key: 'accounting', label: 'Regnskapsfører', hint: 'Ekstern regnskapshjelp', example: '2 000 – 5 000' },
  { key: 'other_monthly', label: 'Annet', hint: 'Andre løpende kostnader', example: '0 – 5 000' },
]

// Fields that are auto-filled from previous steps
const autoFillSources: Record<string, string> = {
  goods: 'Produktvalg',
  deposit: 'Lokasjon',
  renovation: 'Lokasjon',
  market_research: 'Markedsundersøkelse',
  rent: 'Lokasjon',
}

export default function BudgetPlanningScreen() {
  const navigate = useNavigate()
  const existingStartup = useGameStore((s) => s.budgetStartup)
  const existingMonthly = useGameStore((s) => s.budgetMonthly)
  const existingSales = useGameStore((s) => s.budgetSalesEstimate)
  const purchasedProducts = useGameStore((s) => s.purchasedProducts)
  const selectedLocation = useGameStore((s) => s.selectedLocation)
  const marketResearchCost = useGameStore((s) => s.marketResearchCost)
  const priceCalculationAnswers = useGameStore((s) => s.priceCalculationAnswers) as Record<string, string> | undefined

  // Compute auto-fill values from previous steps
  const autoValues = useMemo(() => {
    const values: Record<string, number> = {}

    // Goods: sum of purchased product costs (costPerUnitAdult × total stock per product)
    if (purchasedProducts.length > 0) {
      values.goods = purchasedProducts.reduce((sum, p) => {
        const totalUnits = p.stockWomen + p.stockMen + p.stockKids
        return sum + p.costPerUnitAdult * totalUnits
      }, 0)
    }

    // Deposit and renovation from selected location
    if (selectedLocation) {
      values.deposit = selectedLocation.deposit
      values.renovation = selectedLocation.renovation
      values.rent = selectedLocation.rent
    }

    // Market research cost
    if (marketResearchCost !== undefined && marketResearchCost > 0) {
      values.market_research = marketResearchCost
    }

    return values
  }, [purchasedProducts, selectedLocation, marketResearchCost])

  // Auto-fill avg price from price calculation
  const autoAvgPrice = useMemo(() => {
    if (priceCalculationAnswers?.utsalgsprisInklMva) {
      const parsed = parseFloat(priceCalculationAnswers.utsalgsprisInklMva.replace(/,/g, '.').replace(/[^\d.]/g, ''))
      if (parsed > 0) return Math.round(parsed)
    }
    return 0
  }, [priceCalculationAnswers])

  // Build initial values with auto-fill
  const buildInitial = (fields: typeof startupFields, existing: Record<string, number> | undefined, auto: Record<string, number>) => {
    const base = existing || Object.fromEntries(fields.map((f) => [f.key, 0]))
    // Override with auto values for auto-filled fields
    for (const [key, val] of Object.entries(auto)) {
      if (fields.some((f) => f.key === key)) {
        base[key] = val
      }
    }
    return base
  }

  const [startup, setStartup] = useState<Record<string, number>>(() =>
    buildInitial(startupFields, existingStartup, autoValues)
  )
  const [monthly, setMonthly] = useState<Record<string, number>>(() =>
    buildInitial(monthlyFields, existingMonthly, autoValues)
  )
  const [salesUnits, setSalesUnits] = useState(existingSales?.unitsPerMonth || 0)
  const [avgPrice, setAvgPrice] = useState(existingSales?.avgPrice || autoAvgPrice || 0)

  const totalStartup = Object.values(startup).reduce((s, v) => s + v, 0)
  const totalMonthly = Object.values(monthly).reduce((s, v) => s + v, 0)
  const totalYear1 = totalStartup + totalMonthly * 12
  const monthlyRevenue = salesUnits * avgPrice
  const yearlyRevenue = monthlyRevenue * 12
  const monthlyProfit = monthlyRevenue - totalMonthly
  const breakEvenUnits = avgPrice > 0 ? Math.ceil(totalMonthly / avgPrice) : 0

  const hasEnteredStartup = Object.values(startup).some((v) => v > 0)
  const hasEnteredMonthly = Object.values(monthly).some((v) => v > 0)
  const hasEnteredSales = salesUnits > 0 && avgPrice > 0
  const canProceed = hasEnteredStartup && hasEnteredMonthly && hasEnteredSales

  function handleNext() {
    if (!canProceed) return
    useGameStore.setState({
      budgetStartup: startup,
      budgetMonthly: monthly,
      budgetSalesEstimate: { unitsPerMonth: salesUnits, avgPrice },
    })
    navigate('/financing')
  }

  function handleFieldChange(
    section: 'startup' | 'monthly',
    key: string,
    value: string
  ) {
    const num = parseInt(value.replace(/\D/g, '')) || 0
    if (section === 'startup') {
      setStartup((prev) => ({ ...prev, [key]: num }))
    } else {
      setMonthly((prev) => ({ ...prev, [key]: num }))
    }
  }

  return (
    <PageTransition>
      <div className="py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Budsjettplanlegging</h1>
          <p className="text-slate-400">Lag et detaljert budsjett for oppstart og drift</p>
        </motion.div>

        {/* Auto-fill info */}
        {Object.keys(autoValues).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-4 mb-4"
          >
            <p className="text-sm text-teal-300">
              Noen felt er automatisk fylt ut basert på dine tidligere valg (lokasjon, produkter, markedsundersøkelse).
              Disse feltene er markert med «Auto-fylt» og kan ikke endres her — gå tilbake til det aktuelle steget for å endre.
            </p>
          </motion.div>
        )}

        {/* Startup costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 mb-4"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-4 uppercase tracking-wide">
            Oppstartskostnader (engangs)
          </h2>
          <div className="space-y-3">
            {startupFields.map((field) => {
              const isAuto = field.key in autoValues && autoValues[field.key] > 0
              const source = autoFillSources[field.key]
              return (
                <div key={field.key} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-white font-medium">{field.label}</label>
                      {isAuto && source && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400 whitespace-nowrap">
                          Auto-fylt fra {source}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">{field.hint} ({field.example})</div>
                  </div>
                  <div className="relative w-36">
                    <input
                      type="text"
                      inputMode="numeric"
                      readOnly={isAuto}
                      value={startup[field.key] || ''}
                      onChange={(e) => handleFieldChange('startup', field.key, e.target.value)}
                      placeholder="0"
                      className={`w-full border rounded-lg px-3 py-2 text-sm text-right outline-none ${
                        isAuto
                          ? 'bg-teal-500/5 border-teal-500/30 text-teal-300 cursor-not-allowed'
                          : 'bg-slate-900/60 border-slate-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                      }`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">kr</span>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
              <span className="font-bold text-white">Totalt oppstart</span>
              <span className="font-bold text-lg text-teal-400">
                <AnimatedNumber value={totalStartup} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Monthly costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 mb-4"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-4 uppercase tracking-wide">
            Månedlige faste kostnader
          </h2>
          <div className="space-y-3">
            {monthlyFields.map((field) => {
              const isAuto = field.key in autoValues && autoValues[field.key] > 0
              const source = autoFillSources[field.key]
              return (
                <div key={field.key} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-white font-medium">{field.label}</label>
                      {isAuto && source && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400 whitespace-nowrap">
                          Auto-fylt fra {source}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">{field.hint} ({field.example})</div>
                  </div>
                  <div className="relative w-36">
                    <input
                      type="text"
                      inputMode="numeric"
                      readOnly={isAuto}
                      value={monthly[field.key] || ''}
                      onChange={(e) => handleFieldChange('monthly', field.key, e.target.value)}
                      placeholder="0"
                      className={`w-full border rounded-lg px-3 py-2 text-sm text-right outline-none ${
                        isAuto
                          ? 'bg-teal-500/5 border-teal-500/30 text-teal-300 cursor-not-allowed'
                          : 'bg-slate-900/60 border-slate-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                      }`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">kr/mnd</span>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
              <span className="font-bold text-white">Totalt per måned</span>
              <span className="font-bold text-lg text-teal-400">
                <AnimatedNumber value={totalMonthly} /> <span className="text-sm text-slate-400">/mnd</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Totalt år 1 (12 mnd)</span>
              <span className="font-medium text-white">{formatKr(totalMonthly * 12)}</span>
            </div>
          </div>
        </motion.div>

        {/* Revenue estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 mb-4"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-4 uppercase tracking-wide">
            Inntektsestimat (år 1)
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-sm text-white font-medium">Forventet salg per måned</label>
                <div className="text-[10px] text-slate-500">Hvor mange enheter tror du at du selger?</div>
              </div>
              <div className="relative w-36">
                <input
                  type="text"
                  inputMode="numeric"
                  value={salesUnits || ''}
                  onChange={(e) => setSalesUnits(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                  placeholder="0"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm text-right focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">stk</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-white font-medium">Gjennomsnittspris per enhet</label>
                  {autoAvgPrice > 0 && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400 whitespace-nowrap">
                      Auto-fylt fra Priskalkulasjon
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500">Hva blir snittpris inkl. MVA?</div>
              </div>
              <div className="relative w-36">
                <input
                  type="text"
                  inputMode="numeric"
                  value={avgPrice || ''}
                  onChange={(e) => setAvgPrice(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                  placeholder="0"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm text-right focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">kr</span>
              </div>
            </div>
            <div className="space-y-1 pt-3 border-t border-slate-700/50">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Månedlig omsetning</span>
                <span className="font-medium text-white">{formatKr(monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Årlig omsetning</span>
                <span className="font-medium text-white">{formatKr(yearlyRevenue)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Break-even analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-5 mb-6"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">
            Oppsummering og break-even
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Totalt kapitalbehov år 1</span>
              <span className="font-bold text-white">{formatKr(totalYear1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Månedlig resultat (estimat)</span>
              <span className={`font-bold ${monthlyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {monthlyProfit >= 0 ? '+' : ''}{formatKr(monthlyProfit)}/mnd
              </span>
            </div>
            {avgPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-400">Enheter som må selges for break-even</span>
                <span className="font-bold text-amber-400">{breakEvenUnits} stk/mnd</span>
              </div>
            )}
          </div>

          {totalYear1 > 300000 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <p className="text-sm text-amber-400">
                ⚠️ Du trenger minst {formatKr(totalYear1)} i kapital for å dekke år 1.
                Sørg for at finansieringsplanen din dekker dette.
              </p>
            </motion.div>
          )}

          {monthlyProfit < 0 && hasEnteredSales && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <p className="text-sm text-red-400">
                ⚠️ Med dette budsjettet går du {formatKr(Math.abs(monthlyProfit))} i minus per måned.
                Vurder å øke prisen, selge flere enheter, eller kutte kostnader.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={() => navigate('/price-calculation')}
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
