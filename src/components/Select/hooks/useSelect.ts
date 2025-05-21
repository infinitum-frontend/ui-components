import { SelectOption, UseSelectProps, UseSelectResult } from '../utils/types'

// TODO: поправить типы, убрать @ts-expect-error

const useSelect = <Multiple extends boolean = false>({
  value,
  onChange,
  options: optionsProp,
  multiple,
  onClear
}: UseSelectProps<Multiple>): UseSelectResult => {
  // TODO: options вытащить из групп (хук useSelectOptions)?
  const options = optionsProp

  const handleSelect = (option: SelectOption): void => {
    if (multiple) {
      handleMultipleSelection(option)
    } else {
      handleSingleSelection(option)
    }
  }

  const handleMultipleSelection = (option: SelectOption): void => {
    // @ts-expect-error
    const alreadySelected = value.includes(option.value) // TODO: типизация value и onChange - дженерик не подхватывается
    // @ts-expect-error
    const selectedOptions = options.filter((o) => value.includes(o.value))

    const newSelectedOptions = alreadySelected
      ? // @ts-expect-error
        selectedOptions.filter((o) => o.value !== option.value)
      : [...selectedOptions, option]

    // @ts-expect-error
    onChange(newSelectedOptions)
  }

  const handleSingleSelection = (option: SelectOption): void => {
    if (value !== option.value) {
      // @ts-expect-error
      onChange(option)
    }

    // toggleOpen(false);
  }

  const handleClear = (): void => {
    // TODO: onClear prop
    if (onClear) {
      onClear()
    } else {
      const newValue = multiple ? [] : undefined
      // @ts-expect-error
      onChange(newValue)
    }
  }

  const checkOptionSelection = (option: SelectOption): boolean => {
    if (multiple) {
      // @ts-expect-error
      return value.includes(option.value)
    } else {
      return value === option.value
    }
  }

  const hasSelectedValue = multiple
    ? // @ts-expect-error
      value.length > 0
    : Boolean(value) || Number.isInteger(value)

  // @ts-expect-error
  const selectedOptions: SelectOption[] = options.filter((option) => {
    if (multiple) {
      // @ts-expect-error
      return value.includes(option.value)
    } else {
      // @ts-expect-error
      return option.value === value
    }
  })

  // let displayValue = defaultSelectItem.label
  let displayValue = ''
  if (!multiple && hasSelectedValue) {
    displayValue = selectedOptions[0]?.label
  }

  // TODO: useMemo?
  return {
    handleSelect,
    handleClear,
    checkOptionSelection,
    hasSelectedValue,
    selectedOptions,
    displayValue
  }
}

export default useSelect
