import { ReactElement, ReactSVGElement } from 'react'
import InfIcon from './InfIcon'

const IconBell = (props: Partial<ReactSVGElement>): ReactElement => {
  console.log('RENDER')

  return (
    <InfIcon {...props} name={'bell'} />
  )
}

export default IconBell
