import { useEffect, useMemo, useRef } from 'react'
import { ROADS } from '../../data/districts'
import { prand, usePageVisible, useReducedMotion } from './anim'

// ── TrafficLayer (ANIMASJON SYNLIG DEL 3) — biler på master.png ──────────────
// Samme mønster som CustomerFlow: rAF skriver kun transform på faste noder.
// Avlange biler i dempede farger, rotert etter kjøreretning, høyre-offset for
// høyrekjøring, kort pause ved rundkjørings-punkter. 8 biler totalt.
// Pause ved skjult fane; statisk fallback ved prefers-reduced-motion.

const CAR_COLORS = ['#8a4a42', '#3e5a78', '#6b7a68', '#7d7d85', '#9a8a5a', '#5a4a6e', '#a8a8b0', '#4a6456', '#75584a', '#586878', '#8a8a72', '#6e5a5a']
// Én bil per trace-t rute (12 ruter); master-budsjettet: 3 skyer + 15 røyk
// + 5 fugler + 12 biler = 35 ≤ 40 animerte elementer.
const CAR_COUNT = 12
const RIGHT_OFFSET_PX = 3.5

interface CarSpec { road: number; offset: number; speed: number; color: string; len: number }

interface RoadGeom {
  points: [number, number][]
  segs: number[]
  total: number
  /** Kumulativ t (0–1) per punkt — for pause-deteksjon. */
  cumT: number[]
  pauseT: number[]
}

function buildGeom(): RoadGeom[] {
  return ROADS.map(r => {
    const segs: number[] = []
    let total = 0
    for (let i = 1; i < r.points.length; i++) {
      const dx = r.points[i][0] - r.points[i - 1][0]
      const dy = (r.points[i][1] - r.points[i - 1][1]) * 0.55
      segs.push(Math.hypot(dx, dy)); total += Math.hypot(dx, dy)
    }
    const cumT: number[] = [0]
    let acc = 0
    for (const s of segs) { acc += s; cumT.push(acc / total) }
    return { points: r.points, segs, total, cumT, pauseT: (r.pauseAt ?? []).map(i => cumT[i]) }
  })
}

function carPose(g: RoadGeom, t: number, W: number, H: number): { x: number; y: number; ang: number } {
  let d = t * g.total
  for (let i = 0; i < g.segs.length; i++) {
    if (d <= g.segs[i] || i === g.segs.length - 1) {
      const f = g.segs[i] === 0 ? 0 : Math.min(1, d / g.segs[i])
      const x = (g.points[i][0] + (g.points[i + 1][0] - g.points[i][0]) * f) / 100 * W
      const y = (g.points[i][1] + (g.points[i + 1][1] - g.points[i][1]) * f) / 100 * H
      const ang = Math.atan2(
        (g.points[i + 1][1] - g.points[i][1]) / 100 * H,
        (g.points[i + 1][0] - g.points[i][0]) / 100 * W,
      )
      return { x, y, ang }
    }
    d -= g.segs[i]
  }
  const last = g.points[g.points.length - 1]
  return { x: last[0] / 100 * W, y: last[1] / 100 * H, ang: 0 }
}

export default function TrafficLayer() {
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  const wrapRef = useRef<HTMLDivElement>(null)
  const carRefs = useRef<(HTMLDivElement | null)[]>([])

  const geom = useMemo(buildGeom, [])
  const cars: CarSpec[] = useMemo(() =>
    Array.from({ length: CAR_COUNT }, (_, i) => ({
      road: i % geom.length,
      offset: prand(i * 19 + 3),
      speed: 1 / (26 + prand(i * 7 + 2) * 18), // full rute på 26–44 s
      color: CAR_COLORS[i % CAR_COLORS.length],
      len: 9 + prand(i * 23 + 6) * 5,
    })), [geom])

  useEffect(() => {
    if (reduced || !visible) return
    let raf = 0
    let last = performance.now()
    const pos = cars.map(c => c.offset)
    const hold = cars.map(() => 0)
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const wrap = wrapRef.current
      if (wrap) {
        const W = wrap.clientWidth, H = wrap.clientHeight
        for (let i = 0; i < cars.length; i++) {
          const g = geom[cars[i].road]
          if (hold[i] > 0) {
            hold[i] -= dt
          } else {
            const prev = pos[i]
            pos[i] += cars[i].speed * dt
            // Kort pause ved rundkjørings-punkt som passeres.
            for (const pt of g.pauseT) {
              if (prev < pt && pos[i] >= pt) { hold[i] = 0.7 + prand(i + now % 7) * 0.8; break }
            }
            if (pos[i] > 1) pos[i] = 0 // respawn ved rutestart
          }
          const { x, y, ang } = carPose(g, pos[i], W, H)
          // Høyrekjøring: vinkelrett høyre for retningen er (-sin, cos) i
          // skjermkoordinater (y peker ned).
          const ox = -Math.sin(ang) * RIGHT_OFFSET_PX
          const oy = Math.cos(ang) * RIGHT_OFFSET_PX
          const el = carRefs.current[i]
          if (el) el.style.transform = `translate(${x + ox}px, ${y + oy}px) rotate(${ang}rad)`
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cars, geom, reduced, visible])

  // Statisk fallback: biler parkert på faste punkter langs rutene.
  if (reduced) {
    return (
      <div ref={wrapRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {cars.slice(0, 4).map((c, i) => {
          const g = geom[c.road]
          const p = g.points[Math.floor(c.offset * (g.points.length - 1))]
          return (
            <div key={i} style={{
              position: 'absolute', left: `${p[0]}%`, top: `${p[1]}%`,
              width: c.len, height: c.len * 0.45, marginLeft: -c.len / 2, marginTop: -c.len * 0.225,
              background: c.color, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
            }} />
          )
        })}
      </div>
    )
  }

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {cars.map((c, i) => (
        <div
          key={i}
          ref={el => { carRefs.current[i] = el }}
          style={{
            position: 'absolute', left: 0, top: 0,
            width: c.len, height: c.len * 0.45,
            marginLeft: -c.len / 2, marginTop: -c.len * 0.225,
            background: c.color, borderRadius: 2,
            boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
