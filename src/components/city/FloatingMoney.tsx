import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'

interface MoneyPopup {
  id: number
  amount: number
  x: number
  y: number
}

let popupId = 0

export function useFloatingMoney() {
  const [popups, setPopups] = useState<MoneyPopup[]>([])

  const showMoney = useCallback((amount: number, x: number, y: number) => {
    const id = popupId++
    setPopups((prev) => [...prev, { id, amount, x, y }])
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id))
    }, 1500)
  }, [])

  return { popups, showMoney }
}

export default function FloatingMoney({ popups }: { popups: MoneyPopup[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <AnimatePresence>
        {popups.map((p) => (
          <motion.div
            key={p.id}
            className="absolute font-bold text-emerald-400 text-lg drop-shadow-lg"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' as const }}
          >
            +{p.amount.toLocaleString('nb-NO')} kr
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
