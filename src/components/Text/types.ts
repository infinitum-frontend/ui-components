export interface TextProps {
  /**
   * Дополнительный класс
   */
  className?: string
  /**
   * Вариант типографики
   */
  variant?: TextVariant
  /**
   * Размер текста
   * @deprecated используй variant
   */
  size?: Size
  /**
   * Жирность начертания
   */
  weight?: FontWeight
  /**
   * Цвет текста
   * @deprecated используй color
   */
  tone?: TextColor
  /**
   * Цвет текста
   */
  color?: TextColor
  /**
   * Выравнивание (CSS text-align)
   */
  alignment?: TextAlign
  /**
   * Обрезать переполненный текст троеточием
   */
  truncated?: boolean
  /**
   * В верхнем регистре
   */
  uppercase?: boolean
}

type Size = 'xsmall' | 'small' | 'medium' | 'large'

type TextVariant =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'subtitle-1'
  | 'subtitle-2'
  | 'subtitle-3'
  | 'body-1'
  | 'body-2'
  | 'overline'

type FontWeight = 'light' | 'normal' | 'bold' | 'extrabold'

type TextAlign = 'left' | 'center' | 'right' | 'justify'

type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'success'
  | 'danger'
  | 'warning'
  | 'inverse'
