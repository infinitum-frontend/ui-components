import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactElement,
  useState,
  useLayoutEffect
} from 'react'
import { Portal } from 'Components/Portal'

export interface PositioningProps extends ComponentPropsWithoutRef<any> {
  /**
   * элемент, относительно которого необходимо спозиционировать переданный контент
   */
  referenceEl?: HTMLElement | null
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
const Positioning = ({
  referenceEl,
  children,
  placement = 'bottom',
  offsetTop = 0
}: PositioningProps): ReactElement => {
  const [styles, setStyles] = useState<CSSProperties>({})

  useLayoutEffect(() => {
    const result: CSSProperties = {
      position: 'absolute'
    }

    if (referenceEl) {
      const { left, top, width, bottom } = referenceEl.getBoundingClientRect()

      if (placement === 'bottom') {
        result.left = left ? `${left}px` : 0
        result.top = top ? `${bottom + window.scrollY + offsetTop}px` : 0
      }

      result.width = width ? `${width}px` : '100%'
    }

    setStyles(result)
  }, [offsetTop, referenceEl])

  // TODO: оставил обертку, тк не нашел, как получить данные о DOM элементах, входящие в children
  return (
    <Portal>
      <div style={styles}>{children}</div>
    </Portal>
  )
}

export default Positioning
