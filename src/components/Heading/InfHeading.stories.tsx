import * as React from 'react'
import { InfHeading } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof InfHeading> = {
  title: 'Typography/Heading',
  component: InfHeading,
  args: {
    children: 'Заголовок'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof InfHeading> = ({ ...args }) => <InfHeading {...args} />

export const Playground = Template.bind({})

export const Levels: StoryFn<typeof InfHeading> = (args) => (
  <>
    <InfHeading {...args} level="1" />
    <InfHeading {...args} level="2" />
    <InfHeading {...args} level="3" />
    <InfHeading {...args} level="4" />
    <InfHeading {...args} level="5" />
  </>
)
Levels.decorators = [
  (Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Story />
    </div>
  )
]
