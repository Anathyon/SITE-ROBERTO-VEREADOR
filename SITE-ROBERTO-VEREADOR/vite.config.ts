import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/components/ui': path.resolve(__dirname, './src/components'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ── Proxy de desenvolvimento ──────────────────────────────────────────────
  // Em produção as chamadas vão direto para VITE_API_URL.
  // Em dev (localhost), o Vite faz proxy para o backend e injeta o Origin
  // correto, evitando o bloqueio de CORS do servidor.
  server: {
    proxy: {
      '/api-proxy': {
        target: 'https://painel.robertinhoce.com.br',
        changeOrigin: true,      // substitui o Origin pelo do target
        secure: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, '/api/v1'),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer'
          }
          if (
            id.includes('node_modules/@tanstack/react-router/') ||
            id.includes('node_modules/@tanstack/react-query/') ||
            id.includes('node_modules/@tanstack/react-start/')
          ) {
            return 'tanstack'
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
})
