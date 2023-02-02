// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useRef } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Page } from './index'
import { Layout } from 'Components/Layout'
import { Container } from 'Components/Container'
import { Heading } from 'Components/Heading'

const meta: Meta<typeof Page> = {
  title: 'Layout/Page',
  component: Page
}

export default meta

const Template: StoryFn<typeof Page> = (args) => {
  return (
    <Layout>
      <Layout.Header>Layout Header</Layout.Header>
      <Layout.Body>
        <Container>
          <Page>
            <Page.Header>
              <Heading level="2">Список пайщиков</Heading>
            </Page.Header>
            <Page.Body>
              <div>Page Body</div>
            </Page.Body>
            <Page.Footer>
              <span>Page Footer</span>
            </Page.Footer>
          </Page>
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
