// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Heading } from './index'
import { Space } from '../Space'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

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

export const Playground = {
  render: Template
}

export const Levels: StoryObj<typeof Heading> = {
  render: (args) => (
    <>
      <Heading {...args} level="1" />
      <Heading {...args} level="2" />
      <Heading {...args} level="3" />
      <Heading {...args} level="4" />
      <Heading {...args} level="5" />
    </>
  ),

  decorators: [
    (Story) => (
      <Space direction="vertical" gap="small">
        {Story()}
      </Space>
    )
  ]
}

export const HasMargin: StoryObj<typeof Heading> = {
  render: (args) => (
    <>
      <Heading {...args} />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ab harum
        dolore. Aperiam quae tempore, temporibus impedit accusantium accusamus
        culpa distinctio, nesciunt omnis ab, officiis praesentium nulla
        voluptatem esse molestias.
      </div>
    </>
  ),

  args: {
    hasMargin: true
  }
}
