import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG } from '../../data/districts'
import { GameProvider, useGame } from '../GameContext'
import {
  KLESBUTIKK_FIXTURES, fixtureDef, vareplasser, kapasitet,
  type VareplassType,
} from '../data/klesbutikkFixtures'
import type { KlesbutikkFixtureItem, KlesbutikkFixtureId } from '../types'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Target, type DrawZone, type Rect } from './ZoneTracer'

// ── KlesbutikkStillas (BRANSJE 2, DEL 3+) — STILLAS-scene for klesbutikk ──────
// Frittstående dev-scene (rute /dev/klesbutikk, IKKE koblet til onboarding
// eller spillflyten — kafé-flyten er urørt). To faner:
//   • Fasade — vindussonen (styling-flate), sone-tracer i ?dev=1.
//   • Interiør — MØBELPLASSERING i butikkvegg-sonen: dra de 8 fixture-spritene
//     fritt inn (samme frie-plassering-mønster som vindusutstillingen), flytt/
//     endre størrelse/fjern per møbel. Bunn-ankret, overlapp tillatt (ingen
//     kollisjon i v1). Persisteres i state (klesbutikkFixtureLayout, samme
//     mønster som counterLayout) — derfor egen GameProvider rundt scenen.
// Skew-demoen/-panelet er FJERNET: butikkveggen er ikke et trau, møbler står
// oppreist og plasseres fritt. ?dev=1 viser i tillegg VAREPLASS-markørene på
// hvert møbel (klesbutikkFixtures.ts) — datamodellen plagg-sprites snapper til
// i neste jobb. Uten ?dev=1: markørene er usynlige, men flytt/størrelse virker.

const INTERIOR_IMG = '/assets/raw/klesbutikk-interior.jpg'
const FASADE_IMG = '/assets/raw/klesbutikk-fasade.png'

/** Skriv et nytt rektangel inn i en tuple-sone (in place) for ZoneTracer. */
const writeRect = (t: Rect, r: Rect) => { t[0] = r[0]; t[1] = r[1]; t[2] = r[2]; t[3] = r[3] }
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

let _uid = 0
function uid(): string {
  try { return crypto.randomUUID() } catch { return `fx-${_uid++}` }
}

const SLOT_COLOR: Record<VareplassType, string> = {
  heng: '#50dcff', brett: '#ffb03c', antrekk: '#f472b6',
}

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
    hint: 'Butikkvegg-sonen (KLESBUTIKK_BUTIKKVEGG) — dra møbler inn, flytt/skaler/fjern.',
    target: { id: 'butikkvegg', label: 'butikkvegg', get: () => KLESBUTIKK_BUTIKKVEGG, set: r => writeRect(KLESBUTIKK_BUTIKKVEGG, r) },
    drawZone: { rect: KLESBUTIKK_BUTIKKVEGG, color: '#ffa03c', label: 'butikkvegg', surface: true },
  },
]

export default function KlesbutikkStillas() {
  // Egen GameProvider: dev-ruta ligger utenfor GamePage sin provider, men vi vil
  // persistere møbel-layouten i reducer-state (samme mønster som counterLayout).
  return (
    <GameProvider>
      <KlesbutikkStillasInner />
    </GameProvider>
  )
}

