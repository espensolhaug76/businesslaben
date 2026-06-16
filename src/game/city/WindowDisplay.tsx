import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGame } from '../GameContext'
import { STOREFRONT_HOTSPOTS } from '../../data/districts'
import type { Product, WindowDisplayItem } from '../types'
import { FACADE_IMG } from './StorefrontView'

// ── VINDUSUTSTILLING — fri drag-and-drop (ren React/DOM) ─────────────────────
//
// Eleven bygger vindusutstillingen manuelt: drar produkter fritt inn i vinduet
// og plasserer dem hvor som helst. Redigeres fra dashbordet (PC-en «inni
// lokalet»), men redigeringsflaten rendres FRONTALT — en oppskalert utsnitt av
// fasadens vindussone — slik at eleven ser nøyaktig det kunden ser fra
// fortauet. Ingen bakvendt plassering.
//
// Datamodellen (WindowDisplayItem) lagrer x/y som BRØK (0–1) av VINDUSSONEN
// (STOREFRONT_HOTSPOTS.vindu), så samme liste rendres korrekt både her i
// editoren og på den ekte fasaden (StorefrontView) i en helt annen skala.

/** Vindussonen på fasaden, i prosent [x, y, bredde, høyde]. Kilde til ALL
 *  geometri her — endrer Espen sonen i districts.ts (?dev=1) følger både
 *  editor og fasade automatisk. */
const VINDU = STOREFRONT_HOTSPOTS.vindu

/** Vindussonens reelle bredde/høyde-forhold på fasaden. Editorflaten bruker
 *  samme forhold slik at brøk-koordinatene mappes uten forvrengning. */
const WINDOW_ASPECT = (VINDU[2] / VINDU[3]) * (1024 / 1280)

/** Kortbredde som BRØK av vindussonens bredde. Lik skala på alle elementer
 *  i v1 (ingen resize). */
const CARD_W_FRAC = 0.24

/** Lagrekkefølge avledet av y: lavere i vinduet (høyere y) = nærmere glasset
 *  = foran = høyere z. Persisteres for stabil opptegning. */
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

// ── Placeholder-kort (delt visuell mellom editor og fasade) ───────────────────
// Skrift skaleres med kortbredden via container-query-enheter (cqw), så samme
// komponent ser riktig ut i både stor editor og lite fasadevindu.

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

// ── Read-only lag — brukes på den ekte fasaden (StorefrontView) ───────────────
// Forutsetter en forelder med position:relative satt til vindussonen.

