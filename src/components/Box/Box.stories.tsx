// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Box } from './index'

const meta: Meta<typeof Box> = {
  title: 'Box',
  component: Box,
  argTypes: {
    children: {
      defaultValue:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, accusantium. 123'
    }
  }
}

export default meta

const Template: StoryFn<typeof Box> = (args) => {
  return <Box {...args} />
}

export const Playground = Template.bind({})
