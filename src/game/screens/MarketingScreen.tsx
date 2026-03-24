import { useState } from 'react'
import { useGame } from '../GameContext'
import type { MarketingBudget } from '../types'
import { StepHeader, NavButtons } from './ProductScreen'

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

const CHANNELS: { key: keyof MarketingBudget; name: string; emoji: string; description: string; color: string }[] = [
  { key: 'social', name: 'Sosiale medier', emoji: '📱', description: 'Facebook & Instagram-annonser. Bra for unge målgrupper.', color: '#818cf8' },
  { key: 'google', name: 'Google-annonser', emoji: '🔍', description: 'Søkeannonsering. Effektivt når folk aktivt søker.', color: '#38bdf8' },
  { key: 'influencer', name: 'Influencer-markedsføring', emoji: '⭐', description: 'Betalt omtale fra influencere. Stor rekkevidde.', color: '#f472b6' },
  { key: 'print', name: 'Trykt reklame', emoji: '📰', description: 'Avisannonser, flyere og plakater. God for lokale kunder.', color: '#facc15' },
  { key: 'event', name: 'Arrangementer', emoji: '🎪', description: 'Åpningsfeiring, smaksprøver, demo-dager. Bygger lojalitet.', color: '#22c55e' },
]

const MAX_TOTAL = 100_000
const STEP = 1_000

export default function MarketingScreen() {
  const { state, dispatch } = useGame()
  const [budget, setBudget] = useState<MarketingBudget>({ ...state.marketingBudget })

  const total = Object.values(budget).reduce((s, v) => s + v, 0)

  function set(key: keyof MarketingBudget, val: number) {
    setBudget(prev => ({ ...prev, [key]: Math.max(0, val) }))
  }

  function handleNext() {
    dispatch({ type: 'SET_MARKETING', budget })
    dispatch({ type: 'SET_PHASE', phase: 'dashboard' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <StepHeader step={5} total={5} title="Markedsføringsbudsjett" subtitle="Bestem hvor mye du vil bruke på markedsføring. Mer investering = mer synlighet og kunder." />

      <div style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {CHANNELS.map(ch => (
          <div key={ch.key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.25rem', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 26 }}>{ch.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9' }}>{ch.name}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{ch.description}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: ch.color, minWidth: 90, textAlign: 'right' }}>
                {formatKr(budget[ch.key])}
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={50_000}
              step={STEP}
              value={budget[ch.key]}
              onChange={e => set(ch.key, Number(e.target.value))}
              style={{ width: '100%', accentColor: ch.color }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginTop: '0.3rem' }}>
              <span>0 kr</span>
              <span>50 000 kr</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: total > MAX_TOTAL ? 'rgba(239,68,68,0.1)' : 'rgba(56,189,248,0.1)',
        border: `1px solid ${total > MAX_TOTAL ? '#ef4444' : '#38bdf8'}`,
        borderRadius: '1rem',
        padding: '1rem 2rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        <span style={{ color: '#94a3b8', fontSize: 15 }}>Total markedsføring: </span>
        <span style={{ fontWeight: 800, fontSize: 20, color: total > MAX_TOTAL ? '#ef4444' : '#38bdf8' }}>
          {formatKr(total)}
        </span>
        {total > 0 && (
          <div style={{ fontSize: 13, color: '#64748b', marginTop: '0.25rem' }}>
            per måned — vil øke kundenes bevissthet om deg
          </div>
        )}
      </div>

      <NavButtons
        onBack={() => dispatch({ type: 'SET_PHASE', phase: 'distribution' })}
        onNext={handleNext}
        nextLabel="Start spillet! →"
      />
    </div>
  )
}
