import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import CityScene from './scenes/CityScene'
import InteriorScene from './scenes/InteriorScene'

// ── Global overlay flag ──────────────────────────────────────────────────────
// Set window.__OVERLAY_OPEN__ = true when ANY React overlay opens.
// Set it back to false when ALL overlays are closed.
// CityScene reads this flag and skips input processing while it is true.
declare global {
  interface Window {
    __OVERLAY_OPEN__: boolean
    __PHASER_GAME__: Phaser.Game | undefined
  }
}
window.__OVERLAY_OPEN__ = false

export function createPhaserConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#0a0e1a',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: '100%',
      height: '100%',
    },
    scene: [BootScene, CityScene, InteriorScene],
    render: {
      antialias: true,
      pixelArt: false,
    },
    input: {
      windowEvents: true,
    },
  }
}
