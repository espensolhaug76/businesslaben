import { useState } from 'react'
import { useGame } from '../GameContext'
import { SCENARIOS } from '../productData'

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function StartupScreen() {
  const { dispatch } = useGame()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [step, setStep] = useState<'choose' | 'name'>('choose')

  function handlePickScenario(id: string) {
    setSelectedId(id)
  }

  function handleNext() {
    if (!selectedId) return
    setStep('name')
  }

  function handleStart() {
    if (!companyName.trim() || !selectedId) return
    const scenario = SCENARIOS.find(s => s.id === selectedId)!
    dispatch({ type: 'SET_COMPANY_NAME', name: companyName.trim() })
    dispatch({ type: 'SET_SCENARIO', scenario })
    dispatch({ type: 'SET_PHASE', phase: 'product' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: 48, marginBottom: '0.5rem' }}>🏆</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: 0, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AdVenture 3.0
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18, margin: '0.75rem 0 0' }}>
          Bygg din egen bedrift. Ta beslutninger. Se resultatene.
        </p>
      </div>

      {step === 'choose' ? (
        <>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: '1.5rem', color: '#e2e8f0' }}>
            Velg din bransje
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', width: '100%', maxWidth: 900 }}>
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => handlePickScenario(s.id)}
                style={{
                  background: selectedId === s.id ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${selectedId === s.id ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  color: '#f1f5f9',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: '0.75rem' }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: '0.4rem' }}>{s.name}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.5 }}>{s.description}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid #22c55e', borderRadius: 99, padding: '2px 10px', fontSize: 12, color: '#22c55e', fontWeight: 600 }}>
                    {formatKr(s.startingCash)} startkapital
                  </span>
                  <span style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: 99, padding: '2px 10px', fontSize: 12, color: '#ef4444', fontWeight: 600 }}>
                    {formatKr(s.monthlyRent)}/mnd husleie
                  </span>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedId}
            style={{
              marginTop: '2rem',
              background: selectedId ? 'linear-gradient(135deg, #38bdf8, #818cf8)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 99,
              padding: '1rem 3rem',
              color: selectedId ? '#030712' : '#475569',
              fontWeight: 700,
              fontSize: 17,
              cursor: selectedId ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            Neste →
          </button>
        </>
      ) : (
        <div style={{ width: '100%', maxWidth: 480, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2rem', padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: '1rem' }}>{SCENARIOS.find(s => s.id === selectedId)?.emoji}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: '0.5rem' }}>Gi bedriften din et navn</h2>
          <p style={{ color: '#64748b', fontSize: 15, marginBottom: '1.5rem' }}>
            {SCENARIOS.find(s => s.id === selectedId)?.name}
          </p>
          <input
            autoFocus
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            placeholder="F.eks. Ellevill Kafé, FashionNord..."
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.06)',
              border: '2px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              padding: '0.9rem 1.2rem',
              color: '#f1f5f9',
              fontSize: 17,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              outline: 'none',
              marginBottom: '1.5rem',
            }}
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setStep('choose')}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              ← Tilbake
            </button>
            <button
              onClick={handleStart}
              disabled={!companyName.trim()}
              style={{
                background: companyName.trim() ? 'linear-gradient(135deg, #38bdf8, #818cf8)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: 99,
                padding: '0.75rem 2rem',
                color: companyName.trim() ? '#030712' : '#475569',
                fontWeight: 700,
                fontSize: 16,
                cursor: companyName.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
              }}
            >
              Start spillet! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
