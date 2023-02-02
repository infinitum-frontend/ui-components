import '../src/styles/global.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'clean',
    values: [
      {
        name: 'clean',
        value: '#fff'
      },
      {
        name: 'light',
        value: '#f2f4f5'
      },
      {
        name: 'dark',
        value: '#333333'
      }
    ]
  }
}
