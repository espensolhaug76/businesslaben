import { Outlet } from 'react-router-dom'
import NavigationMenu from '../ui/NavigationMenu'
import EconomyPanel from '../ui/EconomyPanel'
import TopBar from '../ui/TopBar'
import GlossaryPopup from '../ui/GlossaryPopup'
import Espen from '../ui/Espen'
import { useThemeEffect } from '../ui/ThemeToggle'

export default function AppLayout() {
  useThemeEffect()
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <NavigationMenu />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <EconomyPanel />
      </div>
      <GlossaryPopup />
      <Espen />
    </div>
  )
}
