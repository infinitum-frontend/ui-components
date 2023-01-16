import {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps extends ComponentPropsWithoutRef<any> {
  className?: string
  children: ReactNode
}

const Portal = ({ className = '', children }: PortalProps): ReactElement => {
  const [wrapper] = useState(() => {
    const el = document.createElement('div')
    if (className) {
      el.classList.add(className)
    }
    return el
  })

  useEffect(() => {
    document.body.appendChild(wrapper)
    return () => {
      document.body.removeChild(wrapper)
    }
  }, [])

  return createPortal(children, wrapper)
}

export default Portal
