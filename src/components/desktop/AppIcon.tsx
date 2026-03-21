import { motion } from 'framer-motion'

interface Props {
  icon: string
  label: string
  badge?: number | string
  notification?: string
  onClick: () => void
}

export default function AppIcon({ icon, label, badge, notification, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative flex flex-col items-center gap-1.5 p-3 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer select-none group"
    >
      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-3xl shadow-lg group-hover:bg-white/15 transition-colors"
        whileHover={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.4 }}
      >
        {icon}
      </motion.div>

      {/* Label */}
      <span className="text-[11px] font-medium text-white/90 drop-shadow-md text-center leading-tight max-w-[80px]">
        {label}
      </span>

      {/* Badge */}
      {badge !== undefined && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-md"
        >
          {badge}
        </motion.div>
      )}

      {/* Notification bubble */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-md"
        >
          {notification}
        </motion.div>
      )}
    </motion.button>
  )
}
