import { StoryFn, Meta } from '@storybook/react'
import { NativeDatePicker, DatePicker } from './index'
import { useState } from 'react'

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
