// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Divider } from './index'
import { Space } from 'Components/Space'
import { Text } from 'Components/Text'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider
}

export default meta

const Template: StoryFn<typeof Divider> = (args) => {
  return (
    <Space>
      <Text>Lorem ipsum dolor sit amet.</Text>
      <Divider {...args} />
      <Text>Lorem ipsum dolor, sit amet consectetur adipisicing.</Text>
    </Space>
  )
}

export const Playground = {
  render: Template
}

export const Vertical: StoryObj<typeof Divider> = {
  render: () => {
    return (
      <Space direction="horizontal">
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Divider orientation="vertical" />
        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing.</Text>
      </Space>
    )
  }
}

export const WithText: StoryObj<typeof Divider> = {
  render: Template,
  args: {
    children: 'Это текст'
  }
}

export const VerticalWithText: StoryObj<typeof Divider> = {
  render: () => {
    return (
      <Space direction="horizontal">
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Divider orientation="vertical">Это текст</Divider>
        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing.</Text>
      </Space>
    )
  }
}
