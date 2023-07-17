// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DateRangeCalendar } from './index'
import { useState } from 'react'
import { DateRangeCalendarValue } from './DateRangeCalendar'

const meta: Meta<typeof DateRangeCalendar> = {
  title: 'Components/DateRangeCalendar',
  component: DateRangeCalendar
}

export default meta

const Template: StoryFn<typeof DateRangeCalendar> = (args) => {
  const [value, setValue] = useState<DateRangeCalendarValue>([
    undefined,
    undefined
  ])

  return <DateRangeCalendar {...args} value={value} onChange={setValue} />
}

export const Playground = {
  render: Template
}
