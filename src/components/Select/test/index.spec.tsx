import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Select, selectDataFormatter } from '../index'

const mockItems = selectDataFormatter({
  array: [
    { text: 'Первый элемент', value: 0, subtext: 'Дополнительный' },
    { text: 'Второй элемент', value: 1, subtext: 'Дополнительный текст' },
    { text: 'Третий элемент', value: 2, subtext: 'Дополнительный текст' }
  ],
  value: 'value',
  label: 'text'
})
describe('select', () => {
  it('should render', () => {
    const { container } = render(<Select options={mockItems} />)
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toBeDefined()
    expect(wrapper.className).contains('inf-select')
  })

  // it('should render list on focus', () => {
  //   let { inputEl, reactEl, list } = renderComponent()
  //   expect(list).toBeUndefined()
  //
  //   fireEvent.focus(inputEl as HTMLInputElement)
  //   list = (reactEl as RenderResult)
  //   expect(list).toBeDefined()
  //   expect(list.children.length).toBe(mockItems.length)
  // })
  //
  // it('should match snapshop', () => {
  //   const { wrapper } = renderComponent()
  //   expect(wrapper).toMatchSnapshot()
  // })
})
