import { ReactElement, ReactSVGElement } from 'react'
import { useIcon } from './useIcon'

export interface IconProps extends Partial<ReactSVGElement> {
  name: string
  width?: number
  height?: number
}

const Icon = ({ name, ...restProps }: IconProps): ReactElement => {
  const { Component, isLoaded } = useIcon(name)
  return <>{isLoaded && Component && <Component {...restProps} />}</>
}

export default Icon
