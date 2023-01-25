// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Tooltip } from './index'
import { Button } from '../Button'

const ComponentMeta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    }
  }
}

const decorator = (Story): ReactElement => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {Story()}
  </div>
)

export default ComponentMeta

export const Playground: StoryFn<typeof Tooltip> = ({ ...args }) => {
  return (
    <Tooltip content="Lorem ipsum dolor sit amet.">
      <Button>Trigger</Button>
    </Tooltip>
  )
}
Playground.decorators = [decorator]

export const Controlled: StoryFn<typeof Tooltip> = () => {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip
      open={open}
      onOpenChange={setOpen}
      content="Lorem ipsum dolor sit amet."
    >
      <Button onClick={() => setOpen((v) => !v)}>Trigger</Button>
    </Tooltip>
  )
}
Controlled.decorators = [decorator]

export const DefaultOpen: StoryFn<typeof Tooltip> = () => {
  return (
    <Tooltip defaultOpen content="Lorem ipsum dolor sit amet.">
      <Button>Trigger</Button>
    </Tooltip>
  )
}
DefaultOpen.decorators = [decorator]

export const Placement: StoryFn<typeof Tooltip> = () => {
  return (
    <Tooltip defaultOpen content="Lorem ipsum dolor sit amet.">
      <Button>Trigger</Button>
    </Tooltip>
  )
}
DefaultOpen.decorators = [
  (Story) => (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {Story()}
    </div>
  )
]
