import { useState } from 'react'
import { useGame } from '../GameContext'
import { GJESTEPAKKE_FORHANDLING, type ForhandlingsValg, type AvtaleSvar } from './gjestepakkeForhandling'

// ─── GjestepakkeOverlay — B2B-forhandling i hotell-lobbyen (Spor C DEL 3) ─────
// Kompakt, SELVSTENDIG forgrenings-dialog (samme mønster som kaféens
// SalesScenarioOverlay, men egen — en hotellavtale-forhandling passer ikke i
// kaféens salgs-/lager-/rykte-motor). Steg → replikk + valg → konsekvens →
// (neste steg | Fullfør). Ved fullføring settes hotellavtalen.
//
// DEFENSIV KOBLING: `SET_HOTELLAVTALE` finnes kun på spor-a/tema-reiseliv (ikke
// merget). På main er dispatchen en no-op (default-case i reduceren returnerer
// uendret state) — forhandlingen spilles helt ut og viser konsekvensen uansett,
// og setter `state.hotellavtale` automatisk når reiseliv merges. Vi caster
// dispatch løst nettopp fordi action-typen ikke finnes i main sitt Action-union.

export default function GjestepakkeOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dispatch } = useGame()
  const [stepId, setStepId] = useState(GJESTEPAKKE_FORHANDLING.steps[0]!.id)
  const [pending, setPending] = useState<ForhandlingsValg | null>(null)

  if (!open) return null
  const step = GJESTEPAKKE_FORHANDLING.steps.find(s => s.id === stepId) ?? GJESTEPAKKE_FORHANDLING.steps[0]!
  const stepIndex = GJESTEPAKKE_FORHANDLING.steps.findIndex(s => s.id === step.id)

  function velg(v: ForhandlingsValg) { setPending(v) }
  function neste() {
    const v = pending; setPending(null)
    if (v?.next) { setStepId(v.next); return }
  }
  function fullfor(svar: AvtaleSvar) {
    // DEFENSIV: sett hotellavtalen (no-op på main, aktiv når reiseliv merges).
    ;(dispatch as unknown as (a: { type: string; svar: AvtaleSvar }) => void)({ type: 'SET_HOTELLAVTALE', svar })
    lukk()
  }
  function lukk() { setStepId(GJESTEPAKKE_FORHANDLING.steps[0]!.id); setPending(null); onClose() }

  return (
    <div
      onPointerDown={e => { if (e.target === e.currentTarget) lukk() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.78)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{
        background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(30px)',
        border: '1px solid rgba(192,132,252,0.25)', borderRadius: '1.75rem',
        width: '100%', maxWidth: 560, maxHeight: 'calc(100vh - 3rem)',
        display: 'flex', flexDirection: 'column', color: '#f1f5f9', overflow: 'hidden',
      }}>
        {/* Header — hotellsjefen */}
        <div style={{ padding: '1.4rem 1.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#c084fc', letterSpacing: '0.1em', marginBottom: 4 }}>🏨 GJESTEPAKKE-FORHANDLINGEN</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{GJESTEPAKKE_FORHANDLING.motpart}</h2>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: '0.35rem 0 0', lineHeight: 1.5, maxWidth: 430 }}>
              {GJESTEPAKKE_FORHANDLING.beskrivelse}
            </p>
          </div>
          <button onClick={lukk} aria-label="Lukk" style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 99, width: 34, height: 34, color: '#94a3b8', cursor: 'pointer', fontSize: 17, flexShrink: 0,
          }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
          <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
            STEG {stepIndex + 1} AV {GJESTEPAKKE_FORHANDLING.steps.length}
          </div>

          {/* Replikk */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0 14px 14px 14px', padding: '0.9rem 1.1rem', marginBottom: '0.4rem',
          }}>
            <div style={{ fontSize: 15, color: '#f1f5f9', lineHeight: 1.5 }}>{step.replikk}</div>
          </div>
          {step.note && <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: '1rem' }}>{step.note}</div>}
          {!step.note && <div style={{ marginBottom: '1rem' }} />}

          {/* Valg, eller konsekvens + neste/fullfør */}
          {!pending ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {step.valg.map(v => (
                <button key={v.id} onClick={() => velg(v)} style={choiceStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,132,252,0.12)'; e.currentTarget.style.borderColor = 'rgba(192,132,252,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}>
                  {v.text}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div style={{
                background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.35)',
                borderRadius: 12, padding: '0.9rem 1.1rem',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#c084fc', letterSpacing: '0.05em', marginBottom: 5 }}>KONSEKVENS</div>
                <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.55 }}>{pending.konsekvens}</div>
              </div>
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                {pending.next ? (
                  <PrimaryBtn label="Videre →" onClick={neste} />
                ) : (
                  <PrimaryBtn label="Fullfør avtalen ✓" onClick={() => fullfor(pending!.utfall ?? 'avslatt')} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const choiceStyle: React.CSSProperties = {
  textAlign: 'left', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12, padding: '0.8rem 1rem', color: '#f1f5f9', fontSize: 14, cursor: 'pointer',
  fontFamily: 'inherit', lineHeight: 1.4, transition: 'background 0.12s, border-color 0.12s',
}

function PrimaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'linear-gradient(135deg,#c084fc,#a855f7)', border: 'none', borderRadius: 99,
      padding: '0.6rem 1.6rem', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
    }}>{label}</button>
  )
}