export function WindowDisplayLayer({ items, products }: {
  items: WindowDisplayItem[]
  products: Product[]
}) {
  const sorted = [...items].sort((a, b) => a.z - b.z)
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
              width: `${CARD_W_FRAC * 100}%`,
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

// ── Editor — fri plassering, redigeres fra inni lokalet (dashbordet) ──────────

type DragKind = 'new' | 'move'

export default function WindowDisplayEditor() {
  const { state, dispatch } = useGame()
  const surfaceRef = useRef<HTMLDivElement>(null)

  // Editorens arbeidskopi. Initialiseres fra spillstate; hver endring
  // committes umiddelbart til state (ingen egen lagre-knapp). itemsRef holder
  // en synkron kopi så drag-avslutning leser fersk verdi.
  // itemsRef holdes synkron i commit() og under drag (onMove) — IKKE i
  // render-kroppen — så drag-avslutning leser fersk verdi uten å mutere ref
  // under opptegning.
  const [items, setItems] = useState<WindowDisplayItem[]>(() => state.windowDisplayLayout)
  const itemsRef = useRef(items)

  // Aktiv drag (for visuell tilstand) + flytende «spøkelse» for palett-drag.
  const [drag, setDrag] = useState<{ kind: DragKind; productId: string } | null>(null)
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const [dragOut, setDragOut] = useState(false)

  const placedIds = new Set(items.map(i => i.productId))

  function commit(next: WindowDisplayItem[]) {
    itemsRef.current = next
    setItems(next)
    dispatch({ type: 'SET_WINDOW_DISPLAY', items: next })
  }

  /** Klem senterpunktet så hele kortet holder seg innenfor vindussonen. */
  function clampFrac(fx: number, fy: number, rect: DOMRect): [number, number] {
    const cardWFrac = CARD_W_FRAC
    const cardHFrac = Math.min(0.9, (CARD_W_FRAC * rect.width * 1.15) / rect.height)
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

  // Dra et NYTT produkt fra paletten inn i vinduet.
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
      if (isOutside(fx, fy)) return   // sluppet utenfor ⇒ avbryt (legges ikke til)
      const [cx, cy] = clampFrac(fx, fy, rect)
      const next = [
        ...itemsRef.current.filter(i => i.productId !== productId),
        { productId, x: cx, y: cy, z: computeZ(cy) },
      ]
      commit(next)
    }
    // Capture-fase: DashboardOverlay kaller stopPropagation på pointerup i
    // boble-fasen, så bobleende window-lyttere ville aldri fyre. Capture
    // fyrer FØR overlayet rekker å stoppe eventet.
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
      else dispatch({ type: 'SET_WINDOW_DISPLAY', items: itemsRef.current })   // lagre ny posisjon
    }
    // Capture-fase: DashboardOverlay kaller stopPropagation på pointerup i
    // boble-fasen, så bobleende window-lyttere ville aldri fyre. Capture
    // fyrer FØR overlayet rekker å stoppe eventet.
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
  }

  function removeItem(productId: string) {
    commit(itemsRef.current.filter(i => i.productId !== productId))
  }

  // Bakgrunnen på editorflaten = oppskalert utsnitt av fasaden begrenset til
  // vindussonen (frontal-visning av det ekte vinduet).
  const [vx, vy, vw, vh] = VINDU
  const surfaceBg: React.CSSProperties = {
    backgroundColor: '#26303c',
    backgroundImage: `url(${FACADE_IMG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${(100 / vw) * 100}% ${(100 / vh) * 100}%`,
    backgroundPosition: `${(vx / (100 - vw)) * 100}% ${(vy / (100 - vh)) * 100}%`,
  }

  const sortedItems = [...items].sort((a, b) => a.z - b.z)

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>🪟 Vindusutstilling</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.3rem 0 0', lineHeight: 1.5 }}>
          Dra produkter fra paletten inn i vinduet og plasser dem fritt. Du ser
          vinduet rett forfra — akkurat slik kundene ser det fra fortauet.
          Lavere i vinduet = nærmere glasset (foran). Dra et produkt ut av
          vinduet eller høyreklikk på det for å fjerne det.
        </p>
      </div>

      {/* Frontal redigeringsflate (vindussonen, oppskalert) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div
            ref={surfaceRef}
            style={{
              position: 'relative', width: '100%', aspectRatio: `${WINDOW_ASPECT}`,
              borderRadius: 12, overflow: 'hidden',
              border: `2px solid ${dragOut ? 'rgba(239,68,68,0.8)' : 'rgba(125,211,252,0.45)'}`,
              boxShadow: dragOut
                ? '0 0 0 3px rgba(239,68,68,0.25)'
                : '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              touchAction: 'none',
              ...surfaceBg,
            }}
          >
            {/* Glass-hint */}
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
                    width: `${CARD_W_FRAC * 100}%`,
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

            {/* Tomt vindu */}
            {items.length === 0 && !drag && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
                color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600,
                textAlign: 'center', padding: '0 1.5rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              }}>
                Tomt vindu — dra produkter hit fra paletten under
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
                title={placed ? `${p.name} — allerede i vinduet` : `${p.name} — dra inn i vinduet`}
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

      {/* Flytende spøkelse under palett-drag. Portales til document.body:
          DashboardOverlay (framer-motion) har transform på dialog-div'en, og
          en ancestor med transform gjør at position:fixed måles fra DEN i
          stedet for viewporten — da havner spøkelset langt fra markøren. */}
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
