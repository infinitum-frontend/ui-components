import { StoryFn, Meta } from '@storybook/react'
import { Badge } from './index'
import { Box } from '../Box'
import { Text } from '../Text'
import { Space } from '../Space'

const meta: Meta<typeof Badge> = {
  title: 'Badge',
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

export const Playground = Template.bind({})

export const Standalone: StoryFn<typeof Badge> = (args) => {
  return (
    <Space direction={'horizontal'} gap={'xxsmall'}>
      <Text tone={'secondary'}>Контроль структуры</Text>
      <Badge badgeContent={'10'} tone={'secondary'} />
    </Space>
  )
}

export const Dot = Template.bind({})
Dot.args = {
  dot: true
}

export const ShowZero = Template.bind({})
ShowZero.args = {
  badgeContent: 0,
  showZero: true
}

export const Offset = Template.bind({})
Offset.args = {
  offset: [-5, 10]
}

export const MaxCount = Template.bind({})
MaxCount.args = {
  badgeContent: 100,
  maxCount: 99
}
