import React from 'react'

interface State {
  hasError: boolean
  error: Error | null
}

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div style={{
          minHeight: '100vh',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          <div style={{
            maxWidth: '440px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
              Noe gikk galt
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px', lineHeight: 1.6 }}>
              Det oppstod en feil ved lasting av denne siden. Prøv å gå tilbake til læringsmoduler.
            </p>
            <button
              onClick={() => window.location.href = '/learning'}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                background: '#0d9488',
                color: '#ffffff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              ← Tilbake til læringsmoduler
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
