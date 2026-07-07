import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG } from '../../data/districts'
import { GameProvider, useGame } from '../GameContext'
import { KLESBUTIKK, type Gulvplan } from '../data/industryDefinition'
import { KLESBUTIKK_FIXTURES, fixtureDef, vareplasser, kapasitet, type VareplassType } from '../data/klesbutikkFixtures'
import { KLESBUTIKK_PLAGG, plaggById, spriteFor, baseFit, NULL_FIT, type Plagg, type DukkeType } from '../data/klesbutikkPlagg'
import { KLESBUTIKK_DUKKER, dukkeById, FIXTURE_FOR_DUKKETYPE, type Dukketype } from '../data/klesbutikkDukker'
import type { KlesbutikkFixtureId, Fotpunkt, KlesbutikkPlaggItem, ElevFit } from '../types'
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

// Antrekk-passform: skulder-ankret over dukka.
const ANTREKK_SHOULDER_Y = 0.13   // grunnlinje topp (skulderlinje) i dukke-boksen
const ANTREKK_BASE_W = 0.82       // grunnbredde (brøk av dukke-boksens bredde)
const ELEV_MAX = 0.22             // maks eleven kan dra offset (brøk av boksen)
const ELEV_SCALE_MAX = 0.2        // eleven kan skalere ±20 % fra grunnlinja
const DUKKE_TYPER: KlesbutikkFixtureId[] = ['dukke', 'dukke-mann', 'dukke-barn']

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

/** Plaggets primærtype (bestemmer hvilke vareplasser det passer på). */
function plaggType(p: Plagg): VareplassType {
  return p.spriteHengFront || p.spriteHengProfil ? 'heng' : p.spriteBrett ? 'brett' : 'antrekk'
}

