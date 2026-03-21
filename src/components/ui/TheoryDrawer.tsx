import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TheoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function TheoryDrawer({ isOpen, onClose, children }: TheoryDrawerProps) {
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />

          {/* Centered panel — slides in from right */}
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed top-0 h-full z-50 overflow-y-auto w-full"
            style={{
              maxWidth: '700px',
              // Center horizontally; on narrow screens flush left
              left: 'max(0px, calc(50vw - 350px))',
              background: 'var(--bg-secondary, #0f172a)',
              borderLeft: '1px solid rgba(148,163,184,0.15)',
              borderRight: '1px solid rgba(148,163,184,0.08)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
