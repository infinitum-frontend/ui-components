import { StoryFn, Meta } from '@storybook/react'
import { NativeDatePicker } from './index'

const meta: Meta<typeof NativeDatePicker> = {
  title: 'DatePicker',
  component: NativeDatePicker
}

export default meta

const Template: StoryFn<typeof NativeDatePicker> = (args) => {
  return <NativeDatePicker {...args} />
}

export const Playground = Template.bind({})