function KlesbutikkStillasInner() {
  const navigate = useNavigate()
  const [sceneId, setSceneId] = useState<Scene['id']>('interior')
  const [imgFailed, setImgFailed] = useState(false)
  const [traceOn, setTraceOn] = useState(false)
  const [, setRev] = useState(0)
  const scene = SCENES.find(s => s.id === sceneId)!

  const showTracer = IS_DEV_COORDS && traceOn
  const interactive = !showTracer           // møbler er interaktive med mindre vi tracer soner
  const showSlots = IS_DEV_COORDS && !showTracer

  return (
    <div style={{
      position: 'fixed', inset: 0, fontFamily: "'Outfit', sans-serif",
      background: 'linear-gradient(180deg, #10141a 0%, #1b2230 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Topplinje: scenevalg + (dev) sone-tracer-bryter */}
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
            style={tabStyle(s.id === sceneId)}
          >{s.label}</button>
        ))}
        {IS_DEV_COORDS && (
          <button
            onClick={() => setTraceOn(o => !o)}
            title="Bytt mellom møbelplassering og sone-tracing"
            style={tabStyle(traceOn)}
          >🧭 Sone-tracer {traceOn ? 'på' : 'av'}</button>
        )}
        <span style={{ color: '#64748b', fontSize: 11, marginLeft: 4 }}>
          KLESBUTIKK-stillas{IS_DEV_COORDS ? ' · dev' : ' · ?dev=1 for markører/tracer'}
        </span>
      </div>

      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 14, left: 16, zIndex: 90,
          background: 'rgba(10,14,26,0.85)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 10, padding: '5px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif",
        }}
      >← Forsiden</button>

      {/* Scene-stage */}
      <div style={{
        position: 'relative',
        aspectRatio: `${scene.aspect}`,
        width: `min(96vw, calc(86vh * ${scene.aspect}))`,
        height: 'auto',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        {!imgFailed ? (
          <img
            src={scene.img} alt={scene.label} draggable={false}
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
          }}>Scenebilde mangler<br />({scene.img})</div>
        )}

        {/* Interiør: MØBELEDITOR i butikkvegg-sonen */}
        {scene.id === 'interior' && (
          <ButikkveggEditor interactive={interactive} showSlots={showSlots} />
        )}

        {/* Statisk sone-ramme når vi IKKE tracer (interiøret har allerede
            editorens ramme, så kun fasaden trenger denne). */}
        {!showTracer && scene.id === 'fasade' && (
          <div style={{
            position: 'absolute',
            left: `${scene.drawZone.rect[0]}%`, top: `${scene.drawZone.rect[1]}%`,
            width: `${scene.drawZone.rect[2]}%`, height: `${scene.drawZone.rect[3]}%`,
            border: `1px solid ${scene.drawZone.color}`, pointerEvents: 'none',
          }}>
            <span style={{
              position: 'absolute', left: 1, top: -14, fontSize: 10, fontFamily: 'monospace',
              color: scene.drawZone.color, background: 'rgba(0,0,0,0.65)', padding: '0 3px',
            }}>{scene.drawZone.label}</span>
          </div>
        )}

        {/* ?dev=1 + tracer på: sone-tracer for aktiv scene */}
        {showTracer && (
          <ZoneTracer
            key={scene.id}
            onApply={() => setRev(r => r + 1)}
            targets={[scene.target]}
            drawZones={[scene.drawZone]}
          />
        )}
      </div>

      {/* Hint nederst */}
      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, padding: '0.4rem 1rem', color: '#cbd5e1', fontSize: 12, whiteSpace: 'nowrap',
      }}>{scene.hint}</div>
    </div>
  )
}

// ── Møbeleditor: fri plassering i butikkvegg-sonen ───────────────────────────
// Root = «gulvflaten» (butikkvegg-sonen) absolutt plassert i stagen. Møblene er
// bunn-ankret; koordinater er brøk (0–1) av sonen. Paletten + drag-spøkelset
// portales til body (fast posisjon). Persisterer via SET_KLESBUTIKK_FIXTURES.

