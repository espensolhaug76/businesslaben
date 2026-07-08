import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { KLESBUTIKK_VINDU, KLESBUTIKK_BUTIKKVEGG } from '../../data/districts'
import { GameProvider, useGame } from '../GameContext'
import { KLESBUTIKK, type Gulvplan, type Vegghengpunkt } from '../data/industryDefinition'
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
// To alltid-moduser: 📋 Plan (plantegning ovenfra, primær møbelplassering) og
// 🛍 Scene (perspektiv-resultat + plagg/dukke-styling). ?dev=1 gir i tillegg:
// 📐 Gulvplan (trapes-tracer) · 📌 Veggpunkt (vegghengpunkt-tracer) · 🧭 Soner.
// Gulvplanet og vegghengpunktene bor i KLESBUTIKK (industryDefinition.ts);
// tracerne muterer + logger.

// BAKT INTERIØR (kafé-modellen): scenebildet er en FERDIG MØBLERT, tom butikk.
// Elevene styler FASTE, kalibrerte vareplasser (som monter-trauene) — fri
// møblering er PARKERT (se FRI_MOBLERING). ✦-vannmerket er patchet vekk fra
// råbildet (…-mobler-raw.png → …-mobler.png).
const INTERIOR_IMG = '/assets/raw/klesbutikk-interior-mobler.png'
const FASADE_IMG = '/assets/raw/klesbutikk-fasade.png'

// PARKERT: fri møblering (møbel-palett, plantegning, fotavtrykk-kalibrator,
// speiling, møbel-plassering/-flytting i scenen). Koden beholdes DØD (ikke
// slettet) og gates på dette flagget, jf. retningsskiftet til bakt interiør.
const FRI_MOBLERING = false

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
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

/** Gulv-trapesets horisontale bredde ved dybde v, som brøk av scenebildet. */
function trapWidthFrac(g: Gulvplan, v: number): number {
  return (quadPoint(g, 1, v).x - quadPoint(g, 0, v).x) / 100
}

/** SCENE-sprite-bredde (brøk av scenebildet) UTLEDT av møbelets fotavtrykk.b:
 *  `b` % av gulv-trapesets bredde ved møbelets dybde. ÉN KILDE med plan-ikonet
 *  (som bruker samme `b`/`d` mot planrektangelet), så de aldri kommer i utakt. */
function sceneWidthFrac(g: Gulvplan, fixtureId: KlesbutikkFixtureId, foot: Fotpunkt): number {
  const fa = fixtureDef(fixtureId)?.fotavtrykk
  if (!fa) return 0
  const v = clamp(invBilinear(foot, g).v, 0, 1)
  return (fa.b / 100) * trapWidthFrac(g, v)
}

// ── Plantegning (ovenfra) ↔ fotpunkt ─────────────────────────────────────────
// Planet er trapesets (u,v) BRETTET UT til et rektangel: x = u (bredde),
// y = dybde der TOPPEN av planet = bakkant (v=1) og BUNNEN = fremkant (v=0).
// Plan og perspektivscene er dermed to visninger av SAMME fotpunkt-layout.
function footToPlan(g: Gulvplan, foot: Fotpunkt): { px: number; py: number } {
  const { u, v } = invBilinear(foot, g)
  return { px: clamp(u, 0, 1) * 100, py: (1 - clamp(v, 0, 1)) * 100 }
}
function planToFoot(g: Gulvplan, u: number, v: number): Fotpunkt {
  return quadPoint(g, clamp(u, 0, 1), clamp(v, 0, 1))
}

/** Skjematisk toppikon per møbel — KUN form/farge. Størrelsen (bredde/dybde)
 *  kommer fra møbelets `fotavtrykk` (samme kilde som scene-bredden). */
const PLAN_ICON: Record<KlesbutikkFixtureId, { round: boolean; color: string }> = {
  'stativ': { round: true, color: '#c98a3c' },
  'stativ-liten': { round: true, color: '#c98a3c' },
  'hylle': { round: false, color: '#8a6a3a' },
  'bord': { round: false, color: '#8a6a3a' },
  'bord-podium': { round: false, color: '#a07a44' },
  'dukke': { round: true, color: '#d16aa8' },
  'dukke-mann': { round: true, color: '#d16aa8' },
  'dukke-barn': { round: true, color: '#d16aa8' },
}

