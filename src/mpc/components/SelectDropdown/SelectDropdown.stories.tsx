import { StoryFn, Meta } from '@storybook/react'
import { SelectDropdown } from './index'
import { OptionsFixture } from './__fixture__'
import { useState } from 'react'

const meta: Meta<typeof SelectDropdown> = {
  title: 'MPC/SelectDropdown',
  component: SelectDropdown
}

export default meta

const Template: StoryFn<typeof SelectDropdown> = (args) => {
  const [selected, setSelected] = useState('')

  return (
    <SelectDropdown
      {...args}
      placeHolder={'Тип'}
      data={OptionsFixture}
      onChange={(value) => setSelected(value)}
      chosenId={selected}
    />
  )
}

export const Playground = Template.bind({})
