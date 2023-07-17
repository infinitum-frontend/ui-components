import { describe, expect, it, vi } from 'vitest'
import { act, screen } from '@testing-library/react'
import { Select } from '../index'
import { SelectBaseOptions } from '../fixtures'
import { renderComponent } from '../../../../testSetup'
import { defaultSelectItem } from '../Select'
import userEvent from '@testing-library/user-event'
import { Form } from '../../Form'
import { Button } from '../../Button'
import { TextFieldClasses } from '../../../utils/textFieldClasses'

const title = 'select'
const user = userEvent.setup()

describe('select', () => {
  it('should match snapshot', () => {
    renderComponent(<Select options={SelectBaseOptions} title={title} />)

    expect(screen.queryByTitle(title)).toMatchSnapshot()
  })

  it('should render plain button by default', () => {
    renderComponent(<Select options={SelectBaseOptions} title={title} />)

    expect(screen.queryByTitle(title)).toBeInTheDocument()
    expect(screen.queryAllByRole('option')).toHaveLength(4)
  })

  it('should display default value if no selected', () => {
    renderComponent(<Select options={SelectBaseOptions} title={title} />)

    expect(
      screen.queryByText(defaultSelectItem.label as string)
    ).toBeInTheDocument()
  })

  it('should support className', () => {
    const customClassName = 'customClassName'
    renderComponent(
      <Select
        options={SelectBaseOptions}
        title={title}
        className={customClassName}
      />
    )

    expect(screen.queryByTitle(title)).toHaveClass(customClassName)
  })

  it('should support autoFocus', () => {
    renderComponent(
      <Select options={SelectBaseOptions} title={title} autoFocus={true} />
    )

    const wrapper = screen.queryByTitle(title)
    expect(wrapper).toHaveClass(TextFieldClasses.focused)

    expect(screen.queryAllByRole('listitem')[0]).toBeInTheDocument()
  })

  it('should support value', async () => {
    renderComponent(
      <Select options={SelectBaseOptions} value={1} title={title} />
    )

    const options = screen.queryAllByText(SelectBaseOptions[1].label)
    const select = screen.queryByRole('combobox') as HTMLSelectElement
    expect(options).toHaveLength(2)
    expect(
      options.find((option) => option.tagName === 'BUTTON')
    ).toBeInTheDocument()
    expect(select.value).toBe('1')

    const button = screen.queryByTitle(title) as HTMLButtonElement
    await user.click(button)

    const activeItem = screen.queryAllByRole('listitem')[1]
    expect(activeItem).toHaveClass('inf-select__item--active')
  })

  it('should support disabled', () => {
    renderComponent(
      <Select options={SelectBaseOptions} disabled={true} title={title} />
    )

    const button = screen.queryByTitle(title)
    expect(button).toBeDisabled()
    expect(button).toHaveClass(TextFieldClasses.disabled)
    expect(screen.queryByRole('combobox')).toBeDisabled()
  })

  it('should not display items when disabled', () => {
    renderComponent(
      <Select
        options={SelectBaseOptions}
        disabled={true}
        title={title}
        autoFocus={true}
      />
    )
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should support placeholder', () => {
    renderComponent(
      <Select options={SelectBaseOptions} placeholder={'Placeholder'} />
    )

    expect(screen.queryByText('Placeholder')).toBeInTheDocument()
  })

  it('should support required', () => {
    renderComponent(<Select options={SelectBaseOptions} required={true} />)
    const select = screen.queryByRole('combobox')

    expect(select).toHaveAttribute('required')
    expect(select).toHaveAttribute('aria-required', 'true')
  })

  it('should support status', () => {
    renderComponent(
      <Select options={SelectBaseOptions} status={'error'} title={title} />
    )
    expect(screen.queryByTitle(title)).toHaveClass(
      TextFieldClasses.status.error
    )
  })
})

