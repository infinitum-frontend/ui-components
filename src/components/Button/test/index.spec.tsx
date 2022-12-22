import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

import { InfButton } from '../index'
import '@testing-library/jest-dom/extend-expect'
import { TestSelectors } from '../../../../test/selectors'

describe('hello world', () => {
  it('matchSnapshot', () => {
    const reactEl = render(<InfButton>Button</InfButton>)
    expect(reactEl).toMatchSnapshot()
  })

  it('default variant', () => {
    const reactEl = render(<InfButton />)

    const el = reactEl.queryByTestId(TestSelectors.button.root)
    expect(el?.className).contains('inf-button--variant-primary')
  })

  it('click', () => {
    const clickFn = vi.fn()
    const { container } = render(<InfButton onClick={clickFn}>Нажми</InfButton>)
    const el = container.firstChild as HTMLElement
    fireEvent.click(el)
    expect(clickFn).toHaveBeenCalledOnce()
  })
})
