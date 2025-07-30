// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Form } from '../Form'
import { Space } from '../Space'
import { DateRangePicker, DateRangePickerValue } from './index'
import { formatDateToISO, addYears } from '~/src/utils/date'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
  args: {
    // min: formatDateToISO(new Date()),
    max: formatDateToISO(addYears(new Date(), 1))
  }
}

export default meta

const Template: StoryFn<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>([
    formatDateToISO(new Date()),
    formatDateToISO(addYears(new Date(), 1))
  ])
  return (
    <>
      <DateRangePicker
        {...args}
        value={value}
        onChange={setValue}
        style={{ width: '400px' }}
      />

      <div>{value.join(' - ')}</div>
    </>
  )
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

export const Clearable = {
  render: () => {
    const [value1, setValue1] = useState<DateRangePickerValue>([
      '2020-04-20',
      '2020-04-21'
    ])

    return (
      <Space>
        <DateRangePicker clearable value={value1} onChange={setValue1} />
      </Space>
    )
  }
}