describe('Select actions', () => {
  it('should display items on button click', async () => {
    renderComponent(<Select options={SelectBaseOptions} title={title} />)
    await user.click(screen.queryByTitle(title) as HTMLButtonElement)

    const list = screen.queryByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('should support focus', () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    act(() => {
      screen.queryByRole('combobox')?.focus()
    })
    expect(screen.queryByRole('button')).toHaveClass(TextFieldClasses.focused)
  })

  it('should support blur', () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    act(() => {
      screen.queryByRole('combobox')?.focus()
    })
    act(() => {
      screen.queryByRole('combobox')?.blur()
    })

    expect(screen.queryByRole('button')).not.toHaveClass(
      'inf-select-button--focused'
    )
  })

  it('should close dropdown and remove focus when click outside', async () => {
    renderComponent(
      <div>
        <Select options={SelectBaseOptions} />
        <a href={''}>link</a>
      </div>
    )
    const button = screen.queryByRole('button') as HTMLButtonElement
    await user.click(button)
    expect(button).toHaveClass(TextFieldClasses.focused)
    expect(screen.queryByRole('list')).toBeInTheDocument()
    await user.click(screen.queryByRole('link') as HTMLElement)

    expect(button).not.toHaveClass(TextFieldClasses.focused)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should support ArrowDown press', async () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    await user.click(button)
    await user.keyboard('{ArrowDown}')

    expect(screen.queryAllByRole('listitem')[1]).toHaveClass(
      'inf-select__item--active'
    )

    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    expect(screen.queryAllByRole('listitem')[0]).toHaveClass(
      'inf-select__item--active'
    )
  })

  it('should support ArrowUp press', async () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    await user.click(button)
    await user.keyboard('{ArrowUp}')

    expect(screen.queryAllByRole('listitem')[2]).toHaveClass(
      'inf-select__item--active'
    )

    await user.keyboard('{ArrowUp}')
    expect(screen.queryAllByRole('listitem')[1]).toHaveClass(
      'inf-select__item--active'
    )
  })

  it('should support Esc press', async () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    await user.click(button)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should support Space press', async () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    act(() => {
      button.focus()
    })
    await user.keyboard(' ')

    expect(screen.queryByRole('list')).toBeInTheDocument()
  })

  it('should support Enter press', async () => {
    const onChange = vi.fn()
    renderComponent(<Select options={SelectBaseOptions} onChange={onChange} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    act(() => {
      button.focus()
    })

    await user.keyboard('{Enter}')
    expect(screen.queryByRole('list')).toBeInTheDocument()

    await user.keyboard('{Enter}')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(SelectBaseOptions[0])
  })

  it('should support Tab press', async () => {
    const user = userEvent.setup()
    renderComponent(<Select options={SelectBaseOptions} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    await user.tab()
    expect(button).toHaveClass(TextFieldClasses.focused)
    await user.tab()
    expect(button).not.toHaveClass(TextFieldClasses.focused)

    await user.click(button)
    await user.tab()
    expect(button).toHaveClass(TextFieldClasses.focused)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    await user.tab()
    expect(button).not.toHaveClass(TextFieldClasses.focused)
  })
})

describe('Select Items', () => {
  it('should select proper item on click', async () => {
    const onChange = vi.fn()
    renderComponent(<Select options={SelectBaseOptions} onChange={onChange} />)

    await user.click(screen.queryByRole('button') as HTMLButtonElement)

    await user.click(screen.queryAllByRole('listitem')[1])
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(SelectBaseOptions[1])
  })

  it('should preserve focus on item click', async () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    const button = screen.queryByRole('button') as HTMLButtonElement
    await user.click(button)
    await user.click(screen.queryAllByRole('listitem')[0])

    expect(button).toHaveClass(TextFieldClasses.focused)
    expect(document.activeElement).toHaveClass('inf-select')
  })

  it('should set active on Mouseover', async () => {
    renderComponent(<Select options={SelectBaseOptions} />)
    await user.click(screen.queryByRole('button') as HTMLButtonElement)

    const item = screen.queryAllByRole('listitem')[1]
    await user.hover(item)
    expect(item).toHaveClass('inf-select__item--active')
  })
})

describe('Select in Form', () => {
  it('should apply attrs if FormGroup is required', async () => {
    const { rerender } = renderComponent(
      <Form>
        <Form.Group required customValidationMessage={'Error'}>
          <Select options={SelectBaseOptions} title={title} />
        </Form.Group>

        <Button title={'submit'} type={'submit'} />
      </Form>
    )

    const select = screen.queryByRole('combobox') as HTMLSelectElement
    expect(select).toHaveAttribute('required')
    expect(select).toHaveAttribute('aria-required', 'true')
    expect(select).not.toHaveAttribute('aria-invalid')
    expect(select).toHaveAttribute('id')

    await user.click(screen.queryByTitle('submit') as HTMLButtonElement)
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select.validationMessage).toBe('Error')

    await user.click(screen.queryByTitle(title) as HTMLButtonElement)
    await user.click(screen.queryAllByRole('listitem')[0])

    rerender(
      <Form>
        <Form.Group required>
          <Select options={SelectBaseOptions} title={title} value={0} />
        </Form.Group>

        <Button title={'submit'} type={'submit'} />
      </Form>
    )

    expect(select).not.toHaveAttribute('aria-invalid')
    expect(select.validationMessage).toBe('')
  })

  it('should not close on label click', async () => {
    renderComponent(
      <Form>
        <Form.Group required customValidationMessage={'Error'}>
          <Form.Label role={'label'}>Label</Form.Label>
          <Select options={SelectBaseOptions} title={title} />
        </Form.Group>

        <Button title={'submit'} type={'submit'} />
      </Form>
    )

    await user.click(screen.queryByTitle(title) as HTMLButtonElement)
    await user.click(screen.queryByRole('label') as HTMLLabelElement)

    expect(screen.queryByRole('list')).toBeInTheDocument()
  })
})
