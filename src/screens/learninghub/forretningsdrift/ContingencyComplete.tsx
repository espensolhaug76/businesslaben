import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ContingencyComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const { passed, score, reputation } = (location.state as { passed: boolean; score: number; reputation: number }) ?? { passed: false, score: 0, reputation: 0 }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-6xl mb-6">{passed ? '🚨' : '📚'}</div>
        <h1 className="text-3xl font-extrabold mb-3">
          {passed ? 'Krisehåndterer!' : 'Øv mer!'}
        </h1>

        {/* Reputation display */}
        <div className="theory-bg rounded-2xl border border-slate-700/50 p-4 mb-4">
          <div className="text-xs theory-muted mb-2">Endelig omdømmescore</div>
          <div className={`text-4xl font-extrabold ${
            reputation > 70 ? 'text-emerald-400' : reputation > 40 ? 'text-amber-400' : 'text-red-400'
          }`}>{reputation}/100</div>
          <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
            <div
              className={`h-3 rounded-full transition-all ${
                reputation > 70 ? 'bg-emerald-500' : reputation > 40 ? 'bg-amber-400' : 'bg-red-500'
              }`}
              style={{ width: `${reputation}%` }}
            />
          </div>
        </div>

        <p className="theory-subtext mb-6">
          {passed
            ? `Du håndterte ${score} av 5 kriser riktig. Omdømmet ditt: ${reputation}/100.`
            : `Du trenger 3 riktige svar OG omdømme ≥60 for å bestå. Prøv igjen!`}
        </p>

        {passed && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-6 text-left">
            <h3 className="text-emerald-400 font-bold mb-2">🎯 Læringsmål</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>✓ Du forstår hensikten med beredskapsplaner</li>
              <li>✓ Du kan prioritere tiltak under en krise</li>
              <li>✓ Du kjenner til lovkravene i vanlige situasjoner</li>
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!passed && (
            <button
              onClick={() => navigate('/learning/forretningsdrift/contingency')}
              className="w-full py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors"
            >
              Prøv igjen
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl font-bold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Tilbake til forsiden
          </button>
        </div>
      </motion.div>
    </div>
  )
}
