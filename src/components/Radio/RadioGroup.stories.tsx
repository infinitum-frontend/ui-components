// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { RadioGroup } from './index'
import { useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'RadioGroup',
  component: RadioGroup
}

export default meta

export const Playground: StoryFn<typeof RadioGroup> = (args) => {
  const [state, setState] = useState<string>('')

  const handleChange = (val: string): void => {
    setState(val)
  }

  return (
    <div>
      <RadioGroup name={'radio'} value={state} onChange={handleChange}>
        <RadioGroup.Radio value={'1'}>
          Облигации внешних облигационных займов РФ
        </RadioGroup.Radio>
        <RadioGroup.Radio value={'2'}>
          Облигации государственных компаний
        </RadioGroup.Radio>
        <RadioGroup.Radio value={'3'}>
          Облигации государственных корпораций
        </RadioGroup.Radio>
      </RadioGroup>
      <div style={{ marginTop: '12px' }}>Выбрано: {state}</div>
    </div>
  )
}
