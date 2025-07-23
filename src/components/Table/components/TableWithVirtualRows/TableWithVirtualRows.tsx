import { ReactElement, useRef } from 'react'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import cn from 'classnames'
import './TableWithVirtualRows.scss'
import { ScrollArea } from 'Components/ScrollArea'

interface RenderProps {
  virtualizer?: Virtualizer<HTMLDivElement, Element>
}

interface TableWithVirtualRowsProps {
  enabled?: boolean
  rowsCount: number
  borderRadius: 'xsmall' | 'small' | 'medium' | 'large'
  maxHeight?: number
  estimateRowHeight: number
  children: (props: RenderProps) => ReactElement
}
const TableWithVirtualRows = ({
  rowsCount,
  maxHeight,
  children,
  enabled,
  estimateRowHeight,
  borderRadius
}: TableWithVirtualRowsProps): ReactElement => {
  if (!enabled) {
    return children({ virtualizer: undefined })
  }
  const ref = useRef<HTMLDivElement>(null)

  const tableHeaderHeight =
    ref.current?.querySelector('table thead')?.clientHeight || 0

  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => ref.current,
    estimateSize: () => estimateRowHeight,
    overscan: 5 // TODO: прокидывать кастомизацию
  })

  const totalHeight = virtualizer.getTotalSize() + tableHeaderHeight

  return (
    <ScrollArea
      viewportStyle={{
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        overflowAnchor: 'none'
      }}
      viewportRef={ref}
      scrollbarStyle={{ top: `${tableHeaderHeight}px`, right: '0px' }}
      className={cn('inf-table-with-virtual-rows', {
        [`inf-table-with-virtual-rows--border-radius-${
          borderRadius as string
        }`]: borderRadius
      })}
    >
      <div style={{ height: `${totalHeight}px` }}>
        {children?.({
          virtualizer
        })}
      </div>
    </ScrollArea>
  )
}

export default TableWithVirtualRows
