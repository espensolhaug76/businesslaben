import Phaser from 'phaser'

export default class InteriorScene extends Phaser.Scene {
  private shopName: string = 'Din butikk'

  constructor() { super({ key: 'InteriorScene' }) }

  init(data: { shopName?: string }) {
    this.shopName = data.shopName ?? 'Din butikk'
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height

    this.cameras.main.setBackgroundColor(0xf8f4ef)

    this.drawExteriorWalls(W, H)
    this.drawOfficeRoom(W, H)
    this.drawSalesFloor(W, H)
    this.drawWarehouse(W, H)
    this.drawFloorStreet(W, H)
    this.spawnShopCustomers(W, H)
    this.addBackButton()
    this.addRoomLabels(W, H)
  }

  private drawExteriorWalls(W: number, H: number) {
    const g = this.add.graphics()

    g.fillStyle(0x1e3a5f)
    g.fillRect(0, 0, W, 60)

    const nameText = this.add.text(W / 2, 30, this.shopName, {
      fontSize: '22px', fontFamily: 'Outfit, sans-serif',
      color: '#f1f5f9', fontStyle: 'bold',
    }).setOrigin(0.5)
    nameText.setDepth(10)

    g.fillStyle(0xe8ddd0)
    g.fillRect(20, 60, W - 40, H - 100)

    g.fillStyle(0x334155)
    g.fillRect(0, 55, W, 10)

    g.fillStyle(0x92400e, 0.6)
    g.fillRect(20, H - 45, W - 40, 8)

    g.setDepth(0)
  }

