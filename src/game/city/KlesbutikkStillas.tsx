import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG } from '../../data/districts'
import { KLESBUTIKK } from '../data/industryDefinition'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Target, type DrawZone, type Rect } from './ZoneTracer'

// ── KlesbutikkStillas (BRANSJE 2, DEL 3) — STILLAS-scener for klesbutikk ──────
// Frittstående dev-scene (rute /dev/klesbutikk, IKKE koblet til onboarding
// eller spillflyten — kafé-flyten er helt urørt). Viser klesbutikkens to
// eksponeringsscener — fasade (vindussone) og interiør (butikkvegg-sone) — med:
//   • sonene tegnet (Espen-trace-de, låst i districts.ts)
//   • ?dev=1: sone-tracer (dra soner på nytt) + SKEW-kalibrering (skjærvinkel
//     på sonens INNHOLD, samme mutér-og-logg-mønster som speil-kalibreringen i
//     InteriorView). Skew-verdiene bor i KLESBUTIKK-definisjonen (flater) og
//     logges til konsollen for innliming i industryDefinition.ts.
// En fixture-sprite vises som forhåndsvisning av «innholdet» så skew-lenet er
// synlig NÅ — den ekte inventar-plasseringen kommer senere. Ingen spill-logikk;
// motorene (InteriorView/MonterScene) røres ikke.

/** Skriv et nytt rektangel inn i en eksisterende tuple-sone (in place), så
 *  ZoneTracer sin «Bruk»-mutasjon treffer selve districts-konstanten. */
const writeRect = (t: Rect, r: Rect) => { t[0] = r[0]; t[1] = r[1]; t[2] = r[2]; t[3] = r[3] }

/** Sonens content-lean bor på et definisjons-objekt (StylingFlate for vindu,
 *  MonterTrau for butikkvegg) — begge har valgfrie skewX/skewY (default 0). */
interface SkewHolder { skewX?: number; skewY?: number }

interface Scene {
  id: 'fasade' | 'interior'
  label: string
  img: string
  aspect: number
  hint: string
  rect: Rect
  targets: Target[]
  drawZones: DrawZone[]
  /** Definisjons-objektet skew-verdiene skrives til (muteres live av sliderne). */
  skew: SkewHolder
  /** Hvor Espen limer de loggede skew-verdiene tilbake i industryDefinition.ts. */
  skewPastePath: string
  /** Fixture-sprite som forhåndsviser «innholdet» i sonen (skew påføres den). */
  previewSprite: string
}

const SCENES: Scene[] = [
  {
    id: 'fasade',
    label: '🏬 Fasade',
    img: '/assets/raw/klesbutikk-fasade.png',
    aspect: 1376 / 768,
    hint: 'Vindusutstillingens sone (KLESBUTIKK_VINDU) — mot gata.',
    rect: KLESBUTIKK_VINDU,
    targets: [{ id: 'vindu', label: 'vindu', get: () => KLESBUTIKK_VINDU, set: r => writeRect(KLESBUTIKK_VINDU, r) }],
    drawZones: [{ rect: KLESBUTIKK_VINDU, color: '#50dcff', label: 'vindu' }],
    skew: KLESBUTIKK.flater.styling,
    skewPastePath: 'KLESBUTIKK.flater.styling',
    previewSprite: '/assets/raw/fixtures/dukke.png',
  },
  {
    id: 'interior',
    label: '🛍 Interiør',
    img: '/assets/raw/klesbutikk-interior.jpg',
    aspect: 1024 / 572,
    hint: 'Butikkvegg-/eksponeringssonen (KLESBUTIKK_BUTIKKVEGG) — inne.',
    rect: KLESBUTIKK_BUTIKKVEGG,
    targets: [{ id: 'butikkvegg', label: 'butikkvegg', get: () => KLESBUTIKK_BUTIKKVEGG, set: r => writeRect(KLESBUTIKK_BUTIKKVEGG, r) }],
    drawZones: [{ rect: KLESBUTIKK_BUTIKKVEGG, color: '#ffa03c', label: 'butikkvegg', surface: true }],
    skew: KLESBUTIKK.flater.lager.trau[0],
    skewPastePath: 'KLESBUTIKK.flater.lager.trau[0]',
    previewSprite: '/assets/raw/fixtures/stativ.png',
  },
]

