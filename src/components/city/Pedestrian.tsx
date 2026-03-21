import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const sprites = ['🚶', '🚶‍♀️', '🧑', '👩', '🧑‍💼', '👩‍💼', '🧒']

interface PedestrianData {
  id: number
  sprite: string
  y: number
  speed: number
  direction: 1 | -1
  scale: number
}

let nextId = 0

export default function PedestrianLayer() {
  const [pedestrians, setPedestrians] = useState<PedestrianData[]>([])

  useEffect(() => {
    // Spawn one immediately
    spawnPedestrian()

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        spawnPedestrian()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  function spawnPedestrian() {
    const direction = Math.random() > 0.5 ? 1 : -1 as 1 | -1
    const ped: PedestrianData = {
      id: nextId++,
      sprite: sprites[Math.floor(Math.random() * sprites.length)],
      y: 75 + Math.random() * 12, // Bottom area (percentage)
      speed: 12 + Math.random() * 10,
      direction,
      scale: 0.8 + Math.random() * 0.4,
    }
    setPedestrians((prev) => [...prev.slice(-6), ped]) // Keep max 7
  }

  function removePedestrian(id: number) {
    setPedestrians((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {pedestrians.map((ped) => (
        <motion.div
          key={ped.id}
          className="absolute"
          style={{
            top: `${ped.y}%`,
            fontSize: `${1.2 * ped.scale}rem`,
            scaleX: ped.direction,
          }}
          initial={{ x: ped.direction === 1 ? '-5vw' : '105vw' }}
          animate={{ x: ped.direction === 1 ? '105vw' : '-5vw' }}
          transition={{ duration: ped.speed, ease: 'linear' as const }}
          onAnimationComplete={() => removePedestrian(ped.id)}
        >
          {ped.sprite}
        </motion.div>
      ))}
    </div>
  )
}
