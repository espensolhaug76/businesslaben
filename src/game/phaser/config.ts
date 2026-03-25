import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import MainScene from './scenes/MainScene'

export function createPhaserConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: '100%',
    height: '100%',
    backgroundColor: '#0a0e1a',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, MainScene],
    render: {
      antialias: true,
      pixelArt: false,
    },
  }
}
