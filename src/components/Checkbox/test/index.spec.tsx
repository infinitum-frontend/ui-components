import { describe, it, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { Checkbox } from '../index'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Form } from '../../Form'
import { Button } from '../../Button'
import { act } from '@testing-library/react'

const wrapperTitle = 'wrapper'
const inputTitle = 'control'
const user = userEvent.setup()

describe('Checkbox', () => {
  it('should render', () => {
    renderComponent(
      <Checkbox inputProps={{ title: inputTitle }} title={wrapperTitle} />
    )

    const wrapper = screen.queryByTitle(wrapperTitle)
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('inf-checkbox')
    expect(screen.queryByTitle(inputTitle)).toHaveProperty('type', 'checkbox')
  })

  it('should match snapshop', () => {
    const { el } = renderComponent(<Checkbox />)
    expect(el).toMatchSnapshot()
  })

  it('should be unchecked by default', () => {
    renderComponent(<Checkbox inputProps={{ title: inputTitle }} />)
    expect(screen.queryByTitle(inputTitle)).toHaveProperty('checked', false)
  })

  it('should support uncontrolled variant', async () => {
    const { el } = renderComponent(
      <Checkbox defaultChecked={true} inputProps={{ title: inputTitle }} />
    )
    const input = screen.queryByTitle(inputTitle)
    expect(input).toHaveProperty('checked', true)
    await user.click(el)
    expect(input).toHaveProperty('checked', false)
    await user.click(el)
    expect(input).toHaveProperty('checked', true)
  })

  it('should support controlled variant', async () => {
    let checked
    let event
    const onChange = vi.fn((value, e) => {
      checked = value
      event = e
    })
    const { el } = renderComponent(
      <Checkbox
        checked={true}
        onChange={onChange}
        inputProps={{ title: inputTitle }}
      />
    )

    expect(screen.queryByTitle(inputTitle)).toHaveProperty('checked', true)
    await user.click(el)
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(checked, event)
  })

  // it('should show icon on checked', () => {
  //   const { el } = renderComponent<CheckboxProps>(Checkbox, {
  //     defaultChecked: true
  //   })
  //
  //   const icon = el.querySelector('svg')
  //   console.log(getComputedStyle(icon))
  //   expect(icon).toBeVisible()
  //   expect(icon).toHaveStyle('visibility: visible')
  // })

  it('should support indeterminate', () => {
    const { el } = renderComponent(<Checkbox indeterminate={true} />)
    const box = el.querySelector('.inf-checkbox__box')
    expect(box).toHaveClass('inf-checkbox__box--indeterminate')
  })

  it('should support disabled', async () => {
    const onChange = vi.fn()
    const { el } = renderComponent(
      <Checkbox disabled={true} onChange={onChange}>
        Label
      </Checkbox>
    )
    const box = el.querySelector('.inf-checkbox__box')
    const input = el.querySelector('input')
    expect(input).toBeDisabled()
    expect(box).toHaveClass('inf-checkbox__box--disabled')
    expect(el).toHaveClass('inf-checkbox--disabled')

    await user.click(el).catch(() => {})
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  it('should support name and value', () => {
    renderComponent(
      <Checkbox
        name={'Name'}
        value={'Value'}
        inputProps={{ title: inputTitle }}
      />
    )
    const input = screen.queryByTitle(inputTitle)
    expect(input).toHaveAttribute('name', 'Name')
    expect(input).toHaveAttribute('value', 'Value')
  })

  it('should support className', () => {
    const { el } = renderComponent(<Checkbox className={'custom-class'} />)
    expect(el).toHaveClass('custom-class')
    expect(el).toHaveClass('inf-checkbox')
  })

  it('should render children', () => {
    const { el } = renderComponent(<Checkbox>Label</Checkbox>)
    expect(el).toContainHTML('Label')
  })

  it('should support basic inputProps', () => {
    const { el } = renderComponent(
      <Checkbox inputProps={{ accept: 'test' }}>Label</Checkbox>
    )
    const input = el.querySelector('input')

    expect(input).toHaveAttribute('accept', 'test')
  })

  it('should set ariaRequired if required prop is passed', () => {
    renderComponent(<Checkbox required inputProps={{ title: inputTitle }} />)

    expect(screen.queryByTitle(inputTitle)).toHaveAttribute(
      'aria-required',
      'true'
    )
  })
})

describe('CheckboxForm', () => {
  it('should support formContext', async () => {
    renderComponent(
      <Form>
        <Form.Group required customValidationMessage="Error">
          <Checkbox inputProps={{ title: inputTitle }} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    )

    const input = screen.queryByTitle(inputTitle) as HTMLInputElement
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('aria-required', 'true')

    await act(async () => {
      await user.click(screen.queryByText('Submit') as HTMLElement)
    })

    expect(screen.queryByText('Error')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')

    await act(async () => {
      await user.click(input)
    })

    expect(input.validationMessage).toBe('')
    expect(input).not.toHaveAttribute('aria-invalid')
  })
})
