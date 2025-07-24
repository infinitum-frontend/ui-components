import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementRef,
  forwardRef,
  Ref
} from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import cn from 'classnames'
import './ScrollArea.scss'

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn('inf-scroll-area__scrollbar', className)}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="inf-scroll-area__thumb" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export interface ScrollAreaProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  scrollbarStyle?: CSSProperties
  orientation?: ScrollAreaPrimitive.ScrollAreaScrollbarProps['orientation']
  viewportRef?: Ref<HTMLDivElement>
  viewportStyle?: CSSProperties
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}
const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      className,
      children,
      orientation,
      scrollbarStyle,
      viewportStyle,
      viewportRef,
      onScroll,
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      scrollHideDelay={200}
      className={cn('inf-scroll-area__root', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className="inf-scroll-area__viewport"
        style={viewportStyle}
        onScroll={onScroll}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar style={scrollbarStyle} orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
)
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export default ScrollArea
