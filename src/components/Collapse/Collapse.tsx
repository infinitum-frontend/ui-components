import { ComponentProps, ReactElement, useRef } from 'react'
import { Transition } from 'react-transition-group'
import cn from 'classnames'
import './index.scss'

export interface CollapseProps extends ComponentProps<'div'> {
  /** Состояние (схлопнут/развернут)  */
  collapsed?: boolean
  /** Функция, согласно которой осуществляется переход */
  transitionFn?: string
  /** Длительность перехода в миллисекуднах */
  transitionDuration?: number
  /** Нужно ли удалять контент из DOM при схлопывании */
  unmountOnExit?: boolean
  /** Позволяет рендерить контент только при первом расхлопывании  */
  mountOnEnter?: boolean
}

export const TRANSITION_DURATION_DEFAULT = 200
export const TRANSITION_FUNCTION_DEFAULT = 'ease-out'

const Collapse = ({
  collapsed = true,
  transitionFn = TRANSITION_FUNCTION_DEFAULT,
  transitionDuration = TRANSITION_DURATION_DEFAULT,
  unmountOnExit = false,
  mountOnEnter = false,
  className,
  children,
  ...props
}: CollapseProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const getWrapperHeight = (): number =>
    wrapperRef.current ? wrapperRef.current.clientHeight : 0

  //  ====================== Entering ======================
  const handleEntering = (node: HTMLElement): void => {
    // получаем высоту обертки и сбрасываем позиционирование
    if (wrapperRef.current) {
      wrapperRef.current.style.position = ''
    }

    requestAnimationFrame(() => {
      node.style.transition = `height ${transitionFn} ${transitionDuration}ms`
      node.style.height = `${getWrapperHeight()}px`
    })
  }

  // при начале транзишена делаем меняет позишн у обертки, чтобы получить ее высоту
  const handleEnter = (node: HTMLElement): void => {
    if (wrapperRef.current) {
      wrapperRef.current.style.position = 'absolute'
    }
    node.style.height = '0px'
    node.style.overflow = 'hidden'
  }

  const handleEntered = (node: HTMLElement): void => {
    node.style.height = 'auto'
  }

  //  ====================== Exiting ======================
  const handleExiting = (node: HTMLElement): void => {
    // Хак, сделанный для корректной работы транзишена, чтобы браузер успел отрисовать
    requestAnimationFrame(() => {
      node.style.transition = `height ${transitionFn} ${transitionDuration}ms`
      node.style.overflow = 'hidden'
      node.style.height = '0px'
    })
  }

  const handleExited = (node: HTMLElement): void => {
    node.style.height = '0px'
  }

  const handleExit = (node: HTMLElement): void => {
    node.style.height = `${getWrapperHeight()}px`
  }

  return (
    <Transition
      in={!collapsed}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onEnter={handleEnter}
      onExiting={handleExiting}
      onExited={handleExited}
      onExit={handleExit}
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
      timeout={transitionDuration}
    >
      {(state) => (
        <div
          ref={ref}
          className={cn(className, 'inf-collapse-root', {
            'inf-collapse-root--hidden': state === 'exited' && collapsed,
            'inf-collapse-root--expanded': state === 'entered'
          })}
          {...props}
        >
          <div ref={wrapperRef}>{children}</div>
        </div>
      )}
    </Transition>
  )
}

export default Collapse