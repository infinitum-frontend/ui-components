import {
  booleanToString,
  getIdSearchFn,
  getRuleIdSearchFn,
  getRuleTitleSearchFn,
  getShortnameSearchFn,
  getTitleSearchFn,
  stringToBoolean
} from '../string'
import {
  notSetSelect,
  notSetString
} from '../../../libs/constants/domains.constants'

describe('string utilities', () => {
  test('stringToBoolean', () => {
    expect(stringToBoolean('true')).toBe(true)
    expect(stringToBoolean('false')).toBe(false)
    expect(stringToBoolean('oN')).toBe(true)
    expect(stringToBoolean('ofF')).toBe(false)

    expect(stringToBoolean(notSetString)).toBe(undefined)
    expect(stringToBoolean(notSetSelect)).toBe(undefined)
  })

  test('booleanToString', () => {
    expect(booleanToString(true)).toBe('true')
    expect(booleanToString(false)).toBe('false')
  })

  test('getTitleSearchFn', () => {
    expect(getTitleSearchFn('42')).toBeTruthy()
  })

  test('getShortnameSearchFn', () => {
    expect(getShortnameSearchFn('42')).toBeTruthy()
  })

  test('getIdSearchFn', () => {
    expect(getIdSearchFn('42')).toBeTruthy()
  })

  test('getRuleTitleSearchFn', () => {
    expect(getRuleTitleSearchFn('42')).toBeTruthy()
  })
  test('getRuleCodeSearchFn', () => {
    expect(getRuleIdSearchFn('42')).toBeTruthy()
  })
})
