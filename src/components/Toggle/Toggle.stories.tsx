// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Toggle } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle
}

export default ComponentMeta

const Template: StoryFn<typeof Toggle> = ({ ...args }) => {
  return <Toggle {...args} />
}

export const Playground = Template.bind({})
Playground.args = {
  checked: true
}
