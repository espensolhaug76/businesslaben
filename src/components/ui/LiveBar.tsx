import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveSync } from '../../lib/useLiveSync'

/**
 * Fixed floating bar shown on any page when the student is in a live session.
 * Auto-navigates the student to /live-session when a quiz starts so they can answer,
 * and shows a small indicator otherwise.
 */
export default function LiveBar() {
  const navigate = useNavigate()
  const { isLive, isStudentLive, quizActive } = useLiveSync()

  // Auto-send student to /live-session when teacher starts a quiz
  useEffect(() => {
    if (!isStudentLive) return
    if (quizActive && window.location.pathname !== '/live-session') {
      navigate('/live-session')
    }
  }, [isStudentLive, quizActive, navigate])

  // Only show the bar for students (not teacher big-screen)
  if (!isStudentLive) return null
  if (!isLive) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8,
    }}>
      <button
        onClick={() => navigate('/live-session')}
        style={{
          background: 'rgba(13,148,136,0.9)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '8px 14px',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
        Live økt
      </button>
    </div>
  )
}
