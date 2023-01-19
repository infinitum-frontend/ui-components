import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import viteSvgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), viteSvgr()],
  resolve: {
    alias: {
      Components: resolve(__dirname, './src/components/'),
      Icons: resolve(__dirname, './src/icons/'),
      Hooks: resolve(__dirname, './src/hooks/'),
      Test: resolve(__dirname, './test/')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './testSetup.ts'
  }
})
