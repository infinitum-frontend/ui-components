import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfRadio } from './index'
import { action } from '@storybook/addon-actions'
import InfBox from '../Box/InfBox'

const meta: Meta<typeof InfRadio> = {
  title: 'Radio',
  component: InfRadio
}

export default meta

const Template: StoryFn<typeof InfRadio> = (args) => {
  return (<InfRadio {...args} onChange={action('change')}>Облигации</InfRadio>)
}

export const Playground = Template.bind({})

export const Disabled: StoryFn<typeof InfRadio> = (args) => {
  return (
    <InfBox style={{ width: '300px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'transparent' }}>
      <InfRadio disabled={true} checked={true}><code>checked</code></InfRadio>
      <InfRadio disabled={true}><code>unchecked</code></InfRadio>
    </InfBox>
  )
}
