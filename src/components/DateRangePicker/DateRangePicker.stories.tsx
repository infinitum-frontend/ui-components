// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DateRangePicker, DateRangePickerValue } from './index'
import { useState } from 'react'
import { Form } from '../Form'
import { Button } from '../Button'
import { addYears, formatDateToISO } from '../../utils/date'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
  args: {
    min: formatDateToISO(new Date()),
    max: formatDateToISO(addYears(new Date(), 1))
  }
}

export default meta

const Template: StoryFn<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>(['', ''])
  return <DateRangePicker {...args} value={value} onChange={setValue} />
}

export const Playground = {
  render: Template
}

export const InForm: StoryFn<typeof DateRangePicker> = {
  render: (args) => {
    const [value, setValue] = useState<DateRangePickerValue>(['', ''])
    return (
      <Form onSubmit={() => console.log('submit')}>
        <Form.Group required>
          <DateRangePicker
            {...args}
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export const WeekPicker: StoryFn<typeof DateRangePicker> = {
  render: (args) => {
    const [value, setValue] = useState<DateRangePickerValue>(['', ''])
    return (
      <Form onSubmit={() => console.log('submit')}>
        <Form.Group required>
          <DateRangePicker
            {...args}
            weekPick
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}
