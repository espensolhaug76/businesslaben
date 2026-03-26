import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_CATALOG, catalogToProduct } from '../data/industries'
import type { Product, DistributionChannel } from '../types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

type Tab = 'oversikt' | 'produkter' | 'priser' | 'distribusjon' | 'markedsforing' | 'personale' | 'rapporter'

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'oversikt',      label: 'Oversikt',       emoji: '📊' },
  { id: 'produkter',     label: 'Produkter',       emoji: '📦' },
  { id: 'priser',        label: 'Priser',          emoji: '💰' },
  { id: 'distribusjon',  label: 'Distribusjon',    emoji: '🚚' },
  { id: 'markedsforing', label: 'Markedsføring',   emoji: '📢' },
  { id: 'personale',     label: 'Personale',       emoji: '👥' },
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
                  {activeTab === 'personale'     && <PersonaleTab />}
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

  // Per-item local state: selected tier + quantity
  const [selections, setSelections] = useState<Record<string, { tier: Product['tier']; qty: number }>>({})

  function setTier(id: string, tier: Product['tier']) {
    setSelections(prev => ({ ...prev, [id]: { tier, qty: prev[id]?.qty ?? 10 } }))
  }

  function setQty(id: string, qty: number) {
    setSelections(prev => ({ ...prev, [id]: { ...prev[id]!, qty } }))
  }

  function order(id: string) {
    const sel = selections[id]
    if (!sel || sel.qty <= 0) return
    const item = catalog.find(c => c.id === id)
    if (!item) return
    const product = catalogToProduct(item, sel.tier)
    dispatch({ type: 'ORDER_PRODUCT', product, quantity: sel.qty })
  }

  const TIER_COLORS: Record<Product['tier'], string> = {
    premium: '#ffd700',
    standard: '#00d4aa',
    budget: '#94a3b8',
  }
  const TIER_LABELS: Record<Product['tier'], string> = {
    premium: '⭐ Premium',
    standard: '◆ Standard',
    budget: '◇ Budget',
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Varelager</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
          Velg kvalitetstier og antall → klikk Bestill. Pengene trekkes med en gang.
        </p>
      </div>

      {/* Current stock summary */}
      {state.products.length > 0 && (
        <div style={{
          background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.2)',
          borderRadius: '1rem', padding: '0.75rem 1rem', marginBottom: '1.25rem',
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          {state.products.map(p => (
            <div key={p.id} style={{ fontSize: 12, color: '#94a3b8' }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>{' '}
              <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{p.name}</span>{' '}
              <span style={{ color: '#00d4aa' }}>{p.stock} stk</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {catalog.map(item => {
          const sel = selections[item.id]
          const activeTier = sel?.tier
          const qty = sel?.qty ?? 10
          const t = activeTier ? item.tiers[activeTier] : null
          const totalCost = t ? t.costPrice * qty : 0
          const canAfford = totalCost <= state.money
          const existingStock = state.products.find(p => p.id === `${item.id}_${activeTier}`)?.stock ?? 0

          return (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem', padding: '1rem',
            }}>
              {/* Item header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#475569' }}>Maks etterspørsel: {item.maxDemandPerMonth} stk/mnd</div>
                </div>
              </div>

              {/* Tier selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {(['premium', 'standard', 'budget'] as const).map(tier => {
                  const tc = TIER_COLORS[tier]
                  const active = activeTier === tier
                  return (
                    <button key={tier} onClick={() => setTier(item.id, tier)} style={{
                      background: active ? `${tc}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${active ? tc + '88' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '0.6rem', padding: '0.6rem 0.5rem',
                      cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9', textAlign: 'left',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: tc, marginBottom: 2 }}>{TIER_LABELS[tier]}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>Innkjøp: {formatKr(item.tiers[tier].costPrice)}</div>
                      <div style={{ fontSize: 11, color: '#475569' }}>Anbefalt: {formatKr(item.tiers[tier].recommendedPrice)}</div>
                    </button>
                  )
                })}
              </div>

              {/* Order row — only when tier is selected */}
              {activeTier && t && (
                <div style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'center',
                  background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Antall å bestille</div>
                    <input
                      type="number" min={1} max={500} value={qty}
                      onChange={e => setQty(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                        padding: '6px 10px', color: '#f1f5f9', fontSize: 14, fontFamily: 'inherit',
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center', minWidth: 80 }}>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>Totalkostnad</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: canAfford ? '#22c55e' : '#ef4444' }}>
                      {formatKr(totalCost)}
                    </div>
                    {existingStock > 0 && (
                      <div style={{ fontSize: 10, color: '#00d4aa' }}>Har: {existingStock} stk</div>
                    )}
                  </div>
                  <button
                    onClick={() => order(item.id)}
                    disabled={!canAfford || qty <= 0}
                    style={{
                      background: canAfford
                        ? 'linear-gradient(135deg,#00d4aa,#0d9488)'
                        : 'rgba(255,255,255,0.08)',
                      border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem',
                      color: canAfford ? '#fff' : '#475569',
                      fontWeight: 700, fontSize: 14, cursor: canAfford ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit', whiteSpace: 'nowrap',
                    }}
                  >
                    {canAfford ? '📦 Bestill' : '💸 Ikke råd'}
                  </button>
                </div>
              )}
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

// ── Personale ─────────────────────────────────────────────────────────────────

type EmployeeRole = 'selger' | 'markedsforer' | 'okonom'
type EmployeeLevel = 'junior' | 'senior' | 'ekspert'

const ROLE_INFO: Record<EmployeeRole, { label: string; emoji: string; desc: string }> = {
  selger:       { label: 'Selger',       emoji: '🛍️', desc: '+10% salgsvolum per ansatt' },
  markedsforer: { label: 'Markedsfører', emoji: '📢', desc: '+8% markedseffekt per ansatt' },
  okonom:       { label: 'Økonom',       emoji: '📊', desc: '-5% kostnader per ansatt' },
}
const LEVEL_INFO: Record<EmployeeLevel, { label: string; salary: number }> = {
  junior:  { label: 'Junior',  salary: 15_000 },
  senior:  { label: 'Senior',  salary: 25_000 },
  ekspert: { label: 'Ekspert', salary: 40_000 },
}

function PersonaleTab() {
  const { state, dispatch } = useGame()
  const [role, setRole] = useState<EmployeeRole>('selger')
  const [level, setLevel] = useState<EmployeeLevel>('junior')

  const salary = LEVEL_INFO[level].salary
  const canAfford = state.money >= salary

  function hire() {
    if (!canAfford) return
    dispatch({
      type: 'HIRE_EMPLOYEE',
      employee: {
        id: `emp_${Date.now()}`,
        role,
        level,
        monthlySalary: salary,
      },
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Personale</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
          Ansett og si opp ansatte. Lønn trekkes månedlig automatisk.
        </p>
      </div>

      {/* Current employees */}
      {state.employees.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {state.employees.map(e => {
            const ri = ROLE_INFO[e.role as EmployeeRole]
            const li = LEVEL_INFO[e.level as EmployeeLevel]
            return (
              <div key={e.id} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem', padding: '0.9rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ fontSize: 28 }}>{ri?.emoji ?? '👤'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {li?.label ?? e.level} {ri?.label ?? e.role}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    {ri?.desc ?? ''} · {formatKr(e.monthlySalary)}/mnd
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: 'FIRE_EMPLOYEE', id: e.id })}
                  style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 8, padding: '0.4rem 0.9rem',
                    color: '#ef4444', fontWeight: 700, fontSize: 13,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Si opp
                </button>
              </div>
            )
          })}
          <div style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem',
            padding: '0.6rem 1rem', fontSize: 14,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ color: '#64748b' }}>Total lønn per måned:</span>
            <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(state.monthlyPayroll)}</span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#475569', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>👥</div>
          <p style={{ fontSize: 14 }}>Ingen ansatte ennå.</p>
        </div>
      )}

      {/* Hire form */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1rem', padding: '1.25rem',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: '1rem' }}>Ansett ny medarbeider</div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.4rem' }}>Stilling</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(Object.keys(ROLE_INFO) as EmployeeRole[]).map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, background: role === r ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${role === r ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '0.6rem', padding: '0.6rem 0.4rem',
                cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9',
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{ROLE_INFO[r].emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{ROLE_INFO[r].label}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>{ROLE_INFO[role].desc}</div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.4rem' }}>Nivå</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(Object.keys(LEVEL_INFO) as EmployeeLevel[]).map(lv => (
              <button key={lv} onClick={() => setLevel(lv)} style={{
                flex: 1, background: level === lv ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${level === lv ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '0.6rem', padding: '0.6rem',
                cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{LEVEL_INFO[lv].label}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{formatKr(LEVEL_INFO[lv].salary)}/mnd</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={hire}
          disabled={!canAfford}
          style={{
            width: '100%',
            background: canAfford ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(255,255,255,0.06)',
            border: 'none', borderRadius: 8, padding: '0.75rem',
            color: canAfford ? '#fff' : '#475569',
            fontWeight: 700, fontSize: 15,
            cursor: canAfford ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          {canAfford
            ? `✅ Ansett ${LEVEL_INFO[level].label} ${ROLE_INFO[role].label} — ${formatKr(salary)}/mnd`
            : '💸 Ikke råd til denne ansettelsen'}
        </button>
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
