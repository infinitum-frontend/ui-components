// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import PendingIndicator from './PendingIndicator'

const meta: Meta<typeof PendingIndicator> = {
  title: 'MPC/PendingIndicator',
  component: PendingIndicator
}

export default meta

const Template: StoryFn<typeof PendingIndicator> = (args) => {
  return <PendingIndicator {...args} />
}

export const Playground = Template.bind({})
