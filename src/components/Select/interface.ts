import { ComponentPropsWithoutRef, ReactNode } from 'react'

type ArrayElementConstraints<T> = Record<string, T[keyof T]>

export interface StandardizedListItemDefault {
  value: number | string
  label: string | ReactNode
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
  value: string
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться текст для отображения опции
   */
  label: string
  /**
   * Нужно ли сохранять остальные поля исходного объекта
   */
  rest?: boolean
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onChange'> {
  options: Array<StandardizedListItem<Record<string, any>>>
  className?: string
  onChange?: (item: StandardizedListItem<Record<string, any>>) => void
  autoFocus?: boolean
  disabled?: boolean
  value?: StandardizedListItemDefault['value']
  placeholder?: string
}
