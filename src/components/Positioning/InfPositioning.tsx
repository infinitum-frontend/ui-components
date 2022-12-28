import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactElement,
  useState,
  useRef, useLayoutEffect
} from 'react'
import InfPortal from '../Portal/InfPortal'

export interface InfPositioningProps extends ComponentPropsWithoutRef<any> {
  /**
   * функция, возвращающая элемент, относительно которого необходимо спозиционировать переданный контент
   */
  getElementToAttach?: () => HTMLElement | null
  /**
   * Контент, подлежащий абсолютному позиционированию
   */
  children: JSX.Element
  /**
   * Вариант позиционирования
   */
  placement?: 'bottom'
  offsetTop?: number
}
// TODO: offset, placement. Подумать над еще 1 оберткой, которая будет учитывать триггер (click/hover)

/**
 * Компонент, предназначенный для абсолютного позиционирования контента относительно HTML-элемента. Контент рендерится в конце тега body
 */
const InfPositioning = ({ getElementToAttach, children, placement = 'bottom', offsetTop = 0 }: InfPositioningProps): ReactElement => {
  const [styles, setStyles] = useState<CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const result: CSSProperties = {
      position: 'absolute'
    }

    if (getElementToAttach) {
      const el = getElementToAttach()
      if (el) {
        const { left, top, width, bottom } = el.getBoundingClientRect()

        if (placement === 'bottom') {
          result.left = left ? `${left}px` : 0
          result.top = top ? `${bottom + window.scrollY + offsetTop}px` : 0
        }

        result.width = width ? `${width}px` : '100%'
      }
    }

    setStyles(result)
  }, [offsetTop])

  // TODO: оставил обертку, тк не нашел, как получить данные о DOM элементах, входящие в children
  return (
    <InfPortal>
      <div ref={ref} style={styles}>
        {children}
      </div>
    </InfPortal>
  )
}

export default InfPositioning
