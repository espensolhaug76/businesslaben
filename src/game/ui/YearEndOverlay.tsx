import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_META } from '../data/industries'
import { evaluateOutcome } from '../../strategies/innovation/outcomeEngine'
import type { InnovationFlags } from '../../strategies/innovation/types'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

function grade(profit: number, startingMoney: number) {
  const r = profit / startingMoney
  if (r >= 1.5)  return { stars: '⭐⭐⭐⭐⭐', letter: 'A+', label: 'Fantastisk! Du er en forretningsgeni.', color: '#22c55e' }
  if (r >= 0.8)  return { stars: '⭐⭐⭐⭐', letter: 'A',  label: 'Utmerket! Solid fortjeneste.',          color: '#22c55e' }
  if (r >= 0.4)  return { stars: '⭐⭐⭐',   letter: 'B',  label: 'Bra jobb! Du tjente penger.',           color: '#38bdf8' }
  if (r >= 0.1)  return { stars: '⭐⭐',     letter: 'C',  label: 'Godkjent. Litt fortjeneste.',           color: '#facc15' }
  if (r >= -0.2) return { stars: '⭐',       letter: 'D',  label: 'Under pari. Prøv igjen!',              color: '#f97316' }
  return { stars: '💀', letter: 'F', label: 'Konkurs. Nye strategier neste gang!', color: '#ef4444' }
}

export default function YearEndOverlay() {
  const { state, dispatch } = useGame()
  if (state.phase !== 'year_end') return null

  const { monthlyResults, industry, companyName, money, level, xp, gameFlags } = state
  const meta = INDUSTRY_META[industry]
  const totalRevenue = monthlyResults.reduce((s, r) => s + r.revenue, 0)
  const totalProfit  = monthlyResults.reduce((s, r) => s + r.profit, 0)
  const g = grade(totalProfit, meta.startingMoney)
  const outcome = evaluateOutcome({ ...gameFlags, capital: money } as unknown as InnovationFlags)
  const maxRev = Math.max(...monthlyResults.map(r => r.revenue), 1)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", overflowY: 'auto', padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        style={{
          background: 'rgba(15,23,42,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '2.5rem', padding: '3rem',
          maxWidth: 640, width: '100%', color: '#f1f5f9',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 64 }}>🏆</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0.5rem 0 0.25rem' }}>Årsresultat</h1>
          <p style={{ color: '#64748b' }}>{meta.emoji} {companyName} · {meta.name}</p>
          <p style={{ color: '#ffd700', fontWeight: 700, fontSize: 15 }}>Nivå {level} · {xp} XP totalt</p>
        </div>

        {/* Grade */}
        <div style={{
          background: `${g.color}12`, border: `2px solid ${g.color}55`,
          borderRadius: '1.5rem', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem',
        }}>
          <div style={{ fontSize: 36, marginBottom: '0.3rem' }}>{g.stars}</div>
          <div style={{ fontSize: 72, fontWeight: 900, color: g.color, lineHeight: 1 }}>{g.letter}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginTop: '0.5rem' }}>{g.label}</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <StatCard label="Total omsetning" value={formatKr(totalRevenue)} color="#22c55e" />
          <StatCard label="Nettoresultat"   value={(totalProfit >= 0 ? '+' : '') + formatKr(totalProfit)} color={totalProfit >= 0 ? '#22c55e' : '#ef4444'} />
          <StatCard label="Sluttkapital"    value={formatKr(money)} color="#38bdf8" />
          <StatCard label="Måneder simulert" value={String(monthlyResults.length)} color="#a855f7" />
        </div>

        {/* Bar chart */}
        {monthlyResults.length > 0 && (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>MÅNEDLIG OMSETNING</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 80 }}>
              {monthlyResults.map((r, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{
                    width: '100%', borderRadius: '3px 3px 0 0',
                    height: Math.max(4, Math.round((r.revenue / maxRev) * 72)),
                    background: r.profit >= 0 ? 'rgba(0,212,170,0.6)' : 'rgba(239,68,68,0.6)',
                  }} />
                  <span style={{ fontSize: 9, color: '#475569' }}>{MONTH_NAMES[r.month - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outcome section */}
        <div style={{
          background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)',
          borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '1.5rem',
        }}>
          <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>
            Sluttilstand
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', marginBottom: '0.25rem' }}>
            {outcome.badge} {outcome.title}
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 1rem' }}>{outcome.description}</p>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>Refleksjon for klassen</div>
          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {outcome.refleksjon.map((q, i) => (
              <li key={i} style={{ fontSize: 12, color: '#94a3b8', marginBottom: '0.3rem' }}>{q}</li>
            ))}
          </ol>
        </div>

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
            border: 'none', borderRadius: 99, padding: '1rem 3rem',
            color: '#030712', fontWeight: 800, fontSize: 18,
            cursor: 'pointer', fontFamily: 'inherit', width: '100%',
          }}
        >
          🔄 Spill igjen
        </button>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: `${color}0e`, border: `1px solid ${color}33`, borderRadius: '0.75rem', padding: '0.9rem' }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}
