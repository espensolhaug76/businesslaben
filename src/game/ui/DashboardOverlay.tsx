import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_CATALOG, catalogToProduct } from '../data/industries'
import type { Product, DistributionChannel } from '../types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

type Tab = 'oversikt' | 'produkter' | 'priser' | 'distribusjon' | 'markedsforing' | 'rapporter'

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'oversikt',      label: 'Oversikt',       emoji: '📊' },
  { id: 'produkter',     label: 'Produkter',       emoji: '📦' },
  { id: 'priser',        label: 'Priser',          emoji: '💰' },
  { id: 'distribusjon',  label: 'Distribusjon',    emoji: '🚚' },
  { id: 'markedsforing', label: 'Markedsføring',   emoji: '📢' },
  { id: 'rapporter',     label: 'Rapporter',       emoji: '📋' },
]

interface DashboardOverlayProps {
  open: boolean
  onClose: () => void
}

export default function DashboardOverlay({ open, onClose }: DashboardOverlayProps) {
  const [activeTab, setActiveTab] = useState<Tab>('oversikt')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 180,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
            pointerEvents: open ? 'auto' : 'none',
          }}
          onPointerDown={e => { e.stopPropagation(); if (e.target === e.currentTarget) onClose() }}
          onPointerUp={e => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24 }}
            style={{
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2rem', width: '100%', maxWidth: 960,
              maxHeight: 'calc(100vh - 3rem)',
              display: 'flex', flexDirection: 'column',
              color: '#f1f5f9', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem 2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>💻 Bedriftsdashboard</h2>
                <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>All bedriftsstyring på ett sted</p>
              </div>
              <button onClick={onClose} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99, width: 36, height: 36, color: '#94a3b8',
                cursor: 'pointer', fontSize: 18, fontFamily: 'inherit',
              }}>✕</button>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: '0.5rem', padding: '1rem 2rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto',
            }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  background: activeTab === t.id ? 'rgba(0,212,170,0.12)' : 'transparent',
                  border: `1px solid ${activeTab === t.id ? '#00d4aa' : 'transparent'}`,
                  borderBottom: 'none', borderRadius: '8px 8px 0 0',
                  padding: '0.6rem 1.2rem',
                  color: activeTab === t.id ? '#00d4aa' : '#64748b',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s',
                }}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem 2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {activeTab === 'oversikt'      && <OversiktTab />}
                  {activeTab === 'produkter'     && <ProdukterTab />}
                  {activeTab === 'priser'        && <PriserTab />}
                  {activeTab === 'distribusjon'  && <DistribusjonTab />}
                  {activeTab === 'markedsforing' && <MarkedsforingTab />}
                  {activeTab === 'rapporter'     && <RapporterTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Oversikt ──────────────────────────────────────────────────────────────────

function OversiktTab() {
  const { state } = useGame()
  const { money, reputation, currentMonth, monthlyResults, locationZone, monthlyRent } = state
  const totalRev    = monthlyResults.reduce((s, r) => s + r.revenue, 0)
  const totalProfit = monthlyResults.reduce((s, r) => s + r.profit, 0)
  const maxRev      = Math.max(...monthlyResults.map(r => r.revenue), 1)

  const zoneLabel = locationZone === 'gagata' ? 'Gågata' : locationZone === 'hovedgata' ? 'Hovedgata' : locationZone === 'utkant' ? 'Utkanten' : '—'

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Kontanter"       value={formatKr(money)}    color="#22c55e" icon="💰" />
        <KpiCard label="Rykte"           value={`${reputation}/100`} color={reputation >= 60 ? '#22c55e' : '#facc15'} icon="⭐" />
        <KpiCard label="Måned"           value={MONTH_NAMES[(currentMonth - 1) % 12]} color="#38bdf8" icon="📅" />
        <KpiCard label="Total omsetning" value={formatKr(totalRev)}  color="#a855f7" icon="📈" />
      </div>

      {locationZone && (
        <div style={{
          background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.2)',
          borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem',
          display: 'flex', gap: '1rem', alignItems: 'center',
        }}>
          <span style={{ fontSize: 32 }}>🏪</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{state.companyName}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              {zoneLabel} · {formatKr(monthlyRent)}/mnd
            </div>
          </div>
        </div>
      )}

      {monthlyResults.length > 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: '1rem', letterSpacing: '0.08em' }}>MÅNEDLIG OMSETNING</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 100 }}>
            {monthlyResults.map((r, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  height: Math.max(4, Math.round((r.revenue / maxRev) * 90)),
                  background: r.profit >= 0 ? 'rgba(0,212,170,0.5)' : 'rgba(239,68,68,0.5)',
                  transition: 'height 0.4s',
                }} />
                <span style={{ fontSize: 9, color: '#475569' }}>{MONTH_NAMES[r.month - 1]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: 14 }}>
            <span style={{ color: '#64748b' }}>Total nettoresultat:</span>
            <span style={{ fontWeight: 800, color: totalProfit >= 0 ? '#22c55e' : '#ef4444' }}>
              {totalProfit >= 0 ? '+' : ''}{formatKr(totalProfit)}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>
          <div style={{ fontSize: 48, marginBottom: '1rem' }}>🚀</div>
          <p style={{ fontSize: 16 }}>Ingen resultater ennå. Fullfør 4P-oppsettet og simuler din første måned!</p>
        </div>
      )}
    </div>
  )
}

