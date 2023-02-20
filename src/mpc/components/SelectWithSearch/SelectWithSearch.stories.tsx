import { StoryFn, Meta } from '@storybook/react'
import { SelectWithSearch } from './index'
import { OptionsFixture } from '../SelectDropdown/__fixture__'

const meta: Meta<typeof SelectWithSearch> = {
  title: 'MPC/SelectWithSearch',
  component: SelectWithSearch
}

export default meta

const Template: StoryFn<typeof SelectWithSearch> = (args) => {
  return <SelectWithSearch {...args} data={OptionsFixture} />
}

export const Playground = Template.bind({})
