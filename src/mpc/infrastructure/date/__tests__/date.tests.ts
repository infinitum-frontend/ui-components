import {
  defaultDate,
  getAnywayValidDate,
  getPeriodDate,
  getPresentationDate,
  isDateFormat,
  isDateUtcFormat
} from '../date'

describe('infrastructure date', () => {
  test('can check DateFormat', () => {
    expect(isDateFormat('2015-01-01')).toBeTruthy()
    expect(isDateFormat('2017-10-01T00:00:00')).toBeTruthy()

    expect(isDateFormat('2021-01')).toBeFalsy()
    expect(isDateFormat('2021')).toBeFalsy()
    expect(isDateFormat('asdasd2021-01-01asdasd')).toBeFalsy()
    expect(isDateFormat('999999-01-01111')).toBeFalsy()
    expect(isDateFormat('asdasd')).toBeFalsy()
    expect(isDateFormat('')).toBeFalsy()
    expect(isDateFormat(undefined)).toBeFalsy()
    expect(isDateFormat(null)).toBeFalsy()
    expect(isDateFormat({})).toBeFalsy()
    expect(isDateFormat({ a: 42 })).toBeFalsy()
  })

  test('isDateUTCFormat', () => {
    expect(isDateUtcFormat('2016-07-08T12:30:00Z')).toBeTruthy()
    expect(isDateUtcFormat('2016-07-08T12:30:00+0100')).toBeTruthy()

    expect(isDateUtcFormat('2017-10-01T00:00:00')).toBeFalsy()
    expect(isDateUtcFormat('2021')).toBeFalsy()
    expect(isDateFormat('asdasd')).toBeFalsy()
    expect(isDateFormat('')).toBeFalsy()
    expect(isDateUtcFormat(undefined)).toBeFalsy()
    expect(isDateUtcFormat(null)).toBeFalsy()
    expect(isDateUtcFormat({})).toBeFalsy()
    expect(isDateUtcFormat({ a: 42 })).toBeFalsy()
  })

  test('getPeriodDate', () => {
    expect(
      getPeriodDate({ dateFrom: '2020-01-01', dateTo: '2022-10-05' })
    ).toBe('01.01.2020 — 05.10.2022')
    expect(getPeriodDate({ dateFrom: '2021-01-11', dateTo: null })).toBe(
      'c 11.01.2021'
    )
    expect(getPeriodDate({ dateFrom: null, dateTo: '2022-10-05' })).toBe(
      'до 05.10.2022'
    )
  })

  test('getPresentationDate', () => {
    expect(getPresentationDate('2021-10-10')).toBe('10.10.2021')
    expect(getPresentationDate('2016-07-08T12:30:00Z')).toBe('08.07.2016')
    expect(getPresentationDate(null)).toBe('')
    expect(getPresentationDate(undefined)).toBe('')
    expect(getPresentationDate('asdasd2021-01-01asdasd')).toBe('')
  })

  test('getAnywayValidDate', () => {
    expect(getAnywayValidDate('2021-01-01')).toBe('2021-01-01')
    expect(getAnywayValidDate('2026-07-08T12:30:00+0100')).toBe(
      '2026-07-08T12:30:00+0100'
    )

    expect(getAnywayValidDate('')).toBe(defaultDate)
    expect(getAnywayValidDate('42424')).toBe(defaultDate)
    expect(getAnywayValidDate(null)).toBe(defaultDate)
    expect(getAnywayValidDate(undefined)).toBe(defaultDate)
  })
})
