// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      defaultValue: 'Кнопка'
    }
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Button> = ({ ...args }) => <Button {...args} />

export const Playground = Template.bind({})

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary'
}

export const Default = Template.bind({})
Default.args = {
  variant: 'default'
}

export const Sizes: StoryFn<typeof Button> = (args) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Button {...args} size="large" />
    <Button {...args} size="medium" />
    <Button {...args} size="small" />
  </div>
)

export const LinkButton: StoryFn<typeof Button> = (args) => (
  <Button href="https://ya.ru" target="_blank" {...args} />
)
LinkButton.args = {
  as: 'a',
  children: 'Кнопка-ссылка'
}
