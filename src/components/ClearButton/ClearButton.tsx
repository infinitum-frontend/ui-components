import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { ReactComponent as ClearIcon } from 'Icons/cancel-circle.svg'
import cn from 'classnames'
import './ClearButton.scss'

export interface ClearButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string
}
// TODO: нужно ли сохоранить опцию пробррса кастомной иконки. Пример есть в Input allowClear
const ClearButton = ({
  className,
  ...props
}: ClearButtonProps): ReactElement => {
  return (
    <button className={cn('inf-clear-button', className)} {...props}>
      <ClearIcon className="inf-clear-button__icon" width={20} height={20} />
    </button>
  )
}

export default ClearButton
