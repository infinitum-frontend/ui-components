import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfCheckbox } from './index'
import { action } from '@storybook/addon-actions'
import { InfBox } from '../Box'
import InfCheckboxIndeterminateGroup from './InfCheckboxIndeterminateGroup'

const meta: Meta<typeof InfCheckbox> = {
  title: 'Checkbox',
  component: InfCheckbox
}

export default meta

const Template: StoryFn<typeof InfCheckbox> = (args) => {
  return (
    <InfCheckbox
      {...args}
      defaultChecked={false}
      onChange={action('change')}>Облигации
    </InfCheckbox>
  )
}

export const Playground = Template.bind({})

export const AllVariants: StoryFn<typeof InfCheckbox> = (args) => {
  return (
    <InfBox style={{ width: '300px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <InfCheckbox variant={'primary'} defaultChecked={true}><code>primary</code></InfCheckbox>
      <InfCheckbox variant={'indeterminate'} defaultChecked={true}><code>indeterminate</code></InfCheckbox>
    </InfBox>
  )
}

export const IndeterminateGroup: StoryFn<typeof InfCheckboxIndeterminateGroup> = (arg) => {
  return (
    <InfCheckboxIndeterminateGroup onChange={action('change')}>
      <InfCheckbox>Первый мини чекбокс</InfCheckbox>
      <InfCheckbox>Второй мини чекбокс</InfCheckbox>
    </InfCheckboxIndeterminateGroup>
  )
}
