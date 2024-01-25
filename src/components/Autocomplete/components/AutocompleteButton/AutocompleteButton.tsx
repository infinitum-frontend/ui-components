// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ReactElement,
  RefObject,
  useContext,
  useEffect,
  useState
} from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import './AutocompleteButton.scss'
import SelectButton from 'Components/Select/components/SelectButton'
import cn from 'classnames'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'

export interface AutocompleteButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  /** Плейсхолдер, отображаемый в случае, когда не передан слот */
  placeholder?: string
  forwardedInputRef?: RefObject<HTMLInputElement>
}

/** Компонент кнопки-триггера для вызова выпадающего списка */
const AutocompleteButton = ({
  placeholder = 'Не указано',
  disabled,
  className,
  children,
  forwardedInputRef,
  ...props
}: AutocompleteButtonProps): ReactElement => {
  const [isFocused, setFocused] = useState(false)
  const context = useAutocompleteContext()
  const formGroupContext = useContext(FormGroupContext)
  const selectedValue = Array.isArray(context?.selectedValue)
    ? context?.selectedValue[0]
    : context?.selectedValue ?? ''

  const { onControlInvalid } = useFormControlHandlers()

  useEffect(() => {
    if (!context?.open) {
      setFocused(false)
    }
  }, [context?.open])

  const handleFocus: FocusEventHandler = (e) => {
    e.preventDefault()
    setFocused(true)
  }

  const handleBlur: FocusEventHandler = (e) => {
    if (
      e.relatedTarget?.getAttribute('data-selector') ===
      'inf-autocomplete-input'
    ) {
      return
    }

    setFocused(false)
  }

  return (
    <SelectButton
      tabIndex={-1}
      disabled={disabled || context?.disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={context?.handleButtonClick}
      selected={context?.open || Boolean(children)}
      type={'button'}
      ref={context?.buttonRef}
      focused={isFocused}
      className={cn(className, 'inf-autocomplete-button')}
      {...context?.getReferenceProps()}
      {...props}
    >
      {children || placeholder}
      <input
        ref={forwardedInputRef}
        value={selectedValue}
        onChange={() => null}
        type="text"
        required={context?.required || formGroupContext?.required}
        aria-required={context?.required || formGroupContext?.required}
        aria-invalid={formGroupContext?.invalid || undefined}
        id={formGroupContext?.id}
        onInvalid={onControlInvalid}
      />
    </SelectButton>
  )
}

export default AutocompleteButton
