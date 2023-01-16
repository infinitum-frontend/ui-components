// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Box } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof Box> = {
  title: 'Box',
  component: Box,
  argTypes: {
    children: {
      defaultValue: 'Съешь ещё этих мягких французских булок, да выпей чаю'
    }
  }
}

export default Meta

const Template: ComponentStory<typeof Box> = ({ ...args }) => <Box {...args} />

export const Playground = Template.bind({})
