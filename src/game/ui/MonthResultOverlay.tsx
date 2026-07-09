import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import Fagord from './Fagord'

// ─── MÅNEDSOPPGJØR (ØKONOMI-SAMLING DEL 2) ────────────────────────────────────
// Vises når state.lastMonthSettlement er satt (bygget ved månedsrull i
// START_NEW_DAY). Viser månedens INNTEKT (sum av dagsresultater = salg −
// varekost − svinn), de FASTE KOSTNADENE som ble trukket fra kassa, og
// MÅNEDSRESULTATET. Selvstyrt som DayResultOverlay: leser state, gates internt.
// «Videre» dispatcher DISMISS_MONTH_SETTLEMENT. Dette er IKKE den gamle
// PEST-måneds-simuleringen (SimulationModal/APPLY_MONTH_RESULT) — den er urørt.

const MONTH_NAMES = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

function formatKr(n: number) { return `${Math.round(n).toLocaleString('nb-NO')} kr` }

export default function MonthResultOverlay() {
  const { state, dispatch } = useGame()
  const s = state.lastMonthSettlement
  if (!s) return null

  const resultColor = s.resultat >= 0 ? '#22c55e' : '#ef4444'

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 262, background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", overflowY: 'auto', padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22 }}
        style={{
          background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '2rem', padding: '2.25rem', maxWidth: 460, width: '100%', color: '#f1f5f9',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 44 }}>📅</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0.4rem 0 0.15rem' }}>Månedsoppgjør</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            {MONTH_NAMES[s.month - 1]} · År {s.year} · {s.antallDager} handledager
          </p>
        </div>

        {/* Inntekt fra dagene */}
        <div style={{
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: '1rem', padding: '0.9rem 1.1rem', marginBottom: '0.75rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>OPPTJENT I DAGENE</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>salg − varekost − svinn, alle dager</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: s.inntekt >= 0 ? '#22c55e' : '#ef4444' }}>
            {s.inntekt >= 0 ? '+' : ''}{formatKr(s.inntekt)}
          </div>
        </div>

        {/* Faste kostnader — nedbrytning */}
        <div style={{
          background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.25)',
          borderRadius: '1rem', padding: '0.9rem 1.1rem', marginBottom: '1.1rem',
        }}>
          <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}><Fagord id="ECO_007">FASTE KOSTNADER</Fagord> (trukket fra kassa)</div>
          {s.kostnadslinjer.map(k => (
            <div key={k.navn} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.25rem' }}>
              <span style={{ color: '#94a3b8' }}>{k.navn}</span>
              <span style={{ color: '#f97316' }}>−{formatKr(k.belop)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.4rem', paddingTop: '0.4rem', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
            <span>Sum faste</span>
            <span style={{ color: '#f97316' }}>−{formatKr(s.fasteKostnader)}</span>
          </div>
        </div>

        {/* LÅNEAVDRAG — vises kun når det finnes lån. Rente/avdrag skilt. */}
        {(s.laanRenter + s.laanAvdrag) > 0 && (
          <div style={{
            background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.25)',
            borderRadius: '1rem', padding: '0.9rem 1.1rem', marginBottom: '1.1rem',
          }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>LÅNEAVDRAG (trukket fra kassa)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.25rem' }}>
              <span style={{ color: '#94a3b8' }}><Fagord id="ECO_021">Renter</Fagord></span>
              <span style={{ color: '#f97316' }}>−{formatKr(s.laanRenter)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.25rem' }}>
              <span style={{ color: '#94a3b8' }}><Fagord id="ECO_029">Avdrag</Fagord> (nedbetaling)</span>
              <span style={{ color: '#f97316' }}>−{formatKr(s.laanAvdrag)}</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.4rem', paddingTop: '0.4rem', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
              <span>Sum lån</span>
              <span style={{ color: '#f97316' }}>−{formatKr(s.laanRenter + s.laanAvdrag)}</span>
            </div>
          </div>
        )}

        {/* Månedsresultat */}
        <div style={{
          background: `${resultColor}12`, border: `1px solid ${resultColor}44`,
          borderRadius: '1rem', padding: '1rem 1.1rem', marginBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}><Fagord id="ECO_010">MÅNEDSRESULTAT</Fagord></div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
              {formatKr(s.inntekt)} − {formatKr(s.fasteKostnader)}{(s.laanRenter + s.laanAvdrag) > 0 ? ` − ${formatKr(s.laanRenter + s.laanAvdrag)} lån` : ''}
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: resultColor }}>
            {s.resultat >= 0 ? '+' : ''}{formatKr(s.resultat)}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => dispatch({ type: 'DISMISS_MONTH_SETTLEMENT' })}
            style={{
              background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none',
              borderRadius: 99, padding: '0.8rem 2.4rem', color: '#fff',
              fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Videre →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
