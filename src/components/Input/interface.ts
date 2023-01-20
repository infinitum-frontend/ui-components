import {
  FocusEvent,
  MouseEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode
} from 'react'

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'onInput' | 'size' | 'onBlur'
  > {
  value?: string
  /**
   * Размер
   * @default medium
   */
  size?: 'medium'
  /**
   * Функция, применяющаяся для форматирования значения
   * @param value {string}
   * @return {string}
   */
  formatter?: (value?: string) => string
  /** Кастомный css-класс */
  className?: string
  /** placeholder */
  placeholder?: string
  /**
   * Размер скруглений
   * @default unset
   */
  borderRadius?: 'unset' | 'regular'
  /** Состояние недоступности */
  disabled?: boolean
  /** Состояние (ошибка, предупреждение) */
  status?: 'error'
  /** Элемент префикс */
  prefix?: ReactNode
  /** Кастомный класс префикса */
  prefixClass?: string
  /** Элемент постфикс */
  postfix?: ReactNode
  /** Кастомный класс постфикса */
  postfixClass?: string
  /** Наличие кнопки для сброса значения */
  allowClear?: boolean | { icon: ReactNode }
  /** Отсутствие границ */
  noBorder?: boolean
  /** Убрать границу снизу */
  collapseBottom?: boolean
  /**
   * Количество миллисекунд для отложенного вызова onInput
   * @type number
   */
  debounce?: number
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string) => void
  onBlur?: (
    e?: FocusEvent<HTMLInputElement> | MouseEvent<HTMLSpanElement>
  ) => void
}

export interface InputRefHandler {
  focus: () => void
  blur: () => void
  input: HTMLInputElement | null
}
