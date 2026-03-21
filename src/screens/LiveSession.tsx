import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, set, push, onValue } from 'firebase/database'
import { db } from '../lib/firebase'
import { useThemeEffect } from '../components/ui/ThemeToggle'

interface LiveSessionState {
  active: boolean
  mode: 'presentation' | 'minileksjon' | 'spill'
  currentSlide: number
  totalSlides: number
  slideTitle: string
  slideContent: string
  presentationId: string
  quizActive: boolean
  quizQuestion: string
  quizOptions: string[]
  quizCorrect: number | null
  showResults: boolean
  quizStartTime: number
}

interface AnswerRecord {
  answer: number
  timestamp: number
}

interface AnswersMap {
  [studentName: string]: AnswerRecord
}

const QUIZ_COLORS = [
  { bg: '#0d9488' },
  { bg: '#f59e0b' },
  { bg: '#8b5cf6' },
  { bg: '#3b82f6' },
]

const LABELS = ['A', 'B', 'C', 'D']

export default function LiveSession() {
  useThemeEffect()
  const navigate = useNavigate()

  const classroomCode = localStorage.getItem('student-classroom-code')
  const studentName = localStorage.getItem('student-name') ?? 'Elev'

  const [session, setSession] = useState<LiveSessionState | null>(null)
  const [myAnswer, setMyAnswer] = useState<number | null>(null)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [answersMap, setAnswersMap] = useState<AnswersMap>({})
  const [questionText, setQuestionText] = useState('')
  const [questionSent, setQuestionSent] = useState(false)

  const lastQuizStartRef = useRef<number>(0)

  useEffect(() => {
    if (!classroomCode) return

    const sessionRef = ref(db, 'sessions/' + classroomCode)
    const unsubSession = onValue(sessionRef, (snapshot) => {
      const val = snapshot.val() as LiveSessionState | null
      setSession(val)
    })

    const answersRef = ref(db, 'sessions/' + classroomCode + '/answers')
    const unsubAnswers = onValue(answersRef, (snapshot) => {
      const val = snapshot.val() as AnswersMap | null
      setAnswersMap(val ?? {})
    })

    return () => {
      unsubSession()
      unsubAnswers()
    }
  }, [classroomCode])

  // Reset quiz state when a new quiz starts
  useEffect(() => {
    if (session?.quizStartTime && session.quizStartTime !== lastQuizStartRef.current) {
      setMyAnswer(null)
      setQuizAnswered(false)
      lastQuizStartRef.current = session.quizStartTime
    }
  }, [session?.quizStartTime])

  // ── Presentation mode — navigate to actual presentation (must be before early returns) ──
  useEffect(() => {
    if (session?.mode === 'presentation' && !session.quizActive && !session.showResults && session.presentationId) {
      navigate('/learning/presentations/' + session.presentationId, { replace: true })
    }
  }, [session?.mode, session?.quizActive, session?.showResults, session?.presentationId, navigate])

  function submitAnswer(answer: number) {
    if (quizAnswered || !classroomCode) return
    setMyAnswer(answer)
    setQuizAnswered(true)
    set(ref(db, 'sessions/' + classroomCode + '/answers/' + studentName), {
      answer,
      timestamp: Date.now(),
    })
  }

  function submitQuestion() {
    const trimmed = questionText.trim()
    if (!trimmed || !classroomCode) return
    push(ref(db, 'sessions/' + classroomCode + '/questions'), {
      name: studentName,
      question: trimmed,
      timestamp: Date.now(),
      read: false,
    })
    setQuestionText('')
    setQuestionSent(true)
    setTimeout(() => setQuestionSent(false), 3000)
  }

  // No classroom code — show message
  if (!classroomCode) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📺</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>Ingen klasse valgt</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, textAlign: 'center' }}>
          Du må bli med i en klasse først for å delta i live økt.
        </p>
        <button
          onClick={() => navigate('/student')}
          style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          ← Gå til studentside
        </button>
      </div>
    )
  }

  if (!session || !session.active) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📺</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>Ingen aktiv økt</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, textAlign: 'center' }}>
          Læreren har ikke startet en økt ennå.
        </p>
        <button
          onClick={() => navigate('/student')}
          style={{ background: 'none', border: 'none', color: '#0d9488', cursor: 'pointer', textDecoration: 'underline', fontSize: 14 }}
        >
          ← Tilbake
        </button>
      </div>
    )
  }

  const answersArray = Object.values(answersMap)
  const voteCounts = [0, 1, 2, 3].map(i => answersArray.filter(a => a.answer === i).length)
  const totalVotes = voteCounts.reduce((s, v) => s + v, 0)

  // ── Minileksjon mode ────────────────────────────────────────────────────────
  if (session.mode === 'minileksjon') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <span style={{ fontSize: 64, marginBottom: 16 }}>🧠</span>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textAlign: 'center' }}>Tid for minileksjon!</h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 28, textAlign: 'center', maxWidth: 320 }}>
          Læreren har startet en læringsøkt. Gå til læringsmodulene og jobb med teorien.
        </p>
        <button
          onClick={() => navigate('/learning')}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Åpne læringsmoduler →
        </button>
      </div>
    )
  }

  // ── Spill mode ──────────────────────────────────────────────────────────────
  if (session.mode === 'spill') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <span style={{ fontSize: 64, marginBottom: 16 }}>🎮</span>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, textAlign: 'center' }}>Tid for å spille!</h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 28, textAlign: 'center', maxWidth: 320 }}>
          Læreren har startet spilløkt. Åpne bedriftssimulatoren og ta de riktige beslutningene.
        </p>
        <button
          onClick={() => navigate('/desktop')}
          style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Åpne spillet →
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#0d9488', fontWeight: 700, fontSize: 14 }}>Businesslaben Live</span>
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          {session.currentSlide} av {session.totalSlides}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 16px', maxWidth: 520, margin: '0 auto', width: '100%' }}>

        {/* RESULTS VIEW */}
        {session.showResults && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{session.quizQuestion}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Resultater</p>

            {quizAnswered && myAnswer !== null && (
              <div style={{
                marginBottom: 16,
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                background: myAnswer === session.quizCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                color: myAnswer === session.quizCorrect ? '#16a34a' : '#dc2626',
                border: `1px solid ${myAnswer === session.quizCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}>
                {myAnswer === session.quizCorrect
                  ? '✅ Riktig!'
                  : `❌ Feil — riktig svar var: ${session.quizCorrect !== null ? session.quizOptions[session.quizCorrect] : '?'}`}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {session.quizOptions.map((opt, i) => {
                const count = voteCounts[i]
                const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
                const isCorrect = i === session.quizCorrect
                const col = QUIZ_COLORS[i]
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                      <span style={{ fontWeight: isCorrect ? 700 : 400, color: isCorrect ? '#16a34a' : 'var(--text-primary)' }}>
                        {isCorrect ? '✓ ' : ''}{opt}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ height: 10, background: 'var(--border)', borderRadius: 5, overflow: 'hidden' }}>
                      <div style={{
                        height: 10,
                        borderRadius: 5,
                        width: `${pct}%`,
                        background: isCorrect ? '#22c55e' : col.bg,
                        transition: 'width 0.7s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* QUIZ VIEW */}
        {session.quizActive && !session.showResults && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: 24 }}>{session.quizQuestion}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {session.quizOptions.map((opt, i) => {
                const col = QUIZ_COLORS[i]
                const chosen = myAnswer === i
                return (
                  <button
                    key={i}
                    disabled={quizAnswered}
                    onClick={() => submitAnswer(i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '14px 18px',
                      borderRadius: 14,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: quizAnswered ? 'default' : 'pointer',
                      border: '2px solid',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s',
                      background: quizAnswered ? (chosen ? col.bg : 'var(--card-bg)') : 'var(--card-bg)',
                      color: quizAnswered ? (chosen ? '#fff' : 'var(--text-muted)') : 'var(--text-primary)',
                      borderColor: quizAnswered ? (chosen ? col.bg : 'var(--border)') : 'var(--border)',
                      opacity: quizAnswered && !chosen ? 0.5 : 1,
                    }}
                  >
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 24, height: 24, borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: col.bg, color: '#fff', marginRight: 12, flexShrink: 0,
                    }}>
                      {LABELS[i]}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
            {quizAnswered && (
              <p style={{ marginTop: 20, textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#16a34a' }}>
                Svaret er registrert ✓
              </p>
            )}
          </div>
        )}

        {/* SLIDE VIEW */}
        {!session.quizActive && !session.showResults && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              {session.currentSlide} av {session.totalSlides}
            </p>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: 16 }}>
              {session.slideTitle}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, flex: 1 }}>
              {session.slideContent}
            </p>
          </div>
        )}

        {/* Ask a question — only in slide view */}
        {!session.quizActive && !session.showResults && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Still et spørsmål</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitQuestion()}
                placeholder="Skriv spørsmålet ditt..."
                style={{
                  flex: 1,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <button
                onClick={submitQuestion}
                disabled={!questionText.trim()}
                style={{
                  background: questionText.trim() ? '#f59e0b' : 'var(--border)',
                  color: questionText.trim() ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '9px 14px',
                  fontSize: 18,
                  cursor: questionText.trim() ? 'pointer' : 'default',
                  flexShrink: 0,
                }}
                title="Send spørsmål"
              >
                🙋
              </button>
            </div>
            {questionSent && (
              <p style={{ fontSize: 12, color: '#16a34a', marginTop: 6 }}>Spørsmål sendt! ✓</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
