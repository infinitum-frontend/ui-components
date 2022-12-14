import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

import { UiButton } from '../index'
import '@testing-library/jest-dom/extend-expect'
// import { TestSelectors } from '../../../../test/selectors'

describe('hello world', () => {
  it('matchSnapshot', () => {
    const reactEl = render(<UiButton>Button</UiButton>)
    expect(reactEl).toMatchSnapshot()
  })

  it('default variant', () => {
    // const reactEl = render(<UiButton />)

    // const el = reactEl.queryByTestId(TestSelectors.button.root)
    // expect(el).toHaveClass('ui-button--red')
  })

  it('click', () => {
    const clickFn = vi.fn()
    // const reactEl = render(<UiButton onClick={clickFn}>Нажми</UiButton>)
    // const el = reactEl.queryByTestId(TestSelectors.button.root) as HTMLElement
    // fireEvent.click(el)
    expect(clickFn).toHaveBeenCalledOnce()
  })
})
