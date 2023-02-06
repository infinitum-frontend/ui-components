// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Space } from './index'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '../Button'
import { Text } from '../Text'

const ComponentMeta: Meta<typeof Space> = {
  title: 'Layout/Space',
  component: Space,
  argTypes: {
    as: {
      defaultValue: 'div'
    }
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

export const Direction: StoryFn<typeof Space> = ({ ...args }) => (
  <>
    <Text>horizontal</Text>
    <Space {...args} direction="horizontal">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
    <Text>vertical</Text>
    <Space {...args}>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
  </>
)
Direction.decorators = [
  (Story) => (
    <Space direction="vertical" gap="xsmall">
      {Story()}
    </Space>
  )
]

export const Gap: StoryFn<typeof Space> = ({ ...args }) => (
  <>
    <Text>xxsmall</Text>
    <Space {...args} gap="xxsmall">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
    <Text>xsmall</Text>
    <Space {...args} gap="xsmall">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
    <Text>small</Text>
    <Space {...args} gap="small">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
    <Text>medium</Text>
    <Space {...args} gap="medium">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
    <Text>large</Text>
    <Space {...args} gap="large">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
    <Text>xlarge</Text>
    <Space {...args} gap="xlarge">
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
      <Button>Кнопка</Button>
    </Space>
  </>
)
Gap.decorators = [
  (Story) => (
    <Space direction="vertical" gap="xsmall">
      {Story()}
    </Space>
  )
]

export const Align: StoryFn<typeof Space> = ({ ...args }) => (
  <>
    <Space {...args} align="baseline">
      <Text size="small">Baseline</Text>
      <Button style={{ height: '40px' }}>Кнопка</Button>
      <Button style={{ height: '80px' }}>Кнопка</Button>
    </Space>
    <Space {...args} align="start">
      <Text size="small">Start</Text>
      <Button style={{ height: '40px' }}>Кнопка</Button>
      <Button style={{ height: '80px' }}>Кнопка</Button>
    </Space>
    <Space {...args} align="end">
      <Text size="small">End</Text>
      <Button style={{ height: '40px' }}>Кнопка</Button>
      <Button style={{ height: '80px' }}>Кнопка</Button>
    </Space>
    <Space {...args} align="center">
      <Text size="small">Center</Text>
      <Button style={{ height: '40px' }}>Кнопка</Button>
      <Button style={{ height: '80px' }}>Кнопка</Button>
    </Space>
  </>
)
Align.decorators = [
  (Story) => (
    <Space direction="vertical" gap="medium">
      {Story()}
    </Space>
  )
]
