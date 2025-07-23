// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { formatDateToISO, addYears } from '~/src/utils/date'
import DateWeekPicker, { DateWeekPickerValue } from './DateWeekPicker'
import { Form } from '../Form'
import { Button } from '../Button'

const meta: Meta<typeof DateWeekPicker> = {
  title: 'Form/DateWeekPicker',
  component: DateWeekPicker,
  args: {
    min: formatDateToISO(new Date()),
    max: formatDateToISO(addYears(new Date(), 1))
  }
}

export default meta

const Template: StoryFn<typeof DateWeekPicker> = (args) => {
  const [value, setValue] = useState<DateWeekPickerValue>(['', ''])
  return (
    <DateWeekPicker
      {...args}
      value={value}
      onChange={setValue}
      style={{ width: '400px' }}
    />
  )
}

export const Playground = {
  args: {
    disabled: false
  },

  render: Template
}

export const InForm = {
  render: () => {
    const [value, setValue] = useState<DateWeekPickerValue>(['', ''])
    return (
      <Form
        onSubmit={() => {
          console.log('submit')
        }}
      >
        <Form.Group required>
          <Form.Label>DateWeekPicker</Form.Label>
          <DateWeekPicker value={value} onChange={setValue} />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}
