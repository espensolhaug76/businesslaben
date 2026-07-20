import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame, turistsesongInfo, aktivBesoksprofil } from '../GameContext'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import { getScenario } from '../sales/scenarios'
import { velgTuristkontorScenario, TURIST_SPRITER } from '../data/reiseliv'
import { dagSeed } from '../data/backgroundSales'
import { TURISTKONTOR_GJEST_CAL, TURISTKONTOR_OCCLUDE_Y } from '../../data/districts'
import Pakkebygger from '../ui/Pakkebygger'

// ── TuristkontorScene (TEMA 15 — ROM, ikke panel) ────────────────────────────
// Turistkontoret er et ROM man går INN i (som kaféens /inne). Fullskjerm
// interiør; eleven står bak disken. En besøkende kommer inn i sesong og stiller
// seg ved disken (sprite = det seedede scenariets kunde); klikk = start møtet.
// Rute: /game/d/:districtId/turistkontor
//   DEL a: scene-skall.  DEL b: besøkende-sprite + klikk→scenario (denne).
//   DEL c: pakkebygger/gjestepakke som UI-lag.  DEL d: e-postforespørsler.

const INTERIOR_IMG = '/assets/raw/turistkontor-interior.png'
const ASPECT = 1296 / 832
const WAIST_FRAC = 0.46   // sprite forankres på livet (samme som kassevyen)

