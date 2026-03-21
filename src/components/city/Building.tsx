import { motion } from 'framer-motion'

export interface BuildingConfig {
  id: string
  label: string
  icon: string
  sublabel?: string
  badge?: string | number
  badgeColor?: string
  locked?: boolean
  lockedLabel?: string
  glow?: boolean
}

interface Props {
  config: BuildingConfig
  onClick: () => void
  className?: string
}

export default function Building({ config, onClick, className = '' }: Props) {
  const { label, icon, sublabel, badge, badgeColor = 'bg-teal-500', locked, lockedLabel, glow } = config

  return (
    <motion.button
      whileHover={locked ? {} : { y: -6, scale: 1.06 }}
      whileTap={locked ? {} : { scale: 0.95 }}
      onClick={locked ? undefined : onClick}
      className={`relative flex flex-col items-center p-3 rounded-2xl transition-colors cursor-pointer select-none ${
        locked
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:bg-white/10'
      } ${className}`}
    >
      {/* Glow ring */}
      {glow && !locked && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-teal-400/40"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Building icon */}
      <motion.div
        className="text-4xl mb-1 drop-shadow-lg"
        animate={glow ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        {icon}
      </motion.div>

      {/* Label */}
      <div className="text-xs font-bold text-white drop-shadow-md leading-tight text-center">
        {label}
      </div>

      {/* Sublabel */}
      {sublabel && (
        <div className="text-[10px] text-slate-300/80 mt-0.5 drop-shadow">
          {sublabel}
        </div>
      )}

      {/* Badge */}
      {badge !== undefined && badge !== '' && !locked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-1 -right-1 ${badgeColor} text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1`}
        >
          {badge}
        </motion.div>
      )}

      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-900/40">
          <span className="text-lg drop-shadow-lg">🔒</span>
          {lockedLabel && (
            <span className="text-[8px] text-slate-300/80 mt-0.5 text-center px-1 leading-tight">
              {lockedLabel}
            </span>
          )}
        </div>
      )}
    </motion.button>
  )
}
