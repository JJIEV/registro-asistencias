import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mifactura-portal/',
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      'jss-plugin-{}': 'jss-plugin-global'
    },
  },
  plugins: [react()],
  define: {
  }
})

