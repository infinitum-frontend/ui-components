// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DateRangePicker, DateRangePickerValue } from './index'
import { useState } from 'react'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker
}

export default meta

const Template: StoryFn<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>(['', ''])
  return <DateRangePicker {...args} value={value} onChange={setValue} />
}

export const Playground = {
  render: Template
}
