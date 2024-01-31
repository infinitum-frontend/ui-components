export default function useSplittedBreadcrumbs<T>(
  items: T[],
  maxVisibleCount: number
): {
  /** Есть ли спрятанные элементы */
  hasHiddenItems: boolean
  firstItem: T
  hiddenItems: T[]
  lastItems: T[]
} {
  const childrenCount = items.length
  // нужно ли добавлять дропдаун со скрытыми элементами
  const hasHiddenItems = Boolean(
    childrenCount > 3 && maxVisibleCount > 1 && childrenCount > maxVisibleCount
  )

  // добавляем 2, тк 1 - для учета элемента-выпадающего списка, и еще 1 - посколько slice не включает конечный элемент в выборку
  const endIndex = childrenCount - maxVisibleCount + 1
  const firstItem = items[0]
  // элементы, которые будут отображаться в выпадающем списке
  const hiddenItems = hasHiddenItems ? items.slice(1, endIndex) : []
  // элементы, которые будут отображаться после выпадающего списка
  const lastItems = items.slice(hasHiddenItems ? endIndex : 1)

  return {
    hasHiddenItems,
    firstItem,
    hiddenItems,
    lastItems
  }
}
