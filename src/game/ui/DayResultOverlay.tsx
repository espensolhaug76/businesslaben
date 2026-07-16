import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Fagord from './Fagord'
import { useGame } from '../GameContext'
import { getActiveIndustryDefinition } from '../data/industryDefinition'

// ─── DAGSOPPGJØR (DEL 4, Dagssyklus) ──────────────────────────────────────────
// Vises når dayPhase === 'oppgjør' (satt av CLOSE_DAY). Leser state direkte,
// gates internt. «Start ny dag» dispatcher START_NEW_DAY (dagteller + evt.
// månedsrull). «Bestill til i morgen» (onOpenProducts) åpner dashbordet på
// Produkter-fanen UTEN å avansere dagen — dayPhase forblir 'oppgjør', og
// bestillinger lagt nå får ankomstDag = dayNumber+1 («ferskt neste dag»), eller
// dag 1 i ny måned hvis de legges siste handledag (wrappet over månedsskiftet).
// Mens dashbordet ligger over (dashboardOpen), skjules oppgjøret så det ikke
// dekker dashbordet (oppgjøret har høyere z-index); det kommer tilbake når
// dashbordet lukkes (dayPhase er fortsatt 'oppgjør').

const MONTH_NAMES = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

function formatKr(n: number) { return `${Math.round(n).toLocaleString('nb-NO')} kr` }

/** Topp N produkter på én linje, resten oppsummert som «+N til». */
function sammendrag(items: string[], maks = 3): string {
  if (items.length <= maks) return items.join(', ')
  return `${items.slice(0, maks).join(', ')} +${items.length - maks} til`
}

/** Terskel for «mye svinn»-hintet — svinn-verdien har spist minst denne
 *  andelen av dagens salgsinntekt. Rent pedagogisk merke, ingen konsekvens. */
const HIGH_SVINN_SHARE = 0.3

