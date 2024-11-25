import { ReactElement, useLayoutEffect, useRef, useState } from 'react'
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
  height: TableProps['height']
  maxHeight: TableProps['maxHeight']
  stickyHeader: TableProps['stickyHeader']
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

  useLayoutEffect(() => {
    if (ref.current && stickyHeader) {
      const headerHeight =
        ref.current?.querySelector('table thead')?.clientHeight || 0

      setTableHeaderHeight(headerHeight)
    }
  }, [])

  if (!height && !maxHeight) {
    return children({ virtualizer: undefined })
  }

  const heightStyle = typeof height === 'number' ? `${height}px` : height
  const maxHeightStyle =
    typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight

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
      <div style={{ height: `${totalHeight}px`, minHeight: `${minHeight}px` }}>
        {children?.({
          virtualizer
        })}
      </div>
    </ScrollArea>
  )
}

TableScrollContainer.displayName = 'TableScrollContainer'

export default TableScrollContainer
