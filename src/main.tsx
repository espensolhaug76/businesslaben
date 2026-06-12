import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/themes.css'
import App from './App.tsx'

// This app has no service worker, but a stale sw.js from an earlier project on
// the same localhost origin keeps intercepting requests ("FetchEvent network
// error"). Unregister anything found; takes effect on the next reload.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(regs => regs.forEach(reg => {
      reg.unregister().then(ok => {
        if (ok) console.log(`[main] unregistered stale service worker: ${reg.scope}`)
      })
    }))
    .catch(() => { /* SW API unavailable (e.g. insecure context) — ignore */ })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
