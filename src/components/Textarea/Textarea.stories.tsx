import { StoryFn, Meta } from '@storybook/react'
import { Textarea } from './index'

const meta: Meta<typeof Textarea> = {
  title: 'Textarea',
  component: Textarea,
  args: {
    disabled: false
  },
  argTypes: {
    cols: {
      type: 'number'
    },
    rows: {
      type: 'number'
    }
  }
}

export default meta

const Template: StoryFn<typeof Textarea> = (args) => {
  return <Textarea {...args} />
}

export const Playground = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const Block = Template.bind({})
Block.args = { block: true }

export const Resizable = Template.bind({})
Resizable.args = { resize: 'both' }
