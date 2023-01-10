import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfRadioGroup } from './index'
import { ChangeEvent, useState } from 'react'

const meta: Meta<typeof InfRadioGroup> = {
  title: 'RadioGroup',
  component: InfRadioGroup
}

export default meta

export const Playground: StoryFn<typeof InfRadioGroup> = (args) => {
  const [state, setState] = useState<string>('')

  const handleChange = (e: ChangeEvent, val: string): void => {
    setState(val)
  }

  return (
    <div>
      <InfRadioGroup
        name={'radio'}
        value={state}
        onChange={handleChange}>
        <InfRadioGroup.Radio value={'1'}>Облигации внешних облигационных займов РФ</InfRadioGroup.Radio>
        <InfRadioGroup.Radio value={'2'}>Облигации государственных компаний</InfRadioGroup.Radio>
        <InfRadioGroup.Radio value={'3'}>Облигации государственных корпораций</InfRadioGroup.Radio>
      </InfRadioGroup>
      <div style={{ marginTop: '12px' }}>Выбрано: {state}</div>
    </div>
  )
}
