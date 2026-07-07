import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG } from '../../data/districts'
import { GameProvider, useGame } from '../GameContext'
import { KLESBUTIKK, type Gulvplan } from '../data/industryDefinition'
import { KLESBUTIKK_FIXTURES, fixtureDef, vareplasser, kapasitet, type VareplassType } from '../data/klesbutikkFixtures'
import type { KlesbutikkFixtureId, Fotpunkt } from '../types'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Target, type DrawZone, type Rect } from './ZoneTracer'

// ── KlesbutikkStillas (BRANSJE 2) — STILLAS-scene for klesbutikk ──────────────
// Frittstående dev-scene (/dev/klesbutikk, IKKE koblet til onboarding/spillet).
// Interiør: møbler plasseres FRITT på et GULVPLAN (perspektiv-trapes). Fotpunktet
// klemmes til trapeset og skalaen interpoleres av dybden (foran stort → bak
// lite). Tegnerekkefølge sorteres på fotpunkt-y (foran dekker bak). Hylla er
// veggmontert (butikkvegg-sonen, fast skala). Høyreklikk = fjern. INGEN manuell
// skalering. State lagrer { id, fixtureId, fotpunkt } (% av scenebildet).
// ?dev=1 gir tre moduser: 🪑 Møbler (+ vareplass-markører) · 📐 Gulvplan
// (trapes-tracer + front/bak-skala) · 🧭 Soner. Gulvplanet bor i
// KLESBUTIKK.gulvplan (industryDefinition.ts); traceren muterer + logger.

const INTERIOR_IMG = '/assets/raw/klesbutikk-interior.jpg'
const FASADE_IMG = '/assets/raw/klesbutikk-fasade.png'

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const writeRect = (t: Rect, r: Rect) => { t[0] = r[0]; t[1] = r[1]; t[2] = r[2]; t[3] = r[3] }
const SLOT_COLOR: Record<VareplassType, string> = { heng: '#50dcff', brett: '#ffb03c', antrekk: '#f472b6' }

let _uid = 0
const uid = () => { try { return crypto.randomUUID() } catch { return `fx-${_uid++}` } }

// ── Gulvplan-matematikk (bilineær trapes-mapping) ────────────────────────────
// (u,v) er trapes-koordinater: u = venstre→høyre, v = dybde (0 foran, 1 bak).
type Pt = { x: number; y: number }
const cross = (a: Pt, b: Pt) => a.x * b.y - a.y * b.x

/** Forlengs: trapes-koordinat (u,v) → punkt i % av scenebildet. */
function quadPoint(g: Gulvplan, u: number, v: number): Pt {
  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner
  return {
    x: (1 - u) * (1 - v) * A.x + u * (1 - v) * B.x + (1 - u) * v * C.x + u * v * D.x,
    y: (1 - u) * (1 - v) * A.y + u * (1 - v) * B.y + (1 - u) * v * C.y + u * v * D.y,
  }
}

/** Invers: punkt (%) → (u,v). Robust — velger reell rot nærmest [0,1]. */
function invBilinear(p: Pt, g: Gulvplan): { u: number; v: number } {
  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner
  const e = { x: B.x - A.x, y: B.y - A.y }
  const f = { x: C.x - A.x, y: C.y - A.y }
  const gg = { x: A.x - B.x - C.x + D.x, y: A.y - B.y - C.y + D.y }
  const h = { x: p.x - A.x, y: p.y - A.y }
  const k2 = cross(gg, f), k1 = cross(e, f) + cross(h, gg), k0 = cross(h, e)
  let v: number
  if (Math.abs(k2) < 1e-6) {
    v = Math.abs(k1) < 1e-9 ? 0 : -k0 / k1
  } else {
    const disc = k1 * k1 - 4 * k2 * k0
    const w = disc > 0 ? Math.sqrt(disc) : 0
    const v1 = (-k1 - w) / (2 * k2), v2 = (-k1 + w) / (2 * k2)
    const pen = (x: number) => Math.abs(x - clamp(x, 0, 1))
    v = pen(v1) <= pen(v2) ? v1 : v2
  }
  const dx = e.x + gg.x * v, dy = e.y + gg.y * v
  const u = Math.abs(dx) > Math.abs(dy) ? (h.x - f.x * v) / dx : (h.y - f.y * v) / dy
  return { u, v }
}

