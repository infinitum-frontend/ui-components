import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Button } from '../index'

const user = userEvent.setup()

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

  it('click', async () => {
    const clickFn = vi.fn()
    const { container } = render(<Button onClick={clickFn}>Нажми</Button>)
    const el = container.firstChild as HTMLElement
    await user.click(el)
    expect(clickFn).toHaveBeenCalledOnce()
  })
})
