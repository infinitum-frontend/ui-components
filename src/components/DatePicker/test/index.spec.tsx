import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { DatePicker } from '../index'

describe('Clear', () => {
  it('should have clear button on hover', async () => {
    renderComponent(<DatePicker clearable value="2020-04-20" />)

    const datePicker = screen.queryByRole('textbox') as HTMLInputElement

    const clearButtonBeforeHover = screen.queryByRole('button', {
      name: 'Очистить значение'
    })
    expect(clearButtonBeforeHover).toBeNull()

    fireEvent.mouseEnter(datePicker)

    const clearButtonAfterHover = screen.queryByRole('button', {
      name: 'Очистить значение'
    })
    expect(clearButtonAfterHover).toBeInTheDocument()
  })

  it('should not have clear button when value is empty', async () => {
    renderComponent(<DatePicker clearable />)

    const datePicker = screen.queryByRole('textbox') as HTMLInputElement

    fireEvent.mouseEnter(datePicker)

    const clearButton = screen.queryByRole('button', {
      name: 'Очистить значение'
    })

    expect(clearButton).toBeNull()
  })

  it('should not have clear button when clearable prop is not provided', async () => {
    renderComponent(<DatePicker value="2020-04-20" />)

    const datePicker = screen.queryByRole('textbox') as HTMLInputElement

    fireEvent.mouseEnter(datePicker)

    const clearButton = screen.queryByRole('button', {
      name: 'Очистить значение'
    })

    expect(clearButton).toBeNull()
  })
})
