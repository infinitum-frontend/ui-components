import { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface DefaultSelectOption {
  value: number | string
  label: string | ReactNode
}

type MappedObject<T> = {
  [Property in keyof T]: T[Property]
}

export type SelectOption<T = Record<string, any>> = DefaultSelectOption &
  MappedObject<T>

export interface SelectDataFormatterOptions<T extends Record<string, any>> {
  /**
   * Исходный массив, подлежащий форматированию
   */
  array: T[]
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться ключ для опции
   * Ключ должен являться уникальным значением
   */
  value: keyof T
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться текст для отображения опции
   */
  label: keyof T
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
