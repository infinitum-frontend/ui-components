import { useState, useMemo, ReactNode } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  Placement
} from '@floating-ui/react'
import PopoverTrigger from './components/PopoverTrigger'
import PopoverContent from './components/PopoverContent'
import { PopoverContext } from './usePopoverContext'

export interface PopoverProps {
  defaultOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function usePopover({
  defaultOpen = false,
  placement,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: PopoverProps = {}): any {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [labelId, setLabelId] = useState<string | undefined>()
  const [descriptionId, setDescriptionId] = useState<string | undefined>()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: 'end'
      }),
      shift({ padding: 8 })
    ]
  })

  const context = data.context

  const click = useClick(context, {
    enabled: controlledOpen == null
  })
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  )
}

function Popover({
  children,
  ...restOptions
}: {
  children: ReactNode
} & PopoverProps): JSX.Element {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ ...restOptions })
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  )
}

export default Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent
})
