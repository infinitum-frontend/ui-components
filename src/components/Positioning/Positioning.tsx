import {
  ComponentPropsWithoutRef,
  ReactElement,
  useMemo,
  useState
} from 'react'
import { Modifier, usePopper } from 'react-popper'
import { Placement, State } from '@popperjs/core'
import { createPortal } from 'react-dom'
import './index.scss'
import cn from 'classnames'

export interface PositioningProps extends ComponentPropsWithoutRef<'div'> {
  /** Сcылка на DOM элемент, относительно которого происходит позиционирование */
  reference: HTMLElement
  /** Позиционирование контента https://popper.js.org/docs/v2/constructors/#placement */
  placement: Placement
  /** Положение отпозиционированного элемента (в конце тега body или текущей позиции в DOM) */
  portal?: boolean
  /** Установить ширину контента равной ширине элемента-триггера */
  equalWidth?: boolean
  /** Смещение по горизонтали и вертикали */
  offset?: [number, number]
  /** Наличие указателя на триггер */
  arrow?: boolean
}

const Positioning = ({
  reference,
  style,
  className,
  portal = false,
  placement = 'bottom-start',
  offset,
  equalWidth = false,
  arrow = false,
  children
}: PositioningProps): ReactElement => {
  const [popper, setPopper] = useState<HTMLDivElement | null>(null)

  // https://popper.js.org/docs/v2/modifiers/
  const modifiers = useMemo(() => {
    const modifiers: Array<Modifier<any>> = []

    if (offset) {
      modifiers.push({
        name: 'offset',
        enabled: true,
        options: { offset }
      })
    }

    if (equalWidth) {
      modifiers.push({
        name: 'equalWidth',
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn({ state }: { state: State }) {
          state.styles.popper.width = `${state.rects.reference.width}px`
        },
        effect({ state }: { state: any }) {
          state.elements.popper.style.width = `${
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            state.elements.reference.offsetWidth
          }px`
        },
        enabled: true
      })
    }

    return modifiers
  }, [])

  const options = {
    placement,
    modifiers
  }

  const { styles, attributes } = usePopper(reference, popper, options)

  const Component = (
    <div
      ref={setPopper}
      style={{ ...styles.popper, ...style }}
      {...attributes.popper}
      className={cn('inf-positioning', className)}
    >
      {children}
      {arrow && (
        <span data-popper-arrow={true} className={'inf-positioning__arrow'} />
      )}
    </div>
  )

  if (portal) {
    return createPortal(Component, document.body)
  }

  return Component
}

export default Positioning
