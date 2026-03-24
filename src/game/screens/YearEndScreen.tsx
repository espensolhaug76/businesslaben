import { useGame } from '../GameContext'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

function grade(profit: number, startingCash: number): { letter: string; label: string; color: string } {
  const ratio = profit / startingCash
  if (ratio >= 1.5)  return { letter: 'A+', label: 'Fantastisk! Du er en forretningsgeni.', color: '#22c55e' }
  if (ratio >= 0.8)  return { letter: 'A',  label: 'Utmerket! Solid fortjeneste.', color: '#22c55e' }
  if (ratio >= 0.4)  return { letter: 'B',  label: 'Bra jobb! Du tjente penger.', color: '#38bdf8' }
  if (ratio >= 0.1)  return { letter: 'C',  label: 'Godkjent. Litt fortjeneste.', color: '#facc15' }
  if (ratio >= -0.2) return { letter: 'D',  label: 'Under pari. Neste gang blir det bedre!', color: '#f97316' }
  return { letter: 'F', label: 'Konkurs. Prøv igjen med nye strategier!', color: '#ef4444' }
}

export default function YearEndScreen() {
  const { state, dispatch } = useGame()
  const { monthlyResults, scenario, companyName, cash } = state

  const totalRevenue = monthlyResults.reduce((s, r) => s + r.revenue, 0)
  const totalCOGS    = monthlyResults.reduce((s, r) => s + r.cogs, 0)
  const totalFixed   = monthlyResults.reduce((s, r) => s + r.fixedCosts, 0)
  const totalMkt     = monthlyResults.reduce((s, r) => s + r.marketingCosts, 0)
  const totalProfit  = monthlyResults.reduce((s, r) => s + r.netProfit, 0)
  const startingCash = scenario?.startingCash ?? 200_000
  const g = grade(totalProfit, startingCash)

  const maxRevenue = Math.max(...monthlyResults.map(r => r.revenue), 1)

  function handleRestart() {
    dispatch({ type: 'RESET' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: 64, marginBottom: '0.75rem' }}>🏆</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, margin: 0, color: '#f1f5f9' }}>Årsresultat</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0', fontSize: 17 }}>
          {scenario?.emoji} {companyName} — {scenario?.name}
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 800 }}>
        {/* Grade */}
        <div style={{ background: `${g.color}14`, border: `2px solid ${g.color}66`, borderRadius: '2rem', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: g.color, lineHeight: 1 }}>{g.letter}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: '0.75rem' }}>{g.label}</div>
        </div>

        {/* Financial summary */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>Årsregnskap</h3>
          <SummaryRow label="Total omsetning" value={formatKr(totalRevenue)} color="#22c55e" />
          <SummaryRow label="Varekostnad (COGS)" value={`−${formatKr(totalCOGS)}`} color="#f97316" />
          <SummaryRow label="Bruttofortjeneste" value={formatKr(totalRevenue - totalCOGS)} bold />
          <SummaryRow label="Faste kostnader" value={`−${formatKr(totalFixed)}`} color="#f97316" />
          <SummaryRow label="Markedsføring" value={`−${formatKr(totalMkt)}`} color="#f97316" />
          <SummaryRow label="Nettoresultat" value={(totalProfit >= 0 ? '+' : '') + formatKr(totalProfit)} color={totalProfit >= 0 ? '#22c55e' : '#ef4444'} bold />
          <SummaryRow label="Sluttkapital" value={formatKr(cash)} color="#38bdf8" bold />
        </div>

        {/* Month chart */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1.25rem' }}>Månedsoversikt</h3>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: 120 }}>
            {monthlyResults.map((r, i) => {
              const h = Math.max(4, Math.round((r.revenue / maxRevenue) * 110))
              const isProfit = r.netProfit >= 0
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div
                    title={`${MONTH_NAMES[i]}: ${formatKr(r.revenue)}`}
                    style={{ width: '100%', height: h, background: isProfit ? 'rgba(34,197,94,0.6)' : 'rgba(239,68,68,0.6)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }}
                  />
                  <span style={{ fontSize: 10, color: '#475569' }}>{MONTH_NAMES[i]}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Best month */}
        {monthlyResults.length > 0 && (() => {
          const best = monthlyResults.reduce((a, b) => a.netProfit > b.netProfit ? a : b)
          return (
            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid #22c55e44', borderRadius: '1rem', padding: '1rem', textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>🥇 Beste måned: </span>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 16 }}>{MONTH_NAMES[best.month - 1]} — +{formatKr(best.netProfit)}</span>
            </div>
          )
        })()}

        {/* Restart */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={handleRestart}
            style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', border: 'none', borderRadius: 99, padding: '1rem 3rem', color: '#030712', fontWeight: 800, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            🔄 Spill igjen
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, color, bold }: { label: string; value: string; color?: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ fontSize: 15, color: bold ? '#e2e8f0' : '#94a3b8', fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: bold ? 800 : 600, color: color ?? '#f1f5f9' }}>{value}</span>
    </div>
  )
}
