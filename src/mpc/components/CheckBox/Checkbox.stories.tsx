import { StoryFn, Meta } from '@storybook/react'
import { Checkbox } from './index'

const meta: Meta<typeof Checkbox> = {
  title: 'MPC/Checkbox',
  component: Checkbox
}

export default meta

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Playground = Template.bind({})
