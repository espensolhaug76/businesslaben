import { useState } from 'react'
import { useGame } from '../../GameContext'
import type { SelectedProduct } from '../../types'

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

export function PanelHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: 30 }}>{emoji}</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 19, color: '#f1f5f9' }}>{title}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export const saveBtn: React.CSSProperties = {
  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
  border: 'none', borderRadius: 12,
  padding: '0.8rem 1.5rem',
  color: '#fff', fontWeight: 700, fontSize: 15,
  cursor: 'pointer', fontFamily: "'Outfit', sans-serif", width: '100%',
}

export default function ShopPanel({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useGame()
  const [products, setProducts] = useState<SelectedProduct[]>(() =>
    state.selectedProducts.length > 0
      ? state.selectedProducts.map(p => ({ ...p }))
      : (state.scenario?.products.slice(0, 3).map(p => ({ ...p, price: p.suggestedPrice, stock: 9999 })) ?? [])
  )

  function setPrice(id: string, price: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price } : p))
  }

  function save() {
    dispatch({ type: 'SET_PRODUCTS', products })
    onClose()
  }

  const margin = (p: SelectedProduct) =>
    p.price > 0 ? Math.round(((p.price - p.baseCost) / p.price) * 100) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      <PanelHeader emoji="🏪" title="Din butikk" subtitle="Produkter og priser" />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem' }}>
        {products.length === 0 && (
          <p style={{ color: '#475569', textAlign: 'center', marginTop: '2rem', fontSize: 14 }}>
            Gå til Leverandør for å velge produkter.
          </p>
        )}
        {products.map(p => (
          <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Innkjøp: {formatKr(p.baseCost)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#38bdf8' }}>{formatKr(p.price)}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: margin(p) >= 40 ? '#22c55e' : '#facc15' }}>
                  Margin: {margin(p)}%
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
        ))}
      </div>
      <button onClick={save} style={saveBtn}>Lagre priser ✓</button>
    </div>
  )
}
