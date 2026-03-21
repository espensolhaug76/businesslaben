import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/gameStore'

interface Props {
  featureId: string
  children: React.ReactNode
  redirectTo?: string
}

export default function FeatureGuard({ featureId, children, redirectTo = '/city' }: Props) {
  const navigate = useNavigate()
  const unlockedFeatures = useGameStore((s) => s.unlockedFeatures)
  const gamePreset = useGameStore((s) => s.gamePreset)

  // Grunnspill mode: everything unlocked
  const isUnlocked = gamePreset === 'grunnspill' || unlockedFeatures.includes(featureId)

  useEffect(() => {
    if (!isUnlocked) {
      navigate(redirectTo, { replace: true })
    }
  }, [isUnlocked, navigate, redirectTo])

  if (!isUnlocked) return null
  return <>{children}</>
}
