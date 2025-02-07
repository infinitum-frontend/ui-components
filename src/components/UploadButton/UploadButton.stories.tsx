// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { UploadButton } from './index'
import { Meta, StoryFn } from '@storybook/react'
// @ts-expect-error
import FileIcon from 'Icons/file.svg?react'

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

export const CustomDesign = {
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

export const WithAcceptAttribute = {
  render: Template,

  args: {
    accept:
      '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
}
