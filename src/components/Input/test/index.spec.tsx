import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { TextFieldClasses } from '../../../utils/textFieldClasses'
import { Form } from '../../Form'
import { Input } from '../index'

describe('input', () => {
  const user = userEvent.setup({})
  describe('render', () => {
    it('should render wrapper', () => {
      const { el } = renderComponent(<Input />)

      expect(el).toBeDefined()
      expect(el).toHaveClass('inf-input-wrapper')
    })

    it('should contain input element', () => {
      const { el } = renderComponent(<Input />)

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(el).toContainElement(input)
    })

    it('should not contain anything except input without additional props', () => {
      const { el } = renderComponent(<Input />)

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(el).toContainHTML(input.outerHTML)
    })

    it('matches snapshot', () => {
      const { el } = renderComponent(<Input />)
      expect(el).toMatchSnapshot()
    })
  })

  describe('className', () => {
    it('should apply custom classname on input wrapper', () => {
      const { el } = renderComponent(<Input className={'custom-class'} />)
      expect(el.className).toContain('custom-class')
      expect(el.className).toContain('inf-input-wrapper')
    })
  })

  describe('style', () => {
    it('should apply style on input wrapper', () => {
      const { el } = renderComponent(
        <Input style={{ width: '100%', borderRadius: '12px' }} />
      )
      expect(el).toHaveStyle({ width: '100%', borderRadius: '12px' })
    })
  })

  describe('size', () => {
    it('should have medium size by default', () => {
      const { el } = renderComponent(<Input />)
      expect(el.className).toContain(TextFieldClasses.size.medium)
    })

    it('should support size', () => {
      const { el } = renderComponent(<Input size="small" />)
      expect(el.className).toContain(TextFieldClasses.size.small)
    })
  })

  describe('uncontrolled input', () => {
    it('should be uncontrolled by default', async () => {
      renderComponent(<Input />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      await user.type(input, 'Акции')
      expect(input).toHaveValue('Акции')
    })

    it('should support defaultValue', () => {
      renderComponent(<Input defaultValue="Акции" />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveValue('Акции')
    })

    it('should prefer defaultValue over value', async () => {
      renderComponent(<Input defaultValue="Акции" value="Облигации" />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveValue('Акции')
    })
  })

  describe('value', () => {
    it('should apply value on input', () => {
      renderComponent(<Input value={'Акции'} />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveValue('Акции')
    })
  })

  describe('events', () => {
    it('should support onInput', async () => {
      let eventValue
      let eventType
      const onInput = vi.fn((value, e) => {
        eventValue = value
        eventType = e.type
      })

      renderComponent(<Input onInput={onInput} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement
      await user.type(input, 'hello')

      expect(onInput).toHaveBeenCalledTimes(5)
      expect(eventValue).toBe('hello')
      expect(eventType).toBe('change')
    })

    it('should support onChange', async () => {
      let eventValue
      let eventType

      const onChange = vi.fn((value, e) => {
        eventValue = value
        eventType = e.type
      })

      renderComponent(<Input onChange={onChange} />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      await user.type(input, 'hello')

      expect(onChange).toHaveBeenCalledTimes(5)
      expect(eventValue).toBe('hello')
      expect(eventType).toBe('change')
    })

    it('should support onBlur', () => {
      let event
      const onBlur = vi.fn((e) => {
        event = e
      })

      renderComponent(<Input onBlur={onBlur} />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      fireEvent.blur(input)

      expect(onBlur).toHaveBeenCalledOnce()
      expect(onBlur).toBeCalledWith(event)
    })

    it('should support onFocus', () => {
      let event
      const onFocus = vi.fn((e) => {
        event = e
      })
      renderComponent(<Input onFocus={onFocus} />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      fireEvent.focus(input)

      expect(onFocus).toHaveBeenCalledOnce()
      expect(onFocus).toHaveBeenCalledWith(event)
    })
  })

  describe('formatter', () => {
    const defaultValue = 'облигации'

    it('should transform value', () => {
      renderComponent(
        <Input
          formatter={(value) => value?.toUpperCase()}
          value={defaultValue}
        />
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveValue(defaultValue.toUpperCase())
    })

    it('should emit transformed value', async () => {
      let eventValue
      const onInput = vi.fn((value) => {
        eventValue = value
      })

      renderComponent(
        <Input formatter={(value) => value?.toUpperCase()} onInput={onInput} />
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement

      await user.type(input, defaultValue)

      expect(onInput).toBeCalledTimes(defaultValue.length)
      expect(eventValue).toBe(defaultValue.toUpperCase())
    })
  })

  describe('placeholder', () => {
    const defaultPlaceholder = 'Введите значение'

    it('should be applied', () => {
      renderComponent(<Input placeholder={defaultPlaceholder} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input.placeholder).toBe(defaultPlaceholder)
    })

    it('should be empty on focused input', () => {
      renderComponent(<Input placeholder={defaultPlaceholder} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement

      fireEvent.focus(input)
      expect(input.placeholder).toBe('')
    })
  })

  describe('border', () => {
    it('should be regular by default', async () => {
      const { el } = renderComponent(<Input />)
      expect(el).toHaveClass(TextFieldClasses.borderRadius.regular)
      expect(el).toHaveStyle('border-radius: var(--inf-border-radius-small);')
    })

    it('should support noBorder', () => {
      const { el } = renderComponent(<Input noBorder={true} />)
      expect(el).toHaveClass(TextFieldClasses.noBorder)
      expect(el).toHaveStyle({ border: 'none' })
    })
  })

  describe('disabled', () => {
    it('should be passed to native input', () => {
      renderComponent(<Input disabled={true} />)
      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveProperty('disabled')
    })

    it('should apply on wrapper', () => {
      const { el } = renderComponent(<Input disabled={true} />)
      expect(el).toHaveClass(TextFieldClasses.disabled)
    })

    //  TODO: add test to wrapper class on native input disabled state.(case: form fieldset disabled)
  })

  describe('status', () => {
    it('should support', () => {
      const { el } = renderComponent(<Input status={'error'} />)
      expect(el).toHaveClass(TextFieldClasses.status.error)
      expect(el).toHaveStyle({ borderColor: 'var(--inf-color-primary);' })
    })
  })

  describe('clear button', () => {
    it('should be visible when prop is passed', async () => {
      // TODO: доработать тест, так как теперь кнопку очистки показываем только при ховере
      const { el } = renderComponent(<Input allowClear={true} />)
      const clearButton = el.querySelector(
        '.inf-input-wrapper__clear-button'
      ) as HTMLSpanElement

      expect(clearButton).toBeInTheDocument()
      expect(clearButton).toBeVisible()
    })

    it('should focus input after click', async () => {
      const { el } = renderComponent(
        <Input allowClear={true} value={'Облигации'} />
      )
      const clearButton = el.querySelector(
        '.inf-input-wrapper__clear-button'
      ) as HTMLSpanElement

      const input = screen.queryByRole('textbox') as HTMLInputElement
      await user.click(clearButton)

      expect(el).toHaveClass(TextFieldClasses.focused)
      expect(input).toHaveFocus()
    })

    it('should not work on disabled', async () => {
      const onClear = vi.fn()
      const { el } = renderComponent(
        <Input
          allowClear={true}
          value={'Облигации'}
          onClear={onClear}
          disabled={true}
        />
      )

      const clearButton = el.querySelector(
        '.inf-input-wrapper__clear-button'
      ) as HTMLSpanElement

      await user.hover(clearButton).catch((error) => {
        return error
      })
      expect(onClear).toHaveBeenCalledTimes(0)
    })

    it('should call onClear event when clicked', async () => {
      const onClear = vi.fn()
      const { el } = renderComponent(
        <Input allowClear={true} value={'Облигации'} onClear={onClear} />
      )
      const clearButton = el.querySelector(
        '.inf-input-wrapper__clear-button'
      ) as HTMLSpanElement

      await user.click(clearButton)

      expect(onClear).toHaveBeenCalled()
    })
  })

  describe('prefix', () => {
    it('should render', () => {
      const prefixNode = <span>prefix</span>
      const { el } = renderComponent(<Input prefix={prefixNode} />)
      expect(el).toContainHTML('<span>prefix</span>')
    })

    it('should support click handler', async () => {
      const prefixNode = <span>prefix</span>
      const onPrefixClick = vi.fn()

      renderComponent(
        <Input prefix={prefixNode} onPrefixClick={onPrefixClick} />
      )

      const prefixEl = screen.getByText('prefix')

      await user.click(prefixEl)

      expect(onPrefixClick).toHaveBeenCalled()
    })
  })

  describe('postfix', () => {
    it('should render', () => {
      const postfixNode = <span>postfix</span>
      const { el } = renderComponent(<Input postfix={postfixNode} />)
      expect(el).toContainHTML('<span>postfix</span>')
    })

    it('should support click handler', async () => {
      const postfixNode = <span>postfix</span>
      const onPostfixClick = vi.fn()

      renderComponent(
        <Input postfix={postfixNode} onPostfixClick={onPostfixClick} />
      )

      const postfixEl = screen.getByText('postfix')

      await user.click(postfixEl)

      expect(onPostfixClick).toHaveBeenCalled()
    })
  })

  describe('Form', () => {
    it('should support html attributes when not in form', () => {
      const onInvalid = vi.fn()
      renderComponent(
        <Input
          required
          aria-required="true"
          aria-invalid="true"
          id="test"
          onInvalid={onInvalid}
        />
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('aria-required')
      expect(input).toHaveAttribute('aria-invalid')
      expect(input).toHaveAttribute('id', 'test')

      input.reportValidity()
      expect(onInvalid).toHaveBeenCalled()
    })

    it('should support form context props', () => {
      renderComponent(
        <Form disabled>
          <Input />
        </Form>
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement

      expect(input).toHaveAttribute('disabled')
    })

    it('should support formGroup context props', () => {
      renderComponent(
        <Form>
          <Form.Group required>
            <Input />
          </Form.Group>
        </Form>
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('id')
      expect(input).toHaveAttribute('aria-required')

      act(() => {
        input.reportValidity()
      })

      expect(input).toHaveAttribute('aria-invalid')
    })

    it('should call form control handlers', async () => {
      const errorMessage = 'Введите значение'

      const { el } = renderComponent(
        <Form>
          <Form.Group required customValidationMessage={errorMessage}>
            <Input />
          </Form.Group>
        </Form>
      )

      act(() => {
        const form = el as HTMLFormElement
        form.requestSubmit()
      })

      const input = screen.queryByRole('textbox') as HTMLInputElement
      const errorEl = screen.queryByText(errorMessage)
      expect(errorEl).toBeTruthy()
      expect(input).toBeInvalid()

      await user.type(input, 'test')

      expect(input).toBeValid()
    })

    it('validation should fired only on invalid event', async () => {
      const errorMessage = 'Введите значение'

      const { el } = renderComponent(
        <Form title="form">
          <Form.Group required={true} customValidationMessage={errorMessage}>
            <Input pattern="\d{4}" defaultValue="1" />
          </Form.Group>

          <button type="submit">submit</button>
        </Form>
      )

      act(() => {
        const form = el as HTMLFormElement
        form.requestSubmit()
        form.reportValidity()
      })

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toBeInvalid()

      const errorMessageEl = screen.queryByText(errorMessage)
      expect(errorMessageEl).toBeInTheDocument()

      await user.type(input, '123')
      expect(input).toBeValid()
      expect(errorMessageEl).not.toBeInTheDocument()
    })
  })
})
