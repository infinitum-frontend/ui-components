import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementRef,
  forwardRef
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

interface ScrollAreaProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  scrollbarStyle?: CSSProperties
  orientation?: ScrollAreaPrimitive.ScrollAreaScrollbarProps['orientation']
}
const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, orientation, scrollbarStyle, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    scrollHideDelay={200}
    className={cn('inf-scroll-area__root', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="inf-scroll-area__viewport">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar style={scrollbarStyle} orientation={orientation} />
    <ScrollAreaPrimitive.Corner style={{ background: 'green' }} />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export default ScrollArea
