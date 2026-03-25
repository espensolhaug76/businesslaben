import Phaser from 'phaser'
import { TILE_W, TILE_H, cartToIso } from '../utils/IsometricUtils'

// ── Zone definitions ──────────────────────────────────────────────────────────
type Zone = 'gagate' | 'hovedgate' | 'utkant' | 'park' | 'road'

// ── Building definitions ──────────────────────────────────────────────────────
interface BuildingDef {
  id: string
  label: string
  gridX: number
  gridY: number
  w: number
  h: number
  d: number
  topColor: number
  leftColor: number
  rightColor: number
  zone: Zone
  vacant?: boolean
  rent?: number
  footTraffic?: 'lav' | 'middels' | 'høy'
  sqm?: number
}

const MAP_W = 22
const MAP_H = 18

interface VacantEntry {
  def: BuildingDef
  worldX: number
  worldY: number
  glow: Phaser.GameObjects.Graphics
  // world-space AABB for hit testing
  left: number; right: number; top: number; bottom: number
}

export default class CityScene extends Phaser.Scene {
  private npcs: Phaser.GameObjects.Container[] = []
  private vacantBuildings: VacantEntry[] = []
  private hoveredBuilding: VacantEntry | null = null
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() { super({ key: 'CityScene' }) }

  create() {
    this.cameras.main.setBackgroundColor(0x1a2744)

    this.drawGround()
    this.drawRoads()
    this.drawGagate()
    this.placeBuildings()
    this.spawnNPCs()
    this.setupCamera()
    this.setupInput()

    window.addEventListener('game:enterInterior', (e: Event) => {
      const shopName = (e as CustomEvent<{ shopName: string }>).detail?.shopName ?? ''
      this.scene.start('InteriorScene', { shopName })
    })
  }

  // ── Ground tiles ─────────────────────────────────────────────────────────
  private drawGround() {
    const g = this.add.graphics()

    for (let cx = 0; cx < MAP_W; cx++) {
      for (let cy = 0; cy < MAP_H; cy++) {
        const { x, y } = cartToIso(cx, cy)

        let color: number
        if (cy <= 2) {
          color = (cx + cy) % 2 === 0 ? 0x1e3a2f : 0x1a3328
        } else if (cy <= 4) {
          color = (cx + cy) % 2 === 0 ? 0x22302a : 0x1e2a24
        } else if (cy === 5) {
          color = 0x374151
        } else if (cy >= 6 && cy <= 10) {
          color = (cx + cy) % 2 === 0 ? 0x1e293b : 0x172032
        } else if (cy >= 11 && cy <= 12) {
          color = (cx + cy) % 2 === 0 ? 0x4a3f35 : 0x3d342c
        } else {
          color = (cx + cy) % 2 === 0 ? 0x1a1f2e : 0x161a28
        }

        g.fillStyle(color, 1)
        g.beginPath()
        g.moveTo(x,            y - TILE_H / 2)
        g.lineTo(x + TILE_W / 2, y)
        g.lineTo(x,            y + TILE_H / 2)
        g.lineTo(x - TILE_W / 2, y)
        g.closePath()
        g.fillPath()

        g.lineStyle(1, 0x000000, 0.15)
        g.strokePath()
      }
    }
    g.setDepth(-20)
  }

  // ── Roads ──────────────────────────────────────────────────────────────────
  private drawRoads() {
    const g = this.add.graphics()

    for (let cx = 0; cx < MAP_W; cx++) {
      this.drawRoadTile(g, cx, 5, 0x1f2937)
    }
    for (let cx = 0; cx < MAP_W; cx++) {
      this.drawRoadTile(g, cx, 14, 0x1a1f2e)
    }

    for (const roadX of [5, 11, 17]) {
      for (let cy = 0; cy < MAP_H; cy++) {
        this.drawRoadTile(g, roadX, cy, 0x1f2937)
      }
    }

    for (let cx = 0; cx < MAP_W; cx++) {
      const { x, y } = cartToIso(cx, 4)
      g.fillStyle(0x374151, 0.7)
      g.beginPath()
      g.moveTo(x,            y - TILE_H / 2)
      g.lineTo(x + TILE_W / 2, y)
      g.lineTo(x,            y + TILE_H / 2)
      g.lineTo(x - TILE_W / 2, y)
      g.closePath()
      g.fillPath()
    }

    for (let cx = 0; cx < MAP_W; cx++) {
      const { x, y } = cartToIso(cx, 5)
      if (cx % 3 !== 2) {
        g.lineStyle(2, 0xf59e0b, 0.7)
        g.beginPath()
        g.moveTo(x - TILE_W / 4, y)
        g.lineTo(x + TILE_W / 4, y)
        g.strokePath()
      }
    }

    g.setDepth(-15)
  }

