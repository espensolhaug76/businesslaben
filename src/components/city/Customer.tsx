import { motion } from 'framer-motion'

export interface CustomerData {
  id: number
  emoji: string
  startX: number
  targetX: number
  y: number
  hasBought: boolean
  happiness: 'happy' | 'neutral' | 'sad'
}

const happinessEmoji = {
  happy: '😊',
  neutral: '😐',
  sad: '😞',
}

interface Props {
  customer: CustomerData
  onComplete: (id: number) => void
}

export default function Customer({ customer, onComplete }: Props) {
  const { id, emoji, startX, targetX, y, hasBought, happiness } = customer

  // Customer walks to store, pauses, then walks out
  return (
    <motion.div
      className="absolute flex flex-col items-center z-20"
      style={{ top: `${y}%` }}
      initial={{ x: startX, opacity: 0 }}
      animate={{
        x: [startX, targetX, targetX, startX + (startX > targetX ? 200 : -200)],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 8,
        times: [0, 0.3, 0.7, 1],
        ease: 'linear' as const,
      }}
      onAnimationComplete={() => onComplete(id)}
    >
      <span className="text-2xl">{emoji}</span>
      {hasBought && (
        <motion.span
          className="text-xs"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 0.3 }}
        >
          🛍️
        </motion.span>
      )}
      <motion.span
        className="text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 0.3 }}
      >
        {happinessEmoji[happiness]}
      </motion.span>
    </motion.div>
  )
}
