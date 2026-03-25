import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import type { MarketingBudget, SelectedProduct } from '../types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

type Tab = 'oversikt' | 'produkter' | 'priser' | 'markedsforing' | 'rapporter'

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'oversikt',      label: 'Oversikt',       emoji: '📊' },
  { id: 'produkter',     label: 'Produkter',       emoji: '📦' },
  { id: 'priser',        label: 'Priser',          emoji: '💰' },
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 180,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif",
            padding: '1.5rem',
          }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24 }}
            style={{
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2rem',
              width: '100%', maxWidth: 900,
              maxHeight: 'calc(100vh - 3rem)',
              display: 'flex', flexDirection: 'column',
              color: '#f1f5f9',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem 2rem 0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>💻 Bedriftsdashboard</h2>
                <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
                  All bedriftsstyring på ett sted
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 99, width: 36, height: 36,
                  color: '#94a3b8', cursor: 'pointer',
                  fontSize: 18, fontFamily: 'inherit',
                }}
              >
                ✕
              </button>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: '0.5rem',
              padding: '1rem 2rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              overflowX: 'auto',
            }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    background: activeTab === t.id ? 'rgba(56,189,248,0.15)' : 'transparent',
                    border: `1px solid ${activeTab === t.id ? '#38bdf8' : 'transparent'}`,
                    borderBottom: 'none',
                    borderRadius: '8px 8px 0 0',
                    padding: '0.6rem 1.2rem',
                    color: activeTab === t.id ? '#38bdf8' : '#64748b',
                    fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    fontFamily: 'inherit', whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                  }}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem 2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {activeTab === 'oversikt'      && <OversiktTab />}
                  {activeTab === 'produkter'     && <ProdukterTab />}
                  {activeTab === 'priser'        && <PriserTab />}
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

// ── Oversikt tab ──────────────────────────────────────────────────────────────

function OversiktTab() {
  const { state } = useGame()
  const { cash, reputation, month, monthlyResults, rentedLocation } = state
  const totalRev    = monthlyResults.reduce((s, r) => s + r.revenue, 0)
  const totalProfit = monthlyResults.reduce((s, r) => s + r.netProfit, 0)
  const maxRev      = Math.max(...monthlyResults.map(r => r.revenue), 1)

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem', marginBottom: '1.5rem',
      }}>
        <KpiCard label="Kontanter"      value={formatKr(cash)}            color="#22c55e" icon="💰" />
        <KpiCard label="Rykte"          value={`${reputation}/100`}        color={reputation >= 60 ? '#22c55e' : '#facc15'} icon="⭐" />
        <KpiCard label="Måned"          value={MONTH_NAMES[(month - 1) % 12]} color="#38bdf8" icon="📅" />
        <KpiCard label="Total omsetning" value={formatKr(totalRev)}        color="#a855f7" icon="📈" />
      </div>

      {rentedLocation && (
        <div style={{
          background: 'rgba(56,189,248,0.08)',
          border: '1px solid #38bdf833',
          borderRadius: '1rem', padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex', gap: '1rem', alignItems: 'center',
        }}>
          <span style={{ fontSize: 32 }}>🏪</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{rentedLocation.name}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              {rentedLocation.zone === 'gagate'
                ? 'Gågata'
                : rentedLocation.zone === 'hovedgate'
                  ? 'Hovedgata'
                  : 'Utkanten'
              } · {formatKr(rentedLocation.monthlyRent)}/mnd · Trafikk: {rentedLocation.footTraffic}
            </div>
          </div>
        </div>
      )}

      {monthlyResults.length > 0 ? (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1rem', padding: '1.25rem',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '1rem' }}>
            MÅNEDLIG OMSETNING
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 100 }}>
            {monthlyResults.map((r, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%',
                  height: Math.max(4, Math.round((r.revenue / maxRev) * 90)),
                  background: r.netProfit >= 0 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s',
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
          <p style={{ fontSize: 16 }}>Ingen resultater ennå. Simuler din første måned!</p>
        </div>
      )}
    </div>
  )
}

// ── Produkter tab ─────────────────────────────────────────────────────────────

