const { mergeConfig } = require('vite')
module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
    'storybook-addon-themes'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    storyStoreV7: true
  },
  docs: {
    autodocs: true,
    docsName: 'Docs'
  },
  staticDirs: ['../static'],
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
  }
}
