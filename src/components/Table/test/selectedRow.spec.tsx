import { renderComponent } from '~/testSetup'
import { TABLE_COLUMNS, TABLE_DATA } from '../fixtures'
import Table from '../Table'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Тест кейсы
// если onRowClick указан, ряд при наведении имеет класс inf-table-row--interactive +
// если selectedRow задан, указанный ряд имеет соответствующий бэкграунд +
// selectedRow как функция (также добавить тест с поддержкой getRowId из IDD-593) +
// onRowClick корректно обрабатывается +

describe('Table selected row', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        selectedRow="0"
        onRowClick={() => {}}
      />
    )

    expect(el).toMatchSnapshot()
  })

  it('should apply className', () => {
    renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        selectedRow="0"
        onRowClick={() => {}}
      />
    )

    const rows = screen.queryAllByRole('row')
    expect(rows[1].className).toMatch('inf-table-row--selected')

    rows.forEach((row, index) => {
      if (index !== 0) {
        expect(row.className).toMatch('inf-table-row--interactive')
      }
    })
  })

  it('should use custom function for selected row', () => {
    const selectedPortfolioName = TABLE_DATA[2].portfolio

    renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        selectedRow={(row) => row.rowData.portfolio === selectedPortfolioName}
        onRowClick={() => {}}
      />
    )

    const rows = screen.queryAllByRole('row')

    expect(rows[2 + 1].className).toMatch('inf-table-row--selected')
  })

  it('should handle on row click correctly', async () => {
    const selectedPortfolio = TABLE_DATA[2]

    const rowClickHandler = vi.fn()

    renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        selectedRow={undefined}
        onRowClick={rowClickHandler}
      />
    )

    const rows = screen.queryAllByRole('row')

    const user = userEvent.setup()

    // Поскольку клик по факту происходит на td, обрабатываем его
    await user.click(rows[3].children[0])

    expect(rowClickHandler).toBeCalledTimes(1)

    expect(rowClickHandler).toBeCalledWith({
      id: '2',
      rowData: selectedPortfolio
    })
  })
})
