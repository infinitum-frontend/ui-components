import {
  FocusEvent,
  MouseEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
  FormEvent
} from 'react'

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string
  /**
   * Размер
   * @default medium
   */
  size?: 'medium'
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
  extends Omit<BaseInputProps, 'prefix' | 'onBlur' | 'onInput'> {
  /**
   * Количество миллисекунд для отложенного вызова onInput
   * @type number
   */
  debounce?: number
  /** Элемент префикс */
  prefix?: ReactNode
  /** Кастомный класс префикса */
  prefixClass?: string
  /** Обработчик клика на префикс */
  onPrefixClick?: (value?: string) => void
  /** Наличие кнопки для сброса значения */
  allowClear?: boolean | { icon: ReactNode }
  /**
   * Функция, применяющаяся для форматирования значения
   * @param value {string}
   * @return {string}
   */
  formatter?: (value?: string) => string | undefined
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string, e?: FormEvent<HTMLInputElement>) => void
  onBlur?: (
    e?: FocusEvent<HTMLInputElement> | MouseEvent<HTMLSpanElement>
  ) => void
}
