import Phaser from 'phaser'

// ── Isometric helpers ──────────────────────────────────────────────────────────
const TILE_W = 128
const TILE_H = 64

function isoPos(col: number, row: number): { x: number; y: number } {
  return {
    x: (col - row) * (TILE_W / 2),
    y: (col + row) * (TILE_H / 2),
  }
}

// ── Vacant lot definitions ─────────────────────────────────────────────────────
// row 0-1 = utkant (north), row 2 = hovedgata, row 3 = gagata, row 4-5 = utkant (south)
const VACANT_LOTS = [
  { id: 'v1', zone: 'utkant',    row: 0, col: 2, rent: 12000, footTraffic: 'Lav',     capacity: 50,  sqm: 40,  label: 'TIL LEIE' },
  { id: 'v2', zone: 'utkant',    row: 1, col: 5, rent: 15000, footTraffic: 'Lav',     capacity: 50,  sqm: 55,  label: 'TIL LEIE' },
  { id: 'v3', zone: 'hovedgata', row: 2, col: 1, rent: 28000, footTraffic: 'Middels', capacity: 100, sqm: 75,  label: 'TIL LEIE' },
  { id: 'v4', zone: 'hovedgata', row: 2, col: 6, rent: 35000, footTraffic: 'Middels', capacity: 100, sqm: 90,  label: 'TIL LEIE' },
  { id: 'v5', zone: 'gagata',    row: 3, col: 3, rent: 55000, footTraffic: 'Høy',     capacity: 200, sqm: 120, label: 'TIL LEIE' },
  { id: 'v6', zone: 'gagata',    row: 3, col: 7, rent: 70000, footTraffic: 'Høy',     capacity: 200, sqm: 150, label: 'TIL LEIE' },
] as const

// ── Decoration building definitions ───────────────────────────────────────────
const DECO_BUILDINGS = [
  { label: 'Kafé Sentrum', emoji: '☕', row: 3, col: 1, w: 44, h: 65, d: 22, top: 0xf0c8a0, left: 0xd4a874, right: 0xb88852 },
  { label: 'Bakeri Olsen', emoji: '🥐', row: 3, col: 5, w: 44, h: 60, d: 22, top: 0xe8d4b0, left: 0xc8b48a, right: 0xa89468 },
  { label: 'DNB Bank',     emoji: '🏦', row: 2, col: 3, w: 52, h: 72, d: 24, top: 0x6b8fd4, left: 0x4a6eb8, right: 0x2a4e9c },
  { label: 'Planet Gym',   emoji: '🏋️', row: 2, col: 5, w: 48, h: 68, d: 24, top: 0x60a0e0, left: 0x3a7ab8, right: 0x1a5a98 },
  { label: 'Ristorante',   emoji: '🍝', row: 3, col: 6, w: 44, h: 65, d: 22, top: 0xf4a060, left: 0xd4804a, right: 0xb46030 },
  { label: 'Apotek 1',     emoji: '💊', row: 2, col: 7, w: 42, h: 58, d: 20, top: 0x80d4a0, left: 0x50b074, right: 0x308a50 },
  { label: 'Bolig',        emoji: '🏠', row: 0, col: 0, w: 32, h: 42, d: 16, top: 0xd4c4a8, left: 0xb4a488, right: 0x947868 },
  { label: 'Leiligheter',  emoji: '🏢', row: 1, col: 7, w: 44, h: 72, d: 22, top: 0xa0a8b8, left: 0x7a8298, right: 0x5a6278 },
] as const

// Locked buildings
const LOCKED_BUILDINGS = [
  { label: 'Nettbutikk',  unlockLevel: 7,  emoji: '🌐', row: 1, col: 3, w: 40, h: 58, d: 18 },
  { label: 'Franchise',   unlockLevel: 11, emoji: '🏬', row: 5, col: 4, w: 48, h: 68, d: 22 },
] as const

// ── Colours ─────────────────────────────────────────────────────────────────────
const TILE_COLORS = {
  grass:       { even: 0x1e3a2f, odd: 0x1a3328 },
  asphalt:     { even: 0x2d3748, odd: 0x252f3d },
  cobblestone: { even: 0x6b5a4e, odd: 0x5a4a3e },
  industrial:  { even: 0x334155, odd: 0x2d3748 },
}

