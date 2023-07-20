// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { File } from './index'

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  args: {}
}

export default meta

const Template: StoryFn<typeof File> = (args) => {
  return (
    <File
      name="Средней важности документ"
      size={3.4}
      extension="pdf"
      unit="mb"
    />
  )
}

export const Playground = {
  render: Template
}
