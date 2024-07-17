// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Button } from './index'
import { Space } from '../Space'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { ReactComponent as DownloadIcon } from 'Icons/download.svg'

const ComponentMeta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Кнопка',
    as: 'button'
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

export const Playground = {
  render: Template
}

export const Secondary = {
  render: Template,

  args: {
    variant: 'secondary'
  }
}

export const Ghost = {
  render: Template,

  args: {
    variant: 'ghost'
  }
}

export const GhostWithIcon = {
  render: Template,

  args: {
    variant: 'ghost',
    after: <DownloadIcon />
  }
}

export const Loading = {
  render: Template,

  args: {
    loading: true
  }
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true
  }
}

export const Icon: StoryObj<typeof Button> = {
  render: (args) => (
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
  ),

  decorators: [
    (Story) => (
      <Space gap="small" direction="horizontal">
        {Story()}
      </Space>
    )
  ]
}

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => (
    <>
      <Button {...args} size="large" />
      <Button {...args} size="medium" />
      <Button {...args} size="small" />
    </>
  ),

  decorators: [
    (Story) => (
      <Space gap="small" direction="horizontal">
        {Story()}
      </Space>
    )
  ]
}

export const LinkButton: StoryObj<typeof Button> = {
  render: (args) => (
    <Button href="https://specdep.ru/" target="_blank" {...args} />
  ),

  args: {
    as: 'a',
    children: 'Кнопка-ссылка'
  }
}
