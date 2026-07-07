import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG } from '../../data/districts'
import { GameProvider, useGame } from '../GameContext'
import { KLESBUTIKK, type Ankerplass } from '../data/industryDefinition'
import { KLESBUTIKK_FIXTURES, fixtureDef, vareplasser, kapasitet, type VareplassType } from '../data/klesbutikkFixtures'
import type { KlesbutikkFixtureId } from '../types'
import { IS_DEV_COORDS } from './DevCoordHelper'
import ZoneTracer, { type Target, type DrawZone, type Rect } from './ZoneTracer'

// ── KlesbutikkStillas (BRANSJE 2) — STILLAS-scene for klesbutikk ──────────────
// Frittstående dev-scene (rute /dev/klesbutikk, IKKE koblet til onboarding/
// spillflyten — kafé-flyten er urørt). To faner:
//   • Fasade — vindussonen (styling-flate), sone-tracer i ?dev=1.
//   • Interiør — MØBLER SNAPPER TIL ANKERPLASSER: dra et møbel fra paletten,
//     ledige kompatible plasser markeres, slipp nær en plass = snapper inn med
//     plassens LÅSTE posisjon/skala. Opptatt plass = erstattes. Høyreklikk =
//     fjern. INGEN fri flytting/størrelse. State lagrer kun { plassId → type }.
// ?dev=1 gir tre moduser (Møbler / Ankere / Soner):
//   • Møbler — vareplass-markørene vises på møblene (klesbutikkFixtures.ts).
//   • Ankere — ankerplass-tracer: klikk i bildet for å legge plass, juster
//     scale, velg tillatte typer, «Logg array» → industryDefinition.ts.
//   • Soner  — sone-tracer (KLESBUTIKK_VINDU/KLESBUTIKK_BUTIKKVEGG).
// Ankerplassene bor i KLESBUTIKK.ankerplasser (industryDefinition.ts); traceren
// muterer dem live og logger for innliming (samme mønster som sone-traceren).

const INTERIOR_IMG = '/assets/raw/klesbutikk-interior.jpg'
const FASADE_IMG = '/assets/raw/klesbutikk-fasade.png'
const SNAP_THRESH_FRAC = 0.09   // snap-avstand som brøk av scene-bredden

const writeRect = (t: Rect, r: Rect) => { t[0] = r[0]; t[1] = r[1]; t[2] = r[2]; t[3] = r[3] }
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

const SLOT_COLOR: Record<VareplassType, string> = { heng: '#50dcff', brett: '#ffb03c', antrekk: '#f472b6' }

type DevMode = 'møbler' | 'anker' | 'sone'

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
    hint: 'Dra møbler fra paletten — de snapper til ankerplassene. Høyreklikk = fjern.',
    target: { id: 'butikkvegg', label: 'butikkvegg', get: () => KLESBUTIKK_BUTIKKVEGG, set: r => writeRect(KLESBUTIKK_BUTIKKVEGG, r) },
    drawZone: { rect: KLESBUTIKK_BUTIKKVEGG, color: '#ffa03c', label: 'butikkvegg', surface: true },
  },
]

