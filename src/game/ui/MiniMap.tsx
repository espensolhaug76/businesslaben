import { useEffect, useRef, useCallback } from 'react'
import { HROADS, VROADS, ROAD_SINGLES, B, GAGATE, PARK, _AG, _S } from '../phaser/scenes/CityScene'

const SLOT_PX = 4 // 1 slot = 4px on minimap
const COLS = _AG + 1 // 33
const ROWS = 26
const MW = COLS * SLOT_PX // 132
const MH = ROWS * SLOT_PX // 104
const PAD = 6

interface CamState { scrollX: number; scrollY: number; zoom: number; width: number; height: number }

// Isometric to minimap: we use a simplified top-down projection
// col → x, row → y (simple grid, not iso diamond)
function slotToMini(col: number, row: number) {
  return { x: PAD + col * SLOT_PX, y: PAD + (row - 1) * SLOT_PX }
}

export default function MiniMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const camRef = useRef<CamState>({ scrollX: 0, scrollY: 0, zoom: 0.65, width: 800, height: 600 })
  const drawnRef = useRef(false)

  // Draw the static map once
  const drawMap = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    // Background
    ctx.fillStyle = '#7ec850'
    ctx.fillRect(PAD, PAD, MW, MH)

    // Road set for lookup
    const roadSet = new Set<string>()
    for (const r of HROADS) for (let c = r.c1; c <= r.c2; c++) roadSet.add(`${c},${r.row}`)
    for (const r of VROADS) for (let row = r.r1; row <= r.r2; row++) roadSet.add(`${r.col},${row}`)
    for (const s of ROAD_SINGLES) roadSet.add(`${s.col},${s.row}`)
    roadSet.add(`${_S},7`)

    // Draw roads
    for (const key of roadSet) {
      const [cs, rs] = key.split(',')
      const c = parseInt(cs), r = parseInt(rs)
      const p = slotToMini(c, r)
      // Determine color
      let color = '#b0b0b0'
      for (const h of HROADS) {
        if (h.row === r && c >= h.c1 && c <= h.c2) {
          if (h.river) color = '#5b9fd4'
          else if (h.rail) color = '#555'
          break
        }
      }
      ctx.fillStyle = color
      ctx.fillRect(p.x, p.y, SLOT_PX, SLOT_PX)
    }

    // Gågate
    for (let c = GAGATE.c1; c <= GAGATE.c2; c++) {
      const p = slotToMini(c, GAGATE.row)
      ctx.fillStyle = '#c8b898'
      ctx.fillRect(p.x, p.y, SLOT_PX, SLOT_PX)
    }

    // Park
    for (let c = PARK.ca; c <= PARK.cb; c++) for (let r = PARK.ra; r <= PARK.rb; r++) {
      const p = slotToMini(c, r)
      ctx.fillStyle = '#90d468'
      ctx.fillRect(p.x, p.y, SLOT_PX, SLOT_PX)
    }

    // Buildings
    for (const b of B) {
      const p = slotToMini(b.ca, b.ra)
      const w = (b.cb - b.ca + 1) * SLOT_PX
      const h = (b.rb - b.ra + 1) * SLOT_PX
      // Color based on building type
      let color = '#d4c4a8'
      if (b.header) color = '#ffd080' // Kongssenteret
      else if (b.name?.includes('Sykehuset')) color = '#90c8f0'
      else if (b.name?.includes('Rådhuset')) color = '#c8c0a0'
      else if (b.name?.includes('KIWI') || b.name?.includes('Coop')) color = '#70c040'
      else if (b.name?.includes('🏠') || b.name?.includes('Boliger')) color = '#c8b898'
      else if (b.fill === 0xffe8e8) color = '#e8b0b0' // TIL LEIE
      ctx.fillStyle = color
      ctx.fillRect(p.x, p.y, w, h)
    }

    drawnRef.current = true
  }, [])

  // Draw camera viewport indicator
  const drawViewport = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    // Redraw map
    drawMap()

    // Camera viewport in world coords
    const cam = camRef.current
    const TW = 128, TH = 64
    // World center of camera
    const wcx = cam.scrollX + cam.width / 2 / cam.zoom
    const wcy = cam.scrollY + cam.height / 2 / cam.zoom
    // Convert world to approximate grid using iso inverse
    const focusCol = (wcx / (TW / 2) + wcy / (TH / 2)) / 2
    const focusRow = (wcy / (TH / 2) - wcx / (TW / 2)) / 2 + 1
    // Viewport size in grid units (approximate)
    const viewCols = cam.width / cam.zoom / (TW / 2) / 2
    const viewRows = cam.height / cam.zoom / (TH / 2) / 2

    // Draw viewport rectangle
    const vx = PAD + (focusCol - viewCols / 2) * SLOT_PX
    const vy = PAD + (focusRow - 1 - viewRows / 2) * SLOT_PX
    const vw = viewCols * SLOT_PX
    const vh = viewRows * SLOT_PX

    ctx.strokeStyle = '#ffdd44'
    ctx.lineWidth = 1.5
    ctx.strokeRect(Math.max(PAD, vx), Math.max(PAD, vy), vw, vh)
  }, [drawMap])

  useEffect(() => {
    drawMap()

    const onCamUpdate = (e: Event) => {
      const d = (e as CustomEvent<CamState>).detail
      if (d) {
        camRef.current = d
        drawViewport()
      }
    }

    window.addEventListener('phaser:cameraUpdate', onCamUpdate)
    return () => window.removeEventListener('phaser:cameraUpdate', onCamUpdate)
  }, [drawMap, drawViewport])

  // Click on minimap → navigate camera
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left - PAD
    const my = e.clientY - rect.top - PAD
    const col = mx / SLOT_PX
    const row = my / SLOT_PX + 1

    // Convert grid to iso world coords
    const TW = 128, TH = 64
    const ri = row - 1
    const wx = (col - ri) * (TW / 2)
    const wy = (col + ri) * (TH / 2)

    // Pan camera to this position
    const game = (window as any).__PHASER_GAME__ as Phaser.Game | undefined
    if (game) {
      const cam = game.scene.scenes[1]?.cameras?.main
      if (cam) cam.pan(wx, wy, 400, 'Power2')
    }
  }

  return (
    <div style={{
      position: 'fixed', top: 12, right: 12, zIndex: 200,
      background: 'rgba(0,0,0,0.75)', borderRadius: 8, padding: PAD,
      cursor: 'pointer', pointerEvents: 'auto',
    }}>
      <canvas
        ref={canvasRef}
        width={MW + PAD * 2}
        height={MH + PAD * 2}
        onClick={handleClick}
        style={{ display: 'block', borderRadius: 4 }}
      />
    </div>
  )
}
