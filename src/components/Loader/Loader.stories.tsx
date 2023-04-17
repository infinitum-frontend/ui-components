// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Loader, Size, Variant } from './index'

const meta: Meta<typeof Loader> = {
  title: 'Loader',
  component: Loader
}

export default meta

const Template: StoryFn<typeof Loader> = (args) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '18px' }}>
      <Loader {...args} />
    </div>
  )
}

export const Playground = {
  render: Template,

  args: {
    size: 'regular'
  }
}

export const Container: StoryObj<typeof Loader> = {
  render: (args) => {
    return (
      <Loader.Container fullHeight>
        <Loader />
      </Loader.Container>
    )
  }
}

export const Overlay: StoryObj<typeof Loader> = {
  render: (args) => {
    return (
      <Loader.Container overlay>
        <Loader />
      </Loader.Container>
    )
  }
}

export const Sizes: StoryObj<typeof Loader> = {
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: 'white'
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
          <Loader size={Size.Compact} />
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
          <Loader size={Size.Large} />
        </div>
      </div>
    )
  }
}

export const Variants: StoryObj<typeof Loader> = {
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: 'white'
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
          <code>Primary</code>
          <Loader variant={Variant.Primary} />
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
          <code>Unset</code>
          <Loader variant={Variant.Unset} />
        </div>
      </div>
    )
  }
}
