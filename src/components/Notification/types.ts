import { ComponentPropsWithoutRef, Dispatch, ReactNode } from 'react'

export enum ActionKind {
  Add = 'ADD',
  Delete = 'DELETE'
}

export type Message = ReactNode

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
   * Текст сообщения (DEPRECATED, дублирует первый аргумент функции вызова уведомления)
   */
  message?: Message
  /**
   * Время (в мс) до автоматического закрытия, если null, то автоматически не закрывается
   */
  duration?: number | null
  /**
   * Тип сообщения
   */
  type?: 'default' | 'success' | 'error' | 'warning'
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
  /**
   * ID уведомления
   */
  id: string
}
