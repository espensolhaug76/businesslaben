import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import StepIndicator from './StepIndicator'

function formatKr(amount: number): string {
  return amount.toLocaleString('nb-NO') + ' kr'
}

const routeToStep: Record<string, number> = {
  '/': 1,
  '/target-audience': 2,
  '/business-model': 3,
  '/products': 4,
  '/pricing': 5,
  '/dashboard': 6,
  '/results': 6,
}

export default function GameLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { companyName, currentMoney } = useGameStore()

  const currentStep = routeToStep[location.pathname] || 1
  const showHeader = location.pathname !== '/'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header bar */}
      {showHeader && (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-lg font-bold text-indigo-900 hover:text-indigo-700 transition-colors"
            >
              AdVenture 2.3
            </button>
            <div className="flex items-center gap-6">
              {companyName && companyName !== 'Min Bedrift' && (
                <span className="text-sm text-gray-600 hidden sm:block">{companyName}</span>
              )}
              <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                {formatKr(currentMoney)}
              </span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 pb-3">
            <StepIndicator currentStep={currentStep} />
          </div>
        </header>
      )}

      {/* Page content */}
      <Outlet />
    </div>
  )
}
