// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DateWeekRangeCalendar } from './index'
import { useState } from 'react'
import { DateWeekRangeCalendarValue } from './DateWeekRangeCalendar'

const meta: Meta<typeof DateWeekRangeCalendar> = {
  title: 'Components/DateWeekRangeCalendar',
  component: DateWeekRangeCalendar
}

export default meta

const Template: StoryFn<typeof DateWeekRangeCalendar> = (args) => {
  const [value, setValue] = useState<DateWeekRangeCalendarValue>([
    undefined,
    undefined
  ])

  return <DateWeekRangeCalendar {...args} value={value} onChange={setValue} />
}

export const Playground = {
  render: Template
}
