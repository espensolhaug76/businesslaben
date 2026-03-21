import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import type { NewsArticle } from '../../types/Desktop'
import { GameButton } from '../ui/animations'

interface Props {
  onClose: () => void
}

const categoryColors: Record<string, string> = {
  political: 'bg-red-500/20 text-red-400 border-red-500/30',
  economic: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  social: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  technological: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  industry: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
}

const categoryLabels: Record<string, string> = {
  political: 'Politikk',
  economic: 'Økonomi',
  social: 'Samfunn',
  technological: 'Teknologi',
  industry: 'Bransje',
}

export default function NewsApp({ onClose }: Props) {
  const news = useGameStore((s) => s.gameNews ?? [])
  const markNewsRead = useGameStore((s) => s.markNewsRead)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const unreadCount = news.filter((n) => !n.read).length
  const sortedNews = [...news].sort((a, b) => b.month - a.month)

  function handleExpand(article: NewsArticle) {
    setExpandedId(expandedId === article.id ? null : article.id)
    if (!article.read) {
      markNewsRead(article.id)
    }
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
          <span className="text-xl">📰</span>
          <h2 className="font-bold text-white">Nyheter</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} nye
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

      {/* News feed */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {sortedNews.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              <div className="text-4xl mb-3">📰</div>
              <div>Ingen nyheter ennå. Sjekk tilbake snart!</div>
            </div>
          ) : (
            sortedNews.map((article, i) => {
              const isExpanded = expandedId === article.id

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => handleExpand(article)}
                    whileHover={{ scale: 1.01 }}
                    className={`w-full text-left rounded-xl border transition-colors ${
                      isExpanded
                        ? 'bg-slate-800 border-teal-500/40'
                        : article.read
                          ? 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                          : 'bg-slate-800 border-slate-700 hover:border-slate-600 shadow-md'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Unread dot */}
                        {!article.read && (
                          <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                        )}

                        <div className="flex-1 min-w-0">
                          {/* Category + month */}
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${categoryColors[article.category]}`}>
                              {article.categoryIcon} {categoryLabels[article.category]}
                            </span>
                            <span className="text-[10px] text-slate-500">Mnd {article.month}</span>
                          </div>

                          {/* Headline */}
                          <h3 className={`font-bold mb-1 ${article.read ? 'text-slate-300' : 'text-white'}`}>
                            {article.headline}
                          </h3>

                          {/* Preview text */}
                          {!isExpanded && (
                            <p className="text-sm text-slate-400 line-clamp-2">
                              {article.body}
                            </p>
                          )}
                        </div>

                        {/* Expand arrow */}
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="text-slate-500 text-sm flex-shrink-0 mt-1"
                        >
                          ▼
                        </motion.span>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-slate-700/50 pt-3">
                            <p className="text-sm text-slate-300 leading-relaxed mb-3">
                              {article.body}
                            </p>

                            {article.effect && (
                              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-2">
                                <div className="text-[10px] font-bold text-amber-400 uppercase mb-1">Effekt</div>
                                <div className="text-sm text-amber-300">{article.effect}</div>
                              </div>
                            )}

                            {article.tip && (
                              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3">
                                <div className="text-[10px] font-bold text-teal-400 uppercase mb-1">Tips</div>
                                <div className="text-sm text-teal-300">{article.tip}</div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </motion.div>
  )
}
