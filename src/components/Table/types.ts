import {
  ColumnDef,
  ColumnMeta,
  ColumnResizeMode,
  RowData,
  SortingState
} from '@tanstack/react-table'
import { ColumnFilter as TanstackColumnFilter } from '@tanstack/table-core/build/lib/features/Filters'
import { CSSProperties, TableHTMLAttributes } from 'react'
import { OnChangeFn } from 'Utils/types'

export interface TableBaseProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Скругление границ таблицы */
  borderRadius?: 'xsmall' | 'small' | 'medium' | 'large'
  /** CSS свойство vertical-align для шапки */
  verticalAlignHead?: TableVerticalAlignValue
  /** CSS свойство vertical-align для рядов */
  verticalAlignBody?: TableVerticalAlignValue
}

export interface TableProps extends TableBaseProps {
  /** Массив с данными для построения шапки таблицы */
  columns?: Array<ColumnDef<any, any>>
  /** Массив с данными для построения тела таблицы */
  rows?: Array<TableRowData<any>>
  /** Скругление границ таблицы */
  borderRadius?: 'xsmall' | 'small' | 'medium' | 'large'
  /** CSS свойство vertical-align для шапки */
  verticalAlignHead?: TableVerticalAlignValue
  /** CSS свойство vertical-align для рядов */
  verticalAlignBody?: TableVerticalAlignValue
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
  /**
   * Включен ли скролл
   * Применяется, если таблица наполняется всеми данными сразу
   * Проп включает виртуализацию, позволяя рендерить только элементы, отображаемые на экране
   */
  scrollable?: boolean
  /** Максимальная высота таблицы для варианта со скроллом. Использовать вместе с пропом scrollable */
  maxHeight?: number
  /** Ориентировочная высота ряда. Использовать вместе с пропом scrollable */
  estimateRowHeight?: number
  // /** Включена ли группировка */
  // // enableGrouping?: boolean
  /**
   * Текст отображаемый при пустой таблице
   */
  emptyMessage?: string
  /**
   * Список значений тегов для фильтров
   */
  filterTags?: string[]
}

// ФИЛЬТРАЦИЯ
export interface TableFilterSelectOption {
  label: string
  value: string
}

export interface TableFilterDateOption {
  /** Дата или строка в формате YYYY-MM-DD */
  from?: Date | string
  /** Дата или строка в формате YYYY-MM-DD */
  to?: Date | string
}

export type TableFilterType = ColumnMeta<any, any>['filterType']

export interface TableColumnFilterValues {
  search: string
  select: TableFilterSelectOption
  date: TableFilterDateOption
}

export type TableColumnFilterValue =
  | TableColumnFilterValues[keyof TableColumnFilterValues]
  | undefined

export interface TableColumnFilter<T extends TableFilterType>
  extends TanstackColumnFilter {
  value: TableColumnFilterValues[T]
  filterType: TableFilterType
}

export type TableColumnFiltersState = Array<TableColumnFilter<TableFilterType>>

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

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: 'search' | 'select' | 'date'
    filterItems?: TableFilterSelectOption[]
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
