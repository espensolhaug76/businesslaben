import { useGame } from '../../GameContext'
import { PanelHeader } from './ShopPanel'

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

export default function WarehousePanel({ onClose: _onClose }: { onClose: () => void }) {
  const { state } = useGame()
  const { selectedProducts } = state

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      <PanelHeader emoji="📦" title="Lager" subtitle="Beholdning og status" />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {selectedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#475569', marginTop: '3rem' }}>
            <div style={{ fontSize: 40, marginBottom: '0.5rem' }}>📦</div>
            <p style={{ fontSize: 14 }}>Ingen produkter valgt.</p>
            <p style={{ fontSize: 13 }}>Gå til Leverandør for å bestille.</p>
          </div>
        ) : selectedProducts.map(p => (
          <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: 26 }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Salgspris: {formatKr(p.price)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#22c55e' }}>∞</div>
              <div style={{ fontSize: 11, color: '#475569' }}>på lager</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
