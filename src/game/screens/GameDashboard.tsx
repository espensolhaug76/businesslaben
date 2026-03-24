import { useState } from 'react'
import { useGame } from '../GameContext'
import { simulateMonth } from '../engine'
import { DISTRIBUTION_OPTIONS } from '../productData'

const MONTH_NAMES = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

function KpiCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}44`, borderRadius: '1.25rem', padding: '1.25rem', flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: '0.4rem' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#475569', marginTop: '0.3rem' }}>{sub}</div>}
    </div>
  )
}

export default function GameDashboard() {
  const { state, dispatch } = useGame()
  const [simulating, setSimulating] = useState(false)

  const { companyName, scenario, cash, month, reputation, monthlyResults, selectedProducts, activeChannels, marketingBudget } = state

  const totalMarketing = Object.values(marketingBudget).reduce((s, v) => s + v, 0)

  async function handleSimulate() {
    setSimulating(true)
    // short artificial delay for tension
    await new Promise(r => setTimeout(r, 1200))
    const result = simulateMonth(state)
    dispatch({ type: 'APPLY_MONTH_RESULT', result })
    setSimulating(false)
  }

  const lastThree = monthlyResults.slice(-3).reverse()

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#f1f5f9' }}>
            {scenario?.emoji} {companyName}
          </h1>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: 14 }}>
            {MONTH_NAMES[month - 1]} — År 1 · {scenario?.name}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <ReputationBadge reputation={reputation} />
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', maxWidth: 1000, marginBottom: '2rem' }}>
        <KpiCard label="Kontanter" value={formatKr(cash)} sub="tilgjengelig" color="#22c55e" />
        <KpiCard label="Måned" value={`${month} / 12`} sub={MONTH_NAMES[month - 1]} color="#38bdf8" />
        <KpiCard label="Produkter" value={String(selectedProducts.length)} sub="aktive produkter" color="#a855f7" />
        <KpiCard label="Markedsføring" value={formatKr(totalMarketing)} sub="per måned" color="#f97316" />
      </div>

      {/* Products summary */}
      <div style={{ width: '100%', maxWidth: 1000, marginBottom: '2rem' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#94a3b8', marginBottom: '1rem' }}>DINE PRODUKTER</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {selectedProducts.map(p => (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: 24 }}>{p.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0' }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#38bdf8', fontWeight: 700 }}>{formatKr(p.price)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div style={{ width: '100%', maxWidth: 1000, marginBottom: '2rem' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#94a3b8', marginBottom: '0.75rem' }}>DISTRIBUSJONSKANALER</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {DISTRIBUTION_OPTIONS.filter(d => activeChannels.includes(d.channel)).map(d => (
            <span key={d.channel} style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid #38bdf844', borderRadius: 99, padding: '0.4rem 0.9rem', fontSize: 14, color: '#38bdf8', fontWeight: 600 }}>
              {d.emoji} {d.name}
            </span>
          ))}
        </div>
      </div>

      {/* Previous results */}
      {lastThree.length > 0 && (
        <div style={{ width: '100%', maxWidth: 1000, marginBottom: '2rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#94a3b8', marginBottom: '0.75rem' }}>SISTE MÅNEDER</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {lastThree.map(r => (
              <div key={r.month} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem 1.25rem', flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: '0.25rem' }}>{MONTH_NAMES[r.month - 1]}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: r.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                  {r.netProfit >= 0 ? '+' : ''}{formatKr(r.netProfit)}
                </div>
                <div style={{ fontSize: 12, color: '#475569' }}>Inntekt: {formatKr(r.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings shortcuts */}
      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <SettingButton label="Juster priser" emoji="💰" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'pricing' })} />
        <SettingButton label="Endre distribusjon" emoji="🌐" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'distribution' })} />
        <SettingButton label="Endre markedsføring" emoji="📢" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'marketing' })} />
      </div>

      {/* Simulate button */}
      <button
        onClick={handleSimulate}
        disabled={simulating}
        style={{
          background: simulating ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #22c55e, #16a34a)',
          border: 'none',
          borderRadius: 99,
          padding: '1.1rem 3.5rem',
          color: simulating ? '#475569' : '#fff',
          fontWeight: 800,
          fontSize: 20,
          cursor: simulating ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.3s',
          boxShadow: simulating ? 'none' : '0 0 30px rgba(34,197,94,0.3)',
        }}
      >
        {simulating ? '⏳ Simulerer…' : `▶ Simuler ${MONTH_NAMES[month - 1]}`}
      </button>
      <p style={{ color: '#475569', fontSize: 13, marginTop: '0.5rem' }}>
        Kjør simuleringen for å se resultater for denne måneden
      </p>
    </div>
  )
}

function ReputationBadge({ reputation }: { reputation: number }) {
  const color = reputation >= 70 ? '#22c55e' : reputation >= 40 ? '#facc15' : '#ef4444'
  const label = reputation >= 70 ? 'Godt rykte' : reputation >= 40 ? 'OK rykte' : 'Dårlig rykte'
  return (
    <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 99, padding: '0.4rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <span style={{ fontSize: 14 }}>{reputation >= 70 ? '⭐' : reputation >= 40 ? '😐' : '😰'}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{label} ({reputation})</span>
    </div>
  )
}

function SettingButton({ label, emoji, onClick }: { label: string; emoji: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '0.55rem 1.25rem', color: '#94a3b8', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
    >
      <span>{emoji}</span> {label}
    </button>
  )
}
