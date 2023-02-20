import { StoryFn, Meta } from '@storybook/react'
import { SelectCalendar } from './index'
import { useState } from 'react'

const meta: Meta<typeof SelectCalendar> = {
  title: 'MPC/SelectCalendar',
  component: SelectCalendar,
  args: {
    prefix: 'prefix'
  }
}

export default meta

const Template: StoryFn<typeof SelectCalendar> = (args) => {
  const [date, setDate] = useState('')
  return (
    <SelectCalendar
      {...args}
      onChange={(value) => setDate(value)}
      chosenDate={date}
    />
  )
}

export const Playground = Template.bind({})
