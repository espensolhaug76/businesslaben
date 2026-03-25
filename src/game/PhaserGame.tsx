import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { createPhaserConfig } from './phaser/config'

interface PhaserGameProps {
  onReady?: () => void
}

export default function PhaserGame({ onReady }: PhaserGameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return
    const container = containerRef.current
    const config = createPhaserConfig(container)
    const game = new Phaser.Game(config)
    gameRef.current = game
    ;(window as any).__PHASER_GAME__ = game

    // Force canvas to fill the container whenever it resizes
    const observer = new ResizeObserver(() => {
      game.scale.refresh()
      const canvas = container.querySelector('canvas')
      if (canvas) {
        canvas.style.width = '100%'
        canvas.style.height = '100%'
      }
    })
    observer.observe(container)

    onReady?.()
    return () => {
      observer.disconnect()
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  )
}
