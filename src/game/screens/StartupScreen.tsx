import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_META } from '../data/industries'
import type { Industry } from '../types'
import type { BusinessModel } from '../types'

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

const INDUSTRIES = Object.entries(INDUSTRY_META) as [Industry, typeof INDUSTRY_META[Industry]][]

const BUSINESS_MODELS: { id: BusinessModel; label: string; emoji: string; desc: string; detail: string; cost: string }[] = [
  {
    id: 'detaljhandel',
    label: 'Detaljhandel',
    emoji: '🏪',
    desc: 'Fysisk butikk. Kunder kommer inn døra.',
    detail: 'Krev: Lokale + inventar',
    cost: '150–400k',
  },
  {
    id: 'netthandel',
    label: 'Netthandel',
    emoji: '💻',
    desc: 'Selg på nett. Lavere oppstartskostnader.',
    detail: 'Krev: Lager + nettside',
    cost: '50–150k',
  },
  {
    id: 'kombinasjon',
    label: 'Kombinasjon',
    emoji: '🔄',
    desc: 'Fysisk butikk + netthandel. Maks rekkevidde.',
    detail: 'Høyest kostnad, størst muligheter',
    cost: '200–500k',
  },
]

function nextBtn(enabled: boolean): React.CSSProperties {
  return {
    background: enabled ? 'linear-gradient(135deg, #00d4aa, #4facfe)' : 'rgba(255,255,255,0.08)',
    border: 'none', borderRadius: 99,
    padding: '0.85rem 2.5rem',
    color: enabled ? '#030712' : '#475569',
    fontWeight: 700, fontSize: 16,
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontFamily: 'inherit', transition: 'all 0.2s',
  }
}

export default function StartupScreen() {
  const { dispatch } = useGame()
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)
  const [selectedModel, setSelectedModel] = useState<BusinessModel | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [step, setStep] = useState<'choose' | 'model' | 'name'>('choose')

  function handleStart() {
    if (!companyName.trim() || !selectedIndustry || !selectedModel) return
    dispatch({
      type: 'START_GAME',
      companyName: companyName.trim(),
      industry: selectedIndustry,
      businessModel: selectedModel,
    })
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1e1b4b 50%, #0a0e1a 100%)',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
    }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: 52, marginBottom: '0.5rem' }}>🏆</div>
        <h1 style={{
          fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, margin: 0,
          background: 'linear-gradient(135deg, #00d4aa, #4facfe)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          AdVenture 3.0
        </h1>
        <p style={{ color: '#64748b', fontSize: 17, margin: '0.75rem 0 0' }}>
          Bygg din bedrift i en isometrisk spillverden
        </p>
      </motion.div>

      {step === 'choose' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 900 }}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: '1.5rem' }}>
            Velg din bransje
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {INDUSTRIES.map(([id, meta], i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedIndustry(id)}
                style={{
                  background: selectedIndustry === id ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${selectedIndustry === id ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '1.5rem', padding: '1.5rem',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', fontFamily: 'inherit', color: '#f1f5f9',
                }}
              >
                <div style={{ fontSize: 38, marginBottom: '0.6rem' }}>{meta.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: '0.3rem' }}>{meta.name}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: '0.8rem', lineHeight: 1.5 }}>
                  {meta.description}
                </div>
                <Chip label={`Startkapital: ${formatKr(meta.startingMoney)}`} color="#22c55e" />
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => selectedIndustry && setStep('model')}
              disabled={!selectedIndustry}
              style={nextBtn(!!selectedIndustry)}
            >
              Neste →
            </button>
          </div>
        </motion.div>
      )}

      {step === 'model' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 700 }}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: '0.5rem' }}>
            Velg forretningsmodell
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
            Hvordan vil du selge produktene dine?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {BUSINESS_MODELS.map((m, i) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedModel(m.id)}
                style={{
                  background: selectedModel === m.id ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${selectedModel === m.id ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '1.5rem', padding: '1.5rem',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', fontFamily: 'inherit', color: '#f1f5f9',
                }}
              >
                <div style={{ fontSize: 38, marginBottom: '0.6rem' }}>{m.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: '0.3rem' }}>{m.label}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: '0.6rem', lineHeight: 1.5 }}>
                  {m.desc}
                </div>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: '0.5rem' }}>{m.detail}</div>
                <Chip label={`Oppstart: ${m.cost} kr`} color="#38bdf8" />
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setStep('choose')}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15,
              }}
            >
              ← Tilbake
            </button>
            <button
              onClick={() => selectedModel && setStep('name')}
              disabled={!selectedModel}
              style={nextBtn(!!selectedModel)}
            >
              Neste →
            </button>
          </div>
        </motion.div>
      )}

      {step === 'name' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            width: '100%', maxWidth: 460,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '2rem', padding: '2.5rem', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 44, marginBottom: '0.75rem' }}>
            {selectedIndustry ? INDUSTRY_META[selectedIndustry].emoji : '🏪'}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: '0.4rem' }}>
            Gi bedriften din et navn
          </h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
            {selectedIndustry ? INDUSTRY_META[selectedIndustry].name : ''}
            {selectedModel ? ` · ${BUSINESS_MODELS.find(m => m.id === selectedModel)?.label ?? ''}` : ''}
          </p>
          <input
            autoFocus
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            placeholder="F.eks. Nordic Coffee, FashionNord…"
            style={{
              width: '100%', background: 'rgba(255,255,255,0.06)',
              border: '2px solid rgba(255,255,255,0.12)', borderRadius: 12,
              padding: '0.9rem 1.2rem', color: '#f1f5f9', fontSize: 17,
              fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
              marginBottom: '1.5rem',
            }}
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setStep('model')}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15,
              }}
            >
              ← Tilbake
            </button>
            <button onClick={handleStart} disabled={!companyName.trim()} style={nextBtn(!!companyName.trim())}>
              Start spillet! 🚀
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      background: `${color}18`, border: `1px solid ${color}55`,
      borderRadius: 99, padding: '3px 10px', fontSize: 11, color, fontWeight: 600,
    }}>
      {label}
    </span>
  )
}
