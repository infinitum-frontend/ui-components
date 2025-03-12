import { RowSelectionState, Table } from '@tanstack/react-table'
import { TableRow, TableSelectionState } from '../types'
import { mapRowToExternalFormat } from '../helpers'
import { useMemo } from 'react'

interface SelectionState {
  tanstackSelectionState: RowSelectionState
  handleRowSelection: (
    nextSelectionState: RowSelectionState,
    table: Table<any>,
    onSelectionChange?: (selectionState: Array<TableRow<any>>) => void
  ) => void
}
export default function useSelectionState({
  selectionState
}: {
  selectionState: TableSelectionState<any>
}): SelectionState {
  const tanstackSelectionState = useMemo(
    () =>
      selectionState?.reduce<RowSelectionState>((accumulator, currentValue) => {
        accumulator[currentValue.id] = true
        return accumulator
      }, {}),
    [selectionState]
  )

  // маппим данные ряда из формата танстака к нашему формату
  const handleRowSelection = (
    nextSelectionState: RowSelectionState,
    table: Table<any>,
    onSelectionChange?: (selectionState: Array<TableRow<any>>) => void
  ): void => {
    const rowSelectionState: Array<TableRow<any>> = []
    Object.keys(nextSelectionState).forEach((key) => {
      const row = mapRowToExternalFormat(table.getRow(key))
      rowSelectionState.push(row)
    })
    onSelectionChange?.(rowSelectionState)
  }

  return {
    tanstackSelectionState,
    handleRowSelection
  }
}
