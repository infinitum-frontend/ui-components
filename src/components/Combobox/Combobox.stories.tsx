// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { CheckedItem, Combobox } from './index'
import { Form } from 'Components/Form'
import { Button } from 'Components/Button'
import { Input } from 'Components/Input'
import { SelectOption } from 'Components/Select'
import { useState } from 'react'

const meta: Meta<typeof Combobox> = {
  title: 'Form/Combobox',
  component: Combobox,
  args: {
    onSearch: undefined
  }
}

const options: SelectOption[] = []

const longOptions: SelectOption[] = []

for (let i = 0; i < 10; i++) {
  options.push({
    label: `Option ${i}`,
    value: `Value ${i}`
  })
}

for (let i = 0; i < 100; i++) {
  longOptions.push({
    label: `Option ${i}`,
    value: `Value ${i}`
  })
}

export default meta

const Template: StoryFn<typeof Combobox> = (args) => {
  const [selectedValues, setSelectedValues] = React.useState<CheckedItem[]>([])

  return (
    <Combobox
      {...args}
      checkedList={selectedValues}
      onChange={setSelectedValues}
    />
  )
}

export const Playground = {
  render: Template,
  args: {
    options,
    showTags: true
  }
}

export const Scrollable = {
  render: Template,
  args: {
    options: longOptions,
    maxHeight: 200
  }
}

export const InForm: StoryObj<typeof Combobox> = {
  render: (args) => {
    const [name, setName] = React.useState('')
    const [selectedUsers, setSelectedUsers] = React.useState<CheckedItem[]>([])

    const users: SelectOption[] = []

    for (let i = 0; i < 10; i++) {
      users.push({
        label: `User ${i}`,
        value: `User-value ${i}`
      })
    }

    return (
      <Form
        onSubmit={(e) => {
          alert('submit')
        }}
      >
        <Form.Group required>
          <Form.Label>Name</Form.Label>
          <Input value={name} onChange={setName} />
        </Form.Group>

        <Form.Group required>
          <Form.Label>Users</Form.Label>
          <Combobox
            options={users}
            checkedList={selectedUsers}
            onChange={setSelectedUsers}
            showTags
            placeholder="Выберите пользователя"
            displayValue={selectedUsers?.length ? 'Выбранные пользователи' : ''}
          />
        </Form.Group>

        <Button type="submit">Button</Button>
      </Form>
    )
  }
}

export const WithOuterSearch: StoryObj<typeof Combobox> = {
  render: (args) => {
    const [search, setSearch] = useState('')
    const [selectedValues, setSelectedValues] = React.useState<CheckedItem[]>(
      []
    )

    return (
      <>
        <code>Значение поиска: {search}</code>
        <Combobox
          {...args}
          options={options}
          checkedList={selectedValues}
          search={search}
          onSearch={setSearch}
          onChange={setSelectedValues}
        />
      </>
    )
  }
}
