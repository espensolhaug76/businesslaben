import { motion } from 'framer-motion'

interface Props {
  onComplete: () => void
  label?: string
}

export default function DeliveryTruck({ onComplete, label }: Props) {
  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center"
      style={{ top: '62%' }}
      initial={{ x: '110vw' }}
      animate={{
        x: ['110vw', '45vw', '45vw', '-15vw'],
      }}
      transition={{
        duration: 8,
        times: [0, 0.35, 0.65, 1],
        ease: 'easeInOut' as const,
      }}
      onAnimationComplete={onComplete}
    >
      <span className="text-3xl">🚚</span>
      {label && (
        <motion.div
          className="bg-slate-900/90 text-white text-xs px-2 py-0.5 rounded mt-1 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 8, times: [0, 0.35, 0.65, 1] }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  )
}
