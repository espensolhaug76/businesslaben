import { useState } from 'react'
import { useGame } from '../GameContext'
import type { SelectedProduct } from '../types'
import { StepHeader, NavButtons } from './ProductScreen'

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function PricingScreen() {
  const { state, dispatch } = useGame()
  const [products, setProducts] = useState<SelectedProduct[]>(() =>
    state.selectedProducts.map(p => ({ ...p }))
  )

  function setPrice(id: string, price: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price } : p))
  }

  function margin(p: SelectedProduct) {
    if (p.price <= 0) return 0
    return Math.round(((p.price - p.baseCost) / p.price) * 100)
  }

  function priceLabel(p: SelectedProduct): { text: string; color: string } {
    const ratio = p.price / p.suggestedPrice
    if (ratio < 0.7) return { text: 'Veldig lavt — lite fortjeneste', color: '#f97316' }
    if (ratio < 0.9) return { text: 'Lavt — tiltrekker mange kunder', color: '#facc15' }
    if (ratio < 1.1) return { text: 'Anbefalt prisleie ✓', color: '#22c55e' }
    if (ratio < 1.3) return { text: 'Høyt — færre kunder, mer per salg', color: '#facc15' }
    return { text: 'Veldig høyt — risikerer lavt salg', color: '#ef4444' }
  }

  function handleNext() {
    dispatch({ type: 'SET_PRODUCTS', products })
    dispatch({ type: 'SET_PHASE', phase: 'distribution' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <StepHeader step={3} total={5} title="Sett priser" subtitle="Velg prisen på hvert produkt. Høy pris gir mer per salg, men lavere etterspørsel." />

      <div style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {products.map(p => {
          const lbl = priceLabel(p)
          const mg = margin(p)
          const minPrice = Math.round(p.baseCost * 0.5)
          const maxPrice = Math.round(p.suggestedPrice * 3)
          return (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Innkjøpspris: {formatKr(p.baseCost)}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9' }}>{formatKr(p.price)}</div>
                  <div style={{ fontSize: 13, color: mg >= 40 ? '#22c55e' : mg >= 20 ? '#facc15' : '#ef4444', fontWeight: 600 }}>
                    Margin: {mg}%
                  </div>
                </div>
              </div>

              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={Math.max(1, Math.round(p.suggestedPrice / 50))}
                value={p.price}
                onChange={e => setPrice(p.id, Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8', marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569', marginBottom: '0.75rem' }}>
                <span>{formatKr(minPrice)}</span>
                <span style={{ color: '#64748b' }}>Anbefalt: {formatKr(p.suggestedPrice)}</span>
                <span>{formatKr(maxPrice)}</span>
              </div>

              <div style={{ background: `${lbl.color}18`, border: `1px solid ${lbl.color}44`, borderRadius: 8, padding: '0.4rem 0.75rem', display: 'inline-block' }}>
                <span style={{ fontSize: 13, color: lbl.color, fontWeight: 600 }}>{lbl.text}</span>
              </div>
            </div>
          )
        })}
      </div>

      <NavButtons
        onBack={() => dispatch({ type: 'SET_PHASE', phase: 'product' })}
        onNext={handleNext}
        nextLabel="Distribusjon →"
      />
    </div>
  )
}
