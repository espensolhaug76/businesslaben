import Phaser from 'phaser'

// ── Slot-typer ────────────────────────────────────────────────────────────────

type SlotType = 'mobler' | 'hyller' | 'dekor'
type Placement = 'wall' | 'floor'

interface ShopSlot {
  label: string
  type: SlotType
  placement: Placement
  icon: string
  w: number
  h: number
}

// ── Farger ────────────────────────────────────────────────────────────────────

const SLOT_COLORS: Record<SlotType, { fill: number; border: number; text: string }> = {
  mobler: { fill: 0x607d8b, border: 0x37474f, text: '#e8f4f8' },
  hyller: { fill: 0x795548, border: 0x3e2723, text: '#fbe9e7' },
  dekor:  { fill: 0x388e3c, border: 0x1b5e20, text: '#e8f5e9' },
}

// ── Bransjespesifikke layouts ──────────────────────────────────────────────────

const LAYOUTS: Record<string, ShopSlot[]> = {
  cafe: [
    { label: 'Meny-tavle',   type: 'dekor',  placement: 'wall',  icon: '📋', w: 65,  h: 75  },
    { label: 'Kafé-hylle',   type: 'hyller', placement: 'wall',  icon: '🥐', w: 85,  h: 60  },
    { label: 'Kafédisk',     type: 'mobler', placement: 'floor', icon: '☕', w: 110, h: 68  },
    { label: 'Bord/stoler',  type: 'mobler', placement: 'floor', icon: '🪑', w: 80,  h: 82  },
  ],
  fashion: [
    { label: 'Vegghylle',    type: 'hyller', placement: 'wall',  icon: '👗', w: 110, h: 62  },
    { label: 'Speil',        type: 'dekor',  placement: 'wall',  icon: '🪞', w: 48,  h: 88  },
    { label: 'Stativ (v)',   type: 'mobler', placement: 'floor', icon: '👔', w: 58,  h: 105 },
    { label: 'Mannekeng',    type: 'dekor',  placement: 'floor', icon: '🧍', w: 48,  h: 98  },
    { label: 'Stativ (h)',   type: 'mobler', placement: 'floor', icon: '👕', w: 58,  h: 105 },
    { label: 'Prøverom',     type: 'dekor',  placement: 'floor', icon: '🚪', w: 68,  h: 112 },
  ],
  tech: [
    { label: 'Vegghylle',    type: 'hyller', placement: 'wall',  icon: '📱', w: 135, h: 58  },
    { label: 'Demo-bord',    type: 'mobler', placement: 'floor', icon: '💻', w: 105, h: 68  },
    { label: 'Demo-stasjon', type: 'mobler', placement: 'floor', icon: '🖥️', w: 80,  h: 88  },
    { label: 'Kasse',        type: 'dekor',  placement: 'floor', icon: '💳', w: 68,  h: 62  },
  ],
  sports: [
    { label: 'Vegg-rack',    type: 'mobler', placement: 'wall',  icon: '🏋️', w: 145, h: 62  },
    { label: 'Gulvdisplay',  type: 'hyller', placement: 'floor', icon: '⚽', w: 90,  h: 88  },
    { label: 'Sykkelstativ', type: 'dekor',  placement: 'floor', icon: '🚲', w: 105, h: 92  },
    { label: 'Klær-stativ',  type: 'mobler', placement: 'floor', icon: '🧥', w: 62,  h: 108 },
  ],
}

// ── Lager fyllingsgrad ─────────────────────────────────────────────────────────

function stockLvl(fill: number): { color: number; label: string; tc: string } {
  if (fill <= 0.33) return { color: 0xf5e6c8, label: 'TOM',      tc: '#92400e' }
  if (fill <= 0.66) return { color: 0x8d6e63, label: 'HALVFULL', tc: '#ffffff' }
  return                   { color: 0x3e2723, label: 'FULL',     tc: '#ffffff' }
}

// ── Scene ─────────────────────────────────────────────────────────────────────

export default class InteriorScene extends Phaser.Scene {
  private shopName        = 'Din butikk'
  private industry        = 'fashion'
  private totalStock      = 0
  private storageCapacity = 100

  constructor() { super({ key: 'InteriorScene' }) }

