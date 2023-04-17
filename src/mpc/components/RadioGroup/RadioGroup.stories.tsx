import { StoryFn, Meta } from '@storybook/react'
import { RadioGroup } from './index'
import { useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'MPC/RadioGroup',
  component: RadioGroup
}

export default meta

const Template: StoryFn<typeof RadioGroup> = (args) => {
  const [checkedId, setCheckedId] = useState<string | number>('')

  return (
    <RadioGroup
      name={'radio'}
      data={[
        { id: 0, title: 'Радиокнопка 1' },
        { id: 1, title: 'Радиокнопка 2' }
      ]}
      onChange={(value) => setCheckedId(value)}
      checkedId={checkedId}
    />
  )
}

export const Playground = {
  render: Template
}
