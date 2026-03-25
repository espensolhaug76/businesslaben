import { useState } from 'react'
import { useGame } from '../../GameContext'
import type { SelectedProduct } from '../../types'
import { PanelHeader, saveBtn } from './ShopPanel'

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

export default function SupplierPanel({ onClose }: { onClose: () => void }) {
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
        const existing = state.selectedProducts.find(sp => sp.id === p.id)
        return existing ?? { ...p, price: p.suggestedPrice, stock: 9999 }
      })
    dispatch({ type: 'SET_PRODUCTS', products: prods })
    onClose()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      <PanelHeader emoji="🚛" title="Leverandør" subtitle="Velg produkter (maks 4)" />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '1rem' }}>
        {products.map(p => {
          const isSel = selected.has(p.id)
          const disabled = !isSel && selected.size >= 4
          return (
            <button key={p.id} onClick={() => !disabled && toggle(p.id)} style={{
              background: isSel ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isSel ? '#14b8a6' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '0.9rem', padding: '0.9rem',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.45 : 1,
              textAlign: 'left', fontFamily: "'Outfit', sans-serif",
              color: '#f1f5f9', transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>
                    Kostpris: {formatKr(p.baseCost)} · Anbefalt: {formatKr(p.suggestedPrice)}
                  </div>
                </div>
                {isSel && <span style={{ color: '#14b8a6', fontSize: 18 }}>✓</span>}
              </div>
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: 12, color: '#475569', margin: '0 0 0.75rem', textAlign: 'center' }}>
        {selected.size} av maks 4 valgt
      </p>
      <button onClick={save} style={saveBtn}>Bekreft bestilling ✓</button>
    </div>
  )
}
