import { PropsWithChildren, ReactElement } from 'react'
import './ModalBody.scss'

const ModalBody = ({
  children
}: PropsWithChildren<ReactElement>): ReactElement | null => {
  return <div className="inf-modal-body">{children}</div>
}

export default ModalBody
