import { ReactElement, useRef } from 'react'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import './TableWithVirtualRows.scss'

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

  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => ref.current,
    estimateSize: () => 65, // TODO: считать размер ряда
    overscan: 5 // TODO: прокидывать кастомизацию
  })
  return (
    <div className="inf-table-with-virtual-rows">
      <div
        ref={ref}
        className="inf-scroll-y inf-table-with-virtual-rows__container"
      >
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {children?.({ virtualizer })}
        </div>
      </div>
    </div>
  )
}

export default TableWithVirtualRows
