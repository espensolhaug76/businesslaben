import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊', featureId: null },
  { to: '/pricing', label: 'Priser', icon: '💰', featureId: 'pricing_screen' },
  { to: '/distribution', label: 'Distribusjon', icon: '🏪', featureId: 'distribution_screen' },
  { to: '/marketing', label: 'Markedsføring', icon: '📣', featureId: 'marketing' },
  { to: '/personnel', label: 'Personale', icon: '👥', featureId: 'personnel' },
] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
}

const iconBounce = {
  hover: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.35,
      ease: 'easeInOut' as const,
    },
  },
}

export default function NavigationMenu() {
  const location = useLocation()
  const isFeatureUnlocked = useGameStore((s) => s.isFeatureUnlocked)

  return (
    <nav className="flex w-56 flex-col gap-1 border-r border-gray-800 bg-gray-900 p-4">
      <motion.ul
        className="flex flex-col gap-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to)
          const locked = item.featureId != null && !isFeatureUnlocked(item.featureId)

          return (
            <motion.li
              key={item.to}
              variants={itemVariants}
              className="relative list-none"
            >
              {isActive && !locked && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-teal-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              {locked ? (
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 cursor-not-allowed opacity-40">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                  <span className="ml-auto text-xs">🔒</span>
                </div>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive: active }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <motion.span
                    className="text-lg"
                    variants={iconBounce}
                    whileHover="hover"
                  >
                    {item.icon}
                  </motion.span>
                  {item.label}
                </NavLink>
              )}
            </motion.li>
          )
        })}
      </motion.ul>

      {/* Back to city */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto pt-4 border-t border-gray-800"
      >
        <NavLink
          to="/city"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-colors"
        >
          <motion.span
            className="text-lg"
            animate={{ x: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            🏙️
          </motion.span>
          Tilbake til byen
        </NavLink>
      </motion.div>
    </nav>
  )
}
