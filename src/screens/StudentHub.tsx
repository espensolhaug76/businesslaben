import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, onValue, set } from 'firebase/database'
import { db } from '../lib/firebase'
import ThemeToggle, { useThemeEffect } from '../components/ui/ThemeToggle'

export default function StudentHub() {
  const navigate = useNavigate()
  useThemeEffect()

  const [sessionActive, setSessionActive] = useState(false)
  const [name, setName] = useState(localStorage.getItem('student-name') ?? '')
  const [code, setCode] = useState(localStorage.getItem('student-classroom-code') ?? '')
  const [codeInput, setCodeInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [codeError, setCodeError] = useState('')
  const hasJoined = !!code

  useEffect(() => {
    if (!code) {
      setSessionActive(false)
      return
    }
    const activeRef = ref(db, 'sessions/' + code + '/active')
    const unsub = onValue(activeRef, (snapshot) => {
      setSessionActive(snapshot.val() === true)
    })
    return () => unsub()
  }, [code])

  function joinClass() {
    const trimmed = codeInput.trim().toUpperCase()
    if (!nameInput.trim()) { setCodeError('Skriv inn ditt navn'); return }
    if (!trimmed) { setCodeError('Skriv inn klassekoden'); return }
    const studentName = nameInput.trim()
    sessionStorage.setItem('student-classroom-code', trimmed)
    localStorage.setItem('student-name', studentName)
    setCode(trimmed)
    setName(studentName)
    setCodeInput('')
    setNameInput('')
    setCodeError('')
    // Register student in Firebase so teacher can see them immediately
    const safeName = studentName.replace(/[.#$[\]]/g, '_')
    set(ref(db, `students/${trimmed}/${safeName}/studentName`), studentName)
    set(ref(db, `students/${trimmed}/${safeName}/joinedAt`), new Date().toISOString())
    set(ref(db, `students/${trimmed}/${safeName}/lastActive`), new Date().toISOString())
  }

  function leaveClass() {
    localStorage.removeItem('student-classroom-code')
    localStorage.removeItem('student-name')
    setCode('')
    setName('')
  }

  // ── Shared styles ──────────────────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: '20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  }

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-secondary, var(--bg-primary))',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '9px 14px',
    fontSize: 14,
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
    outline: 'none',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#0d9488' }}>Businesslaben</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {name && (
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Hei, <strong style={{ color: 'var(--text-primary)' }}>{name}</strong> 👋</span>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 }}>

          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center', margin: '0 0 8px' }}>
            Hva vil du gjøre?
          </h1>

          {/* ── FØLG UNDERVISNINGEN ── */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ fontSize: 30, marginTop: 2, flexShrink: 0 }}>📚</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', margin: 0 }}>Følg undervisningen</h2>

                {!hasJoined ? (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      placeholder="Ditt navn"
                      style={inp}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        value={codeInput}
                        onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeError('') }}
                        onKeyDown={e => e.key === 'Enter' && joinClass()}
                        placeholder="Klassekode fra læreren"
                        maxLength={10}
                        style={{ ...inp, flex: 1, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                      />
                      <button
                        onClick={joinClass}
                        style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: 12, padding: '9px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' }}
                      >
                        Bli med
                      </button>
                    </div>
                    {codeError && <p style={{ fontSize: 12, color: '#ef4444', margin: 0 }}>{codeError}</p>}
                  </div>
                ) : (
                  <div style={{ marginTop: 8 }}>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px' }}>
                      Klasse{' '}
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-primary)' }}>{code}</span>
                      {' · '}
                      <button onClick={leaveClass} style={{ background: 'none', border: 'none', color: '#0d9488', cursor: 'pointer', textDecoration: 'underline', fontSize: 12, padding: 0, fontFamily: 'inherit' }}>
                        Bytt klasse
                      </button>
                    </p>
                    {sessionActive ? (
                      <>
                        <p style={{ fontSize: 14, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 10px' }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                          Aktiv økt nå
                        </p>
                        <button
                          onClick={() => navigate('/live-session')}
                          style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                          Bli med →
                        </button>
                      </>
                    ) : (
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Ingen aktiv økt akkurat nå</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── ØV PÅ TEORI ── */}
          <button
            onClick={() => navigate('/learning')}
            style={{ ...card, textAlign: 'left', cursor: 'pointer', display: 'block', width: '100%', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#0d9488')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 30, flexShrink: 0 }}>🧠</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', margin: 0 }}>Øv på teori</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0' }}>Læringsmoduler og teorigjennomgang</p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>›</span>
            </div>
          </button>

          {/* ── ØV I SPILLET ── */}
          <button
            onClick={() => navigate('/desktop')}
            style={{ ...card, textAlign: 'left', cursor: 'pointer', display: 'block', width: '100%', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#0d9488')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 30, flexShrink: 0 }}>🎮</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', margin: 0 }}>Øv i spillet</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0' }}>Kjør bedriftssimulatoren</p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>›</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}
