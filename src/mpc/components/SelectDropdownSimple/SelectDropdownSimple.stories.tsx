import { StoryFn, Meta } from '@storybook/react'
import { SelectDropdownSimple } from './index'
import { useState } from 'react'
import { OptionsFixture } from '../SelectDropdown/__fixture__'

const meta: Meta<typeof SelectDropdownSimple> = {
  title: 'MPC/SelectDropdownSimple',
  component: SelectDropdownSimple
}

export default meta

const Template: StoryFn<typeof SelectDropdownSimple> = (args) => {
  const [selected, setSelected] = useState(OptionsFixture[0].id)
  return (
    <SelectDropdownSimple
      {...args}
      chosenId={selected}
      onChange={(value) => setSelected(value)}
      data={OptionsFixture}
    />
  )
}

export const Playground = {
  render: Template
}
