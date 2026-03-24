import { useState } from 'react'
import { useGame } from '../GameContext'
import type { SelectedProduct } from '../types'

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function ProductScreen() {
  const { state, dispatch } = useGame()
  const products = state.scenario?.products ?? []
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < 4) next.add(id)
      return next
    })
  }

  function handleNext() {
    if (selected.size < 1) return
    const prods: SelectedProduct[] = products
      .filter(p => selected.has(p.id))
      .map(p => ({ ...p, price: p.suggestedPrice, stock: 9999 }))
    dispatch({ type: 'SET_PRODUCTS', products: prods })
    dispatch({ type: 'SET_PHASE', phase: 'pricing' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <StepHeader step={2} total={5} title="Velg produkter" subtitle={`Velg 1–4 produkter du vil selge som ${state.scenario?.name}`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', width: '100%', maxWidth: 900, marginBottom: '2rem' }}>
        {products.map(p => {
          const isSelected = selected.has(p.id)
          const disabled = !isSelected && selected.size >= 4
          return (
            <button
              key={p.id}
              onClick={() => !disabled && toggle(p.id)}
              style={{
                background: isSelected ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${isSelected ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '1.25rem',
                padding: '1.25rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: disabled ? 0.45 : 1,
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                color: '#f1f5f9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</span>
                {isSelected && <span style={{ marginLeft: 'auto', fontSize: 18 }}>✓</span>}
              </div>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 0.75rem', lineHeight: 1.5 }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Chip label={`Innkjøp: ${formatKr(p.baseCost)}`} color="#f97316" />
                <Chip label={`Anbefalt pris: ${formatKr(p.suggestedPrice)}`} color="#38bdf8" />
                <Chip label={`Maks etterspørsel: ~${p.maxMonthlyDemand}/mnd`} color="#a855f7" />
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: 4 }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} style={{ height: 6, flex: 1, borderRadius: 3, background: i < p.quality ? '#22c55e' : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: '0.3rem' }}>Kvalitet: {p.quality}/10</div>
            </button>
          )
        })}
      </div>

      <p style={{ color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
        {selected.size} av maks 4 valgt
      </p>

      <NavButtons
        onBack={() => dispatch({ type: 'SET_PHASE', phase: 'startup' })}
        onNext={handleNext}
        nextLabel="Sett priser →"
        nextDisabled={selected.size < 1}
      />
    </div>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────

export function StepHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%', maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{ width: 32, height: 6, borderRadius: 3, background: i < step ? '#38bdf8' : 'rgba(255,255,255,0.12)' }} />
        ))}
      </div>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: '0 0 0.5rem' }}>{title}</h2>
      <p style={{ color: '#94a3b8', margin: 0, fontSize: 16 }}>{subtitle}</p>
    </div>
  )
}

export function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ background: `${color}22`, border: `1px solid ${color}88`, borderRadius: 99, padding: '2px 8px', fontSize: 11, color, fontWeight: 600 }}>
      {label}
    </span>
  )
}

export function NavButtons({ onBack, onNext, nextLabel, nextDisabled }: { onBack: () => void; onNext: () => void; nextLabel: string; nextDisabled?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <button
        onClick={onBack}
        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}
      >
        ← Tilbake
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          background: nextDisabled ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #38bdf8, #818cf8)',
          border: 'none',
          borderRadius: 99,
          padding: '0.75rem 2.5rem',
          color: nextDisabled ? '#475569' : '#030712',
          fontWeight: 700,
          fontSize: 16,
          cursor: nextDisabled ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
        }}
      >
        {nextLabel}
      </button>
    </div>
  )
}
