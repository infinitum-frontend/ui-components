import React, {
  FocusEventHandler,
  FormEventHandler,
  ReactElement, ReactNode, useImperativeHandle, useState, useRef, Ref, useCallback, MouseEventHandler
} from 'react'
import classNames from 'classnames'
import './index.scss'
import { InfInputProps, InputRefHandler } from './interface'
import { TestSelectors } from '../../../test/selectors'
// eslint-disable-next-line import/no-named-default
import { default as debounceFn } from 'lodash.debounce'

/**
 * Компонент поля ввода
 */
const InfInput = React.forwardRef<InputRefHandler, InfInputProps>(({
  style,
  value = '',
  formatter,
  size = 'medium',
  className = '',
  placeholder = '',
  borderRadius = 'unset',
  disabled = false,
  status,
  onInput,
  onFocus,
  onBlur,
  prefix,
  prefixClass = '',
  postfix,
  postfixClass = '',
  allowClear = false,
  noBorder = false,
  collapseBottom = false,
  debounce = 0,
  ...restProps
}: InfInputProps, ref: Ref<InputRefHandler>): ReactElement => {
  // обработка состояния
  const [isFocused, setFocus] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useImperativeHandle(ref,
    () => ({
      input: inputRef.current,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur()
    })
  )

  const debouncedInput = useCallback(debounceFn((val) => {
    if (onInput) {
      onInput(val)
    }
  }, debounce), [debounce])

  // обработка событий
  const handleInput: FormEventHandler = (e) => {
    if (onInput !== undefined) {
      const target = e.target as HTMLInputElement
      // обновляем локальное значение только когда есть дебаунс, чтобы не вызывать лишние ререндеры
      if (debounce) {
        setLocalValue(target.value)
      }
      debouncedInput(target.value)
    }
  }

  const handleWrapperClick: MouseEventHandler<HTMLSpanElement> = (e): void => {
    if (wrapperRef.current?.contains(e.target as HTMLElement)) {
      inputRef.current?.focus()
    }
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(true)
    onFocus?.(e)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocus(false)
    onBlur?.(e)
  }

  const handleClear: () => void = () => {
    if (debounce) {
      setLocalValue('')
    }
    onInput?.('')
    inputRef.current?.focus()
  }

  // хелперы
  const composedValue = debounce ? localValue : value

  const getFormattedValue: () => string = () => {
    if (formatter !== undefined) {
      return formatter(composedValue)
    }

    return composedValue
  }

  const getClassNames: () => string = () => {
    return classNames(
      'inf-input',
      `inf-input--size-${size}`,
      className,
      {
        'inf-input--disabled': disabled,
        'inf-input--focused': isFocused,
        'inf-input--no-border': noBorder,
        'inf-input--collapse-bottom': collapseBottom,
        [`inf-input--br-${borderRadius}`]: borderRadius !== 'unset',
        [`inf-input--status-${status as string}`]: status
      }
    )
  }

  const getClearIcon: () => ReactNode = () => {
    if (!allowClear) {
      return null
    }

    const iconNode = typeof allowClear === 'object' && allowClear.icon
      ? allowClear.icon
      : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: 'currentColor' }}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 18L18 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round" />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round" />
        </svg>
        )

    return (
      <span
        onClick={handleClear}
        data-testid={TestSelectors.input.allowClear}
        className={classNames('inf-input__clear-button',
          {
            'inf-input__clear-button--hidden': !value
          })}>
        {iconNode}
      </span>
    )
  }

  return (
    <span
      style={style}
      className={getClassNames()}
      ref={wrapperRef}
      onClick={handleWrapperClick}
      data-testid={TestSelectors.input.wrapper}>

      {prefix && <span className={classNames('inf-input__prefix', prefixClass)} data-testid={TestSelectors.input.prefix}>{prefix}</span>}

      <input
        className={'inf-input__input'}
        data-testid={TestSelectors.input.inputEl}
        value={getFormattedValue()}
        placeholder={isFocused ? '' : placeholder}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        {...restProps}
        ref={inputRef} />

      {allowClear && getClearIcon()}
      {postfix && <span className={classNames('inf-input__postfix', postfixClass)} data-testid={TestSelectors.input.postfix}>{postfix}</span>}
    </span>
  )
})

InfInput.displayName = 'InfInput'

export default InfInput
