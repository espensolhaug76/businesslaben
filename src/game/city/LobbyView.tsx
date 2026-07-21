import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import { useGame } from '../GameContext'
import { useDevPanel } from '../dev/devPanel'
import { erTuristsesong, velgAmbientTurister, lobbySeed, AMBIENT_TURIST_SPRITER } from './lobbyAmbient'
import HotellAvtalerOverlay from './HotellAvtalerOverlay'
import HotellGjestOverlay from './HotellGjestOverlay'
import { velgGjestescenario, GJESTESCENARIER } from './hotellGjest'

// ── LobbyView — Byhotellets lobby (vertskapsarena) ───────────────────────────
// Spor C DEL 2. Bygget etter kaféens KASSEVY-MØNSTER (InteriorView): cover-stage
// med lobby-bildet, en GJEST-sprite forankret på et MØTEPUNKT bak
// resepsjonsdisken, og et FORGRUNNS-DISK-LAG (samme bilde klippet til båndet
// under OCCLUDE-linja) som okkluderer underkroppen.
//
// FORSKJELL fra kaféen (Espens føring, DEL 1): resepsjonsdisken er LAV
// (overkant ~72 % av bildehøyden). OCCLUDE-linja traces langs diskens overkant,
// og gjesten skal være synlig fra ca. LÅRENE og opp (mer synlig enn
// kaféens kundemodell) → forankringen (THIGH_FRAC) sitter lavere på spriten enn
// kaféens WAIST_FRAC.
//
// IKKE en drivbar bransje — en frittstående vertskapsscene (bransje 4 kommer
// senere via autonom-pipelinen). Interaksjonen: en gjest står ved resepsjonen —
// klikk (eller «Møt en gjest») starter et gjestescenario. «Hotellets avtaler»
// viser byens ferdigforhandlede provisjonssatser (leseinnsikt, ingen forhandling
// — den strøkne B2B-forhandlingen er en mulig VG2-utvidelse, se docs/rapporter).
//
// ?dev=1: kalibreringspanel (slidere) — Espen drar disk-kanten + gjesten på
// plass; en gjest-VELGER (alle turist-sprites) lar basen verifiseres mot alle
// høyder/bredder. Verdiene logges til konsollen for permanent låsing under.

const LOBBY_IMG = '/assets/raw/hotell-lobby-pilot-1.png'
const SCENE_W = 1376
const SCENE_H = 768
const ASPECT = SCENE_W / SCENE_H

// Gjesten ved resepsjonen er en EKTE turist-sprite (public/assets/raw/customers/,
// inne med Tema 15-mergen). Hvilken vises roterer seedet per dag (samme kilde som
// ambient-gjestene). Silhuett er siste utvei hvis en sprite-fil mangler (404).
// I ?dev=1 kan gjest-velgeren overstyre spriten for kalibrering mot alle høyder.

// ── Start-verdier (førstepasning via skjermbilde-løkka — Espen LÅSER i ?dev=1) ─
/** Diskens overkant i % av stage-høyden ved venstre/høyre kant — to punkter
 *  (disken kan være svakt i perspektiv). Forgrunns-laget viser KUN alt under den
 *  rette linja mellom punktene (clip-path polygon). Disken er LAV (~72 %). */
const DEFAULT_OCCLUDE_Y_LEFT = 72
const DEFAULT_OCCLUDE_Y_RIGHT = 72
/** Gjestens senter-x i % av stage-bredden (møtepunkt bak disken). */
const DEFAULT_CENTER_X = 50
/** Møtepunktets y i % (der forankringslinja — lårene — møter diskkanten). */
const DEFAULT_ANCHOR_Y = 72
/** Sprite-høyde som andel av stage-høyden. Delt base for alle turist-sprites
 *  (aspect ~0,4, hel stående figur) — hodet får luft under pendlene. Verifiser i
 *  ?dev=1 at basen tåler alle sprites (gjest-velgeren); avvik løses per-sprite
 *  kun om nødvendig (kassevy-mønsteret). */
const DEFAULT_SCALE = 0.82
/** Hvor på spriten forankringen sitter (andel fra toppen). LÅR (≈ 0,64) — så
 *  figuren er synlig fra lårene og opp, resten skjules bak disken. */
