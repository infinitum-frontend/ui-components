import { describe, it, vi } from 'vitest'
import { selectDataFormatter } from '../index'
import {
  SelectOptionsUnformatted,
  SelectOptionsWithExtraKeys
} from '../fixtures'

describe('formatter', () => {
  it('should support base formatting', () => {
    const result = selectDataFormatter({
      array: SelectOptionsUnformatted,
      label: 'text',
      value: 'id'
    })

    expect(result.length).toBe(SelectOptionsUnformatted.length)
    expect(Object.keys(result[0])).toHaveLength(2)
    expect(result[0]).toHaveProperty('label')
    expect(result[0]).toHaveProperty('value')
  })

  it('should support rest property', () => {
    const result = selectDataFormatter(
      {
        array: SelectOptionsWithExtraKeys,
        label: 'text',
        value: 'id'
      },
      true
    )

    expect(Object.keys(result[0])).toHaveLength(
      Object.keys(SelectOptionsWithExtraKeys[0]).length + 2
    )
    expect(result[0]).toHaveProperty('subtext')
  })

  it('should create error when key does`nt exist in object', () => {
    console.error = vi.fn()

    const OptionsWithMissedKeys = SelectOptionsUnformatted.map(
      (item, index) => {
        return {
          ...item,
          id: index === 1 ? undefined : item.id,
          text: index === 1 ? undefined : item.text
        }
      }
    )

    selectDataFormatter({
      array: OptionsWithMissedKeys,
      label: 'text',
      value: 'id'
    })
    expect(console.error).toHaveBeenCalledTimes(2)
  })
})
