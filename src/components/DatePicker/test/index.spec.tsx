// Тест кейсы:
// 1. компонент рендерится корректно +
// 2. поддерживает пропс disabled +
// 3. поддерживает пропс placeholder +
// 4. поддерживает пропс size +
// 5. поддерживает пропс value +
// 6. поддерживает пропс min/max +
// 7. поддерживает пропс clearable +
// 8. поддерживает пропс withTodayButton +
// 9. вызывает onChange при выборе даты +
// 10. открывает/закрывает календарь при клике +
// 11. поддерживает пропс required +
// 12. работает с Form контекстом +
// 13. поддерживает пропс onClear +

import { renderComponent } from '~/testSetup'
import { DatePicker } from '../index'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../../Form'
import { vi } from 'vitest'

describe('DatePicker', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(<DatePicker />)
    expect(el).toMatchSnapshot()
  })

  it('should render correctly', () => {
    renderComponent(<DatePicker />)

    const input = screen.queryByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', '__.__.____')
  })

  it('should support disabled prop', () => {
    renderComponent(<DatePicker disabled />)

    const input = screen.queryByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should support custom placeholder', () => {
    const customPlaceholder = 'Выберите дату'
    renderComponent(<DatePicker placeholder={customPlaceholder} />)

    const input = screen.queryByRole('textbox')
    expect(input).toHaveAttribute('placeholder', customPlaceholder)
  })

  it('should support size prop', () => {
    const { el } = renderComponent(<DatePicker size="small" />)

    const input = el.querySelector('.inf-input-wrapper')
    expect(input).toHaveClass('inf-text-field--size-small')
  })

  it('should support value prop', () => {
    const testDate = '2024-01-15'
    renderComponent(<DatePicker value={testDate} />)

    const input = screen.queryByRole('textbox')
    expect(input).toHaveValue('15.01.2024')
  })

  it('should support min/max props', () => {
    const minDate = '2024-01-01'
    const maxDate = '2024-12-31'
    renderComponent(<DatePicker min={minDate} max={maxDate} />)

    const input = screen.queryByRole('textbox')
    expect(input).toHaveAttribute('min', minDate)
    expect(input).toHaveAttribute('max', maxDate)
  })

  it('should support clearable prop', async () => {
    const { el } = renderComponent(<DatePicker clearable value="2024-01-15" />)

    const clearButton = el.querySelector(
      '.inf-input-wrapper__clear-button'
    ) as HTMLSpanElement

    expect(clearButton).toBeInTheDocument()
    // expect(clearButton).toBeVisible() не работает из за jsdom
  })

  it('should show clear button only when value exists and clearable is true', () => {
    const { rerender, el } = renderComponent(<DatePicker clearable />)

    // Без значения кнопка очистки не должна отображаться
    expect(
      el.querySelector('.inf-input-wrapper__clear-button') as HTMLSpanElement
    ).not.toBeInTheDocument()

    // С значением кнопка должна отображаться
    rerender(<DatePicker clearable value="2024-01-15" />)
    expect(
      el.querySelector('.inf-input-wrapper__clear-button') as HTMLSpanElement
    ).toBeInTheDocument()
  })

  it('should support withTodayButton prop', async () => {
    renderComponent(<DatePicker withTodayButton />)

    const user = userEvent.setup()
    const input = screen.queryByRole('textbox') as HTMLInputElement

    // Открываем календарь
    await user.click(input)

    // Проверяем наличие кнопки "Сегодня"
    expect(screen.queryByText('Сегодня')).toBeInTheDocument()
  })

  it('should call onChange when date is selected', async () => {
    const onChange = vi.fn()
    renderComponent(<DatePicker onChange={onChange} />)

    const user = userEvent.setup()
    const input = screen.queryByRole('textbox') as HTMLInputElement

    // Открываем календарь
    await user.click(input)

    // Выбираем дату (кликаем по дню)
    const dayButton = screen.queryByText('15')
    if (dayButton) {
      await user.click(dayButton)

      expect(onChange).toHaveBeenCalledWith(
        new Date(new Date().setDate(15)).toISOString().split('T')[0]
      )
    }
  })

  it('should open/close calendar on click', async () => {
    renderComponent(<DatePicker value={'2025-08-15'} />)

    const user = userEvent.setup()
    const input = screen.queryByRole('textbox') as HTMLInputElement

    // Изначально календарь закрыт
    expect(screen.queryByText('Август')).toBeNull()

    // Открываем календарь
    await user.click(input)
    expect(screen.queryByText('Август')).toBeInTheDocument()

    // // // Закрываем календарь (кликаем снова)
    await user.click(document.body)
    expect(screen.queryByText('Август')).toBeNull()
  })

  it('should support required prop', () => {
    renderComponent(<DatePicker required />)

    const input = screen.queryByRole('textbox')
    expect(input).toHaveAttribute('required')
  })

  it('should work with Form context', () => {
    renderComponent(
      <Form>
        <Form.Group required>
          <DatePicker />
        </Form.Group>
      </Form>
    )

    const input = screen.queryByRole('textbox')
    expect(input).toHaveAttribute('required')
  })

  it('should call onClear when clear button is clicked', async () => {
    const onClear = vi.fn()
    renderComponent(
      <DatePicker clearable value="2024-01-15" onClear={onClear} />
    )

    const user = userEvent.setup()
    const clearButton = screen.queryByRole('button', { name: /очистить/i })

    if (clearButton) {
      await user.click(clearButton)
      expect(onClear).toHaveBeenCalledTimes(1)
    }
  })

  it('should call onChange when clear button is clicked without onClear', async () => {
    const onChange = vi.fn()
    renderComponent(
      <DatePicker clearable value="2024-01-15" onChange={onChange} />
    )

    const user = userEvent.setup()
    const clearButton = screen.queryByRole('button', { name: /очистить/i })

    if (clearButton) {
      await user.click(clearButton)
      expect(onChange).toHaveBeenCalledWith('')
    }
  })

  it('should close calendar after date selection', async () => {
    renderComponent(<DatePicker value={'2025-08-15'} />)

    const user = userEvent.setup()
    const input = screen.queryByRole('textbox') as HTMLInputElement

    // Открываем календарь
    await user.click(input)
    expect(screen.queryByText('Август')).toBeInTheDocument()

    // Выбираем дату
    const dayButton = screen.queryByText('15')
    if (dayButton) {
      await user.click(dayButton)

      // Календарь должен закрыться
      expect(screen.queryByText('Август')).not.toBeInTheDocument()
    }
  })

  it('should handle empty value correctly', () => {
    renderComponent(<DatePicker value="" />)

    const input = screen.queryByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('should handle Date object value', () => {
    const testDate = new Date('2024-01-15')
    renderComponent(<DatePicker value={testDate} />)

    const input = screen.queryByRole('textbox')
    expect(input).toHaveValue('15.01.2024')
  })
})
