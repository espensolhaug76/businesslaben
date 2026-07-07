import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import { getActiveIndustryDefinition } from '../data/industryDefinition'

// ─── DAGSOPPGJØR (DEL 4, Dagssyklus) ──────────────────────────────────────────
// Vises når dayPhase === 'oppgjør' (satt av CLOSE_DAY). Leser state direkte,
// gates internt. «Start ny dag» dispatcher START_NEW_DAY (dagteller + evt.
// månedsrull). «Bestill til i morgen» (onOpenProducts) åpner dashbordet på
// Produkter-fanen UTEN å avansere dagen — dayPhase forblir 'oppgjør', og
// bestillinger lagt nå får ankomstDag = dayNumber+1 («ferskt neste dag»).
// Mens dashbordet ligger over (dashboardOpen), skjules oppgjøret så det ikke
// dekker dashbordet (oppgjøret har høyere z-index); det kommer tilbake når
// dashbordet lukkes (dayPhase er fortsatt 'oppgjør').

const MONTH_NAMES = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

function formatKr(n: number) { return `${Math.round(n).toLocaleString('nb-NO')} kr` }

/** Terskel for «mye svinn»-hintet — svinn-verdien har spist minst denne
 *  andelen av dagens salgsinntekt. Rent pedagogisk merke, ingen konsekvens. */
const HIGH_SVINN_SHARE = 0.3

export default function DayResultOverlay({ onOpenProducts, dashboardOpen }: {
  /** Åpne dashbordet på Produkter-fanen uten å avansere dagen. */
  onOpenProducts: () => void
  /** Dashbordet ligger over oppgjøret akkurat nå ⇒ skjul oppgjøret. */
  dashboardOpen: boolean
}) {
  const { state, dispatch } = useGame()
  if (state.dayPhase !== 'oppgjør' || !state.lastDayResult || dashboardOpen) return null

  const r = state.lastDayResult
  const resultColor = r.resultat >= 0 ? '#22c55e' : '#ef4444'
  const highSvinn = r.svinnKr > 0 && r.svinnKr >= r.soldKr * HIGH_SVINN_SHARE

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 260,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", overflowY: 'auto', padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22 }}
        style={{
          background: 'rgba(15,23,42,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '2rem', padding: '2.25rem',
          maxWidth: 480, width: '100%', color: '#f1f5f9',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 44 }}>🧾</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0.4rem 0 0.15rem' }}>Dagsoppgjør</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Dag {r.dayNumber} · {MONTH_NAMES[r.month - 1]}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <StatCard label="Solgt" value={`${r.soldStk} stk`} sub={formatKr(r.soldKr)} color="#22c55e" />
          <StatCard label="Svinn" value={`${r.svinnStk} stk`} sub={formatKr(r.svinnKr)} color="#ef4444" />
          <StatCard label="Rykte i dag" value={`${r.reputationDelta >= 0 ? '+' : ''}${r.reputationDelta}`} color={r.reputationDelta >= 0 ? '#38bdf8' : '#ef4444'} />
          <StatCard label="XP i dag" value={`+${r.xpEarned}`} color="#a855f7" />
        </div>

        {/* Resultat — salg minus varekost minus svinn */}
        <div style={{
          background: `${resultColor}12`, border: `1px solid ${resultColor}44`,
          borderRadius: '1rem', padding: '1rem 1.1rem', marginBottom: '1.1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>RESULTAT (salg − varekost − svinn)</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
              {formatKr(r.soldKr)} − {formatKr(r.varekostKr)} − {formatKr(r.svinnKr)}
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: resultColor }}>
            {r.resultat >= 0 ? '+' : ''}{formatKr(r.resultat)}
          </div>
        </div>

        {/* Pedagogiske hint — mild tone, aldri straffende. KLIKKBARE: fører
            rett til Produkter-fanen (bestill inn til i morgen) uten å avansere
            dagen. */}
        {(highSvinn || r.stockoutHappened) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {highSvinn && (
              <button
                onClick={onOpenProducts}
                title="Åpne Produkter-fanen og juster innkjøpet"
                style={{
                  textAlign: 'left', width: '100%', fontFamily: 'inherit', cursor: 'pointer',
                  background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)',
                  borderRadius: '0.75rem', padding: '0.7rem 0.9rem', fontSize: 13, color: '#fde68a', lineHeight: 1.5,
                }}
              >
                💡 Mye ble kastet — vurder mindre innkjøp eller færre ferskvarer i disken. <span style={{ textDecoration: 'underline' }}>Juster innkjøpet →</span>
              </button>
            )}
            {r.stockoutHappened && (
              <button
                onClick={onOpenProducts}
                title="Åpne Produkter-fanen og bestill inn til i morgen"
                style={{
                  textAlign: 'left', width: '100%', fontFamily: 'inherit', cursor: 'pointer',
                  background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)',
                  borderRadius: '0.75rem', padding: '0.7rem 0.9rem', fontSize: 13, color: '#7dd3fc', lineHeight: 1.5,
                }}
              >
                💡 {getActiveIndustryDefinition().forsyning.utsolgtHint} <span style={{ textDecoration: 'underline' }}>Bestill nå →</span>
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenProducts}
            title="Bestill inn varer til i morgen uten å avslutte dagen"
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 99, padding: '0.8rem 1.6rem', color: '#cbd5e1',
              fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            🥐 Bestill til i morgen
          </button>
          <button
            onClick={() => dispatch({ type: 'START_NEW_DAY' })}
            style={{
              background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none',
              borderRadius: 99, padding: '0.8rem 2.2rem', color: '#fff',
              fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ▶ Start ny dag
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div style={{ background: `${color}0e`, border: `1px solid ${color}33`, borderRadius: '0.75rem', padding: '0.8rem 0.9rem' }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{sub}</div>}
    </div>
  )
}
