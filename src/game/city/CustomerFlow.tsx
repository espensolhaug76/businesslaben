import { useEffect, useMemo, useRef, useState } from 'react'
import { KUNDESTIER, KUNDESKALA, NO_GO, type District } from '../../data/districts'
import { marketingModifier, reputationModifier } from '../engine'
import { useGame } from '../GameContext'
import { prand, usePageVisible, useReducedMotion } from './anim'
import { IS_DEV_COORDS } from './DevCoordHelper'

// ── CustomerFlow (LEVENDE BY DEL 3) — kundestrøm i bydelsbildet ──────────────
// Små prikker vandrer langs stiene i KUNDESTIER. Tettheten er pedagogisk
// koblet til spillstate med NØYAKTIG samme kurver som månedssimuleringen:
//   antall = basistrafikk(bydel) × marketingModifier(budsjett) × reputationModifier(rykte)
// rAF-løkka oppdaterer kun transform på faste DOM-noder (ingen re-render,
// ingen layout). Maks 24 prikker. Pauses når fanen er skjult; ved
// prefers-reduced-motion vises en statisk indikator i stedet.

// Basis hevet 12→18 for sentrum/Høy (SPRITE-FOTGJENGERE): det nye
// bydelsbildet har nesten tomme gater og trenger flere folk for god drift.
const BASE_DOTS: Record<District['trafikk'], number> = { 'Høy': 18, 'Middels': 7, 'Lav': 4 }
const MAX_DOTS = 24
// Genererte fotgjenger-gallerier (scripts/cut-pedestrians.py).
// SIDE-GALLERIET ER PARKERT (Espen 2026-06-12): profil-sprites leser som
// sidelengs/baklengs gange på gateløpene — alle figurer rendres nå front
// (nedover skjermen) eller rygg (oppover), uansett segmentvinkel.
// pedestrian_01..12.png (side) ligger fortsatt på disk for evt. ¾-ark senere.
// Visuelt tunge gruppefigurer (par/vogn/følge) spawner med ~halv
// sannsynlighet. Trekket er UTEN tilbakelegging (Efraimidis–Spirakis,
// deterministisk): to identiske figurer side om side så ødelagt ut —
// med maks 24 samtidige og 24 unike figurer trengs aldri duplikater.
const HEAVY_FIGS = new Set([15, 16, 18, 20, 22, 23, 24])
const FIGURE_COUNT = 24
function pickFigures(count: number): number[] {
  const keyed: { n: number; key: number }[] = []
  for (let n = 1; n <= FIGURE_COUNT; n++) {
    const w = HEAVY_FIGS.has(n) ? 1 : 2
    keyed.push({ n, key: Math.pow(prand(n * 31 + 7), 1 / w) })
  }
  keyed.sort((a, b) => b.key - a.key)
  return keyed.slice(0, Math.min(count, FIGURE_COUNT)).map(k => k.n)
}
// Fartsklasser (GANGE-TUNING DEL 1): jogger beholder gammelt tempo som
// kontrast; eldre/rullator/par tregest; alle andre 40–70 s per stilengde.
const JOGGER_FIGS = new Set([17])
const SLOW_FIGS = new Set([6, 22, 23, 24])
function speedFor(sprite: number, seed: number): number {
  if (JOGGER_FIGS.has(sprite)) return 1 / (22 + prand(seed) * 8)   // 22–30 s
  if (SLOW_FIGS.has(sprite)) return 1 / (62 + prand(seed) * 18)    // 62–80 s
  return 1 / (40 + prand(seed) * 30)                               // 40–70 s
}
type Gallery = 'front' | 'back'
const GALLERY_PREFIX: Record<Gallery, string> = {
  front: 'pedestrian_front_', back: 'pedestrian_back_',
}
const pedestrianSrc = (g: Gallery, n: number) =>
  `/assets/city/${GALLERY_PREFIX[g]}${String(n).padStart(2, '0')}.png`
