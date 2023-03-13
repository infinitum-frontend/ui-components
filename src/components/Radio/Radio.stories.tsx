// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Radio from './Radio'
import { action } from '@storybook/addon-actions'
import { Box } from '../Box'

const meta: Meta<typeof Radio> = {
  title: 'Form/Radio',
  component: Radio
}

export default meta

const Template: StoryFn<typeof Radio> = (args) => {
  return (
    <Radio {...args} onChange={action('change')}>
      Облигации
    </Radio>
  )
}

export const Playground = Template.bind({})

export const Disabled: StoryFn<typeof Radio> = (args) => {
  return (
    <Box
      style={{
        width: '300px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent'
      }}
    >
      <Radio disabled={true} checked={true}>
        <code>checked</code>
      </Radio>
      <Radio disabled={true}>
        <code>unchecked</code>
      </Radio>
    </Box>
  )
}
