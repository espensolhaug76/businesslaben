import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { INTERIOR_CUSTOMER_SPAWN, INTERIOR_CUSTOMER_STAND } from '../../data/districts'
import { randomScenario } from '../sales/scenarios'
import { BackButton } from './DistrictView'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Rect, type Target, type DrawZone } from './ZoneTracer'

// ── InteriorView (BAK-DISKEN-SCENE) ──────────────────────────────────────────
// Bilde-basert visning (cover, 16:9). KUN kunde + salgssamtale: ved hvert besøk
// velges et TILFELDIG scenario fra poolen (morgenkunden/reklamasjonen); riktig
// kunde-sprite (kari.png / tom.png) vises STOR bak disken på den okkluderte
// diskposisjonen. Underkroppen okkluderes av et forgrunns-disk-lag (samme
// interiørbilde klippet til det nederste diskbåndet). Kunden toner inn ved
// oppstart, og klikk åpner DET tilhørende scenariet. INGEN kø/respawn.
//
// Vareeksponering (disk-monter) er FLYTTET til den frontale monter-scenen
// (MonterScene) — den rendres ikke lenger her.
//
// Begge sprites bruker SAMME fire kalibrerings-konstanter (samme høyde ~706–709
// px ⇒ samme diskposisjon). Trenger en kunde egen skala senere, legg til en
// per-scenario `spriteScale` — ikke nødvendig for Kari/Tom nå.
//
// LIVE-KALIBRERING (?dev=1): de fire plasserings-konstantene er slidere i et
// dev-panel. Espen drar kunden + diskkanten på plass visuelt; verdiene vises på
// skjermen og logges til konsollen ved hver endring for permanent lagring.

const INTERIOR_IMG = '/assets/raw/interior-cafe.png'
const ASPECT = 16 / 9

// ── Start-verdier — kalibrert visuelt av Espen (?dev=1-sliderne) 2026-06-16 ───
/** Diskens overkant i % av stage-høyden — nær reell diskoverkant i bildet.
 *  Forgrunns-disk-laget viser KUN alt under denne linja. */
const DEFAULT_OCCLUDE_Y = 73
/** Kundens senter-x i % av stage-bredden. */
const DEFAULT_CENTER_X = 48.5
/** Kundens livlinje i % av stage-høyden (der livet møter diskkanten). */
const DEFAULT_WAIST_Y = 75
/** Kundens høyde som andel av stage-høyden. Stor = nær disken; hun når ned til
 *  diskkanten og underkroppen skjules bak forgrunns-laget. */
const DEFAULT_SCALE = 1.25

/** Hvor på spriten livet sitter (andel fra toppen). Intern ankerverdi: spriten
 *  forankres på livlinja, så skala vokser RUNDT livet og underkroppen alltid
 *  havner under disken — uansett skala. */
const WAIST_FRAC = 0.46

// ── Tracer-mål/soner (merket «spawn/stand») ──────────────────────────────────
const ZONE_COLORS: Record<string, string> = { spawn: '#50dcff', stand: '#50e08c' }

function setRect(target: Rect, r: Rect) {
  target[0] = r[0]; target[1] = r[1]; target[2] = r[2]; target[3] = r[3]
}
function interiorTargets(): Target[] {
  return [
    { id: 'spawn', label: 'spawn', get: () => INTERIOR_CUSTOMER_SPAWN, set: r => setRect(INTERIOR_CUSTOMER_SPAWN, r) },
    { id: 'stand', label: 'stand', get: () => INTERIOR_CUSTOMER_STAND, set: r => setRect(INTERIOR_CUSTOMER_STAND, r) },
  ]
}
function interiorDrawZones(): DrawZone[] {
  return [
    { rect: INTERIOR_CUSTOMER_SPAWN, id: 'spawn', label: 'spawn', color: ZONE_COLORS.spawn, dashed: true },
    { rect: INTERIOR_CUSTOMER_STAND, id: 'stand', label: 'stand', color: ZONE_COLORS.stand, dashed: true },
  ]
}

