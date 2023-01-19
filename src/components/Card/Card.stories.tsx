// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Card } from './index'
import { Meta, StoryFn } from '@storybook/react'

const ComponentMeta: Meta<typeof Card> = {
  title: 'Card',
  component: Card
}

export default ComponentMeta

const Template: StoryFn<typeof Card> = ({ ...args }) => {
  return (
    <Card {...args}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam,
      exercitationem? Porro, quaerat unde! Voluptatum aut, similique beatae
      blanditiis voluptates praesentium. Inventore cumque ad odit facere sit
      vero eum, ipsa earum.
    </Card>
  )
}

export const Playground = Template.bind({})
