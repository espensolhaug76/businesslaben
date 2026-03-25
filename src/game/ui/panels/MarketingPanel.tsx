import { useState } from 'react'
import { useGame } from '../../GameContext'
import type { MarketingBudget } from '../../types'
import { PanelHeader, saveBtn } from './ShopPanel'

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

const CHANNELS: { key: keyof MarketingBudget; name: string; emoji: string; color: string }[] = [
  { key: 'social',     name: 'Sosiale medier',    emoji: '📱', color: '#818cf8' },
  { key: 'google',     name: 'Google-annonser',   emoji: '🔍', color: '#38bdf8' },
  { key: 'influencer', name: 'Influencer',        emoji: '⭐', color: '#f472b6' },
  { key: 'print',      name: 'Trykt reklame',     emoji: '📰', color: '#facc15' },
  { key: 'event',      name: 'Arrangementer',     emoji: '🎪', color: '#22c55e' },
]

export default function MarketingPanel({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useGame()
  const [budget, setBudget] = useState<MarketingBudget>({ ...state.marketingBudget })

  const total = Object.values(budget).reduce((s, v) => s + v, 0)

  function set(key: keyof MarketingBudget, val: number) {
    setBudget(prev => ({ ...prev, [key]: Math.max(0, val) }))
  }

  function save() {
    dispatch({ type: 'SET_MARKETING', budget })
    onClose()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      <PanelHeader emoji="📢" title="Markedsavdeling" subtitle="Kanaler og budsjett" />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingBottom: '1rem' }}>
        {CHANNELS.map(ch => (
          <div key={ch.key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.9rem', padding: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: 18 }}>{ch.emoji}</span>
              <span style={{ fontWeight: 600, fontSize: 13, flex: 1, color: '#e2e8f0' }}>{ch.name}</span>
              <span style={{ fontWeight: 800, fontSize: 14, color: ch.color }}>{formatKr(budget[ch.key])}</span>
            </div>
            <input
              type="range" min={0} max={30000} step={500}
              value={budget[ch.key]}
              onChange={e => set(ch.key, Number(e.target.value))}
              style={{ width: '100%', accentColor: ch.color }}
            />
          </div>
        ))}
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid #38bdf833', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
          <span style={{ color: '#64748b', fontSize: 13 }}>Total: </span>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#38bdf8' }}>{formatKr(total)}/mnd</span>
        </div>
      </div>
      <button onClick={save} style={saveBtn}>Lagre budsjett ✓</button>
    </div>
  )
}
