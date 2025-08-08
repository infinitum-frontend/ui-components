import { useMemo } from 'react'
import { PaginationProps, DOTS } from './Pagination'

const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start)
}

type UsePaginationProps = Pick<
  PaginationProps,
  'totalCount' | 'pageSize' | 'currentPage'
>

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage
}: UsePaginationProps): {
  paginationRangeToShow: Array<number | string>
  paginationRangeOverflow: number[]
} => {
  const paginationRangeToShow = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Если страниц 5 или меньше, показываем все страницы без DOTS
    if (totalPageCount <= 5) {
      return range(1, totalPageCount)
    }

    // Если страниц больше 5, показываем первую, вторую, DOTS, предпоследнюю и последнюю страницы
    const firstPageIndex = 1
    const secondPageIndex = 2
    const lastPageIndex = totalPageCount
    const secondLastPageIndex = totalPageCount - 1

    return [
      firstPageIndex,
      secondPageIndex,
      DOTS,
      secondLastPageIndex,
      lastPageIndex
    ]
  }, [totalCount, pageSize, currentPage])

  const getPageRange = useMemo((): number[] => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const startPage = 3
    const endPage = totalPageCount - 2

    if (startPage > endPage) {
      return []
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }, [totalCount, pageSize])

  return {
    paginationRangeToShow,
    paginationRangeOverflow: getPageRange
  }
}
