import { motion, AnimatePresence } from 'framer-motion'
import ShopPanel from './panels/ShopPanel'
import WarehousePanel from './panels/WarehousePanel'
import OfficePanel from './panels/OfficePanel'
import MarketingPanel from './panels/MarketingPanel'
import SupplierPanel from './panels/SupplierPanel'

export type BuildingId = 'shop' | 'warehouse' | 'office' | 'marketing' | 'supplier' | null

interface SidePanelProps {
  buildingId: BuildingId
  onClose: () => void
}

export default function SidePanel({ buildingId, onClose }: SidePanelProps) {
  function renderContent() {
    switch (buildingId) {
      case 'shop':       return <ShopPanel onClose={onClose} />
      case 'warehouse':  return <WarehousePanel onClose={onClose} />
      case 'office':     return <OfficePanel onClose={onClose} />
      case 'marketing':  return <MarketingPanel onClose={onClose} />
      case 'supplier':   return <SupplierPanel onClose={onClose} />
      default:           return null
    }
  }

  return (
    <AnimatePresence>
      {buildingId && (
        <motion.div
          key={buildingId}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          style={{
            position: 'fixed', top: 60, right: 0,
            width: 380, height: 'calc(100vh - 60px)',
            background: 'rgba(10,14,26,0.94)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            zIndex: 90, padding: '1.5rem',
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', sans-serif", color: '#f1f5f9',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 99, width: 32, height: 32,
              color: '#94a3b8', cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'inherit',
            }}
          >
            ✕
          </button>
          {renderContent()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
