import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame, useErTemaAktivt, useTemaNivaa } from '../GameContext'
import Fagord from './Fagord'
import { BALANCE } from '../data/balance'
import {
  BUDSJETT_LINJER, maanedNokkel, faktiskeLinjer, linjeAvvik, avvikTekst,
  planlagtResultat, erStortAvvik, bokfortNokkeltall,
} from '../data/budsjett'

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
  const budsjettAktiv = useErTemaAktivt('budsjett')       // TEMA 2
  const nokkeltallAktiv = useErTemaAktivt('nokkeltall')   // TEMA 3 (kun VG2)
  const nivaa = useTemaNivaa('budsjett') ?? 'vg1'
  const [notater, setNotater] = useState<Record<string, string>>({})   // VG2 avviks-notat (utkast)
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

        {/* ── TEMA 2: Budsjett vs. faktisk (når temaet er aktivt) ── */}
        {budsjettAktiv && (() => {
          const bmnd = state.budsjett.maaneder[maanedNokkel(s.year, s.month)]
          if (!bmnd) {
            // DEL 2e: ingen budsjett satt → vennlig hint, aldri straff.
            return (
              <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '1rem', padding: '0.9rem 1.1rem', marginBottom: '1.5rem', fontSize: 12.5, color: '#7dd3fc', lineHeight: 1.5 }}>
                📊 Ingen budsjett satt for denne måneden ennå — sett opp neste måneds budsjett i Økonomi-fanen, så sammenligner vi når måneden er omme.
              </div>
            )
          }
          const faktisk = faktiskeLinjer(s)
          const planRes = planlagtResultat(bmnd.budsjett)
          const fortegnKr = (n: number) => `${n >= 0 ? '+' : '−'}${formatKr(Math.abs(n))}`
          return (
            <div style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '1rem', padding: '1rem 1.1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.04em', marginBottom: '0.7rem' }}>📊 <Fagord id="ECO_008">BUDSJETT</Fagord> VS. FAKTISK</div>
              {/* Kolonneoverskrifter */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr 0.9fr', gap: 6, fontSize: 10.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.4, paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Linje</span><span style={{ textAlign: 'right' }}>Budsjett</span><span style={{ textAlign: 'right' }}>Faktisk</span>
              </div>
              {BUDSJETT_LINJER.map(l => {
                const b = bmnd.budsjett[l.key]
                const f = faktisk[l.key]
                const av = linjeAvvik(b, f)
                const stort = nivaa === 'vg2' && erStortAvvik(b, f, BALANCE.budsjettAvvikTerskel)
                const notatVerdi = notater[l.key] ?? bmnd.avvikNotater[l.key] ?? ''
                return (
                  <div key={l.key} style={{ paddingTop: 5 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr 0.9fr', gap: 6, fontSize: 12.5, alignItems: 'baseline' }}>
                      <span style={{ color: '#cbd5e1' }}>{l.navn}</span>
                      <span style={{ textAlign: 'right', color: '#94a3b8' }}>{formatKr(b)}</span>
                      <span style={{ textAlign: 'right', color: '#f1f5f9', fontWeight: 700 }}>{formatKr(f)}</span>
                    </div>
                    {/* Avvik: ALLTID fortegn + tekst (aldri farge alene — Espen er fargesvak). */}
                    <div style={{ fontSize: 11, color: av === 0 ? '#64748b' : '#e2c290', marginTop: 1 }}>
                      Avvik: {avvikTekst(av)}
                    </div>
                    {/* VG2: stort avvik → «Hva tror du skjedde?» (vurderingsspor). */}
                    {stort && (
                      <input
                        value={notatVerdi}
                        onChange={e => { setNotater(n => ({ ...n, [l.key]: e.target.value })); dispatch({ type: 'SET_AVVIK_NOTAT', maaned: maanedNokkel(s.year, s.month), linje: l.key, tekst: e.target.value }) }}
                        placeholder={`Hva tror du skjedde med ${l.navn.toLowerCase()}?`}
                        style={{ width: '100%', boxSizing: 'border-box', marginTop: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(226,194,144,0.4)', borderRadius: 6, padding: '0.35rem 0.5rem', color: '#f1f5f9', fontSize: 11.5, fontFamily: 'inherit' }} />
                    )}
                  </div>
                )
              })}
              {/* Planlagt vs. faktisk resultat + én setning uten dom (DEL 3b). */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.7rem', paddingTop: '0.6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12.5 }}>
                <div><div style={{ color: '#64748b', fontSize: 11 }}>Planlagt resultat</div><div style={{ fontWeight: 800, color: '#94a3b8' }}>{fortegnKr(planRes)}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ color: '#64748b', fontSize: 11 }}>Faktisk resultat</div><div style={{ fontWeight: 800, color: '#f1f5f9' }}>{fortegnKr(s.resultat)}</div></div>
              </div>
              <div style={{ fontSize: 12.5, color: '#cbd5e1', marginTop: '0.6rem', lineHeight: 1.5 }}>
                Du planla {fortegnKr(planRes)}, det ble {fortegnKr(s.resultat)}.
              </div>
            </div>
          )
        })()}

        {/* ── TEMA 3 (VG2): dine nøkkeltall vs. bokført (grønn/rød ETTERPÅ) ── */}
        {nokkeltallAktiv && (() => {
          const ditt = state.nokkeltall[maanedNokkel(s.year, s.month)]
          if (!ditt) return null   // ikke besvart denne måneden → ingen sammenligning, ingen straff
          const bok = bokfortNokkeltall(s)
          const rader = [
            { navn: 'Bruttofortjeneste', ditt: ditt.bruttofortjeneste, bok: bok.bruttofortjeneste, enhet: 'kr' as const },
            { navn: 'Dekningsgrad', ditt: ditt.dekningsgrad, bok: bok.dekningsgrad, enhet: '%' as const },
            { navn: 'Resultatgrad', ditt: ditt.resultatgrad, bok: bok.resultatgrad, enhet: '%' as const },
          ]
          const visTall = (n: number, enhet: 'kr' | '%') => enhet === 'kr' ? formatKr(n) : `${n.toFixed(1)} %`
          const visAvvik = (a: number, enhet: 'kr' | '%') => {
            if (Math.abs(a) < (enhet === 'kr' ? 1 : 0.05)) return 'likt bokført'
            const teg = a > 0 ? '+' : '−'
            return enhet === 'kr' ? `${teg}${formatKr(Math.abs(a))} vs. bokført` : `${teg}${Math.abs(a).toFixed(1)} prosentpoeng vs. bokført`
          }
          return (
            <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '1rem', padding: '1rem 1.1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24', letterSpacing: '0.04em', marginBottom: '0.6rem' }}>🔢 DINE NØKKELTALL VS. BOKFØRT</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr 0.9fr', gap: 6, fontSize: 10.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.4, paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Nøkkeltall</span><span style={{ textAlign: 'right' }}>Ditt tall</span><span style={{ textAlign: 'right' }}>Bokført</span>
              </div>
              {rader.map(r => (
                <div key={r.navn} style={{ paddingTop: 5 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr 0.9fr', gap: 6, fontSize: 12.5, alignItems: 'baseline' }}>
                    <span style={{ color: '#cbd5e1' }}>{r.navn}</span>
                    <span style={{ textAlign: 'right', color: '#f1f5f9', fontWeight: 700 }}>{visTall(r.ditt, r.enhet)}</span>
                    <span style={{ textAlign: 'right', color: '#94a3b8' }}>{visTall(r.bok, r.enhet)}</span>
                  </div>
                  {/* Avvik med fortegn + tekst, aldri farge alene. */}
                  <div style={{ fontSize: 11, color: Math.abs(r.ditt - r.bok) < (r.enhet === 'kr' ? 1 : 0.05) ? '#64748b' : '#e2c290', marginTop: 1 }}>
                    {visAvvik(r.ditt - r.bok, r.enhet)}
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: '0.7rem', lineHeight: 1.5 }}>
                Er det sprik? Da er spørsmålet HVILKE tall du regnet med — brukte du hele månedens omsetning, eller bare de første dagene?
              </div>
            </div>
          )
        })()}

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
