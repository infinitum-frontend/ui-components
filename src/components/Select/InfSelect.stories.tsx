import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { InfSelect } from './index'
import { InfBox } from '../Box'
import { StandardizedListItem } from './interface'

const mockItems = [
  { text: 'Первый элемент', value: 0, subtext: 'Дополнительный' },
  { text: 'Второй элемент', value: 1, subtext: 'Дополнительный текст' },
  { text: 'Третий элемент', value: 2, subtext: 'Дополнительный текст' }
]

const meta: Meta<typeof InfSelect> = {
  title: 'Select',
  component: InfSelect,
  args: {
    items: mockItems
  }
}

export default meta

const Template: StoryFn<typeof InfSelect> = (args) => {
  const handleSubmit: (item: StandardizedListItem<Record<string, any>>) => void = (item) => {
    console.log(item)
  }

  return (
    <InfBox style={{ width: '300px' }}>
      <InfSelect {...args} onSubmit={handleSubmit} />
    </InfBox>
  )
}

export const Playground = Template.bind({})

export const AllSizes: StoryFn<typeof InfSelect> = (args) => {
  return (
    <InfBox style={{ width: '500px', height: '100px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'start', padding: '12px' }}>
      <div>
        <code style={{ color: 'darkred' }}>small</code>
        <InfSelect {...args}
                   size={'small'} />
      </div>
      <div>
        <code style={{ color: 'darkred' }}>medium</code>
        <InfSelect {...args} />
      </div>
    </InfBox>
  )
}

export const AllVariants: StoryFn<typeof InfSelect> = (args) => {
  return (
    <InfBox style={{ width: '500px', height: '100px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '12px' }}>
      <div>
        <code style={{ color: 'darkred' }}>split</code>
        <InfSelect {...args} />
      </div>
      <div>
        <code style={{ color: 'darkred' }}>stuck</code>
        <InfSelect {...args} variant={'stuck'} />
      </div>
    </InfBox>
  )
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  autoFocus: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
