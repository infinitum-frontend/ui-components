import { StoryFn, Meta } from '@storybook/react'
import { Textarea } from './index'

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
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
    },
    onBlur: {
      control: false
    }
  }
}

export default meta

const Template: StoryFn<typeof Textarea> = (args) => {
  return <Textarea {...args} value={undefined} />
}

export const Playground = {
  render: Template
}

export const Disabled = {
  render: Template,
  args: { disabled: true }
}

export const Block = {
  render: Template,
  args: { block: true }
}

export const Resizable = {
  render: Template,
  args: { resize: 'both' }
}
