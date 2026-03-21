import { createContext, useContext, useCallback, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'money'
  icon?: string
}

interface ToastContextValue {
  toast: (message: string, type?: Toast['type'], icon?: string) => void
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', icon?: string) => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type, icon }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const typeStyles: Record<Toast['type'], string> = {
    success: 'bg-emerald-500/90 text-white border-emerald-400',
    error: 'bg-red-500/90 text-white border-red-400',
    info: 'bg-slate-700/90 text-white border-slate-500',
    money: 'bg-teal-500/90 text-white border-teal-400',
  }

  const defaultIcons: Record<Toast['type'], string> = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
    money: '💰',
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-sm pointer-events-auto ${typeStyles[t.type]}`}
            >
              <span className="text-lg">{t.icon ?? defaultIcons[t.type]}</span>
              <span className="text-sm font-medium">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
