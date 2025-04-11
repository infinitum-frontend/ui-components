import { InputProps } from 'Components/Input'
import { PopoverContentProps, PopoverProps } from 'Components/Popover'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

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
  value?: Multiple extends true ? SelectValue[] : SelectValue | undefined
  /** Controlled onChange */
  onChange?: (
    value: Multiple extends true ? SelectOption[] : SelectOption
  ) => void
  /** Обработчик нажатия на кнопку очистки значения, которая отображается при clearable. Можно определить в нём произвольную логику. Если его не передать, то будет вызван onChange */
  onClear?: () => void
  /** Callback на изменение значения поля фильтрации. Если true, то дефолтная фильтрация не используется, ожидается, что снаружи будет передан отфильтрованный options */
  onFilterChange?: (filterValue: string) => void
  /** Отображение поля фильтрации опций */
  filterable?: boolean
  /** Отображение кнопки очистки выбранного значения. При нажатии на кнопку вызывается обработчик onClear, а если он не был передан, то onChange. */
  clearable?: boolean
  /** Состояние недоступности */
  disabled?: boolean
  /** Обязательно к заполнению */
  required?: boolean
  /** Состояние загрузки */
  loading?: boolean
  /** Loader может быть расположен в SelectButton или во всплывающем окне */
  loaderPlacement?: 'inline' | 'dropdown'
  /** Placeholder, если нет выбранного значения */
  placeholder?: string
  /** Размер SelectButton */
  size?: InputProps['size']
  /** Слот для размещения элемента (иконки) слева */
  prefix?: ReactNode
  /** Ширина всплывающего окна */
  popoverWidth?: PopoverContentProps['width']
  /** Расположение всплывающего окна относительно SelectButton */
  popoverPlacement?: PopoverProps['placement']
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
  /** Максимальное количество отображаемых элементов, после которого начинается скролл
   * @deprecated use maxHeight
   */
  maxItemsCount?: number
  /**
   * Максимальная высота контента, после которой начинается скролл
   */
  maxHeight?: number
  /** Виртуализация списка опций */
  virtualized?: boolean
  /** Текст сообщения, если нет опций */
  emptyMessage?: string
  /** Текст подсказки во всплывающем окне */
  dropdownHint?: string
  // ==================================== Нужны ли пропы ниже непонятно
  /** Состояние валидности */
  status?: 'error'
  // autoFocus?: boolean  /** Кеширование асинхронно загруженных опций */
  // cacheOptions?: boolean
  /** Показывать выбранные значения в начале списка */
  // selectedFirst?: boolean
  // loadOptions?: (filterValue?: string) => Promise<SelectOptions>
  // cacheOptions?: boolean
  // filterOptions?: (options: SelectOptions) => SelectOptions
}

export type SelectValue = string | number

export interface DefaultSelectOption {
  value: SelectValue
  label: string
}

type MappedObject<T> = {
  [Property in keyof T]: T[Property]
}

export type SelectOption<T = Record<string, any>> = DefaultSelectOption &
  MappedObject<T>

// export interface SelectOption {
//   value: SelectValue
//   label: string
// }

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
  value?: Multiple extends true ? SelectValue[] : SelectValue | undefined
  onChange?: (
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

export interface SelectDataFormatterOptions<T extends Record<string, any>> {
  /**
   * Исходный массив, подлежащий форматированию
   */
  array: T[]
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться ключ для опции
   * Ключ должен являться уникальным значением
   */
  value: keyof T
  /**
   * Строковое название ключа элемента исходного массива, на основании которого будет браться текст для отображения опции
   */
  label: keyof T
}
