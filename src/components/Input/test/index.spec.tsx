import { describe, it, expect, vi } from 'vitest'
import { Input } from '../index'
import { renderComponent } from '@/testSetup'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextFieldClasses } from '../../../utils/textFieldClasses'

describe('input', () => {
  it('should render', () => {
    const { el } = renderComponent(<Input />)
    expect(el).toBeDefined()
    expect(el.className).toContain('inf-input')
  })

  it('should render as plain input by default', () => {
    const { el } = renderComponent(<Input />)
    expect(el).toBeEmptyDOMElement()
    expect(el.tagName).toBe('INPUT')
  })

  it('should render as complex input by default', () => {
    const { el } = renderComponent(<Input prefix={'prefix'} />)
    const inputEl = el.querySelector('input') as HTMLInputElement
    expect(el).not.toBeEmptyDOMElement()
    expect(el).toContainHTML(inputEl.outerHTML)
  })

  it('matches snapshot', () => {
    const { el } = renderComponent(<Input />)
    expect(el).toMatchSnapshot()
  })
})

describe('className', () => {
  it('should apply custom classname on plain input', () => {
    const { el } = renderComponent(<Input className={'custom-class'} />)
    expect(el.className).toContain('custom-class')
    expect(el.className).toContain('inf-input')
  })

  it('should apply custom classname on complex input', () => {
    const { el } = renderComponent(
      <Input className={'custom-class'} prefix={'prefix'} />
    )
    expect(el.className).toContain('custom-class')
    expect(el.className).toContain('inf-input')
  })
})

describe('style', () => {
  it('should apply style on plain input', () => {
    const { el } = renderComponent(<Input style={{ width: '100%' }} />)
    expect(el).toHaveStyle('width: 100%')
  })

  it('should apply style on complex input', () => {
    const { el } = renderComponent(
      <Input style={{ width: '100%' }} prefix={'prefix'} />
    )
    expect(el).toHaveStyle('width: 100%')
  })
})

describe('size', () => {
  it('should support size on plain input', () => {
    const { el } = renderComponent(<Input />)
    expect(el.className).toContain(TextFieldClasses.size.medium)
  })

  it('should support size on complex input', () => {
    const { el } = renderComponent(<Input prefix={'prefix'} />)
    expect(el)
  })
})

describe('value', () => {
  it('should apply value on plain input', () => {
    const { el } = renderComponent(<Input value={'Акции'} />)
    expect(el).toHaveValue('Акции')
  })

  it('should apply value on complex input', () => {
    const { el } = renderComponent(<Input value={'Акции'} prefix={'prefix'} />)
    const inputEl = el.querySelector('input')
    expect(inputEl).toHaveValue('Акции')
  })
})

describe('events', () => {
  it('should support onInput', () => {
    let eventValue
    let eventType
    const onInput = vi.fn((value, e) => {
      eventValue = value
      eventType = e.type
    })

    const { el } = renderComponent(<Input onInput={onInput} />)
    fireEvent.input(el, { target: { value: 'hello' } })

    expect(onInput).toHaveBeenCalledOnce()
    expect(eventValue).toBe('hello')
    expect(eventType).toBe('change')
  })

  it('should support onBlur', () => {
    let event
    const onBlur = vi.fn((e) => {
      event = e
    })
    const { el } = renderComponent(<Input onBlur={onBlur} />)
    fireEvent.blur(el)

    expect(onBlur).toHaveBeenCalledOnce()
    expect(onBlur).toBeCalledWith(event)
  })

  it('should support onFocus', () => {
    let event
    const onFocus = vi.fn((e) => {
      event = e
    })
    const { el } = renderComponent(<Input onFocus={onFocus} />)
    fireEvent.focus(el)

    expect(onFocus).toHaveBeenCalledOnce()
    expect(onFocus).toHaveBeenCalledWith(event)
  })
})

describe('formatter', () => {
  const defaultValue = 'облигации'
  it('should transform value', () => {
    const { el } = renderComponent(
      <Input formatter={(value) => value?.toUpperCase()} value={defaultValue} />
    )
    expect(el).toHaveValue(defaultValue.toUpperCase())
  })

  it('should emit transformed value', () => {
    let eventValue
    const onInput = vi.fn((value) => {
      eventValue = value
    })
    const { el } = renderComponent(
      <Input formatter={(value) => value?.toUpperCase()} onInput={onInput} />
    )

    fireEvent.input(el, {
      target: { value: defaultValue }
    })

    expect(onInput).toBeCalledTimes(1)
    expect(eventValue).toBe(defaultValue.toUpperCase())
  })
})

