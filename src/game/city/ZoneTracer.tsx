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

type Rect = [number, number, number, number]

interface Target {
  id: string
  label: string
  get: () => Rect
  set: (r: Rect) => void
}

const TARGETS: Target[] = [
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

const fmt = (r: Rect) => `[${r.map(v => Math.round(v * 10) / 10).join(', ')}]`

export default function ZoneTracer({ onApply }: { onApply: () => void }) {
  const [drag, setDrag] = useState<{ sx: number; sy: number; cx: number; cy: number } | null>(null)
  const [last, setLast] = useState<Rect | null>(null)
  const [, bump] = useState(0) // re-tegn etikettene etter «Bruk»

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
      style={{ position: 'absolute', inset: 0, zIndex: 55, cursor: 'crosshair', touchAction: 'none' }}
    >
      {/* Eksisterende soner i hver sin farge */}
      {zoneBox(STOREFRONT_HOTSPOTS.vindu, '#50dcff', 'vindu')}
      {zoneBox(STOREFRONT_HOTSPOTS.skilt, '#7da8ff', 'skilt', true)}
      {zoneBox(STOREFRONT_HOTSPOTS.dor, '#7da8ff', 'dør', true)}
      {STOREFRONT_DISPLAY_ZONES.map(z => zoneBox(z.rect, '#ffa03c', z.id, false, true, z.id))}
      {zoneBox(STOREFRONT_KAMPANJE, '#50e08c', 'kampanje', true)}

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
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4 }}>
            Dra et rektangel over fasaden. «Bruk» skriver det inn i sonen live
            (verdien logges for districts.ts).
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
            {TARGETS.map(t => (
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
