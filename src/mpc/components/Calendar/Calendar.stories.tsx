import { StoryFn, Meta } from '@storybook/react'
import { Calendar } from './index'

const meta: Meta<typeof Calendar> = {
  title: 'MPC/Calendar',
  component: Calendar
}

export default meta

const Template: StoryFn<typeof Calendar> = (args) => <Calendar {...args} />

export const Playground = Template.bind({})
