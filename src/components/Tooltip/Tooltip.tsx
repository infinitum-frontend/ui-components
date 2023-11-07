// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ReactElement,
  ReactNode,
  MouseEvent,
  cloneElement,
  useState,
  useRef,
  isValidElement
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
  variant?: 'default' | 'inverted'
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
      onOpenChange: setControlledOpen,
      variant = 'default',
      onClick,
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
        offset(8),
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
        open: 200,
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

    // const triggerProps = getReferenceProps({
    //   ref: refs.setReference,
    //   ...children?.props,
    //   'data-tooltip-state': context.open ? 'open' : 'closed'
    // })

    const triggerProps = {
      ref: refs.setReference,
      ...getReferenceProps({
        onClick(e) {
          e.stopPropagation()
        }
      }),
      'data-tooltip-state': open ? 'open' : 'closed'
    }

    return (
      <>
        {isValidElement(children) &&
          cloneElement(children as ReactElement<any>, triggerProps)}

        <FloatingPortal>
          {open && (
            <div
              className={cn('inf-tooltip', `inf-tooltip--variant-${variant}`)}
              ref={tooltipRef}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                visibility: context.x == null ? 'hidden' : 'visible'
              }}
              {...getFloatingProps({
                ...props,
                onClick(e) {
                  e.stopPropagation()
                  onClick?.(e as MouseEvent<HTMLDivElement>)
                }
              })}
            >
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
