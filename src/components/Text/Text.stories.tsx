// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Text } from './index'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Съешь ещё этих мягких французских булок, да выпей чаю'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Text> = ({ ...args }) => <Text {...args} />

export const Playground = {
  render: Template
}

export const Sizes: StoryObj<typeof Text> = {
  render: (args) => (
    <>
      <Text {...args} size="xlarge" />
      <Text {...args} size="large" />
      <Text {...args} size="medium" />
      <Text {...args} size="small" />
      <Text {...args} size="xsmall" />
      <Text {...args} size="xxsmall" />
    </>
  ),

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Story />
      </div>
    )
  ]
}

export const Truncated = {
  render: Template,

  args: {
    children:
      'Съешь ещё этих мягких французских булок, да выпей чаю Съешь ещё этих мягких французских булок, да выпей чаю Съешь ещё этих мягких французских булок, да выпей чаю Съешь ещё этих мягких французских булок, да выпей чаю',
    truncated: true
  }
}
