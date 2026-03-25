import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { simulateMonth } from '../engine'
import type { MonthlyResult } from '../types'

const MONTH_NAMES = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

interface SimulationModalProps {
  open: boolean
  onClose: () => void
}

export default function SimulationModal({ open, onClose }: SimulationModalProps) {
  const { state, dispatch } = useGame()
  const [result, setResult] = useState<MonthlyResult | null>(null)
  const [simulating, setSimulating] = useState(false)

  async function runSim() {
    setSimulating(true)
    await new Promise(r => setTimeout(r, 900))
    const r = simulateMonth(state)
    setResult(r)
    dispatch({ type: 'APPLY_MONTH_RESULT', result: r })
    setSimulating(false)
  }

  function handleClose() {
    setResult(null)
    onClose()
  }

  const isProfit = (result?.netProfit ?? 0) >= 0
  const monthName = MONTH_NAMES[(state.month - 1) % 12]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.72)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif",
            // Disable pointer events immediately when closing so the fading backdrop
            // doesn't block canvas events during the exit animation.
            pointerEvents: open ? 'auto' : 'none',
          }}
          onPointerDown={e => { e.stopPropagation(); if (e.target === e.currentTarget) handleClose() }}
          onPointerUp={e => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            style={{
              background: 'rgba(15,23,42,0.97)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2rem', padding: '2.5rem',
              width: '100%', maxWidth: 500,
              maxHeight: '90vh', overflowY: 'auto',
              color: '#f1f5f9', position: 'relative',
            }}
          >
            <button onClick={handleClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, width: 32, height: 32, color: '#94a3b8', cursor: 'pointer', fontSize: 16, fontFamily: 'inherit' }}>✕</button>

            {!result && !simulating && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 52, marginBottom: '1rem' }}>▶️</div>
                <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: '0.5rem' }}>Simuler {monthName}</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: 15 }}>
                  Kjør månedssimuleringen for å se resultatene
                </p>
                <button onClick={runSim} style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: 99, padding: '1rem 3rem', color: '#fff', fontWeight: 800, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Kjør simulering
                </button>
              </div>
            )}

            {simulating && (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: 48, marginBottom: '1rem' }}>⚙️</div>
                <p style={{ color: '#38bdf8', fontWeight: 700, fontSize: 18 }}>Simulerer {monthName}…</p>
              </div>
            )}

            {result && !simulating && (
              <>
                {result.event && (
                  <div style={{
                    background: result.event.type === 'positive' ? 'rgba(34,197,94,0.1)' : result.event.type === 'negative' ? 'rgba(239,68,68,0.1)' : 'rgba(148,163,184,0.08)',
                    border: `1px solid ${result.event.type === 'positive' ? '#22c55e55' : result.event.type === 'negative' ? '#ef444455' : '#47556955'}`,
                    borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem',
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: 28 }}>{result.event.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: '0.2rem' }}>{result.event.title}</div>
                      <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.event.description}</div>
                    </div>
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Nettoresultat {monthName}
                  </div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: isProfit ? '#22c55e' : '#ef4444' }}>
                    {isProfit ? '+' : ''}{formatKr(result.netProfit)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  <ResultRow label="Inntekt" value={formatKr(result.revenue)} color="#22c55e" />
                  <ResultRow label="Varekostnad" value={`−${formatKr(result.cogs)}`} color="#f97316" />
                  <ResultRow label="Faste kostnader" value={`−${formatKr(result.fixedCosts)}`} color="#f97316" />
                  <ResultRow label="Markedsføring" value={`−${formatKr(result.marketingCosts)}`} color="#f97316" />
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: '#e2e8f0' }}>Kontanter nå</span>
                    <span style={{ fontWeight: 800, color: '#38bdf8' }}>{formatKr(result.cashAfter)}</span>
                  </div>
                </div>

                {result.cashAfter < 0 && (
                  <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid #ef444455', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center', color: '#ef4444', fontWeight: 700, fontSize: 14, marginBottom: '1rem' }}>
                    ⚠️ Du er i minus! Juster priser eller kutt kostnader.
                  </div>
                )}

                <button onClick={handleClose} style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', border: 'none', borderRadius: 12, padding: '0.9rem 1.5rem', color: '#030712', fontWeight: 800, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                  {state.phase === 'year_end' ? 'Se årsrapport →' : 'Fortsett →'}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ResultRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 14, color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color }}>{value}</span>
    </div>
  )
}
