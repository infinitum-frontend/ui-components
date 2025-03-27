import { InputProps } from 'Components/Input'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { PopoverContentProps } from '../../Popover'

export interface SelectProps<Multiple extends boolean = false>
  extends Omit<
    ComponentPropsWithoutRef<'button'>,
    'value' | 'prefix' | 'onChange'
  > {
  /** Активация множественного выбора */
  multiple?: Multiple
  /** Список опций. Может быть сгруппирован */
  options?: SelectOptions
  /** Controlled value */
  value: Multiple extends true ? SelectValue[] : SelectValue | undefined
  /** Controlled onChange */
  onChange: (
    value: Multiple extends true ? SelectOption[] : SelectOption
  ) => void
  /** Callback на нажатие кнопки очистки выбранного значения. Если true, то при клике на кнопку не будет вызываться onChange с пустым значение, ожидается что обновления стейта будет произведено в этом callback */
  onClear?: () => void
  /** Callback на изменение значения поля фильтрации. Если true, то дефолтная фильтрация не используется, ожидается, что снаружи будет передан отфильтрованный options */
  onFilterChange?: (filterValue: string) => void
  /** Активация элементов фильтрации опций */
  filterable?: boolean
  /** Активация кнопки очистки выбранного значения */
  clearable?: boolean
  /** Состояние недоступности */
  disabled?: boolean
  /** Обязательно к заполнению */
  required?: boolean
  /** Состояние загрузки */
  loading?: boolean
  /** Placeholder, если нет выбранного значения */
  placeholder?: string
  /** Размер SelectButton */
  size?: InputProps['size']
  /** Слот для размещения элемента (иконки) слева */
  prefix?: ReactNode
  /** Ширина всплывающего окна */
  popoverWidth?: PopoverContentProps['width']
  /** Использование кастомного шаблона SelectButton */
  renderControl?: (props: {
    displayValue: string
    isOpen: boolean
    disabled: boolean
    required: boolean
    ref: React.ForwardedRef<HTMLButtonElement>
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  }) => React.ReactElement
  /** Поле фильтрации может быть расположено в SelectButton или во всплывающем окне */
  filterPlacement?: 'inline' | 'dropdown'
  /** Дополнительный className */
  className?: string
  /** Максимальное количество отображаемых элементов, после которого начинается скролл */
  maxItemsCount?: number
  /** Текст сообщения, если нет опций */
  emptyMessage?: string
  /** Текст подсказки во всплывающем окне */
  dropdownHint?: string
  // TBD
  // selectedFirst?: boolean
  // loadOptions?: (filterValue?: string) => Promise<SelectOptions>
  // cacheOptions?: boolean
  // filterOptions?: (options: SelectOptions) => SelectOptions
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
