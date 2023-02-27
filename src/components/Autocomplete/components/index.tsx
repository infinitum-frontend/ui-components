import {
  ComponentPropsWithoutRef,
  ReactElement,
  useEffect,
  useState
} from 'react'
import AutocompleteButton from 'Components/Autocomplete/components/button'
import AutocompleteContext, {
  IAutocompleteContext
} from 'Components/Autocomplete/context'
import {
  autoUpdate,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import AutocompleteDropdown from 'Components/Autocomplete/components/dropdown'
import AutocompleteInput from 'Components/Autocomplete/components/input'
import AutocompleteOption from 'Components/Autocomplete/components/option'
import AutocompleteOptions from 'Components/Autocomplete/components/options'
import { IAutocompleteOption } from 'Components/Autocomplete/typings'

export interface AutocompleteProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  opened?: boolean
  onOpenChange?: (value: boolean) => void
  onChange?: (value: IAutocompleteOption['value']) => void
  options?: IAutocompleteOption[]
  selectedValue?: IAutocompleteOption['value']
  placeholder?: string
  filterFn?: (option: IAutocompleteOption) => boolean
}

// const getIndexByValue = (value: IAutocompleteOption['value'], options: Array<IAutocompleteOption['value']>): number => {
//   return options.findIndex(option => option === value)
// }

const Autocomplete = ({
  options = [],
  opened = false,
  onChange,
  placeholder = 'Выберите',
  selectedValue,
  filterFn,
  onOpenChange,
  children
}: AutocompleteProps): ReactElement => {
  // ==================== state ====================
  const [open, setOpen] = useState<boolean>(opened)
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState(options || [])
  // const [internalOptions, setInternalOptions] = useState<Array<IAutocompleteOption['value']>>([])
  // const [activeItem, setActiveItem] = useState<IAutocompleteOption['value']>(0)

  useEffect(() => {
    setOpen(opened)
  }, [opened])

  // ==================== handlers ====================
  const handleButtonClick = (): void => {
    setOpen((prev) => !prev)
    setQuery('')
    setFilteredOptions(options)
    onOpenChange?.(!open)
  }

  const handleInput = (value: string): void => {
    setQuery(value)
    setFilteredOptions(
      options?.filter((option) => {
        if (filterFn) {
          return filterFn(option)
        }

        return option.label.toLowerCase().match(value.toLowerCase())
      })
    )
  }

  const handleInputSubmit = (): void => {
    if (filteredOptions.length) {
      onChange?.(filteredOptions[0].value)
      setOpen(false)
      setQuery('')
    }
  }

  const handleOptionClick = (value: IAutocompleteOption['value']): void => {
    setOpen(false)
    onChange?.(value)
  }

  // TODO: работа с KeyDown
  // const handleKeyDown: KeyboardEventHandler = (e) => {
  //   const currentIndex = getIndexByValue(activeItem, internalOptions)
  //   e.preventDefault()
  //   e.stopPropagation()
  //
  //   switch (e.key) {
  //     case 'ArrowUp':
  //       if ( currentIndex === 0) {
  //         setActiveItem(internalOptions.length - 1)
  //       } else {
  //         setActiveItem(currentIndex - 1)
  //       }
  //       break
  //     case 'ArrowDown':
  //       if (currentIndex === internalOptions.length - 1 ) {
  //         setActiveItem(0)
  //       } else {
  //         setActiveItem(currentIndex + 1)
  //       }
  //   }
  // }

  // ==================== floating ====================
  const { x, y, refs, context } = useFloating({
    open,
    onOpenChange: handleButtonClick,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(2),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`
          })
        }
      })
    ]
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context)
  ])

  // ==================== context ====================
  const autocompleteContext: IAutocompleteContext = {
    handleButtonClick,
    handleOptionClick,
    handleInputSubmit,
    buttonRef: refs.setReference,
    getReferenceProps,
    dropdownRef: refs.setFloating,
    getFloatingProps,
    // activeItem,
    // setActiveItem,
    x,
    y,
    open
  }

  // ==================== render ====================
  if (!children) {
    return (
      <AutocompleteContext.Provider value={autocompleteContext}>
        <div>
          <AutocompleteButton
            onClick={handleButtonClick}
            placeholder={placeholder}
          >
            {options?.find((option) => option.value === selectedValue)?.label}
          </AutocompleteButton>
          <AutocompleteDropdown>
            <AutocompleteInput
              onInput={handleInput}
              value={query}
              allowClear={true}
            />
            <AutocompleteOptions>
              {filteredOptions?.map((option) => (
                <AutocompleteOption value={option.value} key={option.value}>
                  {option.label}
                </AutocompleteOption>
              ))}
            </AutocompleteOptions>
          </AutocompleteDropdown>
        </div>
      </AutocompleteContext.Provider>
    )
  }

  return (
    <AutocompleteContext.Provider value={autocompleteContext}>
      <div>{children}</div>
    </AutocompleteContext.Provider>
  )
}

export default Object.assign(Autocomplete, {
  Button: AutocompleteButton,
  Dropdown: AutocompleteDropdown,
  Input: AutocompleteInput
})
