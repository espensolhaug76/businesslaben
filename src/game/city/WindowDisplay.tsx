import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGame } from '../GameContext'
import { STOREFRONT_HOTSPOTS, INTERIOR_DISK_DISPLAY } from '../../data/districts'
import type { Product, WindowDisplayItem, FixtureId } from '../types'
import { FACADE_IMG } from './StorefrontView'

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
}

const VINDU_FIXTURE: FixtureConfig = {
  id: 'vindu', icon: '🪟', title: 'Vindusutstilling',
  blurb: 'Dra produkter inn i vinduet og plasser dem fritt — slik kundene ser det fra fortauet. Lavere = nærmere glasset (foran).',
  emptyText: 'Tomt vindu — dra produkter hit fra paletten under',
  zone: STOREFRONT_HOTSPOTS.vindu, image: FACADE_IMG, imageAspect: 1024 / 1280,
  cardWFrac: VINDU_CARD_W_FRAC,
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

// ── Placeholder-kort (delt visuell mellom editor og scene) ────────────────────
// Skrift skaleres med kortbredden via container-query-enheter (cqw), så samme
// komponent ser riktig ut i både stor editor og liten scene-flate.

function CardVisual({ product }: { product: Product }) {
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
              width: `${cardWFrac * 100}%`,
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

// ── Editor for ÉN flate — fri plassering, fra dashbordet ──────────────────────

type DragKind = 'new' | 'move'

function FixtureEditor({ fixture }: { fixture: FixtureConfig }) {
  const { state, dispatch } = useGame()
  const surfaceRef = useRef<HTMLDivElement>(null)
  const cardWFrac = fixture.cardWFrac

  // Arbeidskopi for DENNE flaten (filtrert på fixtureId). Hver endring committes
  // umiddelbart. itemsRef holdes synkron i commit() og under drag (onMove) —
  // IKKE i render-kroppen — så drag-avslutning leser fersk verdi.
  const [items, setItems] = useState<WindowDisplayItem[]>(
    () => state.windowDisplayLayout.filter(i => i.fixtureId === fixture.id),
  )
  const itemsRef = useRef(items)

  const [drag, setDrag] = useState<{ kind: DragKind; productId: string } | null>(null)
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

  // Dra et NYTT produkt fra paletten inn på flaten.
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
      const [cx, cy] = clampFrac(fx, fy, rect)
      const next = [
        ...itemsRef.current.filter(i => i.productId !== productId),
        { fixtureId: fixture.id, productId, x: cx, y: cy, z: computeZ(cy) },
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
      if (out) commit(itemsRef.current.filter(i => i.productId !== productId))  // dra ut ⇒ fjern
      else persist()                                                            // lagre ny posisjon
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
                    width: `${cardWFrac * 100}%`,
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
          </div>
        </div>
      </div>

      {/* Palett — elevens sortiment */}
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
        DITT SORTIMENT
      </div>
      {state.products.length === 0 ? (
        <div style={{
          textAlign: 'center', color: '#475569', padding: '1.5rem',
          background: 'rgba(255,255,255,0.02)', borderRadius: 12,
          border: '1px dashed rgba(255,255,255,0.1)', fontSize: 13,
        }}>
          Du har ingen produkter ennå. Bestill varer i <strong>Produkter</strong>-fanen først.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.6rem' }}>
          {state.products.map(p => {
            const placed = placedIds.has(p.id)
            const hue = productHue(p.id)
            return (
              <div
                key={p.id}
                onPointerDown={placed ? undefined : e => startNew(p.id, e)}
                title={placed ? `${p.name} — allerede plassert` : `${p.name} — dra inn på flaten`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: placed ? 'rgba(255,255,255,0.03)' : `linear-gradient(160deg, hsl(${hue} 50% 28%), hsl(${hue} 45% 20%))`,
                  border: `1px solid ${placed ? 'rgba(255,255,255,0.08)' : `hsl(${hue} 50% 40%)`}`,
                  borderRadius: 10, padding: '0.55rem 0.7rem',
                  cursor: placed ? 'default' : 'grab',
                  opacity: placed ? 0.5 : 1, userSelect: 'none', touchAction: 'none',
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{p.icon}</span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
                  {p.name}
                </span>
                {placed && <span style={{ fontSize: 14, color: '#00d4aa' }}>✓</span>}
              </div>
            )
          })}
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
  return (
    <div>
      <div style={{ marginBottom: '0.9rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{VINDU_FIXTURE.icon} {VINDU_FIXTURE.title}</h3>
      </div>
      <FixtureEditor fixture={VINDU_FIXTURE} />
    </div>
  )
}