// Perspektivskala (FOTGJENGER-FIX DEL 1): høyden interpoleres mellom
// kalibreringslinjene i KUNDESKALA etter y-posisjon. Per-figur-variasjon
// ±7 % oppå. Skala påføres som transform: scale() med origin i føttene —
// ren komposittering, ingen layout per frame.
const FIG_VAR_MIN = 0.93, FIG_VAR_MAX = 1.07
const FALLBACK_SKALA = { nearY: 92, nearH: 0.07, farY: 30, farH: 0.04 }

interface DotSpec { path: number; offset: number; dir: 1 | -1; speed: number; sprite: number; figVar: number; bobPhase: number; pauseT: number[] }

function pathLengths(path: [number, number][]): { segs: number[]; total: number } {
  const segs: number[] = []
  let total = 0
  for (let i = 1; i < path.length; i++) {
    // Prosent-rom; y vektes 0.55 for å speile bildets liggende format.
    const dx = path[i][0] - path[i - 1][0], dy = (path[i][1] - path[i - 1][1]) * 0.55
    const len = Math.hypot(dx, dy)
    segs.push(len); total += len
  }
  return { segs, total }
}

/** Posisjon + segmentindeks for t ∈ [0,1] langs polylinjen. */
function pointAt(path: [number, number][], segs: number[], total: number, t: number): [number, number, number] {
  let d = t * total
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const f = segs[i] === 0 ? 0 : Math.min(1, d / segs[i])
      return [
        path[i][0] + (path[i + 1][0] - path[i][0]) * f,
        path[i][1] + (path[i + 1][1] - path[i][1]) * f,
        i,
      ]
    }
    d -= segs[i]
  }
  const last = path[path.length - 1]
  return [last[0], last[1], segs.length - 1]
}

