// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { ConfirmModal } from './index'
import { Button } from 'Components/Button'
import { DropdownMenu } from 'Components/DropdownMenu'

const meta: Meta<typeof ConfirmModal> = {
  title: 'Overlay/ConfirmModal',
  component: ConfirmModal,
  args: {
    onConfirm: () => alert('confirmed')
  }
}

export default meta

const Template: StoryFn<typeof ConfirmModal> = (args) => {
  return (
    <ConfirmModal {...args}>
      <Button variant="primary">Удалить пользователя</Button>
    </ConfirmModal>
  )
}

export const Playground = {
  render: Template,
  args: {
    title: 'Удаление из рассылки',
    confirmText: 'Удалить',
    cancelText: 'Отменить'
  }
}

export const WithDescription = {
  render: Template,
  args: {
    title: 'Удаление из рассылки',
    description: 'Удалить Сидорова Александра Петровича из рассылки?',
    confirmText: 'Удалить',
    cancelText: 'Отменить'
  }
}

export const InDropdownMenu: StoryObj<typeof ConfirmModal> = {
  render: (args) => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button>Меню</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => alert('select 1')}>
            Действие 1
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => alert('select 2')}>
            Действие 2
          </DropdownMenu.Item>
          <ConfirmModal
            title="Выбрать?"
            confirmText="Выбрать"
            cancelText="Отменить"
            onConfirm={() => alert('confirmed')}
          >
            <DropdownMenu.Item>Действие 3</DropdownMenu.Item>
          </ConfirmModal>
        </DropdownMenu.Content>
      </DropdownMenu>
    )
  }
}
