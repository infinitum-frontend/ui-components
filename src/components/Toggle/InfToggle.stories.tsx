import * as React from 'react'
import { InfToggle } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof InfToggle> = {
  title: 'Toggle',
  component: InfToggle
}

export default ComponentMeta

const Template: StoryFn<typeof InfToggle> = ({ ...args }) => {
  return (
    <InfToggle />
  )
}

export const Playground = Template.bind({})