export default function KlesbutikkStillas() {
  // Egen GameProvider: dev-ruta ligger utenfor GamePage sin provider, men vi vil
  // persistere møbel-layouten i reducer-state (samme mønster som counterLayout).
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
      {/* Topplinje: scenevalg + (dev) modusvalg */}
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
            {scene.id === 'interior' && (['møbler', 'anker'] as DevMode[]).map(m => (
              <button key={m} onClick={() => setDevMode(m)} style={tabStyle(mode === m)}>
                {m === 'møbler' ? '🪑 Møbler' : '⚓ Ankere'}
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

      {/* Scene-stage */}
      <div style={{
        position: 'relative', aspectRatio: `${scene.aspect}`,
        width: `min(96vw, calc(86vh * ${scene.aspect}))`, height: 'auto',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
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

        {/* Sonens referanse-ramme (ikke i sone-tracer-modus, som tegner egne) */}
        {mode !== 'sone' && (
          <div style={{
            position: 'absolute',
            left: `${scene.drawZone.rect[0]}%`, top: `${scene.drawZone.rect[1]}%`,
            width: `${scene.drawZone.rect[2]}%`, height: `${scene.drawZone.rect[3]}%`,
            border: `1px dashed ${scene.drawZone.color}66`, pointerEvents: 'none',
          }} />
        )}

        {/* Interiør: plasserte møbler + aktiv modus */}
        {scene.id === 'interior' && (
          <>
            <PlacedFurniture interactive={mode === 'møbler'} showSlots={showSlots} />
            {mode === 'møbler' && <SnapPalette />}
            {mode === 'anker' && <AnchorTracer bump={bump} />}
          </>
        )}

        {/* Sone-tracer (begge scener) */}
        {mode === 'sone' && (
          <ZoneTracer key={scene.id} onApply={bump} targets={[scene.target]} drawZones={[scene.drawZone]} />
        )}
      </div>

      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
        padding: '0.4rem 1rem', color: '#cbd5e1', fontSize: 12, whiteSpace: 'nowrap',
      }}>{scene.id === 'interior' && IS_DEV_COORDS && mode === 'anker'
        ? 'Ankerplass-tracer: klikk i bildet for ny plass, rediger i panelet, «Logg array».'
        : scene.hint}</div>
    </div>
  )
}

// ── Ett møbel rendret på en ankerplass (bunn-ankret, låst pos/skala) ─────────
function FurnitureSprite({ anchor, fixtureId, showSlots, onRemove }: {
  anchor: Ankerplass
  fixtureId: KlesbutikkFixtureId
  showSlots: boolean
  onRemove?: () => void
}) {
  const def = fixtureDef(fixtureId)
  if (!def) return null
  const w = def.baseWFrac * anchor.scale   // bredde-brøk av scenebildet
  return (
    <div
      onContextMenu={onRemove ? (e => { e.preventDefault(); onRemove() }) : undefined}
      title={onRemove ? `${def.navn} — høyreklikk for å fjerne` : def.navn}
      style={{
        position: 'absolute', left: `${anchor.x}%`, top: `${anchor.y}%`,
        width: `${w * 100}%`, transform: 'translate(-50%, -100%)',
        zIndex: Math.round(anchor.y * 10),
        pointerEvents: onRemove ? 'auto' : 'none',
        cursor: onRemove ? 'context-menu' : 'default',
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

// ── Plasserte møbler (leser anker + state) ───────────────────────────────────
function PlacedFurniture({ interactive, showSlots }: { interactive: boolean; showSlots: boolean }) {
  const { state, dispatch } = useGame()
  const anchors = KLESBUTIKK.ankerplasser ?? []
  const occ = state.klesbutikkFixtureLayout
  const remove = (plassId: string) =>
    dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: occ.filter(i => i.plassId !== plassId) })
  return (
    <>
      {occ.map(it => {
        const a = anchors.find(x => x.id === it.plassId)
        if (!a) return null   // plassen finnes ikke lenger (slettet i traceren)
        return (
          <FurnitureSprite key={it.plassId} anchor={a} fixtureId={it.fixtureId}
            showSlots={showSlots} onRemove={interactive ? () => remove(it.plassId) : undefined} />
        )
      })}
    </>
  )
}

// ── Snap-palett: dra møbel → marker kompatible plasser → slipp = snap ─────────
function SnapPalette() {
  const { state, dispatch } = useGame()
  const overlayRef = useRef<HTMLDivElement>(null)
  const anchors = KLESBUTIKK.ankerplasser ?? []
  const occupied = new Set(state.klesbutikkFixtureLayout.map(i => i.plassId))
  const [drag, setDrag] = useState<{ fixtureId: KlesbutikkFixtureId } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const [targetId, setTargetId] = useState<string | null>(null)

  const nearest = (fixtureId: KlesbutikkFixtureId, cx: number, cy: number) => {
    const rect = overlayRef.current?.getBoundingClientRect()
    if (!rect) return null
    let best: Ankerplass | null = null, bestD = Infinity
    for (const a of anchors) {
      if (!a.tillatteTyper.includes(fixtureId)) continue
      const sx = rect.x + (a.x / 100) * rect.width, sy = rect.y + (a.y / 100) * rect.height
      const d = Math.hypot(cx - sx, cy - sy)
      if (d < bestD) { bestD = d; best = a }
    }
    return best && bestD <= SNAP_THRESH_FRAC * rect.width ? best : null
  }

  function place(plassId: string, fixtureId: KlesbutikkFixtureId) {
    const next = [...state.klesbutikkFixtureLayout.filter(i => i.plassId !== plassId), { plassId, fixtureId }]
    dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: next })
  }

  function startDrag(fixtureId: KlesbutikkFixtureId, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ fixtureId }); setGhost({ x: e.clientX, y: e.clientY }); setTargetId(null)
    const onMove = (ev: PointerEvent) => {
      setGhost({ x: ev.clientX, y: ev.clientY })
      setTargetId(nearest(fixtureId, ev.clientX, ev.clientY)?.id ?? null)
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      const target = nearest(fixtureId, ev.clientX, ev.clientY)
      setDrag(null); setGhost(null); setTargetId(null)
      if (target) place(target.id, fixtureId)
    }
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  const compat = (a: Ankerplass) => drag && a.tillatteTyper.includes(drag.fixtureId)

  return (
    <>
      {/* Overlay: ankermarkører + highlights (måler også scenen) */}
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, zIndex: 40, pointerEvents: 'none' }}>
        {anchors.map(a => {
          const isCompat = compat(a)
          const isTarget = targetId === a.id
          const busy = occupied.has(a.id)
          // Uten drag: vis kun ledige plasser som svake prikker. Under drag: ring
          // rundt alle kompatible; snap-målet fylt.
          if (!drag && busy) return null
          const show = !drag ? !busy : isCompat
          if (!show) return null
          const color = isTarget ? '#22e6a4' : isCompat ? '#7dd3fc' : '#64748b'
          return (
            <div key={a.id} style={{
              position: 'absolute', left: `${a.x}%`, top: `${a.y}%`, transform: 'translate(-50%, -50%)',
              width: isTarget ? 20 : 14, height: isTarget ? 20 : 14, borderRadius: '50%',
              border: `2px solid ${color}`, background: isTarget ? 'rgba(34,230,164,0.35)' : busy ? 'rgba(255,176,60,0.25)' : 'rgba(125,211,252,0.12)',
              boxShadow: isTarget ? '0 0 12px rgba(34,230,164,0.7)' : 'none',
            }} />
          )
        })}
      </div>

      {/* Palett (portal, fast) */}
      {createPortal(
        <div style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 158, maxHeight: '76vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🪑 Møbler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {KLESBUTIKK_FIXTURES.map(def => (
              <div key={def.id} onPointerDown={e => startDrag(def.id, e)}
                title={`${def.navn} — dra til en ankerplass (${kapasitet(def)} vareplasser)`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '5px 7px',
                  cursor: 'grab', userSelect: 'none', touchAction: 'none',
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
            Dra til en plass (snapper inn) · opptatt plass = erstatt · høyreklikk møbel = fjern
          </div>
        </div>, document.body)}

      {/* Drag-spøkelse */}
      {drag && ghost && (() => {
        const def = fixtureDef(drag.fixtureId)
        if (!def) return null
        return createPortal(
          <img src={def.sprite} alt="" draggable={false} style={{
            position: 'fixed', left: ghost.x, top: ghost.y, width: 80, transform: 'translate(-50%, -100%)',
            zIndex: 9999, pointerEvents: 'none', opacity: targetId ? 0.95 : 0.55,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
          }} />, document.body)
      })()}
    </>
  )
}

