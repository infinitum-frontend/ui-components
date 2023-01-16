import { StoryFn, Meta } from '@storybook/react'
import { Checkbox } from './index'
import { InfBox } from '../Box'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox
}

export default meta

const Template: StoryFn<typeof Checkbox> = (args) => {
  return (
    <Checkbox
      onChange={action('change')}
      {...args}>Облигации
    </Checkbox>
  )
}

export const Playground = Template.bind({})

export const AllVariants: StoryFn<typeof Checkbox> = (args) => {
  return (
    <InfBox style={{ width: '300px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <Checkbox variant={'primary'} defaultChecked={true}><code>primary</code></Checkbox>
      <Checkbox variant={'indeterminate'} defaultChecked={true}><code>indeterminate</code></Checkbox>
    </InfBox>
  )
}

export const Disabled: StoryFn<typeof Checkbox> = (args) => {
  return (
    <InfBox style={{ width: '300px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'transparent' }}>
      <Checkbox disabled={true} defaultChecked={true}><code>checked</code></Checkbox>
      <Checkbox disabled={true}><code>uncheked</code></Checkbox>
    </InfBox>
  )
}
