import {
  ChangeEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode
} from 'react'

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string
  /**
   * Размер
   * @default medium
   */
  size?: 'medium' | 'small'
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
  /** Отсутствие границ */
  noBorder?: boolean
}

export interface InputProps
  extends Omit<BaseInputProps, 'prefix' | 'onBlur' | 'onChange' | 'onInput'> {
  /** Элемент префикс */
  prefix?: ReactNode
  /** Кастомный класс префикса */
  prefixClass?: string
  /** Обработчик клика на префикс */
  onPrefixClick?: (value?: string) => void
  /** Элемент постфикса */
  postfix?: ReactNode
  /** Кастомный класс постфикса */
  postfixClass?: string
  /** Обработчик клика на префикс */
  onPostfixClick?: (value?: string) => void
  /** Наличие кнопки для сброса значения */
  allowClear?: boolean | { icon: ReactNode }
  onClear?: () => void
  /**
   * Функция, применяющаяся для форматирования значения
   * @param value {string}
   * @return {string}
   */
  formatter?: (value: string) => string
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
}
