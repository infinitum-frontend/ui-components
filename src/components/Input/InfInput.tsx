import React, {
  FocusEventHandler,
  FormEventHandler,
  ForwardedRef, InputHTMLAttributes,
  ReactElement, ReactNode, useState
} from 'react'
import classNames from 'classnames'
import './index.scss'

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
  onFocus?: FocusEventHandler<HTMLInputElement>
  onInput?: (value: string) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const InfInput = React.forwardRef<HTMLInputElement, InfInputProps>(({
  value = '',
  formatter,
  className = '',
  placeholder = '',
  borderRadius = 'unset',
  disabled = false,
  status,
  onInput,
  onFocus,
  onBlur,
  prefix,
  ...restProps
}: InfInputProps, ref: ForwardedRef<HTMLInputElement>): ReactElement => {
  // обработка состояния
  const [isFocused, setFocus] = useState(false)

  // обработка событий
  const handleInput: FormEventHandler = (e) => {
    if (onInput !== undefined) {
      const target = e.target as HTMLInputElement
      onInput(target.value)
    }
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(!isFocused)
    onFocus?.(e)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(false)
    onBlur?.(e)
  }

  // хелперы
  const getFormattedValue: () => string = () => {
    if (formatter !== undefined) {
      return formatter(value)
    }

    return value
  }

  const getClassNames: () => string = () => {
    return classNames(
      'inf-input',
      className,
      {
        'inf-input--disabled': disabled,
        'inf-input--focused': isFocused,
        [`inf-input--br-${borderRadius}`]: borderRadius !== 'unset',
        [`inf-input--status-${status as string}`]: status
      }
    )
  }

  return (
    <span className={getClassNames()}>
      { prefix && <span className={'inf-input__prefix'}>{prefix}</span> }
      <input className={'inf-input__input'}
             value={getFormattedValue()}
             placeholder={placeholder}
             disabled={disabled}
             onFocus={handleFocus}
             onBlur={handleBlur}
             onInput={handleInput}
             {...restProps}
             ref={ref} />
    </span>
  )
})

InfInput.displayName = 'InfInput'

export default InfInput
