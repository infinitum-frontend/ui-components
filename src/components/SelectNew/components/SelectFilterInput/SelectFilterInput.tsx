import { FormEventHandler, forwardRef, ReactElement } from 'react'
import SearchInput, {
  SearchInputProps
} from 'Components/Input/components/SearchInput'
import { useAutocompleteContext } from 'Components/Autocomplete/context'

export interface SelectFilterInputProps extends SearchInputProps {}

/** Поле ввода для фильтрации опций */
const SelectFilterInput = forwardRef<HTMLInputElement, SelectFilterInputProps>(
  ({ onSubmit, ...props }, ref): ReactElement => {
    const context = useAutocompleteContext()

    const handleSubmit: FormEventHandler<HTMLInputElement> = (e): void => {
      context?.handleInputSubmit?.()
      onSubmit?.(e)
    }

    return (
      <SearchInput
        onSubmit={handleSubmit}
        data-selector="inf-select-filter-input"
        autoComplete="off"
        {...props}
        ref={ref}
      />
    )
  }
)

SelectFilterInput.displayName = 'SelectFilterInput'

export default SelectFilterInput
