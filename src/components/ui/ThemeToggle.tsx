import { useGameStore } from '../../store/gameStore'
import { useEffect } from 'react'

type Theme = 'dark' | 'light' | 'warm' | 'blue' | 'green'

const themes: { id: Theme; icon: string; label: string }[] = [
  { id: 'dark',  icon: '🌙', label: 'Mørk' },
  { id: 'light', icon: '☀️', label: 'Lys' },
  { id: 'warm',  icon: '🌤️', label: 'Varm' },
  { id: 'blue',  icon: '🔵', label: 'Blå' },
  { id: 'green', icon: '🟢', label: 'Grønn' },
]

export function useThemeEffect() {
  const theme = useGameStore((s) => s.theme) ?? 'light'
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])
}

export default function ThemeToggle() {
  const theme = useGameStore((s) => s.theme) ?? 'light'
  const setTheme = useGameStore((s) => s.setTheme)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const current = themes.find((t) => t.id === theme) ?? themes[0]
  const next = themes[(themes.findIndex((t) => t.id === theme) + 1) % themes.length]

  return (
    <button
      onClick={() => setTheme(next.id)}
      title={`Bytt til ${next.label}`}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 transition-colors"
    >
      <span>{current.icon}</span>
      <span className="hidden sm:inline">{current.label}</span>
    </button>
  )
}
