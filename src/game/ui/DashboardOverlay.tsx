import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, useErTemaAktivt, useTemaNivaa, useKlasseNivaa } from '../GameContext'
import { INDUSTRY_CATALOG, catalogToProduct } from '../data/industries'
import { getIndustryDefinitionFor, getActiveIndustryDefinition } from '../data/industryDefinition'
import WindowDisplayEditor from '../city/WindowDisplay'
import { SCENARIOS } from '../sales/scenarios'
import { stamkundeTrinnLabel } from '../data/stamkundeDialog'
import { STAMKUNDER_AKTIV } from '../data/featureFlags'
import { type FagKode, type FagAktivering, FAG_KODER } from '../data/fag'
import { type TemaAktivering } from '../data/temaer'
import { generatePersona, calcPersonaMatchScore, matchLabel, MARKETING_CHANNEL_TIP } from '../data/personas'
import { DAY_CONFIG } from '../data/dayConfig'
import { manedligeFasteKostnader, amortiserLaan } from '../data/economy'
import Fagord from './Fagord'
import HmsTab from './HmsTab'
import BrannalarmOvelse, { BrannalarmSammenligning } from './BrannalarmOvelse'
import Pakkebygger from './Pakkebygger'
import { BESOKSPROFILER, type Besoksprofil } from '../data/reiseliv'
import { kassePling } from '../gamefeel/lyd'
import { BRANNALARM } from '../data/beredskap'
import { BALANCE } from '../data/balance'
import { IS_DEV_COORDS } from '../city/DevCoordHelper'
import {
  BUDSJETT_LINJER, TOM_BUDSJETT, maanedNokkel, faktiskeLinjer, planlagtResultat,
  BUDSJETT_HUB, NOKKELTALL_HUB, type BudsjettTall, type BudsjettLinjeKey, type NokkeltallSvar,
} from '../data/budsjett'
import {
  KANALER, kanalDagspris, kanalById, kampanjeKostnad, KAMPANJE_HUB, KOMMUNIKASJONSKANALER_RUTE,
  type KampanjeKanalValg,
} from '../data/kampanje'
import {
  tilbudsprisPerEnhet, bestillingGrunnbetaling, epostAbsDag,
  type KundebestillingPayload, type LeverandortilbudPayload, type MkftilbudPayload,
} from '../data/innboksEpost'
import MarkedsplanOppsummering from './MarkedsplanOppsummering'
import { aktiveFunksjoner, evaluerRefleksjon, oppgaveRefleksjoner } from '../data/orgRefleksjon'
import { hentDashTema, lagreDashTema, DASH_TEMA_LABEL, DASH_TEMA_CSS, type DashTema } from '../data/dashboardTema'
import { EGENSKAPER, egenskapLabel, REFERANSELONN, INTERVJUSPORSMAL } from '../data/rekruttering'
import type { Kandidat } from '../types'
import type { Product, DistributionChannel, Employee, EmployeeRole, EmployeeLevel, RolleDef, Shift, InboxMessage } from '../types'
import type { Loan } from '../types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

type Tab = 'oversikt' | 'forretningsplan' | 'produkter' | 'utstilling' | 'malgruppe' | 'okonomi' | 'lokasjon' | 'priser' | 'markedsforing' | 'distribusjon' | 'personale' | 'hms' | 'rapporter' | 'innboks'

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
  verktoy:          { navn: 'Verktøy',                      kort: 'V',   farge: 'var(--dash-text-sekundaer)' }, // L≈114 · tverrgående, ikke ett fag
}

// De tre programfagene læreren styrer (fag.ts sin FagKode) → FagId i FAG_FARGER,
// så «Aktive fag»-merket i dashbord-headeren kan bruke samme farge/kort/navn.
const KODE_TIL_FAGID: Record<FagKode, FagId> = {
  fd: 'forretningsdrift',
  m: 'markedsforing',
  ks: 'kultur',
}

// Rekkefølgen her ER visningsrekkefølgen. Fagene ligger stort sett samlet, MEN
// «Produkter» er flyttet frem til RETT FØR «Priser» (Espens beslutning): man må
// ha varer før man kan prise dem. Produkter beholder sitt markedsforing-fag
// (badge/farge urørt) — kun rekkefølgen endres.
// `fag` = PRIMÆRfag for stripe/badge (visuell koding, uendret). `visFag` = hvilke
// programfag som gjør fanen SYNLIG (fikserunde 3): en fane vises hvis MINST ETT av
// dens `visFag` er aktivt. Uten `visFag` er fanen KJERNE (vises alltid). HMS er
// tema-gated (beredskap) — og siden aktiveTemaer er fag-gated, forsvinner HMS
// automatisk når faget (fd) er av; ingen egen visFag der.
const TABS: { id: Tab; label: string; emoji: string; fag: FagId; tema?: string; visFag?: FagKode[] }[] = [
  // ── Forretningsdrift ──
  { id: 'oversikt',        label: 'Oversikt',         emoji: '📊', fag: 'forretningsdrift' },   // kjerne
  // Forretningsplan er DELT FD+M: «Forretningsidé» er M-modul i VG1-strukturen,
  // finansiering/lån er FD → synlig hvis minst ett av FD/M er aktivt.
  { id: 'forretningsplan', label: 'Forretningsplan',   emoji: '📋', fag: 'forretningsdrift', visFag: ['fd', 'm'] },
  { id: 'okonomi',         label: 'Økonomi',           emoji: '💰', fag: 'forretningsdrift', visFag: ['fd'] },
  { id: 'produkter',       label: 'Produkter',         emoji: '📦', fag: 'markedsforing', visFag: ['fd', 'm'] }, // FØR Priser: varer før prising
  { id: 'priser',          label: 'Priser',            emoji: '🏷️', fag: 'forretningsdrift', visFag: ['fd', 'm'] },
  // ── Markedsføring og innovasjon (markedsmiksens Produkt/Plass/Promosjon) ──
  { id: 'malgruppe',       label: 'Målgruppe',         emoji: '🎯', fag: 'markedsforing', visFag: ['m'] },
  // Lokasjon er DELT FD+M: husleie + oppgraderingsinvestering (FD) i tillegg til
  // Plass-P (M) → synlig hvis minst ett av FD/M er aktivt. (Badge/stripe = M primær.)
  { id: 'lokasjon',        label: 'Lokasjon',          emoji: '📍', fag: 'markedsforing', visFag: ['fd', 'm'] },
  { id: 'markedsforing',   label: 'Markedsføring',     emoji: '📢', fag: 'markedsforing', visFag: ['m'] },
  { id: 'distribusjon',    label: 'Distribusjon',      emoji: '🚚', fag: 'markedsforing', visFag: ['m'] }, // Plass-P (M-merke)
  { id: 'utstilling',      label: 'Utstilling',        emoji: '🪟', fag: 'markedsforing', visFag: ['m'] },
  // ── Kultur og samhandling ──
  // Personale er DELT FD+M (Espens fagbeslutning): bemanning av salgs-/serviceflater
  // ligger også i markedsføringsløpet på yrkesfag. Badge-PRIMÆR forblir FD; fanen er
  // synlig når MINST ETT av FD/M er på, og forsvinner først når BEGGE er av.
  { id: 'personale',       label: 'Personale',         emoji: '👥', fag: 'forretningsdrift', visFag: ['fd', 'm'] },
  // ── HMS (TEMA-fane: vises KUN når temaet er aktivt, se InnboksTabBar-filteret) ──
  { id: 'hms',             label: 'HMS',               emoji: '🦺', fag: 'hms', tema: 'beredskap' },
  // ── Verktøy (tverrgående) — KJERNE, vises alltid ──
  { id: 'rapporter',       label: 'Rapporter',         emoji: '📋', fag: 'verktoy' },
  { id: 'innboks',         label: 'Innboks',           emoji: '📬', fag: 'verktoy' },
]

/** En fane er synlig hvis (a) evt. tema-krav er oppfylt OG (b) minst ett av dens
 *  `visFag` er aktivt (eller den er kjerne uten visFag). */
function faneSynlig(t: typeof TABS[number], aktiveTemaer: Record<string, TemaAktivering>, fag: FagAktivering): boolean {
  if (t.tema && !aktiveTemaer[t.tema]?.aktiv) return false
  if (t.visFag && !t.visFag.some(f => fag[f])) return false
  return true
}

// ── Tab bar (extracted so it can read unreadCount) ────────────────────────────

