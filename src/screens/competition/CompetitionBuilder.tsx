import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle, { useThemeEffect } from '../../components/ui/ThemeToggle'
import {
  QUESTION_BANK,
  competitionsKey,
} from '../../types/Competition'
import type { Competition, CompetitionQuestion } from '../../types/Competition'
import { saveCompetition as saveCompetitionToFirebase } from '../../lib/firebaseCompetitions'
import { MINE_FAG_OPTIONS } from '../../lib/teacherSubjects'

function genId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function genCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

function loadCompetitions(): Competition[] {
  try {
    const raw = localStorage.getItem(competitionsKey())
    return raw ? (JSON.parse(raw) as Competition[]) : []
  } catch { return [] }
}

/**
 * Lagrer konkurransen i Firebase (kilden til sannhet for cross-device) og
 * speiler den til localStorage som backup-cache for rask lokal visning.
 */
async function saveCompetition(c: Competition): Promise<void> {
  await saveCompetitionToFirebase(c)
  try {
    const list = loadCompetitions()
    list.push(c)
    localStorage.setItem(competitionsKey(), JSON.stringify(list))
  } catch { /* localStorage full eller blokkert — ignoreres, Firebase er kilden */ }
}

const TIME_OPTIONS = [10, 20, 30]

export default function CompetitionBuilder() {
  useThemeEffect()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState<string>('')
  const [shareToLeaderboard, setShareToLeaderboard] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [timeSeconds, setTimeSeconds] = useState(20)
  const [createdCode, setCreatedCode] = useState<string | null>(null)

  function toggleQuestion(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 15) {
        next.add(id)
      }
      return next
    })
  }

  function selectRandom() {
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5).slice(0, 15)
    setSelectedIds(new Set(shuffled.map(q => q.id)))
  }

  async function handleCreate() {
    if (!title.trim() || selectedIds.size !== 15) return
    const questions: CompetitionQuestion[] = QUESTION_BANK
      .filter(q => selectedIds.has(q.id))
      .map(q => ({ ...q, timeSeconds }))
    const code = genCode()
    const competition: Competition = {
      id: genId(),
      title: title.trim(),
      code,
      questions,
      status: 'waiting',
      currentQuestionIndex: 0,
      createdAt: new Date().toISOString(),
      canRepeat: true,
      subject: subject || undefined,
      shareToLeaderboard,
    }
    await saveCompetition(competition)
    setCreatedCode(code)
  }

  if (createdCode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm w-full rounded-3xl p-8 text-center border"
          style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: '#ccfbf1' }}>
            🎉
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Konkurranse opprettet!</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Del denne koden med elevene dine</p>
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--bg-secondary)' }}>
            <p className="text-5xl font-extrabold tracking-widest" style={{ color: '#0d9488' }}>{createdCode}</p>
          </div>
          <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            Elever går til <span className="font-mono font-medium">/competition/{createdCode}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/teacher')}
              className="flex-1 py-2.5 rounded-xl text-sm border font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
            >
              Tilbake
            </button>
            <button
              onClick={() => navigate(`/competition/live/${createdCode}`)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: '#0d9488' }}
            >
              Start konkurransen →
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div
        className="px-4"
        style={{ background: 'var(--card-bg)', borderBottom: '0.5px solid rgba(0,0,0,0.08)', height: '52px', display: 'flex', alignItems: 'center' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 w-full">
          <span className="text-base font-medium shrink-0" style={{ color: '#0d9488' }}>Businesslaben</span>
          <button onClick={() => navigate('/teacher')} className="text-sm" style={{ color: 'var(--text-muted)' }}>← Tilbake</button>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Ny konkurranse</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Velg 15 spørsmål og opprett en konkurranse med en unik kode</p>
        </div>

        {/* Subject + Title */}
        <div className="rounded-2xl p-5 border mb-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Velg fag</label>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm mb-4"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="">— velg fag —</option>
            {MINE_FAG_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>

          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Tittel</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="F.eks. Markedsføring – kapittel 3"
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Time per question */}
        <div className="rounded-2xl p-5 border mb-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <label className="block text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>Tid per spørsmål</label>
          <div className="flex gap-2">
            {TIME_OPTIONS.map(t => (
              <button
                key={t}
                onClick={() => setTimeSeconds(t)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all"
                style={
                  timeSeconds === t
                    ? { background: '#0d9488', color: '#fff', borderColor: '#0d9488' }
                    : { background: 'var(--bg-secondary)', color: 'var(--text-muted)', borderColor: 'var(--border)' }
                }
              >
                {t} sek
              </button>
            ))}
          </div>
        </div>

        {/* Question bank */}
        <div className="rounded-2xl border mb-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Spørsmålsbank</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {selectedIds.size}/15 valgt
              </p>
            </div>
            <button
              onClick={selectRandom}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
              style={{ borderColor: '#0d9488', color: '#0d9488', background: 'transparent' }}
            >
              Velg 15 tilfeldige
            </button>
          </div>
          {subject && (
            <div className="px-5 py-2 text-xs" style={{ background: 'rgba(245,158,11,0.08)', color: '#b45309', borderBottom: '1px solid var(--border)' }}>
              ⚠️ Spørsmålsbanken er ikke fag-tagget ennå — kan inneholde spørsmål utenfor faget ditt.
            </div>
          )}

          <div className="divide-y divide-[var(--border)]">
            {QUESTION_BANK.map((q, i) => {
              const selected = selectedIds.has(q.id)
              const disabled = !selected && selectedIds.size >= 15
              return (
                <label
                  key={q.id}
                  className="flex items-start gap-3 p-4 cursor-pointer transition-colors"
                  style={{
                    background: selected ? 'rgba(13,148,136,0.04)' : 'transparent',
                    opacity: disabled ? 0.4 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    disabled={disabled}
                    onChange={() => !disabled && toggleQuestion(q.id)}
                    className="mt-0.5 shrink-0"
                    style={{ accentColor: '#0d9488' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                      <span className="text-xs font-normal mr-2" style={{ color: 'var(--text-muted)' }}>{i + 1}.</span>
                      {q.question}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      Svar: {q.options[q.correct]}
                    </p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Cross-skole leaderboard opt-in */}
        <div className="rounded-2xl p-5 border mb-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={shareToLeaderboard}
              onChange={e => setShareToLeaderboard(e.target.checked)}
              className="mt-0.5 shrink-0"
              style={{ accentColor: '#0d9488' }}
            />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
              📊 Del klassens resultat på nasjonalt leaderboard
            </span>
          </label>
          {shareToLeaderboard && (
            <p className="text-xs mt-2 leading-relaxed pl-7" style={{ color: 'var(--text-muted)' }}>
              Kun klassens <strong>snitt</strong> og <strong>antall elever</strong> deles — ingen elevnavn eller individuelle svar lagres. Konkurransekoden brukes som ID, så dere kan oppdatere eller slette innsendingen senere.
            </p>
          )}
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          disabled={!title.trim() || selectedIds.size !== 15}
          className="w-full py-3.5 rounded-xl font-medium text-white transition-opacity disabled:opacity-40"
          style={{ background: '#0d9488' }}
        >
          {selectedIds.size === 15 ? 'Opprett konkurranse →' : `Velg ${15 - selectedIds.size} spørsmål til`}
        </button>
      </div>
    </div>
  )
}
