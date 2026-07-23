import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useGame } from '../GameContext'
import { STOREFRONT_HOTSPOTS, INTERIOR_DISK_DISPLAY } from '../../data/districts'
import type { Product, WindowDisplayItem, FixtureId } from '../types'
import { FACADE_IMG } from './StorefrontView'
import type { Hyllelinje } from '../geometry/hyllelinje'
import { snapToLine, pointAlong } from '../geometry/hyllelinje'
import { IS_DEV_COORDS } from './DevCoordHelper'

// ── VAREEKSPONERING — fri drag-and-drop (ren React/DOM) ──────────────────────
//
// Samme motor på TO flater (fixtures): 'vindu' (fasadens vindusutstilling) og
// 'monter' (disk-monteren i interiøret). Eleven drar produkter fritt inn på
// flaten fra dashbordets Utstilling-fane. Redigeringslerretet rendres FRONTALT
// — et oppskalert utsnitt av flatens sone fra kildebildet — så eleven ser
// nøyaktig det kunden ser.
//
// Datamodellen (WindowDisplayItem) lagrer x/y som BRØK (0–1) av FLATENS sone og
// en fixtureId, så samme state-liste rommer begge flatene og rendres korrekt
// både i editoren og i scenen (StorefrontView / InteriorView) i en annen skala.

// Speil av InteriorView sin bildebane (literal her for å unngå sirkulær import).
const INTERIOR_IMG = '/assets/raw/interior-cafe.png'

/** Lik skala på alle elementer (ingen resize). Kortbredde = brøk av sonens
 *  bredde, per flate (monteren er bred og lav ⇒ mindre kort). */
const VINDU_CARD_W_FRAC = 0.24
export const MONTER_CARD_W_FRAC = 0.14

// ── HYLLELINJER (vindu) — perspektiv-dybdelinjer på rominterngulvet ───────────
// Espens dom: fri plassering ga varer «ute av proporsjoner» (alle samme størrelse
// uansett dybde i det perspektiviske rommet). En vare snapper nå til nærmeste
// dybdelinje og skaleres etter linjens interpolerte varebredde (bak = mindre).
//
// ⚠️ FØRSTEPASS — IKKE LÅST. Verdiene under er en skjermbilde-basert førstepasning
// (tre dybdelinjer på gulvet: bak/midt/front). Espen finpusser + LÅSER dem via
// ?dev=1-traceren (📋 Kopier hyllelinjer) — se docs/rapporter/spor-a.md. Endres
// disse til [] faller vinduet tilbake til gammel fri plassering (ingen regresjon).
// Koordinater i PROSENT (0–100) av flatens sone — som hyllelinje-modulen krever.
// varebredde-skalaen (scale1/scale2) er en BRØK (0–1) av flatebredden.
const VINDU_HYLLELINJER: Hyllelinje[] = [
  { id: 'bak',   x1: 31, y1: 60, x2: 69, y2: 60, scale1: 0.12, scale2: 0.12 },
  { id: 'midt',  x1: 22, y1: 72, x2: 78, y2: 72, scale1: 0.17, scale2: 0.17 },
  { id: 'front', x1: 14, y1: 84, x2: 86, y2: 84, scale1: 0.23, scale2: 0.23 },
]

interface FixtureConfig {
  id: FixtureId
  icon: string
  title: string
  blurb: string
  emptyText: string
  /** Sone [x, y, b, h] i prosent av kildebildet. */
  zone: readonly [number, number, number, number]
  /** Kildebilde å utsnittsforstørre som redigeringsbakgrunn. */
  image: string
  /** Kildebildets native bredde/høyde — for korrekt utsnitt-proporsjon. */
  imageAspect: number
  cardWFrac: number
  /** Dybdelinjer varer snapper til (perspektiv-skala). Tom/utelatt = fri plassering. */
  hyllelinjer?: Hyllelinje[]
}

const VINDU_FIXTURE: FixtureConfig = {
  id: 'vindu', icon: '🪟', title: 'Vindusutstilling',
  blurb: 'Dra produkter inn i vinduet — de legger seg på nærmeste hylle og skaleres etter dybden (bak = mindre), slik kundene ser det fra fortauet.',
  emptyText: 'Tomt vindu — dra produkter hit fra paletten under',
  zone: STOREFRONT_HOTSPOTS.vindu, image: FACADE_IMG, imageAspect: 1024 / 1280,
  cardWFrac: VINDU_CARD_W_FRAC,
  hyllelinjer: VINDU_HYLLELINJER,
}

