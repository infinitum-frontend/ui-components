import { describe, expect, it } from 'vitest'
import { validateFn, formatterFn, normalizeDate } from '../helpers'

describe('DateRangePicker helpers', () => {
  describe('normalizeDate', () => {
    it('returns undefined for undefined/null', () => {
      expect(normalizeDate(undefined)).toBeUndefined()
      expect(normalizeDate(null as any)).toBeUndefined()
    })

    it('returns date with zeroed time', () => {
      const d = new Date('2024-01-15T14:30:45.123Z')
      const n = normalizeDate(d)
      expect(n?.getHours()).toBe(0)
      expect(n?.getMinutes()).toBe(0)
      expect(n?.getSeconds()).toBe(0)
      expect(n?.getMilliseconds()).toBe(0)
    })

    it('does not mutate original date', () => {
      const d = new Date('2024-01-15T14:30:45.123Z')
      const orig = d.getTime()
      normalizeDate(d)
      expect(d.getTime()).toBe(orig)
    })
  })

  describe('validateFn', () => {
    it('returns true for valid range', () => {
      expect(validateFn('15.01.2024—20.01.2024')).toBe(true)
    })
    it('returns false for end before start', () => {
      expect(validateFn('20.01.2024—15.01.2024')).toBe(false)
    })
    it('returns false for same dates', () => {
      expect(validateFn('15.01.2024—15.01.2024')).toBe(false)
    })
    it('returns false if start < min', () => {
      expect(validateFn('10.01.2024—15.01.2024', new Date('2024-01-12'))).toBe(
        false
      )
    })
    it('returns false if end > max', () => {
      expect(
        validateFn('15.01.2024—25.01.2024', undefined, new Date('2024-01-20'))
      ).toBe(false)
    })
  })

  describe('formatterFn', () => {
    it('formats valid range', () => {
      expect(formatterFn('15.01.2024—20.01.2024')).toBe('15.01.2024—20.01.2024')
    })
    it('applies min/max', () => {
      expect(
        formatterFn(
          '10.01.2024—25.01.2024',
          new Date('2024-01-12'),
          new Date('2024-01-20')
        )
      ).toBe('12.01.2024—20.01.2024')
    })
    it('adjusts year if needed', () => {
      expect(formatterFn('15.01.2025—20.01.2024')).toBe('15.01.2025—20.01.2025')
    })
  })
})
