import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import viteSvgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), viteSvgr()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, './'),
      Components: resolve(__dirname, './src/components/'),
      Icons: resolve(__dirname, './src/icons/'),
      Hooks: resolve(__dirname, './src/hooks/'),
      Utils: resolve(__dirname, './src/utils/'),
      Test: resolve(__dirname, './test/')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: string, fp: string) {
          return `@import "@/src/styles/global.scss";\n${source}`
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './testSetup.tsx',
    coverage: {
      provider: 'c8'
    }
  }
})
