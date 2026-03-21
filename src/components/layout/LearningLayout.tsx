import { Outlet, useLocation } from 'react-router-dom'
import ThemeToggle, { useThemeEffect } from '../ui/ThemeToggle'

export default function LearningLayout() {
  useThemeEffect()
  const { pathname } = useLocation()
  // LearningHub has ThemeToggle in its own header — skip fixed overlay there
  const isHub = pathname === '/learning'

  return (
    <>
      <Outlet />
      {!isHub && (
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}
    </>
  )
}