const THIGH_FRAC = 0.64

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
  // Lobby-dev-verktøy (gjest-velger, møtepunkt-markør, kalibreringspanel) vises
  // kun når dev-panelet slår kalibrering PÅ (⚙ → «Kalibrering»).
  const visKal = useDevPanel().kalibrering && IS_DEV_COORDS
  const [imgFailed, setImgFailed] = useState(false)
  const [senterFeil, setSenterFeil] = useState<Record<string, boolean>>({}) // gjest-sprite 404 (per id)
  const [hover, setHover] = useState(false)
  // Ambient-gjester vises i turistsesong. ?dev=1: tving dem frem for kalibrering
  // (på main finnes verken sesong-state eller turist-sprites — se lobbyAmbient.ts).
  const [devGuests, setDevGuests] = useState(false)
  const [gjestFeil, setGjestFeil] = useState<Record<string, boolean>>({})
  // ?dev=1 gjest-VELGER: overstyr hvilken turist-sprite som står på møtepunktet
  // (''=auto/seedet) så basen kan verifiseres mot alle høyder/bredder.
  const [devSpriteId, setDevSpriteId] = useState<string>('')
  // «Hotellets avtaler» — leseinnsikt i byens ferdigforhandlede provisjonssatser.
  const [avtalerOpen, setAvtalerOpen] = useState(false)
  // DEL 5/6: «Møt en gjest» — seedet rotasjon av gjestescenariene (sesong-gatet:
  // Innsjekket/Umulige kun i turistsesong, Klagen/Mersalget hele året).
  const [gjestId, setGjestId] = useState<string | null>(null)
  const [gjestTeller, setGjestTeller] = useState(0)
  function moetEnGjest() {
    const seed = (lobbySeed(state) + gjestTeller * 2654435761) >>> 0
    const sc = velgGjestescenario(seed, erTuristsesong(state))
    setGjestTeller(n => n + 1)
    setGjestId(sc.id)
  }
  const visGjester = erTuristsesong(state) || (IS_DEV_COORDS && devGuests)
  const gjester = visGjester ? velgAmbientTurister(lobbySeed(state), GJEST_SLOTS.length) : []
  // Gjesten ved resepsjonen (møtepunkt): seedet per dag (offset fra ambient-seed
  // så den ikke nødvendigvis matcher en peis-gjest). ?dev=1-velgeren overstyrer.
  const seedetGjest = velgAmbientTurister((lobbySeed(state) + 101) >>> 0, 1)[0]
  const devValgtGjest = devSpriteId ? AMBIENT_TURIST_SPRITER.find(t => t.id === devSpriteId) : undefined
  const senterGjest = (IS_DEV_COORDS && devValgtGjest) ? devValgtGjest : seedetGjest

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

      {/* DEL 6: «Møt en gjest» — start et gjestescenario (seedet, sesong-gatet). */}
      <div style={{ position: 'fixed', bottom: 30, left: 24, zIndex: 80, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <button onClick={moetEnGjest}
          title="Ta imot en gjest i resepsjonen"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', border: 'none', borderRadius: 99,
            padding: '0.7rem 1.4rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif", boxShadow: '0 0 20px rgba(14,165,233,0.4)',
          }}>
          🛎️ Møt en gjest
        </button>
        {/* «Hotellets avtaler» — leseinnsikt i byens ferdigforhandlede satser. */}
        <button onClick={() => setAvtalerOpen(true)}
          title="Se byens ferdigforhandlede provisjonssatser"
          style={{
            background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: 99,
            padding: '0.55rem 1.2rem', color: '#7dd3fc', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
          }}>
          🤝 Hotellets avtaler
        </button>
        {/* ?dev=1: start et BESTEMT scenario (omgår sesong-gating) — for test +
            demo før reiseliv/turistsesong finnes på main. */}
        {visKal && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, maxWidth: 300 }}>
            {GJESTESCENARIER.map(s => (
              <button key={s.id} data-testid={`gjest-${s.id}`} onClick={() => setGjestId(s.id)}
                style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid #38bdf855', borderRadius: 7, padding: '3px 8px', color: '#7dd3fc', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {s.tittel}
              </button>
            ))}
          </div>
        )}
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

        {/* GJEST VED RESEPSJONEN (z=10) — forankret på lårlinja bak disken.
            Underkroppen strekker seg under OCCLUDE-linja og skjules av
            forgrunns-laget. Klikk (eller «Møt en gjest») starter et gjestescenario. */}
        <div
          onClick={moetEnGjest}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title="Ta imot gjesten i resepsjonen"
          style={{
            position: 'absolute', left: `${centerX}%`, top: `${anchorY}%`,
            height: `${scale * 100}%`, width: 'auto',
            transform: `translate(-50%, -${THIGH_FRAC * 100}%)`,
            cursor: 'pointer', zIndex: 10,
          }}
        >
          {senterGjest && !senterFeil[senterGjest.id] ? (
            // Ekte turist-sprite (seedet, eller ?dev=1-valgt). onError → silhuett.
            <img
              key={senterGjest.id}
              src={senterGjest.fil}
              alt="Gjest ved resepsjonen"
              draggable={false}
              onError={() => setSenterFeil(f => ({ ...f, [senterGjest.id]: true }))}
              style={{
                height: '100%', width: 'auto', display: 'block', userSelect: 'none',
                objectFit: 'contain',
                filter: hover ? 'drop-shadow(0 0 10px rgba(192,132,252,0.9)) drop-shadow(0 6px 10px rgba(0,0,0,0.5))' : 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))',
                transition: 'filter 0.15s',
              }} />
          ) : (
            // Siste utvei (sprite-fil mangler): nøytral voksen-silhuett.
            <div aria-label="Gjest (ingen sprite tilgjengelig)"
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
        {visKal && (
          <div style={{
            position: 'absolute', left: `${centerX}%`, top: `${anchorY}%`, transform: 'translate(-50%,-50%)',
            width: 14, height: 14, borderRadius: '50%', background: '#c084fc', border: '2px solid #0f172a',
            zIndex: 30, pointerEvents: 'none', boxShadow: '0 0 8px rgba(192,132,252,0.9)',
          }} />
        )}
      </div>

      {/* ?dev=1: kalibreringspanel — samme mutér-og-logg-mønster som InteriorView. */}
      {visKal && (
        <div style={{ position: 'fixed', top: 64, right: 16, zIndex: 90, width: 236 }}>
          <div style={{ background: 'rgba(10,14,26,0.94)', border: '1px solid #c084fc55', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ color: '#c084fc', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🏨 Lobby-kalibrering</div>
            <Slider label="OCCLUDE_Y_LEFT" value={occludeYLeft} min={40} max={95} step={0.5} onChange={v => upd(setOccludeYLeft, 'LOBBY_OCCLUDE_Y_LEFT', v)} fmt={v => v.toFixed(1)} />
            <Slider label="OCCLUDE_Y_RIGHT" value={occludeYRight} min={40} max={95} step={0.5} onChange={v => upd(setOccludeYRight, 'LOBBY_OCCLUDE_Y_RIGHT', v)} fmt={v => v.toFixed(1)} />
            <Slider label="CENTER_X" value={centerX} min={0} max={100} step={0.5} onChange={v => upd(setCenterX, 'LOBBY_CENTER_X', v)} fmt={v => v.toFixed(1)} />
            <Slider label="ANCHOR_Y (lårlinje)" value={anchorY} min={40} max={95} step={0.5} onChange={v => upd(setAnchorY, 'LOBBY_ANCHOR_Y', v)} fmt={v => v.toFixed(1)} />
            <Slider label="SCALE" value={scale} min={0.4} max={1.8} step={0.02} onChange={v => upd(setScale, 'LOBBY_SCALE', v)} fmt={v => v.toFixed(2)} />

            {/* Gjest-VELGER — sett HVILKEN SOM HELST turist-sprite på møtepunktet
                for å verifisere at den delte basen tåler alle høyder/bredder. */}
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#94a3b8', margin: '6px 0 3px' }}>GJEST-SPRITE (møtepunkt)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
              <SpriteKnapp label="auto" aktiv={devSpriteId === ''} onKlikk={() => setDevSpriteId('')} />
              {AMBIENT_TURIST_SPRITER.map(t => (
                <SpriteKnapp key={t.id} label={t.id.replace('turist-', '')} aktiv={devSpriteId === t.id} onKlikk={() => setDevSpriteId(t.id)} />
              ))}
            </div>

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
              Verdiene logges i konsollen ved hver endring. Gjesten skal være synlig fra lårene og opp, disklinja langs diskens overkant. Bytt gjest-sprite over for å sjekke at basen tåler alle. Meld tilbake, så låser jeg dem i LobbyView.tsx.
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
        🏨 Byhotellet — lobby (vertskapsscene){visKal ? ' · kalibrering aktiv (panel øverst høyre)' : ''}
      </div>

      {/* «Hotellets avtaler» — leseinnsikt i byens ferdigforhandlede satser. */}
      <HotellAvtalerOverlay open={avtalerOpen} onClose={() => setAvtalerOpen(false)} />
      {/* DEL 5/6: gjestescenariene — «Møt en gjest». */}
      <HotellGjestOverlay scenarioId={gjestId} open={!!gjestId} onClose={() => setGjestId(null)} />
    </div>
  )
}

function SpriteKnapp({ label, aktiv, onKlikk }: { label: string; aktiv: boolean; onKlikk: () => void }) {
  return (
    <button onClick={onKlikk}
      style={{
        cursor: 'pointer', fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
        background: aktiv ? 'rgba(192,132,252,0.2)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${aktiv ? '#c084fc' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: 6, padding: '3px 7px', color: aktiv ? '#e9d5ff' : '#94a3b8',
      }}>
      {label}
    </button>
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
