import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import AnimatedNumber from './animations/AnimatedNumber'

const monthNames = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export default function EconomyPanel() {
  const currentMoney = useGameStore((s) => s.currentMoney)
  const currentMonth = useGameStore((s) => s.currentMonth)
  const currentYear = useGameStore((s) => s.currentYear)
  const monthlyRent = useGameStore((s) => s.monthlyRent)
  const monthlyPersonnelCost = useGameStore((s) => s.monthlyPersonnelCost)
  const monthlyMarketing = useGameStore((s) => s.monthlyMarketing)
  const reputation = useGameStore((s) => s.reputation)
  const monthlyResults = useGameStore((s) => s.monthlyResults)

  const lastResult = monthlyResults[monthlyResults.length - 1]
  const totalCosts = monthlyRent + monthlyPersonnelCost + monthlyMarketing

  return (
    <aside className="flex w-64 flex-col gap-4 border-l border-gray-800 bg-gray-900 p-4">
      {/* Month / Year */}
      <motion.div
        className="rounded-lg bg-gray-800 p-3 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Periode</div>
        <div className="mt-1 text-lg font-bold text-teal-400">
          {monthNames[currentMonth - 1]} - År {currentYear}
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-700">
          <motion.div
            animate={{ width: `${(currentMonth / 12) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="h-full rounded-full bg-teal-500"
          />
        </div>
        <div className="mt-1 text-xs text-gray-500">Måned {currentMonth} av 12</div>
      </motion.div>

      {/* Cash balance */}
      <motion.div
        className="rounded-lg bg-gray-800 p-3"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Kontanter</div>
        <AnimatedNumber
          value={currentMoney}
          className={`mt-1 text-xl font-bold ${currentMoney >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
        />
      </motion.div>

      {/* Monthly costs */}
      <motion.div
        className="rounded-lg bg-gray-800 p-3"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Månedlige kostnader</div>
        <div className="mt-2 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Husleie</span>
            <span className="text-gray-200">{formatKr(monthlyRent)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lønn</span>
            <span className="text-gray-200">{formatKr(monthlyPersonnelCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Markedsføring</span>
            <span className="text-gray-200">{formatKr(monthlyMarketing)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-gray-700 pt-2 font-medium">
            <span className="text-gray-300">Totalt</span>
            <span className="text-amber-400">{formatKr(totalCosts)}</span>
          </div>
        </div>
      </motion.div>

      {/* Last month result */}
      {lastResult && (
        <motion.div
          className="rounded-lg bg-gray-800 p-3"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Forrige måned</div>
          <div className="mt-2 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Omsetning</span>
              <span className="text-emerald-400">{formatKr(lastResult.totalRevenue ?? lastResult.totalSales)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Kostnader</span>
              <span className="text-rose-400">{formatKr(lastResult.totalCosts)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-700 pt-2 font-medium">
              <span className="text-gray-300">Resultat</span>
              <AnimatedNumber
                value={lastResult.profit}
                className={lastResult.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Reputation */}
      <motion.div
        className="rounded-lg bg-gray-800 p-3"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <div className="text-xs font-medium uppercase tracking-wider text-gray-400">Omdømme</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
            <motion.div
              animate={{ width: `${reputation}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }}
              className="h-full rounded-full bg-amber-500"
            />
          </div>
          <span className="text-sm font-medium text-amber-400">{reputation}</span>
        </div>
      </motion.div>
    </aside>
  )
}
