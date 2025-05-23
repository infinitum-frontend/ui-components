import { ReactElement, useEffect, useRef, useState } from 'react'
import ScrollArea from 'Components/ScrollArea'
import cn from 'classnames'
import { TableProps } from '../../types'
import './TableScrollContainer.scss'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import { TABLE_EMPTY_MESSAGE_HEIGHT } from '../TableEmpty/TableEmpty'

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
}

const TableScrollContainer = ({
  className,
  height,
  maxHeight,
  stickyHeader,
  children,
  enabled,
  rowsCount,
  estimateRowHeight
}: TableScrollContainerProps): ReactElement => {
  const [tableHeaderHeight, setTableHeaderHeight] = useState(0)

  const ref = useRef<HTMLDivElement>(null)

  const tableHeadElement = ref.current?.querySelector('table thead')

  useEffect(() => {
    const isObserverEnabled = ref && stickyHeader && tableHeadElement

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

  // TODO: вынести логику виртуализации в отдельный компонент
  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => ref.current,
    estimateSize: () => estimateRowHeight,
    overscan: 5 // TODO: прокидывать кастомизацию
  })

  const totalHeight = virtualizer.getTotalSize() + tableHeaderHeight

  const minHeight = tableHeaderHeight + TABLE_EMPTY_MESSAGE_HEIGHT // TODO: плохое решение. Как иначе посчитать высоту?

  return (
    <ScrollArea
      className={cn('inf-table-scroll-container', className)}
      viewportStyle={{
        height: heightStyle || undefined,
        maxHeight: maxHeightStyle || undefined,
        overflowAnchor: 'none'
      }}
      viewportRef={ref}
      scrollbarStyle={{ top: `${tableHeaderHeight}px`, right: '0px' }}
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
    </ScrollArea>
  )
}

TableScrollContainer.displayName = 'TableScrollContainer'

export default TableScrollContainer
