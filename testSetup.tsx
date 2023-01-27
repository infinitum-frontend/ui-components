import { expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { ReactElement, JSXElementConstructor } from 'react'

// extends Vitest's expect method with methods from react-testing-library
// https://github.com/testing-library/jest-dom#custom-matchers
expect.extend(matchers)

export const renderComponent = function (Component: ReactElement): {
  el: HTMLElement
  container: HTMLElement
  rerender: (ui: ReactElement<any, string | JSXElementConstructor<any>>) => void
} {
  const { container, rerender } = render(Component)

  const el = container.firstChild as HTMLElement

  return { el, container, rerender }
}

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
