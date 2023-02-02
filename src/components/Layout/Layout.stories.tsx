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
      <Layout.Header>
        <div>Lorem ipsum dolor sit amet.</div>
      </Layout.Header>
      <Layout.Body>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam
          laboriosam porro tempore corporis, vitae ipsa magnam? Error rerum
          sequi ipsam quia, numquam culpa, architecto magni alias vel accusamus,
          aut deleniti vero accusantium eum delectus nisi qui labore voluptates
        </div>
      </Layout.Body>
    </Layout>
  )
}
export const Playground = Template.bind({})
Playground.parameters = {
  layout: 'fullscreen',
  backgrounds: { default: 'light' }
}
