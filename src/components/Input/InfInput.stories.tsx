import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InfInput } from './index'
import { action } from '@storybook/addon-actions'

const Meta: ComponentMeta<typeof InfInput> = {
  title: 'Input',
  component: InfInput,
  argTypes: {
    ref: {
      table: {
        disable: true
      }
    }
  }
}
export default Meta

const Template: ComponentStory<typeof InfInput> = (args) => {
  return (
    <InfInput className={args.className}
              onFocus={action('focus')}
              onBlur={action('blur')}
              onInput={action('input')} />
  )
}

export const Playground = Template.bind({})
Playground.args = {
  className: 'hello'
}
