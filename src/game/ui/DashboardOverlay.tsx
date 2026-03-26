import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../GameContext'
import { INDUSTRY_CATALOG, catalogToProduct } from '../data/industries'
import { generatePersona, calcPersonaMatchScore, matchLabel, MARKETING_CHANNEL_TIP } from '../data/personas'
import type { Product, DistributionChannel } from '../types'
import type { Loan } from '../types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

type Tab = 'oversikt' | 'forretningsplan' | 'produkter' | 'malgruppe' | 'okonomi' | 'lokasjon' | 'priser' | 'markedsforing' | 'personale' | 'rapporter'

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'oversikt',        label: 'Oversikt',         emoji: '📊' },
  { id: 'forretningsplan', label: 'Forretningsplan',   emoji: '📋' },
  { id: 'produkter',       label: 'Produkter',         emoji: '📦' },
  { id: 'malgruppe',       label: 'Målgruppe',         emoji: '🎯' },
  { id: 'okonomi',         label: 'Økonomi',           emoji: '💰' },
  { id: 'lokasjon',        label: 'Lokasjon',          emoji: '📍' },
  { id: 'priser',          label: 'Priser',            emoji: '🏷️' },
  { id: 'markedsforing',   label: 'Markedsføring',     emoji: '📢' },
  { id: 'personale',       label: 'Personale',         emoji: '👥' },
  { id: 'rapporter',       label: 'Rapporter',         emoji: '📋' },
]

interface DashboardOverlayProps {
  open: boolean
  onClose: () => void
  initialTab?: Tab
}

