import {
  useVirtualizer,
  VirtualItem,
  VirtualizerOptions
} from '@tanstack/react-virtual'
import { CSSProperties, ReactElement, useRef } from 'react'
import ScrollArea from 'Components/ScrollArea'

export interface VirtualizerProps
  extends Partial<VirtualizerOptions<HTMLElement, HTMLElement>> {
  maxHeight?: CSSProperties['maxHeight']
  renderRow: (virtualItem: VirtualItem) => ReactElement
  count: number
  estimateSize: VirtualizerOptions<HTMLElement, HTMLElement>['estimateSize']
}

const Virtualizer = ({
  count,
  estimateSize,
  overscan,
  maxHeight,
  renderRow
}: VirtualizerProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => ref.current,
    estimateSize,
    overscan
  })

  const maxHeightStyle =
    typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight

  const totalHeight = virtualizer.getTotalSize()

  const items = virtualizer.getVirtualItems()

  return (
    <ScrollArea
      viewportStyle={{
        maxHeight: maxHeightStyle || undefined,
        height: maxHeightStyle || undefined,
        overflowAnchor: 'none'
      }}
      viewportRef={ref}
    >
      <div
        style={{
          height: `${totalHeight}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`
          }}
        >
          {items.map((virtualItem) => (
            <div
              key={virtualItem.key.toString()}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
            >
              {renderRow(virtualItem)}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

export default Virtualizer
