import {
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
  /** Нужно ли добавлять инпуту обертку
   * Компонент Input рендерит разный контент в зависимости от того, передан ли ему prefix || postfix || allowClear.
   * В случае, если один из данных пропов передан, рендерится дополнительная обертка.
   * Если мы хотим динамически изменять какой-то проп, например, prefix(хотим отображать сколько символов введено),
   * то в таком случае у нас при печетании первого символа отрендерится другой инпут, и слетит фокус.
   */
  includeWrapper?: boolean
  /**
   * Функция, применяющаяся для форматирования значения
   * @param value {string}
   * @return {string}
   */
  formatter?: (value: string) => string
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string, e?: FormEvent<HTMLInputElement>) => void
  onChange?: (value: string, e?: FormEvent<HTMLInputElement>) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
}
