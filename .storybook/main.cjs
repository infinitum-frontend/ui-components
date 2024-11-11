const { mergeConfig } = require('vite')
module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  core: {
    disableTelemetry: true // 👈 Disables telemetry
  },
  docs: {
    autodocs: true,
    docsName: 'Docs'
  },
  staticDirs: ['../static', '../public'],
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData(source, fp) {
              // не добавляем второй импорт в globals
              if (fp.match('global.scss')) {
                return source
              }
              return `@import "@/src/styles/mixins.scss";\n${source}`
            }
          }
        }
      }
    })
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
