// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  useState,
  useRef,
  isValidElement,
  CSSProperties
} from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal
} from '@floating-ui/react'
import { OffsetOptions } from '@floating-ui/core'
import type { Placement } from '@floating-ui/react'
import cn from 'classnames'
import './Tooltip.scss'

// TODO: click
// ref на тултип

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  content: ReactNode
  defaultOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * @deprecated
   */
  variant?: 'default' | 'inverted'
  width?: CSSProperties['width']
  offset?: OffsetOptions
  hasArrow?: boolean
  size?: 'small' | 'medium'
}

/** Всплывающий контент с текстовой информацией */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      placement = 'top',
      defaultOpen = false,
      open: controlledOpen,
      offset: offsetProp = 10,
      onOpenChange: setControlledOpen,
      width,
      hasArrow = true,
      size = 'medium',
      ...props
    },
    propRef
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const arrowRef = useRef<HTMLDivElement>(null)

    const {
      x,
      y,
      refs,
      strategy,
      context,
      placement: floatingPlacement,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
    } = useFloating({
      placement,
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(offsetProp),
        flip({
          fallbackAxisSideDirection: 'start',
          crossAxis: placement.includes('-')
        }),
        shift({ padding: 8 }),
        arrow({
          element: arrowRef,
          padding: 6
        })
      ]
    })

    const hover = useHover(context, {
      delay: {
        open: 300,
        close: 0
      },
      move: false,
      enabled: controlledOpen == null
    })
    const focus = useFocus(context, {
      enabled: controlledOpen == null
    })
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'tooltip' })

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role
    ])

    const opposedSide = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    }[floatingPlacement.split('-')[0]]

    const tooltipRef = useMergeRefs([refs.setFloating, propRef])

    const triggerProps = {
      ref: (node: HTMLElement | null) => {
        refs.setReference(node)

        if (isValidElement(children)) {
          if ('ref' in children) {
            const childrenRef = children.ref
            if (typeof childrenRef === 'function') {
              childrenRef(node)
            } else if (
              childrenRef &&
              typeof childrenRef === 'object' &&
              'current' in childrenRef
            ) {
              childrenRef.current = node
            }
          }
        }
      },
      ...getReferenceProps(),
      'data-tooltip-state': open ? 'open' : 'closed'
    }

    return (
      <>
        {isValidElement(children) &&
          cloneElement(children as ReactElement<any>, triggerProps)}

        <FloatingPortal>
          {open && (
            <div
              className={cn('inf-tooltip', [
                `inf-tooltip--size-${size as string}`
              ])}
              ref={tooltipRef}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                visibility: context.x == null ? 'hidden' : 'visible',
                width,
                maxWidth: width ? undefined : '300px'
              }}
              {...getFloatingProps(props)}
            >
              {hasArrow && (
                <div
                  className={cn(
                    'inf-tooltip__arrow',
                    `inf-tooltip__arrow--direction-${opposedSide as string}`
                  )}
                  ref={arrowRef}
                  style={{
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    [opposedSide as string]: '-4px'
                  }}
                />
              )}
              {content}
            </div>
          )}
        </FloatingPortal>
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
