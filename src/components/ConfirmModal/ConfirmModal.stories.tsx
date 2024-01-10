// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { ConfirmModal, useConfirm } from './index'
import { InfinitumUIProvider } from 'Components/InfinitumUIProvider'
import { Button } from 'Components/Button'
import { DropdownMenu } from 'Components/DropdownMenu'
import { useNotification } from 'Components/Notification'

const meta: Meta<typeof ConfirmModal> = {
  title: 'Overlay/ConfirmModal',
  component: ConfirmModal,
  decorators: [
    (Story) => {
      return (
        <InfinitumUIProvider>
          <Story />
        </InfinitumUIProvider>
      )
    }
  ],
  parameters: {
    docs: {
      source: { type: 'code' }
    }
  }
}

export default meta

const Template: StoryFn<typeof ConfirmModal> = (args) => {
  const confirm = useConfirm()
  const notify = useNotification()

  const handleClick = async (): Promise<void> => {
    const isConfirmed = await confirm({ ...args })
    if (isConfirmed) {
      notify('Подтверждено', { type: 'success' })
    } else {
      notify('Отклонено', { type: 'error' })
    }
  }

  return (
    <Button variant="primary" onClick={handleClick}>
      Удалить пользователя
    </Button>
  )
}

export const Playground = {
  render: Template,
  args: {
    title: 'Вы уверены что хотите это сделать?',
    confirmText: 'Да',
    cancelText: 'Нет'
  },
  parameters: {
    docs: { source: { type: 'dynamic' } }
  }
}

export const WithDescription = {
  render: Template,
  args: {
    title: 'Удаление пользователя',
    description: 'Вы уверены что хотите это сделать?',
    confirmText: 'Да',
    cancelText: 'Нет'
  }
}

export const InDropdownMenu: StoryObj<typeof ConfirmModal> = {
  render: () => {
    const confirm = useConfirm()
    const notify = useNotification()

    const handleSelect = async (): Promise<void> => {
      const isConfirmed = await confirm({
        title: 'Выбрать 3?',
        confirmText: 'Да',
        cancelText: 'Нет'
      })

      if (isConfirmed) {
        notify('select 3', { type: 'success' })
      } else {
        notify('cancel 3', { type: 'error' })
      }
    }

    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button>Меню</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => notify('select 1')}>
            Действие 1
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => notify('select 2')}>
            Действие 2
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={handleSelect}>
            Действие 3
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    )
  }
}

export const Multiple: StoryObj<typeof ConfirmModal> = {
  render: () => {
    const confirm = useConfirm()
    const notify = useNotification()

    const handleActionOne = async (): Promise<void> => {
      const isConfirmed = await confirm({
        title: 'Выполнить действие 1?',
        confirmText: 'Да',
        cancelText: 'Нет'
      })
      if (isConfirmed) {
        notify('Подтверждено 1', { type: 'success' })
      } else {
        notify('Отклонено 1', { type: 'error' })
      }
    }

    const handleActionTwo = async (): Promise<void> => {
      const isConfirmed = await confirm({
        title: 'Выполнить действие 2?',
        confirmText: 'Да',
        cancelText: 'Нет'
      })
      if (isConfirmed) {
        notify('Подтверждено 2', { type: 'success' })
      } else {
        notify('Отклонено 2', { type: 'error' })
      }
    }

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button onClick={handleActionOne}>Действие 1</Button>
        <Button onClick={handleActionTwo}>Действие 2</Button>
      </div>
    )
  }
}
