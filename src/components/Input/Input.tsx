import React, {
  FocusEventHandler,
  FormEventHandler,
  ReactElement,
  ReactNode,
  useState,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
  useContext
} from 'react'
import classNames from 'classnames'
import './Input.scss'
import { InputProps } from './types'
import { ReactComponent as ClearIcon } from 'Icons/cross.svg'
// eslint-disable-next-line import/no-named-default
import BaseInput from 'Components/Input/components/BaseInput/BaseInput'
import { mergeRefs } from 'react-merge-refs'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import FormGroupContext from 'Components/Form/context/group'
import FormContext from 'Components/Form/context/form'

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
    // обработка состояния
    const [isFocused, setFocus] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLSpanElement>(null)
    const mergedRef = mergeRefs([inputRef, ref])

    const formGroupContext = useContext(FormGroupContext)
    const formContext = useContext(FormContext)
    const disabled = disabledProp || formContext?.disabled

    // обработка событий
    const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
      if (formGroupContext) {
        const input = e.currentTarget
        input.setCustomValidity('')

        const isValid = input.validity.valid
        if (isValid) {
          formGroupContext.setInvalid?.(false)
        }
      }

      const domValue = (e.target as HTMLInputElement).value
      const formattedDomValue = getFormattedValue(domValue) || ''

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
      }
    }

    const handleClear: () => void = () => {
      if (inputRef.current) {
        inputRef.current.value = ''
        inputRef.current.focus()
      }
      onInput?.('')
      onChange?.('')
    }

    const handleInvalid: FormEventHandler<HTMLInputElement> = (e): void => {
      if (formGroupContext) {
        e.currentTarget.setCustomValidity(
          formGroupContext.customValidationMessage || ''
        )
        formGroupContext.setInvalid?.(true)
      }
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
          [TextFieldClasses.focused]: isFocused,
          [TextFieldClasses.noBorder]: noBorder,
          [TextFieldClasses.filled]: inputRef.current?.value,
          [TextFieldClasses.borderRadius[borderRadius]]:
            borderRadius !== 'unset',
          [TextFieldClasses.status[status as 'error']]: status
        }
      )
    }

    const getClearIcon: () => ReactNode = () => {
      if (!allowClear) {
        return null
      }

      const iconSize = size === 'medium' ? 24 : 20

      const iconNode =
        typeof allowClear === 'object' && allowClear.icon ? (
          allowClear.icon
        ) : (
          <ClearIcon width={iconSize} height={iconSize} />
        )

      return (
        <span onClick={handleClear} className="inf-input-wrapper__clear-button">
          {iconNode}
        </span>
      )
    }

    const isRequired = required || formGroupContext?.required

    const isBaseInput = !prefix && !allowClear && !postfix

    const controlledValue =
      defaultValue !== undefined ? undefined : getFormattedValue(value)

    if (isBaseInput) {
      return (
        <BaseInput
          value={controlledValue}
          defaultValue={defaultValue}
          style={style}
          className={className}
          placeholder={isFocused ? '' : placeholder}
          disabled={disabled}
          size={size}
          noBorder={noBorder}
          onInvalid={handleInvalid}
          borderRadius={borderRadius}
          status={status}
          id={id || formGroupContext?.id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          required={isRequired}
          aria-required={formGroupContext?.required || ariaRequired}
          aria-invalid={formGroupContext?.invalid || ariaInvalid}
          ref={mergedRef}
          {...restProps}
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
          value={controlledValue}
          defaultValue={defaultValue}
          placeholder={isFocused ? '' : placeholder}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          id={id || formGroupContext?.id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onInvalid={handleInvalid}
          required={isRequired}
          ref={mergedRef}
          aria-invalid={formGroupContext?.invalid || ariaInvalid}
          aria-required={formGroupContext?.required || ariaRequired}
          {...restProps}
        />

        {allowClear && getClearIcon()}
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
