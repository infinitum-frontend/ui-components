import * as React from 'react'
import { UiButton } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof UiButton> = {
  title: 'Button',
  component: UiButton
}

export default Meta

const Template: ComponentStory<typeof UiButton> = (args) => <UiButton {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Нажми'
}
