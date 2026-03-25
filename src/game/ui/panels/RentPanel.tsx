import { motion } from 'framer-motion'
import { useGame } from '../../GameContext'
import type { RentalLocation } from '../../types'

interface VacantInfo {
  id: string
  label: string
  zone: string
  rent: number
  footTraffic: string
  sqm: number
  worldX: number
  worldY: number
}

interface RentPanelProps {
  info: VacantInfo
  onClose: () => void
  onEnterShop: () => void
}

function formatKr(n: number) { return n.toLocaleString('nb-NO') + ' kr' }

const ZONE_LABELS: Record<string, string> = {
  gagate: 'Gågata (sentrum)',
  hovedgate: 'Hovedgata',
  utkant: 'Utkanten',
}

const TRAFFIC_COLORS: Record<string, string> = {
  lav: '#f97316',
  middels: '#facc15',
  høy: '#22c55e',
}

export default function RentPanel({ info, onClose, onEnterShop }: RentPanelProps) {
  const { state, dispatch } = useGame()
  const alreadyRented = state.rentedLocation !== null

  function handleRent() {
    const location: RentalLocation = {
      id: info.id,
      name: info.label,
      zone: info.zone as RentalLocation['zone'],
      monthlyRent: info.rent,
      footTraffic: info.footTraffic as RentalLocation['footTraffic'],
      sqm: info.sqm,
    }
    dispatch({ type: 'RENT_LOCATION', location })
    onEnterShop()
    onClose()
  }

  const trafficColor = TRAFFIC_COLORS[info.footTraffic] ?? '#94a3b8'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22 }}
        style={{
          background: 'rgba(10,14,26,0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1.75rem', padding: '2rem',
          maxWidth: 420, width: '100%', color: '#f1f5f9',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 99, width: 30, height: 30,
            color: '#94a3b8', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14,
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 40, marginBottom: '0.5rem' }}>🏠</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Ledig lokale</h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: 14 }}>
            {ZONE_LABELS[info.zone] ?? info.zone}
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem', marginBottom: '1.5rem',
        }}>
          <InfoBox label="Leie per måned"  value={formatKr(info.rent)}             color="#ef4444" />
          <InfoBox label="Størrelse"       value={`${info.sqm} m²`}               color="#38bdf8" />
          <InfoBox label="Kundetrafikk"    value={info.footTraffic}                color={trafficColor} />
          <InfoBox label="Sone"            value={ZONE_LABELS[info.zone] ?? info.zone} color="#a855f7" />
        </div>

        <div style={{
          background: 'rgba(56,189,248,0.08)',
          border: '1px solid #38bdf833',
          borderRadius: '1rem', padding: '1rem',
          marginBottom: '1.5rem', fontSize: 13, color: '#94a3b8',
        }}>
          {info.footTraffic === 'høy' && '⭐ Premium plassering på gågata. Høy trafikk gir mange potensielle kunder, men husleien er høy.'}
          {info.footTraffic === 'middels' && '📍 God plassering på Hovedgata. Balansert mellom trafikk og kostnad.'}
          {info.footTraffic === 'lav' && '💡 Rimelig lokale i utkanten. God start om du vil holde kostnadene nede.'}
        </div>

        {alreadyRented ? (
          <div style={{ textAlign: 'center', color: '#f97316', fontSize: 14, fontWeight: 600 }}>
            ⚠️ Du leier allerede et lokale. Ekspansjon kommer i neste versjon.
          </div>
        ) : (
          <button
            onClick={handleRent}
            style={{
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              border: 'none', borderRadius: 12,
              padding: '0.9rem 1.5rem', color: '#fff',
              fontWeight: 700, fontSize: 16, cursor: 'pointer',
              fontFamily: 'inherit', width: '100%',
            }}
          >
            Lei dette lokalet → {formatKr(info.rent)}/mnd
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}

function InfoBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: `${color}0d`,
      border: `1px solid ${color}33`,
      borderRadius: '0.75rem', padding: '0.75rem',
    }}>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color, textTransform: 'capitalize' }}>{value}</div>
    </div>
  )
}
