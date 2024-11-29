import { ComponentPropsWithoutRef, ReactNode } from 'react'

type ArrayElementConstraints<T> = Record<string, T[keyof T]>

export interface DefaultSelectOption {
  value: number | string | undefined // Добавляем undefined как возможное значение
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
  array: T[]
  value: string
  label: string
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
  maxItemsCount?: number
  allowClear?: boolean
  onClear?: () => void
}
