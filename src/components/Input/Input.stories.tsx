// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Input, SearchInput, maskInput } from './index'
import { action } from '@storybook/addon-actions'
// Посмотреть, как решат проблему https://github.com/storybookjs/storybook/issues/20367
// @ts-expect-error
import { useArgs } from '@storybook/client-api'

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  args: {
    placeholder: 'Введите значение',
    borderRadius: 'regular',
    size: 'medium'
  },
  argTypes: {
    onInput: {
      action: 'input',
      control: false
    },
    onFocus: {
      control: false
    },
    onBlur: {
      control: false
    },
    formatter: {
      control: false
    },
    prefix: {
      control: 'text'
    }
  }
}
export default meta

const Template: StoryFn<typeof Input> = ({ ...args }) => {
  const [{ value }, updateArgs] = useArgs()

  const handleInput: (val: string | undefined) => void = (val) => {
    // экшен не работает. Он работает только если в шаблоне вызывать
    action('input')
    updateArgs({ value: val })
  }

  return (
    <Input
      style={{ width: '200px' }}
      {...args}
      value={value}
      onFocus={action('focus')}
      onBlur={action('blur')}
      onInput={handleInput}
    />
  )
}

export const Playground = {
  render: Template,

  args: {
    className: 'custom-class',
    value: ''
  }
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true
  }
}

export const NoBorder = {
  render: Template,

  args: {
    noBorder: true
  }
}

export const WithPrefix = {
  render: Template,

  args: {
    prefix: <span style={{ color: 'darkred' }}>INF</span>
  }
}

export const WithPostfix = {
  render: Template,

  args: {
    postfix: <span style={{ color: 'darkred' }}>INF</span>
  }
}

export const WithClearButton = {
  render: Template,

  args: {
    value: 'Инфинитум',
    allowClear: true
  }
}

export const Debounced: StoryObj<typeof Input> = {
  render: (args) => {
    const [{ value }, updateArgs] = useArgs()

    const handleInput: (val: string | undefined) => void = (val) => {
      updateArgs({ value: val })
    }
    return (
      <div>
        <Input {...args} allowClear={true} onInput={handleInput} />
        <span style={{ color: 'darkred', marginTop: '6px' }}>
          Значение: {value}
        </span>
      </div>
    )
  },

  args: {
    debounce: 1000
  }
}

export const Formatter: StoryObj<typeof Input> = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>('')
    const formatter = (value?: string): string | undefined =>
      value?.toUpperCase()

    const handleInput = (value: string | undefined): void => {
      setValue(value)
    }

    return <Input formatter={formatter} value={value} onInput={handleInput} />
  }
}

export const Search: StoryObj<typeof SearchInput> = {
  render: (args) => {
    return <SearchInput {...args} />
  }
}

export const PhoneMask: StoryFn<typeof Input> = () => {
  const [value, setValue] = useState<string | undefined>('')

  return (
    <>
      <Input
        formatter={(value) => maskInput(value, 'phone')}
        value={value}
        onInput={setValue}
        placeholder="Номер телефона"
        type="tel"
        inputMode="numeric"
      />
      <span style={{ color: 'darkred', marginTop: '6px' }}>
        Значение1: {value}
      </span>
    </>
  )
}
