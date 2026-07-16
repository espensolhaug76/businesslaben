import { useEffect, useRef, useState, type ReactNode } from 'react'

// ── DevPanel — delt ramme for ?dev=1-verktøypaneler ──────────────────────────
// Løser at dev-panelene (Kunde-/Speil-/Tavle-kalibrering, Sone-tracer,
// Scenariovelger) kolliderte med hverandre og med mentoren. Hvert panel:
//  • kollapser til KUN tittel-stripa (klikk tittellinja) — «ett klikk å åpne/lukke»
//  • kan DRAS (pointer-drag på tittellinja) vekk fra det som kalibreres
//  • husker åpen/lukket + posisjon i localStorage per `id` (kun dev-utkast)
// Start-tilstand: kollapset (standardOpen=false) — panelet som sist var åpent
// huskes åpent via persisteringen. Kun dev; ingen effekt uten ?dev=1.

interface Pos { x: number; y: number }
interface Lagret { open: boolean; pos: Pos }

function nokkel(id: string) { return `dev_panel_${id}` }

function les(id: string, standardPos: Pos, standardOpen: boolean): Lagret {
  try {
    const raw = localStorage.getItem(nokkel(id))
    if (raw) {
      const v = JSON.parse(raw) as Partial<Lagret>
      return { open: !!v.open, pos: v.pos && typeof v.pos.x === 'number' ? v.pos : standardPos }
    }
  } catch { /* ignore */ }
  return { open: standardOpen, pos: standardPos }
}

/** Klem posisjonen så tittellinja alltid er innenfor viewporten (drabar tilbake). */
function klem(x: number, y: number): Pos {
  const vw = window.innerWidth, vh = window.innerHeight
  return { x: Math.max(0, Math.min(vw - 44, x)), y: Math.max(0, Math.min(vh - 24, y)) }
}

export default function DevPanel({ id, tittel, farge = '#ffd24a', standardPos, standardOpen = false, bredde = 224, children }: {
  id: string
  tittel: string
  farge?: string
  standardPos: Pos
  standardOpen?: boolean
  bredde?: number
  children: ReactNode
}) {
  const [{ open, pos }, setState] = useState<Lagret>(() => les(id, standardPos, standardOpen))
  const drag = useRef<{ startX: number; startY: number; baseX: number; baseY: number; moved: boolean } | null>(null)

  useEffect(() => { try { localStorage.setItem(nokkel(id), JSON.stringify({ open, pos })) } catch { /* ignore */ } }, [id, open, pos])

  function ned(e: React.PointerEvent) {
    if (e.button !== 0) return
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    drag.current = { startX: e.clientX, startY: e.clientY, baseX: pos.x, baseY: pos.y, moved: false }
  }
  function beveg(e: React.PointerEvent) {
    const d = drag.current; if (!d) return
    const dx = e.clientX - d.startX, dy = e.clientY - d.startY
    if (!d.moved && Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
    if (d.moved) setState(s => ({ ...s, pos: klem(d.baseX + dx, d.baseY + dy) }))
  }
  function opp() {
    const d = drag.current; drag.current = null
    if (d && !d.moved) setState(s => ({ ...s, open: !s.open }))   // klikk uten dra = åpne/lukk
  }

  return (
    // stopPropagation (bubble): tittel-dra fyrer FØR denne, så flytting virker,
    // men klikk/pointer-down når aldri scene-lyttere (f.eks. sone-traceren som
    // ellers sluker klikk). Egne handlere på tittellinja gjør selve draget.
    <div
      onClick={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 320, width: bredde, fontFamily: "'Outfit', sans-serif" }}
    >
      <div
        onPointerDown={ned} onPointerMove={beveg} onPointerUp={opp}
        title="Dra for å flytte · klikk for å åpne/lukke"
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
          cursor: 'grab', touchAction: 'none', userSelect: 'none',
          background: 'rgba(10,14,26,0.94)', border: `1px solid ${farge}55`,
          borderRadius: open ? '10px 10px 0 0' : 10, padding: '7px 11px',
        }}
      >
        <span style={{ color: farge, fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tittel}</span>
        <span style={{ color: farge, fontSize: 11 }}>{open ? '▾' : '▸ ⠿'}</span>
      </div>
      {open && (
        <div style={{
          background: 'rgba(10,14,26,0.96)', border: `1px solid ${farge}33`, borderTop: 'none',
          borderRadius: '0 0 12px 12px', padding: '9px 11px',
          maxHeight: 'calc(100vh - 120px)', overflowY: 'auto',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
