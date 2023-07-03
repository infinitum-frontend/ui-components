// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Input, MaskedInput, SearchInput } from './index'
import { action } from '@storybook/addon-actions'
import { Space } from '../Space'
// Посмотреть, как решат проблему https://github.com/storybookjs/storybook/issues/20367

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  args: {
    placeholder: 'Введите значение',
    borderRadius: 'regular',
    size: 'medium'
  },
  argTypes: {
    onChange: {
      action: 'change',
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
    },
    value: {
      control: false
    }
  }
}
export default meta

const Template: StoryFn<typeof Input> = ({ ...args }) => {
  return (
    <Input
      style={{ width: '200px' }}
      {...args}
      value={undefined}
      onFocus={action('focus')}
      onBlur={action('blur')}
      onChange={action('change')}
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

export const Sizes: StoryObj<typeof Input> = {
  render: (args) => {
    return (
      <div
        style={{
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <Input size="medium" placeholder="medium" />
        <Input size="small" placeholder="small" />
      </div>
    )
  },

  args: {
    debounce: 1000
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
    const [value, setValue] = useState('')

    const handleChange: (val: string) => void = (val) => {
      setValue(val)
    }
    return (
      <div>
        <Input
          {...args}
          value={value}
          allowClear={true}
          onChange={handleChange}
        />
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
    const formatter = (value: string): string => value?.toUpperCase()

    const handleChange = (value: string | undefined): void => {
      setValue(value)
    }

    return <Input formatter={formatter} value={value} onChange={handleChange} />
  }
}

export const Search: StoryObj<typeof SearchInput> = {
  render: (args) => {
    return <SearchInput {...args} />
  }
}

export const Masked: StoryFn<typeof Input> = () => {
  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [cvcCode, setCvcCode] = useState('')
  const [email, setEmail] = useState('')
  const [card, setCard] = useState('')
  const [phoneOrEmail, setPhoneOrEmail] = useState('')

  return (
    <Space>
      <Space direction="horizontal" wrap>
        <Space>
          <code>Phone mask</code>
          <MaskedInput value={phone} onAccept={setPhone} mask="phone" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {phone}
          </span>
        </Space>
        <Space>
          <code>Четырехзначный код из смс</code>
          <MaskedInput
            value={smsCode}
            onAccept={setSmsCode}
            mask="code4Digits"
          />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {smsCode}
          </span>
        </Space>
        <Space>
          <code>cvc code</code>
          <MaskedInput value={cvcCode} onAccept={setCvcCode} mask="cvc" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {cvcCode}
          </span>
        </Space>
        <Space>
          <code>email</code>
          <MaskedInput value={email} onAccept={setEmail} mask="email" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {email}
          </span>
        </Space>
        <Space>
          <code>bank card</code>
          <MaskedInput value={card} onAccept={setCard} mask="bankCard" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {card}
          </span>
        </Space>
        <Space>
          <code>phone or email</code>
          <MaskedInput
            value={phoneOrEmail}
            onAccept={setPhoneOrEmail}
            mask="phoneOrEmail"
          />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {phoneOrEmail}
          </span>
        </Space>
      </Space>
    </Space>
  )
}
