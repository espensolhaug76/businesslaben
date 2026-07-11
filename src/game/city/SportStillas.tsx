// ─── SportStillas — /dev/sport (eksperiment/autonom-sport) ────────────────────
//
// Frittstående dev-scene (IKKE koblet til onboarding/spillflyten) som viser den
// autonomt byggede SPORTSBUTIKKEN: det bakte, ferdig møblerte interiøret
// (sport-interior-uten-disk.png) med FASTE, kalibrerte vareplasser oppå — hver
// plass viser én NB-generert sport-vare (public/assets/raw/sport/).
//
//   /dev/sport         → ferdig stocket butikk (les-modus)
//   /dev/sport?dev=1    → kalibrerings-tracer med TO moduser:
//     📦 Vare-modus: klikk TOM scene = ny plass (snapper til nærmeste
//        hyllelinje hvis nær). Klikk på/nær eksisterende plass = SELEKTER
//        (flytt ved å dra, ± skala/rot, høyreklikk = slett). Esc = avvelg.
//     📏 Linje-modus: 2 klikk = ny hyllelinje. Dra endepunkt-håndtak = juster.
//        ± = skala i hver ende (interpoleres langs linjen). Preview-sko vises
//        PÅ linjen. Vareplasser snapper hit (bunn-ankret, arver skala).
//   «📋 Kopier» dumper BÅDE vareplasser og hyllelinjer klart til innliming i
//   SPORT (industryDefinition.ts).

import { useEffect, useRef, useState } from 'react'
import { IS_DEV_COORDS } from './DevCoordHelper'
import { SPORT, type Vareplass, type PlassType, type Hyllelinje } from '../data/industryDefinition'
import { SPORT_VARER, sportVareById, repVareForType } from '../data/sportVarer'

// Disk-fri interiør (Espen fjernet den cafe-arvede glassdisken via NB, 2026-07-11).
const INTERIOR_IMG = '/assets/raw/sport-interior-uten-disk.png'
const SCENE_W = 1672
const SCENE_H = 940
const ASPECT = SCENE_H / SCENE_W  // y%→bredde-% (isotrop avstand i ekte piksler)

const SELECT_RADIUS = 1.8  // % av bredden: klikk innen dette av en plass = selekter
const SNAP_DIST = 4        // % av bredden: slippes en plass så nær en linje → snap

const PLASS_TYPER: PlassType[] = ['sko', 'heng', 'brett', 'utstyr']
const TYPE_LABEL: Record<PlassType, string> = {
  sko: '👟 Sko', heng: '🧥 Heng', brett: '🧺 Brett', utstyr: '⚽ Utstyr',
}

const r1 = (n: number) => Math.round(n * 10) / 10
const r3 = (n: number) => Math.round(n * 1000) / 1000

// heng = topp-ankret (henger ned fra rail-punktet), resten = bunn-ankret.
function plassTransform(vp: { type: PlassType; rot?: number }) {
  const bunn = vp.type !== 'heng'
  const anchor = bunn ? 'translate(-50%, -100%)' : 'translate(-50%, -6%)'
  const rot = vp.rot ?? 0
  return {
    transform: `${anchor}${rot ? ` rotate(${rot}deg)` : ''}`,
    transformOrigin: bunn ? '50% 100%' : '50% 50%',
  }
}

