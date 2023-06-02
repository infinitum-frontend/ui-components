// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  FormEventHandler,
  ReactElement,
  useRef
} from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import './AutocompleteButton.scss'
import SelectButton from 'Components/Select/components/SelectButton'
import cn from 'classnames'
import { useFormGroup } from 'Components/Form/context/group'

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
  const inputRef = useRef<HTMLInputElement>(null)
  const context = useAutocompleteContext()
  const formGroupContext = useFormGroup()

  const handleInvalid: FormEventHandler<HTMLInputElement> = () => {
    if (formGroupContext) {
      formGroupContext.setInvalid?.(true)
      inputRef.current?.setCustomValidity(formGroupContext.invalidMessage || '')
    }
  }

  return (
    <SelectButton
      tabIndex={-1}
      disabled={disabled || context?.disabled}
      onClick={context?.handleButtonClick}
      selected={context?.open || Boolean(children)}
      type={'button'}
      ref={context?.buttonRef}
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
