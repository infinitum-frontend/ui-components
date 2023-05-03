import { useNotificationDispatchContext } from './NotificationContext'
import { NotificationOptions, ActionKind, Message } from './types'

let TOAST_ID = 1

function generateToastId(): string {
  return `${TOAST_ID++}`
}

/**
 * Хук создает функцию для вызова компонента Notification
 */
export function useNotification(): (
  message: Message,
  options?: NotificationOptions
) => void {
  const dispatch = useNotificationDispatchContext()

  function notify(message: Message, options?: NotificationOptions): void {
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