export default function CustomerFlow({ district }: { district: District }) {
  const { state } = useGame()
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hover, setHover] = useState(false)

  const rawPaths = KUNDESTIER[district.id]
  // Tom liste er gyldig tilstand (stier ikke trace-t ennå) — fallback-chip.
  const paths = rawPaths && rawPaths.length > 0 ? rawPaths : undefined

  const totalMarketing = Object.values(state.marketingBudget).reduce((s, v) => s + v, 0)
  const mktMod = marketingModifier(totalMarketing)
  const repMod = reputationModifier(state.reputation)
  const dotCount = Math.max(2, Math.min(MAX_DOTS, Math.round(BASE_DOTS[district.trafikk] * mktMod * repMod)))

  const geom = useMemo(() => (paths ?? []).map(p => ({ path: p, ...pathLengths(p) })), [paths])

  const dots: DotSpec[] = useMemo(() => {
    const figs = pickFigures(dotCount) // vektet, uten duplikater
    return Array.from({ length: dotCount }, (_, i) => {
      const sprite = figs[i]
      return {
        path: paths ? i % paths.length : 0,
        offset: prand(i * 7 + 1),
        dir: (prand(i * 13 + 2) > 0.5 ? 1 : -1) as 1 | -1,
        speed: speedFor(sprite, i * 3 + 5),
        sprite,
        figVar: FIG_VAR_MIN + prand(i * 11 + 4) * (FIG_VAR_MAX - FIG_VAR_MIN),
        bobPhase: prand(i * 5 + 8) * Math.PI * 2,
        // Pausepunkter (DEL 2): 2 tilfeldige t-posisjoner der figuren
        // stopper 2–6 s («ser i butikkvindu») når den passerer.
        pauseT: [0.15 + prand(i * 53 + 3) * 0.7, 0.15 + prand(i * 67 + 9) * 0.7].sort(),
      }
    })
  }, [dotCount, paths])

  const skala = KUNDESKALA[district.id] ?? FALLBACK_SKALA

  // Dev-sjekker (kun DEV): segmentvinkler og no-go-brudd i stiene.
  useEffect(() => {
    if (!import.meta.env.DEV || !paths) return
    paths.forEach((p, pi) => {
      // (Vinkel-sjekken for sidevisnings-sprites er fjernet — side-galleriet
      // er parkert og front/rygg fungerer i alle segmentretninger.)
      const zones = NO_GO[district.id] ?? []
      for (const [x, y] of p) {
        for (const [zx, zy, zw, zh] of zones) {
          if (x >= zx && x <= zx + zw && y >= zy && y <= zy + zh) {
            console.warn(`[CustomerFlow] sti ${pi}: punkt [${x},${y}] ligger i no-go-sone [${zx},${zy},${zw},${zh}]`)
          }
        }
      }
    })
  }, [paths, district.id])

  // Antall-logg (DEL 1): synliggjør faktorene bak tettheten.
  useEffect(() => {
    console.log(
      `[CustomerFlow] ${district.id}: ${dotCount} silhuetter = basis ${BASE_DOTS[district.trafikk]} (${district.trafikk})` +
      ` × markedsføring ${mktMod.toFixed(2)} (budsjett ${totalMarketing} kr) × rykte ${repMod.toFixed(2)} (${state.reputation})`
    )
  }, [district.id, district.trafikk, dotCount, mktMod, repMod, totalMarketing, state.reputation])

  // rAF-løkke: skriver kun style.transform på faste noder. flipX settes bare
  // når gangretningen faktisk snur (arket er venstre-vendt).
  useEffect(() => {
    if (!paths || reduced || !visible) return
    let raf = 0
    let last = performance.now()
    const pos = dots.map(d => d.offset)
    const dir = dots.map(d => d.dir as number)
    const lastX = dots.map(() => NaN)
    const lastY = dots.map(() => NaN)
    // RETNINGS-GALLERIER: galleri og facing bestemmes PER SEGMENT (og per
    // gangretning) — deterministisk fra segmentets skjermvinkel, aldri midt
    // på et segment. Figurnummeret beholdes på tvers av galleribytter.
    // FLIP-KONVENSJON: side-arket er venstre-vendt ⇒ scaleX(1) = mot
    // venstre, scaleX(-1) = mot høyre. Transform skrives hver frame så en
    // React-re-render aldri etterlater en stale, baklengs-gående figur.
    const lastSeg = dots.map(() => -1)
    const lastDirSeg = dots.map(() => 0)
    const gallery: Gallery[] = dots.map(() => 'front')
    const hold = dots.map(() => 0) // gjenstående pausetid (s)
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const wrap = wrapRef.current
      if (wrap) {
        const W = wrap.clientWidth, H = wrap.clientHeight
        const baseHPx = skala.nearH * H // container-høyden (nær-skala)
        let pausedNow = 0
        for (let i = 0; i < dots.length; i++) {
          // Pauser (DEL 2): stå stille ved pausepunkter og ende-snu —
          // stillestående figurer glir ikke.
          if (hold[i] > 0) {
            hold[i] -= dt
            pausedNow++
          } else {
            const prev = pos[i]
            pos[i] += dots[i].speed * dt * dir[i]
            for (const pt of dots[i].pauseT) {
              if ((prev < pt && pos[i] >= pt) || (prev > pt && pos[i] <= pt)) {
                hold[i] = 2 + Math.random() * 4
                break
              }
            }
            // Lengre dvale ved ende-snu (5–10 s) — løfter pause-andelen
            // til ~20–30 % sammen med de to 2–6 s butikkvindu-stoppene.
            if (pos[i] > 1) { pos[i] = 1; dir[i] = -1; hold[i] = 5 + Math.random() * 5 }
            if (pos[i] < 0) { pos[i] = 0; dir[i] = 1; hold[i] = 5 + Math.random() * 5 }
          }
          const g = geom[dots[i].path]
          const [x, y, seg] = pointAt(g.path, g.segs, g.total, pos[i])
          const px = (x / 100) * W
          // Perspektivskala (DEL 1): interpolér høyde mellom fjern- og
          // nær-linja etter y, klem utenfor, og påfør som scale() rundt
          // føttene — ren compositor-operasjon.
          const f = Math.min(1, Math.max(0, (y - skala.farY) / (skala.nearY - skala.farY)))
          const hFrac = (skala.farH + (skala.nearH - skala.farH) * f) * dots[i].figVar
          const s = hFrac / skala.nearH
          // Mikro-liv (DEL 2): bobbing ±1,5 px med frekvens ∝ fart
          // (jogger vipper raskt, rullator sakte) + sideveis sváiing
          // ±0,5 px på ~halv frekvens. Fryses helt under pause.
          const walking = hold[i] <= 0
          // ~2 skritt/s ved normal fart (speed ≈ 0,018/s → ×110 ≈ 2 Hz).
          // Amplituden er BEVISST diskré (±0,6 px nær, mindre i dybden —
          // skalert med perspektivet s) etter at ±1,5 px så ut som humping.
          const freqHz = dots[i].speed * 110
          const bob = walking ? Math.sin((now / 1000) * freqHz * 2 * Math.PI + dots[i].bobPhase) * 0.6 * s : 0
          const sway = walking ? Math.sin((now / 1000) * freqHz * 0.45 * 2 * Math.PI + dots[i].bobPhase * 1.7) * 0.3 * s : 0
          const el = dotRefs.current[i]
          if (el) {
            // Container-bunnen (føttene) pinnes på sti-punktet; scale med
            // origin i bunnen bevarer fotpunktet.
            el.style.transform = `translate(${px + sway}px, ${(y / 100) * H - baseHPx + bob}px) scale(${s.toFixed(4)})`
            // Dybdesortering: lavere på skjermen = nærmere = over.
            el.style.zIndex = String(100 + Math.round(y * 10))
            const py = (y / 100) * H
            const dx = px - lastX[i]
            const dy = py - lastY[i]
            // Galleri rekalkuleres KUN ved segmentskifte eller snudd
            // gangretning: front når figuren beveger seg nedover skjermen,
            // rygg oppover. (Side-galleriet er parkert.)
            if (seg !== lastSeg[i] || dir[i] !== lastDirSeg[i]) {
              lastSeg[i] = seg
              lastDirSeg[i] = dir[i]
              const pth = g.path
              const sdy = (pth[seg + 1][1] - pth[seg][1]) * dir[i]
              const gal: Gallery = sdy >= 0 ? 'front' : 'back'
              if (gal !== gallery[i]) {
                gallery[i] = gal
                const img = el.querySelector('img')
                if (img) img.src = pedestrianSrc(gal, dots[i].sprite)
              }
            }
            // Dev-pil (?dev=1): viser faktisk bevegelsesretning over figuren.
            if (IS_DEV_COORDS && Number.isFinite(dx) && (dx !== 0 || dy !== 0)) {
              const arrow = el.querySelector('[data-devarrow]') as HTMLElement | null
              if (arrow) arrow.style.transform = `translateX(-50%) rotate(${Math.atan2(dy, dx)}rad)`
            }
            lastX[i] = px
            lastY[i] = py
          }
        }
        // Måleflate for pause-andelen (~20–30 % er målet).
        ;(window as unknown as Record<string, unknown>).__FLOW_PAUSED__ = pausedNow
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [dots, geom, paths, reduced, visible, skala])

  if (!paths) {
    // Ingen stier trace-t ennå: statisk indikator midt i gatebildet.
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '58%',
        transform: 'translate(-50%, -50%)', fontFamily: "'Outfit', sans-serif",
        background: 'rgba(10,14,26,0.8)', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 99, padding: '0.3rem 0.8rem', color: '#f1f5f9',
        fontSize: 12, fontWeight: 700, pointerEvents: 'none', zIndex: 2,
      }}>
        👥 Kundetrafikk: {district.trafikk}
      </div>
    )
  }

  // Hover-korridor: bounding box rundt alle stiene + litt luft.
  const xs = paths.flat().map(p => p[0]), ys = paths.flat().map(p => p[1])
  const bbox = {
    x: Math.min(...xs) - 3, y: Math.min(...ys) - 3,
    w: Math.max(...xs) - Math.min(...xs) + 6, h: Math.max(...ys) - Math.min(...ys) + 6,
  }

  const tooltip = hover && (
    <div style={{
      position: 'absolute', left: `${bbox.x + bbox.w / 2}%`, top: `${bbox.y + 6}%`,
      transform: 'translate(-50%, -100%)', pointerEvents: 'none', zIndex: 5,
      background: 'rgba(10,14,26,0.9)', border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 10, padding: '0.4rem 0.75rem', fontFamily: "'Outfit', sans-serif",
      color: '#f1f5f9', whiteSpace: 'nowrap',
    }}>
      <div style={{ fontSize: 12, fontWeight: 800 }}>Kundetrafikk: {district.trafikk}</div>
      <div style={{ fontSize: 10, color: '#94a3b8' }}>
        rykte ×{repMod.toFixed(2)} · markedsføring ×{mktMod.toFixed(2)}
      </div>
    </div>
  )

  if (reduced) {
    // Statisk indikator i stedet for bevegelse.
    return (
      <div style={{
        position: 'absolute', left: `${bbox.x + bbox.w / 2}%`, top: `${bbox.y + bbox.h / 2}%`,
        transform: 'translate(-50%, -50%)', fontFamily: "'Outfit', sans-serif",
        background: 'rgba(10,14,26,0.8)', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 99, padding: '0.3rem 0.8rem', color: '#f1f5f9',
        fontSize: 12, fontWeight: 700, pointerEvents: 'none',
      }}>
        👥 Kundetrafikk: {district.trafikk}
      </div>
    )
  }

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      {/* Hover-korridor for tooltip */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'absolute', left: `${bbox.x}%`, top: `${bbox.y}%`,
          width: `${bbox.w}%`, height: `${bbox.h}%`, pointerEvents: 'auto',
        }}
      />
      {tooltip}
      {dots.map((d, i) => (
        <div
          key={i}
          ref={el => { dotRefs.current[i] = el }}
          style={{
            // Container: 0 bredde, høyde = nær-skalaen i % av stagen.
            // rAF setter translate + scale(s) med origin i føttene, så
            // perspektivkrympingen er ren komposittering.
            position: 'absolute', left: 0, top: 0, width: 0,
            height: `${(KUNDESKALA[district.id] ?? FALLBACK_SKALA).nearH * 100}%`,
            transformOrigin: '0 100%',
            willChange: 'transform',
          }}
        >
          {/* Myk ellipse-skygge under føttene — høyde i % av figuren,
              bredde via aspect-ratio (skalerer med zoom som figuren) */}
          <div style={{
            position: 'absolute', bottom: '-4%', left: 0,
            transform: 'translateX(-50%)',
            height: '10%', aspectRatio: '4.2',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(0,0,0,0.35), rgba(0,0,0,0) 72%)',
          }} />
          {/* Dev-pil (?dev=1): bevegelsesretning, rotert i rAF */}
          {IS_DEV_COORDS && (
            <div data-devarrow style={{
              position: 'absolute', bottom: '112%', left: 0,
              transform: 'translateX(-50%)', color: '#ffd24a',
              fontSize: 14, lineHeight: 1, textShadow: '0 1px 2px #000',
              pointerEvents: 'none',
            }}>➤</div>
          )}
          <img
            src={pedestrianSrc('front', d.sprite)}
            alt=""
            draggable={false}
            style={{
              position: 'absolute', bottom: 0, left: 0, height: '100%', width: 'auto',
              // Global stylesheet setter img { max-width: 100% } — i en
              // 0-bredde-container kollapser det bildet til 0. Overstyr.
              maxWidth: 'none',
              transform: 'translateX(-50%)', userSelect: 'none',
              filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,0.35))',
            }}
          />
        </div>
      ))}
    </div>
  )
}
