import { SpaceVariants } from '~/src/utils/types'
import { CSSProperties } from 'react'
import { TextColor } from 'Components/Text/types'

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
  cursor?: Cursor
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  maxWidth?: CSSProperties['maxWidth']
  maxHeight?: CSSProperties['maxHeight']
  minWidth?: CSSProperties['minWidth']
  minHeight?: CSSProperties['minHeight']
}

type BoxShadow = 'small' | 'medium'
type BorderWidth = 'default' | 'thick'
type BorderColor = 'default' | 'secondary' | 'danger'
type BorderRadius = 'small' | 'medium' | 'large'
type Padding = SpaceVariants
type Background = 'default' | 'secondary' | 'inverse'
type Overflow = Extract<CSSProperties['overflow'], 'hidden' | 'scroll'>
type Cursor = Extract<CSSProperties['cursor'], 'pointer'>
