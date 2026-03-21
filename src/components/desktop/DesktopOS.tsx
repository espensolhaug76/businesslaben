import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import AppIcon from './AppIcon'
import EmailApp from './EmailApp'
import NewsApp from './NewsApp'

const monthNames = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

export default function DesktopOS() {
  const navigate = useNavigate()
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())

  const monthlyResults = useGameStore((s) => s.monthlyResults)
  const companyName = useGameStore((s) => s.companyName)
  const gameEmails = useGameStore((s) => s.gameEmails ?? [])
  const gameNews = useGameStore((s) => s.gameNews ?? [])

  const currentMonth = monthlyResults.length + 1

  const unreadEmails = gameEmails.filter((e) => !e.read).length
  const unreadNews = gameNews.filter((n) => !n.read).length

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const timeStr = time.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="fixed inset-0 z-30">
      {/* Boot animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
      >
        {/* Wallpaper pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
          }} />
        </div>
      </motion.div>

      {/* OS Top bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring' as const, stiffness: 200, damping: 25 }}
        className="relative z-50 flex items-center justify-between px-4 py-1.5 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-teal-400">🖥️ AdVenture OS</span>
          <span className="text-[10px] text-slate-500">|</span>
          <span className="text-[10px] text-slate-400">{companyName}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          {unreadEmails > 0 && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-400"
            >
              📧 {unreadEmails}
            </motion.span>
          )}
          <span>📅 {monthNames[currentMonth - 1]} (Mnd {currentMonth})</span>
          <span>🕐 {timeStr}</span>
        </div>
      </motion.div>

      {/* Desktop app grid */}
      <div className="relative z-40 flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 p-6"
        >
          {/* Row 1: Core apps */}
          <AppIcon
            icon="📧"
            label="E-post"
            badge={unreadEmails > 0 ? unreadEmails : undefined}
            onClick={() => setActiveApp('email')}
          />
          <AppIcon
            icon="📰"
            label="Nyheter"
            badge={unreadNews > 0 ? unreadNews : undefined}
            notification={unreadNews > 0 ? 'Nytt!' : undefined}
            onClick={() => setActiveApp('news')}
          />
          <AppIcon
            icon="📊"
            label="Dashboard"
            onClick={() => navigate('/dashboard')}
          />
          <AppIcon
            icon="💰"
            label="Priser"
            onClick={() => navigate('/pricing')}
          />
          <AppIcon
            icon="📦"
            label="Produkter"
            onClick={() => navigate('/products')}
          />

          {/* Row 2: Management apps */}
          <AppIcon
            icon="🚚"
            label="Distribusjon"
            onClick={() => navigate('/distribution')}
          />
          <AppIcon
            icon="📢"
            label="Markedsføring"
            onClick={() => navigate('/marketing')}
          />
          <AppIcon
            icon="👥"
            label="Personale"
            onClick={() => navigate('/personnel')}
          />
          <AppIcon
            icon="🎯"
            label="Målgruppe"
            onClick={() => navigate('/target-audience')}
          />

          {/* Row 3: Learning hub */}
          <AppIcon
            icon="📚"
            label="Læringsmoduler"
            onClick={() => navigate('/learning')}
          />
        </motion.div>

        {/* Dock / Bottom bar */}
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, type: 'spring' as const, stiffness: 200, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 px-6 bg-slate-800/60 backdrop-blur-xl border-t border-slate-700/40"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/city')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 font-medium text-sm transition-colors"
          >
            <motion.span
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              ←
            </motion.span>
            Tilbake til byen
          </motion.button>
        </motion.div>
      </div>

      {/* App windows */}
      <AnimatePresence>
        {activeApp === 'email' && <EmailApp onClose={() => setActiveApp(null)} />}
        {activeApp === 'news' && <NewsApp onClose={() => setActiveApp(null)} />}
      </AnimatePresence>
    </div>
  )
}
