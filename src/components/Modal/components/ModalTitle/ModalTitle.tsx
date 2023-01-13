import { PropsWithChildren, ReactElement } from 'react'
import { Heading } from '../../../Heading'

const ModalTitle = ({
  children
}: PropsWithChildren<ReactElement>): ReactElement | null => {
  return (
    <Heading className="inf-modal-title" level="3">
      {children}
    </Heading>
  )
}

export default ModalTitle
