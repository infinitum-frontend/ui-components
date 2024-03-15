import { expect, beforeAll } from 'vitest'
import { render, RenderOptions } from '@testing-library/react'
// import '@testing-library/jest-dom/vitest' for vitest 1.x.x
import { ReactElement, JSXElementConstructor } from 'react'
import matchers from '@testing-library/jest-dom/matchers'

// extends Vitest's expect method with methods from react-testing-library
// https://github.com/testing-library/jest-dom#custom-matchers
expect.extend(matchers)

export const renderComponent = function (
  Component: ReactElement,
  options?: RenderOptions
): {
  el: HTMLElement
  container: HTMLElement
  rerender: (ui: ReactElement<any, string | JSXElementConstructor<any>>) => void
} {
  const { container, rerender } = render(Component, options)

  const el = container.firstChild as HTMLElement

  return { el, container, rerender }
}

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe(): any {}
    unobserve(): any {}
    disconnect(): any {}
  }

  // https://github.com/testing-library/react-testing-library/issues/95#issuecomment-392879866
  // https://github.com/vuejs/vue-test-utils/issues/319
  if (!HTMLElement.prototype.scrollTo) {
    HTMLElement.prototype.scrollTo = () => {}
  }
})

// runs a cleanup after each test case (e.g. clearing jsdom)
// afterEach(() => {
//   cleanup()
// })
