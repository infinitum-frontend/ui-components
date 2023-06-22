// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import Radio from './Radio'
import { action } from '@storybook/addon-actions'
import { Box } from '../Box'
import { useState } from 'react'
import { Space } from '../Space'

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
    const [state1, setState1] = useState<string>('')
    const [state2, setState2] = useState<string>('')

    return (
      <Space gap="large">
        <Space>
          <code>direction: vertical</code>
          <Radio.Group
            name={'radio'}
            value={state1}
            onChange={(value) => setState1(value)}
          >
            <Radio value={'1'}>Облигации внешних облигационных займов РФ</Radio>
            <Radio value={'2'}>Облигации государственных компаний</Radio>
            <Radio value={'3'}>Облигации государственных корпораций</Radio>
          </Radio.Group>
          <div style={{ marginTop: '12px' }}>Выбрано: {state1}</div>
        </Space>

        <Space>
          <code>direction: horizontal</code>
          <Radio.Group
            name={'radio'}
            value={state2}
            onChange={(value) => setState2(value)}
            direction="horizontal"
          >
            <Radio value={'1'}>Облигации внешних облигационных займов РФ</Radio>
            <Radio value={'2'}>Облигации государственных компаний</Radio>
            <Radio value={'3'}>Облигации государственных корпораций</Radio>
          </Radio.Group>
          <div style={{ marginTop: '12px' }}>Выбрано: {state2}</div>
        </Space>
      </Space>
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
