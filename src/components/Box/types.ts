import { SpaceVariants } from '~/src/utils/types'

export interface BoxProps {
  background?: Background
  color?: TextColor
  padding?: Padding
  paddingLeft?: Padding
  paddingRight?: Padding
  paddingBottom?: Padding
  paddingTop?: Padding
  paddingX?: Padding
  paddingY?: Padding
  borderWidth?: BorderWidth
  borderTopWidth?: BorderWidth
  borderBottomWidth?: BorderWidth
  borderRightWidth?: BorderWidth
  borderLeftWidth?: BorderWidth
  borderRadius?: BorderRadius
  borderColor?: BorderColor
  boxShadow?: BoxShadow
  overflow?: Overflow
  overflowX?: Overflow
  overflowY?: Overflow
}

export type BoxShadow = 'small' | 'medium'
export type BorderWidth = 'default'
export type BorderColor = 'default' | 'secondary'
export type BorderRadius = 'small' | 'medium' | 'large'
export type Padding = SpaceVariants
export type Background = 'default' | 'secondary' | 'inverse'
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'success'
  | 'danger'
  | 'warning'
  | 'inverse' // TODO: использовать тот же тип что и в компоненте Text
export type Overflow = 'hidden' | 'scroll'
