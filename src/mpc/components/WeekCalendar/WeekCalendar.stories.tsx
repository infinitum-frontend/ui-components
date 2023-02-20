import { StoryFn, Meta } from '@storybook/react'
import { WeekCalendar } from './index'

const meta: Meta<typeof WeekCalendar> = {
  title: 'MPC/WeekCalendar',
  component: WeekCalendar
}

export default meta

const Template: StoryFn<typeof WeekCalendar> = (args) => (
  <WeekCalendar {...args} />
)

export const Playground = Template.bind({})
