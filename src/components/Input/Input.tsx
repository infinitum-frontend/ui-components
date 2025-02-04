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
import { ReactComponent as OpenEyeIcon } from 'Icons/open-eye.svg'
import { ReactComponent as CloseEyeIcon } from 'Icons/hide-eye.svg'
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
      showPasswordToggle = false,
      'aria-required': ariaRequired,
      'aria-invalid': ariaInvalid,
      ...restProps
    },
    ref
  ): ReactElement => {
    // обработка состояния
    const [isFocused, setFocus] = useState(false)
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    let nativeType = restProps.type
    if (showPasswordToggle && restProps.type === 'password') {
      nativeType = isPasswordVisible ? 'text' : 'password'
    }

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

    const handleClear: () => void = () => {
      if (inputRef.current) {
        inputRef.current.value = ''
        inputRef.current.focus()
      }
      onClear?.()
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

    const controlledValue =
      defaultValue !== undefined ? undefined : getFormattedValue(value)

    // для controlled input показываем кнопка очистки только если поле не пустое, для uncontrolled нет возможности определить пустое ли поле
    const showClearButton =
      allowClear && value !== undefined ? controlledValue : true

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
          type={nativeType}
        />

        {showClearButton && getClearIcon()}
        {showPasswordToggle && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setPasswordVisible(!isPasswordVisible)
            }}
            className="inf-input-wrapper__visibility-button"
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={isPasswordVisible}
          >
            {nativeType !== 'password' ? (
              <CloseEyeIcon width={20} height={20} />
            ) : (
              <OpenEyeIcon width={20} height={20} />
            )}
          </button>
        )}
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
