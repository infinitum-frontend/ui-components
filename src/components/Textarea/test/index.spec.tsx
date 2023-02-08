import { it, describe, expect, vi } from 'vitest'
import { Textarea } from '../index'
import { renderComponent } from '@/testSetup'
import { fireEvent } from '@testing-library/react'

describe('Textarea', () => {
  it('should render', () => {
    const { el } = renderComponent(<Textarea value={'Textarea'} />)
    expect(el).toBeDefined()
    expect(el.className).toContain('inf-textarea')
    expect((el as HTMLTextAreaElement).value).toBe('Textarea')
  })

  it('should match snapshot', () => {
    const { el } = renderComponent(<Textarea />)
    expect(el).toMatchSnapshot()
  })

  it('should support error status', () => {
    const { el } = renderComponent(<Textarea status={'error'} />)
    expect(el.className).toContain('inf-textarea--status-error')
    expect(el).toHaveStyle('border-color: var(--inf-color-primary);')
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

  it('should call onInput', () => {
    const onInput = vi.fn()
    const { el } = renderComponent(<Textarea onInput={onInput} />)
    fireEvent.input(el, {
      target: { value: 'inf' }
    })

    expect(onInput).toBeCalled()
    expect(onInput).toHaveBeenCalledOnce()
  })

  it('should support custom className', () => {
    const className = 'custom-class'
    const { el } = renderComponent(<Textarea className={className} />)
    expect(el.className).contains(className)
    expect(el.className).contains('inf-textarea')
  })

  it('should support filled state', () => {
    const { el } = renderComponent(<Textarea value={'textarea'} />)
    expect(el).toHaveClass('inf-textarea--filled')
  })
})

describe('Resize', () => {
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
