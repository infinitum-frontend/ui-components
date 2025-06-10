// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties, ReactElement, ReactNode, useMemo } from 'react'
import cn from 'classnames'
import './GridItem.scss'

export interface GridItemProps {
  /**
   * Количество колонок, которые занимает элемент (число или 'auto')
   */
  colSpan?: number | 'auto'
  /**
   * Количество строк, которые занимает элемент (число или 'auto')
   */
  rowSpan?: number | 'auto'
  /**
   * Имя области в grid-template-areas, не используем если есть placement
   */
  area?: string
  /**
   * CSS свойство align-self
   */
  alignSelf?: CSSProperties['alignSelf']
  /**
   * CSS свойство justify-self
   */
  justifySelf?: CSSProperties['justifySelf']
  /**
   * Позиционирование элемента, не используем если есть area
   */
  placement?: {
    columnStart?: CSSProperties['gridColumnStart']
    columnEnd?: CSSProperties['gridColumnEnd']
    rowStart?: CSSProperties['gridRowStart']
    rowEnd?: CSSProperties['gridRowEnd']
  }
  /**
   * Дочерние элементы
   */
  children?: ReactNode
  /**
   * Кастомные классы
   */
  className?: string
  /**
   * Кастомные стили
   */
  style?: CSSProperties
}

const GridItem = ({
  colSpan,
  rowSpan,
  area,
  alignSelf,
  justifySelf,
  placement,
  children,
  className,
  style,
  ...rest
}: GridItemProps): ReactElement => {
  // исключаем стили placement если есть area, потому что браузер видит их конфликтующими
  const gridPositioningStyles = area
    ? { gridArea: area }
    : {
        gridColumnStart:
          placement?.columnStart ?? (colSpan ? 'auto' : undefined),
        gridColumnEnd:
          placement?.columnEnd ?? (colSpan ? `span ${colSpan}` : undefined),
        gridRowStart: placement?.rowStart ?? (rowSpan ? 'auto' : undefined),
        gridRowEnd:
          placement?.rowEnd ?? (rowSpan ? `span ${rowSpan}` : undefined)
      }

  return (
    <div
      className={cn('inf-grid-item', className)}
      style={{
        gridColumn:
          colSpan !== undefined
            ? colSpan === 'auto'
              ? 'auto'
              : `span ${colSpan}`
            : undefined,
        gridRow:
          rowSpan !== undefined
            ? rowSpan === 'auto'
              ? 'auto'
              : `span ${rowSpan}`
            : undefined,
        ...gridPositioningStyles,
        alignSelf,
        justifySelf,
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default GridItem
