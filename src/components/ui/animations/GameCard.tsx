import { motion } from 'framer-motion'
import type { ReactNode, MouseEventHandler } from 'react'

interface GameCardProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  selected?: boolean
  disabled?: boolean
  as?: 'div' | 'button'
}

/**
 * Card with hover lift effect + subtle glow.
 */
export default function GameCard({
  children,
  className = '',
  onClick,
  selected = false,
  disabled = false,
}: GameCardProps) {
  return (
    <motion.div
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { y: -4, scale: 1.01 }}
      whileTap={disabled ? {} : onClick ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${className} ${onClick && !disabled ? 'cursor-pointer' : ''} ${
        selected ? 'ring-2 ring-teal-400/60 shadow-lg shadow-teal-500/10' : ''
      }`}
    >
      {children}
    </motion.div>
  )
}
