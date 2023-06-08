// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Select, selectDataFormatter } from './index'
import { SelectOption } from './types'
import { useState } from 'react'
import { SelectBaseOptions, SelectOptionsRawLong } from './fixtures'

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  args: {
    options: SelectBaseOptions
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
      style={args.style || { width: '300px' }}
    />
  )
}

export const Playground = {
  render: Template
}

export const AutoFocus = {
  render: Template,

  args: {
    autoFocus: true
  }
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true
  }
}

export const Scrollable = {
  render: Template,

  args: {
    maxItemsCount: 5,
    options: selectDataFormatter({
      array: SelectOptionsRawLong,
      value: 'id',
      label: 'name'
    })
  }
}

export const Overflow = {
  render: Template,

  args: {
    style: { width: '100px' }
  }
}
