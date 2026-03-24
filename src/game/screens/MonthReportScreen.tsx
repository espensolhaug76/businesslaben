import { useGame } from '../GameContext'

const MONTH_NAMES = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']

function formatKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

function Row({ label, value, color, bold }: { label: string; value: string; color?: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ fontSize: 15, color: bold ? '#e2e8f0' : '#94a3b8', fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: bold ? 800 : 600, color: color ?? '#f1f5f9' }}>{value}</span>
    </div>
  )
}

export default function MonthReportScreen() {
  const { state, dispatch } = useGame()
  const results = state.monthlyResults
  const result = results[results.length - 1]

  if (!result) {
    dispatch({ type: 'SET_PHASE', phase: 'dashboard' })
    return null
  }

  const profit = result.netProfit
  const isProfit = profit >= 0

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 700 }}>
        {/* Event banner */}
        {result.event && (
          <div style={{
            background: result.event.type === 'positive' ? 'rgba(34,197,94,0.1)' : result.event.type === 'negative' ? 'rgba(239,68,68,0.1)' : 'rgba(148,163,184,0.1)',
            border: `1px solid ${result.event.type === 'positive' ? '#22c55e' : result.event.type === 'negative' ? '#ef4444' : '#475569'}66`,
            borderRadius: '1.25rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 32 }}>{result.event.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: '0.3rem', color: '#f1f5f9' }}>{result.event.title}</div>
              <div style={{ fontSize: 14, color: '#94a3b8' }}>{result.event.description}</div>
            </div>
          </div>
        )}

        {/* Main result card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `2px solid ${isProfit ? '#22c55e' : '#ef4444'}44`, borderRadius: '2rem', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Resultat for {MONTH_NAMES[result.month - 1]}
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: isProfit ? '#22c55e' : '#ef4444', marginTop: '0.25rem' }}>
                {isProfit ? '+' : ''}{formatKr(profit)}
              </div>
            </div>
            <span style={{ fontSize: 48 }}>{isProfit ? '📈' : '📉'}</span>
          </div>

          <Row label="Inntekt" value={formatKr(result.revenue)} color="#22c55e" />
          <Row label="Varekostnad (COGS)" value={`−${formatKr(result.cogs)}`} color="#f97316" />
          <Row label="Bruttofortjeneste" value={formatKr(result.grossProfit)} bold />
          <Row label="Faste kostnader (husleie, forsikring, kanaler)" value={`−${formatKr(result.fixedCosts)}`} color="#f97316" />
          <Row label="Markedsføringskostnader" value={`−${formatKr(result.marketingCosts)}`} color="#f97316" />
          <Row label="Nettoresultat" value={(isProfit ? '+' : '') + formatKr(profit)} color={isProfit ? '#22c55e' : '#ef4444'} bold />
          <Row label="Kontanter etter" value={formatKr(result.cashAfter)} color="#38bdf8" bold />
        </div>

        {/* Product breakdown */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#94a3b8', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Produktresultater</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {result.productResults.map(pr => (
              <div key={pr.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 600 }}>{pr.productName}</span>
                <div style={{ display: 'flex', gap: '1rem', fontSize: 14 }}>
                  <span style={{ color: '#64748b' }}>{pr.unitsSold} stk solgt</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>{formatKr(pr.revenue)}</span>
                  <span style={{ color: pr.profit >= 0 ? '#22c55e' : '#ef4444', fontWeight: 700 }}>
                    {pr.profit >= 0 ? '+' : ''}{formatKr(pr.profit)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash warning */}
        {result.cashAfter < 0 && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>
            ⚠️ Du er i minus! Juster priser eller kutt kostnader for å overleve.
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => dispatch({ type: 'SET_PHASE', phase: 'dashboard' })}
            style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', border: 'none', borderRadius: 99, padding: '0.9rem 3rem', color: '#030712', fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {state.month > 12 ? 'Se årsresultat →' : `Neste måned: ${MONTH_NAMES[(result.month) % 12]} →`}
          </button>
        </div>
      </div>
    </div>
  )
}
