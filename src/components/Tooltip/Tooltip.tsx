// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode, cloneElement, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import './Tooltip.scss'

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  content: ReactNode
  defaultOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      placement = 'top',
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange: setControlledOpen,
      ...props
    },
    propRef
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const { x, y, refs, strategy, context } = useFloating({
      placement,
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(12),
        flip({
          fallbackAxisSideDirection: 'start',
          crossAxis: placement.includes('-')
        }),
        shift({ padding: 8 })
      ]
    })

    const hover = useHover(context, {
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

    const triggerProps = {
      ref: refs.setReference,
      ...getReferenceProps(),
      'data-tooltip-state': open ? 'open' : 'closed'
    }

    const tooltipRef = useMergeRefs([refs.setFloating, propRef])

    return (
      <>
        {cloneElement(children as ReactElement<any>, triggerProps)}
        <FloatingPortal>
          {open && (
            <div
              className="inf-tooltip"
              ref={tooltipRef}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                visibility: context.x == null ? 'hidden' : 'visible'
              }}
              {...getFloatingProps(props)}
            >
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
