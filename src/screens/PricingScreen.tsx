import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PageTransition, StaggerContainer, StaggerItem, GameButton } from '../components/ui/animations'

const KIDS_PRICE_RATIO = 0.7

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

function getMarginColor(marginPercent: number): string {
  if (marginPercent >= 50) return 'text-emerald-400'
  if (marginPercent >= 30) return 'text-amber-400'
  if (marginPercent >= 0) return 'text-orange-400'
  return 'text-red-400'
}

function getMarginLabel(marginPercent: number): string {
  if (marginPercent >= 50) return 'Utmerket margin'
  if (marginPercent >= 30) return 'God margin'
  if (marginPercent >= 0) return 'Lav margin'
  return 'Tap - selger med tap!'
}

function getMarginBg(marginPercent: number): string {
  if (marginPercent >= 50) return 'bg-emerald-500/10 border-emerald-500/30'
  if (marginPercent >= 30) return 'bg-amber-500/10 border-amber-500/30'
  if (marginPercent >= 0) return 'bg-orange-500/10 border-orange-500/30'
  return 'bg-red-500/10 border-red-500/30'
}

export default function PricingScreen() {
  const navigate = useNavigate()
  const { purchasedProducts } = useGameStore()

  const allPriced = purchasedProducts.length > 0 && purchasedProducts.every((p) => p.retailPriceAdult > 0)

  const margins = purchasedProducts
    .filter((p) => p.retailPriceAdult > 0)
    .map((p) => ((p.retailPriceAdult - p.costPerUnitAdult) / p.retailPriceAdult) * 100)
  const avgMargin = margins.length > 0 ? margins.reduce((a, b) => a + b, 0) / margins.length : 0

  function handlePriceChange(index: number, value: string) {
    const price = Math.max(0, parseInt(value) || 0)
    const kidsPrice = Math.round(price * KIDS_PRICE_RATIO)

    useGameStore.setState((s) => ({
      purchasedProducts: s.purchasedProducts.map((p, i) =>
        i === index
          ? { ...p, retailPriceAdult: price, retailPriceKids: kidsPrice, isPriced: price > 0 }
          : p
      ),
    }))
  }

  function handleDiscountChange(index: number, value: string) {
    const discount = Math.max(0, Math.min(100, parseInt(value) || 0))

    useGameStore.setState((s) => ({
      purchasedProducts: s.purchasedProducts.map((p, i) =>
        i === index ? { ...p, discountPercent: discount } : p
      ),
    }))
  }

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Prissetting</h1>
        <p className="text-sm text-slate-400 mb-6">Sett utsalgspriser for produktene dine</p>
      </motion.div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-6 text-sm text-teal-300"
      >
        <strong>Tips:</strong> Dekningsbidrag = Utsalgspris - Innkjøpspris. En god margin ligger vanligvis mellom 30-60%.
        Barnepris settes automatisk til 70% av voksenprisen.
      </motion.div>

      {/* Product pricing cards */}
      <StaggerContainer className="space-y-4 mb-6">
        {purchasedProducts.map((product, idx) => {
          const marginKr = product.retailPriceAdult - product.costPerUnitAdult
          const marginPercent =
            product.retailPriceAdult > 0
              ? ((product.retailPriceAdult - product.costPerUnitAdult) / product.retailPriceAdult) * 100
              : 0
          const totalQty = product.stockWomen + product.stockMen + product.stockKids
          const effectivePrice = product.discountPercent > 0
            ? Math.round(product.retailPriceAdult * (1 - product.discountPercent / 100))
            : product.retailPriceAdult

          return (
            <StaggerItem key={idx}>
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Product info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{product.productName}</h3>
                    <div className="text-sm text-slate-500 mt-1">
                      {product.tierName} ({product.brandName}) | {totalQty} stk på lager
                    </div>
                    <div className="text-sm text-slate-400 mt-2 space-y-0.5">
                      <div>Innkjøpspris voksen: <span className="text-white">{formatKr(product.costPerUnitAdult)}</span></div>
                      <div>Innkjøpspris barn: <span className="text-white">{formatKr(product.costPerUnitKids)}</span></div>
                      <div className="text-slate-500">Typisk utsalgspris: {formatKr(product.typicalRetailPrice)}</div>
                    </div>
                  </div>

                  {/* Price inputs */}
                  <div className="sm:w-72 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Voksenpris (kr)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={product.retailPriceAdult || ''}
                        onChange={(e) => handlePriceChange(idx, e.target.value)}
                        placeholder="Sett pris..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                      <div className="text-xs text-slate-500 mt-1">
                        Barnepris: {product.retailPriceKids > 0 ? formatKr(product.retailPriceKids) : '(settes automatisk)'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Kampanjerabatt (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={product.discountPercent || ''}
                        onChange={(e) => handleDiscountChange(idx, e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                      {product.discountPercent > 0 && (
                        <div className="text-xs text-amber-400 mt-1">
                          Effektiv pris: {formatKr(effectivePrice)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Margin display */}
                <AnimatePresence>
                  {product.retailPriceAdult > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 p-3 rounded-lg border ${getMarginBg(marginPercent)} flex items-center justify-between`}
                    >
                      <div className={`text-sm font-medium ${getMarginColor(marginPercent)}`}>
                        {getMarginLabel(marginPercent)}
                      </div>
                      <div className={`text-sm ${getMarginColor(marginPercent)}`}>
                        Dekningsbidrag: {formatKr(marginKr)}/stk ({marginPercent.toFixed(0)}%)
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {/* Average margin summary */}
      <AnimatePresence>
        {margins.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-5 mb-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Gjennomsnittlig margin</span>
              <span className={`font-bold text-xl ${getMarginColor(avgMargin)}`}>
                {avgMargin.toFixed(1)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between"
      >
        <GameButton
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
        >
          Tilbake til dashboard
        </GameButton>
        {!allPriced && (
          <div className="text-sm text-amber-400 self-center">
            Sett pris på alle produkter for å fortsette
          </div>
        )}
      </motion.div>
    </PageTransition>
  )
}
