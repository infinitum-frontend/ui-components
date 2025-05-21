import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { TextFieldClasses } from '../../../utils/textFieldClasses'
import { Button } from '../../Button'
import { Form } from '../../Form'
import { Select } from '../index'
import { SelectBaseOptions } from '../utils/fixtures'

const title = 'select'
const user = userEvent.setup()

describe('select', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      renderComponent(<Select options={SelectBaseOptions} />)

      expect(screen.queryByRole('button')).toMatchSnapshot()
    })

    it('should render plain button by default', () => {
      renderComponent(<Select options={SelectBaseOptions} title={title} />)

      expect(screen.queryByRole('button')).toBeInTheDocument()
    })

    it('should have native select with options', () => {
      renderComponent(<Select options={SelectBaseOptions} title={title} />)
      // with default item
      expect(screen.queryByRole('combobox')).toBeInTheDocument()
      expect(screen.queryAllByRole('option')).toHaveLength(
        SelectBaseOptions.length + 1
      )
    })

    // it('should display default value if no selected', () => {
    //   renderComponent(<Select options={SelectBaseOptions} title={title} />)

    //   expect(screen.queryByText(defaultSelectItem.label)).toBeInTheDocument()
    // })

    it('should support className', () => {
      const customClassName = 'customClassName'
      renderComponent(
        <Select options={SelectBaseOptions} className={customClassName} />
      )

      expect(screen.queryByRole('button')).toHaveClass(customClassName)
      expect(screen.queryByRole('button')).toHaveClass('inf-select')
    })

    it('should support autoFocus', () => {
      renderComponent(<Select options={SelectBaseOptions} autoFocus={true} />)

      const wrapper = screen.queryByRole('button')
      expect(wrapper).toHaveClass(TextFieldClasses.focused)

      expect(screen.queryAllByRole('listitem')[0]).toBeInTheDocument()
    })

    it('should support value', async () => {
      renderComponent(<Select options={SelectBaseOptions} value={1} />)

      const wrapper = screen.queryByRole('button')
      const select = screen.queryByRole('combobox') as HTMLSelectElement

      expect(wrapper).toHaveTextContent(SelectBaseOptions[1].label)
      expect(select.value).toBe('1')
    })

    it('should have check icon on selected option in single mode', async () => {
      renderComponent(<Select options={SelectBaseOptions} value={1} />)
      const button = screen.getByRole('button')
      await act(async () => await user.click(button))
      // TODO: не работает IDD-653
      setTimeout(() => {
        const options = screen.queryAllByRole('listitem')
        const targetOption = options[1]
        const checkIcon = within(targetOption).getByTestId('check-icon')
        expect(checkIcon).not.toBeNull()
      }, 100)
    })
    // TODO:
    // it('should have checked checkbox for selected options in multiple mode', async () => {
    //   renderComponent(<Select options={SelectBaseOptions} value={1} />)
    //   const button = screen.queryByRole('button') as HTMLButtonElement
    //   await act(async () => await user.click(button))

    //   const activeItem = screen.queryAllByRole('listitem')[1]
    //   expect(activeItem).toHaveClass('inf-select__item--active')
    // })

    it('should support disabled', () => {
      renderComponent(
        <Select options={SelectBaseOptions} disabled title={title} />
      )

      const button = screen.queryByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass(TextFieldClasses.disabled)
      // native select also disabled
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
      expect(select).toHaveAttribute('required')
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
      renderComponent(<Select options={SelectBaseOptions} />)
      await user.click(screen.queryByRole('button') as HTMLButtonElement)

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
      // TODO: починить фокус и blur в компоненте
      expect(button).toHaveClass(TextFieldClasses.focused)
      expect(screen.queryByRole('list')).toBeInTheDocument()
      await user.click(screen.queryByRole('link') as HTMLElement)

      expect(button).not.toHaveClass(TextFieldClasses.focused)
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    // it('should support ArrowDown press', async () => {
    //   renderComponent(<Select options={SelectBaseOptions} />)
    //   const button = screen.queryByRole('button') as HTMLButtonElement
    //   await user.click(button)
    //   await user.keyboard('{ArrowDown}')

    //   expect(screen.queryAllByRole('listitem')[1]).toHaveClass(
    //     'inf-select__item--active'
    //   )

    //   await user.keyboard('{ArrowDown}')
    //   await user.keyboard('{ArrowDown}')
    //   expect(screen.queryAllByRole('listitem')[0]).toHaveClass(
    //     'inf-select__item--active'
    //   )
    // })

    // it('should support ArrowUp press', async () => {
    //   renderComponent(<Select options={SelectBaseOptions} />)
    //   const button = screen.queryByRole('button') as HTMLButtonElement
    //   await user.click(button)
    //   await user.keyboard('{ArrowUp}')

    //   expect(screen.queryAllByRole('listitem')[2]).toHaveClass(
    //     'inf-select__item--active'
    //   )

    //   await user.keyboard('{ArrowUp}')
    //   expect(screen.queryAllByRole('listitem')[1]).toHaveClass(
    //     'inf-select__item--active'
    //   )
    // })

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

    // it('should support Enter press', async () => {
    //   const onChange = vi.fn()
    //   renderComponent(
    //     <Select options={SelectBaseOptions} onChange={onChange} />
    //   )
    //   const button = screen.queryByRole('button') as HTMLButtonElement
    //   act(() => {
    //     button.focus()
    //   })

    //   await user.keyboard('{Enter}')
    //   expect(screen.queryByRole('list')).toBeInTheDocument()

    //   await user.keyboard('{Enter}')
    //   expect(screen.queryByRole('list')).not.toBeInTheDocument()
    //   expect(onChange).toHaveBeenCalledTimes(1)
    //   expect(onChange).toHaveBeenCalledWith(SelectBaseOptions[0])
    // })

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
      renderComponent(
        <Select options={SelectBaseOptions} onChange={onChange} />
      )

      await user.click(screen.queryByRole('button') as HTMLButtonElement)

      await user.click(screen.queryAllByRole('listitem')[1])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(SelectBaseOptions[1])
    })
    // TODO: починить handleBlur
    it('should preserve focus on item click', async () => {
      renderComponent(<Select options={SelectBaseOptions} />)
      const button = screen.queryByRole('button') as HTMLButtonElement
      await user.click(button)
      await user.click(screen.queryAllByRole('listitem')[0])

      expect(button).toHaveClass(TextFieldClasses.focused)
      expect(document.activeElement).toHaveClass('inf-select')
    })
    // TODO: keyboard navigation
    // it('should set active on Mouseover', async () => {
    //   renderComponent(<Select options={SelectBaseOptions} />)
    //   await user.click(screen.queryByRole('button') as HTMLButtonElement)

    //   const item = screen.queryAllByTestId('option')[1]
    //   await user.hover(item)
    //   expect(item).toHaveClass('inf-select__item--active')
    // })
  })

  describe('Select in Form', () => {
    it('should support html attributes when not in form', () => {
      const onInvalid = vi.fn()
      renderComponent(
        <Select
          options={SelectBaseOptions}
          required
          aria-required="true"
          aria-invalid="true"
          id="test"
          onInvalid={onInvalid}
        />
      )

      const select = screen.queryByRole('combobox') as HTMLSelectElement
      const selectWrapper = screen.queryByRole('button')
      expect(select).toHaveAttribute('required')
      expect(select).toHaveAttribute('aria-required')
      expect(select).toHaveAttribute('aria-invalid')
      expect(selectWrapper).toHaveAttribute('id', 'test')

      select.reportValidity()
      expect(onInvalid).toHaveBeenCalled()
    })

    it('should support form context props', () => {
      renderComponent(
        <Form disabled>
          <Select options={SelectBaseOptions} />
        </Form>
      )

      const selectWrapper = screen.queryByRole('button') as HTMLButtonElement
      const select = screen.queryByRole('combobox') as HTMLTextAreaElement

      expect(selectWrapper).toBeDisabled()
      expect(select).toBeDisabled()
    })

    it('should support formGroup context props', () => {
      renderComponent(
        <Form>
          <Form.Group required>
            <Select options={SelectBaseOptions} />
          </Form.Group>
        </Form>
      )

      const select = screen.queryByRole('combobox') as HTMLSelectElement
      expect(select).toHaveAttribute('required')
      expect(select).toHaveAttribute('id')
      expect(select).toHaveAttribute('aria-required')

      act(() => {
        select.reportValidity()
      })

      expect(select).toHaveAttribute('aria-invalid')
    })
    // TODO: добавить conrolled обработку value + onChange
    it('should call form control handlers', async () => {
      const errorMessage = 'Введите значение'

      const { el } = renderComponent(
        <Form>
          <Form.Group required customValidationMessage={errorMessage}>
            <Select options={SelectBaseOptions} />
          </Form.Group>
        </Form>
      )

      act(() => {
        const form = el as HTMLFormElement
        form.requestSubmit()
      })

      const select = screen.queryByRole('combobox') as HTMLSelectElement
      const errorEl = screen.queryByText(errorMessage)
      expect(errorEl).toBeTruthy()
      expect(select).toBeInvalid()

      await user.click(screen.queryByRole('button') as HTMLButtonElement)

      await user.click(screen.queryAllByRole('listitem')[1])

      expect(select).not.toHaveAttribute('aria-invalid')
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
})
