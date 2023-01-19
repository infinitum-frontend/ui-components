import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { Button } from '../index'
import '@testing-library/jest-dom/extend-expect'

describe('hello world', () => {
  it('matchSnapshot', () => {
    const reactEl = render(<Button>Button</Button>)
    expect(reactEl).toMatchSnapshot()
  })

  it('default variant', () => {
    const { container } = render(<Button />)

    const el = container.firstChild as HTMLElement
    expect(el.className).contains('inf-button--variant-primary')
  })

  it('click', () => {
    const clickFn = vi.fn()
    const { container } = render(<Button onClick={clickFn}>Нажми</Button>)
    const el = container.firstChild as HTMLElement
    fireEvent.click(el)
    expect(clickFn).toHaveBeenCalledOnce()
  })
})