export default function TuristkontorScene({ districtId }: { districtId: string }) {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const sesong = turistsesongInfo(state)
  const igjen = sesong?.aktiv ? Math.max(0, sesong.varighet - sesong.dag + 1) : 0

  // Dagens besøkende: seedet scenario (Språkbarrieren/Opplevelsen), sprite =
  // scenariets egen kunde. Vises i sesong ved scene-innlasting.
  const seed = dagSeed(state.dayNumber, state.currentMonth, state.currentYear)
  const scenarioId = velgTuristkontorScenario(seed, state.opplevByenPameldt)
  const scenario = getScenario(scenarioId)

  const [hover, setHover] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  // UI-lag: pakkebyggeren + gjestepakke-innmelding åpnes fra rom-verktøylinja.
  const [overlay, setOverlay] = useState<'pakke' | 'gjestepakke' | null>(null)
  const profil = aktivBesoksprofil(state)

  // GJEST-VELGER (?dev=1): i dev vises ALLTID en gjest ved disken for
  // kalibrering (ellers har Espen ingen å kalibrere før en sesong er startet).
  // Espen bytter sprite for å sjekke cal mot alle høyder/bredder. I ekte spill
  // (ikke-dev) vises scenariets kunde, kun i sesong.
  const [devGjestIdx, setDevGjestIdx] = useState(0)
  const devGjest = TURIST_SPRITER[((devGjestIdx % TURIST_SPRITER.length) + TURIST_SPRITER.length) % TURIST_SPRITER.length]
  const visGjest = IS_DEV_COORDS ? !!devGjest : (!!sesong?.aktiv && !!scenario)
  const gjestFil = IS_DEV_COORDS ? devGjest?.fil : scenario?.sprite
  const gjestNavn = IS_DEV_COORDS ? devGjest?.navn : scenario?.customerName

  // Kalibrering (dev): livevis fra districts-verdiene, justerbar med ?dev=1-
  // sliders; verdiene logges for innliming i districts.ts.
  const [cal, setCal] = useState(TURISTKONTOR_GJEST_CAL)
  const [occludeY, setOccludeY] = useState(TURISTKONTOR_OCCLUDE_Y)

  function motGjest() {
    if (!scenario) return
    window.dispatchEvent(new CustomEvent('game:openScenario', { detail: { scenarioId } }))
  }

  const sesongTekst = !sesong
    ? 'Ingen turistsesong ennå.'
    : sesong.aktiv
      ? `Turistsesong — dag ${sesong.dag} av ${sesong.varighet} · ${igjen} handledager igjen`
      : 'Turistsesongen er over for denne gang.'

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#10141c', fontFamily: "'Outfit', sans-serif" }}>
      {/* Cover-stage: interiørbildet dekker skjermen. */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: `max(100vw, calc(100vh * ${ASPECT}))`,
        height: `max(100vh, calc(100vw / ${ASPECT}))`,
      }}>
        {/* BAKGRUNN (z=0) */}
        {!imgFailed ? (
          <img
            src={INTERIOR_IMG} alt="Turistkontoret" draggable={false}
            onError={() => setImgFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1c2530,#11161e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 14 }}>
            Turistkontor-interiøret mangler
          </div>
        )}

        {/* BESØKENDE (z=10) — forankret på livet ved disken. */}
        {visGjest && gjestFil && (
          <div
            onClick={motGjest}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title="Snakk med den besøkende"
            style={{
              position: 'absolute', left: `${cal.centerX}%`, top: `${cal.waistY}%`,
              height: `${cal.scale * 100}%`, width: 'auto',
              transform: `translate(-50%, -${WAIST_FRAC * 100}%)`,
              cursor: 'pointer', zIndex: 10,
            }}
          >
            <img
              src={gjestFil} alt={gjestNavn ?? ''} draggable={false}
              onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
              style={{
                height: '100%', width: 'auto', display: 'block', userSelect: 'none',
                filter: hover
                  ? 'drop-shadow(0 0 10px rgba(125,211,252,0.9)) drop-shadow(0 6px 10px rgba(0,0,0,0.45))'
                  : 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))',
                transition: 'filter 0.15s',
              }}
            />
            {hover && (
              <div style={{
                position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -120%)',
                background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(125,211,252,0.5)',
                borderRadius: 8, padding: '0.3rem 0.7rem', color: '#f1f5f9', fontSize: 13,
                fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none',
              }}>💬 Snakk med den besøkende</div>
            )}
          </div>
        )}

        {/* FORGRUNNS-DISK (z=20) — kopi av interiøret klippet til båndet under
            occludeY, re-tegnet over gjestens underkropp (disken er lav → mye
            synlig). */}
        {!imgFailed && (
          <img
            src={INTERIOR_IMG} alt="" aria-hidden draggable={false}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block',
              clipPath: `polygon(0% ${occludeY}%, 100% ${occludeY}%, 100% 100%, 0% 100%)`,
              zIndex: 20, pointerEvents: 'none', userSelect: 'none',
            }}
          />
        )}
      </div>

      {/* Tilbake til stasjonsbydelen */}
      <div style={{ position: 'absolute', top: 64, left: 20, zIndex: 80 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}`)} label="← Stasjonen" />
      </div>

      {/* Sesongstatus — diskret øverst midtstilt */}
      <div style={{ position: 'absolute', top: 66, left: '50%', transform: 'translateX(-50%)', zIndex: 80 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,14,26,0.82)', border: '1px solid rgba(56,189,248,0.35)',
          borderRadius: 99, padding: '0.4rem 1rem', color: '#e2e8f0', fontSize: 13, fontWeight: 700,
        }}>
          <span style={{ fontSize: 15 }}>🧳</span>
          <span>{sesongTekst}</span>
        </div>
      </div>

      {/* ROM-VERKTØYLINJE (UI-lag) — pakkebyggeren + gjestepakke åpnes herfra
          (disken/brosjyrestativet). Bunn midtstilt. */}
      <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 80, display: 'flex', gap: 10 }}>
        {profil && (
          <button onClick={() => setOverlay('pakke')}
            style={{ background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', border: 'none', borderRadius: 99, padding: '0.65rem 1.4rem', color: '#0b1120', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }}>
            🎒 Sett sammen en pakke
          </button>
        )}
        <button onClick={() => setOverlay('gjestepakke')}
          style={{ background: 'rgba(10,14,26,0.9)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: 99, padding: '0.65rem 1.3rem', color: '#e2e8f0', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }}>
          📋 «Opplev byen»-gjestepakken
        </button>
      </div>

      {/* Pakkebygger-overlay (gjenbrukt komponent) */}
      {overlay === 'pakke' && profil && (
        <Pakkebygger profil={profil} onLukk={() => setOverlay(null)} />
      )}

      {/* Gjestepakke-innmelding-overlay */}
      {overlay === 'gjestepakke' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '1.4rem', padding: '1.5rem', maxWidth: 440, width: '100%', color: '#f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 900 }}>📋 «Opplev byen»-gjestepakken</div>
              <button onClick={() => setOverlay(null)} aria-label="Lukk" style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#94a3b8', margin: '0 0 1rem' }}>
              Meld kaféen inn i turistkontorets gjestepakke — gratis. Til gjengjeld
              forventer pakkegjestene at du er et godt vertskap: gir tips om lokale
              opplevelser når de spør. Da kommer flere slike gjester innom.
            </p>
            {state.opplevByenPameldt ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#22c55e' }}>✓ Kaféen er med i gjestepakken</span>
                <button onClick={() => dispatch({ type: 'SET_OPPLEV_BYEN', pameldt: false })}
                  style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '0.35rem 0.9rem', color: '#94a3b8', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Meld ut</button>
              </div>
            ) : (
              <button onClick={() => dispatch({ type: 'SET_OPPLEV_BYEN', pameldt: true })}
                style={{ background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', border: 'none', borderRadius: 99, padding: '0.55rem 1.3rem', color: '#0b1120', fontWeight: 800, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit' }}>Meld kaféen inn</button>
            )}
          </div>
        </div>
      )}

      {/* ?dev=1: kalibrer gjest-sprite + forgrunnslinje. Verdiene logges for
          innliming i districts.ts (TURISTKONTOR_GJEST_CAL / _OCCLUDE_Y). */}
      {IS_DEV_COORDS && (
        <div style={{
          position: 'fixed', top: 64, right: 16, zIndex: 300, width: 210,
          display: 'flex', flexDirection: 'column', gap: 6,
          background: 'rgba(10,14,26,0.94)', border: '1px solid #ffd24a55',
          borderRadius: 12, padding: '10px 12px', color: '#ffd24a', fontSize: 12, fontWeight: 700,
        }}>
          <div>🧭 Gjest-kalibrering</div>
          {/* GJEST-VELGER: bytt sprite for å sjekke cal mot alle høyder/bredder. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '4px 6px' }}>
            <button onClick={() => setDevGjestIdx(i => i - 1)} style={velgerBtn}>‹</button>
            <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: '#cbd5e1', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {devGjest?.navn ?? '—'}
            </div>
            <button onClick={() => setDevGjestIdx(i => i + 1)} style={velgerBtn}>›</button>
          </div>
          <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>{(((devGjestIdx % TURIST_SPRITER.length) + TURIST_SPRITER.length) % TURIST_SPRITER.length) + 1}/{TURIST_SPRITER.length}</div>
          <CalSlider label="scale" value={cal.scale} min={0.2} max={1.5} step={0.01}
            onChange={v => { const n = { ...cal, scale: v }; setCal(n); logCal(n, occludeY) }} />
          <CalSlider label="centerX" value={cal.centerX} min={0} max={100} step={0.5}
            onChange={v => { const n = { ...cal, centerX: v }; setCal(n); logCal(n, occludeY) }} />
          <CalSlider label="waistY" value={cal.waistY} min={0} max={100} step={0.5}
            onChange={v => { const n = { ...cal, waistY: v }; setCal(n); logCal(n, occludeY) }} />
          <CalSlider label="occludeY" value={occludeY} min={0} max={100} step={0.5}
            onChange={v => { setOccludeY(v); logCal(cal, v) }} />
        </div>
      )}
    </div>
  )
}

function logCal(cal: { scale: number; centerX: number; waistY: number }, occludeY: number) {
  // eslint-disable-next-line no-console
  console.log(`[TuristkontorScene] lim inn i districts.ts:\n  TURISTKONTOR_GJEST_CAL = { scale: ${cal.scale}, centerX: ${cal.centerX}, waistY: ${cal.waistY} }\n  TURISTKONTOR_OCCLUDE_Y = ${occludeY}`)
}

const velgerBtn: React.CSSProperties = {
  background: 'rgba(255,210,74,0.14)', color: '#ffd24a', border: '1px solid #ffd24a55',
  borderRadius: 6, width: 24, height: 24, cursor: 'pointer', fontSize: 15, fontWeight: 800,
  lineHeight: 1, fontFamily: 'inherit', flexShrink: 0,
}

function CalSlider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#cbd5e1', fontWeight: 600 }}>
      <span style={{ width: 58 }}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} style={{ flex: 1 }} />
      <span style={{ width: 34, textAlign: 'right', fontFamily: 'monospace', color: '#ffd24a' }}>{value}</span>
    </label>
  )
}
