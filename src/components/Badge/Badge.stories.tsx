// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Badge } from './index'
import { Box } from '../Box'
import { Space } from '../Space'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    count: 5
  }
}

export default meta

const Template: StoryFn<typeof Badge> = (args) => {
  return (
    <Badge {...args}>
      <Box style={{ width: '36px', height: '36px', backgroundColor: 'gray' }} />
    </Badge>
  )
}

export const Playground = {
  render: Template
}

export const Dot = {
  render: Template,

  args: {
    dot: true
  }
}

export const DotWithoutChildren = {
  render: (args) => {
    return (
      <Space direction="horizontal">
        Индикатор точка
        <Badge {...args} />
      </Space>
    )
  },

  args: {
    dot: true
  }
}

export const ShowZero = {
  render: Template,

  args: {
    count: 0,
    showZero: true
  }
}

export const Offset = {
  render: Template,

  args: {
    offset: [-5, 10]
  }
}

export const MaxCount = {
  render: Template,

  args: {
    count: 100,
    maxCount: 99
  }
}
