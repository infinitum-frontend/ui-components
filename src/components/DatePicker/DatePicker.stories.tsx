import { StoryFn, Meta } from '@storybook/react'
import { NativeDatePicker, DatePicker } from './index'
import { useState } from 'react'
import { Form } from '../Form'
import { Button } from '../Button'

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  args: {
    disabled: false
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

export const InForm = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Form
        onSubmit={() => {
          console.log('handleSubmit')
        }}
      >
        <Form.Group required>
          <DatePicker value={value} onChange={setValue} />
        </Form.Group>

        <Button type="submit">Click me</Button>
      </Form>
    )
  }
}
