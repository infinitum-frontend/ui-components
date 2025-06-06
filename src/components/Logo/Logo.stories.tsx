// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Logo } from './index'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  args: {
    specdep: 'INFINITUM'
  }
}

export default meta

const Template: StoryFn<typeof Logo> = (args) => {
  return <Logo {...args} />
}

export const Playground = {
  render: Template
}

export const WithPrefix = {
  render: Template,
  args: {
    prefix: 'INF-A'
  }
}

export const CompanyGroup = {
  render: Template,

  args: {
    variant: 'company-group'
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

export const LogoOnly = {
  render: Template,

  args: {
    variant: 'logo-only'
  }
}