  init(data: { shopName?: string; industry?: string; totalStock?: number; storageCapacity?: number }) {
    this.shopName        = data.shopName        ?? 'Din butikk'
    this.industry        = data.industry        ?? 'fashion'
    this.totalStock      = data.totalStock      ?? 0
    this.storageCapacity = data.storageCapacity ?? 100
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height

    // ── Romgeometri ──────────────────────────────────────────────────────────
    const mg  = 20           // ytre marg
    const dw  = 20           // skillevegg-bredde
    const usW = W - mg * 2 - dw * 2
    const oW  = Math.floor(usW * 0.25)
    const wW  = Math.floor(usW * 0.25)
    const sW  = usW - oW - wW

    const oX = mg
    const sX = oX + oW + dw
    const wX = sX + sW + dw

    const rY     = 65
    const rH     = H - 110
    const wallH  = Math.floor(rH * 0.60)
    const floorH = rH - wallH
    const hY     = rY + wallH     // horisontlinje

    this.cameras.main.setBackgroundColor(0x2c1e14)

    this.drawTopBanner(W)
    this.drawOfficeRoom(oX, oW, rY, wallH, floorH, hY)
    this.drawSalesFloor(sX, sW, rY, wallH, floorH, hY)
    this.drawWarehouse(wX, wW, rY, wallH, floorH, hY)
    this.drawDividers(oX + oW, sX + sW, rY, rH, dw)
    this.drawBaseboard(W, H, rY + rH)
    this.addRoomLabels(oX, oW, sX, sW, wX, wW, hY)
    this.spawnCustomers(sX, sW, H)
    this.addBackButton()
  }

  // ── Tegnehjelpere ─────────────────────────────────────────────────────────

  /** Tegner bakvegg + gulv med perspektivstriper */
  private roomBg(
    g: Phaser.GameObjects.Graphics,
    rx: number, ry: number, rw: number,
    wallH: number, floorH: number,
    wallCol: number, floorCol: number, stripeCol: number
  ) {
    // Bakvegg
    g.fillStyle(wallCol)
    g.fillRect(rx, ry, rw, wallH)
    // Subtile panel-linjer
    g.lineStyle(1, 0x000000, 0.04)
    for (let lx = rx + 36; lx < rx + rw - 10; lx += 36) {
      g.lineBetween(lx, ry, lx, ry + wallH)
    }

    // Gulv
    g.fillStyle(floorCol)
    g.fillRect(rx, ry + wallH, rw, floorH)

    // Perspektivstriper på gulv (tettere nær horisonten)
    for (let i = 1; i <= 10; i++) {
      const t   = (i / 10) ** 1.8
      const ly  = ry + wallH + Math.floor(t * floorH)
      const alp = 0.06 + t * 0.10
      g.lineStyle(1, stripeCol, alp)
      g.lineBetween(rx, ly, rx + rw, ly)
    }

    // Horisontskyggekant
    g.fillStyle(0x000000, 0.12)
    g.fillRect(rx, ry + wallH - 4, rw, 8)
  }

