import { forwardRef, ReactElement } from 'react'
import SearchInput, { SearchInputProps } from 'Components/Input/SearchInput'
import { useAutocompleteContext } from 'Components/Autocomplete/context'

export interface AutocompleteInputProps extends SearchInputProps {}

const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ ...props }, ref): ReactElement => {
    const context = useAutocompleteContext()

    return (
      <SearchInput onSubmit={context?.handleInputSubmit} {...props} ref={ref} />
    )
  }
)

AutocompleteInput.displayName = 'Autocomplete.Input'

export default AutocompleteInput
