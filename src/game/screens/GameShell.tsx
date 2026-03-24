import { GameProvider, useGame } from '../GameContext'
import StartupScreen from './StartupScreen'
import ProductScreen from './ProductScreen'
import PricingScreen from './PricingScreen'
import DistributionScreen from './DistributionScreen'
import MarketingScreen from './MarketingScreen'
import GameDashboard from './GameDashboard'
import MonthReportScreen from './MonthReportScreen'
import YearEndScreen from './YearEndScreen'

function GameRouter() {
  const { state } = useGame()

  switch (state.phase) {
    case 'startup':       return <StartupScreen />
    case 'product':       return <ProductScreen />
    case 'pricing':       return <PricingScreen />
    case 'distribution':  return <DistributionScreen />
    case 'marketing':     return <MarketingScreen />
    case 'dashboard':     return <GameDashboard />
    case 'month_report':  return <MonthReportScreen />
    case 'year_end':      return <YearEndScreen />
    default:              return <StartupScreen />
  }
}

export default function GameShell() {
  return (
    <GameProvider>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        fontFamily: "'Inter', sans-serif",
        color: '#f1f5f9',
      }}>
        <GameRouter />
      </div>
    </GameProvider>
  )
}
