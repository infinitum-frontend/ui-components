import { createContext, useContext } from 'react'
import { ExtendedRefs, useInteractions } from '@floating-ui/react'
import { IAutocompleteOption } from 'Components/Autocomplete/types'

export interface IAutocompleteContext {
  handleButtonClick?: () => void
  handleOptionClick?: (value: IAutocompleteOption['value']) => void
  handleInputSubmit?: () => void
  disabled?: boolean
  required?: boolean
  buttonRef?: ExtendedRefs<HTMLButtonElement>['setReference']
  dropdownRef?: ExtendedRefs<HTMLDivElement>['setFloating']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  x?: number | null
  y?: number | null
  open?: boolean
  selectedValue?: IAutocompleteOption['value']
  // setActiveItem?: (value: IAutocompleteOption['value']) => void
  // activeItem?: IAutocompleteOption['value']
  // registerOption: (value: IAutocompleteOption['value']) => void
  // unregisterOption: (value: IAutocompleteOption['value']) => void
  // handleKeyDown?: KeyboardEventHandler
}

const AutocompleteContext = createContext<IAutocompleteContext | null>(null)

if (process.env.NODE_ENV !== 'production') {
  AutocompleteContext.displayName = 'AutocompleteContext'
}

export function useAutocompleteContext(): IAutocompleteContext | null {
  return useContext(AutocompleteContext)
}

export default AutocompleteContext
