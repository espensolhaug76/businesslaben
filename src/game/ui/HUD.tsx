import { useGame } from '../GameContext'
import { INDUSTRY_META } from '../data/industries'

const MONTH_NAMES = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember']

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function HUD() {
  const { state } = useGame()
  const { money, reputation, currentMonth, currentYear, companyName, industry,
          p1_complete, p2_complete, p3_complete, p4_complete, unreadCount,
          level, xp, xpToNextLevel } = state

  const meta = INDUSTRY_META[industry]
  const psDone = [p1_complete, p2_complete, p3_complete, p4_complete].filter(Boolean).length
  const xpPct = Math.round((xp / xpToNextLevel) * 100)

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 60,
      background: 'rgba(10,14,26,0.88)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1.2rem',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
    }}>
      {/* Company name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
        <span style={{ fontSize: 22 }}>{meta?.emoji ?? '🏪'}</span>
        <span style={{ fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
          {companyName || 'AdVenture 3.0'}
        </span>
      </div>

      {/* Level badge */}
      <div title={`${xp} / ${xpToNextLevel} XP`} style={{
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.4)',
        borderRadius: 99, padding: '2px 10px', cursor: 'default',
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#ffd700' }}>Lv{level}</span>
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${xpPct}%`, height: '100%', background: '#ffd700', borderRadius: 2, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* KPIs */}
      <KpiChip icon="💰" value={formatKr(money)} color="#22c55e" />
      <KpiChip icon="⭐" value={`Rykte: ${reputation}`} color={reputation >= 60 ? '#22c55e' : reputation >= 30 ? '#facc15' : '#ef4444'} />
      <KpiChip icon="📅" value={`${MONTH_NAMES[(currentMonth - 1) % 12]} · År ${currentYear}`} color="#38bdf8" />

      {/* Notification bell */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {unreadCount > 0 && (
          <div style={{ position: 'relative', cursor: 'pointer' }} title={`${unreadCount} uleste meldinger`}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <span style={{
              position: 'absolute', top: -4, right: -4,
              background: '#ef4444', color: '#fff', borderRadius: 99,
              fontSize: 10, fontWeight: 800, padding: '1px 5px', lineHeight: 1.4,
            }}>{unreadCount}</span>
          </div>
        )}

        {/* 4P status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>4P:</span>
          {(['Produkt', 'Pris', 'Plass', 'Promosjon'] as const).map((p, i) => {
            const done = [p1_complete, p2_complete, p3_complete, p4_complete][i]
            return (
              <div key={p} title={p} style={{
                width: 26, height: 26, borderRadius: 7,
                background: done ? 'rgba(0,212,170,0.18)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${done ? '#00d4aa' : 'rgba(255,255,255,0.12)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                color: done ? '#00d4aa' : '#475569',
              }}>
                {done ? '✓' : p[0]}
              </div>
            )
          })}
          {psDone === 4 && (
            <span style={{
              background: 'rgba(0,212,170,0.15)', border: '1px solid #00d4aa',
              borderRadius: 99, padding: '2px 10px', fontSize: 11, color: '#00d4aa', fontWeight: 700,
            }}>
              Klar!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function KpiChip({ icon, value, color }: { icon: string; value: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.35rem',
      background: `${color}14`, border: `1px solid ${color}44`,
      borderRadius: 99, padding: '4px 12px', whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
    </div>
  )
}
