// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Checkbox } from './index'
import { action } from '@storybook/addon-actions'
import { Space } from '../Space'
import { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox
}

export default meta

const options = [
  {
    value: '0',
    label: 'РФ'
  },
  {
    value: '1',
    label: 'Иностранная'
  },
  {
    value: '2',
    label: 'Международная'
  }
]

const Template: StoryFn<typeof Checkbox> = (args) => {
  return (
    <Checkbox onChange={action('change')} {...args}>
      Облигации
    </Checkbox>
  )
}

export const Playground = {
  render: Template
}

export const Group: StoryObj<typeof Checkbox.Group> = {
  render: (args) => {
    const [checked, setChecked] = useState<string[]>(['2'])
    const handleChange = (val: string[]): void => {
      setChecked(val)
    }
    return (
      <>
        <Checkbox.Group onChange={handleChange} value={checked}>
          <Checkbox value="1">
            Облигации внешних облигационных займов РФ
          </Checkbox>
          <Checkbox value="2">Облигации государственных компаний</Checkbox>
          <Checkbox value="3">Облигации государственных корпораций</Checkbox>
        </Checkbox.Group>
        <div style={{ marginTop: '12px' }}>Выбрано: [{checked}]</div>
      </>
    )
  }
}

export const Indeterminate: StoryObj<typeof Checkbox> = {
  render: (args) => {
    const [indeterminate, setIndeterminate] = useState(true)
    const [allChecked, setAllChecked] = useState(false)
    const [checkedList, setCheckedList] = useState(['0'])

    const handleChange = (val: string[]): void => {
      setCheckedList(val)
      setIndeterminate(val.length > 0 && val.length < options.length)
      setAllChecked(val.length === options.length)
    }

    const handleCheckAll = (val: boolean): void => {
      setAllChecked(val)
      setCheckedList(val ? options.map((option) => option.value) : [])
      setIndeterminate(false)
    }

    return (
      <>
        <Checkbox
          indeterminate={indeterminate}
          onChange={handleCheckAll}
          checked={allChecked}
        >
          Категории по юрисдикции
        </Checkbox>
        <Checkbox.Group
          onChange={handleChange}
          value={checkedList}
          style={{ marginLeft: '20px', marginTop: '6px' }}
        >
          {options.map((option) => (
            <Checkbox value={option.value} key={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </>
    )
  }
}

export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <Space direction={'horizontal'}>
        <Checkbox disabled={true} defaultChecked={true}>
          <code>checked</code>
        </Checkbox>
        <Checkbox disabled={true} indeterminate={true}>
          <code>indeterminate</code>
        </Checkbox>
        <Checkbox disabled={true}>
          <code>uncheked</code>
        </Checkbox>
      </Space>
    )
  }
}

export const WithBox: StoryObj<typeof Checkbox> = {
  render: () => {
    const [checked, setChecked] = useState<string[]>(['2'])
    const handleChange = (val: string[]): void => {
      setChecked(val)
    }
    return (
      <>
        <Checkbox.Group onChange={handleChange} value={checked}>
          <Checkbox.Box>
            <Checkbox value="1">
              Облигации внешних облигационных займов РФ
            </Checkbox>
          </Checkbox.Box>
          <Checkbox.Box>
            <Checkbox value="2">Облигации государственных компаний</Checkbox>
          </Checkbox.Box>
          <Checkbox.Box>
            <Checkbox value="3">Облигации государственных корпораций</Checkbox>
          </Checkbox.Box>
        </Checkbox.Group>
        <div style={{ marginTop: '12px' }}>Выбрано: [{checked}]</div>
      </>
    )
  }
}
