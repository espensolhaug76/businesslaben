import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
import { auth, db } from '../lib/firebase'

// ── Helpers ────────────────────────────────────────────────────────────────────

function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Feil epost eller passord'
    case 'auth/user-not-found':
      return 'Ingen konto med denne eposten'
    case 'auth/email-already-in-use':
      return 'En konto med denne eposten finnes allerede'
    case 'auth/invalid-email':
      return 'Ugyldig epostadresse'
    case 'auth/weak-password':
      return 'Passordet må være minst 6 tegn'
    default:
      return 'Noe gikk galt. Prøv igjen.'
  }
}

// ── StudentCard ────────────────────────────────────────────────────────────────

function StudentCard() {
  const navigate = useNavigate()
  const [classCode, setClassCode] = useState('')
  const [firstName, setFirstName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!classCode.trim() || !firstName.trim()) return
    const code = classCode.trim().toUpperCase()
    const name = firstName.trim()
    // Write to both key sets: StudentHub + useLiveSync use 'student-*'
    sessionStorage.setItem('student-classroom-code', code)
    localStorage.setItem('student-name', name)
    navigate('/student')
  }

  const canSubmit = classCode.trim().length > 0 && firstName.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 180, damping: 20 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Jeg er elev</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Klassekode</label>
          <input
            type="text"
            value={classCode}
            onChange={e => setClassCode(e.target.value.toUpperCase())}
            placeholder="F.eks. AB3X7K"
            className="w-full px-4 py-3 text-xl font-mono tracking-widest border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50 uppercase"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Fornavn</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Skriv inn fornavnet ditt"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className={`mt-auto w-full py-3.5 rounded-xl font-bold text-base transition-all ${
            canSubmit
              ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-100'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Gå til min side →
        </button>
      </form>
    </motion.div>
  )
}

// ── TeacherCard ────────────────────────────────────────────────────────────────

function TeacherCard({ onOpenRegister }: { onOpenRegister: () => void }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
      localStorage.setItem('adventure-teacher-email', cred.user.email ?? '')
      // Fetch teacher name from DB so Forum and other pages can use it
      const snap = await get(ref(db, `teachers/${cred.user.uid}/name`))
      if (snap.exists()) localStorage.setItem('adventure-teacher-name', snap.val() as string)
      navigate('/teacher')
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(mapAuthError(code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 180, damping: 20 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Jeg er lærer</h2>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 flex-1">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Epost</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="navn@skole.no"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Passord</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-auto w-full py-3.5 rounded-xl font-bold text-base bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Logger inn…' : 'Logg inn'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Ny lærer?{' '}
          <button
            type="button"
            onClick={onOpenRegister}
            className="text-teal-600 font-semibold hover:text-teal-500 underline underline-offset-2 transition-colors"
          >
            Registrer deg her
          </button>
        </p>
      </form>
    </motion.div>
  )
}

// ── RegisterModal ──────────────────────────────────────────────────────────────

function RegisterModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [school, setSchool] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passordene stemmer ikke overens')
      return
    }
    if (password.length < 6) {
      setError('Passordet må være minst 6 tegn')
      return
    }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
      await set(ref(db, `teachers/${cred.user.uid}`), {
        name: `${firstName.trim()} ${lastName.trim()}`,
        school: school.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('adventure-teacher-email', email.trim())
      localStorage.setItem('adventure-teacher-school', school.trim())
      localStorage.setItem('adventure-teacher-name', `${firstName.trim()} ${lastName.trim()}`)
      navigate('/teacher')
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(mapAuthError(code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Opprett lærerkonto</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Fornavn</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Ola"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Etternavn</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nordmann"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Skolenavn</label>
            <input
              type="text"
              value={school}
              onChange={e => setSchool(e.target.value)}
              placeholder="Oslo videregående skole"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Epost</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="navn@skole.no"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Passord</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minst 6 tegn"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Bekreft passord</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Gjenta passordet"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-50"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-base bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Oppretter konto…' : 'Opprett konto'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── LandingPage ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Top bar */}
      <header className="px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center">
          <span className="text-xl font-extrabold text-teal-600 tracking-tight">BusinessLab</span>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            <span className="text-teal-600">BusinessLab</span>
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-5">
            Lær business ved å gjøre det
          </p>
          <p className="max-w-xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed">
            BusinessLab er et interaktivt læringsverktøy for merkantile fag.
            Elevene lærer markedsføring, salg og forretningsdrift gjennom teori,
            øvelser og simulering.
          </p>
        </motion.div>
      </section>

      {/* Login cards */}
      <section className="flex-1 px-6 pb-16">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StudentCard />
          <TeacherCard onOpenRegister={() => setShowRegister(true)} />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-slate-400 border-t border-slate-100">
        &copy; {new Date().getFullYear()} BusinessLab
      </footer>

      {/* Registration modal */}
      <AnimatePresence>
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      </AnimatePresence>
    </div>
  )
}
