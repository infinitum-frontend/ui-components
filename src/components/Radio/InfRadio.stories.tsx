import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfRadio } from './index'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof InfRadio> = {
  title: 'Radio',
  component: InfRadio
}

export default meta

const Template: StoryFn<typeof InfRadio> = (args) => {
  return (<InfRadio {...args} onChange={action('change')}>Radio</InfRadio>)
}

export const Playground = Template.bind({})