// ── Geometri: nærmeste punkt på en hyllelinje + interpolert skala ────────────
function projOnLine(px: number, py: number, L: Hyllelinje) {
  const ax = L.x1, ay = L.y1 * ASPECT, bx = L.x2, by = L.y2 * ASPECT
  const qx = px, qy = py * ASPECT
  const dx = bx - ax, dy = by - ay
  const len2 = dx * dx + dy * dy || 1e-6
  let t = ((qx - ax) * dx + (qy - ay) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const sx = ax + t * dx, sy = ay + t * dy
  return { t, x: sx, y: sy / ASPECT, dist: Math.hypot(qx - sx, qy - sy), scale: L.scale1 + t * (L.scale2 - L.scale1) }
}
function snapToLine(px: number, py: number, lines: Hyllelinje[], maxDist: number) {
  let best: { x: number; y: number; scale: number; dist: number } | null = null
  for (const L of lines) {
    const p = projOnLine(px, py, L)
    if (p.dist <= maxDist && (!best || p.dist < best.dist)) best = { x: r1(p.x), y: r1(p.y), scale: r3(p.scale), dist: p.dist }
  }
  return best
}
function pointAlong(L: Hyllelinje, t: number) {
  return { x: L.x1 + t * (L.x2 - L.x1), y: L.y1 + t * (L.y2 - L.y1), scale: L.scale1 + t * (L.scale2 - L.scale1) }
}

// ── localStorage-utkast (vareplasser + hyllelinjer) ──────────────────────────
const LS_KEY = 'sport-stillas-utkast-v2'
function saveDraft() {
  try { localStorage.setItem(LS_KEY, JSON.stringify({ vareplasser: SPORT.vareplasser ?? [], hyllelinjer: SPORT.hyllelinjer ?? [] })) } catch { /* ignore */ }
}
;(function restoreDraft() {
  try {
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(LS_KEY)
    if (!raw) return
    const d = JSON.parse(raw)
    if (Array.isArray(d?.vareplasser) && SPORT.vareplasser) SPORT.vareplasser.splice(0, SPORT.vareplasser.length, ...d.vareplasser)
    if (Array.isArray(d?.hyllelinjer) && SPORT.hyllelinjer) SPORT.hyllelinjer.splice(0, SPORT.hyllelinjer.length, ...d.hyllelinjer)
  } catch { /* ignore */ }
})()

// ── Tekst-dump klart til innliming i SPORT (industryDefinition.ts) ───────────
function vareplasserText(pts: Vareplass[]): string {
  const rows = pts.map(v => {
    const extra = v.rot ? `, rot: ${v.rot}` : ''
    return `    { id: '${v.id}', type: '${v.type}', x: ${v.x}, y: ${v.y}, scale: ${v.scale}${v.vare ? `, vare: '${v.vare}'` : ''}${extra} },`
  })
  return `vareplasser: [\n${rows.join('\n')}\n  ],`
}
function hyllelinjerText(lines: Hyllelinje[]): string {
  const rows = lines.map(L => `    { id: '${L.id}', x1: ${L.x1}, y1: ${L.y1}, x2: ${L.x2}, y2: ${L.y2}, scale1: ${L.scale1}, scale2: ${L.scale2} },`)
  return `hyllelinjer: [\n${rows.join('\n')}\n  ],`
}

type DragTarget = { kind: 'vp'; id: string } | { kind: 'line'; id: string; end: 1 | 2 }

export default function SportStillas() {
  const pts: Vareplass[] = (SPORT.vareplasser ??= [])
  const lines: Hyllelinje[] = (SPORT.hyllelinjer ??= [])
  const sceneRef = useRef<HTMLDivElement>(null)
  const [, force] = useState(0)
  const bump = () => force(n => n + 1)

  const [mode, setMode] = useState<'vare' | 'linje'>('vare')
  const [selType, setSelType] = useState<PlassType>('sko')
  const [selId, setSelId] = useState<string | null>(null)
  const [selLinje, setSelLinje] = useState<string | null>(null)
  const [lineDraft, setLineDraft] = useState<{ x1: number; y1: number } | null>(null)
  const dragRef = useRef<DragTarget | null>(null)

  const pointerPct = (e: { clientX: number; clientY: number }) => {
    const r = sceneRef.current!.getBoundingClientRect()
    return { x: r1(((e.clientX - r.left) / r.width) * 100), y: r1(((e.clientY - r.top) / r.height) * 100) }
  }
  const nearestVp = (x: number, y: number, radius: number): Vareplass | undefined => {
    let best: Vareplass | undefined, bd = radius
    for (const vp of pts) {
      const d = Math.hypot(x - vp.x, (y - vp.y) * ASPECT)
      if (d <= bd) { bd = d; best = vp }
    }
    return best
  }

  useEffect(() => {
    if (!IS_DEV_COORDS) return
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current
      if (!d || !sceneRef.current) return
      const { x, y } = pointerPct(e)
      if (d.kind === 'vp') {
        const vp = pts.find(p => p.id === d.id); if (!vp) return
        vp.x = x; vp.y = y
      } else {
        const L = lines.find(l => l.id === d.id); if (!L) return
        if (d.end === 1) { L.x1 = x; L.y1 = y } else { L.x2 = x; L.y2 = y }
      }
      saveDraft(); bump()
    }
    const onUp = () => {
      const d = dragRef.current
      // snap-on-drop: en sluppet (bunn-ankret) vare nær en linje festes til den
      if (d?.kind === 'vp') {
        const vp = pts.find(p => p.id === d.id)
        if (vp && vp.type !== 'heng') {
          const s = snapToLine(vp.x, vp.y, lines, SNAP_DIST)
          if (s) { vp.x = s.x; vp.y = s.y; vp.scale = s.scale; saveDraft(); bump() }
        }
      }
      dragRef.current = null
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelId(null); setSelLinje(null); setLineDraft(null); bump() }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); window.removeEventListener('keydown', onKey) }
  }, [pts, lines])

  function onSceneClick(e: React.MouseEvent) {
    if (!IS_DEV_COORDS) return
    const { x, y } = pointerPct(e)
    if (mode === 'linje') {
      if (!lineDraft) { setLineDraft({ x1: x, y1: y }); return }
      const n = lines.length + 1
      const L: Hyllelinje = { id: `linje-${n}`, x1: lineDraft.x1, y1: lineDraft.y1, x2: x, y2: y, scale1: 0.05, scale2: 0.05 }
      lines.push(L); setLineDraft(null); setSelLinje(L.id); setSelId(null); saveDraft(); bump()
      return
    }
    // vare-modus: klikk nær eksisterende = SELEKTER (ingen spøkelser)
    const near = nearestVp(x, y, SELECT_RADIUS)
    if (near) { setSelId(near.id); setSelLinje(null); return }
    // ellers ny plass — snapp til nærmeste linje hvis nær
    const snap = snapToLine(x, y, lines, SNAP_DIST)
    const n = pts.filter(p => p.type === selType).length + 1
    const rep = repVareForType(selType)
    const vp: Vareplass = {
      id: `${selType}-${n}`, type: selType,
      x: snap ? snap.x : x, y: snap ? snap.y : y,
      scale: snap ? snap.scale : 0.05, vare: rep?.id,
    }
    pts.push(vp); setSelId(vp.id); setSelLinje(null); saveDraft(); bump()
  }

  function adjustVp(id: string, dScale: number, dRot: number) {
    const vp = pts.find(p => p.id === id); if (!vp) return
    if (dScale) vp.scale = Math.max(0.01, r3(vp.scale + dScale))
    if (dRot) vp.rot = r1((vp.rot ?? 0) + dRot)
    saveDraft(); bump()
  }
  function removeVp(id: string) {
    const i = pts.findIndex(p => p.id === id); if (i >= 0) pts.splice(i, 1)
    if (selId === id) setSelId(null)
    saveDraft(); bump()
  }
  function adjustLine(id: string, which: 1 | 2, d: number) {
    const L = lines.find(l => l.id === id); if (!L) return
    if (which === 1) L.scale1 = Math.max(0.01, r3(L.scale1 + d)); else L.scale2 = Math.max(0.01, r3(L.scale2 + d))
    saveDraft(); bump()
  }
  function removeLine(id: string) {
    const i = lines.findIndex(l => l.id === id); if (i >= 0) lines.splice(i, 1)
    if (selLinje === id) setSelLinje(null)
    saveDraft(); bump()
  }

  const sel = selId ? pts.find(p => p.id === selId) : undefined
  const selL = selLinje ? lines.find(l => l.id === selLinje) : undefined
  const previewSko = repVareForType('sko')

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#1a1a1e', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div
        ref={sceneRef}
        onClick={onSceneClick}
        style={{
          position: 'relative',
          width: `min(100vw, calc(100vh * ${SCENE_W} / ${SCENE_H}))`,
          aspectRatio: `${SCENE_W} / ${SCENE_H}`,
          backgroundImage: `url(${INTERIOR_IMG})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: '0 10px 60px rgba(0,0,0,.5)',
          cursor: IS_DEV_COORDS ? (mode === 'linje' ? 'crosshair' : 'default') : 'default',
        }}
      >
        {/* Hyllelinjer + preview-sko (kun dev) */}
        {IS_DEV_COORDS && (
          <>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
                 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9000 }}>
              {lines.map(L => (
                <line key={L.id} x1={L.x1} y1={L.y1} x2={L.x2} y2={L.y2}
                  stroke={selLinje === L.id ? '#f59e0b' : '#22d3ee'} strokeWidth={1.5}
                  strokeDasharray="2 1.5" vectorEffect="non-scaling-stroke" opacity={0.9} />
              ))}
              {lineDraft && <circle cx={lineDraft.x1} cy={lineDraft.y1} r={0.6} fill="#f59e0b" />}
            </svg>
            {/* preview-sko langs hver linje (viser skala-gradienten) */}
            {previewSko && lines.flatMap(L => [0.12, 0.5, 0.88].map(t => {
              const p = pointAlong(L, t)
              return (
                <img key={`${L.id}-${t}`} src={previewSko.sprite} alt="" draggable={false}
                  style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: `${p.scale * 100}%`,
                           height: 'auto', transform: 'translate(-50%,-100%)', transformOrigin: '50% 100%',
                           opacity: 0.4, pointerEvents: 'none', zIndex: 8000 }} />
              )
            }))}
            {/* endepunkt-håndtak */}
            {lines.flatMap(L => ([1, 2] as const).map(end => {
              const ex = end === 1 ? L.x1 : L.x2, ey = end === 1 ? L.y1 : L.y2
              return (
                <div key={`${L.id}-h${end}`}
                  onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { kind: 'line', id: L.id, end }; setSelLinje(L.id); setSelId(null) }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ position: 'absolute', left: `${ex}%`, top: `${ey}%`, width: 12, height: 12,
                           transform: 'translate(-50%,-50%)', borderRadius: '50%',
                           background: selLinje === L.id ? '#f59e0b' : '#22d3ee', border: '2px solid #0f172a',
                           cursor: 'grab', zIndex: 9500 }} />
              )
            }))}
          </>
        )}

        {/* Vareplasser */}
        {pts.map(vp => {
          const vare = sportVareById(vp.vare) ?? (IS_DEV_COORDS ? repVareForType(vp.type) : undefined)
          if (!vare) return null
          const xf = plassTransform(vp)
          const isSel = IS_DEV_COORDS && selId === vp.id
          return (
            <img key={vp.id} src={vare.sprite} alt={vare.navn} draggable={false}
              onMouseDown={IS_DEV_COORDS ? (e) => { e.stopPropagation(); dragRef.current = { kind: 'vp', id: vp.id }; setSelId(vp.id); setSelLinje(null) } : undefined}
              onClick={IS_DEV_COORDS ? (e) => e.stopPropagation() : undefined}
              onContextMenu={IS_DEV_COORDS ? (e) => { e.preventDefault(); removeVp(vp.id) } : undefined}
              style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`,
                width: `${vp.scale * 100}%`, height: 'auto',
                transform: xf.transform, transformOrigin: xf.transformOrigin,
                zIndex: Math.round(vp.y * 10),
                filter: isSel ? 'drop-shadow(0 0 4px #22d3ee)' : 'none',
                cursor: IS_DEV_COORDS ? 'grab' : 'default',
              }} />
          )
        })}
      </div>

      {/* Les-modus badge */}
      {!IS_DEV_COORDS && (
        <div style={{ position: 'fixed', left: 12, bottom: 12, color: '#cbd5e1', font: '12px system-ui', opacity: .7 }}>
          🏟️ Sportsbutikk — {pts.length} vareplasser · ?dev=1 for kalibrering
        </div>
      )}

      {/* Tracer-panel */}
      {IS_DEV_COORDS && (
        <div style={{ position: 'fixed', top: 10, right: 10, width: 258, background: '#0f172a',
                      color: '#e2e8f0', font: '12px system-ui', borderRadius: 10, padding: 12,
                      boxShadow: '0 8px 30px rgba(0,0,0,.5)' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            <button style={{ flex: 1, padding: '5px 6px', borderRadius: 6, border: 'none', cursor: 'pointer',
                             background: mode === 'vare' ? '#22d3ee' : '#1e293b', color: mode === 'vare' ? '#0f172a' : '#94a3b8' }}
              onClick={() => { setMode('vare'); setLineDraft(null) }}>📦 Vare ({pts.length})</button>
            <button style={{ flex: 1, padding: '5px 6px', borderRadius: 6, border: 'none', cursor: 'pointer',
                             background: mode === 'linje' ? '#f59e0b' : '#1e293b', color: mode === 'linje' ? '#0f172a' : '#94a3b8' }}
              onClick={() => { setMode('linje'); setSelId(null) }}>📏 Linje ({lines.length})</button>
          </div>

          {mode === 'vare' && (
            <>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                {PLASS_TYPER.map(t => (
                  <button key={t} onClick={() => setSelType(t)}
                    style={{ padding: '4px 6px', borderRadius: 6, cursor: 'pointer', border: 'none',
                             background: selType === t ? '#22d3ee' : '#1e293b', color: selType === t ? '#0f172a' : '#94a3b8' }}>
                    {TYPE_LABEL[t]}
                  </button>
                ))}
              </div>
              <div style={{ opacity: .7, marginBottom: 8 }}>
                Klikk TOM scene = ny <b>{TYPE_LABEL[selType]}</b> (snapper til linje). Klikk plass = selekter.
                Dra = flytt. Høyreklikk = slett. Esc = avvelg.
              </div>
              {sel && (
                <div style={{ background: '#1e293b', borderRadius: 6, padding: 8, marginBottom: 8 }}>
                  <div style={{ marginBottom: 4 }}><b>{sel.id}</b> · {sel.vare ?? '—'}</div>
                  <div>x {sel.x} · y {sel.y} · s {sel.scale}{sel.rot ? ` · ${sel.rot}°` : ''}</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    <button onClick={() => adjustVp(sel.id, -0.005, 0)}>–</button>
                    <span style={{ flex: 1, textAlign: 'center' }}>skala</span>
                    <button onClick={() => adjustVp(sel.id, +0.005, 0)}>+</button>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    <button onClick={() => adjustVp(sel.id, 0, -1)}>↺</button>
                    <span style={{ flex: 1, textAlign: 'center' }}>rot</span>
                    <button onClick={() => adjustVp(sel.id, 0, +1)}>↻</button>
                  </div>
                  <select value={sel.vare ?? ''} onChange={e => { sel.vare = e.target.value || undefined; saveDraft(); bump() }}
                    style={{ width: '100%', marginTop: 6 }}>
                    <option value="">(velg vare)</option>
                    {SPORT_VARER.filter(v => v.type === sel.type).map(v => (
                      <option key={v.id} value={v.id}>{v.navn}</option>
                    ))}
                  </select>
                  <button style={{ width: '100%', marginTop: 6 }} onClick={() => removeVp(sel.id)}>🗑 Slett plass</button>
                </div>
              )}
            </>
          )}

          {mode === 'linje' && (
            <>
              <div style={{ opacity: .7, marginBottom: 8 }}>
                {lineDraft ? 'Klikk 2. endepunkt for å fullføre linjen.' : 'Klikk 1. endepunkt. Dra håndtak = juster. Esc = avbryt.'}
              </div>
              {selL && (
                <div style={{ background: '#1e293b', borderRadius: 6, padding: 8, marginBottom: 8 }}>
                  <div style={{ marginBottom: 4 }}><b>{selL.id}</b></div>
                  <div>({selL.x1},{selL.y1}) → ({selL.x2},{selL.y2})</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    <button onClick={() => adjustLine(selL.id, 1, -0.005)}>–</button>
                    <span style={{ flex: 1, textAlign: 'center' }}>skala1 {selL.scale1}</span>
                    <button onClick={() => adjustLine(selL.id, 1, +0.005)}>+</button>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    <button onClick={() => adjustLine(selL.id, 2, -0.005)}>–</button>
                    <span style={{ flex: 1, textAlign: 'center' }}>skala2 {selL.scale2}</span>
                    <button onClick={() => adjustLine(selL.id, 2, +0.005)}>+</button>
                  </div>
                  <button style={{ width: '100%', marginTop: 6 }} onClick={() => removeLine(selL.id)}>🗑 Slett linje</button>
                </div>
              )}
              {lines.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                  {lines.map(L => (
                    <button key={L.id} onClick={() => setSelLinje(L.id)}
                      style={{ padding: '3px 5px', borderRadius: 5, border: 'none', cursor: 'pointer', fontSize: 11,
                               background: selLinje === L.id ? '#f59e0b' : '#1e293b', color: selLinje === L.id ? '#0f172a' : '#94a3b8' }}>
                      {L.id}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ flex: 1 }} onClick={() => {
              const txt = `${vareplasserText(pts)}\n  ${hyllelinjerText(lines)}`
              console.log('[SportStillas] lim inn i SPORT (industryDefinition.ts):\n  ' + txt)
              navigator.clipboard?.writeText('  ' + txt)
            }}>📋 Kopier</button>
            <button onClick={() => { localStorage.removeItem(LS_KEY); location.reload() }}>Tøm</button>
          </div>
        </div>
      )}
    </div>
  )
}
