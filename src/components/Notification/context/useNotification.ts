import { useNotificationDispatchContext } from './NotificationContext'
import { NotificationOptions, ActionKind, Message } from '../types'

let TOAST_ID = 1

function generateToastId(): string {
  return `${TOAST_ID++}`
}

type NotifyFunction = (message: Message, options?: NotificationOptions) => void

/**
 * Хук создает функцию для вызова компонента Notification
 */
export function useNotification(): NotifyFunction {
  const dispatch = useNotificationDispatchContext()

  const notify: NotifyFunction = (message, options) => {
    const id = generateToastId()

    const payload = {
      id,
      options: {
        message,
        ...options
      }
    }

    dispatch({
      type: ActionKind.Add,
      payload
    })
  }

  return notify
}
