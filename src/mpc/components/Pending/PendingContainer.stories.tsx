// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import PendingContainer from './PendingContainer'

const meta: Meta<typeof PendingContainer> = {
  title: 'MPC/PendingContainer',
  component: PendingContainer
}

export default meta

const Template: StoryFn<typeof PendingContainer> = (args) => {
  return <PendingContainer {...args} />
}

export const Playground = Template.bind({})
