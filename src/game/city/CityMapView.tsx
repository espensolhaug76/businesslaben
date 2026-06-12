import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DISTRICTS, ROADS, polygonCentroid, districtOfLokale } from '../../data/districts'
import { useGame } from '../GameContext'
import AmbientLayer from './AmbientLayer'
import TrafficLayer from './TrafficLayer'
import DevCoordHelper, { IS_DEV_COORDS } from './DevCoordHelper'
import { useReducedMotion } from './anim'
import './cityAnim.css'

// ── CityMapView — masternivået i bybilde-arkitekturen ─────────────────────────
// master.png fyller skjermen (cover) på en «stage» med bildets aspekt, med
// begrenset pan/zoom: stage-kantene kan aldri komme innenfor viewporten, så
// ingen pixel-utflyting. SVG-overlayet deler prosent-koordinatsystemet med
// districts.ts (viewBox 0–100, preserveAspectRatio none).

const IMG = '/assets/city/master.png'
const ASPECT = 1408 / 768
const MAX_ZOOM = 2.5

interface Viewport { w: number; h: number }

function stageSize(vp: Viewport) {
  // Cover: minste stage med bildets aspekt som dekker hele viewporten.
  const scale = Math.max(vp.w / ASPECT, vp.h)
  return { w: scale * ASPECT, h: scale }
}

export default function CityMapView() {
  const navigate = useNavigate()
  const { state } = useGame()
  const [vp, setVp] = useState<Viewport>({ w: window.innerWidth, h: window.innerHeight })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState<string | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [zoomTarget, setZoomTarget] = useState<string | null>(null)
  const drag = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null)
  const moved = useRef(false)
  // LEVENDE BY DEL 2: lett musparallakse (maks ±8 px, ease-out via transition).
  const reduced = useReducedMotion()
  const [par, setPar] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const stage = stageSize(vp)

  const clampPan = useCallback((x: number, y: number, z: number) => {
    // Stage sentreres; pan-grensen er hvor mye stage stikker utenfor viewporten.
    const maxX = Math.max(0, (stage.w * z - vp.w) / 2)
    const maxY = Math.max(0, (stage.h * z - vp.h) / 2)
    return { x: Math.min(maxX, Math.max(-maxX, x)), y: Math.min(maxY, Math.max(-maxY, y)) }
  }, [stage.w, stage.h, vp.w, vp.h])

  function onWheel(e: React.WheelEvent) {
    const z = Math.min(MAX_ZOOM, Math.max(1, zoom - e.deltaY * 0.0015))
    setZoom(z)
    setPan(p => clampPan(p.x, p.y, z))
  }
  function onPointerDown(e: React.PointerEvent) {
    drag.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y }
    moved.current = false
  }
  function onPointerMove(e: React.PointerEvent) {
    setMouse({ x: e.clientX, y: e.clientY })
    if (drag.current) {
      const dx = e.clientX - drag.current.sx, dy = e.clientY - drag.current.sy
      if (Math.abs(dx) + Math.abs(dy) > 6) moved.current = true
      setPan(clampPan(drag.current.px + dx, drag.current.py + dy, zoom))
      return
    }
    if (!reduced && !zoomTarget) {
      // Parallakse: -8..8 px mot musposisjonen, glattet av CSS-transition.
      setPar({
        x: ((e.clientX / vp.w) - 0.5) * -16,
        y: ((e.clientY / vp.h) - 0.5) * -16,
      })
    }
  }
  function onPointerUp() { drag.current = null }

  function openDistrict(id: string) {
    if (moved.current) return // drag, ikke klikk
    // Zoom-transition mot polygonets centroid, så navigasjon.
    const d = DISTRICTS.find(x => x.id === id)!
    const [cx, cy] = polygonCentroid(d.polygon)
    const z = 2.2
    // Flytt centroid-punktet til viewport-sentrum ved zoom z.
    const px = (50 - cx) / 100 * stage.w * z
    const py = (50 - cy) / 100 * stage.h * z
    setZoomTarget(id)
    setZoom(z)
    setPan(clampPan(px, py, z))
    window.setTimeout(() => navigate(`/game/d/${id}`), 450)
  }

  const rentedDistrict = districtOfLokale(state.rentedLocationId)
  const hovered = DISTRICTS.find(d => d.id === hover)

  return (
    <div
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#16221a', cursor: drag.current ? 'grabbing' : 'grab', touchAction: 'none' }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Parallakse-wrapper (egen transform så den ikke slåss med pan/zoom) */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${par.x}px, ${par.y}px)`,
        transition: 'transform 0.4s ease-out', willChange: 'transform',
      }}>
      <div
        style={{
          position: 'absolute',
          left: (vp.w - stage.w) / 2, top: (vp.h - stage.h) / 2,
          width: stage.w, height: stage.h,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: zoomTarget ? 'transform 0.45s ease-in' : drag.current ? 'none' : 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      >
        <img src={IMG} alt="Bykart" draggable={false} style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }} />
        {/* LEVENDE BY DEL 1: ambient-lag (skyer/røyk/fugler) — slått av ved
            prefers-reduced-motion */}
        {!reduced && <AmbientLayer />}
        {/* ANIMASJON SYNLIG DEL 3: biltrafikk (egen reduced-fallback inni) */}
        <TrafficLayer />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {DISTRICTS.map(d => (
            <polygon
              key={d.id}
              points={d.polygon.map(p => p.join(',')).join(' ')}
              fill={hover === d.id ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.01)'}
              stroke={hover === d.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.18)'}
              strokeWidth={hover === d.id ? 0.4 : 0.2}
              style={{ cursor: 'pointer', transition: 'fill 0.15s', pointerEvents: 'auto' }}
              vectorEffect="non-scaling-stroke"
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(h => (h === d.id ? null : h))}
              onClick={() => openDistrict(d.id)}
            />
          ))}
        </svg>
        {/* ?dev=1: rute-tracer for kalibrering av SMOKESTACKS/ROADS/polygons
            — eksisterende bilruter vises som overlay */}
        {IS_DEV_COORDS && <DevCoordHelper paths={ROADS.map(r => r.points)} />}
        {/* Pin på bydelen der spilleren leier — myk puls (DEL 2) */}
        {rentedDistrict && (() => {
          const [cx, cy] = polygonCentroid(rentedDistrict.polygon)
          return (
            <div className={reduced ? undefined : 'pin-pulse'} style={{
              position: 'absolute', left: `${cx}%`, top: `${cy}%`,
              transform: 'translate(-50%, -100%)', pointerEvents: 'none',
              fontSize: 26, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}>📍</div>
          )
        })()}
      </div>
      </div>

      {/* Hover-tooltip */}
      {hovered && !zoomTarget && (
        <div style={{
          position: 'fixed', left: mouse.x + 14, top: mouse.y + 14, zIndex: 80,
          background: 'rgba(10,14,26,0.92)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 12, padding: '0.5rem 0.9rem', pointerEvents: 'none',
          fontFamily: "'Outfit', sans-serif", color: '#f1f5f9', maxWidth: 260,
        }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{hovered.navn}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
            Leienivå {hovered.leieniva.toLocaleString('nb-NO')} kr/mnd · Trafikk: {hovered.trafikk}
          </div>
        </div>
      )}
    </div>
  )
}
