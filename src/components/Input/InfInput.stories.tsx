import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InfInput } from './index'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/client-api'

const Meta: ComponentMeta<typeof InfInput> = {
  title: 'Input',
  component: InfInput,
  argTypes: {
    ref: {
      description: 'Cсылка на нативный элемент<br /><code>Ref< InputRefHandler ></code>'
    },
    onInput: {
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
    }
  }
}
export default Meta

const Template: ComponentStory<typeof InfInput> = ({ ...args }) => {
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

Template.args = {
  placeholder: 'Введите значение',
  borderRadius: 'regular'
}

export const Playground = Template.bind({})
Playground.args = {
  ...Template.args,
  className: 'custom-class',
  value: ''
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Template.args,
  disabled: true
}

export const NoBorder = Template.bind({})
NoBorder.args = {
  ...Template.args,
  noBorder: true
}

export const CollapseBottom = Template.bind({})
CollapseBottom.args = {
  ...Template.args,
  collapseBottom: true
}

export const WithPrefix = Template.bind({})
WithPrefix.args = {
  ...Template.args,
  prefix: <span style={{ color: 'darkred' }}>INF</span>
}

export const WithPostfix = Template.bind({})
WithPostfix.args = {
  ...Template.args,
  postfix: <span style={{ color: 'darkred' }}>INF</span>
}

export const WithClearButton = Template.bind({})
WithClearButton.args = {
  ...Template.args,
  allowClear: true
}

export const WithClearButtonAndPostfix = Template.bind({})
WithClearButtonAndPostfix.args = {
  ...Template.args,
  allowClear: true,
  postfix: <span style={{ color: 'darkred' }}>INF</span>
}
