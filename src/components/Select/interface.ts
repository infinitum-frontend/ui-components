import { RefObject } from 'react'
import { InputRefHandler } from '../Input/interface'

type ArrayElementConstraints<T> = Record<string, T[keyof T]>

export interface StandardizedListItemDefault {
  value: string | number | null
  text: string
  subtext?: string
}

type MappedObject<T extends ArrayElementConstraints<T>> = {
  [Property in keyof T]: T[Property]
}

export type StandardizedListItem<T extends ArrayElementConstraints<T>> = StandardizedListItemDefault & MappedObject<T>

export interface FormatterOptions<T extends ArrayElementConstraints<T>> {
  /**
   * Исходный массив, подлежащий форматированию
   */
  array: T[]
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться ключ для опции
   * Ключ должен являться уникальным значением
   */
  value: number
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться текст для отображения опции
   */
  text: string
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться дополнительный текст.
   */
  subtext?: string
  rest?: boolean
}

export interface InfSelectProps {
  items: Array<StandardizedListItem<Record<string, any>>>
  size?: 'small' | 'medium'
  variant?: 'split' | 'stuck'
  className?: string
  inputRef?: RefObject<InputRefHandler>
  onSubmit?: (item: StandardizedListItem<Record<string, any>>) => void
  autoFocus?: boolean
  disabled?: boolean
}
