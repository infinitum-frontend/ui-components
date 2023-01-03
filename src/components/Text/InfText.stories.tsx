import * as React from 'react'
import { InfText } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof InfText> = {
  title: 'Typography/Text',
  component: InfText,
  args: {
    children: 'Съешь ещё этих мягких французских булок, да выпей чаю'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof InfText> = ({ ...args }) => <InfText {...args} />

export const Playground = Template.bind({})

export const Sizes: StoryFn<typeof InfText> = (args) => (
  <>
    <InfText {...args} size="xlarge" />
    <InfText {...args} size="large" />
    <InfText {...args} size="medium" />
    <InfText {...args} size="small" />
    <InfText {...args} size="xsmall" />
  </>
)
Sizes.decorators = [
  (Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Story />
    </div>
  )
]
