// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  ReactElement,
  useEffect,
  useState
} from 'react'
import AutocompleteButton from 'Components/Autocomplete/components/AutocompleteButton'
import AutocompleteDropdown from 'Components/Autocomplete/components/AutocompleteDropdown'
import AutocompleteInput from 'Components/Autocomplete/components/AutocompleteInput'
import AutocompleteOption from 'Components/Autocomplete/components/AutocompleteOption'
import AutocompleteOptions from 'Components/Autocomplete/components/AutocompleteOptions'
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
import { IAutocompleteOption } from 'Components/Autocomplete/typings'

export interface AutocompleteProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Опции для отображения */
  options?: IAutocompleteOption[]
  /** Значение выбранной опции */
  selectedValue?: IAutocompleteOption['value']
  /** Событие изменения выбранной опции */
  onChange?: (value: IAutocompleteOption['value']) => void
  /** Плейсхолдер, отображаемый в случае, когда ни одно из значений не выбрано */
  buttonPlaceholder?: string
  /** Плейсхолдер, отображаемый в инпуте */
  inputPlaceholder?: string
  /** Функция для фильтрации опций. По умолчанию идет нечувствительная к регистру фильтрация по вхождению в строку */
  filterFn?: (option: IAutocompleteOption) => boolean
  /** Состояние отображения выпадающего контента. Только для контролируемого варианта */
  opened?: boolean
  /** Событие изменения состояния отображения выпадающего контента. Только для контролируемого варианта */
  onOpenChange?: (value: boolean) => void
}

// const getIndexByValue = (value: IAutocompleteOption['value'], options: Array<IAutocompleteOption['value']>): number => {
//   return options.findIndex(option => option === value)
// }

const Autocomplete = ({
  options = [],
  opened = false,
  onChange,
  buttonPlaceholder = 'Выберите',
  inputPlaceholder,
  selectedValue,
  filterFn,
  onOpenChange,
  children
}: AutocompleteProps): ReactElement => {
  // ==================== state ====================
  const [open, setOpen] = useState<boolean>(opened)
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState(options || [])

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
    x,
    y,
    open
  }

  // ==================== render ====================
  if (options?.length) {
    return (
      <AutocompleteContext.Provider value={autocompleteContext}>
        <div>
          <AutocompleteButton
            onClick={handleButtonClick}
            placeholder={buttonPlaceholder}
          >
            {options?.find((option) => option.value === selectedValue)?.label}
          </AutocompleteButton>
          <AutocompleteDropdown>
            <AutocompleteInput
              onInput={handleInput}
              placeholder={inputPlaceholder}
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
  Input: AutocompleteInput,
  Options: AutocompleteOptions,
  Option: AutocompleteOption
})
