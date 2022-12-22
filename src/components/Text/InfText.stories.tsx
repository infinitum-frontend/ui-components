import * as React from 'react'
import { InfText } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof InfText> = {
  title: 'Typography/Text',
  component: InfText,
  argTypes: {
    children: {
      defaultValue: 'Съешь ещё этих мягких французских булок, да выпей чаю'
    }
  }
}

export default Meta

const Template: ComponentStory<typeof InfText> = ({ ...args }) => <InfText {...args} />

export const Playground = Template.bind({})
