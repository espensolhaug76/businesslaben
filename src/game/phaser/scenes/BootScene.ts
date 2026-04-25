import Phaser from 'phaser'

const BUILDING_ASSETS = [
  'shop_tier1', 'shop_tier2', 'shop_tier3', 'warehouse', 'office', 'vacant',
  'cafe', 'bakery', 'bank', 'restaurant', 'apartment', 'gym', 'house', 'drugstore',
  'cinema', 'firestation', 'locked_web', 'locked_franchise',
  'fountain', 'bench', 'streetlamp', 'flowerpot', 'tree_leafy', 'tree_pine',
]

export default class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'BootScene' }) }

  preload() {
    const w = this.scale.width
    const h = this.scale.height
    this.add.rectangle(w / 2, h / 2, w, h, 0x7ec850)

    const text = this.add.text(w / 2, h / 2, 'Laster kart…', {
      fontSize: '24px',
      fontFamily: 'Outfit, sans-serif',
      color: '#2d5a27',
    }).setOrigin(0.5)

    this.tweens.add({
      targets: text,
      alpha: 0.3,
      yoyo: true,
      repeat: -1,
      duration: 700,
    })

    let loaded = 0
    let failed = 0
    const missing: string[] = []

    for (const key of BUILDING_ASSETS) {
      this.load.image(key, `assets/buildings/${key}.png`)
    }

    this.load.on('filecomplete', () => { loaded++ })
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      failed++
      missing.push(file.key)
    })

    this.load.on('complete', () => {
      console.log(`[BootScene] Assets loaded: ${loaded}/${BUILDING_ASSETS.length}`)
      console.log(`[BootScene] Missing: ${failed} ${missing.length ? '(' + missing.join(', ') + ')' : ''}`)
    })
  }

  create() {
    this.time.delayedCall(400, () => this.scene.start('CityScene'))
  }
}
