import { ComponentPropsWithoutRef, ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface InfPortalProps extends ComponentPropsWithoutRef<any> {
  children: JSX.Element
}

const InfPortal = ({ className = '', children }: InfPortalProps): ReactElement => {
  const [wrapper] = useState(() => document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(wrapper)
    return () => { document.body.removeChild(wrapper) }
  })

  return (
    createPortal(children, wrapper)
  )
}

export default InfPortal
