import { StoryFn, Meta } from '@storybook/react'
import { NativeDatePicker } from './index'
import { useState } from 'react'

const meta: Meta<typeof NativeDatePicker> = {
  title: 'Form/DatePicker',
  component: NativeDatePicker,
  args: {
    disabled: false
  }
}

export default meta

const Template: StoryFn<typeof NativeDatePicker> = (args) => {
  const [value, setValue] = useState('')

  return (
    <>
      <NativeDatePicker
        {...args}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <div>{value}</div>
    </>
  )
}

export const Playground = {
  render: Template
}
