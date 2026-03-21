import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  moduleTitle: string
  moduleIcon: string
  retryRoute: string
  learningOutcomes: string[]
}

export default function LearningComplete({ moduleTitle, moduleIcon, retryRoute, learningOutcomes }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { passed, score, total } = (location.state as { passed: boolean; score: number; total: number }) ?? { passed: false, score: 0, total: 5 }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">{passed ? moduleIcon : '📚'}</div>
        <h1 className="text-3xl font-extrabold mb-2">
          {passed ? 'Bestått!' : 'Fortsett å øve!'}
        </h1>
        <p className="theory-subtext mb-6">
          {moduleTitle}
        </p>

        <div className="theory-bg rounded-2xl border border-slate-700/50 p-5 mb-5">
          <div className="text-xs theory-muted mb-1">Resultat</div>
          <div className={`text-4xl font-extrabold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {score}/{total}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mt-3">
            <div
              className={`h-3 rounded-full transition-all ${passed ? 'bg-emerald-500' : 'bg-amber-400'}`}
              style={{ width: `${(score / total) * 100}%` }}
            />
          </div>
          <p className="theory-muted text-xs mt-2">
            {passed
              ? `Bra jobbet! Du svarte riktig på ${score} av ${total} øvelser.`
              : `Du trenger ${Math.ceil(total * 0.6)} riktige for å bestå. Prøv igjen!`}
          </p>
        </div>

        {passed && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-5 text-left">
            <h3 className="text-emerald-400 font-bold mb-2">🎯 Læringsmål oppnådd</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              {learningOutcomes.map((o, i) => (
                <li key={i}>✓ {o}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!passed && (
            <button
              onClick={() => navigate(retryRoute)}
              className="w-full py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors"
            >
              Prøv igjen
            </button>
          )}
          <button
            onClick={() => navigate('/learning')}
            className="w-full py-3 rounded-xl font-bold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            ← Tilbake til læringsmoduler
          </button>
        </div>
      </motion.div>
    </div>
  )
}
