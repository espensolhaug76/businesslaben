import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../GameContext'
import { getActiveIndustryDefinition } from '../data/industryDefinition'

// ─── ÅPNINGSBESTILLING (docs/INNKJOP_LEVERING.md) ─────────────────────────────
// Vises straks etter at eleven har leid et lokale (rentedLocationId satt,
// openingOrderPlaced=false). Eleven velger sitt EGET startlager fra hele
// katalogen — forhåndsutfylt med bransjens forslag (oppstartssortiment), som
// kan justeres/fjernes/utvides. Summen trekkes fra startkapitalen, og varene
// ligger FERDIG på lager dag 1 (for kafé «bakes ferske til åpningsdagen» —
// ingen ventetid; fra dag 2 gjelder normal bestilling med leveringstid).
// Tomt valg advares, men tillates. Selvstyrt som DayResultOverlay: leser state
// direkte, gates internt, ingen props.

function formatKr(n: number) { return `${Math.round(n).toLocaleString('nb-NO')} kr` }

export default function OpeningOrderOverlay() {
  const { state, dispatch } = useGame()
  const def = getActiveIndustryDefinition(state.industry)
  const catalog = def.katalog
  const forsyning = def.forsyning

  // Forhåndsutfylt forslag fra bransjens oppstartssortiment (0 for varer som
  // ikke er foreslått). Beregnes én gang ved mount.
  const [qtyById, setQtyById] = useState<Record<string, number>>(() => {
    const suggested: Record<string, number> = {}
    for (const o of def.oppstartssortiment) suggested[o.catalogId] = o.qty
    const init: Record<string, number> = {}
    for (const item of catalog) init[item.id] = suggested[item.id] ?? 0
    return init
  })

  // Gate INNE i komponenten (etter hooks) — hooks må kalles ubetinget.
  if (!state.rentedLocationId || state.openingOrderPlaced) return null

  const totalCost = catalog.reduce((s, item) => s + item.costPrice * (qtyById[item.id] ?? 0), 0)
  const totalQty = catalog.reduce((s, item) => s + (qtyById[item.id] ?? 0), 0)
  const remaining = state.money - totalCost
  const overBudget = totalCost > state.money
  const empty = totalQty === 0

  function setQty(id: string, qty: number) {
    setQtyById(prev => ({ ...prev, [id]: Math.max(0, Math.min(999, Math.round(qty) || 0)) }))
  }

  function confirm() {
    if (overBudget) return
    const items = Object.entries(qtyById).map(([productId, qty]) => ({ productId, qty }))
    dispatch({ type: 'PLACE_OPENING_ORDER', items })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 270, background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 24 }}
        style={{
          background: 'rgba(12,17,28,0.98)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1.75rem', width: '100%', maxWidth: 620,
          maxHeight: 'calc(100vh - 3rem)', display: 'flex', flexDirection: 'column',
          color: '#f1f5f9', overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.6rem 1.9rem 1.1rem' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', marginBottom: 4 }}>
            {def.emoji} {def.navn.toUpperCase()}
          </div>
          <h1 style={{ fontSize: 23, fontWeight: 900, margin: 0 }}>{forsyning.åpningsordreTittel}</h1>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0.4rem 0 0', lineHeight: 1.5 }}>
            {forsyning.åpningsordreLøfte} Velg hva du vil starte med — forslaget er fylt inn, men du
            bestemmer. Summen trekkes fra startkapitalen din.
          </p>
        </div>

        {/* Varekatalog — rullbar */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {catalog.map(item => {
            const qty = qtyById[item.id] ?? 0
            const lineCost = item.costPrice * qty
            return (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: qty > 0 ? 'rgba(0,212,170,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${qty > 0 ? 'rgba(0,212,170,0.25)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12, padding: '0.55rem 0.8rem',
              }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Innkjøp: {formatKr(item.costPrice)}/stk</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <StepBtn label="−" onClick={() => setQty(item.id, qty - 5)} />
                  <input
                    type="number" min={0} max={999} value={qty}
                    onChange={e => setQty(item.id, parseInt(e.target.value) || 0)}
                    style={{
                      width: 58, textAlign: 'center', background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                      padding: '5px 4px', color: '#f1f5f9', fontSize: 14, fontFamily: 'inherit',
                    }}
                  />
                  <StepBtn label="+" onClick={() => setQty(item.id, qty + 5)} />
                </div>
                <div style={{ width: 82, textAlign: 'right', fontSize: 13, fontWeight: 700, color: qty > 0 ? '#00d4aa' : '#475569' }}>
                  {qty > 0 ? formatKr(lineCost) : '—'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer — sum, advarsel, bekreft */}
        <div style={{ padding: '1.1rem 1.9rem 1.6rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {empty && (
            <div style={{
              background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.4)',
              borderRadius: 10, padding: '0.6rem 0.9rem', marginBottom: '0.9rem',
              fontSize: 13, color: '#fde68a', lineHeight: 1.45,
            }}>
              ⚠ Åpner du uten varer? Da står disken tom på åpningsdagen. Du kan legge inn
              varer nå, eller bestille senere (klart neste morgen).
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.9rem' }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Startkapital: <strong style={{ color: '#f1f5f9' }}>{formatKr(state.money)}</strong>
              <span style={{ margin: '0 6px', opacity: 0.5 }}>·</span>
              Igjen etter kjøp: <strong style={{ color: overBudget ? '#ef4444' : '#22c55e' }}>{formatKr(remaining)}</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#64748b' }}>Sum ({totalQty} stk)</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: overBudget ? '#ef4444' : '#00d4aa' }}>{formatKr(totalCost)}</div>
            </div>
          </div>
          <button
            onClick={confirm}
            disabled={overBudget}
            style={{
              width: '100%', background: overBudget ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg,#00d4aa,#0d9488)',
              border: 'none', borderRadius: 99, padding: '0.85rem', color: overBudget ? '#64748b' : '#fff',
              fontWeight: 800, fontSize: 15, cursor: overBudget ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            }}
          >
            {overBudget ? '💸 For dyrt — reduser bestillingen' : empty ? 'Åpne uten varer →' : forsyning.åpningsordreKnapp}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StepBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 26, height: 30, borderRadius: 7, background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.14)', color: '#cbd5e1', fontSize: 16,
      cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1, flexShrink: 0,
    }}>{label}</button>
  )
}
