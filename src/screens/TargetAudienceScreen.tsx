import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { TargetSegment } from '../types'
import { PageTransition, GameButton } from '../components/ui/animations'

const genderOptions = [
  { id: 'female', label: 'Kvinner', icon: '👩' },
  { id: 'male', label: 'Menn', icon: '👨' },
  { id: 'kids', label: 'Barn', icon: '👶' },
]

const ageOptions = [
  { id: '0-12', label: '0-12' },
  { id: '13-20', label: '13-20' },
  { id: '21-30', label: '21-30' },
  { id: '31-45', label: '31-45' },
  { id: '46+', label: '46+' },
]

const psychographics = [
  { id: 'eco', label: 'Miljøbevisste', desc: 'Prioriterer bærekraft og miljøvennlige produkter', icon: '🌱' },
  { id: 'status', label: 'Statusbevisste', desc: 'Verdsetter merkevarer og eksklusivitet', icon: '💎' },
  { id: 'price', label: 'Prisfokuserte', desc: 'Jakter på best pris, sammenligner alltid', icon: '💰' },
]

const geographyOptions = [
  { id: 'local', label: 'Lokalt', desc: 'En by/kommune', icon: '📍', reach: '~50 000' },
  { id: 'regional', label: 'Regionalt', desc: 'En region/fylke', icon: '🗺️', reach: '~500 000' },
  { id: 'national', label: 'Nasjonalt', desc: 'Hele Norge', icon: '🇳🇴', reach: '~5 000 000' },
  { id: 'international', label: 'Internasjonalt', desc: 'Flere land', icon: '🌍', reach: '10 000 000+' },
]

export default function TargetAudienceScreen() {
  const navigate = useNavigate()
  const { targetSegments, addTargetSegment, removeTargetSegment } = useGameStore()

  const existing = targetSegments.find((s: TargetSegment) => s.isPrimary)
  const [selectedGenders, setSelectedGenders] = useState<string[]>(existing?.genders || [])
  const [ageGroup, setAgeGroup] = useState(existing?.ageGroups[0] || '')
  const [selectedPsycho, setSelectedPsycho] = useState(existing?.psychographics[0] || '')
  const [geography, setGeography] = useState(existing?.geography || '')

  const canProceed = selectedGenders.length > 0 && ageGroup.length > 0

  function toggleGender(id: string) {
    setSelectedGenders((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  function handleNext() {
    if (!canProceed) return

    const segment: TargetSegment = {
      geography: geography || 'local',
      genders: selectedGenders,
      ageGroups: [ageGroup],
      psychographics: selectedPsycho ? [selectedPsycho] : [],
      isPrimary: true,
      costToAdd: 0,
    }

    const primaryIdx = targetSegments.findIndex((s: TargetSegment) => s.isPrimary)
    if (primaryIdx >= 0) removeTargetSegment(primaryIdx)
    addTargetSegment(segment)
    navigate('/business-model')
  }

  function handleBack() {
    navigate('/sustainability')
  }

  return (
    <PageTransition>
      <div className="py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2">Velg målgruppe</h1>
          <p className="text-slate-400">Hvem skal du selge til?</p>
        </motion.div>

        {/* Gender */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/50 mb-4"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">Kjønn</h2>
          <div className="flex gap-3">
            {genderOptions.map((opt) => (
              <motion.button
                key={opt.id}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleGender(opt.id)}
                className={`flex-1 py-4 px-4 rounded-xl border-2 font-medium transition-colors text-center ${
                  selectedGenders.includes(opt.id)
                    ? 'border-teal-400 bg-teal-500/10 text-teal-300'
                    : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600'
                }`}
              >
                <motion.div
                  animate={selectedGenders.includes(opt.id) ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-2xl mb-1"
                >
                  {opt.icon}
                </motion.div>
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Age group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/50 mb-4"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">Aldersgruppe</h2>
          <div className="flex flex-wrap gap-3">
            {ageOptions.map((opt) => (
              <motion.button
                key={opt.id}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAgeGroup(opt.id)}
                className={`py-3 px-6 rounded-xl border-2 font-medium transition-colors ${
                  ageGroup === opt.id
                    ? 'border-teal-400 bg-teal-500/10 text-teal-300'
                    : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600'
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Psychographic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/50 mb-4"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">Psykografisk profil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {psychographics.map((p) => (
              <motion.button
                key={p.id}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedPsycho(selectedPsycho === p.id ? '' : p.id)}
                className={`p-4 rounded-xl border-2 text-left transition-colors ${
                  selectedPsycho === p.id
                    ? 'border-teal-400 bg-teal-500/10'
                    : 'border-slate-700 bg-slate-900/40 hover:border-slate-600'
                }`}
              >
                <motion.div
                  animate={selectedPsycho === p.id ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-2xl mb-2"
                >
                  {p.icon}
                </motion.div>
                <div className="font-medium text-white text-sm">{p.label}</div>
                <div className="text-xs text-slate-500 mt-1">{p.desc}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Geography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/50 mb-6"
        >
          <h2 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wide">Geografi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {geographyOptions.map((g) => (
              <motion.button
                key={g.id}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setGeography(g.id)}
                className={`p-4 rounded-xl border-2 text-center transition-colors ${
                  geography === g.id
                    ? 'border-teal-400 bg-teal-500/10'
                    : 'border-slate-700 bg-slate-900/40 hover:border-slate-600'
                }`}
              >
                <motion.div
                  animate={geography === g.id ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-2xl mb-1"
                >
                  {g.icon}
                </motion.div>
                <div className="font-medium text-white text-sm">{g.label}</div>
                <div className="text-xs text-slate-500 mt-1">{g.reach}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Persona preview */}
        <AnimatePresence>
          {canProceed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-5 mb-6"
            >
              <div className="text-sm font-semibold text-teal-400 mb-2">Din målgruppe:</div>
              <div className="text-white">
                {selectedGenders.map((g) => genderOptions.find((o) => o.id === g)?.label).join(', ')}
                {' | '}
                {ageGroup} år
                {selectedPsycho && ` | ${psychographics.find((p) => p.id === selectedPsycho)?.label}`}
                {geography && ` | ${geographyOptions.find((g) => g.id === geography)?.label}`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between"
        >
          <GameButton
            onClick={handleBack}
            className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
          >
            ← Tilbake
          </GameButton>
          <GameButton
            onClick={handleNext}
            disabled={!canProceed}
            pulse={canProceed}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              canProceed
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg hover:shadow-teal-500/30'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            Neste →
          </GameButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
