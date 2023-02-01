// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Page } from './index'

const meta: Meta<typeof Page> = {
  title: 'Layout/Page',
  component: Page
}

export default meta

const Template: StoryFn<typeof Page> = (args) => {
  return (
    <Page>
      <Page.Header>
        <h1>Header</h1>
      </Page.Header>
      <Page.Body>
        <div>Body</div>
      </Page.Body>
      <Page.Footer>
        <span>Footer</span>
      </Page.Footer>
    </Page>
  )
}
export const Playground = Template.bind({})