  private drawRoadTile(g: Phaser.GameObjects.Graphics, cx: number, cy: number, color: number) {
    const { x, y } = cartToIso(cx, cy)
    g.fillStyle(color, 1)
    g.beginPath()
    g.moveTo(x,            y - TILE_H / 2)
    g.lineTo(x + TILE_W / 2, y)
    g.lineTo(x,            y + TILE_H / 2)
    g.lineTo(x - TILE_W / 2, y)
    g.closePath()
    g.fillPath()
  }

  // ── Gågata cobblestone zone ────────────────────────────────────────────────
  private drawGagate() {
    const g = this.add.graphics()

    for (let cx = 6; cx <= 16; cx++) {
      for (const cy of [11, 12]) {
        const { x, y } = cartToIso(cx, cy)
        const c = (cx + cy) % 2 === 0 ? 0x6b5a4e : 0x5a4a3e
        g.fillStyle(c, 1)
        g.beginPath()
        g.moveTo(x,            y - TILE_H / 2)
        g.lineTo(x + TILE_W / 2, y)
        g.lineTo(x,            y + TILE_H / 2)
        g.lineTo(x - TILE_W / 2, y)
        g.closePath()
        g.fillPath()
        g.lineStyle(1, 0x3d2e24, 0.3)
        g.strokePath()
      }
    }

    this.drawFountain(cartToIso(11, 11))

    for (const [cx, cy] of [[8, 11], [10, 11], [12, 11], [14, 11]]) {
      this.drawBench(cartToIso(cx as number, cy as number))
    }

    for (const [cx, cy] of [[7, 11], [9, 11], [13, 11], [15, 11]]) {
      this.drawFlowerPot(cartToIso(cx as number, cy as number))
    }

    g.setDepth(-14)
  }

