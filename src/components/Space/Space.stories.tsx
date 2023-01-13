import * as React from 'react'
import { Space } from './index'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '../Button'

const ComponentMeta: Meta<typeof Space> = {
  title: 'Layout/Space',
  component: Space
}

export default ComponentMeta

const Template: StoryFn<typeof Space> = ({ ...args }) => (
  <Space {...args}>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
  </Space>
)

export const Playground = Template.bind({})

export const Wrap: StoryFn<typeof Space> = ({ ...args }) => (
  <Space {...args}>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
    <Button>Кнопка</Button>
  </Space>
)
Wrap.args = {
  wrap: true
}
