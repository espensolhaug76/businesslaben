import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const steps = [
  'Beregner etterspørsel...',
  'Simulerer salg...',
  'Beregner kostnader...',
  'Oppdaterer lager...',
  'Sjekker hendelser...',
  'Genererer rapport...',
]

interface SimulationLoaderProps {
  onComplete: () => void
  duration?: number
}

export default function SimulationLoader({ onComplete, duration = 2400 }: SimulationLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = duration / steps.length
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, stepDuration)

    // Smooth progress bar
    const start = performance.now()
    let frame: number
    function tick(now: number) {
      const elapsed = now - start
      setProgress(Math.min(elapsed / duration, 1))
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 200)
      }
    }
    frame = requestAnimationFrame(tick)

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(frame)
    }
  }, [duration, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-gray-950/90 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      {/* Spinning icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="text-5xl mb-6"
      >
        ⚙️
      </motion.div>

      {/* Step text */}
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-teal-400 font-medium text-lg mb-6"
      >
        {steps[stepIndex]}
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="text-xs text-slate-500 mt-3">
        {Math.round(progress * 100)}%
      </div>
    </motion.div>
  )
}
