import { describe, it, expect, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { act, screen } from '@testing-library/react'
import { DatePicker, NativeDatePicker, DatePickerInline } from '../index'
import userEvent from '@testing-library/user-event'
import { Form } from '../../Form'
import { Button } from '../../Button'
const user = userEvent.setup()

describe('NativeDatePicker', () => {
  it('should match snapshop', () => {
    renderComponent(<NativeDatePicker />)
    expect(screen.queryByRole('calendar')).toMatchSnapshot()
  })

  it('should support type', () => {
    renderComponent(<NativeDatePicker type={'week'} />)
    expect(screen.queryByRole('calendar')).toHaveAttribute('type', 'week')
  })

  it('should support onChange', async () => {
    const onChange = vi.fn()
    renderComponent(<NativeDatePicker onChange={onChange} />)

    act(() => (screen.queryByRole('calendar') as HTMLInputElement).focus())
    await user.keyboard('1984-09-14')

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('should support value', () => {
    renderComponent(<NativeDatePicker value={'1984-09-14'} />)
    expect(screen.queryByRole('calendar')).toHaveValue('1984-09-14')
  })

  it('should support className', () => {
    renderComponent(<NativeDatePicker className={'custom-class'} />)
    expect(screen.queryByRole('calendar')).toHaveClass(
      'custom-class inf-native-datepicker'
    )
  })

  it('should support required and id', () => {
    renderComponent(<NativeDatePicker required={true} id={'calendar'} />)
    expect(screen.queryByRole('calendar')).toBeRequired()
    expect(screen.queryByRole('calendar')).toHaveAttribute('id', 'calendar')
  })
})

describe('Datepicker in Form', () => {
  it('should support attributes', async () => {
    const errorMessage = 'Ошибка валидации'
    renderComponent(
      <Form>
        <Form.Group required customValidationMessage={errorMessage}>
          <NativeDatePicker />
        </Form.Group>
        <Button type={'submit'} />
      </Form>
    )

    const datepicker = screen.queryByRole('calendar') as HTMLTextAreaElement

    expect(datepicker).toHaveAttribute('id')
    expect(datepicker).toHaveAttribute('required')
    expect(datepicker).toHaveAttribute('aria-required', 'true')
    expect(datepicker).toHaveAttribute('aria-invalid', 'false')

    await user.click(screen.queryByRole('button') as HTMLButtonElement)

    expect(datepicker).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText(errorMessage)).toBeInTheDocument()

    act(() => {
      datepicker.focus()
    })
    await user.keyboard('1984-09-14')

    expect(datepicker).toHaveAttribute('aria-invalid', 'false')
    expect(datepicker.validationMessage).toBe('')
  })
})

describe('should support withTodayButton prop', () => {
  it('should render today button if withTodayButton prop is passed', async () => {
    renderComponent(<DatePicker withTodayButton={true} />)

    const user = userEvent.setup()
    const input = screen.queryByRole('textbox') as HTMLInputElement
    await user.click(input)

    expect(screen.queryByText('Сегодня')).toBeInTheDocument()
  })

  it('should render today button if withTodayButton prop is passed to InlineDatePicker', () => {
    renderComponent(<DatePickerInline withTodayButton={true} />)
    expect(screen.queryByText('Сегодня')).toBeInTheDocument()
  })
})
