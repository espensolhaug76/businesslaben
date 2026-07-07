import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { BALANCE } from '../data/balance'

// ─── DAGSPULS (SPILLKLOKKE DEL 3) ─────────────────────────────────────────────
// Fullskjerms livepanel over butikkscenen mens dagen ruller: stor klokke,
// kundeteller, løpende ticker med siste bakgrunnssalg, opptjent i dag, og
// lagerstatus per utstilt vare som synker utover dagen. Kundemøter AVBRYTER
// panelet (gates på activeMeetingScenarioId ⇒ panelet glir bort, scenariet
// spilles i butikkscenen, panelet kommer tilbake etterpå). Diskret minimer-
// knapp. Samme visuelle språk som dagsoppgjøret.

const DAG_VARIGHET = BALANCE.klokke.stengMinutt - BALANCE.klokke.apneMinutt

function klokkeslett(dayMinute: number): string {
  const t = BALANCE.klokke.apneMinutt + Math.min(DAG_VARIGHET, Math.max(0, dayMinute))
  const h = Math.floor(t / 60), m = Math.floor(t % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
function formatKr(n: number) { return `${Math.round(n).toLocaleString('nb-NO')} kr` }

export default function DagspulsOverlay({ dashboardOpen, onSteng }: { dashboardOpen: boolean; onSteng: () => void }) {
  const { state } = useGame()
  const [minimert, setMinimert] = useState(false)

  // Gate: kun i åpningstid, aldri over et aktivt kundemøte eller dashbordet.
  const vis = state.dayPhase === 'åpen' && !state.activeMeetingScenarioId && !dashboardOpen
  if (!vis) return null

  const kunder = state.dayStats.bakgrunnKunder + state.meetingsToday
  const opptjent = state.dayStats.soldKr + state.dayStats.bakgrunnKr - state.dayStats.varekostKr

  // Utstilte varer (trau + vindu) med lager — synker utover dagen.
  const utstiltIds = new Set<string>([
    ...state.counterLayout.map(t => t.productId),
    ...state.windowDisplayLayout.filter(w => w.fixtureId === 'vindu').map(w => w.productId),
  ])
  const utstilt = [...utstiltIds]
    .map(id => state.products.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
  const maxStock = Math.max(1, ...utstilt.map(p => p.stock))

  // Minimert: liten pille nede, butikken synlig bak.
  if (minimert) {
    return (
      <div style={{
        position: 'fixed', top: 64, left: '50%', transform: 'translateX(-50%)', zIndex: 150,
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(0,212,170,0.4)',
        borderRadius: 99, padding: '0.5rem 1rem', fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
      }}>
        <span style={{ fontSize: 15, fontWeight: 800 }}>🕐 {klokkeslett(state.dayMinute)}</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{kunder} kunder · {formatKr(opptjent)}</span>
        <button onClick={() => setMinimert(false)} title="Vis dagspulsen" style={pilleBtn}>⤢</button>
      </div>
    )
  }

  const progress = Math.min(1, state.dayMinute / DAG_VARIGHET)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: 'linear-gradient(180deg, rgba(6,10,18,0.94) 0%, rgba(10,14,26,0.9) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", color: '#f1f5f9', padding: '1.5rem',
      }}
    >
      {/* Minimer + steng, øverst til høyre */}
      <div style={{ position: 'fixed', top: 64, right: 20, display: 'flex', gap: 8, zIndex: 2 }}>
        <button onClick={() => setMinimert(true)} title="Minimer — se butikken bak" style={topBtn}>➖ Minimer</button>
        <button onClick={onSteng} title="Steng butikken tidlig (resterende kunder bortfaller)" style={{ ...topBtn, borderColor: 'rgba(220,38,38,0.5)', color: '#fca5a5' }}>🔒 Steng tidlig</button>
      </div>

      <div style={{ width: '100%', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {/* Klokke + fremdrift */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', letterSpacing: '0.15em' }}>ÅPEN DAG · DAG {state.dayNumber}</div>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, letterSpacing: '0.02em' }}>{klokkeslett(state.dayMinute)}</div>
          <div style={{ margin: '0.4rem auto 0', maxWidth: 420, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg,#00d4aa,#0d9488)', borderRadius: 99, transition: 'width 0.5s linear' }} />
          </div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{BALANCE.klokke.apneMinutt / 60}:00 → {BALANCE.klokke.stengMinutt / 60}:00 · stenger automatisk</div>
        </div>

        {/* Nøkkeltall */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.7rem' }}>
          <PulsKort label="Kunder i dag" value={`${kunder}`} sub={`${state.meetingsToday} møter · ${state.dayStats.bakgrunnKunder} øvrige`} color="#38bdf8" />
          <PulsKort label="Opptjent i dag" value={formatKr(opptjent)} sub="salg − varekost (før svinn)" color={opptjent >= 0 ? '#22c55e' : '#ef4444'} />
          <PulsKort label="Tapte salg" value={`${state.dayStats.tapteSalgStk}`} sub={state.dayStats.tapteSalgStk > 0 ? 'tomt lager' : 'ingen'} color={state.dayStats.tapteSalgStk > 0 ? '#ef4444' : '#64748b'} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
          {/* Ticker */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '0.9rem 1rem', minHeight: 190 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>📟 SISTE SALG</div>
            {state.dayTicker.length === 0 ? (
              <div style={{ fontSize: 13, color: '#475569' }}>Venter på dagens første kunder …</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <AnimatePresence initial={false}>
                  {state.dayTicker.map((l, i) => (
                    <motion.div key={`${l.navn}-${i}-${state.dayMinute}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: i === 0 ? 1 : 0.6 - i * 0.06, x: 0 }}
                      style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#cbd5e1' }}>{l.qty} × {l.navn}</span>
                      <span style={{ color: '#22c55e' }}>{formatKr(l.kr)}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Lagerstatus — utstilte varer synker */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '0.9rem 1rem', minHeight: 190 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>🧺 LAGER PÅ DISKEN</div>
            {utstilt.length === 0 ? (
              <div style={{ fontSize: 13, color: '#475569' }}>Ingen varer utstilt — still ut i disken for mer trafikk.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {utstilt.slice(0, 8).map(p => {
                  const tom = p.stock <= 0
                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: tom ? '#f87171' : '#cbd5e1', width: 120, flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                      <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(p.stock / maxStock) * 100}%`, background: tom ? '#ef4444' : '#00d4aa', borderRadius: 99, transition: 'width 0.5s' }} />
                      </div>
                      <span style={{ fontSize: 11, color: tom ? '#f87171' : '#94a3b8', width: 42, textAlign: 'right', flexShrink: 0 }}>{tom ? 'Tom' : `${p.stock}`}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const topBtn: React.CSSProperties = {
  background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 99,
  padding: '0.45rem 0.9rem', color: '#cbd5e1', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
}
const pilleBtn: React.CSSProperties = {
  background: 'transparent', border: 'none', color: '#00d4aa', fontSize: 16, cursor: 'pointer', fontFamily: 'inherit', padding: 2,
}

function PulsKort({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 14, padding: '0.8rem 0.9rem' }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{sub}</div>
    </div>
  )
}