/** Surface-aspect (høyde/bredde) for isotrop avstandsmåling i hyllelinje-projeksjonen. */
function surfaceAspectHB(fixture: FixtureConfig): number {
  const [, , zw, zh] = fixture.zone
  const wOverH = (zw / zh) * fixture.imageAspect   // bredde/høyde
  return 1 / wOverH
}

/** Effektiv varebredde-brøk for et plassert element: lagret linjeskala, ellers
 *  (best-effort migrering) skalaen fra nærmeste hyllelinje ved elementets punkt,
 *  ellers den gamle faste cardWFrac (fixtur uten linjer / fri plassering). */
function effektivBredde(it: WindowDisplayItem, fixture: FixtureConfig, cardWFrac: number): number {
  if (typeof it.scale === 'number') return it.scale
  const linjer = fixture.hyllelinjer
  if (linjer && linjer.length > 0) {
    // Item x/y er BRØK (0–1); modulen jobber i PROSENT (0–100).
    const snap = snapToLine(it.x * 100, it.y * 100, linjer, 999, surfaceAspectHB(fixture))
    if (snap) return snap.scale
  }
  return cardWFrac
}

/** Snapp en slippposisjon (brøk 0–1) til nærmeste hyllelinje. Returnerer nytt
 *  senterpunkt (brøk) + linjens interpolerte varebredde-skala, eller null om
 *  fixturen ikke har linjer (⇒ behold fri plassering). */
function snappTilLinje(fx: number, fy: number, fixture: FixtureConfig): { x: number; y: number; scale: number } | null {
  const linjer = fixture.hyllelinjer
  if (!linjer || linjer.length === 0) return null
  const snap = snapToLine(fx * 100, fy * 100, linjer, 999, surfaceAspectHB(fixture))
  return snap ? { x: snap.x / 100, y: snap.y / 100, scale: snap.scale } : null
}

// PARKERT: den frie disk-monteren. Disk-vareeksponering er flyttet til den
// frontale MonterScene (trau-mekanikk). Konfigen beholdes (eksportert) for
// gjenbruk og er ikke lenger en fane i dashbordet. (Bevisst parkert eksport —
// derav unntak fra react-refresh-regelen.)
// eslint-disable-next-line react-refresh/only-export-components
export const MONTER_FIXTURE: FixtureConfig = {
  id: 'monter', icon: '🧁', title: 'Disk-monter',
  blurb: 'Dra produkter ut på disken og plasser dem fritt. Lavere på disken = nærmere kunden (foran).',
  emptyText: 'Tom disk — dra produkter hit fra paletten under',
  zone: INTERIOR_DISK_DISPLAY, image: INTERIOR_IMG, imageAspect: 16 / 9,
  cardWFrac: MONTER_CARD_W_FRAC,
}

const FIXTURE_BY_ID: Record<FixtureId, FixtureConfig> = { vindu: VINDU_FIXTURE, monter: MONTER_FIXTURE }

/** Lagrekkefølge avledet av y: lavere på flaten (høyere y) = nærmere
 *  betrakteren = foran = høyere z. Persisteres for stabil opptegning. */
function computeZ(y: number): number {
  return Math.round(y * 1000)
}

/** Deterministisk fargetone (0–359) fra produkt-id — gir hvert produkt et
 *  stabilt, gjenkjennelig placeholder-kort uten NB-bilder. */
function productHue(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 360
}

// ── Kort (delt visuell mellom editor og scene) ────────────────────────────────
// Skrift skaleres med kortbredden via container-query-enheter (cqw), så samme
// komponent ser riktig ut i både stor editor og liten scene-flate. Bruker
// varens EKTE utklipp (samme sprite som trau-paletten i MonterScene) når
// tilgjengelig; faller tilbake til fargekort+emoji kun ved manglende/feilet
// sprite. Sprite-feil holdes LOKALT (egen useState) så komponenten er
// selvstendig uansett hvilken scene den brukes i (editor/StorefrontView).

