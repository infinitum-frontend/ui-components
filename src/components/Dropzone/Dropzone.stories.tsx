// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StoryFn, Meta } from '@storybook/react'
import { Dropzone } from './index'
import { Space } from '../Space'
import { File } from '../File'
import { useState } from 'react'
import { parseFilename } from '@infinitum-ui/shared'

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone',
  component: Dropzone,
  args: {
    buttonText: 'Кликните',
    description: 'или перетащите, чтобы загрузить файл'
  }
}

export default meta

const Template: StoryFn<typeof Dropzone> = (args) => {
  const [files, setFiles] = useState<File[]>([])
  return (
    <Space>
      <Dropzone
        {...args}
        onChange={(files) => {
          setFiles(files)
        }}
      />
      {files.map((file) => (
        <File key={file.name} size={file.size} {...parseFilename(file.name)} />
      ))}
    </Space>
  )
}

export const Playground = {
  render: Template
}

export const WithHint = {
  render: Template,
  args: {
    hint: 'После добавления файлы отображаются в виде списка'
  }
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true
  }
}
