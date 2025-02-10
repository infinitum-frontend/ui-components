import { ReactElement, useEffect, useState } from 'react'
import { SelectProps } from './utils/types'
import useSelect from './hooks/useSelect'
import useSelectOptions from './hooks/useSelectOptions'
import SelectButton from './components/SelectButton'
import SelectOptions from './components/SelectOptions'
import { Popover } from '../Popover'

const SelectNew = <Multiple extends boolean = false>({
  options: optionsProp,
  value,
  onChange,
  multiple,
  filterable,
  clearable,
  disabled,
  loading,
  placeholder,
  size,
  loadOptions,
  onClear
}: SelectProps<Multiple>): ReactElement => {
  const [filterValue] = useState('')
  const [options, setOptions] = useState(optionsProp ? [...optionsProp] : [])
  const [isLoadingOptions, setLoadingOptions] = useState(false)

  useEffect(() => {
    if (loadOptions) {
      const fetchOptions = async (): Promise<void> => {
        setLoadingOptions(true)
        const loadedOptions = await loadOptions(filterValue)
        setOptions(loadedOptions)
        setLoadingOptions(false)
      }

      void fetchOptions()
    }
  }, [filterValue])

  const { filteredFlattenOptions, flattenOptions } = useSelectOptions({
    options,
    filterValue,
    filterable
  })

  const {
    handleSelect,
    handleClear,
    checkOptionSelection,
    hasSelectedValue,
    isOpen,
    setOpen,
    displayValue,
    selectedOptions
  } = useSelect({
    options: flattenOptions,
    value,
    onChange,
    multiple,
    onClear
  })

  const handlePopoverPressOutside = (e: MouseEvent): any => {
    // TODO:
    // if (formGroupContext) {
    //   return (
    //     (e.target as HTMLLabelElement)?.htmlFor !== formGroupContext?.id
    //   )
    // } else {
    //   return true
    // }
  }

  // TODO: data-selector={SELECT_DROPDOWN_SELECTOR}

  // TODO:
  // {...getFloatingProps({
  //   onClick(e) {
  //     e.stopPropagation()
  //   }
  // })}

  // TODO:
  // {...getReferenceProps({
  //   onKeyDown: handleKeyDown,
  //   onClick(e) {
  //     e.stopPropagation()
  //     handleClick(e)
  //   }
  // })}

  // TODO: Popover width / height
  // style={{
  //   position: 'absolute',
  //   maxHeight: `${maxHeight}px`,
  //   top: y ?? 0,
  //   left: x ?? 0
  // }}

  const isLoading = loading || isLoadingOptions

  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
      onPressOutside={handlePopoverPressOutside}
    >
      <Popover.Trigger>
        <SelectButton
          clearable={Boolean(clearable && hasSelectedValue)}
          selectedOptionsCount={selectedOptions.length}
          onClear={handleClear}
          disabled={Boolean(disabled)}
          loading={isLoading}
          placeholder={placeholder}
          size={size}
          multiple={Boolean(multiple)}
          onClick={() => {
            setOpen(!isOpen) // TODO: нужен ли здесь setState(v => !v)
          }}
        >
          {displayValue}
        </SelectButton>
      </Popover.Trigger>

      <Popover.Content hasPadding={false} equalTriggerWidth>
        <SelectOptions
          options={filteredFlattenOptions}
          onSelect={handleSelect}
          checkOptionSelection={checkOptionSelection}
          multiple={multiple}
        />
      </Popover.Content>
    </Popover>
  )
}

export default SelectNew

// TODO:
// Generic для SelectValue: string / number / еще что-то?
// null если SelectValue отсутствует?
// обработка пустых значений в компоненте потребителе при очистке значения по кнопке. onChange вернет null / пустой массив?
// Лейблы групп портфелей сделать disabled? как в gravity ui
// если filterable и не multiselect, то как работать с инпутом, если в нем будет лейбл выбранного значения?
// изначальная загрузка асинхронная с бэка, но фильтрация на стороне клиента. Просто loading = true и передать options после загрузки?
// синк выбранных значений и опций, если вдруг выбранных опций уже нет в options (см как решели в Hse Design system)
// debounce при асинхронной фильтрации на стороне потребителя?
// cacheOptions: boolean
// прокидывание функции для кастомной логики фильтрации? (option: any, inputValue: string) => boolean
// управлени клавиатурой
// виртуализация
// нативная валидация и нативный селект
// onChange добавить второй аргумент возврата для value
// defaultSelectItem
