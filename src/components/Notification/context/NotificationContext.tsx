import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  ReactNode
} from 'react'
import {
  ActionKind,
  ReducerAction,
  ReducerState,
  INotificationStateContext,
  INotificationDispatchContext
} from '../types'

const NotificationStateContext = createContext<INotificationStateContext>({
  notifications: []
})
const NotificationDispatchContext = createContext<INotificationDispatchContext>(
  () => {}
)

function NotificationReducer(
  state: ReducerState,
  action: ReducerAction
): ReducerState {
  switch (action.type) {
    case ActionKind.Add: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    }
    case ActionKind.Delete: {
      const updatedNotifications = state.notifications.filter(
        (item) => item.id !== action.payload.id
      )

      return {
        ...state,
        notifications: updatedNotifications
      }
    }
    default: {
      throw Error(`Unknown action ${(action as any).type as string}`)
    }
  }
}

export function NotificationProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const [state, dispatch] = useReducer(NotificationReducer, {
    notifications: []
  })

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  )
}

export const useNotificationStateContext = (): INotificationStateContext =>
  useContext(NotificationStateContext)
export const useNotificationDispatchContext =
  (): INotificationDispatchContext => useContext(NotificationDispatchContext)