export default function DayResultOverlay({ onOpenProducts, dashboardOpen }: {
  /** Åpne dashbordet på Produkter-fanen uten å avansere dagen. */
  onOpenProducts: () => void
  /** Dashbordet ligger over oppgjøret akkurat nå ⇒ skjul oppgjøret. */
  dashboardOpen: boolean
}) {
  const { state, dispatch } = useGame()
  if (state.dayPhase !== 'oppgjør' || !state.lastDayResult || dashboardOpen) return null

  const r = state.lastDayResult
  const resultColor = r.resultat >= 0 ? '#22c55e' : '#ef4444'
  // Mot SAMLET omsetning (møter + bakgrunn) — ellers slår hintet ut på en dag
  // uten kundemøter (soldKr=0) selv med bittelite svinn.
  const highSvinn = r.svinnKr > 0 && r.svinnKr >= (r.soldKr + r.bakgrunnKr) * HIGH_SVINN_SHARE

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 260,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", overflowY: 'auto', padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22 }}
        style={{
          background: 'rgba(15,23,42,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '2rem', padding: '2.25rem',
          maxWidth: 480, width: '100%', color: '#f1f5f9',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 44 }}>🧾</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0.4rem 0 0.15rem' }}>Dagsoppgjør</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Dag {r.dayNumber} · {MONTH_NAMES[r.month - 1]}</p>
        </div>

        {/* Salgslinjer — kundemøter (dagens UTVALG) vs øvrige/bakgrunnskunder
            (VOLUMET), pluss tapte salg når disken gikk tom. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          <SalgLinje ikon="🛎️" tittel={`Kundemøter: ${r.meetings}`} hoyre={formatKr(r.soldKr)} color="#22c55e" />
          <SalgLinje ikon="👥" tittel={`Øvrige kunder: ${r.bakgrunnKunder}`} hoyre={formatKr(r.bakgrunnKr)} color="#38bdf8" />
          {/* BEMANNING: tapte salg splittes på ÅRSAK. «Tomt lager» = varen var
              utsolgt (r.tapteSalgStk inkluderer stengt-tidlig-bortfall, som har
              egen linje under, så trekk det fra her). «Kø» = for lite kapasitet
              på vakt (r.koKunder). */}
          {(r.tapteSalgStk - r.bortfallStk) > 0 && (
            <SalgLinje ikon="🚫" tittel={<><Fagord id="SAL_002">Tapte salg</Fagord>: {r.tapteSalgStk - r.bortfallStk} (tomt lager)</>} hoyre="—" color="#ef4444" />
          )}
          {r.koKunder > 0 && (
            <SalgLinje ikon="⏳" tittel={<><Fagord id="SAL_002">Tapte salg</Fagord>: {r.koKunder} (kø — for få på vakt)</>} hoyre="—" color="#f59e0b" />
          )}
          {/* SPILLKLOKKE: stengte eleven før 17:00, bortfalt de resterende
              bakgrunnskundene — egen linje, adskilt fra tomt-lager-tap. */}
          {r.stengtTidlig && r.bortfallStk > 0 && (
            <SalgLinje ikon="⏰" tittel={`Stengt tidlig: ${r.bortfallStk} kunder rakk ikke innom`} hoyre="—" color="#f59e0b" />
          )}
        </div>

        {/* DEL 4 — per-produkt-oppsummering: hvilke varer gikk tomt (og hvor
            mange salg det kostet) og hvor mye ferskvare som ble kastet. Topp 3
            per linje, resten som «+N til». */}
        {(r.tomtProdukter.length > 0 || r.svinnProdukter.length > 0) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
            {r.tomtProdukter.length > 0 && (
              <DetaljLinje ikon="📦" etikett="Gikk tomt" tekst={sammendrag(r.tomtProdukter.map(t => `${t.navn} (${t.tapte} tapte)`))} color="#f87171" />
            )}
            {r.svinnProdukter.length > 0 && (
              <DetaljLinje ikon="🗑️" etikett="Svinn" tekst={sammendrag(r.svinnProdukter.map(s => `${s.navn} ${s.stk} stk`))} color="#fca5a5" />
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1.1rem' }}>
          <StatCard label={<Fagord id="ECO_018">Svinn</Fagord>} value={`${r.svinnStk} stk`} sub={formatKr(r.svinnKr)} color="#ef4444" />
          <StatCard label="Rykte i dag" value={`${r.reputationDelta >= 0 ? '+' : ''}${r.reputationDelta}`} color={r.reputationDelta >= 0 ? '#38bdf8' : '#ef4444'} />
          <StatCard label="XP i dag" value={`+${r.xpEarned}`} color="#a855f7" />
        </div>

        {/* Resultat — samlet salg (møter + bakgrunn) minus varekost minus svinn */}
        <div style={{
          background: `${resultColor}12`, border: `1px solid ${resultColor}44`,
          borderRadius: '1rem', padding: '1rem 1.1rem', marginBottom: '1.1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>RESULTAT (salg − varekost − svinn)</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
              {formatKr(r.soldKr + r.bakgrunnKr)} − {formatKr(r.varekostKr)} − {formatKr(r.svinnKr)}
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: resultColor }}>
            {r.resultat >= 0 ? '+' : ''}{formatKr(r.resultat)}
          </div>
        </div>

        {/* ORGANISASJONSDESIGN — ÉN diskret refleksjonslinje (spørsmål, aldri
            fasit) når en org-regel slo ut. Ikke mas: maks én, dempet tone. */}
        {r.refleksjon && (
          <div style={{
            background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.22)',
            borderRadius: '0.75rem', padding: '0.6rem 0.9rem', marginBottom: '1.1rem',
            display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: '#9ecbe6', lineHeight: 1.45,
          }}>
            <span style={{ flexShrink: 0 }}>🤔</span>
            <span>{r.refleksjon}</span>
          </div>
        )}

        {/* Pedagogiske hint — mild tone, aldri straffende. KLIKKBARE: fører
            rett til Produkter-fanen (bestill inn til i morgen) uten å avansere
            dagen. */}
        {(highSvinn || r.stockoutHappened) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {highSvinn && (
              <button
                onClick={onOpenProducts}
                title="Åpne Produkter-fanen og juster innkjøpet"
                style={{
                  textAlign: 'left', width: '100%', fontFamily: 'inherit', cursor: 'pointer',
                  background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)',
                  borderRadius: '0.75rem', padding: '0.7rem 0.9rem', fontSize: 13, color: '#fde68a', lineHeight: 1.5,
                }}
              >
                💡 Mye ble kastet — vurder mindre innkjøp eller færre ferskvarer i disken. <span style={{ textDecoration: 'underline' }}>Juster innkjøpet →</span>
              </button>
            )}
            {r.stockoutHappened && (
              <button
                onClick={onOpenProducts}
                title="Åpne Produkter-fanen og bestill inn til i morgen"
                style={{
                  textAlign: 'left', width: '100%', fontFamily: 'inherit', cursor: 'pointer',
                  background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)',
                  borderRadius: '0.75rem', padding: '0.7rem 0.9rem', fontSize: 13, color: '#7dd3fc', lineHeight: 1.5,
                }}
              >
                💡 {getActiveIndustryDefinition().forsyning.utsolgtHint} <span style={{ textDecoration: 'underline' }}>Bestill nå →</span>
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenProducts}
            title="Bestill inn varer til i morgen uten å avslutte dagen"
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 99, padding: '0.8rem 1.6rem', color: '#cbd5e1',
              fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            🥐 Bestill til i morgen
          </button>
          <button
            onClick={() => dispatch({ type: 'START_NEW_DAY' })}
            style={{
              background: 'linear-gradient(135deg,#00d4aa,#0d9488)', border: 'none',
              borderRadius: 99, padding: '0.8rem 2.2rem', color: '#fff',
              fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ▶ Start ny dag
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ label, value, sub, color }: { label: ReactNode; value: string; sub?: string; color: string }) {
  return (
    <div style={{ background: `${color}0e`, border: `1px solid ${color}33`, borderRadius: '0.75rem', padding: '0.8rem 0.9rem' }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{sub}</div>}
    </div>
  )
}

function DetaljLinje({ ikon, etikett, tekst, color }: { ikon: string; etikett: string; tekst: string; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', fontSize: 12, padding: '0 0.15rem' }}>
      <span style={{ flexShrink: 0 }}>{ikon}</span>
      <span style={{ color, fontWeight: 700, flexShrink: 0 }}>{etikett}:</span>
      <span style={{ color: '#94a3b8', lineHeight: 1.4 }}>{tekst}</span>
    </div>
  )
}

function SalgLinje({ ikon, tittel, hoyre, color }: { ikon: string; tittel: ReactNode; hoyre: string; color: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: `${color}0e`, border: `1px solid ${color}30`, borderRadius: 10, padding: '0.55rem 0.85rem',
    }}>
      <span style={{ fontSize: 13, color: '#cbd5e1' }}>{ikon} {tittel}</span>
      <span style={{ fontSize: 14, fontWeight: 800, color }}>{hoyre}</span>
    </div>
  )
}
