import { useGame } from '../GameContext'

const MONTH_NAMES = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember']

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function HUD() {
  const { state } = useGame()
  const { cash, reputation, month, companyName, scenario, selectedProducts, marketingBudget, activeChannels } = state

  const p1 = selectedProducts.length > 0 ? 1 : 0
  const p2 = selectedProducts.some(p => p.price > 0) ? 1 : 0
  const p3 = activeChannels.length > 1 ? 1 : 0
  const totalMkt = Object.values(marketingBudget).reduce((s, v) => s + v, 0)
  const p4 = totalMkt > 0 ? 1 : 0
  const psDone = p1 + p2 + p3 + p4

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 60,
      background: 'rgba(10,14,26,0.88)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1.5rem',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: 22 }}>{scenario?.emoji ?? '🏪'}</span>
        <span style={{ fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap' }}>
          {companyName || 'AdVenture 3.0'}
        </span>
      </div>

      <KpiChip icon="💰" value={formatKr(cash)} color="#22c55e" />
      <KpiChip icon="⭐" value={`Rykte: ${reputation}`} color={reputation >= 60 ? '#22c55e' : reputation >= 30 ? '#facc15' : '#ef4444'} />
      <KpiChip icon="📅" value={`${MONTH_NAMES[(month - 1) % 12]} · År 1`} color="#38bdf8" />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>4P:</span>
        {['Produkt','Pris','Plass','Promosjon'].map((p, i) => (
          <div key={p} title={p} style={{
            width: 28, height: 28, borderRadius: 8,
            background: i < psDone ? 'rgba(34,197,94,0.18)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${i < psDone ? '#22c55e' : 'rgba(255,255,255,0.12)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
            color: i < psDone ? '#22c55e' : '#475569',
          }}>
            {i < psDone ? '✓' : p[0]}
          </div>
        ))}
        {psDone === 4 && (
          <span style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', borderRadius: 99, padding: '2px 10px', fontSize: 12, color: '#22c55e', fontWeight: 700 }}>
            Klar!
          </span>
        )}
      </div>
    </div>
  )
}

function KpiChip({ icon, value, color }: { icon: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: `${color}14`, border: `1px solid ${color}44`, borderRadius: 99, padding: '4px 12px' }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
    </div>
  )
}
