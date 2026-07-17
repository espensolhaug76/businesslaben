import { useState } from 'react'
import { createPortal } from 'react-dom'
import { STOREFRONT_DISPLAY_ZONES, STOREFRONT_HOTSPOTS, STOREFRONT_KAMPANJE } from '../../data/districts'

// ── ZoneTracer (SONE-TRACING, ?dev=1 på storefront) ──────────────────────────
// Klikk-og-dra tegner et rektangel over fasaden (live preview, fasade-%).
// «Kopier sone» eksporterer [x, y, b, h]; «Bruk → <sone>» skriver siste
// rektangel DIREKTE inn i den kjørende sonen (runtime-mutasjon av
// districts-objektene + re-render via onApply) og logger verdien til
// konsollen for permanent innliming i districts.ts.
// Alle eksisterende soner tegnes i hver sin farge med etikett:
//   cyan = vindusone (interiør)   blå = skilt/dør-hotspots
//   oransje = utstillingsflater   grønn = kampanjeflate (høyre vindu)

export type Rect = [number, number, number, number]

export interface Target {
  id: string
  label: string
  get: () => Rect
  set: (r: Rect) => void
}

/** En sone som tegnes som referanse-rektangel i traceren. */
export interface DrawZone {
  rect: Rect
  color: string
  label: string
  id?: string
  dashed?: boolean
  surface?: boolean
}

// Standard (fasade): mål + referanse-soner. Brukes når props ikke er gitt, så
// StorefrontView-bruken er uendret.
const FACADE_TARGETS: Target[] = [
  { id: 'vindu', label: 'vindu (interiør)', get: () => STOREFRONT_HOTSPOTS.vindu, set: r => { STOREFRONT_HOTSPOTS.vindu = r } },
  { id: 'skilt', label: 'skilt', get: () => STOREFRONT_HOTSPOTS.skilt, set: r => { STOREFRONT_HOTSPOTS.skilt = r } },
  { id: 'dor', label: 'dør', get: () => STOREFRONT_HOTSPOTS.dor, set: r => { STOREFRONT_HOTSPOTS.dor = r } },
  ...STOREFRONT_DISPLAY_ZONES.map(z => ({
    id: z.id, label: z.id,
    get: () => z.rect,
    set: (r: Rect) => { z.rect = r },
  })),
  {
    id: 'kampanje', label: 'kampanje (høyre vindu)',
    get: () => STOREFRONT_KAMPANJE,
    set: r => { STOREFRONT_KAMPANJE[0] = r[0]; STOREFRONT_KAMPANJE[1] = r[1]; STOREFRONT_KAMPANJE[2] = r[2]; STOREFRONT_KAMPANJE[3] = r[3] },
  },
]

/** Referanse-sonene som tegnes på fasaden (live fra districts-objektene). */
function facadeDrawZones(): DrawZone[] {
  return [
    { rect: STOREFRONT_HOTSPOTS.vindu, color: '#50dcff', label: 'vindu' },
    { rect: STOREFRONT_HOTSPOTS.skilt, color: '#7da8ff', label: 'skilt', dashed: true },
    { rect: STOREFRONT_HOTSPOTS.dor, color: '#7da8ff', label: 'dør', dashed: true },
    ...STOREFRONT_DISPLAY_ZONES.map(z => ({ rect: z.rect, color: '#ffa03c', label: z.id, id: z.id, surface: true })),
    { rect: STOREFRONT_KAMPANJE, color: '#50e08c', label: 'kampanje', dashed: true },
  ]
}

const fmt = (r: Rect) => `[${r.map(v => Math.round(v * 10) / 10).join(', ')}]`

