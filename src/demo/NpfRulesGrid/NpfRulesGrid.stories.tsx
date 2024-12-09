// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import IndicatorsPage from './components/IndicatorsPage'

const meta: Meta = {
  title: 'Demo/NpfRulesGrid',
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

const Template: StoryFn = (args) => {
  return <IndicatorsPage />
}

export const Demo = {
  render: Template
}