export default function KlesbutikkStillas() {
  const navigate = useNavigate()
  const [sceneId, setSceneId] = useState<Scene['id']>('fasade')
  const [imgFailed, setImgFailed] = useState(false)
  const [skewOpen, setSkewOpen] = useState(true)
  // Re-render når ZoneTracer/skew-sliderne skriver nye verdier i runtime.
  const [, setRev] = useState(0)
  const scene = SCENES.find(s => s.id === sceneId)!
  const sx = scene.skew.skewX ?? 0
  const sy = scene.skew.skewY ?? 0

  function setSkew(field: 'skewX' | 'skewY', v: number) {
    scene.skew[field] = v
    console.log(`[KlesbutikkStillas] ${scene.id} ${field} = ${v} — lim inn i ${scene.skewPastePath} (industryDefinition.ts)`)
    setRev(r => r + 1)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, fontFamily: "'Outfit', sans-serif",
      background: 'linear-gradient(180deg, #10141a 0%, #1b2230 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Topplinje: scenevalg + status */}
      <div style={{
        position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
        display: 'flex', gap: 8, alignItems: 'center',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '6px 10px',
      }}>
        {SCENES.map(s => (
          <button
            key={s.id}
            onClick={() => { setSceneId(s.id); setImgFailed(false) }}
            style={{
              background: s.id === sceneId ? 'rgba(125,211,252,0.18)' : 'transparent',
              color: s.id === sceneId ? '#e0f2fe' : '#94a3b8',
              border: s.id === sceneId ? '1px solid rgba(125,211,252,0.7)' : '1px solid transparent',
              borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
            }}
          >{s.label}</button>
        ))}
        <span style={{ color: '#64748b', fontSize: 11, marginLeft: 4 }}>
          KLESBUTIKK-stillas{IS_DEV_COORDS ? ' · dev' : ' · ?dev=1 for tracer/skew'}
        </span>
      </div>

      {/* Navigasjon tilbake (dev-rute — ingen spill-kontekst) */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 14, left: 16, zIndex: 90,
          background: 'rgba(10,14,26,0.85)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 10, padding: '5px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif",
        }}
      >← Forsiden</button>

      {/* Scene-stage: bildets eget bildeforhold, innenfor viewport */}
      <div style={{
        position: 'relative',
        aspectRatio: `${scene.aspect}`,
        width: `min(96vw, calc(86vh * ${scene.aspect}))`,
        height: 'auto',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        {!imgFailed ? (
          <img
            src={scene.img}
            alt={scene.label}
            draggable={false}
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #3a4656 0%, #2e3744 100%)',
            border: '1px dashed rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>
            Scenebilde mangler<br />({scene.img})
          </div>
        )}

        {/* INNHOLD-FORHÅNDSVISNING: én fixture-sprite bunn-ankret i sonen, med
            skew påført — så skjær-lenet er synlig mens Espen kalibrerer. Ren
            stedfortreder for den ekte inventar-plasseringen (kommer senere). */}
        <div style={{
          position: 'absolute',
          left: `${scene.rect[0]}%`, top: `${scene.rect[1]}%`,
          width: `${scene.rect[2]}%`, height: `${scene.rect[3]}%`,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <img
            src={scene.previewSprite}
            alt=""
            draggable={false}
            style={{
              maxWidth: '70%', maxHeight: '92%', objectFit: 'contain',
              transform: `skewX(${sx}deg) skewY(${sy}deg)`,
              transformOrigin: 'bottom center',
              opacity: 0.9, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))',
            }}
          />
        </div>

        {/* Uten ?dev=1: tegn sonene som statiske referanse-rammer, så stillaset
            er lesbart også uten traceren. Med ?dev=1 tegner ZoneTracer sine
            egne (interaktive) rammer i stedet. */}
        {!IS_DEV_COORDS && scene.drawZones.map(z => (
          <div key={z.label} style={{
            position: 'absolute',
            left: `${z.rect[0]}%`, top: `${z.rect[1]}%`, width: `${z.rect[2]}%`, height: `${z.rect[3]}%`,
            border: `1px solid ${z.color}`,
            borderBottom: z.surface ? `2px solid ${z.color}` : undefined,
            pointerEvents: 'none',
          }}>
            <span style={{
              position: 'absolute', left: 1, top: -14, fontSize: 10, fontFamily: 'monospace',
              color: z.color, background: 'rgba(0,0,0,0.65)', padding: '0 3px', whiteSpace: 'nowrap',
            }}>{z.label}</span>
          </div>
        ))}

        {/* ?dev=1: sone-tracer for AKTIV scene (egne mål + referanse-soner) */}
        {IS_DEV_COORDS && (
          <ZoneTracer
            key={scene.id}
            onApply={() => setRev(r => r + 1)}
            targets={scene.targets}
            drawZones={scene.drawZones}
          />
        )}
      </div>

      {/* ?dev=1: SKEW-KALIBRERING for aktiv scene — skjærvinkel på sonens
          innhold, mutér-og-logg (samme mønster som speil-kalibreringen). */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 56, left: 16, zIndex: 90, width: 224 }}>
          <CalPanel title="📐 Skew-kalibrering" color="#f472b6" open={skewOpen} onToggle={() => setSkewOpen(o => !o)}>
            <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 6 }}>
              Sone: <b style={{ color: '#f1f5f9' }}>{scene.drawZones[0].label}</b>
            </div>
            <CalSlider label="skewX (sidelengs)" value={sx} min={-45} max={45} step={1}
              onChange={v => setSkew('skewX', v)} fmt={v => `${v.toFixed(0)}°`} />
            <CalSlider label="skewY (vertikalt)" value={sy} min={-45} max={45} step={1}
              onChange={v => setSkew('skewY', v)} fmt={v => `${v.toFixed(0)}°`} />
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, lineHeight: 1.4 }}>
              Logges i konsollen ved hver endring — lim inn i {scene.skewPastePath} (industryDefinition.ts).
            </div>
          </CalPanel>
        </div>
      )}

      {/* Hint nederst */}
      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.4rem 1rem', color: '#cbd5e1', fontSize: 12, whiteSpace: 'nowrap',
      }}>
        {scene.hint}
      </div>
    </div>
  )
}

// ── Sammenleggbart kalibreringspanel (accordion) — samme mønster som
// InteriorView sine dev-paneler. Lokal kopi så stillaset er selvstendig. ──────
function CalPanel({ title, color, open, onToggle, children }: {
  title: string
  color: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{
      background: 'rgba(10,14,26,0.94)', border: `1px solid ${color}55`,
      borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
    }}>
      <div
        onClick={onToggle}
        title={open ? 'Klikk for å felle sammen' : 'Klikk for å åpne'}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', marginBottom: open ? 6 : 0, userSelect: 'none',
        }}
      >
        <span style={{ color, fontSize: 12, fontWeight: 800 }}>{title}</span>
        <span style={{ color, fontSize: 11 }}>{open ? '▾' : '▸'}</span>
      </div>
      {open && children}
    </div>
  )
}

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
        <span style={{ color: '#f472b6', fontWeight: 700 }}>{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#f472b6', cursor: 'pointer' }}
      />
    </div>
  )
}
