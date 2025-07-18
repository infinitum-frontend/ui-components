// Тест кейсы:
// Вот список тест-кейсов для проверки функциональности сортировки в компоненте Table (withSorting, sortingState, onSortingChange и связанных внутренних изменений):

// ---

// ### 1. Рендер сортировочных иконок

// - **withSorting=true и sortingState=[]:**
//   Для всех колонок с `enableSorting: true` должна отображаться иконка сортировки (arrow-up-down), но она должна быть невидимой (`visibility: hidden`), пока не наведён курсор на заголовок.

// - **withSorting=false:**
//   Иконка сортировки не должна отображаться ни на одной колонке, даже если в колонке прописан `enableSorting: true`.

// - **Колонки без enableSorting:**
//   Если у колонки не указан `enableSorting`, иконка сортировки не должна отображаться, даже если withSorting=true.

// ---

// ### 2. Взаимодействие с сортировкой

// - **Клик по сортируемому заголовку:**
//   - Первый клик по заголовку сортируемой колонки вызывает onSortingChange с аргументом `[{ id: columnId, desc: false }]` (сортировка по возрастанию).
//   - Второй клик по тому же заголовку вызывает onSortingChange с аргументом `[{ id: columnId, desc: true }]` (сортировка по убыванию).
//   - Третий клик сбрасывает сортировку и вызывает onSortingChange с пустым массивом `[]`.

// - **onSortingChange не вызывается для не сортируемых колонок:**
//   Клик по колонке без `enableSorting` не должен вызывать onSortingChange.

// ---

// ### 3. Состояние сортировки и отображение иконок

// - **sortingState с активной сортировкой:**
//   Если sortingState содержит элемент с id колонки, на этой колонке должна быть видима соответствующая иконка:
//   - `desc: false` — стрелка вверх (arrow-up)
//   - `desc: true` — стрелка вниз (arrow-down)

// - **sortingState пустой:**
//   На всех колонках отображается иконка arrow-up-down, но она невидима (кроме состояния hover).

// ---

// ### 4. Влияние сортировки на порядок строк

// - **Сортировка влияет на порядок строк:**
//   При изменении sortingState (например, сортировка по возрастанию/убыванию), строки должны отображаться в соответствующем порядке.

// ---

// ### 5. Взаимодействие с внешним состоянием

import { TABLE_COLUMNS, TABLE_DATA } from '../fixtures'
import { renderComponent } from '~/testSetup'
import Table from '../Table'
import { screen } from '@testing-library/react'
import { TableTestAttributes } from '../constants/testAttributes'
import userEvent from '@testing-library/user-event'

describe('Table Sorting', async () => {
  it('не должен рендерить кнопку переключения сортировки, если withSorting не указан', () => {
    renderComponent(<Table rows={TABLE_DATA} columns={TABLE_COLUMNS} />)

    const sortButton = screen.queryByTestId(
      TableTestAttributes.headerSortButton
    )
    expect(sortButton).not.toBeInTheDocument()
  })

  it('должен рендерить сортировочную кнопку, которая становится видимой только при hover на th', async () => {
    renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        withSorting
        sortingState={[]}
      />
    )

    // Находим все TH с сортировкой (те, у которых задан enableSorting)
    const sortableHeaders = screen
      .getAllByRole('columnheader')
      .filter((th) =>
        th.classList.contains('inf-table-header-cell--interactive')
      )

    expect(sortableHeaders.length).not.toBe(TABLE_COLUMNS.length)

    // Проверяем для каждой сортируемой колонки:
    sortableHeaders.forEach((th, index) => {
      const sortButton = screen.queryAllByTestId(
        TableTestAttributes.headerSortButton
      )[index]

      // Кнопка есть в DOM, но не видима (visibility: hidden)
      expect(sortButton).toBeInTheDocument()
      expect(sortButton).not.toBeVisible()
    })
  })

  it('должен менять иконку сортировки и вызывать onSortingChange при клике', async () => {
    const mockSortingChange = vi.fn()
    const { rerender } = renderComponent(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        withSorting
        sortingState={[]}
        onSortingChange={mockSortingChange}
      />
    )
    const user = userEvent.setup()
    // Берём первую сортируемую колонку (portfolio)
    const sortableHeaders = screen
      .getAllByRole('columnheader')
      .filter((th) =>
        th.classList.contains('inf-table-header-cell--interactive')
      )
    const th = sortableHeaders[0]
    // 1-й клик — сортировка по возрастанию (arrow-up)
    await user.click(th)
    expect(mockSortingChange).toBeCalledWith([{ id: 'portfolio', desc: false }])
    // Мокаем новое состояние сортировки и ререндерим
    rerender(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        withSorting
        sortingState={[{ id: 'portfolio', desc: false }]}
        onSortingChange={mockSortingChange}
      />
    )
    // Проверяем, что теперь иконка — arrow-up
    const sortButton = screen.queryAllByTestId(
      TableTestAttributes.headerSortButton
    )[0]

    const iconArrowUp = screen.queryAllByTestId(
      TableTestAttributes.sortIsAscIcon
    )[0]

    expect(sortButton).toBeVisible()
    expect(iconArrowUp).toBeVisible()

    // 2-й клик — сортировка по убыванию (arrow-down)
    await user.click(th)
    expect(mockSortingChange).toBeCalledWith([{ id: 'portfolio', desc: true }])
    rerender(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        withSorting
        sortingState={[{ id: 'portfolio', desc: true }]}
        onSortingChange={mockSortingChange}
      />
    )

    const iconArrowDown = screen.queryAllByTestId(
      TableTestAttributes.sortIsDescIcon
    )[0]
    expect(sortButton).toBeVisible()
    expect(iconArrowDown).toBeVisible()

    // 3-й клик — сброс сортировки (arrow-up-down)
    await user.click(th)
    expect(mockSortingChange).toBeCalledWith([])
    rerender(
      <Table
        rows={TABLE_DATA}
        columns={TABLE_COLUMNS}
        withSorting
        sortingState={[]}
        onSortingChange={mockSortingChange}
      />
    )

    expect(sortButton).not.toBeVisible()
  })
})
