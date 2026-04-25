import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ref as fbRef, onValue, update as fbUpdate } from 'firebase/database'
import { db } from '../../../lib/firebase'

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  timeSeconds: number
}

export interface StudentAnswer {
  studentName: string
  answer: number
  timestamp: number
  slideIndex: number
}

interface QuizSlideProps {
  question: string
  options: string[]
  correct: number
  timeSeconds: number
  pin: string | null
  liveCode?: string | null   // Firebase classroom code for live sessions
  slideIndex: number
  onNext: () => void
  isLast?: boolean
  onFinish?: () => void
  studentMode?: boolean   // true when a student is following a live session
}

const OPTION_COLORS = [
  { bg: 'rgba(20,184,166,0.12)', border: '#14b8a6', label: '#14b8a6' },
  { bg: 'rgba(249,115,22,0.12)', border: '#f97316', label: '#f97316' },
  { bg: 'rgba(168,85,247,0.12)', border: '#a855f7', label: '#a855f7' },
  { bg: 'rgba(59,130,246,0.12)', border: '#3b82f6', label: '#3b82f6' },
]

const OPTION_LABELS = ['A', 'B', 'C', 'D']
const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function getStudentId(): string {
  let id = localStorage.getItem('quiz-student-id')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('quiz-student-id', id)
  }
  return id
}

