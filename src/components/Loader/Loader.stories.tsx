// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Loader } from './index'

const meta: Meta<typeof Loader> = {
  title: 'Loader',
  component: Loader
}

export default meta

const Template: StoryFn<typeof Loader> = (args) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '18px', color: 'red' }}>
      <Loader {...args} />
    </div>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  size: 'regular'
}

export const AllSizes: StoryFn<typeof Loader> = (args) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        color: 'red'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          padding: '18px'
        }}
      >
        <code>Compact(17.5x17.5)</code>
        <Loader size={'compact'} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          padding: '18px'
        }}
      >
        <code>Regular(30x30)</code>
        <Loader />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          padding: '18px'
        }}
      >
        <code>Large(70x70)</code>
        <Loader size={'large'} />
      </div>
    </div>
  )
}
