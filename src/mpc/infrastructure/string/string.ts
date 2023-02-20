import { notSetString, notSetSelect } from '../../constants/domains.constants'
import escapeRegExp from 'lodash/escapeRegExp'

export function stringToBoolean(s: string): boolean | undefined {
  if (s === notSetString || s === notSetSelect) return undefined
  // eslint-disable-next-line prefer-named-capture-group
  const regex = /^\s*(true|1|on)\s*$/i

  return regex.test(s)
}

export function booleanToString(b: boolean): 'true' | 'false' {
  return b ? 'true' : 'false'
}

interface ITitleFilter {
  title: string
}

export function getTitleSearchFn<T extends ITitleFilter>(
  title: string
): (arg0: T) => boolean {
  const trimmed = title.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length ? arg0.title.search(regexp) !== -1 : true
}

interface IIdAndTitleFilter {
  id: number
  title: string
}

export function getIdAndTitleSearchFn<T extends IIdAndTitleFilter>(
  title: string
): (arg0: T) => boolean {
  const trimmed = title.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length
      ? arg0.title.search(regexp) !== -1 ||
        String(arg0.id).search(regexp) !== -1
      : true
}

interface IShortNameFilter {
  shortName: string
}

export function getShortNameSearchFn<T extends IShortNameFilter>(
  title: string
): (arg0: T) => boolean {
  const trimmed = title.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length ? arg0.shortName.search(regexp) !== -1 : true
}

interface IShortNameFilter {
  shortName: string
}

export function getShortnameSearchFn<T extends IShortNameFilter>(
  shortName: string
): (arg0: T) => boolean {
  const trimmed = shortName.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length ? arg0.shortName.search(regexp) !== -1 : true
}

interface IValueFilter {
  value: string
}

export function getValueSearchFn<T extends IValueFilter>(
  searchString: string
): (arg0: T) => boolean {
  const trimmed = searchString.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean => arg0.value.search(regexp) !== -1
}

interface IIdFilter {
  id: number
}

export function getIdSearchFn<T extends IIdFilter>(
  id: string
): (arg0: T) => boolean {
  const trimmed = id.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length ? String(arg0.id).search(regexp) !== -1 : true
}

interface IRuleTitleFilter {
  ruleTitle: string
}

export function getRuleTitleSearchFn<T extends IRuleTitleFilter>(
  ruleTitle: string
): (arg0: T) => boolean {
  const trimmed = ruleTitle.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length ? arg0.ruleTitle.search(regexp) !== -1 : true
}

interface IRuleIdFilter {
  ruleId: number
}

export function getRuleIdSearchFn<T extends IRuleIdFilter>(
  ruleId: string
): (arg0: T) => boolean {
  const trimmed = ruleId.trim()
  const regexp = new RegExp(`${escapeRegExp(trimmed)}`, 'gimu')
  return (arg0: T): boolean =>
    trimmed.length ? String(arg0.ruleId).search(regexp) !== -1 : true
}
