import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { Product, SupplierTier, PurchasedProduct } from '../types'
import { getProductsByIndustry } from '../data'
import { PageTransition, StaggerContainer, StaggerItem, GameButton } from '../components/ui/animations'

const KIDS_PRICE_RATIO = 0.7

const tierLabels: Record<string, { label: string; color: string; dot: string }> = {
  premium: { label: 'Premium', color: 'text-amber-400', dot: 'bg-amber-400' },
  medium: { label: 'Standard', color: 'text-teal-400', dot: 'bg-teal-400' },
  budget: { label: 'Budsjett', color: 'text-slate-400', dot: 'bg-slate-400' },
}

const qualityLabels: Record<string, string> = {
  high: 'Høy',
  medium: 'Middels',
  low: 'Lav',
}

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

interface OrderState {
  women: number
  men: number
  kids: number
}

function ProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderState>({ women: 0, men: 0, kids: 0 })
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const store = useGameStore()
  const { currentMoney, totalCapacity, stockWomen, stockMen, stockKids } = store
  const capacityPerSegment = Math.floor(totalCapacity / 3)

  function getTier(tierKey: string): SupplierTier {
    return product.supplier_tiers[tierKey as keyof typeof product.supplier_tiers]
  }

  function handleOrder() {
    if (!selectedTier) return
    const tier = getTier(selectedTier)
    const totalQty = order.women + order.men + order.kids
    if (totalQty === 0) {
      setMessage({ text: 'Du må bestille minst 1 enhet', type: 'error' })
      return
    }

    if (stockWomen + order.women > capacityPerSegment) {
      setMessage({ text: `Ikke nok lagerplass for Dame! Maks ${capacityPerSegment - stockWomen} til.`, type: 'error' })
      return
    }
    if (stockMen + order.men > capacityPerSegment) {
      setMessage({ text: `Ikke nok lagerplass for Herre! Maks ${capacityPerSegment - stockMen} til.`, type: 'error' })
      return
    }
    if (stockKids + order.kids > capacityPerSegment) {
      setMessage({ text: `Ikke nok lagerplass for Barn! Maks ${capacityPerSegment - stockKids} til.`, type: 'error' })
      return
    }

    const adultCost = tier.cost_per_unit
    const kidsCost = Math.round(tier.cost_per_unit * KIDS_PRICE_RATIO)
    const totalCost = (order.women + order.men) * adultCost + order.kids * kidsCost

    if (totalCost > currentMoney) {
      setMessage({ text: `Ikke nok penger! Trenger ${formatKr(totalCost)}, har ${formatKr(currentMoney)}.`, type: 'error' })
      return
    }

    const qualityNum = tier.quality === 'high' ? 8 : tier.quality === 'medium' ? 5 : 2

    const purchase: PurchasedProduct = {
      productId: product.id,
      productName: product.name,
      tierName: tierLabels[selectedTier].label,
      brandName: tier.brand,
      costPerUnitAdult: adultCost,
      costPerUnitKids: kidsCost,
      typicalRetailPrice: product.typical_retail_price,
      retailPriceAdult: 0,
      retailPriceKids: 0,
      discountPercent: 0,
      stockWomen: order.women,
      stockMen: order.men,
      stockKids: order.kids,
      isPriced: false,
      quality: qualityNum,
      sustainability: tier.sustainability_score,
      leadTimeDays: tier.lead_time_days,
    }

    store.spendMoney(totalCost)
    store.addPurchasedProduct(purchase)
    store.unlockProduct(product.id)

    useGameStore.setState((s) => ({
      stockWomen: s.stockWomen + order.women,
      stockMen: s.stockMen + order.men,
      stockKids: s.stockKids + order.kids,
    }))

    setMessage({ text: `Bestilt ${totalQty} stk for ${formatKr(totalCost)}!`, type: 'success' })
    setOrder({ women: 0, men: 0, kids: 0 })
  }

  const currentTier = selectedTier ? getTier(selectedTier) : null
  const adultCost = currentTier ? currentTier.cost_per_unit : 0
  const kidsCost = currentTier ? Math.round(currentTier.cost_per_unit * KIDS_PRICE_RATIO) : 0
  const totalCost = (order.women + order.men) * adultCost + order.kids * kidsCost

  return (
    <motion.div
      layout
      className="bg-slate-800/80 rounded-2xl border border-slate-700/50 overflow-hidden"
    >
      {/* Product header */}
      <motion.button
        whileHover={{ backgroundColor: 'rgba(30, 41, 59, 1)' }}
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center justify-between transition-colors"
      >
        <div className="text-left">
          <h3 className="text-lg font-bold text-white">{product.name}</h3>
          <div className="text-sm text-slate-400 mt-0.5">
            {product.category} | Typisk pris: {formatKr(product.typical_retail_price)}
          </div>
        </div>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-slate-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 border-t border-slate-700/50"
          >
            {/* Supplier tiers */}
            <div className="mt-4 mb-4">
              <h4 className="text-xs font-semibold text-teal-400 mb-3 uppercase tracking-wide">Velg leverandør</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['premium', 'medium', 'budget'] as const).map((tierKey) => {
                  const tier = getTier(tierKey)
                  const info = tierLabels[tierKey]
                  return (
                    <motion.button
                      key={tierKey}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedTier(tierKey); setMessage(null) }}
                      className={`p-4 rounded-xl border-2 text-left transition-colors ${
                        selectedTier === tierKey
                          ? 'border-teal-400 bg-teal-500/10'
                          : 'border-slate-700 bg-slate-900/40 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${info.dot}`} />
                        <span className={`font-semibold text-sm ${info.color}`}>{info.label}</span>
                      </div>
                      <div className="font-medium text-white text-sm">{tier.brand}</div>
                      <div className="text-xs text-slate-500 mt-2 space-y-0.5">
                        <div>Innkjøp: {formatKr(tier.cost_per_unit)}/stk</div>
                        <div>Kvalitet: {qualityLabels[tier.quality]}</div>
                        <div>Bærekraft: {tier.sustainability_score}/10</div>
                        <div>Levering: {tier.lead_time_days} dager</div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Order form */}
            <AnimatePresence>
              {selectedTier && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30"
                >
                  <h4 className="text-xs font-semibold text-teal-400 mb-3 uppercase tracking-wide">Bestill antall</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      { key: 'women' as const, label: 'Dame', cost: adultCost },
                      { key: 'men' as const, label: 'Herre', cost: adultCost },
                      { key: 'kids' as const, label: 'Barn', cost: kidsCost },
                    ].map(({ key, label, cost }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          {label} ({formatKr(cost)}/stk)
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={order[key] || ''}
                          onChange={(e) => {
                            setOrder((o) => ({ ...o, [key]: Math.max(0, parseInt(e.target.value) || 0) }))
                            setMessage(null)
                          }}
                          placeholder="0"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Cost summary */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-400">
                      Totalt: {order.women + order.men + order.kids} stk
                    </span>
                    <span className="font-bold text-white">{formatKr(totalCost)}</span>
                  </div>

                  <AnimatePresence>
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className={`text-sm p-3 rounded-lg mb-3 ${
                          message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <GameButton
                    onClick={handleOrder}
                    pulse
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all"
                  >
                    Bestill
                  </GameButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function GrunnspillProductPicker() {
  const navigate = useNavigate()
  const store = useGameStore()
  const { selectedIndustry } = store

  const products = useMemo(
    () => getProductsByIndustry(selectedIndustry),
    [selectedIndustry]
  )

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  function toggleProduct(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 3) {
        next.add(id)
      }
      return next
    })
  }

  function handleStart() {
    if (selectedIds.size === 0) return

    const purchased: PurchasedProduct[] = []

    for (const id of selectedIds) {
      const product = products.find((p) => p.id === id)
      if (!product) continue

      const tier = product.supplier_tiers.medium
      const costPerUnit = tier.cost_per_unit
      const costPerUnitKids = Math.round(costPerUnit * KIDS_PRICE_RATIO)
      const retailPriceAdult = product.typical_retail_price
      const retailPriceKids = Math.round(retailPriceAdult * KIDS_PRICE_RATIO)
      const qualityNum = tier.quality === 'high' ? 8 : tier.quality === 'medium' ? 5 : 2

      const p: PurchasedProduct = {
        productId: product.id,
        productName: product.name,
        tierName: 'Standard',
        brandName: tier.brand,
        costPerUnitAdult: costPerUnit,
        costPerUnitKids,
        typicalRetailPrice: product.typical_retail_price,
        retailPriceAdult,
        retailPriceKids,
        discountPercent: 0,
        stockWomen: 50,
        stockMen: 50,
        stockKids: 50,
        isPriced: true,
        quality: qualityNum,
        sustainability: tier.sustainability_score,
        leadTimeDays: tier.lead_time_days,
      }

      purchased.push(p)
      store.addPurchasedProduct(p)
      store.unlockProduct(product.id)

      store.addProductPricing({
        productId: product.id,
        productName: product.name,
        targetGroup: 'Voksen',
        price: retailPriceAdult,
        estimatedSales: 0,
        revenue: 0,
        cost: costPerUnit,
        profit: retailPriceAdult - costPerUnit,
      })
      store.addProductPricing({
        productId: product.id,
        productName: product.name,
        targetGroup: 'Barn',
        price: retailPriceKids,
        estimatedSales: 0,
        revenue: 0,
        cost: costPerUnitKids,
        profit: retailPriceKids - costPerUnitKids,
      })
    }

    useGameStore.setState((s) => ({
      stockWomen: s.stockWomen + purchased.length * 50,
      stockMen: s.stockMen + purchased.length * 50,
      stockKids: s.stockKids + purchased.length * 50,
    }))

    store.applyGrunnspillDefaults(selectedIndustry, purchased)
    navigate('/city')
  }

  const canStart = selectedIds.size >= 1

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Velg produkter</h1>
          <p className="text-slate-400">Velg 1–3 produkter du vil selge ({selectedIds.size}/3 valgt)</p>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {products.map((product) => {
            const isSelected = selectedIds.has(product.id)
            const tier = product.supplier_tiers.medium
            return (
              <StaggerItem key={product.id}>
                <motion.button
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleProduct(product.id)}
                  className={`relative w-full p-5 rounded-2xl text-left transition-colors border-2 ${
                    isSelected
                      ? 'border-teal-400 bg-slate-800 shadow-lg shadow-teal-500/10'
                      : selectedIds.size >= 3
                        ? 'border-slate-700/50 bg-slate-800/40 opacity-50 cursor-not-allowed'
                        : 'border-slate-700/50 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                  disabled={!isSelected && selectedIds.size >= 3}
                >
                  <div className="font-bold text-lg text-white mb-1">{product.name}</div>
                  <div className="text-sm text-teal-400 font-medium mb-2">{product.category}</div>
                  <div className="text-xs text-slate-400 space-y-0.5">
                    <div>Utsalgspris: {formatKr(product.typical_retail_price)}</div>
                    <div>Innkjøp: {formatKr(tier.cost_per_unit)}/stk</div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="absolute top-3 right-3 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

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
            onClick={handleStart}
            disabled={!canStart}
            pulse={canStart}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              canStart
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {canStart ? 'Start spillet →' : 'Velg minst 1 produkt'}
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}

function AdvancedProductCatalog() {
  const navigate = useNavigate()
  const { selectedIndustry, currentMoney, purchasedProducts, stockWomen, stockMen, stockKids, totalCapacity } =
    useGameStore()

  const filteredProducts = useMemo(
    () => getProductsByIndustry(selectedIndustry),
    [selectedIndustry]
  )

  const canProceed = purchasedProducts.length >= 1
  const capacityPerSegment = Math.floor(totalCapacity / 3)

  function handleNext() {
    if (!canProceed) return
    navigate('/price-calculation')
  }

  function handleBack() {
    navigate('/location')
  }

  return (
    <PageTransition>
      <div className="py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Produktkatalog</h1>
          <p className="text-slate-400">Bestill produkter fra leverandører</p>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="bg-slate-800/80 rounded-2xl p-4 mb-6 flex flex-wrap gap-6 text-sm border border-slate-700/50"
        >
          <div>
            <span className="text-slate-500">Tilgjengelig: </span>
            <span className="font-bold text-teal-400">{formatKr(currentMoney)}</span>
          </div>
          <div>
            <span className="text-slate-500">Bestilt: </span>
            <span className="font-bold text-white">{purchasedProducts.length} produkt(er)</span>
          </div>
          <div>
            <span className="text-slate-500">Lager: </span>
            <span className="font-bold text-white">
              D:{stockWomen}/{capacityPerSegment} | H:{stockMen}/{capacityPerSegment} | B:{stockKids}/{capacityPerSegment}
            </span>
          </div>
        </motion.div>

        {/* Capacity bars */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Dame', current: stockWomen, color: 'bg-pink-500' },
            { label: 'Herre', current: stockMen, color: 'bg-blue-500' },
            { label: 'Barn', current: stockKids, color: 'bg-amber-500' },
          ].map(({ label, current, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30"
            >
              <div className="text-xs text-slate-400 mb-1">{label}</div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className={`${color} rounded-full h-2`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (current / Math.max(1, capacityPerSegment)) * 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.4 }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{current} / {capacityPerSegment}</div>
            </motion.div>
          ))}
        </div>

        {/* Products */}
        <StaggerContainer className="space-y-3 mb-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Ingen produkter funnet for denne bransjen. Gå tilbake og velg en annen bransje.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))
          )}
        </StaggerContainer>

        {/* Ordered products summary */}
        <AnimatePresence>
          {purchasedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-slate-800/80 rounded-2xl p-5 mb-6 border border-slate-700/50"
            >
              <h3 className="font-bold text-white mb-3">Dine bestillinger</h3>
              <div className="space-y-2">
                {purchasedProducts.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex justify-between items-center py-2 border-b border-slate-700/30 last:border-0"
                  >
                    <div>
                      <span className="font-medium text-white">{p.productName}</span>
                      <span className="text-sm text-slate-500 ml-2">({p.tierName} - {p.brandName})</span>
                    </div>
                    <div className="text-sm text-slate-400">
                      D:{p.stockWomen} H:{p.stockMen} B:{p.stockKids}
                    </div>
                  </motion.div>
                ))}
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
            onClick={handleBack}
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
            {canProceed ? 'Neste →' : 'Bestill minst 1 produkt'}
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default function ProductCatalogScreen() {
  const gamePreset = useGameStore((s) => s.gamePreset)
  if (gamePreset === 'grunnspill') return <GrunnspillProductPicker />
  return <AdvancedProductCatalog />
}