function ButikkveggEditor({ interactive, showSlots }: { interactive: boolean; showSlots: boolean }) {
  const { state, dispatch } = useGame()
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<KlesbutikkFixtureItem[]>(state.klesbutikkFixtureLayout)
  const itemsRef = useRef(items)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [drag, setDrag] = useState<{ kind: 'new'; fixtureId: KlesbutikkFixtureId } | { kind: 'move'; id: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number; fixtureId: KlesbutikkFixtureId } | null>(null)
  const [dragOut, setDragOut] = useState(false)

  function commit(next: KlesbutikkFixtureItem[]) {
    itemsRef.current = next
    setItems(next)
    dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: next })
  }

  const rectFrac = (clientX: number, clientY: number, rect: DOMRect) => ({
    fx: (clientX - rect.left) / rect.width, fy: (clientY - rect.top) / rect.height,
  })
  const isOutside = (fx: number, fy: number) => fx < 0 || fx > 1 || fy < 0 || fy > 1
  const clampFrac = (fx: number, fy: number): [number, number] => [clamp(fx, 0.02, 0.98), clamp(fy, 0.06, 1)]

  // Dra et NYTT møbel fra paletten inn på flaten.
  function startNew(fixtureId: KlesbutikkFixtureId, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ kind: 'new', fixtureId }); setGhost({ x: e.clientX, y: e.clientY, fixtureId })
    const onMove = (ev: PointerEvent) => {
      setGhost({ x: ev.clientX, y: ev.clientY, fixtureId })
      const rect = surfaceRef.current?.getBoundingClientRect()
      if (rect) { const { fx, fy } = rectFrac(ev.clientX, ev.clientY, rect); setDragOut(isOutside(fx, fy)) }
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      setDrag(null); setGhost(null); setDragOut(false)
      const rect = surfaceRef.current?.getBoundingClientRect()
      if (!rect) return
      const { fx, fy } = rectFrac(ev.clientX, ev.clientY, rect)
      if (isOutside(fx, fy)) return
      const [cx, cy] = clampFrac(fx, fy)
      const id = uid()
      commit([...itemsRef.current, { id, fixtureId, x: cx, y: cy, scale: 1 }])
      setSelectedId(id)
    }
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  // Flytt et plassert møbel (eller dra det UT for å fjerne).
  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    setSelectedId(id); setDrag({ kind: 'move', id })
    const onMove = (ev: PointerEvent) => {
      const rect = surfaceRef.current?.getBoundingClientRect()
      if (!rect) return
      const { fx, fy } = rectFrac(ev.clientX, ev.clientY, rect)
      setDragOut(isOutside(fx, fy))
      const [cx, cy] = clampFrac(fx, fy)
      const next = itemsRef.current.map(it => it.id === id ? { ...it, x: cx, y: cy } : it)
      itemsRef.current = next; setItems(next)
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      setDrag(null); setDragOut(false)
      const rect = surfaceRef.current?.getBoundingClientRect()
      let out = false
      if (rect) { const { fx, fy } = rectFrac(ev.clientX, ev.clientY, rect); out = isOutside(fx, fy) }
      if (out) { commit(itemsRef.current.filter(it => it.id !== id)); setSelectedId(null) }
      else commit(itemsRef.current)
    }
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  function resize(id: string, delta: number) {
    commit(itemsRef.current.map(it => it.id === id ? { ...it, scale: clamp(+(it.scale + delta).toFixed(2), 0.4, 2.5) } : it))
  }
  function remove(id: string) {
    commit(itemsRef.current.filter(it => it.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const [zx, zy, zw, zh] = KLESBUTIKK_BUTIKKVEGG
  const sorted = [...items].sort((a, b) => a.y - b.y)   // bunn lavere y = bakerst

  return (
    <>
      <div
        ref={surfaceRef}
        onPointerDown={interactive ? (e => { if (e.target === e.currentTarget) setSelectedId(null) }) : undefined}
        style={{
          position: 'absolute',
          left: `${zx}%`, top: `${zy}%`, width: `${zw}%`, height: `${zh}%`,
          zIndex: 1,                      // egen stacking-kontekst: møbler holdes under en ev. tracer
          border: `1px ${dragOut ? 'solid rgba(239,68,68,0.8)' : 'dashed rgba(255,160,60,0.6)'}`,
          pointerEvents: interactive ? 'auto' : 'none',
          touchAction: 'none',
        }}
      >
        <span style={{
          position: 'absolute', left: 1, top: -14, fontSize: 10, fontFamily: 'monospace',
          color: '#ffa03c', background: 'rgba(0,0,0,0.65)', padding: '0 3px', pointerEvents: 'none',
        }}>butikkvegg</span>

        {sorted.map(it => {
          const def = fixtureDef(it.fixtureId)
          if (!def) return null
          const w = def.baseWFrac * it.scale
          const selected = interactive && selectedId === it.id
          const isDragging = drag?.kind === 'move' && drag.id === it.id
          return (
            <div
              key={it.id}
              onPointerDown={interactive ? (e => startMove(it.id, e)) : undefined}
              onContextMenu={interactive ? (e => { e.preventDefault(); remove(it.id) }) : undefined}
              title={`${def.navn} — dra for å flytte, høyreklikk for å fjerne`}
              style={{
                position: 'absolute',
                left: `${it.x * 100}%`, top: `${it.y * 100}%`,
                width: `${w * 100}%`,
                transform: 'translate(-50%, -100%)',   // bunn-ankret
                zIndex: Math.round(it.y * 1000),
                cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
                touchAction: 'none',
                filter: isDragging && dragOut ? 'grayscale(0.6) brightness(0.85)' : undefined,
                opacity: isDragging && dragOut ? 0.5 : 1,
              }}
            >
              <img
                src={def.sprite} alt={def.navn} draggable={false}
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  filter: `drop-shadow(0 3px 6px rgba(0,0,0,0.45))${selected ? ' drop-shadow(0 0 0 2px #7dd3fc)' : ''}`,
                  outline: selected ? '2px solid rgba(125,211,252,0.9)' : undefined,
                  pointerEvents: 'none',
                }}
              />

              {/* Vareplass-markører (kun ?dev=1) */}
              {showSlots && vareplasser(def).map((s, i) => (
                <div key={i} title={s.type} style={{
                  position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`,
                  width: 9, height: 9, transform: 'translate(-50%, -50%)',
                  borderRadius: '50%', background: SLOT_COLOR[s.type],
                  border: '1px solid rgba(0,0,0,0.55)', boxShadow: '0 0 0 1px rgba(255,255,255,0.5)',
                  pointerEvents: 'none',
                }} />
              ))}

              {/* Verktøylinje for valgt møbel: størrelse ± / fjern */}
              {selected && (
                <div
                  onPointerDown={e => e.stopPropagation()}
                  style={{
                    position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -130%)',
                    display: 'flex', gap: 4, alignItems: 'center',
                    background: 'rgba(10,14,26,0.92)', border: '1px solid #7dd3fc66',
                    borderRadius: 8, padding: '3px 5px', whiteSpace: 'nowrap',
                  }}
                >
                  <button style={miniBtn} title="Mindre" onClick={() => resize(it.id, -0.15)}>−</button>
                  <span style={{ color: '#cbd5e1', fontSize: 10, fontFamily: 'monospace', minWidth: 30, textAlign: 'center' }}>
                    {Math.round(it.scale * 100)}%
                  </span>
                  <button style={miniBtn} title="Større" onClick={() => resize(it.id, 0.15)}>+</button>
                  <button style={{ ...miniBtn, color: '#fca5a5', borderColor: '#ef444455' }} title="Fjern" onClick={() => remove(it.id)}>✕</button>
                </div>
              )}
            </div>
          )
        })}

        {/* Tom flate */}
        {interactive && items.length === 0 && !drag && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0 0 6% ', pointerEvents: 'none',
            color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, textAlign: 'center',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}>Dra møbler hit fra paletten →</div>
        )}
      </div>

      {/* PALETT (portal, fast) — kun i møbel-modus */}
      {interactive && createPortal(
        <div style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 158,
          maxHeight: '76vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🪑 Møbler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {KLESBUTIKK_FIXTURES.map(def => (
              <div
                key={def.id}
                onPointerDown={e => startNew(def.id, e)}
                title={`${def.navn} — dra inn på butikkveggen (${kapasitet(def)} vareplasser)`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 9, padding: '5px 7px', cursor: 'grab', userSelect: 'none', touchAction: 'none',
                }}
              >
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
            Dra inn · klikk for å velge · ± endrer størrelse · høyreklikk/dra ut fjerner
            {IS_DEV_COORDS ? ' · fargede prikker = vareplasser' : ''}
          </div>
        </div>,
        document.body,
      )}

      {/* Drag-spøkelse (portal) */}
      {drag?.kind === 'new' && ghost && (() => {
        const def = fixtureDef(ghost.fixtureId)
        if (!def) return null
        return createPortal(
          <img
            src={def.sprite} alt="" draggable={false}
            style={{
              position: 'fixed', left: ghost.x, top: ghost.y, width: 80,
              transform: 'translate(-50%, -100%)', zIndex: 9999, pointerEvents: 'none',
              opacity: dragOut ? 0.45 : 0.9, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            }}
          />,
          document.body,
        )
      })()}
    </>
  )
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? 'rgba(125,211,252,0.18)' : 'transparent',
    color: active ? '#e0f2fe' : '#94a3b8',
    border: active ? '1px solid rgba(125,211,252,0.7)' : '1px solid transparent',
    borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
  }
}

const miniBtn: React.CSSProperties = {
  background: 'rgba(125,211,252,0.12)', color: '#7dd3fc', border: '1px solid #7dd3fc55',
  borderRadius: 6, width: 22, height: 22, fontSize: 14, fontWeight: 800, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0,
}
