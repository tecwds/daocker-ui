import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.50.82:4444',
        changeOrigin: true,
      },
    },
  }
})
