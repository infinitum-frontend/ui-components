import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import viteSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
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
          // не добавляем второй импорт в globals
          if (fp.match('global.scss')) {
            return source
          }

          return `@import "@/src/styles/mixins.scss";\n${source}`
        }
      }
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/styles/global.scss')
      ],
      name: 'ui-components',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'React-Dom'
        }
      }
    }
  }
})

// НА будущее
// import path, {resolve} from 'path'
// const getIcons = () => {
//   const pathToIcons = path.resolve(__dirname, '/src/components/Icon')
//   const result = {}
//   const files = fs.readdirSync(pathToIcons)
//   const resultFiles = files.filter(file => (file.startsWith('Icon') || file.startsWith('index')) && !file.match('stories'))
//
//   resultFiles.forEach(file => {
//     console.log(resolve(pathToIcons, file))
//     result[`${file.slice(0, file.endsWith('ts') ? -3 : -4)}`] = resolve(pathToIcons + '/' + file)
//   })
//
//   return resultFiles.map(file => resolve(pathToIcons, file))
// }
