import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/riddles': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
    },
    fs: {
      allow: [
        '.', // project root
        path.resolve(__dirname, '../../../../k8s-escape-room-basement/frontend/assets'),
        path.resolve(__dirname, '../../../../k8s-escape-room-attic/frontend/assets'),
        // ...add more as needed
      ]
    }
  },
})
