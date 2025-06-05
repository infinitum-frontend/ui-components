// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meta, StoryFn } from '@storybook/react'
import { Button } from 'Components/Button'
import { Form } from 'Components/Form'
import { useState } from 'react'
import { SelectBaseOptions, SelectOptionsRawLong } from './fixtures'
import { Select, selectDataFormatter } from './index'
import { SelectOption } from './types'

const meta: Meta<typeof Select> = {
  title: 'Form/SelectOld',
  component: Select,
  args: {
    options: SelectBaseOptions
  }
}

export default meta

const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = useState<number | string | undefined>(undefined)

  const formattedConnectionTypes = selectDataFormatter(
    {
      array: [],
      value: 'id',
      label: 'connectionName'
    },
    true
  )

  console.log('formattedConnectionTypes', formattedConnectionTypes)

  const handleChange: (item: SelectOption) => void = (item) => {
    setValue(item.value)
  }

  return (
    <Select
      {...args}
      onChange={handleChange}
      value={value}
      style={args.style || { width: '300px' }}
    />
  )
}

export const Playground = {
  render: Template
}

export const StatusError = {
  render: Template,
  args: {
    status: 'error'
  }
}

export const AutoFocus = {
  render: Template,

  args: {
    autoFocus: true
  }
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true
  }
}

export const Scrollable = {
  render: Template,

  args: {
    maxItemsCount: 5,
    options: selectDataFormatter({
      array: SelectOptionsRawLong,
      value: 'id',
      label: 'name'
    })
  }
}

export const Overflow = {
  render: Template,

  args: {
    style: { width: '100px' }
  }
}

export const Loading = {
  render: Template,

  args: {
    loading: true
  }
}

export const FormValidation = {
  render: () => {
    return (
      <Form onSubmit={() => {}} style={{ maxWidth: '500px' }}>
        <Form.Group required customValidationMessage="Выберите значение">
          <Select options={SelectBaseOptions} />
        </Form.Group>
        <Button type="submit">Отправить</Button>
      </Form>
    )
  }
}
