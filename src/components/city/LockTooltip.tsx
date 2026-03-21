import { motion } from 'framer-motion'
import { findLessonForUnlock } from '../../data/lessons'

interface Props {
  featureId: string
  buildingName: string
  onClose: () => void
}

export default function LockTooltip({ featureId, buildingName, onClose }: Props) {
  const lesson = findLessonForUnlock(featureId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Tooltip card */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-800 border border-slate-600/50 rounded-2xl p-5 max-w-sm w-full shadow-xl"
      >
        <div className="text-center mb-3">
          <span className="text-3xl">🔒</span>
          <h3 className="text-lg font-bold text-white mt-2">{buildingName}</h3>
          <p className="text-sm text-slate-400 mt-1">Denne funksjonen er l&aring;st</p>
        </div>

        {lesson ? (
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30">
            <p className="text-xs text-slate-400 mb-1">L&aring;ses opp i:</p>
            <p className="text-sm font-semibold text-teal-400">{lesson.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{lesson.bookTitle}</p>

            {lesson.ndlaUrl && (
              <a
                href={lesson.ndlaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                Les mer p&aring; NDLA &rarr;
              </a>
            )}

            <p className="text-xs text-slate-500 mt-3 italic">
              Sp&oslash;r l&aelig;reren din n&aring;r denne leksjonen aktiveres!
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center">
            Sp&oslash;r l&aelig;reren din for &aring; l&aring;se opp denne funksjonen.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-xl text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          Lukk
        </button>
      </motion.div>
    </motion.div>
  )
}
