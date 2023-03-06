import { FormEventHandler, forwardRef, ReactElement } from 'react'
import SearchInput, { SearchInputProps } from 'Components/Input/SearchInput'
import { useAutocompleteContext } from 'Components/Autocomplete/context'

export interface AutocompleteInputProps extends SearchInputProps {}

/** Поле ввода для фильтрации опций */
const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ onSubmit, ...props }, ref): ReactElement => {
    const context = useAutocompleteContext()

    const handleSubmit: FormEventHandler<HTMLInputElement> = (e): void => {
      context?.handleInputSubmit?.()
      onSubmit?.(e)
    }

    return <SearchInput onSubmit={handleSubmit} {...props} ref={ref} />
  }
)

AutocompleteInput.displayName = 'Autocomplete.Input'

export default AutocompleteInput
