import React, {
  FocusEventHandler,
  FormEventHandler,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useState,
  useRef,
  Ref,
  useCallback,
  MouseEventHandler,
  KeyboardEventHandler
} from 'react'
import classNames from 'classnames'
import './index.scss'
import { InputProps, InputRefHandler } from './interface'
import { ReactComponent as ClearIcon } from 'Icons/bx-x.svg'
// eslint-disable-next-line import/no-named-default
import debounceFn from 'lodash.debounce'
import BaseInput from 'Components/Input/components/BaseInput'

/**
 * Компонент поля ввода
 */
const Input = React.forwardRef<InputRefHandler, InputProps>(
  (
    {
      style,
      value,
      formatter,
      size = 'medium',
      className = '',
      placeholder = '',
      borderRadius = 'regular',
      disabled = false,
      status,
      onInput,
      onFocus,
      onSubmit,
      onBlur,
      prefix, // не покрыто тестами
      prefixClass = '', // не покрыто тестами
      onPrefixClick, // не покрыто тестами
      allowClear = false,
      noBorder = false,
      debounce = 0, // не покрыто тестами
      ...restProps
    }: InputProps,
    ref: Ref<InputRefHandler>
  ): ReactElement => {
    // обработка состояния
    const [isFocused, setFocus] = useState(false)
    const [localValue, setLocalValue] = useState(
      debounce && !value ? '' : value
    )

    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLSpanElement>(null)

    useImperativeHandle(ref, () => ({
      input: inputRef.current,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur()
    }))

    const debouncedInput = useCallback(
      debounceFn((val, e) => {
        if (onInput) {
          onInput(val, e)
        }
      }, debounce),
      [debounce]
    )

    // обработка событий
    const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
      if (onInput !== undefined) {
        const target = e.target as HTMLInputElement
        // обновляем локальное значение только когда есть дебаунс, чтобы не вызывать лишние ререндеры
        if (debounce) {
          setLocalValue(getFormattedValue(target.value))
          debouncedInput(getFormattedValue(target.value), e)
        } else {
          onInput(getFormattedValue(target.value) || '', e)
        }
      }
    }

    const handleWrapperClick: MouseEventHandler<HTMLSpanElement> = (
      e
    ): void => {
      if (wrapperRef.current?.contains(e.target as HTMLElement)) {
        inputRef.current?.focus()
      }
    }

    const handlePrefixClick: MouseEventHandler<HTMLSpanElement> = (e) => {
      e.stopPropagation()
      onPrefixClick?.(getFormattedValue(composedValue))
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocus(true)
      onFocus?.(e)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocus(false)
      onBlur?.(e)
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter' && onSubmit) {
        onSubmit(e)
      }
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

    const getFormattedValue: (val?: string) => string | undefined = (val) => {
      if (formatter !== undefined) {
        return formatter(val)
      }

      return val
    }

    const getClassNames: () => string = () => {
      return classNames(
        'inf-input-wrapper',
        `inf-input-wrapper--size-${size}`,
        className,
        {
          'inf-input-wrapper--disabled': disabled,
          'inf-input-wrapper--focused': isFocused,
          'inf-input-wrapper--no-border': noBorder,
          [`inf-input-wrapper--br-${borderRadius}`]: borderRadius !== 'unset',
          [`inf-input-wrapper--status-${status as string}`]: status
        }
      )
    }

    const getClearIcon: () => ReactNode = () => {
      if (!allowClear) {
        return null
      }

      const iconNode =
        typeof allowClear === 'object' && allowClear.icon ? (
          allowClear.icon
        ) : (
          <ClearIcon />
        )

      return (
        <span
          onClick={handleClear}
          className={classNames('inf-input-wrapper__clear-button', {
            'inf-input-wrapper__clear-button--hidden': !composedValue
          })}
        >
          {iconNode}
        </span>
      )
    }

    const isBaseInput = !prefix && !allowClear

    if (isBaseInput) {
      return (
        <BaseInput
          value={getFormattedValue(composedValue)}
          style={style}
          className={className}
          placeholder={isFocused ? '' : placeholder}
          disabled={disabled}
          size={size}
          noBorder={noBorder}
          borderRadius={borderRadius}
          status={status}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          {...restProps}
          ref={inputRef}
        />
      )
    }

    return (
      <span
        style={style}
        className={getClassNames()}
        ref={wrapperRef}
        onClick={handleWrapperClick}
      >
        {prefix && (
          <span
            onClick={handlePrefixClick}
            className={classNames('inf-input-wrapper__prefix', prefixClass)}
          >
            {prefix}
          </span>
        )}

        <BaseInput
          value={getFormattedValue(composedValue)}
          placeholder={isFocused ? '' : placeholder}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          {...restProps}
          ref={inputRef}
        />

        {allowClear && getClearIcon()}
      </span>
    )
  }
)

Input.displayName = 'Input'

export default Input
