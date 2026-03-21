import { useState } from 'react'
import type { PESTEvent, EventChoice } from '../../types'

const categoryLabels: Record<string, { label: string; color: string; bg: string }> = {
  political: { label: 'Politisk', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
  economic: { label: 'Økonomisk', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  social: { label: 'Sosialt', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' },
  technological: { label: 'Teknologisk', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
}

interface EventModalProps {
  event: PESTEvent
  onChoose: (choice: EventChoice) => void
}

export default function EventModal({ event, onChoose }: EventModalProps) {
  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null)
  const [showConsequence, setShowConsequence] = useState(false)

  const catInfo = categoryLabels[event.category] ?? categoryLabels.political

  function handleSelect(choice: EventChoice) {
    setSelectedChoice(choice)
    setShowConsequence(true)
  }

  function handleConfirm() {
    if (selectedChoice) {
      onChoose(selectedChoice)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Category badge */}
        <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${catInfo.color} ${catInfo.bg} border-b`}>
          PEST-hendelse: {catInfo.label}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
          <p className="text-sm text-slate-400 mb-6">{event.description}</p>

          {/* Choices */}
          {!showConsequence ? (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-teal-400 uppercase tracking-wide">Hva gjør du?</h3>
              {event.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleSelect(choice)}
                  className="w-full p-4 rounded-xl border-2 border-slate-700 bg-slate-800/60 text-left hover:border-teal-500/50 hover:bg-slate-800 transition-all"
                >
                  <div className="font-medium text-white text-sm">{choice.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{choice.description}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-teal-400 mb-1">
                  Ditt valg: {selectedChoice?.label}
                </h3>
                <p className="text-sm text-slate-300">
                  {selectedChoice?.consequence.description}
                </p>
              </div>

              {selectedChoice && (
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Etterspørsel</div>
                    <div className={`font-bold ${selectedChoice.consequence.demandModifier >= 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedChoice.consequence.demandModifier >= 1 ? '+' : ''}
                      {Math.round((selectedChoice.consequence.demandModifier - 1) * 100)}%
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Kostnader</div>
                    <div className={`font-bold ${selectedChoice.consequence.costModifier <= 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedChoice.consequence.costModifier > 1 ? '+' : ''}
                      {Math.round((selectedChoice.consequence.costModifier - 1) * 100)}%
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Omdømme</div>
                    <div className={`font-bold ${selectedChoice.consequence.reputationModifier >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedChoice.consequence.reputationModifier >= 0 ? '+' : ''}
                      {selectedChoice.consequence.reputationModifier}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-500 text-center">
                Varighet: {selectedChoice?.consequence.duration} måned(er)
              </div>

              <button
                onClick={handleConfirm}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all"
              >
                Fortsett
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
