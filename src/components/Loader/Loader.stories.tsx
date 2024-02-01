// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Loader } from './index'
import LoaderContainer from './components/Container'
import { useState } from 'react'
import { Space } from '../Space'
import { Input } from '../Input'
import { Form } from '../Form'

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
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

export const FullHeight: StoryObj<typeof Loader> = {
  render: (args) => {
    return (
      <Loader.Container fullHeight>
        <Loader />
      </Loader.Container>
    )
  }
}

export const CustomHeight: StoryObj<typeof LoaderContainer> = {
  render: (args) => {
    const [height, setHeight] = useState('300')

    return (
      <Space>
        <Form.Label>Введите высоту, в px</Form.Label>
        <Input
          value={height}
          onChange={setHeight}
          placeholder="Введите высоту"
          type="number"
        />
        <Loader.Container height={Number(height)}>
          <Loader />
        </Loader.Container>
      </Space>
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
          <Loader size="compact" />
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
          <Loader size="large" />
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
          <Loader variant="primary" />
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
          <Loader variant="unset" />
        </div>
      </div>
    )
  }
}
