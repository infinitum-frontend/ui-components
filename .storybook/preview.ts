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
  },
  options: {
    storySort: {
      includeNames: true,
      order: [
        'Intro',
        ['Старт', 'Дизайн-токены'],
        'Components',
        // отображаем все истории, затем отображаем Tabs и сортируем в указанном порядке.
        // если нужно другие сторисы сортировать, дописываем их аналогичным образом: ['*', 'Table', 'Tabs', ['Docs', 'WithRouting', '*']]
        // единственная проблема - если сториса где то по центру, придется вручную писать все предыдущие/последующие сторис
        // https://github.com/storybookjs/storybook/issues/16573
        ['*', 'Tabs', ['Docs', 'WithRouting', '*']],
        'Typography',
        'Form',
        'Overlay',
        'Layout',
        'Demo'
      ]
    }
  }
}
