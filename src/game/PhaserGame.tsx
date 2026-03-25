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
    const config = createPhaserConfig(containerRef.current)
    gameRef.current = new Phaser.Game(config)
    onReady?.()
    return () => {
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