export default function DashboardOverlay({ open, onClose, initialTab = 'oversikt' }: DashboardOverlayProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  useEffect(() => {
    if (open && initialTab) setActiveTab(initialTab as Tab)
  }, [open, initialTab])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 180,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif", padding: '1.5rem',
            pointerEvents: open ? 'auto' : 'none',
          }}
          onPointerDown={e => { e.stopPropagation(); if (e.target === e.currentTarget) onClose() }}
          onPointerUp={e => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24 }}
            style={{
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2rem', width: '100%', maxWidth: 960,
              maxHeight: 'calc(100vh - 3rem)',
              display: 'flex', flexDirection: 'column',
              color: '#f1f5f9', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem 2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>💻 Bedriftsdashboard</h2>
                <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>All bedriftsstyring på ett sted</p>
              </div>
              <button onClick={onClose} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99, width: 36, height: 36, color: '#94a3b8',
                cursor: 'pointer', fontSize: 18, fontFamily: 'inherit',
              }}>✕</button>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: '0.5rem', padding: '1rem 2rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto',
            }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  background: activeTab === t.id ? 'rgba(0,212,170,0.12)' : 'transparent',
                  border: `1px solid ${activeTab === t.id ? '#00d4aa' : 'transparent'}`,
                  borderBottom: 'none', borderRadius: '8px 8px 0 0',
                  padding: '0.6rem 1.2rem',
                  color: activeTab === t.id ? '#00d4aa' : '#64748b',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s',
                  flexShrink: 0,
                }}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem 2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {activeTab === 'oversikt'        && <OversiktTab />}
                  {activeTab === 'forretningsplan' && <ForretningsplanTab />}
                  {activeTab === 'produkter'       && <ProdukterTab />}
                  {activeTab === 'malgruppe'       && <MalgruppeTab />}
                  {activeTab === 'okonomi'         && <OkonomiTab />}
                  {activeTab === 'lokasjon'        && <LokasjonTab />}
                  {activeTab === 'priser'          && <PriserTab />}
                  {activeTab === 'markedsforing'   && <MarkedsforingTab />}
                  {activeTab === 'personale'       && <PersonaleTab />}
                  {activeTab === 'rapporter'       && <RapporterTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Oversikt ──────────────────────────────────────────────────────────────────

function OversiktTab() {
  const { state, dispatch } = useGame()
  const { money, reputation, monthlyResults, locationZone, monthlyRent, progress, loans, totalDebt } = state

  const totalRev    = monthlyResults.reduce((s, r) => s + r.revenue, 0)
  const totalProfit = monthlyResults.reduce((s, r) => s + r.profit, 0)
  const maxRev      = Math.max(...monthlyResults.map(r => r.revenue), 1)
  const monthlyCosts = monthlyRent + state.monthlyPayroll + state.monthlyLoanPayment + Object.values(state.marketingBudget).reduce((s, v) => s + v, 0)

  void totalRev
  void locationZone
  void loans

  const checklist: { label: string; done: boolean }[] = [
    { label: 'Lag forretningsplan', done: progress.businessPlanCreated },
    { label: 'Definer målgruppe', done: progress.targetAudienceDefined },
    { label: 'Velg produkter', done: progress.productsSelected },
    { label: 'Velg lokasjon/distribusjon', done: progress.locationChosen },
    { label: 'Bestill varelager', done: progress.productsOrdered },
    { label: 'Sett priser', done: progress.pricesSet },
    { label: 'Sett opp markedsføring', done: progress.marketingSet },
  ]

  const allDone = checklist.every(c => c.done)

  function handleSimulate() {
    dispatch({ type: 'SET_PHASE', phase: 'ready_to_simulate' })
    window.dispatchEvent(new CustomEvent('phaser:simulate'))
  }

  return (
    <div>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Kontanter"       value={formatKr(money)}       color="#22c55e" icon="💰" />
        <KpiCard label="Gjeld"           value={formatKr(totalDebt)}   color={totalDebt > 0 ? '#f97316' : '#22c55e'} icon="🏦" />
        <KpiCard label="Kostnader/mnd"   value={formatKr(monthlyCosts)} color="#f97316" icon="📤" />
        <KpiCard label="Rykte"           value={`${reputation}/100`}   color={reputation >= 60 ? '#22c55e' : '#facc15'} icon="⭐" />
      </div>

      {/* Progress checklist */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem', letterSpacing: '0.06em' }}>OPPSTARTSSJEKKLISTE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {checklist.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: 14 }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{item.done ? '✅' : '⬜'}</span>
              <span style={{ color: item.done ? '#94a3b8' : '#f1f5f9', textDecoration: item.done ? 'line-through' : 'none' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        {allDone && (
          <button
            onClick={handleSimulate}
            style={{
              marginTop: '1.25rem', width: '100%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              border: 'none', borderRadius: 99, padding: '0.9rem',
              color: '#fff', fontWeight: 800, fontSize: 16,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ▶ Simuler måneden
          </button>
        )}
      </div>

      {/* Revenue chart if any results */}
      {monthlyResults.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: '1rem', letterSpacing: '0.08em' }}>MÅNEDLIG OMSETNING</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 100 }}>
            {monthlyResults.map((r, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  height: Math.max(4, Math.round((r.revenue / maxRev) * 90)),
                  background: r.profit >= 0 ? 'rgba(0,212,170,0.5)' : 'rgba(239,68,68,0.5)',
                  transition: 'height 0.4s',
                }} />
                <span style={{ fontSize: 9, color: '#475569' }}>{MONTH_NAMES[r.month - 1]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: 14 }}>
            <span style={{ color: '#64748b' }}>Total nettoresultat:</span>
            <span style={{ fontWeight: 800, color: totalProfit >= 0 ? '#22c55e' : '#ef4444' }}>
              {totalProfit >= 0 ? '+' : ''}{formatKr(totalProfit)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Forretningsplan ────────────────────────────────────────────────────────────

function ForretningsplanTab() {
  const { state, dispatch } = useGame()
  const { businessPlan, products, targetAudience, monthlyRent, monthlyPayroll, monthlyLoanPayment, marketingBudget } = state
  const [description, setDescription] = useState(businessPlan.description)

  const monthlyCosts = monthlyRent + monthlyPayroll + monthlyLoanPayment + Object.values(marketingBudget).reduce((s, v) => s + v, 0)
  const estRevenue = products.reduce((s, p) => s + p.retailPrice * Math.min(p.maxDemandPerMonth * 0.5, p.stock), 0)
  const breakEvenMonth = monthlyCosts > 0 && estRevenue > 0
    ? Math.ceil(monthlyCosts / Math.max(1, estRevenue - monthlyCosts))
    : null

  const q = businessPlan.qualityScore
  const stars = '★'.repeat(q) + '☆'.repeat(5 - q)
  const QUALITY_COLOR = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#22c55e', '#22c55e']
  const QUALITY_LABEL = ['Ingen plan', 'Svak plan', 'Akseptabel', 'God plan', 'Utmerket', 'Fantastisk!']

  const taSummary = [
    ...targetAudience.ageGroups,
    ...targetAudience.genders,
    ...targetAudience.psychographics,
  ].join(', ') || 'Ikke definert'

  const RATE_LABELS = ['15 %', '12 %', '9 %', '7 %', '5 %', '5 %']

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Forretningsplan</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
          En god plan gir bedre lånevilkår og viser deg veien videre.
        </p>
      </div>

      {/* Quality badge */}
      <div style={{
        background: `${QUALITY_COLOR[q]}12`, border: `1px solid ${QUALITY_COLOR[q]}44`,
        borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{ fontSize: 28, color: QUALITY_COLOR[q] }}>{stars}</div>
        <div>
          <div style={{ fontWeight: 700, color: QUALITY_COLOR[q] }}>{QUALITY_LABEL[q]}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Plankvalitet påvirker bankens rentesats</div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Description */}
        <PlanSection title="Sammendrag" complete={description.trim().length > 20} icon="📝">
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Beskriv forretningsidéen din i 2-3 setninger. Hva selger du, til hvem, og hva gjør deg unik?"
            style={{
              width: '100%', minHeight: 80, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
              padding: '0.75rem', color: '#f1f5f9', fontSize: 13, fontFamily: 'inherit',
              resize: 'vertical', boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => dispatch({ type: 'SAVE_BUSINESS_PLAN', description })}
            style={{ marginTop: '0.5rem', background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 8, padding: '0.4rem 1rem', color: '#00d4aa', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Lagre
          </button>
        </PlanSection>

        {/* Market research */}
        <PlanSection title="Markedsanalyse" complete={businessPlan.marketResearchDone} icon="🔍">
          {businessPlan.marketResearchDone ? (
            <p style={{ color: '#22c55e', fontSize: 13, margin: 0 }}>✅ Markedsundersøkelse kjøpt. Du har god innsikt i markedet.</p>
          ) : (
            <div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 0.75rem' }}>
                Kjøp en markedsundersøkelse for å få konkrete data. Gir +1 stjerne i plankvalitet.
              </p>
              <button
                onClick={() => dispatch({ type: 'BUY_MARKET_RESEARCH' })}
                disabled={state.money < 10_000}
                style={{
                  background: state.money >= 10_000 ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${state.money >= 10_000 ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8, padding: '0.5rem 1.25rem',
                  color: state.money >= 10_000 ? '#00d4aa' : '#475569',
                  fontSize: 13, cursor: state.money >= 10_000 ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                }}
              >
                Kjøp markedsundersøkelse — 10 000 kr
              </button>
            </div>
          )}
        </PlanSection>

        {/* Target audience */}
        <PlanSection title="Målgruppe" complete={targetAudience.ageGroups.length > 0 || targetAudience.genders.length > 0} icon="🎯">
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
            {taSummary !== 'Ikke definert' ? taSummary : 'Gå til Målgruppe-fanen for å definere hvem du selger til.'}
          </p>
        </PlanSection>

        {/* Products */}
        <PlanSection title="Produkter/Tjenester" complete={products.length > 0} icon="📦">
          {products.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {products.map(p => (
                <span key={p.id} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, padding: '3px 10px', fontSize: 12 }}>
                  {p.icon} {p.name} ({p.tier})
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Gå til Produkter-fanen for å velge hva du skal selge.</p>
          )}
        </PlanSection>

        {/* Budget */}
        <PlanSection title="Driftsbudsjett (estimert)" complete={monthlyCosts > 0} icon="💵">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.3rem 1rem', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Husleie</span>
            <span style={{ textAlign: 'right' }}>{formatKr(monthlyRent)}</span>
            <span style={{ color: '#64748b' }}>Lønn</span>
            <span style={{ textAlign: 'right' }}>{formatKr(monthlyPayroll)}</span>
            <span style={{ color: '#64748b' }}>Markedsføring</span>
            <span style={{ textAlign: 'right' }}>{formatKr(Object.values(marketingBudget).reduce((s, v) => s + v, 0))}</span>
            <span style={{ color: '#64748b' }}>Lånebetalinger</span>
            <span style={{ textAlign: 'right' }}>{formatKr(monthlyLoanPayment)}</span>
            <span style={{ color: '#64748b' }}>Forsikring/div.</span>
            <span style={{ textAlign: 'right' }}>{formatKr(2_000)}</span>
            <div style={{ gridColumn: '1/-1', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.3rem 0' }} />
            <span style={{ fontWeight: 700 }}>Total/mnd</span>
            <span style={{ textAlign: 'right', fontWeight: 700, color: '#f97316' }}>{formatKr(monthlyCosts + 2000)}</span>
            {estRevenue > 0 && <>
              <span style={{ color: '#64748b' }}>Est. inntekt/mnd</span>
              <span style={{ textAlign: 'right', color: '#22c55e' }}>{formatKr(estRevenue)}</span>
            </>}
            {breakEvenMonth !== null && breakEvenMonth > 0 && breakEvenMonth < 36 && <>
              <span style={{ color: '#64748b' }}>Estimert break-even</span>
              <span style={{ textAlign: 'right', color: '#38bdf8' }}>Måned {breakEvenMonth}</span>
            </>}
          </div>
        </PlanSection>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={() => dispatch({ type: 'SAVE_BUSINESS_PLAN', description })}
          style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.7rem 1.75rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Lagre plan
        </button>
        <div style={{ fontSize: 13, color: '#64748b' }}>
          Plankvalitet ({q}/5) påvirker rente: {RATE_LABELS[Math.max(0, Math.min(5, q))]} p.a.
        </div>
      </div>
    </div>
  )
}

function PlanSection({ title, complete, icon, children }: { title: string; complete: boolean; icon: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: complete ? 'rgba(0,212,170,0.05)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${complete ? 'rgba(0,212,170,0.25)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '0.75rem', padding: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <span>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{title}</span>
        {complete && <span style={{ marginLeft: 'auto', color: '#00d4aa', fontSize: 13 }}>✅</span>}
      </div>
      {children}
    </div>
  )
}

// ── Målgruppe ──────────────────────────────────────────────────────────────────

const AGE_GROUPS  = ['15-20','21-30','31-45','46-60','60+']
const GENDERS     = ['Kvinner','Menn','Begge']
const PSYCHO_OPTS = ['Miljøbevisste','Karriereorienterte','Trendsettere','Prisbevisste','Helsebevisste','Familieorienterte']
const GEO_OPTS    = ['Lokalt','Regionalt','Nasjonalt']

function MalgruppeTab() {
  const { state, dispatch } = useGame()
  const [audience, setAudience] = useState({ ...state.targetAudience })

  function toggleArr<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]
  }

  function togglePsycho(p: string) {
    setAudience(prev => {
      const has = prev.psychographics.includes(p)
      if (has) return { ...prev, psychographics: prev.psychographics.filter(x => x !== p) }
      if (prev.psychographics.length >= 3) return prev   // max 3
      return { ...prev, psychographics: [...prev.psychographics, p] }
    })
  }

  function save() {
    dispatch({ type: 'SET_TARGET_AUDIENCE', audience })
  }

  // Auto-generate persona (deterministic, live)
  const persona = useMemo(
    () => generatePersona(audience.geography, audience.genders, audience.ageGroups, audience.psychographics, state.industry),
    [audience.geography, audience.genders, audience.ageGroups, audience.psychographics, state.industry],
  )

  const matchScore = useMemo(
    () => calcPersonaMatchScore(state.products, audience.psychographics),
    [state.products, audience.psychographics],
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>🎯 Målgruppe</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Hvem selger du til? Kunden genereres automatisk basert på valgene dine.</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>

      <AudienceSection label="Geografi">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {GEO_OPTS.map(g => {
            const active = audience.geography === g
            return (
              <button key={g} onClick={() => setAudience(prev => ({ ...prev, geography: active ? null : g }))}
                style={{
                  background: active ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 99, padding: '0.4rem 1.1rem',
                  color: active ? '#38bdf8' : '#94a3b8',
                  fontSize: 13, fontWeight: active ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                {g}
              </button>
            )
          })}
        </div>
      </AudienceSection>

      <AudienceSection label="Aldersgruppe (velg alle som gjelder)">
        <ToggleGroup options={AGE_GROUPS} selected={audience.ageGroups} color="#38bdf8"
          onToggle={a => setAudience(prev => ({ ...prev, ageGroups: toggleArr(prev.ageGroups, a) }))} />
      </AudienceSection>

      <AudienceSection label="Kjønn">
        <ToggleGroup options={GENDERS} selected={audience.genders} color="#a855f7"
          onToggle={g => setAudience(prev => ({ ...prev, genders: toggleArr(prev.genders, g) }))} />
      </AudienceSection>

      <AudienceSection label={`Psykografiske egenskaper (maks 3, valgt: ${audience.psychographics.length}/3)`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PSYCHO_OPTS.map(p => {
            const active  = audience.psychographics.includes(p)
            const maxed   = !active && audience.psychographics.length >= 3
            return (
              <button key={p} onClick={() => togglePsycho(p)} disabled={maxed}
                style={{
                  background: active ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? '#00d4aa66' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 99, padding: '0.4rem 1rem',
                  color: active ? '#00d4aa' : maxed ? '#334155' : '#94a3b8',
                  fontSize: 13, fontWeight: active ? 700 : 400,
                  cursor: maxed ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  opacity: maxed ? 0.4 : 1,
                }}>
                {p}
              </button>
            )
          })}
        </div>
      </AudienceSection>

      {/* Persona card — auto-generated */}
      {persona && <PersonaCard persona={persona} matchScore={matchScore} products={state.products} psychographics={audience.psychographics} />}

      {!persona && (
        <div style={{ textAlign: 'center', color: '#475569', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.1)', marginTop: '1rem' }}>
          <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>🧑‍🤝‍🧑</div>
          <p style={{ fontSize: 14 }}>Gjør minst ett valg for å generere din typiske kunde.</p>
        </div>
      )}
    </div>
  )
}

// ─── Persona Card ─────────────────────────────────────────────────────────────

function PersonaCard({ persona, matchScore, products, psychographics }: {
  persona: ReturnType<typeof generatePersona> & object
  matchScore: number
  products: { tier: string; sustainability: number; name: string }[]
  psychographics: string[]
}) {
  if (!persona) return null
  const ml = matchLabel(matchScore)
  const primary = psychographics[0] ?? ''
  const tip = MARKETING_CHANNEL_TIP[primary] ?? 'relevant markedsføring'

  // Insight text
  let insight: string
  if (products.length === 0) {
    insight = `Velg produkter som passer for ${persona.name}s preferanser for å beregne match.`
  } else if (matchScore < 40) {
    const preferred = primary === 'Prisbevisste' ? 'budsjett-produkter' : 'premium-produkter'
    insight = `${persona.name} foretrekker ${preferred} — vurder å justere sortimentet for bedre match.`
  } else if (matchScore >= 80) {
    insight = `${persona.name} vil elske butikken din! Fokuser markedsføringen på ${tip}.`
  } else {
    insight = `Sortimentet passer godt for ${persona.name}. Styrk kommunikasjonen rundt ${tip}.`
  }

  // Avatar initials
  const initials = `${persona.name[0]}${persona.lastName[0]}`

  return (
    <div style={{
      marginTop: '1.5rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '1.25rem', padding: '1.5rem',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Header */}
      <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', marginBottom: '1rem' }}>
        👤 PERSONA: DIN TYPISKE KUNDE
      </div>

      {/* Identity row */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        {/* Avatar */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${persona.avatarColor}88, ${persona.avatarColor}44)`,
          border: `2px solid ${persona.avatarColor}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 900, color: '#fff',
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#f1f5f9' }}>{persona.fullName}, {persona.age} år</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>📍 {persona.location}</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>💼 {persona.occupation}</div>
          <div style={{ fontSize: 13, color: '#00d4aa', marginTop: 2 }}>
            💰 Bruker ~{persona.monthlyBudget.toLocaleString('nb-NO')} kr/mnd
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem',
        padding: '0.9rem 1rem', marginBottom: '1.25rem',
        borderLeft: `3px solid ${persona.avatarColor}`,
        fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic',
      }}>
        "{persona.bio}"
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* Interests */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>INTERESSER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {persona.interests.map(i => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.08)', borderRadius: 99,
                padding: '2px 9px', fontSize: 11, color: '#94a3b8',
              }}>🏷 {i}</span>
            ))}
          </div>
        </div>

        {/* Social media */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>SOSIALE MEDIER</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {persona.socialMedia.map(s => (
              <span key={s} style={{ fontSize: 12, color: '#94a3b8' }}>📱 {s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping habits */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>HANDLEVANER</div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: '0.25rem' }}>🛒 {persona.shoppingHabit}</div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>💳 Betalingsvilje: {persona.willingness}</div>
      </div>

      {/* Insight */}
      <div style={{
        background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.2)',
        borderRadius: '0.75rem', padding: '0.9rem 1rem', marginBottom: '1.25rem',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#00d4aa', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>INNSIKT FOR DIN BEDRIFT</div>
        <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 }}>💡 {insight}</div>
      </div>

      {/* Match bar */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.9rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Match med dine produkter</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: ml.color }}>{matchScore}% — {ml.text}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${matchScore}%`,
            background: `linear-gradient(90deg, ${ml.color}99, ${ml.color})`,
            transition: 'width 0.5s ease',
          }} />
        </div>
        {products.length === 0 && (
          <div style={{ fontSize: 11, color: '#475569', marginTop: '0.4rem' }}>
            Tips: Bestill produkter for å beregne match
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Audience helpers ────────────────────────────────────────────────────────

function AudienceSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>{label.toUpperCase()}</div>
      {children}
    </div>
  )
}

function ToggleGroup({ options, selected, onToggle, color }: { options: string[]; selected: string[]; onToggle: (o: string) => void; color: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {options.map(o => {
        const active = selected.includes(o)
        return (
          <button key={o} onClick={() => onToggle(o)} style={{
            background: active ? `${color}18` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${active ? color + '66' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 99, padding: '0.4rem 1rem',
            color: active ? color : '#94a3b8',
            fontSize: 13, fontWeight: active ? 700 : 400,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

// ── Økonomi ────────────────────────────────────────────────────────────────────

function OkonomiTab() {
  const { state, dispatch } = useGame()
  const [showBank, setShowBank] = useState(false)
  const [loanAmount, setLoanAmount] = useState(250_000)
  const [loanMonths, setLoanMonths] = useState(24)

  const { money, loans, totalDebt, monthlyLoanPayment, businessPlan, monthlyRent, monthlyPayroll, marketingBudget } = state

  const interestRates = [0.15, 0.12, 0.09, 0.07, 0.05, 0.05]
  const RATE_LABELS = ['15 %', '12 %', '9 %', '7 %', '5 %', '5 %']
  const rate = interestRates[Math.max(0, Math.min(5, businessPlan.qualityScore))]

  function calcMonthlyPayment(amount: number, annualRate: number, months: number): number {
    if (annualRate === 0) return Math.round(amount / months)
    const r = annualRate / 12
    return Math.round(amount * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1))
  }

  const monthly = calcMonthlyPayment(loanAmount, rate, loanMonths)
  const totalRepay = monthly * loanMonths
  const totalInterest = totalRepay - loanAmount

  const LOAN_AMOUNTS = [100_000, 250_000, 500_000, 1_000_000]
  const LOAN_TERMS = [
    { months: 12, label: '12 måneder (høye avdrag, lite renter)' },
    { months: 24, label: '24 måneder (middels)' },
    { months: 36, label: '36 måneder (lave avdrag, mye renter)' },
  ]

  const monthlyCosts = monthlyRent + monthlyPayroll + monthlyLoanPayment + Object.values(marketingBudget).reduce((s, v) => s + v, 0) + 2000
  const estRevenue = state.products.reduce((s, p) => s + p.retailPrice * Math.min(p.maxDemandPerMonth * 0.5, p.stock), 0)

  function takeLoan() {
    if (businessPlan.qualityScore < 1) return
    const loan: Loan = {
      id: `loan_${Date.now()}`,
      amount: loanAmount,
      interestRate: rate,
      termMonths: loanMonths,
      monthlyPayment: monthly,
      remainingBalance: loanAmount,
      monthsRemaining: loanMonths,
      totalInterestPaid: 0,
    }
    dispatch({ type: 'TAKE_LOAN', loan })
    setShowBank(false)
  }

  const q = businessPlan.qualityScore
  const qStars = '★'.repeat(q) + '☆'.repeat(5 - q)

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Økonomi & Finansiering</h3>
      </div>

      {/* Cash flow overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Egenkapital"      value={formatKr(money)}       color="#22c55e" icon="💰" />
        <KpiCard label="Total gjeld"      value={formatKr(totalDebt)}   color={totalDebt > 0 ? '#f97316' : '#64748b'} icon="🏦" />
        <KpiCard label="Kostnader/mnd"    value={formatKr(monthlyCosts)} color="#f97316" icon="📤" />
        <KpiCard label="Est. inntekt/mnd" value={formatKr(estRevenue)}  color="#22c55e" icon="📈" />
      </div>

      {/* Cash flow detail */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>KONTANTSTRØM</div>
        {(
          [
            ['Husleie', monthlyRent],
            ['Lønn', monthlyPayroll],
            ['Låneavdrag', monthlyLoanPayment],
            ['Markedsføring', Object.values(marketingBudget).reduce((s, v) => s + v, 0)],
            ['Forsikring/div.', 2000],
          ] as [string, number][]
        ).map(([label, val]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
            <span style={{ color: '#64748b' }}>{label}</span>
            <span style={{ color: '#f97316' }}>-{formatKr(val)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
          <span>Netto (estimert)</span>
          <span style={{ color: estRevenue - monthlyCosts >= 0 ? '#22c55e' : '#ef4444' }}>
            {estRevenue - monthlyCosts >= 0 ? '+' : ''}{formatKr(estRevenue - monthlyCosts)}
          </span>
        </div>
      </div>

      {/* Active loans */}
      {loans.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>AKTIVE LÅN</div>
          {loans.map(loan => (
            <div key={loan.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Lån ({(loan.interestRate * 100).toFixed(0)}% p.a.)</span>
                <span style={{ color: '#f97316' }}>{formatKr(loan.remainingBalance)} gjenstår</span>
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                {formatKr(loan.monthlyPayment)}/mnd · {loan.monthsRemaining} måneder igjen
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bank button */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
        <div style={{ fontSize: 24, marginBottom: '0.5rem' }}>🏦</div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: '0.3rem' }}>SpareBank 1</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: '1rem' }}>
          Din plankvalitet: <span style={{ color: '#ffd700' }}>{qStars}</span> ({q}/5) → Rente: {RATE_LABELS[Math.max(0, Math.min(5, q))]} p.a.
        </div>
        {businessPlan.qualityScore < 1 ? (
          <div style={{ fontSize: 13, color: '#f97316' }}>
            ⚠️ Lag en forretningsplan for å søke om lån.
          </div>
        ) : (
          <button
            onClick={() => setShowBank(true)}
            style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', border: 'none', borderRadius: 99, padding: '0.7rem 1.75rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Søk om lån →
          </button>
        )}
      </div>

      {/* Bank loan modal */}
      {showBank && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }} onClick={() => setShowBank(false)}>
          <div style={{
            background: 'rgba(10,14,26,0.98)', backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2rem',
            padding: '2.5rem', maxWidth: 500, width: '100%', color: '#f1f5f9',
            fontFamily: 'inherit',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: '0.5rem', textAlign: 'center' }}>🏦</div>
            <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, margin: '0 0 0.25rem' }}>SpareBank 1 — Lånesøknad</h2>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginBottom: '1.5rem' }}>
              Forretningsplan vurdert: <span style={{ color: '#ffd700' }}>{qStars}</span> · Rente: {(rate * 100).toFixed(0)}% p.a.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.5rem' }}>LÅNEBELØP</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {LOAN_AMOUNTS.map(a => (
                  <button key={a} onClick={() => setLoanAmount(a)} style={{
                    flex: 1, minWidth: 100, background: loanAmount === a ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${loanAmount === a ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 8, padding: '0.5rem', color: '#f1f5f9',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {formatKr(a)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.5rem' }}>NEDBETALINGSTID</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {LOAN_TERMS.map(t => (
                  <button key={t.months} onClick={() => setLoanMonths(t.months)} style={{
                    background: loanMonths === t.months ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${loanMonths === t.months ? '#38bdf8' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 8, padding: '0.6rem 1rem', color: '#f1f5f9',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>BANKENS TILBUD</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.4rem', fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>Månedlig avdrag</span>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>{formatKr(monthly)}</span>
                <span style={{ color: '#64748b' }}>Total tilbakebetaling</span>
                <span>{formatKr(totalRepay)}</span>
                <span style={{ color: '#64748b' }}>Total rentekostnad</span>
                <span style={{ color: '#f97316' }}>{formatKr(totalInterest)}</span>
              </div>
            </div>

            {q < 3 && (
              <div style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1rem', fontSize: 13, color: '#f97316' }}>
                ⚠️ Banken anbefaler å styrke forretningsplanen for bedre vilkår.
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowBank(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '0.75rem', color: '#94a3b8', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                ❌ Avslå
              </button>
              <button onClick={takeLoan} style={{ flex: 2, background: 'linear-gradient(135deg,#38bdf8,#818cf8)', border: 'none', borderRadius: 99, padding: '0.75rem', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                ✅ Godta lån — {formatKr(loanAmount)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Lokasjon ───────────────────────────────────────────────────────────────────

function LokasjonTab() {
  const { state } = useGame()
  const { businessModel, rentedLocationId, locationZone, monthlyRent, storageCapacity } = state

  const zoneLabel: Record<string, string> = {
    gagata: 'Gågata', hovedgata: 'Hovedgata', utkant: 'Utkanten',
  }

  if (businessModel === 'netthandel') {
    return (
      <div>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 0.5rem' }}>Netthandel-oppsett</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 1.5rem' }}>
          Du driver netthandel — du trenger ikke fysisk butikk, men du trenger en plattform og lager.
        </p>
        <div style={{ background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>💻</div>
          <div style={{ fontWeight: 700 }}>Nettbutikk aktiv</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: '0.3rem' }}>
            Salgskanal: Netthandel · Kapasitet: 200 enheter
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 0.5rem' }}>Fysisk Lokasjon</h3>
      <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 1.5rem' }}>
        Finn et lokale i bykartet for å starte butikken.
      </p>

      {rentedLocationId ? (
        <div style={{ background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>🏪</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{state.companyName}</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: '0.4rem' }}>
            {zoneLabel[locationZone ?? ''] ?? locationZone} · {formatKr(monthlyRent)}/mnd
          </div>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            Lagringskapasitet: {storageCapacity} enheter
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: 48, marginBottom: '1rem' }}>🗺️</div>
          <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: '1.5rem' }}>
            Ingen lokasjon valgt ennå. Gå ut i bykartet og finn et "TIL LEIE"-skilt.
          </p>
          <div style={{ fontSize: 13, color: '#64748b' }}>Lukk dashboardet for å utforske byen</div>
        </div>
      )}
    </div>
  )
}

// ── Produkter ─────────────────────────────────────────────────────────────────

function ProdukterTab() {
  const { state, dispatch } = useGame()
  const catalog = INDUSTRY_CATALOG[state.industry] ?? []

  // Per-item local state: selected tier + quantity
  const [selections, setSelections] = useState<Record<string, { tier: Product['tier']; qty: number }>>({})

  function setTier(id: string, tier: Product['tier']) {
    setSelections(prev => ({ ...prev, [id]: { tier, qty: prev[id]?.qty ?? 10 } }))
  }

  function setQty(id: string, qty: number) {
    setSelections(prev => ({ ...prev, [id]: { ...prev[id]!, qty } }))
  }

  function order(id: string) {
    const sel = selections[id]
    if (!sel || sel.qty <= 0) return
    const item = catalog.find(c => c.id === id)
    if (!item) return
    const product = catalogToProduct(item, sel.tier)
    dispatch({ type: 'ORDER_PRODUCT', product, quantity: sel.qty })
  }

  const TIER_COLORS: Record<Product['tier'], string> = {
    premium: '#ffd700',
    standard: '#00d4aa',
    budget: '#94a3b8',
  }
  const TIER_LABELS: Record<Product['tier'], string> = {
    premium: '⭐ Premium',
    standard: '◆ Standard',
    budget: '◇ Budget',
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Varelager</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
          Velg kvalitetstier og antall → klikk Bestill. Pengene trekkes med en gang.
        </p>
      </div>

      {/* Current stock summary */}
      {state.products.length > 0 && (
        <div style={{
          background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.2)',
          borderRadius: '1rem', padding: '0.75rem 1rem', marginBottom: '1.25rem',
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          {state.products.map(p => (
            <div key={p.id} style={{ fontSize: 12, color: '#94a3b8' }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>{' '}
              <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{p.name}</span>{' '}
              <span style={{ color: '#00d4aa' }}>{p.stock} stk</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {catalog.map(item => {
          const sel = selections[item.id]
          const activeTier = sel?.tier
          const qty = sel?.qty ?? 10
          const t = activeTier ? item.tiers[activeTier] : null
          const totalCost = t ? t.costPrice * qty : 0
          const canAfford = totalCost <= state.money
          const existingStock = state.products.find(p => p.id === `${item.id}_${activeTier}`)?.stock ?? 0

          return (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem', padding: '1rem',
            }}>
              {/* Item header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#475569' }}>Maks etterspørsel: {item.maxDemandPerMonth} stk/mnd</div>
                </div>
              </div>

              {/* Tier selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {(['premium', 'standard', 'budget'] as const).map(tier => {
                  const tc = TIER_COLORS[tier]
                  const active = activeTier === tier
                  return (
                    <button key={tier} onClick={() => setTier(item.id, tier)} style={{
                      background: active ? `${tc}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${active ? tc + '88' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '0.6rem', padding: '0.6rem 0.5rem',
                      cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9', textAlign: 'left',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: tc, marginBottom: 2 }}>{TIER_LABELS[tier]}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>Innkjøp: {formatKr(item.tiers[tier].costPrice)}</div>
                      <div style={{ fontSize: 11, color: '#475569' }}>Anbefalt: {formatKr(item.tiers[tier].recommendedPrice)}</div>
                    </button>
                  )
                })}
              </div>

              {/* Order row — only when tier is selected */}
              {activeTier && t && (
                <div style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'center',
                  background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Antall å bestille</div>
                    <input
                      type="number" min={1} max={500} value={qty}
                      onChange={e => setQty(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                        padding: '6px 10px', color: '#f1f5f9', fontSize: 14, fontFamily: 'inherit',
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center', minWidth: 80 }}>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>Totalkostnad</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: canAfford ? '#22c55e' : '#ef4444' }}>
                      {formatKr(totalCost)}
                    </div>
                    {existingStock > 0 && (
                      <div style={{ fontSize: 10, color: '#00d4aa' }}>Har: {existingStock} stk</div>
                    )}
                  </div>
                  <button
                    onClick={() => order(item.id)}
                    disabled={!canAfford || qty <= 0}
                    style={{
                      background: canAfford
                        ? 'linear-gradient(135deg,#00d4aa,#0d9488)'
                        : 'rgba(255,255,255,0.08)',
                      border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem',
                      color: canAfford ? '#fff' : '#475569',
                      fontWeight: 700, fontSize: 14, cursor: canAfford ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit', whiteSpace: 'nowrap',
                    }}
                  >
                    {canAfford ? '📦 Bestill' : '💸 Ikke råd'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Priser ────────────────────────────────────────────────────────────────────

function PriserTab() {
  const { state, dispatch } = useGame()
  const [products, setProducts] = useState<Product[]>(() => state.products.map(p => ({ ...p })))

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>Ingen produkter bestilt. Gå til Produkter-fanen.</div>
  }

  function setPrice(id: string, price: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, retailPrice: price } : p))
  }

  function save() {
    dispatch({ type: 'SET_PRODUCTS', products })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Prissetting</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Sett salgspris per produkt</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre priser ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => {
          const mg = p.retailPrice > 0 ? Math.round(((p.retailPrice - p.costPrice) / p.retailPrice) * 100) : 0
          const mgColor = mg >= 50 ? '#22c55e' : mg >= 20 ? '#facc15' : '#ef4444'
          return (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Innkjøp: {formatKr(p.costPrice)} · Anbefalt: {formatKr(p.recommendedPrice)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: 20, color: '#38bdf8' }}>{formatKr(p.retailPrice)}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: mgColor }}>Margin: {mg}%</div>
                </div>
              </div>
              <input type="range"
                min={Math.round(p.costPrice * 0.8)}
                max={Math.round(p.recommendedPrice * 3)}
                value={p.retailPrice}
                onChange={e => setPrice(p.id, parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#00d4aa' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginTop: 4 }}>
                <span>{formatKr(Math.round(p.costPrice * 0.8))} (under innkjøp)</span>
                <button onClick={() => setPrice(p.id, p.recommendedPrice)} style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 6, padding: '2px 8px', color: '#00d4aa', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Anbefalt pris
                </button>
                <span>{formatKr(Math.round(p.recommendedPrice * 3))}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Distribusjon (now 'markedsforing' handles old distribusjon, we keep it under markedsforing) ──
// Actually we keep distribusjon hidden — markedsforing tab includes everything
// Let's preserve markedsforing as before and just not show distribusjon as a tab

// ── Markedsføring ─────────────────────────────────────────────────────────────

type BudgetKey = keyof GameStateLocal['marketingBudget']
type GameStateLocal = ReturnType<typeof useGame>['state']

const MARKETING_CHANNELS: { key: BudgetKey; label: string; emoji: string }[] = [
  { key: 'socialMedia', label: 'Sosiale medier', emoji: '📱' },
  { key: 'google',      label: 'Google',         emoji: '🔍' },
  { key: 'influencer',  label: 'Influencer',      emoji: '⭐' },
  { key: 'print',       label: 'Trykt reklame',   emoji: '📰' },
  { key: 'tv',          label: 'TV / Radio',      emoji: '📺' },
]

const CHANNEL_INFO: Record<DistributionChannel, { label: string; emoji: string; cost: number; desc: string; requiresLevel?: number }> = {
  physicalStore:  { label: 'Fysisk butikk',    emoji: '🏪', cost: 0,     desc: 'Din faste butikk. Alltid aktiv.' },
  webShop:        { label: 'Nettbutikk',        emoji: '🌐', cost: 2500,  desc: '×1.5 rekkevidde. Krever Nivå 7.', requiresLevel: 7 },
  instagramShop:  { label: 'Instagram Shop',    emoji: '📸', cost: 1200,  desc: '×1.3 rekkevidde. 12% gebyr.' },
  delivery:       { label: 'Hjemlevering',      emoji: '🚚', cost: 800,   desc: '×1.4 rekkevidde. 30% gebyr. Kun kafé.' },
  wholesale:      { label: 'Engros / B2B',      emoji: '📦', cost: 500,   desc: '×1.6 rekkevidde. 40% lavere margin. Krever Nivå 9.', requiresLevel: 9 },
}

function MarkedsforingTab() {
  const { state, dispatch } = useGame()
  const [budget, setBudget] = useState({ ...state.marketingBudget })
  const [appeal, setAppeal] = useState(state.appealType)
  const [channels, setChannels] = useState<DistributionChannel[]>(state.channels)

  const total = Object.values(budget).reduce((s, v) => s + v, 0)

  function toggleChannel(ch: DistributionChannel) {
    if (ch === 'physicalStore') return
    setChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch])
  }

  function save() {
    dispatch({ type: 'SET_MARKETING', budget })
    if (appeal) dispatch({ type: 'SET_APPEAL', appealType: appeal })
    dispatch({ type: 'SET_CHANNELS', channels })
  }

  const channelMonthlyCost = channels.reduce((s, ch) => s + (CHANNEL_INFO[ch]?.cost ?? 0), 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Markedsføring & Distribusjon</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Fordel markedsbudsjett, appellform og salgskanaler</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {MARKETING_CHANNELS.map(ch => (
          <div key={ch.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: 14 }}>{ch.emoji} {ch.label}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#38bdf8' }}>{formatKr(budget[ch.key])}</span>
            </div>
            <input type="range" min={0} max={50000} step={500} value={budget[ch.key]}
              onChange={e => setBudget(prev => ({ ...prev, [ch.key]: parseInt(e.target.value) }))}
              style={{ width: '100%', accentColor: '#00d4aa' }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '0.5rem 1.25rem', fontSize: 15 }}>
          Total: <strong style={{ color: '#00d4aa' }}>{formatKr(total)}</strong>/mnd
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.75rem' }}>Appellform</h4>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[
            { id: 'rational', label: '📊 Rasjonell', desc: 'Pris, fakta, verdi' },
            { id: 'emotional', label: '💖 Emosjonell', desc: 'Følelser, livsstil' },
            { id: 'combined', label: '⚖️ Kombinasjon', desc: 'Best av begge' },
          ].map(a => (
            <button key={a.id} onClick={() => setAppeal(a.id as typeof appeal)}
              style={{
                flex: 1, background: appeal === a.id ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${appeal === a.id ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer',
                fontFamily: 'inherit', color: '#f1f5f9', textAlign: 'center',
              }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{a.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.75rem' }}>Distribusjonskanaler</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          {(Object.entries(CHANNEL_INFO) as [DistributionChannel, typeof CHANNEL_INFO[DistributionChannel]][]).map(([ch, info]) => {
            const active = channels.includes(ch)
            const locked = info.requiresLevel ? state.level < info.requiresLevel : false
            return (
              <div key={ch}
                onClick={() => !locked && toggleChannel(ch)}
                style={{
                  background: active ? 'rgba(0,212,170,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? '#00d4aa55' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '1rem', padding: '1rem',
                  cursor: ch === 'physicalStore' ? 'default' : locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.45 : 1,
                  display: 'flex', alignItems: 'center', gap: '1rem',
                }}>
                <span style={{ fontSize: 28 }}>{info.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{info.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{info.desc}</div>
                  {locked && <div style={{ fontSize: 11, color: '#f97316', marginTop: 2 }}>🔒 Krever Nivå {info.requiresLevel}</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: info.cost === 0 ? '#22c55e' : '#f97316' }}>
                    {info.cost === 0 ? 'Gratis' : `${formatKr(info.cost)}/mnd`}
                  </div>
                  {active && <div style={{ fontSize: 11, color: '#00d4aa', marginTop: 2 }}>✓ Aktiv</div>}
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b' }}>Total kanalkostand:</span>
          <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(channelMonthlyCost)}/mnd</span>
        </div>
      </div>
    </div>
  )
}

// ── Personale ─────────────────────────────────────────────────────────────────

type EmployeeRole = 'selger' | 'markedsforer' | 'okonom'
type EmployeeLevel = 'junior' | 'senior' | 'ekspert'

const ROLE_INFO: Record<EmployeeRole, { label: string; emoji: string; desc: string }> = {
  selger:       { label: 'Selger',       emoji: '🛍️', desc: '+10% salgsvolum per ansatt' },
  markedsforer: { label: 'Markedsfører', emoji: '📢', desc: '+8% markedseffekt per ansatt' },
  okonom:       { label: 'Økonom',       emoji: '📊', desc: '-5% kostnader per ansatt' },
}
const LEVEL_INFO: Record<EmployeeLevel, { label: string; salary: number }> = {
  junior:  { label: 'Junior',  salary: 15_000 },
  senior:  { label: 'Senior',  salary: 25_000 },
  ekspert: { label: 'Ekspert', salary: 40_000 },
}

function PersonaleTab() {
  const { state, dispatch } = useGame()
  const [role, setRole] = useState<EmployeeRole>('selger')
  const [level, setLevel] = useState<EmployeeLevel>('junior')

  const salary = LEVEL_INFO[level].salary
  const canAfford = state.money >= salary

  function hire() {
    if (!canAfford) return
    dispatch({
      type: 'HIRE_EMPLOYEE',
      employee: {
        id: `emp_${Date.now()}`,
        role,
        level,
        monthlySalary: salary,
      },
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Personale</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
          Ansett og si opp ansatte. Lønn trekkes månedlig automatisk.
        </p>
      </div>

      {/* Current employees */}
      {state.employees.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {state.employees.map(e => {
            const ri = ROLE_INFO[e.role as EmployeeRole]
            const li = LEVEL_INFO[e.level as EmployeeLevel]
            return (
              <div key={e.id} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem', padding: '0.9rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{ fontSize: 28 }}>{ri?.emoji ?? '👤'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {li?.label ?? e.level} {ri?.label ?? e.role}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    {ri?.desc ?? ''} · {formatKr(e.monthlySalary)}/mnd
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: 'FIRE_EMPLOYEE', id: e.id })}
                  style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 8, padding: '0.4rem 0.9rem',
                    color: '#ef4444', fontWeight: 700, fontSize: 13,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Si opp
                </button>
              </div>
            )
          })}
          <div style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem',
            padding: '0.6rem 1rem', fontSize: 14,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ color: '#64748b' }}>Total lønn per måned:</span>
            <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(state.monthlyPayroll)}</span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#475569', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>👥</div>
          <p style={{ fontSize: 14 }}>Ingen ansatte ennå.</p>
        </div>
      )}

      {/* Hire form */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1rem', padding: '1.25rem',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: '1rem' }}>Ansett ny medarbeider</div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.4rem' }}>Stilling</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(Object.keys(ROLE_INFO) as EmployeeRole[]).map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, background: role === r ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${role === r ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '0.6rem', padding: '0.6rem 0.4rem',
                cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9',
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{ROLE_INFO[r].emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{ROLE_INFO[r].label}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>{ROLE_INFO[role].desc}</div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.4rem' }}>Nivå</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(Object.keys(LEVEL_INFO) as EmployeeLevel[]).map(lv => (
              <button key={lv} onClick={() => setLevel(lv)} style={{
                flex: 1, background: level === lv ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${level === lv ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '0.6rem', padding: '0.6rem',
                cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{LEVEL_INFO[lv].label}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{formatKr(LEVEL_INFO[lv].salary)}/mnd</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={hire}
          disabled={!canAfford}
          style={{
            width: '100%',
            background: canAfford ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(255,255,255,0.06)',
            border: 'none', borderRadius: 8, padding: '0.75rem',
            color: canAfford ? '#fff' : '#475569',
            fontWeight: 700, fontSize: 15,
            cursor: canAfford ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          {canAfford
            ? `✅ Ansett ${LEVEL_INFO[level].label} ${ROLE_INFO[role].label} — ${formatKr(salary)}/mnd`
            : '💸 Ikke råd til denne ansettelsen'}
        </button>
      </div>
    </div>
  )
}

// ── Rapporter ─────────────────────────────────────────────────────────────────

function RapporterTab() {
  const { state } = useGame()
  const results = [...state.monthlyResults].reverse()

  if (results.length === 0) {
    return <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>Ingen resultater ennå.</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {results.map((r, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1rem', padding: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{MONTH_NAMES[r.month - 1]}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Inntekt: {formatKr(r.revenue)} · Kost: {formatKr(r.costs)} · Solgt: {r.unitsSold} stk
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: r.profit >= 0 ? '#22c55e' : '#ef4444' }}>
              {r.profit >= 0 ? '+' : ''}{formatKr(r.profit)}
            </div>
            <div style={{ fontSize: 11, color: '#64748b' }}>+{r.xpEarned} XP</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{
      background: `${color}0d`, border: `1px solid ${color}33`,
      borderRadius: '1rem', padding: '1rem',
    }}>
      <div style={{ fontSize: 20, marginBottom: '0.3rem' }}>{icon}</div>
      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}
