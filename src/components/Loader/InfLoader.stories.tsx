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
    <div style={{ backgroundColor: 'white', padding: '18px', color: 'red' }}>
      <InfLoader {...args} />
    </div>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  size: 'regular'
}

export const AllSizes: StoryFn<typeof InfLoader> = (args) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'white', color: 'red' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '18px' }}>
        <code>Compact(17.5x17.5)</code>
        <InfLoader size={'compact'} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '18px' }}>
        <code>Regular(30x30)</code>
        <InfLoader />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '18px' }}>
        <code>Large(70x70)</code>
        <InfLoader size={'large'} />
      </div>
    </div>
  )
}
