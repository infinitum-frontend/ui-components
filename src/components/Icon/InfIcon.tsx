import { ReactElement, ReactSVGElement } from 'react'
import { useIcon } from './useIcon'

export interface InfIconProps extends Partial<ReactSVGElement> {
  name: string
  width?: number
  height?: number
}

const InfIcon = ({
  name,
  ...restProps
}: InfIconProps): ReactElement => {
  const { Component, isLoaded } = useIcon(name)
  return (
    <>
      {isLoaded && Component && <Component {...restProps} />}
    </>
  )
}

export default InfIcon
