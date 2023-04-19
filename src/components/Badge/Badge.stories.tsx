import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Badge } from './index'
import { Box } from '../Box'
import { Text } from '../Text'
import { Space } from '../Space'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    badgeContent: 5
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

export const Standalone: StoryObj<typeof Badge> = {
  render: (args) => {
    return (
      <Space direction={'horizontal'} gap={'xxsmall'}>
        <Text tone={'secondary'}>Контроль структуры</Text>
        <Badge badgeContent={'10'} tone={'secondary'} />
      </Space>
    )
  }
}

export const Dot = {
  render: Template,

  args: {
    dot: true
  }
}

export const ShowZero = {
  render: Template,

  args: {
    badgeContent: 0,
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
    badgeContent: 100,
    maxCount: 99
  }
}
