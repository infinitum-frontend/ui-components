import { ReactElement, useRef } from 'react'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import ScrollArea from 'Components/ScrollArea'
import cn from 'classnames'
import './TableWithVirtualRows.scss'

const defaultRowHeight = 65
interface RenderProps {
  virtualizer?: Virtualizer<HTMLDivElement, Element>
}

interface TableWithVirtualRowsProps {
  enabled?: boolean
  rowsCount: number
  borderRadius: 'xsmall' | 'small' | 'medium' | 'large'
  maxHeight?: number
  children: (props: RenderProps) => ReactElement
}
const TableWithVirtualRows = ({
  rowsCount,
  maxHeight,
  children,
  enabled,
  borderRadius
}: TableWithVirtualRowsProps): ReactElement => {
  if (!enabled) {
    return children({ virtualizer: undefined })
  }
  const ref = useRef<HTMLDivElement>(null)

  const tableHeaderHeight =
    ref.current?.querySelector('table thead')?.clientHeight || 0

  const rowHeight =
    ref.current?.querySelector('table tbody tr')?.clientHeight ||
    defaultRowHeight

  console.log('rowHeight', rowHeight)

  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => ref.current,
    estimateSize: (index) => rowHeight,
    overscan: 5 // TODO: прокидывать кастомизацию
  })

  return (
    <ScrollArea
      scrollbarStyle={{ top: `${tableHeaderHeight}px`, right: '0px' }}
      className={cn('inf-table-with-virtual-rows', {
        [`inf-table-with-virtual-rows--border-radius-${
          borderRadius as string
        }`]: borderRadius
      })}
      style={{ height: maxHeight ? `${maxHeight}px` : '100%' }}
    >
      <div ref={ref}>
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {children?.({ virtualizer })}
        </div>
      </div>
    </ScrollArea>
  )
}

export default TableWithVirtualRows
