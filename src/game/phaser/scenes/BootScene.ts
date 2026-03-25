import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'BootScene' }) }

  create() {
    // Brief loading screen
    const w = this.scale.width
    const h = this.scale.height
    this.add.rectangle(w/2, h/2, w, h, 0x0a0e1a)
    const text = this.add.text(w/2, h/2, 'Laster kart…', {
      fontSize: '24px',
      fontFamily: 'Outfit, sans-serif',
      color: '#38bdf8',
    }).setOrigin(0.5)

    this.tweens.add({
      targets: text,
      alpha: 0.3,
      yoyo: true,
      repeat: -1,
      duration: 700,
    })

    this.time.delayedCall(800, () => this.scene.start('CityScene'))
  }
}
