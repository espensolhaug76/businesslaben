import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function OrganizationComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const { passed, score } = (location.state as { passed: boolean; score: number }) ?? { passed: false, score: 0 }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-6xl mb-6">{passed ? '🏆' : '📚'}</div>
        <h1 className="text-3xl font-extrabold mb-3">
          {passed ? 'Modul fullført!' : 'Øv mer!'}
        </h1>
        <p className="theory-subtext mb-6">
          {passed
            ? `Du bemannet ${score} av 5 bedrifter riktig. Du forstår organisasjonsstruktur!`
            : `Du fikk ${score} av 5. Du trenger 3 for å bestå. Prøv igjen!`}
        </p>

        {passed && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-6 text-left">
            <h3 className="text-emerald-400 font-bold mb-2">🎯 Læringsutbytte</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>✓ Du kan identifisere kritiske roller i ulike bedrifter</li>
              <li>✓ Du forstår organisasjonshierarkiet</li>
              <li>✓ Du kan matche ansvar til stillingstitler</li>
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!passed && (
            <button
              onClick={() => navigate('/learning/forretningsdrift/organization')}
              className="w-full py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 transition-colors"
            >
              Prøv igjen
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl font-bold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Tilbake til hjem
          </button>
        </div>
      </motion.div>
    </div>
  )
}
