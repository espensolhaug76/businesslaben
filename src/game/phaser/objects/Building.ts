import Phaser from 'phaser'
import { drawIsoBuilding, type BuildingColors } from '../utils/DrawBuilding'

export interface BuildingConfig {
  id: string
  label: string
  emoji: string
  gridX: number
  gridY: number
  w: number
  h: number
  d: number
  colors: BuildingColors
  locked?: boolean
  level?: number
}

export class Building extends Phaser.GameObjects.Container {
  buildingId: string
  locked: boolean
  private gfx!: Phaser.GameObjects.Graphics
  private labelText!: Phaser.GameObjects.Text
  private levelBadge!: Phaser.GameObjects.Graphics
  private levelText!: Phaser.GameObjects.Text
  private hoverOverlay!: Phaser.GameObjects.Graphics

  constructor(scene: Phaser.Scene, worldX: number, worldY: number, config: BuildingConfig) {
    super(scene, worldX, worldY)
    this.buildingId = config.id
    this.locked = config.locked ?? false

    const { w, h, d, colors, label, level = 1 } = config

    // Draw building (offset from container origin)
    this.gfx = drawIsoBuilding(scene, 0, 0, w, h, d, this.locked ? { top: 0x334155, left: 0x1e293b, right: 0x0f172a } : colors)
    this.add(this.gfx)

    // Hover overlay (transparent diamond-ish shape)
    this.hoverOverlay = scene.add.graphics()
    this.hoverOverlay.fillStyle(0xffffff, 0.12)
    this.hoverOverlay.fillRect(-w, -h - d, w * 2, h + d)
    this.hoverOverlay.setAlpha(0)
    this.add(this.hoverOverlay)

    // Label text
    this.labelText = scene.add.text(0, 12, this.locked ? `🔒 ${label}` : label, {
      fontSize: '13px',
      fontFamily: 'Outfit, sans-serif',
      color: this.locked ? '#475569' : '#f1f5f9',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
    }).setOrigin(0.5, 0)
    this.add(this.labelText)

    // Level badge
    if (!this.locked) {
      this.levelBadge = scene.add.graphics()
      this.levelBadge.fillStyle(0x1e293b, 1)
      this.levelBadge.fillCircle(w - 6, -h - d - 4, 12)
      this.levelBadge.lineStyle(2, 0x38bdf8)
      this.levelBadge.strokeCircle(w - 6, -h - d - 4, 12)
      this.add(this.levelBadge)

      this.levelText = scene.add.text(w - 6, -h - d - 4, String(level), {
        fontSize: '11px',
        fontFamily: 'Outfit, sans-serif',
        color: '#38bdf8',
        fontStyle: 'bold',
      }).setOrigin(0.5)
      this.add(this.levelText)
    }

    // Make interactive
    if (!this.locked) {
      const hitArea = new Phaser.Geom.Rectangle(-w, -h - d, w * 2, h + d + 20)
      this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
      this.on('pointerover', this.onHover, this)
      this.on('pointerout', this.onHoverEnd, this)
      this.on('pointerdown', this.onClick, this)
    }

    scene.add.existing(this)
  }

  private onHover() {
    this.scene.tweens.add({ targets: this.hoverOverlay, alpha: 1, duration: 150 })
    this.scene.input.setDefaultCursor('pointer')
  }

  private onHoverEnd() {
    this.scene.tweens.add({ targets: this.hoverOverlay, alpha: 0, duration: 150 })
    this.scene.input.setDefaultCursor('default')
  }

  private onClick() {
    this.scene.events.emit('buildingClicked', this.buildingId)
    // Camera pan to building
    this.scene.cameras.main.pan(this.x, this.y - 50, 400, 'Power2')
  }
}
