// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Layout } from './index'
import { Space } from 'Components/Space'

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout
}

export default meta

const Template: StoryFn<typeof Layout> = (args) => {
  return (
    <Layout>
      <Layout.Header>
        <div>Layout Header</div>
      </Layout.Header>
      <Layout.Body>
        <Space>
          <div
            style={{
              height: '400px',
              backgroundColor: 'lightgrey',
              border: '2px solid gray'
            }}
          />
          <div
            style={{
              height: '400px',
              backgroundColor: 'lightgrey',
              border: '2px solid gray'
            }}
          />
          <div
            style={{
              height: '400px',
              backgroundColor: 'lightgrey',
              border: '2px solid gray'
            }}
          />
          <div
            style={{
              height: '400px',
              backgroundColor: 'lightgrey',
              border: '2px solid gray'
            }}
          />
        </Space>
      </Layout.Body>
    </Layout>
  )
}
export const Playground = Template.bind({})
Playground.parameters = {
  layout: 'fullscreen',
  backgrounds: { default: 'light' }
}
