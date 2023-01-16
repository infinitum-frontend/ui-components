import { describe, expectTypeOf, it, vi, expect } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { InfInput } from '../index'
import { TestSelectors } from '../../../../test/selectors'
import { InfInputProps } from '../interface'
import { ReactNode } from 'react'

const renderComponent: (args?: InfInputProps) => Record<string, HTMLElement> = (
  args
) => {
  const reactEl = render(<InfInput {...args} />)

  const result: Record<string, HTMLElement | HTMLInputElement> = {
    wrapper: reactEl.getByTestId(TestSelectors.input.wrapper),
    inputEl: reactEl.getByTestId(TestSelectors.input.inputEl)
  }

  if (args) {
    Object.keys(args).forEach((key) => {
      if (key in TestSelectors.input) {
        result[key] = reactEl.getByTestId(
          TestSelectors.input[key as keyof typeof TestSelectors.input]
        )
      }
    })
  }

  return result
}

describe('input', () => {
  it('renders', () => {
    const { wrapper } = renderComponent()
    expect(wrapper).toBeDefined()
    expect(wrapper.className).toContain('inf-input')
  })

  it('matches snapshop', () => {
    const { wrapper } = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it('applies custom classname', () => {
    const { wrapper } = renderComponent({ className: 'custom-class' })
    expect(wrapper.className).toContain('custom-class')
  })
})

describe('size', () => {
  it('should render correct size', () => {
    const { wrapper } = renderComponent()
    expect(wrapper.className).toContain('inf-input--size-medium')
  })
})

describe('border', () => {
  it('applies border', () => {
    const { wrapper } = renderComponent({ borderRadius: 'regular' })
    expect(wrapper.className).toContain('inf-input--br-regular')
  })
})

describe('prefix and postfix', () => {
  it('prefix renders', () => {
    const { wrapper, prefix } = renderComponent({
      prefix: 'prefix',
      prefixClass: 'prefix-class'
    })
    expect(prefix).toBeDefined()
    expect(prefix.className).toContain('inf-input__prefix')
    expect(prefix.className).toContain('prefix-class')
    expect(wrapper).toMatchSnapshot('prefix')
    expectTypeOf(prefix).toMatchTypeOf(ReactNode)
  })

  it('postfix renders', () => {
    const { wrapper, postfix } = renderComponent({
      postfix: <span>postfix</span>,
      postfixClass: 'postfix-class'
    })
    expect(postfix).toBeDefined()
    expect(postfix.className).toContain('inf-input__postfix')
    expect(postfix.className).toContain('postfix-class')
    expect(wrapper).toMatchSnapshot('postfix')
    expectTypeOf(postfix).toMatchTypeOf(ReactNode)
  })
})

describe('clear-button', () => {
  it('exists', async () => {
    const { allowClear } = renderComponent({ allowClear: true, value: 'test' })
    expect(allowClear).toBeDefined()
    expect(allowClear.style.visibility).toContain('')
  })

  it('trigger input event', () => {
    const onInput = vi.fn()
    const { wrapper, allowClear } = renderComponent({
      allowClear: true,
      value: 'test',
      onInput
    })
    fireEvent.click(allowClear)
    expect(onInput).toHaveBeenCalledWith('')
    expect(wrapper.className).toContain('inf-input--focused')
  })

  it('hidden on empty input', () => {
    const { allowClear } = renderComponent({ allowClear: true })
    expect(allowClear).toHaveStyle('visibility: hidden')
    expect(allowClear.className).toContain('inf-input__clear-button--hidden')
  })

  it('render default icon', () => {
    const { allowClear } = renderComponent({ allowClear: true })
    expect(allowClear.firstChild).toBeDefined()
  })
})
