// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Skeleton } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Skeleton> = {
  title: 'Skeleton',
  component: Skeleton
}

export default ComponentMeta

const Template: StoryFn<typeof Skeleton> = ({ ...args }) => {
  return <Skeleton {...args} />
}

export const Playground = Template.bind({})
