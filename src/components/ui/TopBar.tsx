import { useGameStore } from '../../store/gameStore'
import ThemeToggle from './ThemeToggle'

export default function TopBar() {
  const companyName = useGameStore((s) => s.companyName)
  const companyLogo = useGameStore((s) => s.companyLogo)
  const selectedIndustry = useGameStore((s) => s.selectedIndustry)

  const industryLabels: Record<string, string> = {
    fashion: 'Mote',
    electronics: 'Elektronikk',
    food: 'Mat og drikke',
    furniture: 'Møbler',
    technology: 'Teknologi',
    travel: 'Reise og turisme',
    health: 'Helse og velvære',
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
      <div className="flex items-center gap-3">
        {companyLogo ? (
          <img src={companyLogo} alt="" className="h-8 w-8 rounded-md object-cover" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500/20 text-sm font-bold text-teal-400">
            {companyName ? companyName[0].toUpperCase() : 'A'}
          </div>
        )}
        <div>
          <h1 className="text-sm font-bold text-white">
            {companyName || 'AdVenture'}
          </h1>
          {selectedIndustry && (
            <p className="text-xs text-gray-400">
              {industryLabels[selectedIndustry] ?? selectedIndustry}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="text-xs font-medium text-teal-400">
          AdVenture 2.3
        </div>
      </div>
    </header>
  )
}
