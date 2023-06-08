// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import Radio from './Radio'
import { action } from '@storybook/addon-actions'
import { Box } from '../Box'
import { useState } from 'react'

const meta: Meta<typeof Radio> = {
  title: 'Form/Radio',
  component: Radio
}

export default meta

const Template: StoryFn<typeof Radio> = (args) => {
  return (
    <Radio {...args} onChange={action('change')}>
      Облигации
    </Radio>
  )
}

export const Group: StoryObj<typeof Radio> = {
  render: (args) => {
    const [state, setState] = useState<string>('')

    const handleChange = (val: string): void => {
      setState(val)
    }

    return (
      <div>
        <Radio.Group name={'radio'} value={state} onChange={handleChange}>
          <Radio value={'1'}>Облигации внешних облигационных займов РФ</Radio>
          <Radio value={'2'}>Облигации государственных компаний</Radio>
          <Radio value={'3'}>Облигации государственных корпораций</Radio>
        </Radio.Group>
        <div style={{ marginTop: '12px' }}>Выбрано: {state}</div>
      </div>
    )
  }
}

export const Playground = {
  render: Template
}

export const Disabled: StoryObj<typeof Radio> = {
  render: (args) => {
    return (
      <Box
        style={{
          width: '300px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: 'transparent'
        }}
      >
        <Radio disabled={true} checked={true}>
          <code>checked</code>
        </Radio>
        <Radio disabled={true}>
          <code>unchecked</code>
        </Radio>
      </Box>
    )
  }
}
