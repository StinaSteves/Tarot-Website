import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index.html', 'impressum/index.html', 'datenschutz/index.html', 'agb/index.html'].map(path => [path, fileURLToPath(new URL(path, import.meta.url))])),
    },
  },
  server: { proxy: { '/api': 'http://127.0.0.1:3001' } },
})