/** Klem et fotpunkt til gulv-trapeset. Alle møbler (også hylla) står på gulvet
 *  og kan flyttes fritt frem/tilbake i dybden. */
function clampFoot(g: Gulvplan, p: Pt): Fotpunkt {
  const { u, v } = invBilinear(p, g)
  return quadPoint(g, clamp(u, 0, 1), clamp(v, 0, 1))
}

/** Dybde-interpolert skala for et møbel (foran stort → bak lite). */
function scaleFor(g: Gulvplan, foot: Fotpunkt): number {
  return lerp(g.scaleFront, g.scaleBack, clamp(invBilinear(foot, g).v, 0, 1))
}

type DevMode = 'møbler' | 'gulvplan' | 'sone'

interface Scene {
  id: 'fasade' | 'interior'
  label: string
  img: string
  aspect: number
  hint: string
  target: Target
  drawZone: DrawZone
}

const SCENES: Scene[] = [
  {
    id: 'fasade', label: '🏬 Fasade', img: FASADE_IMG, aspect: 1376 / 768,
    hint: 'Vindusutstillingens sone (KLESBUTIKK_VINDU) — mot gata.',
    target: { id: 'vindu', label: 'vindu', get: () => KLESBUTIKK_VINDU, set: r => writeRect(KLESBUTIKK_VINDU, r) },
    drawZone: { rect: KLESBUTIKK_VINDU, color: '#50dcff', label: 'vindu' },
  },
  {
    id: 'interior', label: '🛍 Interiør', img: INTERIOR_IMG, aspect: 1024 / 572,
    hint: 'Dra møbler fra paletten ut på gulvet — de skalerer med dybden. Dra for å flytte, høyreklikk = fjern.',
    target: { id: 'butikkvegg', label: 'butikkvegg', get: () => KLESBUTIKK_BUTIKKVEGG, set: r => writeRect(KLESBUTIKK_BUTIKKVEGG, r) },
    drawZone: { rect: KLESBUTIKK_BUTIKKVEGG, color: '#ffa03c', label: 'butikkvegg', surface: true },
  },
]

export default function KlesbutikkStillas() {
  return <GameProvider><KlesbutikkStillasInner /></GameProvider>
}

function KlesbutikkStillasInner() {
  const navigate = useNavigate()
  const [sceneId, setSceneId] = useState<Scene['id']>('interior')
  const [imgFailed, setImgFailed] = useState(false)
  const [devMode, setDevMode] = useState<DevMode>('møbler')
  const [, setRev] = useState(0)
  const bump = () => setRev(r => r + 1)
  const scene = SCENES.find(s => s.id === sceneId)!
  const mode: DevMode = IS_DEV_COORDS ? devMode : 'møbler'
  const showSlots = IS_DEV_COORDS && mode === 'møbler'

  return (
    <div style={{
      position: 'fixed', inset: 0, fontFamily: "'Outfit', sans-serif",
      background: 'linear-gradient(180deg, #10141a 0%, #1b2230 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
        display: 'flex', gap: 8, alignItems: 'center',
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '6px 10px',
      }}>
        {SCENES.map(s => (
          <button key={s.id} onClick={() => { setSceneId(s.id); setImgFailed(false) }} style={tabStyle(s.id === sceneId)}>{s.label}</button>
        ))}
        {IS_DEV_COORDS && (
          <span style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
            {scene.id === 'interior' && (['møbler', 'gulvplan'] as DevMode[]).map(m => (
              <button key={m} onClick={() => setDevMode(m)} style={tabStyle(mode === m)}>
                {m === 'møbler' ? '🪑 Møbler' : '📐 Gulvplan'}
              </button>
            ))}
            <button onClick={() => setDevMode('sone')} style={tabStyle(mode === 'sone')}>🧭 Soner</button>
          </span>
        )}
        <span style={{ color: '#64748b', fontSize: 11, marginLeft: 4 }}>
          KLESBUTIKK-stillas{IS_DEV_COORDS ? '' : ' · ?dev=1 for markører/tracer'}
        </span>
      </div>

      <button onClick={() => navigate('/')} style={{
        position: 'fixed', top: 14, left: 16, zIndex: 90,
        background: 'rgba(10,14,26,0.85)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 10, padding: '5px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
      }}>← Forsiden</button>

      <div style={{
        position: 'relative', aspectRatio: `${scene.aspect}`,
        width: `min(96vw, calc(86vh * ${scene.aspect}))`, height: 'auto', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        {!imgFailed ? (
          <img src={scene.img} alt={scene.label} draggable={false} onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a4656 0%, #2e3744 100%)',
            border: '1px dashed rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '0 2rem',
          }}>Scenebilde mangler<br />({scene.img})</div>
        )}

        {scene.id === 'interior' ? (
          <>
            {(mode === 'møbler' || mode === 'sone') && (
              <FloorLayer interactive={mode === 'møbler'} showSlots={showSlots} />
            )}
            {mode === 'gulvplan' && <GulvplanTracer bump={bump} />}
          </>
        ) : (
          mode !== 'sone' && (
            <div style={{
              position: 'absolute', left: `${scene.drawZone.rect[0]}%`, top: `${scene.drawZone.rect[1]}%`,
              width: `${scene.drawZone.rect[2]}%`, height: `${scene.drawZone.rect[3]}%`,
              border: `1px dashed ${scene.drawZone.color}66`, pointerEvents: 'none',
            }} />
          )
        )}

        {mode === 'sone' && (
          <ZoneTracer key={scene.id} onApply={bump} targets={[scene.target]} drawZones={[scene.drawZone]} />
        )}
      </div>

      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
        padding: '0.4rem 1rem', color: '#cbd5e1', fontSize: 12, whiteSpace: 'nowrap',
      }}>{scene.id === 'interior' && mode === 'gulvplan'
        ? 'Gulvplan-tracer: dra de 4 hjørnene, juster front/bak-skala mot preview-dukkene, «Logg objekt».'
        : scene.hint}</div>
    </div>
  )
}

