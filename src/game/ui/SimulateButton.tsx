import { useGame } from '../GameContext'

const MONTH_NAMES = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember']

export default function SimulateButton({ onClick }: { onClick: () => void }) {
  const { state } = useGame()
  const ready = state.selectedProducts.length > 0
  const monthName = MONTH_NAMES[(state.month - 1) % 12]

  if (state.phase === 'year_end') return null

  return (
    <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 95 }}>
      <button
        onClick={onClick}
        disabled={!ready}
        style={{
          background: ready ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(255,255,255,0.07)',
          border: 'none', borderRadius: 99,
          padding: '0.95rem 3rem',
          color: ready ? '#fff' : '#475569',
          fontWeight: 800, fontSize: 17,
          cursor: ready ? 'pointer' : 'not-allowed',
          fontFamily: "'Outfit', sans-serif",
          boxShadow: ready ? '0 0 40px rgba(34,197,94,0.35)' : 'none',
          transition: 'all 0.3s', whiteSpace: 'nowrap',
          backdropFilter: 'blur(8px)',
        }}
      >
        ▶ Simuler {monthName}
      </button>
      {!ready && (
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: '0.5rem', fontFamily: "'Outfit', sans-serif" }}>
          Klikk Leverandøren for å velge produkter
        </p>
      )}
    </div>
  )
}
