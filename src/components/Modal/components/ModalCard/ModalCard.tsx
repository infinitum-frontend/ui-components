import { PropsWithChildren, ReactElement } from 'react'
import './ModalCard.scss'
import cn from 'classnames'

export interface IModalCardProps extends PropsWithChildren<ReactElement> {
  size?: 'small' | 'medium' | 'large'
}

const ModalCard = ({
  size = 'medium',
  children
}: IModalCardProps): ReactElement | null => {
  return (
    <div className={cn('inf-modal-card', `inf-modal-card--${size}`)}>
      {children}
    </div>
  )
}

export default ModalCard
