// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { UploadButton } from './index'
import { Space } from '../Space'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { ReactComponent as ArrowUpIcon } from 'Icons/chevronup.svg'
import { ReactComponent as FileIcon } from 'Icons/file.svg'

const ComponentMeta: Meta<typeof UploadButton> = {
  title: 'Components/UploadButton',
  component: UploadButton,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    }
  }
}

export default ComponentMeta

const Template: StoryFn<typeof UploadButton> = ({ ...args }) => (
  <UploadButton {...args} />
)

export const Playground = {
  render: Template
}

export const Secondary = {
  render: Template,

  args: {
    variant: 'secondary'
  }
}

export const Tertiary = {
  render: Template,

  args: {
    variant: 'tertiary'
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
    after: <FileIcon />
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

export const Icon: StoryObj<typeof UploadButton> = {
  render: (args) => (
    <>
      <UploadButton before={<ArrowUpIcon />} {...args}>
        Icon Before
      </UploadButton>
      <UploadButton after={<ArrowUpIcon />} {...args}>
        Icon After
      </UploadButton>
      <UploadButton before={<ArrowUpIcon />} after={<ArrowUpIcon />} {...args}>
        Icon Before and After
      </UploadButton>
      <UploadButton icon={<ArrowUpIcon />} {...args} />
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

export const Sizes: StoryObj<typeof UploadButton> = {
  render: (args) => (
    <>
      <UploadButton {...args} size="large">
        Загрузить файл
      </UploadButton>
      <UploadButton {...args} size="medium">
        Загрузить файл
      </UploadButton>
      <UploadButton {...args} size="small">
        Загрузить файл
      </UploadButton>
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
