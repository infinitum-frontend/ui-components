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
export const Playground = Template.bind({})

export const NoCaption = Template.bind({})
NoCaption.args = {
  variant: 'no-caption'
}

export const Inverse = Template.bind({})
Inverse.args = {
  variant: 'inverse'
}
Inverse.parameters = {
  backgrounds: { default: 'dark' }
}

export const Monochrome = Template.bind({})
Monochrome.args = {
  variant: 'monochrome'
}

export const Short = Template.bind({})
Short.args = {
  variant: 'short'
}
