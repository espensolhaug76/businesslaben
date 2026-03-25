import Phaser from 'phaser'

const COLORS = [0x38bdf8, 0xa855f7, 0xf97316, 0x22c55e, 0xff4757]

export class Customer extends Phaser.GameObjects.Container {
  private gfxBody!: Phaser.GameObjects.Graphics
  private path: Array<{x: number, y: number}>
  private pathIndex: number = 0

  constructor(scene: Phaser.Scene, path: Array<{x: number, y: number}>, colorIdx: number = 0) {
    super(scene, path[0].x, path[0].y)
    this.path = path

    const color = COLORS[colorIdx % COLORS.length]

    // Body circle
    this.gfxBody = scene.add.graphics()
    this.gfxBody.fillStyle(color, 1)
    this.gfxBody.fillCircle(0, 0, 8)
    this.gfxBody.fillStyle(0xffffff, 0.8)
    this.gfxBody.fillCircle(-2, -3, 3) // eye
    this.add(this.gfxBody)

    // Shadow
    const shadow = scene.add.graphics()
    shadow.fillStyle(0x000000, 0.2)
    shadow.fillEllipse(0, 10, 16, 6)
    this.addAt(shadow, 0)

    scene.add.existing(this as unknown as Phaser.GameObjects.GameObject)
    this.startWalking()
  }

  private startWalking() {
    const nextIdx = (this.pathIndex + 1) % this.path.length
    const target = this.path[nextIdx]
    const dist = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y)

    this.scene.tweens.add({
      targets: this,
      x: target.x,
      y: target.y,
      duration: dist * 12 + 400,
      ease: 'Linear',
      onComplete: () => {
        this.pathIndex = nextIdx
        this.startWalking()
      },
    })
  }
}
