import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  competitionsKey,
} from '../../types/Competition'
import type {
  Competition,
  PlayerEntry,
} from '../../types/Competition'
import {
  getCompetitionDefinition,
  saveCompetition,
  subscribeToCurrentRun,
  subscribeToEntries,
  subscribeToRuns,
  type RunSummary,
} from '../../lib/firebaseCompetitions'

/**
 * Hent definisjonen — Firebase først, fall tilbake til localStorage og
 * migrer ved første åpning.
 */
async function loadDefinitionWithMigration(code: string): Promise<Competition | null> {
  const fromFb = await getCompetitionDefinition(code)
  if (fromFb) return fromFb
  try {
    const raw = localStorage.getItem(competitionsKey())
    if (!raw) return null
    const list = JSON.parse(raw) as Competition[]
    const found = list.find(c => c.code === code) ?? null
    if (found) await saveCompetition(found).catch(() => { /* ignore */ })
    return found
  } catch { return null }
}

// ── Medal helpers ──────────────────────────────────────────────────────────────

const RANK_STYLES: Record<number, { bg: string; text: string; medal: string }> = {
  0: { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', text: '#fff', medal: '👑' },
  1: { bg: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', text: '#1e293b', medal: '🥈' },
  2: { bg: 'linear-gradient(135deg, #a78060, #c8956c)', text: '#fff', medal: '🥉' },
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ── Best class calculation ─────────────────────────────────────────────────────

interface ClassScore {
  className: string
  avgPoints: number
  count: number
}

function calcBestClasses(entries: PlayerEntry[]): ClassScore[] {
  const byClass: Record<string, number[]> = {}
  for (const e of entries) {
    if (!byClass[e.className]) byClass[e.className] = []
    byClass[e.className].push(e.totalPoints)
  }
  return Object.entries(byClass)
    .map(([className, scores]) => ({
      className,
      avgPoints: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      count: scores.length,
    }))
    .sort((a, b) => b.avgPoints - a.avgPoints)
}

// ── Player row ─────────────────────────────────────────────────────────────────

function PlayerRow({ entry, rank, maxPoints }: { entry: PlayerEntry; rank: number; maxPoints: number }) {
  const style = RANK_STYLES[rank]
  const pct = maxPoints > 0 ? (entry.totalPoints / maxPoints) * 100 : 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05, layout: { duration: 0.4 } }}
      className="flex items-center gap-4 p-4 rounded-2xl"
      style={
        style
          ? { background: style.bg }
          : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
      }
    >
      {/* Rank */}
      <div className="w-10 text-center shrink-0">
        {style ? (
          <span className="text-2xl">{style.medal}</span>
        ) : (
          <span className="text-lg font-bold text-slate-400">#{rank + 1}</span>
        )}
      </div>

      {/* Name + class */}
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-lg leading-tight truncate"
          style={{ color: style?.text ?? '#fff' }}
        >
          {entry.studentName}
        </p>
        <p className="text-xs truncate" style={{ color: style ? `${style.text}99` : 'rgba(255,255,255,0.5)' }}>
          {entry.className}
        </p>
        {/* Progress bar */}
        <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: rank * 0.05 }}
            className="h-full rounded-full"
            style={{ background: style ? 'rgba(255,255,255,0.7)' : '#0d9488' }}
          />
        </div>
      </div>

      {/* Points */}
      <div className="text-right shrink-0">
        <p
          className="text-2xl font-extrabold"
          style={{ color: style?.text ?? '#0d9488' }}
        >
          {entry.totalPoints}
        </p>
        <p className="text-xs" style={{ color: style ? `${style.text}80` : 'rgba(255,255,255,0.4)' }}>
          poeng
        </p>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Leaderboard() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()

  const [competition, setCompetition] = useState<Competition | null>(null)
  const [entries, setEntries] = useState<PlayerEntry[]>([])
  const [runs, setRuns] = useState<RunSummary[]>([])
  const [currentRunId, setCurrentRunId] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  // Load competition definition (Firebase + localStorage migrasjon)
  useEffect(() => {
    if (!code) return
    let cancelled = false
    loadDefinitionWithMigration(code).then(c => {
      if (!cancelled) setCompetition(c)
    })
    return () => { cancelled = true }
  }, [code])

  // Subscribe to currentRun for å vite hvilket runId vi skal følge
  useEffect(() => {
    if (!code) return
    return subscribeToCurrentRun(code, run => setCurrentRunId(run?.runId ?? null))
  }, [code])

  // Subscribe to entries for current run
  useEffect(() => {
    if (!code || !currentRunId) { setEntries([]); return }
    return subscribeToEntries(code, currentRunId, list => {
      setEntries([...list].sort((a, b) => b.totalPoints - a.totalPoints))
    })
  }, [code, currentRunId])

  // Subscribe to all runs (for historikk-seksjonen)
  useEffect(() => {
    if (!code) return
    return subscribeToRuns(code, setRuns)
  }, [code])

  const maxPoints = competition ? competition.questions.length * 1000 : 15000
  const top10 = entries.slice(0, 10)
  const bestClasses = calcBestClasses(entries)

  // Vis tidligere runs (alle som ikke er current OG har minst én entry)
  const history = runs.filter(r => r.runId !== currentRunId && r.entries.length > 0)

  if (!competition) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-slate-400">Konkurranse ikke funnet for kode: {code}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Ledertavle</p>
          <h1 className="text-2xl font-extrabold">{competition.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400">Kode</p>
            <p className="font-mono text-2xl font-extrabold text-teal-400 tracking-widest">{code}</p>
          </div>
          <button
            onClick={() => navigate('/teacher')}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">

          {/* Top 10 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-200">Top 10</h2>
              <span className="text-sm text-slate-500">{entries.length} deltagere</span>
            </div>

            {entries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 text-4xl mb-3">⏳</p>
                <p className="text-slate-400">Venter på at elever svarer...</p>
              </div>
            ) : (
              <AnimatePresence>
                <div className="space-y-2">
                  {top10.map((entry, rank) => (
                    <PlayerRow
                      key={`${entry.studentName}-${entry.className}-${entry.runId}`}
                      entry={entry}
                      rank={rank}
                      maxPoints={maxPoints}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* Best class */}
          {bestClasses.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-4">Beste klasse</h2>
              <div className="space-y-2">
                {bestClasses.slice(0, 3).map((cls, i) => (
                  <div
                    key={cls.className}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-xl w-8 text-center">{['🥇', '🥈', '🥉'][i] ?? `#${i + 1}`}</span>
                    <div className="flex-1">
                      <p className="font-bold">{cls.className}</p>
                      <p className="text-xs text-slate-500">{cls.count} elever</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-teal-400">{cls.avgPoints}</p>
                      <p className="text-xs text-slate-500">snitt</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous runs */}
          {history.length > 0 && (
            <div>
              <button
                onClick={() => setShowHistory(v => !v)}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors mb-3"
              >
                <span className="text-xs">▶</span>
                Tidligere runder ({history.length})
              </button>

              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {history.map((run, ri) => {
                      const sorted = [...run.entries].sort((a, b) => b.totalPoints - a.totalPoints)
                      const top3 = sorted.slice(0, 3)
                      return (
                        <div
                          key={run.runId}
                          className="rounded-2xl p-4 border border-slate-800"
                          style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-slate-300">Runde {history.length - ri}</p>
                            <p className="text-xs text-slate-500">{run.finishedAt ? formatDate(run.finishedAt) : formatDate(run.startedAt)}</p>
                          </div>
                          <div className="space-y-1.5">
                            {top3.map((entry, rank) => (
                              <div key={`${entry.studentName}-${entry.className}`} className="flex items-center gap-3 text-sm">
                                <span className="w-6 text-center text-base">{['🥇', '🥈', '🥉'][rank]}</span>
                                <span className="flex-1 text-slate-300">{entry.studentName}</span>
                                <span className="text-xs text-slate-500">{entry.className}</span>
                                <span className="font-bold text-teal-400">{entry.totalPoints}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
