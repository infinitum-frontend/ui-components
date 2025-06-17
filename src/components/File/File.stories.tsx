// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StoryFn, Meta } from '@storybook/react'
import { File } from './index'

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  args: {
    name: 'Средней важности документ',
    size: 3500,
    extension: 'pdf',
    onGetFile: () => {
      alert('get file')
    }
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
    status: 'loading',
    deletable: true
  }
}

export const Error = {
  render: Template,
  args: {
    status: 'error',
    deletable: true
  }
}
