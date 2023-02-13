// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Notification } from './index'

const meta: Meta<typeof Notification> = {
  title: 'Notification',
  component: Notification
}

export default meta

const Template: StoryFn<typeof Notification> = (args) => {
  return <Notification {...args} />
}

export const Playground = Template.bind({})
