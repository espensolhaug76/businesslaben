import { useState } from 'react'
import { useGame, useTemaNivaa } from '../GameContext'
import Fagord from './Fagord'
import { IS_DEV_COORDS } from '../city/DevCoordHelper'
import {
  BEREDSKAPSPLAN, PLAN_REFLEKSJON_VG2, NIVAA_VALG, HUB_LENKER, BRANNALARM,
  type RisikoRad, type Sannsynlighet,
} from '../data/beredskap'

// ─── TEMA 1: HMS-FANE (Beredskap og risiko) ──────────────────────────────────
// Vises KUN når temaet er aktivt (gaten ligger i DashboardOverlay). Nivå styrer
// VG1/VG2-forskjeller. Prinsipp: refleksjon, ALDRI fasit — ingen retting, ingen
// poeng for «riktig». Fagord (DEL 2) på beredskapsplan/risikovurdering/evakuering.

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem',
}
const felt: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.5rem 0.7rem',
  color: '#f1f5f9', fontSize: 13, fontFamily: 'inherit', resize: 'vertical',
}

export default function HmsTab() {
  const { state, dispatch } = useGame()
  const nivaa = useTemaNivaa('beredskap') ?? 'vg1'
  const b = state.beredskap
  const handtert = (b.brannalarmUtfall?.rekkefolge.length ?? 0) > 0
  const harTillegg = Object.values(b.planTillegg).some(t => t.trim() !== '')
  const kanBekrefte = nivaa === 'vg1' || harTillegg   // VG2 krever minst ett eget tillegg
  const [evalQ, setEvalQ] = useState<[string, string]>(() => [b.brannovelseEval?.q0 ?? '', b.brannovelseEval?.q1 ?? ''])

  function setRad(i: number, patch: Partial<RisikoRad>) {
    dispatch({ type: 'SET_RISIKO_RADER', rader: b.risikoRader.map((r, j) => j === i ? { ...r, ...patch } : r) })
  }
  function leggTilRad() {
    dispatch({ type: 'SET_RISIKO_RADER', rader: [...b.risikoRader, { id: `egen_${Date.now()}`, fare: '', sannsynlighet: 'lav', konsekvens: 'lav', tiltak: '', egen: true }] })
  }
  function slettRad(i: number) {
    dispatch({ type: 'SET_RISIKO_RADER', rader: b.risikoRader.filter((_, j) => j !== i) })
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>🦺 Beredskap og risiko</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.3rem 0 0' }}>
          Ingen fasit her — les, tenk gjennom din butikk, og vær forberedt. Nivå: <strong style={{ color: '#38bdf8' }}>{nivaa.toUpperCase()}</strong>
        </p>
      </div>

      {/* ── DEL 1a: BEREDSKAPSPLAN ── */}
      <div style={card}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: '0.3rem' }}>📋 <Fagord id="RST_003">Beredskapsplan</Fagord> for butikken</div>
        <p style={{ color: '#94a3b8', fontSize: 12.5, margin: '0 0 0.9rem' }}>
          En enkel, ferdig plan for det uventede. Les den, så du vet hva du gjør når det haster.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {BEREDSKAPSPLAN.map(sek => (
            <div key={sek.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.7rem 0.9rem' }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6 }}>{sek.ikon} {sek.tittel}</div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbd5e1', fontSize: 12.5, lineHeight: 1.7 }}>
                {sek.punkter.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              {/* Elevens eget bidrag (valgfritt VG1, VG2 krever minst ett). */}
              <textarea
                rows={1} style={{ ...felt, marginTop: 8, fontSize: 12 }}
                value={b.planTillegg[sek.id] ?? ''}
                onChange={e => dispatch({ type: 'SET_PLAN_TILLEGG', seksjon: sek.id, verdi: e.target.value })}
                placeholder={`✍️ Ditt tillegg for DIN butikk (${sek.tittel.toLowerCase()}) …`}
              />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11.5, color: '#64748b', margin: '0.8rem 0 0.6rem' }}>
          «Evakuere» betyr å få folk trygt ut — se <Fagord id="RST_004">evakuering</Fagord>.
        </p>

        {/* Bekreft — VG2 krever minst ett eget tillegg. */}
        {b.planBekreftet ? (
          <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}>
            ✓ Du har bekreftet at du kjenner planen.
          </div>
        ) : (
          <>
            <button
              onClick={() => dispatch({ type: 'CONFIRM_BEREDSKAP_PLAN' })}
              disabled={!kanBekrefte}
              title={kanBekrefte ? undefined : 'Legg til minst ett eget punkt for din butikk først'}
              style={{ background: kanBekrefte ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 99, padding: '0.6rem 1.4rem', color: kanBekrefte ? '#fff' : '#475569', fontWeight: 800, fontSize: 14, cursor: kanBekrefte ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}
            >
              Jeg kjenner planen ✓
            </button>
            {nivaa === 'vg2' && !kanBekrefte && (
              <div style={{ fontSize: 11.5, color: '#facc15', marginTop: 6 }}>VG2: skriv minst ett eget tillegg over før du bekrefter.</div>
            )}
          </>
        )}

        {/* VG2: refleksjon */}
        {nivaa === 'vg2' && (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {PLAN_REFLEKSJON_VG2.map(rf => (
              <div key={rf.felt}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#cbd5e1', marginBottom: 4 }}>{rf.sporsmal}</label>
                <textarea
                  rows={2} style={felt}
                  value={b.planRefleksjon[rf.felt]}
                  onChange={e => dispatch({ type: 'SET_BEREDSKAP_REFLEKSJON', felt: rf.felt, verdi: e.target.value })}
                  placeholder="Skriv noen setninger …"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── DEL 1b: RISIKOSKJEMA ── */}
      <div style={card}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: '0.3rem' }}>⚠️ <Fagord id="RST_002">Risikovurdering</Fagord></div>
        <p style={{ color: '#94a3b8', fontSize: 12.5, margin: '0 0 0.9rem' }}>
          Hvor sannsynlig er hver fare, og hvor alvorlig blir den? Skriv ditt eget tiltak. Ingen retting — bare din vurdering.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {b.risikoRader.map((r, i) => (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr 1.6fr auto', gap: 8, alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, padding: '0.5rem 0.6rem' }}>
              {r.egen
                ? <input value={r.fare} onChange={e => setRad(i, { fare: e.target.value })} placeholder="Fare" style={{ ...felt, padding: '0.35rem 0.5rem' }} />
                : <span style={{ fontSize: 12.5, fontWeight: 700 }}>{r.fare}</span>}
              <Velger label="sannsynlighet" value={r.sannsynlighet} onChange={v => setRad(i, { sannsynlighet: v })} />
              <Velger label="konsekvens" value={r.konsekvens} onChange={v => setRad(i, { konsekvens: v })} />
              <input value={r.tiltak} onChange={e => setRad(i, { tiltak: e.target.value })} placeholder="Tiltak …" style={{ ...felt, padding: '0.35rem 0.5rem' }} />
              {r.egen
                ? <button onClick={() => slettRad(i)} title="Slett rad" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 15 }}>✕</button>
                : <span style={{ width: 15 }} />}
            </div>
          ))}
        </div>
        {nivaa === 'vg2' && (
          <button onClick={leggTilRad} style={{ marginTop: 10, background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 8, padding: '0.4rem 0.9rem', color: '#38bdf8', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Legg til egen rad
          </button>
        )}
        {/* Lagre vurdering + kvittering (driver mentor-flyten videre). */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => dispatch({ type: 'LAGRE_RISIKO' })}
            style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.55rem 1.3rem', color: '#fff', fontWeight: 800, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit' }}>
            Lagre vurdering
          </button>
          {b.risikoLagret && <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>✓ Lagret</span>}
        </div>
      </div>

      {/* ── DEL 3: BRANNØVELSE / brannalarm ── */}
      <div style={card}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: '0.3rem' }}>🔥 Brannøvelse</div>
        {!handtert ? (
          <>
            <p style={{ color: '#94a3b8', fontSize: 12.5, margin: '0 0 0.7rem' }}>
              I løpet av en åpen dag kan brannalarmen gå. Da dukker den opp i 📬 Innboks — håndter den etter planen.
              {!b.planBekreftet && ' (Bekreft planen over først.)'}
            </p>
            {IS_DEV_COORDS && (
              <button
                onClick={() => dispatch({ type: 'TRIGGER_BRANNALARM' })}
                disabled={state.dayPhase !== 'åpen' || !b.planBekreftet}
                title={state.dayPhase !== 'åpen' ? 'Åpne butikken først' : !b.planBekreftet ? 'Bekreft planen først' : undefined}
                style={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.5)', borderRadius: 8, padding: '0.45rem 0.9rem', color: '#fca5a5', fontSize: 12.5, fontWeight: 700, cursor: (state.dayPhase === 'åpen' && b.planBekreftet) ? 'pointer' : 'not-allowed', fontFamily: 'inherit', opacity: (state.dayPhase === 'åpen' && b.planBekreftet) ? 1 : 0.5 }}
              >
                🔔 Utløs brannalarm (dev)
              </button>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>
              Du håndterte brannalarmen ({b.brannalarmUtfall!.kvalitet === 'good' ? '✓ trygg evakuering' : '✗ det skar seg'}).
            </div>
            {/* VG2: evaluer øvelsen */}
            {nivaa === 'vg2' && (
              b.brannovelseEval ? (
                <div style={{ fontSize: 12.5, color: '#22c55e', fontWeight: 700, marginTop: 8 }}>✓ Evaluering lagret.</div>
              ) : (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#cbd5e1' }}>Evaluer øvelsen:</div>
                  {BRANNALARM.evalSporsmal.map((sp, i) => (
                    <div key={i}>
                      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 3 }}>{sp}</label>
                      <textarea rows={2} style={felt} value={evalQ[i]} onChange={e => setEvalQ(q => (i === 0 ? [e.target.value, q[1]] : [q[0], e.target.value]))} />
                    </div>
                  ))}
                  <button onClick={() => dispatch({ type: 'SET_BRANNOVELSE_EVAL', q0: evalQ[0], q1: evalQ[1] })}
                    style={{ alignSelf: 'flex-start', background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.45rem 1.1rem', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Lagre evaluering
                  </button>
                </div>
              )
            )}
          </>
        )}
      </div>

      {/* ── DEL 5: HUB-KOBLING ── */}
      {/* KRITISK: læringshuben åpnes ALLTID i NY fane (target=_blank + noopener) —
          eleven skal aldri navigeres ut av spillet og miste spilltilstanden. */}
      <div style={{ ...card, marginBottom: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: '0.6rem' }}>📚 Lær mer</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {HUB_LENKER[nivaa].map(l => (
            <a key={l.rute} href={l.rute} target="_blank" rel="noopener noreferrer"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '0.45rem 0.9rem', color: '#c084fc', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', display: 'inline-block' }}>
              📚 {l.navn} ↗
            </a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#64748b', margin: '0.55rem 0 0' }}>Åpnes i ny fane — spillet ditt står trygt her.</p>
      </div>
    </div>
  )
}

function Velger({ label, value, onChange }: { label: string; value: Sannsynlighet; onChange: (v: Sannsynlighet) => void }) {
  return (
    <select aria-label={label} value={value} onChange={e => onChange(e.target.value as Sannsynlighet)}
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.35rem 0.4rem', color: '#f1f5f9', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer' }}>
      {NIVAA_VALG.map(o => <option key={o.verdi} value={o.verdi} style={{ background: '#0c111d' }}>{o.label}</option>)}
    </select>
  )
}
