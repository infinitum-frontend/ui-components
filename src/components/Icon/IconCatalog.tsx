import { ReactElement, ReactSVGElement } from 'react'
import InfIcon from './InfIcon'

const IconCatalog = (props: Partial<ReactSVGElement>): ReactElement => {
  return (
    <InfIcon {...props} name={'catalog'} />

  )
}

export default IconCatalog