function CardVisual({ product }: { product: Product }) {
  const [spriteFailed, setSpriteFailed] = useState(false)
  const useSprite = !!product.sprite && !spriteFailed
  if (useSprite) {
    return (
      <img
        src={product.sprite} alt={product.name} draggable={false}
        onError={() => setSpriteFailed(true)}
        style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
      />
    )
  }
  const hue = productHue(product.id)
  return (
    <div style={{
      width: '100%',
      background: `linear-gradient(160deg, hsl(${hue} 64% 52%), hsl(${hue} 56% 36%))`,
      border: '1px solid rgba(0,0,0,0.3)',
      borderRadius: '7cqw',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
      padding: '9cqw 5cqw 8cqw',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2cqw',
      textAlign: 'center', boxSizing: 'border-box',
    }}>
      <div style={{ fontSize: '40cqw', lineHeight: 1 }}>{product.icon}</div>
      <div style={{
        fontSize: '15cqw', fontWeight: 800, color: '#fff', lineHeight: 1.1,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)', wordBreak: 'break-word',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {product.name}
      </div>
    </div>
  )
}

// ── Read-only lag — brukes i scenen (StorefrontView / InteriorView) ───────────
// Filtrerer til ÉN flate (default 'vindu' så StorefrontView-bruken er uendret).
// Forutsetter en forelder med position:relative satt til flatens sone.

export function WindowDisplayLayer({ items, products, fixtureId = 'vindu', cardWFrac = VINDU_CARD_W_FRAC }: {
  items: WindowDisplayItem[]
  products: Product[]
  fixtureId?: FixtureId
  cardWFrac?: number
}) {
  const fixture = FIXTURE_BY_ID[fixtureId]
  const sorted = items.filter(i => i.fixtureId === fixtureId).sort((a, b) => a.z - b.z)
  return (
    <>
      {sorted.map(it => {
        const p = products.find(pr => pr.id === it.productId)
        if (!p) return null   // produkt fjernet fra sortimentet ⇒ hopp over
        return (
          <div
            key={it.productId}
            style={{
              position: 'absolute',
              left: `${it.x * 100}%`, top: `${it.y * 100}%`,
              width: `${effektivBredde(it, fixture, cardWFrac) * 100}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: it.z, containerType: 'inline-size',
              pointerEvents: 'none',
            }}
          >
            <CardVisual product={p} />
          </div>
        )
      })}
    </>
  )
}

// ── HYLLELINJE-TRACER (?dev=1) — Espen kalibrerer + LÅSER dybdelinjene ────────
// Rendres over editorflaten når IS_DEV_COORDS. Dra endepunktene, juster skala pr.
// linje med ±, og 📋 Kopier hyllelinjer → limes inn i VINDU_HYLLELINJER over (og
// låses). Preview-bokser langs hver linje viser den interpolerte varebredden.
const clampScale = (n: number) => Math.max(0.02, Math.min(0.6, Math.round(n * 1000) / 1000))
const r1p = (n: number) => Math.round(n * 10) / 10

function HyllelinjeTracer({ fixture, surfaceRef }: { fixture: FixtureConfig; surfaceRef: React.RefObject<HTMLDivElement | null> }) {
  const [linjer, setLinjer] = useState<Hyllelinje[]>(() => (fixture.hyllelinjer ?? []).map(l => ({ ...l })))
  const [kopiert, setKopiert] = useState(false)

  function dragEnd(idx: number, which: 1 | 2, e: React.PointerEvent) {
    e.preventDefault(); e.stopPropagation()
    const move = (ev: PointerEvent) => {
      const rect = surfaceRef.current?.getBoundingClientRect(); if (!rect) return
      const px = r1p(Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100)))
      const py = r1p(Math.max(0, Math.min(100, ((ev.clientY - rect.top) / rect.height) * 100)))
      setLinjer(ls => ls.map((l, i) => i !== idx ? l : which === 1 ? { ...l, x1: px, y1: py } : { ...l, x2: px, y2: py }))
    }
    const up = () => { window.removeEventListener('pointermove', move, true); window.removeEventListener('pointerup', up, true) }
    window.addEventListener('pointermove', move, true); window.addEventListener('pointerup', up, true)
  }
  function skaler(idx: number, d: number) {
    setLinjer(ls => ls.map((l, i) => i !== idx ? l : { ...l, scale1: clampScale(l.scale1 + d), scale2: clampScale(l.scale2 + d) }))
  }
  function kopier() {
    const txt = linjer.map(l => `  { id: '${l.id}', x1: ${l.x1}, y1: ${l.y1}, x2: ${l.x2}, y2: ${l.y2}, scale1: ${l.scale1}, scale2: ${l.scale2} },`).join('\n')
    const full = `const VINDU_HYLLELINJER: Hyllelinje[] = [\n${txt}\n]`
    navigator.clipboard?.writeText(full).catch(() => { /* ignore */ })
    // eslint-disable-next-line no-console
    console.log('[HYLLELINJER]\n' + full)
    setKopiert(true); window.setTimeout(() => setKopiert(false), 1600)
  }
  const handle = (idx: number, which: 1 | 2, x: number, y: number) => (
    <div
      key={`${idx}-${which}`}
      onPointerDown={e => dragEnd(idx, which, e)}
      title={`Linje «${linjer[idx]!.id}» — endepunkt ${which}`}
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)',
        width: 16, height: 16, borderRadius: 99, background: '#f472b6', border: '2px solid #fff',
        cursor: 'grab', zIndex: 60, touchAction: 'none', boxShadow: '0 0 0 1px rgba(0,0,0,0.5)',
      }}
    />
  )
  return (
    <>
      {/* Linjer + preview-bokser (perspektiv-skala) */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 55 }}>
        {linjer.map(l => (
          <line key={l.id} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#f472b6" strokeWidth={0.5} strokeDasharray="1.5 1" />
        ))}
      </svg>
      {linjer.flatMap((l) => [0, 0.5, 1].map(t => {
        const pt = pointAlong(l, t)
        return (
          <div key={`${l.id}-prev-${t}`} style={{
            position: 'absolute', left: `${pt.x}%`, top: `${pt.y}%`, width: `${pt.scale * 100}%`,
            aspectRatio: '3 / 4', transform: 'translate(-50%,-50%)', zIndex: 54, pointerEvents: 'none',
            background: 'rgba(244,114,182,0.18)', border: '1px solid rgba(244,114,182,0.6)', borderRadius: 3,
          }} />
        )
      }))}
      {linjer.flatMap((l, i) => [handle(i, 1, l.x1, l.y1), handle(i, 2, l.x2, l.y2)])}

      {/* Kontrollpanel (skala pr. linje + Kopier) */}
      <div style={{
        position: 'absolute', top: 6, left: 6, zIndex: 61, display: 'flex', flexDirection: 'column', gap: 4,
        background: 'rgba(10,14,26,0.9)', border: '1px solid rgba(244,114,182,0.5)', borderRadius: 8, padding: '6px 8px',
        fontFamily: 'monospace', fontSize: 11, color: '#f1f5f9',
      }}>
        <div style={{ fontWeight: 800, color: '#f9a8d4', fontSize: 10 }}>HYLLELINJER (dev)</div>
        {linjer.map((l, i) => (
          <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ minWidth: 34 }}>{l.id}</span>
            <button onClick={() => skaler(i, -0.005)} style={devBtn}>−</button>
            <span style={{ minWidth: 40, textAlign: 'center' }}>{l.scale1.toFixed(3)}</span>
            <button onClick={() => skaler(i, +0.005)} style={devBtn}>+</button>
          </div>
        ))}
        <button onClick={kopier} style={{ ...devBtn, background: kopiert ? '#16a34a' : 'rgba(244,114,182,0.25)', padding: '3px 8px' }}>
          {kopiert ? '✓ Kopiert (+ console)' : '📋 Kopier hyllelinjer'}
        </button>
      </div>
    </>
  )
}
const devBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4,
  color: '#f1f5f9', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', padding: '1px 6px',
}

// ── Editor for ÉN flate — fri plassering, fra dashbordet ──────────────────────

/** Én rad i palett-lista — FØRTE varer (bestilt i Produkter-fanen), ekte
 *  utklipp (samme sprite som trau-paletten i MonterScene), fallback til
 *  fargekort+emoji kun ved manglende/feilet sprite. Sprite-feil holdes lokalt,
 *  samme mønster som CardVisual. */
function PaletteRow({ item, placed, onStart }: {
  item: Product
  placed: boolean
  onStart: (e: React.PointerEvent) => void
}) {
  const [spriteFailed, setSpriteFailed] = useState(false)
  const useSprite = !!item.sprite && !spriteFailed
  const hue = productHue(item.id)
  return (
    <div
      onPointerDown={placed ? undefined : onStart}
      title={placed ? `${item.name} — allerede plassert` : `${item.name} — dra inn på flaten`}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: placed ? 'rgba(255,255,255,0.03)' : `linear-gradient(160deg, hsl(${hue} 50% 28%), hsl(${hue} 45% 20%))`,
        border: `1px solid ${placed ? 'rgba(255,255,255,0.08)' : `hsl(${hue} 50% 40%)`}`,
        borderRadius: 10, padding: '0.55rem 0.7rem',
        cursor: placed ? 'default' : 'grab',
        opacity: placed ? 0.5 : 1, userSelect: 'none', touchAction: 'none',
      }}
    >
      <div style={{ width: 28, height: 28, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {useSprite
          ? <img src={item.sprite} alt="" draggable={false} onError={() => setSpriteFailed(true)} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          : <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>}
      </div>
      <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
        {item.name}
      </span>
      {placed && <span style={{ fontSize: 14, color: '#00d4aa' }}>✓</span>}
    </div>
  )
}

function FixtureEditor({ fixture }: { fixture: FixtureConfig }) {
  const { state, dispatch } = useGame()
  const surfaceRef = useRef<HTMLDivElement>(null)
  const cardWFrac = fixture.cardWFrac
  // FØRTE varer (bestilt i Produkter-fanen), IKKE hele katalogen
  // (docs/INNKJOP_LEVERING.md). Ingen windowDisplay-filter: drikke (kaffe o.l.)
  // er fin styling i et vindu, selv om feltet historisk gated trau-egnethet.
  const carried = state.products

  // Arbeidskopi for DENNE flaten (filtrert på fixtureId). Hver endring committes
  // umiddelbart. itemsRef holdes synkron i commit() og under drag (onMove) —
  // IKKE i render-kroppen — så drag-avslutning leser fersk verdi.
  const [items, setItems] = useState<WindowDisplayItem[]>(
    () => state.windowDisplayLayout.filter(i => i.fixtureId === fixture.id),
  )
  const itemsRef = useRef(items)

  // Både 'new' og 'move' holder nå en produkt-id: paletten er FØRTE varer
  // (state.products), så «new» = plasser en allerede ført vare første gang;
  // «move» = flytt en som alt ligger på flaten.
  const [drag, setDrag] = useState<{ kind: 'new'; productId: string } | { kind: 'move'; productId: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const [dragOut, setDragOut] = useState(false)

  const placedIds = new Set(items.map(i => i.productId))

  function commit(next: WindowDisplayItem[]) {
    itemsRef.current = next
    setItems(next)
    dispatch({ type: 'SET_WINDOW_DISPLAY', fixtureId: fixture.id, items: next })
  }
  function persist() {
    dispatch({ type: 'SET_WINDOW_DISPLAY', fixtureId: fixture.id, items: itemsRef.current })
  }

  /** Klem senterpunktet så hele kortet holder seg innenfor sonen. */
  function clampFrac(fx: number, fy: number, rect: DOMRect): [number, number] {
    const cardHFrac = Math.min(0.9, (cardWFrac * rect.width * 1.15) / rect.height)
    const mx = cardWFrac / 2, my = cardHFrac / 2
    return [
      Math.max(mx, Math.min(1 - mx, fx)),
      Math.max(my, Math.min(1 - my, fy)),
    ]
  }
  function fracFromEvent(clientX: number, clientY: number, rect: DOMRect) {
    return { fx: (clientX - rect.left) / rect.width, fy: (clientY - rect.top) / rect.height }
  }
  function isOutside(fx: number, fy: number) {
    return fx < 0 || fx > 1 || fy < 0 || fy > 1
  }

  // Dra en FØRT vare fra paletten inn på flaten. Ved slipp plasseres den bare
  // (den er allerede ført via bestilling — ingen CARRY_PRODUCT/startbatch her
  // lenger, docs/INNKJOP_LEVERING.md).
  function startNew(productId: string, e: React.PointerEvent) {
    e.preventDefault()
    setDrag({ kind: 'new', productId })
    setGhost({ x: e.clientX, y: e.clientY })

    const onMove = (ev: PointerEvent) => {
      setGhost({ x: ev.clientX, y: ev.clientY })
      const rect = surfaceRef.current?.getBoundingClientRect()
      if (rect) { const { fx, fy } = fracFromEvent(ev.clientX, ev.clientY, rect); setDragOut(isOutside(fx, fy)) }
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      setDrag(null); setGhost(null); setDragOut(false)
      const rect = surfaceRef.current?.getBoundingClientRect()
      if (!rect) return
      const { fx, fy } = fracFromEvent(ev.clientX, ev.clientY, rect)
      if (isOutside(fx, fy)) return   // sluppet utenfor ⇒ avbryt
      const product = state.products.find(p => p.id === productId)
      if (!product) return
      const [cx, cy] = clampFrac(fx, fy, rect)
      // Snapp til nærmeste hyllelinje (perspektiv-skala); ingen linjer ⇒ fri plassering.
      const snap = snappTilLinje(cx, cy, fixture)
      const px = snap?.x ?? cx, py = snap?.y ?? cy
      const next = [
        ...itemsRef.current.filter(i => i.productId !== product.id),
        { fixtureId: fixture.id, productId: product.id, x: px, y: py, z: computeZ(py), scale: snap?.scale },
      ]
      commit(next)
    }
    // Capture-fase: DashboardOverlay kaller stopPropagation på pointerup i
    // boble-fasen, så bobleende window-lyttere ville aldri fyre.
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  // Flytt et allerede plassert element (eller dra det UT for å fjerne).
  function startMove(productId: string, e: React.PointerEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDrag({ kind: 'move', productId })

    const onMove = (ev: PointerEvent) => {
      const rect = surfaceRef.current?.getBoundingClientRect()
      if (!rect) return
      const { fx, fy } = fracFromEvent(ev.clientX, ev.clientY, rect)
      setDragOut(isOutside(fx, fy))
      const [cx, cy] = clampFrac(fx, fy, rect)
      const next = itemsRef.current.map(i =>
        i.productId === productId ? { ...i, x: cx, y: cy, z: computeZ(cy) } : i
      )
      itemsRef.current = next
      setItems(next)
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      setDrag(null); setDragOut(false)
      const rect = surfaceRef.current?.getBoundingClientRect()
      let out = false
      if (rect) { const { fx, fy } = fracFromEvent(ev.clientX, ev.clientY, rect); out = isOutside(fx, fy) }
      if (out) { commit(itemsRef.current.filter(i => i.productId !== productId)); return }  // dra ut ⇒ fjern
      // Snapp sluttposisjonen til nærmeste hyllelinje (perspektiv-skala).
      const snapped = itemsRef.current.map(i => {
        if (i.productId !== productId) return i
        const snap = snappTilLinje(i.x, i.y, fixture)
        return snap ? { ...i, x: snap.x, y: snap.y, z: computeZ(snap.y), scale: snap.scale } : i
      })
      itemsRef.current = snapped; setItems(snapped)
      persist()                                                                 // lagre ny posisjon
    }
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  function removeItem(productId: string) {
    commit(itemsRef.current.filter(i => i.productId !== productId))
  }

  // Bakgrunnen på editorflaten = oppskalert utsnitt av kildebildet begrenset til
  // sonen (frontal-visning av den ekte flaten).
  const [zx, zy, zw, zh] = fixture.zone
  const surfaceAspect = (zw / zh) * fixture.imageAspect
  const surfaceBg: React.CSSProperties = {
    backgroundColor: '#26303c',
    backgroundImage: `url(${fixture.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${(100 / zw) * 100}% ${(100 / zh) * 100}%`,
    backgroundPosition: `${(zx / (100 - zw)) * 100}% ${(zy / (100 - zh)) * 100}%`,
  }

  const sortedItems = [...items].sort((a, b) => a.z - b.z)

  return (
    <div>
      <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 1rem', lineHeight: 1.5 }}>
        {fixture.blurb} Dra et produkt ut av flaten eller høyreklikk på det for å fjerne det.
      </p>

      {/* Frontal redigeringsflate (sonen, oppskalert) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div
            ref={surfaceRef}
            style={{
              position: 'relative', width: '100%', aspectRatio: `${surfaceAspect}`,
              borderRadius: 12, overflow: 'hidden',
              border: `2px solid ${dragOut ? 'rgba(239,68,68,0.8)' : 'rgba(125,211,252,0.45)'}`,
              boxShadow: dragOut ? '0 0 0 3px rgba(239,68,68,0.25)' : '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              touchAction: 'none',
              ...surfaceBg,
            }}
          >
            {/* Glass-/lys-hint */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.07) 65%, rgba(255,255,255,0) 100%)',
            }} />

            {/* Plasserte elementer */}
            {sortedItems.map(it => {
              const p = state.products.find(pr => pr.id === it.productId)
              if (!p) return null
              const isDragging = drag?.kind === 'move' && drag.productId === it.productId
              return (
                <div
                  key={it.productId}
                  onPointerDown={e => startMove(it.productId, e)}
                  onContextMenu={e => { e.preventDefault(); removeItem(it.productId) }}
                  title={`${p.name} — dra for å flytte, høyreklikk for å fjerne`}
                  style={{
                    position: 'absolute',
                    left: `${it.x * 100}%`, top: `${it.y * 100}%`,
                    width: `${effektivBredde(it, fixture, cardWFrac) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: it.z, containerType: 'inline-size',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: 'none',
                    filter: isDragging
                      ? (dragOut ? 'grayscale(0.6) brightness(0.85)' : 'brightness(1.08)')
                      : undefined,
                    opacity: isDragging && dragOut ? 0.5 : 1,
                  }}
                >
                  <CardVisual product={p} />
                </div>
              )
            })}

            {/* Tom flate */}
            {items.length === 0 && !drag && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
                color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600,
                textAlign: 'center', padding: '0 1.5rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              }}>
                {fixture.emptyText}
              </div>
            )}

            {/* Fjern-hint ved drag ut */}
            {dragOut && drag && (
              <div style={{
                position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(239,68,68,0.9)', color: '#fff', borderRadius: 99,
                padding: '2px 12px', fontSize: 12, fontWeight: 700, pointerEvents: 'none',
              }}>
                Slipp for å fjerne
              </div>
            )}

            {/* ?dev=1 — hyllelinje-tracer (Espen kalibrerer + låser). */}
            {IS_DEV_COORDS && fixture.hyllelinjer && fixture.hyllelinjer.length > 0 && (
              <HyllelinjeTracer fixture={fixture} surfaceRef={surfaceRef} />
            )}
          </div>
        </div>
      </div>

      {/* Palett — FØRTE varer (bestilt i Produkter-fanen), ikke hele katalogen. */}
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
        VARER
      </div>
      {carried.length === 0 ? (
        <div style={{
          textAlign: 'center', color: '#94a3b8', padding: '1.5rem',
          background: 'rgba(255,255,255,0.02)', borderRadius: 12,
          border: '1px dashed rgba(255,255,255,0.1)', fontSize: 13,
        }}>
          Ingen varer ført ennå — bestill varer i Produkter-fanen først, så
          dukker de opp her.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.6rem' }}>
          {carried.map(item => (
            <PaletteRow
              key={item.id}
              item={item}
              placed={placedIds.has(item.id)}
              onStart={e => startNew(item.id, e)}
            />
          ))}
        </div>
      )}

      {/* Flytende spøkelse under palett-drag. Portales til document.body fordi
          DashboardOverlay (framer-motion) har transform på dialog-div'en, og en
          ancestor med transform gjør at position:fixed måles fra DEN. */}
      {drag?.kind === 'new' && ghost && (() => {
        const p = state.products.find(pr => pr.id === drag.productId)
        if (!p) return null
        return createPortal(
          <div style={{
            position: 'fixed', left: ghost.x, top: ghost.y,
            width: 96, transform: 'translate(-50%, -50%)',
            zIndex: 9999, pointerEvents: 'none', containerType: 'inline-size',
            opacity: dragOut ? 0.45 : 0.92,
          }}>
            <CardVisual product={p} />
          </div>,
          document.body,
        )
      })()}
    </div>
  )
}

// ── Utstilling-fanen: vindusutstillingen (UENDRET, fri styling) ───────────────
// Disk-monteren er flyttet til den frontale MonterScene (trau), så denne fanen
// viser kun vinduet — som før.

export default function WindowDisplayEditor() {
  // LÆRINGSLAGET: kontekstuell mentor-trigger — vindusstyling åpnet (ytre salgsmiljø).
  useEffect(() => { window.dispatchEvent(new CustomEvent('mentor:signal', { detail: { id: 'forste_vindu', scene: 'vindu' } })) }, [])
  return (
    <div>
      <div style={{ marginBottom: '0.9rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{VINDU_FIXTURE.icon} {VINDU_FIXTURE.title}</h3>
      </div>
      <FixtureEditor fixture={VINDU_FIXTURE} />
    </div>
  )
}
