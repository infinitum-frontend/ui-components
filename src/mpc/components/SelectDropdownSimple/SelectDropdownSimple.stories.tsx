import { StoryFn, Meta } from '@storybook/react'
import { SelectDropdownSimple } from './index'

const meta: Meta<typeof SelectDropdownSimple> = {
  title: 'MPC/SelectDropdownSimple',
  component: SelectDropdownSimple
}

export default meta

const Template: StoryFn<typeof SelectDropdownSimple> = (args) => (
  <SelectDropdownSimple {...args} />
)

export const Playground = Template.bind({})
