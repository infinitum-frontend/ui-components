import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfRadio } from './index'
import { action } from '@storybook/addon-actions'
import InfRadioGroup from './InfRadioGroup'
import { ChangeEvent, useState } from 'react'

const meta: Meta<typeof InfRadio> = {
  title: 'Radio',
  component: InfRadio
}

export default meta

const Template: StoryFn<typeof InfRadio> = (args) => {
  return (<InfRadio {...args} onChange={action('change')}>Radio</InfRadio>)
}

export const Playground = Template.bind({})

export const Group: StoryFn<typeof InfRadioGroup> = (args) => {
  const [state, setState] = useState<string>('')

  const handleChange = (e: ChangeEvent, val: string): void => {
    setState(val)
  }

  return (
    <div>
      <InfRadioGroup
        name={'radio'}
        value={state}
        onChange={handleChange}>
        <InfRadio value={'1'}>Checkbox 1</InfRadio>
        <InfRadio value={'2'}>Checkbox 2</InfRadio>
        <InfRadio value={'3'}>Checkbox 3</InfRadio>
      </InfRadioGroup>
      <div style={{ marginTop: '12px' }}>Selected: {state}</div>
    </div>
  )
}
