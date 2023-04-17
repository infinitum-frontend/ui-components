// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, ReactElement, useRef } from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Popover } from './index'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Space } from '../Space'
import { Text } from '../Text'
import { List } from '../List'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { omitKeyFromObject } from '../../utils/helpers'

const ComponentMeta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    }
  }
}

export default ComponentMeta

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

export const Playground: StoryObj<typeof Popover> = {
  render: ({ ...args }) => {
    const argsWithoutChangeHandler = omitKeyFromObject('onOpenChange', args)

    return (
      <Popover {...argsWithoutChangeHandler}>
        <Popover.Trigger>
          <Button>Trigger</Button>
        </Popover.Trigger>
        <Popover.Content>Lorem ipsum dolor sit amet.</Popover.Content>
      </Popover>
    )
  },

  decorators: [decorator],
  Inverted: [decorator]
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

export const UserMenu1: StoryObj<typeof Popover> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger onClick={() => setIsOpen((v) => !v)}>
          <Button
            variant="ghost"
            after={
              <ArrowDownIcon
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              />
            }
          >
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
  },

  decorators: [decorator]
}

export const UserMenu2: StoryObj<typeof Popover> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    function onExitClick(): void {
      alert('Выйти')
    }

    return (
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom-end"
        offset={{ mainAxis: 10 }}
      >
        <Popover.Trigger onClick={() => setIsOpen((v) => !v)}>
          <Button
            variant="ghost"
            after={
              <ArrowDownIcon
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              />
            }
          >
            Константин Константинопольский
          </Button>
        </Popover.Trigger>
        <Popover.Content hasPadding={false} style={{ width: '150px' }}>
          <List>
            <List.Item as="a" href="https://ya.ru">
              Настройки
            </List.Item>
            <List.Item
              as="button"
              onClick={onExitClick}
              style={{ display: 'block', color: 'var(--inf-color-text-danger' }}
            >
              Выйти
            </List.Item>
          </List>
        </Popover.Content>
      </Popover>
    )
  },

  decorators: [decorator]
}
