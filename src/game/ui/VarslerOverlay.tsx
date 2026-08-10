import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { BALANCE } from '../data/balance'
import type { Varsel } from '../types'

// ─── VARSLINGSSENTER (DEL 3, 10.08) ───────────────────────────────────────────
// Enkel liste over hendelser (nyeste øverst, maks 20): mentor-meldinger,
// leveringer, avis-utgaver, innboks-ankomster, tema-aktiveringer. Klikk på en rad
// navigerer dit det gjelder (innboks/avis/mentor) der det finnes et mål. Badge =
// uleste; nullstilles når senteret lukkes (MARK_VARSLER_LEST). Ingen ny
// designflate — én ren liste, samme mønster som avis/dashbord-overlayene.

const MAKS_VIST = 20

function klokkeslett(minutt?: number): string {
  if (minutt == null) return ''
  const m = BALANCE.klokke.apneMinutt + minutt
  const h = Math.floor(m / 60), min = m % 60
  return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
}

export default function VarslerOverlay({ open, onClose, onNavigate }: {
  open: boolean
  onClose: () => void
  onNavigate: (maal: NonNullable<Varsel['maal']>) => void
}) {
  const { state } = useGame()
  // Nyeste øverst; maks 20.
  const varsler = [...state.varsler].reverse().slice(0, MAKS_VIST)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Klikk utenfor lukker */}
          <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 440 }} />
          <motion.div
            data-testid="varsler-senter"
            initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            style={{
              position: 'fixed', top: 62, right: 16, zIndex: 450, width: 360, maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'min(70vh, 560px)', display: 'flex', flexDirection: 'column',
              background: 'rgba(12,17,28,0.98)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '1rem', boxShadow: '0 18px 50px rgba(0,0,0,0.55)', overflow: 'hidden',
              fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>🔔 Varsler</span>
              <button onClick={onClose} data-testid="varsler-lukk" title="Lukk" style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 16, cursor: 'pointer', lineHeight: 1, padding: 2 }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', padding: '0.35rem' }}>
              {varsler.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13, padding: '2.5rem 1rem' }}>Ingen varsler ennå.</div>
              ) : varsler.map(v => {
                const klikkbar = !!v.maal
                const tid = klokkeslett(v.minutt)
                return (
                  <div
                    key={v.id}
                    onClick={() => { if (v.maal) { onNavigate(v.maal); onClose() } }}
                    style={{
                      display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
                      padding: '0.6rem 0.7rem', borderRadius: 10, cursor: klikkbar ? 'pointer' : 'default',
                      background: v.lest ? 'transparent' : 'rgba(56,189,248,0.07)',
                    }}
                    onMouseEnter={e => { if (klikkbar) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = v.lest ? 'transparent' : 'rgba(56,189,248,0.07)' }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1.2 }}>{v.ikon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.4, color: v.lest ? '#cbd5e1' : '#f1f5f9' }}>{v.tekst}</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                        Dag {v.dag}{tid ? ` · ${tid}` : ''}{klikkbar ? ' · klikk for å åpne' : ''}
                      </div>
                    </div>
                    {!v.lest && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', marginTop: 5, flexShrink: 0 }} />}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
