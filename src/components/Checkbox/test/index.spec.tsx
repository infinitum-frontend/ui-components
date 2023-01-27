import { describe, it, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { Checkbox } from '../index'
import userEvent from '@testing-library/user-event'

describe('Checkbox', () => {
  const user = userEvent.setup()
  it('should render', () => {
    const { el } = renderComponent(<Checkbox />)
    const input = el.querySelector('input')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('inf-checkbox')
    expect(input).toHaveProperty('type', 'checkbox')
  })

  it('should match snapshop', () => {
    const { el } = renderComponent(<Checkbox />)
    expect(el).toMatchSnapshot()
  })

  it('should be unchecked by default', () => {
    renderComponent(<Checkbox />)
    const input = document.querySelector('input')
    expect(input).toHaveProperty('checked', false)
  })

  it('should support uncontrolled variant', async () => {
    const { el } = renderComponent(<Checkbox defaultChecked={true} />)
    const input = el.querySelector('input')
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
      <Checkbox checked={true} onChange={onChange} />
    )
    const input = el.querySelector('input')
    expect(input).toHaveProperty('checked', true)
    await user.click(el)
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(checked, event)
  })

  // TODO: обратиться в vitest за поддержкой. Или в svgr?
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
    const { el } = renderComponent(<Checkbox name={'Name'} value={'Value'} />)
    const input = el.querySelector('input')
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
      <Checkbox inputProps={{ 'aria-checked': 'false' }}>Label</Checkbox>
    )
    const input = el.querySelector('input')

    expect(input).toHaveAttribute('aria-checked', 'false')
  })
})
