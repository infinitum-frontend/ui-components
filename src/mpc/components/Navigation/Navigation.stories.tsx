import { StoryFn, Meta } from '@storybook/react'
import { Navigation } from './index'

const meta: Meta<typeof Navigation> = {
  title: 'MPC/Tabs',
  component: Navigation
}

export default meta

const Template: StoryFn<typeof Navigation> = (args) => <Navigation {...args} />

export const Playground = Template.bind({})
