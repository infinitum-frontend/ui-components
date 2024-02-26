// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { DateRangePicker, DateRangePickerValue } from './index'
import { useState } from 'react'
import { Form } from '../Form'
import { Button } from '../Button'

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

export const InForm = {
  render: () => {
    const [value, setValue] = useState<DateRangePickerValue>(['', ''])
    return (
      <Form onSubmit={() => console.log('submit')}>
        <Form.Group required>
          <DateRangePicker
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            min={'2024-02-15'}
            max={'2024-03-15'}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}
