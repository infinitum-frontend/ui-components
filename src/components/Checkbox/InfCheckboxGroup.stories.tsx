import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfCheckboxGroup } from './index'
import { useState } from 'react'

const meta: Meta<typeof InfCheckboxGroup> = {
  title: 'CheckboxGroup',
  component: InfCheckboxGroup
}

export default meta

export const Playground: StoryFn<typeof InfCheckboxGroup> = (args) => {
  const [checked, setChecked] = useState<Array<string | number>>([2])
  const handleChange = (val: Array<string | number>): void => {
    setChecked(val)
  }
  return (
    <>
      <InfCheckboxGroup onChange={handleChange} checkedList={checked}>
        <InfCheckboxGroup.Checkbox value={1}>Облигации внешних облигационных займов РФ</InfCheckboxGroup.Checkbox>
        <InfCheckboxGroup.Checkbox value={2}>Облигации государственных компаний</InfCheckboxGroup.Checkbox>
        <InfCheckboxGroup.Checkbox value={3}>Облигации государственных корпораций</InfCheckboxGroup.Checkbox>
      </InfCheckboxGroup>
      <div style={{ marginTop: '12px' }}>Выбрано: [{checked}]</div>
    </>
  )
}