// ── VacantEntry for hit-testing ────────────────────────────────────────────────
interface VacantEntry {
  id: string
  zone: string
  rent: number
  footTraffic: string
  capacity: number
  sqm: number
  worldX: number
  worldY: number
  glow: Phaser.GameObjects.Graphics
  left: number; right: number; top: number; bottom: number
}


export default class CityScene extends Phaser.Scene {
  private vacantBuildings: VacantEntry[] = []
  private hoveredBuilding: VacantEntry | null = null
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private playerLabel: Phaser.GameObjects.Text | null = null

  constructor() { super({ key: 'CityScene' }) }

  create() {
    this.cameras.main.setBackgroundColor(0x0a1628)

    this.drawGround()
    this.placeBuildings()
    this.spawnNPCs()
    this.setupCamera()
    this.setupInput()

    // Enter interior via custom event from React
    window.addEventListener('game:enterInterior', this.onEnterInterior)

    // Listen for rent events from React to update building appearance
    window.addEventListener('game:locationRented', this.onLocationRented)
  }

  shutdown() {
    window.removeEventListener('game:enterInterior', this.onEnterInterior)
    window.removeEventListener('game:locationRented', this.onLocationRented)
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  private onEnterInterior = (e: Event) => {
    const shopName = (e as CustomEvent<{ shopName: string }>).detail?.shopName ?? ''
    this.scene.start('InteriorScene', { shopName })
  }

  private onLocationRented = (e: Event) => {
    const { id, companyName } = (e as CustomEvent<{ id: string; companyName: string }>).detail ?? {}
    // Remove the "TIL LEIE" vacancy entry
    const entry = this.vacantBuildings.find(v => v.id === id)
    if (entry) {
      this.vacantBuildings = this.vacantBuildings.filter(v => v.id !== id)
      // Animate camera to the rented building
      this.cameras.main.pan(entry.worldX, entry.worldY - 40, 800, 'Power2')
      // Add company name label
      if (this.playerLabel) this.playerLabel.destroy()
      this.playerLabel = this.add.text(entry.worldX, entry.worldY + 16, `🏪 ${companyName}`, {
        fontSize: '12px', fontFamily: 'Outfit, sans-serif',
        color: '#00d4aa', stroke: '#000', strokeThickness: 2,
        fontStyle: 'bold',
      }).setOrigin(0.5, 0).setDepth(100)
    }
  }

  // ── Ground ─────────────────────────────────────────────────────────────────

  private drawGround() {
    const g = this.add.graphics().setDepth(-20)

    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 6; row++) {
        const { x, y } = isoPos(col, row)
        const even = (col + row) % 2 === 0

        let color: number
        if (row <= 1)      color = even ? TILE_COLORS.grass.even       : TILE_COLORS.grass.odd
        else if (row === 2) color = even ? TILE_COLORS.asphalt.even     : TILE_COLORS.asphalt.odd
        else if (row === 3) color = even ? TILE_COLORS.cobblestone.even : TILE_COLORS.cobblestone.odd
        else               color = even ? TILE_COLORS.industrial.even   : TILE_COLORS.industrial.odd

        g.fillStyle(color, 1)
        g.beginPath()
        g.moveTo(x,                  y - TILE_H / 2)
        g.lineTo(x + TILE_W / 2,     y)
        g.lineTo(x,                  y + TILE_H / 2)
        g.lineTo(x - TILE_W / 2,     y)
        g.closePath()
        g.fillPath()

        // Subtle grid lines
        g.lineStyle(1, 0x000000, 0.12)
        g.strokePath()
      }
    }

    // Yellow centre lines on hoofdgata (row 2)
    const lineG = this.add.graphics().setDepth(-15)
    for (let col = 0; col < 8; col++) {
      const { x, y } = isoPos(col, 2)
      if (col % 3 !== 2) {
        lineG.lineStyle(2, 0xf59e0b, 0.6)
        lineG.beginPath()
        lineG.moveTo(x - TILE_W / 4, y)
        lineG.lineTo(x + TILE_W / 4, y)
        lineG.strokePath()
      }
    }

    // Fountain in gågata centre (row 3, col 4)
    const fc = isoPos(4, 3)
    this.drawFountain(fc.x, fc.y)

    // Benches near fountain
    for (const [bc, br] of [[3, 3], [5, 3]]) {
      const bp = isoPos(bc as number, br as number)
      this.drawBench(bp.x, bp.y)
    }

    // Flower pots along gågata
    for (const [pc, pr] of [[2, 3], [6, 3]]) {
      const pp = isoPos(pc as number, pr as number)
      this.drawFlowerPot(pp.x, pp.y)
    }

