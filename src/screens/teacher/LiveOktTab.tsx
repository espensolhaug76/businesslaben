import { useState, useEffect, useMemo } from 'react'
import { ref, set, update, onValue, remove } from 'firebase/database'
import { db } from '../../lib/firebase'
import { getPresentationsForSubject, ALL_PRESENTATIONS, type Presentation } from '../../lib/presentationsData'

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

function getActiveClassSubject(): string {
  try {
    const classes: TeacherClass[] = JSON.parse(localStorage.getItem('teacher-classes') ?? '[]')
    const activeCode = localStorage.getItem('teacher-classroom-code') ?? ''
    const active = classes.find(c => c.code === activeCode)
    return active?.subject ?? ''
  } catch { return '' }
}

const MODE_OPTIONS: { id: SessionMode; icon: string; title: string; desc: string; color: string }[] = [
  { id: 'presentation', icon: '📊', title: 'Presentasjon', desc: 'Du holder en presentasjon. Elevene følger med på sin skjerm.', color: '#0d9488' },
  { id: 'minileksjon',  icon: '🧠', title: 'Minileksjon',  desc: 'Elevene jobber selvstendig med læringsmoduler.', color: '#6366f1' },
  { id: 'spill',        icon: '🎮', title: 'Spillet',       desc: 'Elevene spiller bedriftssimulatoren.', color: '#f59e0b' },
]

export default function LiveOktTab() {
  const classroomCode = localStorage.getItem('teacher-classroom-code') ?? ''

  const PRESENTATIONS: Presentation[] = useMemo(() => {
    const subject = getActiveClassSubject()
    return subject ? getPresentationsForSubject(subject) : ALL_PRESENTATIONS
  }, [classroomCode])

  const [session, setSession] = useState<LiveSessionState | null>(null)
  const [selectedMode, setSelectedMode] = useState<SessionMode>('presentation')
  const [selectedPresentationId, setSelectedPresentationId] = useState(() => PRESENTATIONS[0]?.id ?? '')
  const [showQuizPanel, setShowQuizPanel] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState('')
  const [quizOptions, setQuizOptions] = useState(['', '', '', ''])
  const [answersMap, setAnswersMap] = useState<QuizAnswersMap>({})
  const [questions, setQuestions] = useState<StudentQuestion[]>([])

  // Reset selection when subject changes (PRESENTATIONS list changes)
  useEffect(() => {
    if (!PRESENTATIONS.find(p => p.id === selectedPresentationId)) {
      setSelectedPresentationId(PRESENTATIONS[0]?.id ?? '')
    }
  }, [PRESENTATIONS])

  const presentation = PRESENTATIONS.find(p => p.id === (session?.presentationId ?? selectedPresentationId)) ?? PRESENTATIONS[0]

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
    if (!classroomCode) return
    const pres = PRESENTATIONS.find(p => p.id === selectedPresentationId)!
    set(ref(db, 'sessions/' + classroomCode), {
      active: true,
      mode: selectedMode,
      presentationId: pres.id,
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

  const answerValues = Object.values(answersMap)
  const answerCounts = [0, 1, 2, 3].map(i => answerValues.filter(a => a.answer === i).length)
  const totalAnswers = answerValues.length

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', outline: 'none' }

  // ── Before session ──────────────────────────────────────────────────────────
  if (!session?.active) {
    return (
      <div style={{ maxWidth: 560 }}>
        {!classroomCode && (
          <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626', fontSize: 13, marginBottom: 16 }}>
            Ingen klassekode funnet. Opprett en klasse i Klasser-fanen.
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Start live økt</h2>
        {classroomCode && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
            Klasse: <strong style={{ fontFamily: 'monospace', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>{classroomCode}</strong>
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

        {/* Presentation picker — only shown when mode is presentation */}
        {selectedMode === 'presentation' && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>Velg presentasjon</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PRESENTATIONS.map(p => {
                const active = selectedPresentationId === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPresentationId(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      border: active ? '2px solid #0d9488' : '1px solid var(--border)',
                      background: active ? 'rgba(13,148,136,0.08)' : 'var(--card-bg)',
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#0d9488' : 'var(--text-primary)' }}>{p.title}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.slides.length} slides</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <button
          onClick={startSession}
          disabled={!classroomCode}
          style={{ background: classroomCode ? MODE_OPTIONS.find(m => m.id === selectedMode)!.color : '#d1d5db', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: classroomCode ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}
        >
          ▶ Start live økt
        </button>
      </div>
    )
  }

  // ── Active session — mode badge ─────────────────────────────────────────────
  const modeInfo = MODE_OPTIONS.find(m => m.id === session.mode) ?? MODE_OPTIONS[0]

  return (
    <div style={{ maxWidth: 680 }}>

      {/* Mode indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '10px 16px', borderRadius: 10, background: `${modeInfo.color}14`, border: `1px solid ${modeInfo.color}40` }}>
        <span style={{ fontSize: 20 }}>{modeInfo.icon}</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: modeInfo.color }}>{modeInfo.title}</span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{modeInfo.desc}</span>
        <button onClick={endSession} style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 8, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: 13, fontWeight: 500, flexShrink: 0, fontFamily: 'inherit' }}>
          Avslutt økt
        </button>
      </div>

      {/* Presentation controls — only shown in presentation mode */}
      {session.mode === 'presentation' && (
        <>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{presentation.title}</span>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: '10px 0 18px' }}>
              Trykk «📺 Åpne på storskjerm» for å starte presentasjonen. Naviger med piltastene eller knappene i presentasjonen — elevenes skjerm følger automatisk.
            </p>
            <button
              onClick={() => window.open(`/learning/presentations/${session.presentationId}?live-code=${classroomCode}`, '_blank')}
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
