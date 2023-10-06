import {
  ExtendedElements,
  ExtendedRefs,
  FloatingContext,
  MiddlewareData,
  Placement,
  ReferenceType,
  Strategy,
  VirtualElement
} from '@floating-ui/react'
import React from 'react'

export type PopoverTriggerType = 'click' | 'hover'
export interface UsePopover {
  setOpen: (open: boolean) => void
  update: () => void
  isPositioned: boolean
  trigger: PopoverTriggerType
  setDescriptionId: (
    value:
      | ((prevState: string | undefined) => string | undefined)
      | string
      | undefined
  ) => void
  reference: (node: Element | VirtualElement | null) => void
  descriptionId: string | undefined
  labelId: string | undefined
  refs: ExtendedRefs<Element | VirtualElement>
  floating: (node: HTMLElement | null) => void
  elements: ExtendedElements<Element | VirtualElement>
  setLabelId: (
    value:
      | ((prevState: string | undefined) => string | undefined)
      | string
      | undefined
  ) => void
  x: number | null
  positionReference: (node: ReferenceType | null) => void
  context: FloatingContext<Element | VirtualElement>
  y: number | null
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>
  placement: Placement
  strategy: Strategy
  open: undefined | boolean
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>
  middlewareData: MiddlewareData
  getReferenceProps: (
    userProps?: React.HTMLProps<Element>
  ) => Record<string, unknown>
  returnFocus?: boolean
  /** Куда нужно установить фокус при открытии */
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>
}
