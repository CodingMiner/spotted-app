/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: '/spotted-app/',
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: ["polyhydroxy-alecia-flexuously.ngrok-free.dev"],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
