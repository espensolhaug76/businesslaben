import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DepthScale } from '../../data/districts'

// ── DevCoordHelper / rute-tracer (?dev=1) ────────────────────────────────────
// Kalibreringsverktøy montert INNI en stage (prosent-koordinater følger
// pan/zoom via getBoundingClientRect). Funksjoner:
//  • kryss + live prosent-koordinat under musa
//  • klikk = legg punkt til aktiv rute (tegnes gult, live)
//  • «Ny rute» committer aktiv rute (oransje), «Angre» fjerner siste punkt,
//    «Kopier» eksporterer alle rutene som ferdig KUNDESTIER-element til
//    utklippstavle + konsoll
//  • valgfrie overlays: eksisterende stier (cyan), NO_GO-soner (rødt),
//    KUNDESKALA-kalibreringslinjer nær/fjern (grønt)
// Fanger alle klikk mens aktiv — rent dev-verktøy.

export const IS_DEV_COORDS =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('dev') === '1'

interface Props {
  paths?: [number, number][][]
  zones?: [number, number, number, number][]
  skala?: DepthScale
}

function fmtRoute(pts: [number, number][]): string {
  return `    [${pts.map(p => `[${p[0]}, ${p[1]}]`).join(', ')}],`
}

export default function DevCoordHelper({ paths, zones, skala }: Props) {
  const [cur, setCur] = useState<[number, number] | null>(null)
  const [route, setRoute] = useState<[number, number][]>([])
  const [done, setDone] = useState<[number, number][][]>([])
  const [showExisting, setShowExisting] = useState(true)

  // Bruksanvisning i konsollen ved oppstart av dev-modus.
  useEffect(() => {
    console.log(
      '%c[DEV] Rute-tracer aktiv (?dev=1)',
      'font-weight:bold;color:#ffd24a',
      '\n  • Klikk på bildet = legg punkt i aktiv rute (gul)' +
      '\n  • «Ny rute» = lagre aktiv rute (oransje) og start ny' +
      '\n  • «Angre punkt» = fjern siste punkt' +
      '\n  • «Kopier rute» = alle ruter til utklippstavle + konsoll, klar for KUNDESTIER' +
      '\n  • «Vis/skjul eksisterende» = stier (cyan) / no-go (rødt) / kalibrering (grønt)'
    )
  }, [])

  function pct(e: React.MouseEvent): [number, number] {
    const r = e.currentTarget.getBoundingClientRect()
    return [
      Math.round(((e.clientX - r.left) / r.width) * 1000) / 10,
      Math.round(((e.clientY - r.top) / r.height) * 1000) / 10,
    ]
  }

  function copyRoutes() {
    const all = [...done, ...(route.length >= 2 ? [route] : [])]
    const text = all.length
      ? `[\n${all.map(fmtRoute).join('\n')}\n  ]`
      : '(ingen ruter ennå)'
    console.log(`[DEV] KUNDESTIER-eksport:\n${text}`)
    navigator.clipboard?.writeText(text).catch(() => { /* konsoll-loggen holder */ })
  }

  const btn: React.CSSProperties = {
    background: 'rgba(10,14,26,0.9)', color: '#ffd24a', border: '1px solid #ffd24a66',
    borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
  }

  return (
    <div
      onMouseMove={e => setCur(pct(e))}
      onClick={e => {
        e.stopPropagation()
        const p = pct(e)
        setRoute(r => [...r, p])
        console.log(`[DEV] punkt: [${p[0]}, ${p[1]}]`)
      }}
      style={{ position: 'absolute', inset: 0, zIndex: 50, cursor: 'crosshair', pointerEvents: 'auto' }}
    >
      {/* Overlays: eksisterende data (kan skjules fra panelet) */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {showExisting && (zones ?? []).map(([x, y, w, h], i) => (
          <rect key={`z${i}`} x={x} y={y} width={w} height={h} fill="rgba(255,60,60,0.18)" stroke="rgba(255,60,60,0.8)" strokeWidth={0.15} />
        ))}
        {showExisting && (paths ?? []).map((p, i) => (
          <polyline key={`p${i}`} points={p.map(q => q.join(',')).join(' ')} fill="none" stroke="rgba(80,220,255,0.9)" strokeWidth={0.25} strokeDasharray="1 0.6" />
        ))}
        {showExisting && skala && (
          <>
            <line x1={0} y1={skala.nearY} x2={100} y2={skala.nearY} stroke="rgba(80,255,120,0.8)" strokeWidth={0.18} />
            <line x1={0} y1={skala.farY} x2={100} y2={skala.farY} stroke="rgba(80,255,120,0.8)" strokeWidth={0.18} strokeDasharray="1.5 0.8" />
          </>
        )}
        {done.map((p, i) => (
          <polyline key={`d${i}`} points={p.map(q => q.join(',')).join(' ')} fill="none" stroke="rgba(255,160,60,0.95)" strokeWidth={0.3} />
        ))}
        {route.length > 0 && (
          <polyline points={route.map(q => q.join(',')).join(' ')} fill="none" stroke="#ffd24a" strokeWidth={0.32} />
        )}
        {route.map(([x, y], i) => (
          <circle key={`c${i}`} cx={x} cy={y} r={0.35} fill="#ffd24a" />
        ))}
      </svg>

      {/* Kalibreringslinje-labels */}
      {showExisting && skala && (
        <>
          <DevLabel x={1} y={skala.nearY} text={`nær ${skala.nearH}`} />
          <DevLabel x={1} y={skala.farY} text={`fjern ${skala.farH}`} />
        </>
      )}

      {/* Kryss + koordinat */}
      {cur && (
        <>
          <div style={{ position: 'absolute', left: `${cur[0]}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,80,80,0.6)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: `${cur[1]}%`, left: 0, right: 0, height: 1, background: 'rgba(255,80,80,0.6)', pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', left: `${cur[0]}%`, top: `${cur[1]}%`,
            transform: 'translate(8px, 8px)', fontFamily: 'monospace', fontSize: 11,
            background: 'rgba(0,0,0,0.75)', color: '#ffd24a', padding: '1px 5px', borderRadius: 4,
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>[{cur[0]}, {cur[1]}]</div>
        </>
      )}

      {/* Kontrollpanel: portales til body med fast viewport-posisjon —
          inne i stagen ville det havnet i stage-hjørnet, som i cover-modus
          ligger UTENFOR skjermen (det var derfor knappene var usynlige). */}
      {createPortal(
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', top: 64, right: 16, zIndex: 300,
            display: 'flex', flexDirection: 'column', gap: 6,
            background: 'rgba(10,14,26,0.92)', border: '1px solid #ffd24a55',
            borderRadius: 12, padding: '10px 12px',
            fontFamily: "'Outfit', sans-serif", cursor: 'default',
          }}
        >
          <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800 }}>🛠 Rute-tracer</div>
          <div style={{ color: '#cbd5e1', fontSize: 11 }}>
            Aktiv rute: {route.length} punkt{route.length === 1 ? '' : 'er'} · {done.length} rute{done.length === 1 ? '' : 'r'} klare
          </div>
          <button style={btn} onClick={() => { if (route.length >= 2) setDone(d => [...d, route]); setRoute([]) }}>
            Ny rute
          </button>
          <button style={btn} onClick={() => setRoute(r => r.slice(0, -1))}>Angre punkt</button>
          <button style={btn} onClick={copyRoutes}>Kopier rute</button>
          <button style={btn} onClick={() => setShowExisting(v => !v)}>
            {showExisting ? 'Skjul' : 'Vis'} eksisterende
          </button>
        </div>,
        document.body,
      )}
    </div>
  )
}

function DevLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translateY(-100%)',
      fontFamily: 'monospace', fontSize: 10, color: '#50ff78',
      background: 'rgba(0,0,0,0.6)', padding: '0 4px', borderRadius: 3, pointerEvents: 'none',
    }}>{text}</div>
  )
}
