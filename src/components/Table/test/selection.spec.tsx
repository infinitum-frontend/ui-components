// Тест кейсы:
// 1. наличие пропа withRowSelection отображает чекбоксы в 1 колонке +
// 2. наличие selectionState проставляет соответствующий чекбокс в статус Выбран +
// 3. нажатие на чекбокс у ряда вызывает функцию-колбэк с правильным состоянием +
// 4. выбор ряда проставляет в шапке чекбокс с состоянием indeterminate +
// 5. выбор чекбокса в шапке выбирает/сбрасывает все чекбоксы в таблице +
// 6. при динамическом изменении рядов(фильтрация/сортировка) состояния чекбоксов корректно привязываются к нужному ряду на основании getRowId

import { Portfolio, TABLE_COLUMNS, TABLE_DATA } from '../fixtures'
import { renderComponent } from '~/testSetup'
import Table from '../Table'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TableSelectionState } from '../types'

describe('Table Row Selection', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(
      <Table rows={TABLE_DATA} columns={TABLE_COLUMNS} withRowSelection />
    )

    expect(el).toMatchSnapshot()
  })

  it('should render checkbox column if WithRowSelection', () => {
    renderComponent(
      <Table rows={TABLE_DATA} columns={TABLE_COLUMNS} withRowSelection />
    )

    const checkboxes = screen.queryAllByRole('checkbox')
    // Количество отрендеренных чекбоксов соответствует количеству рядов + 1 в шапке
    expect(checkboxes.length).toBe(TABLE_DATA.length + 1)

    // Все чекбоксы не выбраны
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })

  it('should support default state', () => {
    const preselectedRowIndex = 2
    renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        withRowSelection
        selectionState={[
          {
            id: String(preselectedRowIndex),
            rowData: TABLE_DATA[preselectedRowIndex]
          }
        ]}
      />
    )

    const checkboxes = screen.queryAllByRole('checkbox')

    // чекбокс в шапке имеет состояние indeterminate
    expect(checkboxes[0]).toBePartiallyChecked()
    // нужный чекбокс выбран
    expect(checkboxes[preselectedRowIndex + 1]).toBeChecked()

    checkboxes.forEach((checkbox, index) => {
      if (index !== 0 && index !== preselectedRowIndex + 1) {
        expect(checkbox).not.toBeChecked()
      }
    })
  })

  it('should emit correct state on change', async () => {
    const indexToCheck = 3
    let handlerPayload
    const mockChangeHandler = vi.fn((payload) => {
      handlerPayload = payload
    })
    const { rerender } = renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        onChangeRowSelection={mockChangeHandler}
        withRowSelection
      />
    )

    const checkboxes = screen.queryAllByRole('checkbox')

    const user = userEvent.setup()
    await user.click(checkboxes[indexToCheck])

    expect(mockChangeHandler).toBeCalledTimes(1)
    expect(mockChangeHandler).toBeCalledWith(handlerPayload)

    rerender(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        onChangeRowSelection={mockChangeHandler}
        selectionState={handlerPayload}
        withRowSelection
      />
    )

    await user.click(checkboxes[indexToCheck])

    expect(mockChangeHandler).toBeCalledWith([])
  })

  it('should trigger all checkboxes on header checkbox change', async () => {
    let handlerPayload
    const mockChangeHandler = vi.fn((payload) => {
      handlerPayload = payload
    })

    const { rerender } = renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        onChangeRowSelection={mockChangeHandler}
        withRowSelection
      />
    )

    const checkboxes = screen.queryAllByRole('checkbox')
    const user = userEvent.setup()
    await user.click(checkboxes[0])

    expect(mockChangeHandler).toBeCalledTimes(1)
    expect(mockChangeHandler).toBeCalledWith(handlerPayload)

    rerender(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        onChangeRowSelection={mockChangeHandler}
        selectionState={handlerPayload}
        withRowSelection
      />
    )

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked()
    })

    await user.click(checkboxes[0])

    expect(mockChangeHandler).toBeCalledWith([])
  })

  it('should keep correct state when rows change', () => {
    const preselectedRowIndex = 3

    const selectedElement = TABLE_DATA[preselectedRowIndex]
    const initialSelectionState: TableSelectionState<Portfolio> = [
      {
        id: selectedElement.portfolio,
        rowData: selectedElement
      }
    ]

    const { rerender } = renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        getRowId={(row) => row.portfolio}
        selectionState={initialSelectionState}
        withRowSelection
      />
    )

    const checkboxes = screen.queryAllByRole('checkbox')

    expect(checkboxes[preselectedRowIndex + 1]).toBeChecked()

    act(() => {
      rerender(
        <Table
          rows={TABLE_DATA.filter((row) => {
            return row.portfolio.toLocaleLowerCase().match('машин')
          })}
          columns={TABLE_COLUMNS}
          getRowId={(row) => row.portfolio}
          selectionState={initialSelectionState}
          withRowSelection
        />
      )
    })

    const checkboxesAfterFiltering = screen.queryAllByRole('checkbox')

    // ожидаем, что после фильтрации выбранный чекбокс остался в таком же состоянии, т.к. благодаря getRowId селекция привязана не к индексу ряда, а к значению поля portfolio
    expect(checkboxesAfterFiltering[1]).toBeChecked()
  })
})
