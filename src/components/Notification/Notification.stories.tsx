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
  title: 'Notification',
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
    <Button
      onClick={() =>
        notify({
          message: `some message ${new Date().getTime()}`
        })
      }
    >
      Notify
    </Button>
  )
}

export const Playground = {
  render: Template,

  args: {
    message: `some message ${new Date().getTime()}`
  }
}

export const Duration: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  const durations = [5000, 1000, null]

  return (
    <Space>
      {durations.map((duration) => (
        <>
          <div>duration: {duration || 'null'}</div>
          <Button
            onClick={() =>
              notify({
                message: `Текст сообщения с задержкой ${duration || 'null'}`,
                duration
              })
            }
          >
            Notify
          </Button>
        </>
      ))}
    </Space>
  )
}

export const LongMessage: StoryFn<typeof Notification> = () => {
  const notify = useNotification()

  return (
    <Button
      onClick={() =>
        notify({
          message:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis inventore quas aspernatur repudiandae voluptate rerum distinctio libero minima minus cupiditate.',
          duration: null
        })
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
              notify({
                message: `some message ${new Date().getTime()}`,
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