// targets/drawZones er valgfrie: utelatt ⇒ fasade-oppsettet (uendret bruk).
// Interiørscenen sender egne soner/mål.
export default function ZoneTracer({ onApply, targets, drawZones }: {
  onApply: () => void
  targets?: Target[]
  drawZones?: DrawZone[]
}) {
  const tgts = targets ?? FACADE_TARGETS
  const zones = drawZones ?? facadeDrawZones()
  const [drag, setDrag] = useState<{ sx: number; sy: number; cx: number; cy: number } | null>(null)
  const [last, setLast] = useState<Rect | null>(null)
  const [, bump] = useState(0) // re-tegn etikettene etter «Bruk»
  // Tegne-laget fanger ALLE klikk når det er på, så hotspots/knapper UNDER
  // traceren (turistkontor/byhotell osv.) blir uklikkbare. Default AV: laget er
  // pointerEvents:none (soner vises fortsatt, klikk går gjennom til scenen); slå
  // PÅ for å dra rektangler. Toggles i panelet.
  const [traceOn, setTraceOn] = useState(false)

  function pct(e: React.PointerEvent): [number, number] {
    const r = e.currentTarget.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100]
  }

  function rectFrom(d: { sx: number; sy: number; cx: number; cy: number }): Rect {
    const x = Math.min(d.sx, d.cx), y = Math.min(d.sy, d.cy)
    return [x, y, Math.abs(d.cx - d.sx), Math.abs(d.cy - d.sy)].map(v => Math.round(v * 10) / 10) as Rect
  }

  const live = drag ? rectFrom(drag) : null

  function apply(t: Target) {
    if (!last) return
    t.set(last)
    console.log(`[ZoneTracer] ${t.id} = ${fmt(last)}  ← lim inn i districts.ts for permanent endring`)
    bump(n => n + 1)
    onApply()
  }

  const zoneBox = (rect: Rect, color: string, label: string, dashed = false, surface = false, key?: string) => (
    <div key={key ?? label} style={{
      position: 'absolute', left: `${rect[0]}%`, top: `${rect[1]}%`,
      width: `${rect[2]}%`, height: `${rect[3]}%`,
      border: `1px ${dashed ? 'dashed' : 'solid'} ${color}`,
      borderBottom: surface ? `2px solid ${color}` : undefined,
      pointerEvents: 'none',
    }}>
      <span style={{
        position: 'absolute', left: 1, top: -14, fontSize: 10, fontFamily: 'monospace',
        color, background: 'rgba(0,0,0,0.65)', padding: '0 3px', whiteSpace: 'nowrap',
      }}>{label}</span>
    </div>
  )

  return (
    <div
      onPointerDown={e => { e.preventDefault(); const [x, y] = pct(e); setDrag({ sx: x, sy: y, cx: x, cy: y }) }}
      onPointerMove={e => { if (drag) { const [x, y] = pct(e); setDrag({ ...drag, cx: x, cy: y }) } }}
      onPointerUp={() => {
        if (drag) {
          const r = rectFrom(drag)
          if (r[2] > 0.5 && r[3] > 0.5) setLast(r)
          setDrag(null)
        }
      }}
      style={{ position: 'absolute', inset: 0, zIndex: 55, cursor: traceOn ? 'crosshair' : 'default', touchAction: 'none', pointerEvents: traceOn ? 'auto' : 'none' }}
    >
      {/* Eksisterende soner i hver sin farge */}
      {zones.map(z => zoneBox(z.rect, z.color, z.label, z.dashed, z.surface, z.id ?? z.label))}

      {/* Live/siste rektangel */}
      {(live ?? last) && (
        <div style={{
          position: 'absolute',
          left: `${(live ?? last)![0]}%`, top: `${(live ?? last)![1]}%`,
          width: `${(live ?? last)![2]}%`, height: `${(live ?? last)![3]}%`,
          border: '2px solid #ffd24a', background: 'rgba(255,210,74,0.12)',
          pointerEvents: 'none',
        }}>
          <span style={{
            position: 'absolute', left: 1, bottom: -16, fontSize: 11, fontFamily: 'monospace',
            color: '#ffd24a', background: 'rgba(0,0,0,0.7)', padding: '0 4px', whiteSpace: 'nowrap',
          }}>{fmt((live ?? last)!)}</span>
        </div>
      )}

      {/* Kontrollpanel (portal — viewport-fast, upåvirket av stage) */}
      {createPortal(
        <div
          onClick={e => e.stopPropagation()}
          onPointerDown={e => e.stopPropagation()}
          style={{
            position: 'fixed', top: 64, right: 16, zIndex: 300, width: 200,
            display: 'flex', flexDirection: 'column', gap: 5,
            background: 'rgba(10,14,26,0.94)', border: '1px solid #ffd24a55',
            borderRadius: 12, padding: '10px 12px',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800 }}>🧭 Sone-tracer</div>
          <button
            style={{ ...btnStyle, background: traceOn ? 'rgba(255,210,74,0.28)' : 'rgba(255,255,255,0.06)', borderColor: traceOn ? '#ffd24a' : 'rgba(255,255,255,0.25)', color: traceOn ? '#ffd24a' : '#cbd5e1' }}
            onClick={() => setTraceOn(v => !v)}
          >{traceOn ? '✋ Tracer PÅ (klikk sperret)' : '✋ Tracer AV (klikk virker)'}</button>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4 }}>
            Slå PÅ for å dra et rektangel over scenen (klikk på hotspots sperres da).
            «Bruk» skriver rektangelet inn i sonen live (verdien logges for districts.ts).
          </div>
          <div style={{ color: '#cbd5e1', fontSize: 11, fontFamily: 'monospace' }}>
            Siste: {last ? fmt(last) : '—'}
          </div>
          <button
            style={btnStyle}
            onClick={() => {
              if (!last) return
              navigator.clipboard?.writeText(fmt(last)).catch(() => {})
              console.log(`[ZoneTracer] kopiert: ${fmt(last)}`)
            }}
          >Kopier sone</button>
          <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 2 }}>Bruk siste på:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {tgts.map(t => (
              <button key={t.id} style={{ ...btnStyle, padding: '2px 7px', fontSize: 10 }} onClick={() => apply(t)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: 'rgba(255,210,74,0.12)', color: '#ffd24a', border: '1px solid #ffd24a66',
  borderRadius: 7, padding: '4px 9px', fontSize: 11, fontWeight: 700,
  cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
}
