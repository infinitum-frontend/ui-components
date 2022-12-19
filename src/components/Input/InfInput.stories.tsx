import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InfInput } from './index'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/client-api'

const Meta: ComponentMeta<typeof InfInput> = {
  title: 'Input',
  component: InfInput,
  argTypes: {
    ref: {
      control: false,
      description: 'Ссылка на нативный input element'
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
    updateArgs({ value: val })
    // setInputValue(val)
    action('input')
  }

  return (
    <InfInput {...args}
              prefix={'prefix'}
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
  placeholder: 'Введите значение',
  value: ''
}
