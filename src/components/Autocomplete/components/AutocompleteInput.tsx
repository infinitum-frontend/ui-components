import { useAutocompleteContext } from 'Components/Autocomplete/context'
import SearchInput, {
  SearchInputProps
} from 'Components/Input/components/SearchInput'
import { FormEventHandler, forwardRef, ReactElement } from 'react'

export interface AutocompleteInputProps extends SearchInputProps {}

/** Поле ввода для фильтрации опций */
const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ onSubmit, ...props }, ref): ReactElement => {
    const context = useAutocompleteContext()

    const handleSubmit: FormEventHandler<HTMLInputElement> = (e): void => {
      context?.handleInputSubmit?.()
      onSubmit?.(e)
    }

    return (
      <SearchInput
        onSubmit={handleSubmit}
        data-selector="inf-autocomplete-input"
        autoComplete="off"
        disableFormContextValidation
        // {...props}
        ref={ref}
      />
    )
  }
)

AutocompleteInput.displayName = 'Autocomplete.Input'

export default AutocompleteInput
