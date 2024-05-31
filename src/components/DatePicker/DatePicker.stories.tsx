// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { NativeDatePicker, DatePicker } from './index'
import { Form } from '../Form'
import { Button } from '../Button'

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  args: {
    disabled: false,
    min: '2020-04-20'
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
