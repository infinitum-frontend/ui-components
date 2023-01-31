// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Header } from './index'

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header
}

export default meta

const Template: StoryFn<typeof Header> = (args) => {
  return (
    <Header>
      <div>Lorem ipsum dolor sit amet.</div>
    </Header>
  )
}
export const Playground = Template.bind({})
