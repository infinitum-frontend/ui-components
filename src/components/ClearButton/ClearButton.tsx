import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { ReactComponent as ClearIcon } from 'Icons/cancel-circle.svg'
import './ClearButton.scss'

export interface ClearButtonProps extends ComponentPropsWithoutRef<'button'> {}
// TODO: нужно ли сохоранить опцию пробррса кастомной иконки. Пример есть в Input allowClear
const ClearButton = ({ ...props }: ClearButtonProps): ReactElement => {
  return (
    <button className="inf-clear-button" {...props}>
      <ClearIcon className="inf-clear-button__icon" width={20} height={20} />
    </button>
  )
}

export default ClearButton
