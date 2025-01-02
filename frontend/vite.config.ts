import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    // Customize further if needed
  },
  server: {
    proxy: {
      '/api': 'https://api.fragnifique.prabhatkumar.site'
    },
  },
  plugins: [react()],
})