  private drawOfficeRoom(W: number, H: number) {
    const roomX = 30
    const roomW = Math.floor(W * 0.22)
    const roomH = H - 110
    const roomY = 65

    const g = this.add.graphics()

    g.fillStyle(0xc8a96e)
    g.fillRect(roomX, roomY + roomH - 30, roomW, 30)

    g.fillStyle(0xfdf6e3)
    g.fillRect(roomX, roomY, roomW, roomH - 30)

    g.lineStyle(1, 0xe8d8c0)
    g.strokeRect(roomX + 6, roomY + 6, roomW - 12, roomH - 42)

    g.fillStyle(0xc0b8a8)
    g.fillRect(roomX + roomW - 4, roomY, 4, roomH)

    g.fillStyle(0x8b5e3c)
    g.fillRect(roomX + 15, roomY + roomH - 100, roomW - 30, 18)
    g.fillStyle(0x6b4428)
    g.fillRect(roomX + 16, roomY + roomH - 82, 6, 20)
    g.fillRect(roomX + roomW - 22, roomY + roomH - 82, 6, 20)

    const monBg = this.add.graphics()
    monBg.fillStyle(0x1e293b)
    monBg.fillRect(roomX + roomW / 2 - 20, roomY + roomH - 125, 40, 28)
    monBg.fillStyle(0x38bdf8, 0.3)
    monBg.fillRect(roomX + roomW / 2 - 18, roomY + roomH - 123, 36, 24)
    monBg.fillStyle(0x334155)
    monBg.fillRect(roomX + roomW / 2 - 6, roomY + roomH - 97, 12, 6)
    monBg.fillRect(roomX + roomW / 2 - 14, roomY + roomH - 91, 28, 4)
    monBg.setDepth(5)

    const monHit = new Phaser.Geom.Rectangle(
      roomX + roomW / 2 - 22,
      roomY + roomH - 128,
      44, 36
    )
    monBg.setInteractive(monHit, Phaser.Geom.Rectangle.Contains)
    monBg.on('pointerover', () => {
      this.input.setDefaultCursor('pointer')
      monBg.setAlpha(1.2)
    })
    monBg.on('pointerout', () => {
      this.input.setDefaultCursor('default')
      monBg.setAlpha(1)
    })
    monBg.on('pointerdown', () => {
      if (!window.__OVERLAY_OPEN__) {
        window.dispatchEvent(new CustomEvent('phaser:open-dashboard'))
      }
    })

    this.add.text(roomX + roomW / 2, roomY + roomH - 135, '💻 Klikk for dashboard', {
      fontSize: '9px', fontFamily: 'Outfit, sans-serif', color: '#64748b',
    }).setOrigin(0.5).setDepth(6)

    g.fillStyle(0x374151)
    g.fillEllipse(roomX + roomW / 2, roomY + roomH - 73, 26, 14)
    g.fillRect(roomX + roomW / 2 - 13, roomY + roomH - 73, 26, 24)
    g.fillStyle(0x1f2937)
    g.fillRect(roomX + roomW / 2 - 4, roomY + roomH - 56, 8, 18)

    g.fillStyle(0x8b5e3c)
    g.fillRect(roomX + 15, roomY + 20, 20, 60)
    for (let i = 0; i < 4; i++) {
      g.fillStyle(i % 2 === 0 ? 0x3b82f6 : 0xef4444)
      g.fillRect(roomX + 17, roomY + 22 + i * 14, 16, 12)
    }

    const roomZone = this.add.zone(roomX + roomW / 2, roomY + roomH / 2, roomW, roomH)
    roomZone.setInteractive()
    roomZone.on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('phaser:roomClicked', { detail: 'office' }))
    })

    g.setDepth(1)
  }

  private drawSalesFloor(W: number, H: number) {
    const officeW = Math.floor(W * 0.22)
    const warehouseW = Math.floor(W * 0.25)
    const roomX = 30 + officeW + 4
    const roomW = W - 40 - officeW - warehouseW - 8
    const roomH = H - 110
    const roomY = 65

    const g = this.add.graphics()

    g.fillStyle(0xc8a060)
    g.fillRect(roomX, roomY + roomH - 30, roomW, 30)
    for (let i = 0; i < 6; i++) {
      g.fillStyle(i % 2 === 0 ? 0xd4a96e : 0xc89458)
      g.fillRect(roomX, roomY + roomH - 30 + (i * 5 % 10), roomW, 5)
    }

    g.fillStyle(0xfef9f0)
    g.fillRect(roomX, roomY, roomW, roomH - 30)

    g.lineStyle(1, 0xf5e8d8)
    g.strokeRect(roomX + 8, roomY + 8, roomW - 16, roomH - 46)

    g.fillStyle(0xc0b8a8)
    g.fillRect(roomX + roomW - 4, roomY, 4, roomH)

    for (let s = 0; s < 3; s++) {
      const shelfX = roomX + roomW - 55
      const shelfY = roomY + 30 + s * 70
      g.fillStyle(0x92400e)
      g.fillRect(shelfX, shelfY, 40, 8)
      g.fillRect(shelfX, shelfY + 50, 40, 8)
      g.fillRect(shelfX, shelfY + 8, 5, 42)
      g.fillRect(shelfX + 35, shelfY + 8, 5, 42)

      const prodColors = [0x38bdf8, 0xf97316, 0xa855f7, 0x22c55e]
      for (let p = 0; p < 4; p++) {
        g.fillStyle(prodColors[p % prodColors.length], 0.85)
        g.fillRect(shelfX + 3 + p * 9, shelfY + 10, 7, 12)
        g.fillRect(shelfX + 3 + p * 9, shelfY + 52, 7, 12)
      }
    }

    const ctrX = roomX + roomW / 2 - 50
    const ctrY = roomY + roomH - 75
    g.fillStyle(0x8b5e3c)
    g.fillRect(ctrX, ctrY, 100, 22)
    g.fillStyle(0x6b4428)
    g.fillRect(ctrX, ctrY + 22, 100, 8)
    g.fillStyle(0x1e293b)
    g.fillRect(ctrX + 38, ctrY - 16, 28, 18)
    g.fillStyle(0x38bdf8, 0.6)
    g.fillRect(ctrX + 40, ctrY - 14, 24, 12)

    const doorX = roomX + roomW / 2 - 22
    const doorY = roomY + roomH - 30
    g.fillStyle(0x1a2744)
    g.fillRect(doorX, doorY - 45, 44, 45)
    g.fillStyle(0x2d4a6e)
    g.fillRect(doorX + 2, doorY - 43, 40, 41)
    g.fillStyle(0xfbbf24)
    g.fillCircle(doorX + 32, doorY - 23, 4)
    g.fillStyle(0x22c55e)
    g.fillRect(doorX + 8, doorY - 65, 28, 14)
    this.add.text(doorX + 22, doorY - 59, 'ÅPENT', {
      fontSize: '7px', fontFamily: 'Outfit', color: '#fff', fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(8)

    const roomZone = this.add.zone(roomX + roomW / 2, roomY + roomH / 2, roomW - 60, roomH - 30)
    roomZone.setInteractive()
    roomZone.on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('phaser:roomClicked', { detail: 'shop' }))
    })
    roomZone.on('pointerover', () => { this.input.setDefaultCursor('pointer') })
    roomZone.on('pointerout', () => { this.input.setDefaultCursor('default') })

    g.setDepth(2)
  }

  private drawWarehouse(W: number, H: number) {
    const roomX = W - 30 - Math.floor(W * 0.25)
    const roomW = Math.floor(W * 0.25)
    const roomH = H - 110
    const roomY = 65

    const g = this.add.graphics()

    g.fillStyle(0x9e8060)
    g.fillRect(roomX, roomY + roomH - 30, roomW, 30)

    g.fillStyle(0xf0ebe4)
    g.fillRect(roomX, roomY, roomW, roomH - 30)

    for (let rack = 0; rack < 2; rack++) {
      const rX = roomX + 15 + rack * (roomW / 2 - 8)
      const rY = roomY + 20
      const rH = roomH - 80

      g.fillStyle(0x4a5568)
      g.fillRect(rX,      rY, 6, rH)
      g.fillRect(rX + 30, rY, 6, rH)

      for (let s = 0; s < 4; s++) {
        g.fillStyle(0x6b7280)
        g.fillRect(rX - 2, rY + 20 + s * (rH / 4), 40, 5)

        const boxColors = [0x3b82f6, 0xef4444, 0xf59e0b, 0x8b5cf6]
        const boxCount = 3 - s
        for (let b = 0; b < boxCount; b++) {
          g.fillStyle(boxColors[(rack * 3 + b) % boxColors.length], 0.9)
          g.fillRect(rX + 1 + b * 13, rY + 22 + s * (rH / 4), 11, 14)
          g.lineStyle(1, 0x000000, 0.2)
          g.strokeRect(rX + 1 + b * 13, rY + 22 + s * (rH / 4), 11, 14)
        }
      }
    }

    this.add.text(roomX + roomW / 2, roomY + roomH - 60, '📦 Lager', {
      fontSize: '11px', fontFamily: 'Outfit, sans-serif', color: '#64748b',
    }).setOrigin(0.5).setDepth(8)

    const roomZone = this.add.zone(roomX + roomW / 2, roomY + roomH / 2, roomW, roomH)
    roomZone.setInteractive()
    roomZone.on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('phaser:roomClicked', { detail: 'warehouse' }))
    })
    roomZone.on('pointerover', () => { this.input.setDefaultCursor('pointer') })
    roomZone.on('pointerout', () => { this.input.setDefaultCursor('default') })

    g.setDepth(2)
  }

  private drawFloorStreet(W: number, H: number) {
    const g = this.add.graphics()
    g.fillStyle(0x7a5c3a)
    g.fillRect(20, H - 42, W - 40, 8)
    g.fillStyle(0x5a3c1a)
    g.fillRect(20, H - 36, W - 40, 4)
    g.fillStyle(0x374151)
    g.fillRect(0, H - 32, W, 32)
    g.lineStyle(2, 0x94a3b8, 0.5)
    g.lineBetween(0, H - 32, W, H - 32)
    g.setDepth(3)
  }

  private addRoomLabels(W: number, _H: number) {
    const officeW = Math.floor(W * 0.22)
    const warehouseW = Math.floor(W * 0.25)
    const salesW = W - 40 - officeW - warehouseW - 8

    const labels = [
      { x: 30 + officeW / 2,               text: 'KONTOR',        color: '#64748b' },
      { x: 30 + officeW + 4 + salesW / 2,  text: 'BUTIKKLOKALE',  color: '#64748b' },
      { x: W - 30 - warehouseW / 2,        text: 'LAGER',         color: '#64748b' },
    ]

    for (const lbl of labels) {
      this.add.text(lbl.x, 70, lbl.text, {
        fontSize: '11px', fontFamily: 'Outfit, sans-serif',
        color: lbl.color, fontStyle: 'bold',
        letterSpacing: 2,
      }).setOrigin(0.5).setDepth(10)
    }
  }

  private spawnShopCustomers(W: number, H: number) {
    const officeW = Math.floor(W * 0.22)
    const warehouseW = Math.floor(W * 0.25)
    const salesX = 30 + officeW + 4
    const salesW = W - 40 - officeW - warehouseW - 8
    const doorX = salesX + salesW / 2
    const doorY = H - 45

    for (let i = 0; i < 2; i++) {
      this.time.delayedCall(i * 3000, () => {
        this.spawnCustomerNPC(doorX + (i - 0.5) * 20, doorY, salesX, salesW, H)
      })
    }
  }

  private spawnCustomerNPC(startX: number, startY: number, salesX: number, salesW: number, H: number) {
    const colors = [0x38bdf8, 0xa855f7, 0xf97316]
    const color = colors[Math.floor(Math.random() * colors.length)]

    const g = this.add.graphics()
    g.fillStyle(color)
    g.fillCircle(0, 0, 8)
    g.fillStyle(0xffffff, 0.5)
    g.fillCircle(-2, -3, 3)
    g.setPosition(startX, startY)
    g.setDepth(20)

    const shelfX = salesX + salesW - 60 + Math.random() * 40
    const shelfY = H - 150 - Math.random() * 80
    const counterX = salesX + salesW / 2 + (Math.random() - 0.5) * 30
    const counterY = H - 100

    this.tweens.chain({
      targets: g,
      tweens: [
        { x: startX, y: H - 80, duration: 600 },
        { x: shelfX, y: shelfY, duration: 1200, ease: 'Power1' },
        { x: shelfX, y: shelfY, duration: 1500 },
        { x: counterX, y: counterY, duration: 800 },
        { x: counterX, y: counterY, duration: 800 },
        {
          x: startX, y: startY + 30, duration: 700,
          onComplete: () => {
            const saleText = this.add.text(counterX, counterY - 20, '+499 kr', {
              fontSize: '14px', fontFamily: 'Outfit, sans-serif',
              color: '#22c55e', fontStyle: 'bold',
              stroke: '#000', strokeThickness: 2,
            }).setOrigin(0.5).setDepth(30)
            this.tweens.add({
              targets: saleText,
              y: counterY - 60, alpha: 0,
              duration: 1200,
              onComplete: () => saleText.destroy(),
            })
            g.destroy()
            this.time.delayedCall(3000 + Math.random() * 3000, () => {
              this.spawnCustomerNPC(startX, startY, salesX, salesW, H)
            })
          },
        },
      ],
    })
  }

  private addBackButton() {
    const btn = this.add.text(20, 15, '← Tilbake til byen', {
      fontSize: '14px', fontFamily: 'Outfit, sans-serif',
      color: '#94a3b8',
      backgroundColor: 'rgba(10,14,26,0.7)',
      padding: { x: 12, y: 8 },
    }).setInteractive().setDepth(100)

    btn.on('pointerover', () => {
      btn.setStyle({ color: '#f1f5f9' })
      this.input.setDefaultCursor('pointer')
    })
    btn.on('pointerout', () => {
      btn.setStyle({ color: '#94a3b8' })
      this.input.setDefaultCursor('default')
    })
    btn.on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('phaser:exitInterior'))
      this.scene.start('CityScene')
    })
  }
}
