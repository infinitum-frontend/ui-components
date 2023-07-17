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
