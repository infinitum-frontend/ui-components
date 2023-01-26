// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Checkbox, CheckboxGroup } from './index'
import { useState } from 'react'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'CheckboxGroup',
  component: CheckboxGroup
}

export default meta

export const Playground: StoryFn<typeof CheckboxGroup> = (args) => {
  const [checked, setChecked] = useState<string[]>(['2'])
  const handleChange = (val: string[]): void => {
    setChecked(val)
  }
  return (
    <>
      <CheckboxGroup onChange={handleChange} value={checked}>
        <Checkbox value="1">Облигации внешних облигационных займов РФ</Checkbox>
        <Checkbox value="2">Облигации государственных компаний</Checkbox>
        <Checkbox value="3">Облигации государственных корпораций</Checkbox>
      </CheckboxGroup>
      <div style={{ marginTop: '12px' }}>Выбрано: [{checked}]</div>
    </>
  )
}
