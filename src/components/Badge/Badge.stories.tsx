import { StoryFn, Meta } from '@storybook/react'
import { Badge } from './index'
import { Box } from '../Box'

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge
}

export default meta

const Template: StoryFn<typeof Badge> = (args) => {
  return (
    <Badge {...args} badgeContent={5}>
      <Box style={{ width: '36px', height: '36px' }} />
    </Badge>
  )
}

export const Playground = Template.bind({})
