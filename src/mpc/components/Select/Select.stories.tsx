import { StoryFn, Meta } from '@storybook/react'
import { Select } from './index'
import { OptionsFixture } from './__fixture__'
import { useState } from 'react'

const meta: Meta<typeof Select> = {
  title: 'MPC/Select',
  component: Select
}

export default meta

const Template: StoryFn<typeof Select> = (args) => {
  const [selected, setSelected] = useState('')

  const handleChange = (value: string): void => {
    setSelected(value)
  }

  return (
    <Select
      {...args}
      data={OptionsFixture}
      placeHolder={'Выберите значение'}
      onChange={handleChange}
      chosenId={selected}
    />
  )
}

export const Playground = {
  render: Template
}
