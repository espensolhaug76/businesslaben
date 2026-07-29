import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_META, isIndustryActive } from '../data/industries'
import type { Industry } from '../types'
import { lagringSammendrag, fortsettState, slettLagring } from '../save'

// FORENKLET OPPSTART (Espens beslutning): de tre v1-restene «Velg
// forretningsmodell», «Velg finansiering» og «Hvem er du som gründer?» er FJERNET.
// Løypa er nå: navn → bransje → (bykart → åpningsbestilling). Forretningsmodell,
// finansierings- og personlighetsvalgene settes til trygge standardverdier
// (detaljhandel / ingen / analytisk) i START_GAME — startkapitalen er den faste
// standarden per bransje (STARTING_MONEY), ingen valg-bonuser.

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

const INDUSTRIES = Object.entries(INDUSTRY_META) as [Industry, typeof INDUSTRY_META[Industry]][]

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
  const [companyName, setCompanyName] = useState('')
  // Forenklet løype: navn → bransje. (De tre v1-stegene er fjernet, se toppen.)
  const [step, setStep] = useState<'name' | 'choose'>('name')

  // LAGRING: finnes et fortsettbart spill (adventure_save_v1)? Snapshot ved mount.
  // Er det en save vises «Fortsett/Ny»-menyen først; ellers rett i navnemenyen.
  const [lagring] = useState(() => lagringSammendrag())
  const [visMeny, setVisMeny] = useState<'fortsett' | 'ny'>(lagring ? 'fortsett' : 'ny')
  const [bekreftNy, setBekreftNy] = useState(false)

  function handleStart() {
    if (!companyName.trim() || !selectedIndustry) return
    dispatch({
      type: 'START_GAME',
      companyName: companyName.trim(),
      industry: selectedIndustry,
      // Trygge standardverdier — valgstegene er fjernet (nøytraliserte flagg).
      businessModel: 'detaljhandel',
      finansiering: 'ingen',
      personlighet: 'analytisk',
    })
  }

  function handleFortsett() {
    const s = fortsettState()
    if (s) dispatch({ type: 'HYDRATE_SAVE', state: s })
  }
  function handleStartNy() {
    // «Start ny bedrift» sletter lagringen (backup beholdes) → fersk navnemeny.
    slettLagring()
    setBekreftNy(false)
    setVisMeny('ny')
  }

  // ── FORTSETT/NY-MENY (vises når det finnes et lagret spill) ──────────────────
  if (visMeny === 'fortsett' && lagring) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '2rem',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1e1b4b 50%, #0a0e1a 100%)',
        fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
      }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: 52, marginBottom: '0.5rem' }}>🏪</div>
          <h1 style={{
            fontSize: 'clamp(1.8rem,4.5vw,3rem)', fontWeight: 900, margin: 0,
            background: 'linear-gradient(135deg, #00d4aa, #4facfe)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Velkommen tilbake!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: '0.75rem 0 0' }}>
            Du har et lagret spill på denne maskinen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            width: '100%', maxWidth: 460,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '2rem', padding: '2rem', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 6 }}>
            LAGRET BEDRIFT
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
            {lagring.companyName || 'Bedriften din'}
          </div>
          <div style={{ fontSize: 14, color: '#38bdf8', marginBottom: '1.75rem' }}>
            Dag {lagring.dayNumber}
          </div>

          <button
            onClick={handleFortsett}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #00d4aa, #4facfe)',
              border: 'none', borderRadius: 99, padding: '0.95rem', color: '#030712',
              fontWeight: 800, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit',
              marginBottom: '0.9rem',
            }}
          >
            ▶ Fortsett som {lagring.companyName || 'bedriften din'} — Dag {lagring.dayNumber}
          </button>

          {!bekreftNy ? (
            <button
              onClick={() => setBekreftNy(true)}
              style={{
                width: '100%', background: 'transparent', border: '1px solid rgba(248,113,113,0.4)',
                borderRadius: 99, padding: '0.75rem', color: '#fca5a5',
                fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Start ny bedrift
            </button>
          ) : (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: 14, padding: '1rem', textAlign: 'center',
            }}>
              <p style={{ fontSize: 14, color: '#fecaca', margin: '0 0 0.9rem', lineHeight: 1.5 }}>
                Dette sletter <strong>{lagring.companyName || 'bedriften din'}</strong>. Er du sikker?
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setBekreftNy(false)}
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 99, padding: '0.6rem 1.4rem', color: '#cbd5e1',
                    fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Avbryt
                </button>
                <button
                  onClick={handleStartNy}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #b91c1c)', border: 'none',
                    borderRadius: 99, padding: '0.6rem 1.4rem', color: '#fff',
                    fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Ja, slett og start ny
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1e1b4b 50%, #0a0e1a 100%)',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
    }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: 52, marginBottom: '0.5rem' }}>🏪</div>
        <h1 style={{
          fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, margin: 0,
          background: 'linear-gradient(135deg, #00d4aa, #4facfe)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Start bedriften din
        </h1>
        <p style={{ color: '#64748b', fontSize: 17, margin: '0.75rem 0 0' }}>
          Gi bedriften et navn og velg bransje — så er du i gang.
        </p>
      </motion.div>

      {/* STEG 1 — NAVN */}
      {step === 'name' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            width: '100%', maxWidth: 460,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '2rem', padding: '2.5rem', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 44, marginBottom: '0.75rem' }}>🏪</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: '0.4rem' }}>
            Gi bedriften din et navn
          </h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
            Dette blir navnet på butikken din i byen.
          </p>
          <input
            autoFocus
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && companyName.trim() && setStep('choose')}
            placeholder="F.eks. Nordic Coffee, Kafé Kongsvinger…"
            style={{
              width: '100%', background: 'rgba(255,255,255,0.06)',
              border: '2px solid rgba(255,255,255,0.12)', borderRadius: 12,
              padding: '0.9rem 1.2rem', color: '#f1f5f9', fontSize: 17,
              fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
              marginBottom: '1.5rem',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => companyName.trim() && setStep('choose')} disabled={!companyName.trim()} style={nextBtn(!!companyName.trim())}>
              Neste →
            </button>
          </div>
        </motion.div>
      )}

      {/* STEG 2 — BRANSJE */}
      {step === 'choose' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 900 }}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: '1.5rem' }}>
            Velg din bransje
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {INDUSTRIES.map(([id, meta], i) => {
              const active = isIndustryActive(id)
              return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => active && setSelectedIndustry(id)}
                disabled={!active}
                title={active ? undefined : 'Denne bransjen kommer senere'}
                style={{
                  position: 'relative',
                  background: !active ? 'rgba(255,255,255,0.02)' : selectedIndustry === id ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${!active ? 'rgba(255,255,255,0.06)' : selectedIndustry === id ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '1.5rem', padding: '1.5rem',
                  cursor: active ? 'pointer' : 'not-allowed', textAlign: 'left',
                  opacity: active ? 1 : 0.5,
                  transition: 'all 0.2s', fontFamily: 'inherit', color: '#f1f5f9',
                }}
              >
                {!active && (
                  <span style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.5)',
                    color: '#facc15', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
                    borderRadius: 99, padding: '2px 9px',
                  }}>KOMMER</span>
                )}
                <div style={{ fontSize: 38, marginBottom: '0.6rem', filter: active ? 'none' : 'grayscale(1)' }}>{meta.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: '0.3rem' }}>{meta.name}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: '0.8rem', lineHeight: 1.5 }}>
                  {meta.description}
                </div>
                <Chip label={active ? `Startkapital: ${formatKr(meta.startingMoney)}` : 'Ikke tilgjengelig ennå'} color={active ? '#22c55e' : '#64748b'} />
              </motion.button>
            )})}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setStep('name')}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15,
              }}
            >
              ← Tilbake
            </button>
            <button onClick={handleStart} disabled={!selectedIndustry} style={nextBtn(!!selectedIndustry)}>
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
