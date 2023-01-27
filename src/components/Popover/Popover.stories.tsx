// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement, useRef } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Popover } from './index'
import { Button } from '../Button'

const ComponentMeta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover
}

export default ComponentMeta

export const Playground: StoryFn<typeof Popover> = ({ ...args }) => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Content>Lorem ipsum dolor sit amet.</Popover.Content>
    </Popover>
  )
}

export const Inverted: StoryFn<typeof Popover> = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Content variant="inverse">
        Lorem ipsum dolor sit amet.
      </Popover.Content>
    </Popover>
  )
}
