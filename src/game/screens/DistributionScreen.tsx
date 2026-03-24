import { useState } from 'react'
import { useGame } from '../GameContext'
import type { DistributionChannel } from '../types'
import { DISTRIBUTION_OPTIONS } from '../productData'
import { StepHeader, NavButtons } from './ProductScreen'

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function DistributionScreen() {
  const { state, dispatch } = useGame()
  const [active, setActive] = useState<DistributionChannel[]>(state.activeChannels)

  function toggle(channel: DistributionChannel) {
    if (channel === 'physicalStore') return  // always on
    setActive(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    )
  }

  const totalExtraCost = DISTRIBUTION_OPTIONS
    .filter(d => active.includes(d.channel))
    .reduce((sum, d) => sum + d.monthlyCost, 0)

  function handleNext() {
    dispatch({ type: 'SET_CHANNELS', channels: active })
    dispatch({ type: 'SET_PHASE', phase: 'marketing' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <StepHeader step={4} total={5} title="Velg distribusjonskanaler" subtitle="Hvor skal du selge? Flere kanaler gir mer rekkevidde, men koster penger og kan redusere marginen." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', width: '100%', maxWidth: 900, marginBottom: '1.5rem' }}>
        {DISTRIBUTION_OPTIONS.map(d => {
          const isActive = active.includes(d.channel)
          const locked = d.channel === 'physicalStore'
          return (
            <button
              key={d.channel}
              onClick={() => toggle(d.channel)}
              style={{
                background: isActive ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.03)',
                border: `2px solid ${isActive ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '1.25rem',
                padding: '1.25rem',
                cursor: locked ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                color: '#f1f5f9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: 28 }}>{d.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{d.name}</div>
                  {locked && <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>ALLTID PÅ</span>}
                </div>
                {isActive && !locked && <span style={{ fontSize: 18, color: '#38bdf8' }}>✓</span>}
              </div>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 0.75rem', lineHeight: 1.5 }}>{d.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444466', borderRadius: 99, padding: '2px 8px', fontSize: 11, color: '#ef4444', fontWeight: 600 }}>
                  {d.monthlyCost > 0 ? `+${formatKr(d.monthlyCost)}/mnd` : 'Ingen ekstra kostnad'}
                </span>
                <span style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e66', borderRadius: 99, padding: '2px 8px', fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
                  ×{d.reachMultiplier.toFixed(1)} rekkevidde
                </span>
                {d.marginImpact < 1 && (
                  <span style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid #f9731666', borderRadius: 99, padding: '2px 8px', fontSize: 11, color: '#f97316', fontWeight: 600 }}>
                    {Math.round((1 - d.marginImpact) * 100)}% til plattform
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1rem 1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <span style={{ color: '#94a3b8', fontSize: 15 }}>Ekstra kanalkostnad per måned: </span>
        <span style={{ fontWeight: 700, fontSize: 18, color: totalExtraCost > 0 ? '#f97316' : '#22c55e' }}>
          {formatKr(totalExtraCost)}
        </span>
      </div>

      <NavButtons
        onBack={() => dispatch({ type: 'SET_PHASE', phase: 'pricing' })}
        onNext={handleNext}
        nextLabel="Markedsføring →"
      />
    </div>
  )
}
