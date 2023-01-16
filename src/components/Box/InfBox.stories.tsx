// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { InfBox } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof InfBox> = {
  title: 'Box',
  component: InfBox,
  argTypes: {
    children: {
      defaultValue: 'Съешь ещё этих мягких французских булок, да выпей чаю'
    }
  }
}

export default Meta

const Template: ComponentStory<typeof InfBox> = ({ ...args }) => (
  <InfBox {...args} />
)

export const Playground = Template.bind({})