// ── Ett møbel rendret på gulvet/veggen (bunn-ankret, dybde-skalert) ───────────
function FurnitureSprite({ fixtureId, foot, widthFrac, showSlots, opacity, onPointerDown, onRemove }: {
  fixtureId: KlesbutikkFixtureId
  foot: Fotpunkt
  widthFrac: number
  showSlots: boolean
  opacity?: number
  onPointerDown?: (e: React.PointerEvent) => void
  onRemove?: () => void
}) {
  const def = fixtureDef(fixtureId)
  if (!def) return null
  return (
    <div
      onPointerDown={onPointerDown}
      onContextMenu={onRemove ? (e => { e.preventDefault(); onRemove() }) : undefined}
      title={onRemove ? `${def.navn} — dra for å flytte, høyreklikk for å fjerne` : def.navn}
      style={{
        position: 'absolute', left: `${foot.x}%`, top: `${foot.y}%`,
        width: `${widthFrac * 100}%`, transform: 'translate(-50%, -100%)',
        zIndex: Math.round(foot.y * 10),
        pointerEvents: onPointerDown ? 'auto' : 'none',
        cursor: onPointerDown ? 'grab' : 'default', touchAction: 'none', opacity: opacity ?? 1,
      }}
    >
      <img src={def.sprite} alt={def.navn} draggable={false}
        style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))', pointerEvents: 'none' }} />
      {showSlots && vareplasser(def).map((s, i) => (
        <div key={i} title={s.type} style={{
          position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`,
          width: 9, height: 9, transform: 'translate(-50%, -50%)', borderRadius: '50%',
          background: SLOT_COLOR[s.type], border: '1px solid rgba(0,0,0,0.55)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.5)', pointerEvents: 'none',
        }} />
      ))}
    </div>
  )
}

// ── Gulvbasert plassering ────────────────────────────────────────────────────
function FloorLayer({ interactive, showSlots }: { interactive: boolean; showSlots: boolean }) {
  const { state, dispatch } = useGame()
  const g = KLESBUTIKK.gulvplan!
  const overlayRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(state.klesbutikkFixtureLayout)
  const itemsRef = useRef(items)
  const [newType, setNewType] = useState<KlesbutikkFixtureId | null>(null)
  const [ghostFoot, setGhostFoot] = useState<Fotpunkt | null>(null)

  const commit = (next: typeof items) => { itemsRef.current = next; setItems(next); dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: next }) }
  const persist = () => dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: itemsRef.current })

  const inBounds = (cx: number, cy: number, r: DOMRect) => cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom
  const pctAt = (cx: number, cy: number, r: DOMRect): Pt => ({ x: ((cx - r.left) / r.width) * 100, y: ((cy - r.top) / r.height) * 100 })

  function startNew(fixtureId: KlesbutikkFixtureId, e: React.PointerEvent) {
    e.preventDefault()
    setNewType(fixtureId); setGhostFoot(null)
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      setGhostFoot(clampFoot(g, pctAt(ev.clientX, ev.clientY, r)))
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      const r = overlayRef.current?.getBoundingClientRect()
      setNewType(null); setGhostFoot(null)
      if (!r || !inBounds(ev.clientX, ev.clientY, r)) return    // sluppet utenfor scenen ⇒ avbryt
      const foot = clampFoot(g, pctAt(ev.clientX, ev.clientY, r))
      commit([...itemsRef.current, { id: uid(), fixtureId, fotpunkt: foot }])
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }

  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const item = itemsRef.current.find(i => i.id === id); if (!item) return
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      const foot = clampFoot(g, pctAt(ev.clientX, ev.clientY, r))
      const next = itemsRef.current.map(i => i.id === id ? { ...i, fotpunkt: foot } : i)
      itemsRef.current = next; setItems(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      persist()
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }

  const remove = (id: string) => commit(itemsRef.current.filter(i => i.id !== id))

  const sorted = [...items].sort((a, b) => a.fotpunkt.y - b.fotpunkt.y)
  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner

  return (
    <div ref={overlayRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Gulv-trapes (kun i redigeringsmodus) */}
      {interactive && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`}
            fill="rgba(125,211,252,0.05)" stroke="rgba(125,211,252,0.32)" strokeWidth={0.3} />
        </svg>
      )}

      {/* Plasserte møbler (z-sortert på fotpunkt-y) */}
      {sorted.map(it => {
        const def = fixtureDef(it.fixtureId); if (!def) return null
        const w = def.baseWFrac * scaleFor(g, it.fotpunkt)
        return (
          <FurnitureSprite key={it.id} fixtureId={it.fixtureId} foot={it.fotpunkt} widthFrac={w}
            showSlots={showSlots}
            onPointerDown={interactive ? (e => startMove(it.id, e)) : undefined}
            onRemove={interactive ? () => remove(it.id) : undefined} />
        )
      })}

      {/* Preview under palett-drag: på gulvet, dybde-skalert */}
      {newType && ghostFoot && (() => {
        const def = fixtureDef(newType); if (!def) return null
        return <FurnitureSprite fixtureId={newType} foot={ghostFoot}
          widthFrac={def.baseWFrac * scaleFor(g, ghostFoot)} showSlots={false} opacity={0.6} />
      })()}

      {/* Palett (portal) */}
      {interactive && createPortal(
        <div style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 158, maxHeight: '76vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🪑 Møbler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {KLESBUTIKK_FIXTURES.map(def => (
              <div key={def.id} onPointerDown={e => startNew(def.id, e)}
                title={`${def.navn} — dra ut på gulvet (${kapasitet(def)} vareplasser)`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '5px 7px', cursor: 'grab', userSelect: 'none', touchAction: 'none',
                }}>
                <div style={{ width: 30, height: 30, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={def.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.15 }}>{def.navn}</div>
                  <div style={{ fontSize: 9, color: '#64748b' }}>{kapasitet(def)} plasser</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 8, lineHeight: 1.4 }}>
            Dra ut på gulvet (skalerer med dybden) · dra plassert møbel for å flytte · høyreklikk = fjern
          </div>
        </div>, document.body)}
    </div>
  )
}