// plan/scene er tilgjengelig UTEN ?dev=1 (to hovedvisninger av samme layout);
// gulvplan/veggpunkt/sone er dev-tracere.
type DevMode = 'plan' | 'scene' | 'gulvplan' | 'sone' | 'veggpunkt'

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
    id: 'interior', label: '🛍 Interiør', img: INTERIOR_IMG, aspect: 1375 / 768,
    hint: 'Dra plagg fra paletten til de faste vareplassene. Høyreklikk = ta av.',
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
  const [devMode, setDevMode] = useState<DevMode>('scene')
  const [, setRev] = useState(0)
  const bump = () => setRev(r => r + 1)
  const scene = SCENES.find(s => s.id === sceneId)!
  // Bakt interiør: Interiør ER scenen. Uten dev alltid 'scene'; dev-tracere
  // (gulvplan/veggpunkt/sone) bak ?dev=1. ('plan' er parkert med fri møblering.)
  const mode: DevMode = IS_DEV_COORDS ? devMode : 'scene'
  const showSlots = IS_DEV_COORDS && mode === 'scene'

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
        {/* Bakt interiør: ingen Plan/Scene-veksling (Interiør = scenen). Dev-
            tracere bak ?dev=1; 🛍 Scene lar deg gå tilbake fra en tracer. */}
        {IS_DEV_COORDS && (
          <span style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
            {scene.id === 'interior' && (
              <>
                <button onClick={() => setDevMode('scene')} style={tabStyle(mode === 'scene')}>🛍 Scene</button>
                <button onClick={() => setDevMode('gulvplan')} style={tabStyle(mode === 'gulvplan')}>📐 Gulvplan</button>
                <button onClick={() => setDevMode('veggpunkt')} style={tabStyle(mode === 'veggpunkt')}>📌 Vareplass</button>
              </>
            )}
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

      {/* PARKERT: plantegning (fri møblering). PlanView holdes i live men rendres
          aldri (FRI_MOBLERING=false). */}
      {FRI_MOBLERING && mode === 'plan' && <PlanView />}
      {(
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
              {(mode === 'scene' || mode === 'sone') && (
                <FloorLayer interactive={mode === 'scene'} showSlots={showSlots} />
              )}
              {mode === 'gulvplan' && <GulvplanTracer bump={bump} />}
              {mode === 'veggpunkt' && <VeggpunktTracer bump={bump} />}
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
      )}

      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
        background: 'rgba(10,14,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
        padding: '0.4rem 1rem', color: '#cbd5e1', fontSize: 12, whiteSpace: 'nowrap',
      }}>{scene.id === 'interior' && mode === 'gulvplan'
        ? 'Gulvplan-tracer: dra de 4 hjørnene, juster front/bak-skala mot preview-dukkene, «Logg objekt».'
        : scene.id === 'interior' && mode === 'veggpunkt'
          ? 'Vareplass-tracer: velg type, klikk = ny plass, dra = flytt, ± = scale, «Logg array».'
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
  overrideSprite, onUndress, vendt }: {
  fixtureId: KlesbutikkFixtureId
  foot: Fotpunkt
  widthFrac: number
  showSlots: boolean
  opacity?: number
  vendt?: boolean
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
        width: `${widthFrac * 100}%`,
        // SPEILING: scaleX(-1) etter translate ⇒ hele boksen (møbel + plagg +
        // dukker, som er barn) speiles horisontalt om sitt eget senter, på plass.
        transform: `translate(-50%, -100%)${vendt ? ' scaleX(-1)' : ''}`,
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

// ── PLANTEGNING (ovenfra) — primær møbelplassering ───────────────────────────
// 2D-plan der møbler dras inn/flyttes som skjematiske toppikoner. Deler SAMME
// state (klesbutikkFixtureLayout) med perspektivscenen: fotpunkt utledes av
// plan-posisjonen (planToFoot) og omvendt (footToPlan), så endring ett sted
// synes begge steder. Ingen nye assets — alt tegnet med div-er.
function PlanView() {
  const { state, dispatch } = useGame()
  const g = KLESBUTIKK.gulvplan!
  const planRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(state.klesbutikkFixtureLayout)
  const itemsRef = useRef(items)
  const [drag, setDrag] = useState<{ kind: 'new'; fixtureId: KlesbutikkFixtureId } | { kind: 'move'; id: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  // Dev: fotavtrykk-kalibrator (velg møbeltype, ± på b/d, «Logg»). Muterer
  // fixtureDef(...).fotavtrykk direkte — endrer BÅDE plan-ikon og scene-bredde.
  const [calFix, setCalFix] = useState<KlesbutikkFixtureId>('stativ')
  const [, setCalRev] = useState(0)
  const calFa = () => fixtureDef(calFix)!.fotavtrykk
  const calNudge = (db: number, dd: number) => {
    const fa = calFa()
    fa.b = +clamp(fa.b + db, 1, 60).toFixed(1); fa.d = +clamp(fa.d + dd, 1, 60).toFixed(1)
    setCalRev(r => r + 1)
  }
  const calLog = () => console.log(`[Fotavtrykk] '${calFix}': { b: ${calFa().b}, d: ${calFa().d} },  ← lim inn i KLESBUTIKK_FIXTURES (klesbutikkFixtures.ts)`)

  const commit = (next: typeof items) => { itemsRef.current = next; setItems(next); dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: next }) }
  const planUV = (cx: number, cy: number) => {
    const r = planRef.current?.getBoundingClientRect(); if (!r) return null
    return { u: (cx - r.left) / r.width, v: 1 - (cy - r.top) / r.height, inside: cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom }
  }

  function startNew(fixtureId: KlesbutikkFixtureId, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ kind: 'new', fixtureId }); setGhost({ x: e.clientX, y: e.clientY })
    const onMove = (ev: PointerEvent) => setGhost({ x: ev.clientX, y: ev.clientY })
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      setDrag(null); setGhost(null)
      const pp = planUV(ev.clientX, ev.clientY); if (!pp || !pp.inside) return
      commit([...itemsRef.current, { id: uid(), fixtureId, fotpunkt: planToFoot(g, pp.u, pp.v) }])
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const x0 = e.clientX, y0 = e.clientY; let moved = false
    setDrag({ kind: 'move', id })
    const onMove = (ev: PointerEvent) => {
      if (!moved && Math.abs(ev.clientX - x0) < 4 && Math.abs(ev.clientY - y0) < 4) return
      moved = true
      const pp = planUV(ev.clientX, ev.clientY); if (!pp) return
      const next = itemsRef.current.map(i => i.id === id ? { ...i, fotpunkt: planToFoot(g, pp.u, pp.v) } : i)
      itemsRef.current = next; setItems(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true)
      setDrag(null)
      if (moved) dispatch({ type: 'SET_KLESBUTIKK_FIXTURES', items: itemsRef.current })
      else commit(itemsRef.current.map(i => i.id === id ? { ...i, vendt: !i.vendt } : i)) // klikk uten dra = speil ↔
    }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const remove = (id: string) => commit(itemsRef.current.filter(i => i.id !== id))

  return (
    <div style={{ position: 'relative', aspectRatio: '1.35', width: 'min(94vw, calc(82vh * 1.35))', height: 'auto' }}>
      {/* Plan-gulv (skjematisk) */}
      <div ref={planRef} style={{
        position: 'absolute', inset: 0, borderRadius: 8, overflow: 'hidden', touchAction: 'none',
        background: 'repeating-linear-gradient(90deg, #3a2c1e, #3a2c1e 5.5%, #423523 5.5%, #423523 11%)',
        border: '2px solid #5a4632', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        {/* Bakvegg (topp) — utstillingsveggen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '7%', background: '#4a5568', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2e8f0', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', pointerEvents: 'none' }}>◄ BAKVEGG · utstilling ►</div>
        {/* Vindu + dør på venstre vegg */}
        <div style={{ position: 'absolute', left: 0, top: '22%', width: '2.5%', height: '38%', background: 'rgba(125,211,252,0.55)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '3.5%', top: '38%', color: '#7dd3fc', fontSize: 10, pointerEvents: 'none' }}>vindu</div>
        <div style={{ position: 'absolute', left: 0, top: '68%', width: '2.5%', height: '13%', background: 'rgba(201,138,60,0.7)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '3.5%', top: '71%', color: '#c98a3c', fontSize: 10, pointerEvents: 'none' }}>dør</div>
        {/* Front (bunn) */}
        <div style={{ position: 'absolute', bottom: 3, left: 0, right: 0, textAlign: 'center', color: '#94a3b8', fontSize: 10, pointerEvents: 'none' }}>front (mot kunde / kamera)</div>

        {/* Møbel-toppikoner — størrelsen = møbelets fotavtrykk (samme kilde som
            scene-bredden), så plan og scene er proporsjonale. */}
        {items.map(it => {
          const ic = PLAN_ICON[it.fixtureId]; const def = fixtureDef(it.fixtureId); if (!ic || !def) return null
          const { px, py } = footToPlan(g, it.fotpunkt)
          const moving = drag?.kind === 'move' && drag.id === it.id
          return (
            <div key={it.id}
              onPointerDown={e => startMove(it.id, e)}
              onContextMenu={e => { e.preventDefault(); remove(it.id) }}
              title={`${def.navn} — dra = flytt · klikk = speil (↔) · høyreklikk = fjern`}
              style={{
                position: 'absolute', left: `${px}%`, top: `${py}%`, width: `${def.fotavtrykk.b}%`, height: `${def.fotavtrykk.d}%`,
                transform: `translate(-50%, -50%)${it.vendt ? ' scaleX(-1)' : ''}`, background: ic.color,
                border: it.vendt ? '1px solid #38bdf8' : '1px solid rgba(0,0,0,0.55)',
                borderRadius: ic.round ? '50% / 45%' : 3, cursor: moving ? 'grabbing' : 'grab', touchAction: 'none',
                boxShadow: moving ? '0 0 8px rgba(255,255,255,0.6)' : it.vendt ? '0 0 6px rgba(56,189,248,0.7)' : '0 1px 3px rgba(0,0,0,0.4)',
              }}>
              {/* Navnelapp — scaleX(-1) på nytt så teksten leses riktig når møbelet er vendt */}
              <span style={{ position: 'absolute', left: '50%', top: '108%', transform: `translateX(-50%)${it.vendt ? ' scaleX(-1)' : ''}`, fontSize: 9, fontWeight: 700, color: '#e8ddc8', whiteSpace: 'nowrap', textShadow: '0 1px 2px #000', pointerEvents: 'none' }}>{def.navn}{it.vendt ? ' ↔' : ''}</span>
            </div>
          )
        })}
      </div>

      {/* Møbel-palett (portal) */}
      {createPortal(
        <div style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 158, maxHeight: '76vh', overflowY: 'auto',
          background: 'rgba(10,14,26,0.94)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '10px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>🪑 Møbler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {KLESBUTIKK_FIXTURES.map(def => (
              <div key={def.id} onPointerDown={e => startNew(def.id, e)} title={`${def.navn} — dra inn på planen`}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '5px 7px', cursor: 'grab', userSelect: 'none', touchAction: 'none' }}>
                <div style={{ width: 30, height: 30, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={def.sprite} alt="" draggable={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.15 }}>{def.navn}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 8, lineHeight: 1.4 }}>
            Dra inn på planen · klikk et møbel = speil (↔). Bytt til 🛍 Scene for å style med plagg/dukker.
          </div>
        </div>, document.body)}

      {/* Fotavtrykk-kalibrator (?dev=1) — venstre side, kolliderer ikke med paletten */}
      {IS_DEV_COORDS && createPortal(
        <div style={{
          position: 'fixed', top: 56, left: 16, zIndex: 95, width: 190,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #d16aa855', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#d16aa8', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📐 Fotavtrykk</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Velg møbel, juster bredde (b) / dybde (d). Endrer plan-ikon OG scene-bredde samtidig.
          </div>
          <select value={calFix} onChange={e => setCalFix(e.target.value as KlesbutikkFixtureId)} style={{
            width: '100%', marginBottom: 8, background: 'rgba(255,255,255,0.06)', color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7, padding: '4px 6px', fontSize: 11, fontFamily: "'Outfit', sans-serif",
          }}>
            {KLESBUTIKK_FIXTURES.map(f => <option key={f.id} value={f.id}>{f.navn}</option>)}
          </select>
          {([['b', 'bredde'], ['d', 'dybde']] as const).map(([k, lbl]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>{lbl} ({k})</span>
              <button style={miniBtn} onClick={() => calNudge(k === 'b' ? -0.5 : 0, k === 'd' ? -0.5 : 0)}>−</button>
              <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 34, textAlign: 'center' }}>{calFa()[k].toFixed(1)}</span>
              <button style={miniBtn} onClick={() => calNudge(k === 'b' ? 0.5 : 0, k === 'd' ? 0.5 : 0)}>+</button>
            </div>
          ))}
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800, marginTop: 4 }} onClick={calLog}>Logg → konsoll</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Plasser samme møbel og se plan/scene proporsjonalt. Lim tallet inn i klesbutikkFixtures.ts.
          </div>
        </div>, document.body)}

      {/* Palett-drag-spøkelse */}
      {drag?.kind === 'new' && ghost && (() => {
        const def = fixtureDef(drag.fixtureId); if (!def) return null
        return createPortal(
          <img src={def.sprite} alt="" draggable={false} style={{ position: 'fixed', left: ghost.x, top: ghost.y, width: 46, transform: 'translate(-50%, -50%)', zIndex: 9999, pointerEvents: 'none', opacity: 0.8 }} />,
          document.body)
      })()}
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

  // Vegghengpunkter (DEL 3): faste opphengspunkter på veggen. plassId = punkt-id
  // (uten ':', så de skilles fra møbel-slots «itemId:slot»).
  const veggpunkter = KLESBUTIKK.vegghengpunkter ?? []
  const veggIds = new Set(veggpunkter.map(v => v.id))
  const plaggByVegg: Record<string, KlesbutikkPlaggItem> = {}
  // itemId → { slotIndex → plaggItem }  (veggpunkt-plagg holdes utenfor)
  const itemByFurniture: Record<string, Record<number, KlesbutikkPlaggItem>> = {}
  for (const pi of plaggItems) {
    if (veggIds.has(pi.plassId)) { plaggByVegg[pi.plassId] = pi; continue }
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
  const removeWallPlagg = (vid: string) => commitPlagg(plaggRef.current.filter(pi => pi.plassId !== vid))

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
      {/* PARKERT (fri møblering): gulv-trapes-overlay var en møbel-plasserings-
          hjelp. I bakt interiør styles faste vareplasser, så det tegnes ikke. */}
      {FRI_MOBLERING && interactive && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`}
            fill="rgba(125,211,252,0.05)" stroke="rgba(125,211,252,0.32)" strokeWidth={0.3} />
        </svg>
      )}

      {/* PARKERT (fri møblering): plasserte møbler i scenen. Møblene er nå BAKT
          inn i scenebildet — elevene styler faste vareplasser i stedet. */}
      {FRI_MOBLERING && sorted.map(it => {
        const def = fixtureDef(it.fixtureId); if (!def) return null
        const w = sceneWidthFrac(g, it.fixtureId, it.fotpunkt)
        // DUKKE-BYTTE: er dukka kledd på (antrekk-slot 0 opptatt av en påkledd
        // dukke)? → erstatt naken dukke-sprite med den påkledde.
        const isDukke = DUKKE_TYPER.includes(it.fixtureId)
        const dressed = isDukke ? itemByFurniture[it.id]?.[0] : undefined
        const overrideSprite = dressed ? dukkeById(dressed.plaggId)?.sprite : undefined
        return (
          <FurnitureSprite key={it.id} fixtureId={it.fixtureId} itemId={it.id} foot={it.fotpunkt} widthFrac={w}
            showSlots={showSlots} vendt={it.vendt}
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

      {/* VEGGHENGPUNKTER (DEL 3): faste opphengspunkter på veggen. Slot-anker
          (data-plass) alltid i DOM for snap-deteksjon; heng-plagg (front-variant)
          snappes rett på et ledig punkt. Usynlig i spillet når tomt — plagget
          dekker opphenget. Høyreklikk på plagg = fjern. */}
      {veggpunkter.map(vp => {
        const item = plaggByVegg[vp.id]
        const plagg = item ? plaggById(item.plaggId) : undefined
        const free = !plagg
        const sprite = plagg ? spriteFor(plagg, 'heng', 'front') : undefined
        const compat = dragPlagg?.type === 'heng' && !dragPlagg.fixtureFilter && free
        const isTarget = targetPlassId === vp.id
        return (
          <div key={vp.id}>
            {/* Snap-anker */}
            <div data-plass={vp.id} data-type="heng" data-fixture="vegg" data-free={free ? '1' : '0'}
              style={{ position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, width: 1, height: 1, pointerEvents: 'none' }} />
            {/* Snappet plagg (front-variant), hengende fra punktet */}
            {sprite && (
              <img src={sprite} alt={plagg!.navn} draggable={false}
                onContextMenu={interactive ? (e => { e.preventDefault(); e.stopPropagation(); removeWallPlagg(vp.id) }) : undefined}
                title={interactive ? `${plagg!.navn} — høyreklikk for å fjerne` : plagg!.navn}
                style={{
                  position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, width: `${vp.scale * 100}%`, height: 'auto',
                  transform: 'translate(-50%, -6%)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                  pointerEvents: interactive ? 'auto' : 'none', cursor: interactive ? 'context-menu' : 'default', touchAction: 'none',
                  zIndex: Math.round(vp.y * 10),
                }} />
            )}
            {/* Highlight ledig kompatibelt punkt under heng-drag */}
            {compat && (
              <div style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`,
                width: isTarget ? 18 : 12, height: isTarget ? 18 : 12, transform: 'translate(-50%, -50%)',
                borderRadius: '50%', border: `2px solid ${isTarget ? '#22e6a4' : '#7dd3fc'}`,
                background: isTarget ? 'rgba(34,230,164,0.35)' : 'rgba(125,211,252,0.15)',
                boxShadow: isTarget ? '0 0 10px rgba(34,230,164,0.7)' : 'none', pointerEvents: 'none',
              }} />
            )}
            {/* Dev-markør */}
            {showSlots && free && (
              <div title={`veggpunkt ${vp.id}`} style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`,
                width: 9, height: 9, transform: 'translate(-50%, -50%)', borderRadius: '50%',
                border: '1.5px solid #f472b6', background: 'rgba(244,114,182,0.3)', pointerEvents: 'none',
              }} />
            )}
          </div>
        )
      })}

      {/* PARKERT (fri møblering): preview under møbel-palett-drag */}
      {FRI_MOBLERING && newType && ghostFoot && (() => {
        const def = fixtureDef(newType); if (!def) return null
        return <FurnitureSprite fixtureId={newType} foot={ghostFoot}
          widthFrac={sceneWidthFrac(g, newType, ghostFoot)} showSlots={false} opacity={0.6} />
      })()}

      {/* PARKERT (fri møblering): møbel-paletten. Møbler er bakt inn i scenen. */}
      {FRI_MOBLERING && interactive && createPortal(
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
  const front = quadPoint(g, 0.5, 0), back = quadPoint(g, 0.5, 1)

  return (
    <>
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, zIndex: 45, touchAction: 'none' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`}
            fill="rgba(255,210,74,0.08)" stroke="#ffd24a" strokeWidth={0.4} />
        </svg>

        {/* Front/bak-skala-preview (dukke) — bredde via fotavtrykk × trapesbredde */}
        <FurnitureSprite fixtureId="dukke" foot={front} widthFrac={sceneWidthFrac(g, 'dukke', front)} showSlots={false} opacity={0.85} />
        <FurnitureSprite fixtureId="dukke" foot={back} widthFrac={sceneWidthFrac(g, 'dukke', back)} showSlots={false} opacity={0.85} />

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

// ── Veggpunkt-tracer (?dev=1) — kalibrer vegghengpunktene, mutér-og-logg ──────
// Klikk på tom vegg = nytt punkt · dra et punkt = flytt · velg + ± = skalér ·
// høyreklikk = fjern · «Logg array» → konsoll. Muterer KLESBUTIKK.vegghengpunkter
// (samme array) direkte, som gulvplan-/sone-tracerne. En preview-plagg vises på
// hvert punkt så størrelsen kan vurderes mot faktisk innhold.
function VeggpunktTracer({ bump }: { bump: () => void }) {
  const pts = (KLESBUTIKK.vegghengpunkter ??= [])
  const overlayRef = useRef<HTMLDivElement>(null)
  const [sel, setSel] = useState<string | null>(pts[0]?.id ?? null)
  const previewSprite = plaggById('trenchcoat')?.spriteHengFront ?? KLESBUTIKK_PLAGG.find(p => p.spriteHengFront)?.spriteHengFront

  const pctAt = (ev: PointerEvent | React.PointerEvent) => {
    const r = overlayRef.current?.getBoundingClientRect(); if (!r) return null
    return { x: +clamp(((ev.clientX - r.left) / r.width) * 100, 0, 100).toFixed(1), y: +clamp(((ev.clientY - r.top) / r.height) * 100, 0, 100).toFixed(1) }
  }
  function addPoint(e: React.PointerEvent) {
    const p = pctAt(e); if (!p) return
    const vp: Vegghengpunkt = { id: `vh-${uid().slice(0, 4)}`, x: p.x, y: p.y, scale: 0.05 }
    pts.push(vp); setSel(vp.id); bump()
  }
  function startMove(id: string, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation(); setSel(id)
    const onMove = (ev: PointerEvent) => { const p = pctAt(ev); const vp = pts.find(v => v.id === id); if (p && vp) { vp.x = p.x; vp.y = p.y; bump() } }
    const onUp = () => { window.removeEventListener('pointermove', onMove, true); window.removeEventListener('pointerup', onUp, true) }
    window.addEventListener('pointermove', onMove, true); window.addEventListener('pointerup', onUp, true)
  }
  const scaleSel = (d: number) => { const vp = pts.find(v => v.id === sel); if (vp) { vp.scale = +clamp(vp.scale + d, 0.01, 0.4).toFixed(3); bump() } }
  const removePoint = (id: string) => { const i = pts.findIndex(v => v.id === id); if (i >= 0) { pts.splice(i, 1); if (sel === id) setSel(pts[0]?.id ?? null); bump() } }
  const log = () => console.log(`[VeggpunktTracer] lim inn i KLESBUTIKK (industryDefinition.ts):\n  vegghengpunkter: [\n${pts.map(v => `    { id: '${v.id}', x: ${v.x}, y: ${v.y}, scale: ${v.scale} },`).join('\n')}\n  ],`)

  return (
    <>
      <div ref={overlayRef} onPointerDown={addPoint} style={{ position: 'absolute', inset: 0, zIndex: 45, touchAction: 'none', cursor: 'crosshair' }}>
        {pts.map(vp => (
          <div key={vp.id}>
            {previewSprite && (
              <img src={previewSprite} alt="" draggable={false} style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, width: `${vp.scale * 100}%`, height: 'auto',
                transform: 'translate(-50%, -6%)', opacity: 0.55, pointerEvents: 'none',
              }} />
            )}
            <div onPointerDown={e => startMove(vp.id, e)} onContextMenu={e => { e.preventDefault(); removePoint(vp.id) }}
              title={`${vp.id} — dra = flytt, høyreklikk = fjern`} style={{
                position: 'absolute', left: `${vp.x}%`, top: `${vp.y}%`, transform: 'translate(-50%, -50%)',
                width: 15, height: 15, borderRadius: '50%', cursor: 'grab',
                border: `2px solid ${sel === vp.id ? '#22e6a4' : '#f472b6'}`,
                background: sel === vp.id ? 'rgba(34,230,164,0.4)' : 'rgba(244,114,182,0.35)',
              }}>
              {/* id + (for valgt punkt) scale-tallet, rett ved punktet */}
              <span style={{ position: 'absolute', left: 17, top: -2, fontSize: 9, fontFamily: 'monospace', color: sel === vp.id ? '#6ee7b7' : '#f9a8d4', background: 'rgba(0,0,0,0.6)', padding: '0 3px', whiteSpace: 'nowrap' }}>{vp.id}{sel === vp.id ? ` · ${vp.scale.toFixed(3)}` : ''}</span>
            </div>
          </div>
        ))}
      </div>

      {createPortal(
        <div onPointerDown={e => e.stopPropagation()} style={{
          position: 'fixed', top: 56, right: 16, zIndex: 95, width: 210,
          background: 'rgba(10,14,26,0.95)', border: '1px solid #f472b655', borderRadius: 12, padding: '10px 12px', fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ color: '#f472b6', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>📌 Veggpunkt-tracer</div>
          <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4, marginBottom: 8 }}>
            Klikk på veggen = nytt punkt · dra = flytt · høyreklikk = fjern. Preview-plagget viser størrelsen.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ color: '#94a3b8', fontSize: 11, flex: 1 }}>skala {sel ?? '—'}</span>
            <button style={miniBtn} onClick={() => scaleSel(-0.005)} disabled={!sel}>−</button>
            <span style={{ color: '#f1f5f9', fontSize: 11, fontFamily: 'monospace', minWidth: 40, textAlign: 'center' }}>{(pts.find(v => v.id === sel)?.scale ?? 0).toFixed(3)}</span>
            <button style={miniBtn} onClick={() => scaleSel(0.005)} disabled={!sel}>+</button>
          </div>
          <div style={{ color: '#64748b', fontSize: 10, marginBottom: 8 }}>{pts.length} punkt(er)</div>
          <button style={{ ...miniBtn, width: '100%', height: 26, fontSize: 11, fontWeight: 800 }} onClick={log}>Logg array → konsoll</button>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
            Lim den loggede arrayen inn i KLESBUTIKK.vegghengpunkter (industryDefinition.ts).
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
