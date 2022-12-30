import { describe, expect, it } from 'vitest'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { TestSelectors } from '../../../../test/selectors'
import { InfSelectProps } from '../interface'
import { InfSelect } from '../index'

const mockItems = [
  { text: 'Первый элемент', value: 0, subtext: 'Дополнительный' },
  { text: 'Второй элемент', value: 1, subtext: 'Дополнительный текст' },
  { text: 'Третий элемент', value: 2, subtext: 'Дополнительный текст' }
]

const renderComponent: (args?: InfSelectProps) => Record<string, HTMLElement | RenderResult | null> = (args) => {
  const reactEl = render(<InfSelect {...args} items={mockItems} />)

  const result: Record<string, HTMLElement | HTMLInputElement | RenderResult | null> = {
    wrapper: reactEl.queryByTestId(TestSelectors.select.wrapper),
    inputWrapper: reactEl.queryByTestId(TestSelectors.input.wrapper),
    inputEl: reactEl.queryByTestId(TestSelectors.input.inputEl),
    reactEl
  }

  if (args) {
    Object.keys(args).forEach(key => {
      if (key in TestSelectors.select) {
        result[key] = reactEl.getByTestId(TestSelectors.select[key as keyof typeof TestSelectors.select])
      }
    })
  }

  return result
}
describe('select', () => {
  it('should render', () => {
    const { wrapper, inputWrapper, list } = renderComponent()
    expect(wrapper).toBeDefined()
    expect(inputWrapper).toBeDefined()
    expect(list).toBeUndefined()
  })

  it('should render list on focus', () => {
    let { inputEl, reactEl, list } = renderComponent()
    expect(list).toBeUndefined()

    fireEvent.focus(inputEl as HTMLInputElement)
    list = (reactEl as RenderResult).queryByTestId(TestSelectors.select.list)
    expect(list).toBeDefined()
    expect(list.children.length).toBe(mockItems.length)
  })

  it('should match snapshop', () => {
    const { wrapper } = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
