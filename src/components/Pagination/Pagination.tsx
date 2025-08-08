import React, {
  ComponentPropsWithoutRef,
  useState,
  useEffect,
  useRef
} from 'react'
import { usePagination } from './usePagination'
import './Pagination.scss'
import cn from 'classnames'
import { Text } from '../Text'
import {
  IconArrowLeft01Sharp,
  IconArrowLeftDoubleSharp,
  IconArrowRight01Sharp,
  IconArrowRightDoubleSharp,
  IconStar
} from '@infinitum-ui/icons'
import { Icon } from '../Icon'
import { DropdownMenu } from '../DropdownMenu'
import { Space } from '../Space'
import { Select } from '../Select'

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
   *  Отображать кнопки мгновенного перемещения на первую и последнюю страницу
   */
  showFirstLast?: boolean
  /**
   *  Отображать диапазон элементов (например, "1-10 из 100")
   */
  showItemsRange?: boolean
  /**
   *  Доступные варианты количества элементов на странице
   */
  pageSizeOptions?: number[]
  /**
   *  Обработчик изменения количества элементов на странице
   */
  onPageSizeChange?: (pageSize: number) => void
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
      disabled = false,
      showFirstLast,
      showItemsRange,
      pageSizeOptions,
      onPageSizeChange,
      ...props
    },
    ref
  ) => {
    const { paginationRangeToShow, paginationRangeOverflow } = usePagination({
      currentPage,
      totalCount,
      pageSize
    })

    // Если страница одна, то не рендерим пагинацию
    if (currentPage === 0 || paginationRangeToShow.length < 2) {
      return null
    }

    const onNext = (): void => {
      onPageChange(currentPage + 1)
    }

    const onPrevious = (): void => {
      onPageChange(currentPage - 1)
    }

    const lastPage = paginationRangeToShow[paginationRangeToShow.length - 1]

    const onFirst = (): void => {
      onPageChange(1)
    }

    const onLast = (): void => {
      onPageChange(Number(lastPage))
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const activeItemRef = useRef<HTMLDivElement>(null)
    // Автоматическая прокрутка к активной странице при открытии дропдауна
    useEffect(() => {
      if (isDropdownOpen) {
        // Проверяем, есть ли активная страница в дропдауне
        const isActivePageInDropdown =
          paginationRangeOverflow.includes(currentPage)

        if (isActivePageInDropdown) {
          // Используем Promise.resolve() для микротаски вместо setTimeout
          void Promise.resolve().then(() => {
            requestAnimationFrame(() => {
              if (activeItemRef.current) {
                activeItemRef.current.scrollIntoView({
                  block: 'center'
                })
              }
            })
          })
        }
      }
    }, [isDropdownOpen, currentPage, paginationRangeOverflow])

    const isPrevDisabled = disabled || currentPage === 1
    const isNextDisabled = disabled || currentPage === lastPage

    // Создаем опции для Select
    const pageSizeSelectOptions = pageSizeOptions?.map((size) => ({
      value: size,
      label: size.toString()
    }))

    const start = (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize, totalCount)
    const itemsRangeText = `${start}-${end} из ${totalCount} элементов`

    return (
      <Space direction="horizontal" gap="large" align="center">
        <div ref={ref} className={cn('inf-pagination', className)} {...props}>
          {showFirstLast && (
            <button
              className="inf-pagination__button inf-pagination__button--square"
              disabled={isPrevDisabled}
              onClick={onFirst}
              type="button"
            >
              <Icon>
                <IconArrowLeftDoubleSharp />
              </Icon>
            </button>
          )}
          <button
            className="inf-pagination__button inf-pagination__button--square"
            disabled={isPrevDisabled}
            onClick={onPrevious}
            type="button"
          >
            <Icon>
              <IconArrowLeft01Sharp />
            </Icon>
          </button>

          {paginationRangeToShow.map((pageNumber, index) => {
            // Точки
            if (pageNumber === DOTS && paginationRangeOverflow.length > 0) {
              return (
                <DropdownMenu
                  key={index}
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenu.Trigger asChild>
                    <button
                      className={cn(
                        'inf-pagination__button inf-pagination__button--square',
                        {
                          'inf-pagination__button--active':
                            paginationRangeOverflow.includes(currentPage)
                        }
                      )}
                      type="button"
                    >
                      &#8230;
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    className="inf-pagination__dropdown"
                    style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                      minWidth: '120px'
                    }}
                  >
                    {paginationRangeOverflow.map((page) => (
                      <DropdownMenu.Item
                        key={page}
                        onClick={() => {
                          onPageChange(page)
                          setIsDropdownOpen(false)
                        }}
                        className={cn('inf-pagination__dropdown-item', {
                          'inf-pagination__dropdown-item--active':
                            page === currentPage
                        })}
                        ref={page === currentPage ? activeItemRef : undefined}
                      >
                        <Space
                          direction="horizontal"
                          gap="xsmall"
                          align="center"
                        >
                          <Icon>
                            <IconStar />
                          </Icon>
                          <Text>{page}</Text>
                        </Space>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu>
              )
            }
            // Страницы
            return (
              <button
                className={cn('inf-pagination__button', {
                  'inf-pagination__button--active': pageNumber === currentPage
                })}
                key={index}
                disabled={disabled}
                onClick={() => onPageChange(pageNumber as number)}
                type="button"
              >
                <Text>{pageNumber}</Text>
              </button>
            )
          })}

          <button
            className="inf-pagination__button inf-pagination__button--square"
            disabled={isNextDisabled}
            onClick={onNext}
            type="button"
          >
            <Icon>
              <IconArrowRight01Sharp />
            </Icon>
          </button>
          {showFirstLast && (
            <button
              className="inf-pagination__button inf-pagination__button--square"
              disabled={isNextDisabled}
              onClick={onLast}
              type="button"
            >
              <Icon>
                <IconArrowRightDoubleSharp />
              </Icon>
            </button>
          )}
        </div>

        {Boolean(pageSizeSelectOptions) && (
          <Space direction="horizontal" gap="small" align="center">
            <Text variant="body-2" color="secondary">
              Показывать&nbsp;по
            </Text>
            <Select
              placeholder=""
              options={pageSizeSelectOptions}
              value={pageSize}
              onChange={(option) => onPageSizeChange?.(Number(option?.value))}
            />
          </Space>
        )}
        {showItemsRange && (
          <Text variant="body-2" color="secondary">
            {itemsRangeText}
          </Text>
        )}
      </Space>
    )
  }
)

Pagination.displayName = 'Pagination'

export default Pagination
