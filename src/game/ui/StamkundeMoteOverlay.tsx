import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { getScenario } from '../sales/scenarios'
import { stamkundeMote } from '../data/stamkundeDialog'
import { BALANCE } from '../data/balance'
import type { SaleLine } from '../sales/types'

// ─── STAMKUNDEMØTE-OVERLAY (KROK 2-REDESIGN) ─────────────────────────────────
// Kort GJENKJENNINGSMØTE med en returnerende kunde — IKKE scenariotreet. Kunden
// spiller 2–4 utviklingsreplikker (trinn 1→3) og handler «det vanlige» med
// kjøpsbonus. Trinn 3: kunden tar med en venn/kollega → +1 kjøp. Skriver
// INGENTING til state før eleven trykker «Fullfør» (RESOLVE_STAMKUNDEMOTE).
// __OVERLAY_OPEN__ styres av GamePage (samme som salgsscenarioet).

export default function StamkundeMoteOverlay({ open, onClose, scenarioId }: {
  open: boolean
  onClose: () => void
  scenarioId: string
}) {
  const scenario = getScenario(scenarioId)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.78)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
          }}
          onPointerDown={e => { e.stopPropagation(); if (e.target === e.currentTarget) onClose() }}
          onPointerUp={e => e.stopPropagation()}
        >
          <motion.div
            data-testid="stamkundemote"
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24 }}
            style={{
              background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(45,212,191,0.28)', borderRadius: '1.75rem',
              width: '100%', maxWidth: 520, maxHeight: 'calc(100vh - 3rem)',
              display: 'flex', flexDirection: 'column', color: '#f1f5f9', overflow: 'hidden',
            }}
          >
            {scenario
              ? <MoteRun key={scenario.id} scenarioId={scenario.id} customerName={scenario.customerName} personaTag={scenario.personaTag} onClose={onClose} />
              : <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Fant ikke kunden «{scenarioId}».</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MoteRun({ scenarioId, customerName, personaTag, onClose }: {
  scenarioId: string
  customerName: string
  personaTag: string
  onClose: () => void
}) {
  const { state, dispatch } = useGame()
  const minne = state.stamkunder[scenarioId]
  const mote = useMemo(() => stamkundeMote(scenarioId, minne), [scenarioId, minne])

  const [idx, setIdx] = useState(0)

  // «Det vanlige» — hovedproduktet hvis priset og på lager, ellers første prisede
  // vare med lager. Trinn 3 (venn/kollega): +1 kjøp.
  const valgtProdukt = useMemo(() => {
    const priced = state.products.filter(p => p.retailPrice > 0)
    const main = state.mainProductId ? priced.find(p => p.id === state.mainProductId && p.stock > 0) : undefined
    return main ?? priced.find(p => p.stock > 0) ?? priced[0] ?? null
  }, [state.products, state.mainProductId])

  if (!mote) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>{customerName} stikker bare innom.</div>
        <PrimaryButton label="Lukk" onClick={onClose} />
      </div>
    )
  }

  const antall = mote.venn ? 2 : 1
  const sisteReplikk = idx >= mote.replikker.length - 1
  const kjopKr = valgtProdukt
    ? Math.round(antall * valgtProdukt.retailPrice * BALANCE.stamkunder.kjopsBonusFaktor)
    : 0

  function fullfor() {
    const sales: SaleLine[] = valgtProdukt
      ? [{ productId: valgtProdukt.id, name: valgtProdukt.name, price: valgtProdukt.retailPrice, qty: antall }]
      : []
    dispatch({
      type: 'RESOLVE_STAMKUNDEMOTE',
      scenarioId,
      sales,
      reputationDelta: BALANCE.stamkunder.stamkundemoteRykte,
      xpEarned: BALANCE.stamkunder.stamkundemoteXp,
    })
    onClose()
  }

  return (
    <>
      {/* Header — kunde + trinn-label (alltid TEKST, aldri kun farge) */}
      <div style={{ padding: '1.4rem 1.75rem 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#2dd4bf', letterSpacing: '0.1em', marginBottom: 4 }}>
            👋 STAMKUNDE KOMMER INNOM
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {customerName}
            <span style={{
              fontSize: 11, fontWeight: 700, color: '#2dd4bf', background: 'rgba(45,212,191,0.12)',
              border: '1px solid rgba(45,212,191,0.35)', borderRadius: 99, padding: '2px 9px',
            }}>
              {mote.erKjolig ? 'Trenger en ny sjanse' : mote.trinnLabel}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '2px 9px' }}>
              {personaTag}
            </span>
          </h2>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 99, width: 34, height: 34, color: '#94a3b8', cursor: 'pointer',
          fontSize: 17, fontFamily: 'inherit', flexShrink: 0,
        }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
        {/* Replikk-teller */}
        <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          REPLIKK {Math.min(idx + 1, mote.replikker.length)} AV {mote.replikker.length}
        </div>

        {/* Kunde-replikk (én om gangen) */}
        <div style={{
          background: mote.erKjolig ? 'rgba(245,158,11,0.08)' : 'rgba(45,212,191,0.06)',
          border: `1px solid ${mote.erKjolig ? 'rgba(245,158,11,0.3)' : 'rgba(45,212,191,0.25)'}`,
          borderRadius: '0 14px 14px 14px', padding: '0.9rem 1.1rem', marginBottom: '1rem',
        }}>
          <div style={{ fontSize: 15, color: '#f1f5f9', lineHeight: 1.5, fontStyle: 'italic' }}>
            {mote.replikker[idx]}
          </div>
        </div>

        {!sisteReplikk ? (
          <div style={{ textAlign: 'right' }}>
            <PrimaryButton label="Neste →" onClick={() => setIdx(i => i + 1)} />
          </div>
        ) : (
          <div>
            {/* Kjøpssammendrag */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', marginBottom: 6 }}>HANDELEN</div>
              {valgtProdukt ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#cbd5e1' }}>
                    {antall > 1 ? `${antall} × ` : ''}{valgtProdukt.icon} {valgtProdukt.name}
                    {mote.venn && <span style={{ color: '#2dd4bf' }}> (+ venn/kollega)</span>}
                  </span>
                  <span style={{ color: '#22c55e', fontWeight: 800 }}>{kjopKr.toLocaleString('nb-NO')} kr</span>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#facc15' }}>Du har ingen priset vare på lager akkurat nå — kunden handler ikke i dag.</div>
              )}
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
                💚 Stamkunde-påslag ×{BALANCE.stamkunder.kjopsBonusFaktor} er regnet inn.
                {mote.venn && ' Trinn 3: kunden tok med seg én til (+1 kjøp).'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <PrimaryButton label="Fullfør ✓" onClick={fullfor} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button data-testid="stamkunde-knapp" onClick={onClick} style={{
      background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none',
      borderRadius: 99, padding: '0.6rem 1.6rem', color: '#fff',
      fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    }}>{label}</button>
  )
}
