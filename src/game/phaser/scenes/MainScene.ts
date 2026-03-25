import Phaser from 'phaser'
import { cartToIso, TILE_W, TILE_H } from '../utils/IsometricUtils'
import { Building } from '../objects/Building'
import { Customer } from '../objects/Customer'

const MAP_SIZE = 10  // 10x10 grid

export default class MainScene extends Phaser.Scene {
  private buildings: Building[] = []
  private customers: Customer[] = []
  private isDragging = false
  private dragStartX = 0
  private dragStartY = 0
  private camStartX = 0
  private camStartY = 0

  constructor() { super({ key: 'MainScene' }) }

  create() {
    this.cameras.main.setBackgroundColor(0x1a2744)

    this.drawGround()
    this.drawRoads()
    this.spawnBuildings()
    this.spawnTrees()
    this.spawnCustomers()
    this.setupCamera()
    this.setupInput()
  }

  // ── Ground tiles ───────────────────────────────────────────────────────────

  private drawGround() {
    const g = this.add.graphics()
    const GRASS = 0x1e3a2f
    const GRASS2 = 0x243d32
    const OUTLINE = 0x1a3328

    for (let cx = 0; cx < MAP_SIZE; cx++) {
      for (let cy = 0; cy < MAP_SIZE; cy++) {
        const { x, y } = cartToIso(cx, cy)
        const color = (cx + cy) % 2 === 0 ? GRASS : GRASS2

        g.fillStyle(color, 1)
        g.beginPath()
        g.moveTo(x,              y - TILE_H/2)
        g.lineTo(x + TILE_W/2,   y)
        g.lineTo(x,              y + TILE_H/2)
        g.lineTo(x - TILE_W/2,   y)
        g.closePath()
        g.fillPath()

        g.lineStyle(1, OUTLINE, 0.4)
        g.strokePath()
      }
    }
    g.setDepth(-10)
  }

  // ── Roads ──────────────────────────────────────────────────────────────────

  private drawRoads() {
    const g = this.add.graphics()
    const ROAD = 0x334155

    // Horizontal road through middle (cy = 5)
    for (let cx = 0; cx < MAP_SIZE; cx++) {
      this.drawRoadTile(g, cx, 5, ROAD)
    }
    // Vertical road through middle (cx = 5)
    for (let cy = 0; cy < MAP_SIZE; cy++) {
      this.drawRoadTile(g, 5, cy, ROAD)
    }

    // Center line dashes
    const LINE = 0xf59e0b
    for (let i = 0; i < MAP_SIZE; i++) {
      this.drawCenterLine(g, i, 5, LINE, true)
      this.drawCenterLine(g, 5, i, LINE, false)
    }

    g.setDepth(-9)
  }

  private drawRoadTile(g: Phaser.GameObjects.Graphics, cx: number, cy: number, color: number) {
    const { x, y } = cartToIso(cx, cy)
    g.fillStyle(color, 1)
    g.beginPath()
    g.moveTo(x,             y - TILE_H/2)
    g.lineTo(x + TILE_W/2,  y)
    g.lineTo(x,             y + TILE_H/2)
    g.lineTo(x - TILE_W/2,  y)
    g.closePath()
    g.fillPath()
  }

  private drawCenterLine(g: Phaser.GameObjects.Graphics, cx: number, cy: number, color: number, horiz: boolean) {
    const { x, y } = cartToIso(cx, cy)
    g.lineStyle(2, color, 0.6)
    g.beginPath()
    if (horiz) {
      g.moveTo(x - TILE_W/4, y)
      g.lineTo(x + TILE_W/4, y)
    } else {
      g.moveTo(x, y - TILE_H/4)
      g.lineTo(x, y + TILE_H/4)
    }
    g.strokePath()
  }

  // ── Buildings ──────────────────────────────────────────────────────────────

