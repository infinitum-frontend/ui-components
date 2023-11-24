// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Tag } from './index'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Признак техпроцесса'
  }
}

export default meta

const Template: StoryFn<typeof Tag> = (args) => {
  return <Tag {...args} />
}

export const Playground = {
  render: Template
}

export const Removable: StoryObj<typeof Tag> = {
  render: (args) => {
    return <Tag {...args} />
  },
  args: {
    onRemove: () => alert('remove')
  }
}
