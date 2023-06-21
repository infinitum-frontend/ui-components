// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import FilePicker, { IFileData } from './FilePicker'
import { useState } from 'react'

const meta: Meta<typeof FilePicker> = {
  title: 'Components/FilePicker',
  component: FilePicker
}

export default meta

const Template: StoryFn<typeof FilePicker> = (args) => {
  const [files, setFiles] = useState<IFileData[]>([
    {
      id: '0',
      name: 'Тестовый файл.pdf'
    }
  ])

  return (
    <FilePicker
      {...args}
      onChange={(files) => setFiles(files)}
      files={files}
      onGetFile={() => {
        window.open(
          'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        )
      }}
    />
  )
}

export const Playground = {
  render: Template
}
