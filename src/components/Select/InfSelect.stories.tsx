import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { InfSelect } from './index'
import { InfBox } from '../Box'

const meta: Meta<typeof InfSelect> = {
  title: 'Select',
  component: InfSelect
}

export default meta

const Template: StoryFn<typeof InfSelect> = (args) => {
  return (
    <InfBox style={{ width: '300px' }}>
      <InfSelect {...args} />
    </InfBox>
  )
}

export const Playground = Template.bind({})

Playground.args = {
  items: [
    { text: 'Первый элемент', value: 0, subtext: 'Дополнительный' },
    { text: 'Второй элемент', value: 1, subtext: 'Дополнительный текст' },
    { text: 'Третий элемент', value: 2, subtext: 'Дополнительный текст' }
  ]
}
