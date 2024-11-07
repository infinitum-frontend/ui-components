import '../src/styles/global.scss'
import type { Preview } from '@storybook/react'
import { themes } from './theme'
import { WithTheme } from './decorators/withTheme'

const preview: Preview = {
  decorators: [WithTheme],
  parameters: {
    docs: {
      theme: themes.light
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: { disable: true },
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
          [
            'Alert',
            'Badge',
            'Breadcrumbs',
            ['Docs', 'Documentation', '*'],
            '*',
            'Table',
            ['Docs', 'CustomMarkup', '*'],
            'Tabs',
            ['Docs', 'WithRouting', '*']
          ],
          'Typography',
          'Form',
          'Overlay',
          'Layout',
          'Demo'
        ]
      }
    }
  },
  globalTypes: {
    theme: {
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', right: '☼', title: 'Light' },
          { value: 'dark', right: '☾', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  }
}

export const tags = ['autodocs', 'autodocs', 'autodocs']

export default preview
