import { describe, it, expect, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { act, screen } from '@testing-library/react'
import { NativeDatePicker } from '../index'
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

    act(() => {
      ;(screen.queryByRole('calendar') as HTMLInputElement).focus()
    })
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
      'custom-class inf-datepicker'
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
    renderComponent(
      <Form>
        <Form.Group required customValidationMessage={'error'}>
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
    expect(datepicker.validationMessage).toBe('error')

    act(() => {
      datepicker.focus()
    })
    await user.keyboard('1984-09-14')

    expect(datepicker).toHaveAttribute('aria-invalid', 'false')
    expect(datepicker.validationMessage).toBe('')
  })
})
