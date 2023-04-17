// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Logo } from './index'

const meta: Meta<typeof Logo> = {
  title: 'Logo',
  component: Logo
}

export default meta

const Template: StoryFn<typeof Logo> = (args) => {
  return <Logo {...args} />
}

export const Playground = {
  render: Template
}

export const NoCaption = {
  render: Template,

  args: {
    variant: 'no-caption'
  }
}

export const Inverse = {
  render: Template,

  args: {
    variant: 'inverse'
  },

  parameters: {
    backgrounds: { default: 'dark' }
  }
}

export const Monochrome = {
  render: Template,

  args: {
    variant: 'monochrome'
  }
}

export const Short = {
  render: Template,

  args: {
    variant: 'short'
  }
}
