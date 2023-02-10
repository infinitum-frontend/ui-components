// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
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
export const Playground = Template.bind({})

export const Vertical: StoryFn<typeof Divider> = (args) => {
  return (
    <Space direction="horizontal">
      <Text>Lorem ipsum dolor sit amet.</Text>
      <Divider {...args} />
      <Text>Lorem ipsum dolor, sit amet consectetur adipisicing.</Text>
    </Space>
  )
}
Vertical.args = {
  orientation: 'vertical'
}
