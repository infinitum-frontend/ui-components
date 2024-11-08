// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useMemo, useRef } from 'react'
import {
  Column,
  ColumnDef,
  ColumnMeta,
  ColumnResizeMode,
  getCoreRowModel,
  getFacetedUniqueValues,
  OnChangeFn as TanstackOnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import cn from 'classnames'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import { Checkbox } from 'Components/Checkbox'
import {
  TableColumnFiltersState,
  TableColumnFilterValue,
  TableRow,
  TableRowData,
  TableSelectedRow,
  TableSelectionState,
  TableVerticalAlignValue
} from './types'
import { OnChangeFn } from 'Utils/types'
import { mapRowToExternalFormat } from './helpers'
import TableBase, { TableBaseProps } from './components/TableBase'
import './Table.scss'
import TableWithVirtualRows from './components/TableWithVirtualRows'

export interface TableProps<TRowData extends Record<any, any> = any>
  extends TableBaseProps {
  /** Массив с данными для построения шапки таблицы */
  columns?: Array<ColumnDef<any, any>>
  /** Массив с данными для построения тела таблицы */
  rows?: Array<TableRowData<TRowData>>
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
  /** @deprecated */
  withFiltering?: boolean
  /**
   * @deprecated
   * Событие изменения состояния фильтров
   */
  onFiltersChange?: OnChangeFn<TableColumnFiltersState>
  /**
   * @deprecated
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
}

/** Компонент многофункциональной таблицы */
const Table = <TRowData extends Record<any, any> = any>({
  columns = [],
  rows = [],
  className,
  borderRadius = 'small',
  verticalAlignHead = 'top',
  verticalAlignBody,
  withSorting,
  onSortingChange,
  sortingState = [],
  withFiltering,
  onFiltersChange,
  filtersState = [],
  withRowSelection,
  onChangeRowSelection,
  selectionState = [],
  selectedRow,
  onRowClick,
  resizeMode,
  columnVisibility = {},
  // enableGrouping = false,
  children,
  scrollable,
  maxHeight,
  estimateRowHeight = 100,
  ...props
}: TableProps<TRowData>): ReactElement => {
  if (children) {
    return (
      <TableBase
        verticalAlignBody={verticalAlignBody}
        verticalAlignHead={verticalAlignHead}
        borderRadius={borderRadius}
        {...props}
      >
        {children}
      </TableBase>
    )
  }

  // Приводим состояние селекции столбцом к формату танстака(объект ключ-id ряда, значение-boolean)
  const tanstackSelectionState = useMemo(
    () =>
      selectionState?.reduce<RowSelectionState>((accumulator, currentValue) => {
        accumulator[currentValue.id] = true
        return accumulator
      }, {}),
    [selectionState]
  )

  // ==================== handlers ====================
  const handleSortingChange: (state: SortingState) => void = (state) => {
    onSortingChange?.(state)
  }

  const handleFiltersChange: (
    value: TableColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void = (value, filterType, column) => {
    const newState = [
      ...filtersState?.filter((item) => item.id !== column.id),
      value ? { id: column.id, filterType, value } : undefined
    ].filter((item) => Boolean(item)) as TableColumnFiltersState
    onFiltersChange?.(newState)
  }

  // маппим данные ряда из формата танстака к нашему формату
  const handleRowSelection: TanstackOnChangeFn<RowSelectionState> = (
    callback
  ) => {
    const newTanstackSelectionState =
      typeof callback === 'function' ? callback(tanstackSelectionState) : {}

    const rowSelectionState: Array<TableRow<any>> = []
    Object.keys(newTanstackSelectionState).forEach((key) => {
      const row = mapRowToExternalFormat(table.getRow(key))
      rowSelectionState.push(row)
    })

    onChangeRowSelection?.(rowSelectionState)
  }

  const memoizedColumns = useMemo(() => {
    if (withRowSelection) {
      return [
        {
          id: 'checkbox',
          size: 20,
          header: ({ table }) => {
            return (
              <Checkbox
                checked={Boolean(table.getIsAllRowsSelected())}
                indeterminate={table.getIsSomeRowsSelected()}
                onClick={(e) => e.stopPropagation()}
                onChange={(value, e) =>
                  table.getToggleAllRowsSelectedHandler().call({}, e)
                }
              />
            )
          },
          cell: ({ row }) => {
            return (
              <div>
                <Checkbox
                  checked={row.getIsSelected()}
                  indeterminate={row.getIsSomeSelected()}
                  onClick={(e) => e.stopPropagation()}
                  onChange={row.getToggleSelectedHandler()}
                />
              </div>
            )
          }
        },
        ...columns
      ] as Array<ColumnDef<any>>
    }

    return columns
  }, [columns, withRowSelection])

  const table = useReactTable({
    data: rows,
    columns: memoizedColumns,
    columnResizeMode: resizeMode,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: tanstackSelectionState,
      sorting: sortingState,
      columnVisibility
    },
    manualFiltering: true,
    // manualGrouping: enableGrouping,
    onRowSelectionChange: handleRowSelection,
    getFacetedUniqueValues: getFacetedUniqueValues()
    // getSubRows: (row) => row?.subRows,
  })

  const tableRows = table.getRowModel().rows

  return (
    <TableWithVirtualRows
      rowsCount={tableRows.length}
      borderRadius={borderRadius}
      estimateRowHeight={estimateRowHeight}
      maxHeight={maxHeight}
      enabled={scrollable}
    >
      {({ virtualizer }) => (
        <table
          className={cn('inf-table', className, {
            [`inf-table--border-radius-${borderRadius as string}`]:
              borderRadius,
            // Для того, чтобы избежать проблем с border таблицы при фиксированной шапке и скролле,
            // убираем внешние бордеры у таблицы
            'inf-table--borderless': scrollable // TODO: добавить внешний проп borderless
          })}
          {...props}
        >
          <TableHeader
            sticky={scrollable}
            table={table}
            withSorting={withSorting}
            withFiltering={withFiltering}
            sortingState={sortingState}
            onSortingChange={handleSortingChange}
            filtersState={filtersState}
            onFiltersChange={handleFiltersChange}
            resizeMode={resizeMode}
            verticalAlignHead={verticalAlignHead}
          />
          <TableBody<TRowData>
            rows={tableRows}
            selectedRow={selectedRow}
            onRowClick={onRowClick}
            // grouping={enableGrouping}
            verticalAlignBody={verticalAlignBody}
            virtualizer={virtualizer}
          />
        </table>
      )}
    </TableWithVirtualRows>
  )
}

export default Table
