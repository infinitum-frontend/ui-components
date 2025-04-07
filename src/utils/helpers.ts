import React, { isValidElement } from 'react'

export function omitKeyFromObject<
  T extends Record<any, any>,
  K extends keyof T
>(key: K, obj: T): Omit<T, K> {
  const { [key]: omitted, ...rest } = obj
  return rest
}

// товар товара товаров
export function pluralize(count: number, variants: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2]
  return variants[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ]
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function checkIsValueExists(value?: any): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  } else {
    return Boolean(value)
  }
}

export function reactNodeToString(reactNode: React.ReactNode): string {
  let string = ''
  if (typeof reactNode === 'string') {
    string = reactNode
  } else if (typeof reactNode === 'number') {
    string = reactNode.toString()
  } else if (reactNode instanceof Array) {
    reactNode.forEach(function (child) {
      string += reactNodeToString(child)
    })
  } else if (isValidElement(reactNode)) {
    string += reactNodeToString(reactNode.props.children)
  }
  return string
}

export function removeDuplicates(arr: object[]): object[] {
  const uniqueItems = new Set<string>()
  const result: object[] = []

  arr.forEach((item) => {
    const itemString = JSON.stringify(item)

    if (!uniqueItems.has(itemString)) {
      uniqueItems.add(itemString)
      result.push(item)
    }
  })

  return result
}

export function debounce(callback: any, wait: any): any {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export const setInputValue = (
  inputElement:
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | null
    | undefined,
  value: string
): void => {
  if (!inputElement) {
    return
  }

  const valueSetter = Object?.getOwnPropertyDescriptor(
    inputElement,
    'value'
  )?.set
  const prototype = Object.getPrototypeOf(inputElement)

  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    'value'
  )?.set

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(inputElement, value)
  } else {
    valueSetter?.call(inputElement, value)
  }
  inputElement.dispatchEvent(new Event('input', { bubbles: true }))
}