// ── Produkter ─────────────────────────────────────────────────────────────────

function ProdukterTab() {
  const { state, dispatch } = useGame()
  const catalog = INDUSTRY_CATALOG[state.industry] ?? []
  const [orderedProducts, setOrderedProducts] = useState<Product[]>(
    () => state.products.map(p => ({ ...p }))
  )

  function toggleProduct(id: string, tier: Product['tier']) {
    const productId = `${id}_${tier}`
    const exists = orderedProducts.find(p => p.id === productId)
    if (exists) {
      setOrderedProducts(prev => prev.filter(p => p.id !== productId))
    } else {
      const item = catalog.find(c => c.id === id)
      if (item) {
        setOrderedProducts(prev => [...prev, catalogToProduct(item, tier)])
      }
    }
  }

  function setStock(productId: string, stock: number) {
    setOrderedProducts(prev => prev.map(p => p.id === productId ? { ...p, stock } : p))
  }

  function save() {
    dispatch({ type: 'SET_PRODUCTS', products: orderedProducts })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Produktkatalog — {state.industry}</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Velg produkter og tier. Sett lagerantall.</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {catalog.map(item => {
          const tiers = ['premium', 'standard', 'budget'] as const
          return (
            <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</span>
                <span style={{ fontSize: 11, color: '#475569', marginLeft: 'auto' }}>Maks etterspørsel: {item.maxDemandPerMonth} stk/mnd</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
                {tiers.map(tier => {
                  const productId = `${item.id}_${tier}`
                  const ordered = orderedProducts.find(p => p.id === productId)
                  const t = item.tiers[tier]
                  const tierColor = tier === 'premium' ? '#ffd700' : tier === 'standard' ? '#00d4aa' : '#94a3b8'
                  return (
                    <div key={tier} style={{
                      background: ordered ? `${tierColor}12` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${ordered ? tierColor + '55' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer',
                    }} onClick={() => toggleProduct(item.id, tier)}>
                      <div style={{ fontSize: 11, color: tierColor, fontWeight: 700, marginBottom: 4 }}>
                        {tier === 'premium' ? '⭐ Premium' : tier === 'standard' ? '◆ Standard' : '◇ Budget'}
                      </div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>Innkjøp: {formatKr(t.costPrice)}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>Anbefalt: {formatKr(t.recommendedPrice)}</div>
                      {ordered && (
                        <div style={{ marginTop: '0.5rem' }} onClick={e => e.stopPropagation()}>
                          <input
                            type="number" min={0} max={500} value={ordered.stock}
                            onChange={e => setStock(productId, parseInt(e.target.value) || 0)}
                            placeholder="Antall"
                            style={{
                              width: '100%', background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                              padding: '4px 8px', color: '#f1f5f9', fontSize: 12, fontFamily: 'inherit',
                            }}
                          />
                          <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>
                            Kostnad: {formatKr(ordered.stock * t.costPrice)}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Priser ────────────────────────────────────────────────────────────────────

function PriserTab() {
  const { state, dispatch } = useGame()
  const [products, setProducts] = useState<Product[]>(() => state.products.map(p => ({ ...p })))

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>Ingen produkter bestilt. Gå til Produkter-fanen.</div>
  }

  function setPrice(id: string, price: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, retailPrice: price } : p))
  }

  function save() {
    dispatch({ type: 'SET_PRODUCTS', products })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Prissetting</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Sett salgspris per produkt</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre priser ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => {
          const mg = p.retailPrice > 0 ? Math.round(((p.retailPrice - p.costPrice) / p.retailPrice) * 100) : 0
          const mgColor = mg >= 50 ? '#22c55e' : mg >= 20 ? '#facc15' : '#ef4444'
          return (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Innkjøp: {formatKr(p.costPrice)} · Anbefalt: {formatKr(p.recommendedPrice)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: 20, color: '#38bdf8' }}>{formatKr(p.retailPrice)}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: mgColor }}>Margin: {mg}%</div>
                </div>
              </div>
              <input type="range"
                min={Math.round(p.costPrice * 0.8)}
                max={Math.round(p.recommendedPrice * 3)}
                value={p.retailPrice}
                onChange={e => setPrice(p.id, parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#00d4aa' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginTop: 4 }}>
                <span>{formatKr(Math.round(p.costPrice * 0.8))} (under innkjøp)</span>
                <button onClick={() => setPrice(p.id, p.recommendedPrice)} style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 6, padding: '2px 8px', color: '#00d4aa', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Anbefalt pris
                </button>
                <span>{formatKr(Math.round(p.recommendedPrice * 3))}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Distribusjon ──────────────────────────────────────────────────────────────

const CHANNEL_INFO: Record<DistributionChannel, { label: string; emoji: string; cost: number; desc: string; requiresLevel?: number }> = {
  physicalStore:  { label: 'Fysisk butikk',    emoji: '🏪', cost: 0,     desc: 'Din faste butikk. Alltid aktiv.' },
  webShop:        { label: 'Nettbutikk',        emoji: '🌐', cost: 2500,  desc: '×1.5 rekkevidde. Krever Nivå 7.', requiresLevel: 7 },
  instagramShop:  { label: 'Instagram Shop',    emoji: '📸', cost: 1200,  desc: '×1.3 rekkevidde. 12% gebyr.' },
  delivery:       { label: 'Hjemlevering',      emoji: '🚚', cost: 800,   desc: '×1.4 rekkevidde. 30% gebyr. Kun kafé.' },
  wholesale:      { label: 'Engros / B2B',      emoji: '📦', cost: 500,   desc: '×1.6 rekkevidde. 40% lavere margin. Krever Nivå 9.', requiresLevel: 9 },
}

function DistribusjonTab() {
  const { state, dispatch } = useGame()
  const [channels, setChannels] = useState<DistributionChannel[]>(state.channels)

  function toggle(ch: DistributionChannel) {
    if (ch === 'physicalStore') return  // always on
    setChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch])
  }

  function save() {
    dispatch({ type: 'SET_CHANNELS', channels })
  }

  const monthlyCost = channels.reduce((s, ch) => s + (CHANNEL_INFO[ch]?.cost ?? 0), 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Distribusjonskanaler</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Velg hvordan du selger til kundene</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        {(Object.entries(CHANNEL_INFO) as [DistributionChannel, typeof CHANNEL_INFO[DistributionChannel]][]).map(([ch, info]) => {
          const active = channels.includes(ch)
          const locked = info.requiresLevel ? state.level < info.requiresLevel : false
          return (
            <div key={ch}
              onClick={() => !locked && toggle(ch)}
              style={{
                background: active ? 'rgba(0,212,170,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? '#00d4aa55' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '1rem', padding: '1rem',
                cursor: ch === 'physicalStore' ? 'default' : locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.45 : 1,
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
              <span style={{ fontSize: 28 }}>{info.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{info.label}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{info.desc}</div>
                {locked && <div style={{ fontSize: 11, color: '#f97316', marginTop: 2 }}>🔒 Krever Nivå {info.requiresLevel}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: info.cost === 0 ? '#22c55e' : '#f97316' }}>
                  {info.cost === 0 ? 'Gratis' : `${formatKr(info.cost)}/mnd`}
                </div>
                {active && <div style={{ fontSize: 11, color: '#00d4aa', marginTop: 2 }}>✓ Aktiv</div>}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#64748b' }}>Total kanalkostand:</span>
        <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(monthlyCost)}/mnd</span>
      </div>
    </div>
  )
}

// ── Markedsføring ─────────────────────────────────────────────────────────────

type BudgetKey = keyof GameState['marketingBudget']
type GameState = ReturnType<typeof useGame>['state']

const MARKETING_CHANNELS: { key: BudgetKey; label: string; emoji: string }[] = [
  { key: 'socialMedia', label: 'Sosiale medier', emoji: '📱' },
  { key: 'google',      label: 'Google',         emoji: '🔍' },
  { key: 'influencer',  label: 'Influencer',      emoji: '⭐' },
  { key: 'print',       label: 'Trykt reklame',   emoji: '📰' },
  { key: 'tv',          label: 'TV / Radio',      emoji: '📺' },
]

function MarkedsforingTab() {
  const { state, dispatch } = useGame()
  const [budget, setBudget] = useState({ ...state.marketingBudget })
  const [appeal, setAppeal] = useState(state.appealType)

  const total = Object.values(budget).reduce((s, v) => s + v, 0)

  function save() {
    dispatch({ type: 'SET_MARKETING', budget })
    if (appeal) dispatch({ type: 'SET_APPEAL', appealType: appeal })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Markedsføring</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Fordel markedsbudsjett og velg appellform</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {MARKETING_CHANNELS.map(ch => (
          <div key={ch.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: 14 }}>{ch.emoji} {ch.label}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#38bdf8' }}>{formatKr(budget[ch.key])}</span>
            </div>
            <input type="range" min={0} max={50000} step={500} value={budget[ch.key]}
              onChange={e => setBudget(prev => ({ ...prev, [ch.key]: parseInt(e.target.value) }))}
              style={{ width: '100%', accentColor: '#00d4aa' }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '0.5rem 1.25rem', fontSize: 15 }}>
          Total: <strong style={{ color: '#00d4aa' }}>{formatKr(total)}</strong>/mnd
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.75rem' }}>Appellform</h4>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[
            { id: 'rational', label: '📊 Rasjonell', desc: 'Pris, fakta, verdi' },
            { id: 'emotional', label: '💖 Emosjonell', desc: 'Følelser, livsstil' },
            { id: 'combined', label: '⚖️ Kombinasjon', desc: 'Best av begge' },
          ].map(a => (
            <button key={a.id} onClick={() => setAppeal(a.id as typeof appeal)}
              style={{
                flex: 1, background: appeal === a.id ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${appeal === a.id ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer',
                fontFamily: 'inherit', color: '#f1f5f9', textAlign: 'center',
              }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{a.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Rapporter ─────────────────────────────────────────────────────────────────

function RapporterTab() {
  const { state } = useGame()
  const results = [...state.monthlyResults].reverse()

  if (results.length === 0) {
    return <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>Ingen resultater ennå.</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {results.map((r, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1rem', padding: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{MONTH_NAMES[r.month - 1]}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Inntekt: {formatKr(r.revenue)} · Kost: {formatKr(r.costs)} · Solgt: {r.unitsSold} stk
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: r.profit >= 0 ? '#22c55e' : '#ef4444' }}>
              {r.profit >= 0 ? '+' : ''}{formatKr(r.profit)}
            </div>
            <div style={{ fontSize: 11, color: '#64748b' }}>+{r.xpEarned} XP</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{
      background: `${color}0d`, border: `1px solid ${color}33`,
      borderRadius: '1rem', padding: '1rem',
    }}>
      <div style={{ fontSize: 20, marginBottom: '0.3rem' }}>{icon}</div>
      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}
