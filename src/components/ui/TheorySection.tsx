import { motion } from 'framer-motion'
import GlossaryTermBadge from './GlossaryTermBadge'

interface TheoryPhaseData {
  icon: string
  title: string
  quote: string
  practical: string
  glossaryTerm?: string
  content?: string
  subpoints?: Array<{ label: string; text: string }>
}

interface Props {
  moduleIcon: string
  intro: string
  phases: TheoryPhaseData[]
  vissteduAt: string
  espenSier: string
  onStart: () => void
}

export default function TheorySection({ moduleIcon, intro, phases, vissteduAt, espenSier, onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Intro */}
      <div className="theory-bg rounded-2xl border border-slate-700/50 p-5">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{moduleIcon}</span>
          <div>
            <h2 className="text-lg font-bold theory-text mb-1">Teoridel</h2>
            <p className="theory-subtext text-sm leading-relaxed">{intro}</p>
          </div>
        </div>
      </div>

      {/* Phase steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide px-1">Steg for steg</h3>
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="theory-bg rounded-xl border border-slate-700/50 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-xs shrink-0">
                {i + 1}
              </span>
              <div className="space-y-1.5 min-w-0 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-base">{phase.icon}</span>
                  <p className="font-semibold theory-text text-sm">{phase.title}</p>
                </div>
                <p className="theory-subtext text-xs leading-relaxed italic">"{phase.quote}"</p>
                {phase.content && (
                  <p className="theory-subtext text-xs leading-relaxed mt-1">{phase.content}</p>
                )}
                {phase.subpoints && phase.subpoints.map((sp, j) => (
                  <div key={j} className="mt-2 pl-3 border-l-2 border-teal-500/30">
                    <p className="text-xs font-semibold theory-text">{sp.label}</p>
                    <p className="theory-subtext text-xs leading-relaxed mt-0.5">{sp.text}</p>
                  </div>
                ))}
                <p className="theory-muted text-xs leading-relaxed">
                  <span className="theory-muted font-medium">Praktisk: </span>{phase.practical}
                </p>
                {phase.glossaryTerm && (
                  <div className="pt-0.5">
                    <GlossaryTermBadge term={phase.glossaryTerm} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visste du at */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3">
        <span className="text-xl shrink-0">💡</span>
        <div>
          <p className="text-amber-300 font-semibold text-xs mb-1">Visste du at...?</p>
          <p className="text-amber-100/80 text-xs leading-relaxed">{vissteduAt}</p>
        </div>
      </div>

      {/* Espen says */}
      <div className="theory-bg rounded-xl border border-teal-500/30 p-4 flex gap-3">
        <span className="text-2xl shrink-0">🧑‍💼</span>
        <div>
          <p className="text-teal-400 font-semibold text-xs mb-1">Espen sier:</p>
          <p className="theory-subtext text-xs leading-relaxed italic">"{espenSier}"</p>
        </div>
      </div>

      {/* Start button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors text-sm"
        >
          Start øvelser →
        </button>
      </div>
    </motion.div>
  )
}
