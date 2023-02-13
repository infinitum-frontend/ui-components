import React, { ComponentPropsWithoutRef } from 'react'
import { Button } from 'Components/Button'
import { Text } from 'Components/Text'
import './Pagination.scss'
import cn from 'classnames'

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
   * Название сущности в соответствующем склонении
   */
  entitylabel?: string
  /**
   * Текст кнопки предыдущей страницы
   */
  backwardLabel?: string
  /**
   * Текст кнопки следующей страницы
   */
  forwardLabel?: string
  /**
   * Блокировка контролов
   */
  disabled?: boolean
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      onPageChange,
      totalCount,
      pageSize,
      backwardLabel = 'Предыдущие',
      forwardLabel = 'Следующие',
      entitylabel = 'элементов',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const pagesCount = Math.ceil(totalCount / pageSize)

    const isBackDisabled = disabled || currentPage === 1
    const isForwardDisabled = disabled || currentPage === pagesCount

    return (
      <div ref={ref} className={cn('inf-pagination', className)} {...props}>
        <Button
          className="inf-pagination__prev-button"
          variant="tertiary"
          disabled={isBackDisabled}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {backwardLabel}
        </Button>
        <Button
          className="inf-pagination__next-button"
          variant="tertiary"
          disabled={isForwardDisabled}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {forwardLabel}
        </Button>
        <Text className="inf-pagination__text" size="medium" tone="tertiary">
          {(currentPage - 1) * pageSize + 1}–{currentPage * pageSize}{' '}
          {entitylabel} из {totalCount}
        </Text>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'

export default Pagination
