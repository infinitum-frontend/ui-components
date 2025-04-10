// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OffsetOptions } from '@floating-ui/core'
import {
  autoUpdate,
  flip,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react'
import { PopoverTriggerType, UsePopover } from 'Components/Popover/types'
import React, { ReactNode, useMemo, useState } from 'react'
import PopoverContent from './components/PopoverContent'
import PopoverTrigger from './components/PopoverTrigger'
import { PopoverContext } from './usePopoverContext'

export interface PopoverProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  /**
   * Значение отступа от триггера https://floating-ui.com/docs/offset
   */
  offset?: OffsetOptions
  trigger?: PopoverTriggerType
  /** Нужно ли вешать фокус на referenceElement при закрытии модалки */
  returnFocus?: boolean
  /** Куда нужно установить фокус при открытии */
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>
  onPressOutside?: boolean | ((event: MouseEvent) => boolean) | undefined
}

export function usePopover({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement = 'bottom',
  offset: offsetProp = 10,
  trigger = 'click',
  returnFocus = true,
  initialFocus = 0,
  onPressOutside
}: PopoverProps = {}): UsePopover {
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
      offset(offsetProp),
      flip({
        fallbackAxisSideDirection: 'end'
      }),
      shift({ padding: 8 })
    ]
  })

  const context = data.context

  const click = useClick(context, {
    enabled: controlledOpen === undefined && trigger === 'click'
  })
  const dismiss = useDismiss(context, {
    outsidePress: onPressOutside
  })
  const role = useRole(context)
  const hover = useHover(context, {
    enabled: trigger === 'hover',
    handleClose: safePolygon() // не закрываем при наведении на всплывающий контент
  })

  const interactions = useInteractions([click, dismiss, role, hover])

  return useMemo(
    () => ({
      open,
      setOpen,
      returnFocus,
      initialFocus,
      ...interactions,
      ...data,
      labelId,
      trigger,
      descriptionId,
      setLabelId,
      setDescriptionId
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      labelId,
      descriptionId,
      returnFocus,
      initialFocus
    ]
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

/** Всплывающий контент с возможностью взаимодействия */
export default Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent
})