export default function QuizSlide({ question, options, correct, timeSeconds, pin, liveCode, slideIndex, onNext, isLast, onFinish, studentMode }: QuizSlideProps) {
  const [timeLeft, setTimeLeft] = useState(timeSeconds)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<StudentAnswer[]>([])
  const [selected, setSelected] = useState<number | null>(null)   // student's pick
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Countdown timer — ticks down, stops at 0
  useEffect(() => {
    if (revealed) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1))
    }, 1000)
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current)
    }
  }, [revealed])

  // Auto-reveal when timer reaches 0 (separate from the tick to avoid setState-inside-updater)
  useEffect(() => {
    if (!revealed && timeLeft === 0) {
      setRevealed(true)
    }
  }, [timeLeft, revealed])

  // Write questionRevealed to localStorage session (legacy pin system)
  useEffect(() => {
    if (!revealed || !pin) return
    const key = `adventure-live-session-${pin}`
    try {
      const s = JSON.parse(localStorage.getItem(key) || '{}') as Record<string, unknown>
      localStorage.setItem(key, JSON.stringify({ ...s, questionRevealed: true }))
    } catch {}
  }, [revealed, pin])

  // Teacher: write reveal to Firebase so students see it
  useEffect(() => {
    if (!revealed || !liveCode || studentMode) return
    fbUpdate(fbRef(db, 'sessions/' + liveCode), { quizRevealedSlide: slideIndex })
  }, [revealed, liveCode, studentMode, slideIndex])

  // Student: subscribe to teacher's reveal signal via Firebase
  useEffect(() => {
    if (!liveCode || !studentMode) return
    return onValue(fbRef(db, 'sessions/' + liveCode + '/quizRevealedSlide'), snap => {
      if (snap.val() === slideIndex) {
        setRevealed(true)
      }
    })
  }, [liveCode, studentMode, slideIndex])

  // Student: write answer to Firebase when selected
  useEffect(() => {
    if (!liveCode || !studentMode || selected === null) return
    const studentId = getStudentId()
    fbUpdate(fbRef(db, 'sessions/' + liveCode + '/quizAnswers/' + studentId), {
      answer: selected,
      slideIndex,
      timestamp: Date.now(),
    })
  }, [selected, liveCode, studentMode, slideIndex])

  // Teacher: subscribe to student answers via Firebase
  useEffect(() => {
    if (!liveCode || studentMode) return
    return onValue(fbRef(db, 'sessions/' + liveCode + '/quizAnswers'), snap => {
      const val = snap.val() ?? {}
      const found: StudentAnswer[] = (Object.values(val) as Array<{answer: number; slideIndex: number; timestamp: number}>)
        .filter(a => a && a.slideIndex === slideIndex)
        .map(a => ({ studentName: '', answer: a.answer, timestamp: a.timestamp ?? 0, slideIndex: a.slideIndex }))
      setAnswers(found)
    })
  }, [liveCode, studentMode, slideIndex])

  // Legacy: poll student answers from localStorage (when using old pin system)
  useEffect(() => {
    if (!pin || liveCode) return
    const poll = () => {
      const found: StudentAnswer[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith(`adventure-live-answers-${pin}-`)) {
          try {
            const val = JSON.parse(localStorage.getItem(k) ?? 'null') as StudentAnswer | null
            if (val && val.slideIndex === slideIndex) found.push(val)
          } catch {}
        }
      }
      setAnswers(found)
    }
    poll()
    const id = setInterval(poll, 1000)
    return () => clearInterval(id)
  }, [pin, liveCode, slideIndex])

  const counts = [0, 0, 0, 0]
  answers.forEach(a => { if (a.answer >= 0 && a.answer <= 3) counts[a.answer]++ })
  const maxCount = Math.max(...counts, 1)
  const totalAnswers = answers.length
  const strokeDashoffset = CIRCUMFERENCE * (1 - timeLeft / timeSeconds)

  function handleReveal() {
    if (timerRef.current !== null) clearInterval(timerRef.current)
    setRevealed(true)
  }

  function handleSelect(i: number) {
    if (revealed || selected !== null) return
    setSelected(i)
  }

  // Self-study mode: clicking an option selects + immediately reveals
  function handleSelfStudySelect(i: number) {
    if (revealed || selected !== null) return
    if (timerRef.current !== null) clearInterval(timerRef.current)
    setSelected(i)
    setRevealed(true)
  }

  const isSelfStudy = !liveCode && !studentMode

  const showAnswerCount = (pin || liveCode) && !studentMode

  return (
    <div style={{
      background: 'rgba(15,23,42,0.75)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '3rem',
      width: '100%',
      maxWidth: 1000,
      padding: '3rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          Quiz
        </span>
        {!revealed ? (
          <div style={{ position: 'relative', width: 110, height: 110 }}>
            <svg width={110} height={110} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={55} cy={55} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={8} />
              <circle
                cx={55} cy={55} r={RADIUS}
                fill="none"
                stroke={timeLeft <= 10 ? '#ef4444' : '#38bdf8'}
                strokeWidth={8}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: timeLeft <= 10 ? '#ef4444' : '#f1f5f9' }}>{timeLeft}</span>
            </div>
          </div>
        ) : (
          <span style={{ fontSize: 14, color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>Tid ute</span>
        )}
      </div>

      {/* Question */}
      <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.3, color: '#f1f5f9' }}>
        {question}
      </h2>

      {/* Live count (teacher only) */}
      {showAnswerCount && (
        <p style={{ fontSize: 15, color: '#475569', marginBottom: '1.5rem', fontWeight: 600 }}>
          {totalAnswers} {totalAnswers === 1 ? 'elev har' : 'elever har'} svart
        </p>
      )}

      {/* Selection feedback */}
      {studentMode && !revealed && selected !== null && (
        <p style={{ fontSize: 14, color: '#38bdf8', fontWeight: 600, marginBottom: '1rem' }}>
          Du valgte {OPTION_LABELS[selected]} — venter på at læreren avslører svaret…
        </p>
      )}
      {(studentMode || isSelfStudy) && revealed && selected !== null && (
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: '1rem', color: selected === correct ? '#22c55e' : '#ef4444' }}>
          {selected === correct ? '✅ Riktig!' : `❌ Feil — riktig svar var ${OPTION_LABELS[correct]}`}
        </p>
      )}

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {options.map((opt, i) => {
          const col = OPTION_COLORS[i]
          const isCorrect = i === correct
          const isSelected = selected === i
          const count = counts[i]
          const pct = revealed && totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0
          const barPct = revealed ? Math.round((count / maxCount) * 100) : 0

          // Border/bg logic
          let borderColor = col.border
          let bg = col.bg
          if (revealed && isCorrect) { borderColor = '#22c55e'; bg = 'rgba(34,197,94,0.18)' }
          else if (studentMode && isSelected && !revealed) { borderColor = '#fff'; bg = col.bg.replace('0.12', '0.28') }

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ borderColor }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                if (studentMode) handleSelect(i)
                else if (isSelfStudy) handleSelfStudySelect(i)
              }}
              style={{
                background: bg,
                borderWidth: 2,
                borderStyle: 'solid',
                borderRadius: '1.5rem',
                padding: '1.25rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.3s',
                cursor: (studentMode || isSelfStudy) && !revealed && selected === null ? 'pointer' : 'default',
              }}
            >
              {/* Bar fill */}
              {revealed && (
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: `${barPct}%`,
                  background: isCorrect ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                  transition: 'width 0.8s ease',
                  pointerEvents: 'none',
                }} />
              )}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: revealed && isCorrect ? '#22c55e' : col.label, minWidth: 28 }}>
                  {OPTION_LABELS[i]}
                </span>
                <span style={{ fontSize: 15, color: '#e2e8f0', fontWeight: 500, flex: 1, lineHeight: 1.4 }}>{opt}</span>
                {revealed && !studentMode && (
                  <span style={{ fontSize: 14, fontWeight: 700, color: isCorrect ? '#22c55e' : '#64748b', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {count} ({pct}%)
                  </span>
                )}
                {revealed && isCorrect && (
                  <span style={{ fontSize: 18, marginLeft: 4 }}>✓</span>
                )}
                {studentMode && isSelected && !revealed && (
                  <span style={{ fontSize: 16, marginLeft: 4 }}>●</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        {/* Teacher (live session): Vis svar button */}
        {!revealed && !studentMode && !isSelfStudy && (
          <button
            onClick={handleReveal}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.75rem 2rem', borderRadius: 99, color: '#94a3b8', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
          >
            Vis svar
          </button>
        )}
        {/* Student: waiting message when answered */}
        {!revealed && studentMode && selected !== null && (
          <p style={{ color: '#475569', fontSize: 14, margin: 0, alignSelf: 'center' }}>Venter på læreren…</p>
        )}
        {revealed && !isLast && (
          <button
            onClick={onNext}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#38bdf8'; (e.currentTarget as HTMLElement).style.color = '#030712' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9' }}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '0.8rem 2.5rem', borderRadius: 99, color: '#f1f5f9', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
          >
            Neste slide →
          </button>
        )}
        {revealed && isLast && (
          <button
            onClick={onFinish ?? onNext}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#22c55e'; (e.currentTarget as HTMLElement).style.color = '#030712' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.12)'; (e.currentTarget as HTMLElement).style.color = '#22c55e' }}
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid #22c55e', padding: '0.8rem 2.5rem', borderRadius: 99, color: '#22c55e', fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
          >
            Avslutt presentasjon ✓
          </button>
        )}
      </div>
    </div>
  )
}
