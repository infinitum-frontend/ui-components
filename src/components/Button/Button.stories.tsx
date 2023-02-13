// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from './index'
import { Space } from '../Space'
import { Meta, StoryFn } from '@storybook/react'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { ReactComponent as DownloadIcon } from 'Icons/download.svg'

const ComponentMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      defaultValue: 'Кнопка'
    },
    as: {
      defaultValue: 'button'
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

export const Tertiary = Template.bind({})
Tertiary.args = {
  variant: 'tertiary'
}

export const Ghost = Template.bind({})
Ghost.args = {
  variant: 'ghost'
}

export const GhostWithIcon = Template.bind({})
GhostWithIcon.args = {
  variant: 'ghost',
  after: <DownloadIcon />
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
    <Button before={<ArrowDownIcon />} {...args}>
      Icon Before
    </Button>
    <Button after={<ArrowDownIcon />} {...args}>
      Icon After
    </Button>
    <Button before={<ArrowDownIcon />} after={<ArrowDownIcon />} {...args}>
      Icon Before and After
    </Button>
    <Button icon={<ArrowDownIcon />} {...args} />
  </>
)
Icon.decorators = [
  (Story) => (
    <Space gap="small" direction="horizontal">
      {Story()}
    </Space>
  )
]

export const Sizes: StoryFn<typeof Button> = (args) => (
  <>
    <Button {...args} size="large" />
    <Button {...args} size="medium" />
    <Button {...args} size="small" />
  </>
)
Sizes.decorators = [
  (Story) => (
    <Space gap="small" direction="horizontal">
      {Story()}
    </Space>
  )
]

export const LinkButton: StoryFn<typeof Button> = (args) => (
  <Button href="https://ya.ru" target="_blank" {...args} />
)
LinkButton.args = {
  as: 'a',
  children: 'Кнопка-ссылка'
}
