// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Layout } from './index'
import { Container } from 'Components/Container'
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
        <div>Lorem ipsum dolor sit amet.</div>
      </Layout.Header>
      <Layout.Body>
        <Container>
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
        </Container>
      </Layout.Body>
    </Layout>
  )
}
export const Playground = Template.bind({})
Playground.parameters = {
  layout: 'fullscreen',
  backgrounds: { default: 'light' }
}
