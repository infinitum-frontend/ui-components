import React, { ComponentPropsWithoutRef } from 'react'
import { usePagination } from './usePagination'
import { Button } from 'Components/Button'
import { Text } from 'Components/Text'
import { ReactComponent as ChevronLeftIcon } from 'Icons/chevronLeft.svg'
import { ReactComponent as ChevronRightIcon } from 'Icons/chevronRight.svg'
import './Pagination.scss'
import cn from 'classnames'

export const DOTS = '...'

export interface PaginationProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  /**
   * Текущая страница
   */
  currentPage: number
  /**
   * Обработчик изменения текущей страницы
   */
  onPageChange: (currentPage: number) => void
  /**
   * Общее количество элементов
   */
  totalCount: number
  /**
   * Количество элементов на одной странице
   */
  pageSize: number
  /**
   * Количество соседних кнопок рядом с выбранной
   */
  siblingCount?: number
  /**
   * Блокировка контролов
   */
  disabled?: boolean
  /**
   * Вид
   */
  variant?: 'pagination' | 'prev-next'
  /**
   * Название сущности в соответствующем склонении
   */
  entitylabel?: string
  /**
   * Текст кнопки предыдущей страницы
   */
  prevLabel?: string
  /**
   * Текст кнопки следующей страницы
   */
  nextLabel?: string
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      onPageChange,
      totalCount,
      pageSize,
      siblingCount = 1,
      disabled = false,
      prevLabel = 'Предыдущие',
      nextLabel = 'Следующие',
      entitylabel = 'элементов',
      variant = 'pagination',
      ...props
    },
    ref
  ) => {
    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
    })

    // Если страница одна, то не рендерим пагинацию
    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

    const onNext = (): void => {
      onPageChange(currentPage + 1)
    }

    const onPrevious = (): void => {
      onPageChange(currentPage - 1)
    }

    const lastPage = paginationRange[paginationRange.length - 1]

    const isPrevDisabled = disabled || currentPage === 1
    const isNextDisabled = disabled || currentPage === lastPage

    if (variant === 'pagination') {
      return (
        <div ref={ref} className={cn('inf-pagination', className)} {...props}>
          <Button
            variant="tertiary"
            disabled={isPrevDisabled}
            onClick={onPrevious}
            icon={<ChevronLeftIcon />}
          />

          {paginationRange.map((pageNumber, index) => {
            // Точки
            if (pageNumber === DOTS) {
              return <div key={index}>&#8230;</div>
            }
            // Страницы
            return (
              <Button
                className="inf-pagination__page-button"
                key={index}
                variant={pageNumber === currentPage ? 'secondary' : 'tertiary'}
                disabled={disabled}
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
            className="inf-pagination__next-button"
            variant="tertiary"
            disabled={isNextDisabled}
            onClick={onNext}
            icon={<ChevronRightIcon />}
          />
        </div>
      )
    } else {
      return (
        <div ref={ref} className={cn('inf-pagination', className)} {...props}>
          <Button
            className="inf-pagination__prev-button"
            variant="tertiary"
            disabled={isPrevDisabled}
            onClick={onPrevious}
          >
            {prevLabel}
          </Button>
          <Button
            className="inf-pagination__next-button"
            variant="tertiary"
            disabled={isNextDisabled}
            onClick={onNext}
          >
            {nextLabel}
          </Button>
          <Text className="inf-pagination__text" size="medium" tone="tertiary">
            {(currentPage - 1) * pageSize + 1}–{currentPage * pageSize}{' '}
            {entitylabel} из {totalCount}
          </Text>
        </div>
      )
    }
  }
)

Pagination.displayName = 'Pagination'

export default Pagination
