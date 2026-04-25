import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { TeacherQuestion, StudentAnswer } from '../types/TeacherQuestions'
import { ALL_MODULES } from './learninghub/LearningHub'

const OPTION_COLORS = [
  'border-red-500/60 bg-red-500/10 text-red-300',
  'border-blue-500/60 bg-blue-500/10 text-blue-300',
  'border-amber-500/60 bg-amber-500/10 text-amber-300',
  'border-purple-500/60 bg-purple-500/10 text-purple-300',
]
const OPTION_COLORS_SELECTED = [
  'border-red-400 bg-red-500/30 text-red-200',
  'border-blue-400 bg-blue-500/30 text-blue-200',
  'border-amber-400 bg-amber-500/30 text-amber-200',
  'border-purple-400 bg-purple-500/30 text-purple-200',
]

function answersKey(code: string) {
  return `adventure-student-answers-${code.toUpperCase()}`
}

export default function StudentQuestionsScreen() {
  const [questions, setQuestions] = useState<TeacherQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  const [classroomCode, setClassroomCode] = useState('')
  const [codeSet, setCodeSet] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [nameSet, setNameSet] = useState(false)

  useEffect(() => {
    const q = localStorage.getItem('teacher-questions')
    if (q) setQuestions(JSON.parse(q))

    const savedCode = localStorage.getItem('student-classroom-code')
    const savedName = localStorage.getItem('student-name')

    if (savedCode) {
      setClassroomCode(savedCode)
      setCodeSet(true)
      // Restore subject filter so LearningHub can show relevant modules
      const classSubject = localStorage.getItem(`adventure-classroom-subject-${savedCode}`)
      if (classSubject) localStorage.setItem('adventure-student-subject', classSubject)
    }
    if (savedName) {
      setStudentName(savedName)
      setNameSet(true)
    }
    if (savedCode && savedName) {
      loadSubmitted(savedCode, savedName)
    }
  }, [])

  function loadSubmitted(code: string, name: string) {
    const sa = localStorage.getItem(answersKey(code))
    if (sa) {
      const allAnswers: StudentAnswer[] = JSON.parse(sa)
      const submittedMap: Record<string, boolean> = {}
      allAnswers.filter(a => a.studentName === name).forEach(a => {
        submittedMap[a.questionId] = true
      })
      setSubmitted(submittedMap)
    }
  }

  function handleSetCode() {
    const code = classroomCode.trim().toUpperCase()
    if (!code) return
    sessionStorage.setItem('student-classroom-code', code)
    // Inherit classroom subject from teacher (same-device usage)
    const classSubject = localStorage.getItem(`adventure-classroom-subject-${code}`)
    if (classSubject) {
      localStorage.setItem('adventure-student-subject', classSubject)
    }
    setClassroomCode(code)
    setCodeSet(true)
    if (nameSet && studentName) loadSubmitted(code, studentName)
  }

  function handleSetName() {
    const name = studentName.trim()
    if (!name) return
    localStorage.setItem('student-name', name)
    setStudentName(name)
    setNameSet(true)
    if (codeSet && classroomCode) loadSubmitted(classroomCode, name)
  }

  function handleSubmitOpen(questionId: string) {
    const answerText = answers[questionId]?.trim()
    if (!answerText) return
    const newAnswer: StudentAnswer = {
      questionId,
      studentName,
      answerText,
      submittedAt: new Date().toISOString(),
    }
    pushAnswer(newAnswer)
    setSubmitted(prev => ({ ...prev, [questionId]: true }))
  }

  function handleSubmitMC(questionId: string) {
    const idx = selectedOptions[questionId]
    if (idx === undefined) return
    const q = questions.find(q => q.id === questionId)
    const answerText = q?.options?.[idx] ?? ''
    const newAnswer: StudentAnswer = {
      questionId,
      studentName,
      answerText,
      selectedOptionIndex: idx,
      submittedAt: new Date().toISOString(),
    }
    pushAnswer(newAnswer)
    setSubmitted(prev => ({ ...prev, [questionId]: true }))
  }

  function pushAnswer(answer: StudentAnswer) {
    const key = answersKey(classroomCode)
    const sa = localStorage.getItem(key)
    const existing: StudentAnswer[] = sa ? JSON.parse(sa) : []
    existing.push(answer)
    localStorage.setItem(key, JSON.stringify(existing))
  }

  if (!codeSet) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/80 rounded-2xl border border-slate-700/50 p-8 space-y-4 w-full max-w-sm"
        >
          <div className="text-center space-y-1">
            <p className="text-4xl mb-3">🏫</p>
            <h1 className="text-xl font-bold text-white">Skriv inn klassekode</h1>
            <p className="text-slate-400 text-sm">Læreren din har gitt deg en kode</p>
          </div>
          <input
            type="text"
            value={classroomCode}
            onChange={e => setClassroomCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && handleSetCode()}
            placeholder="F.eks. ABC123"
            maxLength={10}
            className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-lg text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSetCode}
            disabled={!classroomCode.trim()}
            className="w-full px-4 py-3 rounded-xl bg-teal-500 text-white font-bold disabled:opacity-50 hover:bg-teal-400 transition-colors"
          >
            Fortsett
          </button>
        </motion.div>
      </div>
    )
  }

  if (!nameSet) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/80 rounded-2xl border border-slate-700/50 p-8 space-y-4 w-full max-w-sm"
        >
          <div className="text-center space-y-1">
            <p className="text-4xl mb-3">👤</p>
            <h1 className="text-xl font-bold text-white">Hva heter du?</h1>
            <p className="text-slate-400 text-sm">Klasse: <span className="text-teal-400 font-bold">{classroomCode}</span></p>
          </div>
          <input
            type="text"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSetName()}
            placeholder="Ditt navn..."
            className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSetName}
            disabled={!studentName.trim()}
            className="w-full px-4 py-3 rounded-xl bg-teal-500 text-white font-bold disabled:opacity-50 hover:bg-teal-400 transition-colors"
          >
            Start
          </button>
        </motion.div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="text-4xl mb-4">📝</p>
          <p>Ingen spørsmål fra læreren ennå.</p>
          <p className="text-xs mt-2 text-slate-600">Klasse: {classroomCode}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📝</span>
            <h1 className="text-2xl font-bold">Spørsmål fra læreren</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Klasse</p>
            <p className="text-sm font-bold text-teal-400 tracking-widest">{classroomCode}</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm -mt-2">Hei, <span className="text-white font-semibold">{studentName}</span>!</p>

        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-slate-800/80 rounded-2xl border border-slate-700/50 p-5 space-y-3"
          >
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                q.type === 'open_ended'
                  ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}>
                {q.type === 'open_ended' ? 'Åpent spørsmål' : 'Flervalg'}
              </span>
              {q.moduleRoute && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold border bg-violet-500/20 text-violet-400 border-violet-500/30">
                  {ALL_MODULES.find(m => m.route === q.moduleRoute)?.title ?? q.moduleRoute}
                </span>
              )}
            </div>
            <p className="font-semibold text-white">{q.questionText}</p>

            {submitted[q.id] ? (
              <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3">
                <p className="text-teal-400 text-xs font-semibold">✓ Svar sendt</p>
                <p className="text-slate-400 text-xs mt-1">Venter på lærerens tilbakemelding</p>
              </div>
            ) : q.type === 'open_ended' ? (
              <>
                <textarea
                  value={answers[q.id] ?? ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder="Skriv svaret ditt her..."
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={() => handleSubmitOpen(q.id)}
                  disabled={!answers[q.id]?.trim()}
                  className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-bold disabled:opacity-50 hover:bg-teal-400 transition-colors"
                >
                  Send svar
                </button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  {(q.options ?? []).map((opt, idx) => {
                    const isSelected = selectedOptions[q.id] === idx
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [q.id]: idx }))}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all text-sm font-medium ${
                          isSelected ? OPTION_COLORS_SELECTED[idx % 4] : OPTION_COLORS[idx % 4]
                        }`}
                      >
                        <span className="font-bold text-xs w-5 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => handleSubmitMC(q.id)}
                  disabled={selectedOptions[q.id] === undefined}
                  className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-bold disabled:opacity-50 hover:bg-teal-400 transition-colors"
                >
                  Send svar
                </button>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
