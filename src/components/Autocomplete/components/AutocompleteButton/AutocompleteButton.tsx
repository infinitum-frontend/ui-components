// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  FormEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import './AutocompleteButton.scss'
import SelectButton from 'Components/Select/components/SelectButton'
import cn from 'classnames'
import FormGroupContext from 'Components/Form/context/group'

export interface AutocompleteButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  /** Плейсхолдер, отображаемый в случае, когда не передан слот */
  placeholder?: string
}

/** Компонент кнопки-триггера для вызова выпадающего списка */
const AutocompleteButton = ({
  placeholder = 'Не указано',
  disabled,
  className,
  children,
  ...props
}: AutocompleteButtonProps): ReactElement => {
  const [isFocused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const context = useAutocompleteContext()
  const formGroupContext = useContext(FormGroupContext)

  useEffect(() => {
    if (!context?.open) {
      setFocused(false)
    }
  }, [context?.open])

  const handleInvalid: FormEventHandler<HTMLInputElement> = () => {
    if (formGroupContext) {
      formGroupContext.setInvalid?.(true)
      inputRef.current?.setCustomValidity(
        formGroupContext.customValidationMessage || ''
      )
    }
  }

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
      onClick={context?.handleButtonClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
        value={context?.selectedValue}
        onChange={() => null}
        type="text"
        required={context?.required || formGroupContext?.required}
        aria-required={context?.required || formGroupContext?.required}
        aria-invalid={formGroupContext?.invalid || undefined}
        id={formGroupContext?.id}
        onInvalid={handleInvalid}
      />
    </SelectButton>
  )
}

export default AutocompleteButton