function ProdukterTab() {
  const { state, dispatch } = useGame()
  const products = state.scenario?.products ?? []
  const [selected, setSelected] = useState<Set<string>>(
    new Set(state.selectedProducts.map(p => p.id))
  )

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < 4) next.add(id)
      return next
    })
  }

  function save() {
    const prods: SelectedProduct[] = products
      .filter(p => selected.has(p.id))
      .map(p => {
        const ex = state.selectedProducts.find(sp => sp.id === p.id)
        return ex ?? { ...p, price: p.suggestedPrice, stock: 9999 }
      })
    dispatch({ type: 'SET_PRODUCTS', products: prods })
  }

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.25rem',
      }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Produktkatalog</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
            Velg produkter å selge (maks 4)
          </p>
        </div>
        <button
          onClick={save}
          style={{
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            border: 'none', borderRadius: 99,
            padding: '0.6rem 1.5rem', color: '#fff',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Lagre ✓
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {products.map(p => {
          const isSel = selected.has(p.id)
          const disabled = !isSel && selected.size >= 4
          return (
            <button
              key={p.id}
              onClick={() => !disabled && toggle(p.id)}
              style={{
                background: isSel ? 'rgba(20,184,166,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isSel ? '#14b8a6' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '1rem', padding: '1rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.45 : 1,
                textAlign: 'left', fontFamily: 'inherit', color: '#f1f5f9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>
                    Innkjøp: {formatKr(p.baseCost)} · Anbefalt: {formatKr(p.suggestedPrice)}
                  </div>
                </div>
                {isSel && <span style={{ color: '#14b8a6' }}>✓</span>}
              </div>
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: 12, color: '#475569', marginTop: '0.75rem', textAlign: 'center' }}>
        {selected.size} av maks 4 valgt
      </p>
    </div>
  )
}

// ── Priser tab ────────────────────────────────────────────────────────────────

function PriserTab() {
  const { state, dispatch } = useGame()
  const [products, setProducts] = useState<SelectedProduct[]>(
    () => state.selectedProducts.map(p => ({ ...p }))
  )

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>
        Ingen produkter valgt. Gå til Produkter-fanen.
      </div>
    )
  }

  function setPrice(id: string, price: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price } : p))
  }

  function save() {
    dispatch({ type: 'SET_PRODUCTS', products })
  }

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.25rem',
      }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Prissetting</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
            Sett salgspris per produkt
          </p>
        </div>
        <button
          onClick={save}
          style={{
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            border: 'none', borderRadius: 99,
            padding: '0.6rem 1.5rem', color: '#fff',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Lagre priser ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => {
          const mg = p.price > 0 ? Math.round(((p.price - p.baseCost) / p.price) * 100) : 0
          return (
            <div
              key={p.id}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem', padding: '1.25rem',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '0.75rem', marginBottom: '0.75rem',
              }}>
                <span style={{ fontSize: 24 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    Innkjøp: {formatKr(p.baseCost)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: 20, color: '#38bdf8' }}>
                    {formatKr(p.price)}
                  </div>
                  <div style={{ fontSize: 12, color: mg >= 40 ? '#22c55e' : '#facc15' }}>
                    Margin: {mg}%
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={Math.round(p.baseCost * 0.8)}
                max={Math.round(p.suggestedPrice * 3)}
                step={Math.max(1, Math.round(p.suggestedPrice / 50))}
                value={p.price}
                onChange={e => setPrice(p.id, Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8' }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Markedsføring tab ─────────────────────────────────────────────────────────

function MarkedsforingTab() {
  const { state, dispatch } = useGame()
  const [budget, setBudget] = useState<MarketingBudget>({ ...state.marketingBudget })
  const total = Object.values(budget).reduce((s, v) => s + v, 0)

  const channels: Array<{ key: keyof MarketingBudget; name: string; emoji: string; color: string }> = [
    { key: 'social',      name: 'Sosiale medier',   emoji: '📱', color: '#818cf8' },
    { key: 'google',      name: 'Google-annonser',  emoji: '🔍', color: '#38bdf8' },
    { key: 'influencer',  name: 'Influencer',       emoji: '⭐', color: '#f472b6' },
    { key: 'print',       name: 'Trykt reklame',    emoji: '📰', color: '#facc15' },
    { key: 'event',       name: 'Arrangementer',    emoji: '🎪', color: '#22c55e' },
  ]

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.25rem',
      }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Markedsføringsbudsjett</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
            Total: {formatKr(total)}/mnd
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_MARKETING', budget })}
          style={{
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            border: 'none', borderRadius: 99,
            padding: '0.6rem 1.5rem', color: '#fff',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Lagre ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {channels.map(ch => (
          <div
            key={ch.key}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem', padding: '1rem',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '0.6rem', marginBottom: '0.5rem',
            }}>
              <span style={{ fontSize: 18 }}>{ch.emoji}</span>
              <span style={{ fontWeight: 600, fontSize: 14, flex: 1 }}>{ch.name}</span>
              <span style={{ fontWeight: 800, fontSize: 15, color: ch.color }}>
                {formatKr(budget[ch.key])}
              </span>
            </div>
            <input
              type="range" min={0} max={30000} step={500}
              value={budget[ch.key]}
              onChange={e => setBudget(prev => ({ ...prev, [ch.key]: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: ch.color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Rapporter tab ─────────────────────────────────────────────────────────────

function RapporterTab() {
  const { state } = useGame()
  const { monthlyResults } = state

  if (monthlyResults.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>
        <div style={{ fontSize: 48, marginBottom: '1rem' }}>📋</div>
        Ingen måneder simulert ennå.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {[...monthlyResults].reverse().map(r => (
        <div
          key={r.month}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${r.netProfit >= 0 ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: '1rem', padding: '1rem',
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '0.5rem',
          }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{MONTH_NAMES[r.month - 1]}</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: r.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
              {r.netProfit >= 0 ? '+' : ''}{formatKr(r.netProfit)}
            </span>
          </div>
          {r.event && (
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.4rem' }}>
              {r.event.emoji} {r.event.title}
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', fontSize: 12, color: '#64748b' }}>
            <span>Inntekt: {formatKr(r.revenue)}</span>
            <span>COGS: {formatKr(r.cogs)}</span>
            <span>Faste: {formatKr(r.fixedCosts)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Shared components ─────────────────────────────────────────────────────────

function KpiCard({
  label, value, color, icon,
}: {
  label: string
  value: string
  color: string
  icon: string
}) {
  return (
    <div style={{
      background: `${color}0d`,
      border: `1px solid ${color}33`,
      borderRadius: '1rem', padding: '1rem',
    }}>
      <div style={{ fontSize: 20, marginBottom: '0.4rem' }}>{icon}</div>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}
