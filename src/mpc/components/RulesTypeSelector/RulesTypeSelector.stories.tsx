import { StoryFn, Meta } from '@storybook/react'
import RulesTypeSelector from './RulesTypeSelector'

const meta: Meta<typeof RulesTypeSelector> = {
  title: 'MPC/Tabs2',
  component: RulesTypeSelector
}

export default meta

const Template: StoryFn<typeof RulesTypeSelector> = (args) => (
  <RulesTypeSelector {...args} />
)

export const Playground = Template.bind({})
