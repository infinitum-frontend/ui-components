// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Form } from '../Form'
import { Space } from '../Space'
import { DatePicker, DatePickerInline, NativeDatePicker } from './index'
import { formatDateToISO } from '~/src/utils/date'
import { getNDaysAfter } from '@infinitum-ui/shared'

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  args: {
    disabled: false,
    min: formatDateToISO(new Date()),
    max: formatDateToISO(getNDaysAfter(5, new Date()))
  }
}

export default meta

const Template: StoryFn<typeof DatePicker> = (args) => {
  const [value, setValue] = useState('')

  return (
    <>
      <DatePicker {...args} value={value} onChange={setValue} />
      <span>Значение: {value}</span>
    </>
  )
}

export const Playground = {
  render: Template
}

export const NativeDatepicker = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <>
        <NativeDatePicker value={value} onChange={(val) => setValue(val)} />
        <div>{value}</div>
      </>
    )
  }
}

export const InForm: StoryFn<typeof DatePicker> = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Form
        onSubmit={() => {
          console.log('handleSubmit')
        }}
      >
        <Form.Group required>
          <DatePicker {...args} value={value} onChange={setValue} />
        </Form.Group>

        <Button type="submit">Click me</Button>
      </Form>
    )
  }
}

export const MinMax: StoryFn<typeof DatePicker> = {
  render: () => {
    const [firstValue, setFirstValue] = useState('')
    const [secondValue, setSecondValue] = useState('')

    return (
      <Form
        onSubmit={() => {
          console.log('handleSubmit')
        }}
      >
        <Form.Group required>
          <Form.Label>Дата от (должна быть не позже даты до)</Form.Label>
          <DatePicker
            min={formatDateToISO(new Date())}
            value={firstValue}
            onChange={setFirstValue}
            max={secondValue}
          />
        </Form.Group>
        <Form.Group required>
          <Form.Label>Дата до (должна быть не раньше даты от)</Form.Label>
          <DatePicker
            value={secondValue}
            onChange={setSecondValue}
            min={firstValue}
          />
        </Form.Group>

        <Button type="submit">Click me</Button>
      </Form>
    )
  }
}

export const NativeDatePickerOtherTypes: StoryFn<typeof DatePicker> = {
  render: () => {
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [value4, setValue4] = useState('')

    return (
      <Space>
        <Form.Group>
          <Form.Label>Дата type time</Form.Label>
          <NativeDatePicker value={value1} onChange={setValue1} type="time" />
          {value1}
        </Form.Group>
        <Form.Group>
          <Form.Label>Дата type datetime-local</Form.Label>
          <NativeDatePicker
            value={value2}
            onChange={setValue2}
            type="datetime-local"
          />
          {value2}
        </Form.Group>
        <Form.Group>
          <Form.Label>Дата type month</Form.Label>
          <NativeDatePicker value={value3} onChange={setValue3} type="month" />
          {value3}
        </Form.Group>
        <Form.Group>
          <Form.Label>Дата type week</Form.Label>
          <NativeDatePicker value={value4} onChange={setValue4} type="week" />
          {value4}
        </Form.Group>
      </Space>
    )
  }
}

export const InlineView: StoryFn<typeof DatePicker> = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Form
        onSubmit={() => {
          console.log('handleSubmit')
        }}
      >
        <Form.Group required>
          <DatePickerInline {...args} value={value} onChange={setValue} />
        </Form.Group>

        <Button type="submit">Click me</Button>
      </Form>
    )
  }
}

export const Clearable = {
  render: () => {
    const [value1, setValue1] = useState('2020-04-20')
    const [value2, setValue2] = useState('2020-04-20')

    return (
      <Space>
        <DatePicker clearable value={value1} onChange={setValue1} />
        <Space gap="xsmall">
          Передан проп onClear
          <DatePicker
            clearable
            value={value2}
            onChange={setValue2}
            onClear={() => {
              alert('Будет вызван onClear, но не onChange')
            }}
          />
        </Space>
      </Space>
    )
  }
}
