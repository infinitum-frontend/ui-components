import { ReactElement, useRef } from 'react'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import ScrollArea from 'Components/ScrollArea'

const defaultRowHeight = 65
interface RenderProps {
  virtualizer?: Virtualizer<HTMLDivElement, Element>
}

interface TableWithVirtualRowsProps {
  enabled?: boolean
  rowsCount: number
  children: (props: RenderProps) => ReactElement
}
const TableWithVirtualRows = ({
  rowsCount,
  children,
  enabled
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
    estimateSize: (index) => rowHeight,
    overscan: 5 // TODO: прокидывать кастомизацию
  })

  return (
    <ScrollArea
      scrollbarStyle={{ top: `${tableHeaderHeight + 1}px`, right: '0px' }}
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
