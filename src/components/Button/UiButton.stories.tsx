import * as React from 'react'
import { UiButton } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof UiButton> = {
  title: 'Button',
  component: UiButton
}

export default Meta

const Template: ComponentStory<typeof UiButton> = (args) => <UiButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  children: 'Кнопка'
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  children: 'Кнопка'
}

export const Sizes: ComponentStory<typeof UiButton> = (args) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <UiButton {...args} size="large" />
    <UiButton {...args} size="medium" />
    <UiButton {...args} size="small" />
  </div>
)
Sizes.args = {
  variant: 'primary',
  children: 'Кнопка'
}
