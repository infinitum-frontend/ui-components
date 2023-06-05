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

export const Variants: StoryObj<typeof Text> = {
  render: (args) => (
    <>
      <Text size={Text.Size.Large} weight={Text.Weight.Bold}>
        Subtitle 1
      </Text>
      <Text size={Text.Size.Medium} weight={Text.Weight.Bold}>
        Subtitle 2
      </Text>
      <Text size={Text.Size.Small} weight={Text.Weight.Bold}>
        Subtitle 3
      </Text>
      <Text size={Text.Size.Medium} weight={Text.Weight.Bold}>
        Body 1
      </Text>
      <Text size={Text.Size.Small} weight={Text.Weight.Bold}>
        Body 2
      </Text>
      <Text size={Text.Size.XSmall} weight={Text.Weight.Bold} uppercase>
        Overline 1
      </Text>
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
