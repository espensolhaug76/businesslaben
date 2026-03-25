import { useGame } from '../../GameContext'
import { PanelHeader } from './ShopPanel'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

export default function OfficePanel({ onClose: _onClose }: { onClose: () => void }) {
  const { state } = useGame()
  const { monthlyResults, cash, reputation } = state

  const totalRev    = monthlyResults.reduce((s, r) => s + r.revenue, 0)
  const totalProfit = monthlyResults.reduce((s, r) => s + r.netProfit, 0)
  const maxRev      = Math.max(...monthlyResults.map(r => r.revenue), 1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      <PanelHeader emoji="🏢" title="Kontor" subtitle="Økonomi og rapporter" />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <MiniKpi label="Kontanter" value={formatKr(cash)} color="#22c55e" />
          <MiniKpi label="Total omsetning" value={formatKr(totalRev)} color="#38bdf8" />
          <MiniKpi label="Total resultat" value={(totalProfit >= 0 ? '+' : '') + formatKr(totalProfit)} color={totalProfit >= 0 ? '#22c55e' : '#ef4444'} />
          <MiniKpi label="Rykte" value={`${reputation}/100`} color={reputation >= 60 ? '#22c55e' : '#facc15'} />
        </div>

        {monthlyResults.length > 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>MÅNEDLIG INNTEKT</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
              {monthlyResults.map((r, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: '100%', height: Math.max(4, Math.round((r.revenue / maxRev) * 56)), background: r.netProfit >= 0 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)', borderRadius: '3px 3px 0 0' }} />
                  <span style={{ fontSize: 9, color: '#475569' }}>{MONTH_NAMES[r.month - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#475569', marginTop: '2rem' }}>
            <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>📊</div>
            <p style={{ fontSize: 14 }}>Ingen resultater ennå.</p>
            <p style={{ fontSize: 13 }}>Simuler en måned for å se data.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function MiniKpi({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}33`, borderRadius: '0.75rem', padding: '0.75rem' }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}