  private spawnBuildings() {
    const defs = [
      {
        id: 'shop',
        label: 'Din butikk',
        emoji: '🏪',
        gridX: 5, gridY: 5,
        w: 56, h: 80, d: 28,
        colors: { top: 0x0d9488, left: 0x0f766e, right: 0x134e4a },
      },
      {
        id: 'warehouse',
        label: 'Lager',
        emoji: '📦',
        gridX: 3, gridY: 5,
        w: 44, h: 55, d: 22,
        colors: { top: 0xf97316, left: 0xc2410c, right: 0x9a3412 },
      },
      {
        id: 'office',
        label: 'Kontor',
        emoji: '🏢',
        gridX: 7, gridY: 5,
        w: 44, h: 65, d: 22,
        colors: { top: 0x3b82f6, left: 0x1d4ed8, right: 0x1e3a8a },
      },
      {
        id: 'marketing',
        label: 'Markedsavdeling',
        emoji: '📢',
        gridX: 7, gridY: 3,
        w: 40, h: 50, d: 20,
        colors: { top: 0xec4899, left: 0xbe185d, right: 0x9d174d },
      },
      {
        id: 'supplier',
        label: 'Leverandør',
        emoji: '🚛',
        gridX: 3, gridY: 3,
        w: 40, h: 50, d: 20,
        colors: { top: 0xeab308, left: 0xa16207, right: 0x854d0e },
      },
      {
        id: 'webshop',
        label: 'Nettbutikk',
        emoji: '🌐',
        gridX: 5, gridY: 2,
        w: 36, h: 45, d: 18,
        colors: { top: 0x64748b, left: 0x475569, right: 0x334155 },
        locked: true,
      },
      {
        id: 'franchise',
        label: 'Franchise',
        emoji: '🏗️',
        gridX: 5, gridY: 8,
        w: 32, h: 38, d: 16,
        colors: { top: 0x64748b, left: 0x475569, right: 0x334155 },
        locked: true,
      },
    ]

    for (const def of defs) {
      const { x, y } = cartToIso(def.gridX, def.gridY)
      const b = new Building(this, x, y, def)
      b.setDepth(def.gridX + def.gridY)
      this.buildings.push(b)
    }

    // Listen for click events from Building objects
    this.events.on('buildingClicked', (id: string) => {
      // Emit to React via a global custom event
      window.dispatchEvent(new CustomEvent('phaser:buildingClicked', { detail: id }))
    })
  }

  // ── Trees / Decor ──────────────────────────────────────────────────────────

  private spawnTrees() {
    const treePositions = [
      [1, 1], [1, 2], [2, 1],
      [8, 1], [9, 1], [8, 2],
      [1, 8], [2, 9], [1, 9],
      [9, 8], [8, 9], [9, 9],
      [0, 5], [1, 7], [9, 3],
    ]

    for (const [cx, cy] of treePositions) {
      const { x, y } = cartToIso(cx, cy)
      this.drawTree(x, y, (cx + cy) % 3)
    }
  }

  private drawTree(x: number, y: number, variant: number) {
    const g = this.add.graphics()
    const greens = [0x15803d, 0x16a34a, 0x166534]
    const color = greens[variant % 3]

    // Trunk
    g.fillStyle(0x92400e, 1)
    g.fillRect(x - 3, y - 12, 6, 14)

    // Leaves (isometric cone)
    g.fillStyle(color, 1)
    g.beginPath()
    g.moveTo(x, y - 38)
    g.lineTo(x + 16, y - 14)
    g.lineTo(x, y - 8)
    g.lineTo(x - 16, y - 14)
    g.closePath()
    g.fillPath()

    // Lighter top
    g.fillStyle(Phaser.Display.Color.IntegerToColor(color).lighten(20).color, 0.8)
    g.beginPath()
    g.moveTo(x, y - 42)
    g.lineTo(x + 10, y - 22)
    g.lineTo(x, y - 18)
    g.lineTo(x - 10, y - 22)
    g.closePath()
    g.fillPath()

    g.setDepth(y * 0.1)
  }

  // ── Customers ─────────────────────────────────────────────────────────────

  private spawnCustomers() {
    // Paths along the roads
    const roads = [
      [cartToIso(2, 5), cartToIso(5, 5), cartToIso(8, 5)],
      [cartToIso(5, 2), cartToIso(5, 5), cartToIso(5, 8)],
      [cartToIso(3, 5), cartToIso(5, 5), cartToIso(7, 5), cartToIso(5, 3)],
      [cartToIso(5, 4), cartToIso(5, 5), cartToIso(6, 5), cartToIso(5, 6)],
    ]

    roads.forEach((path, i) => {
      const c = new Customer(this, path, i)
      c.setDepth(50)
      this.customers.push(c)
    })
  }

  // ── Camera & Input ─────────────────────────────────────────────────────────

  private setupCamera() {
    // Center on shop
    const center = cartToIso(5, 5)
    this.cameras.main.centerOn(center.x, center.y - 40)
    this.cameras.main.setZoom(1)
  }

  private setupInput() {
    const cam = this.cameras.main

    // Drag to pan
    this.input.on('pointerdown', (ptr: Phaser.Input.Pointer) => {
      this.isDragging = true
      this.dragStartX = ptr.x
      this.dragStartY = ptr.y
      this.camStartX = cam.scrollX
      this.camStartY = cam.scrollY
    })

    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (!this.isDragging) return
      const dx = (ptr.x - this.dragStartX) / cam.zoom
      const dy = (ptr.y - this.dragStartY) / cam.zoom
      cam.scrollX = this.camStartX - dx
      cam.scrollY = this.camStartY - dy
    })

    this.input.on('pointerup', () => {
      this.isDragging = false
    })

    // Scroll to zoom
    this.input.on('wheel', (_ptr: unknown, _gos: unknown, _dx: number, dy: number) => {
      const zoom = Phaser.Math.Clamp(cam.zoom - dy * 0.001, 0.5, 2)
      cam.setZoom(zoom)
    })
  }
}
