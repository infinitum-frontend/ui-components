// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Switch } from './index'
import { Space } from '../Space'

const ComponentMeta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch
}

export default ComponentMeta

const Template: StoryFn<typeof Switch> = ({ ...args }) => {
  const [isChecked, setIsChecked] = useState(true)

  function handleChange(): void {
    console.log('change', isChecked)
    setIsChecked(!isChecked)
  }

  return (
    <Space align="start">
      <Switch {...args} checked={isChecked} onChange={handleChange} />
      <span>{isChecked ? 'checked' : 'not checked'}</span>
    </Space>
  )
}

export const Playground = {
  render: Template,

  args: {
    label: ''
  }
}

export const WithLabel = {
  render: Template,

  args: {
    label: 'Только показатели с нарушениями'
  }
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true,
    label: 'Только показатели с нарушениями'
  }
}
