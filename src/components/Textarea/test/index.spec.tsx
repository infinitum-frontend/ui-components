import { it, describe, expect, vi } from 'vitest'
import { Textarea } from '../index'
import { renderComponent } from '@/testSetup'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../../Form'
import { TextFieldClasses } from '../../../utils/textFieldClasses'

const user = userEvent.setup()

describe('Textarea', () => {
  describe('render', () => {
    it('should render', () => {
      const { el } = renderComponent(<Textarea value={'Textarea'} />)
      expect(el).toBeDefined()
      expect(el.className).toContain('inf-textarea')

      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement
      expect(el).toContainElement(textarea)
    })

    it('should match snapshot', () => {
      const { el } = renderComponent(<Textarea />)
      expect(el).toMatchSnapshot()
    })

    it('should support error status', () => {
      const { el } = renderComponent(<Textarea status="error" />)
      expect(el).toHaveClass(TextFieldClasses.status.error)
      expect(el).toHaveStyle({ borderColor: 'var(--inf-color-border-error);' })
    })

    it('should support full width', () => {
      const { el } = renderComponent(<Textarea block={true} />)
      expect(el.className).toContain('inf-textarea--block')
      expect(el).toHaveStyle('width: 100%')
    })

    it('should support placeholder', () => {
      const placeholder = 'Введите значение'
      const { el } = renderComponent(<Textarea placeholder={placeholder} />)
      expect(el).toHaveProperty('placeholder')
      expect((el as HTMLTextAreaElement).placeholder).toBe(placeholder)
    })

    it('should call onInput', async () => {
      let eventValue
      let eventType
      const onInput = vi.fn((value, e) => {
        eventValue = value
        eventType = e.type
      })

      const { el } = renderComponent(<Textarea onInput={onInput} />)
      await user.type(el, 'inf')

      expect(onInput).toBeCalled()
      expect(onInput).toHaveBeenCalledTimes(3)
      expect(eventValue).toBe('inf')
      expect(eventType).toBe('change')
    })

    it('should call onChange', async () => {
      let eventValue
      let eventType
      const onChange = vi.fn((value, e) => {
        eventValue = value
        eventType = e.type
      })

      const { el } = renderComponent(<Textarea onChange={onChange} />)
      await user.type(el, 'inf')

      expect(onChange).toBeCalled()
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(eventValue).toBe('inf')
      expect(eventType).toBe('change')
    })

    it('should support custom className', () => {
      const className = 'custom-class'
      const { el } = renderComponent(<Textarea className={className} />)
      expect(el.className).contains(className)
      expect(el.className).contains('inf-textarea')
    })
  })

  describe('disabled', () => {
    it('should support disabled', () => {
      renderComponent(<Textarea disabled />)
      expect(
        screen.queryByRole('textbox') as HTMLTextAreaElement
      ).toBeDisabled()
    })
  })

  describe('uncontrolled input', () => {
    it('should be uncontrolled by default', async () => {
      renderComponent(<Textarea />)
      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement
      await user.type(textarea, 'Stocks')
      expect(textarea).toHaveValue('Stocks')
    })

    it('should support defaultValue', () => {
      renderComponent(<Textarea defaultValue="Stocks" />)
      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement
      expect(textarea).toHaveValue('Stocks')
    })
  })

  describe('resize', () => {
    it('should not resize by default', () => {
      const { el } = renderComponent(<Textarea />)
      expect(el).toHaveStyle('resize: none')
    })

    it('should support horizontal', () => {
      const { el } = renderComponent(<Textarea resize={'horizontal'} />)
      expect(el).toHaveStyle('resize: horizontal')
      expect(el.className).contains('inf-textarea--resize-horizontal')
    })

    it('should support vertical', () => {
      const { el } = renderComponent(<Textarea resize={'vertical'} />)
      expect(el).toHaveStyle('resize: vertical')
      expect(el.className).contains('inf-textarea--resize-vertical')
    })

    it('should support both', () => {
      const { el } = renderComponent(<Textarea resize={'both'} />)
      expect(el).toHaveStyle('resize: both')
      expect(el.className).contains('inf-textarea--resize-both')
    })
  })

  describe('Form', () => {
    it('should support html attributes when not in form', () => {
      const onInvalid = vi.fn()
      renderComponent(
        <Textarea
          required
          aria-required="true"
          aria-invalid="true"
          id="test"
          onInvalid={onInvalid}
        />
      )

      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement
      expect(textarea).toHaveAttribute('required')
      expect(textarea).toHaveAttribute('aria-required')
      expect(textarea).toHaveAttribute('aria-invalid')
      expect(textarea).toHaveAttribute('id', 'test')

      textarea.reportValidity()
      expect(onInvalid).toHaveBeenCalled()
    })

    it('should support form context props', () => {
      renderComponent(
        <Form disabled>
          <Textarea />
        </Form>
      )

      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement

      expect(textarea).toHaveAttribute('disabled')
    })

    it('should support formGroup context props', () => {
      renderComponent(
        <Form>
          <Form.Group required>
            <Textarea />
          </Form.Group>
        </Form>
      )

      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement
      expect(textarea).toHaveAttribute('required')
      expect(textarea).toHaveAttribute('id')
      expect(textarea).toHaveAttribute('aria-required')

      act(() => {
        textarea.reportValidity()
      })

      expect(textarea).toHaveAttribute('aria-invalid')
    })

    it('should call form control handlers', async () => {
      const errorMessage = 'Введите значение'

      const { el } = renderComponent(
        <Form>
          <Form.Group required customValidationMessage={errorMessage}>
            <Textarea />
          </Form.Group>
        </Form>
      )

      act(() => {
        const form = el as HTMLFormElement
        form.requestSubmit()
      })

      const textarea = screen.queryByRole('textbox') as HTMLTextAreaElement
      const errorEl = screen.queryByText(errorMessage)
      expect(errorEl).toBeTruthy()
      expect(textarea).toBeInvalid()

      await user.type(textarea, 'test')

      expect(textarea).toBeValid()
    })
  })
})
