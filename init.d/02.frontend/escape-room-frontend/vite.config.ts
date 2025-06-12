import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/cat': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
      '/orb': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
      '/tome': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
      '/photoframe': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
    },
  },
})
