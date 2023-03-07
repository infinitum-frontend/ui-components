// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Select } from './index'
import { SelectOption } from './interface'
import { useState } from 'react'
import { SelectBaseOptions } from './fixture'
import { Button } from '../Button'

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
    <>
      <Select
        {...args}
        onChange={handleChange}
        value={value}
        style={{ width: '300px' }}
      />
      <Button>ewr</Button>
    </>
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
