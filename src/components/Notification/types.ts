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
   * Заголовок
   */
  title?: string
  /**
   * Время (в мс) до автоматического закрытия
   */
  duration?: number
  /**
   * Тип сообщения
   */
  type?: 'default' | 'info' | 'success' | 'error' | 'warning'
  /**
   * Слот для кнопки
   */
  actionSlot?: ReactNode
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
