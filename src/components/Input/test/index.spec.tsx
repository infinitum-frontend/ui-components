import { describe, it, expect } from 'vitest'
import { render, RenderResult } from '@testing-library/react'
import { Input } from '../index'
import { InputProps } from '../interface'

const renderComponent: (args?: InputProps) => RenderResult = (args) => {
  return render(<Input {...args} />)
}

describe('input', () => {
  it('renders', () => {
    const component = renderComponent({ placeholder: 'Введите значение' })
    const element = component.container.firstChild as HTMLElement
    expect(element).toBeDefined()
    expect(element.className).toContain('inf-input')
  })

  //   it('matches snapshop', () => {
  //     const component = renderComponent()
  //     const element = component.getByPlaceholderText('')
  //     expect(element).toMatchSnapshot()
  //   })
  //
  //   it('applies custom classname', () => {
  //     const component = renderComponent({ className: 'custom-class' })
  //     const element = component.getByPlaceholderText('')
  //     expect(element.className).toContain('custom-class')
  //   })
  // })
  //
  // describe('size', () => {
  //   it('should render correct size', () => {
  //     const component = renderComponent()
  //     const element = component.baseElement
  //     console.log(element)
  //     expect(element.className).toContain('inf-input--size-medium')
  //   })
  // })
  //
  // describe('border', () => {
  //   it('applies border', () => {
  //     const { wrapper } = renderComponent({ borderRadius: 'regular' })
  //     expect(wrapper.className).toContain('inf-input--br-regular')
  //   })
  // })
  //
  // describe('prefix and postfix', () => {
  //   it('prefix renders', () => {
  //     const { wrapper, prefix } = renderComponent({
  //       prefix: 'prefix',
  //       prefixClass: 'prefix-class'
  //     })
  //     expect(prefix).toBeDefined()
  //     expect(prefix.className).toContain('inf-input__prefix')
  //     expect(prefix.className).toContain('prefix-class')
  //     expect(wrapper).toMatchSnapshot('prefix')
  //     expectTypeOf(prefix).toMatchTypeOf(ReactNode)
  //   })
  //
  //   it('postfix renders', () => {
  //     const { wrapper, postfix } = renderComponent({
  //       postfix: <span>postfix</span>,
  //       postfixClass: 'postfix-class'
  //     })
  //     expect(postfix).toBeDefined()
  //     expect(postfix.className).toContain('inf-input__postfix')
  //     expect(postfix.className).toContain('postfix-class')
  //     expect(wrapper).toMatchSnapshot('postfix')
  //     expectTypeOf(postfix).toMatchTypeOf(ReactNode)
  //   })
  // })
  //
  // describe('clear-button', () => {
  //   it('exists', async () => {
  //     const { allowClear } = renderComponent({ allowClear: true, value: 'test' })
  //     expect(allowClear).toBeDefined()
  //     expect(allowClear.style.visibility).toContain('')
  //   })
  //
  //   it('trigger input event', () => {
  //     const onInput = vi.fn()
  //     const { wrapper, allowClear } = renderComponent({
  //       allowClear: true,
  //       value: 'test',
  //       onInput
  //     })
  //     fireEvent.click(allowClear)
  //     expect(onInput).toHaveBeenCalledWith('')
  //     expect(wrapper.className).toContain('inf-input--focused')
  //   })
  //
  //   it('hidden on empty input', () => {
  //     const { allowClear } = renderComponent({ allowClear: true })
  //     expect(allowClear).toHaveStyle('visibility: hidden')
  //     expect(allowClear.className).toContain('inf-input__clear-button--hidden')
  //   })
  //
  //   it('render default icon', () => {
  //     const { allowClear } = renderComponent({ allowClear: true })
  //     expect(allowClear.firstChild).toBeDefined()
  //   })
})
