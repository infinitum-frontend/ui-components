// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement, useRef } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Popover } from './index'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Space } from '../Space'
import { Text } from '../Text'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'

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
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Content variant="inverse">
        Lorem ipsum dolor sit amet.
      </Popover.Content>
    </Popover>
  )
}

export const MPCProfileInfo: StoryFn<typeof Popover> = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost" after={<ArrowDownIcon />}>
          Константин Константинопольский
        </Button>
      </Popover.Trigger>
      <Popover.Content variant="inverse">
        <Space gap="small" style={{ width: '235px' }}>
          <div>
            <Heading level="4">Иван Иванов</Heading>
            <Text size="small" tone="quaternary">
              Проверяющий портфели
            </Text>
          </div>
          <div>
            <Text size="small" tone="tertiary">
              Логин
            </Text>
            <Text size="small" tone="inverse">
              specdep/byndyusoft11
            </Text>
          </div>
          <div>
            <Text size="small" tone="tertiary">
              E-mail
            </Text>
            <Text size="small" tone="inverse">
              byndyusoft11@specdep.ru
            </Text>
          </div>
          <div>
            <Text size="small" tone="tertiary">
              Телефон
            </Text>
            <Text size="small" tone="inverse">
              +79999999999
            </Text>
          </div>
        </Space>
      </Popover.Content>
    </Popover>
  )
}
