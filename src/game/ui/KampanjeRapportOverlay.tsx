import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame, useTemaNivaa } from '../GameContext'
import Fagord from './Fagord'
import { kanalById } from '../data/kampanje'

// ─── TEMA 8 · EFFEKTRAPPORT (vises ved kampanjeslutt) ────────────────────────
// Samme mønster som månedsoppgjørets budsjettkolonner: mål vs faktisk, kostnad
// vs merinntekt — fortegn + tekst, ALDRI farge alene, ingen dom. VG2: ROI som
// elevoppgave (ditt tall vs bokført ETTERPÅ) + A/B-sammenligning av to kampanjer.

function kr(n: number) { return `${Math.round(n).toLocaleString('nb-NO')} kr` }
function pst(n: number) { return `${n >= 0 ? '+' : '−'}${Math.abs(Math.round(n))} %` }

export default function KampanjeRapportOverlay() {
  const { state, dispatch } = useGame()
  const nivaa = useTemaNivaa('kampanje') ?? 'vg1'
  const [roiSvar, setRoiSvar] = useState('')
  const id = state.kampanje.visRapportFor
  const r = state.kampanje.historikk.find(h => h.id === id)
  if (!id || !r) return null

  const forrige = state.kampanje.historikk.filter(h => h.id !== r.id).slice(-1)[0]
  const maalOrd = r.maalType === 'kunder' ? 'antall kunder' : 'salget'
  const kanalNavn = (ks: typeof r.kanaler) => ks.map(k => kanalById(k.kanalId)?.navn ?? k.kanalId).join(', ')

  const kort: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '0.9rem 1.1rem', marginBottom: '0.9rem' }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, zIndex: 262, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", overflowY: 'auto', padding: '2rem' }}>
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 22 }}
        style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(168,85,247,0.35)', borderRadius: '2rem', padding: '2rem', maxWidth: 480, width: '100%', color: '#f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.3rem' }}>
          <div style={{ fontSize: 40 }}>📣</div>
          <h1 style={{ fontSize: 21, fontWeight: 900, margin: '0.3rem 0 0.15rem' }}>Kampanjerapport</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>{r.varighet} dager · {kanalNavn(r.kanaler)}</p>
        </div>

        {/* a) Mål vs faktisk */}
        <div style={kort}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#94a3b8' }}>Ditt mål</span>
            <span style={{ fontWeight: 800 }}>+{r.maalProsent} % {maalOrd}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 4 }}>
            <span style={{ color: '#94a3b8' }}>Faktisk løft</span>
            <span style={{ fontWeight: 800, color: '#f1f5f9' }}>{pst(r.faktiskProsent)} flere kunder</span>
          </div>
          <div style={{ fontSize: 12.5, color: '#cbd5e1', marginTop: 8, lineHeight: 1.5 }}>
            Du satte mål om +{r.maalProsent} %, kampanjen ga {pst(r.faktiskProsent)}.
          </div>
        </div>

        {/* b) Kostnad vs merinntekt (uten dom) */}
        <div style={kort}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#94a3b8' }}>Kampanjekostnad</span><span style={{ fontWeight: 700, color: '#f97316' }}>−{kr(r.kostnad)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 4 }}>
            <span style={{ color: '#94a3b8' }}>Estimert merinntekt</span><span style={{ fontWeight: 700, color: '#22c55e' }}>+{kr(r.merinntekt)}</span>
          </div>
        </div>

        {/* c) VG2: ROI som elevoppgave */}
        {nivaa === 'vg2' && (
          <div style={{ ...kort, borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.06)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>🔢 REGN UT <Fagord id="ECO_034">ROI</Fagord> SELV (VG2)</div>
            <div style={{ fontSize: 11.5, color: '#94a3b8', fontFamily: 'monospace', marginBottom: 8 }}>
              ROI = (Merinntekt − Kostnad) / Kostnad × 100 = ({kr(r.merinntekt)} − {kr(r.kostnad)}) / {kr(r.kostnad)} × 100
            </div>
            {r.roiElevSvar === undefined ? (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input type="number" inputMode="decimal" value={roiSvar} placeholder="ROI %"
                  onChange={e => setRoiSvar(e.target.value)}
                  style={{ width: 110, boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.4rem 0.5rem', color: '#f1f5f9', fontSize: 13, fontFamily: 'inherit', textAlign: 'right' }} />
                <button onClick={() => dispatch({ type: 'SET_KAMPANJE_ROI_SVAR', id: r.id, svar: parseFloat(roiSvar) || 0 })}
                  disabled={roiSvar === ''}
                  style={{ background: roiSvar !== '' ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 99, padding: '0.4rem 1.1rem', color: roiSvar !== '' ? '#fff' : '#475569', fontWeight: 800, fontSize: 13, cursor: roiSvar !== '' ? 'pointer' : 'default', fontFamily: 'inherit' }}>
                  Lagre svar
                </button>
              </div>
            ) : (
              <div style={{ fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Ditt tall</span><span style={{ fontWeight: 800 }}>{pst(r.roiElevSvar)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}><span style={{ color: '#94a3b8' }}>Bokført ROI</span><span style={{ fontWeight: 800 }}>{pst(r.roi)}</span></div>
                <div style={{ fontSize: 11.5, color: Math.abs(r.roiElevSvar - r.roi) < 1 ? '#64748b' : '#e2c290', marginTop: 4 }}>
                  {Math.abs(r.roiElevSvar - r.roi) < 1 ? 'likt bokført' : `${pst(r.roiElevSvar - r.roi)}poeng vs. bokført — hvilke tall brukte du?`}
                </div>
              </div>
            )}
          </div>
        )}

        {/* d) VG2: A/B — sammenlign med forrige kampanje */}
        {nivaa === 'vg2' && forrige && (
          <div style={kort}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>A/B — mot forrige kampanje</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.95fr 0.95fr', gap: 6, fontSize: 11.5 }}>
              <span style={{ color: '#64748b' }} />
              <span style={{ color: '#64748b', textAlign: 'right', fontWeight: 700 }}>Denne</span>
              <span style={{ color: '#64748b', textAlign: 'right', fontWeight: 700 }}>Forrige</span>
              <span style={{ color: '#94a3b8' }}>Kanal</span>
              <span style={{ textAlign: 'right', color: '#cbd5e1' }}>{kanalNavn(r.kanaler)}</span>
              <span style={{ textAlign: 'right', color: '#94a3b8' }}>{kanalNavn(forrige.kanaler)}</span>
              <span style={{ color: '#94a3b8' }}>Kostnad</span>
              <span style={{ textAlign: 'right', color: '#cbd5e1' }}>{kr(r.kostnad)}</span>
              <span style={{ textAlign: 'right', color: '#94a3b8' }}>{kr(forrige.kostnad)}</span>
              <span style={{ color: '#94a3b8' }}>Måloppnåelse</span>
              <span style={{ textAlign: 'right', color: '#cbd5e1' }}>{pst(r.faktiskProsent)} / +{r.maalProsent} %</span>
              <span style={{ textAlign: 'right', color: '#94a3b8' }}>{pst(forrige.faktiskProsent)} / +{forrige.maalProsent} %</span>
            </div>
            <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 8, lineHeight: 1.5 }}>
              Hvilken kanal traff målgruppa best — og hvordan VET du det?
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '0.4rem' }}>
          <button onClick={() => dispatch({ type: 'DISMISS_KAMPANJE_RAPPORT' })}
            style={{ background: 'linear-gradient(135deg,#a855f7,#7c3aed)', border: 'none', borderRadius: 99, padding: '0.75rem 2.2rem', color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
            Videre →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