// ── Ett møbel rendret på gulvet/veggen (bunn-ankret, dybde-skalert) ───────────
// Vareplassene er barn av møbel-boksen, så SNAPPEDE PLAGG følger møbelets
// posisjon/skala automatisk. Slot-ankrene (data-plass) er alltid i DOM-en så
// plagg-snappingen kan finne dem via getBoundingClientRect — uavhengig av
// sprite-bildeforhold.
function FurnitureSprite({ fixtureId, itemId, foot, widthFrac, showSlots, opacity, onPointerDown, onRemove,
  itemBySlot, dragType, dragFixtureFilter, targetPlassId, onRemovePlagg, selectedPlassId, onPlaggDown, onPlaggScale, onPlaggReset,
  overrideSprite, onUndress }: {
  fixtureId: KlesbutikkFixtureId
  foot: Fotpunkt
  widthFrac: number
  showSlots: boolean
  opacity?: number
  onPointerDown?: (e: React.PointerEvent) => void
  onRemove?: () => void
  itemId?: string
  itemBySlot?: Record<number, KlesbutikkPlaggItem>
  dragType?: VareplassType | null
  dragFixtureFilter?: KlesbutikkFixtureId | null
  targetPlassId?: string | null
  onRemovePlagg?: (slotIndex: number) => void
  selectedPlassId?: string | null
  onPlaggDown?: (slotIndex: number, e: React.PointerEvent) => void
  onPlaggScale?: (slotIndex: number, delta: number) => void
  onPlaggReset?: (slotIndex: number) => void
  /** Påkledd dukke-sprite som ERSTATTER den nakne dukka (dukke-bytte). */
  overrideSprite?: string
  onUndress?: () => void
}) {
  const def = fixtureDef(fixtureId)
  if (!def) return null
  const vps = itemId ? vareplasser(def) : []
  // Høyreklikk: kledd dukke ⇒ ta av (naken tilbake); ellers ⇒ fjern møbel.
  const ctxMenu = (overrideSprite && onUndress)
    ? (e: React.MouseEvent) => { e.preventDefault(); onUndress() }
    : onRemove ? (e: React.MouseEvent) => { e.preventDefault(); onRemove() } : undefined
  return (
    <div
      data-furniture-box={itemId}
      onPointerDown={onPointerDown}
      onContextMenu={ctxMenu}
      title={overrideSprite ? `${def.navn} (påkledd) — dra for å flytte, høyreklikk = ta av`
        : onRemove ? `${def.navn} — dra for å flytte, høyreklikk for å fjerne` : def.navn}
      style={{
        position: 'absolute', left: `${foot.x}%`, top: `${foot.y}%`,
        width: `${widthFrac * 100}%`, transform: 'translate(-50%, -100%)',
        zIndex: Math.round(foot.y * 10),
        pointerEvents: onPointerDown ? 'auto' : 'none',
        cursor: onPointerDown ? 'grab' : 'default', touchAction: 'none', opacity: opacity ?? 1,
      }}
    >
      <img src={overrideSprite ?? def.sprite} alt={def.navn} draggable={false}
        style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))', pointerEvents: 'none' }} />

      {vps.map((s, i) => {
        const plassId = `${itemId}:${i}`
        const item = itemBySlot?.[i]
        const plagg = item ? plaggById(item.plaggId) : undefined
        const free = !plagg && !overrideSprite
        const compat = !!dragType && dragType === s.type && free && (!dragFixtureFilter || dragFixtureFilter === fixtureId)
        const isTarget = targetPlassId === plassId
        const selected = selectedPlassId === plassId
        const plaggSprite = plagg ? spriteFor(plagg, s.type, s.variant) : undefined
        // Plassering/størrelse per type. Antrekk = SKULDER-ANKRET over dukka med
        // kalibrert grunnlinje (baseFit) + elevens finjustering (elevFit). Heng =
        // topp-ankret (henger ned), brett = bunn-ankret (ligger på flaten).
        const isAntrekk = s.type === 'antrekk'
        const bf = isAntrekk && plagg ? baseFit(plagg, fixtureId as DukkeType) : NULL_FIT
        const fx = bf.offsetX + (item?.elevFit?.dx ?? 0)
        const fy = bf.offsetY + (item?.elevFit?.dy ?? 0)
        const fs = bf.scale * (1 + (item?.elevFit?.dScale ?? 0))
        const pStyle: React.CSSProperties = isAntrekk
          ? { left: `${(0.5 + fx) * 100}%`, top: `${(ANTREKK_SHOULDER_Y + fy) * 100}%`, width: `${ANTREKK_BASE_W * fs * 100}%`, transform: 'translate(-50%, 0)' }
          : { left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: '20%', transform: s.type === 'heng' ? 'translate(-50%, -6%)' : 'translate(-50%, -100%)' }
        const canAdjust = isAntrekk && !!onPlaggDown   // elevens påkledning (kun antrekk)
        return (
          <div key={i}>
            {/* Slot-anker (alltid i DOM for snap-deteksjon) */}
            <div data-plass={plassId} data-type={s.type} data-fixture={fixtureId} data-free={free ? '1' : '0'}
              style={{ position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: 1, height: 1, pointerEvents: 'none' }} />
            {/* Snappet plagg */}
            {plaggSprite && (
              <img
                src={plaggSprite} alt={plagg!.navn} draggable={false}
                onPointerDown={canAdjust ? (e => onPlaggDown!(i, e)) : undefined}
                onWheel={canAdjust ? (e => onPlaggScale?.(i, e.deltaY < 0 ? 0.04 : -0.04)) : undefined}
                onContextMenu={onRemovePlagg ? (e => { e.preventDefault(); e.stopPropagation(); onRemovePlagg(i) }) : undefined}
                title={canAdjust ? `${plagg!.navn} — dra for å plassere, scroll/± for størrelse, høyreklikk = fjern`
                  : onRemovePlagg ? `${plagg!.navn} — høyreklikk for å fjerne` : plagg!.navn}
                style={{
                  position: 'absolute', ...pStyle, height: 'auto',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                  outline: selected ? '2px dashed rgba(244,114,182,0.85)' : undefined,
                  pointerEvents: onRemovePlagg ? 'auto' : 'none',
                  cursor: canAdjust ? 'move' : 'context-menu', touchAction: 'none',
                }} />
            )}
            {/* Elev-verktøylinje for valgt antrekk: størrelse ± / tilbakestill */}
            {selected && canAdjust && (
              <div onPointerDown={e => e.stopPropagation()} style={{
                position: 'absolute', left: `${(0.5 + fx) * 100}%`, top: `${(ANTREKK_SHOULDER_Y + fy) * 100}%`,
                transform: 'translate(-50%, -130%)', display: 'flex', gap: 3, alignItems: 'center',
                background: 'rgba(10,14,26,0.92)', border: '1px solid #f472b688', borderRadius: 7, padding: '2px 4px', whiteSpace: 'nowrap',
              }}>
                <button style={miniBtn} title="Mindre" onClick={() => onPlaggScale?.(i, -0.05)}>−</button>
                <span style={{ color: '#f9a8d4', fontSize: 10, fontFamily: 'monospace', minWidth: 30, textAlign: 'center' }}>{Math.round((1 + (item?.elevFit?.dScale ?? 0)) * 100)}%</span>
                <button style={miniBtn} title="Større" onClick={() => onPlaggScale?.(i, 0.05)}>+</button>
                <button style={miniBtn} title="Tilbakestill" onClick={() => onPlaggReset?.(i)}>⟲</button>
              </div>
            )}
            {/* Highlight ledige kompatible plasser under plagg-drag */}
            {compat && (
              <div style={{
                position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`,
                width: isTarget ? 18 : 12, height: isTarget ? 18 : 12, transform: 'translate(-50%, -50%)',
                borderRadius: '50%', border: `2px solid ${isTarget ? '#22e6a4' : '#7dd3fc'}`,
                background: isTarget ? 'rgba(34,230,164,0.35)' : 'rgba(125,211,252,0.15)',
                boxShadow: isTarget ? '0 0 10px rgba(34,230,164,0.7)' : 'none', pointerEvents: 'none',
              }} />
            )}
            {/* Dev-markør (kalibrering) */}
            {showSlots && (
              <div title={s.type} style={{
                position: 'absolute', left: `${s.x * 100}%`, top: `${s.y * 100}%`,
                width: 9, height: 9, transform: 'translate(-50%, -50%)', borderRadius: '50%',
                background: SLOT_COLOR[s.type], border: '1px solid rgba(0,0,0,0.55)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.5)', pointerEvents: 'none',
              }} />
            )}
          </div>
        )
      })}
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

  // Plagg-snapping (presentasjonslag)
  const [plaggItems, setPlaggItems] = useState(state.klesbutikkPlaggLayout)
  const plaggRef = useRef(plaggItems)
  // `id` = plaggId (heng/brett) ELLER påkledd-dukke-id (antrekk-bytte).
  // `fixtureFilter` (kun dukke-bytte) begrenser antrekk-plasser til matchende dukketype.
  const [dragPlagg, setDragPlagg] = useState<{ id: string; type: VareplassType; sprite: string; fixtureFilter?: KlesbutikkFixtureId } | null>(null)
  const [plaggGhost, setPlaggGhost] = useState<{ x: number; y: number } | null>(null)
  const [targetPlassId, setTargetPlassId] = useState<string | null>(null)
  const commitPlagg = (next: typeof plaggItems) => { plaggRef.current = next; setPlaggItems(next); dispatch({ type: 'SET_KLESBUTIKK_PLAGG', items: next }) }

  // itemId → { slotIndex → plaggItem }
  const itemByFurniture: Record<string, Record<number, KlesbutikkPlaggItem>> = {}
  for (const pi of plaggItems) {
    const [fid, si] = pi.plassId.split(':')
    ;(itemByFurniture[fid] ??= {})[Number(si)] = pi
  }
  const [selAntrekk, setSelAntrekk] = useState<string | null>(null)   // valgt antrekk-plassId
  const setPlaggLocal = (next: typeof plaggItems) => { plaggRef.current = next; setPlaggItems(next) }
  const persistPlagg = () => dispatch({ type: 'SET_KLESBUTIKK_PLAGG', items: plaggRef.current })
  const patchElev = (plassId: string, ef: ElevFit) =>
    plaggRef.current.map(pi => pi.plassId === plassId ? { ...pi, elevFit: ef } : pi)

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

  // Nærmeste LEDIGE, kompatible vareplass til (cx,cy) — leser slot-ankrene
  // (data-plass) fra DOM-en, så vi slipper sprite-bildeforhold-matematikk.
  function nearestSlot(type: VareplassType, cx: number, cy: number, fixtureFilter?: KlesbutikkFixtureId): string | null {
    const r = overlayRef.current?.getBoundingClientRect(); if (!r) return null
    let best: string | null = null, bestD = Infinity
    document.querySelectorAll<HTMLElement>('[data-plass]').forEach(el => {
      if (el.dataset.type !== type || el.dataset.free !== '1') return
      if (fixtureFilter && el.dataset.fixture !== fixtureFilter) return
      const b = el.getBoundingClientRect(); const sx = b.left + b.width / 2, sy = b.top + b.height / 2
      const d = Math.hypot(cx - sx, cy - sy)
      if (d < bestD) { bestD = d; best = el.dataset.plass ?? null }
    })
    return best && bestD <= 0.07 * r.width ? best : null
  }

  // Felles drag → snap (plagg ELLER påkledd dukke). `id` lagres i plaggId-feltet.
  function beginSnapDrag(id: string, type: VareplassType, sprite: string, e: React.PointerEvent, fixtureFilter?: KlesbutikkFixtureId) {
    e.preventDefault()
    setDragPlagg({ id, type, sprite, fixtureFilter }); setPlaggGhost({ x: e.clientX, y: e.clientY }); setTargetPlassId(null)
    const onMove = (ev: PointerEvent) => {
      setPlaggGhost({ x: ev.clientX, y: ev.clientY })
      setTargetPlassId(nearestSlot(type, ev.clientX, ev.clientY, fixtureFilter))
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      const target = nearestSlot(type, ev.clientX, ev.clientY, fixtureFilter)
      setDragPlagg(null); setPlaggGhost(null); setTargetPlassId(null)
      if (target) commitPlagg([...plaggRef.current.filter(pi => pi.plassId !== target), { plassId: target, plaggId: id }])
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  function startPlaggDrag(plaggId: string, e: React.PointerEvent) {
    const p = plaggById(plaggId); if (!p) return
    const sprite = p.spriteHengFront ?? p.spriteBrett ?? p.spriteAntrekk ?? ''
    beginSnapDrag(plaggId, plaggType(p), sprite, e)
  }
  function startDukkeDrag(dukkeId: string, e: React.PointerEvent) {
    const dk = dukkeById(dukkeId); if (!dk) return
    beginSnapDrag(dukkeId, 'antrekk', dk.sprite, e, FIXTURE_FOR_DUKKETYPE[dk.dukketype])
  }

  const removePlaggAt = (itemId: string, slot: number) => {
    const pid = `${itemId}:${slot}`
    if (selAntrekk === pid) setSelAntrekk(null)
    commitPlagg(plaggRef.current.filter(pi => pi.plassId !== pid))
  }

  // ── Elevens påkledning: dra antrekket på dukka (klemte grenser), scale ±20 %,
  // tilbakestill. OPPÅ den kalibrerte grunnlinja (antrekkFit). Kun antrekk. ──
  function startAntrekkDrag(plassId: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    setSelAntrekk(plassId)
    const boxEl = (e.currentTarget as HTMLElement).closest('[data-furniture-box]') as HTMLElement | null
    if (!boxEl) return
    const cur = plaggRef.current.find(pi => pi.plassId === plassId)?.elevFit ?? { dx: 0, dy: 0, dScale: 0 }
    const sx = e.clientX, sy = e.clientY
    const onMove = (ev: PointerEvent) => {
      const r = boxEl.getBoundingClientRect()
      const ndx = clamp(cur.dx + (ev.clientX - sx) / r.width, -ELEV_MAX, ELEV_MAX)
      const ndy = clamp(cur.dy + (ev.clientY - sy) / r.height, -ELEV_MAX, ELEV_MAX)
      setPlaggLocal(patchElev(plassId, { dx: ndx, dy: ndy, dScale: cur.dScale }))
    }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true); persistPlagg() }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const scaleElev = (plassId: string, delta: number) => {
    const cur = plaggRef.current.find(pi => pi.plassId === plassId)?.elevFit ?? { dx: 0, dy: 0, dScale: 0 }
    setSelAntrekk(plassId)
    commitPlagg(patchElev(plassId, { ...cur, dScale: clamp(cur.dScale + delta, -ELEV_SCALE_MAX, ELEV_SCALE_MAX) }))
  }
  const resetElev = (plassId: string) =>
    commitPlagg(plaggRef.current.map(pi => pi.plassId === plassId ? { plassId: pi.plassId, plaggId: pi.plaggId } : pi))

  // ── Dev-kalibrator: sett GRUNNLINJA (antrekkFit) for valgt antrekk × dukketype,
  // mutér-og-logg (?dev=1). Skiller fra elevens elevFit (som ligger oppå). ──
  const [calPerDukke, setCalPerDukke] = useState(false)
  const [, setCalRev] = useState(0)
  const selInfo = (() => {
    if (!selAntrekk) return null
    const [fid] = selAntrekk.split(':')
    const fx = items.find(i => i.id === fid)
    const pi = plaggItems.find(p => p.plassId === selAntrekk)
    if (!fx || !pi || !DUKKE_TYPER.includes(fx.fixtureId)) return null
    const plagg = plaggById(pi.plaggId); if (!plagg) return null
    return { plagg, dukke: fx.fixtureId as DukkeType }
  })()
  const calBaseline = () => selInfo ? baseFit(selInfo.plagg, selInfo.dukke) : NULL_FIT
  function calSet(f: { offsetX: number; offsetY: number; scale: number }) {
    if (!selInfo) return
    const { plagg, dukke } = selInfo
    if (!plagg.antrekkFit) plagg.antrekkFit = { default: { ...NULL_FIT } }
    if (calPerDukke) (plagg.antrekkFit.perDukke ??= {})[dukke] = f
    else plagg.antrekkFit.default = f
    setCalRev(r => r + 1)
  }
  const calNudge = (dx: number, dy: number, ds: number) => {
    const c = calBaseline()
    calSet({ offsetX: +(c.offsetX + dx).toFixed(3), offsetY: +(c.offsetY + dy).toFixed(3), scale: +clamp(c.scale + ds, 0.3, 2.5).toFixed(2) })
  }
  const calLog = () => selInfo && console.log(`[AntrekkFit] '${selInfo.plagg.id}': ${JSON.stringify(selInfo.plagg.antrekkFit)},  ← lim inn i ANTREKK_FIT (klesbutikkPlagg.ts)`)

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
        // DUKKE-BYTTE: er dukka kledd på (antrekk-slot 0 opptatt av en påkledd
        // dukke)? → erstatt naken dukke-sprite med den påkledde.
        const isDukke = DUKKE_TYPER.includes(it.fixtureId)
        const dressed = isDukke ? itemByFurniture[it.id]?.[0] : undefined
        const overrideSprite = dressed ? dukkeById(dressed.plaggId)?.sprite : undefined
        return (
          <FurnitureSprite key={it.id} fixtureId={it.fixtureId} itemId={it.id} foot={it.fotpunkt} widthFrac={w}
            showSlots={showSlots}
            onPointerDown={interactive ? (e => startMove(it.id, e)) : undefined}
            onRemove={interactive ? () => remove(it.id) : undefined}
            itemBySlot={itemByFurniture[it.id]}
            dragType={dragPlagg?.type ?? null}
            dragFixtureFilter={dragPlagg?.fixtureFilter ?? null}
            targetPlassId={targetPlassId}
            onRemovePlagg={interactive ? (slot => removePlaggAt(it.id, slot)) : undefined}
            selectedPlassId={selAntrekk}
            onPlaggDown={interactive ? ((slot, e) => startAntrekkDrag(`${it.id}:${slot}`, e)) : undefined}
            onPlaggScale={interactive ? ((slot, d) => scaleElev(`${it.id}:${slot}`, d)) : undefined}
            onPlaggReset={interactive ? (slot => resetElev(`${it.id}:${slot}`)) : undefined}
            overrideSprite={overrideSprite}
            onUndress={interactive ? () => removePlaggAt(it.id, 0) : undefined} />
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

      {/* Klespalett (portal, venstre) — dra plagg til kompatible vareplasser */}
      {interactive && createPortal(
        <div style={{
          position: 'fixed', top: 56, left: 16, zIndex: 95, width: 168, maxHeight: '78vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 4 }}>👕 Plagg &amp; dukker</div>
          <div style={{ fontSize: 9, color: '#64748b', marginBottom: 8, lineHeight: 1.4 }}>
            Dra: heng→stativ, brett→hylle/bord, påkledd dukke→matchende naken dukke.
          </div>
          {/* Heng + brett (vanlige plagg) */}
          {(['heng', 'brett'] as VareplassType[]).map(t => {
            const list = KLESBUTIKK_PLAGG.filter(p => plaggType(p) === t)
            const thumb = (p: Plagg) => p.spriteHengFront ?? p.spriteBrett ?? p.spriteAntrekk
            return (
              <div key={t} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: SLOT_COLOR[t], marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {t === 'heng' ? 'Hengende' : 'Brettet'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                  {list.map(p => (
                    <div key={p.id} onPointerDown={e => startPlaggDrag(p.id, e)} title={p.navn}
                      style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'grab', touchAction: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                      <img src={thumb(p)} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
          {/* Påkledde dukker (erstatter ghost-antrekk) — gruppert på dukketype */}
          {(['dame', 'herre', 'barn'] as Dukketype[]).map(dt => {
            const list = KLESBUTIKK_DUKKER.filter(d => d.dukketype === dt)
            return (
              <div key={dt} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#f472b6', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  🧍 Påkledd {dt}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                  {list.map(d => (
                    <div key={d.id} onPointerDown={e => startDukkeDrag(d.id, e)} title={`${d.navn} (${d.dukketype})`}
                      style={{ aspectRatio: '0.5', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'grab', touchAction: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 2 }}>
                      <img src={d.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>, document.body)}

      {/* Drag-spøkelse (plagg eller påkledd dukke) */}
      {dragPlagg && plaggGhost && createPortal(
        <img src={dragPlagg.sprite} alt="" draggable={false} style={{
          position: 'fixed', left: plaggGhost.x, top: plaggGhost.y,
          width: dragPlagg.type === 'antrekk' ? 46 : 54, transform: 'translate(-50%, -50%)',
          zIndex: 9999, pointerEvents: 'none', opacity: targetPlassId ? 0.95 : 0.6, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        }} />, document.body)}

      {/* ?dev=1: ANTREKK-FIT-KALIBRATOR (grunnlinje) for valgt antrekk på dukke */}
      {IS_DEV_COORDS && selInfo && createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, left: 200, zIndex: 96, width: 194,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #f472b655', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 800, marginBottom: 4 }}>🎚️ Antrekk-fit (grunnlinje)</div>
          <div style={{ color: '#cbd5e1', fontSize: 10, fontFamily: 'monospace', marginBottom: 6 }}>
            {selInfo.plagg.id} @ {selInfo.dukke}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94a3b8', fontSize: 10, marginBottom: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={calPerDukke} onChange={e => setCalPerDukke(e.target.checked)} />
            per DENNE dukketypen (ellers default)
          </label>
          {(() => { const c = calBaseline(); return (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, width: 96, margin: '0 auto 6px' }}>
                <span /><button style={miniBtn} title="opp" onClick={() => calNudge(0, -0.01, 0)}>↑</button><span />
                <button style={miniBtn} title="venstre" onClick={() => calNudge(-0.01, 0, 0)}>←</button>
                <span style={{ fontSize: 8, color: '#64748b', textAlign: 'center', alignSelf: 'center', fontFamily: 'monospace' }}>{c.offsetX.toFixed(2)}<br />{c.offsetY.toFixed(2)}</span>
                <button style={miniBtn} title="høyre" onClick={() => calNudge(0.01, 0, 0)}>→</button>
                <span /><button style={miniBtn} title="ned" onClick={() => calNudge(0, 0.01, 0)}>↓</button><span />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ color: '#94a3b8', fontSize: 11 }}>scale</span>
                <button style={miniBtn} onClick={() => calNudge(0, 0, -0.05)}>−</button>
                <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 30, textAlign: 'center' }}>{c.scale.toFixed(2)}</span>
                <button style={miniBtn} onClick={() => calNudge(0, 0, 0.05)}>+</button>
              </div>
            </>
          )})()}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800 }} onClick={calLog}>Logg fit → konsoll</button>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Lim inn i ANTREKK_FIT (klesbutikkPlagg.ts). Nullstill elevens elevFit (⟲) før du kalibrerer grunnlinja.
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
