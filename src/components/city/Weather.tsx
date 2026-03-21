import { motion } from 'framer-motion'

const clouds = [
  { width: 120, top: '8%', delay: 0, duration: 45, opacity: 0.4 },
  { width: 90, top: '4%', delay: 8, duration: 55, opacity: 0.3 },
  { width: 150, top: '12%', delay: 20, duration: 50, opacity: 0.25 },
  { width: 80, top: '6%', delay: 35, duration: 60, opacity: 0.35 },
]

function Cloud({ width, opacity }: { width: number; opacity: number }) {
  return (
    <svg width={width} height={width * 0.4} viewBox="0 0 120 48" fill="none" style={{ opacity }}>
      <ellipse cx="60" cy="32" rx="50" ry="16" fill="white" />
      <ellipse cx="40" cy="24" rx="28" ry="18" fill="white" />
      <ellipse cx="75" cy="22" rx="24" ry="16" fill="white" />
      <ellipse cx="55" cy="16" rx="20" ry="14" fill="white" />
    </svg>
  )
}

export default function Weather() {
  return (
    <div className="absolute inset-x-0 top-0 h-32 overflow-hidden pointer-events-none z-0">
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top }}
          initial={{ x: '-15%' }}
          animate={{ x: '115vw' }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: 'linear' as const,
          }}
        >
          <Cloud width={c.width} opacity={c.opacity} />
        </motion.div>
      ))}
    </div>
  )
}