// ── Gulvplan-tracer (?dev=1) — dra hjørner, kalibrer front/bak-skala ─────────
function GulvplanTracer({ bump }: { bump: () => void }) {
  const g = KLESBUTIKK.gulvplan!
  const overlayRef = useRef<HTMLDivElement>(null)
  const CORNERS: { key: keyof Gulvplan['hjørner']; label: string }[] = [
    { key: 'fremV', label: 'fremV' }, { key: 'fremH', label: 'fremH' },
    { key: 'bakV', label: 'bakV' }, { key: 'bakH', label: 'bakH' },
  ]

  function startCorner(key: keyof Gulvplan['hjørner'], e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const onMove = (ev: PointerEvent) => {
      const r = overlayRef.current?.getBoundingClientRect(); if (!r) return
      g.hjørner[key] = {
        x: +clamp(((ev.clientX - r.left) / r.width) * 100, 0, 100).toFixed(1),
        y: +clamp(((ev.clientY - r.top) / r.height) * 100, 0, 100).toFixed(1),
      }
      bump()
    }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true) }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const editScale = (which: 'scaleFront' | 'scaleBack', d: number) => { g[which] = +clamp(g[which] + d, 0.05, 1).toFixed(2); bump() }
  const log = () => {
    const P = (p: Pt) => `{ x: ${p.x}, y: ${p.y} }`
    const h = g.hjørner
    console.log(`[GulvplanTracer] lim inn i KLESBUTIKK (industryDefinition.ts):\n  gulvplan: {\n    hjørner: {\n      fremV: ${P(h.fremV)}, fremH: ${P(h.fremH)},\n      bakV: ${P(h.bakV)}, bakH: ${P(h.bakH)},\n    },\n    scaleFront: ${g.scaleFront}, scaleBack: ${g.scaleBack},\n  },`)
  }

  const { fremV: A, fremH: B, bakV: C, bakH: D } = g.hjørner
  const previewDef = fixtureDef('dukke')!
  const front = quadPoint(g, 0.5, 0), back = quadPoint(g, 0.5, 1)

  return (
    <>
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, zIndex: 45, touchAction: 'none' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`}
            fill="rgba(255,210,74,0.08)" stroke="#ffd24a" strokeWidth={0.4} />
        </svg>

        {/* Front/bak-skala-preview (dukke) */}
        <FurnitureSprite fixtureId="dukke" foot={front} widthFrac={previewDef.baseWFrac * g.scaleFront} showSlots={false} opacity={0.85} />
        <FurnitureSprite fixtureId="dukke" foot={back} widthFrac={previewDef.baseWFrac * g.scaleBack} showSlots={false} opacity={0.85} />

        {/* Hjørne-håndtak */}
        {CORNERS.map(({ key, label }) => {
          const p = g.hjørner[key]
          return (
            <div key={key} onPointerDown={e => startCorner(key, e)} title={label} style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)',
              width: 16, height: 16, borderRadius: '50%', cursor: 'grab',
              border: '2px solid #ffd24a', background: 'rgba(255,210,74,0.35)',
            }}>
              <span style={{ position: 'absolute', left: 18, top: -2, fontSize: 9, fontFamily: 'monospace', color: '#ffd24a', background: 'rgba(0,0,0,0.6)', padding: '0 3px', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          )
        })}
      </div>

      {createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 200,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #ffd24a55', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📐 Gulvplan-tracer</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Dra de 4 hjørnene så trapeset dekker gulvet. Preview-dukkene står helt foran/bak.
          </div>
          {(['scaleFront', 'scaleBack'] as const).map(which => (
            <div key={which} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>{which === 'scaleFront' ? 'skala foran' : 'skala bak'}</span>
              <button style={miniBtn} onClick={() => editScale(which, -0.02)}>−</button>
              <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 34, textAlign: 'center' }}>{g[which].toFixed(2)}</span>
              <button style={miniBtn} onClick={() => editScale(which, 0.02)}>+</button>
            </div>
          ))}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800, marginTop: 4 }} onClick={log}>Logg objekt → konsoll</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Lim det loggede objektet inn i KLESBUTIKK.gulvplan (industryDefinition.ts).
          </div>
        </div>, document.body)}
    </>
  )
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? 'rgba(125,211,252,0.18)' : 'transparent',
    color: active ? '#e0f2fe' : '#94a3b8',
    border: active ? '1px solid rgba(125,211,252,0.7)' : '1px solid transparent',
    borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
  }
}

const miniBtn: React.CSSProperties = {
  background: 'rgba(125,211,252,0.12)', color: '#7dd3fc', border: '1px solid #7dd3fc55', borderRadius: 6,
  width: 24, height: 24, fontSize: 13, fontWeight: 800, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0,
}
