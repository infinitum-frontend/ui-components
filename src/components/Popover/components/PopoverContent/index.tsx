// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, HTMLProps, ComponentPropsWithoutRef } from 'react'
import { usePopoverContext } from '../../usePopoverContext'
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager
} from '@floating-ui/react'
import cn from 'classnames'
import './PopoverContent.scss'

export interface PopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'inverse'
  hasPadding?: boolean
  hasArrow?: boolean
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      variant = 'default',
      hasPadding = true,
      hasArrow = true,
      children,
      style,
      ...props
    }: PopoverContentProps,
    propRef
  ) {
    const { context: floatingContext, ...context } = usePopoverContext()
    const ref = useMergeRefs([context.refs.setFloating, propRef])

    return (
      <FloatingPortal>
        {context.open && (
          <FloatingFocusManager context={floatingContext} modal={false}>
            <div
              ref={ref}
              style={{
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
                width: 'max-content',
                ...style
              }}
              className={cn(
                'inf-popover-content',
                `inf-popover-content--variant-${variant}`,
                {
                  'inf-popover-content--no-padding': !hasPadding
                }
              )}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
            >
              {children}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    )
  }
)

PopoverContent.displayName = 'PopoverContent'

export default PopoverContent
