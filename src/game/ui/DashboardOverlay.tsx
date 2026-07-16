import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, useErTemaAktivt, useTemaNivaa } from '../GameContext'
import { INDUSTRY_CATALOG, catalogToProduct } from '../data/industries'
import { getIndustryDefinitionFor, getActiveIndustryDefinition } from '../data/industryDefinition'
import WindowDisplayEditor from '../city/WindowDisplay'
import { SCENARIOS } from '../sales/scenarios'
import { generatePersona, calcPersonaMatchScore, matchLabel, MARKETING_CHANNEL_TIP } from '../data/personas'
import { DAY_CONFIG } from '../data/dayConfig'
import { manedligeFasteKostnader, amortiserLaan } from '../data/economy'
import Fagord from './Fagord'
import HmsTab from './HmsTab'
import BrannalarmOvelse, { BrannalarmSammenligning } from './BrannalarmOvelse'
import { BRANNALARM } from '../data/beredskap'
import { BALANCE } from '../data/balance'
import {
  BUDSJETT_LINJER, TOM_BUDSJETT, maanedNokkel, faktiskeLinjer, planlagtResultat,
  BUDSJETT_HUB, type BudsjettTall, type BudsjettLinjeKey,
} from '../data/budsjett'
import { aktiveFunksjoner, evaluerRefleksjon, oppgaveRefleksjoner } from '../data/orgRefleksjon'
import type { Product, DistributionChannel, Employee, EmployeeRole, EmployeeLevel, RolleDef, Shift } from '../types'
import type { Loan } from '../types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

type Tab = 'oversikt' | 'forretningsplan' | 'produkter' | 'utstilling' | 'malgruppe' | 'okonomi' | 'lokasjon' | 'priser' | 'markedsforing' | 'personale' | 'hms' | 'rapporter' | 'innboks'

// ── FAGKODING (DEL 3 + fiksrunde-2-slutt) ─────────────────────────────────────
// Fanene grupperes etter PROGRAMFAG (fasit: docs/TEMAER_OG_KOMPETANSEMAL.md,
// SSR01-01 VG1 + SSR02-01 VG2). Diskret koding: en tynn fargestripe under hver
// fane + et lite BOKSTAVMERKE (kort) ved fanenavnet + en faglegende — IKKE full
// omfarging (dagens tema-look beholdes). Faner som dekker flere fag får
// PRIMÆRfagets farge (se rapport for mappingen).
//
// FARGESVAK-TILGJENGELIGHET: farge bærer ALDRI info alene (Espen + ~8 % av
// gutter er fargesvake). Derfor (a) bokstavmerket «kort» på hver fane, og (c)
// stripefargene skilles på LYSHET, ikke bare kulør. Perseptuell luminans
// (0.299R+0.587G+0.114B) danner en stige mot den mørke dashbord-bakgrunnen:
//   Verktøy 114  <  Markedsføring 128  <  Forretningsdrift 156  <  Kultur 180
//   <  HMS 208
// — hver overgang MELLOM fag i fanelinja har ≥28 i luminans-sprik, så gruppene
// skilles i gråtone alene. Alt tunbart, defineres KUN her.
type FagId = 'forretningsdrift' | 'markedsforing' | 'kultur' | 'hms' | 'verktoy'
const FAG_FARGER: Record<FagId, { navn: string; kort: string; farge: string }> = {
  forretningsdrift: { navn: 'Forretningsdrift',            kort: 'FD',  farge: '#38bdf8' }, // L≈156 · VG2: Økonomi og administrasjon
  markedsforing:    { navn: 'Markedsføring og innovasjon', kort: 'M',   farge: '#a855f7' }, // L≈128 · VG2: Kommunikasjon og markedsføring
  kultur:           { navn: 'Kultur og samhandling',       kort: 'KS',  farge: '#f78fc8' }, // L≈180 (lysnet fra #f472b6 for lyshets-stigen)
  hms:              { navn: 'HMS',                          kort: 'HMS', farge: '#fcd34d' }, // L≈208 (rav→gul, lysnet fra #f59e0b) · VG2 eget fag
  verktoy:          { navn: 'Verktøy',                      kort: 'V',   farge: '#64748b' }, // L≈114 · tverrgående, ikke ett fag
}

// Rekkefølgen her ER visningsrekkefølgen — sortert så hvert fag ligger samlet.
const TABS: { id: Tab; label: string; emoji: string; fag: FagId; tema?: string }[] = [
  // ── Forretningsdrift ──
  { id: 'oversikt',        label: 'Oversikt',         emoji: '📊', fag: 'forretningsdrift' },
  { id: 'forretningsplan', label: 'Forretningsplan',   emoji: '📋', fag: 'forretningsdrift' },
  { id: 'okonomi',         label: 'Økonomi',           emoji: '💰', fag: 'forretningsdrift' },
  { id: 'priser',          label: 'Priser',            emoji: '🏷️', fag: 'forretningsdrift' }, // prising = kalkyle/lønnsomhet (Pris-P sekundært)
  // ── Markedsføring og innovasjon (markedsmiksens Produkt/Plass/Promosjon) ──
  { id: 'malgruppe',       label: 'Målgruppe',         emoji: '🎯', fag: 'markedsforing' },
  { id: 'produkter',       label: 'Produkter',         emoji: '📦', fag: 'markedsforing' },
  { id: 'lokasjon',        label: 'Lokasjon',          emoji: '📍', fag: 'markedsforing' },
  { id: 'markedsforing',   label: 'Markedsføring',     emoji: '📢', fag: 'markedsforing' },
  { id: 'utstilling',      label: 'Utstilling',        emoji: '🪟', fag: 'markedsforing' },
  // ── Kultur og samhandling ──
  { id: 'personale',       label: 'Personale',         emoji: '👥', fag: 'kultur' },
  // ── HMS (TEMA-fane: vises KUN når temaet er aktivt, se InnboksTabBar-filteret) ──
  { id: 'hms',             label: 'HMS',               emoji: '🦺', fag: 'hms', tema: 'beredskap' },
  // ── Verktøy (tverrgående) ──
  { id: 'rapporter',       label: 'Rapporter',         emoji: '📋', fag: 'verktoy' },
  { id: 'innboks',         label: 'Innboks',           emoji: '📬', fag: 'verktoy' },
]

// ── Tab bar (extracted so it can read unreadCount) ────────────────────────────

function InnboksTabBar({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) {
  const { state, aktiveTemaer } = useGame()
  // TEMA-faner (t.tema satt) vises kun når det temaet er aktivt for klassen.
  const synligeTabs = TABS.filter(t => !t.tema || !!aktiveTemaer[t.tema]?.aktiv)
  // Faglegende: kun de fagene som faktisk har en synlig fane (i visnings-
  // rekkefølge, uten duplikater). Diskret — forklarer stripene under fanene.
  const synligeFag: FagId[] = []
  for (const t of synligeTabs) if (!synligeFag.includes(t.fag)) synligeFag.push(t.fag)
  return (
    <>
      <div className="dashboard-tab-bar" style={{
        display: 'flex', gap: '0.5rem', padding: '1rem 2rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        overflowX: 'auto', flexShrink: 0,
        scrollbarWidth: 'none',
      }}>
        {synligeTabs.map(t => {
          const aktiv = activeTab === t.id
          const { farge: fagFarge, kort: fagKort } = FAG_FARGER[t.fag]
          return (
            <button key={t.id} data-testid={`fane-${t.id}`} onClick={() => setActiveTab(t.id)} style={{
              background: aktiv ? 'rgba(0,212,170,0.12)' : 'transparent',
              border: `1px solid ${aktiv ? '#00d4aa' : 'transparent'}`,
              borderBottom: 'none', borderRadius: '8px 8px 0 0',
              padding: '0.6rem 1.2rem 0.65rem',
              color: aktiv ? '#00d4aa' : '#64748b',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
              fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s',
              flexShrink: 0, position: 'relative',
            }}>
              {t.emoji} {t.label}
              {/* Fag-bokstavmerke (bærer fag-info UTEN farge — fargesvak-vennlig).
                  aria-hidden: rent VISUELT merke — skjermlesere skal lese fanens
                  rene navn («Produkter»), ikke «Produkter M». Fag-koblingen
                  formidles tekstlig av faglegenden under fanelinja. */}
              <span aria-hidden="true" style={fagBadgeStil(fagFarge)} title={FAG_FARGER[t.fag].navn}>{fagKort}</span>
              {t.id === 'innboks' && state.unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  background: '#ef4444', color: '#fff',
                  borderRadius: 99, fontSize: 9, fontWeight: 800,
                  padding: '1px 5px', lineHeight: 1.4,
                }}>
                  {state.unreadCount}
                </span>
              )}
              {/* Diskret fag-stripe (venstre-til-høyre under fanen); tydeligere når aktiv.
                  aria-hidden: dekorativ (fargen speiler merket over). */}
              <span aria-hidden="true" style={{
                position: 'absolute', left: 8, right: 8, bottom: 0, height: 3, borderRadius: 2,
                background: fagFarge, opacity: aktiv ? 1 : 0.5, pointerEvents: 'none',
              }} />
            </button>
          )
        })}
      </div>
      {/* Faglegende — kobler bokstavmerke ↔ stripe ↔ fagnavn eksplisitt, så
          fargen aldri er den eneste bæreren av koblingen. */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1rem', alignItems: 'center',
        padding: '0.5rem 2rem 0', flexShrink: 0, fontSize: 10.5, color: '#64748b',
      }}>
        <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>PROGRAMFAG:</span>
        {synligeFag.map(f => (
          <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={fagBadgeStil(FAG_FARGER[f].farge)}>{FAG_FARGER[f].kort}</span>
            <span style={{ width: 14, height: 3, borderRadius: 2, background: FAG_FARGER[f].farge, display: 'inline-block' }} />
            {FAG_FARGER[f].navn}
          </span>
        ))}
      </div>
    </>
  )
}

/** Lite fag-bokstavmerke: fag-farget tekst + hårfin ramme på svak tint. Diskret,
 *  men bærer fag-info uten å være avhengig av fargesyn (fargesvak-tilgjengelighet). */
function fagBadgeStil(farge: string): React.CSSProperties {
  return {
    marginLeft: 6, display: 'inline-block', verticalAlign: 'middle',
    fontSize: 9, fontWeight: 800, letterSpacing: '0.03em', lineHeight: '14px',
    color: farge, background: `${farge}22`, border: `1px solid ${farge}77`,
    borderRadius: 4, padding: '0 4px',
  }
}

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

  // LÆRINGSLAGET — meld AKTIV fane til mentoren (kontekstbundne fane-triggere).
  // Mentoren viser fane-hintet KUN mens fanen er aktiv, og re-armer det hvis det
  // ikke rekker frem; null når dashbordet lukkes. Selve trigger-oppslaget
  // (fane → melding) ligger i mentorTriggers (`fane`-feltet).
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mentor:fane', { detail: { fane: open ? activeTab : null } }))
  }, [open, activeTab])

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
            data-testid="dashbord"
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
              <button data-testid="dashbord-lukk" onClick={onClose} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99, width: 36, height: 36, color: '#94a3b8',
                cursor: 'pointer', fontSize: 18, fontFamily: 'inherit',
              }}>✕</button>
            </div>

            {/* Tab bar */}
            <InnboksTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem 2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {activeTab === 'oversikt'        && <OversiktTab onNavigate={setActiveTab} />}
                  {activeTab === 'forretningsplan' && <ForretningsplanTab onNavigate={setActiveTab} />}
                  {activeTab === 'produkter'       && <ProdukterTab />}
                  {activeTab === 'utstilling'      && <WindowDisplayEditor />}
                  {activeTab === 'malgruppe'       && <MalgruppeTab />}
                  {activeTab === 'okonomi'         && <OkonomiTab />}
                  {activeTab === 'lokasjon'        && <LokasjonTab />}
                  {activeTab === 'priser'          && <PriserTab />}
                  {activeTab === 'markedsforing'   && <MarkedsforingTab />}
                  {activeTab === 'personale'       && <PersonaleTab />}
                  {activeTab === 'hms'             && <HmsTab />}
                  {activeTab === 'rapporter'       && <RapporterTab />}
                  {activeTab === 'innboks'         && <InnboksTab />}
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

function OversiktTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const { state, dispatch } = useGame()
  const { money, reputation, monthlyResults, monthlyRent, progress, totalDebt } = state

  const totalProfit = monthlyResults.reduce((s, r) => s + r.profit, 0)
  const maxRev      = Math.max(...monthlyResults.map(r => r.revenue), 1)
  const monthlyCosts = monthlyRent + state.monthlyPayroll + state.monthlyLoanPayment + Object.values(state.marketingBudget).reduce((s, v) => s + v, 0) + 2000
  const estRevenue = state.products.reduce((s, p) => s + p.retailPrice * Math.min(p.maxDemandPerMonth * 0.5, p.stock), 0)
  const netFlow = estRevenue - monthlyCosts
  const runway = netFlow < 0 && money > 0 ? Math.max(0, Math.floor(money / Math.abs(netFlow))) : null

  const allDone = Object.values(progress).every(Boolean)

  const QUALITY_STARS = ['☆☆☆☆☆', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
  const QUALITY_COLOR = ['#64748b', '#ef4444', '#f97316', '#facc15', '#22c55e', '#22c55e']
  const q = state.businessPlan.qualityScore

  function handleSimulate() {
    dispatch({ type: 'SET_PHASE', phase: 'ready_to_simulate' })
    window.dispatchEvent(new CustomEvent('phaser:simulate'))
  }

  return (
    <div>
      {/* DEV (midlertidig): trigg salgssituasjon-rollespillet. Den ekte
          inngangen blir å klikke på en kunde i interiørscenen (neste fase). */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem',
        background: 'rgba(168,85,247,0.08)', border: '1px dashed rgba(168,85,247,0.4)',
        borderRadius: 12, padding: '0.6rem 0.9rem',
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#c084fc', letterSpacing: '0.05em' }}>DEV</span>
        <span style={{ fontSize: 12, color: '#94a3b8', flex: 1 }}>Test salgssituasjon-motoren (pool)</span>
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => window.dispatchEvent(new CustomEvent('dev:openSalesScenario', { detail: { scenarioId: s.id } }))}
            style={{
              background: 'linear-gradient(135deg,#a855f7,#7c3aed)', border: 'none', borderRadius: 99,
              padding: '0.45rem 1.1rem', color: '#fff', fontWeight: 700, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}
          >
            🛎️ {s.customerName}
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Kontanter"       value={formatKr(money)}       color="#22c55e" icon="💰" />
        <KpiCard label="Gjeld"           value={formatKr(totalDebt)}   color={totalDebt > 0 ? '#f97316' : '#22c55e'} icon="🏦" />
        <KpiCard label="Kostnader/mnd"   value={formatKr(monthlyCosts)} color="#f97316" icon="📤" />
        <KpiCard label="Rykte"           value={`${reputation}/100`}   color={reputation >= 60 ? '#22c55e' : '#facc15'} icon="⭐" />
      </div>

      {/* 4P-fremdrift — flyttet hit fra HUD-en. Klikk en P for å hoppe til fanen. */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.9rem', letterSpacing: '0.06em' }}>
          🎯 <Fagord id="MKT_001">MARKEDSMIKSEN (4P)</Fagord>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.7rem' }}>
          {([
            { p: 'Produkt', tab: 'produkter' as Tab, done: state.p1_complete },
            { p: 'Pris', tab: 'priser' as Tab, done: state.p2_complete },
            { p: 'Plass', tab: 'lokasjon' as Tab, done: state.p3_complete },
            { p: 'Promosjon', tab: 'markedsforing' as Tab, done: state.p4_complete },
          ]).map(({ p, tab, done }) => (
            <button key={p} onClick={() => onNavigate(tab)} title={`Gå til ${p}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit',
              background: done ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${done ? '#00d4aa' : 'rgba(255,255,255,0.12)'}`, borderRadius: 12, padding: '0.7rem 0.4rem',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, background: done ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.06)',
                color: done ? '#00d4aa' : '#64748b',
              }}>{done ? '✓' : p[0]}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: done ? '#00d4aa' : '#94a3b8' }}>{p}</span>
            </button>
          ))}
        </div>
        {[state.p1_complete, state.p2_complete, state.p3_complete, state.p4_complete].every(Boolean) && (
          <div style={{ marginTop: '0.8rem', fontSize: 12, color: '#00d4aa', fontWeight: 700, textAlign: 'center' }}>
            ✅ Alle fire P-ene er på plass — markedsmiksen henger sammen!
          </div>
        )}
      </div>

      {/* Bedriftsstatus */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '1rem', letterSpacing: '0.06em' }}>📊 BEDRIFTSSTATUS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>

          {/* Plankvalitet */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Plankvalitet</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, color: QUALITY_COLOR[q] }}>{QUALITY_STARS[q]}</span>
              <button
                onClick={() => onNavigate('forretningsplan')}
                style={{ fontSize: 11, color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Rediger →
              </button>
            </div>
          </div>

          {/* Runway */}
          <div style={{
            background: runway !== null && runway < 3 ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${runway !== null && runway < 3 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 10, padding: '0.75rem',
          }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Runway</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: runway === null ? '#22c55e' : runway < 3 ? '#ef4444' : runway < 6 ? '#f97316' : '#38bdf8' }}>
              {runway === null ? '∞' : `${runway} mnd`}
            </div>
            {runway !== null && runway < 3 && <div style={{ fontSize: 10, color: '#ef4444' }}>⚠️ Kritisk</div>}
          </div>

          {/* Produkter */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Produkter</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: state.products.length > 0 ? '#f1f5f9' : '#475569' }}>
              {state.products.length}
            </div>
            {state.products.length === 0 && (
              <button onClick={() => onNavigate('produkter')} style={{ fontSize: 10, color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Velg →</button>
            )}
          </div>

          {/* Ansatte */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Ansatte</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>{state.employees.length}</div>
          </div>

          {/* Måned / År */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem', gridColumn: '1/-1' }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Periode</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>
              Måned {state.currentMonth} · År {state.currentYear}
            </div>
          </div>
        </div>

        {/* Simuler-knapp */}
        {allDone && (
          <button
            onClick={handleSimulate}
            style={{
              marginTop: '1rem', width: '100%',
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

      {/* Revenue chart */}
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

// ── Manual canvas fields ──────────────────────────────────────────────────────

const MANUAL_CANVAS_FIELDS: { key: keyof import('../types').BusinessCanvas; label: string; emoji: string; suggestions: string[] }[] = [
  { key: 'verditilbud',       label: 'Verditilbud',        emoji: '💡', suggestions: ['Laveste pris i markedet', 'Beste kundeservice', 'Unikt produkt', 'Rask levering'] },
  { key: 'kundeforhold',      label: 'Kundeforhold',       emoji: '🤝', suggestions: ['Selvbetjening', 'Personlig service', 'Lojalitetsprogram', 'Abonnement'] },
  { key: 'nokkelaktiviteter', label: 'Nøkkelaktiviteter',  emoji: '⚙️', suggestions: ['Produksjon', 'Markedsføring', 'Kundeservice', 'Produktutvikling'] },
  { key: 'partnere',          label: 'Partnere',           emoji: '🔗', suggestions: ['Grossister', 'Lokale produsenter', 'Logistikk', 'Markedsføringsbyråer'] },
]

function genKundesegmenter(state: import('../types').GameState): string {
  const { targetAudience } = state
  const parts = [...targetAudience.ageGroups, ...targetAudience.genders, ...targetAudience.psychographics]
  return parts.length > 0 ? parts.join(', ') : ''
}

function genKanaler(state: import('../types').GameState): string {
  const CHANNEL_LABELS: Record<string, string> = {
    physicalStore: 'Fysisk butikk', webShop: 'Nettbutikk',
    instagramShop: 'Instagram Shop', delivery: 'Levering', wholesale: 'Grossist',
  }
  return state.channels.map(c => CHANNEL_LABELS[c] ?? c).join(', ')
}

function genInntektsstrommer(state: import('../types').GameState): string {
  if (state.products.length === 0) return ''
  const items = state.products.map(p => `${p.name} (${p.retailPrice.toLocaleString('nb-NO')} kr)`)
  return items.slice(0, 3).join(', ') + (items.length > 3 ? ` + ${items.length - 3} til` : '')
}

function genNokkelressurser(state: import('../types').GameState): string {
  const parts: string[] = []
  if (state.rentedLocationId) parts.push('Lokale')
  if (state.employees.length > 0) parts.push(`${state.employees.length} ansatte`)
  if (state.products.length > 0) parts.push('Varelager')
  return parts.join(', ')
}

function genKostnadsstruktur(state: import('../types').GameState): string {
  const items: string[] = []
  if (state.monthlyRent > 0) items.push(`Husleie ${state.monthlyRent.toLocaleString('nb-NO')} kr`)
  if (state.monthlyPayroll > 0) items.push(`Lønn ${state.monthlyPayroll.toLocaleString('nb-NO')} kr`)
  const mkt = Object.values(state.marketingBudget).reduce((s, v) => s + v, 0)
  if (mkt > 0) items.push(`Markedsføring ${mkt.toLocaleString('nb-NO')} kr`)
  return items.join(', ')
}

function ForretningsplanTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const { state, dispatch } = useGame()
  const { businessPlan, products, targetAudience, monthlyRent, monthlyPayroll, monthlyLoanPayment, marketingBudget } = state
  const [description, setDescription] = useState(businessPlan.description)
  const [canvas, setCanvas] = useState({ ...(businessPlan.canvas ?? {}) })

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

        {/* Business Model Canvas */}
        <PlanSection
          title="Business Model Canvas"
          complete={Object.values(canvas).filter(v => (v as string).trim().length > 10).length >= 2}
          icon="🗺️"
        >
          <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 0.75rem' }}>
            Fyll ut de 4 manuelle feltene. De 5 grå feltene hentes automatisk fra andre faner.
          </p>

          {/* Auto-generated fields */}
          {(() => {
            const AUTO_FIELDS: { label: string; emoji: string; value: string; tab: Tab; tabLabel: string }[] = [
              { label: 'Kundesegmenter', emoji: '👥', value: genKundesegmenter(state), tab: 'malgruppe', tabLabel: 'Målgruppe' },
              { label: 'Kanaler', emoji: '📢', value: genKanaler(state), tab: 'markedsforing', tabLabel: 'Markedsføring' },
              { label: 'Inntektsstrømmer', emoji: '💰', value: genInntektsstrommer(state), tab: 'priser', tabLabel: 'Priser' },
              { label: 'Nøkkelressurser', emoji: '🏗️', value: genNokkelressurser(state), tab: 'personale', tabLabel: 'Personale' },
              { label: 'Kostnadsstruktur', emoji: '📊', value: genKostnadsstruktur(state), tab: 'okonomi', tabLabel: 'Økonomi' },
            ]
            return (
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Automatisk generert fra spilldata
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  {AUTO_FIELDS.map(f => (
                    <div key={f.label} style={{
                      background: f.value ? 'rgba(56,189,248,0.06)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${f.value ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 8, padding: '0.5rem',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: f.value ? '#38bdf8' : '#475569', marginBottom: '0.25rem' }}>
                        {f.emoji} {f.label}
                      </div>
                      {f.value ? (
                        <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.4 }}>{f.value}</div>
                      ) : (
                        <button
                          onClick={() => onNavigate(f.tab)}
                          style={{ fontSize: 10, color: '#38bdf8', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}
                        >
                          Gå til {f.tabLabel}
                        </button>
                      )}
                      <div style={{ fontSize: 9, color: '#334155', marginTop: 3 }}>🔗 fra {f.tabLabel}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Manual fields */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Skriv selv
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {MANUAL_CANVAS_FIELDS.map(f => {
              const val = canvas[f.key] ?? ''
              const filled = val.trim().length > 10
              return (
                <div key={f.key} style={{
                  background: filled ? 'rgba(0,212,170,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${filled ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 8, padding: '0.6rem',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: filled ? '#00d4aa' : '#64748b', marginBottom: '0.3rem' }}>
                    {f.emoji} {f.label} {filled && '✅'}
                  </div>
                  <textarea
                    value={val}
                    onChange={e => setCanvas(c => ({ ...c, [f.key]: e.target.value }))}
                    placeholder={f.suggestions[0]}
                    rows={2}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4,
                      padding: '0.35rem', color: '#f1f5f9', fontSize: 11,
                      fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box',
                    }}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                    {f.suggestions.slice(0, 2).map(s => (
                      <button
                        key={s}
                        onClick={() => setCanvas(c => ({ ...c, [f.key]: s }))}
                        style={{
                          background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)',
                          borderRadius: 99, padding: '1px 6px', fontSize: 9, color: '#38bdf8',
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <button
            onClick={() => dispatch({ type: 'SAVE_CANVAS', canvas })}
            style={{ marginTop: '0.75rem', background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 8, padding: '0.4rem 1rem', color: '#00d4aa', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Lagre canvas
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
                  {p.icon} {p.name}
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

  // Auto-generate persona (deterministic, live). BRANSJE-DEFINISJON: den
  // AKTIVE bransjens budsjettmodell (personaBudsjett) slås opp via
  // getIndustryDefinitionFor — undefined for bransjer uten en definisjon
  // ennå (fashion/tech/sports), som generatePersona da håndterer med sine
  // opprinnelige, uendrede fallback-grener (se personas.ts).
  const personaBudsjett = getIndustryDefinitionFor(state.industry)?.personaBudsjett
  const persona = useMemo(
    () => generatePersona(audience.geography, audience.genders, audience.ageGroups, audience.psychographics, state.industry, personaBudsjett),
    [audience.geography, audience.genders, audience.ageGroups, audience.psychographics, state.industry, personaBudsjett],
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
            {/* DEL 1 (Persona-realisme): kafé viser ALLTID mnd + per-besøk
                atskilt og konsistente (aldri samme tall for begge — se
                cafeSpendFrom i personas.ts). */}
            {persona.perVisitSpend !== undefined && persona.visitsPerMonth !== undefined && (
              <span style={{ color: '#64748b' }}> ({persona.perVisitSpend.toLocaleString('nb-NO')} kr/besøk · {persona.visitsPerMonth}×/mnd)</span>
            )}
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
  const budsjettAktiv = useErTemaAktivt('budsjett')       // TEMA 2

  const { money, loans, totalDebt, businessPlan } = state

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

  // Burn/kostnader viser det som FAKTISK trekkes ved månedsrull. Faste (husleie
  // + lønn + forsikring + markedsføring) fra manedligeFasteKostnader — samme
  // kilde som reduceren. LÅNEAVDRAG (rente + avdrag) beregnes med samme delte
  // amortiseringskilde som månedsrullen (amortiserLaan), og er nå MED i
  // burn/netto (det er en reell månedlig utbetaling). Nedbetalt lån gir 0.
  const { linjer: fasteLinjer, sum: fasteMnd } = manedligeFasteKostnader(state)
  const laanNesteMnd = amortiserLaan(loans)
  // DEL 1 (Økonomi leser dagssyklusen): «opptjent denne måneden» = sum av
  // dagsresultat (salg − varekost − svinn) for inneværende måned. Erstatter den
  // gamle estRevenue-prognosen (produkt-anslag). Enkel projeksjon = snitt/dag ×
  // antall handledager i måneden (DAY_CONFIG.daysPerMonth).
  const monthDays = state.dayHistory.filter(d => d.month === state.currentMonth && d.year === state.currentYear)
  const opptjentDenneMnd = monthDays.reduce((s, d) => s + d.resultat, 0)
  const dagerFullført = monthDays.length
  const snittPerDag = dagerFullført > 0 ? opptjentDenneMnd / dagerFullført : 0
  const gjenståendeDager = Math.max(0, DAY_CONFIG.daysPerMonth - dagerFullført)
  const projisertMnd = dagerFullført > 0 ? Math.round(opptjentDenneMnd + snittPerDag * gjenståendeDager) : 0
  const burnRate = fasteMnd + laanNesteMnd.betaling
  const netFlow = projisertMnd - burnRate
  const runway = netFlow < 0 && money > 0 ? Math.max(0, Math.floor(money / Math.abs(netFlow))) : null

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

      {/* TEMA 2 Budsjett — øverst, kun når temaet er aktivt. */}
      {budsjettAktiv && <BudsjettSeksjon />}

      {/* Runway / Burn rate — varsling øverst */}
      {runway !== null && (
        <div style={{
          background: runway < 3 ? 'rgba(239,68,68,0.1)' : runway < 6 ? 'rgba(249,115,22,0.08)' : 'rgba(56,189,248,0.06)',
          border: `1px solid ${runway < 3 ? 'rgba(239,68,68,0.4)' : runway < 6 ? 'rgba(249,115,22,0.3)' : 'rgba(56,189,248,0.2)'}`,
          borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1rem',
          display: 'flex', gap: '1.5rem', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}><Fagord id="ECO_005">Runway</Fagord></div>
            <div style={{
              fontSize: 28, fontWeight: 900,
              color: runway < 3 ? '#ef4444' : runway < 6 ? '#f97316' : '#38bdf8',
            }}>
              {runway} mnd
            </div>
            {runway < 3 && <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ Kritisk! Søk lån eller øk inntekter</div>}
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Burn rate</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f97316' }}>{formatKr(burnRate)}<span style={{ fontSize: 12, color: '#64748b', fontWeight: 400 }}>/mnd</span></div>
          </div>
        </div>
      )}

      {/* Cash flow overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Egenkapital"           value={formatKr(money)}             color="#22c55e" icon="💰" />
        <KpiCard label="Total gjeld"           value={formatKr(totalDebt)}         color={totalDebt > 0 ? '#f97316' : '#64748b'} icon="🏦" />
        <KpiCard label="Kostnader/mnd"         value={formatKr(fasteMnd)}          color="#f97316" icon="📤" />
        <KpiCard label="Opptjent denne måneden" value={formatKr(opptjentDenneMnd)} color={opptjentDenneMnd >= 0 ? '#22c55e' : '#ef4444'} icon="📈" />
      </div>

      {/* Dagene denne måneden (DEL 1) — faktisk opptjening fra dagssyklusen, med
          enkel projeksjon. Tom liste før første stengte dag. */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>DAGENE DENNE MÅNEDEN</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            {dagerFullført} av {DAY_CONFIG.daysPerMonth} handledager
          </div>
        </div>
        {monthDays.length === 0 ? (
          <div style={{ fontSize: 13, color: '#475569', padding: '0.5rem 0' }}>
            Ingen stengte dager ennå denne måneden — tallene fylles inn etter hvert dagsoppgjør.
          </div>
        ) : (
          <>
            {(() => {
              const maxAbs = Math.max(1, ...monthDays.map(d => Math.abs(d.resultat)))
              return monthDays.map(d => {
                const pos = d.resultat >= 0
                return (
                  <div key={`${d.year}-${d.month}-${d.dayNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: 12, color: '#94a3b8', width: 46, flexShrink: 0 }}>Dag {d.dayNumber}</span>
                    {/* enkel resultat-bar (midtstilt 0) */}
                    <div style={{ flex: 1, height: 14, position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.12)' }} />
                      <div style={{
                        position: 'absolute', left: pos ? '50%' : undefined, right: pos ? undefined : '50%',
                        height: 8, borderRadius: 3, background: pos ? '#22c55e' : '#ef4444',
                        width: `${(Math.abs(d.resultat) / maxAbs) * 48}%`,
                      }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#64748b', width: 96, flexShrink: 0, textAlign: 'right' }}>
                      {d.soldStk + d.bakgrunnStk} solgt · {d.svinnStk} svinn
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, width: 78, flexShrink: 0, textAlign: 'right', color: pos ? '#22c55e' : '#ef4444' }}>
                      {pos ? '+' : ''}{formatKr(d.resultat)}
                    </span>
                  </div>
                )
              })
            })()}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.6rem', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Opptjent så langt</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: opptjentDenneMnd >= 0 ? '#22c55e' : '#ef4444' }}>
                {opptjentDenneMnd >= 0 ? '+' : ''}{formatKr(opptjentDenneMnd)}
              </span>
            </div>
            {gjenståendeDager > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginTop: '0.3rem' }}>
                <span>Projisert måned (snitt {formatKr(Math.round(snittPerDag))}/dag × {gjenståendeDager} dager igjen)</span>
                <span style={{ fontWeight: 700, color: projisertMnd >= 0 ? '#22c55e' : '#ef4444' }}>≈ {projisertMnd >= 0 ? '+' : ''}{formatKr(projisertMnd)}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Cash flow detail — de FAKTISKE månedlige trekkene ved månedsrull: faste
          kostnader (fasteLinjer) + LÅNEAVDRAG (rente/avdrag skilt), begge med i
          sum/netto. Nedbetalt lån trekker 0 (amortiserLaan gir tom split). */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}><Fagord id="ECO_013">KONTANTSTRØM</Fagord> (trekkes ved månedsrull)</div>
        {fasteLinjer.map(({ navn, belop }) => (
          <div key={navn} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
            <span style={{ color: '#64748b' }}>{navn}</span>
            <span style={{ color: '#f97316' }}>-{formatKr(belop)}</span>
          </div>
        ))}
        {laanNesteMnd.betaling > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
              <span style={{ color: '#64748b' }}>Lån — <Fagord id="ECO_021">renter</Fagord></span>
              <span style={{ color: '#f97316' }}>-{formatKr(laanNesteMnd.renteSum)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
              <span style={{ color: '#64748b' }}>Lån — avdrag</span>
              <span style={{ color: '#f97316' }}>-{formatKr(laanNesteMnd.avdragSum)}</span>
            </div>
          </>
        )}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
          <span>Netto (projisert drift − kostnader)</span>
          <span style={{ color: netFlow >= 0 ? '#22c55e' : '#ef4444' }}>
            {netFlow >= 0 ? '+' : ''}{formatKr(netFlow)}
          </span>
        </div>
      </div>

      {/* Active loans */}
      {loans.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>AKTIVE LÅN <span style={{ fontWeight: 400 }}>(<Fagord id="ECO_020">gjeld</Fagord>)</span></div>
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
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.5rem' }}>LÅNEBELØP (<Fagord id="ECO_020">gjeld</Fagord>)</div>
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
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.5rem' }}><Fagord id="ECO_030">NEDBETALINGSTID</Fagord></div>
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
                <span style={{ color: '#64748b' }}>Månedlig <Fagord id="ECO_029">avdrag</Fagord></span>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>{formatKr(monthly)}</span>
                <span style={{ color: '#64748b' }}>Total tilbakebetaling</span>
                <span>{formatKr(totalRepay)}</span>
                <span style={{ color: '#64748b' }}>Total <Fagord id="ECO_021">rentekostnad</Fagord></span>
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

// ── TEMA 2: BUDSJETTSEKSJON (Økonomi-fanen, når temaet er aktivt) ─────────────
// Seks faste linjer (ingen frie linjer på VG1). Forrige måneds faktiske tall
// ved siden av hvert felt. Lån forhåndsutfylt (terminbeløp). 3-stegs intro
// første gang. Budsjett kan endres til månedsslutt; låses ved oppgjøret.
const MND_FULL = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

const budsjettFelt: React.CSSProperties = {
  width: 116, boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.4rem 0.55rem',
  color: '#f1f5f9', fontSize: 13, fontFamily: 'inherit', textAlign: 'right',
}

function BudsjettSeksjon() {
  const { state, dispatch } = useGame()
  const nivaa = useTemaNivaa('budsjett') ?? 'vg1'
  const aar = state.currentYear, mnd = state.currentMonth
  const key = maanedNokkel(aar, mnd)
  const lagret = state.budsjett.maaneder[key]
  const laast = !!lagret?.laastVedOppgjor
  const terminbelop = Math.round(amortiserLaan(state.loans).betaling)

  // «Sist måned»-referanse: faktiske tall fra forrige oppgjør. For de faste
  // linjene finnes tallet også uten historikk (så eleven aldri budsjetterer blindt).
  const sist = state.lastMonthSettlement ? faktiskeLinjer(state.lastMonthSettlement) : null
  function sistFor(k: BudsjettLinjeKey): number | null {
    if (sist) return Math.round(sist[k])
    if (k === 'lonn') return state.monthlyPayroll
    if (k === 'husleie') return state.monthlyRent
    if (k === 'markedsforing') return Object.values(state.marketingBudget).reduce((s, v) => s + v, 0)
    if (k === 'laan') return terminbelop
    return null   // salgsinntekter/varekjøp har ingen historikk før første oppgjør
  }

  const [utkast, setUtkast] = useState<BudsjettTall>(() => lagret?.budsjett ?? { ...TOM_BUDSJETT, laan: terminbelop })
  // Re-seed når måneden ruller (ny key) — les fersk lagret/forhåndsutfylt lån.
  useEffect(() => {
    setUtkast(state.budsjett.maaneder[key]?.budsjett ?? { ...TOM_BUDSJETT, laan: terminbelop })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const [introStep, setIntroStep] = useState<number | null>(() => {
    try { return localStorage.getItem('budsjett_intro_v1') === '1' ? null : 0 } catch { return 0 }
  })
  function ferdigIntro() { try { localStorage.setItem('budsjett_intro_v1', '1') } catch { /* ignore */ } setIntroStep(null) }

  const INTRO: React.ReactNode[] = [
    <>Et <Fagord id="ECO_008">budsjett</Fagord> er en plan for pengene: hva du tror kommer INN og går UT neste måned.</>,
    <>Se på «Sist måned»-tallene ved siden av hvert felt — hva tror du om {MND_FULL[mnd - 1]}?</>,
    <>Fyll inn beløpene og trykk «Lagre budsjett». Når måneden er omme sammenligner vi budsjettet ditt med det som faktisk skjedde.</>,
  ]

  const planResultat = planlagtResultat(utkast)
  const endret = !lagret || JSON.stringify(lagret.budsjett) !== JSON.stringify(utkast)

  return (
    <div style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '1rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>📊 Budsjett for {MND_FULL[mnd - 1]} · År {aar}</div>
      <p style={{ color: '#94a3b8', fontSize: 12.5, margin: '0 0 0.9rem' }}>
        Hva tror du kommer inn og går ut denne måneden? Fyll inn beløp — du sammenligner med de faktiske tallene i månedsoppgjøret.
      </p>

      {/* 3-stegs guidet intro (intro-modellen) — første gang, kan hoppes over. */}
      {introStep !== null && (
        <div style={{ background: 'rgba(12,17,29,0.7)', border: '1px solid rgba(0,212,170,0.4)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.09em', marginBottom: 6 }}>ESPEN</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#e2e8f0', minHeight: 40 }}>{INTRO[introStep]}</div>
          <div style={{ display: 'flex', gap: 5, margin: '10px 0 2px' }}>
            {INTRO.map((_, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i === introStep ? '#00d4aa' : 'rgba(255,255,255,0.22)' }} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <button onClick={ferdigIntro} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Hopp over</button>
            <button onClick={() => introStep < INTRO.length - 1 ? setIntroStep(introStep + 1) : ferdigIntro()}
              style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.45rem 1.2rem', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              {introStep < INTRO.length - 1 ? 'Neste →' : 'Kom i gang!'}
            </button>
          </div>
        </div>
      )}

      {laast && (
        <div style={{ fontSize: 12.5, color: '#facc15', background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 8, padding: '0.5rem 0.7rem', marginBottom: '0.8rem' }}>
          🔒 Dette budsjettet er låst — måneden er gjort opp. Se månedsoppgjøret for sammenligningen.
        </div>
      )}

      {/* De seks faste linjene */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {BUDSJETT_LINJER.map(l => {
          const sv = sistFor(l.key)
          return (
            <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 1, fontSize: 13, color: '#cbd5e1' }}>{l.navn}</span>
              <input
                type="number" inputMode="numeric" value={utkast[l.key] || ''} disabled={laast}
                onChange={e => setUtkast(u => ({ ...u, [l.key]: Math.max(0, Math.round(parseFloat(e.target.value) || 0)) }))}
                placeholder="0" style={{ ...budsjettFelt, opacity: laast ? 0.6 : 1 }} />
              <span style={{ width: 130, flexShrink: 0, fontSize: 11, color: '#64748b', textAlign: 'right' }}>
                Sist måned: {sv === null ? 'ingen historikk' : formatKr(sv)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Planlagt resultat (elevens budsjett) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.9rem', paddingTop: '0.7rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>Planlagt resultat</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: planResultat >= 0 ? '#22c55e' : '#ef4444' }}>
          {planResultat >= 0 ? '+' : '−'}{formatKr(Math.abs(planResultat))}
        </span>
      </div>

      {!laast && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: '0.9rem' }}>
          <button onClick={() => dispatch({ type: 'SET_BUDSJETT', maaned: key, budsjett: utkast })}
            disabled={!endret}
            style={{ background: endret ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: endret ? '#fff' : '#475569', fontWeight: 800, fontSize: 14, cursor: endret ? 'pointer' : 'default', fontFamily: 'inherit' }}>
            Lagre budsjett
          </button>
          {lagret && !endret && <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>✓ Lagret</span>}
        </div>
      )}

      {/* 📚 Lær mer — hub-moduler (ny fane, aldri navigere spillet bort). */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '1rem' }}>
        {BUDSJETT_HUB[nivaa].map(h => (
          <a key={h.rute} href={h.rute} target="_blank" rel="noopener noreferrer"
            style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '0.35rem 0.8rem', color: '#c084fc', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
            📚 {h.navn} ↗
          </a>
        ))}
      </div>
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

  // DEL 4: «Bestill til i morgen» — når dashbordet åpnes fra dagsoppgjøret,
  // forhåndsmarker varene som gikk tomme i går (state.lastDayResult), så eleven
  // ser med én gang hva som bør etterfylles. Matcher på navn (tomtProdukter
  // bærer navn, ikke id).
  const tomtNavn = new Set(
    (state.dayPhase === 'oppgjør' ? state.lastDayResult?.tomtProdukter ?? [] : []).map(t => t.navn),
  )

  // Per-item local state: kun antall — tier-valg er PARKET (se
  // IndustryCatalogItem.tiers i industries.ts). Én katalogvare = ett
  // costPrice/recommendedPrice, ikke tre å velge mellom.
  const [qtyById, setQtyById] = useState<Record<string, number>>({})

  function setQty(id: string, qty: number) {
    setQtyById(prev => ({ ...prev, [id]: qty }))
  }

  function order(id: string) {
    const qty = qtyById[id] ?? 10
    if (qty <= 0) return
    const item = catalog.find(c => c.id === id)
    if (!item) return
    const product = catalogToProduct(item)
    dispatch({ type: 'ORDER_PRODUCT', product, quantity: qty })
  }

  // Navneoppslag for «Underveis» — bestillingen bærer kun productId; varen er
  // ført (lagt i sortimentet) ved bestilling, så navnet finnes i state.products
  // (fall tilbake til katalogen, deretter id-en, for robusthet).
  function productName(id: string): string {
    return state.products.find(p => p.id === id)?.name
      ?? catalog.find(c => c.id === id)?.name
      ?? id
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Varelager</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>
          Velg antall → klikk Bestill. Pengene trekkes med en gang, og varene
          ankommer neste morgen.
        </p>
      </div>

      {/* Current stock summary — vare, lager, kostpris. IKKE utsalgspris
          (4P-pedagogikk: produkt er produkt, pris er pris — prissetting
          skjer utelukkende i Priser-fanen, se DEL 2/3 i Prisflyt-oppgaven). */}
      {state.products.length > 0 && (
        <div style={{
          background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.2)',
          borderRadius: '1rem', padding: '0.75rem 1rem', marginBottom: '1.25rem',
          display: 'flex', flexDirection: 'column', gap: '0.6rem',
        }}>
          {state.products.map(p => {
            const isMain = state.mainProductId === p.id
            return (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem 0.75rem',
                background: isMain ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.03)',
                border: isMain ? '1px solid rgba(255,215,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '0.5rem 0.7rem',
              }}>
                <span style={{ fontSize: 16 }}>{p.icon}</span>
                <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 12 }}>{isMain && '⭐ '}{p.name}</span>
                <span style={{ color: '#00d4aa', fontSize: 12 }}>{p.stock} stk</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>· Kostpris: {formatKr(p.costPrice)}</span>

                <button
                  onClick={() => dispatch({ type: 'SET_MAIN_PRODUCT', id: p.id })}
                  title={isMain ? 'Fjern som hovedprodukt' : 'Vises størst i butikkvinduet'}
                  style={{
                    marginLeft: 'auto',
                    background: isMain ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${isMain ? '#ffd70066' : 'rgba(255,255,255,0.15)'}`,
                    borderRadius: 6, padding: '1px 7px', fontSize: 10, fontWeight: 700,
                    color: isMain ? '#ffd700' : '#94a3b8', cursor: 'pointer', fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isMain ? 'Hovedprodukt' : 'Sett som hovedprodukt'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Underveis — bestillinger som ennå ikke er ankommet (leveringstid,
          docs/INNKJOP_LEVERING.md). Ordlyden er bransjens (DEL 2): kafeen sier
          «bakes til i morgen» / «Ferskt dag N», ikke «leveres» — via
          forsyning.underveisTittel/ankomstEtikett. */}
      {state.incomingOrders.length > 0 && (
        <div style={{
          background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.25)',
          borderRadius: '1rem', padding: '0.75rem 1rem', marginBottom: '1.25rem',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.04em', marginBottom: '0.6rem' }}>
            {getActiveIndustryDefinition().forsyning.underveisTittel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {state.incomingOrders.map((o, i) => (
              <div key={`${o.productId}_${o.bestiltDag}_${i}`} style={{
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem 0.75rem',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '0.5rem 0.7rem',
              }}>
                <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 12 }}>{productName(o.productId)}</span>
                <span style={{ color: '#7dd3fc', fontSize: 12 }}>{o.qty} stk</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>
                  {getActiveIndustryDefinition().forsyning.ankomstEtikett(o.ankomstDag)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {catalog.map(item => {
          const qty = qtyById[item.id] ?? 10
          const totalCost = item.costPrice * qty
          const canAfford = totalCost <= state.money
          const existingStock = state.products.find(p => p.id === item.id)?.stock ?? 0
          const gikkTom = tomtNavn.has(item.name)

          return (
            <div key={item.id} style={{
              background: gikkTom ? 'rgba(248,113,113,0.07)' : 'rgba(255,255,255,0.03)',
              border: gikkTom ? '1px solid rgba(248,113,113,0.45)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem', padding: '1rem',
            }}>
              {/* Item header + innkjøpspris. IKKE anbefalt utsalgspris — ingen
                  fasit for hva varen skal SELGES for (kun hva den KJØPES inn
                  for). Utsalgspris settes utelukkende i Priser-fanen. */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.name}
                    {gikkTom && (
                      <span style={{
                        background: 'rgba(248,113,113,0.18)', border: '1px solid rgba(248,113,113,0.5)',
                        borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 800, color: '#fca5a5',
                      }}>
                        Gikk tomt i går
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#475569' }}>Maks etterspørsel: {item.maxDemandPerMonth} stk/mnd</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Innkjøp: {formatKr(item.costPrice)}</div>
                </div>
              </div>

              {/* Order row */}
              <div style={{
                display: 'flex', gap: '0.75rem', alignItems: 'center',
                background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>Antall å bestille</div>
                  <input
                    data-testid={`qty-${item.id}`}
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
                  data-testid={`bestill-${item.id}`}
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Priser ────────────────────────────────────────────────────────────────────

/** Konkurrentpris-intervall for markedsundersøkelsen (DEL 3) — avledet av
 *  recommendedPrice ± 15 %, en REN funksjon (ikke Math.random) så den er
 *  stabil per vare og ved hver re-render. recommendedPrice vises ALDRI
 *  direkte til eleven (ingen fasit) — kun dette avledede intervallet, og
 *  kun etter kjøpt undersøkelse. */
function competitorRange(recommendedPrice: number): { low: number; high: number } {
  return {
    low: Math.round(recommendedPrice * 0.85),
    high: Math.round(recommendedPrice * 1.15),
  }
}

function PriserTab() {
  const { state, dispatch } = useGame()
  const [products, setProducts] = useState<Product[]>(() => state.products.map(p => ({ ...p })))

  // LÆRINGSLAGET: fane-hintene (forste_prising + priser_fane) er nå kontekst-
  // bundne og styres av mentorens 'mentor:fane'-kanal (se DashboardOverlay-
  // effekten) — ikke en egen mount-dispatch her.

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>Ingen produkter bestilt. Gå til Produkter-fanen.</div>
  }

  function setPrice(id: string, price: number) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, retailPrice: Math.max(0, price) } : p))
  }

  function save() {
    dispatch({ type: 'SET_PRODUCTS', products })
  }

  const researchedIds = new Set(state.priceResearch.purchasedProductIds)
  const allResearched = products.every(p => researchedIds.has(p.id))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Prissetting</h3>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0' }}>Sett <Fagord id="ECO_031">utsalgspris</Fagord> per produkt</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre priser ✓
        </button>
      </div>

      {/* LÆRINGSLAGET — prissettingsstrategier (klikkbare fagord). Ikke en fasit;
          spilleren velger selv hvordan prisen settes. */}
      <div style={{
        background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.18)',
        borderRadius: '0.75rem', padding: '0.7rem 1rem', marginBottom: '1rem',
        fontSize: 12.5, color: '#94a3b8', lineHeight: 1.7,
      }}>
        <strong style={{ color: '#cbd5e1', fontWeight: 700 }}>Måter å sette pris på:</strong>{' '}
        <Fagord id="MKT_048">kostnadsbasert</Fagord>, <Fagord id="MKT_049">konkurransebasert</Fagord> og{' '}
        <Fagord id="MKT_050">verdibasert</Fagord> prissetting. Du kan gi et ekstra dytt med{' '}
        <Fagord id="MKT_013">psykologisk prising</Fagord> (99-priser), <Fagord id="MKT_011">skumme fløten</Fagord>{' '}
        i starten eller bruke <Fagord id="MKT_012">inntrengningspris</Fagord> for å vinne kunder raskt.
      </div>

      {/* DEL 3 — kjøpbar innsikt, IKKE en fasit: et konkurrentpris-intervall
          per vare (snapshot av dagens sortiment ved kjøp). Nye varer ført
          etterpå er ikke dekket. */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem',
        background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)',
        borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem',
      }}>
        <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
          📊 Se hva konkurrenter i nærheten tar for lignende varer — gjelder varene du har ført NÅ.
        </p>
        <button
          onClick={() => dispatch({ type: 'BUY_PRICE_RESEARCH' })}
          disabled={state.money < 2_500}
          title={allResearched ? 'Kjøp på nytt for å dekke nyere varer' : undefined}
          style={{
            background: state.money >= 2_500 ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${state.money >= 2_500 ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 8, padding: '0.5rem 1rem', whiteSpace: 'nowrap',
            color: state.money >= 2_500 ? '#38bdf8' : '#475569',
            fontSize: 13, fontWeight: 700, cursor: state.money >= 2_500 ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
          }}
        >
          📊 Kjøp markedsundersøkelse — 2 500 kr
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => {
          const mg = p.retailPrice > 0 ? Math.round(((p.retailPrice - p.costPrice) / p.retailPrice) * 100) : 0
          const mgColor = mg >= 50 ? '#22c55e' : mg >= 20 ? '#facc15' : '#ef4444'
          const underCost = p.retailPrice > 0 && p.retailPrice < p.costPrice
          const researched = researchedIds.has(p.id)
          const range = competitorRange(p.recommendedPrice)
          return (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}><Fagord id="ECO_006">Innkjøp</Fagord>: {formatKr(p.costPrice)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <input
                    type="number" min={0} step={1} value={p.retailPrice}
                    onChange={e => setPrice(p.id, parseInt(e.target.value) || 0)}
                    style={{
                      width: 100, textAlign: 'right', background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6,
                      padding: '4px 8px', color: '#38bdf8', fontSize: 18, fontWeight: 800, fontFamily: 'inherit',
                    }}
                  /> <span style={{ fontSize: 13, color: '#64748b' }}>kr</span>
                  <div style={{ fontSize: 12, fontWeight: 700, color: mgColor }}><Fagord id="ECO_002">Margin</Fagord>: {p.retailPrice > 0 ? `${mg}%` : '—'}</div>
                </div>
              </div>

              {underCost && (
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem' }}>
                  ⚠ Under innkjøpspris — du taper penger på hvert salg.
                </div>
              )}

              {/* Konkurrentpris — kun etter kjøpt undersøkelse, IKKE en fasit
                  for hva EGEN pris bør være, bare hva konkurrenter tar. */}
              {researched ? (
                <div style={{ fontSize: 12, color: '#38bdf8' }}>
                  📊 Konkurrentpris i nærheten: {formatKr(range.low)}–{formatKr(range.high)}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#475569' }}>Ikke undersøkt</div>
              )}
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

// ── Personale (ORGANISASJONSDESIGN — bygg kartet selv) ────────────────────────
// docs/BEMANNING.md er kontrakten. Flyt: dra ROLLEKORT fra paletten inn i
// org-kartet for å OPPRETTE funksjoner → ansett inn i dem → sett Salg på vakt.
// Salgsrollen gir KAPASITET (backgroundSales.kapasitetPaaVakt); markedsføring/
// økonomi beholder månedseffektene; andre roller er ren org-forståelse.

const LEVEL_INFO: Record<EmployeeLevel, { label: string; salary: number }> = {
  junior:  { label: 'Junior',  salary: 15_000 },
  senior:  { label: 'Senior',  salary: 25_000 },
  ekspert: { label: 'Ekspert', salary: 40_000 },
}

// Rollepalett fra den aktive bransjen (IndustryDefinition.roller) — oppslag.
function rolleDef(id: EmployeeRole): RolleDef | undefined {
  return getActiveIndustryDefinition().roller.find(r => r.id === id)
}
function rolleTittel(id: EmployeeRole): string { return rolleDef(id)?.tittel ?? id }
function rolleEmoji(id: EmployeeRole): string { return rolleDef(id)?.emoji ?? '👤' }

// Norske navn til nyansatte (BEMANNING) — fornavn + etternavn, valgt tilfeldig
// i ansett-handleren (ikke i render).
const FORNAVN = ['Ingrid', 'Jonas', 'Sara', 'Mathias', 'Emma', 'Oliver', 'Nora', 'Aksel', 'Maja', 'Henrik', 'Sofie', 'Filip', 'Thea', 'Elias', 'Frida', 'Kasper']
const ETTERNAVN = ['Berg', 'Haugen', 'Dahl', 'Lund', 'Moen', 'Solberg', 'Nilsen', 'Aas', 'Ruud', 'Vik', 'Strand', 'Fossum']
function tilfeldigNavn(): string {
  const f = FORNAVN[Math.floor(Math.random() * FORNAVN.length)]
  const e = ETTERNAVN[Math.floor(Math.random() * ETTERNAVN.length)]
  return `${f} ${e}`
}

// Vaktliste-timegrid: 8 én-times luker 09:00–17:00.
const VAKT_START_TIME = BALANCE.klokke.apneMinutt / 60   // 9
const VAKT_SLUTT_TIME = BALANCE.klokke.stengMinutt / 60  // 17
const VAKT_LUKER = Array.from({ length: VAKT_SLUTT_TIME - VAKT_START_TIME }, (_, k) => VAKT_START_TIME + k)
function hhmm(min: number): string { return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}` }

// Dra-tilstand i org-kartet: et rollekort (opprett funksjon), en ansatt (flytt
// benk↔funksjon) eller en funksjon (dra ut = fjern).
type OrgDrag = { kind: 'nyRolle' | 'emp' | 'funksjon'; id: string }

// ── PERSONALE-fanen: to steg (DEL 5, fiksrunde 2) ─────────────────────────────
// STEG 1 «Hvem gjør hva?» (rolleoppgaver på personer) → STEG 2 org-kartet.
// Steg 1 er utgangspunktet, ikke en lås — eleven kan endre alt i steg 2.
function PersonaleTab() {
  const [steg, setSteg] = useState<1 | 2>(1)
  return (
    <div>
      <div style={{ marginBottom: '1.1rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Personale</h3>
        <p style={{ color: '#64748b', fontSize: 13, margin: '0.2rem 0 0.7rem' }}>
          Først: hvem gjør hva? I en liten bedrift har som regel én person flere
          roller. Deretter bygger du organisasjonskartet.
        </p>
        {/* Steg-veksler */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 3, gap: 3 }}>
          {([[1, '① Hvem gjør hva?'], [2, '② Organisasjonskart']] as const).map(([n, label]) => (
            <button key={n} onClick={() => setSteg(n)} style={{
              background: steg === n ? 'rgba(0,212,170,0.14)' : 'transparent',
              border: `1px solid ${steg === n ? '#00d4aa' : 'transparent'}`,
              borderRadius: 8, padding: '0.35rem 0.9rem', cursor: 'pointer', fontFamily: 'inherit',
              color: steg === n ? '#00d4aa' : '#94a3b8', fontSize: 12.5, fontWeight: 700,
            }}>{label}</button>
          ))}
        </div>
      </div>
      {steg === 1 ? <HvemGjorHvaSteg onNeste={() => setSteg(2)} /> : <OrgKartSteg />}
    </div>
  )
}

function OrgKartSteg() {
  const { state, dispatch } = useGame()
  const [role, setRole] = useState<EmployeeRole>('selger')
  const [level, setLevel] = useState<EmployeeLevel>('junior')
  const [drag, setDrag] = useState<OrgDrag | null>(null)          // hva som dras
  const [over, setOver] = useState<string | null>(null)           // hover-mål (highlight)
  const [viserRefleksjon, setViserRefleksjon] = useState(false)

  const alleRoller = getActiveIndustryDefinition().roller
  // Funksjonene som finnes i kartet (orgRoller + migrering fra disponerte).
  const funksjoner = aktiveFunksjoner(state.orgRoller, state.employees)
  const opprettede = alleRoller.filter(r => funksjoner.includes(r.id))
  const paletten = alleRoller.filter(r => !funksjoner.includes(r.id))
  const benk = state.employees.filter(e => !e.grenId)
  const salgsIVakt = state.employees.filter(e => e.grenId && rolleDef(e.role)?.vaktrolle)

  // Ansett-rolle: kun opprettede funksjoner kan ansettes; fall til første.
  const valgtRolle = opprettede.some(r => r.id === role) ? role : (opprettede[0]?.id ?? null)
  const salary = LEVEL_INFO[level].salary
  const canAfford = state.money >= salary

  function hire() {
    if (!valgtRolle || !canAfford) return
    dispatch({ type: 'HIRE_EMPLOYEE', employee: {
      id: `emp_${Date.now()}`, navn: tilfeldigNavn(), role: valgtRolle, level, monthlySalary: salary,
    } })
  }

  // Felles drop-sone: `accept` avgjør om målet tar imot dagens drag; `slipp`
  // utfører handlingen. Rydder drag/hover uansett.
  function sone(key: string, accept: (d: OrgDrag) => boolean, slipp: (d: OrgDrag) => void) {
    return {
      onDragOver: (e: React.DragEvent) => { if (drag && accept(drag)) { e.preventDefault(); setOver(key) } },
      onDragLeave: () => setOver(o => (o === key ? null : o)),
      onDrop: (e: React.DragEvent) => { e.preventDefault(); if (drag && accept(drag)) slipp(drag); setDrag(null); setOver(null) },
    }
  }
  const startDrag = (d: OrgDrag) => (e: React.DragEvent) => { e.dataTransfer.effectAllowed = 'move'; setDrag(d) }
  const draggetEmp = (d: OrgDrag) => state.employees.find(e => e.id === d.id)

  const refleksjoner = evaluerRefleksjon({
    harFunksjon: id => funksjoner.includes(id),
    ansatte: state.employees.length,
    disponerte: state.employees.filter(e => e.grenId).length,
    omsetningMnd: state.dayHistory
      .filter(d => d.month === state.currentMonth && d.year === state.currentYear)
      .reduce((s, d) => s + d.soldKr + d.bakgrunnKr, 0),
  })

  return (
    <div>
      <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 1.1rem' }}>
        Bygg organisasjonen selv: dra roller fra paletten inn i kartet for å
        opprette funksjoner → ansett inn i dem → sett Salg på vakt. Lønn
        trekkes månedlig — også for udisponerte. (Steg 1 fylte inn et
        utgangspunkt — endre fritt.)
      </p>

      {/* ORG-KART — starter tomt (kun Daglig leder); eleven bygger det ut. */}
      <SectionTittel emoji="🏢" tekst="Organisasjonskart" />
      <div style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.4)',
          borderRadius: 12, padding: '0.5rem 1.1rem',
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#ffd700' }}>👑 Daglig leder — Deg</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>Gratis arbeidskraft · Junior-kapasitet</div>
        </div>
        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)', margin: '0 auto' }} />
      </div>
      <div {...sone('kart', d => d.kind === 'nyRolle', d => dispatch({ type: 'CREATE_ORG_ROLE', roleId: d.id }))}
        style={{
          background: over === 'kart' ? 'rgba(0,212,170,0.08)' : 'transparent',
          border: `1px dashed ${over === 'kart' ? '#00d4aa' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 12, padding: opprettede.length ? '0.5rem' : '1.1rem 0.8rem', marginBottom: '1rem',
          transition: 'background 0.12s, border 0.12s',
        }}>
        {opprettede.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.55rem' }}>
            {opprettede.map(r => {
              const folk = state.employees.filter(e => e.grenId === r.id)
              const aktiv = over === `f_${r.id}`
              return (
                <div key={r.id}
                  {...sone(`f_${r.id}`, d => d.kind === 'emp' && draggetEmp(d)?.role === r.id, d => dispatch({ type: 'ASSIGN_EMPLOYEE_BRANCH', id: d.id, grenId: r.id }))}
                  style={{
                    background: aktiv ? `${r.farge}1e` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${aktiv ? r.farge : 'rgba(255,255,255,0.09)'}`,
                    borderRadius: 12, padding: '0.55rem 0.5rem', minHeight: 92,
                    transition: 'background 0.12s, border 0.12s',
                  }}>
                  {/* Funksjons-header = drahåndtak for å FJERNE (kun når tom). */}
                  <div
                    draggable={folk.length === 0}
                    onDragStart={folk.length === 0 ? startDrag({ kind: 'funksjon', id: r.id }) : undefined}
                    title={folk.length === 0 ? 'Dra ned i paletten for å fjerne funksjonen' : 'Kan ikke fjernes mens noen står i den'}
                    style={{ cursor: folk.length === 0 ? 'grab' : 'default', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 13 }}>{r.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: r.farge }}>{r.funksjon}</span>
                    </div>
                    <div style={{ fontSize: 9, color: '#64748b' }}>
                      {r.vaktrolle ? 'Gulvvakt · kapasitet' : r.maanedseffekt ? 'Månedseffekt' : 'Organisasjon'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {folk.map(e => (
                      <DragCard key={e.id} emp={e} farge={r.farge}
                        onDragStart={startDrag({ kind: 'emp', id: e.id })}
                        onFire={() => dispatch({ type: 'FIRE_EMPLOYEE', id: e.id })} />
                    ))}
                    {folk.length === 0 && <div style={{ fontSize: 9.5, color: '#475569', fontStyle: 'italic' }}>Ansett hit</div>}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ fontSize: 12.5, color: '#64748b', textAlign: 'center' }}>
            Kartet har bare deg. Dra et <span style={{ color: '#00d4aa' }}>rollekort</span> fra
            paletten under hit for å opprette din første funksjon.
          </div>
        )}
      </div>

      {/* ROLLEPALETT — dra kort opp i kartet (opprett) / dra funksjon hit (fjern). */}
      <SectionTittel emoji="🎛️" tekst="Rollepalett" />
      <div {...sone('palett', d => d.kind === 'funksjon', d => dispatch({ type: 'REMOVE_ORG_ROLE', roleId: d.id }))}
        style={{
          background: over === 'palett' ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.02)',
          border: `1px dashed ${over === 'palett' ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 12, padding: '0.7rem 0.8rem', marginBottom: '1.4rem',
        }}>
        {paletten.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {paletten.map(r => (
              <div key={r.id} draggable onDragStart={startDrag({ kind: 'nyRolle', id: r.id })}
                title="Dra opp i kartet for å opprette funksjonen"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, cursor: 'grab',
                  background: `${r.farge}12`, border: `1px solid ${r.farge}40`, borderRadius: 8, padding: '0.35rem 0.6rem',
                }}>
                <span style={{ fontSize: 15 }}>{r.emoji}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9' }}>{r.funksjon}</div>
                  <div style={{ fontSize: 9, color: '#94a3b8' }}>{r.kjerne ? 'Kjernerolle' : 'Bransjerolle'}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: '#475569' }}>Alle roller er opprettet i kartet.</div>
        )}
        <div style={{ fontSize: 10, color: '#475569', marginTop: '0.55rem' }}>
          Dra et kort opp i kartet for å opprette funksjonen · dra en tom funksjon hit for å fjerne den.
        </div>
      </div>

      {/* PERSONALBENK */}
      <div {...sone('benk', d => d.kind === 'emp', d => dispatch({ type: 'ASSIGN_EMPLOYEE_BRANCH', id: d.id, grenId: null }))}
        style={{
          background: over === 'benk' ? 'rgba(148,163,184,0.14)' : 'rgba(255,255,255,0.02)',
          border: `1px dashed ${over === 'benk' ? '#94a3b8' : 'rgba(255,255,255,0.14)'}`,
          borderRadius: 12, padding: '0.7rem 0.8rem', marginBottom: '1.4rem',
        }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          🪑 PERSONALBENK · udisponert ({benk.length})
        </div>
        {benk.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {benk.map(e => (
              <DragCard key={e.id} emp={e} farge="#94a3b8" compact
                onDragStart={startDrag({ kind: 'emp', id: e.id })}
                onFire={() => dispatch({ type: 'FIRE_EMPLOYEE', id: e.id })} />
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: '#475569' }}>
            {state.employees.length === 0 ? 'Ingen ansatte ennå — ansett nedenfor.' : 'Alle er disponert i kartet.'}
          </div>
        )}
      </div>

      {/* VAKTLISTE */}
      <SectionTittel emoji="🗓️" tekst="Vaktliste · dagsmal (gjelder alle dager)" />
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '0.75rem', marginBottom: '1.4rem',
      }}>
        <div style={{ display: 'flex', paddingLeft: 128, marginBottom: 4 }}>
          {VAKT_LUKER.map(t => (
            <div key={t} style={{ flex: 1, fontSize: 9, color: '#64748b', textAlign: 'left' }}>{String(t).padStart(2, '0')}</div>
          ))}
          <div style={{ width: 24 }} />
        </div>
        <VaktRad navn="👑 Deg" sub="Daglig leder · gratis" farge="#ffd700" vakt={state.playerShift}
          onSet={v => dispatch({ type: 'SET_PLAYER_SHIFT', vakt: v })} />
        {salgsIVakt.map(e => (
          <VaktRad key={e.id} navn={e.navn} sub={`${rolleTittel(e.role)} · ${LEVEL_INFO[e.level].label}`}
            farge="#00d4aa" vakt={e.vakt ?? null}
            onSet={v => dispatch({ type: 'SET_EMPLOYEE_SHIFT', id: e.id, vakt: v })} />
        ))}
        {salgsIVakt.length === 0 && (
          <div style={{ fontSize: 12, color: '#64748b', padding: '0.4rem 0 0.1rem' }}>
            Opprett en <span style={{ color: '#00d4aa' }}>Salg</span>-funksjon og disponer selgere der for å sette dem på vakt.
          </div>
        )}
        <div style={{ fontSize: 10.5, color: '#475569', marginTop: '0.6rem', lineHeight: 1.5 }}>
          Klikk en time for å legge til eller fjerne den · dra over flere timer for
          å sette en hel vakt · ✕ tømmer vakta. For få på vakt = kø og tapte salg;
          for mange = lønna spiser dagsresultatet.
        </div>
      </div>

      {/* SE OVER ORGANISASJONEN — refleksjonsspørsmål (aldri fasit). */}
      <button onClick={() => setViserRefleksjon(v => !v)} style={{
        width: '100%', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer',
        background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.28)',
        borderRadius: 12, padding: '0.7rem 0.9rem', marginBottom: viserRefleksjon ? '0.5rem' : '1.4rem',
        color: '#7dd3fc', fontSize: 13, fontWeight: 700,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>🔍 Se over organisasjonen</span>
        <span style={{ fontSize: 11 }}>{viserRefleksjon ? '▲' : '▼'}</span>
      </button>
      {viserRefleksjon && (
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1.4rem',
          display: 'flex', flexDirection: 'column', gap: '0.55rem',
        }}>
          {refleksjoner.length ? (
            refleksjoner.map(r => (
              <div key={r.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#cbd5e1', lineHeight: 1.45 }}>
                <span style={{ flexShrink: 0 }}>🤔</span>
                <span>{r.spørsmål}</span>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.45 }}>
              🤔 Ingen åpenbare hull akkurat nå — men fortsett å vurdere organiseringen etter hvert som bedriften vokser.
            </div>
          )}
        </div>
      )}

      {/* Total lønn */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem',
        padding: '0.6rem 1rem', fontSize: 14, marginBottom: '1.4rem',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span style={{ color: '#64748b' }}>Total lønn per måned:</span>
        <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(state.monthlyPayroll)}</span>
      </div>

      {/* ANSETT — kun roller eleven har opprettet i kartet. */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1rem', padding: '1.25rem',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: '1rem' }}>Ansett ny medarbeider</div>

        {opprettede.length === 0 ? (
          <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
            Opprett en funksjon i org-kartet først (dra et rollekort fra paletten
            inn i kartet) — så kan du ansette inn i den.
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: '0.4rem' }}>Stilling</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {opprettede.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)} style={{
                    flex: '1 1 30%', minWidth: 100,
                    background: valgtRolle === r.id ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${valgtRolle === r.id ? '#00d4aa' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '0.6rem', padding: '0.55rem 0.4rem',
                    cursor: 'pointer', fontFamily: 'inherit', color: '#f1f5f9',
                  }}>
                    <div style={{ fontSize: 17, marginBottom: 2 }}>{r.emoji}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{r.tittel}</div>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
                {valgtRolle && rolleDef(valgtRolle)?.vaktrolle
                  ? 'Går på gulvvakt og betjener bakgrunnskunder (kapasitet stiger med nivå).'
                  : valgtRolle && rolleDef(valgtRolle)?.maanedseffekt
                    ? 'Bidrar til månedseffekten sin — går ikke på gulvvakt.'
                    : 'Organisasjonsrolle — ingen direkte motoreffekt, men en del av kartet.'}
              </div>
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
                    {valgtRolle && rolleDef(valgtRolle)?.vaktrolle && (
                      <div style={{ fontSize: 10, color: '#00d4aa', marginTop: 1 }}>{BALANCE.kapasitetPerTime[lv]}/t</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={hire} disabled={!canAfford} style={{
              width: '100%',
              background: canAfford ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(255,255,255,0.06)',
              border: 'none', borderRadius: 8, padding: '0.75rem',
              color: canAfford ? '#fff' : '#475569',
              fontWeight: 700, fontSize: 15, cursor: canAfford ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
            }}>
              {canAfford && valgtRolle
                ? `✅ Ansett ${LEVEL_INFO[level].label} ${rolleTittel(valgtRolle)} — ${formatKr(salary)}/mnd`
                : '💸 Ikke råd til denne ansettelsen'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── STEG 1 «Hvem gjør hva?» ───────────────────────────────────────────────────
// Personkort (Daglig leder + ansatte) og en oppgavepalett (rolleoppgavene fra
// bransjen). Dra en oppgave PÅ en person — én person kan ha flere, samme oppgave
// kan deles. Egen «Outsourcet»-boks tar KUN Økonomi/regnskap (fast månedskostnad).
// Ingen mekanisk effekt (unntatt outsourcing-kostnaden) — kun refleksjon + seed
// til org-kartet i steg 2.
function oppgaveNavn(r: RolleDef): string {
  return r.id === 'okonom' ? 'Økonomi/regnskap' : r.funksjon
}

function HvemGjorHvaSteg({ onNeste }: { onNeste: () => void }) {
  const { state, dispatch } = useGame()
  const [dragRole, setDragRole] = useState<EmployeeRole | null>(null)
  const [over, setOver] = useState<string | null>(null)

  const alleRoller = getActiveIndustryDefinition().roller
  const fordeling = state.oppgaveFordeling ?? {}
  const personer = [
    { id: 'meg', navn: 'Deg', undertittel: 'Daglig leder', emoji: '👑', farge: '#ffd700' },
    ...state.employees.map(e => ({ id: e.id, navn: e.navn, undertittel: LEVEL_INFO[e.level].label, emoji: '🧑', farge: '#94a3b8' })),
  ]

  function sone(key: string, accept: boolean, drop: () => void) {
    return {
      onDragOver: (e: React.DragEvent) => { if (dragRole && accept) { e.preventDefault(); setOver(key) } },
      onDragLeave: () => setOver(o => (o === key ? null : o)),
      onDrop: (e: React.DragEvent) => { e.preventDefault(); if (dragRole && accept) drop(); setDragRole(null); setOver(null) },
    }
  }

  const refleksjoner = oppgaveRefleksjoner({
    fordeling, regnskapOutsourcet: state.regnskapOutsourcet,
    kjerneOppgaver: [{ id: 'selger', navn: 'Salg' }, { id: 'okonom', navn: 'Økonomi/regnskap' }],
  })

  function chip(r: RolleDef, onFjern: () => void) {
    return (
      <span key={r.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: `${r.farge}1e`, border: `1px solid ${r.farge}55`, borderRadius: 99, padding: '1px 4px 1px 8px', fontSize: 11, fontWeight: 700, color: '#f1f5f9' }}>
        {r.emoji} {oppgaveNavn(r)}
        <button onClick={onFjern} title="Fjern oppgave" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12, lineHeight: 1, padding: '0 2px', fontFamily: 'inherit' }}>✕</button>
      </span>
    )
  }

  return (
    <div>
      {/* OPPGAVEPALETT */}
      <SectionTittel emoji="🧩" tekst="Oppgavepalett — dra en oppgave på en person" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.3rem' }}>
        {alleRoller.map(r => (
          <div key={r.id} draggable onDragStart={() => setDragRole(r.id)} onDragEnd={() => { setDragRole(null); setOver(null) }}
            title="Dra på en person (eller Økonomi/regnskap til Outsourcet)"
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'grab', background: `${r.farge}12`, border: `1px solid ${r.farge}40`, borderRadius: 8, padding: '0.4rem 0.7rem' }}>
            <span style={{ fontSize: 15 }}>{r.emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9' }}>{oppgaveNavn(r)}</span>
          </div>
        ))}
      </div>

      {/* PERSONKORT */}
      <SectionTittel emoji="🧑‍🤝‍🧑" tekst="Hvem gjør hva?" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.6rem', marginBottom: '1.2rem' }}>
        {personer.map(p => {
          const roller = (fordeling[p.id] ?? []).map(id => alleRoller.find(r => r.id === id)).filter(Boolean) as RolleDef[]
          const aktiv = over === `p_${p.id}`
          return (
            <div key={p.id} {...sone(`p_${p.id}`, !!dragRole, () => dispatch({ type: 'SET_OPPGAVE', personId: p.id, roleId: dragRole!, on: true }))}
              style={{ background: aktiv ? 'rgba(0,212,170,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${aktiv ? '#00d4aa' : `${p.farge}55`}`, borderRadius: 12, padding: '0.6rem', minHeight: 96, transition: 'background 0.12s, border 0.12s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.5rem' }}>
                <span style={{ fontSize: 16 }}>{p.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.navn}</div>
                  <div style={{ fontSize: 9.5, color: '#64748b' }}>{p.undertittel}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {roller.length > 0
                  ? roller.map(r => chip(r, () => dispatch({ type: 'SET_OPPGAVE', personId: p.id, roleId: r.id, on: false })))
                  : <span style={{ fontSize: 10, color: '#475569', fontStyle: 'italic' }}>Dra oppgaver hit …</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* OUTSOURCET-BOKS (kun Økonomi/regnskap) */}
      <SectionTittel emoji="🏦" tekst="Outsourcet — sett bort til andre" />
      {(() => {
        const okonom = alleRoller.find(r => r.id === 'okonom')
        const aktiv = over === 'outsourced'
        const kanTaImot = dragRole === 'okonom'
        return (
          <div {...sone('outsourced', kanTaImot, () => dispatch({ type: 'SET_REGNSKAP_OUTSOURCET', on: true }))}
            style={{ background: aktiv ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)', border: `1px dashed ${aktiv ? '#f59e0b' : 'rgba(245,158,11,0.4)'}`, borderRadius: 12, padding: '0.7rem 0.8rem', marginBottom: '1.3rem' }}>
            {state.regnskapOutsourcet && okonom ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {chip(okonom, () => dispatch({ type: 'SET_REGNSKAP_OUTSOURCET', on: false }))}
                  <span style={{ fontSize: 12, color: '#cbd5e1' }}>Regnskapsfører håndterer regnskapet.</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b' }}>−{formatKr(BALANCE.regnskapOutsourcingMnd)}/mnd</span>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: '#94a3b8' }}>
                Dra <strong style={{ color: '#f1f5f9' }}>Økonomi/regnskap</strong> hit for å sette det ut til en regnskapsfører
                — fast kostnad {formatKr(BALANCE.regnskapOutsourcingMnd)}/mnd, egen linje i månedsoppgjøret. (Kun regnskapet kan settes ut.)
              </div>
            )}
          </div>
        )
      })()}

      {/* REFLEKSJON (spørsmål, aldri fasit) */}
      <div style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1.3rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.03em' }}>🔍 TENK GJENNOM FORDELINGEN</div>
        {refleksjoner.length > 0 ? (
          refleksjoner.map((sp, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#cbd5e1', lineHeight: 1.45 }}>
              <span style={{ flexShrink: 0 }}>🤔</span><span>{sp}</span>
            </div>
          ))
        ) : (
          <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.45 }}>🤔 Fordel oppgavene på personene — så kommer det noen spørsmål å tenke over.</div>
        )}
      </div>

      {/* NESTE → seed org-kartet fra fordelingen */}
      <button onClick={() => { dispatch({ type: 'SEED_ORG_FROM_TASKS' }); onNeste() }}
        style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.7rem 1.6rem', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
        Bruk fordelingen i organisasjonskartet →
      </button>
      <p style={{ fontSize: 11, color: '#64748b', margin: '0.55rem 0 0' }}>
        Oppgavene du har fordelt opprettes som funksjoner i kartet. Du kan endre alt der — dette er bare et utgangspunkt.
      </p>
    </div>
  )
}

function SectionTittel({ emoji, tekst }: { emoji: string; tekst: string }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.03em', marginBottom: '0.55rem' }}>
      {emoji} {tekst}
    </div>
  )
}

function DragCard({ emp, farge, compact, onDragStart, onFire }: {
  emp: Employee; farge: string; compact?: boolean; onDragStart: (e: React.DragEvent) => void; onFire: () => void
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      title="Dra for å flytte"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: `${farge}14`, border: `1px solid ${farge}44`, borderRadius: 8,
        padding: compact ? '0.3rem 0.5rem' : '0.35rem 0.45rem', cursor: 'grab',
        maxWidth: compact ? 190 : '100%',
      }}
    >
      <span style={{ fontSize: 15 }}>{rolleEmoji(emp.role)}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.navn}</div>
        <div style={{ fontSize: 9.5, color: '#94a3b8' }}>{LEVEL_INFO[emp.level].label} · {formatKr(emp.monthlySalary)}</div>
      </div>
      <button onClick={onFire} title="Avslutt arbeidsforhold" style={{
        background: 'transparent', border: 'none', color: '#ef4444', fontSize: 13,
        cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px', lineHeight: 1,
      }}>✕</button>
    </div>
  )
}

// KLIKK på én time (luke k): legg til / fjern den timen i vakta. Vakta holdes
// SAMMENHENGENDE — å klikke en time utenfor utvider spennet til å dekke den; å
// klikke en dekket time trimmer (ende → av, eneste time → hele vakta bort).
function endreTime(vakt: Shift | null, k: number): Shift | null {
  const sf = (VAKT_START_TIME + k) * 60
  const st = (VAKT_START_TIME + k + 1) * 60
  if (!vakt) return { fra: sf, til: st }
  const dekket = sf >= vakt.fra && st <= vakt.til
  if (!dekket) return { fra: Math.min(vakt.fra, sf), til: Math.max(vakt.til, st) } // utvid
  if (sf === vakt.fra && st === vakt.til) return null            // eneste time → fjern
  if (sf === vakt.fra) return { fra: st, til: vakt.til }         // trim venstre ende
  if (st === vakt.til) return { fra: vakt.fra, til: sf }         // trim høyre ende
  return { fra: vakt.fra, til: sf }                              // innvendig → kort ned hit
}

function VaktRad({ navn, sub, farge, vakt, onSet }: {
  navn: string; sub: string; farge: string; vakt: Shift | null; onSet: (v: Shift | null) => void
}) {
  const [drag, setDrag] = useState<{ a: number; b: number } | null>(null)
  const dragRef = useRef<{ a: number; b: number } | null>(null)
  const movedRef = useRef(false)   // beveget pekeren over flere luker? ⇒ dra, ikke klikk

  function ned(k: number) {
    const d = { a: k, b: k }; dragRef.current = d; movedRef.current = false; setDrag(d)
    const opp = () => {
      window.removeEventListener('pointerup', opp)
      const dd = dragRef.current; dragRef.current = null; setDrag(null)
      if (!dd) return
      if (movedRef.current) {
        // DRA: sett en sammenhengende vakt over lukene pekeren dro over.
        const lo = Math.min(dd.a, dd.b), hi = Math.max(dd.a, dd.b)
        onSet({ fra: (VAKT_START_TIME + lo) * 60, til: (VAKT_START_TIME + hi + 1) * 60 })
      } else {
        // KLIKK: legg til / fjern den ene timen.
        onSet(endreTime(vakt, dd.a))
      }
    }
    window.addEventListener('pointerup', opp)
  }
  function inn(k: number) {
    if (!dragRef.current) return
    if (k !== dragRef.current.a) movedRef.current = true
    const d = { ...dragRef.current, b: k }; dragRef.current = d; setDrag(d)
  }

  const dekket = (k: number) => {
    if (drag) { const lo = Math.min(drag.a, drag.b), hi = Math.max(drag.a, drag.b); return k >= lo && k <= hi }
    if (!vakt) return false
    const s = (VAKT_START_TIME + k) * 60
    return s >= vakt.fra && s + 60 <= vakt.til
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <div style={{ width: 128, flexShrink: 0, paddingRight: 6 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{navn}</div>
        <div style={{ fontSize: 9, color: '#64748b' }}>{sub}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 2, touchAction: 'none' }}>
        {VAKT_LUKER.map((_, k) => (
          <div key={k}
            onPointerDown={e => { e.preventDefault(); ned(k) }}
            onPointerEnter={() => inn(k)}
            style={{
              flex: 1, height: 24, borderRadius: 4, cursor: 'pointer',
              background: dekket(k) ? farge : 'rgba(255,255,255,0.06)',
              border: `1px solid ${dekket(k) ? farge : 'rgba(255,255,255,0.08)'}`,
              transition: 'background 0.08s',
            }}
          />
        ))}
      </div>
      <div style={{ width: 24, flexShrink: 0, textAlign: 'right' }}>
        {vakt
          ? <button onClick={() => onSet(null)} title={`${hhmm(vakt.fra)}–${hhmm(vakt.til)} · fjern`} style={{
              background: 'transparent', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', padding: 0,
            }}>✕</button>
          : null}
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

// ── Innboks ────────────────────────────────────────────────────────────────────

function InnboksTab() {
  const { state, dispatch } = useGame()
  const [selected, setSelected] = useState<string | null>(null)
  const [choiceMade, setChoiceMade] = useState<Record<string, string>>({}) // messageId → choiceId

  const msgs = [...state.messages].reverse()

  function handleChoice(messageId: string, eventId: string, choiceId: string) {
    dispatch({ type: 'RESOLVE_GAME_EVENT', eventId, choiceId, messageId })
    setChoiceMade(c => ({ ...c, [messageId]: choiceId }))
  }
  const TYPE_ICON: Record<string, string> = {
    mentor: '🧑‍🏫', pest_event: '📰', game_event: '🚀', beredskap: '🦺',
    customer_complaint: '😤', supplier: '📦', teacher_task: '📚',
  }

  if (msgs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
        <div style={{ fontSize: 48, marginBottom: '1rem' }}>📬</div>
        <p>Ingen meldinger ennå. Simuler en måned for å motta oppdateringer.</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Innboks</h3>
        {state.unreadCount > 0 && (
          <span style={{ background: '#ef444420', border: '1px solid #ef444440', borderRadius: 99, padding: '2px 10px', fontSize: 12, color: '#ef4444', fontWeight: 700 }}>
            {state.unreadCount} ulest
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {msgs.map(msg => {
          const isOpen = selected === msg.id
          const resolved = msg.id in choiceMade
          return (
            <div
              key={msg.id}
              style={{
                background: msg.read ? 'rgba(255,255,255,0.03)' : 'rgba(56,189,248,0.06)',
                border: `1px solid ${msg.read ? 'rgba(255,255,255,0.07)' : 'rgba(56,189,248,0.25)'}`,
                borderRadius: '0.75rem', overflow: 'hidden',
              }}
            >
              {/* Header row */}
              <button
                onClick={() => {
                  setSelected(isOpen ? null : msg.id)
                  if (!msg.read) dispatch({ type: 'READ_MESSAGE', id: msg.id })
                }}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  padding: '0.75rem 1rem', cursor: 'pointer', color: '#f1f5f9',
                  fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{TYPE_ICON[msg.type] ?? '📩'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: msg.read ? 500 : 700, fontSize: 14, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {msg.title}
                    {!msg.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', flexShrink: 0, display: 'inline-block' }} />}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{msg.date}</div>
                </div>
                <span style={{ color: '#64748b', fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div style={{ padding: '0 1rem 1rem' }}>
                  <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 0.75rem', fontStyle: 'italic' }}>
                    "{msg.body}"
                  </p>

                  {msg.competenceGoal && (
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: '0.75rem' }}>
                      📚 {msg.competenceGoal}
                    </div>
                  )}

                  {/* Choices (for game events) */}
                  {msg.choices && msg.choices.length > 0 && !resolved && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Hva gjør du?
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {msg.choices.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => { if (c.eventId && c.choiceId) handleChoice(msg.id, c.eventId, c.choiceId) }}
                            style={{
                              background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)',
                              borderRadius: 8, padding: '0.5rem 0.75rem',
                              color: '#f1f5f9', fontSize: 13, cursor: 'pointer',
                              fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.14)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.06)')}
                          >
                            <strong>{c.text}</strong>
                            {c.effect && <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{c.effect}</div>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TEMA 1 — brannalarm som rekkefølge-øvelse, deretter utfall + sammenligning */}
                  {msg.type === 'beredskap' && (
                    (state.beredskap.brannalarmUtfall?.rekkefolge.length ?? 0) > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.6rem 0.8rem' }}>
                          {(state.beredskap.brannalarmUtfall!.kvalitet === 'good' ? BRANNALARM.utfallTrygg : BRANNALARM.utfallKaos)
                            .replace('{ekte}', state.beredskap.brannalarmUtfall!.ekte ? BRANNALARM.ekteBrann : BRANNALARM.falskAlarm)}
                        </div>
                        {/* Se selv hvor det skar seg (delt komponent) */}
                        <BrannalarmSammenligning rekkefolge={state.beredskap.brannalarmUtfall!.rekkefolge} />
                        <div style={{ fontSize: 11, color: '#64748b' }}>Se 🦺 HMS-fanen for evaluering og for å øve på nytt.</div>
                      </div>
                    ) : (
                      <BrannalarmOvelse messageId={msg.id} />
                    )
                  )}

                  {resolved && msg.type !== 'beredskap' && (
                    <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>
                      ✅ Valg registrert
                    </div>
                  )}

                  {msg.choices && msg.choices.length > 0 && !msg.choices[0].eventId && msg.type !== 'beredskap' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {msg.choices.map((c, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.4rem 0.6rem', fontSize: 12 }}>
                          <span style={{ color: '#f1f5f9' }}>{c.text}</span>
                          {c.effect && <span style={{ color: '#64748b' }}> — {c.effect}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
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
