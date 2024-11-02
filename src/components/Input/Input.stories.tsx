// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Input, MaskedInput } from './index'
import { action } from '@storybook/addon-actions'
import { Space } from '../Space'
import { Loader } from '../Loader'
import { Button } from '../Button'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Form } from '../Form'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'
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

// eslint-disable-next-line react/prop-types
const Template: StoryFn<typeof Input> = ({ value, ...args }) => {
  const [val, setVal] = useState(value)

  return (
    <Input
      style={{ width: '250px' }}
      {...args}
      value={val}
      onFocus={action('focus')}
      onBlur={action('blur')}
      onChange={(v) => {
        action('change')
        setVal(v)
      }}
      onClear={() => setVal('')}
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

export const UncontrolledAndControlled = {
  render: () => {
    const [value, setValue] = useState('')
    const [isLoading, setLoading] = useState(false)
    return (
      <Space align="center">
        {isLoading ? (
          <Loader style={{ height: '240px' }} />
        ) : (
          <Space direction="horizontal" gap="xxlarge" justify="space-between">
            <Space justify="space-between" gap="xsmall">
              <Text color="success">
                <code>
                  Контролируемый вариант. Работает через связку value + onChange
                  с обновлением внешнего стейта
                  <br />
                  <br />
                  Сохраняет значение при условном рендеринге, т.к. внешнего
                  стейт присутствует
                </code>
              </Text>
              <div>
                <Text>Значение: {value}</Text>
                <Input value={value} onChange={setValue} />
              </div>
            </Space>
            <Space justify="space-between" gap="xsmall">
              <Text color="danger">
                <code>
                  Неконтролируемый вариант.
                  <br />
                  <br />
                  Можно задать defaultValue в качестве начального значения. На
                  value таком случае компонент не реагирует.
                  <br />
                  <br />
                  Если указать value, но не обновлять его снаружи, то ввод будет
                  невозможен.
                  <br />
                  <br />
                  Теряет значение при условном рендеринге, т.к. внешнего стейта
                  нет
                </code>
              </Text>
              <Input />
            </Space>
          </Space>
        )}
        <Button
          variant="secondary"
          onClick={() => {
            setLoading(true)
            setTimeout(() => setLoading(false), 1000)
          }}
        >
          Условный рендеринг
        </Button>
      </Space>
    )
  }
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true
  }
}

export const ReadOnly = {
  render: Template,

  args: {
    readOnly: true,
    value: 'Иван Иванов'
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
  }
}

export const WithPrefix = {
  render: Template,

  args: {
    prefix: (
      <Icon size="medium" color="primary">
        <SearchIcon />
      </Icon>
    )
  }
}

export const WithPostfix = {
  render: Template,

  args: {
    postfix: (
      <Icon size="medium" color="primary">
        <SearchIcon />
      </Icon>
    )
  }
}

export const WithClearButton = {
  render: Template,

  args: {
    value: 'Инфинитум',
    allowClear: true
  }
}

export const WithPasswordVisibilityButton = {
  render: Template,

  args: {
    value: 'Инфинитум',
    toggleablePassword: true
  }
}

export const ErrorStatus = {
  render: Template,

  args: {
    value: 'Инфинитум',
    status: 'error'
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

export const Masked: StoryFn<typeof Input> = () => {
  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [cvcCode, setCvcCode] = useState('')
  const [email, setEmail] = useState('')
  const [phoneOrEmail, setPhoneOrEmail] = useState('')

  const handleSubmit = (): void => {
    console.log('submit')
  }

  return (
    <Space>
      <Form onSubmit={handleSubmit}>
        <Form.Group required>
          <code>Phone mask</code>
          <MaskedInput value={phone} onAccept={setPhone} mask="phone" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {phone}
          </span>
        </Form.Group>
        <Form.Group required>
          <code>Четырехзначный код из смс</code>
          <MaskedInput
            value={smsCode}
            onAccept={setSmsCode}
            minLength={4}
            mask="code4Digits"
          />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {smsCode}
          </span>
        </Form.Group>
        <Form.Group required>
          <code>cvc code</code>
          <MaskedInput value={cvcCode} onAccept={setCvcCode} mask="cvc" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {cvcCode}
          </span>
        </Form.Group>
        <Form.Group required>
          <code>email</code>
          <MaskedInput value={email} onAccept={setEmail} mask="email" />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {email}
          </span>
        </Form.Group>
        <Form.Group required>
          <code>phone or email</code>
          <MaskedInput
            value={phoneOrEmail}
            onAccept={setPhoneOrEmail}
            mask="phoneOrEmail"
          />
          <span style={{ color: 'darkred', marginTop: '6px' }}>
            Значение: {phoneOrEmail}
          </span>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Space>
  )
}
