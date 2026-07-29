import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_META, isIndustryActive } from '../data/industries'
import type { Industry } from '../types'
import type { BusinessModel, GameFlags } from '../types'
import { FINANSIERING_OPTIONS, PERSONLIGHET_OPTIONS } from '../../strategies/innovation/startupChoices'
import { lagringSammendrag, fortsettState, slettLagring } from '../save'

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
  const [selectedFinansiering, setSelectedFinansiering] = useState<GameFlags['finansieringStart'] | null>(null)
  const [selectedPersonlighet, setSelectedPersonlighet] = useState<GameFlags['personlighet'] | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [step, setStep] = useState<'choose' | 'model' | 'financing' | 'personality' | 'name'>('choose')

  // LAGRING: finnes et fortsettbart spill (adventure_save_v1)? Snapshot ved mount.
  // Er det en save vises «Fortsett/Ny»-menyen først; ellers rett i navnemenyen.
  const [lagring] = useState(() => lagringSammendrag())
  const [visMeny, setVisMeny] = useState<'fortsett' | 'ny'>(lagring ? 'fortsett' : 'ny')
  const [bekreftNy, setBekreftNy] = useState(false)

  function handleStart() {
    if (!companyName.trim() || !selectedIndustry || !selectedModel) return
    dispatch({
      type: 'START_GAME',
      companyName: companyName.trim(),
      industry: selectedIndustry,
      businessModel: selectedModel,
      finansiering: selectedFinansiering ?? 'ingen',
      personlighet: selectedPersonlighet ?? 'analytisk',
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
              onClick={() => selectedModel && setStep('financing')}
              disabled={!selectedModel}
              style={nextBtn(!!selectedModel)}
            >
              Neste →
            </button>
          </div>
        </motion.div>
      )}

      {step === 'financing' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 700 }}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: '0.5rem' }}>
            Velg finansiering
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
            Hvor henter du startkapitalen? Valget gir bonuser og skjulte kostnader.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {FINANSIERING_OPTIONS.map((f, i) => (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedFinansiering(f.id)}
                style={{
                  background: selectedFinansiering === f.id ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${selectedFinansiering === f.id ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '1.5rem', padding: '1.25rem',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', fontFamily: 'inherit', color: '#f1f5f9',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: '0.25rem' }}>{f.navn}</div>
                {f.beloep > 0 && <Chip label={`+${formatKr(f.beloep)}`} color="#22c55e" />}
                <div style={{ fontSize: 12, color: '#22c55e', marginTop: '0.5rem' }}>+ {f.bonus}</div>
                <div style={{ fontSize: 11, color: '#f97316', marginTop: '0.25rem' }}>− {f.skjultKostnad}</div>
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setStep('model')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}>← Tilbake</button>
            <button onClick={() => selectedFinansiering && setStep('personality')} disabled={!selectedFinansiering} style={nextBtn(!!selectedFinansiering)}>Neste →</button>
          </div>
        </motion.div>
      )}

      {step === 'personality' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 700 }}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: '0.5rem' }}>
            Hvem er du som gründer?
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: '1.5rem' }}>
            Din personlighetstype påvirker hvilke events du møter og dine styrker.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {PERSONLIGHET_OPTIONS.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedPersonlighet(p.id)}
                style={{
                  background: selectedPersonlighet === p.id ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${selectedPersonlighet === p.id ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '1.5rem', padding: '1.25rem',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', fontFamily: 'inherit', color: '#f1f5f9',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: '0.25rem' }}>{p.navn}</div>
                <div style={{ fontSize: 12, color: '#22c55e', marginTop: '0.25rem' }}>+ {p.bonus}</div>
                <div style={{ fontSize: 11, color: '#f97316', marginTop: '0.25rem' }}>− {p.ulempe}</div>
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setStep('financing')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.75rem 1.75rem', color: '#94a3b8', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}>← Tilbake</button>
            <button onClick={() => selectedPersonlighet && setStep('name')} disabled={!selectedPersonlighet} style={nextBtn(!!selectedPersonlighet)}>Neste →</button>
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
              onClick={() => setStep('personality')}
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
