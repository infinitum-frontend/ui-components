import React, {
  FocusEventHandler,
  ReactElement,
  ReactNode,
  useState,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
  useContext,
  ChangeEventHandler
} from 'react'
import classNames from 'classnames'
import './Input.scss'
import { InputProps } from './types'
import { ReactComponent as ClearIcon } from 'Icons/cancel-circle.svg'
// eslint-disable-next-line import/no-named-default
import BaseInput from 'Components/Input/components/BaseInput/BaseInput'
import { mergeRefs } from 'react-merge-refs'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import FormGroupContext from 'Components/Form/context/group'
import FormContext from 'Components/Form/context/form'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'

/** Компонент пользовательского ввода */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      style,
      defaultValue,
      value,
      formatter,
      size = 'medium',
      className = '',
      placeholder = 'Введите значение',
      borderRadius = 'regular',
      disabled: disabledProp = false,
      status,
      readOnly,
      onClear,
      onInput,
      onChange,
      onFocus,
      onSubmit,
      onBlur,
      prefix, // не покрыто тестами
      prefixClass = '', // не покрыто тестами
      onPrefixClick, // не покрыто тестами
      postfix,
      postfixClass = '',
      onPostfixClick, // не покрыто тестами
      allowClear = false,
      noBorder = false,
      id,
      required = false,
      'aria-required': ariaRequired,
      'aria-invalid': ariaInvalid,
      ...restProps
    },
    ref
  ): ReactElement => {
    const [inputValue, setInputValue] = useState(value ?? defaultValue ?? '')
    // обработка состояния
    const [isFocused, setFocus] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLSpanElement>(null)
    const mergedRef = mergeRefs([inputRef, ref])

    const formGroupContext = useContext(FormGroupContext)
    const formContext = useContext(FormContext)
    const { onControlInvalid, onControlChange } = useFormControlHandlers()
    const disabled = disabledProp || formContext?.disabled
    const hasError = status === 'error' || formGroupContext?.invalid

    // обработка событий
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      onControlChange(e)

      const formattedDomValue = getFormattedValue(e.target.value) || ''

      setInputValue(formattedDomValue)

      if (!onInput && !onChange) {
        return
      }

      onInput?.(formattedDomValue, e)
      onChange?.(formattedDomValue, e)
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
      onPrefixClick?.(getFormattedValue(value))
    }

    const handlePostfixClick: MouseEventHandler<HTMLSpanElement> = (e) => {
      e.stopPropagation()
      onPostfixClick?.(getFormattedValue(value))
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
        e.currentTarget?.blur()
        setFocus(false)
      }
    }

    const handleClear: MouseEventHandler<HTMLSpanElement> = (e) => {
      const inputEl = inputRef.current

      if (!inputEl) {
        return
      }

      inputEl.value = ''
      inputEl.focus() // TODO: можно реализовать через prevent blur на кнопке очистки

      const syntheticEvent = Object.create(e)
      syntheticEvent.target = inputEl
      syntheticEvent.currentTarget = inputEl

      handleChange(syntheticEvent)
    }

    const getFormattedValue: (val?: string) => string | undefined = (val) => {
      if (formatter !== undefined && val !== undefined) {
        return formatter(val)
      }

      return val
    }

    const getClassNames: () => string = () => {
      return classNames(
        'inf-input-wrapper',
        TextFieldClasses.size[size],
        TextFieldClasses.main,
        className,
        {
          'inf-input-wrapper--slot-before': prefix,
          'inf-input-wrapper--slot-after': postfix || allowClear,
          [TextFieldClasses.disabled]: disabled,
          [TextFieldClasses.readonly]: readOnly,
          [TextFieldClasses.focused]: isFocused,
          [TextFieldClasses.noBorder]: noBorder,
          [TextFieldClasses.filled]: inputRef.current?.value,
          [TextFieldClasses.borderRadius[borderRadius]]:
            borderRadius !== 'unset',
          [TextFieldClasses.status.error]: hasError
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
          <ClearIcon width={20} height={20} />
        )

      return (
        <span onClick={handleClear} className="inf-input-wrapper__clear-button">
          {iconNode}
        </span>
      )
    }

    const isRequired = required || formGroupContext?.required

    const controlledValue = defaultValue !== undefined ? undefined : inputValue

    const showClearButton = allowClear && !disabled && !readOnly && inputValue

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
          value={controlledValue}
          defaultValue={defaultValue}
          placeholder={isFocused ? '' : placeholder}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          id={id || formGroupContext?.id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onInvalid={onControlInvalid}
          required={isRequired}
          ref={mergedRef}
          aria-invalid={formGroupContext?.invalid || ariaInvalid}
          aria-required={formGroupContext?.required || ariaRequired}
          {...restProps}
        />

        {showClearButton && getClearIcon()}
        {postfix && (
          <span
            onClick={handlePostfixClick}
            className={classNames('inf-input-wrapper__postfix', postfixClass)}
          >
            {postfix}
          </span>
        )}
      </span>
    )
  }
)

Input.displayName = 'Input'

export default Input
