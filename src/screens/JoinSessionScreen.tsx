import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  timeSeconds: number
}

interface LiveSessionData {
  pin: string
  currentSlide: number
  activeQuestion: QuizQuestion | null
  questionRevealed: boolean
  status: 'waiting' | 'active' | 'closed'
  presentationName: string
}

type Phase = 'pin' | 'name' | 'session'

const OPTION_COLORS = [
  { bg: 'rgba(20,184,166,0.15)', border: '#14b8a6', label: '#14b8a6', hover: 'rgba(20,184,166,0.3)' },
  { bg: 'rgba(249,115,22,0.15)', border: '#f97316', label: '#f97316', hover: 'rgba(249,115,22,0.3)' },
  { bg: 'rgba(168,85,247,0.15)', border: '#a855f7', label: '#a855f7', hover: 'rgba(168,85,247,0.3)' },
  { bg: 'rgba(59,130,246,0.15)', border: '#3b82f6', label: '#3b82f6', hover: 'rgba(59,130,246,0.3)' },
]

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function JoinSessionScreen() {
  const [phase, setPhase] = useState<Phase>('pin')
  const [pin, setPin] = useState('')
  const [name, setName] = useState('')
  const [pinError, setPinError] = useState('')
  const [session, setSession] = useState<LiveSessionData | null>(null)
  const [myAnswer, setMyAnswer] = useState<number | null>(null)
  const prevQuestionRef = useRef<string | null>(null)

  function handleJoinPin() {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setPinError('PIN må være 4 siffer.')
      return
    }
    const data = localStorage.getItem(`adventure-live-session-${pin}`)
    if (!data) {
      setPinError('Ingen aktiv sesjon med denne PIN-koden. Sjekk at læreren har startet sesjonen.')
      return
    }
    try {
      const s = JSON.parse(data) as LiveSessionData
      if (s.status === 'closed') {
        setPinError('Denne sesjonen er avsluttet.')
        return
      }
      setSession(s)
      setPinError('')
      setPhase('name')
    } catch {
      setPinError('Ugyldig sesjon.')
    }
  }

  function handleJoinName() {
    if (name.trim().length < 2) return
    setPhase('session')
  }

  // Poll session every second when in active session
  useEffect(() => {
    if (phase !== 'session') return
    const poll = () => {
      const data = localStorage.getItem(`adventure-live-session-${pin}`)
      if (!data) return
      try {
        const s = JSON.parse(data) as LiveSessionData
        const questionId = s.activeQuestion?.question ?? null
        // Detect new question — reset my answer
        if (questionId !== prevQuestionRef.current) {
          prevQuestionRef.current = questionId
          setMyAnswer(null)
        }
        setSession(s)
      } catch {}
    }
    poll()
    const id = setInterval(poll, 1000)
    return () => clearInterval(id)
  }, [phase, pin])

  function submitAnswer(optionIndex: number) {
    if (myAnswer !== null || !session) return
    setMyAnswer(optionIndex)
    const answerKey = `adventure-live-answers-${pin}-${name.trim()}`
    localStorage.setItem(answerKey, JSON.stringify({
      studentName: name.trim(),
      answer: optionIndex,
      timestamp: Date.now(),
      slideIndex: session.currentSlide,
    }))
  }

  const bg = '#030712'
  const fontFamily = "'Plus Jakarta Sans', sans-serif"

  return (
    <div style={{ background: bg, color: '#f1f5f9', fontFamily, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet" />

      <AnimatePresence mode="wait">
        {/* ── PIN entry ── */}
        {phase === 'pin' && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', width: '100%', maxWidth: 440 }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>
              Adventure Live
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Bli med i<br /><span style={{ color: '#38bdf8' }}>live-sesjonen</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: 16, marginBottom: 40, fontWeight: 400 }}>
              Skriv inn PIN-koden som vises på tavlen
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="0000"
              value={pin}
              onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setPinError('') }}
              onKeyDown={e => e.key === 'Enter' && handleJoinPin()}
              autoFocus
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${pinError ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: 16,
                padding: '1.25rem',
                fontSize: 36,
                fontWeight: 800,
                color: '#f1f5f9',
                textAlign: 'center',
                letterSpacing: '0.4em',
                fontFamily,
                outline: 'none',
                marginBottom: 12,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {pinError && (
              <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 16, fontWeight: 500 }}>{pinError}</p>
            )}
            <button
              onClick={handleJoinPin}
              disabled={pin.length !== 4}
              onMouseEnter={e => { if (pin.length === 4) (e.currentTarget as HTMLElement).style.background = '#38bdf8', (e.currentTarget as HTMLElement).style.color = '#030712' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9' }}
              style={{ width: '100%', background: pin.length === 4 ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '1rem', borderRadius: 12, color: pin.length === 4 ? '#f1f5f9' : '#475569', fontWeight: 700, fontSize: 17, cursor: pin.length === 4 ? 'pointer' : 'default', transition: 'all 0.2s', fontFamily, marginTop: 8 }}
            >
              Neste →
            </button>
          </motion.div>
        )}

        {/* ── Name entry ── */}
        {phase === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', width: '100%', maxWidth: 440 }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>
              PIN: {pin}
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Hva heter du?
            </h1>
            {session && (
              <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32 }}>
                {session.presentationName}
              </p>
            )}
            <input
              type="text"
              placeholder="Ditt navn"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJoinName()}
              autoFocus
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(255,255,255,0.12)',
                borderRadius: 16,
                padding: '1.25rem',
                fontSize: 22,
                fontWeight: 600,
                color: '#f1f5f9',
                textAlign: 'center',
                fontFamily,
                outline: 'none',
                marginBottom: 12,
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={handleJoinName}
              disabled={name.trim().length < 2}
              onMouseEnter={e => { if (name.trim().length >= 2) (e.currentTarget as HTMLElement).style.background = '#38bdf8', (e.currentTarget as HTMLElement).style.color = '#030712' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9' }}
              style={{ width: '100%', background: name.trim().length >= 2 ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '1rem', borderRadius: 12, color: name.trim().length >= 2 ? '#f1f5f9' : '#475569', fontWeight: 700, fontSize: 17, cursor: name.trim().length >= 2 ? 'pointer' : 'default', transition: 'all 0.2s', fontFamily, marginTop: 8 }}
            >
              Bli med →
            </button>
          </motion.div>
        )}

        {/* ── Live session ── */}
        {phase === 'session' && session && (
          <motion.div
            key="session"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: 560 }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 4 }}>Live</div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{session.presentationName}</div>
              </div>
              <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 10, padding: '0.4rem 0.8rem' }}>
                <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>{pin}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* No active question — waiting screen */}
              {!session.activeQuestion && (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '3rem 2rem' }}
                >
                  <div style={{ fontSize: 48, marginBottom: 20 }}>🎓</div>
                  <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, marginBottom: 12, color: '#f1f5f9' }}>
                    {name}, du er med!
                  </h2>
                  <p style={{ color: '#64748b', fontSize: 16, marginBottom: 8 }}>
                    Lysbilde {session.currentSlide + 1}
                  </p>
                  <p style={{ color: '#475569', fontSize: 14 }}>
                    Vent på at læreren aktiverer et spørsmål...
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Active question — waiting for student to answer */}
              {session.activeQuestion && myAnswer === null && !session.questionRevealed && (
                <motion.div
                  key="quiz-answer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.4, margin: 0 }}>
                      {session.activeQuestion.question}
                    </h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    {session.activeQuestion.options.map((opt, i) => {
                      const col = OPTION_COLORS[i]
                      return (
                        <button
                          key={i}
                          onClick={() => submitAnswer(i)}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = col.hover }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = col.bg }}
                          style={{
                            background: col.bg,
                            border: `2px solid ${col.border}`,
                            borderRadius: '1.25rem',
                            padding: '1.25rem 1rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            fontFamily,
                            textAlign: 'left',
                          }}
                        >
                          <div style={{ fontSize: 22, fontWeight: 800, color: col.label, marginBottom: 4 }}>{OPTION_LABELS[i]}</div>
                          <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.4 }}>{opt}</div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Answered — waiting for reveal */}
              {session.activeQuestion && myAnswer !== null && !session.questionRevealed && (
                <motion.div
                  key="waiting-reveal"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '3rem 2rem' }}
                >
                  <div style={{ fontSize: 48, marginBottom: 20 }}>
                    {OPTION_LABELS[myAnswer]}
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 12, color: '#f1f5f9' }}>Svaret er sendt!</h2>
                  <p style={{ color: '#64748b', fontSize: 15, marginBottom: 8 }}>
                    Du valgte{' '}
                    <strong style={{ color: OPTION_COLORS[myAnswer]?.label ?? '#f1f5f9' }}>
                      {OPTION_LABELS[myAnswer]}: {session.activeQuestion?.options[myAnswer]}
                    </strong>
                  </p>
                  <p style={{ color: '#475569', fontSize: 14, marginTop: 16 }}>Venter på resultater...</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Revealed — show result */}
              {session.activeQuestion && session.questionRevealed && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '2rem' }}
                >
                  {myAnswer === null ? (
                    <>
                      <div style={{ fontSize: 56, marginBottom: 16 }}>⏱️</div>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>For sent!</h2>
                      <p style={{ color: '#64748b', fontSize: 15 }}>Du rakk ikke å svare.</p>
                    </>
                  ) : myAnswer === session.activeQuestion.correct ? (
                    <>
                      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e', marginBottom: 12 }}>Riktig!</h2>
                      <p style={{ color: '#86efac', fontSize: 16 }}>
                        {OPTION_LABELS[session.activeQuestion.correct]}: {session.activeQuestion.options[session.activeQuestion.correct]}
                      </p>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 64, marginBottom: 16 }}>😬</div>
                      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', marginBottom: 12 }}>Feil svar</h2>
                      <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 8 }}>Riktig svar var:</p>
                      <p style={{ color: '#22c55e', fontSize: 16, fontWeight: 700 }}>
                        {OPTION_LABELS[session.activeQuestion.correct]}: {session.activeQuestion.options[session.activeQuestion.correct]}
                      </p>
                    </>
                  )}
                  <p style={{ color: '#475569', fontSize: 13, marginTop: 24 }}>Venter på neste lysbilde...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
