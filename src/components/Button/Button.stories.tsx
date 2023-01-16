// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from './index'
import { Space } from '../Space'
import { Meta, StoryFn } from '@storybook/react'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'

const ComponentMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      defaultValue: 'Кнопка'
    }
  },
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
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

export const Loading = Template.bind({})
Loading.args = {
  loading: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Icon: StoryFn<typeof Button> = (args) => (
  <>
    <Button iconLeft={<ArrowDownIcon />} {...args}>
      Icon Left
    </Button>
    <Button iconRight={<ArrowDownIcon />} {...args}>
      Icon Right
    </Button>
    <Button icon={<ArrowDownIcon />} {...args} />
  </>
)
Icon.decorators = [(Story) => <Space gap="small">{Story()}</Space>]

export const Sizes: StoryFn<typeof Button> = (args) => (
  <>
    <Button {...args} size="large" />
    <Button {...args} size="medium" />
    <Button {...args} size="small" />
  </>
)
Sizes.decorators = [(Story) => <Space gap="small">{Story()}</Space>]

export const LinkButton: StoryFn<typeof Button> = (args) => (
  <Button href="https://ya.ru" target="_blank" {...args} />
)
LinkButton.args = {
  as: 'a',
  children: 'Кнопка-ссылка'
}
