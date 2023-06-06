// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Heading } from './index'
import { Space } from '../Space'
import { Text } from '../Text'
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

export const Truncated: StoryObj<typeof Heading> = {
  render: (args) => (
    <>
      <Heading {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ab harum
        dolore. Aperiam quae tempore, temporibus impedit accusantium accusamus
        culpa distinctio, nesciunt omnis ab, officiis praesentium nulla
        voluptatem esse molestias.
      </Heading>
    </>
  ),

  args: {
    level: '1',
    truncated: true
  }
}

export const Align: StoryObj<typeof Heading> = {
  render: (args) => (
    <>
      <Heading align="left">Left</Heading>
      <Heading align="center">Center</Heading>
      <Heading align="right">Right</Heading>
    </>
  )
}

export const DifferentTheme: StoryObj<typeof Heading> = {
  render: (args) => (
    <Space direction="horizontal" gap="xxlarge">
      <Space>
        <Text>Стандартная тема</Text>
        <Heading level="1">Заголовок</Heading>
        <Heading level="2">Заголовок</Heading>
        <Heading level="3">Заголовок</Heading>
        <Heading level="4">Заголовок</Heading>
      </Space>
      <Space className="inf-ui-test-theme">
        <Text>Кастомная тема</Text>
        <Heading level="1">Заголовок</Heading>
        <Heading level="2">Заголовок</Heading>
        <Heading level="3">Заголовок</Heading>
        <Heading level="4">Заголовок</Heading>
      </Space>
    </Space>
  ),

  args: {
    level: '1',
    truncated: true
  }
}
