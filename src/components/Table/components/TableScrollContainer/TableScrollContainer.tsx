import { ReactElement, useEffect, useRef, useState, forwardRef } from 'react'
// import { ScrollArea } from 'Components/ScrollArea'
import cn from 'classnames'
import { TableProps } from '../../types'
import './TableScrollContainer.scss'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import { TABLE_EMPTY_MESSAGE_HEIGHT } from '../TableEmpty/TableEmpty'
import { mergeRefs } from 'react-merge-refs'

interface RenderProps {
  virtualizer?: Virtualizer<HTMLDivElement, Element>
}

export interface TableScrollContainerProps {
  className?: string
  height: TableProps<any>['height']
  maxHeight: TableProps<any>['maxHeight']
  stickyHeader: TableProps<any>['stickyHeader']
  children: (props: RenderProps) => ReactElement
  enabled?: boolean
  rowsCount: number
  estimateRowHeight: number
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void
}

const TableScrollContainer = forwardRef<
  HTMLDivElement,
  TableScrollContainerProps
>(
  (
    {
      className,
      height,
      maxHeight,
      stickyHeader,
      children,
      enabled,
      rowsCount,
      estimateRowHeight,
      onScroll
    },
    ref
  ): ReactElement => {
    const [tableHeaderHeight, setTableHeaderHeight] = useState(0)

    const innerRef = useRef<HTMLDivElement>(null)
    const mergedRef = mergeRefs([ref, innerRef])

    const tableHeadElement = innerRef.current?.querySelector('table thead')

    useEffect(() => {
      const isObserverEnabled = innerRef && stickyHeader && tableHeadElement

      if (!isObserverEnabled) {
        return
      }

      const updateTheadHeight = (): void => {
        setTableHeaderHeight(tableHeadElement.clientHeight || 0)
      }

      const observer = new ResizeObserver(() => {
        updateTheadHeight()
      })

      updateTheadHeight()
      observer.observe(tableHeadElement)

      return () => {
        observer.unobserve(tableHeadElement)
      }
    }, [tableHeadElement])

    if (!height && !maxHeight) {
      return children({ virtualizer: undefined })
    }

    const heightStyle = typeof height === 'number' ? `${height}px` : height
    const maxHeightStyle =
      typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight

    const virtualizer = useVirtualizer({
      count: rowsCount,
      getScrollElement: () => innerRef.current,
      estimateSize: () => estimateRowHeight,
      overscan: 5
    })

    const totalHeight = virtualizer.getTotalSize() + tableHeaderHeight

    const minHeight = tableHeaderHeight + TABLE_EMPTY_MESSAGE_HEIGHT

    return (
      <div
        className={cn('inf-table-scroll-container', className)}
        style={{
          height: heightStyle || undefined,
          maxHeight: maxHeightStyle || undefined,
          overflowAnchor: 'none',
          overflow: 'scroll'
        }}
        ref={mergedRef}
        // scrollbarStyle={{ top: `${tableHeaderHeight}px`, right: '0px' }}
        onScroll={onScroll}
      >
        {enabled ? (
          <div
            style={{ height: `${totalHeight}px`, minHeight: `${minHeight}px` }}
          >
            {children?.({
              virtualizer
            })}
          </div>
        ) : (
          children?.({ virtualizer: undefined })
        )}
      </div>
    )
  }
)

TableScrollContainer.displayName = 'TableScrollContainer'

export default TableScrollContainer
