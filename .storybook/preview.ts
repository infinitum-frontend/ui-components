import '../src/styles/global.scss'
import { Preview } from '@storybook/react'

export const preview: Preview = {
  parameters: {
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
        order: [
          'Intro',
          'Components',
          'Typography',
          'Form',
          'Overlay',
          'Layout',
          'Demo'
        ]
      }
    }
  }
}
