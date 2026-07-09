import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": "/src" } },
  // Lås dev-porten til 5173 (strictPort ⇒ feil heller enn å hoppe til 5174),
  // så ?dev=1-kalibrering og headless-diagnostikk alltid treffer samme URL.
  server: { port: 5173, strictPort: true },
})
