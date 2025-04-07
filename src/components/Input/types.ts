import {
  ChangeEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode
} from 'react'

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string
  defaultValue?: string
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
  /** Только чтение. Недоступно изменение значения поля */
  readOnly?: boolean
  /** Состояние (ошибка, предупреждение) */
  status?: 'error'
  /** Отсутствие границ */
  noBorder?: boolean
  /** костыль, чтобы инпут который используется в выпадающем списка Select не валидировался */
  disableFormContextValidation?: boolean
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
  /**
   * Наличие кнопки для сброса значения
   * @deprecated
   * */
  allowClear?: boolean | { icon: ReactNode }
  /** Отображение кнопки очистки выбранного значения. При нажатии на кнопку вызывается обработчик onClear, а если он не был передан, то onChange. */
  clearable?: boolean
  /** Обработчик нажатия на кнопку очистки значения, которая отображается при clearable. Можно определить в нём произвольную логику. Если его не передать, то будет вызван onChange */
  onClear?: () => void
  /**
   * Функция, применяющаяся для форматирования значения
   * @param value {string}
   * @return {string}
   */
  formatter?: (value: string) => string
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
  onChange?: (value: string, e?: ChangeEvent<HTMLInputElement>) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  /** Показываем кнопку с иконкой переключения видимости пароля */
  showPasswordToggle?: boolean
}
