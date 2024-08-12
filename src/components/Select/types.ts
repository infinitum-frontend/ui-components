import { ComponentPropsWithoutRef, ReactNode } from 'react'

type ArrayElementConstraints<T> = Record<string, T[keyof T]>

export interface DefaultSelectOption {
  value: number | string
  label: string | ReactNode
}

type MappedObject<T extends ArrayElementConstraints<T>> = {
  [Property in keyof T]: T[Property]
}

export type SelectOption<
  T extends ArrayElementConstraints<T> = Record<string, any>
> = DefaultSelectOption & MappedObject<T>

export interface SelectDataFormatterOptions<
  T extends ArrayElementConstraints<T>
> {
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

export interface SelectProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onChange'> {
  options: SelectOption[]
  className?: string
  onChange?: (option: SelectOption) => void
  autoFocus?: boolean
  disabled?: boolean
  loading?: boolean
  value?: SelectOption['value']
  placeholder?: string
  status?: 'error'
  required?: boolean
  /** максимальное количество отображаемых элементов, после которого начинается скролл */
  maxItemsCount?: number
}
