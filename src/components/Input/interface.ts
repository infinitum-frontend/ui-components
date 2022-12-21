import {FocusEventHandler, ForwardedRef, InputHTMLAttributes, ReactNode, Ref} from 'react'

// перезаписываем некоторые HTML аттрибуты, для своих реализаций
export interface InfInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'onInput'> {
  value?: string
  /**
   * Функция, применяющаяся для форматирования значения
   * @param value {string}
   * @return {string}
   */
  formatter?: (value: string) => string
  /** Кастомный css-класс */
  className?: string
  /** placeholder */
  placeholder?: string
  /**
   * Размер скруглений
   * @default unset
   */
  borderRadius?: 'unset' | 'regular' | 'medium'
  /** Состояние недоступности */
  disabled?: boolean
  /** Состояние (ошибка, предупреждение) */
  status?: 'error' | 'warning'
  /** Элемент префикс */
  prefix?: ReactNode
  /** Кастомный класс префикса */
  prefixClass?: string
  /** Элемент постфикс */
  postfix?: ReactNode
  /** Кастомный класс постфикса */
  postfixClass?: 'string'
  /** Наличие кнопки для сброса значения */
  allowClear?: boolean | { icon: ReactNode }
  /** Наличие границ */
  noBorder?: boolean
  /** Убрать границу снизу */
  collapseBottom?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
}

export interface InputRefHandler {
  focus: () => void
  blur: () => void
  input: HTMLInputElement | null
}
