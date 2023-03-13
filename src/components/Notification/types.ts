import { ComponentPropsWithoutRef, Dispatch, ReactNode } from 'react'

export enum ActionKind {
  Add = 'ADD',
  Delete = 'DELETE'
}

export interface INotification {
  id: string
  options: NotificationOptions
}

export interface NotificationOptions {
  /**
   * Дополнительный className для всплывающего окна
   */
  className?: string
  /**
   * Текст сообщения
   */
  message: ReactNode
  /**
   * Время (в мс) до автоматического закрытия, если null, то автоматически не закрывается
   */
  duration?: number | null
}

export interface ReducerState {
  notifications: INotification[]
}

export type ReducerAction =
  | { type: ActionKind.Delete; payload: { id: string } }
  | { type: ActionKind.Add; payload: INotification }

export type Reducer<ReducerState, ReducerAction> = (
  state: ReducerState,
  action: ReducerAction
) => ReducerState

export interface INotificationStateContext {
  notifications: INotification[]
}

export type INotificationDispatchContext = Dispatch<ReducerAction>

export interface NotificationProps
  extends ComponentPropsWithoutRef<'div'>,
    NotificationOptions {
  id: string
}
