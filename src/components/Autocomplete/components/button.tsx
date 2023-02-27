import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { useAutocompleteContext } from 'Components/Autocomplete/context'
import '../style/button.scss'
import SelectButton from 'Components/Select/components/button'

export interface AutocompleteButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  placeholder?: string
}

const AutocompleteButton = ({
  placeholder = 'Не указано',
  children,
  ...props
}: AutocompleteButtonProps): ReactElement => {
  const context = useAutocompleteContext()

  return (
    <SelectButton
      tabIndex={-1}
      onClick={context?.handleButtonClick}
      selected={context?.open || Boolean(children)}
      type={'button'}
      ref={context?.buttonRef}
      {...context?.getReferenceProps()}
      {...props}
    >
      {children || placeholder}
    </SelectButton>
  )
}

export default AutocompleteButton
