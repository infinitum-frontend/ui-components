// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Heading } from './index'
import { Space } from '../Space'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Заголовок'
  },
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    }
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Heading> = ({ ...args }) => <Heading {...args} />

export const Playground = Template.bind({})

export const Levels: StoryFn<typeof Heading> = (args) => (
  <>
    <Heading {...args} level="1" />
    <Heading {...args} level="2" />
    <Heading {...args} level="3" />
    <Heading {...args} level="4" />
    <Heading {...args} level="5" />
  </>
)
Levels.decorators = [
  (Story) => (
    <Space direction="vertical" gap="small">
      {Story()}
    </Space>
  )
]
