// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  forwardRef,
  isValidElement,
  cloneElement,
  ReactNode,
  HTMLProps
} from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from '../../usePopoverContext'

export interface PopoverTriggerProps {
  children: ReactNode
}

const PopoverTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(function PopoverTrigger({ children, ...props }, propRef) {
  const context = usePopoverContext()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-popover-state': context.open ? 'open' : 'closed'
      })
    )
  }

  return <div>Invalid element in children</div>
})

PopoverTrigger.displayName = 'PopoverTrigger'

export default PopoverTrigger
