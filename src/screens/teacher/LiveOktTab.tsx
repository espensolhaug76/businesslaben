import { useState, useEffect, useMemo } from 'react'
import { ref, set, update, onValue, remove } from 'firebase/database'
import { db } from '../../lib/firebase'
import {
  ALL_PRESENTATIONS,
  PRESENTATION_SECTIONS,
  findPresentation,
  type PresentationEntry,
  type PresentationSection,
} from '../../lib/presentationRegistry'

type SessionMode = 'presentation' | 'minileksjon' | 'spill'

interface LiveSessionState {
  active: boolean
  mode: SessionMode
  presentationId: string
  quizActive: boolean
  quizQuestion: string
  quizOptions: string[]
  quizCorrect: number | null
  showResults: boolean
  quizStartTime: number
}

interface QuizAnswer { answer: number; timestamp: number }
interface QuizAnswersMap { [studentName: string]: QuizAnswer }
interface StudentQuestion { id: string; name: string; question: string; timestamp: number; read: boolean }

interface TeacherClass { code: string; name: string; subject: string }

function getActiveClass(): TeacherClass | null {
  try {
    const classes: TeacherClass[] = JSON.parse(localStorage.getItem('teacher-classes') ?? '[]')
    const activeCode = localStorage.getItem('teacher-classroom-code') ?? ''
    return classes.find(c => c.code === activeCode) ?? null
  } catch { return null }
}

// Map TeacherClass.subject id (e.g. 'ssr_fd_vg1', 'ml1') → which PresentationSection
// to default-expand. Returns null if no clean match (then expand nothing).
function defaultSectionKey(subjectId: string): string | null {
  const m: Record<string, string> = {
    ssr_fd_vg1: 'vg1|ssr|forretningsdrift',
    ssr_mi_vg1: 'vg1|ssr|mfi',
    ssr_ks_vg1: 'vg1|ssr|kultur',
    fd_vg2:     'vg2|ssr|okonomi',
    inn_vg2:    'vg2|ssr|kommunikasjon',
    kul_vg2:    'vg2|ssr|hms',
    ml1:        'vg2|ml|',
    ent1:       'vg2|ent|',
  }
  return m[subjectId] ?? null
}

function sectionKey(s: PresentationSection): string {
  return `${s.level}|${s.subject}|${s.ssrSubject ?? ''}`
}
function entryKey(e: PresentationEntry): string {
  return `${e.level}|${e.subject}|${e.ssrSubject ?? ''}`
}

const MODE_OPTIONS: { id: SessionMode; icon: string; title: string; desc: string; color: string }[] = [
  { id: 'presentation', icon: '📊', title: 'Presentasjon', desc: 'Du holder en presentasjon. Elevene følger med på sin skjerm.', color: '#0d9488' },
  { id: 'minileksjon',  icon: '🧠', title: 'Minileksjon',  desc: 'Elevene jobber selvstendig med læringsmoduler.', color: '#6366f1' },
  { id: 'spill',        icon: '🎮', title: 'Spillet',       desc: 'Elevene spiller bedriftssimulatoren.', color: '#f59e0b' },
]

