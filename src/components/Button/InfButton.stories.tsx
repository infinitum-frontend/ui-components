import * as React from 'react'
import { InfButton } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof InfButton> = {
  title: 'Button',
  component: InfButton,
  argTypes: {
    children: {
      defaultValue: 'Кнопка'
    }
  }
}

export default Meta

const Template: ComponentStory<typeof InfButton> = ({ ...args }) => <InfButton {...args} />

export const Playground = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary'
}

export const Sizes: ComponentStory<typeof InfButton> = (args) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <InfButton {...args} size="large" />
    <InfButton {...args} size="medium" />
    <InfButton {...args} size="small" />
  </div>
)

export const LinkButton: ComponentStory<typeof InfButton> = (args) => <InfButton href="https://ya.ru" target="_blank" {...args} />
LinkButton.args = {
  as: 'a',
  children: 'Кнопка-ссылка'
}
