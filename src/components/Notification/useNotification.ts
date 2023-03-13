import { useNotificationDispatchContext } from './NotificationContext'
import { NotificationOptions, ActionKind } from './types'

/**
 * Хук создает функцию для вызова компонента Notification
 */
export function useNotification(): (options: NotificationOptions) => void {
  const dispatch = useNotificationDispatchContext()

  function notify(options: NotificationOptions): void {
    const id = `notification-${new Date().getTime()}` // TODO: id

    dispatch({
      type: ActionKind.Add,
      payload: {
        options,
        id
      }
    })
  }

  return notify
}
