import * as React from 'react'
import { InfHeading } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const Meta: ComponentMeta<typeof InfHeading> = {
  title: 'Typography/Heading',
  component: InfHeading,
  argTypes: {
    children: {
      defaultValue: 'Заголовок'
    }
  }
}

export default Meta

const Template: ComponentStory<typeof InfHeading> = ({ ...args }) => <InfHeading {...args} />

export const Playground = Template.bind({})