// ── Ankerplass-tracer (?dev=1) — klikk for ny plass, rediger, logg array ──────
function AnchorTracer({ bump }: { bump: () => void }) {
  if (!KLESBUTIKK.ankerplasser) KLESBUTIKK.ankerplasser = []
  const anchors = KLESBUTIKK.ankerplasser
  const overlayRef = useRef<HTMLDivElement>(null)
  const [selId, setSelId] = useState<string | null>(anchors[0]?.id ?? null)
  const sel = anchors.find(a => a.id === selId) ?? null

  function nextId(): string {
    let max = 0
    for (const a of anchors) { const m = /(\d+)$/.exec(a.id); if (m) max = Math.max(max, +m[1]) }
    return `plass-${max + 1}`
  }
  function addAt(e: React.PointerEvent) {
    if (e.target !== e.currentTarget) return
    const rect = overlayRef.current!.getBoundingClientRect()
    const x = +(((e.clientX - rect.x) / rect.width) * 100).toFixed(1)
    const y = +(((e.clientY - rect.y) / rect.height) * 100).toFixed(1)
    const id = nextId()
    anchors.push({ id, x, y, scale: 0.34, tillatteTyper: KLESBUTIKK_FIXTURES.map(f => f.id) })
    setSelId(id); bump()
  }
  const editScale = (d: number) => { if (sel) { sel.scale = +clamp(sel.scale + d, 0.08, 1).toFixed(2); bump() } }
  const toggleType = (t: KlesbutikkFixtureId) => {
    if (!sel) return
    sel.tillatteTyper = sel.tillatteTyper.includes(t) ? sel.tillatteTyper.filter(x => x !== t) : [...sel.tillatteTyper, t]
    bump()
  }
  const del = () => {
    if (!sel) return
    const i = anchors.indexOf(sel); if (i >= 0) anchors.splice(i, 1)
    setSelId(anchors[0]?.id ?? null); bump()
  }
  const logArray = () => {
    const body = anchors.map(a =>
      `    { id: '${a.id}', x: ${a.x}, y: ${a.y}, scale: ${a.scale}, tillatteTyper: [${a.tillatteTyper.map(t => `'${t}'`).join(', ')}] },`
    ).join('\n')
    console.log(`[AnchorTracer] ankerplasser (lim inn i KLESBUTIKK i industryDefinition.ts):\n  ankerplasser: [\n${body}\n  ],`)
  }

  return (
    <>
      <div ref={overlayRef} onPointerDown={addAt}
        style={{ position: 'absolute', inset: 0, zIndex: 45, cursor: 'crosshair', touchAction: 'none' }}>
        {anchors.map((a, i) => {
          const on = a.id === selId
          return (
            <div key={a.id}
              onPointerDown={e => { e.stopPropagation(); setSelId(a.id) }}
              title={`${a.id} — ${a.tillatteTyper.length} typer`}
              style={{
                position: 'absolute', left: `${a.x}%`, top: `${a.y}%`, transform: 'translate(-50%, -50%)',
                width: on ? 22 : 16, height: on ? 22 : 16, borderRadius: '50%', cursor: 'pointer',
                border: `2px solid ${on ? '#ffd24a' : '#22e6a4'}`,
                background: on ? 'rgba(255,210,74,0.35)' : 'rgba(34,230,164,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 800, color: '#fff',
              }}>{i + 1}</div>
          )
        })}
      </div>

      {/* Panel (portal) */}
      {createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 210,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #ffd24a55', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#ffd24a', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>⚓ Ankerplass-tracer</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Klikk i bildet = ny plass. {anchors.length} plasser.
          </div>
          {sel ? (
            <>
              <div style={{ color: '#cbd5e1', fontSize: 11, fontFamily: 'monospace', marginBottom: 6 }}>
                {sel.id} · x {sel.x} · y {sel.y}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ color: '#94a3b8', fontSize: 11 }}>scale</span>
                <button style={miniBtn} onClick={() => editScale(-0.02)}>−</button>
                <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 34, textAlign: 'center' }}>{sel.scale.toFixed(2)}</span>
                <button style={miniBtn} onClick={() => editScale(0.02)}>+</button>
                <button style={{ ...miniBtn, marginLeft: 'auto', color: '#fca5a5', borderColor: '#ef444455' }} title="Slett plass" onClick={del}>✕</button>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>Tillatte typer:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                {KLESBUTIKK_FIXTURES.map(f => {
                  const on = sel.tillatteTyper.includes(f.id)
                  return (
                    <button key={f.id} onClick={() => toggleType(f.id)} title={f.navn} style={{
                      background: on ? 'rgba(34,230,164,0.2)' : 'transparent', color: on ? '#5eead4' : '#64748b',
                      border: `1px solid ${on ? '#22e6a4aa' : 'rgba(255,255,255,0.15)'}`, borderRadius: 6,
                      padding: '2px 6px', fontSize: 9, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                    }}>{f.id}</button>
                  )
                })}
              </div>
            </>
          ) : <div style={{ color: '#64748b', fontSize: 11, marginBottom: 8 }}>Ingen plass valgt.</div>}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800 }} onClick={logArray}>Logg array → konsoll</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Lim det loggede arrayet inn i KLESBUTIKK.ankerplasser (industryDefinition.ts).
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
