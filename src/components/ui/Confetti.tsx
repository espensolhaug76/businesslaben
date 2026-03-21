import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  delay: number
}

const COLORS = ['#14b8a6', '#06b6d4', '#f59e0b', '#ec4899', '#a855f7', '#22c55e', '#ef4444']

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 40 + Math.random() * 20, // center-ish
    y: 30 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 720 - 360,
    scale: 0.5 + Math.random() * 1,
    delay: Math.random() * 0.3,
  }))
}

interface ConfettiProps {
  active: boolean
  count?: number
  duration?: number
}

/**
 * Full-screen confetti explosion. Triggers when `active` becomes true.
 */
export default function Confetti({ active, count = 50, duration = 2500 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setParticles(makeParticles(count))
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [active, count, duration])

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: 1,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                left: `${p.x + (Math.random() - 0.5) * 60}%`,
                top: `${p.y + 40 + Math.random() * 40}%`,
                opacity: 0,
                scale: p.scale,
                rotate: p.rotation,
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: p.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute"
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: p.color }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

/**
 * Coin rain for profit celebrations.
 */
export function CoinRain({ active }: { active: boolean }) {
  const [coins, setCoins] = useState<Particle[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setCoins(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          x: 10 + Math.random() * 80,
          y: -10,
          color: '#f59e0b',
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.6,
          delay: Math.random() * 0.8,
        })),
      )
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [active])

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
          {coins.map((c) => (
            <motion.div
              key={c.id}
              initial={{
                left: `${c.x}%`,
                top: '-5%',
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                top: '110%',
                opacity: 0,
                rotate: c.rotation,
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: c.delay,
                ease: 'easeIn',
              }}
              className="absolute text-2xl"
              style={{ fontSize: `${c.scale * 1.5}rem` }}
            >
              🪙
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