export default function LiveOktTab() {
  const classroomCode = localStorage.getItem('teacher-classroom-code') ?? ''
  const activeClass = useMemo(() => getActiveClass(), [classroomCode])
  const className = activeClass?.name?.trim() || ''

  const [session, setSession] = useState<LiveSessionState | null>(null)
  const [selectedMode, setSelectedMode] = useState<SessionMode>('presentation')
  const [selectedPresentationId, setSelectedPresentationId] = useState('')
  const [showQuizPanel, setShowQuizPanel] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState('')
  const [quizOptions, setQuizOptions] = useState(['', '', '', ''])
  const [answersMap, setAnswersMap] = useState<QuizAnswersMap>({})
  const [questions, setQuestions] = useState<StudentQuestion[]>([])
  const [search, setSearch] = useState('')

  const defaultKey = activeClass ? defaultSectionKey(activeClass.subject) : null
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() =>
    new Set<string>(defaultKey ? [defaultKey] : []),
  )

  // Group presentations by section
  const grouped = useMemo(() => {
    const filtered = search.trim()
      ? ALL_PRESENTATIONS.filter(p => p.title.toLowerCase().includes(search.trim().toLowerCase()))
      : ALL_PRESENTATIONS
    const map = new Map<string, PresentationEntry[]>()
    for (const p of filtered) {
      const k = entryKey(p)
      if (!map.has(k)) map.set(k, [])
      map.get(k)!.push(p)
    }
    return map
  }, [search])

  // Auto-expand all sections when there is an active search query
  const isSearching = search.trim().length > 0

  useEffect(() => {
    if (!classroomCode) return
    return onValue(ref(db, 'sessions/' + classroomCode), snap => setSession(snap.val() as LiveSessionState | null))
  }, [classroomCode])

  useEffect(() => {
    if (!classroomCode || !session?.active) return
    return onValue(ref(db, 'sessions/' + classroomCode + '/answers'), snap => setAnswersMap(snap.val() ?? {}))
  }, [classroomCode, session?.active])

  useEffect(() => {
    if (!classroomCode || !session?.active) return
    return onValue(ref(db, 'sessions/' + classroomCode + '/questions'), snap => {
      const val = snap.val() as Record<string, Omit<StudentQuestion, 'id'>> | null
      if (!val) { setQuestions([]); return }
      const list = Object.entries(val).map(([id, q]) => ({ id, ...q }))
      list.sort((a, b) => a.timestamp - b.timestamp)
      setQuestions(list)
    })
  }, [classroomCode, session?.active])

  function startSession() {
    if (!classroomCode || !selectedPresentationId) return
    set(ref(db, 'sessions/' + classroomCode), {
      active: true,
      mode: selectedMode,
      presentationId: selectedPresentationId,
      quizActive: false,
      quizQuestion: '',
      quizOptions: [],
      quizCorrect: null,
      showResults: false,
      quizStartTime: 0,
    })
    setShowQuizPanel(false)
    setAnswersMap({})
    setQuestions([])
  }

  function endSession() {
    if (!classroomCode) return
    update(ref(db, 'sessions/' + classroomCode), { active: false })
  }

  function sendQuiz() {
    if (!classroomCode || !session || !quizQuestion.trim() || quizOptions.some(o => !o.trim())) return
    remove(ref(db, 'sessions/' + classroomCode + '/answers'))
    setAnswersMap({})
    update(ref(db, 'sessions/' + classroomCode), { quizActive: true, quizQuestion: quizQuestion.trim(), quizOptions: quizOptions.map(o => o.trim()), quizCorrect: null, showResults: false, quizStartTime: Date.now() })
  }

  function showResults(correctIndex: number) {
    update(ref(db, 'sessions/' + classroomCode), { quizCorrect: correctIndex, showResults: true })
  }

  function closeQuiz() {
    update(ref(db, 'sessions/' + classroomCode), { quizActive: false, showResults: false, quizCorrect: null })
    remove(ref(db, 'sessions/' + classroomCode + '/answers'))
    setAnswersMap({})
    setShowQuizPanel(false)
  }

  function markQuestionRead(pushId: string) {
    update(ref(db, 'sessions/' + classroomCode + '/questions/' + pushId), { read: true })
  }

  function toggleSection(key: string) {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const answerValues = Object.values(answersMap)
  const answerCounts = [0, 1, 2, 3].map(i => answerValues.filter(a => a.answer === i).length)
  const totalAnswers = answerValues.length

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none' }

  const classLabel = className
    ? <>{className} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(kode: <strong style={{ fontFamily: 'monospace', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>{classroomCode}</strong>)</span></>
    : <strong style={{ fontFamily: 'monospace', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>{classroomCode}</strong>

  // ── Before session ──────────────────────────────────────────────────────────
  if (!session?.active) {
    return (
      <div style={{ maxWidth: 720 }}>
        {!classroomCode && (
          <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626', fontSize: 13, marginBottom: 16 }}>
            Ingen klassekode funnet. Opprett en klasse i Klasser-fanen.
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Start live økt</h2>
        {classroomCode && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
            Klasse: {classLabel}
          </p>
        )}

        {/* Mode selector */}
        <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>Hva skal elevene gjøre?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {MODE_OPTIONS.map(m => {
            const active = selectedMode === m.id
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMode(m.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
                  padding: '16px 20px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
                  border: active ? `2px solid ${m.color}` : '1px solid var(--border)',
                  background: active ? `${m.color}14` : 'var(--card-bg)',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 32, flexShrink: 0 }}>{m.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: active ? m.color : 'var(--text-primary)', margin: 0 }}>{m.title}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0' }}>{m.desc}</p>
                </div>
                <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', border: `2px solid ${active ? m.color : 'var(--border)'}`, background: active ? m.color : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {active && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'block' }} />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Presentation picker — grouped by section */}
        {selectedMode === 'presentation' && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>Velg presentasjon</p>

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Søk i presentasjoner…"
              style={{ ...inp, marginBottom: 12 }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PRESENTATION_SECTIONS.map(section => {
                const key = sectionKey(section)
                const items = grouped.get(key) ?? []
                if (items.length === 0) return null
                const isOpen = isSearching || expandedSections.has(key)
                return (
                  <div key={key} style={{ border: '1px solid var(--border)', borderRadius: 10, background: 'var(--card-bg)', overflow: 'hidden' }}>
                    <button
                      onClick={() => toggleSection(key)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{section.title}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                        <span>{items.length}</span>
                        <span>{isOpen ? '▾' : '▸'}</span>
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
                        {items.map(p => {
                          const active = selectedPresentationId === p.id
                          return (
                            <button
                              key={p.id}
                              onClick={() => setSelectedPresentationId(p.id)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                                padding: '10px 14px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                                border: 'none', borderTop: '1px solid var(--border)',
                                background: active ? 'rgba(13,148,136,0.08)' : 'transparent',
                              }}
                            >
                              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#0d9488' : 'var(--text-primary)' }}>{p.title}</span>
                              {active && <span style={{ fontSize: 12, color: '#0d9488', fontWeight: 700 }}>✓</span>}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
              {grouped.size === 0 && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '12px 4px', margin: 0 }}>
                  Ingen presentasjoner matcher «{search}».
                </p>
              )}
            </div>
          </div>
        )}

        <button
          onClick={startSession}
          disabled={!classroomCode || (selectedMode === 'presentation' && !selectedPresentationId)}
          style={{
            background: classroomCode && (selectedMode !== 'presentation' || selectedPresentationId)
              ? MODE_OPTIONS.find(m => m.id === selectedMode)!.color
              : '#d1d5db',
            color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: classroomCode && (selectedMode !== 'presentation' || selectedPresentationId) ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          ▶ Start live økt
        </button>
      </div>
    )
  }

  // ── Active session ──────────────────────────────────────────────────────────
  const modeInfo = MODE_OPTIONS.find(m => m.id === session.mode) ?? MODE_OPTIONS[0]
  const activePresentation = session.mode === 'presentation' ? findPresentation(session.presentationId) : null
  const activeRoute = activePresentation?.route ?? `/learning/presentations/${session.presentationId}`

  return (
    <div style={{ maxWidth: 720 }}>

      {/* Header: class + mode */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          Klasse: {classLabel}
        </p>
      </div>

      {/* Mode indicator */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, padding: '12px 16px', borderRadius: 10, background: `${modeInfo.color}14`, border: `1px solid ${modeInfo.color}40` }}>
        <span style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>{modeInfo.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: modeInfo.color, margin: 0 }}>
            {session.mode === 'presentation' && activePresentation
              ? <>Presentasjon: <span style={{ color: 'var(--text-primary)' }}>{activePresentation.title}</span></>
              : modeInfo.title}
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0' }}>{modeInfo.desc}</p>
        </div>
        <button onClick={endSession} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: 13, fontWeight: 500, flexShrink: 0, fontFamily: 'inherit' }}>
          Avslutt økt
        </button>
      </div>

      {/* Presentation controls — only shown in presentation mode */}
      {session.mode === 'presentation' && (
        <>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 18px' }}>
              Trykk «📺 Åpne på storskjerm» for å starte presentasjonen. Naviger med piltastene eller knappene i presentasjonen — elevenes skjerm følger automatisk.
            </p>
            <button
              onClick={() => window.open(`${activeRoute}?live-code=${classroomCode}`, '_blank')}
              style={{ padding: '10px 20px', borderRadius: 8, border: '1.5px solid #0d9488', background: 'transparent', color: '#0d9488', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              📺 Åpne på storskjerm
            </button>
          </div>

          {/* Quiz */}
          {!session.quizActive && !session.showResults && (
            <button onClick={() => setShowQuizPanel(v => !v)} style={{ marginBottom: 16, padding: '8px 18px', borderRadius: 8, border: '1.5px solid #6366f1', background: 'transparent', color: '#6366f1', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: 'inherit' }}>
              {showQuizPanel ? '✕ Lukk quiz' : '+ Start quiz'}
            </button>
          )}

          {showQuizPanel && !session.quizActive && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px', marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Quiz-spørsmål</h4>
              <input type="text" value={quizQuestion} onChange={e => setQuizQuestion(e.target.value)} placeholder="Skriv spørsmålet her..." style={{ ...inp, marginBottom: 10 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {quizOptions.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0, background: ['#0d9488', '#f59e0b', '#8b5cf6', '#3b82f6'][i] }}>{String.fromCharCode(65 + i)}</span>
                    <input type="text" value={opt} onChange={e => { const n = [...quizOptions]; n[i] = e.target.value; setQuizOptions(n) }} placeholder={`Alternativ ${String.fromCharCode(65 + i)}`} style={{ ...inp, flex: 1 }} />
                  </div>
                ))}
              </div>
              <button onClick={sendQuiz} disabled={!quizQuestion.trim() || quizOptions.some(o => !o.trim())} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: (!quizQuestion.trim() || quizOptions.some(o => !o.trim())) ? '#d1d5db' : '#6366f1', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Send quiz til elever
              </button>
            </div>
          )}

          {session.quizActive && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid #6366f1', borderRadius: 16, padding: '20px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{session.quizQuestion}</h4>
                <span style={{ fontSize: 13, color: '#6366f1', fontWeight: 600 }}>{totalAnswers} elever har svart</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {session.quizOptions.map((opt, i) => {
                  const count = answerCounts[i]
                  const pct = totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0
                  const isCorrect = session.showResults && i === session.quizCorrect
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 12 }}>
                        <span style={{ fontWeight: isCorrect ? 700 : 400, color: isCorrect ? '#10b981' : 'var(--text-muted)' }}>{isCorrect && '✓ '}{opt}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{count} ({pct}%)</span>
                      </div>
                      <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: 8, borderRadius: 4, width: `${pct}%`, background: isCorrect ? '#10b981' : ['#0d9488', '#f59e0b', '#8b5cf6', '#3b82f6'][i], transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              {!session.showResults ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>Riktig svar:</span>
                  {session.quizOptions.map((opt, i) => (
                    <button key={i} onClick={() => showResults(i)} style={{ padding: '6px 14px', borderRadius: 7, border: '1.5px solid #10b981', background: 'transparent', color: '#10b981', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>
                      {String.fromCharCode(65 + i)}: {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <button onClick={closeQuiz} style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>Lukk quiz</button>
              )}
            </div>
          )}
        </>
      )}

      {/* For minileksjon / spill modes — simple status */}
      {session.mode !== 'presentation' && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px', marginBottom: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 48 }}>{modeInfo.icon}</span>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginTop: 12 }}>
            Elevene er sendt til {modeInfo.title}
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            {session.mode === 'minileksjon'
              ? 'Elevene ser læringsmoduler på sin skjerm.'
              : 'Elevene spiller bedriftssimulatoren på sin skjerm.'}
          </p>
        </div>
      )}

      {/* Student questions */}
      {questions.filter(q => !q.read).length > 0 && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid #f59e0b', borderRadius: 16, padding: '16px 20px' }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b', margin: '0 0 10px' }}>🙋 Spørsmål fra elever</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {questions.filter(q => !q.read).reverse().map(q => (
              <div key={q.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>{q.name}: </span>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{q.question}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>{new Date(q.timestamp).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <button onClick={() => markQuestionRead(q.id)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, flexShrink: 0, fontFamily: 'inherit' }}>Marker som lest</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
