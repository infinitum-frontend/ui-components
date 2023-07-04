import { it, describe, vi, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderComponent } from '../../../../testSetup'
import { Radio, RadioGroup } from '../index'
import { Form } from '../../Form'
import { Button } from '../../Button'

const user = userEvent.setup()

describe('Radio', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(<Radio />)

    expect(el).toMatchSnapshot()
  })

  it('should support disabled', () => {
    renderComponent(<Radio disabled />)

    expect(screen.queryByRole('radio')).toBeDisabled()
    expect(document.querySelector('.inf-radio__box')).toHaveClass(
      'inf-radio__box--disabled'
    )
    expect(document.querySelector('.inf-radio__label')).toHaveClass(
      'inf-radio__label--disabled'
    )
  })

  it('should support checked', () => {
    renderComponent(<Radio checked />)

    expect(screen.queryByRole('radio')).toBeChecked()
  })

  it('should support defaultChecked', () => {
    renderComponent(<Radio defaultChecked />)

    expect(screen.queryByRole('radio')).toBeChecked()
  })

  it('should support onChange', async () => {
    let event
    const onChange = vi.fn((value, e) => {
      event = e
    })

    renderComponent(<Radio onChange={onChange} title={'radio'} />)

    await user.click(screen.queryByTitle('radio') as HTMLLabelElement)
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(true, event)
  })

  it('should support name and value', () => {
    renderComponent(<Radio name={'name'} value={'value'} />)
    expect(screen.queryByRole('radio')).toHaveAttribute('name', 'name')
    expect(screen.queryByRole('radio')).toHaveAttribute('value', 'value')
  })

  it('should support className', () => {
    renderComponent(<Radio className={'custom-class'} title={'radio'} />)
    expect(screen.queryByTitle('radio')).toHaveClass('custom-class inf-radio')
  })

  it('should support required', () => {
    renderComponent(<Radio required={true} />)
    expect(screen.queryByRole('radio')).toBeRequired()
  })
})

describe('Radio in Group', () => {
  it('should support group props', () => {
    renderComponent(
      <RadioGroup
        name={'group'}
        required={true}
        value={'1'}
        onChange={() => null}
      >
        <Radio value={'1'} title={'first'} />
        <Radio value={'2'} title={'second'} />
      </RadioGroup>
    )

    const [first, second] = screen.queryAllByRole('radio')
    expect(first).toBeRequired()
    expect(first).toBeChecked()
    expect(first).toHaveAttribute('name', 'group')

    expect(second).toBeRequired()
    expect(second).not.toBeChecked()
    expect(second).toHaveAttribute('name', 'group')
  })

  it('should trigger group onChange', async () => {
    let event
    const onChange = vi.fn((value, e) => {
      event = e
    })
    renderComponent(
      <RadioGroup name={'group'} required={true} value={''} onChange={onChange}>
        <Radio value={'1'} />
        <Radio value={'2'} />
      </RadioGroup>
    )

    const [first] = screen.queryAllByRole('radio')
    await user.click(first)
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith('1', event)
  })
})

describe('Radio in Form', () => {
  it('should support Form props', async () => {
    renderComponent(
      <Form>
        <Form.Group required customValidationMessage={'error'}>
          <Radio value={'1'} title={'first'} />
        </Form.Group>
        <Button type={'submit'} />
      </Form>
    )

    const radio = screen.queryByRole('radio') as HTMLInputElement
    expect(radio).toBeRequired()
    expect(radio).toHaveAttribute('aria-required', 'true')
    expect(radio).not.toHaveAttribute('aria-invalid')

    await user.click(screen.queryByRole('button') as HTMLButtonElement)
    expect(radio).toHaveAttribute('aria-invalid', 'true')
    expect(radio.validationMessage).toBe('error')

    await user.click(radio)
    expect(radio).not.toHaveAttribute('aria-invalid')
    expect(radio.validationMessage).toBe('')
  })
})