  /** Tegner én slot-boks med skygge, ikon og etikett */
  private slotBox(
    g: Phaser.GameObjects.Graphics,
    sx: number, sy: number, sw: number, sh: number,
    fc: number, bc: number, icon: string, label: string, tc: string,
    depth: number
  ) {
    g.fillStyle(0x000000, 0.16)
    g.fillEllipse(sx + sw / 2, sy + sh + 3, sw * 0.75, 7)

    g.fillStyle(fc, 0.88)
    g.fillRoundedRect(sx, sy, sw, sh, 5)
    g.lineStyle(2, bc, 0.8)
    g.strokeRoundedRect(sx, sy, sw, sh, 5)

    this.add.text(sx + sw / 2, sy + sh / 2 - 10, icon, { fontSize: '20px' })
      .setOrigin(0.5).setDepth(depth + 1)

    this.add.text(sx + sw / 2, sy + sh / 2 + 11, label, {
      fontSize: '9px', fontFamily: 'Outfit, sans-serif',
      color: tc, fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(depth + 1)
  }

  /** Fordeler en rad med slots jevnt i tilgjengelig bredde */
  private layoutRow(
    g: Phaser.GameObjects.Graphics,
    slots: ShopSlot[],
    areaX: number, areaW: number,
    topY: number, depth: number
  ) {
    if (!slots.length) return
    const totalW = slots.reduce((s, sl) => s + sl.w, 0)
    const gap    = Math.max(6, (areaW - totalW) / (slots.length + 1))
    let cx = areaX + gap

    for (const sl of slots) {
      const c = SLOT_COLORS[sl.type]
      this.slotBox(g, cx, topY, sl.w, sl.h, c.fill, c.border, sl.icon, sl.label, c.text, depth)
      cx += sl.w + gap
    }
  }

  // ── Topp-banner ───────────────────────────────────────────────────────────

  private drawTopBanner(W: number) {
    const g = this.add.graphics().setDepth(20)
    g.fillStyle(0x1e3a5f)
    g.fillRect(0, 0, W, 60)
    g.lineStyle(2, 0x2d5a9e, 0.6)
    g.lineBetween(0, 60, W, 60)
    this.add.text(W / 2, 30, this.shopName, {
      fontSize: '22px', fontFamily: 'Outfit, sans-serif',
      color: '#f1f5f9', fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(21)
  }

  // ── KONTOR ────────────────────────────────────────────────────────────────

  private drawOfficeRoom(
    rx: number, rw: number, ry: number,
    wallH: number, floorH: number, hY: number
  ) {
    const g = this.add.graphics().setDepth(5)
    this.roomBg(g, rx, ry, rw, wallH, floorH, 0xede0c4, 0x9a7040, 0x7a5228)

    const mid = rx + rw / 2
    const D   = 7   // tekst-depth

    // ── VEGG-objekter ──

    // Whiteboard (midtre bakvegg)
    const wbX = mid - 36, wbY = ry + 18, wbW = 72, wbH = 52
    g.fillStyle(0xf7f5ee)
    g.fillRoundedRect(wbX, wbY, wbW, wbH, 3)
    g.lineStyle(2, 0x4a4a4a)
    g.strokeRoundedRect(wbX, wbY, wbW, wbH, 3)
    // Håndskrift-linjer
    g.lineStyle(1, 0x38bdf8, 0.7)
    for (let i = 0; i < 3; i++) {
      const ly = wbY + 16 + i * 10
      g.lineBetween(wbX + 8, ly, wbX + wbW - (i === 1 ? 20 : 8), ly)
    }
    this.add.text(mid, wbY + wbH + 7, 'Whiteboard', {
      fontSize: '8px', fontFamily: 'Outfit', color: '#64748b',
    }).setOrigin(0.5).setDepth(D)

    // Kaffemaskin (øvre høyre hjørne)
    const cmX = rx + rw - 34, cmY = ry + 16
    g.fillStyle(0x1e293b)
    g.fillRoundedRect(cmX, cmY, 28, 42, 4)
    g.fillStyle(0xc0c0c0)
    g.fillRoundedRect(cmX + 4, cmY + 4, 20, 20, 3)
    g.fillStyle(0x38bdf8, 0.5)
    g.fillCircle(cmX + 14, cmY + 14, 6)
    g.fillStyle(0x475569)
    g.fillRect(cmX + 8, cmY + 30, 12, 8)
    this.add.text(cmX + 14, cmY + 50, 'Kaffe', {
      fontSize: '7px', fontFamily: 'Outfit', color: '#64748b',
    }).setOrigin(0.5).setDepth(D)

    // Bokhylle (venstre bakvegg)
    const bsX = rx + 7, bsY = ry + 18, bsW = 24, bsH = 58
    g.fillStyle(0x7c5030)
    g.fillRect(bsX, bsY, bsW, bsH)
    for (let i = 0; i < 4; i++) {
      g.fillStyle(i % 2 === 0 ? 0x3b82f6 : 0xef4444, 0.9)
      g.fillRect(bsX + 2, bsY + 4 + i * 13, bsW - 4, 9)
    }
    this.add.text(bsX + bsW / 2, bsY + bsH + 7, 'Hylle', {
      fontSize: '7px', fontFamily: 'Outfit', color: '#64748b',
    }).setOrigin(0.5).setDepth(D)

    // ── GULV-objekter ──

    // Plante (nede til venstre)
    const plX = rx + 5, plY = hY + floorH - 55
    g.fillStyle(0x7c5030)
    g.fillRect(plX + 6, plY + 20, 14, 22)
    g.fillStyle(0x2d6a4f)
    g.fillEllipse(plX + 13, plY + 18, 26, 18)
    g.fillEllipse(plX + 13, plY + 8,  20, 15)
    g.fillEllipse(plX + 13, plY,      14, 12)
    this.add.text(plX + 13, plY + 48, 'Plante', {
      fontSize: '7px', fontFamily: 'Outfit', color: '#64748b',
    }).setOrigin(0.5).setDepth(D)

    // Stol (bak pulten)
    const chX = mid - 17, chY = hY + 12
    g.fillStyle(0x374151)
    g.fillEllipse(chX + 17, chY + 8, 34, 15)
    g.fillRect(chX + 3,  chY + 8, 28, 18)
    g.fillRect(chX + 3,  chY - 2,  6, 12)
    g.fillRect(chX + 23, chY - 2,  6, 12)
    g.fillStyle(0x1f2937)
    g.fillRect(chX + 11, chY + 25, 12, 14)
    this.add.text(mid, chY + 44, 'Stol', {
      fontSize: '7px', fontFamily: 'Outfit', color: '#64748b',
    }).setOrigin(0.5).setDepth(D)

    // ── PULT (klikkbar → dashboard) ──
    const dkX = rx + 8, dkY = hY + 50, dkW = rw - 16, dkH = 38
    g.fillStyle(0x6b4423)
    g.fillRoundedRect(dkX, dkY, dkW, dkH, 4)
    g.fillStyle(0x8b5e3c, 0.6)
    g.fillRoundedRect(dkX + 2, dkY + 2, dkW - 4, 16, 3)
    // Ben
    g.fillStyle(0x4e3420)
    g.fillRect(dkX + 6,       dkY + dkH, 8, 12)
    g.fillRect(dkX + dkW - 14,dkY + dkH, 8, 12)
    this.add.text(mid, dkY + dkH / 2 + 3, 'Pult', {
      fontSize: '8px', fontFamily: 'Outfit', color: '#fde8c8',
    }).setOrigin(0.5).setDepth(D)

    // Skjerm på pulten
    const mnX = mid - 22, mnY = dkY - 32
    const monBg = this.add.graphics().setDepth(D + 2)
    monBg.fillStyle(0x1e293b)
    monBg.fillRoundedRect(mnX, mnY, 44, 28, 3)
    monBg.fillStyle(0x38bdf8, 0.35)
    monBg.fillRoundedRect(mnX + 3, mnY + 3, 38, 20, 2)
    monBg.fillStyle(0x334155)
    monBg.fillRect(mnX + 17, mnY + 28, 10, 6)
    monBg.fillRect(mnX + 9,  mnY + 34, 26, 4)

    monBg.setInteractive(
      new Phaser.Geom.Rectangle(mnX - 3, mnY - 3, 50, 38),
      Phaser.Geom.Rectangle.Contains
    )
    monBg.on('pointerover', () => { this.input.setDefaultCursor('pointer'); monBg.setAlpha(1.25) })
    monBg.on('pointerout',  () => { this.input.setDefaultCursor('default'); monBg.setAlpha(1) })
    monBg.on('pointerdown', () => {
      if (!window.__OVERLAY_OPEN__) {
        window.dispatchEvent(new CustomEvent('phaser:open-dashboard'))
      }
    })
    this.add.text(mid, mnY - 8, '💻 Klikk for dashboard', {
      fontSize: '8px', fontFamily: 'Outfit', color: '#64748b',
    }).setOrigin(0.5).setDepth(D + 3)
  }

  // ── BUTIKKLOKALE ──────────────────────────────────────────────────────────

  private drawSalesFloor(
    rx: number, rw: number, ry: number,
    wallH: number, floorH: number, hY: number
  ) {
    const g = this.add.graphics().setDepth(5)
    this.roomBg(g, rx, ry, rw, wallH, floorH, 0xd4dde6, 0xc08850, 0x9a6428)

    const slots      = LAYOUTS[this.industry] ?? LAYOUTS['fashion']
    const wallSlots  = slots.filter(s => s.placement === 'wall')
    const floorSlots = slots.filter(s => s.placement === 'floor')

    // Vegg-objekter: hengt på bakveggen, justert mot horisonten
    if (wallSlots.length) {
      const maxWH = Math.max(...wallSlots.map(s => s.h))
      const wallObjY = hY - 14 - maxWH
      this.layoutRow(g, wallSlots, rx + 8, rw - 16, wallObjY, 7)
    }

    // Gulv-objekter: stående på gulvet rett bak disken
    if (floorSlots.length) {
      const floorObjY = hY + 14
      this.layoutRow(g, floorSlots, rx + 8, rw - 16, floorObjY, 8)
    }

    // Kassedisk (foran, mot gulvet)
    const cX = rx + rw / 2 - 55, cY = hY + floorH - 68
    g.fillStyle(0x7c4e2e)
    g.fillRoundedRect(cX, cY, 110, 24, 4)
    g.fillStyle(0x5a3620)
    g.fillRect(cX, cY + 24, 110, 8)
    g.fillStyle(0x1e293b)
    g.fillRect(cX + 38, cY - 16, 30, 18)
    g.fillStyle(0x38bdf8, 0.5)
    g.fillRect(cX + 41, cY - 13, 24, 12)
    this.add.text(rx + rw / 2, cY + 12, 'Kasse', {
      fontSize: '9px', fontFamily: 'Outfit', color: '#fde8c8',
    }).setOrigin(0.5).setDepth(9)

    // Inngang/dør
    const dX = rx + rw / 2 - 22, dY = hY + floorH - 30
    g.fillStyle(0x1a2744)
    g.fillRect(dX, dY - 44, 44, 44)
    g.fillStyle(0x2d4a6e)
    g.fillRect(dX + 2, dY - 42, 40, 40)
    g.fillStyle(0xfbbf24)
    g.fillCircle(dX + 32, dY - 22, 4)
    g.fillStyle(0x22c55e)
    g.fillRect(dX + 8, dY - 63, 28, 14)
    this.add.text(dX + 22, dY - 57, 'ÅPENT', {
      fontSize: '7px', fontFamily: 'Outfit', color: '#fff', fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(9)

    const z = this.add.zone(rx + rw / 2, ry + (wallH + floorH) / 2, rw, wallH + floorH)
    z.setInteractive()
    z.on('pointerdown', () => window.dispatchEvent(new CustomEvent('phaser:roomClicked', { detail: 'shop' })))
    z.on('pointerover', () => this.input.setDefaultCursor('pointer'))
    z.on('pointerout',  () => this.input.setDefaultCursor('default'))
  }

  // ── LAGER ─────────────────────────────────────────────────────────────────

  private drawWarehouse(
    rx: number, rw: number, ry: number,
    wallH: number, floorH: number, hY: number
  ) {
    const g = this.add.graphics().setDepth(5)
    this.roomBg(g, rx, ry, rw, wallH, floorH, 0xb8b8b8, 0x7a7a7a, 0x505050)

    const fill = this.storageCapacity > 0
      ? Math.min(1, this.totalStock / this.storageCapacity) : 0
    const fillPct = Math.round(fill * 100)

    // Bakdør
    const bdX = rx + rw / 2 - 18, bdY = ry + wallH - 54
    g.fillStyle(0x4a4a4a)
    g.fillRect(bdX, bdY, 36, 50)
    g.fillStyle(0x5c5c5c)
    g.fillRect(bdX + 2, bdY + 2, 32, 46)
    g.fillStyle(0xfbbf24)
    g.fillCircle(bdX + 28, bdY + 26, 3)
    this.add.text(rx + rw / 2, bdY - 8, 'BAKDØR', {
      fontSize: '8px', fontFamily: 'Outfit', color: '#94a3b8',
    }).setOrigin(0.5).setDepth(7)

    // ── 3 lagerreoler på gulvet ──
    const nShelves  = 3
    const shW = Math.min(72, Math.floor((rw - 24) / nShelves) - 10)
    const shH = Math.min(175, floorH - 24)
    const totalW = nShelves * shW + (nShelves - 1) * 10
    let shX = rx + Math.floor((rw - totalW) / 2)
    const shY = hY + floorH - shH - 6   // bunnen hviler på gulvet

    for (let r = 0; r < nShelves; r++) {
      // Vertikale stolper
      g.fillStyle(0x37474f)
      g.fillRect(shX,          shY, 6, shH)
      g.fillRect(shX + shW - 6, shY, 6, shH)
      // Bunnsokkel
      g.fillStyle(0x263238)
      g.fillRect(shX - 3, shY + shH - 5, shW + 6, 5)
      // Topp-bjelke
      g.fillRect(shX - 3, shY, shW + 6, 5)

      // 4 hyllenivåer
      const lvlH  = Math.floor((shH - 14) / 4)
      const inner = shW - 14

      for (let lv = 0; lv < 4; lv++) {
        const lY  = shY + 6 + lv * lvlH
        const lX  = shX + 7

        // Hylleboard (mørk stripe under innholdet)
        g.fillStyle(0x455a64)
        g.fillRect(lX - 2, lY + lvlH - 7, inner + 4, 6)

        // Innholds-rektangel farget etter fyllingsgrad
        const lvl = stockLvl(fill)
        g.fillStyle(lvl.color, 0.92)
        g.fillRect(lX, lY + 3, inner, lvlH - 10)
        g.lineStyle(1, 0x00000033)
        g.strokeRect(lX, lY + 3, inner, lvlH - 10)

        // Status-etikett
        this.add.text(lX + inner / 2, lY + 3 + (lvlH - 10) / 2, lvl.label, {
          fontSize: '7px', fontFamily: 'Outfit, sans-serif',
          color: lvl.tc, fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(8)
      }

      shX += shW + 10
    }

    // Lagerstatus-bar
    const barX = rx + 8, barY = hY + 8, barW = rw - 16
    this.add.text(rx + rw / 2, barY - 11, `Lagerstatus: ${fillPct}%`, {
      fontSize: '9px', fontFamily: 'Outfit', color: '#94a3b8',
    }).setOrigin(0.5).setDepth(8)
    g.fillStyle(0xd1c4b0)
    g.fillRoundedRect(barX, barY, barW, 9, 3)
    if (fill > 0) {
      const fc = fill <= 0.33 ? 0x22c55e : fill <= 0.66 ? 0xf97316 : 0xef4444
      g.fillStyle(fc)
      g.fillRoundedRect(barX, barY, Math.max(6, barW * fill), 9, 3)
    }

    const z = this.add.zone(rx + rw / 2, ry + (wallH + floorH) / 2, rw, wallH + floorH)
    z.setInteractive()
    z.on('pointerdown', () => window.dispatchEvent(new CustomEvent('phaser:roomClicked', { detail: 'warehouse' })))
    z.on('pointerover', () => this.input.setDefaultCursor('pointer'))
    z.on('pointerout',  () => this.input.setDefaultCursor('default'))
  }

  // ── Skillevegger mellom rom ────────────────────────────────────────────────

  private drawDividers(d1X: number, d2X: number, ry: number, rH: number, dw: number) {
    const g = this.add.graphics().setDepth(15)
    g.fillStyle(0x4a3020)
    g.fillRect(d1X, ry, dw, rH)
    g.fillRect(d2X, ry, dw, rH)
    // Lyspunktkant (venstre side)
    g.fillStyle(0xffffff, 0.07)
    g.fillRect(d1X, ry, 3, rH)
    g.fillRect(d2X, ry, 3, rH)
    // Skygge (høyre side)
    g.fillStyle(0x000000, 0.20)
    g.fillRect(d1X + dw - 4, ry, 4, rH)
    g.fillRect(d2X + dw - 4, ry, 4, rH)
  }

  // ── Gateplan ──────────────────────────────────────────────────────────────

  private drawBaseboard(W: number, H: number, baseY: number) {
    const g = this.add.graphics().setDepth(20)
    g.fillStyle(0x3a2818)
    g.fillRect(0, baseY, W, 7)
    g.fillStyle(0x263040)
    g.fillRect(0, baseY + 7, W, H - baseY - 7)
    g.lineStyle(2, 0x4a5a6a, 0.5)
    g.lineBetween(0, baseY + 7, W, baseY + 7)
  }

  // ── Rom-etiketter (på horisonten) ─────────────────────────────────────────

  private addRoomLabels(
    oX: number, oW: number,
    sX: number, sW: number,
    wX: number, wW: number,
    hY: number
  ) {
    const y = hY - 6
    const industryName: Record<string, string> = {
      cafe: 'KAFÉ', fashion: 'KLESBUTIKK', tech: 'TECH-BUTIKK', sports: 'SPORTSBUTIKK',
    }
    const items = [
      { x: oX + oW / 2, t: 'KONTOR' },
      { x: sX + sW / 2, t: industryName[this.industry] ?? 'BUTIKK' },
      { x: wX + wW / 2, t: 'LAGER' },
    ]
    for (const { x, t } of items) {
      this.add.text(x, y, t, {
        fontSize: '10px', fontFamily: 'Outfit, sans-serif',
        color: '#94a3b8', fontStyle: 'bold', letterSpacing: 2,
      }).setOrigin(0.5).setDepth(18)
    }
  }

  // ── Kundeanimasjon ────────────────────────────────────────────────────────

  private spawnCustomers(sX: number, sW: number, H: number) {
    const dx = sX + sW / 2, dy = H - 45
    for (let i = 0; i < 2; i++) {
      this.time.delayedCall(i * 2800, () => this.spawnNPC(dx + (i - 0.5) * 20, dy, sX, sW, H))
    }
  }

  private spawnNPC(sx: number, sy: number, roomX: number, roomW: number, H: number) {
    const col = [0x38bdf8, 0xa855f7, 0xf97316][Math.floor(Math.random() * 3)]
    const g   = this.add.graphics().setDepth(25)
    g.fillStyle(col);         g.fillCircle(0, 0, 8)
    g.fillStyle(0xffffff, 0.5); g.fillCircle(-2, -3, 3)
    g.setPosition(sx, sy)

    const shX = roomX + roomW - 60 + Math.random() * 40
    const shY = H - 155 - Math.random() * 70
    const cX  = roomX + roomW / 2 + (Math.random() - 0.5) * 30
    const cY  = H - 100

    this.tweens.chain({
      targets: g,
      tweens: [
        { x: sx,  y: H - 80,  duration: 600 },
        { x: shX, y: shY,     duration: 1100, ease: 'Power1' },
        { x: shX, y: shY,     duration: 1400 },
        { x: cX,  y: cY,      duration: 750 },
        { x: cX,  y: cY,      duration: 700 },
        {
          x: sx, y: sy + 30, duration: 650,
          onComplete: () => {
            const t = this.add.text(cX, cY - 20, '+499 kr', {
              fontSize: '14px', fontFamily: 'Outfit', color: '#22c55e', fontStyle: 'bold',
              stroke: '#000', strokeThickness: 2,
            }).setOrigin(0.5).setDepth(30)
            this.tweens.add({
              targets: t, y: cY - 60, alpha: 0, duration: 1100,
              onComplete: () => t.destroy(),
            })
            g.destroy()
            this.time.delayedCall(2500 + Math.random() * 3000, () => {
              this.spawnNPC(sx, sy, roomX, roomW, H)
            })
          },
        },
      ],
    })
  }

  // ── Tilbake-knapp ─────────────────────────────────────────────────────────

  private addBackButton() {
    const btn = this.add.text(20, 15, '← Tilbake til byen', {
      fontSize: '14px', fontFamily: 'Outfit, sans-serif',
      color: '#94a3b8', backgroundColor: 'rgba(10,14,26,0.7)',
      padding: { x: 12, y: 8 },
    }).setInteractive().setDepth(100)

    btn.on('pointerover', () => { btn.setStyle({ color: '#f1f5f9' }); this.input.setDefaultCursor('pointer') })
    btn.on('pointerout',  () => { btn.setStyle({ color: '#94a3b8' }); this.input.setDefaultCursor('default') })
    btn.on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('phaser:exitInterior'))
      this.scene.start('CityScene')
    })
  }
}
