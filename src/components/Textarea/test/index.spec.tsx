import { it, describe, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Textarea } from '../index'
import { TextareaProps } from '../Textarea'

const renderComponent = (
  args?: TextareaProps
): Record<'el' | 'container', HTMLElement> => {
  const { container } = render(<Textarea {...args} />)

  const el = container.firstChild as HTMLElement

  return { el, container }
}

describe('Textarea', () => {
  it('should render', () => {
    const { el } = renderComponent()
    expect(el).toBeDefined()
    expect(el.className).toContain('inf-textarea')
  })

  it('should match snapshot', () => {
    const { el } = renderComponent()
    expect(el).toMatchSnapshot()
  })

  it('should support error status', () => {
    const { el } = renderComponent({ status: 'error' })
    expect(el.className).toContain('inf-textarea--status-error')
    expect(el).toHaveStyle('border-color: var(--inf-color-primary);')
  })

  it('should support full width', () => {
    const { el } = renderComponent({ block: true })
    expect(el.className).toContain('inf-textarea--block')
    expect(el).toHaveStyle('width: 100%')
  })

  it('should support placeholder', () => {})
})
