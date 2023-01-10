import * as React from 'react'
import { InfButton } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof InfButton> = {
  title: 'Button',
  component: InfButton,
  argTypes: {
    children: {
      defaultValue: 'Кнопка'
    }
  }
}

export default ComponentMeta

const Template: StoryFn<typeof InfButton> = ({ ...args }) => <InfButton {...args} />

export const Playground = Template.bind({})

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary'
}

export const Default = Template.bind({})
Default.args = {
  variant: 'default'
}

export const Sizes: StoryFn<typeof InfButton> = (args) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <InfButton {...args} size="large" />
    <InfButton {...args} size="medium" />
    <InfButton {...args} size="small" />
  </div>
)

export const LinkButton: StoryFn<typeof InfButton> = (args) => (
  <InfButton
    href="https://ya.ru"
    target="_blank"
    {...args} />
)
LinkButton.args = {
  as: 'a',
  children: 'Кнопка-ссылка'
}
