// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { formatDateToISO, addYears } from '~/src/utils/date'
import WeekPicker, { WeekPickerValue } from './WeekPicker'

const meta: Meta<typeof WeekPicker> = {
  title: 'Form/WeekPicker',
  component: WeekPicker,
  args: {
    min: formatDateToISO(new Date()),
    max: formatDateToISO(addYears(new Date(), 1))
  }
}

export default meta

const Template: StoryFn<typeof WeekPicker> = (args) => {
  const [value, setValue] = useState<WeekPickerValue>(['', ''])
  return (
    <WeekPicker
      {...args}
      value={value}
      onChange={setValue}
      style={{ width: '400px' }}
    />
  )
}

export const Playground = {
  render: Template
}
