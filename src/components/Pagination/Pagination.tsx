import React, { ComponentPropsWithoutRef } from 'react'
import { usePagination } from './usePagination'
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

/** Постраничная навигация */
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
          <button
            className="inf-pagination__button inf-pagination__button--square"
            disabled={isPrevDisabled}
            onClick={onPrevious}
          >
            <ChevronLeftIcon />
          </button>

          {paginationRange.map((pageNumber, index) => {
            // Точки
            if (pageNumber === DOTS) {
              return <div key={index}>&#8230;</div>
            }
            // Страницы
            return (
              <button
                className={cn(
                  'inf-pagination__button inf-pagination__button--square',
                  {
                    'inf-pagination__button--active': pageNumber === currentPage
                  }
                )}
                key={index}
                disabled={disabled}
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </button>
            )
          })}

          <button
            className="inf-pagination__button inf-pagination__button--square"
            disabled={isNextDisabled}
            onClick={onNext}
          >
            <ChevronRightIcon />
          </button>
        </div>
      )
    } else {
      return (
        <div ref={ref} className={cn('inf-pagination', className)} {...props}>
          <button
            className="inf-pagination__button"
            disabled={isPrevDisabled}
            onClick={onPrevious}
          >
            {prevLabel}
          </button>
          <button
            className="inf-pagination__button"
            disabled={isNextDisabled}
            onClick={onNext}
          >
            {nextLabel}
          </button>
          <div className="inf-pagination__text">
            {(currentPage - 1) * pageSize + 1}–{currentPage * pageSize}{' '}
            {entitylabel} из {totalCount}
          </div>
        </div>
      )
    }
  }
)

Pagination.displayName = 'Pagination'

export default Pagination
