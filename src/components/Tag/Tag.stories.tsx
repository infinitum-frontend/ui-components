// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Tag } from './index'
import IconInfoCircle from 'Icons/info-circle.svg?react'

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
    onRemove: () => alert('remove'),
    icon: <IconInfoCircle />
  }
}

export const Disabled = {
  render: Template,
  args: {
    disabled: true,
    icon: <IconInfoCircle />
  }
}

export const Selected = {
  render: Template,
  args: {
    selected: true,
    icon: <IconInfoCircle />
  }
}

export const Hoverable = {
  render: Template,
  args: {
    hoverable: true,
    icon: <IconInfoCircle />
  }
}

export const WithIcon = {
  render: Template,
  args: {
    icon: <IconInfoCircle />
  }
}
