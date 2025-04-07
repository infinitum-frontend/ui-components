import { describe, it, expect, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { act, screen } from '@testing-library/react'
import { DateCalendar } from '../index'
import userEvent from '@testing-library/user-event'
import { capitalize } from '../../../utils/helpers'

const title = 'DateCalendar'

describe('day view', () => {
  it('should render', () => {
    renderComponent(
      <DateCalendar title={title} value={new Date()} onChange={() => {}} />
    )

    expect(screen.queryByTitle(title)).toBeInTheDocument()
    expect(screen.queryByText(new Date().getDate())).toHaveClass(
      'inf-calendar-item--selected'
    )
  })

  it('should match snapshot', () => {
    const { el } = renderComponent(
      <DateCalendar title={title} value={new Date()} onChange={() => {}} />
    )

    expect(el).toMatchSnapshot()
  })

  it('should select date on click', async () => {
    let calledWithValue = ''
    const date = new Date()
    const user = userEvent.setup()
    const onChange = vi.fn(
      (value) => (calledWithValue = value.toLocaleDateString())
    )
    renderComponent(
      <DateCalendar title={title} value={date} onChange={onChange} />
    )

    await user.click(screen.queryByText('10') as HTMLElement)
    date.setDate(10)

    expect(onChange).toHaveBeenCalledOnce()
    expect(calledWithValue).toBe(date.toLocaleDateString())
  })
})

describe('month view', () => {
  it('should open month view on click', async () => {
    const date = new Date()
    const user = userEvent.setup()
    const { el } = renderComponent(
      <DateCalendar title={title} value={date} onChange={() => {}} />
    )

    const currentMonth = date.toLocaleDateString('ru-Ru', { month: 'long' })
    await user.click(
      screen.queryByText(capitalize(currentMonth)) as HTMLElement
    )

    expect(el.querySelector('.inf-calendar-months')).toBeInTheDocument()
  })

  it('should match snapshot', async () => {
    const date = new Date()
    const user = userEvent.setup()
    const { el } = renderComponent(
      <DateCalendar title={title} value={date} onChange={() => {}} />
    )

    const currentMonth = date.toLocaleDateString('ru-Ru', { month: 'long' })
    await user.click(
      screen.queryByText(capitalize(currentMonth)) as HTMLElement
    )

    expect(el).toMatchSnapshot('monthView')
  })

  it('should select month', async () => {
    const date = new Date()
    const user = userEvent.setup()
    const { el } = renderComponent(
      <DateCalendar title={title} value={date} onChange={() => {}} />
    )

    const currentMonth = date.toLocaleDateString('ru-Ru', { month: 'long' })
    await user.click(
      screen.queryByText(capitalize(currentMonth)) as HTMLElement
    )

    expect(el.querySelector('.inf-calendar-months')).toBeInTheDocument()

    await user.click(screen.queryByText('май') as HTMLElement)
    expect(el.querySelector('.inf-calendar-months')).not.toBeInTheDocument()
    expect(el.querySelector('.inf-calendar-days')).toBeInTheDocument()
    expect(screen.queryByText('Май')).toBeInTheDocument()
  })

  it('should select date with proper month', async () => {
    let calledWithValue = ''
    const date = new Date()
    const user = userEvent.setup()
    const onChange = vi.fn((value) => {
      calledWithValue = value.toLocaleDateString()
    })
    renderComponent(
      <DateCalendar title={title} value={date} onChange={onChange} />
    )

    const currentMonth = date.toLocaleDateString('ru-Ru', { month: 'long' })
    await user.click(
      screen.queryByText(capitalize(currentMonth)) as HTMLElement
    )
    await user.click(screen.queryByText('май') as HTMLElement)
    await user.click(screen.queryByText('10') as HTMLElement)
    date.setMonth(4) // май
    date.setDate(10)

    expect(onChange).toHaveBeenCalledOnce()
    expect(calledWithValue).toBe(date.toLocaleDateString())
  })
})

describe('year view', () => {
  it('should open year view on click', async () => {
    const date = new Date()
    const user = userEvent.setup()
    renderComponent(
      <div>
        <DateCalendar title={title} value={date} onChange={() => {}} />
      </div>
    )

    const currentYear = date.toLocaleDateString('ru-Ru', { year: 'numeric' })
    await act(
      async () =>
        await user.click(screen.queryByText(currentYear) as HTMLElement)
    )

    expect(document.querySelector('.inf-calendar-years')).toBeInTheDocument()
  })

  it('should match snapshot', async () => {
    const date = new Date()
    const user = userEvent.setup()
    const { el } = renderComponent(
      <DateCalendar title={title} value={date} onChange={() => {}} />
    )

    const currentYear = date.toLocaleDateString('ru-Ru', { year: 'numeric' })
    await user.click(screen.queryByText(currentYear) as HTMLElement)

    expect(el).toMatchSnapshot('yearView')
  })

  it('should select year', async () => {
    const date = new Date()
    const user = userEvent.setup()
    const { el } = renderComponent(
      <DateCalendar title={title} value={date} onChange={() => {}} />
    )

    const currentYear = date.toLocaleDateString('ru-Ru', { year: 'numeric' })
    await user.click(screen.queryByText(currentYear) as HTMLElement)

    expect(el.querySelector('.inf-calendar-years')).toBeInTheDocument()

    await user.click(screen.queryByText('2022') as HTMLElement)
    expect(el.querySelector('.inf-calendar-years')).not.toBeInTheDocument()
    expect(el.querySelector('.inf-calendar-days')).toBeInTheDocument()
    expect(screen.queryByText('2022')).toBeInTheDocument()
  })

  it('should select date with proper year', async () => {
    let calledWithValue = ''
    const date = new Date()
    const user = userEvent.setup()
    const onChange = vi.fn((value) => {
      calledWithValue = value.toLocaleDateString()
    })
    renderComponent(
      <DateCalendar title={title} value={date} onChange={onChange} />
    )

    const currentYear = date.toLocaleDateString('ru-Ru', { year: 'numeric' })
    await user.click(screen.queryByText(currentYear) as HTMLElement)
    await user.click(screen.queryByText('2022') as HTMLElement)
    await user.click(screen.queryByText('10') as HTMLElement)
    date.setDate(10)
    date.setFullYear(2022)

    expect(onChange).toHaveBeenCalledOnce()
    expect(calledWithValue).toBe(date.toLocaleDateString())
  })
})

describe('arrows', () => {
  it('should change month on click', async () => {
    let calledWithValue = ''
    const user = userEvent.setup()
    const date = new Date(2023, 6, 19)
    const onChange = vi.fn((value) => {
      calledWithValue = value.toLocaleDateString()
    })
    renderComponent(
      <DateCalendar title={title} value={date} onChange={onChange} />
    )

    const [leftArrow, rightArrow] = screen.queryAllByRole('button')

    await user.click(leftArrow)

    expect(screen.queryByText('Июнь')).toBeInTheDocument()

    await user.click(rightArrow)
    await user.click(rightArrow)
    expect(screen.queryByText('Август')).toBeInTheDocument()

    await user.click(screen.queryByText('12') as HTMLElement)
    date.setMonth(7)
    date.setDate(12)
    expect(calledWithValue).toBe(date.toLocaleDateString())
  })
})
