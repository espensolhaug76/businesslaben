import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import { useGame } from '../GameContext'
import { erTuristsesong, velgAmbientTurister, lobbySeed } from './lobbyAmbient'

// ── LobbyView — Byhotellets lobby (B2B-møtescene) ────────────────────────────
// Spor C DEL 2. Bygget etter kaféens KASSEVY-MØNSTER (InteriorView): cover-stage
// med lobby-bildet, en HOTELLSJEF-sprite forankret på et MØTEPUNKT bak
// resepsjonsdisken, og et FORGRUNNS-DISK-LAG (samme bilde klippet til båndet
// under OCCLUDE-linja) som okkluderer underkroppen.
//
// FORSKJELL fra kaféen (Espens føring, DEL 1): resepsjonsdisken er LAV
// (overkant ~72 % av bildehøyden). OCCLUDE-linja traces langs diskens overkant,
// og hotellsjefen skal være synlig fra ca. LÅRENE og opp (mer synlig enn
// kaféens kundemodell) → forankringen (THIGH_FRAC) sitter lavere på spriten enn
// kaféens WAIST_FRAC.
//
// IKKE en drivbar bransje — en frittstående møtescene (bransje 4 kommer senere
// via autonom-pipelinen). DEL 3 legger til hotellsjef-sprite + Gjestepakke-
// scenarioet (kobles DEFENSIVT til hotellavtale-state når reiseliv merges).
//
// ?dev=1: kalibreringspanel (slidere) — Espen drar disk-kanten + hotellsjefen på
// plass; verdiene logges til konsollen for permanent låsing i konstantene under.

const LOBBY_IMG = '/assets/raw/hotell-lobby-pilot-1.png'
const SCENE_W = 1376
const SCENE_H = 768
const ASPECT = SCENE_W / SCENE_H

// Hotellsjef-sprite (DEL 3, NB-generert). Finnes den ikke ennå vises en nøytral
// voksen-silhuett (samme diskrete fallback som kaféens kunde-sprite).
const SJEF_SPRITE = '/assets/raw/hotellsjef.png'

// ── Start-verdier (førstepasning via skjermbilde-løkka — Espen LÅSER i ?dev=1) ─
/** Diskens overkant i % av stage-høyden ved venstre/høyre kant — to punkter
 *  (disken kan være svakt i perspektiv). Forgrunns-laget viser KUN alt under den
 *  rette linja mellom punktene (clip-path polygon). Disken er LAV (~72 %). */
const DEFAULT_OCCLUDE_Y_LEFT = 72
const DEFAULT_OCCLUDE_Y_RIGHT = 72
/** Hotellsjefens senter-x i % av stage-bredden (møtepunkt bak disken). */
const DEFAULT_CENTER_X = 50
/** Møtepunktets y i % (der forankringslinja — lårene — møter diskkanten). */
const DEFAULT_ANCHOR_Y = 72
/** Sprite-høyde som andel av stage-høyden. */
const DEFAULT_SCALE = 0.88
/** Hvor på spriten forankringen sitter (andel fra toppen). LÅR (≈ 0,66) — så
 *  hotellsjefen er synlig fra lårene og opp, resten skjules bak disken. */
const THIGH_FRAC = 0.66

const LS_KEY = 'lobby-cal-utkast-v1'

// AMBIENT-GJESTER (Espens krav): faste «slots» ved peisen/lenestolene (høyre
// side). Turistene her okkluderes av resepsjonsdisken (samme lag som
// hotellsjefen) — de mingler i loungen BAK disken. Rolige/statiske; hvilke
// turister som fyller slotene roterer seedet per dag (velgAmbientTurister).
// Grov førstepasning — Espen finpusser i ?dev=1 (slot-verdiene her).
const GJEST_SLOTS = [
  { x: 60, anchorY: 70, scale: 0.46, thigh: 0.60 }, // ved peis / venstre lenestol
  { x: 87, anchorY: 71, scale: 0.48, thigh: 0.60 }, // ved høyre lenestoler
]

