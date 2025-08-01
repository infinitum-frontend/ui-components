import {
  ColumnDef,
  ColumnResizeMode,
  RowData,
  SortingState
} from '@tanstack/react-table'
import { CSSProperties, ReactNode, TableHTMLAttributes } from 'react'
import { OnChangeFn } from 'Utils/types'
// import { SelectOption } from 'Components/Select'

export interface TableSelectOption {
  value: number | string
  label: string | ReactNode
}

export interface TableBaseProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Скругление границ таблицы
   * @deprecated
   * */
  borderRadius?: 'xsmall' | 'small' | 'medium' | 'large' // TODO: не нужен
}

export interface TableProps<TRowData extends Record<string, any>>
  extends TableBaseProps {
  /** Массив с данными для построения шапки таблицы */
  columns?: Array<ColumnDef<any, any>>
  /** Массив с данными для построения тела таблицы */
  rows?: Array<TableRowData<TRowData>>
  /** Скругление границ таблицы
   * @deprecated
   */
  borderRadius?: 'xsmall' | 'small' | 'medium' | 'large'
  /** Включение сортировки по столбцам */
  withSorting?: boolean
  /** Начальное состояние сортировки */
  sortingState?: SortingState
  /** Событие изменения состояния сортировки */
  onSortingChange?: OnChangeFn<SortingState>
  // TODO: sorting mode auto
  withFiltering?: boolean
  /**
   * Событие изменения состояния фильтров
   */
  onFiltersChange?: OnChangeFn<TableColumnFiltersState>
  /**
   * Начальное состояние фильтров
   */
  filtersState?: TableColumnFiltersState
  /** Отображение чекбоксов в 1 колонке */
  withRowSelection?: boolean
  /** Событие изменения чекбоксов */
  onChangeRowSelection?: OnChangeFn<TableSelectionState<any>>
  /** Состояние выбора рядов через чекбокс */
  selectionState?: TableSelectionState<any>
  /** Функция для задания кастомного id для ряда. Используется в случае, когда необходимо сочетать выбор рядов вместе с динамически изменяющимися рядами(filtering, sorting)
   * Ссылка на документацию https://tanstack.com/table/v8/docs/guide/row-selection#useful-row-ids
   */
  getRowId?: (row: TRowData) => string
  /**
   * Выбранный ряд. Если передается строка или число, идет сравнение аргумента с id ряда.
   */
  selectedRow?: TableSelectedRow<TRowData>
  onRowClick?: OnChangeFn<TableRow<TRowData>>
  /** Изменение ширины колонок
   * @value onChange изменение "вживую" при растягивании
   * @value onEnd изменение при отжатии кнопки мыши
   */
  resizeMode?: ColumnResizeMode
  /** видимость колонок
   * в качестве данных передается объект с ключами, соответствующими id колонок,
   * имеющим булевы значения, отражающими видимость колонки
   */
  columnVisibility?: Record<string, boolean>
  /** Максимальная высота таблицы для варианта со скроллом */
  maxHeight?: number | CSSProperties['maxHeight'] // TODO: сделать через style + scrollable?
  /** Высота таблицы для варианта со скроллом */
  height?: number | CSSProperties['height'] // TODO: сделать через style + scrollable?
  /** */
  stickyHeader?: boolean
  /** Ориентировочная высота ряда. Использовать вместе с пропом scrollable */
  estimateRowHeight?: number
  /** Включение виртуализации для оптимизации рендеринга большего числа рядов */
  virtualized?: boolean
  // /** Включена ли группировка */
  // // enableGrouping?: boolean
  /**
   * Текст отображаемый при пустой таблице
   */
  emptyMessage?: string
  /**
   * Отображение тегов для выбранных фильтров
   */
  withFiltersTags?: boolean
  /**
   * CSS Свойство table-layout
   */
  tableLayout?: 'fixed' | 'auto'
  /**
   * Экспериментальное свойство
   */
  withCollapsibleHeaderCellActions?: true // TODO: вместо этого надо задавать minWidth / width / maxWidth в columnDef и прокидывать стили на th или вложенный div
  meta?: Record<string, any>
  /**
   * Событие скролла
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void

  /**
   * Включение подстрок
   * Ссылки на документацию и примеры использования
   * https://tanstack.com/table/v8/docs/guide/expanding-rows
   * https://tanstack.com/table/v8/docs/framework/react/examples/expanding
   */
  withSubRows?: boolean
  /**
   * Раскрытие всех подстрок по умолчанию. Используется вместе с withSubRows
   */
  expandAll?: boolean
  /**
   * Функция для получения подстрок
   */
  getSubRows?: (row: TRowData) => TRowData[]
}

// ФИЛЬТРАЦИЯ
export interface TableFilterDateOption {
  /** Дата или строка в формате YYYY-MM-DD */
  from?: Date | string
  /** Дата или строка в формате YYYY-MM-DD */
  to?: Date | string
}

export type TableFilterType =
  | 'search'
  | 'select'
  | 'date'
  | 'multiSelect'
  | 'dateRange'

export interface TableColumnFilterValues {
  search: string
  select: TableSelectOption
  multiSelect: TableSelectOption[]
  date: string
  dateRange: TableFilterDateOption
}

export type TableColumnFilterValue =
  | TableColumnFilterValues[keyof TableColumnFilterValues]
  | undefined

export type TableColumnFilter =
  | {
      id: string
      filterType: 'search'
      value: string
    }
  | {
      id: string
      filterType: 'select'
      value: TableSelectOption
    }
  | {
      id: string
      filterType: 'multiSelect'
      value: TableSelectOption[]
    }
  | {
      id: string
      filterType: 'date'
      value: string
    }
  | {
      id: string
      filterType: 'dateRange'
      value: TableFilterDateOption
    }
export type TableColumnFiltersState = TableColumnFilter[]

// РЯДЫ
interface BaseRow {
  className?: string
  style?: CSSProperties
}

export type TableRowData<T extends Record<any, any> = Record<any, any>> =
  BaseRow & T

export interface TableRow<T extends Record<any, any> = Record<any, any>> {
  id: string
  rowData: TableRowData<T>
}

// СЕЛЕКЦИЯ
export type TableSelectionState<T extends Record<any, any>> = Array<TableRow<T>>

// ВЫБРАННЫЙ РЯД
export type TableSelectedRow<TRowData extends Record<string, any>> =
  | string
  | number
  | ((row: TableRow<TRowData>) => boolean)

interface TableFilterOptionGroup {
  label: string
  options: TableSelectOption[]
}

export type TableFiltersOptions = Array<
  TableSelectOption | TableFilterOptionGroup
> // TODO: объединить с Select, когда там реализуем группировку

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType?: TableFilterType
    filterOptions?: TableFiltersOptions
    filterPopoverWidth?: CSSProperties['width']
    visibleOnRowHover?: boolean
    width?: CSSProperties['width']
    maxWidth?: CSSProperties['maxWidth']
    minWidth?: CSSProperties['minWidth']
  }

  // interface FilterFns {
  //   elIncludesString: FilterFn<unknown>
  // }
}

export type TableVerticalAlignValue = Extract<
  | 'baseline'
  | 'bottom'
  | 'middle'
  | 'sub'
  | 'super'
  | 'text-bottom'
  | 'text-top'
  | 'top',
  CSSProperties['verticalAlign']
>
