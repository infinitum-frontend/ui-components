// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  Notification,
  NotificationContainer,
  NotificationProvider,
  useNotification
} from './index'
import { Button } from 'Components/Button'
import { Modal } from 'Components/Modal'
import { Space } from 'Components/Space'

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
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

const Template: StoryFn<typeof Notification> = (args) => {
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

  const durations = [5000, 1000, null]

  return (
    <Space>
      {durations.map((duration, index) => (
        <div key={index}>
          <div>duration: {duration || 'null'}</div>
          <Button
            onClick={() =>
              notify(`Текст сообщения с задержкой ${duration || 'null'}`, {
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

  const types = ['default', 'success', 'warning', 'error']

  return (
    <Space>
      {types.map((type, index) => (
        <div key={index}>
          <Button
            onClick={() =>
              notify(`Текст сообщения типа ${type}`, {
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

export const LongMessage: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  return (
    <Button
      onClick={() =>
        notify(
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis inventore quas aspernatur repudiandae voluptate rerum distinctio libero minima minus cupiditate.',
          {
            duration: null
          }
        )
      }
    >
      Notify
    </Button>
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