export default function InteriorView({ districtId, lokaleId }: {
  districtId: string
  lokaleId: string
}) {
  const navigate = useNavigate()
  // Tilfeldig kunde fra poolen, valgt ÉN gang per besøk (mount). randomScenario
  // ligger i en ren modul, så Math.random ikke flagges i render.
  const [scenario] = useState(randomScenario)
  const [imgFailed, setImgFailed] = useState(false)
  const [shown, setShown] = useState(false)        // fade-in/ut (opacity)
  const [gone, setGone] = useState(false)          // fjernet etter runden
  const [hover, setHover] = useState(false)
  const [, setRev] = useState(0)                    // re-render når traceren skriver
  const initiatedRef = useRef(false)                // åpnet VI overlayet (klikk på kunden)?

  // Live-kalibrerbare plasserings-konstanter (slidere ved ?dev=1).
  const [occludeY, setOccludeY] = useState(DEFAULT_OCCLUDE_Y)
  const [centerX, setCenterX] = useState(DEFAULT_CENTER_X)
  const [waistY, setWaistY] = useState(DEFAULT_WAIST_Y)
  const [scale, setScale] = useState(DEFAULT_SCALE)

  // Fade kunden inn rett etter mount (ingen bevegelse).
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 50)
    return () => clearTimeout(t)
  }, [])

  // Logg start-verdiene ved ?dev=1.
  useEffect(() => {
    if (!IS_DEV_COORDS) return
    console.log(
      '%c[InteriorView] kunde-konstanter (start — juster med sliderne):',
      'color:#7dd3fc;font-weight:bold',
      { CUSTOMER_SCALE: DEFAULT_SCALE, CUSTOMER_CENTER_X: DEFAULT_CENTER_X, CUSTOMER_WAIST_Y: DEFAULT_WAIST_Y, COUNTER_OCCLUDE_Y: DEFAULT_OCCLUDE_Y },
    )
  }, [])

  // Når salgsoverlayet lukkes (fullført/lukket) og DET var vi som åpnet det:
  // kunden toner ut og forsvinner. GamePage sender 'sales:closed'.
  useEffect(() => {
    const onClosed = () => {
      if (!initiatedRef.current) return
      initiatedRef.current = false
      setShown(false)                                 // fade ut
      window.setTimeout(() => setGone(true), 450)      // fjern etter fade
    }
    window.addEventListener('sales:closed', onClosed)
    return () => window.removeEventListener('sales:closed', onClosed)
  }, [])

  function talkToCustomer() {
    initiatedRef.current = true
    // Åpner DET scenariet kunden i scenen tilhører (samme inngang som
    // dev-knappene; GamePage lytter og håndterer __OVERLAY_OPEN__).
    window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: scenario.id } }))
  }

  // Oppdater én konstant + logg alle fire (snapshot med den nye verdien).
  function update(key: 'CUSTOMER_SCALE' | 'CUSTOMER_CENTER_X' | 'CUSTOMER_WAIST_Y' | 'COUNTER_OCCLUDE_Y', v: number, setter: (n: number) => void) {
    setter(v)
    console.log('[InteriorView] kunde-konstanter:', {
      CUSTOMER_SCALE: scale, CUSTOMER_CENTER_X: centerX, CUSTOMER_WAIST_Y: waistY, COUNTER_OCCLUDE_Y: occludeY,
      [key]: v,
    })
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: '#10141c',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Tilbake ut til fasaden */}
      <div style={{ position: 'fixed', top: 64, left: 20, zIndex: 80 }}>
        <BackButton onClick={() => navigate(`/game/d/${districtId}/l/${lokaleId}`)} label="← Ut til fasaden" />
      </div>

      {/* Drift: gå til den frontale monter-scenen for å stelle disken. Ligger
          bak salgsoverlayet, så ikke tilgjengelig midt i en samtale. */}
      <div style={{ position: 'fixed', bottom: 30, right: 24, zIndex: 79 }}>
        <button
          onClick={() => navigate(`/game/d/${districtId}/l/${lokaleId}/disk`)}
          style={{
            background: 'linear-gradient(135deg, #b45309, #92400e)', border: 'none',
            borderRadius: 99, padding: '0.7rem 1.4rem', color: '#fff', fontWeight: 700,
            fontSize: 14, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            boxShadow: '0 0 20px rgba(180,83,9,0.4)',
          }}
        >
          🧁 Stell disken
        </button>
      </div>

      {/* Cover-stage: 16:9-bildet dekker skjermen. Kunde + forgrunns-disk +
          tracer overlegges bildet, så prosent-koordinatene treffer direkte. */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: `max(100vw, calc(100vh * ${ASPECT}))`,
        height: `max(100vh, calc(100vw / ${ASPECT}))`,
      }}>
        {/* BAKGRUNN (z=0) */}
        {!imgFailed ? (
          <img
            src={INTERIOR_IMG}
            alt="Interiør"
            draggable={false}
            onError={() => setImgFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #1c2530 0%, #11161e 100%)',
            border: '1px dashed rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>
            Interiørbilde mangler<br />(/assets/raw/interior-cafe.png)
          </div>
        )}

        {/* KUNDEN (z=10) — stor, forankret på livlinja, mellom bakgrunn og disk.
            Underkroppen strekker seg under occludeY og skjules av forgrunns-laget. */}
        {!gone && (
          <div
            onClick={talkToCustomer}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title="Snakk med kunden"
            style={{
              position: 'absolute',
              left: `${centerX}%`, top: `${waistY}%`,
              height: `${scale * 100}%`, width: 'auto',
              // Forankring på livet: flytt opp WAIST_FRAC av egen høyde, sentrer x.
              transform: `translate(-50%, -${WAIST_FRAC * 100}%)`,
              opacity: shown ? 1 : 0,
              transition: 'opacity 0.4s ease',
              cursor: 'pointer', zIndex: 10,
            }}
          >
            <img
              src={scenario.sprite}
              alt={scenario.customerName}
              draggable={false}
              style={{
                height: '100%', width: 'auto', display: 'block', userSelect: 'none',
                filter: hover
                  ? 'drop-shadow(0 0 10px rgba(125,211,252,0.9)) drop-shadow(0 6px 10px rgba(0,0,0,0.45))'
                  : 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))',
                transition: 'filter 0.15s',
              }}
            />
            {/* Hover-hint */}
            {hover && (
              <div style={{
                position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -120%)',
                background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(125,211,252,0.5)',
                borderRadius: 8, padding: '0.3rem 0.7rem', color: '#f1f5f9',
                fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none',
              }}>
                💬 Snakk med kunden
              </div>
            )}
          </div>
        )}

        {/* FORGRUNNS-DISK-LAG (z=20) — samme interiørbilde, identisk plassert,
            men klippet til KUN båndet under occludeY (clip-path inset).
            Sømløst med bakgrunnen, okkluderer kundens underkropp. */}
        {!imgFailed && (
          <img
            src={INTERIOR_IMG}
            alt=""
            aria-hidden
            draggable={false}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block',
              clipPath: `inset(${occludeY}% 0 0 0)`,
              zIndex: 20, pointerEvents: 'none', userSelect: 'none',
            }}
          />
        )}

        {/* ?dev=1: sone-tracer (samme verktøy som fasaden), merket spawn/stand. */}
        {IS_DEV_COORDS && !imgFailed && (
          <ZoneTracer
            onApply={() => setRev(r => r + 1)}
            targets={interiorTargets()}
            drawZones={interiorDrawZones()}
          />
        )}
      </div>

      {/* LIVE-KALIBRERINGSPANEL (kun ?dev=1) — søsken av stagen så fixed-posisjon
          måles mot viewporten, ikke mot den transformerte stagen. */}
      {IS_DEV_COORDS && (
        <div style={{
          position: 'fixed', top: 112, left: 20, zIndex: 90, width: 224,
          background: 'rgba(10,14,26,0.94)', border: '1px solid #7dd3fc55',
          borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>🎚️ Kunde-kalibrering</div>
          <CalSlider label="CUSTOMER_SCALE"     value={scale}    min={0.5} max={2.5} step={0.05}
            onChange={v => update('CUSTOMER_SCALE', v, setScale)}      fmt={v => v.toFixed(2)} />
          <CalSlider label="CUSTOMER_CENTER_X"  value={centerX}  min={0}   max={100} step={0.5}
            onChange={v => update('CUSTOMER_CENTER_X', v, setCenterX)} fmt={v => v.toFixed(1)} />
          <CalSlider label="CUSTOMER_WAIST_Y"   value={waistY}   min={0}   max={100} step={0.5}
            onChange={v => update('CUSTOMER_WAIST_Y', v, setWaistY)}   fmt={v => v.toFixed(1)} />
          <CalSlider label="COUNTER_OCCLUDE_Y"  value={occludeY} min={0}   max={100} step={0.5}
            onChange={v => update('COUNTER_OCCLUDE_Y', v, setOccludeY)} fmt={v => v.toFixed(1)} />
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Verdiene logges i konsollen ved hver endring — meld dem tilbake for permanent lagring.
          </div>
        </div>
      )}

      {/* Stillas-etikett nederst */}
      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.4rem 1rem', color: '#f1f5f9', zIndex: 80,
        fontSize: 13, whiteSpace: 'nowrap',
      }}>
        🪑 Interiør{IS_DEV_COORDS ? ' · kalibrering aktiv (panel øverst venstre)' : ''}
      </div>
    </div>
  )
}

// ── Slider-rad i kalibreringspanelet ─────────────────────────────────────────
function CalSlider({ label, value, min, max, step, onChange, fmt }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  fmt: (v: number) => string
}) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ color: '#7dd3fc', fontWeight: 700 }}>{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#7dd3fc', cursor: 'pointer' }}
      />
    </div>
  )
}
