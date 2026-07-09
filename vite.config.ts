import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": "/src" } },
  // Port-lås: denne worktreen (jobb/klesbutikk) kjører ALLTID på 5174 og feiler
  // hvis porten er opptatt (strictPort) — ingen stille auto-bump til en annen
  // port som kolliderer med hovedtreet. Hovedtreet (spor A / main) skal låses
  // tilsvarende til 5173 — den endringen hører til main, IKKE denne grenen.
  server: { port: 5174, strictPort: true },
})
