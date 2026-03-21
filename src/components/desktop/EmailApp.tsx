import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import type { GameEmail, EmailChoice } from '../../types/Desktop'
import { GameButton } from '../ui/animations'

interface Props {
  onClose: () => void
}

const typeColors: Record<string, string> = {
  opportunity: 'text-emerald-400',
  supplier: 'text-blue-400',
  complaint: 'text-red-400',
  marketing: 'text-purple-400',
  regulatory: 'text-amber-400',
  competitor: 'text-orange-400',
}

const typeLabels: Record<string, string> = {
  opportunity: 'Mulighet',
  supplier: 'Leverandør',
  complaint: 'Kundeklage',
  marketing: 'Markedsføring',
  regulatory: 'Myndighetene',
  competitor: 'Konkurrent',
}

export default function EmailApp({ onClose }: Props) {
  const emails = useGameStore((s) => s.gameEmails ?? [])
  const respondToEmail = useGameStore((s) => s.respondToEmail)
  const markEmailRead = useGameStore((s) => s.markEmailRead)

  const [selectedEmail, setSelectedEmail] = useState<GameEmail | null>(null)
  const [respondedAnimation, setRespondedAnimation] = useState<string | null>(null)

  const unreadCount = emails.filter((e) => !e.read).length
  const sortedEmails = [...emails].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1
    return b.month - a.month
  })

  function handleSelectEmail(email: GameEmail) {
    setSelectedEmail(email)
    if (!email.read) {
      markEmailRead(email.id)
    }
  }

  function handleRespond(email: GameEmail, choice: EmailChoice) {
    respondToEmail(email.id, choice)
    setRespondedAnimation(email.id)
    setTimeout(() => {
      setRespondedAnimation(null)
      setSelectedEmail(null)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 bg-slate-900 flex flex-col"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl">📧</span>
          <h2 className="font-bold text-white">E-post</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} uleste
            </span>
          )}
        </div>
        <GameButton
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </GameButton>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Email list */}
        <div className="w-80 border-r border-slate-700 overflow-y-auto flex-shrink-0">
          {sortedEmails.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              <div className="text-3xl mb-2">📭</div>
              <div>Ingen e-poster ennå</div>
            </div>
          ) : (
            sortedEmails.map((email, i) => (
              <motion.button
                key={email.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                onClick={() => handleSelectEmail(email)}
                className={`w-full text-left p-3 border-b border-slate-800 transition-colors ${
                  selectedEmail?.id === email.id
                    ? 'bg-teal-500/10 border-l-2 border-l-teal-500'
                    : email.read
                      ? 'hover:bg-slate-800/50'
                      : 'bg-slate-800/30 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">{email.fromIcon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${!email.read ? 'text-white' : 'text-slate-400'}`}>
                        {email.from}
                      </span>
                      {!email.read && (
                        <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className={`text-sm truncate ${!email.read ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {email.subject}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-medium ${typeColors[email.type]}`}>
                        {typeLabels[email.type]}
                      </span>
                      {email.responded && (
                        <span className="text-[10px] text-emerald-400">✓ Besvart</span>
                      )}
                      {email.deadline && !email.responded && (
                        <span className="text-[10px] text-amber-400">⏰ {email.deadline}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>

        {/* Email detail */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedEmail ? (
              <motion.div
                key={selectedEmail.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 max-w-2xl"
              >
                {/* From */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                    {selectedEmail.fromIcon}
                  </div>
                  <div>
                    <div className="font-bold text-white">{selectedEmail.from}</div>
                    <div className={`text-xs ${typeColors[selectedEmail.type]}`}>
                      {typeLabels[selectedEmail.type]}
                    </div>
                  </div>
                  {selectedEmail.deadline && (
                    <div className="ml-auto bg-amber-500/10 text-amber-400 text-xs font-medium px-2 py-1 rounded-lg border border-amber-500/20">
                      Frist: {selectedEmail.deadline}
                    </div>
                  )}
                </div>

                {/* Subject */}
                <h3 className="text-xl font-bold text-white mb-4">{selectedEmail.subject}</h3>

                {/* Body */}
                <div className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  {selectedEmail.body}
                </div>

                {/* Choices */}
                {!selectedEmail.responded ? (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Velg handling:
                    </div>
                    {selectedEmail.choices.map((choice) => (
                      <motion.button
                        key={choice.id}
                        whileHover={{ x: 4, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRespond(selectedEmail, choice)}
                        className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-teal-500/50 hover:bg-teal-500/5 transition-colors flex items-center gap-3"
                      >
                        <span className="text-xl">{choice.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-white">{choice.label}</div>
                          {choice.cost && choice.cost > 0 && (
                            <div className="text-xs text-red-400 mt-0.5">
                              Kostnad: -{choice.cost.toLocaleString('nb-NO')} kr
                            </div>
                          )}
                          {(choice.effect.reputation || choice.effect.demand || choice.effect.awareness) && (
                            <div className="flex gap-2 mt-1">
                              {choice.effect.reputation && choice.effect.reputation !== 0 && (
                                <span className={`text-[10px] ${choice.effect.reputation > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                  Rykte {choice.effect.reputation > 0 ? '+' : ''}{choice.effect.reputation}
                                </span>
                              )}
                              {choice.effect.demand && choice.effect.demand !== 0 && (
                                <span className={`text-[10px] ${choice.effect.demand > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                  Etterspørsel {choice.effect.demand > 0 ? '+' : ''}{choice.effect.demand}%
                                </span>
                              )}
                              {choice.effect.awareness && choice.effect.awareness !== 0 && (
                                <span className="text-[10px] text-blue-400">
                                  Synlighet +{choice.effect.awareness}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <span className="text-slate-500 text-lg">→</span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center"
                  >
                    <span className="text-emerald-400 font-medium">✓ Du har svart på denne e-posten</span>
                  </motion.div>
                )}

                {/* Responded animation */}
                <AnimatePresence>
                  {respondedAnimation === selectedEmail.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    >
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: [0.5, 1.2, 1] }}
                        className="bg-emerald-500 text-white font-bold text-2xl rounded-full w-20 h-20 flex items-center justify-center shadow-2xl"
                      >
                        ✓
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full text-slate-500"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">📧</div>
                  <div>Velg en e-post for å lese den</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
