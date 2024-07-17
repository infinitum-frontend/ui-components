// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  Notification,
  NotificationContainer,
  NotificationProvider,
  useNotification
} from './index'
import { NotificationOptions } from './types'
import { Button } from 'Components/Button'
import { Modal } from 'Components/Modal'
import { Space } from 'Components/Space'

const meta: Meta<typeof Notification> = {
  title: 'Overlay/Notification',
  component: Notification,
  decorators: [
    (Story) => {
      return (
        <NotificationProvider>
          <Story />
          <NotificationContainer />
        </NotificationProvider>
      )
    }
  ]
}

export default meta

const Template: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  return (
    <Button onClick={() => notify(`some message ${new Date().getTime()}`)}>
      Notify
    </Button>
  )
}

export const Playground = {
  render: Template
}

export const Duration: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  const durations = [5000, 1000]

  return (
    <Space>
      {durations.map((duration, index) => (
        <div key={index}>
          <div>duration: {duration || 'null'}</div>
          <Button
            onClick={() =>
              notify(`Текст сообщения с задержкой ${duration}`, {
                duration
              })
            }
          >
            Notify
          </Button>
        </div>
      ))}
    </Space>
  )
}

export const Type: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  const types: Array<NotificationOptions['type']> = [
    'default',
    'info',
    'success',
    'warning',
    'error'
  ]

  return (
    <Space>
      {types.map((type, index) => (
        <div key={index}>
          <Button
            onClick={() =>
              notify(`Текст сообщения типа ${type as string}`, {
                type
              })
            }
          >
            Notify {type}
          </Button>
        </div>
      ))}
    </Space>
  )
}

export const WithTitleAndMessage: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  function handleClick(): void {
    notify('Текст уведомления', {
      title: 'Информационное уведомление',
      type: 'info'
    })
  }

  return (
    <>
      <Button onClick={() => handleClick()}>Notify</Button>
    </>
  )
}

export const WithActionSlot: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  function handleClick(): void {
    notify('Текст уведомления', {
      title: 'Информационное уведомление',
      actionSlot: (
        <Button onClick={() => alert('Клик')} size="small" variant="secondary">
          Действие
        </Button>
      )
    })
  }

  return (
    <>
      <Button onClick={() => handleClick()}>Notify</Button>
    </>
  )
}

export const LongMessage: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  return (
    <Button
      onClick={() =>
        notify(
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis inventore quas aspernatur repudiandae voluptate rerum distinctio libero minima minus cupiditate.'
        )
      }
    >
      Notify
    </Button>
  )
}

export const WithTextOverflow: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  function handleClick(): void {
    notify('Текст уведомления', {
      title:
        'ИнформационноеУведомлениеИнформационноеУведомлениеИнформационноеУведомление',
      message:
        'ИнформационноеУведомлениеИнформационноеУведомлениеИнформационноеУведомлениеИнформационноеУведомлениеИнформационноеУведомлениеИнформационноеУведомление',
      type: 'info'
    })
  }

  return (
    <>
      <Button onClick={() => handleClick()}>Notify</Button>
    </>
  )
}

export const InModal: StoryFn<typeof Notification> = () => {
  const notify = useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Body>
          <Button
            onClick={() =>
              notify(`some message ${new Date().getTime()}`, {
                duration: 5000
              })
            }
          >
            Notify
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export const MutipleAtOnce: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  function handleClick(): void {
    notify('Message 1 - 1000 ms duration', { duration: 1000 })
    notify('Message 2 - 3000 ms duration', { duration: 3000 })
  }

  return (
    <>
      <Button onClick={() => handleClick()}>Notify Multiple</Button>
    </>
  )
}
