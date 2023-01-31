// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Layout } from './index'

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout
}

export default meta

const Template: StoryFn<typeof Layout> = (args) => {
  return (
    <Layout>
      <div>Lorem ipsum dolor sit amet.</div>
    </Layout>
  )
}
export const Playground = Template.bind({})