  private drawFountain(pos: { x: number; y: number }) {
    const g = this.add.graphics()
    const { x, y } = pos
    g.lineStyle(4, 0x64748b, 1)
    g.strokeEllipse(x, y - 6, 40, 20)
    g.fillStyle(0x38bdf8, 0.7)
    g.fillEllipse(x, y - 6, 36, 16)
    g.fillStyle(0x94a3b8, 1)
    g.fillRect(x - 3, y - 18, 6, 14)
    g.fillStyle(0xbae6fd, 0.8)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      g.fillCircle(x + Math.cos(angle) * 8, y - 20 + Math.sin(angle) * 4, 2)
    }
    g.setDepth(5)
  }

  private drawBench(pos: { x: number; y: number }) {
    const g = this.add.graphics()
    const { x, y } = pos
    g.fillStyle(0x92400e, 1)
    g.fillRect(x - 12, y - 8, 24, 5)
    g.fillStyle(0x78350f, 1)
    g.fillRect(x - 10, y - 4, 3, 6)
    g.fillRect(x + 7,  y - 4, 3, 6)
    g.setDepth(4)
  }

  private drawFlowerPot(pos: { x: number; y: number }) {
    const g = this.add.graphics()
    const { x, y } = pos
    g.fillStyle(0xb45309, 1)
    g.fillRect(x - 5, y - 4, 10, 8)
    g.fillStyle(0xfb7185, 1)
    g.fillCircle(x, y - 8, 6)
    g.fillStyle(0xfde68a, 1)
    g.fillCircle(x, y - 8, 3)
    g.setDepth(4)
  }

  // ── Buildings ──────────────────────────────────────────────────────────────
  private placeBuildings() {
    const buildings: BuildingDef[] = [
      // === GÅGATA ZONE (cy 9-10, premium) ===
      { id: 'vacant_gagate_1', label: 'TIL LEIE', gridX: 7, gridY: 9, w: 52, h: 75, d: 26,
        topColor: 0xd4a891, leftColor: 0xb8906e, rightColor: 0x9a7a5c,
        zone: 'gagate', vacant: true, rent: 65000, footTraffic: 'høy', sqm: 85 },
      { id: 'vacant_gagate_2', label: 'TIL LEIE', gridX: 13, gridY: 9, w: 52, h: 70, d: 26,
        topColor: 0xc8d8b0, leftColor: 0xa8bc8a, rightColor: 0x8a9e6c,
        zone: 'gagate', vacant: true, rent: 58000, footTraffic: 'høy', sqm: 72 },
      { id: 'bakery', label: 'Bakeri Olsen', gridX: 9, gridY: 9, w: 44, h: 65, d: 22,
        topColor: 0xe8d4b0, leftColor: 0xc8b48a, rightColor: 0xa89468, zone: 'gagate' },
      { id: 'cafe_gagate', label: 'Kafé Sentrum', gridX: 15, gridY: 9, w: 44, h: 60, d: 22,
        topColor: 0xf0c8a0, leftColor: 0xd4a874, rightColor: 0xb88852, zone: 'gagate' },
      { id: 'boutique', label: 'Boutique', gridX: 6, gridY: 10, w: 40, h: 58, d: 20,
        topColor: 0xd4b8e0, leftColor: 0xb898c4, rightColor: 0x9c7aa8, zone: 'gagate' },
      { id: 'vacant_gagate_3', label: 'TIL LEIE', gridX: 12, gridY: 10, w: 56, h: 80, d: 28,
        topColor: 0xb8c8d8, leftColor: 0x98a8b8, rightColor: 0x7a8898,
        zone: 'gagate', vacant: true, rent: 75000, footTraffic: 'høy', sqm: 110 },
      { id: 'restaurant', label: 'Ristorante', gridX: 16, gridY: 10, w: 44, h: 65, d: 22,
        topColor: 0xf4a060, leftColor: 0xd4804a, rightColor: 0xb46030, zone: 'gagate' },

      // === HOVEDGATA ZONE (cy 6-7, medium) ===
      { id: 'vacant_hoved_1', label: 'TIL LEIE', gridX: 6, gridY: 6, w: 46, h: 62, d: 22,
        topColor: 0x94a3b8, leftColor: 0x6b7a8c, rightColor: 0x4a5768,
        zone: 'hovedgate', vacant: true, rent: 32000, footTraffic: 'middels', sqm: 65 },
      { id: 'bank', label: 'DNB Bank', gridX: 8, gridY: 6, w: 52, h: 72, d: 24,
        topColor: 0x6b8fd4, leftColor: 0x4a6eb8, rightColor: 0x2a4e9c, zone: 'hovedgate' },
      { id: 'vacant_hoved_2', label: 'TIL LEIE', gridX: 12, gridY: 7, w: 46, h: 60, d: 22,
        topColor: 0xa8b8c8, leftColor: 0x889aac, rightColor: 0x6a7c8e,
        zone: 'hovedgate', vacant: true, rent: 28000, footTraffic: 'middels', sqm: 58 },
      { id: 'gym', label: 'Planet Fitness', gridX: 14, gridY: 7, w: 48, h: 68, d: 24,
        topColor: 0x60a0e0, leftColor: 0x3a7ab8, rightColor: 0x1a5a98, zone: 'hovedgate' },
      { id: 'apotek', label: 'Apotek 1', gridX: 16, gridY: 6, w: 42, h: 58, d: 20,
        topColor: 0x80d4a0, leftColor: 0x50b074, rightColor: 0x308a50, zone: 'hovedgate' },
      { id: 'electronics', label: 'Power', gridX: 8, gridY: 7, w: 44, h: 62, d: 22,
        topColor: 0xe8e840, leftColor: 0xb8b810, rightColor: 0x889800, zone: 'hovedgate' },

      // === UTKANT NORTH (cy 1-3, low traffic) ===
      { id: 'house1', label: 'Bolig', gridX: 3, gridY: 1, w: 32, h: 42, d: 16,
        topColor: 0xd4c4a8, leftColor: 0xb4a488, rightColor: 0x947868, zone: 'utkant' },
      { id: 'house2', label: 'Bolig', gridX: 5, gridY: 2, w: 28, h: 38, d: 14,
        topColor: 0xc8b8a0, leftColor: 0xa89878, rightColor: 0x887858, zone: 'utkant' },
      { id: 'vacant_utkant_1', label: 'TIL LEIE', gridX: 7, gridY: 2, w: 38, h: 48, d: 18,
        topColor: 0x78909a, leftColor: 0x5a7280, rightColor: 0x3c5464,
        zone: 'utkant', vacant: true, rent: 14000, footTraffic: 'lav', sqm: 120 },
      { id: 'apartment', label: 'Leiligheter', gridX: 15, gridY: 1, w: 44, h: 72, d: 22,
        topColor: 0xa0a8b8, leftColor: 0x7a8298, rightColor: 0x5a6278, zone: 'utkant' },
      { id: 'garage', label: 'Garasje', gridX: 17, gridY: 3, w: 36, h: 44, d: 18,
        topColor: 0x687480, leftColor: 0x4a5660, rightColor: 0x2c3a40, zone: 'utkant' },
      { id: 'vacant_utkant_2', label: 'TIL LEIE', gridX: 13, gridY: 3, w: 42, h: 50, d: 20,
        topColor: 0x6a7880, leftColor: 0x4c5a62, rightColor: 0x2e3c44,
        zone: 'utkant', vacant: true, rent: 11000, footTraffic: 'lav', sqm: 150 },

      // === SOUTH INDUSTRIAL (cy 15-16) ===
      { id: 'warehouse1', label: 'Lager AS', gridX: 5, gridY: 15, w: 56, h: 55, d: 24,
        topColor: 0x5a6472, leftColor: 0x3c4652, rightColor: 0x1e2832, zone: 'utkant' },
      { id: 'shipping', label: 'PostNord', gridX: 12, gridY: 15, w: 52, h: 52, d: 22,
        topColor: 0xe8d430, leftColor: 0xb8a800, rightColor: 0x887800, zone: 'utkant' },
      { id: 'office_bldg', label: 'Kontorbygg', gridX: 17, gridY: 15, w: 50, h: 70, d: 22,
        topColor: 0x748494, leftColor: 0x546474, rightColor: 0x344454, zone: 'utkant' },
    ]

    for (const def of buildings) {
      this.createBuilding(def)
    }

    const parkTrees: number[][] = [[2, 1], [2, 2], [3, 3], [4, 1], [1, 2], [19, 1], [20, 2], [18, 3], [20, 3]]
    for (const [cx, cy] of parkTrees) {
      this.drawTree(cx, cy, Math.floor(Math.random() * 3))
    }

    for (let cx = 6; cx <= 20; cx += 2) {
      if (cx !== 11) this.drawTree(cx, 4, 0)
    }

    for (let cx = 7; cx <= 16; cx += 2) {
      this.drawStreetLamp(cartToIso(cx, 8))
    }
  }

  private createBuilding(def: BuildingDef) {
    const { x, y } = cartToIso(def.gridX, def.gridY)
    const container = this.add.container(x, y)
    const depth = def.gridX + def.gridY * 2
    container.setDepth(depth)

    const { w, h, d } = def
    const colors = { top: def.topColor, left: def.leftColor, right: def.rightColor }

    const g = this.add.graphics()

    if (def.vacant) {
      g.fillStyle(colors.top, 0.7)
      g.beginPath()
      g.moveTo(0,  -h - d)
      g.lineTo(w,  -h - d + d / 2)
      g.lineTo(0,  -h)
      g.lineTo(-w, -h + d / 2)
      g.closePath()
      g.fillPath()

      g.fillStyle(colors.left, 0.7)
      g.beginPath()
      g.moveTo(-w, -h + d / 2)
      g.lineTo(0,  -h)
      g.lineTo(0,  0)
      g.lineTo(-w, d / 2)
      g.closePath()
      g.fillPath()

      g.fillStyle(colors.right, 0.7)
      g.beginPath()
      g.moveTo(w, -h - d + d / 2)
      g.lineTo(0, -h)
      g.lineTo(0, 0)
      g.lineTo(w, -d / 2)
      g.closePath()
      g.fillPath()

      g.lineStyle(2, 0x38bdf8, 0.6)
      g.strokeRect(-w, -h - d, w * 2, h + d + 10)
    } else {
      g.fillStyle(colors.top)
      g.beginPath()
      g.moveTo(0,  -h - d)
      g.lineTo(w,  -h - d + d / 2)
      g.lineTo(0,  -h)
      g.lineTo(-w, -h + d / 2)
      g.closePath()
      g.fillPath()

      g.fillStyle(colors.left)
      g.beginPath()
      g.moveTo(-w, -h + d / 2)
      g.lineTo(0,  -h)
      g.lineTo(0,  0)
      g.lineTo(-w, d / 2)
      g.closePath()
      g.fillPath()

      g.fillStyle(colors.right)
      g.beginPath()
      g.moveTo(w, -h - d + d / 2)
      g.lineTo(0, -h)
      g.lineTo(0, 0)
      g.lineTo(w, -d / 2)
      g.closePath()
      g.fillPath()

      if (h > 50) {
        g.fillStyle(0x000000, 0.4)
        const rows = Math.floor(h / 20)
        for (let r = 0; r < rows; r++) {
          const wy = -h + 15 + r * 20
          g.fillRect(6,  wy, 10, 8)
          g.fillRect(20, wy, 10, 8)
        }
      }

      g.fillStyle(0x1a1a2e, 1)
      g.fillRect(-8, -16, 16, 16)
    }

    container.add(g)

    if (def.vacant) {
      const signBg = this.add.graphics()
      signBg.fillStyle(0x1e3a5f, 0.95)
      signBg.fillRoundedRect(-30, -h - d - 28, 60, 20, 4)
      signBg.lineStyle(1, 0x38bdf8, 1)
      signBg.strokeRoundedRect(-30, -h - d - 28, 60, 20, 4)
      container.add(signBg)

      const signText = this.add.text(0, -h - d - 18, 'TIL LEIE', {
        fontSize: '10px', fontFamily: 'Outfit, sans-serif',
        color: '#38bdf8', fontStyle: 'bold',
      }).setOrigin(0.5)
      container.add(signText)
    }

    const labelText = this.add.text(0, 12, def.label, {
      fontSize: def.vacant ? '11px' : '10px',
      fontFamily: 'Outfit, sans-serif',
      color: def.vacant ? '#f1f5f9' : '#94a3b8',
      stroke: '#000000',
      strokeThickness: 2,
      align: 'center',
    }).setOrigin(0.5, 0)
    container.add(labelText)

    if (def.vacant) {
      const glow = this.add.graphics()
      glow.lineStyle(3, 0x38bdf8, 1)
      glow.strokeRect(-w, -h - d, w * 2, h + d)
      glow.setAlpha(0)
      container.add(glow)

      // No setInteractive — all hit-testing is done manually in setupInput
      this.vacantBuildings.push({
        def, worldX: x, worldY: y, glow,
        left:   x - w - 4,
        right:  x + w + 4,
        top:    y - h - d - 4,
        bottom: y + 26,
      })
    }

    return container
  }

  private drawTree(cx: number, cy: number, variant: number) {
    const { x, y } = cartToIso(cx, cy)
    const g = this.add.graphics()
    const greens = [0x15803d, 0x16a34a, 0x14532d]
    const color = greens[variant % 3]

    g.fillStyle(0x000000, 0.15)
    g.fillEllipse(x, y + 4, 18, 8)
    g.fillStyle(0x92400e)
    g.fillRect(x - 3, y - 14, 6, 16)
    g.fillStyle(color)
    g.beginPath()
    g.moveTo(x,      y - 44)
    g.lineTo(x + 18, y - 14)
    g.lineTo(x,      y - 8)
    g.lineTo(x - 18, y - 14)
    g.closePath()
    g.fillPath()
    g.fillStyle(0x22c55e, 0.5)
    g.beginPath()
    g.moveTo(x,      y - 46)
    g.lineTo(x + 10, y - 24)
    g.lineTo(x,      y - 20)
    g.lineTo(x - 10, y - 24)
    g.closePath()
    g.fillPath()

    g.setDepth(cx + cy * 2 + 1)
  }

  private drawStreetLamp(pos: { x: number; y: number }) {
    const g = this.add.graphics()
    const { x, y } = pos
    g.fillStyle(0x94a3b8)
    g.fillRect(x - 2, y - 40, 4, 40)
    g.fillStyle(0xfef3c7)
    g.fillEllipse(x, y - 40, 14, 7)
    g.fillStyle(0xfef9c3, 0.3)
    g.fillCircle(x, y - 40, 18)
    g.setDepth(10)
  }

  // ── NPCs ──────────────────────────────────────────────────────────────────
  private spawnNPCs() {
    const gagataY = 11
    for (let i = 0; i < 8; i++) {
      const startX = 7 + Math.random() * 8
      this.spawnNPC(startX, gagataY, 'gagate')
    }
    for (let i = 0; i < 5; i++) {
      const startX = 6 + Math.random() * 12
      this.spawnNPC(startX, 5, 'hoved')
    }
    for (let i = 0; i < 3; i++) {
      this.spawnNPC(Math.random() * 20, 2 + Math.random() * 3, 'utkant')
    }
  }

  private spawnNPC(startCX: number, startCY: number, zone: string) {
    const { x, y } = cartToIso(startCX, startCY)
    const container = this.add.container(x, y)
    container.setDepth(50)

    const colors = [0x38bdf8, 0xa855f7, 0xf97316, 0x22c55e, 0xff6b6b, 0xfbbf24]
    const color = colors[Math.floor(Math.random() * colors.length)]

    const body = this.add.graphics()
    body.fillStyle(0x000000, 0.2)
    body.fillEllipse(0, 9, 14, 5)
    body.fillStyle(color)
    body.fillCircle(0, 0, 7)
    body.fillStyle(0xffffff, 0.4)
    body.fillCircle(-2, -2, 3)
    container.add(body)

    const walkRadius = zone === 'gagate' ? 3 : zone === 'hoved' ? 4 : 5
    const walkFn = () => {
      const tx = startCX + (Math.random() - 0.5) * walkRadius
      const ty = startCY + (Math.random() - 0.5) * (zone === 'gagate' ? 0.8 : 1.5)
      const { x: tx2, y: ty2 } = cartToIso(
        Phaser.Math.Clamp(tx, 1, MAP_W - 1),
        Phaser.Math.Clamp(ty, 1, MAP_H - 1)
      )
      const dist = Phaser.Math.Distance.Between(container.x, container.y, tx2, ty2)
      this.tweens.add({
        targets: container,
        x: tx2, y: ty2,
        duration: dist * 15 + 800,
        ease: 'Linear',
        onComplete: walkFn,
      })
    }

    this.time.delayedCall(Math.random() * 2000, walkFn)
    this.npcs.push(container)
  }

  // ── Camera & Input ────────────────────────────────────────────────────────
  private setupCamera() {
    const center = cartToIso(11, 10)
    this.cameras.main.centerOn(center.x, center.y)
    this.cameras.main.setZoom(0.9)
  }

  private setupInput() {
    const cam = this.cameras.main
    const canvas = this.game.canvas

    this.cursors = this.input.keyboard!.createCursorKeys()

    // ── Building hover glow ───────────────────────────────────────────────────
    const hitBuildingAt = (screenX: number, screenY: number): VacantEntry | null => {
      const wp = this.cameras.main.getWorldPoint(screenX, screenY)
      for (const b of this.vacantBuildings) {
        if (wp.x >= b.left && wp.x <= b.right && wp.y >= b.top && wp.y <= b.bottom) return b
      }
      return null
    }

    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      const hit = hitBuildingAt(ptr.x, ptr.y)
      if (hit !== this.hoveredBuilding) {
        if (this.hoveredBuilding) {
          this.tweens.killTweensOf(this.hoveredBuilding.glow)
          this.tweens.add({ targets: this.hoveredBuilding.glow, alpha: 0, duration: 150 })
        }
        this.hoveredBuilding = hit
        if (hit) {
          this.tweens.add({ targets: hit.glow, alpha: 1, duration: 150 })
          canvas.style.cursor = 'pointer'
        } else {
          canvas.style.cursor = 'default'
        }
      }
    })

    // ── Building click ────────────────────────────────────────────────────────
    this.input.on('pointerdown', (ptr: Phaser.Input.Pointer) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const px = ptr.x * scaleX
      const py = ptr.y * scaleY
      const hit = hitBuildingAt(px, py)
      if (!hit) return
      this.tweens.killTweensOf(hit.glow)
      hit.glow.setAlpha(0)
      this.hoveredBuilding = null
      canvas.style.cursor = 'default'
      window.dispatchEvent(new CustomEvent('phaser:vacantClicked', {
        detail: {
          id: hit.def.id, label: hit.def.label, zone: hit.def.zone,
          rent: hit.def.rent, footTraffic: hit.def.footTraffic,
          sqm: hit.def.sqm, worldX: hit.worldX, worldY: hit.worldY,
        },
      }))
      this.cameras.main.pan(hit.worldX, hit.worldY - 60, 500, 'Power2')
    })

    // ── Scroll zoom ───────────────────────────────────────────────────────────
    this.input.on('wheel', (_p: unknown, _g: unknown, _dx: number, dy: number) => {
      cam.setZoom(Phaser.Math.Clamp(cam.zoom - dy * 0.001, 0.4, 2))
    })

    window.addEventListener('game:enterShop', (e: Event) => {
      const { worldX, worldY } = (e as CustomEvent).detail
      cam.pan(worldX, worldY - 60, 600, 'Power2')
    })
  }

  update() {
    const cam = this.cameras.main
    const speed = 6 / cam.zoom   // faster when zoomed out, slower when zoomed in
    const { left, right, up, down } = this.cursors

    if (left.isDown)  cam.scrollX -= speed
    if (right.isDown) cam.scrollX += speed
    if (up.isDown)    cam.scrollY -= speed
    if (down.isDown)  cam.scrollY += speed
  }
}
