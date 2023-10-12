// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { File } from './index'

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  args: {
    name: 'Средней важности документ',
    size: 3.4,
    extension: 'pdf',
    unit: 'mb'
  }
}

export default meta

const Template: StoryFn<typeof File> = (args) => {
  return <File {...args} />
}

export const Playground = {
  render: Template
}

export const Deletable = {
  render: Template,
  args: {
    deletable: true,
    onDeleteFile: () => {
      alert('delete file')
    }
  }
}

export const Loading = {
  render: Template,
  args: {
    loading: true
  }
}
