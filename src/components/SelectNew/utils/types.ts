import { InputProps } from 'Components/Input'
import { CSSProperties, ReactNode } from 'react'
import { PopoverContentProps } from '../../Popover'

export interface SelectProps<Multiple extends boolean = false> {
  multiple?: Multiple
  options?: SelectOptions
  value: Multiple extends true ? SelectValue[] : SelectValue | undefined
  onChange: (
    value: Multiple extends true ? SelectOption[] : SelectOption
  ) => void
  onClear?: () => void
  onFilterChange?: (filterValue: string) => void
  loadOptions?: (filterValue?: string) => Promise<SelectOptions>
  filterable?: boolean
  clearable?: boolean
  disabled?: boolean
  required?: boolean
  loading?: boolean
  placeholder?: string
  size?: InputProps['size']
  prefix?: ReactNode
  popoverWidth?: PopoverContentProps['width']
  renderControl?: (props: {
    displayValue: string
    isOpen: boolean
    disabled: boolean
    required: boolean
    ref: React.ForwardedRef<HTMLButtonElement>
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  }) => React.ReactElement
  // TBD
  filterPlacement?: 'inline' | 'dropdown'
  cacheOptions?: boolean
  className?: string
  style?: CSSProperties | undefined
  filterOptions?: (options: SelectOptions) => SelectOptions
  /** Максимальное количество отображаемых элементов, после которого начинается скролл */
  maxItemsCount?: number
  emptyMessage?: string
}

export type SelectValue = string | number

export interface SelectOption {
  value: SelectValue
  label: string
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

export type SelectOptions = Array<SelectOption | SelectOptionGroup>

export interface GroupLabelItem {
  groupLabel: string
}
export type FlattenOption = SelectOption | GroupLabelItem

export interface UseSelectProps<Multiple extends boolean = false> {
  multiple?: Multiple
  value: Multiple extends true ? SelectValue[] : SelectValue | undefined
  onChange: (
    value: Multiple extends true ? SelectOption[] : SelectOption
  ) => void
  options: FlattenOption[]
  onClear?: SelectProps['onClear']
}

export interface UseSelectResult {
  selectedOptions: SelectOption[]
  handleSelect: (option: SelectOption) => void
  handleClear: () => void
  checkOptionSelection: (option: SelectOption) => boolean
  hasSelectedValue: boolean
  isOpen: boolean
  setOpen: (value: boolean) => void
  displayValue: string
}

export interface UseSelectOptionsProps {
  options: SelectOptions
  filterable: SelectProps['filterable']
  filterValue: string
  customFiltering: boolean
}

export interface UseSelectOptionsResult {
  filteredOptions: SelectOptions
  flattenOptions: FlattenOption[]
  filteredFlattenOptions: FlattenOption[]
}
