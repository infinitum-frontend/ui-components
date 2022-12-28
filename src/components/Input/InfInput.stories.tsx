import { Meta, StoryFn } from '@storybook/react'
import { InfInput } from './index'
import { action } from '@storybook/addon-actions'
// Посмотреть, как решат проблему https://github.com/storybookjs/storybook/issues/20367
// @ts-expect-error
import { useArgs } from '@storybook/client-api'

const meta: Meta<typeof InfInput> = {
  title: 'Input',
  component: InfInput,
  args: {
    placeholder: 'Введите значение',
    borderRadius: 'regular',
    size: 'medium'
  },
  argTypes: {
    ref: {
      description: 'Cсылка на нативный элемент<br /><code>Ref< InputRefHandler ></code>'
    },
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
    },
    postfix: {
      control: 'text'
    }
  }
}
export default meta

const Template: StoryFn<typeof InfInput> = ({ ...args }) => {
  const [{ value }, updateArgs] = useArgs()

  const handleInput: (val: string) => void = (val) => {
    // экшен не работает. Он работает только если в шаблоне вызывать
    action('input')
    updateArgs({ value: val })
  }

  return (
    <InfInput {...args}
              value={value}
              onFocus={action('focus')}
              onBlur={action('blur')}
              onInput={handleInput}
    />
  )
}

export const Playground = Template.bind({})
Playground.args = {
  className: 'custom-class',
  value: ''
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const NoBorder = Template.bind({})
NoBorder.args = {
  noBorder: true
}

export const CollapseBottom = Template.bind({})
CollapseBottom.args = {
  collapseBottom: true
}

export const WithPrefix = Template.bind({})
WithPrefix.args = {
  prefix: <span style={{ color: 'darkred' }}>INF</span>
}

export const WithPostfix = Template.bind({})
WithPostfix.args = {
  postfix: <span style={{ color: 'darkred' }}>INF</span>
}

export const WithClearButton = Template.bind({})
WithClearButton.args = {
  value: 'Инфинитум',
  allowClear: true
}

export const WithClearButtonAndPostfix = Template.bind({})
WithClearButtonAndPostfix.args = {
  value: 'Инфинитум',
  allowClear: true,
  postfix: <span style={{ color: 'darkred' }}>INF</span>
}

export const Debounced: StoryFn<typeof InfInput> = (args) => {
  const [{ value }, updateArgs] = useArgs()

  const handleInput: (val: string) => void = (val) => {
    updateArgs({ value: val })
  }
  return (
    <div>
      <InfInput {...args}
                onInput={handleInput} />
      <span style={{ color: 'darkred', marginTop: '6px' }}>Значение: {value}</span>
    </div>
  )
}

Debounced.args = {
  debounce: 1000
}