export default function LobbyView({ districtId }: { districtId: string }) {
  const navigate = useNavigate()
  const { state } = useGame()
  const [imgFailed, setImgFailed] = useState(false)
  const [sjefFailed, setSjefFailed] = useState(false)
  const [hover, setHover] = useState(false)
  // Ambient-gjester vises i turistsesong. ?dev=1: tving dem frem for kalibrering
  // (på main finnes verken sesong-state eller turist-sprites — se lobbyAmbient.ts).
  const [devGuests, setDevGuests] = useState(false)
  const [gjestFeil, setGjestFeil] = useState<Record<string, boolean>>({})
  const visGjester = erTuristsesong(state) || (IS_DEV_COORDS && devGuests)
  const gjester = visGjester ? velgAmbientTurister(lobbySeed(state), GJEST_SLOTS.length) : []

  // Live-kalibrerbare konstanter (slidere ved ?dev=1). Init fra localStorage-
  // utkast så kalibrering overlever reload (samme mønster som InteriorView).
  const draft = (() => {
    try { return IS_DEV_COORDS ? JSON.parse(localStorage.getItem(LS_KEY) || '{}') : {} } catch { return {} }
  })()
  const [occludeYLeft, setOccludeYLeft] = useState(draft.occludeYLeft ?? DEFAULT_OCCLUDE_Y_LEFT)
  const [occludeYRight, setOccludeYRight] = useState(draft.occludeYRight ?? DEFAULT_OCCLUDE_Y_RIGHT)
  const [centerX, setCenterX] = useState(draft.centerX ?? DEFAULT_CENTER_X)
  const [anchorY, setAnchorY] = useState(draft.anchorY ?? DEFAULT_ANCHOR_Y)
  const [scale, setScale] = useState(draft.scale ?? DEFAULT_SCALE)

  useEffect(() => {
    if (!IS_DEV_COORDS) return
    try { localStorage.setItem(LS_KEY, JSON.stringify({ occludeYLeft, occludeYRight, centerX, anchorY, scale })) } catch { /* ignore */ }
  }, [occludeYLeft, occludeYRight, centerX, anchorY, scale])

  function logCal(next: Partial<Record<string, number>> = {}) {
    const v = { LOBBY_OCCLUDE_Y_LEFT: occludeYLeft, LOBBY_OCCLUDE_Y_RIGHT: occludeYRight, LOBBY_CENTER_X: centerX, LOBBY_ANCHOR_Y: anchorY, LOBBY_SCALE: scale, ...next }
    // eslint-disable-next-line no-console
    console.log('%c[LobbyView] lobby-konstanter (lim inn i LobbyView.tsx):', 'color:#c084fc;font-weight:bold', v)
  }
  function upd(setter: (n: number) => void, key: string, v: number) { setter(v); logCal({ [key]: v }) }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#10141c', fontFamily: "'Outfit', sans-serif" }}>
      {/* Tilbake til stasjonsbydelen */}
      <div style={{ position: 'fixed', top: 64, left: 20, zIndex: 80 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}`)} label="← Ut til stasjonsområdet" />
      </div>

      {/* Cover-stage: lobby-bildet dekker skjermen; sprite + forgrunns-disk +
          tracer overlegges, så prosent-koordinatene treffer direkte. */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: `max(100vw, calc(100vh * ${ASPECT}))`,
        height: `max(100vh, calc(100vw / ${ASPECT}))`,
      }}>
        {/* BAKGRUNN (z=0) */}
        {!imgFailed ? (
          <img src={LOBBY_IMG} alt="Hotell-lobby" draggable={false} onError={() => setImgFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', userSelect: 'none' }} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#241a12,#12100c)',
            border: '1px dashed rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>Lobby-bilde mangler<br />({LOBBY_IMG})</div>
        )}

        {/* HOTELLSJEF (z=10) — forankret på lårlinja bak disken. Underkroppen
            strekker seg under OCCLUDE-linja og skjules av forgrunns-laget.
            Klikk starter møtescenarioet (DEL 3 — wires når scenarioet finnes). */}
        <div
          onClick={() => window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: 'gjestepakke-forhandlingen' } }))}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title="Snakk med hotellsjefen"
          style={{
            position: 'absolute', left: `${centerX}%`, top: `${anchorY}%`,
            height: `${scale * 100}%`, width: 'auto',
            transform: `translate(-50%, -${THIGH_FRAC * 100}%)`,
            cursor: 'pointer', zIndex: 10,
          }}
        >
          {!sjefFailed ? (
            <img src={SJEF_SPRITE} alt="Hotellsjef" draggable={false} onError={() => setSjefFailed(true)}
              style={{
                height: '100%', width: 'auto', display: 'block', userSelect: 'none',
                filter: hover ? 'drop-shadow(0 0 10px rgba(192,132,252,0.9)) drop-shadow(0 6px 10px rgba(0,0,0,0.5))' : 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))',
                transition: 'filter 0.15s',
              }} />
          ) : (
            // Nøytral voksen-silhuett til hotellsjef-spriten er generert (DEL 3).
            <div aria-label="Hotellsjef (sprite ikke generert ennå)"
              style={{ height: '100%', aspectRatio: '0.62', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                       filter: hover ? 'drop-shadow(0 0 10px rgba(192,132,252,0.9))' : 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))' }}>
              <svg viewBox="0 0 100 160" style={{ height: '100%', width: 'auto', display: 'block' }} aria-hidden>
                <circle cx="50" cy="30" r="20" fill="#3a3020" />
                <path d="M14 160 C14 104 28 80 50 80 C72 80 86 104 86 160 Z" fill="#3a3020" />
              </svg>
            </div>
          )}
        </div>

        {/* AMBIENT-GJESTER (z=8) — turister ved peisen/lenestolene i turistsesong.
            IKKE klikkbare (pointerEvents none), rendres UNDER forgrunns-disk-laget
            (z<20) så underkroppen okkluderes av disken (de står i loungen bak).
            Defensivt koblet (lobbyAmbient.ts): dormant på main, auto-på når
            reiseliv merges. Sprite mangler ⇒ onError skjuler (ingen brukket bilde). */}
        {gjester.map((g, i) => {
          const slot = GJEST_SLOTS[i]; if (!slot || gjestFeil[g.id]) return null
          return (
            <img key={g.id} src={g.fil} alt="" aria-hidden draggable={false}
              onError={() => setGjestFeil(f => ({ ...f, [g.id]: true }))}
              style={{
                position: 'absolute', left: `${slot.x}%`, top: `${slot.anchorY}%`,
                height: `${slot.scale * 100}%`, width: 'auto',
                transform: `translate(-50%, -${slot.thigh * 100}%)`,
                objectFit: 'contain', opacity: 0.96, zIndex: 8, pointerEvents: 'none', userSelect: 'none',
                filter: 'drop-shadow(0 5px 8px rgba(0,0,0,0.45))',
              }} />
          )
        })}

        {/* FORGRUNNS-DISK-LAG (z=20) — samme lobby-bilde, klippet til KUN båndet
            under den (evt. skrå) linja mellom occludeYLeft (x=0) og
            occludeYRight (x=100). Sømløst med bakgrunnen, okkluderer sjefens
            underkropp bak resepsjonsdisken. */}
        {!imgFailed && (
          <img src={LOBBY_IMG} alt="" aria-hidden draggable={false}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block',
              clipPath: `polygon(0% ${occludeYLeft}%, 100% ${occludeYRight}%, 100% 100%, 0% 100%)`,
              zIndex: 20, pointerEvents: 'none', userSelect: 'none',
            }} />
        )}

        {/* ?dev=1: møtepunkt-markør (over forgrunnslaget) — viser forankrings-
            punktet (senter-x, anchor-y) så Espen ser hvor sjefen står. */}
        {IS_DEV_COORDS && (
          <div style={{
            position: 'absolute', left: `${centerX}%`, top: `${anchorY}%`, transform: 'translate(-50%,-50%)',
            width: 14, height: 14, borderRadius: '50%', background: '#c084fc', border: '2px solid #0f172a',
            zIndex: 30, pointerEvents: 'none', boxShadow: '0 0 8px rgba(192,132,252,0.9)',
          }} />
        )}
      </div>

      {/* ?dev=1: kalibreringspanel — samme mutér-og-logg-mønster som InteriorView. */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 64, right: 16, zIndex: 90, width: 236 }}>
          <div style={{ background: 'rgba(10,14,26,0.94)', border: '1px solid #c084fc55', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ color: '#c084fc', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🏨 Lobby-kalibrering</div>
            <Slider label="OCCLUDE_Y_LEFT" value={occludeYLeft} min={40} max={95} step={0.5} onChange={v => upd(setOccludeYLeft, 'LOBBY_OCCLUDE_Y_LEFT', v)} fmt={v => v.toFixed(1)} />
            <Slider label="OCCLUDE_Y_RIGHT" value={occludeYRight} min={40} max={95} step={0.5} onChange={v => upd(setOccludeYRight, 'LOBBY_OCCLUDE_Y_RIGHT', v)} fmt={v => v.toFixed(1)} />
            <Slider label="CENTER_X" value={centerX} min={0} max={100} step={0.5} onChange={v => upd(setCenterX, 'LOBBY_CENTER_X', v)} fmt={v => v.toFixed(1)} />
            <Slider label="ANCHOR_Y (lårlinje)" value={anchorY} min={40} max={95} step={0.5} onChange={v => upd(setAnchorY, 'LOBBY_ANCHOR_Y', v)} fmt={v => v.toFixed(1)} />
            <Slider label="SCALE" value={scale} min={0.4} max={1.8} step={0.02} onChange={v => upd(setScale, 'LOBBY_SCALE', v)} fmt={v => v.toFixed(2)} />
            <button onClick={() => setDevGuests(g => !g)}
              style={{
                width: '100%', margin: '4px 0 6px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 700,
                background: devGuests ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${devGuests ? '#38bdf8' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: 7, padding: '5px 8px', color: devGuests ? '#38bdf8' : '#94a3b8',
              }}>
              {devGuests ? '🧳 Ambient-gjester: PÅ (dev-tvang)' : '🧳 Vis ambient-gjester (dev)'}
            </button>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>
              Verdiene logges i konsollen ved hver endring. Sjefen skal være synlig fra lårene og opp, disklinja langs diskens overkant. Meld tilbake, så låser jeg dem i LobbyView.tsx.
            </div>
          </div>
        </div>
      )}

      {/* Etikett nederst */}
      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.4rem 1rem', color: '#f1f5f9', zIndex: 80, fontSize: 13, whiteSpace: 'nowrap',
      }}>
        🏨 Byhotellet — lobby (B2B-møtescene){IS_DEV_COORDS ? ' · kalibrering aktiv (panel øverst høyre)' : ''}
      </div>
    </div>
  )
}

function Slider({ label, value, min, max, step, onChange, fmt }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string
}) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ color: '#c084fc', fontWeight: 700 }}>{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#c084fc', cursor: 'pointer' }} />
    </div>
  )
}