function InnboksTabBar({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) {
  const { state, aktiveTemaer, fagAktiv } = useGame()
  // Faner filtreres på tema (som før) OG på fag: en fane hvis fag er av er HELT
  // borte (ingen gråtonet rest) for eleven.
  const synligeTabs = TABS.filter(t => faneSynlig(t, aktiveTemaer, fagAktiv))
  // Faglegende: kun de fagene som faktisk har en synlig fane (i visnings-
  // rekkefølge, uten duplikater). Diskret — forklarer stripene under fanene.
  const synligeFag: FagId[] = []
  for (const t of synligeTabs) if (!synligeFag.includes(t.fag)) synligeFag.push(t.fag)
  return (
    <>
      <div className="dashboard-tab-bar" style={{
        display: 'flex', gap: '0.5rem', padding: '1rem 2rem 0',
        borderBottom: '1px solid var(--dash-border)',
        overflowX: 'auto', flexShrink: 0,
        scrollbarWidth: 'none',
      }}>
        {synligeTabs.map(t => {
          const aktiv = activeTab === t.id
          const { farge: fagFarge, kort: fagKort } = FAG_FARGER[t.fag]
          return (
            <button key={t.id} data-testid={`fane-${t.id}`} onClick={() => setActiveTab(t.id)} aria-current={aktiv ? 'page' : undefined} style={{
              background: aktiv ? 'rgba(0,212,170,0.12)' : 'transparent',
              border: `1px solid ${aktiv ? '#00d4aa' : 'transparent'}`,
              borderBottom: 'none', borderRadius: '8px 8px 0 0',
              padding: '0.6rem 1.2rem 0.65rem',
              color: aktiv ? '#00d4aa' : 'var(--dash-text-sekundaer)',
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
        padding: '0.5rem 2rem 0', flexShrink: 0, fontSize: 10.5, color: 'var(--dash-text-sekundaer)',
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
  const { aktiveTemaer, fagAktiv } = useGame()
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [faneMelding, setFaneMelding] = useState<string | null>(null)
  // DEL 4 — LAGRE-KVITTERINGER: utkast + «sist lagret»-tid for Priser og Målgruppe
  // løftes HIT så de overlever fanebytte (fane-komponentene unmountes ved bytte;
  // et lokalt utkast ville gått tapt). Nullstilles ved lagring (utkast → null).
  const [priserUtkast, setPriserUtkast] = useState<Product[] | null>(null)
  const [priserLagretMin, setPriserLagretMin] = useState<number | null>(null)
  const [malgruppeUtkast, setMalgruppeUtkast] = useState<MalgruppeUtkast | null>(null)
  const [malgruppeLagretMin, setMalgruppeLagretMin] = useState<number | null>(null)
  const [dashTema, setDashTema] = useState<DashTema>(hentDashTema)
  function velgTema(t: DashTema) { setDashTema(t); lagreDashTema(t) }

  // Åpning / direktenavigasjon til en SKJULT fane → Oversikt (ingen krasj).
  useEffect(() => {
    if (!open || !initialTab) return
    const t = TABS.find(x => x.id === initialTab)
    setActiveTab(t && faneSynlig(t, aktiveTemaer, fagAktiv) ? (initialTab as Tab) : 'oversikt')
    // Fag/tema-avhengigheter bevisst utelatt: åpnings-fanen skal ikke re-settes
    // ved fagbytte midt i økt (det håndteres av vakten under).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialTab])

  // Fagbytte MIDT i økt: står du på en fane som nettopp ble skjult → rolig retur
  // til Oversikt med en tekstmelding (aldri en hard feil).
  useEffect(() => {
    if (!open) return
    const t = TABS.find(x => x.id === activeTab)
    if (t && !faneSynlig(t, aktiveTemaer, fagAktiv)) {
      setActiveTab('oversikt')
      setFaneMelding('Læreren har endret fagoppsettet — du er tilbake på Oversikt.')
    }
  }, [open, activeTab, aktiveTemaer, fagAktiv])

  useEffect(() => {
    if (!faneMelding) return
    const id = window.setTimeout(() => setFaneMelding(null), 6000)
    return () => window.clearTimeout(id)
  }, [faneMelding])

  // LÆRINGSLAGET — meld AKTIV fane til mentoren (kontekstbundne fane-triggere).
  // Mentoren viser fane-hintet KUN mens fanen er aktiv, og re-armer det hvis det
  // ikke rekker frem; null når dashbordet lukkes. Selve trigger-oppslaget
  // (fane → melding) ligger i mentorTriggers (`fane`-feltet).
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mentor:fane', { detail: { fane: open ? activeTab : null } }))
  }, [open, activeTab])

  // Mentor: scene-orientering første gang dashbordet åpnes (fyres én gang; køes bak
  // en ev. fane-trigger som re-armer). Egen kanal fra fane-meldingen.
  useEffect(() => {
    if (open) window.dispatchEvent(new CustomEvent('mentor:signal', { detail: { id: 'forste_dashbord' } }))
  }, [open])

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
            data-dash-tema={dashTema}
            initial={{ scale: 0.93, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24 }}
            style={{
              background: 'var(--dash-modal-bg)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid var(--dash-border)',
              borderRadius: '2rem', width: '100%', maxWidth: 960,
              maxHeight: 'calc(100vh - 3rem)',
              display: 'flex', flexDirection: 'column',
              color: 'var(--dash-text)', overflow: 'hidden',
            }}
          >
            <style>{DASH_TEMA_CSS}</style>
            {/* Header */}
            <div style={{ padding: '1.5rem 2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>💻 Bedriftsdashboard</h2>
                <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>All bedriftsstyring på ett sted</p>
                {/* AKTIVE FAG — hvilke programfag læreren har slått PÅ for klassen
                    (fd/m/ks). Fargesvak-trygt: kort (FD/M/KS) + fullt navn, ikke
                    kun farge. Fag som er av vises ikke (de er skjult for eleven). */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--dash-text-sekundaer)', letterSpacing: '0.05em' }}>AKTIVE FAG:</span>
                  {FAG_KODER.filter(f => fagAktiv[f]).map(f => {
                    const { farge, kort, navn } = FAG_FARGER[KODE_TIL_FAGID[f]]
                    return (
                      <span key={f} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700,
                        color: farge, background: `${farge}1a`, border: `1px solid ${farge}66`,
                        borderRadius: 99, padding: '2px 10px',
                      }}>
                        <span aria-hidden="true" style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.03em', opacity: 0.85 }}>{kort}</span>
                        {navn}
                      </span>
                    )
                  })}
                  {!FAG_KODER.some(f => fagAktiv[f]) && (
                    <span style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', fontStyle: 'italic' }}>ingen</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start' }}>
                {/* Lys/middels/mørk temavelger (DEL C) — ren UI-preferanse, lagres i localStorage. */}
                <div style={{ display: 'flex', gap: 4, background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: 8, padding: 3 }}>
                  {(['lys', 'middels', 'mork'] as DashTema[]).map(t => (
                    <button key={t} onClick={() => velgTema(t)} title={DASH_TEMA_LABEL[t]} style={{
                      background: dashTema === t ? 'rgba(0,212,170,0.18)' : 'transparent',
                      border: 'none', borderRadius: 6, padding: '0.3rem 0.5rem',
                      cursor: 'pointer', fontSize: 13, lineHeight: 1,
                    }}>{DASH_TEMA_LABEL[t].split(' ')[0]}</button>
                  ))}
                </div>
                <button data-testid="dashbord-lukk" onClick={onClose} style={{
                  background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)',
                  borderRadius: 99, width: 36, height: 36, color: 'var(--dash-text-dempet)',
                  cursor: 'pointer', fontSize: 18, fontFamily: 'inherit',
                }}>✕</button>
              </div>
            </div>

            {/* Tab bar */}
            <InnboksTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Rolig melding når læreren endrer fagoppsettet midt i økta. */}
            {faneMelding && (
              <div style={{
                margin: '0.75rem 2rem 0', padding: '0.6rem 0.9rem',
                background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.35)',
                borderRadius: 10, color: '#7dd3fc', fontSize: 12.5, fontWeight: 600, flexShrink: 0,
              }}>
                ℹ️ {faneMelding}
              </div>
            )}

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem 2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {activeTab === 'oversikt'        && <OversiktTab onNavigate={setActiveTab} />}
                  {activeTab === 'forretningsplan' && <ForretningsplanTab onNavigate={setActiveTab} />}
                  {activeTab === 'produkter'       && <ProdukterTab />}
                  {activeTab === 'utstilling'      && <WindowDisplayEditor />}
                  {activeTab === 'malgruppe'       && <MalgruppeTab utkast={malgruppeUtkast} setUtkast={setMalgruppeUtkast} lagretMin={malgruppeLagretMin} setLagretMin={setMalgruppeLagretMin} />}
                  {activeTab === 'okonomi'         && <OkonomiTab />}
                  {activeTab === 'lokasjon'        && <LokasjonTab />}
                  {activeTab === 'priser'          && <PriserTab utkast={priserUtkast} setUtkast={setPriserUtkast} lagretMin={priserLagretMin} setLagretMin={setPriserLagretMin} />}
                  {activeTab === 'markedsforing'   && <MarkedsforingTab />}
                  {activeTab === 'distribusjon'    && <DistribusjonTab />}
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
  const monthlyCosts = monthlyRent + state.monthlyPayroll + BALANCE.eierlonnMnd + state.monthlyLoanPayment + Object.values(state.marketingBudget).reduce((s, v) => s + v, 0) + 2000
  const estRevenue = state.products.reduce((s, p) => s + p.retailPrice * Math.min(p.maxDemandPerMonth * 0.5, p.stock), 0)
  const netFlow = estRevenue - monthlyCosts
  const runway = netFlow < 0 && money > 0 ? Math.max(0, Math.floor(money / Math.abs(netFlow))) : null

  const allDone = Object.values(progress).every(Boolean)

  const QUALITY_STARS = ['☆☆☆☆☆', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
  const QUALITY_COLOR = ['var(--dash-text-sekundaer)', '#ef4444', '#f97316', '#facc15', '#22c55e', '#22c55e']
  const q = state.businessPlan.qualityScore

  function handleSimulate() {
    dispatch({ type: 'SET_PHASE', phase: 'ready_to_simulate' })
    window.dispatchEvent(new CustomEvent('phaser:simulate'))
  }

  return (
    <div>
      {/* DEV: salgssituasjon-øving er FLYTTET til ⚙ DEV-panelet (Scenarier-gruppa)
          — den lå tidligere ugated her i Oversikt (synlig for elever). */}

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Kontanter"       value={formatKr(money)}       color="#22c55e" icon="💰" />
        <KpiCard label="Gjeld"           value={formatKr(totalDebt)}   color={totalDebt > 0 ? '#f97316' : '#22c55e'} icon="🏦" />
        <KpiCard label="Kostnader/mnd"   value={formatKr(monthlyCosts)} color="#f97316" icon="📤" />
        <KpiCard label="Rykte"           value={`${reputation}/100`}   color={reputation >= 60 ? '#22c55e' : '#facc15'} icon="⭐" />
      </div>

      {/* 4P-fremdrift — flyttet hit fra HUD-en. Klikk en P for å hoppe til fanen. */}
      <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '0.9rem', letterSpacing: '0.06em' }}>
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
              background: done ? 'rgba(0,212,170,0.12)' : 'var(--dash-card-2)',
              border: `1px solid ${done ? '#00d4aa' : 'rgba(255,255,255,0.12)'}`, borderRadius: 12, padding: '0.7rem 0.4rem',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, background: done ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.06)',
                color: done ? '#00d4aa' : 'var(--dash-text-sekundaer)',
              }}>{done ? '✓' : p[0]}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: done ? '#00d4aa' : 'var(--dash-text-dempet)' }}>{p}</span>
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
      <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '1rem', letterSpacing: '0.06em' }}>📊 BEDRIFTSSTATUS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>

          {/* Plankvalitet */}
          <div style={{ background: 'var(--dash-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 4 }}>Plankvalitet</div>
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
            background: runway !== null && runway < 3 ? 'rgba(239,68,68,0.08)' : 'var(--dash-card)',
            border: `1px solid ${runway !== null && runway < 3 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 10, padding: '0.75rem',
          }}>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 4 }}>Runway</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: runway === null ? '#22c55e' : runway < 3 ? '#ef4444' : runway < 6 ? '#f97316' : '#38bdf8' }}>
              {runway === null ? '∞' : `${runway} mnd`}
            </div>
            {runway !== null && runway < 3 && <div style={{ fontSize: 10, color: '#ef4444' }}>⚠️ Kritisk</div>}
          </div>

          {/* Produkter */}
          <div style={{ background: 'var(--dash-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 4 }}>Produkter</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: state.products.length > 0 ? 'var(--dash-text)' : '#475569' }}>
              {state.products.length}
            </div>
            {state.products.length === 0 && (
              <button onClick={() => onNavigate('produkter')} style={{ fontSize: 10, color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Velg →</button>
            )}
          </div>

          {/* Ansatte */}
          <div style={{ background: 'var(--dash-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 4 }}>Ansatte</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dash-text)' }}>{state.employees.length}</div>
          </div>

          {/* Måned / År */}
          <div style={{ background: 'var(--dash-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem', gridColumn: '1/-1' }}>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 4 }}>Periode</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--dash-text)' }}>
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
        <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '1rem', letterSpacing: '0.08em' }}>MÅNEDLIG OMSETNING</div>
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
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>Total nettoresultat:</span>
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

  const monthlyCosts = monthlyRent + monthlyPayroll + BALANCE.eierlonnMnd + monthlyLoanPayment + Object.values(marketingBudget).reduce((s, v) => s + v, 0)
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
        <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>
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
          <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>Plankvalitet påvirker bankens rentesats</div>
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
              padding: '0.75rem', color: 'var(--dash-text)', fontSize: 13, fontFamily: 'inherit',
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
          <p style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)', margin: '0 0 0.75rem' }}>
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
                        <div style={{ fontSize: 11, color: 'var(--dash-text-dempet)', lineHeight: 1.4 }}>{f.value}</div>
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
                  background: filled ? 'rgba(0,212,170,0.06)' : 'var(--dash-card)',
                  border: `1px solid ${filled ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 8, padding: '0.6rem',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: filled ? '#00d4aa' : 'var(--dash-text-sekundaer)', marginBottom: '0.3rem' }}>
                    {f.emoji} {f.label} {filled && '✅'}
                  </div>
                  <textarea
                    value={val}
                    onChange={e => setCanvas(c => ({ ...c, [f.key]: e.target.value }))}
                    placeholder={f.suggestions[0]}
                    rows={2}
                    style={{
                      width: '100%', background: 'var(--dash-card-2)',
                      border: '1px solid var(--dash-border)', borderRadius: 4,
                      padding: '0.35rem', color: 'var(--dash-text)', fontSize: 11,
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
              <p style={{ color: 'var(--dash-text-dempet)', fontSize: 13, margin: '0 0 0.75rem' }}>
                Kjøp en markedsundersøkelse for å få konkrete data. Gir +1 stjerne i plankvalitet.
              </p>
              <button
                onClick={() => dispatch({ type: 'BUY_MARKET_RESEARCH' })}
                disabled={state.money < 10_000}
                style={{
                  background: state.money >= 10_000 ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${state.money >= 10_000 ? 'rgba(0,212,170,0.3)' : 'var(--dash-border)'}`,
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
          <p style={{ color: 'var(--dash-text-dempet)', fontSize: 13, margin: 0 }}>
            {taSummary !== 'Ikke definert' ? taSummary : 'Gå til Målgruppe-fanen for å definere hvem du selger til.'}
          </p>
        </PlanSection>

        {/* Products */}
        <PlanSection title="Produkter/Tjenester" complete={products.length > 0} icon="📦">
          {products.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {products.map(p => (
                <span key={p.id} style={{ background: 'var(--dash-border)', borderRadius: 99, padding: '3px 10px', fontSize: 12 }}>
                  {p.icon} {p.name}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: 0 }}>Gå til Produkter-fanen for å velge hva du skal selge.</p>
          )}
        </PlanSection>

        {/* Budget */}
        <PlanSection title="Driftsbudsjett (estimert)" complete={monthlyCosts > 0} icon="💵">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.3rem 1rem', fontSize: 13 }}>
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>Husleie</span>
            <span style={{ textAlign: 'right' }}>{formatKr(monthlyRent)}</span>
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>Lønn</span>
            <span style={{ textAlign: 'right' }}>{formatKr(monthlyPayroll)}</span>
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>Markedsføring</span>
            <span style={{ textAlign: 'right' }}>{formatKr(Object.values(marketingBudget).reduce((s, v) => s + v, 0))}</span>
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>Lånebetalinger</span>
            <span style={{ textAlign: 'right' }}>{formatKr(monthlyLoanPayment)}</span>
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>Forsikring/div.</span>
            <span style={{ textAlign: 'right' }}>{formatKr(2_000)}</span>
            <div style={{ gridColumn: '1/-1', borderTop: '1px solid var(--dash-border)', margin: '0.3rem 0' }} />
            <span style={{ fontWeight: 700 }}>Total/mnd</span>
            <span style={{ textAlign: 'right', fontWeight: 700, color: '#f97316' }}>{formatKr(monthlyCosts + 2000)}</span>
            {estRevenue > 0 && <>
              <span style={{ color: 'var(--dash-text-sekundaer)' }}>Est. inntekt/mnd</span>
              <span style={{ textAlign: 'right', color: '#22c55e' }}>{formatKr(estRevenue)}</span>
            </>}
            {breakEvenMonth !== null && breakEvenMonth > 0 && breakEvenMonth < 36 && <>
              <span style={{ color: 'var(--dash-text-sekundaer)' }}>Estimert break-even</span>
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
        <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)' }}>
          Plankvalitet ({q}/5) påvirker rente: {RATE_LABELS[Math.max(0, Math.min(5, q))]} p.a.
        </div>
      </div>
    </div>
  )
}

function PlanSection({ title, complete, icon, children }: { title: string; complete: boolean; icon: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: complete ? 'rgba(0,212,170,0.05)' : 'var(--dash-card)',
      border: `1px solid ${complete ? 'rgba(0,212,170,0.25)' : 'var(--dash-border)'}`,
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

function MalgruppeTab({ utkast, setUtkast, lagretMin, setLagretMin }: {
  utkast: MalgruppeUtkast | null
  setUtkast: (a: MalgruppeUtkast | null) => void
  lagretMin: number | null
  setLagretMin: (m: number) => void
}) {
  const { state, dispatch } = useGame()
  // Arbeidsverdi: elevens utkast (i PARENT → overlever fanebytte, DEL 4), ellers
  // en fersk kopi av lagret målgruppe.
  const audience = utkast ?? { ...state.targetAudience }
  const dirty = utkast != null && JSON.stringify(audience) !== JSON.stringify(state.targetAudience)
  const [nyligLagret, setNyligLagret] = useState(false)
  const lagretTimer = useRef<number>(0)
  // Oppdater utkastet (base = gjeldende utkast, ev. lagret state ved første valg).
  const oppdater = (fn: (a: MalgruppeUtkast) => MalgruppeUtkast) => setUtkast(fn(audience))

  function toggleArr<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]
  }

  function togglePsycho(p: string) {
    oppdater(prev => {
      const has = prev.psychographics.includes(p)
      if (has) return { ...prev, psychographics: prev.psychographics.filter(x => x !== p) }
      if (prev.psychographics.length >= 3) return prev   // max 3
      return { ...prev, psychographics: [...prev.psychographics, p] }
    })
  }

  function save() {
    dispatch({ type: 'SET_TARGET_AUDIENCE', audience })
    setUtkast(null)
    setLagretMin(state.dayMinute)
    setNyligLagret(true)
    window.clearTimeout(lagretTimer.current)
    lagretTimer.current = window.setTimeout(() => setNyligLagret(false), 2000)
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
          <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>Hvem selger du til? Kunden genereres automatisk basert på valgene dine.</p>
        </div>
        <LagreBar label="Lagre målgruppe" dirty={dirty} nyligLagret={nyligLagret} lagretMin={lagretMin} onSave={save} />
      </div>

      <AudienceSection label="Geografi">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {GEO_OPTS.map(g => {
            const active = audience.geography === g
            return (
              <button key={g} onClick={() => oppdater(prev => ({ ...prev, geography: active ? null : g }))}
                style={{
                  background: active ? 'rgba(56,189,248,0.15)' : 'var(--dash-card-2)',
                  border: `1px solid ${active ? '#38bdf8' : 'var(--dash-border)'}`,
                  borderRadius: 99, padding: '0.4rem 1.1rem',
                  color: active ? '#38bdf8' : 'var(--dash-text-dempet)',
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
          onToggle={a => oppdater(prev => ({ ...prev, ageGroups: toggleArr(prev.ageGroups, a) }))} />
      </AudienceSection>

      <AudienceSection label="Kjønn">
        <ToggleGroup options={GENDERS} selected={audience.genders} color="#a855f7"
          onToggle={g => oppdater(prev => ({ ...prev, genders: toggleArr(prev.genders, g) }))} />
      </AudienceSection>

      <AudienceSection label={`Psykografiske egenskaper (maks 3, valgt: ${audience.psychographics.length}/3)`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PSYCHO_OPTS.map(p => {
            const active  = audience.psychographics.includes(p)
            const maxed   = !active && audience.psychographics.length >= 3
            return (
              <button key={p} onClick={() => togglePsycho(p)} disabled={maxed}
                style={{
                  background: active ? 'rgba(0,212,170,0.15)' : 'var(--dash-card-2)',
                  border: `1px solid ${active ? '#00d4aa66' : 'var(--dash-border)'}`,
                  borderRadius: 99, padding: '0.4rem 1rem',
                  color: active ? '#00d4aa' : maxed ? '#334155' : 'var(--dash-text-dempet)',
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
        <div style={{ textAlign: 'center', color: '#475569', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--dash-border)', marginTop: '1rem' }}>
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
      background: 'var(--dash-card)',
      border: '1px solid var(--dash-border)',
      borderRadius: '1.25rem', padding: '1.5rem',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Header */}
      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--dash-text-sekundaer)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
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
          <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--dash-text)' }}>{persona.fullName}, {persona.age} år</div>
          <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)', marginTop: 2 }}>📍 {persona.location}</div>
          <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)' }}>💼 {persona.occupation}</div>
          <div style={{ fontSize: 13, color: '#00d4aa', marginTop: 2 }}>
            💰 Bruker ~{persona.monthlyBudget.toLocaleString('nb-NO')} kr/mnd
            {/* DEL 1 (Persona-realisme): kafé viser ALLTID mnd + per-besøk
                atskilt og konsistente (aldri samme tall for begge — se
                cafeSpendFrom i personas.ts). */}
            {persona.perVisitSpend !== undefined && persona.visitsPerMonth !== undefined && (
              <span style={{ color: 'var(--dash-text-sekundaer)' }}> ({persona.perVisitSpend.toLocaleString('nb-NO')} kr/besøk · {persona.visitsPerMonth}×/mnd)</span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{
        background: 'var(--dash-card-2)', borderRadius: '0.75rem',
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
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--dash-text-sekundaer)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>INTERESSER</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {persona.interests.map(i => (
              <span key={i} style={{
                background: 'var(--dash-border)', borderRadius: 99,
                padding: '2px 9px', fontSize: 11, color: 'var(--dash-text-dempet)',
              }}>🏷 {i}</span>
            ))}
          </div>
        </div>

        {/* Social media */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--dash-text-sekundaer)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>SOSIALE MEDIER</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {persona.socialMedia.map(s => (
              <span key={s} style={{ fontSize: 12, color: 'var(--dash-text-dempet)' }}>📱 {s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping habits */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--dash-text-sekundaer)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>HANDLEVANER</div>
        <div style={{ fontSize: 13, color: 'var(--dash-text-dempet)', marginBottom: '0.25rem' }}>🛒 {persona.shoppingHabit}</div>
        <div style={{ fontSize: 13, color: 'var(--dash-text-dempet)' }}>💳 Betalingsvilje: {persona.willingness}</div>
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
      <div style={{ background: 'var(--dash-card-2)', borderRadius: '0.75rem', padding: '0.9rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dash-text-sekundaer)' }}>Match med dine produkter</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: ml.color }}>{matchScore}% — {ml.text}</div>
        </div>
        <div style={{ background: 'var(--dash-border)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
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

      {/* KROK 2 — STAMKUNDER: enkel oversikt (navn + status som tekstlabel + besøk).
          Ingen scores/målere. */}
      <StamkundeOversikt />
    </div>
  )
}

// ─── KROK 2 — Stamkunde-oversikt (Målgruppe-fanen) ────────────────────────────
function StamkundeOversikt() {
  const { state } = useGame()
  // KROK 2 STAMKUNDER er PARKERT (STAMKUNDER_AKTIV) — skjul «kjente fjes»-seksjonen.
  if (!STAMKUNDER_AKTIV) return null
  const rader = Object.entries(state.stamkunder)
    .filter(([, k]) => k.antallMoter >= 1)
    .map(([id, k]) => ({ navn: SCENARIOS.find(s => s.id === id)?.customerName ?? id, ...k }))
    .sort((a, b) => (b.erStamkunde ? 1 : 0) - (a.erStamkunde ? 1 : 0) || b.antallMoter - a.antallMoter)
  if (!rader.length) return null
  return (
    <div style={{ marginTop: '1.25rem' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
        STAMKUNDER — KJENTE FJES
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {rader.map(r => {
          // Fargeblind-trygt: alltid en TEKSTLABEL, aldri kun farge. Viser
          // utviklingstrinnet (Ny/Trygg stamkunde · Anbefaler deg).
          const { label, farge, ikon } = stamkundeTrinnLabel(r)
          return (
            <div key={r.navn} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)', borderRadius: 10, padding: '0.5rem 0.8rem' }}>
              <span style={{ fontSize: 13, color: 'var(--dash-text)', fontWeight: 600 }}>{ikon} {r.navn}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: farge }}>{label}</span>
                <span style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>{r.antallMoter} besøk</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Audience helpers ────────────────────────────────────────────────────────

function AudienceSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>{label.toUpperCase()}</div>
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
            background: active ? `${color}18` : 'var(--dash-card-2)',
            border: `1px solid ${active ? color + '66' : 'var(--dash-border)'}`,
            borderRadius: 99, padding: '0.4rem 1rem',
            color: active ? color : 'var(--dash-text-dempet)',
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
  const budsjettAktiv = useErTemaAktivt('budsjett')        // TEMA 2
  const nokkeltallAktiv = useErTemaAktivt('nokkeltall')    // TEMA 3 (kun VG2)

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

      {/* TEMA 2 Budsjett + TEMA 3 Nøkkeltall (kun VG2) — øverst, kun når aktivt. */}
      {budsjettAktiv && <BudsjettSeksjon />}
      {nokkeltallAktiv && <NokkeltallSeksjon />}

      {/* Runway / Burn rate — varsling øverst */}
      {runway !== null && (
        <div style={{
          background: runway < 3 ? 'rgba(239,68,68,0.1)' : runway < 6 ? 'rgba(249,115,22,0.08)' : 'rgba(56,189,248,0.06)',
          border: `1px solid ${runway < 3 ? 'rgba(239,68,68,0.4)' : runway < 6 ? 'rgba(249,115,22,0.3)' : 'rgba(56,189,248,0.2)'}`,
          borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1rem',
          display: 'flex', gap: '1.5rem', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}><Fagord id="ECO_005">Runway</Fagord></div>
            <div style={{
              fontSize: 28, fontWeight: 900,
              color: runway < 3 ? '#ef4444' : runway < 6 ? '#f97316' : '#38bdf8',
            }}>
              {runway} mnd
            </div>
            {runway < 3 && <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚠️ Kritisk! Søk lån eller øk inntekter</div>}
          </div>
          <div style={{ borderLeft: '1px solid var(--dash-border)', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Burn rate</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f97316' }}>{formatKr(burnRate)}<span style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)', fontWeight: 400 }}>/mnd</span></div>
          </div>
        </div>
      )}

      {/* Cash flow overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <KpiCard label="Egenkapital"           value={formatKr(money)}             color="#22c55e" icon="💰" />
        <KpiCard label="Total gjeld"           value={formatKr(totalDebt)}         color={totalDebt > 0 ? '#f97316' : 'var(--dash-text-sekundaer)'} icon="🏦" />
        <KpiCard label="Kostnader/mnd"         value={formatKr(fasteMnd)}          color="#f97316" icon="📤" />
        <KpiCard label="Opptjent denne måneden" value={formatKr(opptjentDenneMnd)} color={opptjentDenneMnd >= 0 ? '#22c55e' : '#ef4444'} icon="📈" />
      </div>

      {/* Dagene denne måneden (DEL 1) — faktisk opptjening fra dagssyklusen, med
          enkel projeksjon. Tom liste før første stengte dag. */}
      <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text-sekundaer)' }}>DAGENE DENNE MÅNEDEN</div>
          <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>
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
                    <span style={{ fontSize: 12, color: 'var(--dash-text-dempet)', width: 46, flexShrink: 0 }}>Dag {d.dayNumber}</span>
                    {/* enkel resultat-bar (midtstilt 0) */}
                    <div style={{ flex: 1, height: 14, position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.12)' }} />
                      <div style={{
                        position: 'absolute', left: pos ? '50%' : undefined, right: pos ? undefined : '50%',
                        height: 8, borderRadius: 3, background: pos ? '#22c55e' : '#ef4444',
                        width: `${(Math.abs(d.resultat) / maxAbs) * 48}%`,
                      }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', width: 96, flexShrink: 0, textAlign: 'right' }}>
                      {d.soldStk + d.bakgrunnStk} solgt · {d.svinnStk} svinn
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, width: 78, flexShrink: 0, textAlign: 'right', color: pos ? '#22c55e' : '#ef4444' }}>
                      {pos ? '+' : ''}{formatKr(d.resultat)}
                    </span>
                  </div>
                )
              })
            })()}
            <div style={{ borderTop: '1px solid var(--dash-border)', marginTop: '0.6rem', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Opptjent så langt</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: opptjentDenneMnd >= 0 ? '#22c55e' : '#ef4444' }}>
                {opptjentDenneMnd >= 0 ? '+' : ''}{formatKr(opptjentDenneMnd)}
              </span>
            </div>
            {gjenståendeDager > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--dash-text-sekundaer)', marginTop: '0.3rem' }}>
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
      <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '0.75rem' }}><Fagord id="ECO_013">KONTANTSTRØM</Fagord> (trekkes ved månedsrull)</div>
        {fasteLinjer.map(({ navn, belop }) => (
          <div key={navn} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--dash-text-sekundaer)' }}>{navn}</span>
            <span style={{ color: '#f97316' }}>-{formatKr(belop)}</span>
          </div>
        ))}
        {laanNesteMnd.betaling > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--dash-text-sekundaer)' }}>Lån — <Fagord id="ECO_021">renter</Fagord></span>
              <span style={{ color: '#f97316' }}>-{formatKr(laanNesteMnd.renteSum)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--dash-text-sekundaer)' }}>Lån — avdrag</span>
              <span style={{ color: '#f97316' }}>-{formatKr(laanNesteMnd.avdragSum)}</span>
            </div>
          </>
        )}
        <div style={{ borderTop: '1px solid var(--dash-border)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
          <span>Netto (projisert drift − kostnader)</span>
          <span style={{ color: netFlow >= 0 ? '#22c55e' : '#ef4444' }}>
            {netFlow >= 0 ? '+' : ''}{formatKr(netFlow)}
          </span>
        </div>
      </div>

      {/* Active loans */}
      {loans.length > 0 && (
        <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '0.75rem' }}>AKTIVE LÅN <span style={{ fontWeight: 400 }}>(<Fagord id="ECO_020">gjeld</Fagord>)</span></div>
          {loans.map(loan => (
            <div key={loan.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Lån ({(loan.interestRate * 100).toFixed(0)}% p.a.)</span>
                <span style={{ color: '#f97316' }}>{formatKr(loan.remainingBalance)} gjenstår</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>
                {formatKr(loan.monthlyPayment)}/mnd · {loan.monthsRemaining} måneder igjen
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bank button */}
      <div style={{ background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem' }}>
        <div style={{ fontSize: 24, marginBottom: '0.5rem' }}>🏦</div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: '0.3rem' }}>SpareBank 1</div>
        <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)', marginBottom: '1rem' }}>
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
            padding: '2.5rem', maxWidth: 500, width: '100%', color: 'var(--dash-text)',
            fontFamily: 'inherit',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: '0.5rem', textAlign: 'center' }}>🏦</div>
            <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, margin: '0 0 0.25rem' }}>SpareBank 1 — Lånesøknad</h2>
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--dash-text-sekundaer)', marginBottom: '1.5rem' }}>
              Forretningsplan vurdert: <span style={{ color: '#ffd700' }}>{qStars}</span> · Rente: {(rate * 100).toFixed(0)}% p.a.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)', marginBottom: '0.5rem' }}>LÅNEBELØP (<Fagord id="ECO_020">gjeld</Fagord>)</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {LOAN_AMOUNTS.map(a => (
                  <button key={a} onClick={() => setLoanAmount(a)} style={{
                    flex: 1, minWidth: 100, background: loanAmount === a ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${loanAmount === a ? '#38bdf8' : 'var(--dash-border)'}`,
                    borderRadius: 8, padding: '0.5rem', color: 'var(--dash-text)',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {formatKr(a)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)', marginBottom: '0.5rem' }}><Fagord id="ECO_030">NEDBETALINGSTID</Fagord></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {LOAN_TERMS.map(t => (
                  <button key={t.months} onClick={() => setLoanMonths(t.months)} style={{
                    background: loanMonths === t.months ? 'rgba(56,189,248,0.12)' : 'var(--dash-card-2)',
                    border: `1px solid ${loanMonths === t.months ? '#38bdf8' : 'var(--dash-border)'}`,
                    borderRadius: 8, padding: '0.6rem 1rem', color: 'var(--dash-text)',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text-sekundaer)', marginBottom: '0.75rem' }}>BANKENS TILBUD</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.4rem', fontSize: 14 }}>
                <span style={{ color: 'var(--dash-text-sekundaer)' }}>Månedlig <Fagord id="ECO_029">avdrag</Fagord></span>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>{formatKr(monthly)}</span>
                <span style={{ color: 'var(--dash-text-sekundaer)' }}>Total tilbakebetaling</span>
                <span>{formatKr(totalRepay)}</span>
                <span style={{ color: 'var(--dash-text-sekundaer)' }}>Total <Fagord id="ECO_021">rentekostnad</Fagord></span>
                <span style={{ color: '#f97316' }}>{formatKr(totalInterest)}</span>
              </div>
            </div>

            {q < 3 && (
              <div style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1rem', fontSize: 13, color: '#f97316' }}>
                ⚠️ Banken anbefaler å styrke forretningsplanen for bedre vilkår.
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowBank(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--dash-border)', borderRadius: 99, padding: '0.75rem', color: 'var(--dash-text-dempet)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
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
  color: 'var(--dash-text)', fontSize: 13, fontFamily: 'inherit', textAlign: 'right',
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
    if (k === 'eierlonn') return BALANCE.eierlonnMnd
    if (k === 'husleie') return state.monthlyRent
    if (k === 'markedsforing') return Object.values(state.marketingBudget).reduce((s, v) => s + v, 0)
    if (k === 'laan') return terminbelop
    return null   // salgsinntekter/varekjøp har ingen historikk før første oppgjør
  }

  // Forhåndsutfylte faste linjer eleven ikke skal måtte gjette: lån (terminbeløp)
  // og eierlønn (REKALIBRERING pkt. 35 — ny linje, forhåndsutfylt så den ikke
  // glemmes; redigerbar). Resten fylles av eleven, guidet av «Sist måned».
  const forhandsutfylt = { ...TOM_BUDSJETT, laan: terminbelop, eierlonn: BALANCE.eierlonnMnd }
  const [utkast, setUtkast] = useState<BudsjettTall>(() => lagret?.budsjett ?? forhandsutfylt)
  // Re-seed når måneden ruller (ny key) — les fersk lagret/forhåndsutfylt.
  useEffect(() => {
    setUtkast(state.budsjett.maaneder[key]?.budsjett ?? { ...TOM_BUDSJETT, laan: terminbelop, eierlonn: BALANCE.eierlonnMnd })
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
      <p style={{ color: 'var(--dash-text-dempet)', fontSize: 12.5, margin: '0 0 0.9rem' }}>
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
            <button onClick={ferdigIntro} style={{ background: 'transparent', border: 'none', color: 'var(--dash-text-sekundaer)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Hopp over</button>
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
              <span style={{ flex: 1, fontSize: 13, color: '#cbd5e1' }}>{l.key === 'eierlonn' ? <Fagord id="ECO_035">{l.navn}</Fagord> : l.navn}</span>
              <input
                type="number" inputMode="numeric" value={utkast[l.key] || ''} disabled={laast}
                onChange={e => setUtkast(u => ({ ...u, [l.key]: Math.max(0, Math.round(parseFloat(e.target.value) || 0)) }))}
                placeholder="0" style={{ ...budsjettFelt, opacity: laast ? 0.6 : 1 }} />
              <span style={{ width: 130, flexShrink: 0, fontSize: 11, color: 'var(--dash-text-sekundaer)', textAlign: 'right' }}>
                Sist måned: {sv === null ? 'ingen historikk' : formatKr(sv)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Planlagt resultat (elevens budsjett) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.9rem', paddingTop: '0.7rem', borderTop: '1px solid var(--dash-border)' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>Planlagt resultat</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: planResultat >= 0 ? '#22c55e' : '#ef4444' }}>
          {planResultat >= 0 ? '+' : '−'}{formatKr(Math.abs(planResultat))}
        </span>
      </div>

      {!laast && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: '0.9rem' }}>
          <button onClick={() => dispatch({ type: 'SET_BUDSJETT', maaned: key, budsjett: utkast })}
            disabled={!endret}
            style={{ background: endret ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'var(--dash-border)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: endret ? '#fff' : '#475569', fontWeight: 800, fontSize: 14, cursor: endret ? 'pointer' : 'default', fontFamily: 'inherit' }}>
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

      {/* DEV (?dev=1): rask utfylling + fabrikkert oppgjør med tydelige avvik. */}
      {IS_DEV_COORDS && !laast && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '0.9rem', paddingTop: '0.7rem', borderTop: '1px dashed rgba(168,85,247,0.35)' }}>
          <button onClick={() => {
            const fyll: BudsjettTall = { salgsinntekter: 156_000, varekjop: 55_000, lonn: state.monthlyPayroll || 0, eierlonn: BALANCE.eierlonnMnd, husleie: state.monthlyRent || 45_000, markedsforing: Object.values(state.marketingBudget).reduce((s, v) => s + v, 0) || 5_000, laan: terminbelop }
            setUtkast(fyll); dispatch({ type: 'SET_BUDSJETT', maaned: key, budsjett: fyll })
          }} style={{ background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.5)', borderRadius: 8, padding: '0.4rem 0.8rem', color: '#c084fc', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            ⏩ Fyll budsjett med fornuftige tall
          </button>
          <button onClick={() => dispatch({ type: 'DEV_SIMULER_OPPGJOR' })}
            style={{ background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.5)', borderRadius: 8, padding: '0.4rem 0.8rem', color: '#c084fc', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            ⏩ Simuler månedsslutt med tydelige avvik
          </button>
        </div>
      )}
    </div>
  )
}

// ── TEMA 3: NØKKELTALL (KUN VG2) — elevoppgave i Økonomi-fanen ────────────────
// Tre nøkkeltall som eleven regner SELV (spillet retter aldri underveis). Ved
// månedsoppgjøret vises «ditt tall» vs «bokført» (grønn/rød-modellen ETTERPÅ,
// med fortegn/tekst). Tallene så langt i måneden vokser — regn på nytt mot
// slutten for best treff (poenget er HVILKE tall som går inn i regnestykket).
function nfmt(n: number) { return Math.round(n).toLocaleString('nb-NO') }

function NokkeltallSeksjon() {
  const { state, dispatch } = useGame()
  const aar = state.currentYear, mnd = state.currentMonth
  const key = maanedNokkel(aar, mnd)
  const mdays = state.dayHistory.filter(d => d.month === mnd && d.year === aar)
  const omsetning = Math.round(mdays.reduce((s, d) => s + d.soldKr + d.bakgrunnKr, 0))
  const varekjop = Math.round(mdays.reduce((s, d) => s + d.varekostKr, 0))
  const lagret = state.nokkeltall[key]

  const [utkast, setUtkast] = useState<{ bruttofortjeneste: string; dekningsgrad: string; resultatgrad: string }>(() => ({
    bruttofortjeneste: lagret ? String(lagret.bruttofortjeneste) : '',
    dekningsgrad: lagret ? String(lagret.dekningsgrad) : '',
    resultatgrad: lagret ? String(lagret.resultatgrad) : '',
  }))
  useEffect(() => {
    const l = state.nokkeltall[key]
    setUtkast({ bruttofortjeneste: l ? String(l.bruttofortjeneste) : '', dekningsgrad: l ? String(l.dekningsgrad) : '', resultatgrad: l ? String(l.resultatgrad) : '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  function lagre() {
    const svar: NokkeltallSvar = {
      bruttofortjeneste: parseFloat(utkast.bruttofortjeneste) || 0,
      dekningsgrad: parseFloat(utkast.dekningsgrad) || 0,
      resultatgrad: parseFloat(utkast.resultatgrad) || 0,
    }
    dispatch({ type: 'SET_NOKKELTALL_SVAR', maaned: key, svar })
  }
  const kanLagre = utkast.bruttofortjeneste !== '' || utkast.dekningsgrad !== '' || utkast.resultatgrad !== ''

  const felt: React.CSSProperties = { width: 110, boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.4rem 0.55rem', color: 'var(--dash-text)', fontSize: 13, fontFamily: 'inherit', textAlign: 'right' }
  const rader: { label: React.ReactNode; formel: React.ReactNode; key: 'bruttofortjeneste' | 'dekningsgrad' | 'resultatgrad'; enhet: string }[] = [
    { key: 'bruttofortjeneste', enhet: 'kr', label: <Fagord id="ECO_022">Bruttofortjeneste</Fagord>,
      formel: <>Omsetning − Varekjøp = {nfmt(omsetning)} − {nfmt(varekjop)} = ?</> },
    { key: 'dekningsgrad', enhet: '%', label: <Fagord id="ECO_002">Dekningsgrad</Fagord>,
      formel: <>Bruttofortjeneste / Omsetning × 100 (bruk ditt svar over / {nfmt(omsetning)} × 100)</> },
    { key: 'resultatgrad', enhet: '%', label: <Fagord id="ECO_033">Resultatgrad</Fagord>,
      formel: <>Månedsresultat / Omsetning × 100</> },
  ]

  return (
    <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '1rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>🔢 Nøkkeltall — regn selv <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>VG2</span></div>
      <p style={{ color: 'var(--dash-text-dempet)', fontSize: 12.5, margin: '0 0 0.4rem' }}>
        Regn ut nøkkeltallene fra tallene så langt i {MND_FULL[mnd - 1]}, og tast svaret ditt. Spillet retter ikke — ved månedsoppgjøret sammenligner vi ditt tall med det bokførte.
      </p>
      <div style={{ fontSize: 11.5, color: '#cbd5e1', background: 'var(--dash-card-2)', borderRadius: 8, padding: '0.45rem 0.7rem', marginBottom: '0.9rem' }}>
        Så langt denne måneden: <strong>Omsetning {nfmt(omsetning)} kr</strong> · <strong>Varekjøp {nfmt(varekjop)} kr</strong> · <strong>Resultat {nfmt(mdays.reduce((s, d) => s + d.resultat, 0))} kr</strong> <span style={{ color: 'var(--dash-text-sekundaer)' }}>(vokser utover måneden)</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {rader.map(r => (
          <div key={r.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: 'var(--dash-text)' }}>{r.label} <span style={{ color: 'var(--dash-text-sekundaer)', fontWeight: 400 }}>({r.enhet})</span></span>
              <input type="number" inputMode="decimal" value={utkast[r.key]} placeholder="?"
                onChange={e => setUtkast(u => ({ ...u, [r.key]: e.target.value }))} style={felt} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--dash-text-dempet)', marginTop: 2, fontFamily: 'monospace' }}>{r.formel}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: '0.9rem' }}>
        <button onClick={lagre} disabled={!kanLagre}
          style={{ background: kanLagre ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'var(--dash-border)', border: 'none', borderRadius: 99, padding: '0.55rem 1.4rem', color: kanLagre ? '#fff' : '#475569', fontWeight: 800, fontSize: 13.5, cursor: kanLagre ? 'pointer' : 'default', fontFamily: 'inherit' }}>
          Lagre svar
        </button>
        {lagret && <span style={{ fontSize: 12.5, fontWeight: 700, color: '#22c55e' }}>✓ Lagret — sammenlignes ved oppgjøret</span>}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '1rem' }}>
        {NOKKELTALL_HUB.map(h => (
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
        <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0 0 1.5rem' }}>
          Du driver netthandel — du trenger ikke fysisk butikk, men du trenger en plattform og lager.
        </p>
        <div style={{ background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>💻</div>
          <div style={{ fontWeight: 700 }}>Nettbutikk aktiv</div>
          <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)', marginTop: '0.3rem' }}>
            Salgskanal: Netthandel · Kapasitet: 200 enheter
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 0.5rem' }}>Fysisk Lokasjon</h3>
      <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0 0 1.5rem' }}>
        Finn et lokale i bykartet for å starte butikken.
      </p>

      {rentedLocationId ? (
        <div style={{ background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '1rem', padding: '1.25rem' }}>
          <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>🏪</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{state.companyName}</div>
          <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)', marginTop: '0.4rem' }}>
            {zoneLabel[locationZone ?? ''] ?? locationZone} · {formatKr(monthlyRent)}/mnd
          </div>
          <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)' }}>
            Lagringskapasitet: {storageCapacity} enheter
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--dash-card)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: 48, marginBottom: '1rem' }}>🗺️</div>
          <p style={{ fontSize: 15, color: 'var(--dash-text-dempet)', marginBottom: '1.5rem' }}>
            Ingen lokasjon valgt ennå. Gå ut i bykartet og finn et "TIL LEIE"-skilt.
          </p>
          <div style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)' }}>Lukk dashboardet for å utforske byen</div>
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
  // KROK 4 (UX): transient «✓ Bestilt»-kvittering per vare.
  const [sistBestilt, setSistBestilt] = useState<{ id: string; qty: number } | null>(null)
  const bestiltTimer = useRef<number>(0)
  // DEL 4 — ENDRE/ANGRE bestilling: hvilken vare redigeres, forhåndsutfylt antall,
  // og en transient «Bestilling kansellert»-kvittering.
  const [redigerer, setRedigerer] = useState<string | null>(null)
  const [redigerQty, setRedigerQty] = useState<number>(0)
  const [kansellertId, setKansellertId] = useState<string | null>(null)
  const kansellertTimer = useRef<number>(0)

  function startEndre(id: string, n: number) { setRedigerer(id); setRedigerQty(n) }
  function lagreEndring(id: string) {
    dispatch({ type: 'EDIT_ORDER', productId: id, quantity: redigerQty })
    if (redigerQty <= 0) {
      setKansellertId(id)
      window.clearTimeout(kansellertTimer.current)
      kansellertTimer.current = window.setTimeout(() => setKansellertId(k => k === id ? null : k), 2600)
    }
    setRedigerer(null)
  }

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
    // KROK 4: kvittér — kort kvittering + pling, ordrelinja under vises umiddelbart.
    kassePling()
    setSistBestilt({ id, qty })
    window.clearTimeout(bestiltTimer.current)
    bestiltTimer.current = window.setTimeout(() => setSistBestilt(null), 2600)
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
        <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>
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
                background: isMain ? 'rgba(255,215,0,0.08)' : 'var(--dash-card)',
                border: isMain ? '1px solid rgba(255,215,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '0.5rem 0.7rem',
              }}>
                <span style={{ fontSize: 16 }}>{p.icon}</span>
                <span style={{ fontWeight: 700, color: 'var(--dash-text)', fontSize: 12 }}>{isMain && '⭐ '}{p.name}</span>
                <span style={{ color: '#00d4aa', fontSize: 12 }}>{p.stock} stk</span>
                <span style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>· Kostpris: {formatKr(p.costPrice)}</span>

                <button
                  onClick={() => dispatch({ type: 'SET_MAIN_PRODUCT', id: p.id })}
                  title={isMain ? 'Fjern som hovedprodukt' : 'Vises størst i butikkvinduet'}
                  style={{
                    marginLeft: 'auto',
                    background: isMain ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${isMain ? '#ffd70066' : 'rgba(255,255,255,0.15)'}`,
                    borderRadius: 6, padding: '1px 7px', fontSize: 10, fontWeight: 700,
                    color: isMain ? '#ffd700' : 'var(--dash-text-dempet)', cursor: 'pointer', fontFamily: 'inherit',
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
                background: 'var(--dash-card)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '0.5rem 0.7rem',
              }}>
                <span style={{ fontWeight: 700, color: 'var(--dash-text)', fontSize: 12 }}>{productName(o.productId)}</span>
                <span style={{ color: '#7dd3fc', fontSize: 12 }}>{o.qty} stk</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--dash-text-dempet)' }}>
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
          // DEL 3 — LØPENDE BESTILLINGSSTATUS: sum av alle uleverte ordrer for varen
          // (levering neste morgen, leveringstid 1 dag). Oppdateres umiddelbart ved
          // nytt «Bestill»-klikk (merges reducer-side per vare+ankomstdag).
          const iBestilling = state.incomingOrders.filter(o => o.productId === item.id).reduce((a, o) => a + o.qty, 0)
          // DEL 4 — REDIGERBART antall = uleverte ordre lagt SAMME dag (endres/angres
          // før dagstart-levering). Med leadTime 1 er dette hele iBestilling.
          const redigerbarQty = state.incomingOrders.filter(o => o.productId === item.id && o.bestiltDag === state.dayNumber).reduce((a, o) => a + o.qty, 0)

          return (
            <div key={item.id} style={{
              background: gikkTom ? 'rgba(248,113,113,0.07)' : 'var(--dash-card)',
              border: gikkTom ? '1px solid rgba(248,113,113,0.45)' : '1px solid var(--dash-border)',
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
                    {iBestilling > 0 && (
                      <span style={{
                        background: 'rgba(59,130,246,0.16)', border: '1px solid rgba(59,130,246,0.5)',
                        borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 800, color: '#93c5fd',
                      }}>
                        I bestilling
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#475569' }}>Maks etterspørsel: {item.maxDemandPerMonth} stk/mnd</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>Innkjøp: {formatKr(item.costPrice)}</div>
                </div>
              </div>

              {/* Order row */}
              <div style={{
                display: 'flex', gap: '0.75rem', alignItems: 'center',
                background: 'var(--dash-card-2)', borderRadius: '0.75rem', padding: '0.75rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 4 }}>Antall å bestille</div>
                  <input
                    data-testid={`qty-${item.id}`}
                    type="number" min={1} max={500} value={qty}
                    onChange={e => setQty(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: '100%', background: 'var(--dash-border)',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                      padding: '6px 10px', color: 'var(--dash-text)', fontSize: 14, fontFamily: 'inherit',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'center', minWidth: 80 }}>
                  <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: 2 }}>Totalkostnad</div>
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
                      : 'var(--dash-border)',
                    border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem',
                    color: canAfford ? '#fff' : '#475569',
                    fontWeight: 700, fontSize: 14, cursor: canAfford ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit', whiteSpace: 'nowrap',
                  }}
                >
                  {/* DEL 3: knappen er alltid «Bestill» — etter klikk en KORT
                      kvittering («+N lagt til») i ~2 s, så tilbake. Den varige
                      totalen bæres av «I bestilling»-linja under. */}
                  {sistBestilt?.id === item.id ? `+${sistBestilt.qty} lagt til` : canAfford ? '📦 Bestill' : '💸 Ikke råd'}
                </button>
              </div>
              {/* DEL 3 — LØPENDE BESTILLINGSSTATUS (varig linje mens N > 0).
                  DEL 4 — [Endre] åpner en inline-redigering (kun FØR levering: ordre
                  lagt i dag, redigerbarQty > 0). Lagre erstatter ordren; 0 = kanseller. */}
              {iBestilling > 0 && redigerer !== item.id && (
                <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: '#93c5fd', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }} data-testid={`ibestilling-${item.id}`}>
                  <span>📦</span>
                  <span>I bestilling: {iBestilling} stk — levering i morgen</span>
                  {redigerbarQty > 0 && (
                    <button
                      data-testid={`endre-bestilling-${item.id}`}
                      onClick={() => startEndre(item.id, redigerbarQty)}
                      style={{
                        background: 'rgba(59,130,246,0.16)', border: '1px solid rgba(59,130,246,0.5)',
                        borderRadius: 6, padding: '2px 10px', color: '#bfdbfe', fontSize: 12, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >✏️ Endre</button>
                  )}
                </div>
              )}
              {redigerer === item.id && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#93c5fd' }}>📦 Nytt antall:</span>
                  <input
                    data-testid={`endre-qty-${item.id}`}
                    type="number" min={0} max={500} value={redigerQty}
                    onChange={e => setRedigerQty(Math.max(0, parseInt(e.target.value) || 0))}
                    style={{
                      width: 84, background: 'var(--dash-border)', border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 6, padding: '5px 9px', color: 'var(--dash-text)', fontSize: 14, fontFamily: 'inherit',
                    }}
                  />
                  <button
                    data-testid={`lagre-endring-${item.id}`}
                    onClick={() => lagreEndring(item.id)}
                    style={{
                      background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 6,
                      padding: '5px 14px', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >Lagre</button>
                  <button
                    onClick={() => setRedigerer(null)}
                    style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
                      padding: '5px 12px', color: 'var(--dash-text-dempet)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >Avbryt</button>
                  <span style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>0 = kanseller bestillingen</span>
                </div>
              )}
              {kansellertId === item.id && (
                <div data-testid={`kansellert-${item.id}`} style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: 'var(--dash-text-dempet)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>✓</span><span>Bestilling kansellert</span>
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

/** Konkurrentpris-intervall for markedsundersøkelsen (DEL 3) — avledet av
 *  markedsPris ± 15 %, en REN funksjon (ikke Math.random) så den er stabil per
 *  vare og ved hver re-render. markedsPris vises ALDRI som «veiledende pris»
 *  (ingen fasit for egen pris) — kun dette avledede konkurrentintervallet, og
 *  kun etter kjøpt undersøkelse. */
function competitorRange(markedsPris: number): { low: number; high: number } {
  return {
    low: Math.round(markedsPris * 0.85),
    high: Math.round(markedsPris * 1.15),
  }
}

// DEL 4 — utkast-type for Målgruppe (targetAudience er en inline-type i types.ts).
type MalgruppeUtkast = { geography: string | null; genders: string[]; ageGroups: string[]; psychographics: string[] }

// DEL 4 — DELT LAGRE-LINJE (Priser + Målgruppe). Aldri bare farge — alltid tekst:
// «Ulagrede endringer» når noe er endret, «Lagret ✓» i ~2 s etter lagring, og en
// VARIG «Sist lagret kl. HH:MM (spilltid)» når det finnes en lagring.
function LagreBar({ label, dirty, nyligLagret, lagretMin, onSave }: {
  label: string; dirty: boolean; nyligLagret: boolean; lagretMin: number | null; onSave: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {dirty && <span style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>● Ulagrede endringer</span>}
        <button onClick={onSave} style={{
          background: nyligLagret ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg,#00d4aa,#0d9488)',
          border: nyligLagret ? '1px solid rgba(34,197,94,0.6)' : 'none', borderRadius: 99, padding: '0.6rem 1.5rem',
          color: nyligLagret ? '#4ade80' : '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
        }}>
          {nyligLagret ? 'Lagret ✓' : label}
        </button>
      </div>
      {lagretMin != null && (
        <span style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>Sist lagret kl. {hhmm(BALANCE.klokke.apneMinutt + lagretMin)} (spilltid)</span>
      )}
    </div>
  )
}

function PriserTab({ utkast, setUtkast, lagretMin, setLagretMin }: {
  utkast: Product[] | null
  setUtkast: (p: Product[] | null) => void
  lagretMin: number | null
  setLagretMin: (m: number) => void
}) {
  const { state, dispatch } = useGame()
  // Arbeidslista: elevens utkast hvis hen har begynt å redigere, ellers en fersk
  // kopi av lagret state. Utkastet ligger i PARENT → overlever fanebytte (DEL 4).
  const products = utkast ?? state.products.map(p => ({ ...p }))
  // Ulagret = utkast finnes OG minst én pris avviker fra lagret state.
  const dirty = utkast != null && products.some(p => {
    const lagret = state.products.find(s => s.id === p.id)
    return !lagret || lagret.retailPrice !== p.retailPrice
  })
  // Transient «Lagret ✓» (lokal — forsvinner ved fanebytte, det er greit).
  const [nyligLagret, setNyligLagret] = useState(false)
  const lagretTimer = useRef<number>(0)

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', color: '#475569', padding: '3rem' }}>Ingen produkter bestilt. Gå til Produkter-fanen.</div>
  }

  function setPrice(id: string, price: number) {
    setUtkast(products.map(p => p.id === id ? { ...p, retailPrice: Math.max(0, price) } : p))
  }

  function save() {
    // PRISLAGRING: merge KUN retailPrice inn i gjeldende state (SAVE_RETAIL_PRICES),
    // ALDRI wholesale replace — utkastet kan bære stale lager (DashboardOverlay er
    // alltid montert, så utkastet overlever dashbord-lukking/dagsskifter). Replace
    // ville spolt lageret tilbake og tømt disken. Se reduceren for detaljer.
    dispatch({ type: 'SAVE_RETAIL_PRICES', products })
    setUtkast(null)                 // synk tilbake til (nå lagret) state
    setLagretMin(state.dayMinute)
    setNyligLagret(true)
    window.clearTimeout(lagretTimer.current)
    lagretTimer.current = window.setTimeout(() => setNyligLagret(false), 2000)
  }

  const researchedIds = new Set(state.priceResearch.purchasedProductIds)
  const allResearched = products.every(p => researchedIds.has(p.id))
  const lagreBar = <LagreBar label="Lagre priser" dirty={dirty} nyligLagret={nyligLagret} lagretMin={lagretMin} onSave={save} />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Prissetting</h3>
          <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>Sett <Fagord id="ECO_031">utsalgspris</Fagord> per produkt</p>
        </div>
        {lagreBar}
      </div>

      {/* LÆRINGSLAGET — prissettingsstrategier (klikkbare fagord). Ikke en fasit;
          spilleren velger selv hvordan prisen settes. */}
      <div style={{
        background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.18)',
        borderRadius: '0.75rem', padding: '0.7rem 1rem', marginBottom: '1rem',
        fontSize: 12.5, color: 'var(--dash-text-dempet)', lineHeight: 1.7,
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
        <p style={{ color: 'var(--dash-text-dempet)', fontSize: 12, margin: 0 }}>
          📊 Se hva konkurrenter i nærheten tar for lignende varer — gjelder varene du har ført NÅ.
        </p>
        <button
          onClick={() => dispatch({ type: 'BUY_PRICE_RESEARCH' })}
          disabled={state.money < 2_500}
          title={allResearched ? 'Kjøp på nytt for å dekke nyere varer' : undefined}
          style={{
            background: state.money >= 2_500 ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${state.money >= 2_500 ? 'rgba(56,189,248,0.4)' : 'var(--dash-border)'}`,
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
          const range = competitorRange(p.markedsPris)
          return (
            <div key={p.id} style={{ background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)', borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}><Fagord id="ECO_006">Innkjøp</Fagord>: {formatKr(p.costPrice)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <input
                    data-testid={`pris-${p.id}`}
                    type="number" min={0} step={1} value={p.retailPrice || ''} placeholder="sett pris"
                    onChange={e => setPrice(p.id, parseInt(e.target.value) || 0)}
                    style={{
                      width: 100, textAlign: 'right', background: 'var(--dash-border)',
                      border: `1px solid ${p.retailPrice > 0 ? 'rgba(255,255,255,0.18)' : 'rgba(245,158,11,0.6)'}`, borderRadius: 6,
                      padding: '4px 8px', color: '#38bdf8', fontSize: 18, fontWeight: 800, fontFamily: 'inherit',
                    }}
                  /> <span style={{ fontSize: 13, color: 'var(--dash-text-sekundaer)' }}>kr</span>
                  <div style={{ fontSize: 12, fontWeight: 700, color: mgColor }}><Fagord id="ECO_002">Margin</Fagord>: {p.retailPrice > 0 ? `${mg}%` : '—'}</div>
                </div>
              </div>

              {p.retailPrice <= 0 && (
                <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: '0.5rem' }}>
                  ⚠ Mangler pris — varen selges ikke før du har satt en utsalgspris.
                </div>
              )}
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

      {/* DEL 4 — lagre-knapp OGSÅ nederst (lista er lang); speiler samme tilstand
          som knappen øverst. */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
        {lagreBar}
      </div>
    </div>
  )
}

// ── Distribusjon (now 'markedsforing' handles old distribusjon, we keep it under markedsforing) ──
// Actually we keep distribusjon hidden — markedsforing tab includes everything
// Let's preserve markedsforing as before and just not show distribusjon as a tab

// ── Markedsføring ─────────────────────────────────────────────────────────────

type BudgetKey = string

// DEL D: LØPENDE synlighet bruker de SAMME 6 navngitte kanalene som kampanjen
// (erstatter Sosiale medier/Google/Influencer/Trykt reklame/TV-Radio). Mapping
// gammel→ny er dokumentert i rapporten (budsjett persisteres ikke → ingen
// runtime-migrering nødvendig).
const MARKETING_CHANNELS: { key: BudgetKey; label: string; emoji: string }[] =
  KANALER.map(k => ({ key: k.id, label: k.navn, emoji: k.emoji }))

const CHANNEL_INFO: Record<DistributionChannel, { label: string; emoji: string; cost: number; desc: string; requiresLevel?: number }> = {
  physicalStore:  { label: 'Fysisk butikk',    emoji: '🏪', cost: 0,     desc: 'Din faste butikk. Alltid aktiv.' },
  webShop:        { label: 'Nettbutikk',        emoji: '🌐', cost: 2500,  desc: '×1.5 rekkevidde. Krever Nivå 7.', requiresLevel: 7 },
  instagramShop:  { label: 'Instagram Shop',    emoji: '📸', cost: 1200,  desc: '×1.3 rekkevidde. 12% gebyr.' },
  delivery:       { label: 'Hjemlevering',      emoji: '🚚', cost: 800,   desc: '×1.4 rekkevidde. 30% gebyr. Kun kafé.' },
  wholesale:      { label: 'Engros / B2B',      emoji: '📦', cost: 500,   desc: '×1.6 rekkevidde. 40% lavere margin. Krever Nivå 9.', requiresLevel: 9 },
}

// ── TEMA 8: KAMPANJEPLANLEGGER (Markedsføring-fanen, når temaet er aktivt) ────
// Én skjerm, fire valg (mål/målgruppe/kanal+budsjett/varighet) + VG1 markedsplan
// (situasjon) + valgfri salgskampanje. Kanal×segment-TREFFET vises ALDRI her —
// eleven må resonnere fra hub-tabellen (📚-lenke). Én aktiv kampanje om gangen.
const kampFelt: React.CSSProperties = {
  boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8, padding: '0.35rem 0.5rem', color: 'var(--dash-text)', fontSize: 13, fontFamily: 'inherit',
}

function KampanjeSeksjon() {
  const { state, dispatch } = useGame()
  const nivaa = useTemaNivaa('kampanje') ?? 'vg1'
  const aktiv = state.kampanje.aktiv

  const [maalType, setMaalType] = useState<'kunder' | 'salg'>('kunder')
  const [maalProsent, setMaalProsent] = useState(20)
  const [segmenter, setSegmenter] = useState<string[]>(() => [...state.targetAudience.ageGroups])
  const [kanaler, setKanaler] = useState<KampanjeKanalValg[]>([])
  const [varighet, setVarighet] = useState(5)
  const [situasjon, setSituasjon] = useState('')
  const [salgOn, setSalgOn] = useState(false)
  const [salgsvarer, setSalgsvarer] = useState<{ productId: string; nyPris: number }[]>([])
  const [introStep, setIntroStep] = useState<number | null>(() => { try { return localStorage.getItem('kampanje_intro_v1') === '1' ? null : 0 } catch { return 0 } })
  function ferdigIntro() { try { localStorage.setItem('kampanje_intro_v1', '1') } catch { /* ignore */ } setIntroStep(null) }
  const KAMP_INTRO: React.ReactNode[] = [
    <>En <Fagord id="MKT_051">kampanje</Fagord> er et tidsavgrenset markedsstøt mot et mål. Start med å tallfeste målet ditt — hvor mye vil du øke kundene eller salget?</>,
    <>Velg kanal etter hvor <Fagord id="MKT_021">målgruppa</Fagord> di faktisk er. Bruk 📚 «Hvem bruker hvilke medier?» før du velger — en kanal med stor <Fagord id="MKT_052">rekkevidde</Fagord> totalt kan likevel bomme på DIN gruppe.</>,
    <>Sett budsjett og varighet, og start. Når kampanjen er ferdig får du en effektrapport — vi evaluerer ETTERPÅ, aldri underveis.</>,
  ]

  const kostnad = kampanjeKostnad(kanaler, varighet)
  const prisedeVarer = state.products.filter(p => p.retailPrice > 0)

  function toggleSegment(a: string) { setSegmenter(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]) }
  function toggleKanal(id: string) {
    setKanaler(prev => prev.some(k => k.kanalId === id) ? prev.filter(k => k.kanalId !== id)
      : [...prev, { kanalId: id, krPerDag: kanalDagspris(id) }])   // 1–6 kanaler, ingen tak
  }
  function setKr(id: string, kr: number) { setKanaler(prev => prev.map(k => k.kanalId === id ? { ...k, krPerDag: Math.max(kanalDagspris(id), Math.round(kr)) } : k)) }
  function toggleSalgsvare(id: string, ordinaer: number) {
    setSalgsvarer(prev => prev.some(v => v.productId === id) ? prev.filter(v => v.productId !== id)
      : prev.length >= 3 ? prev : [...prev, { productId: id, nyPris: Math.round(ordinaer * 0.8) }])
  }
  function setNyPris(id: string, pris: number) { setSalgsvarer(prev => prev.map(v => v.productId === id ? { ...v, nyPris: Math.max(0, Math.round(pris)) } : v)) }

  const kanStarte = kanaler.length >= 1 && maalProsent > 0 && varighet >= 3 && varighet <= 7 && state.money >= kostnad
  function start() {
    if (!kanStarte) return
    dispatch({ type: 'START_KAMPANJE', kampanje: {
      maalType, maalProsent, segmenter, kanaler, varighet, situasjon,
      salgsvarer: salgOn ? salgsvarer.filter(v => v.nyPris > 0) : [],
    } })
  }

  const kort: React.CSSProperties = { background: 'var(--dash-card)', border: '1px solid var(--dash-border)', borderRadius: 10, padding: '0.7rem 0.85rem', marginBottom: '0.7rem' }

  // ── Aktiv kampanje: status (ingen ny planlegging før den er ferdig) ──
  if (aktiv) {
    const igjen = aktiv.varighet - aktiv.dagerKjort
    return (
      <div style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '1rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>📣 Kampanje pågår</div>
        <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 0.6rem' }}>
          Dag {aktiv.dagerKjort} av {aktiv.varighet} — {igjen} {igjen === 1 ? 'dag' : 'dager'} igjen. Steng dagene for å fullføre; da kommer effektrapporten.
        </p>
        <div style={{ fontSize: 12.5, color: 'var(--dash-text-dempet)' }}>
          Mål: øke {aktiv.maalType === 'kunder' ? 'antall kunder' : 'salget'} med {aktiv.maalProsent} % ·
          Kanaler: {aktiv.kanaler.map(k => kanalById(k.kanalId)?.navn ?? k.kanalId).join(', ')} ·
          Budsjett: {formatKr(aktiv.kanaler.reduce((s, k) => s + k.krPerDag, 0))}/dag
          {aktiv.salgsvarer.length > 0 && ` · Salgskampanje på ${aktiv.salgsvarer.length} vare(r)`}
        </div>
        {/* 📄 Din markedsplan — auto-oppsummering (synlig etter kampanjestart). */}
        <div style={{ marginTop: '0.9rem' }}>
          <MarkedsplanOppsummering
            situasjon={aktiv.situasjon} maalType={aktiv.maalType} maalProsent={aktiv.maalProsent}
            segmenter={aktiv.segmenter} kanaler={aktiv.kanaler} varighet={aktiv.varighet}
            evaluering={<span style={{ color: 'var(--dash-text-dempet)' }}>Kommer i effektrapporten når kampanjen er ferdig.</span>} />
        </div>
        {IS_DEV_COORDS && (
          <button onClick={() => dispatch({ type: 'DEV_SPOL_KAMPANJE' })}
            style={{ marginTop: 10, background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.5)', borderRadius: 8, padding: '0.4rem 0.8rem', color: '#c084fc', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            ⏩ Spol til kampanjeslutt
          </button>
        )}
      </div>
    )
  }

  // ── Planlegger ──
  return (
    <div style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.28)', borderRadius: '1rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>📣 Kampanje — planlegg</div>
      <p style={{ color: 'var(--dash-text-dempet)', fontSize: 12.5, margin: '0 0 0.9rem' }}>
        Sett et mål, velg målgruppe, kanal og periode. Effekten avhenger av om kanalen når målgruppa di — sjekk kildene før du velger.
      </p>

      {/* 3-stegs guidet intro (intro-modellen) — første gang, kan hoppes over. */}
      {introStep !== null && (
        <div style={{ background: 'rgba(12,17,29,0.7)', border: '1px solid rgba(0,212,170,0.4)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.09em', marginBottom: 6 }}>ESPEN</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#e2e8f0', minHeight: 44 }}>{KAMP_INTRO[introStep]}</div>
          <div style={{ display: 'flex', gap: 5, margin: '10px 0 2px' }}>
            {KAMP_INTRO.map((_, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: i === introStep ? '#00d4aa' : 'rgba(255,255,255,0.22)' }} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <button onClick={ferdigIntro} style={{ background: 'transparent', border: 'none', color: 'var(--dash-text-sekundaer)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Hopp over</button>
            <button onClick={() => introStep < KAMP_INTRO.length - 1 ? setIntroStep(introStep + 1) : ferdigIntro()}
              style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.45rem 1.2rem', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              {introStep < KAMP_INTRO.length - 1 ? 'Neste →' : 'Kom i gang!'}
            </button>
          </div>
        </div>
      )}

      {/* a) MÅL (SMART-light) */}
      <div style={kort}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>1 · MÅL</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontSize: 13, color: '#cbd5e1' }}>
          <span>Jeg vil øke</span>
          <select value={maalType} onChange={e => setMaalType(e.target.value as 'kunder' | 'salg')} style={{ ...kampFelt, cursor: 'pointer' }}>
            <option value="kunder" style={{ background: '#0c111d' }}>antall kunder</option>
            <option value="salg" style={{ background: '#0c111d' }}>salget</option>
          </select>
          <span>med</span>
          <input type="number" min={1} max={200} value={maalProsent} onChange={e => setMaalProsent(Math.max(0, Math.round(parseFloat(e.target.value) || 0)))} style={{ ...kampFelt, width: 64, textAlign: 'right' }} />
          <span>% i løpet av kampanjen.</span>
        </div>
      </div>

      {/* b) MÅLGRUPPE */}
      <div style={kort}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>2 · MÅLGRUPPE (aldersgrupper)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {AGE_GROUPS.map(a => {
            const på = segmenter.includes(a)
            return (
              <button key={a} onClick={() => toggleSegment(a)} style={{
                background: på ? 'rgba(0,212,170,0.15)' : 'var(--dash-card-2)', border: `1px solid ${på ? '#00d4aa' : 'var(--dash-border)'}`,
                borderRadius: 99, padding: '0.3rem 0.9rem', color: på ? '#00d4aa' : 'var(--dash-text-dempet)', fontSize: 12.5, fontWeight: på ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit',
              }}>{a}</button>
            )
          })}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--dash-text-sekundaer)', marginTop: 5 }}>Forhåndsvalgt fra Målgruppe-fanen — juster om kampanjen retter seg mot en annen gruppe.</div>
      </div>

      {/* c) KANAL + DAGSBUDSJETT */}
      <div style={kort}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>3 · KANAL + DAGSBUDSJETT (velg 1–6)</div>
        {/* Kilde-callout — tydelig knapp (ikke liten lenketekst). */}
        <a href={KOMMUNIKASJONSKANALER_RUTE} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.55)', borderRadius: 10, padding: '0.55rem 0.8rem', color: '#c084fc', fontSize: 12.5, fontWeight: 800, textDecoration: 'none' }}>
          <span style={{ fontSize: 16 }}>🧠</span>
          <span style={{ flex: 1 }}>Hvem bruker hvilke medier? <span style={{ fontWeight: 400, color: 'var(--dash-text-dempet)' }}>— sjekk før du velger kanal</span></span>
          <span>↗</span>
        </a>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {KANALER.map(k => {
            const valgt = kanaler.find(v => v.kanalId === k.id)
            return (
              <div key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => toggleKanal(k.id)} style={{
                  flex: 1, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'inherit',
                  background: valgt ? 'rgba(0,212,170,0.1)' : 'var(--dash-card-2)', border: `1px solid ${valgt ? '#00d4aa' : 'var(--dash-border)'}`,
                  borderRadius: 8, padding: '0.4rem 0.6rem',
                }}>
                  <span style={{ fontSize: 16 }}>{k.emoji}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: 'var(--dash-text)' }}>{k.navn}</span>
                  {!k.ekte && <span style={{ fontSize: 9.5, color: '#f59e0b', fontStyle: 'italic' }}>fiktivt medium</span>}
                  <span style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>fra {formatKr(kanalDagspris(k.id))}/dag</span>
                </button>
                {valgt && (
                  <input type="number" min={kanalDagspris(k.id)} step={100} value={valgt.krPerDag} onChange={e => setKr(k.id, parseFloat(e.target.value) || 0)}
                    title="kr/dag" style={{ ...kampFelt, width: 90, textAlign: 'right' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* d) VARIGHET */}
      <div style={kort}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>4 · VARIGHET</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="range" min={3} max={7} step={1} value={varighet} onChange={e => setVarighet(parseInt(e.target.value))} style={{ flex: 1, accentColor: '#a855f7' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--dash-text)', width: 60 }}>{varighet} dager</span>
        </div>
      </div>

      {/* VG1 markedsplan: situasjonen nå */}
      <div style={kort}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#c084fc', marginBottom: 6 }}>SITUASJONSANALYSE (kort)</div>
        <textarea rows={2} value={situasjon} onChange={e => setSituasjon(e.target.value)}
          placeholder="Beskriv kort situasjonen (2–3 setninger): hva vil du oppnå, og hvorfor akkurat nå?"
          style={{ ...kampFelt, width: '100%', resize: 'vertical' }} />
      </div>

      {/* Salgskampanje (valgfri) */}
      <div style={kort}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12.5, fontWeight: 800, color: '#c084fc' }}>
          <input type="checkbox" checked={salgOn} onChange={e => setSalgOn(e.target.checked)} />
          SALGSKAMPANJE — sett ned prisen på inntil 3 varer
        </label>
        {salgOn && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {prisedeVarer.length === 0 && <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>Ingen prisede varer ennå.</div>}
            {prisedeVarer.map(p => {
              const valgt = salgsvarer.find(v => v.productId === p.id)
              return (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => toggleSalgsvare(p.id, p.retailPrice)} style={{ flex: 1, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', background: valgt ? 'rgba(0,212,170,0.1)' : 'var(--dash-card-2)', border: `1px solid ${valgt ? '#00d4aa' : 'var(--dash-border)'}`, borderRadius: 8, padding: '0.35rem 0.6rem', color: 'var(--dash-text)', fontSize: 12.5 }}>
                    {p.icon} {p.name} <span style={{ color: 'var(--dash-text-sekundaer)' }}>· ord. {formatKr(p.retailPrice)}</span>
                  </button>
                  {valgt && <input type="number" min={0} value={valgt.nyPris} onChange={e => setNyPris(p.id, parseFloat(e.target.value) || 0)} title="ny pris" style={{ ...kampFelt, width: 90, textAlign: 'right' }} />}
                </div>
              )
            })}
            <div style={{ fontSize: 10.5, color: 'var(--dash-text-sekundaer)', marginTop: 2 }}>⚖️ <Fagord id="MKT_054">Førpris</Fagord>-regelen: en vare må ha hatt ordinær pris i minst 2 uker før du kan sette den ned. Brudd gir tilsynsbrev etter kampanjen.</div>
          </div>
        )}
      </div>

      {/* Total + start */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <div style={{ fontSize: 13 }}>Total kampanjekostnad: <strong style={{ color: '#f97316' }}>{formatKr(kostnad)}</strong> <span style={{ color: 'var(--dash-text-sekundaer)', fontSize: 11 }}>({formatKr(kanaler.reduce((s, k) => s + k.krPerDag, 0))}/dag × {varighet})</span></div>
        <button onClick={start} disabled={!kanStarte}
          style={{ background: kanStarte ? 'linear-gradient(135deg,#a855f7,#7c3aed)' : 'var(--dash-border)', border: 'none', borderRadius: 99, padding: '0.65rem 1.6rem', color: kanStarte ? '#fff' : '#475569', fontWeight: 800, fontSize: 14, cursor: kanStarte ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
          Start kampanje
        </button>
      </div>
      {!kanStarte && kanaler.length >= 1 && state.money < kostnad && <div style={{ fontSize: 11, color: '#ef4444', textAlign: 'right', marginTop: 4 }}>Ikke råd ({formatKr(kostnad)} &gt; {formatKr(state.money)})</div>}

      {/* 📚 hub-lenker */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '0.9rem' }}>
        {KAMPANJE_HUB[nivaa].map(h => (
          <a key={h.rute} href={h.rute} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '0.35rem 0.8rem', color: '#c084fc', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>📚 {h.navn} ↗</a>
        ))}
      </div>

      {/* DEV (?dev=1): fyll planleggeren med en eksempelkampanje. */}
      {IS_DEV_COORDS && (
        <div style={{ marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px dashed rgba(168,85,247,0.35)' }}>
          <button onClick={() => {
            setMaalType('kunder'); setMaalProsent(20)
            setSegmenter(prev => prev.length ? prev : ['21-30'])
            setKanaler([{ kanalId: 'instagram', krPerDag: 500 }])
            setVarighet(5); setSituasjon('Eksempelkampanje for testing.')
          }} style={{ background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.5)', borderRadius: 8, padding: '0.4rem 0.8rem', color: '#c084fc', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            ⏩ Fyll planlegger med eksempelkampanje
          </button>
        </div>
      )}
    </div>
  )
}

function MarkedsforingTab() {
  const { state, dispatch } = useGame()
  const [budget, setBudget] = useState<Record<string, number>>({ ...state.marketingBudget })
  const [appeal, setAppeal] = useState(state.appealType)
  const kampanjeAktiv = useErTemaAktivt('kampanje')   // TEMA 8

  const total = Object.values(budget).reduce((s, v) => s + v, 0)

  function save() {
    dispatch({ type: 'SET_MARKETING', budget })
    if (appeal) dispatch({ type: 'SET_APPEAL', appealType: appeal })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Markedsføring</h3>
          <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>
            Kampanje = kort støt mot et mål. Løpende = jevn synlighet.
          </p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>

      {/* ── SEKSJON 1: KAMPANJE (tidsavgrenset, kun når temaet er aktivt) ── */}
      {kampanjeAktiv && <KampanjeSeksjon />}

      {/* ── SEKSJON 2: LØPENDE SYNLIGHET (månedlig budsjett per kanal) ── */}
      <div style={{ fontSize: 14, fontWeight: 800, color: '#cbd5e1', margin: '0.5rem 0 0.75rem' }}>📻 LØPENDE SYNLIGHET — månedlig</div>
      <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 12, margin: '0 0 0.9rem' }}>
        Månedlig budsjett per kanal for jevn synlighet. Effekten avhenger — som for kampanjen — av om kanalen når målgruppa di.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
        {MARKETING_CHANNELS.map(ch => (
          <div key={ch.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: 14 }}>{ch.emoji} {ch.label}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#38bdf8' }}>{formatKr(budget[ch.key] ?? 0)}</span>
            </div>
            <input type="range" min={0} max={50000} step={500} value={budget[ch.key] ?? 0}
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

      <div>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.75rem' }}>Appellform</h4>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[
            { id: 'rational', label: '📊 Rasjonell', desc: 'Pris, fakta, verdi' },
            { id: 'emotional', label: '💖 Emosjonell', desc: 'Følelser, livsstil' },
            { id: 'combined', label: '⚖️ Kombinasjon', desc: 'Best av begge' },
          ].map(a => (
            <button key={a.id} onClick={() => setAppeal(a.id as typeof appeal)}
              style={{
                flex: 1, background: appeal === a.id ? 'rgba(0,212,170,0.12)' : 'var(--dash-card-2)',
                border: `1px solid ${appeal === a.id ? '#00d4aa' : 'var(--dash-border)'}`,
                borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer',
                fontFamily: 'inherit', color: 'var(--dash-text)', textAlign: 'center',
              }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>{a.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Distribusjon (DEL E — egen fane, flyttet ut av Markedsføring) ─────────────
function DistribusjonTab() {
  const { state, dispatch } = useGame()
  const [channels, setChannels] = useState<DistributionChannel[]>(state.channels)
  function toggleChannel(ch: DistributionChannel) {
    if (ch === 'physicalStore') return
    setChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch])
  }
  function save() { dispatch({ type: 'SET_CHANNELS', channels }) }
  const channelMonthlyCost = channels.reduce((s, ch) => s + (CHANNEL_INFO[ch]?.cost ?? 0), 0)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Distribusjon</h3>
          <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0' }}>Hvor kundene kan kjøpe av deg — velg salgskanaler.</p>
        </div>
        <button onClick={save} style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.6rem 1.5rem', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          Lagre ✓
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        {(Object.entries(CHANNEL_INFO) as [DistributionChannel, typeof CHANNEL_INFO[DistributionChannel]][]).map(([ch, info]) => {
          const active = channels.includes(ch)
          const locked = info.requiresLevel ? state.level < info.requiresLevel : false
          return (
            <div key={ch} onClick={() => !locked && toggleChannel(ch)}
              style={{
                background: active ? 'rgba(0,212,170,0.08)' : 'var(--dash-card)',
                border: `1px solid ${active ? '#00d4aa55' : 'var(--dash-border)'}`,
                borderRadius: '1rem', padding: '1rem',
                cursor: ch === 'physicalStore' ? 'default' : locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.45 : 1, display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
              <span style={{ fontSize: 28 }}>{info.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{info.label}</div>
                <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>{info.desc}</div>
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
      <div style={{ background: 'var(--dash-card-2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--dash-text-sekundaer)' }}>Total kanalkostnad:</span>
        <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(channelMonthlyCost)}/mnd</span>
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
// (Kandidat-navn genereres nå i data/rekruttering.ts — den gamle tilfeldigNavn
//  som matet ett-klikks-ansettelsen er fjernet med Rekruttering-flyten.)

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
  const { state } = useGame()
  const [visning, setVisning] = useState<'ansett' | 'organiser'>('ansett')
  return (
    <div>
      <div style={{ marginBottom: '1.1rem' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Personale</h3>
        <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0.2rem 0 0.7rem' }}>
          Ansett folk etter hvert som du trenger dem. Organiseringen (org-kart,
          vaktliste) er noe du gjør når du faktisk har noen å organisere.
        </p>
        <div style={{ display: 'inline-flex', background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)', borderRadius: 10, padding: 3, gap: 3 }}>
          {([['ansett', '👥 Ansett'], ['organiser', `🗂️ Organiser${state.employees.length ? ` (${state.employees.length})` : ''}`]] as const).map(([n, label]) => (
            <button key={n} onClick={() => setVisning(n)} style={{
              background: visning === n ? 'rgba(0,212,170,0.14)' : 'transparent',
              border: `1px solid ${visning === n ? '#00d4aa' : 'transparent'}`,
              borderRadius: 8, padding: '0.35rem 0.9rem', cursor: 'pointer', fontFamily: 'inherit',
              color: visning === n ? '#00d4aa' : 'var(--dash-text-dempet)', fontSize: 12.5, fontWeight: 700,
            }}>{label}</button>
          ))}
        </div>
      </div>
      {visning === 'ansett' ? <AnsettView /> : <OrganiserView />}
    </div>
  )
}

// ── ANSETT-visning: rekruttering + kort liste over egne ansatte ─────────────
function AnsettView() {
  const { state } = useGame()
  const [role, setRole] = useState<EmployeeRole>('selger')
  const [level, setLevel] = useState<EmployeeLevel>('junior')
  return (
    <div>
      <RekrutteringPanel role={role} setRole={setRole} level={level} setLevel={setLevel} />
      {state.employees.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <SectionTittel emoji="🧑‍🤝‍🧑" tekst="Dine ansatte" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {state.employees.map(e => {
              const paVakt = e.grenId && rolleDef(e.role)?.vaktrolle && e.vakt
              const status = paVakt ? '🟢 På vakt' : e.grenId ? '⚪ Disponert' : '🪑 På benken'
              return (
                <div key={e.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--dash-card)', border: '1px solid var(--dash-border)',
                  borderRadius: 10, padding: '0.55rem 0.8rem', fontSize: 12.5,
                }}>
                  <span style={{ color: 'var(--dash-text)', fontWeight: 700 }}>{e.navn}</span>
                  <span style={{ color: 'var(--dash-text-sekundaer)' }}>{rolleTittel(e.role)} · {LEVEL_INFO[e.level].label}</span>
                  <span style={{ color: 'var(--dash-text-dempet)' }}>{status}</span>
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: '0.5rem' }}>
            Gå til «🗂️ Organiser» for å plassere folk på vakt og sette opp
            organisasjonskartet.
          </div>
        </div>
      )}
    </div>
  )
}

// ── ORGANISER-visning: dagens to-stegs org-bygging (uendret innhold) ────────
function OrganiserView() {
  const [steg, setSteg] = useState<1 | 2>(1)
  return (
    <div>
      <div style={{ display: 'inline-flex', background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)', borderRadius: 10, padding: 3, gap: 3, marginBottom: '1.1rem' }}>
        {([[1, '① Hvem gjør hva?'], [2, '② Organisasjonskart']] as const).map(([n, label]) => (
          <button key={n} onClick={() => setSteg(n)} style={{
            background: steg === n ? 'rgba(0,212,170,0.14)' : 'transparent',
            border: `1px solid ${steg === n ? '#00d4aa' : 'transparent'}`,
            borderRadius: 8, padding: '0.35rem 0.9rem', cursor: 'pointer', fontFamily: 'inherit',
            color: steg === n ? '#00d4aa' : 'var(--dash-text-dempet)', fontSize: 12.5, fontWeight: 700,
          }}>{label}</button>
        ))}
      </div>
      {steg === 1 ? <HvemGjorHvaSteg onNeste={() => setSteg(2)} /> : <OrgKartSteg />}
    </div>
  )
}

function OrgKartSteg() {
  const { state, dispatch } = useGame()
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
    underTariffAntall: state.employees.filter(e => e.monthlySalary < REFERANSELONN[e.level]).length,
  })

  return (
    <div>
      <p style={{ color: 'var(--dash-text-sekundaer)', fontSize: 13, margin: '0 0 1.1rem' }}>
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
          <div style={{ fontSize: 10, color: 'var(--dash-text-dempet)' }}>Gratis arbeidskraft · Junior-kapasitet</div>
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
                    background: aktiv ? `${r.farge}1e` : 'var(--dash-card)',
                    border: `1px solid ${aktiv ? r.farge : 'var(--dash-border)'}`,
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
                    <div style={{ fontSize: 9, color: 'var(--dash-text-sekundaer)' }}>
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
          <div style={{ fontSize: 12.5, color: 'var(--dash-text-sekundaer)', textAlign: 'center' }}>
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
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dash-text)' }}>{r.funksjon}</div>
                  <div style={{ fontSize: 9, color: 'var(--dash-text-dempet)' }}>{r.kjerne ? 'Kjernerolle' : 'Bransjerolle'}</div>
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
          border: `1px dashed ${over === 'benk' ? 'var(--dash-text-dempet)' : 'rgba(255,255,255,0.14)'}`,
          borderRadius: 12, padding: '0.7rem 0.8rem', marginBottom: '1.4rem',
        }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--dash-text-dempet)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          🪑 PERSONALBENK · udisponert ({benk.length})
        </div>
        {benk.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {benk.map(e => (
              <DragCard key={e.id} emp={e} farge="var(--dash-text-dempet)" compact
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
        background: 'var(--dash-card)', border: '1px solid var(--dash-border)',
        borderRadius: 12, padding: '0.75rem', marginBottom: '1.4rem',
      }}>
        <div style={{ display: 'flex', paddingLeft: 128, marginBottom: 4 }}>
          {VAKT_LUKER.map(t => (
            <div key={t} style={{ flex: 1, fontSize: 9, color: 'var(--dash-text-sekundaer)', textAlign: 'left' }}>{String(t).padStart(2, '0')}</div>
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
          <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)', padding: '0.4rem 0 0.1rem' }}>
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
          background: 'var(--dash-card)', border: '1px solid var(--dash-border)',
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
            <div style={{ fontSize: 13, color: 'var(--dash-text-dempet)', lineHeight: 1.45 }}>
              🤔 Ingen åpenbare hull akkurat nå — men fortsett å vurdere organiseringen etter hvert som bedriften vokser.
            </div>
          )}
        </div>
      )}

      {/* Total lønn */}
      <div style={{
        background: 'var(--dash-card)', borderRadius: '0.75rem',
        padding: '0.6rem 1rem', fontSize: 14, marginBottom: '1.4rem',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span style={{ color: 'var(--dash-text-sekundaer)' }}>Total lønn per måned:</span>
        <span style={{ fontWeight: 700, color: '#f97316' }}>{formatKr(state.monthlyPayroll)}</span>
      </div>
    </div>
  )
}

// ── RekrutteringPanel — stillingsannonse → søkerliste → intervju → ansett ────
function RekrutteringPanel({
  role, setRole, level, setLevel,
}: {
  role: EmployeeRole
  setRole: (r: EmployeeRole) => void
  level: EmployeeLevel
  setLevel: (l: EmployeeLevel) => void
}) {
  const { state, dispatch } = useGame()
  const [onskedeEgenskaper, setOnskedeEgenskaper] = useState<string[]>([])
  const [tilbudtLonn, setTilbudtLonn] = useState<number>(LEVEL_INFO[level].salary)
  const [egenskapDrag, setEgenskapDrag] = useState<string | null>(null)
  const [egenskapOver, setEgenskapOver] = useState<'slot' | 'bank' | null>(null)
  const [apentIntervju, setApentIntervju] = useState<string | null>(null)
  const [intervjuSvar, setIntervjuSvar] = useState<Record<string, Record<string, string>>>({})

  const alleRoller = getActiveIndustryDefinition().roller
  const valgtRolle = alleRoller.some(r => r.id === role) ? role : (alleRoller[0]?.id ?? null)
  const rek = state.aktivRekruttering
  const canAfford = state.money >= tilbudtLonn

  // ── SØKERLISTE (utlysning aktiv) ──────────────────────────────────────────
  if (rek) {
    const rolleTitt = rolleTittel(rek.rolleId)
    return (
      <div style={{
        background: 'var(--dash-card)', border: '1px solid var(--dash-border)',
        borderRadius: '1rem', padding: '1.25rem',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: '0.3rem' }}>
          Søkere til {rolleTitt} ({LEVEL_INFO[rek.level].label})
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--dash-text-sekundaer)', marginBottom: '1rem' }}>
          Tilbudt lønn: {formatKr(rek.tilbudtLonn)}/mnd ·
          Ønskede egenskaper: {rek.onskedeEgenskaper.length
            ? rek.onskedeEgenskaper.map(egenskapLabel).join(', ')
            : 'ingen valgt'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1rem' }}>
          {rek.kandidater.map(k => (
            <KandidatKort key={k.id} kandidat={k} rekruttering={rek}
              apent={apentIntervju === k.id}
              svar={intervjuSvar[k.id] ?? {}}
              onApneIntervju={() => setApentIntervju(a => a === k.id ? null : k.id)}
              onSvar={(spmId, valgId) => setIntervjuSvar(s => ({
                ...s, [k.id]: { ...(s[k.id] ?? {}), [spmId]: valgId },
              }))}
              onAnsett={() => dispatch({ type: 'HIRE_EMPLOYEE', employee: {
                id: `emp_${Date.now()}`, navn: k.navn, role: rek.rolleId, level: rek.level,
                monthlySalary: rek.tilbudtLonn, egenskaper: k.egenskaper,
              } })} />
          ))}
        </div>
        <button onClick={() => dispatch({ type: 'CANCEL_RECRUITMENT' })} style={{
          width: '100%', background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)',
          borderRadius: 8, padding: '0.6rem', color: 'var(--dash-text-dempet)', fontFamily: 'inherit',
          fontSize: 12.5, cursor: 'pointer',
        }}>✕ Avlys utlysningen</button>
      </div>
    )
  }

  // ── STILLINGSANNONSE (skjema) — fysisk notatlapp (DEL B) ──────────────────
  // Papir-palett, HARDKODET (unntatt dashbord-temaet, DEL C): en fysisk lapp
  // endrer ikke farge når du bytter lys i rommet. Kalam = håndskrift.
  const bankEgenskaper = EGENSKAPER.filter(e => !onskedeEgenskaper.includes(e.id))
  const PAPIR = '#f4ecd8', PAPIR_LYS = '#faf4e2', BLEKK = '#3a2f1f', BLEKK_SVAK = '#6b5d45'
  const KALAM = "'Kalam', cursive"
  const papirKant = '1px solid rgba(58,47,31,0.28)'
  return (
    <div style={{
      position: 'relative',
      background: PAPIR, border: '1px solid rgba(58,47,31,0.18)',
      borderRadius: '0.4rem', padding: '1.5rem 1.25rem 1.25rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transform: 'rotate(-0.6deg)',
      color: BLEKK, fontFamily: KALAM,
    }}>
      {/* «tape»-remse øverst i midten */}
      <div style={{
        position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(-2.5deg)',
        width: 78, height: 20, background: 'rgba(255,251,214,0.55)',
        border: '1px solid rgba(210,190,120,0.4)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
      }} />
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: '1rem', fontFamily: KALAM, color: BLEKK, textAlign: 'center' }}>
        📌 Vi søker folk
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ fontSize: 12.5, color: BLEKK_SVAK, marginBottom: '0.4rem', fontFamily: KALAM }}>Stilling</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {alleRoller.map(r => (
            <button key={r.id} onClick={() => setRole(r.id)} style={{
              flex: '1 1 30%', minWidth: 100,
              background: valgtRolle === r.id ? 'rgba(0,212,170,0.16)' : PAPIR_LYS,
              border: `1px solid ${valgtRolle === r.id ? '#0d9488' : 'rgba(58,47,31,0.22)'}`,
              borderRadius: '0.5rem', padding: '0.55rem 0.4rem',
              cursor: 'pointer', fontFamily: KALAM, color: BLEKK,
            }}>
              <div style={{ fontSize: 17, marginBottom: 2 }}>{r.emoji}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>{r.tittel}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: 12.5, color: BLEKK_SVAK, marginBottom: '0.4rem', fontFamily: KALAM }}>Nivå</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(Object.keys(LEVEL_INFO) as EmployeeLevel[]).map(lv => (
            <button key={lv} onClick={() => { setLevel(lv); setTilbudtLonn(LEVEL_INFO[lv].salary) }} style={{
              flex: 1, background: level === lv ? 'rgba(56,189,248,0.16)' : PAPIR_LYS,
              border: `1px solid ${level === lv ? '#0284c7' : 'rgba(58,47,31,0.22)'}`,
              borderRadius: '0.5rem', padding: '0.6rem',
              cursor: 'pointer', fontFamily: KALAM, color: BLEKK,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{LEVEL_INFO[lv].label}</div>
              {valgtRolle && rolleDef(valgtRolle)?.vaktrolle && (
                <div style={{ fontSize: 10.5, color: '#0d9488', marginTop: 1 }}>{BALANCE.kapasitetPerTime[lv]}/t</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Håndskrevet annonselinje + drag-inn egenskaper */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: 18, fontWeight: 700, fontFamily: KALAM, color: BLEKK,
          marginBottom: '0.5rem', lineHeight: 1.3,
        }}>
          {state.companyName || 'Bedriften'} søker ny{' '}
          <span style={{ textDecoration: 'underline' }}>{valgtRolle ? rolleTittel(valgtRolle) : '…'}</span>
        </div>
        <div style={{ fontSize: 12, color: BLEKK_SVAK, marginBottom: '0.4rem', fontFamily: KALAM }}>
          Vi ser etter (dra inn inntil 3):
        </div>
        <div
          onDragOver={e => { if (egenskapDrag) { e.preventDefault(); setEgenskapOver('slot') } }}
          onDragLeave={() => setEgenskapOver(o => (o === 'slot' ? null : o))}
          onDrop={e => {
            e.preventDefault()
            if (egenskapDrag && onskedeEgenskaper.length < 3 && !onskedeEgenskaper.includes(egenskapDrag)) {
              setOnskedeEgenskaper(o => [...o, egenskapDrag])
            }
            setEgenskapDrag(null); setEgenskapOver(null)
          }}
          style={{
            background: egenskapOver === 'slot' ? 'rgba(13,148,136,0.1)' : 'transparent',
            border: `1.5px dashed ${egenskapOver === 'slot' ? '#0d9488' : 'rgba(58,47,31,0.35)'}`,
            borderRadius: 8, padding: '0.6rem', minHeight: 44, marginBottom: '0.5rem',
            display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center',
          }}>
          {onskedeEgenskaper.length === 0 && (
            <span style={{ fontSize: 12.5, color: 'rgba(58,47,31,0.5)', fontFamily: KALAM }}>Dra egenskaper hit (maks 3)</span>
          )}
          {onskedeEgenskaper.map(id => (
            <div key={id} draggable
              onDragStart={() => setEgenskapDrag(id)}
              title="Dra ned i banken for å fjerne"
              style={{
                cursor: 'grab', background: PAPIR_LYS, border: `1px solid ${BLEKK_SVAK}`,
                borderRadius: '3px 7px 3px 7px', padding: '0.3rem 0.6rem', fontSize: 12.5, fontWeight: 700,
                color: BLEKK, fontFamily: KALAM, boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}>{egenskapLabel(id)}</div>
          ))}
        </div>
        <div
          onDragOver={e => { if (egenskapDrag) { e.preventDefault(); setEgenskapOver('bank') } }}
          onDragLeave={() => setEgenskapOver(o => (o === 'bank' ? null : o))}
          onDrop={e => {
            e.preventDefault()
            if (egenskapDrag) setOnskedeEgenskaper(o => o.filter(id => id !== egenskapDrag))
            setEgenskapDrag(null); setEgenskapOver(null)
          }}
          style={{
            background: egenskapOver === 'bank' ? 'rgba(180,83,9,0.1)' : 'rgba(58,47,31,0.03)',
            border: `1.5px dashed ${egenskapOver === 'bank' ? '#b45309' : 'rgba(58,47,31,0.28)'}`,
            borderRadius: 8, padding: '0.55rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
          }}>
          {bankEgenskaper.map(e => (
            <div key={e.id} draggable onDragStart={() => setEgenskapDrag(e.id)}
              title="Dra opp i annonsen"
              style={{
                cursor: 'grab', background: PAPIR_LYS, border: papirKant,
                borderRadius: '3px 7px 3px 7px', padding: '0.3rem 0.6rem', fontSize: 12.5,
                color: BLEKK, fontFamily: KALAM,
              }}>{e.label}</div>
          ))}
        </div>
      </div>

      {/* Lønn — skjemakontroll (lys inputfelt, ikke papir) */}
      <div style={{ marginBottom: '1.1rem' }}>
        <div style={{ fontSize: 12.5, color: BLEKK_SVAK, marginBottom: '0.4rem', fontFamily: KALAM }}>
          Lønn du tilbyr — <Fagord id="JUS_007">tariff</Fagord>-referanse for {LEVEL_INFO[level].label}: {formatKr(REFERANSELONN[level])}/mnd
        </div>
        <input type="number" step={500} min={Math.round(REFERANSELONN[level] * 0.5 / 500) * 500}
          value={tilbudtLonn} onChange={e => setTilbudtLonn(Math.max(0, Number(e.target.value)))}
          style={{
            width: '100%', background: PAPIR_LYS, border: papirKant,
            borderRadius: 6, padding: '0.55rem 0.7rem', color: BLEKK, fontFamily: KALAM, fontSize: 15, fontWeight: 700,
          }} />
      </div>

      <button
        onClick={() => valgtRolle && dispatch({
          type: 'POST_JOB', rolleId: valgtRolle, level, tilbudtLonn, onskedeEgenskaper,
        })}
        disabled={!canAfford || !valgtRolle}
        style={{
          width: '100%',
          background: canAfford ? 'linear-gradient(135deg,#00d4aa,#0d9488)' : 'rgba(58,47,31,0.12)',
          border: 'none', borderRadius: 8, padding: '0.75rem',
          color: canAfford ? '#fff' : BLEKK_SVAK,
          fontWeight: 700, fontSize: 15, cursor: canAfford ? 'pointer' : 'not-allowed', fontFamily: KALAM,
        }}>
        {canAfford ? '📢 Lys ut stillingen' : '💸 Ikke råd til denne lønna'}
      </button>
    </div>
  )
}

function KandidatKort({
  kandidat, rekruttering, apent, svar, onApneIntervju, onSvar, onAnsett,
}: {
  kandidat: Kandidat
  rekruttering: { tilbudtLonn: number; onskedeEgenskaper: string[] }
  apent: boolean
  svar: Record<string, string>
  onApneIntervju: () => void
  onSvar: (spmId: string, valgId: string) => void
  onAnsett: () => void
}) {
  // Papir-palett (DEL B) — søkerlappene ser ut som avrevne papirlapper, ikke
  // mørke UI-kort. HARDKODET (unntatt dashbord-temaet).
  const PAPIR = '#f5eeda', PAPIR_LYS = '#faf4e2', BLEKK = '#3a2f1f', BLEKK_SVAK = '#6b5d45'
  const KALAM = "'Kalam', cursive"
  const villHaMer = kandidat.lonnsforventning > rekruttering.tilbudtLonn
  const rot = ((kandidat.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 5) - 2) * 0.55
  return (
    <div style={{
      background: PAPIR, border: '1px solid rgba(58,47,31,0.18)',
      borderRadius: '2px 8px 4px 10px', padding: '0.85rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.13)', transform: `rotate(${rot}deg)`,
      color: BLEKK, fontFamily: KALAM,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: BLEKK, fontFamily: KALAM }}>{kandidat.navn}</div>
          <div style={{ fontSize: 11.5, color: BLEKK_SVAK }}>{kandidat.erfaring}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11.5 }}>
          <div style={{ color: villHaMer ? '#b45309' : BLEKK_SVAK }}>
            Ønsker: {formatKr(kandidat.lonnsforventning)}/mnd
          </div>
          {villHaMer && <div style={{ color: '#b45309', fontSize: 10.5 }}>vil ha mer enn tilbudt</div>}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.6rem' }}>
        {kandidat.egenskaper.map(id => {
          const matcher = rekruttering.onskedeEgenskaper.includes(id)
          return (
            <span key={id} style={{
              fontSize: 11, padding: '0.2rem 0.5rem', borderRadius: '2px 6px 2px 6px', fontFamily: KALAM,
              background: matcher ? 'rgba(13,148,136,0.16)' : PAPIR_LYS,
              color: matcher ? '#0d7a6f' : BLEKK,
              border: `1px solid ${matcher ? '#0d9488' : 'rgba(58,47,31,0.25)'}`,
            }}>{egenskapLabel(id)}</span>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={onApneIntervju} style={{
          flex: 1, background: 'rgba(2,132,199,0.12)', border: '1px solid #0284c7',
          borderRadius: 7, padding: '0.5rem', color: '#0369a1', fontFamily: KALAM,
          fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
        }}>🎤 {apent ? 'Lukk intervju' : 'Intervju'}</button>
        <button onClick={onAnsett} style={{
          flex: 1, background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none',
          borderRadius: 7, padding: '0.5rem', color: '#fff', fontFamily: KALAM,
          fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
        }}>✅ Ansett {kandidat.navn.split(' ')[0]}</button>
      </div>
      {apent && (
        <div style={{ marginTop: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {INTERVJUSPORSMAL.map(spm => (
            <div key={spm.id}>
              <div style={{ fontSize: 13, color: BLEKK, marginBottom: '0.4rem', fontFamily: KALAM, fontWeight: 700 }}>{spm.sporsmal}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {spm.valg.map(v => (
                  <button key={v.id} onClick={() => onSvar(spm.id, v.id)} style={{
                    textAlign: 'left', background: svar[spm.id] === v.id ? 'rgba(13,148,136,0.14)' : PAPIR_LYS,
                    border: `1px solid ${svar[spm.id] === v.id ? '#0d9488' : 'rgba(58,47,31,0.22)'}`,
                    borderRadius: 7, padding: '0.4rem 0.6rem', fontFamily: KALAM,
                    fontSize: 12, color: BLEKK, cursor: 'pointer',
                  }}>{v.tekst}</button>
                ))}
              </div>
              {svar[spm.id] && (
                <div style={{ fontSize: 11.5, color: BLEKK_SVAK, marginTop: '0.3rem', fontStyle: 'italic', fontFamily: KALAM }}>
                  {spm.valg.find(v => v.id === svar[spm.id])?.tilbakemelding}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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
    ...state.employees.map(e => ({ id: e.id, navn: e.navn, undertittel: LEVEL_INFO[e.level].label, emoji: '🧑', farge: 'var(--dash-text-dempet)' })),
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
      <span key={r.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: `${r.farge}1e`, border: `1px solid ${r.farge}55`, borderRadius: 99, padding: '1px 4px 1px 8px', fontSize: 11, fontWeight: 700, color: 'var(--dash-text)' }}>
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
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--dash-text)' }}>{oppgaveNavn(r)}</span>
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
              style={{ background: aktiv ? 'rgba(0,212,170,0.08)' : 'var(--dash-card)', border: `1px solid ${aktiv ? '#00d4aa' : `${p.farge}55`}`, borderRadius: 12, padding: '0.6rem', minHeight: 96, transition: 'background 0.12s, border 0.12s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.5rem' }}>
                <span style={{ fontSize: 16 }}>{p.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--dash-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.navn}</div>
                  <div style={{ fontSize: 9.5, color: 'var(--dash-text-sekundaer)' }}>{p.undertittel}</div>
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
              <div style={{ fontSize: 12, color: 'var(--dash-text-dempet)' }}>
                Dra <strong style={{ color: 'var(--dash-text)' }}>Økonomi/regnskap</strong> hit for å sette det ut til en regnskapsfører
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
          <div style={{ fontSize: 13, color: 'var(--dash-text-dempet)', lineHeight: 1.45 }}>🤔 Fordel oppgavene på personene — så kommer det noen spørsmål å tenke over.</div>
        )}
      </div>

      {/* NESTE → seed org-kartet fra fordelingen */}
      <button onClick={() => { dispatch({ type: 'SEED_ORG_FROM_TASKS' }); onNeste() }}
        style={{ background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none', borderRadius: 99, padding: '0.7rem 1.6rem', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
        Bruk fordelingen i organisasjonskartet →
      </button>
      <p style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', margin: '0.55rem 0 0' }}>
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
        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--dash-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.navn}</div>
        <div style={{ fontSize: 9.5, color: 'var(--dash-text-dempet)' }}>{LEVEL_INFO[emp.level].label} · {formatKr(emp.monthlySalary)}</div>
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
        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--dash-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{navn}</div>
        <div style={{ fontSize: 9, color: 'var(--dash-text-sekundaer)' }}>{sub}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 2, touchAction: 'none' }}>
        {VAKT_LUKER.map((_, k) => (
          <div key={k}
            onPointerDown={e => { e.preventDefault(); ned(k) }}
            onPointerEnter={() => inn(k)}
            style={{
              flex: 1, height: 24, borderRadius: 4, cursor: 'pointer',
              background: dekket(k) ? farge : 'rgba(255,255,255,0.06)',
              border: `1px solid ${dekket(k) ? farge : 'var(--dash-border)'}`,
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
          background: 'var(--dash-card-2)', border: '1px solid var(--dash-border)',
          borderRadius: '1rem', padding: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{MONTH_NAMES[r.month - 1]}</div>
            <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)' }}>
              Inntekt: {formatKr(r.revenue)} · Kost: {formatKr(r.costs)} · Solgt: {r.unitsSold} stk
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: r.profit >= 0 ? '#22c55e' : '#ef4444' }}>
              {r.profit >= 0 ? '+' : ''}{formatKr(r.profit)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>+{r.xpEarned} XP</div>
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
  // TEMA 15 DEL d — åpen pakke-forespørsel (pakkebyggeren mot forespørselens profil).
  const [pakkeReq, setPakkeReq] = useState<{ profil: Besoksprofil; tittel: string } | null>(null)

  const msgs = [...state.messages].reverse()

  function handleChoice(messageId: string, eventId: string, choiceId: string) {
    dispatch({ type: 'RESOLVE_GAME_EVENT', eventId, choiceId, messageId })
    setChoiceMade(c => ({ ...c, [messageId]: choiceId }))
  }
  const TYPE_ICON: Record<string, string> = {
    mentor: '🧑‍🏫', pest_event: '📰', game_event: '🚀', beredskap: '🦺',
    customer_complaint: '😤', supplier: '📦', teacher_task: '📚', kampanje: '⚖️',
    hotellavtale: '🏨', pakkeforesporsel: '📧',
    kundebestilling: '📋', leverandortilbud: '🏷️', mkftilbud: '📣',
  }

  if (msgs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--dash-text-sekundaer)' }}>
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
                background: msg.read ? 'var(--dash-card)' : 'rgba(56,189,248,0.06)',
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
                  padding: '0.75rem 1rem', cursor: 'pointer', color: 'var(--dash-text)',
                  fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{TYPE_ICON[msg.type] ?? '📩'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: msg.read ? 500 : 700, fontSize: 14, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {msg.title}
                    {!msg.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', flexShrink: 0, display: 'inline-block' }} />}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>
                    {msg.date}
                    {msg.epostStatus === 'ubesvart' && msg.fristAbsDag != null && (() => {
                      const naa = epostAbsDag(state.currentYear, state.currentMonth, state.dayNumber)
                      const igjen = msg.fristAbsDag - naa
                      const tekst = igjen <= 0 ? 'Svarfrist: i dag!' : igjen === 1 ? 'Svarfrist: i morgen' : `Svarfrist: om ${igjen} dager`
                      return <span style={{ marginLeft: 8, color: igjen <= 1 ? '#f59e0b' : 'var(--dash-text-dempet)', fontWeight: 700 }}>⏰ {tekst}</span>
                    })()}
                  </div>
                </div>
                <span style={{ color: 'var(--dash-text-sekundaer)', fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div style={{ padding: '0 1rem 1rem' }}>
                  <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 0.75rem', fontStyle: 'italic' }}>
                    "{msg.body}"
                  </p>

                  {msg.competenceGoal && (
                    <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginBottom: '0.75rem' }}>
                      📚 {msg.competenceGoal}
                    </div>
                  )}

                  {/* Valgfri hub-lenke (åpnes i ny fane — navigasjonsvakten). */}
                  {msg.hubRute && (
                    <a href={msg.hubRute} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-block', marginBottom: '0.75rem', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '0.35rem 0.8rem', color: '#c084fc', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                      📚 {msg.hubNavn ?? 'Lær mer'} ↗
                    </a>
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
                              color: 'var(--dash-text)', fontSize: 13, cursor: 'pointer',
                              fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.14)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.06)')}
                          >
                            <strong>{c.text}</strong>
                            {c.effect && <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)', marginTop: 2 }}>{c.effect}</div>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TEMA 15 DEL d — e-postforespørsel: svar ved å bygge en pakke
                      mot forespørselens besøksprofil. */}
                  {msg.type === 'pakkeforesporsel' && msg.pakkeProfilId && (
                    <button
                      onClick={() => {
                        const profil = BESOKSPROFILER.find(p => p.id === msg.pakkeProfilId)
                        if (profil) setPakkeReq({ profil, tittel: msg.title.replace(/^📧\s*/, '') })
                      }}
                      style={{ background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', border: 'none', borderRadius: 99, padding: '0.5rem 1.1rem', color: '#0b1120', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                      🎒 Svar med en pakke
                    </button>
                  )}

                  {/* KROK 7 — DEN LEVENDE INNBOKSEN: quest-e-poster (bestilling/
                      leverandør-/markedsføringstilbud) med beslutning + refleksjon. */}
                  {msg.epost && <EpostQuestBlokk msg={msg} />}

                  {/* TEMA 1 — brannalarm som rekkefølge-øvelse, deretter utfall + sammenligning */}
                  {msg.type === 'beredskap' && (
                    (state.beredskap.brannalarmUtfall?.rekkefolge.length ?? 0) > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6, background: 'var(--dash-card-2)', borderRadius: 8, padding: '0.6rem 0.8rem' }}>
                          {(state.beredskap.brannalarmUtfall!.kvalitet === 'good' ? BRANNALARM.utfallTrygg : BRANNALARM.utfallKaos)
                            .replace('{ekte}', state.beredskap.brannalarmUtfall!.ekte ? BRANNALARM.ekteBrann : BRANNALARM.falskAlarm)}
                        </div>
                        {/* Se selv hvor det skar seg (delt komponent) */}
                        <BrannalarmSammenligning rekkefolge={state.beredskap.brannalarmUtfall!.rekkefolge} />
                        <div style={{ fontSize: 11, color: 'var(--dash-text-sekundaer)' }}>Se 🦺 HMS-fanen for evaluering og for å øve på nytt.</div>
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
                        <div key={i} style={{ background: 'var(--dash-card-2)', borderRadius: 6, padding: '0.4rem 0.6rem', fontSize: 12 }}>
                          <span style={{ color: 'var(--dash-text)' }}>{c.text}</span>
                          {c.effect && <span style={{ color: 'var(--dash-text-sekundaer)' }}> — {c.effect}</span>}
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

      {/* DEL d — pakkebyggeren mot forespørselens profil (samme komponent). */}
      {pakkeReq && (
        <Pakkebygger profil={pakkeReq.profil} foresporselTittel={pakkeReq.tittel} onLukk={() => setPakkeReq(null)} />
      )}
    </div>
  )
}

// ── KROK 7 — DEN LEVENDE INNBOKSEN: quest-e-post-blokk ────────────────────────
// Beslutning FØRST (ja/nei med tydelig konsekvens), refleksjon ETTER — aldri
// fasit før valget (brannalarm-modellen). Fortegn + tekst, aldri kun farge.
const EPOST_STATUS: Record<string, { ikon: string; tekst: string; farge: string }> = {
  akseptert: { ikon: '✅', tekst: 'Takket ja', farge: '#22c55e' },
  avslatt:   { ikon: '✋', tekst: 'Takket nei', farge: 'var(--dash-text-dempet)' },
  levert:    { ikon: '📦', tekst: 'Levert', farge: '#22c55e' },
  sviktet:   { ikon: '⚠️', tekst: 'Ikke oppfylt', farge: '#f59e0b' },
  utlopt:    { ikon: '⌛', tekst: 'Frist utløpt', farge: '#ef4444' },
}

function EpostQuestBlokk({ msg }: { msg: InboxMessage }) {
  const { state, dispatch } = useGame()
  // DEL 0 — innboksen er ikke tema-bundet ⇒ det GLOBALE klassenivået styrer om
  // VG2-tilleggene (skriftlig pristilbud, betalt-omtale-vinkelen) vises.
  const erVg2 = useKlasseNivaa() === 'vg2'
  const p = msg.epost!
  const [rabatt, setRabatt] = useState(0)
  const [pristilbud, setPristilbud] = useState('')
  const ubesvart = msg.epostStatus === 'ubesvart'

  const knappJa = {
    background: 'linear-gradient(135deg,#22c55e,#16a34a)', border: 'none', borderRadius: 99,
    padding: '0.5rem 1.1rem', color: '#06210f', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
  } as const
  const knappNei = {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99,
    padding: '0.5rem 1.1rem', color: '#cbd5e1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  } as const

  // ── Etter beslutning: status-pille + refleksjon ──
  if (!ubesvart) {
    const st = EPOST_STATUS[msg.epostStatus ?? '']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {st && (
          <span style={{ alignSelf: 'flex-start', background: `${st.farge}1a`, border: `1px solid ${st.farge}55`, color: st.farge, borderRadius: 99, padding: '2px 12px', fontSize: 12, fontWeight: 800 }}>
            {st.ikon} {st.tekst}
          </span>
        )}
        {msg.epostRefleksjon && (
          <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6, background: 'var(--dash-card-2)', borderRadius: 8, padding: '0.6rem 0.8rem' }}>
            🧑‍🏫 {msg.epostRefleksjon}
          </div>
        )}
      </div>
    )
  }

  // ── 7a KUNDEBESTILLING ──
  if (p.kind === 'kundebestilling') {
    const kb = p as KundebestillingPayload
    const grunn = bestillingGrunnbetaling(kb, state.products)
    const betaling = Math.round(grunn * (1 - rabatt))
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: 12.5, color: '#cbd5e1' }}>
          <div style={{ fontWeight: 700, color: 'var(--dash-text)', marginBottom: 4 }}>Bestillingen:</div>
          {kb.varer.map((v, i) => (
            <div key={i}>· {v.qty} {v.navn} — leveres {kb.leveringTekst}</div>
          ))}
          <div style={{ marginTop: 6, color: 'var(--dash-text-dempet)' }}>Betaling ved dine priser: <strong style={{ color: 'var(--dash-text)' }}>{grunn.toLocaleString('nb-NO')} kr</strong></div>
          <div style={{ marginTop: 2, color: 'var(--dash-text-dempet)', fontSize: 11 }}>Du må ha nok på lager på leveringsdagen — bestill i forkant om du mangler.</div>
        </div>

        {/* Mengderabatt eleven avgjør */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', marginBottom: 4 }}>Vil du gi <Fagord id="SAL_003">mengderabatt</Fagord>?</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[0, 0.10, 0.15].map(r => (
              <button key={r} onClick={() => setRabatt(r)}
                style={{ background: rabatt === r ? 'rgba(56,189,248,0.2)' : 'var(--dash-card-2)', border: `1px solid ${rabatt === r ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`, borderRadius: 8, padding: '0.35rem 0.7rem', color: 'var(--dash-text)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {r === 0 ? 'Ingen' : `${Math.round(r * 100)} %`}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--dash-text-dempet)', marginTop: 4 }}>Betaling: <strong style={{ color: 'var(--dash-text)' }}>{betaling.toLocaleString('nb-NO')} kr</strong> — rabatt bygger kunderelasjon, men koster margin.</div>
        </div>

        {/* VG2 (globalt klassenivå): skriftlig pristilbud (vurderingsspor) */}
        {erVg2 && (
          <div>
            <label style={{ fontSize: 11, color: 'var(--dash-text-dempet)', fontWeight: 600 }}>Skriftlig <Fagord id="SAL_004">pristilbud</Fagord> til kunden (valgfritt):</label>
            <textarea value={pristilbud} onChange={e => setPristilbud(e.target.value)} rows={2}
              placeholder="F.eks. «12 boller + kaffe, samlet 540 kr, levert fredag kl. 10.»"
              style={{ width: '100%', marginTop: 4, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '0.45rem 0.6rem', color: 'var(--dash-text)', fontSize: 12, fontFamily: 'inherit', resize: 'vertical' }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={knappJa} onClick={() => { kassePling(); dispatch({ type: 'ACCEPT_KUNDEBESTILLING', messageId: msg.id, mengderabatt: rabatt, pristilbud: erVg2 ? (pristilbud.trim() || undefined) : undefined }) }}>
            Ja, ta bestillingen
          </button>
          <button style={knappNei} onClick={() => dispatch({ type: 'DECLINE_EPOST', messageId: msg.id })}>Nei takk</button>
        </div>
      </div>
    )
  }

  // ── 7b LEVERANDØRTILBUD ──
  if (p.kind === 'leverandortilbud') {
    const lt = p as LeverandortilbudPayload
    const enhet = tilbudsprisPerEnhet(lt)
    const total = enhet * lt.antall
    const raakraft = state.money < total
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: 12.5, color: '#cbd5e1' }}>
          <div>Kjøp <strong style={{ color: 'var(--dash-text)' }}>{lt.antall} × {lt.navn}</strong></div>
          <div style={{ marginTop: 4 }}>Tilbudspris: <strong style={{ color: 'var(--dash-text)' }}>{enhet} kr/stk</strong> ({lt.rabattProsent} % av {lt.listeprisPerEnhet} kr listepris)</div>
          <div style={{ marginTop: 2, color: 'var(--dash-text-dempet)' }}>Totalt: {total.toLocaleString('nb-NO')} kr</div>
          <div style={{ marginTop: 6, color: 'var(--dash-text-dempet)', fontSize: 11 }}>💡 Lønner det seg? Sammenlign tilbudsprisen med det du normalt betaler per enhet.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={{ ...knappJa, opacity: raakraft ? 0.5 : 1, cursor: raakraft ? 'not-allowed' : 'pointer' }} disabled={raakraft}
            onClick={() => { if (!raakraft) { kassePling(); dispatch({ type: 'ACCEPT_LEVERANDORTILBUD', messageId: msg.id }) } }}>
            Ja, kjøp for {total.toLocaleString('nb-NO')} kr
          </button>
          <button style={knappNei} onClick={() => dispatch({ type: 'DECLINE_EPOST', messageId: msg.id })}>Nei takk</button>
          {raakraft && <span style={{ fontSize: 11, color: '#ef4444' }}>Ikke nok penger i kassa</span>}
        </div>
      </div>
    )
  }

  // ── 7d MARKEDSFØRINGSTILBUD ──
  const mt = p as MkftilbudPayload
  const raakraft = state.money < mt.kostnad
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: 12.5, color: '#cbd5e1' }}>
        <div><strong style={{ color: 'var(--dash-text)' }}>{mt.kanalNavn}</strong> — {mt.tilbyder}</div>
        <div style={{ marginTop: 4 }}>Pris: <strong style={{ color: 'var(--dash-text)' }}>{mt.kostnad.toLocaleString('nb-NO')} kr</strong> for {mt.varighetDager} dager</div>
        <div style={{ marginTop: 6, color: 'var(--dash-text-dempet)', fontSize: 11 }}>💡 Når denne kanalen DIN målgruppe? Sjekk hvem kanalen treffer før du betaler.</div>
        {mt.merkekrav && erVg2 && (
          <div style={{ marginTop: 6, color: '#fbbf24', fontSize: 11 }}>⚖️ Dette er <Fagord id="JUS_008">betalt omtale</Fagord> — den må merkes som reklame.</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ ...knappJa, opacity: raakraft ? 0.5 : 1, cursor: raakraft ? 'not-allowed' : 'pointer' }} disabled={raakraft}
          onClick={() => { if (!raakraft) { kassePling(); dispatch({ type: 'ACCEPT_MKFTILBUD', messageId: msg.id, visMerkekrav: erVg2 }) } }}>
          Ja, kjøp plassen
        </button>
        <button style={knappNei} onClick={() => dispatch({ type: 'DECLINE_EPOST', messageId: msg.id })}>Nei takk</button>
        {raakraft && <span style={{ fontSize: 11, color: '#ef4444' }}>Ikke nok penger i kassa</span>}
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
      <div style={{ fontSize: 12, color: 'var(--dash-text-sekundaer)', fontWeight: 600, marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}