describe('placeholder', () => {
  const defaultPlaceholder = 'Введите значение'

  it('should be applied on plain input', () => {
    const { el } = renderComponent(<Input placeholder={defaultPlaceholder} />)
    expect((el as HTMLInputElement).placeholder).toBe(defaultPlaceholder)
  })

  it('should be applied on complex input', () => {
    const { el } = renderComponent(
      <Input placeholder={defaultPlaceholder} prefix={'prefix'} />
    )

    const inputEl = el.querySelector('input') as HTMLInputElement
    expect(inputEl.placeholder).toBe(defaultPlaceholder)
  })

  it('should be empty on plain focused input', () => {
    const { el } = renderComponent(<Input placeholder={defaultPlaceholder} />)

    fireEvent.focus(el)
    expect((el as HTMLInputElement).placeholder).toBe('')
  })

  it('should be empty on complex focused input', () => {
    const { el } = renderComponent(
      <Input placeholder={defaultPlaceholder} prefix={'prefix'} />
    )
    const inputEl = el.querySelector('input') as HTMLInputElement
    fireEvent.click(el)
    expect(inputEl.placeholder).toBe('')
  })
})

describe('border', () => {
  it('should be regular on plain input', async () => {
    const { el } = renderComponent(<Input />)
    expect(el).toHaveClass(TextFieldClasses.borderRadius.regular)
    expect(el).toHaveStyle('border-radius: var(--inf-border-radius-small);')
  })

  it('should be regular on complex input', () => {
    const { el } = renderComponent(<Input prefix={'prefix'} />)
    expect(el).toHaveClass(TextFieldClasses.borderRadius.regular)
    expect(el).toHaveStyle('border-radius: var(--inf-border-radius-small);')
  })

  it('should support noBorder on plain input', () => {
    const { el } = renderComponent(<Input noBorder={true} />)
    expect(el).toHaveClass(TextFieldClasses.noBorder)
    expect(el).toHaveStyle('border: none')
  })

  it('should support noBorder on complex input', () => {
    const { el } = renderComponent(<Input noBorder={true} prefix={'prefix'} />)
    expect(el).toHaveClass(TextFieldClasses.noBorder)
    expect(el).toHaveStyle('border: none')
  })

  it('should support filled class on plain input', () => {
    const { el } = renderComponent(<Input value={'test'} />)
    expect(el).toHaveClass(TextFieldClasses.filled)
  })

  it('should support filled class on complex input', () => {
    // ожидаем, чтобы корректно отработал ref
    act(() => {
      renderComponent(<Input value={'test'} prefix={'prefix'} />)
    })
    const el = screen.queryByRole('textbox')
    expect(el).toHaveClass(TextFieldClasses.filled)
  })
})

describe('disabled', () => {
  it('should apply on plain input', () => {
    const { el } = renderComponent(<Input disabled={true} />)
    expect(el).toHaveProperty('disabled')
  })

  it('should apply on complex input', () => {
    const { el } = renderComponent(<Input disabled={true} prefix={'prefix'} />)
    const inputEl = el.querySelector('input')
    expect(el).toHaveClass(TextFieldClasses.disabled)
    expect(inputEl).toHaveProperty('disabled')
  })
})

describe('status', () => {
  it('should apply on plain input', () => {
    const { el } = renderComponent(<Input status={'error'} />)
    expect(el).toHaveClass(TextFieldClasses.status.error)
    expect(el).toHaveStyle('border-color: var(--inf-color-primary);')
  })

  it('should apply on complex input', () => {
    const { el } = renderComponent(<Input status={'error'} prefix={'prefix'} />)
    expect(el).toHaveClass(TextFieldClasses.status.error)
    expect(el).toHaveStyle('border-color: var(--inf-color-primary);')
  })
})

describe('clear button', () => {
  const user = userEvent.setup()

  it('should be visible', () => {
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
    const inputEl = el.querySelector('input')
    await user.click(clearButton)

    expect(el).toHaveClass(TextFieldClasses.focused)
    expect(inputEl).toHaveFocus()
  })

  it('should not work on disabled', async () => {
    const onInput = vi.fn()
    const { el } = renderComponent(
      <Input
        allowClear={true}
        value={'Облигации'}
        onInput={onInput}
        disabled={true}
      />
    )

    const clearButton = el.querySelector(
      '.inf-input-wrapper__clear-button'
    ) as HTMLSpanElement

    await user.click(clearButton).catch((error) => {
      return error
    })
    expect(onInput).toHaveBeenCalledTimes(0)
  })
})
