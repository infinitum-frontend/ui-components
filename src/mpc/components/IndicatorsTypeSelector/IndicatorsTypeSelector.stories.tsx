import { StoryFn, Meta } from '@storybook/react'
import { IndicatorsTypeSelector } from './index'

const meta: Meta<typeof IndicatorsTypeSelector> = {
  title: 'MPC/Tabs3',
  component: IndicatorsTypeSelector
}

export default meta

const Template: StoryFn<typeof IndicatorsTypeSelector> = (args) => (
  <IndicatorsTypeSelector {...args} />
)

export const Playground = Template.bind({})