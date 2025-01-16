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

export interface TableProps extends TableBaseProps {
  /** Массив с данными для построения шапки таблицы */
  columns?: Array<ColumnDef<any, any>>
  /** Массив с данными для построения тела таблицы */
  rows?: Array<TableRowData<any>>
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
  /**
   * Выбранный ряд. Если передается строка или число, идет сравнение аргумента с id ряда.
   */
  selectedRow?: TableSelectedRow
  onRowClick?: OnChangeFn<TableRow>
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
   * Использовать fixed если ширины колонок определены
   */
  tableLayout?: 'fixed' | 'auto'
}

// ФИЛЬТРАЦИЯ
export interface TableFilterDateOption {
  /** Дата или строка в формате YYYY-MM-DD */
  from?: Date | string
  /** Дата или строка в формате YYYY-MM-DD */
  to?: Date | string
}

export type TableFilterType = 'search' | 'select' | 'date' | 'multiSelect'

export interface TableColumnFilterValues {
  search: string
  select: TableSelectOption
  multiSelect: TableSelectOption[]
  date: string
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
export type TableSelectedRow =
  | string
  | number
  | ((row: TableRow<any>) => boolean)

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
    filterType?: 'search' | 'select' | 'date' | 'multiSelect'
    filterOptions?: TableFiltersOptions
    filterPopoverWidth?: CSSProperties['width']
    visibleOnRowHover?: boolean
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
