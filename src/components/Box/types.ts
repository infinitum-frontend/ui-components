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

type BoxShadow = 'small' | 'medium'
type BorderWidth = 'default'
type BorderColor = 'default' | 'secondary'
type BorderRadius = 'small' | 'medium' | 'large'
type Padding = SpaceVariants
type Background = 'default' | 'secondary' | 'inverse'
type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'success'
  | 'danger'
  | 'warning'
  | 'inverse' // TODO: использовать тот же тип что и в компоненте Text
type Overflow = 'hidden' | 'scroll'
