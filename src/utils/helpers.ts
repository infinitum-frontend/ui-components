export function omitKeyFromObject<
  T extends Record<any, any>,
  K extends keyof T
>(key: K, obj: T): Omit<T, K> {
  const { [key]: omitted, ...rest } = obj
  return rest
}
