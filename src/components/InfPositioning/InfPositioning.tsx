import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
  useRef
} from 'react'
import InfPortal from '../Portal/InfPortal'

export interface InfPositioningProps extends ComponentPropsWithoutRef<any> {
  /**
   * функция, возвращающая элемент, относительно которого необходимо спозиционировать переданный контент
   */
  getElementToAttach?: () => HTMLElement | null
  /**
   * Контент, подлежащий абсолютному позиционированию. Строго 1 обертка - ограничение createPortal
   */
  children: JSX.Element
  /**
   * Вариант позиционирования
   */
  placement?: 'bottom'
}
// TODO: offset, placement. Подумать над еще 1 оберткой, которая будет учитывать триггер (click/hover)

/**
 * Компонент, предназначенный для абсолютного позиционирования контента относительно HTML-элемента. Контент рендерится в конце тега body
 */
const InfPositioning = ({ getElementToAttach, children, placement = 'bottom' }: InfPositioningProps): ReactElement => {
  const [styles, setStyles] = useState<CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const result: CSSProperties = {
      position: 'absolute'
    }

    if (getElementToAttach) {
      const el = getElementToAttach()
      if (el) {
        const { bottom, left, top, right } = el.getBoundingClientRect()

        if (placement === 'bottom') {
          result.left = left ? `${left}px` : 0
          result.top = bottom ? `${bottom}px` : 0
        }

        result.width = el?.clientWidth ? `${el.clientWidth}px` : '100%'
      }
    }

    setStyles(result)
  }, [])

  // TODO: оставил обертку, тк не нашел, как данные о DOM элементах, входящие в children
  return (
    <InfPortal>
      <div ref={ref} style={styles}>
        {children}
      </div>
    </InfPortal>
  )
}

export default InfPositioning
