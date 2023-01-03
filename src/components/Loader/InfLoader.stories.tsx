import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfLoader } from './index'

const meta: Meta<typeof InfLoader> = {
  title: 'Loader',
  component: InfLoader
}

export default meta

const Template: StoryFn<typeof InfLoader> = (args) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', padding: '12px', color: 'red' }}>
      <InfLoader {...args} />
    </div>
  )
}

export const Playground = Template.bind({})
