import { createContext, useContext } from 'react'
import { ExtendedRefs, useInteractions } from '@floating-ui/react'
import { IAutocompleteOption } from 'Components/Autocomplete/typings'

export interface IAutocompleteContext {
  handleButtonClick?: () => void
  handleOptionClick?: (value: IAutocompleteOption['value']) => void
  handleInputSubmit?: () => void
  buttonRef?: ExtendedRefs<HTMLButtonElement>['setReference']
  dropdownRef?: ExtendedRefs<HTMLDivElement>['setFloating']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  x?: number | null
  y?: number | null
  /** отображение дропдауна */
  open?: boolean
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
