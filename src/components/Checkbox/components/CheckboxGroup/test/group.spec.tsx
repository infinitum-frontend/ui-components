import { describe, it, vi } from 'vitest'
import { renderComponent } from '../../../../../../testSetup'
import { Checkbox } from '../../../index'

import userEvent from '@testing-library/user-event'

describe('group', () => {
  const user = userEvent.setup()
  it('should match snapshot', function () {
    const { el } = renderComponent(
      <Checkbox.Group>
        <Checkbox>Label 1</Checkbox>
        <Checkbox>Label 2</Checkbox>
      </Checkbox.Group>
    )

    expect(el).toMatchSnapshot()
  })

  it('should support className', () => {
    const { el } = renderComponent(
      <Checkbox.Group className={'custom-class'}>
        <Checkbox>Label 1</Checkbox>
        <Checkbox>Label 2</Checkbox>
      </Checkbox.Group>
    )
    expect(el).toHaveClass('custom-class')
    expect(el).toHaveClass('inf-checkbox-group')
  })

  it('should be vertical by default', () => {
    const { el } = renderComponent(
      <Checkbox.Group>
        <Checkbox>Label 1</Checkbox>
        <Checkbox>Label 2</Checkbox>
      </Checkbox.Group>
    )

    expect(el).toHaveClass('inf-checkbox-group--direction-vertical')
  })

  it('should support value', () => {
    const { el } = renderComponent(
      <Checkbox.Group value={['1']}>
        <Checkbox value={'0'}>Label 1</Checkbox>
        <Checkbox value={'1'}>Label 2</Checkbox>
      </Checkbox.Group>
    )

    const checkboxList = el.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    )
    const checkbox = Array.from(checkboxList).find(
      (item) => item?.value === '1'
    )
    expect(checkbox).toHaveProperty('checked', true)
  })

  it('should call onChange with proper value', async () => {
    let checkedList
    const onChange = vi.fn((value) => (checkedList = value))
    const { el, rerender } = renderComponent(
      <Checkbox.Group onChange={onChange}>
        <Checkbox value={'0'}>Label 1</Checkbox>
        <Checkbox value={'1'}>Label 2</Checkbox>
      </Checkbox.Group>
    )
    await user.click(el.firstChild)
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(checkedList)

    rerender(
      <Checkbox.Group onChange={onChange} value={['0']}>
        <Checkbox value={'0'}>Label 1</Checkbox>
        <Checkbox value={'1'}>Label 2</Checkbox>
      </Checkbox.Group>
    )
    await user.click(el.firstChild)
    expect(onChange).toBeCalledTimes(2)
    expect(checkedList.length).toBe(0)
    expect(onChange).toBeCalledWith(checkedList)
  })
})
