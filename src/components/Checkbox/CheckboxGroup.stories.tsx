// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { CheckboxGroup } from './index'
import { useState } from 'react'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'CheckboxGroup',
  component: CheckboxGroup
}

export default meta

export const Playground: StoryFn<typeof CheckboxGroup> = (args) => {
  const [checked, setChecked] = useState<Array<string | number>>([2])
  const handleChange = (val: Array<string | number>): void => {
    setChecked(val)
  }
  return (
    <>
      <CheckboxGroup onChange={handleChange} checkedList={checked}>
        <CheckboxGroup.Checkbox value={1}>Облигации внешних облигационных займов РФ</CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox value={2}>Облигации государственных компаний</CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox value={3}>Облигации государственных корпораций</CheckboxGroup.Checkbox>
      </CheckboxGroup>
      <div style={{ marginTop: '12px' }}>Выбрано: [{checked}]</div>
    </>
  )
}
