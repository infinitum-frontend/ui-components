import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InfSelect } from './index'

const Meta: ComponentMeta<typeof InfSelect> = {
  title: 'Select',
  component: InfSelect
}

export default Meta

const Template: ComponentStory<typeof InfSelect> = (args) => <InfSelect {...args} />

export const Playground = Template.bind({})

Playground.args = {
  items: [
    { text: 'Первый элемент', id: 0, subtext: 'Дополнительный' },
    { text: 'Второй элемент', id: 1, subtext: 'Дополнительный текст' },
    { text: 'Третий элемент', id: 2, subtext: 'Дополнительный текст' }
  ]
}
