import { it, describe } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { DatePicker } from '../index'
import { act, fireEvent, screen } from '@testing-library/react'

describe('DatePicker', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      const { el } = renderComponent(<DatePicker />)

      expect(el).toMatchSnapshot('Datepicker')
    })
  })

  describe('value', () => {
    it('should support value on main input', () => {
      renderComponent(<DatePicker value="2024-03-30" />)
      const input = screen.queryByRole('textbox') as HTMLInputElement

      expect(input).toHaveValue('30.03.2024')
    })

    it('should have empty value if value is not valid date', () => {
      renderComponent(<DatePicker value="15.10.2024" />)
      const input = screen.queryByRole('textbox') as HTMLInputElement

      expect(input).toHaveValue('')
    })

    it('should pass value to hidden input', () => {
      const { el } = renderComponent(<DatePicker value="2024-03-30" />)
      const nativeDatepicker = el.querySelector('input[type=date]')

      expect(nativeDatepicker).toHaveValue('2024-03-30')
    })

    it('should pass value to date calendar', async () => {
      renderComponent(<DatePicker value="2024-03-30" />)

      const input = screen.queryByRole('textbox') as HTMLInputElement

      await act(() => fireEvent.focus(input))

      const selectedDay = document.body.querySelector(
        '.inf-calendar-item--selected'
      )

      expect(selectedDay).toBeInTheDocument()
      expect(selectedDay).toHaveTextContent('30')

      const month = screen.queryByText('Март')
      const year = screen.queryByText('2024')

      expect(month).toBeInTheDocument()
      expect(year).toBeInTheDocument()
    })
  })
})
