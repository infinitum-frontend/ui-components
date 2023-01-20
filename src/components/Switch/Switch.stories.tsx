// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Switch } from './index'
import { Space } from '../Space'

const ComponentMeta: Meta<typeof Switch> = {
  title: 'Switch',
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

export const Playground = Template.bind({})
Playground.args = {
  label: ''
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Только показатели с нарушениями'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'Только показатели с нарушениями'
}
