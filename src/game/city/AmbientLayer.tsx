import { useEffect, useRef, useState } from 'react'
import { SMOKESTACKS } from '../../data/districts'
import { prand, usePageVisible } from './anim'
import './cityAnim.css'

// ── AmbientLayer (LEVENDE BY DEL 1) — rent kode-lag over master.png ──────────
// Skyskygger + pipe-røyk + fugleflokk. Alt er transform/opacity-animasjoner;
// totalt ~23 animerte elementer (3 skyer + 15 røykpartikler + 5 fugler).
// Pauses via .anim-paused (CSS) + stoppede timere når fanen er skjult.
// Rendres IKKE ved prefers-reduced-motion (gates i CityMapView).

const CLOUDS = [
  { w: 55, h: 38, top: -10, dur: 120, delay: 0,   op: 0.10 },
  { w: 42, h: 30, top: 25,  dur: 95,  delay: -40, op: 0.12 },
  { w: 64, h: 44, top: 55,  dur: 140, delay: -85, op: 0.08 },
]

const SMOKE_PER_STACK = 5

export default function AmbientLayer() {
  const visible = usePageVisible()
  return (
    <div
      className={visible ? undefined : 'anim-paused'}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {/* Skyskygger — wrapper (full stage) animeres så translate-% er
          scene-relativ og loopen blir sømløs */}
      {CLOUDS.map((c, i) => (
        <div key={`cloud${i}`} style={{
          position: 'absolute', inset: 0,
          animation: `cloud-drift ${c.dur}s linear ${c.delay}s infinite`,
          willChange: 'transform',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: `${c.top}%`,
            width: `${c.w}%`, height: `${c.h}%`,
            background: `radial-gradient(closest-side, rgba(10,16,12,${c.op}), rgba(10,16,12,0) 72%)`,
          }} />
        </div>
      ))}

      {/* Røyk fra industripipene */}
      {SMOKESTACKS.map(([x, y], si) => (
        <div key={`stack${si}`} style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
          {Array.from({ length: SMOKE_PER_STACK }, (_, pi) => {
            const seed = si * 17 + pi
            const dur = 5 + prand(seed) * 4
            const delay = (pi / SMOKE_PER_STACK) * dur
            const drift = (prand(seed + 5) - 0.3) * 36
            const size = 5 + prand(seed + 9) * 5
            return (
              <div key={pi} style={{
                position: 'absolute', left: -size / 2, top: -size / 2,
                width: size, height: size, borderRadius: '50%',
                background: 'rgba(224,222,216,0.55)', filter: 'blur(2px)',
                animation: `smoke-rise ${dur.toFixed(1)}s linear ${delay.toFixed(1)}s infinite`,
                ['--smoke-drift' as string]: `${drift.toFixed(0)}px`,
                willChange: 'transform, opacity',
              }} />
            )
          })}
        </div>
      ))}

      <BirdFlock paused={!visible} />
    </div>
  )
}

// ── Fugleflokk — 3-5 silhuetter krysser øvre del, intervall 30–90 s ──────────

function BirdFlock({ paused }: { paused: boolean }) {
  const [flight, setFlight] = useState<{ id: number; y: number; dur: number; count: number } | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (paused) {
      if (timer.current) { window.clearTimeout(timer.current); timer.current = null }
      return
    }
    if (flight) return // en flokk er underveis; neste planlegges når den lander
    const wait = flight === null && timer.current === null ? 6_000 + Math.random() * 24_000 : 0
    timer.current = window.setTimeout(() => {
      timer.current = null
      const id = Date.now()
      const dur = 18 + Math.random() * 10
      setFlight({ id, y: 4 + Math.random() * 18, dur, count: 3 + Math.floor(Math.random() * 3) })
      // Rydd flokken når den er ute av bildet; neste intervall 30–90 s.
      window.setTimeout(() => {
        setFlight(null)
      }, (dur + 1) * 1000)
    }, wait || 30_000 + Math.random() * 60_000)
    return () => { if (timer.current) { window.clearTimeout(timer.current); timer.current = null } }
  }, [paused, flight])

  if (!flight) return null
  return (
    <div key={flight.id} style={{
      position: 'absolute', inset: 0,
      animation: `bird-cross ${flight.dur}s linear forwards`,
      willChange: 'transform',
    }}>
      {Array.from({ length: flight.count }, (_, i) => (
        <svg key={i} width="16" height="8" viewBox="0 0 16 8" style={{
          position: 'absolute',
          left: i * 14 + prand(flight.id + i) * 8,
          top: `calc(${flight.y}% + ${(i % 2) * 7 + prand(flight.id + i + 3) * 5}px)`,
          opacity: 0.55,
        }}>
          <path d="M0 6 Q4 0 8 5 Q12 0 16 6" stroke="#1c2430" strokeWidth="1.6" fill="none"
            style={{ animation: `bird-flap ${(0.5 + prand(flight.id + i) * 0.25).toFixed(2)}s ease-in-out infinite`, transformOrigin: '50% 70%' }} />
        </svg>
      ))}
    </div>
  )
}
