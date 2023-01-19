// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Select, selectDataFormatter } from './index'
import { SelectOption } from './interface'
import { useState } from 'react'

const mockItems = [
  { text: 'Депозитарные услуги', value: 0 },
  { text: 'Спецдепозитарные услуги', value: 1 },
  { text: 'Консалтинг и аутсорсинг', value: 2 }
]

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  args: {
    options: selectDataFormatter({
      value: 'value',
      array: mockItems,
      label: 'text'
    })
  }
}

export default meta

const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = useState<number | string | undefined>(undefined)

  const handleChange: (item: SelectOption) => void = (item) => {
    setValue(item.value)
  }

  return (
    <Select
      {...args}
      onChange={handleChange}
      value={value}
      style={{ width: '300px' }}
    />
  )
}

export const Playground = Template.bind({})

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  autoFocus: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
