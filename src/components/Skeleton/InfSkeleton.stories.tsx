// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { InfSkeleton } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof InfSkeleton> = {
  title: 'Skeleton',
  component: InfSkeleton
}

export default ComponentMeta

const Template: StoryFn<typeof InfSkeleton> = ({ ...args }) => {
  return <InfSkeleton {...args} />
}

export const Playground = Template.bind({})
