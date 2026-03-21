import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/* ─── Page Transition Wrapper ─── */
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stagger Container + Item ─── */
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.08 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Animated Number ─── */
interface AnimatedNumberProps {
  value: number
  duration?: number
  format?: (n: number) => string
  className?: string
}

function defaultFormat(n: number): string {
  return n.toLocaleString('nb-NO') + ' kr'
}

export function AnimatedNumber({ value, duration = 0.8, format = defaultFormat, className }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)

  useEffect(() => {
    const from = prev.current
    const to = value
    if (from === to) return
    prev.current = to

    const start = performance.now()
    let frame: number

    function tick(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / (duration * 1000), 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (to - from) * eased)
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return <span className={className}>{format(display)}</span>
}

/* ─── Game Button ─── */
interface GameButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  pulse?: boolean
  className?: string
}

export function GameButton({ children, onClick, disabled, pulse, className = '' }: GameButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative ${className}`}
    >
      {pulse && !disabled && (
        <motion.span
          className="absolute inset-0 rounded-2xl bg-teal-400/20"
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {children}
    </motion.button>
  )
}

/* ─── Game Card ─── */
interface GameCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function GameCard({ children, onClick, className = '' }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  )
}
