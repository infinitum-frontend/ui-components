// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement, useRef } from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Tooltip } from './index'
import { Button } from '../Button'
import { omitKeyFromObject } from '../../utils/helpers'

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

export const Playground: StoryObj<typeof Tooltip> = {
  render: ({ ...args }) => {
    const argsWithoutChangeHandler = omitKeyFromObject('onOpenChange', args)

    return (
      <Tooltip {...argsWithoutChangeHandler}>
        <Button>Trigger</Button>
      </Tooltip>
    )
  },

  decorators: [decorator],

  args: {
    content: 'Lorem ipsum dolor sit amet.'
  }
}

export const Controlled: StoryObj<typeof Tooltip> = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Tooltip
        open={open}
        onOpenChange={setOpen}
        content="Lorem ipsum dolor sit amet."
        placement="left"
      >
        <Button onClick={() => setOpen((v) => !v)}>Trigger</Button>
      </Tooltip>
    )
  },

  decorators: [decorator]
}

export const DefaultOpen: StoryObj<typeof Tooltip> = {
  render: () => {
    return (
      <Tooltip defaultOpen content="Lorem ipsum dolor sit amet.">
        <Button>Trigger</Button>
      </Tooltip>
    )
  },

  decorators: [decorator]
}

export const Inverted: StoryObj<typeof Tooltip> = {
  render: () => {
    return (
      <Tooltip
        variant="inverted"
        defaultOpen
        content="Lorem ipsum dolor sit amet."
      >
        <Button>Trigger</Button>
      </Tooltip>
    )
  },

  decorators: [decorator]
}

export const PointerEvent: StoryFn<typeof Tooltip> = () => {
  function onPointerEnter(): void {
    console.log('Событие pointerEnter сработало', buttonRef)
  }

  const buttonRef = useRef(null)

  return (
    <Tooltip content="Lorem ipsum dolor sit amet.">
      <Button ref={buttonRef} onPointerEnter={onPointerEnter}>
        Кликни
      </Button>
    </Tooltip>
  )
}
