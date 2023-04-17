import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Checkbox, CheckboxGroup } from './index'
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
        <CheckboxGroup
          onChange={handleChange}
          value={checkedList}
          style={{ marginLeft: '20px', marginTop: '6px' }}
        >
          {options.map((option) => (
            <Checkbox value={option.value} key={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
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