    // Trees
    for (const [tc, tr] of [[0, 0], [1, 0], [0, 1], [7, 0], [7, 1]]) {
      const tp = isoPos(tc as number, tr as number)
      this.drawTree(tp.x, tp.y)
    }

    // Street lamps on hoofdgata
    for (let col = 1; col <= 6; col += 2) {
      const lp = isoPos(col, 2)
      this.drawStreetLamp(lp.x, lp.y)
    }
  }

  // ── Props ──────────────────────────────────────────────────────────────────

  private drawFountain(x: number, y: number) {
    const g = this.add.graphics().setDepth(5)
    g.lineStyle(4, 0x64748b, 1); g.strokeEllipse(x, y - 6, 40, 20)
    g.fillStyle(0x38bdf8, 0.7);  g.fillEllipse(x, y - 6, 36, 16)
    g.fillStyle(0x94a3b8, 1);    g.fillRect(x - 3, y - 18, 6, 14)
    g.fillStyle(0xbae6fd, 0.8)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      g.fillCircle(x + Math.cos(a) * 8, y - 20 + Math.sin(a) * 4, 2)
    }
  }

  private drawBench(x: number, y: number) {
    const g = this.add.graphics().setDepth(4)
    g.fillStyle(0x92400e, 1); g.fillRect(x - 12, y - 8, 24, 5)
    g.fillStyle(0x78350f, 1); g.fillRect(x - 10, y - 4, 3, 6); g.fillRect(x + 7, y - 4, 3, 6)
  }

  private drawFlowerPot(x: number, y: number) {
    const g = this.add.graphics().setDepth(4)
    g.fillStyle(0xb45309, 1); g.fillRect(x - 5, y - 4, 10, 8)
    g.fillStyle(0xfb7185, 1); g.fillCircle(x, y - 8, 6)
    g.fillStyle(0xfde68a, 1); g.fillCircle(x, y - 8, 3)
  }

  private drawTree(x: number, y: number) {
    const g = this.add.graphics().setDepth(3)
    g.fillStyle(0x000000, 0.15); g.fillEllipse(x, y + 4, 18, 8)
    g.fillStyle(0x92400e);       g.fillRect(x - 3, y - 14, 6, 16)
    g.fillStyle(0x15803d)
    g.beginPath(); g.moveTo(x, y - 44); g.lineTo(x + 18, y - 14); g.lineTo(x, y - 8); g.lineTo(x - 18, y - 14); g.closePath(); g.fillPath()
    g.fillStyle(0x22c55e, 0.5)
    g.beginPath(); g.moveTo(x, y - 46); g.lineTo(x + 10, y - 24); g.lineTo(x, y - 20); g.lineTo(x - 10, y - 24); g.closePath(); g.fillPath()
  }

  private drawStreetLamp(x: number, y: number) {
    const g = this.add.graphics().setDepth(10)
    g.fillStyle(0x94a3b8); g.fillRect(x - 2, y - 40, 4, 40)
    g.fillStyle(0xfef3c7); g.fillEllipse(x, y - 40, 14, 7)
    g.fillStyle(0xfef9c3, 0.3); g.fillCircle(x, y - 40, 18)
  }

  // ── Buildings ─────────────────────────────────────────────────────────────

  private placeBuildings() {
    // Decoration buildings
    for (const b of DECO_BUILDINGS) {
      const { x, y } = isoPos(b.col, b.row)
      this.createIsometricBox(x, y, b.w, b.h, b.d, b.top, b.left, b.right, b.row + b.col * 2)
      this.add.text(x, y + 14, `${b.emoji} ${b.label}`, {
        fontSize: '10px', fontFamily: 'Outfit, sans-serif',
        color: '#94a3b8', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5, 0).setDepth(b.row + b.col * 2 + 0.5)
    }

    // Locked buildings (greyed out)
    for (const b of LOCKED_BUILDINGS) {
      const { x, y } = isoPos(b.col, b.row)
      this.createIsometricBox(x, y, b.w, b.h, b.d, 0x444455, 0x333344, 0x222233, b.row + b.col * 2, 0.4)
      this.add.text(x, y - b.h / 2 - 8, `🔒 Lv${b.unlockLevel}`, {
        fontSize: '11px', fontFamily: 'Outfit, sans-serif',
        color: '#666677', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5).setDepth(b.row + b.col * 2 + 1)
    }

    // Vacant lots
    for (const lot of VACANT_LOTS) {
      const { x, y } = isoPos(lot.col, lot.row)
      const depth = lot.row + lot.col * 2

      const w = 46, h = 62, d = 22
      this.createIsometricBox(x, y, w, h, d, 0x667788, 0x4a5a68, 0x304050, depth, 0.7)

      // TIL LEIE sign
      const signBg = this.add.graphics().setDepth(depth + 1)
      signBg.fillStyle(0x1e3a5f, 0.95)
      signBg.fillRoundedRect(x - 32, y - h - d - 30, 64, 22, 4)
      signBg.lineStyle(1.5, 0x38bdf8, 1)
      signBg.strokeRoundedRect(x - 32, y - h - d - 30, 64, 22, 4)

      this.add.text(x, y - h - d - 19, 'TIL LEIE', {
        fontSize: '11px', fontFamily: 'Outfit, sans-serif',
        color: '#38bdf8', fontStyle: 'bold',
      }).setOrigin(0.5).setDepth(depth + 2)

      this.add.text(x, y + 14, `${lot.footTraffic} trafikk`, {
        fontSize: '10px', fontFamily: 'Outfit, sans-serif',
        color: '#64748b', stroke: '#000', strokeThickness: 1,
      }).setOrigin(0.5, 0).setDepth(depth + 0.5)

      // Hover glow
      const glow = this.add.graphics().setDepth(depth + 1.5)
      glow.lineStyle(3, 0x38bdf8, 1)
      glow.strokeRect(x - w, y - h - d, w * 2, h + d)
      glow.setAlpha(0)

      this.vacantBuildings.push({
        id: lot.id, zone: lot.zone, rent: lot.rent,
        footTraffic: lot.footTraffic, capacity: lot.capacity, sqm: lot.sqm,
        worldX: x, worldY: y, glow,
        left:   x - w - 4,
        right:  x + w + 4,
        top:    y - h - d - 4,
        bottom: y + 28,
      })
    }
  }

  private createIsometricBox(
    x: number, y: number, w: number, h: number, d: number,
    topColor: number, leftColor: number, rightColor: number,
    depth: number, alpha = 1
  ) {
    const g = this.add.graphics().setDepth(depth).setAlpha(alpha)

    // Top face
    g.fillStyle(topColor)
    g.beginPath()
    g.moveTo(x,    y - h - d)
    g.lineTo(x + w, y - h - d + d / 2)
    g.lineTo(x,    y - h)
    g.lineTo(x - w, y - h + d / 2)
    g.closePath(); g.fillPath()

    // Left face
    g.fillStyle(leftColor)
    g.beginPath()
    g.moveTo(x - w, y - h + d / 2)
    g.lineTo(x,     y - h)
    g.lineTo(x,     y)
    g.lineTo(x - w, y + d / 2)
    g.closePath(); g.fillPath()

    // Right face
    g.fillStyle(rightColor)
    g.beginPath()
    g.moveTo(x + w, y - h - d + d / 2)
    g.lineTo(x,     y - h)
    g.lineTo(x,     y)
    g.lineTo(x + w, y - d / 2)
    g.closePath(); g.fillPath()

    // Windows on taller buildings
    if (h > 50) {
      g.fillStyle(0x000000, 0.35)
      const rows = Math.floor(h / 20)
      for (let r = 0; r < rows; r++) {
        const wy = -h + 15 + r * 20
        g.fillRect(x + 6,  y + wy, 10, 8)
        g.fillRect(x + 20, y + wy, 10, 8)
      }
    }

    // Door
    g.fillStyle(0x1a1a2e, 1)
    g.fillRect(x - 8, y - 16, 16, 16)
  }

  // ── NPCs ─────────────────────────────────────────────────────────────────

  private spawnNPCs() {
    const COLS = 8
    const npcColors = [0x38bdf8, 0xa855f7, 0xf97316, 0x22c55e, 0xff6b6b, 0xfbbf24]

    // Gågata: 10 NPCs
    for (let i = 0; i < 10; i++) {
      const startCol = 1 + Math.random() * 6
      this.spawnNPC(startCol, 3, npcColors[i % npcColors.length], 'gagata')
    }
    // Hoofdgata: 5 NPCs
    for (let i = 0; i < 5; i++) {
      const startCol = Math.random() * (COLS - 2)
      this.spawnNPC(startCol, 2, npcColors[(i + 2) % npcColors.length], 'hoved')
    }
    // Utkant: 3 NPCs
    for (let i = 0; i < 3; i++) {
      this.spawnNPC(Math.random() * COLS, Math.random() * 2, npcColors[(i + 4) % npcColors.length], 'utkant')
    }
  }

  private spawnNPC(startCol: number, startRow: number, color: number, zone: string) {
    const startPos = isoPos(startCol, startRow)
    const container = this.add.container(startPos.x, startPos.y).setDepth(60)

    const body = this.add.graphics()
    body.fillStyle(0x000000, 0.2); body.fillEllipse(0, 9, 14, 5)
    body.fillStyle(color);         body.fillCircle(0, 0, 7)
    body.fillStyle(0xffffff, 0.4); body.fillCircle(-2, -2, 3)
    container.add(body)

    const walkRadius = zone === 'gagata' ? 2 : zone === 'hoved' ? 3 : 4
    const rowVariance = zone === 'gagata' ? 0.5 : 1.0

    const walk = () => {
      const tc = Phaser.Math.Clamp(startCol + (Math.random() - 0.5) * walkRadius * 2, 0, 7)
      const tr = Phaser.Math.Clamp(startRow + (Math.random() - 0.5) * rowVariance, 0, 5)
      const { x, y } = isoPos(tc, tr)
      const dist = Phaser.Math.Distance.Between(container.x, container.y, x, y)
      this.tweens.add({
        targets: container, x, y,
        duration: dist * 14 + 600, ease: 'Linear',
        onComplete: walk,
      })
    }
    this.time.delayedCall(Math.random() * 2000, walk)
  }

  // ── Camera & Input ─────────────────────────────────────────────────────────

  private setupCamera() {
    // Centre on gågata (row 3, midpoint of 8 cols)
    const centre = isoPos(4, 3)
    this.cameras.main.centerOn(centre.x, centre.y - 40)
    this.cameras.main.setZoom(1.1)
  }

  private setupInput() {
    const cam   = this.cameras.main
    const canvas = this.game.canvas

    this.cursors = this.input.keyboard!.createCursorKeys()

    // Hit-test helper
    const hitAt = (screenX: number, screenY: number): VacantEntry | null => {
      if (window.__OVERLAY_OPEN__) return null
      const wp = cam.getWorldPoint(screenX, screenY)
      for (const b of this.vacantBuildings) {
        if (wp.x >= b.left && wp.x <= b.right && wp.y >= b.top && wp.y <= b.bottom) return b
      }
      return null
    }

    // Hover glow
    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (window.__OVERLAY_OPEN__) return
      const hit = hitAt(ptr.x, ptr.y)
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

    // Click vacant lot
    this.input.on('pointerdown', (ptr: Phaser.Input.Pointer) => {
      if (window.__OVERLAY_OPEN__) return
      const hit = hitAt(ptr.x, ptr.y)
      if (!hit) return

      // Hide glow
      this.tweens.killTweensOf(hit.glow)
      hit.glow.setAlpha(0)
      this.hoveredBuilding = null
      canvas.style.cursor = 'default'

      // Pan to building
      this.cameras.main.pan(hit.worldX, hit.worldY - 60, 500, 'Power2')

      // Emit event to React
      window.dispatchEvent(new CustomEvent('phaser:vacantClicked', {
        detail: {
          id: hit.id, label: 'TIL LEIE', zone: hit.zone,
          rent: hit.rent, footTraffic: hit.footTraffic,
          sqm: hit.sqm, capacity: hit.capacity,
          worldX: hit.worldX, worldY: hit.worldY,
        },
      }))
    })

    // Scroll zoom
    this.input.on('wheel', (_p: unknown, _g: unknown, _dx: number, dy: number) => {
      if (window.__OVERLAY_OPEN__) return
      cam.setZoom(Phaser.Math.Clamp(cam.zoom - dy * 0.001, 0.5, 2.0))
    })
  }

  // ── Update loop (arrow key camera) ────────────────────────────────────────

  update() {
    if (window.__OVERLAY_OPEN__) return
    const cam = this.cameras.main
    const speed = 6 / cam.zoom
    const { left, right, up, down } = this.cursors
    if (left.isDown)  cam.scrollX -= speed
    if (right.isDown) cam.scrollX += speed
    if (up.isDown)    cam.scrollY -= speed
    if (down.isDown)  cam.scrollY += speed
  }
}
