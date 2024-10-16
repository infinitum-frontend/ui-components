import { ReactElement, useRef } from 'react'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
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

  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => ref.current,
    estimateSize: () => rowHeight,
    overscan: 5 // TODO: прокидывать кастомизацию
  })

  const totalHeight = virtualizer.getTotalSize() + tableHeaderHeight

  return (
    <div
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        overflowAnchor: 'none'
      }}
      ref={ref}
      className={cn('inf-scroll-y', 'inf-table-with-virtual-rows', {
        [`inf-table-with-virtual-rows--border-radius-${
          borderRadius as string
        }`]: borderRadius
      })}
    >
      <div
        style={{
          height: `${totalHeight}px`
        }}
      >
        {children?.({
          virtualizer
        })}
      </div>
    </div>
  )
}

export default TableWithVirtualRows
