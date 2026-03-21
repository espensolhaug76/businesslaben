import { motion } from 'framer-motion'
import type { ReactNode, MouseEventHandler } from 'react'

interface GameButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
  /** Adds a subtle pulse animation to draw attention */
  pulse?: boolean
}

/**
 * Button with satisfying hover/click feedback.
 * Hover: slight lift (scale 1.03) + shadow
 * Click: squish (0.96) then spring back
 */
export default function GameButton({
  children,
  onClick,
  disabled = false,
  className = '',
  pulse = false,
}: GameButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${className} ${pulse && !disabled ? 'animate-subtle-pulse' : ''}`}
    >
      {children}
    </motion.button>
  )
}
