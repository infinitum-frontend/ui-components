// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { UploadButton } from './index'
import { Meta, StoryFn } from '@storybook/react'
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
