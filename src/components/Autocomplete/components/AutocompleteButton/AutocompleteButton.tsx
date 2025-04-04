// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cn from 'classnames'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import SelectButton from 'Components/SelectOld/components/SelectButton'
import {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useState
} from 'react'
import './AutocompleteButton.scss'

export interface AutocompleteButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  /** Плейсхолдер, отображаемый в случае, когда не передан слот */
  placeholder?: string
  forwardedInputRef?: RefObject<HTMLInputElement>
  before?: ReactNode
}

/** Компонент кнопки-триггера для вызова выпадающего списка */
const AutocompleteButton = ({
  placeholder = '',
  disabled,
  className,
  children,
  before,
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
      opened={context?.open}
      isPlaceholder={!children || children === placeholder}
      className={cn(className, 'inf-autocomplete-button')}
      {...context?.getReferenceProps()}
      {...props}
    >
      {before}
      {children || placeholder}
      <input
        ref={forwardedInputRef}
        value={selectedValue}
        onChange={() => null}
        type="text"
        required={context?.required || formGroupContext?.required}
        aria-required={context?.required || formGroupContext?.required}
        aria-invalid={formGroupContext?.invalid || undefined}
        autoComplete="off"
        id={formGroupContext?.id}
        onInvalid={onControlInvalid}
      />
    </SelectButton>
  )
}

export default AutocompleteButton
